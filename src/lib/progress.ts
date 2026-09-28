import type { AppProgress, DayRecord, PillarId } from "@/types";
import { PILLAR_META } from "@/types";

const TOTAL_DAYS = 30;

export function getDaysCompleted(progress: AppProgress): number {
  return Object.values(progress.dayRecords).filter((r) => r.completed).length;
}

export function getOverallPercent(progress: AppProgress): number {
  return Math.round((getDaysCompleted(progress) / TOTAL_DAYS) * 100);
}

export function getPillarDaysCompleted(
  progress: AppProgress,
  pillar: PillarId,
): number {
  return Object.values(progress.dayRecords).filter(
    (r) => r.completed && r.primaryPillar === pillar,
  ).length;
}

export function getPillarPercent(
  progress: AppProgress,
  pillar: PillarId,
): number {
  // Each pillar gets ~7-8 primary days in rotation over 30 days
  const target = 8;
  return Math.min(
    100,
    Math.round((getPillarDaysCompleted(progress, pillar) / target) * 100),
  );
}

export function getAverageScore(
  progress: AppProgress,
  pillar?: PillarId,
): number | null {
  const records = Object.values(progress.dayRecords).filter(
    (r) =>
      r.completed &&
      r.scores &&
      (!pillar || r.primaryPillar === pillar),
  );
  if (records.length === 0) return null;
  let sum = 0;
  let count = 0;
  for (const r of records) {
    const vals = Object.values(r.scores!).filter((v) => v != null) as number[];
    if (vals.length) {
      sum += vals.reduce((a, b) => a + b, 0) / vals.length;
      count++;
    }
  }
  return count ? Math.round((sum / count) * 10) / 10 : null;
}

export function getCurrentDay(progress: AppProgress): number {
  const completed = Object.keys(progress.dayRecords)
    .map(Number)
    .filter((d) => progress.dayRecords[d]?.completed);
  if (completed.length === 0) return 1;
  const max = Math.max(...completed);
  return Math.min(TOTAL_DAYS, max + 1);
}

export function getTodayMissionDay(progress: AppProgress): number {
  const day = getCurrentDay(progress);
  return Math.min(day, TOTAL_DAYS);
}

export function getTotalReps(progress: AppProgress): number {
  return Object.values(progress.dayRecords).reduce((acc, r) => {
    return acc + (r.metrics?.socialInteractions ?? 0) + 1;
  }, 0);
}

export function getAvgSpeakingMinutes(progress: AppProgress): number {
  const mins = Object.values(progress.dayRecords)
    .map((r) => r.metrics?.speakingMinutes)
    .filter((m): m is number => m != null);
  if (!mins.length) return 0;
  return Math.round((mins.reduce((a, b) => a + b, 0) / mins.length) * 10) / 10;
}

export function getAvgHesitation(progress: AppProgress): number {
  const h = Object.values(progress.dayRecords)
    .map((r) => r.metrics?.hesitationSeconds)
    .filter((x): x is number => x != null);
  if (!h.length) return 0;
  return Math.round((h.reduce((a, b) => a + b, 0) / h.length) * 10) / 10;
}

export function pillarScoresForRadar(progress: AppProgress, pillar: PillarId) {
  const records = Object.values(progress.dayRecords).filter(
    (r) => r.completed && r.primaryPillar === pillar && r.scores,
  );
  const dims = [
    "structure",
    "reasoning",
    "clarity",
    "pressureControl",
    "technicalDepth",
    "tradeoffs",
  ] as const;
  const sums: Record<string, number> = {};
  const counts: Record<string, number> = {};
  for (const r of records) {
    for (const d of dims) {
      const v = r.scores![d];
      if (v != null) {
        sums[d] = (sums[d] ?? 0) + v;
        counts[d] = (counts[d] ?? 0) + 1;
      }
    }
  }
  return dims
    .filter((d) => counts[d])
    .map((d) => ({
      skill: d.replace(/([A-Z])/g, " $1").trim(),
      score: Math.round(((sums[d] ?? 0) / (counts[d] ?? 1)) * 10) / 10,
      fullMark: 5,
    }));
}

export function getFinalTransformation(progress: AppProgress) {
  const pillars = Object.keys(PILLAR_META) as PillarId[];
  const scores = pillars.map((p) => ({
    pillar: p,
    percent: getPillarPercent(progress, p),
    avg: getAverageScore(progress, p),
  }));
  const overall =
    Math.round(scores.reduce((a, s) => a + s.percent, 0) / pillars.length) ||
    0;
  const sorted = [...scores].sort((a, b) => b.percent - a.percent);
  return {
    overall,
    scores,
    strongest: sorted[0],
    weakest: sorted[sorted.length - 1],
  };
}

export function emptyDayRecord(
  primaryPillar: PillarId,
): DayRecord {
  return { completed: false, primaryPillar };
}
