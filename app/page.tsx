import Link from "next/link";

export default function Home() {
  return (
    <section className="flex flex-1 items-center">
      <div className="w-full rounded-2xl border border-border bg-card px-8 py-14 shadow-sm sm:px-12">
        <div className="mx-auto max-w-3xl space-y-8 text-center">
          <p className="text-sm font-medium uppercase tracking-wider text-muted-foreground">
            AI Study Platform
          </p>
          <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl">
            Learn faster and test smarter with StepSharp
          </h1>
          <p className="text-lg text-muted-foreground sm:text-xl">
            Tutor Mode helps you practice with guidance. Test Mode simulates
            exam conditions so you can improve where it matters most.
          </p>
          <div className="flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Link
              href="/tutor"
              className="inline-flex min-w-44 items-center justify-center rounded-md bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90"
            >
              Start Tutor Mode
            </Link>
            <Link
              href="/test/setup"
              className="inline-flex min-w-44 items-center justify-center rounded-md border border-border px-5 py-2.5 text-sm font-medium transition-colors hover:bg-accent"
            >
              Start Test Mode
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
