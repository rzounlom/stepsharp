import { Skeleton } from "@/components/ui/skeleton";

export default function RootLoading() {
  return (
    <section className="flex flex-1 items-center">
      <div className="w-full rounded-2xl border border-border bg-card px-8 py-14 shadow-sm sm:px-12">
        <div className="mx-auto max-w-3xl space-y-8 text-center">
          <Skeleton className="mx-auto h-4 w-36" />
          <Skeleton className="mx-auto h-12 w-full max-w-2xl" />
          <Skeleton className="mx-auto h-6 w-full max-w-xl" />
          <Skeleton className="mx-auto h-6 w-full max-w-lg" />
          <div className="flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Skeleton className="h-10 w-full max-w-44 sm:w-44" />
            <Skeleton className="h-10 w-full max-w-44 sm:w-44" />
          </div>
        </div>
      </div>
    </section>
  );
}
