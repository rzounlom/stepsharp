"use client";

import Link from "next/link";
import { useTestSetup } from "@/context/test-setup-context";

export default function TestSessionPage() {
  const { selectedPreset, setup, isHydrating } = useTestSetup();

  return (
    <section className="space-y-4">
      <h1 className="text-3xl font-semibold tracking-tight">Test Session</h1>
      <p className="max-w-2xl text-muted-foreground">
        Session screen placeholder for timed questions and answer submission.
      </p>
      <div className="max-w-2xl rounded-lg border border-border bg-muted/30 p-4 text-sm">
        {isHydrating ? (
          <p className="text-muted-foreground">Loading test setup...</p>
        ) : selectedPreset ? (
          <div className="space-y-1">
            <p>
              <span className="font-medium">Mode: </span>
              {selectedPreset.blocks} blocks, {selectedPreset.questionsPerBlock}{" "}
              questions/block, {selectedPreset.minutesPerBlock} minutes/block
            </p>
            <p>
              <span className="font-medium">Block transition: </span>
              {setup.blockTransitionMode === "manual"
                ? "Manual"
                : "Automatic on time expiration"}
            </p>
          </div>
        ) : (
          <p className="text-muted-foreground">
            No setup selected. Return to setup to configure this session.
          </p>
        )}
      </div>
      <Link
        href="/test/results"
        className="inline-flex rounded-md border border-border px-4 py-2 text-sm font-medium transition-colors hover:bg-accent"
      >
        Finish and View Results
      </Link>
    </section>
  );
}
