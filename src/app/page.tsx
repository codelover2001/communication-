"use client";

import Link from "next/link";
import { ArrowRight, BookOpen, ChevronDown, ChevronUp } from "lucide-react";
import { useEffect, useState } from "react";
import { PillarCard } from "@/components/PillarCard";
import { ProgressBar } from "@/components/ProgressBar";
import { useProgressContext, useStreaks } from "@/context/ProgressContext";
import { getChallengeForDay } from "@/data/challenges";
import {
  getCurrentDay,
  getDaysCompleted,
  getOverallPercent,
  getPillarDaysCompleted,
  getTodayMissionDay,
} from "@/lib/progress";
import { PILLAR_META, type PillarId } from "@/types";

const PILLARS = Object.keys(PILLAR_META) as PillarId[];

export default function DashboardPage() {
  const { progress, hydrated, startProgram } = useProgressContext();
  const streaks = useStreaks();
  const [showAllDays, setShowAllDays] = useState(false);

  useEffect(() => {
    if (hydrated) startProgram();
  }, [hydrated, startProgram]);

  const day = getTodayMissionDay(progress);
  const challenge = getChallengeForDay(day);
  const meta = PILLAR_META[challenge.pillar];
  const overallPct = getOverallPercent(progress);
  const record = progress.dayRecords[day];
  const completedToday = record?.completed;

  if (!hydrated) {
    return (
      <div className="flex min-h-[40vh] items-center justify-center text-zinc-500">
        Loading…
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <section className="rounded-2xl border border-zinc-200 p-6 dark:border-zinc-800">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold">
              Day {day}{" "}
              <span className="font-normal text-zinc-400">/ 30</span>
            </h1>
            <p className="mt-2 text-sm text-zinc-500">
              {getDaysCompleted(progress)} days done · {streaks.overall} day streak
            </p>
          </div>
          <p className="text-2xl font-bold">{overallPct}%</p>
        </div>
        <ProgressBar value={overallPct} className="mt-4 h-2" />
      </section>

      <section className="rounded-2xl border border-zinc-200 p-6 dark:border-zinc-800">
        <p className="text-sm text-zinc-500">Today&apos;s mission</p>
        <p className="mt-1 font-medium">
          {meta.emoji} {meta.name}
        </p>
        <h2 className="mt-2 text-xl font-bold">{challenge.title}</h2>
        <p className="mt-3 line-clamp-4 whitespace-pre-line text-sm text-zinc-600 dark:text-zinc-400">
          {challenge.exercise}
        </p>
        <div className="mt-5 flex flex-wrap gap-3">
          <Link
            href={`/day/${day}`}
            className="inline-flex items-center gap-2 rounded-xl bg-zinc-900 px-5 py-2.5 text-sm font-semibold text-white dark:bg-white dark:text-zinc-900"
          >
            {completedToday ? "View today" : "Do today's mission"}
            <ArrowRight className="h-4 w-4" />
          </Link>
          <Link
            href={`/pillar/${challenge.pillar}?tab=guide`}
            className="inline-flex items-center gap-2 rounded-xl border border-zinc-200 px-5 py-2.5 text-sm font-medium dark:border-zinc-700"
          >
            <BookOpen className="h-4 w-4" />
            Read pillar guide
          </Link>
        </div>
      </section>

      <section>
        <div className="mb-3 flex items-center justify-between">
          <h2 className="font-semibold">Pillar guides</h2>
          <p className="text-xs text-zinc-500">Revise before you practice</p>
        </div>
        <div className="grid gap-3 sm:grid-cols-2">
          {PILLARS.map((p) => (
            <PillarCard
              key={p}
              pillar={p}
              daysDone={getPillarDaysCompleted(progress, p)}
            />
          ))}
        </div>
      </section>

      <section>
        <button
          type="button"
          onClick={() => setShowAllDays((v) => !v)}
          className="flex w-full items-center justify-between rounded-xl border border-zinc-200 px-4 py-3 text-sm font-medium dark:border-zinc-800"
        >
          All 30 days
          {showAllDays ? (
            <ChevronUp className="h-4 w-4" />
          ) : (
            <ChevronDown className="h-4 w-4" />
          )}
        </button>
        {showAllDays && (
          <div className="mt-3 grid grid-cols-6 gap-2 sm:grid-cols-10">
            {Array.from({ length: 30 }, (_, i) => i + 1).map((d) => {
              const done = progress.dayRecords[d]?.completed;
              const current = d === getCurrentDay(progress);
              return (
                <Link
                  key={d}
                  href={`/day/${d}`}
                  className={`rounded-lg border py-2 text-center text-sm ${
                    done
                      ? "border-emerald-500/40 bg-emerald-500/10 text-emerald-700 dark:text-emerald-300"
                      : current
                        ? "border-violet-500 bg-violet-500/10"
                        : "border-zinc-200 dark:border-zinc-800"
                  }`}
                >
                  {d}
                </Link>
              );
            })}
          </div>
        )}
      </section>

      {day === 30 && (
        <Link
          href="/final-boss"
          className="block rounded-xl border border-amber-500/40 bg-amber-500/10 px-4 py-3 text-center text-sm font-semibold text-amber-800 dark:text-amber-200"
        >
          Day 30 — Final Boss
        </Link>
      )}
    </div>
  );
}
