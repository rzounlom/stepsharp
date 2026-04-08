import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import type { QuestionChoice } from "@/types/question";
import { cn } from "@/lib/utils";

type AnswerChoicesProps = {
  choices: QuestionChoice[];
  selectedAnswer: string;
  onSelect: (choiceLabel: string) => void;
  disabled?: boolean;
};

export function AnswerChoices({
  choices,
  selectedAnswer,
  onSelect,
  disabled = false,
}: AnswerChoicesProps) {
  return (
    <RadioGroup
      value={selectedAnswer}
      onValueChange={onSelect}
      className="gap-3"
      disabled={disabled}
    >
      {choices.map((choice) => {
        const isSelected = selectedAnswer === choice.label;

        return (
          <label
            key={choice.label}
            htmlFor={`choice-${choice.label}`}
            className={cn(
              "flex min-h-12 cursor-pointer items-start gap-3 rounded-md border border-border p-3 transition-colors sm:p-3.5",
              "hover:bg-muted/50",
              isSelected && "border-primary bg-primary/5",
              disabled && "cursor-not-allowed opacity-80 hover:bg-transparent",
            )}
          >
            <RadioGroupItem
              id={`choice-${choice.label}`}
              value={choice.label}
              className="mt-1"
            />
            <div className="space-y-0.5">
              <p className="text-sm font-semibold tracking-tight">{choice.label}.</p>
              <p className="text-sm leading-6 text-foreground/90 sm:text-[0.95rem]">
                {choice.text}
              </p>
            </div>
          </label>
        );
      })}
    </RadioGroup>
  );
}
