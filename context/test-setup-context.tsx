"use client";

import { createContext, useContext, useEffect, useMemo, useState } from "react";
import {
  DEFAULT_TEST_SETUP,
  TEST_SETUP_STORAGE_KEY,
  getPresetById,
} from "@/lib/test-setup";
import type {
  BlockTransitionMode,
  TestModePreset,
  TestSetupState,
} from "@/types/test-setup";

type TestSetupContextValue = {
  setup: TestSetupState;
  selectedPreset?: TestModePreset;
  isHydrating: boolean;
  setPresetId: (presetId: TestModePreset["id"]) => void;
  setBlockTransitionMode: (mode: BlockTransitionMode) => void;
};

const TestSetupContext = createContext<TestSetupContextValue | undefined>(
  undefined,
);

export function TestSetupProvider({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const [setup, setSetup] = useState<TestSetupState>(DEFAULT_TEST_SETUP);
  const [isHydrating, setIsHydrating] = useState(true);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(TEST_SETUP_STORAGE_KEY);
      if (!raw) {
        return;
      }

      const parsed = JSON.parse(raw) as Partial<TestSetupState>;
      if (
        (parsed.presetId === "mode-5x50" || parsed.presetId === "mode-10x20") &&
        (parsed.blockTransitionMode === "manual" ||
          parsed.blockTransitionMode === "auto")
      ) {
        setSetup({
          presetId: parsed.presetId,
          blockTransitionMode: parsed.blockTransitionMode,
        });
      }
    } finally {
      setIsHydrating(false);
    }
  }, []);

  useEffect(() => {
    if (isHydrating) {
      return;
    }

    localStorage.setItem(TEST_SETUP_STORAGE_KEY, JSON.stringify(setup));
  }, [isHydrating, setup]);

  const selectedPreset = useMemo(
    () => getPresetById(setup.presetId),
    [setup.presetId],
  );

  function setPresetId(presetId: TestModePreset["id"]) {
    setSetup((prev) => ({ ...prev, presetId }));
  }

  function setBlockTransitionMode(mode: BlockTransitionMode) {
    setSetup((prev) => ({ ...prev, blockTransitionMode: mode }));
  }

  return (
    <TestSetupContext.Provider
      value={{
        setup,
        selectedPreset,
        isHydrating,
        setPresetId,
        setBlockTransitionMode,
      }}
    >
      {children}
    </TestSetupContext.Provider>
  );
}

export function useTestSetup() {
  const context = useContext(TestSetupContext);

  if (!context) {
    throw new Error("useTestSetup must be used within a TestSetupProvider");
  }

  return context;
}
