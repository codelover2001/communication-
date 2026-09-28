import type { AppProgress, PillarId } from "@/types";

function dateKey(d: Date) {
  return d.toISOString().slice(0, 10);
}

function parseDate(key: string) {
  const [y, m, d] = key.split("-").map(Number);
  return new Date(y, m - 1, d);
}

export function getCompletedDates(progress: AppProgress): string[] {
  return Object.values(progress.dayRecords)
    .filter((r) => r.completed && r.completedAt)
    .map((r) => r.completedAt!.slice(0, 10))
    .sort();
}

export function computeStreakFromDates(dates: string[]): number {
  if (dates.length === 0) return 0;
  const set = new Set(dates);
  const today = dateKey(new Date());
  const yesterday = dateKey(
    new Date(Date.now() - 24 * 60 * 60 * 1000),
  );
  let start = today;
  if (!set.has(today)) {
    if (!set.has(yesterday)) return 0;
    start = yesterday;
  }
  let streak = 0;
  let cursor = parseDate(start);
  while (set.has(dateKey(cursor))) {
    streak++;
    cursor = new Date(cursor.getTime() - 24 * 60 * 60 * 1000);
  }
  return streak;
}

export function getPillarStreak(
  progress: AppProgress,
  pillar: PillarId,
): number {
  const dates = Object.entries(progress.dayRecords)
    .filter(
      ([, r]) => r.completed && r.primaryPillar === pillar && r.completedAt,
    )
    .map(([, r]) => r.completedAt!.slice(0, 10));
  return computeStreakFromDates(dates);
}

export function getOverallStreak(progress: AppProgress): number {
  return computeStreakFromDates(getCompletedDates(progress));
}
