"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useBilling } from "@/context/billing-context";
import { useSearchParams } from "next/navigation";

export default function UpgradePage() {
  const { isSubscribed, isLoading, refreshBilling } = useBilling();
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const searchParams = useSearchParams();

  const wasSuccessful = searchParams.get("success") === "1";
  const wasCanceled = searchParams.get("canceled") === "1";

  useEffect(() => {
    if (wasSuccessful) {
      void refreshBilling();
    }
  }, [refreshBilling, wasSuccessful]);

  async function handleUpgrade() {
    setError(null);
    setIsCheckingOut(true);
    try {
      const res = await fetch("/api/billing/checkout", {
        method: "POST",
      });
      const data = (await res.json()) as {
        url?: string;
        redirectTo?: string;
        error?: string;
      };

      if (!res.ok) {
        throw new Error(data.error ?? "Unable to start checkout.");
      }

      if (data.redirectTo) {
        await refreshBilling();
        window.location.href = data.redirectTo;
        return;
      }

      if (!data.url) {
        throw new Error("Missing checkout URL from billing API.");
      }

      window.location.href = data.url;
    } catch (checkoutError) {
      setError(
        checkoutError instanceof Error
          ? checkoutError.message
          : "Unable to start checkout.",
      );
      setIsCheckingOut(false);
    }
  }

  return (
    <section className="mx-auto w-full max-w-3xl space-y-6">
      <header className="space-y-2 border-b border-border pb-4">
        <h1 className="text-2xl font-semibold tracking-tight sm:text-3xl">
          Upgrade to StepSharp Pro
        </h1>
        <p className="text-muted-foreground">
          Unlock full Test Mode to run the complete Step-style exam simulation.
        </p>
      </header>

      <Card className="border-border">
        <CardHeader>
          <CardTitle className="text-xl">StepSharp Pro</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-3xl font-semibold tracking-tight">
            $25
            <span className="text-base font-normal text-muted-foreground">
              /month
            </span>
          </p>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li>Full Test Mode access</li>
            <li>Complete block and question coverage</li>
            <li>Priority future analytics features</li>
          </ul>

          {wasSuccessful ? (
            <p className="rounded-md border border-emerald-200 bg-emerald-50 p-3 text-sm text-emerald-700">
              Payment completed. Your subscription should be active shortly.
            </p>
          ) : null}
          {wasCanceled ? (
            <p className="rounded-md border border-border bg-muted/40 p-3 text-sm text-muted-foreground">
              Checkout was canceled. You can try again any time.
            </p>
          ) : null}
          {error ? (
            <p className="rounded-md border border-rose-200 bg-rose-50 p-3 text-sm text-rose-700">
              {error}
            </p>
          ) : null}

          <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
            <Button
              onClick={handleUpgrade}
              disabled={isCheckingOut || isLoading || isSubscribed}
              className="min-h-10 w-full sm:w-auto"
            >
              {isSubscribed
                ? "You are on Pro"
                : isCheckingOut
                  ? "Redirecting..."
                  : "Upgrade to Pro"}
            </Button>
            <Link
              href="/dashboard"
              className="inline-flex min-h-10 items-center justify-center rounded-md border border-border px-4 text-sm font-medium transition-colors hover:bg-accent"
            >
              Back to Dashboard
            </Link>
          </div>
        </CardContent>
      </Card>
    </section>
  );
}
