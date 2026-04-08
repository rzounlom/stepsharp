import { Button } from "@/components/ui/button";

type TutorNavProps = {
  onPrevious: () => void;
  onNext: () => void;
  disablePrevious: boolean;
  disableNext: boolean;
};

export function TutorNav({
  onPrevious,
  onNext,
  disablePrevious,
  disableNext,
}: TutorNavProps) {
  return (
    <div className="flex flex-col gap-2 border-t border-border pt-4 sm:flex-row sm:items-center sm:justify-between">
      <Button
        variant="outline"
        onClick={onPrevious}
        disabled={disablePrevious}
        className="min-h-10 w-full sm:w-auto"
      >
        Previous
      </Button>
      <Button
        variant="outline"
        onClick={onNext}
        disabled={disableNext}
        className="min-h-10 w-full sm:w-auto"
      >
        Next
      </Button>
    </div>
  );
}
