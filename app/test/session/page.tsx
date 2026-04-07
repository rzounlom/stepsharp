"use client";

import Link from "next/link";
import { useEffect, useMemo } from "react";
import { useRouter } from "next/navigation";
import { AnswerChoices } from "@/components/tutor/answer-choices";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useTestSession } from "@/context/test-session-context";
import { useTestSetup } from "@/context/test-setup-context";
import { cn } from "@/lib/utils";

export default function TestSessionPage() {
  const router = useRouter();
  const { selectedPreset, setup, isHydrating } = useTestSetup();
  const {
    config,
    questions,
    currentQuestionIndex,
    currentBlock,
    answers,
    flaggedQuestions,
    blockTimeRemainingSeconds,
    status,
    blockCompleteReason,
    startSession,
    selectAnswer,
    goToQuestion,
    toggleFlag,
    endBlockEarly,
    nextBlock,
  } = useTestSession();

  useEffect(() => {
    if (isHydrating) {
      return;
    }

    if (status === "idle" && selectedPreset) {
      startSession({
        blocks: selectedPreset.blocks,
        questionsPerBlock: selectedPreset.questionsPerBlock,
        minutesPerBlock: selectedPreset.minutesPerBlock,
        blockTransitionMode: setup.blockTransitionMode,
      });
    }
  }, [isHydrating, selectedPreset, setup.blockTransitionMode, startSession, status]);

  useEffect(() => {
    if (status === "finished") {
      router.push("/test/results");
    }
  }, [router, status]);

  useEffect(() => {
    if (status !== "block_complete" || !config) {
      return;
    }

    if (config.blockTransitionMode === "auto") {
      nextBlock();
    }
  }, [config, nextBlock, status]);

  const blockQuestionRange = useMemo(() => {
    if (!config) {
      return { start: 0, end: 0 };
    }

    const start = (currentBlock - 1) * config.questionsPerBlock;
    const end = Math.min(start + config.questionsPerBlock, questions.length);
    return { start, end };
  }, [config, currentBlock, questions.length]);

  const currentQuestion = questions[currentQuestionIndex];
  const questionNumberInBlock =
    currentQuestionIndex - blockQuestionRange.start + 1;
  const selectedAnswer = currentQuestion ? answers[currentQuestion.id] ?? "" : "";
  const isFlagged = currentQuestion ? !!flaggedQuestions[currentQuestion.id] : false;

  const canGoPrevious = currentQuestionIndex > blockQuestionRange.start;
  const canGoNext = currentQuestionIndex < blockQuestionRange.end - 1;
  const currentBlockQuestions = questions.slice(
    blockQuestionRange.start,
    blockQuestionRange.end,
  );

  useEffect(() => {
    if (!config || status === "block_complete" || questions.length === 0) {
      return;
    }

    if (
      currentQuestionIndex < blockQuestionRange.start ||
      currentQuestionIndex >= blockQuestionRange.end
    ) {
      goToQuestion(blockQuestionRange.start);
    }
  }, [
    blockQuestionRange.end,
    blockQuestionRange.start,
    config,
    currentQuestionIndex,
    goToQuestion,
    questions.length,
    status,
  ]);

  function formatSeconds(totalSeconds: number) {
    const minutes = Math.floor(totalSeconds / 60)
      .toString()
      .padStart(2, "0");
    const seconds = (totalSeconds % 60).toString().padStart(2, "0");
    return `${minutes}:${seconds}`;
  }

  return (
    <section className="mx-auto w-full max-w-5xl space-y-6">
      {isHydrating ? (
        <p className="text-sm text-muted-foreground">Loading test setup...</p>
      ) : null}

      {!isHydrating && !selectedPreset && status === "idle" ? (
        <Card>
          <CardContent className="space-y-4 pt-6">
            <h1 className="text-2xl font-semibold tracking-tight">
              No Active Test Session
            </h1>
            <p className="text-muted-foreground">
              You need to configure a test before starting a session.
            </p>
            <Link
              href="/test/setup"
              className="inline-flex rounded-md border border-border px-4 py-2 text-sm font-medium transition-colors hover:bg-accent"
            >
              Go to Test Setup
            </Link>
          </CardContent>
        </Card>
      ) : null}

      {config && questions.length === 0 ? (
        <Card>
          <CardContent className="space-y-4 pt-6">
            <h1 className="text-2xl font-semibold tracking-tight">
              No Questions Available
            </h1>
            <p className="text-muted-foreground">
              The current test session has no questions. Return to setup and try
              again.
            </p>
            <Link
              href="/test/setup"
              className="inline-flex rounded-md border border-border px-4 py-2 text-sm font-medium transition-colors hover:bg-accent"
            >
              Back to Test Setup
            </Link>
          </CardContent>
        </Card>
      ) : null}

      {config && questions.length > 0 && !currentQuestion && status !== "block_complete" ? (
        <Card>
          <CardContent className="space-y-4 pt-6">
            <h1 className="text-2xl font-semibold tracking-tight">
              Loading Current Question
            </h1>
            <p className="text-muted-foreground">
              Please wait while the current block question is prepared.
            </p>
          </CardContent>
        </Card>
      ) : null}

      {config && currentQuestion && status !== "block_complete" ? (
        <>
          <header className="flex flex-wrap items-center justify-between gap-3 rounded-lg border border-border bg-muted/20 px-4 py-3 text-sm">
            <div className="flex items-center gap-6">
              <p>
                <span className="font-medium">Block:</span> {currentBlock} /{" "}
                {config.blocks}
              </p>
              <p>
                <span className="font-medium">Question:</span>{" "}
                {questionNumberInBlock} / {config.questionsPerBlock}
              </p>
            </div>
            <p className="font-semibold tabular-nums">
              Time Left: {formatSeconds(blockTimeRemainingSeconds)}
            </p>
          </header>

          <Card className="border border-border">
            <CardContent className="space-y-3 pt-4">
              <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                Current Block Questions
              </p>
              <div className="flex flex-wrap gap-2">
                {currentBlockQuestions.map((question, index) => {
                  const absoluteIndex = blockQuestionRange.start + index;
                  const isCurrent = absoluteIndex === currentQuestionIndex;
                  const isAnswered = !!answers[question.id];
                  const isQuestionFlagged = !!flaggedQuestions[question.id];

                  return (
                    <button
                      key={`${question.id}-${absoluteIndex}`}
                      type="button"
                      onClick={() => goToQuestion(absoluteIndex)}
                      className={cn(
                        "inline-flex h-8 min-w-8 items-center justify-center rounded-md border px-2 text-xs font-medium",
                        "transition-colors hover:bg-muted/50",
                        isCurrent && "border-primary bg-primary/10 text-primary",
                        !isCurrent &&
                          isAnswered &&
                          "border-emerald-300 bg-emerald-50 text-emerald-700",
                        !isCurrent &&
                          !isAnswered &&
                          "border-border text-muted-foreground",
                        isQuestionFlagged &&
                          "border-amber-400 ring-1 ring-amber-400 ring-offset-1 ring-offset-background",
                      )}
                      aria-label={`Go to question ${index + 1} in block`}
                    >
                      {index + 1}
                      {isQuestionFlagged ? (
                        <span className="ml-1 text-[10px] leading-none text-amber-700">
                          *
                        </span>
                      ) : null}
                    </button>
                  );
                })}
              </div>
              <div className="flex flex-wrap items-center gap-3 text-xs text-muted-foreground">
                <span>Current: blue</span>
                <span>Answered: green</span>
                <span>Flagged: amber ring</span>
              </div>
            </CardContent>
          </Card>

          <Card className="border border-border">
            <CardContent className="space-y-6 pt-6">
              <p className="text-lg leading-8">{currentQuestion.stem}</p>

              <AnswerChoices
                choices={currentQuestion.choices}
                selectedAnswer={selectedAnswer}
                onSelect={(answer) => selectAnswer(currentQuestion.id, answer)}
              />
            </CardContent>
          </Card>

          <div className="flex flex-wrap items-center justify-between gap-3 border-t border-border pt-3">
            <div className="flex items-center gap-2">
              <Button
                variant={isFlagged ? "default" : "outline"}
                onClick={() => toggleFlag(currentQuestion.id)}
              >
                {isFlagged ? "Flagged" : "Mark/Flag"}
              </Button>
              <Button variant="outline" disabled>
                Pause (Soon)
              </Button>
              <Button variant="outline" disabled>
                Block Summary (Soon)
              </Button>
              <Button variant="outline" onClick={endBlockEarly}>
                End Block Early
              </Button>
            </div>

            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                onClick={() => goToQuestion(currentQuestionIndex - 1)}
                disabled={!canGoPrevious}
              >
                Previous
              </Button>
              <Button
                variant="outline"
                onClick={() => goToQuestion(currentQuestionIndex + 1)}
                disabled={!canGoNext}
              >
                Next
              </Button>
            </div>
          </div>
        </>
      ) : null}

      {status === "block_complete" && config ? (
        <Card>
          <CardContent className="space-y-4 pt-6">
            <h2 className="text-2xl font-semibold tracking-tight">Block Complete</h2>
            <p className="text-muted-foreground">
              {blockCompleteReason === "ended_early"
                ? `You ended Block ${currentBlock} early. Continue when you are ready.`
                : `Time has ended for Block ${currentBlock}. Continue when you are ready.`}
            </p>
            <Button onClick={nextBlock}>Start Next Block</Button>
          </CardContent>
        </Card>
      ) : null}
    </section>
  );
}
