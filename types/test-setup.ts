export type BlockTransitionMode = "manual" | "auto";

export type TestModePreset = {
  id: "step2-legacy" | "step2-new";
  label: string;
  blocks: number;
  questionsPerBlock: number;
  minutesPerBlock: number;
  minimumBreakMinutes: number;
  tutorialMinutes: number;
};

export type TestSetupState = {
  presetId: TestModePreset["id"];
  blockTransitionMode: BlockTransitionMode;
};
