"use client";

import Link from "next/link";
import { ReviewItem } from "@/components/test-results/review-item";
import { SummaryCards } from "@/components/test-results/summary-cards";
import { useTestSession } from "@/context/test-session-context";

export default function TestResultsPage() {
  const {
    questions,
    answers,
    flaggedQuestions,
    config,
    tutorialTimeRemainingSeconds,
    breakTimeRemainingSeconds,
    initialBreakBankSeconds,
    totalBreakSecondsUsed,
    totalAddedFromTutorialSeconds,
    totalAddedFromUnusedBlockSeconds,
  } = useTestSession();

  const totalQuestions = questions.length;
  const correctCount = questions.reduce((count, question) => {
    if (answers[question.id] === question.correctAnswer) {
      return count + 1;
    }

    return count;
  }, 0);
  const incorrectCount = Math.max(totalQuestions - correctCount, 0);
  const flaggedCount = Object.values(flaggedQuestions).filter(Boolean).length;
  const percentageCorrect =
    totalQuestions > 0 ? Math.round((correctCount / totalQuestions) * 100) : 0;

  function formatMinutes(totalSeconds: number) {
    return Math.floor(totalSeconds / 60);
  }

  return (
    <section className="mx-auto w-full max-w-5xl space-y-6">
      <header className="space-y-2 border-b border-border pb-4">
        <h1 className="text-2xl font-semibold tracking-tight sm:text-3xl">
          Test Results
        </h1>
        <p className="text-muted-foreground">
          Review your completed session question by question.
        </p>
      </header>

      {totalQuestions === 0 ? (
        <div className="rounded-md border border-border bg-card p-4 sm:p-5">
          <p className="text-muted-foreground">
            No completed session data found yet. Start a test to generate
            results.
          </p>
          <Link
            href="/test/setup"
            className="mt-4 inline-flex rounded-md border border-border px-4 py-2 text-sm font-medium transition-colors hover:bg-accent"
          >
            Go to Test Setup
          </Link>
        </div>
      ) : (
        <>
          <SummaryCards
            percentageCorrect={percentageCorrect}
            totalQuestions={totalQuestions}
            correctCount={correctCount}
            incorrectCount={incorrectCount}
            flaggedCount={flaggedCount}
          />

          {config ? (
            <section className="rounded-md border border-border bg-card p-4 sm:p-5">
              <h2 className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">
                Session Timing Summary
              </h2>
              <div className="mt-3 grid gap-2 text-sm text-muted-foreground sm:grid-cols-2">
                <p>
                  Tutorial used:{" "}
                  <span className="font-medium text-foreground">
                    {config.tutorialMinutes - formatMinutes(tutorialTimeRemainingSeconds)} min
                  </span>
                </p>
                <p>
                  Tutorial added to breaks:{" "}
                  <span className="font-medium text-foreground">
                    {formatMinutes(totalAddedFromTutorialSeconds)} min
                  </span>
                </p>
                <p>
                  Break used:{" "}
                  <span className="font-medium text-foreground">
                    {formatMinutes(totalBreakSecondsUsed)} min
                  </span>
                </p>
                <p>
                  Break remaining:{" "}
                  <span className="font-medium text-foreground">
                    {formatMinutes(breakTimeRemainingSeconds)} min
                  </span>
                </p>
                <p>
                  Initial break bank:{" "}
                  <span className="font-medium text-foreground">
                    {formatMinutes(initialBreakBankSeconds)} min
                  </span>
                </p>
                <p>
                  Unused block time added:{" "}
                  <span className="font-medium text-foreground">
                    {formatMinutes(totalAddedFromUnusedBlockSeconds)} min
                  </span>
                </p>
              </div>
            </section>
          ) : null}

          <section className="space-y-3">
            {questions.map((question, index) => (
              <ReviewItem
                key={`${question.id}-${index}`}
                question={question}
                questionNumber={index + 1}
                userAnswer={answers[question.id] ?? null}
                isCorrect={answers[question.id] === question.correctAnswer}
                isFlagged={!!flaggedQuestions[question.id]}
              />
            ))}
          </section>
        </>
      )}
    </section>
  );
}
