import type { TestModePreset, TestSetupState } from "@/types/test-setup";

export const TEST_MODE_PRESETS: TestModePreset[] = [
  {
    id: "step2-legacy",
    label: "Step 2 CK (Legacy: before May 7, 2026)",
    blocks: 8,
    questionsPerBlock: 40,
    minutesPerBlock: 60,
    minimumBreakMinutes: 45,
    tutorialMinutes: 15,
  },
  {
    id: "step2-new",
    label: "Step 2 CK (New: May 7, 2026 and later)",
    blocks: 16,
    questionsPerBlock: 20,
    minutesPerBlock: 30,
    minimumBreakMinutes: 55,
    tutorialMinutes: 5,
  },
];

export const DEFAULT_TEST_SETUP: TestSetupState = {
  presetId: "step2-new",
  blockTransitionMode: "manual",
};

export const TEST_SETUP_STORAGE_KEY = "stepsharp.testSetup.v1";

export function getPresetById(id: TestModePreset["id"]) {
  return TEST_MODE_PRESETS.find((preset) => preset.id === id);
}
