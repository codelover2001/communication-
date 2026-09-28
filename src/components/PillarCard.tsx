import Link from "next/link";
import { BookOpen } from "lucide-react";
import type { PillarId } from "@/types";
import { PILLAR_META } from "@/types";
import { cn } from "@/lib/cn";

export function PillarCard({
  pillar,
  daysDone,
}: {
  pillar: PillarId;
  daysDone: number;
}) {
  const meta = PILLAR_META[pillar];
  return (
    <Link
      href={`/pillar/${pillar}?tab=guide`}
      className={cn(
        "flex items-center justify-between gap-3 rounded-xl border bg-gradient-to-br p-4 transition hover:border-violet-400/50",
        meta.gradient,
        meta.border,
      )}
    >
      <div className="min-w-0">
        <p className="text-xl">{meta.emoji}</p>
        <h3 className="mt-1 font-semibold text-zinc-900 dark:text-zinc-50">
          {meta.shortName} — {meta.name}
        </h3>
        <p className="mt-0.5 truncate text-xs text-zinc-600 dark:text-zinc-400">
          {meta.question}
        </p>
        <p className="mt-2 text-xs text-zinc-500">{daysDone} missions logged</p>
      </div>
      <span
        className={cn(
          "flex shrink-0 items-center gap-1 rounded-lg px-2 py-1.5 text-xs font-medium",
          meta.color,
          "bg-white/50 dark:bg-zinc-900/50",
        )}
      >
        <BookOpen className="h-3.5 w-3.5" />
        Guide
      </span>
    </Link>
  );
}
