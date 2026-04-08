import { Skeleton } from "@/components/ui/skeleton";

export default function TestSessionLoading() {
  return (
    <section className="mx-auto w-full max-w-5xl space-y-6">
      <header className="grid gap-2 rounded-md border border-border bg-muted/15 px-4 py-3 text-sm sm:flex sm:items-center sm:justify-between sm:gap-3">
        <div className="flex flex-wrap items-center gap-3 sm:gap-6">
          <Skeleton className="h-4 w-24" />
          <Skeleton className="h-4 w-32" />
        </div>
        <Skeleton className="h-5 w-24" />
      </header>

      <div className="rounded-xl border border-border bg-card p-4 sm:p-5">
        <Skeleton className="h-4 w-40" />
        <div className="mt-3 flex flex-wrap gap-2">
          {Array.from({ length: 10 }).map((_, idx) => (
            <Skeleton key={idx} className="h-9 w-9" />
          ))}
        </div>
      </div>

      <div className="rounded-xl border border-border bg-card p-4 sm:p-6">
        <div className="space-y-2">
          <Skeleton className="h-6 w-full" />
          <Skeleton className="h-6 w-11/12" />
          <Skeleton className="h-6 w-10/12" />
        </div>
        <div className="mt-6 space-y-3">
          {Array.from({ length: 5 }).map((_, idx) => (
            <Skeleton key={idx} className="h-12 w-full" />
          ))}
        </div>
      </div>

      <div className="flex flex-col gap-3 border-t border-border pt-3 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex flex-wrap items-center gap-2">
          <Skeleton className="h-10 w-24" />
          <Skeleton className="h-10 w-28" />
          <Skeleton className="h-10 w-36" />
          <Skeleton className="h-10 w-32" />
        </div>
        <div className="grid grid-cols-2 gap-2 sm:flex sm:items-center">
          <Skeleton className="h-10 w-full sm:w-24" />
          <Skeleton className="h-10 w-full sm:w-24" />
        </div>
      </div>
    </section>
  );
}
