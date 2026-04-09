import type Stripe from "stripe";
import { NextRequest, NextResponse } from "next/server";
import { getStripeServerClient } from "@/lib/stripe";
import {
  linkStripeCustomerToClerkUser,
  setSubscriptionByCustomerId,
} from "@/lib/subscription-store";

function isProStatus(status: Stripe.Subscription.Status) {
  return status === "active" || status === "trialing" || status === "past_due";
}

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

  if (event.type === "checkout.session.completed") {
    const session = event.data.object as Stripe.Checkout.Session;
    const customerId =
      typeof session.customer === "string" ? session.customer : session.customer?.id;
    const subscriptionId =
      typeof session.subscription === "string"
        ? session.subscription
        : session.subscription?.id ?? null;
    const clerkUserId = session.metadata?.clerkUserId;

    if (customerId && clerkUserId) {
      linkStripeCustomerToClerkUser(customerId, clerkUserId);
      setSubscriptionByCustomerId({
        stripeCustomerId: customerId,
        stripeSubscriptionId: subscriptionId,
        status: "pro",
      });
    }
  }

  if (event.type === "customer.subscription.created" || event.type === "customer.subscription.updated") {
    const subscription = event.data.object as Stripe.Subscription;
    const customerId =
      typeof subscription.customer === "string"
        ? subscription.customer
        : subscription.customer.id;

    setSubscriptionByCustomerId({
      stripeCustomerId: customerId,
      stripeSubscriptionId: subscription.id,
      status: isProStatus(subscription.status) ? "pro" : "free",
    });
  }

  if (event.type === "customer.subscription.deleted") {
    const subscription = event.data.object as Stripe.Subscription;
    const customerId =
      typeof subscription.customer === "string"
        ? subscription.customer
        : subscription.customer.id;

    setSubscriptionByCustomerId({
      stripeCustomerId: customerId,
      stripeSubscriptionId: subscription.id,
      status: "free",
    });
  }

  return NextResponse.json({ received: true });
}
