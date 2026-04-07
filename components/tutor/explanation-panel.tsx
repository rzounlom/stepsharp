import { cn } from "@/lib/utils";
import type { Question } from "@/types/question";

type ExplanationPanelProps = {
  question: Question;
  selectedAnswer: string;
};

export function ExplanationPanel({
  question,
  selectedAnswer,
}: ExplanationPanelProps) {
  const isCorrect = selectedAnswer === question.correctAnswer;

  return (
    <section
      className={cn(
        "space-y-3 rounded-lg border p-4",
        isCorrect
          ? "border-emerald-200 bg-emerald-50/70"
          : "border-amber-200 bg-amber-50/70",
      )}
    >
      <p className={cn("font-semibold", isCorrect ? "text-emerald-700" : "text-amber-700")}>
        {isCorrect ? "Correct" : "Incorrect"}
      </p>
      <div className="space-y-2 text-sm">
        <p>
          <span className="font-medium">Your answer: </span>
          <span className={cn(!isCorrect && "text-amber-800")}>{selectedAnswer}</span>
        </p>
        <p>
          <span className="font-medium">Correct answer: </span>
          <span className="rounded bg-emerald-100 px-2 py-0.5 font-semibold text-emerald-700">
            {question.correctAnswer}
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
    </section>
  );
}
