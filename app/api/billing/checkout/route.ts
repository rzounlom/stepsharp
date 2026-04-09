import { auth, currentUser } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";
import { getStripeServerClient } from "@/lib/stripe";
import {
  getOrCreateStripeCustomerId,
  getBillingRecord,
  linkStripeCustomerToClerkUser,
} from "@/lib/subscription-store";

export async function POST(req: NextRequest) {
  const { userId } = await auth();
  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const stripePriceId = process.env.STRIPE_PRICE_ID_MONTHLY;
  if (!stripePriceId) {
    return NextResponse.json(
      { error: "Missing STRIPE_PRICE_ID_MONTHLY configuration." },
      { status: 500 },
    );
  }

  const appUrl =
    process.env.NEXT_PUBLIC_APP_URL ??
    `${req.nextUrl.protocol}//${req.nextUrl.host}`;
  const stripe = getStripeServerClient();
  const clerkUser = await currentUser();

  const stripeCustomerId = await getOrCreateStripeCustomerId({
    stripe,
    clerkUserId: userId,
    email: clerkUser?.primaryEmailAddress?.emailAddress ?? null,
  });
  linkStripeCustomerToClerkUser(stripeCustomerId, userId);

  const existingRecord = getBillingRecord(userId);
  if (existingRecord.status === "pro") {
    return NextResponse.json({ alreadySubscribed: true, redirectTo: "/dashboard" });
  }

  const checkoutSession = await stripe.checkout.sessions.create({
    mode: "subscription",
    customer: stripeCustomerId,
    line_items: [{ price: stripePriceId, quantity: 1 }],
    success_url: `${appUrl}/dashboard/upgrade?success=1`,
    cancel_url: `${appUrl}/dashboard/upgrade?canceled=1`,
    metadata: {
      clerkUserId: userId,
    },
    subscription_data: {
      metadata: {
        clerkUserId: userId,
      },
    },
  });

  if (!checkoutSession.url) {
    return NextResponse.json(
      { error: "Unable to create Stripe checkout session." },
      { status: 500 },
    );
  }

  return NextResponse.json({ url: checkoutSession.url });
}
