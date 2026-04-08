"use client";

import { useEffect, useMemo, useState } from "react";
import { AnswerChoices } from "@/components/tutor/answer-choices";
import { ExplanationPanel } from "@/components/tutor/explanation-panel";
import { QuestionCard } from "@/components/tutor/question-card";
import { TutorNav } from "@/components/tutor/tutor-nav";
import { Button } from "@/components/ui/button";
import { getAllQuestions } from "@/lib/questions";
import type { Question } from "@/types/question";

type AnswerMap = Record<string, string>;
type SubmittedMap = Record<string, boolean>;

export default function TutorPage() {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<AnswerMap>({});
  const [submittedByQuestion, setSubmittedByQuestion] = useState<SubmittedMap>(
    {},
  );

  useEffect(() => {
    try {
      const loadedQuestions = getAllQuestions();
      setQuestions(loadedQuestions);
    } catch {
      setError("Unable to load tutor questions.");
    } finally {
      setIsLoading(false);
    }
  }, []);

  const currentQuestion = questions[currentIndex];

  const selectedAnswer = useMemo(() => {
    if (!currentQuestion) {
      return "";
    }

    return selectedAnswers[currentQuestion.id] ?? "";
  }, [currentQuestion, selectedAnswers]);

  const isSubmitted = useMemo(() => {
    if (!currentQuestion) {
      return false;
    }

    return submittedByQuestion[currentQuestion.id] ?? false;
  }, [currentQuestion, submittedByQuestion]);

  function handleSelectAnswer(choiceLabel: string) {
    if (!currentQuestion || isSubmitted) {
      return;
    }

    setSelectedAnswers((prev) => ({
      ...prev,
      [currentQuestion.id]: choiceLabel,
    }));
  }

  function handleSubmit() {
    if (!currentQuestion || !selectedAnswer || isSubmitted) {
      return;
    }

    setSubmittedByQuestion((prev) => ({
      ...prev,
      [currentQuestion.id]: true,
    }));
  }

  function handlePrevious() {
    setCurrentIndex((prev) => Math.max(0, prev - 1));
  }

  function handleNext() {
    setCurrentIndex((prev) => Math.min(questions.length - 1, prev + 1));
  }

  if (isLoading) {
    return (
      <section className="mx-auto w-full max-w-4xl space-y-4">
        <h1 className="text-3xl font-semibold tracking-tight">Tutor Mode</h1>
        <div className="rounded-lg border border-border bg-card p-5">
          <p className="text-muted-foreground">Loading questions...</p>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="mx-auto w-full max-w-4xl space-y-4">
        <h1 className="text-3xl font-semibold tracking-tight">Tutor Mode</h1>
        <div className="rounded-lg border border-rose-200 bg-rose-50/60 p-5">
          <p className="text-rose-700">{error}</p>
        </div>
      </section>
    );
  }

  if (!currentQuestion) {
    return (
      <section className="mx-auto w-full max-w-4xl space-y-4">
        <h1 className="text-3xl font-semibold tracking-tight">Tutor Mode</h1>
        <div className="rounded-lg border border-border bg-card p-5">
          <p className="text-muted-foreground">
            No questions available yet. Add questions in `data/questions.ts`.
          </p>
        </div>
      </section>
    );
  }

  return (
    <section className="mx-auto w-full max-w-4xl space-y-6">
      <header className="rounded-md border border-border bg-muted/20 px-4 py-3">
        <div className="flex items-center justify-between text-sm">
          <p className="font-medium tracking-tight">Tutor Mode</p>
          <p className="text-muted-foreground">
            Question {currentIndex + 1} of {questions.length}
          </p>
        </div>
      </header>

      <QuestionCard
        question={currentQuestion}
        questionNumber={currentIndex + 1}
        totalQuestions={questions.length}
      >
        <AnswerChoices
          choices={currentQuestion.choices}
          selectedAnswer={selectedAnswer}
          onSelect={handleSelectAnswer}
          disabled={isSubmitted}
        />

        <div className="flex items-center gap-3">
          <Button onClick={handleSubmit} disabled={!selectedAnswer || isSubmitted}>
            Submit
          </Button>
          <Button
            variant="outline"
            onClick={handleNext}
            disabled={currentIndex === questions.length - 1}
          >
            Next Question
          </Button>
        </div>

        {isSubmitted ? (
          <ExplanationPanel
            question={currentQuestion}
            selectedAnswer={selectedAnswer}
          />
        ) : null}

        <TutorNav
          onPrevious={handlePrevious}
          onNext={handleNext}
          disablePrevious={currentIndex === 0}
          disableNext={currentIndex === questions.length - 1}
        />
      </QuestionCard>
    </section>
  );
}
