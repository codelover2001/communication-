export const LEVELS = [
  { level: 1, name: "Avoider", xp: 0 },
  { level: 2, name: "Initiator", xp: 500 },
  { level: 3, name: "Speaker", xp: 1200 },
  { level: 4, name: "Thinker", xp: 2200 },
  { level: 5, name: "Communicator", xp: 3500 },
  { level: 6, name: "Engineer", xp: 5000 },
  { level: 7, name: "Pressure Proof", xp: 7000 },
] as const;

export function getLevelInfo(xp: number) {
  type LevelEntry = (typeof LEVELS)[number];
  let current: LevelEntry = LEVELS[0];
  let next: LevelEntry | null = LEVELS[1];
  for (let i = LEVELS.length - 1; i >= 0; i--) {
    if (xp >= LEVELS[i].xp) {
      current = LEVELS[i];
      next = LEVELS[i + 1] ?? null;
      break;
    }
  }
  const progressToNext = next
    ? ((xp - current.xp) / (next.xp - current.xp)) * 100
    : 100;
  return { current, next, progressToNext };
}

export const XP_REWARDS = {
  dailyMission: 100,
  optionalChallenge: 50,
  streak7: 300,
  pressureChallenge: 150,
  allFourPillars: 500,
  weeklyReview: 200,
  finalBoss: 1000,
} as const;
