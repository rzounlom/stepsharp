import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import type { Question } from "@/types/question";

type ReviewItemProps = {
  question: Question;
  questionNumber: number;
  userAnswer: string | null;
  isCorrect: boolean;
  isFlagged: boolean;
};

export function ReviewItem({
  question,
  questionNumber,
  userAnswer,
  isCorrect,
  isFlagged,
}: ReviewItemProps) {
  const selectedChoice = question.choices.find(
    (choice) => choice.label === userAnswer,
  );
  const correctChoice = question.choices.find(
    (choice) => choice.label === question.correctAnswer,
  );

  return (
    <Card className="border-border">
      <CardContent className="space-y-4 pt-5">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <p className="text-sm font-medium">Question {questionNumber}</p>
          <div className="flex items-center gap-2 text-xs">
            {isFlagged ? (
              <span className="rounded border border-border px-2 py-0.5 text-muted-foreground">
                Flagged
              </span>
            ) : null}
            <span
              className={cn(
                "rounded border px-2 py-0.5 font-medium",
                isCorrect
                  ? "border-emerald-200 bg-emerald-50 text-emerald-700"
                  : "border-rose-200 bg-rose-50 text-rose-700",
              )}
            >
              {isCorrect ? "Correct" : "Incorrect"}
            </span>
          </div>
        </div>

        <p className="leading-7">{question.stem}</p>

        <div className="space-y-2 text-sm">
          <p>
            <span className="font-medium">Your answer: </span>
            {selectedChoice ? (
              <span className={cn(!isCorrect && "text-rose-700")}>
                {selectedChoice.label}. {selectedChoice.text}
              </span>
            ) : (
              <span className="text-muted-foreground">No answer selected</span>
            )}
          </p>
          <p>
            <span className="font-medium">Correct answer: </span>
            <span className="text-emerald-700">
              {correctChoice
                ? `${correctChoice.label}. ${correctChoice.text}`
                : question.correctAnswer}
            </span>
          </p>
          <p>
            <span className="font-medium">Explanation: </span>
            {question.explanation}
          </p>
          <p>
            <span className="font-medium">Educational Objective: </span>
            {question.educationalObjective}
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
