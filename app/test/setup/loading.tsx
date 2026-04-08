import { Skeleton } from "@/components/ui/skeleton";

export default function TestSetupLoading() {
  return (
    <section className="mx-auto w-full max-w-4xl space-y-8">
      <header className="space-y-2">
        <Skeleton className="h-8 w-44" />
        <Skeleton className="h-5 w-md max-w-full" />
      </header>

      <div className="grid gap-4 md:grid-cols-2">
        {Array.from({ length: 2 }).map((_, idx) => (
          <div
            key={idx}
            className="rounded-xl border border-border bg-card p-5 sm:p-6"
          >
            <div className="flex items-center justify-between gap-3">
              <Skeleton className="h-6 w-44" />
              <Skeleton className="h-6 w-16 rounded-full" />
            </div>
            <div className="mt-4 space-y-2">
              <Skeleton className="h-4 w-24" />
              <Skeleton className="h-4 w-36" />
              <Skeleton className="h-4 w-32" />
              <Skeleton className="h-4 w-44" />
              <Skeleton className="h-4 w-36" />
            </div>
          </div>
        ))}
      </div>

      <div className="rounded-xl border border-border bg-card p-5 sm:p-6">
        <Skeleton className="h-6 w-56" />
        <div className="mt-4 space-y-3">
          <Skeleton className="h-12 w-full" />
          <Skeleton className="h-12 w-full" />
        </div>
      </div>

      <div className="flex flex-col gap-3 rounded-lg border border-border bg-muted/30 px-4 py-3 sm:flex-row sm:items-center sm:justify-between">
        <Skeleton className="h-4 w-64" />
        <Skeleton className="h-10 w-full sm:w-28" />
      </div>
    </section>
  );
}
