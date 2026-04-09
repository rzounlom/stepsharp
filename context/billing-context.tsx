"use client";

import { useAuth } from "@clerk/nextjs";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

type BillingStatus = "free" | "pro";

type BillingContextValue = {
  status: BillingStatus;
  isSubscribed: boolean;
  isLoading: boolean;
  refreshBilling: () => Promise<void>;
};

const BillingContext = createContext<BillingContextValue | undefined>(undefined);

export function BillingProvider({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const { isSignedIn } = useAuth();
  const [status, setStatus] = useState<BillingStatus>("free");
  const [isLoading, setIsLoading] = useState(true);

  const refreshBilling = useCallback(async () => {
    if (!isSignedIn) {
      setStatus("free");
      setIsLoading(false);
      return;
    }

    setIsLoading(true);
    try {
      const res = await fetch("/api/billing/status", { cache: "no-store" });
      if (!res.ok) {
        setStatus("free");
        return;
      }

      const data = (await res.json()) as { status?: BillingStatus };
      setStatus(data.status === "pro" ? "pro" : "free");
    } catch {
      setStatus("free");
    } finally {
      setIsLoading(false);
    }
  }, [isSignedIn]);

  useEffect(() => {
    void refreshBilling();
  }, [refreshBilling]);

  const value = useMemo<BillingContextValue>(
    () => ({
      status,
      isSubscribed: status === "pro",
      isLoading,
      refreshBilling,
    }),
    [isLoading, refreshBilling, status],
  );

  return <BillingContext.Provider value={value}>{children}</BillingContext.Provider>;
}

export function useBilling() {
  const context = useContext(BillingContext);
  if (!context) {
    throw new Error("useBilling must be used within a BillingProvider");
  }

  return context;
}
