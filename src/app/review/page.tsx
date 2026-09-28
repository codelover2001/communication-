"use client";

import { useState } from "react";
import { WEEKLY_REVIEW_DAYS } from "@/data/challenges";
import { useProgressContext } from "@/context/ProgressContext";
import type { WeeklyReviewAnswers } from "@/types";

const QUESTIONS = [
  { key: "avoided" as const, label: "What did I avoid this week?" },
  {
    key: "communicationHabit" as const,
    label: "What communication habit improved?",
  },
  { key: "froze" as const, label: "Where did I freeze?" },
  {
    key: "technicalBetter" as const,
    label: "Which technical concept can I explain significantly better now?",
  },
  {
    key: "weakness" as const,
    label: "What repeatedly caused problems?",
  },
  {
    key: "nextWeek" as const,
    label: "What ONE behavior will I deliberately improve next week?",
  },
];

export default function ReviewPage() {
  const { progress, saveWeeklyReview } = useProgressContext();
  const [week, setWeek] = useState(1);
  const weekDay = WEEKLY_REVIEW_DAYS[week - 1];

  const existing = progress.weeklyReviews[week];
  const [answers, setAnswers] = useState<WeeklyReviewAnswers>(
    existing ?? {
      avoided: "",
      communicationHabit: "",
      froze: "",
      technicalBetter: "",
      weakness: "",
      nextWeek: "",
      completedAt: "",
    },
  );

  const save = () => {
    saveWeeklyReview(week, {
      ...answers,
      completedAt: new Date().toISOString(),
    });
  };

  return (
    <div className="mx-auto max-w-2xl space-y-8">
      <div>
        <h1 className="text-3xl font-bold">Weekly Review</h1>
        <p className="mt-2 text-zinc-500">
          Every 7 days, reflect so this stays an operating system — not a
          checkbox app.
        </p>
      </div>

      <div className="flex gap-2">
        {[1, 2, 3, 4].map((w) => (
          <button
            key={w}
            type="button"
            onClick={() => {
              setWeek(w);
              const ex = progress.weeklyReviews[w];
              if (ex) setAnswers(ex);
            }}
            className={`rounded-lg px-4 py-2 text-sm font-medium ${
              week === w
                ? "bg-zinc-900 text-white dark:bg-white dark:text-zinc-900"
                : "bg-zinc-100 dark:bg-zinc-800"
            }`}
          >
            Week {w} (Day {WEEKLY_REVIEW_DAYS[w - 1]})
          </button>
        ))}
      </div>

      <p className="text-sm text-violet-600 dark:text-violet-400">
        Recommended after completing day {weekDay}.
      </p>

      <div className="space-y-6">
        {QUESTIONS.map((q) => (
          <label key={q.key} className="block">
            <span className="text-sm font-medium">{q.label}</span>
            <textarea
              value={answers[q.key]}
              onChange={(e) =>
                setAnswers((a) => ({ ...a, [q.key]: e.target.value }))
              }
              rows={3}
              className="mt-2 w-full rounded-xl border border-zinc-200 bg-white px-3 py-2 dark:border-zinc-700 dark:bg-zinc-900"
            />
          </label>
        ))}
      </div>

      <button
        type="button"
        onClick={save}
        className="w-full rounded-xl bg-violet-600 py-3 font-semibold text-white hover:bg-violet-500"
      >
        Save week {week} review
      </button>

      {progress.weeklyReviews[week]?.completedAt && (
        <p className="text-center text-sm text-emerald-600">
          Saved {new Date(progress.weeklyReviews[week].completedAt).toLocaleString()}
        </p>
      )}
    </div>
  );
}
