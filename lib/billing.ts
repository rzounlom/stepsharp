import type { TestSessionConfig } from "@/types/test-session";

export const FREE_TEST_LIMITS = {
  blocks: 1,
  questionsPerBlock: 10,
} as const;

export function applyTestAccessGating(
  config: TestSessionConfig,
  isSubscribed: boolean,
): TestSessionConfig {
  if (isSubscribed) {
    return config;
  }

  return {
    ...config,
    blocks: Math.min(config.blocks, FREE_TEST_LIMITS.blocks),
    questionsPerBlock: Math.min(
      config.questionsPerBlock,
      FREE_TEST_LIMITS.questionsPerBlock,
    ),
  };
}
