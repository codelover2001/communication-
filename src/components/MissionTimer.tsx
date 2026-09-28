"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { cn } from "@/lib/cn";

type Phase = "idle" | "prep" | "speak" | "done";

export function MissionTimer({
  prepTime,
  speakingTarget,
  onComplete,
}: {
  prepTime: number;
  speakingTarget: number;
  onComplete?: () => void;
}) {
  const [phase, setPhase] = useState<Phase>("idle");
  const [remaining, setRemaining] = useState(0);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const phaseRef = useRef<Phase>("idle");

  const format = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
  };

  const clear = useCallback(() => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    intervalRef.current = null;
  }, []);

  useEffect(() => () => clear(), [clear]);

  const runCountdown = useCallback(
    (seconds: number, nextPhase: Phase, onEnd: () => void) => {
      setRemaining(seconds);
      intervalRef.current = setInterval(() => {
        setRemaining((r) => {
          if (r > 1) return r - 1;
          clear();
          onEnd();
          return 0;
        });
      }, 1000);
    },
    [clear],
  );

  const start = () => {
    clear();
    if (prepTime <= 0 && speakingTarget <= 0) {
      phaseRef.current = "done";
      setPhase("done");
      onComplete?.();
      return;
    }
    if (prepTime > 0) {
      phaseRef.current = "prep";
      setPhase("prep");
      runCountdown(prepTime, "speak", () => {
        if (speakingTarget > 0) {
          phaseRef.current = "speak";
          setPhase("speak");
          runCountdown(speakingTarget, "done", () => {
            phaseRef.current = "done";
            setPhase("done");
            onComplete?.();
          });
        } else {
          phaseRef.current = "done";
          setPhase("done");
          onComplete?.();
        }
      });
    } else {
      phaseRef.current = "speak";
      setPhase("speak");
      runCountdown(speakingTarget, "done", () => {
        phaseRef.current = "done";
        setPhase("done");
        onComplete?.();
      });
    }
  };

  const label =
    phase === "prep"
      ? "THINK"
      : phase === "speak"
        ? "SPEAK"
        : phase === "done"
          ? "COMPLETE"
          : "READY";

  return (
    <div className="rounded-2xl border border-zinc-200 bg-zinc-50 p-6 text-center dark:border-zinc-700 dark:bg-zinc-900/50">
      <p
        className={cn(
          "text-xs font-bold uppercase tracking-[0.3em]",
          phase === "speak" && "text-emerald-500",
          phase === "prep" && "text-amber-500",
        )}
      >
        {label}
      </p>
      <p className="mt-2 font-mono text-5xl font-bold tabular-nums text-zinc-900 dark:text-white">
        {phase === "idle" ? "--:--" : format(remaining)}
      </p>
      {phase === "idle" && (
        <button
          type="button"
          onClick={start}
          className="mt-6 rounded-xl bg-violet-600 px-8 py-3 text-sm font-semibold text-white shadow-lg shadow-violet-500/25 transition hover:bg-violet-500"
        >
          START TIMER
        </button>
      )}
      {phase !== "idle" && phase !== "done" && (
        <p className="mt-4 text-sm text-zinc-500">Stay with it. No restarting.</p>
      )}
    </div>
  );
}
