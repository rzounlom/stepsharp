"use client";

import { AppContextProvider } from "@/context/app-context";
import { TestSetupProvider } from "@/context/test-setup-context";

export function Providers({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <AppContextProvider>
      <TestSetupProvider>{children}</TestSetupProvider>
    </AppContextProvider>
  );
}
