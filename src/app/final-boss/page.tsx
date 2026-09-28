"use client";

import Link from "next/link";
import { useState } from "react";
import { MissionTimer } from "@/components/MissionTimer";
import { useProgressContext } from "@/context/ProgressContext";
import { PILLAR_META } from "@/types";

const BOSSES = [
  {
    pillar: "zero-hesitation" as const,
    title: "15 social interactions",
    detail:
      "5 intros · 3 long chats · 2 intimidating · 1 group · 1 disagreement · 1 story · 1 spontaneous",
    prep: 0,
    speak: 0,
  },
  {
    pillar: "communication" as const,
    title: "10-minute continuous speaking",
    detail: "Record or live. No restart.",
    prep: 15,
    speak: 600,
  },
  {
    pillar: "impromptu-thinking" as const,
    title: "5-minute unknown problem",
    detail: "Short prep, then answer + follow-ups.",
    prep: 10,
    speak: 300,
  },
  {
    pillar: "technical-communication" as const,
    title: "10-minute technical simulation",
    detail: "Pitch, deep dive, trade-offs, tough follow-ups.",
    prep: 30,
    speak: 600,
  },
];

export default function FinalBossPage() {
  const { progress, completeFinalBoss } = useProgressContext();
  const [checked, setChecked] = useState<Record<number, boolean>>({});
  const allChecked = BOSSES.every((_, i) => checked[i]);

  return (
    <div className="mx-auto max-w-2xl space-y-8">
      <section className="rounded-2xl border border-amber-500/40 bg-amber-500/10 p-8 text-center">
        <h1 className="text-3xl font-black">Day 30 — Final Boss</h1>
        <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
          Four challenges. Check each when done.
        </p>
      </section>

      {BOSSES.map((b, i) => {
        const meta = PILLAR_META[b.pillar];
        return (
          <div
            key={b.pillar}
            className="rounded-2xl border border-zinc-200 p-5 dark:border-zinc-800"
          >
            <p className="text-xl">{meta.emoji}</p>
            <h2 className="mt-1 font-bold">{b.title}</h2>
            <p className="mt-1 text-sm text-zinc-500">{b.detail}</p>
            {(b.prep > 0 || b.speak > 0) && (
              <div className="mt-4">
                <MissionTimer prepTime={b.prep} speakingTarget={b.speak} />
              </div>
            )}
            <label className="mt-4 flex items-center gap-2 text-sm">
              <input
                type="checkbox"
                checked={!!checked[i]}
                onChange={(e) =>
                  setChecked((c) => ({ ...c, [i]: e.target.checked }))
                }
              />
              Done
            </label>
            <Link
              href={`/pillar/${b.pillar}?tab=guide`}
              className="mt-2 inline-block text-xs text-violet-600 underline dark:text-violet-400"
            >
              Revise {meta.shortName} guide
            </Link>
          </div>
        );
      })}

      <button
        type="button"
        disabled={!allChecked}
        onClick={() => completeFinalBoss()}
        className="w-full rounded-xl bg-amber-500 py-3 font-bold text-zinc-900 disabled:opacity-40"
      >
        {progress.finalBossCompleted ? "Final Boss completed" : "Complete Final Boss"}
      </button>

      <p className="text-center text-sm">
        <Link href="/" className="text-zinc-500 underline">← Home</Link>
      </p>
    </div>
  );
}
