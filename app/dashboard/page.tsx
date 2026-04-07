import Link from "next/link";
import { DASHBOARD_MODE_CARDS } from "@/lib/constants";

export default function DashboardPage() {
  return (
    <section className="mx-auto w-full max-w-5xl space-y-8">
      <div className="space-y-2">
        <h1 className="text-3xl font-semibold tracking-tight">Dashboard</h1>
        <p className="text-muted-foreground">
          Choose a mode to continue your learning session.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        {DASHBOARD_MODE_CARDS.map((card) => (
          <article
            key={card.title}
            className="rounded-xl border border-border bg-card p-5 shadow-sm"
          >
            <h2 className="text-xl font-semibold">{card.title}</h2>
            <p className="mt-2 text-sm text-muted-foreground">
              {card.description}
            </p>
            <Link
              href={card.href}
              className="mt-6 inline-flex rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90"
            >
              {card.ctaLabel}
            </Link>
          </article>
        ))}
      </div>
    </section>
  );
}
