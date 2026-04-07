import Link from "next/link";

export default function TestSetupPage() {
  return (
    <section className="space-y-4">
      <h1 className="text-3xl font-semibold tracking-tight">Test Setup</h1>
      <p className="max-w-2xl text-muted-foreground">
        Configure session options like difficulty, duration, and topic focus
        before starting a test.
      </p>
      <Link
        href="/test/session"
        className="inline-flex rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90"
      >
        Continue to Session
      </Link>
    </section>
  );
}
