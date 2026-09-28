"use client";

import Link from "next/link";
import { useParams, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { TECH_PROJECTS } from "@/data/frameworks";
import { getChallengeForDay } from "@/data/challenges";
import { useProgressContext } from "@/context/ProgressContext";
import { getDaysCompleted, getOverallPercent } from "@/lib/progress";
import { PILLAR_META, type PillarId } from "@/types";
import { PillarGuidePanel } from "@/components/PillarGuidePanel";
import { PillarTabs, type PillarTab } from "@/components/PillarTabs";

const VALID: PillarId[] = [
  "zero-hesitation",
  "communication",
  "impromptu-thinking",
  "technical-communication",
];

export function PillarPageContent() {
  const params = useParams();
  const searchParams = useSearchParams();
  const id = params.id as string;
  const { progress } = useProgressContext();
  const [tab, setTab] = useState<PillarTab>("guide");

  useEffect(() => {
    if (searchParams.get("tab") === "missions") setTab("missions");
    if (searchParams.get("tab") === "guide") setTab("guide");
  }, [searchParams]);

  if (!VALID.includes(id as PillarId)) {
    return <p>Unknown pillar.</p>;
  }
  const pillar = id as PillarId;
  const meta = PILLAR_META[pillar];

  return (
    <div className="space-y-8">
      <div>
        <Link href="/" className="text-sm text-zinc-500">← Home</Link>
        <p className="mt-4 text-4xl">{meta.emoji}</p>
        <h1 className="text-3xl font-bold">{meta.name}</h1>
        <p className="mt-2 text-zinc-600 dark:text-zinc-400">{meta.question}</p>
      </div>

      <PillarTabs tab={tab} onChange={setTab} />

      {tab === "guide" && (
        <>
          <PillarGuidePanel pillar={pillar} />
          {pillar === "technical-communication" && (
            <section className="space-y-4">
              <h2 className="text-base font-semibold">Projects to practice explaining</h2>
              {TECH_PROJECTS.map((p) => (
                <div
                  key={p.id}
                  className="rounded-xl border border-zinc-200 p-4 dark:border-zinc-800"
                >
                  <h3 className="font-medium">{p.title}</h3>
                  <p className="mt-2 text-xs text-zinc-500">
                    {p.topics.join(" · ")}
                  </p>
                </div>
              ))}
            </section>
          )}
        </>
      )}

      {tab === "missions" && (
        <section className="space-y-2">
          <p className="text-sm text-zinc-500">
            Exercises for this pillar across all 30 days.
          </p>
          {Array.from({ length: 30 }, (_, i) => i + 1).map((d) => {
            const c = getChallengeForDay(d, pillar);
            const done = progress.dayRecords[d]?.completed;
            return (
              <Link
                key={d}
                href={`/day/${d}?pillar=${pillar}`}
                className="flex items-center justify-between rounded-lg border border-zinc-200 px-4 py-3 text-sm transition hover:border-violet-400 dark:border-zinc-800"
              >
                <span>
                  <span className="font-semibold">Day {d}</span>
                  <span className="text-zinc-500"> — {c.phase}</span>
                </span>
                <span className={done ? "text-emerald-500" : "text-zinc-400"}>
                  {done ? "Done" : "→"}
                </span>
              </Link>
            );
          })}
        </section>
      )}

      <p className="text-center text-xs text-zinc-500">
        Program: {getDaysCompleted(progress)} / 30 days · {getOverallPercent(progress)}%
      </p>
    </div>
  );
}
