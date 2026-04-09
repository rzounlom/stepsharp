import { Prisma } from "@prisma/client";
import type Stripe from "stripe";
import { NextRequest, NextResponse } from "next/server";
import { getStripeServerClient } from "@/lib/stripe";
import { applyStripeWebhookEvent } from "@/lib/subscription-store";
import { prisma } from "@/lib/prisma";

export async function POST(req: NextRequest) {
  const signature = req.headers.get("stripe-signature");
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;
  if (!signature || !webhookSecret) {
    return NextResponse.json(
      { error: "Missing Stripe webhook signature or secret." },
      { status: 400 },
    );
  }

  const body = await req.text();
  const stripe = getStripeServerClient();

  let event: Stripe.Event;
  try {
    event = stripe.webhooks.constructEvent(body, signature, webhookSecret);
  } catch {
    return NextResponse.json({ error: "Invalid webhook signature." }, { status: 400 });
  }

  try {
    await prisma.$transaction(async (tx) => {
      await tx.stripeProcessedWebhookEvent.create({
        data: {
          stripeEventId: event.id,
          eventType: event.type,
        },
      });
      await applyStripeWebhookEvent(tx, event);
    });
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === "P2002") {
      return NextResponse.json({ received: true });
    }
    throw error;
  }

  return NextResponse.json({ received: true });
}
