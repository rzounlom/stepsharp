"use client";

import {
  useAuth,
  UserButton,
} from "@clerk/nextjs";
import { Menu, X } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { appNavigation } from "@/data/navigation";
import { cn } from "@/lib/utils";

export function Navbar() {
  const { isSignedIn } = useAuth();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-10 border-b border-border bg-background/90 backdrop-blur">
      <div className="mx-auto flex w-full max-w-6xl items-center justify-between gap-3 px-4 py-3 sm:px-6 sm:py-4">
        <div className="flex items-center gap-4 sm:gap-6">
          <Link href="/" className="text-lg font-semibold tracking-tight">
            StepSharp
          </Link>
          <nav className="hidden items-center gap-4 lg:flex">
            {appNavigation.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-sm text-muted-foreground transition-colors hover:text-foreground"
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setIsMobileMenuOpen((prev) => !prev)}
            className="inline-flex min-h-9 min-w-9 items-center justify-center rounded-md border border-border text-muted-foreground transition-colors hover:bg-accent lg:hidden"
            aria-label={isMobileMenuOpen ? "Close navigation menu" : "Open navigation menu"}
            aria-expanded={isMobileMenuOpen}
          >
            {isMobileMenuOpen ? <X className="size-4" /> : <Menu className="size-4" />}
          </button>
          {isSignedIn ? (
            <UserButton afterSignOutUrl="/" />
          ) : (
            <>
              <Link
                href="/sign-in"
                className="hidden min-h-9 items-center rounded-md border border-border px-3 text-sm font-medium transition-colors hover:bg-accent sm:inline-flex"
              >
                Sign In
              </Link>
              <Link
                href="/sign-up"
                className="hidden min-h-9 items-center rounded-md bg-primary px-3 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90 sm:inline-flex"
              >
                Sign Up
              </Link>
            </>
          )}
        </div>
      </div>
      <div
        className={cn(
          "border-t border-border bg-background lg:hidden",
          isMobileMenuOpen ? "block" : "hidden",
        )}
      >
        <nav className="mx-auto flex w-full max-w-6xl flex-col px-4 py-3 sm:px-6">
          {appNavigation.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="rounded-md px-3 py-2 text-sm text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              {item.label}
            </Link>
          ))}
          {!isSignedIn ? (
            <div className="mt-2 grid grid-cols-2 gap-2 border-t border-border pt-3">
              <Link
                href="/sign-in"
                className="inline-flex min-h-10 items-center justify-center rounded-md border border-border px-3 text-sm font-medium transition-colors hover:bg-accent"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Sign In
              </Link>
              <Link
                href="/sign-up"
                className="inline-flex min-h-10 items-center justify-center rounded-md bg-primary px-3 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Sign Up
              </Link>
            </div>
          ) : null}
        </nav>
      </div>
    </header>
  );
}
