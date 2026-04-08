import { Card, CardContent } from "@/components/ui/card";

type SummaryCardsProps = {
  percentageCorrect: number;
  totalQuestions: number;
  correctCount: number;
  incorrectCount: number;
  flaggedCount: number;
};

export function SummaryCards({
  percentageCorrect,
  totalQuestions,
  correctCount,
  incorrectCount,
  flaggedCount,
}: SummaryCardsProps) {
  return (
    <section className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
      <Card className="border-border">
        <CardContent className="space-y-1 p-4">
          <p className="text-xs uppercase tracking-wide text-muted-foreground">
            Score
          </p>
          <p className="text-2xl font-semibold">{percentageCorrect}%</p>
          <p className="text-sm text-muted-foreground">
            {correctCount} / {totalQuestions}
          </p>
        </CardContent>
      </Card>
      <Card className="border-border">
        <CardContent className="space-y-1 p-4">
          <p className="text-xs uppercase tracking-wide text-muted-foreground">
            Correct
          </p>
          <p className="text-2xl font-semibold text-emerald-700">{correctCount}</p>
        </CardContent>
      </Card>
      <Card className="border-border">
        <CardContent className="space-y-1 p-4">
          <p className="text-xs uppercase tracking-wide text-muted-foreground">
            Incorrect
          </p>
          <p className="text-2xl font-semibold text-rose-700">{incorrectCount}</p>
        </CardContent>
      </Card>
      <Card className="border-border">
        <CardContent className="space-y-1 p-4">
          <p className="text-xs uppercase tracking-wide text-muted-foreground">
            Flagged
          </p>
          <p className="text-2xl font-semibold">{flaggedCount}</p>
        </CardContent>
      </Card>
    </section>
  );
}
