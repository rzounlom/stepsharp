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
    <div className="flex items-center justify-between border-t border-border pt-4">
      <Button variant="outline" onClick={onPrevious} disabled={disablePrevious}>
        Previous
      </Button>
      <Button variant="outline" onClick={onNext} disabled={disableNext}>
        Next
      </Button>
    </div>
  );
}
