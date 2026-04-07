import type { BlockTransitionMode } from "@/types/test-setup";
import type { Question } from "@/types/question";

export type SessionStatus =
  | "idle"
  | "in_progress"
  | "block_complete"
  | "finished";

export type TestSessionConfig = {
  blocks: number;
  questionsPerBlock: number;
  minutesPerBlock: number;
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
  status: SessionStatus;
};
