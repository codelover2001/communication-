"use client";

import { cn } from "@/lib/cn";

export type PillarTab = "guide" | "missions";

export function PillarTabs({
  tab,
  onChange,
}: {
  tab: PillarTab;
  onChange: (t: PillarTab) => void;
}) {
  return (
    <div className="flex gap-1 rounded-xl bg-zinc-100 p-1 dark:bg-zinc-900">
      {(
        [
          { id: "guide" as const, label: "Guide — revise & remember" },
          { id: "missions" as const, label: "Missions" },
        ] as const
      ).map(({ id, label }) => (
        <button
          key={id}
          type="button"
          onClick={() => onChange(id)}
          className={cn(
            "flex-1 rounded-lg px-3 py-2.5 text-sm font-medium transition",
            tab === id
              ? "bg-white text-zinc-900 shadow-sm dark:bg-zinc-800 dark:text-white"
              : "text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-200",
          )}
        >
          {label}
        </button>
      ))}
    </div>
  );
}
