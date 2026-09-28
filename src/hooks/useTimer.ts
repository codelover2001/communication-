"use client";

import { useCallback, useEffect, useRef, useState } from "react";

export type TimerPhase = "idle" | "prep" | "speak" | "done";

export function useTimer(prepSeconds: number, speakSeconds: number) {
  const [phase, setPhase] = useState<TimerPhase>("idle");
  const [remaining, setRemaining] = useState(0);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const clear = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  }, []);

  useEffect(() => () => clear(), [clear]);

  const tick = useCallback(
    (onSpeakStart?: () => void, onComplete?: () => void) => {
      intervalRef.current = setInterval(() => {
        setRemaining((r) => {
          if (r <= 1) {
            clear();
            if (phase === "prep" && speakSeconds > 0) {
              setPhase("speak");
              onSpeakStart?.();
              setRemaining(speakSeconds);
              tick(undefined, onComplete);
              return speakSeconds;
            }
            setPhase("done");
            onComplete?.();
            return 0;
          }
          return r - 1;
        });
      }, 1000);
    },
    [clear, phase, speakSeconds],
  );

  const start = useCallback(
    (onSpeakStart?: () => void, onComplete?: () => void) => {
      clear();
      if (prepSeconds <= 0 && speakSeconds <= 0) {
        setPhase("done");
        onComplete?.();
        return;
      }
      if (prepSeconds > 0) {
        setPhase("prep");
        setRemaining(prepSeconds);
      } else {
        setPhase("speak");
        setRemaining(speakSeconds);
      }
      tick(onSpeakStart, onComplete);
    },
    [clear, prepSeconds, speakSeconds, tick],
  );

  const reset = useCallback(() => {
    clear();
    setPhase("idle");
    setRemaining(0);
  }, [clear]);

  const format = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
  };

  return {
    phase,
    remaining,
    formatted: format(remaining),
    start,
    reset,
    isRunning: phase === "prep" || phase === "speak",
  };
}
