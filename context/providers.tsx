"use client";

import { AppContextProvider } from "@/context/app-context";
import { BillingProvider } from "@/context/billing-context";
import { TestSessionProvider } from "@/context/test-session-context";
import { TestSetupProvider } from "@/context/test-setup-context";

export function Providers({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <AppContextProvider>
      <BillingProvider>
        <TestSetupProvider>
          <TestSessionProvider>{children}</TestSessionProvider>
        </TestSetupProvider>
      </BillingProvider>
    </AppContextProvider>
  );
}
