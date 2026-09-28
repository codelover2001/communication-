"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, LineChart, NotebookPen } from "lucide-react";
import { cn } from "@/lib/cn";
import { ThemeToggle } from "./ThemeToggle";

const links = [
  { href: "/", label: "Home", icon: LayoutDashboard },
  { href: "/progress", label: "Progress", icon: LineChart },
  { href: "/review", label: "Review", icon: NotebookPen },
];

export function Nav() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 border-b border-zinc-200/80 bg-white/80 backdrop-blur-xl dark:border-zinc-800/80 dark:bg-zinc-950/80">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3">
        <Link href="/" className="text-sm font-semibold text-zinc-900 dark:text-zinc-50">
          30-Day · ACT → SPEAK → THINK → EXPLAIN
        </Link>
        <nav className="hidden items-center gap-1 sm:flex">
          {links.map(({ href, label, icon: Icon }) => {
            const active =
              href === "/" ? pathname === "/" : pathname.startsWith(href);
            return (
              <Link
                key={href}
                href={href}
                className={cn(
                  "flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium transition",
                  active
                    ? "bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-900"
                    : "text-zinc-600 hover:bg-zinc-100 dark:text-zinc-400 dark:hover:bg-zinc-800",
                )}
              >
                <Icon className="h-4 w-4" />
                {label}
              </Link>
            );
          })}
        </nav>
        <ThemeToggle />
      </div>
      <nav className="flex gap-1 overflow-x-auto border-t border-zinc-100 px-2 py-2 sm:hidden dark:border-zinc-800">
        {links.map(({ href, label }) => (
          <Link
            key={href}
            href={href}
            className={cn(
              "shrink-0 rounded-md px-3 py-1.5 text-xs font-medium",
              pathname === href || (href !== "/" && pathname.startsWith(href))
                ? "bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-900"
                : "text-zinc-600 dark:text-zinc-400",
            )}
          >
            {label}
          </Link>
        ))}
      </nav>
    </header>
  );
}
