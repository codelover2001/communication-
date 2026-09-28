"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import type {
  AppProgress,
  DayRecord,
  PillarId,
  WeeklyReviewAnswers,
} from "@/types";
import { defaultProgress, loadProgress, saveProgress } from "@/lib/storage";
import { XP_REWARDS } from "@/lib/levels";
import { getOverallStreak, getPillarStreak } from "@/lib/streak";
import { getChallengeForDay } from "@/data/challenges";

interface ProgressContextValue {
  progress: AppProgress;
  hydrated: boolean;
  completeDay: (
    day: number,
    record: Partial<DayRecord> & { primaryPillar: PillarId },
  ) => void;
  saveWeeklyReview: (week: number, answers: WeeklyReviewAnswers) => void;
  completeFinalBoss: () => void;
  resetProgram: () => void;
  startProgram: () => void;
}

const ProgressContext = createContext<ProgressContextValue | null>(null);

export function ProgressProvider({ children }: { children: React.ReactNode }) {
  const [progress, setProgress] = useState<AppProgress>(defaultProgress());
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setProgress(loadProgress());
    setHydrated(true);
  }, []);

  const persist = useCallback((next: AppProgress) => {
    setProgress(next);
    saveProgress(next);
  }, []);

  const completeDay = useCallback(
    (
      day: number,
      record: Partial<DayRecord> & { primaryPillar: PillarId },
    ) => {
      setProgress((prev) => {
        const existing = prev.dayRecords[day];
        let xp = prev.xp;
        if (!existing?.completed) {
          xp += XP_REWARDS.dailyMission;
          if (record.optionalChallenge) xp += XP_REWARDS.optionalChallenge;
          const challenge = getChallengeForDay(day, record.primaryPillar);
          if (challenge.pressureLevel >= 4) xp += XP_REWARDS.pressureChallenge;
        }
        const streak = getOverallStreak({
          ...prev,
          dayRecords: {
            ...prev.dayRecords,
            [day]: {
              ...existing,
              ...record,
              completed: true,
              completedAt: new Date().toISOString(),
              xpEarned: XP_REWARDS.dailyMission,
            },
          },
        });
        if (streak === 7 && !existing?.completed) xp += XP_REWARDS.streak7;

        const next: AppProgress = {
          ...prev,
          xp,
          dayRecords: {
            ...prev.dayRecords,
            [day]: {
              ...existing,
              ...record,
              completed: true,
              completedAt: new Date().toISOString(),
            },
          },
        };
        saveProgress(next);
        return next;
      });
    },
    [],
  );

  const saveWeeklyReview = useCallback(
    (week: number, answers: WeeklyReviewAnswers) => {
      setProgress((prev) => {
        const had = prev.weeklyReviews[week];
        const next: AppProgress = {
          ...prev,
          xp: had ? prev.xp : prev.xp + XP_REWARDS.weeklyReview,
          weeklyReviews: {
            ...prev.weeklyReviews,
            [week]: answers,
          },
        };
        saveProgress(next);
        return next;
      });
    },
    [],
  );

  const completeFinalBoss = useCallback(() => {
    setProgress((prev) => {
      if (prev.finalBossCompleted) return prev;
      const next = {
        ...prev,
        finalBossCompleted: true,
        xp: prev.xp + XP_REWARDS.finalBoss,
      };
      saveProgress(next);
      return next;
    });
  }, []);

  const resetProgram = useCallback(() => {
    persist(defaultProgress());
  }, [persist]);

  const startProgram = useCallback(() => {
    setProgress((prev) => {
      if (prev.programStartDate) return prev;
      const next = {
        ...prev,
        programStartDate: new Date().toISOString().slice(0, 10),
      };
      saveProgress(next);
      return next;
    });
  }, []);

  const value = useMemo(
    () => ({
      progress,
      hydrated,
      completeDay,
      saveWeeklyReview,
      completeFinalBoss,
      resetProgram,
      startProgram,
    }),
    [
      progress,
      hydrated,
      completeDay,
      saveWeeklyReview,
      completeFinalBoss,
      resetProgram,
      startProgram,
    ],
  );

  return (
    <ProgressContext.Provider value={value}>{children}</ProgressContext.Provider>
  );
}

export function useProgressContext() {
  const ctx = useContext(ProgressContext);
  if (!ctx) throw new Error("useProgressContext outside provider");
  return ctx;
}

export function useStreaks() {
  const { progress } = useProgressContext();
  return useMemo(
    () => ({
      overall: getOverallStreak(progress),
      pillars: {
        "zero-hesitation": getPillarStreak(progress, "zero-hesitation"),
        communication: getPillarStreak(progress, "communication"),
        "impromptu-thinking": getPillarStreak(progress, "impromptu-thinking"),
        "technical-communication": getPillarStreak(
          progress,
          "technical-communication",
        ),
      },
    }),
    [progress],
  );
}
