import type { ModeCard } from "@/types";

export const DASHBOARD_MODE_CARDS: ModeCard[] = [
  {
    title: "Tutor Mode",
    description:
      "Practice concepts with guided prompts and targeted feedback.",
    href: "/tutor",
    ctaLabel: "Open Tutor",
  },
  {
    title: "Test Mode",
    description:
      "Run timed sessions and review performance with actionable insights.",
    href: "/test/setup",
    ctaLabel: "Start Test",
  },
];
