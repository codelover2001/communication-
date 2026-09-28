"use client";

import Link from "next/link";
import { useParams, useSearchParams } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { MissionTimer } from "@/components/MissionTimer";
import { PillarGuidePanel } from "@/components/PillarGuidePanel";
import { useProgressContext } from "@/context/ProgressContext";
import { getChallengeForDay } from "@/data/challenges";
import { PILLAR_META, type PillarId } from "@/types";
import { cn } from "@/lib/cn";

const PILLARS: PillarId[] = [
  "zero-hesitation",
  "communication",
  "impromptu-thinking",
  "technical-communication",
];

export function DayPageContent() {
  const params = useParams();
  const searchParams = useSearchParams();
  const day = Number(params.day);
  const { progress, completeDay } = useProgressContext();

  const defaultPillar = getChallengeForDay(day).pillar;
  const [pillar, setPillar] = useState<PillarId>(defaultPillar);
  const [showGuide, setShowGuide] = useState(false);

  useEffect(() => {
    const p = searchParams.get("pillar");
    if (p && PILLARS.includes(p as PillarId)) {
      setPillar(p as PillarId);
    }
  }, [searchParams]);

  const challenge = useMemo(
    () => getChallengeForDay(day, pillar),
    [day, pillar],
  );
  const meta = PILLAR_META[pillar];
  const existing = progress.dayRecords[day];

  const [sessionRating, setSessionRating] = useState(
    existing?.sessionRating ?? 0,
  );
  const [notes, setNotes] = useState(existing?.reflection?.mistake ?? "");

  if (Number.isNaN(day) || day < 1 || day > 30) {
    return <p>Invalid day.</p>;
  }

  const handleComplete = () => {
    completeDay(day, {
      primaryPillar: pillar,
      sessionRating,
      reflection: { mistake: notes, tomorrow: "" },
    });
  };

  const hasTimer = challenge.prepTime > 0 || challenge.speakingTarget > 0;

  return (
    <div className="mx-auto max-w-2xl space-y-6">
      <div>
        <Link href="/" className="text-sm text-zinc-500">← Home</Link>
        <p className="mt-3 text-sm text-zinc-500">Day {day}</p>
        <h1 className="text-2xl font-bold">{challenge.title}</h1>
      </div>

      <div className="flex flex-wrap gap-2">
        {PILLARS.map((p) => (
          <button
            key={p}
            type="button"
            onClick={() => setPillar(p)}
            className={cn(
              "rounded-full px-3 py-1.5 text-xs font-medium",
              pillar === p
                ? "bg-zinc-900 text-white dark:bg-white dark:text-zinc-900"
                : "bg-zinc-100 text-zinc-600 dark:bg-zinc-800",
            )}
          >
            {PILLAR_META[p].emoji} {PILLAR_META[p].shortName}
          </button>
        ))}
      </div>

      <button
        type="button"
        onClick={() => setShowGuide((v) => !v)}
        className="w-full rounded-xl border border-violet-500/30 bg-violet-500/5 px-4 py-3 text-left text-sm font-medium text-violet-800 dark:text-violet-200"
      >
        {showGuide ? "Hide" : "Show"} {meta.shortName} guide — quick revision
      </button>
      {showGuide && <PillarGuidePanel pillar={pillar} />}

      <section className="rounded-2xl border border-zinc-200 p-5 dark:border-zinc-800">
        <p className="text-xs font-medium uppercase text-zinc-500">
          {meta.emoji} {meta.name}
        </p>
        <p className="mt-3 whitespace-pre-line text-sm text-zinc-700 dark:text-zinc-300">
          {challenge.exercise}
        </p>
        {challenge.optionalTips && (
          <ul className="mt-3 list-disc space-y-1 pl-5 text-xs text-zinc-500">
            {challenge.optionalTips.map((t) => (
              <li key={t}>{t}</li>
            ))}
          </ul>
        )}
      </section>

      {hasTimer && (
        <MissionTimer
          prepTime={challenge.prepTime}
          speakingTarget={challenge.speakingTarget}
        />
      )}

      <section>
        <p className="mb-2 text-sm font-medium">How did it go? (1–5)</p>
        <div className="flex gap-2">
          {[1, 2, 3, 4, 5].map((n) => (
            <button
              key={n}
              type="button"
              onClick={() => setSessionRating(n)}
              className={cn(
                "h-11 flex-1 rounded-lg text-sm font-semibold",
                sessionRating === n
                  ? "bg-violet-600 text-white"
                  : "bg-zinc-100 dark:bg-zinc-800",
              )}
            >
              {n}
            </button>
          ))}
        </div>
        <p className="mt-1 text-xs text-zinc-500">
          Honest score — did you do the rep despite discomfort?
        </p>
      </section>

      <label className="block text-sm font-medium">
        Notes (what worked, what to fix tomorrow)
        <textarea
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          rows={3}
          placeholder="Optional but useful for weekly review"
          className="mt-2 w-full rounded-xl border border-zinc-200 bg-white px-3 py-2 text-sm dark:border-zinc-700 dark:bg-zinc-900"
        />
      </label>

      <button
        type="button"
        onClick={handleComplete}
        className="w-full rounded-xl bg-emerald-600 py-3.5 text-sm font-bold text-white hover:bg-emerald-500"
      >
        {existing?.completed ? "Save changes" : "Mark day complete"}
      </button>

      <p className="text-center text-xs text-zinc-500">
        <Link href={`/pillar/${pillar}?tab=guide`} className="underline">
          Full {meta.shortName} guide
        </Link>
      </p>
    </div>
  );
}
