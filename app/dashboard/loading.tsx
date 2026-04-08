import { Skeleton } from "@/components/ui/skeleton";

export default function DashboardLoading() {
  return (
    <section className="mx-auto w-full max-w-5xl space-y-6 sm:space-y-8">
      <header className="space-y-2 border-b border-border pb-4">
        <Skeleton className="h-8 w-40" />
        <Skeleton className="h-5 w-80 max-w-full" />
      </header>

      <div className="grid gap-4 md:grid-cols-2">
        {Array.from({ length: 2 }).map((_, idx) => (
          <article
            key={idx}
            className="rounded-xl border border-border bg-card p-5 sm:p-6"
          >
            <Skeleton className="h-7 w-40" />
            <div className="mt-3 space-y-2">
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-11/12" />
            </div>
            <Skeleton className="mt-6 h-10 w-40" />
          </article>
        ))}
      </div>
    </section>
  );
}
