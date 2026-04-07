"use client";

import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useTestSession } from "@/context/test-session-context";
import { cn } from "@/lib/utils";
import { TEST_MODE_PRESETS } from "@/lib/test-setup";
import { useTestSetup } from "@/context/test-setup-context";

export default function TestSetupPage() {
  const router = useRouter();
  const {
    setup,
    selectedPreset,
    isHydrating,
    setPresetId,
    setBlockTransitionMode,
  } = useTestSetup();
  const { startSession } = useTestSession();

  function handleStartTest() {
    if (selectedPreset) {
      startSession({
        blocks: selectedPreset.blocks,
        questionsPerBlock: selectedPreset.questionsPerBlock,
        minutesPerBlock: selectedPreset.minutesPerBlock,
        blockTransitionMode: setup.blockTransitionMode,
      });
    }
    router.push("/test/session");
  }

  if (isHydrating) {
    return (
      <section className="space-y-4">
        <h1 className="text-3xl font-semibold tracking-tight">Test Setup</h1>
        <p className="text-muted-foreground">Loading your saved test setup...</p>
      </section>
    );
  }

  return (
    <section className="mx-auto w-full max-w-4xl space-y-8">
      <h1 className="text-3xl font-semibold tracking-tight">Test Setup</h1>

      <div className="grid gap-4 md:grid-cols-2">
        {TEST_MODE_PRESETS.map((preset) => {
          const isSelected = setup.presetId === preset.id;

          return (
            <button
              key={preset.id}
              type="button"
              onClick={() => setPresetId(preset.id)}
              className={cn("text-left", "focus-visible:outline-none")}
            >
              <Card
                className={cn(
                  "h-full border transition-colors",
                  isSelected
                    ? "border-primary bg-primary/5 ring-1 ring-primary/30"
                    : "border-border hover:border-primary/40",
                )}
              >
                <CardHeader>
                  <CardTitle className="flex items-center justify-between text-lg">
                    <span>{preset.label}</span>
                    <span
                      className={cn(
                        "rounded-full border px-2 py-0.5 text-xs",
                        isSelected
                          ? "border-primary text-primary"
                          : "border-border text-muted-foreground",
                      )}
                    >
                      {isSelected ? "Selected" : "Select"}
                    </span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-1 text-sm text-muted-foreground">
                  <p>{preset.blocks} blocks</p>
                  <p>{preset.questionsPerBlock} questions per block</p>
                  <p>{preset.minutesPerBlock} minutes per block</p>
                </CardContent>
              </Card>
            </button>
          );
        })}
      </div>

      <Card className="border-border">
        <CardHeader>
          <CardTitle className="text-lg">Block Transition</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <button
            type="button"
            onClick={() => setBlockTransitionMode("manual")}
            className={cn(
              "flex w-full items-center justify-between rounded-lg border px-4 py-3 text-left text-sm",
              setup.blockTransitionMode === "manual"
                ? "border-primary bg-primary/5"
                : "border-border hover:bg-muted/50",
            )}
          >
            <span>Move to the next block manually</span>
            <span className="text-xs text-muted-foreground">Recommended</span>
          </button>
          <button
            type="button"
            onClick={() => setBlockTransitionMode("auto")}
            className={cn(
              "flex w-full items-center justify-between rounded-lg border px-4 py-3 text-left text-sm",
              setup.blockTransitionMode === "auto"
                ? "border-primary bg-primary/5"
                : "border-border hover:bg-muted/50",
            )}
          >
            <span>Move to the next block automatically when time ends</span>
            <span className="text-xs text-muted-foreground">Timed flow</span>
          </button>
        </CardContent>
      </Card>

      <div className="flex items-center justify-between rounded-lg border border-border bg-muted/30 px-4 py-3">
        <p className="text-sm text-muted-foreground">
          Selected:{" "}
          <span className="font-medium text-foreground">
            {selectedPreset
              ? `${selectedPreset.blocks}x${selectedPreset.questionsPerBlock}, ${selectedPreset.minutesPerBlock} min/block`
              : "None"}
          </span>
        </p>
        <Button onClick={handleStartTest}>Start Test</Button>
      </div>
    </section>
  );
}
