import "server-only";
import type { Prisma } from "@prisma/client";
import { SubscriptionStatus } from "@prisma/client";
import type Stripe from "stripe";
import { prisma } from "@/lib/prisma";

export type BillingStatus = "free" | "pro";

type BillingRecord = {
  id: string;
  clerkUserId: string;
  stripeCustomerId: string | null;
  stripeSubscriptionId: string | null;
  status: BillingStatus;
  createdAt: Date;
  updatedAt: Date;
};

function fromSubscriptionStatus(status: SubscriptionStatus): BillingStatus {
  return status === SubscriptionStatus.PRO ? "pro" : "free";
}

function toSubscriptionStatus(status: BillingStatus): SubscriptionStatus {
  return status === "pro" ? SubscriptionStatus.PRO : SubscriptionStatus.FREE;
}

function normalizeRecord(record: {
  id: string;
  clerkUserId: string;
  stripeCustomerId: string | null;
  stripeSubscriptionId: string | null;
  subscriptionStatus: SubscriptionStatus;
  createdAt: Date;
  updatedAt: Date;
}): BillingRecord {
  return {
    id: record.id,
    clerkUserId: record.clerkUserId,
    stripeCustomerId: record.stripeCustomerId,
    stripeSubscriptionId: record.stripeSubscriptionId,
    status: fromSubscriptionStatus(record.subscriptionStatus),
    createdAt: record.createdAt,
    updatedAt: record.updatedAt,
  };
}

type DbClient = Prisma.TransactionClient | typeof prisma;

function getDb(tx?: Prisma.TransactionClient): DbClient {
  return tx ?? prisma;
}

export async function getBillingRecord(clerkUserId: string): Promise<BillingRecord> {
  const record = await prisma.billingSubscription.upsert({
    where: { clerkUserId },
    update: {},
    create: {
      clerkUserId,
      subscriptionStatus: SubscriptionStatus.FREE,
    },
  });

  return normalizeRecord(record);
}

export async function getOrCreateStripeCustomerId(params: {
  stripe: Stripe;
  clerkUserId: string;
  email?: string | null;
}) {
  const { stripe, clerkUserId, email } = params;
  const record = await getBillingRecord(clerkUserId);
  if (record.stripeCustomerId) {
    return record.stripeCustomerId;
  }

  const customer = await stripe.customers.create({
    email: email ?? undefined,
    metadata: {
      clerkUserId,
    },
  });

  await prisma.billingSubscription.update({
    where: { clerkUserId },
    data: {
      stripeCustomerId: customer.id,
    },
  });

  return customer.id;
}

export async function setSubscriptionByCustomerId(
  params: {
    stripeCustomerId: string;
    stripeSubscriptionId: string | null;
    status: BillingStatus;
  },
  tx?: Prisma.TransactionClient,
) {
  const { stripeCustomerId, stripeSubscriptionId, status } = params;
  const db = getDb(tx);
  await db.billingSubscription.updateMany({
    where: { stripeCustomerId },
    data: {
      stripeSubscriptionId,
      subscriptionStatus: toSubscriptionStatus(status),
    },
  });
}

export async function linkStripeCustomerToClerkUser(
  stripeCustomerId: string,
  clerkUserId: string,
  tx?: Prisma.TransactionClient,
) {
  const db = getDb(tx);
  await db.billingSubscription.upsert({
    where: { clerkUserId },
    update: {
      stripeCustomerId,
    },
    create: {
      clerkUserId,
      stripeCustomerId,
      subscriptionStatus: SubscriptionStatus.FREE,
    },
  });
}

function isProStripeSubscriptionStatus(status: Stripe.Subscription.Status) {
  return status === "active" || status === "trialing" || status === "past_due";
}

/**
 * Applies subscription side-effects for a verified Stripe webhook event.
 * Must run inside a transaction that also inserts `StripeProcessedWebhookEvent`.
 */
export async function applyStripeWebhookEvent(
  tx: Prisma.TransactionClient,
  event: Stripe.Event,
) {
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
      await linkStripeCustomerToClerkUser(customerId, clerkUserId, tx);
      await setSubscriptionByCustomerId(
        {
          stripeCustomerId: customerId,
          stripeSubscriptionId: subscriptionId,
          status: "pro",
        },
        tx,
      );
    }
    return;
  }

  if (
    event.type === "customer.subscription.created" ||
    event.type === "customer.subscription.updated"
  ) {
    const subscription = event.data.object as Stripe.Subscription;
    const customerId =
      typeof subscription.customer === "string"
        ? subscription.customer
        : subscription.customer.id;

    await setSubscriptionByCustomerId(
      {
        stripeCustomerId: customerId,
        stripeSubscriptionId: subscription.id,
        status: isProStripeSubscriptionStatus(subscription.status) ? "pro" : "free",
      },
      tx,
    );
    return;
  }

  if (event.type === "customer.subscription.deleted") {
    const subscription = event.data.object as Stripe.Subscription;
    const customerId =
      typeof subscription.customer === "string"
        ? subscription.customer
        : subscription.customer.id;

    await setSubscriptionByCustomerId(
      {
        stripeCustomerId: customerId,
        stripeSubscriptionId: subscription.id,
        status: "free",
      },
      tx,
    );
  }
}
