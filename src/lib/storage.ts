import type { AppProgress } from "@/types";

const KEY = "communication-30-v1";

export const defaultProgress = (): AppProgress => ({
  version: 1,
  xp: 0,
  dayRecords: {},
  weeklyReviews: {},
});

export function loadProgress(): AppProgress {
  if (typeof window === "undefined") return defaultProgress();
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return defaultProgress();
    return { ...defaultProgress(), ...JSON.parse(raw) };
  } catch {
    return defaultProgress();
  }
}

export function saveProgress(progress: AppProgress) {
  if (typeof window === "undefined") return;
  localStorage.setItem(KEY, JSON.stringify(progress));
}
