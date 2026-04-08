import type { BlockTransitionMode } from "@/types/test-setup";
import type { Question } from "@/types/question";

export type SessionStatus =
  | "idle"
  | "tutorial"
  | "in_progress"
  | "block_complete"
  | "break"
  | "finished";

export type BlockCompleteReason = "timer_expired" | "ended_early" | null;

export type TestSessionConfig = {
  blocks: number;
  questionsPerBlock: number;
  minutesPerBlock: number;
  minimumBreakMinutes: number;
  tutorialMinutes: number;
  blockTransitionMode: BlockTransitionMode;
};

export type TestSessionState = {
  config: TestSessionConfig | null;
  questions: Question[];
  currentQuestionIndex: number;
  currentBlock: number;
  answers: Record<string, string>;
  flaggedQuestions: Record<string, boolean>;
  blockTimeRemainingSeconds: number;
  tutorialTimeRemainingSeconds: number;
  breakTimeRemainingSeconds: number;
  initialBreakBankSeconds: number;
  totalBreakSecondsUsed: number;
  totalAddedFromTutorialSeconds: number;
  totalAddedFromUnusedBlockSeconds: number;
  status: SessionStatus;
  blockCompleteReason: BlockCompleteReason;
};
