import { Card, CardContent, CardHeader } from "@/components/ui/card";
import type { Question } from "@/types/question";

type QuestionCardProps = {
  question: Question;
  questionNumber: number;
  totalQuestions: number;
  children: React.ReactNode;
};

export function QuestionCard({
  question,
  questionNumber,
  totalQuestions,
  children,
}: QuestionCardProps) {
  return (
    <Card className="border border-border">
      <CardHeader className="border-b border-border pb-3">
        <div className="flex flex-wrap items-center justify-between gap-2 text-xs text-muted-foreground">
          <span>Question {questionNumber}</span>
          <span>{totalQuestions} total</span>
        </div>
        <div className="mt-2 flex flex-wrap items-center justify-between gap-2 text-xs text-muted-foreground">
          <span>Block: {question.blockId}</span>
          {question.difficulty ? (
            <span className="rounded-full border border-border px-2 py-0.5">
              {question.difficulty}
            </span>
          ) : null}
        </div>
      </CardHeader>

      <CardContent className="space-y-6 p-4 sm:p-6">
        <p className="text-base leading-7 text-foreground sm:text-[1.05rem] sm:leading-8">
          {question.stem}
        </p>
        {children}
      </CardContent>
    </Card>
  );
}
