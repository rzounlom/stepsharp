import { Skeleton } from "@/components/ui/skeleton";

export default function TestResultsLoading() {
  return (
    <section className="mx-auto w-full max-w-5xl space-y-6">
      <header className="space-y-2 border-b border-border pb-4">
        <Skeleton className="h-8 w-44" />
        <Skeleton className="h-5 w-80 max-w-full" />
      </header>

      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {Array.from({ length: 4 }).map((_, idx) => (
          <div
            key={idx}
            className="rounded-lg border border-border bg-card p-4 sm:p-5"
          >
            <Skeleton className="h-4 w-28" />
            <Skeleton className="mt-3 h-8 w-20" />
          </div>
        ))}
      </div>

      <section className="rounded-md border border-border bg-card p-4 sm:p-5">
        <Skeleton className="h-4 w-44" />
        <div className="mt-3 grid gap-2 sm:grid-cols-2">
          {Array.from({ length: 6 }).map((_, idx) => (
            <Skeleton key={idx} className="h-4 w-full" />
          ))}
        </div>
      </section>

      <section className="space-y-3">
        {Array.from({ length: 3 }).map((_, idx) => (
          <div
            key={idx}
            className="rounded-xl border border-border bg-card p-4 sm:p-5"
          >
            <div className="space-y-2">
              <Skeleton className="h-5 w-2/3" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-11/12" />
            </div>
            <div className="mt-4 space-y-2">
              <Skeleton className="h-4 w-1/2" />
              <Skeleton className="h-4 w-2/3" />
              <Skeleton className="h-4 w-3/4" />
            </div>
          </div>
        ))}
      </section>
    </section>
  );
}
