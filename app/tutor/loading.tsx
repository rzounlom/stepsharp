import { Skeleton } from "@/components/ui/skeleton";

export default function TutorLoading() {
  return (
    <section className="mx-auto w-full max-w-4xl space-y-6">
      <header className="rounded-md border border-border bg-muted/20 px-4 py-3">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <Skeleton className="h-4 w-24" />
          <Skeleton className="h-4 w-36" />
        </div>
      </header>

      <div className="rounded-xl border border-border bg-card p-4 sm:p-6">
        <div className="space-y-5">
          <Skeleton className="h-4 w-44" />
          <div className="space-y-2">
            <Skeleton className="h-6 w-full" />
            <Skeleton className="h-6 w-11/12" />
            <Skeleton className="h-6 w-10/12" />
          </div>

          <div className="space-y-3">
            {Array.from({ length: 5 }).map((_, idx) => (
              <Skeleton key={idx} className="h-12 w-full" />
            ))}
          </div>

          <div className="flex flex-col gap-2 sm:flex-row">
            <Skeleton className="h-10 w-full sm:w-28" />
            <Skeleton className="h-10 w-full sm:w-36" />
          </div>
        </div>
      </div>
    </section>
  );
}
