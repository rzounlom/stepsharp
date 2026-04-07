import Link from "next/link";

export default function TestSessionPage() {
  return (
    <section className="space-y-4">
      <h1 className="text-3xl font-semibold tracking-tight">Test Session</h1>
      <p className="max-w-2xl text-muted-foreground">
        Session screen placeholder for timed questions and answer submission.
      </p>
      <Link
        href="/test/results"
        className="inline-flex rounded-md border border-border px-4 py-2 text-sm font-medium transition-colors hover:bg-accent"
      >
        Finish and View Results
      </Link>
    </section>
  );
}
