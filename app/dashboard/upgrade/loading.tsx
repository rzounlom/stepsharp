import { Skeleton } from "@/components/ui/skeleton";

export default function UpgradeLoading() {
  return (
    <section className="mx-auto w-full max-w-3xl space-y-6">
      <header className="space-y-2 border-b border-border pb-4">
        <Skeleton className="h-8 w-64" />
        <Skeleton className="h-5 w-96 max-w-full" />
      </header>
      <div className="rounded-xl border border-border bg-card p-5 sm:p-6">
        <Skeleton className="h-7 w-40" />
        <Skeleton className="mt-4 h-10 w-36" />
        <div className="mt-4 space-y-2">
          <Skeleton className="h-4 w-56" />
          <Skeleton className="h-4 w-52" />
          <Skeleton className="h-4 w-60" />
        </div>
        <div className="mt-6 flex flex-col gap-2 sm:flex-row">
          <Skeleton className="h-10 w-full sm:w-36" />
          <Skeleton className="h-10 w-full sm:w-40" />
        </div>
      </div>
    </section>
  );
}
