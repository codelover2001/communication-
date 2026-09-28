export type PillarId =
  | "zero-hesitation"
  | "communication"
  | "impromptu-thinking"
  | "technical-communication";

export type ScoringDimension =
  | "structure"
  | "reasoning"
  | "clarity"
  | "pressureControl"
  | "technicalDepth"
  | "tradeoffs";

export interface Challenge {
  day: number;
  pillar: PillarId;
  phase: string;
  title: string;
  exercise: string;
  prepTime: number;
  speakingTarget: number;
  pressureLevel: number;
  scoring: ScoringDimension[];
  optionalTips?: string[];
}

export interface DayScores {
  structure?: number;
  reasoning?: number;
  clarity?: number;
  pressureControl?: number;
  technicalDepth?: number;
  tradeoffs?: number;
}

export interface PillarDayMetrics {
  socialInteractions?: number;
  hesitationSeconds?: number;
  threeSecondSuccess?: number;
  speakingMinutes?: number;
  shadowingMinutes?: number;
  fillerWords?: number;
}

export interface DayRecord {
  completed: boolean;
  primaryPillar: PillarId;
  /** Simple 1–5 self-rating for daily use */
  sessionRating?: number;
  nervousness?: number;
  scores?: DayScores;
  reflection?: { mistake: string; tomorrow: string };
  metrics?: PillarDayMetrics;
  xpEarned?: number;
  completedAt?: string;
  optionalChallenge?: boolean;
}

export interface AppProgress {
  version: 1;
  programStartDate?: string;
  xp: number;
  dayRecords: Record<number, DayRecord>;
  weeklyReviews: Record<number, WeeklyReviewAnswers>;
  finalBossCompleted?: boolean;
}

export interface WeeklyReviewAnswers {
  avoided: string;
  communicationHabit: string;
  froze: string;
  technicalBetter: string;
  weakness: string;
  nextWeek: string;
  completedAt: string;
}

export const PILLAR_META: Record<
  PillarId,
  {
    name: string;
    shortName: string;
    question: string;
    outcome: string;
    emoji: string;
    color: string;
    gradient: string;
    border: string;
  }
> = {
  "zero-hesitation": {
    name: "Zero Hesitation",
    shortName: "Act",
    question: "Will I act despite fear?",
    outcome: "Courage + social confidence",
    emoji: "🟥",
    color: "text-rose-400",
    gradient: "from-rose-500/20 to-rose-600/5",
    border: "border-rose-500/30",
  },
  communication: {
    name: "Communication & English",
    shortName: "Speak",
    question: "Can I express my thoughts clearly?",
    outcome: "Fluency + conversational ability",
    emoji: "🟦",
    color: "text-sky-400",
    gradient: "from-sky-500/20 to-sky-600/5",
    border: "border-sky-500/30",
  },
  "impromptu-thinking": {
    name: "Impromptu Thinking",
    shortName: "Think",
    question: "Can I think clearly without preparation?",
    outcome: "Structured thinking + pressure handling",
    emoji: "🟩",
    color: "text-emerald-400",
    gradient: "from-emerald-500/20 to-emerald-600/5",
    border: "border-emerald-500/30",
  },
  "technical-communication": {
    name: "Technical Communication",
    shortName: "Explain",
    question: "Can I explain and defend technical ideas?",
    outcome: "Strong engineer communication",
    emoji: "🟨",
    color: "text-amber-400",
    gradient: "from-amber-500/20 to-amber-600/5",
    border: "border-amber-500/30",
  },
};
