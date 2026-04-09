"use client";

import Link from "next/link";
import { useBilling } from "@/context/billing-context";
import { DASHBOARD_MODE_CARDS } from "@/lib/constants";

export default function DashboardPage() {
  const { isSubscribed, isLoading } = useBilling();

  return (
    <section className="mx-auto w-full max-w-5xl space-y-6 sm:space-y-8">
      <header className="space-y-2 border-b border-border pb-4">
        <h1 className="text-2xl font-semibold tracking-tight sm:text-3xl">Dashboard</h1>
        <p className="text-muted-foreground">
          Choose a mode to continue your learning session.
        </p>
      </header>

      <div className="grid gap-4 md:grid-cols-2">
        {DASHBOARD_MODE_CARDS.map((card) => (
          <article
            key={card.title}
            className="rounded-xl border border-border bg-card p-5 sm:p-6"
          >
            <h2 className="text-xl font-semibold">{card.title}</h2>
            <p className="mt-2 text-[0.95rem] leading-6 text-muted-foreground">
              {card.description}
            </p>
            <Link
              href={card.href}
              className="mt-6 inline-flex min-h-10 w-full items-center justify-center rounded-md border border-border bg-background px-4 text-sm font-medium transition-colors hover:bg-muted sm:w-auto"
            >
              {card.ctaLabel}
            </Link>
          </article>
        ))}
      </div>

      <article className="rounded-xl border border-border bg-card p-5 sm:p-6">
        <h2 className="text-lg font-semibold">Subscription</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          {isLoading
            ? "Checking your plan..."
            : isSubscribed
              ? "You are on StepSharp Pro."
              : "You are on the free plan. Upgrade to unlock full Test Mode."}
        </p>
        <Link
          href="/dashboard/upgrade"
          className="mt-4 inline-flex min-h-10 items-center justify-center rounded-md border border-border bg-background px-4 text-sm font-medium transition-colors hover:bg-muted"
        >
          {isSubscribed ? "Manage Plan" : "Upgrade to Pro"}
        </Link>
      </article>
    </section>
  );
}
