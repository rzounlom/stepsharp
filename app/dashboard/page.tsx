import Link from "next/link";
import { DASHBOARD_MODE_CARDS } from "@/lib/constants";

export default function DashboardPage() {
  return (
    <section className="mx-auto w-full max-w-5xl space-y-8">
      <header className="space-y-2 border-b border-border pb-4">
        <h1 className="text-3xl font-semibold tracking-tight">Dashboard</h1>
        <p className="text-muted-foreground">
          Choose a mode to continue your learning session.
        </p>
      </header>

      <div className="grid gap-4 md:grid-cols-2">
        {DASHBOARD_MODE_CARDS.map((card) => (
          <article
            key={card.title}
            className="rounded-xl border border-border bg-card p-6"
          >
            <h2 className="text-xl font-semibold">{card.title}</h2>
            <p className="mt-2 text-[0.95rem] leading-6 text-muted-foreground">
              {card.description}
            </p>
            <Link
              href={card.href}
              className="mt-6 inline-flex rounded-md border border-border bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-muted"
            >
              {card.ctaLabel}
            </Link>
          </article>
        ))}
      </div>
    </section>
  );
}
