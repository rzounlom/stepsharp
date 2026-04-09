export type QuestionChoice = {
  label: string;
  text: string;
};

export type Question = {
  id: string;
  /**
   * Legacy grouping for seed/local JSON. DB-backed rows use `examSourceId` + `questionNumber`.
   */
  blockId: string;
  stem: string;
  choices: QuestionChoice[];
  correctAnswer: string;
  explanation: string;
  educationalObjective: string;
  topic?: string;
  difficulty?: "easy" | "medium" | "hard";
  /** Present when loaded from Prisma (exam catalog). */
  examSourceId?: string;
  /** Order within the exam source; aligns with DB `questionNumber`. */
  questionNumber?: number;
};
