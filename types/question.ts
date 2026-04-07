export type QuestionChoice = {
  label: string;
  text: string;
};

export type Question = {
  id: string;
  blockId: string;
  stem: string;
  choices: QuestionChoice[];
  correctAnswer: string;
  explanation: string;
  educationalObjective: string;
  topic?: string;
  difficulty?: "easy" | "medium" | "hard";
};
