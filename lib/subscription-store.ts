import "server-only";
import type Stripe from "stripe";

export type BillingStatus = "free" | "pro";

type BillingRecord = {
  clerkUserId: string;
  stripeCustomerId: string | null;
  stripeSubscriptionId: string | null;
  status: BillingStatus;
};

const billingByClerkUserId = new Map<string, BillingRecord>();
const clerkUserIdByStripeCustomerId = new Map<string, string>();

function ensureRecord(clerkUserId: string) {
  const existing = billingByClerkUserId.get(clerkUserId);
  if (existing) {
    return existing;
  }

  const created: BillingRecord = {
    clerkUserId,
    stripeCustomerId: null,
    stripeSubscriptionId: null,
    status: "free",
  };
  billingByClerkUserId.set(clerkUserId, created);
  return created;
}

export function getBillingRecord(clerkUserId: string): BillingRecord {
  return ensureRecord(clerkUserId);
}

export async function getOrCreateStripeCustomerId(params: {
  stripe: Stripe;
  clerkUserId: string;
  email?: string | null;
}) {
  const { stripe, clerkUserId, email } = params;
  const record = ensureRecord(clerkUserId);
  if (record.stripeCustomerId) {
    return record.stripeCustomerId;
  }

  const customer = await stripe.customers.create({
    email: email ?? undefined,
    metadata: {
      clerkUserId,
    },
  });

  record.stripeCustomerId = customer.id;
  clerkUserIdByStripeCustomerId.set(customer.id, clerkUserId);
  billingByClerkUserId.set(clerkUserId, record);
  return customer.id;
}

export function setSubscriptionByCustomerId(params: {
  stripeCustomerId: string;
  stripeSubscriptionId: string | null;
  status: BillingStatus;
}) {
  const { stripeCustomerId, stripeSubscriptionId, status } = params;
  const clerkUserId = clerkUserIdByStripeCustomerId.get(stripeCustomerId);
  if (!clerkUserId) {
    return;
  }

  const record = ensureRecord(clerkUserId);
  record.stripeCustomerId = stripeCustomerId;
  record.stripeSubscriptionId = stripeSubscriptionId;
  record.status = status;
  billingByClerkUserId.set(clerkUserId, record);
}

export function linkStripeCustomerToClerkUser(
  stripeCustomerId: string,
  clerkUserId: string,
) {
  const record = ensureRecord(clerkUserId);
  record.stripeCustomerId = stripeCustomerId;
  billingByClerkUserId.set(clerkUserId, record);
  clerkUserIdByStripeCustomerId.set(stripeCustomerId, clerkUserId);
}
