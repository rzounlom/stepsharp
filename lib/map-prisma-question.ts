import "server-only";
import type { QuestionDifficulty as PrismaDifficulty } from "@prisma/client";

/** Maps Prisma `QuestionDifficulty` to app `Question["difficulty"]` values. */
export function prismaDifficultyToApp(
  value: PrismaDifficulty | null | undefined,
): "easy" | "medium" | "hard" | undefined {
  if (value == null) {
    return undefined;
  }
  const map: Record<PrismaDifficulty, "easy" | "medium" | "hard"> = {
    EASY: "easy",
    MEDIUM: "medium",
    HARD: "hard",
  };
  return map[value];
}

/** Maps app difficulty to Prisma enum for writes. */
export function appDifficultyToPrisma(
  value: "easy" | "medium" | "hard" | undefined,
): PrismaDifficulty | undefined {
  if (value == null) {
    return undefined;
  }
  const map = {
    easy: "EASY",
    medium: "MEDIUM",
    hard: "HARD",
  } as const satisfies Record<"easy" | "medium" | "hard", PrismaDifficulty>;
  return map[value];
}
