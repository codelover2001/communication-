"use client";

import type { ScoringDimension } from "@/types";
import { cn } from "@/lib/cn";

const LABELS: Record<ScoringDimension, string> = {
  structure: "Structure",
  reasoning: "Reasoning",
  clarity: "Clarity",
  pressureControl: "Pressure Control",
  technicalDepth: "Technical Depth",
  tradeoffs: "Trade-offs",
};

export function ScoreInput({
  dimensions,
  values,
  onChange,
}: {
  dimensions: ScoringDimension[];
  values: Partial<Record<ScoringDimension, number>>;
  onChange: (dim: ScoringDimension, value: number) => void;
}) {
  return (
    <div className="space-y-4">
      {dimensions.map((dim) => (
        <div key={dim}>
          <div className="mb-2 flex justify-between text-sm">
            <span className="font-medium text-zinc-800 dark:text-zinc-200">
              {LABELS[dim]}
            </span>
            <span className="text-zinc-500">{values[dim] ?? 0}/5</span>
          </div>
          <div className="flex gap-2">
            {[1, 2, 3, 4, 5].map((n) => (
              <button
                key={n}
                type="button"
                onClick={() => onChange(dim, n)}
                className={cn(
                  "h-10 flex-1 rounded-lg border text-sm font-semibold transition",
                  values[dim] === n
                    ? "border-violet-500 bg-violet-500 text-white"
                    : "border-zinc-200 bg-white text-zinc-600 hover:border-violet-300 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-300",
                )}
              >
                {n}
              </button>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
