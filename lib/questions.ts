import { questions } from "@/data/questions";
import type { Question } from "@/types/question";

export function getAllQuestions(): Question[] {
  return questions;
}

export function getQuestionsByBlock(blockId: string): Question[] {
  return questions.filter((question) => question.blockId === blockId);
}

export function getQuestionById(id: string): Question | undefined {
  return questions.find((question) => question.id === id);
}
