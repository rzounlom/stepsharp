export type BlockTransitionMode = "manual" | "auto";

export type TestModePreset = {
  id: "mode-5x50" | "mode-10x20";
  label: string;
  blocks: number;
  questionsPerBlock: number;
  minutesPerBlock: number;
};

export type TestSetupState = {
  presetId: TestModePreset["id"];
  blockTransitionMode: BlockTransitionMode;
};
