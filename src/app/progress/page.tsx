"use client";

import Link from "next/link";
import { ProgressBar } from "@/components/ProgressBar";
import { useProgressContext, useStreaks } from "@/context/ProgressContext";
import {
  getDaysCompleted,
  getOverallPercent,
  getPillarDaysCompleted,
} from "@/lib/progress";
import { PILLAR_META, type PillarId } from "@/types";

const PILLARS = Object.keys(PILLAR_META) as PillarId[];

export default function ProgressPage() {
  const { progress } = useProgressContext();
  const streaks = useStreaks();
  const overall = getOverallPercent(progress);
  const completed = getDaysCompleted(progress);

  const completedDays = Object.entries(progress.dayRecords)
    .filter(([, r]) => r.completed)
    .sort(([a], [b]) => Number(a) - Number(b));

  return (
    <div className="mx-auto max-w-lg space-y-8">
      <div>
        <h1 className="text-2xl font-bold">Progress</h1>
        <p className="mt-1 text-sm text-zinc-500">
          Simple view — days done and streaks.
        </p>
      </div>

      <section className="rounded-2xl border border-zinc-200 p-6 dark:border-zinc-800">
        <div className="flex justify-between text-sm">
          <span>30-day program</span>
          <span className="font-bold">{overall}%</span>
        </div>
        <ProgressBar value={overall} className="mt-3" />
        <p className="mt-3 text-sm text-zinc-600 dark:text-zinc-400">
          {completed} days completed · {streaks.overall} day streak
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="font-semibold">By pillar</h2>
        {PILLARS.map((p) => {
          const meta = PILLAR_META[p];
          const done = getPillarDaysCompleted(progress, p);
          return (
            <div key={p}>
              <div className="mb-1 flex justify-between text-sm">
                <span>{meta.emoji} {meta.shortName}</span>
                <span>{done} days</span>
              </div>
              <ProgressBar value={Math.min(100, (done / 8) * 100)} />
            </div>
          );
        })}
      </section>

      {completedDays.length > 0 && (
        <section>
          <h2 className="mb-3 font-semibold">Completed days</h2>
          <ul className="space-y-2 text-sm">
            {completedDays.map(([d, r]) => (
              <li key={d}>
                <Link
                  href={`/day/${d}`}
                  className="flex justify-between rounded-lg border border-zinc-200 px-3 py-2 dark:border-zinc-800"
                >
                  <span>
                    Day {d} · {PILLAR_META[r.primaryPillar].shortName}
                  </span>
                  {r.sessionRating ? (
                    <span className="text-zinc-500">{r.sessionRating}/5</span>
                  ) : null}
                </Link>
              </li>
            ))}
          </ul>
        </section>
      )}

      <Link
        href="/review"
        className="block text-center text-sm text-violet-600 underline dark:text-violet-400"
      >
        Weekly reflection →
      </Link>
    </div>
  );
}
