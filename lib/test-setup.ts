import type { TestModePreset, TestSetupState } from "@/types/test-setup";

export const TEST_MODE_PRESETS: TestModePreset[] = [
  {
    id: "mode-5x50",
    label: "Option 1",
    blocks: 5,
    questionsPerBlock: 50,
    minutesPerBlock: 75,
  },
  {
    id: "mode-10x20",
    label: "Option 2",
    blocks: 10,
    questionsPerBlock: 20,
    minutesPerBlock: 30,
  },
];

export const DEFAULT_TEST_SETUP: TestSetupState = {
  presetId: "mode-5x50",
  blockTransitionMode: "manual",
};

export const TEST_SETUP_STORAGE_KEY = "stepsharp.testSetup.v1";

export function getPresetById(id: TestModePreset["id"]) {
  return TEST_MODE_PRESETS.find((preset) => preset.id === id);
}
