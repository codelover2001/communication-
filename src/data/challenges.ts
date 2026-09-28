import type { Challenge, PillarId, ScoringDimension } from "@/types";

const PILLAR_ROTATION: PillarId[] = [
  "zero-hesitation",
  "communication",
  "impromptu-thinking",
  "technical-communication",
];

const P1_EXERCISES: string[] = [
  "Say hello to someone you don't normally talk to. Use the 3-second rule.",
  "Ask someone for their opinion on something small. Act within 3 seconds.",
  "Start a 30-second conversation with a colleague.",
  "Ask a colleague a non-work question.",
  "Make one phone call instead of texting.",
  "Introduce yourself to someone new.",
  "Ask someone for a recommendation (food, book, tool).",
  "Start a conversation and keep it going for 2 minutes.",
  "Ask three follow-up questions in one conversation.",
  "Join an existing group conversation for at least 1 minute.",
  "Talk to someone new at work.",
  "Give someone a genuine compliment.",
  "Have one conversation without checking your phone.",
  "Ask a question publicly (meeting, standup, or group chat).",
  "Express an opinion without excessive qualification.",
  "Politely disagree with someone respectfully.",
  "Ask a senior person for advice.",
  "Start a conversation with someone you find intimidating.",
  "Attend something alone (coffee, event, walk).",
  "Tell someone a short personal story.",
  "Ask a senior engineer a technical question in person.",
  "Share one idea in a meeting.",
  "Explain something to a teammate without slides.",
  "Ask for feedback on your work.",
  "Volunteer for a small task in a meeting.",
  "Give your opinion in a discussion without saying 'maybe' five times.",
  "Initiate 5 conversations today. Track hesitation time for each.",
  "Have 2 intimidating conversations. Rejection counts as success.",
  "FINAL BOSS prep: 10 social reps with varied difficulty.",
  "FINAL BOSS: 15 interactions, 5 intros, 3 long convos, 2 intimidating, 1 group, 1 disagreement, 1 story, 1 spontaneous act.",
];

const P2_PROMPTS: string[] = [
  "Describe your morning routine in simple English.",
  "What is one habit you want to build this year?",
  "Explain what you do at work to a non-technical friend.",
  "What is the biggest technical mistake you've made?",
  "Describe a project you're proud of.",
  "What would you do if you had an extra hour each day?",
  "Explain caching to a beginner.",
  "Tell a story about a time you learned something hard.",
  "What is one opinion you hold that others might disagree with?",
  "How do you handle stress at work?",
  "Explain REST APIs in 2 minutes.",
  "Describe your ideal team culture.",
  "What skill are you building right now and why?",
  "Walk through a bug you fixed recently.",
  "If you could change one thing about your industry, what would it be?",
  "Explain load balancing without jargon.",
  "Describe a failure and what you learned.",
  "What does good communication look like on your team?",
  "10-minute conversation practice: record a continuous monologue on your career path.",
];

const P3_QUESTIONS: string[] = [
  "What are the pros and cons of microservices?",
  "How would you design a URL shortener?",
  "Should every backend use Kafka?",
  "How do you prioritize when everything is urgent?",
  "What would you do if production went down right now?",
  "SQL vs NoSQL — when do you pick each?",
  "How do you handle conflicting requirements from stakeholders?",
  "What is more important: speed or quality?",
  "How would you onboard a new engineer in one week?",
  "Explain eventual consistency to a PM.",
  "What is your approach to technical debt?",
  "How do you estimate unknown work?",
  "Design a notification system for 1M users.",
  "What would you do if a teammate disagreed with your architecture?",
  "Unknown: How would you migrate a monolith with zero downtime?",
  "Pressure: answer, then handle 3 follow-up challenges.",
  "5-minute unknown problem with follow-ups and one disagreement.",
];

const P4_TOPICS: string[] = [
  "Explain REST in 2 minutes (What → Why → How → Example → Trade-off).",
  "Explain Redis and when not to use it.",
  "Explain Kafka at a high level with trade-offs.",
  "SQL indexes — how they work and when they hurt.",
  "Caching strategies: cache-aside vs write-through.",
  "Project story: MySQL → PostgreSQL migration (3–5 min).",
  "Project story: Traffic Capture Replay Framework.",
  "Project story: Projects API → CMS migration.",
  "Architecture: sync vs async communication.",
  "SQL vs NoSQL for a new product.",
  "Kafka vs traditional message queue.",
  "Consistency vs availability — pick and defend.",
  "Deep follow-ups: attack your own answer (why, scale, failure).",
  "Explain Change Order UI architecture and trade-offs.",
  "Explain Budget UI data flow and edge cases.",
  "Design for 10× scale on a system you know.",
  "10-minute technical simulation: pitch, deep dive, trade-offs, unknown, disagreement.",
];

function phaseForDay(day: number, pillar: PillarId): string {
  if (pillar === "zero-hesitation") {
    if (day <= 7) return "break-the-fear";
    if (day <= 14) return "social-stamina";
    if (day <= 21) return "courage";
    if (day <= 27) return "professional-confidence";
    return "final-boss";
  }
  if (pillar === "communication") {
    if (day <= 7) return "fluency";
    if (day <= 14) return "conversation";
    if (day <= 21) return "structure";
    return "pressure";
  }
  if (pillar === "impromptu-thinking") {
    if (day <= 7) return "fast-retrieval";
    if (day <= 14) return "structure";
    if (day <= 21) return "unknowns";
    if (day <= 26) return "pressure";
    return "final-boss";
  }
  if (day <= 7) return "clarity";
  if (day <= 14) return "project-story";
  if (day <= 21) return "architecture";
  if (day <= 26) return "deep-follow-ups";
  return "final-boss";
}

function scoringForPillar(pillar: PillarId): ScoringDimension[] {
  if (pillar === "zero-hesitation") {
    return ["structure", "clarity", "pressureControl"];
  }
  if (pillar === "communication") {
    return ["clarity", "structure", "pressureControl"];
  }
  if (pillar === "impromptu-thinking") {
    return ["structure", "reasoning", "clarity", "pressureControl"];
  }
  return ["structure", "technicalDepth", "clarity", "tradeoffs"];
}

function prepAndSpeak(day: number, pillar: PillarId) {
  if (pillar === "zero-hesitation") {
    return { prepTime: 0, speakingTarget: 0, pressureLevel: day <= 14 ? 2 : 4 };
  }
  if (pillar === "communication") {
    const speak = day <= 7 ? 60 : day <= 14 ? 120 : day <= 21 ? 180 : day === 30 ? 600 : 300;
    return { prepTime: 10, speakingTarget: speak, pressureLevel: Math.min(5, 1 + Math.floor(day / 7)) };
  }
  if (pillar === "impromptu-thinking") {
    const prep = day <= 7 ? 10 : day <= 21 ? 20 : day === 30 ? 10 : 30;
    const speak = day <= 7 ? 60 : day <= 14 ? 90 : day === 30 ? 300 : 120;
    return { prepTime: prep, speakingTarget: speak, pressureLevel: Math.min(5, 2 + Math.floor(day / 8)) };
  }
  const speak = day <= 7 ? 120 : day <= 14 ? 240 : day === 30 ? 600 : 300;
  return { prepTime: day <= 14 ? 30 : 45, speakingTarget: speak, pressureLevel: Math.min(5, 2 + Math.floor(day / 6)) };
}

function exerciseFor(day: number, pillar: PillarId): string {
  const idx = Math.min(day - 1, 29);
  if (pillar === "zero-hesitation") return P1_EXERCISES[idx];
  if (pillar === "communication") {
    const base = P2_PROMPTS[Math.min(idx, P2_PROMPTS.length - 1)];
    if (day <= 7) {
      return `45-min routine focus: 10 shadow, 10 think-in-English, 10 record, 10 read aloud, 5 review.\n\nToday's impromptu prompt: "${base}"\nTarget: 1 minute, no restart.`;
    }
    if (day <= 14) {
      return `Continue daily routine. Impromptu prompt: "${base}"\nTarget: 2 minutes continuous speaking.`;
    }
    if (day <= 21) {
      return `Use Point → Reason → Example → Conclusion.\nPrompt: "${base}"\nTarget: 3 minutes.`;
    }
    return `Pressure speaking. Prompt: "${base}"\nNo preparation beyond 10 seconds. Don't restart recording.`;
  }
  if (pillar === "impromptu-thinking") {
    const q = P3_QUESTIONS[Math.min(idx, P3_QUESTIONS.length - 1)];
    return `THINK → STRUCTURE → SPEAK\n\nQuestion: "${q}"\nUse PREP when helpful. Say "Let me think about that for a second" if needed.`;
  }
  const t = P4_TOPICS[Math.min(idx, P4_TOPICS.length - 1)];
  return `Framework: What → Why → How → Example → Trade-off\n\n${t}`;
}

function titleFor(day: number, pillar: PillarId, phase: string): string {
  const titles: Record<PillarId, Record<string, string>> = {
    "zero-hesitation": {
      "break-the-fear": "Break the Fear",
      "social-stamina": "Social Stamina",
      courage: "Courage Reps",
      "professional-confidence": "Professional Confidence",
      "final-boss": "Final Boss — Social",
    },
    communication: {
      fluency: "Fluency Reps",
      conversation: "Conversation Flow",
      structure: "Structured Speaking",
      pressure: "Pressure Speaking",
    },
    "impromptu-thinking": {
      "fast-retrieval": "Fast Retrieval",
      structure: "Structured Answers",
      unknowns: "Unknown Problems",
      pressure: "Pressure & Follow-ups",
      "final-boss": "Final Boss — Thinking",
    },
    "technical-communication": {
      clarity: "Technical Clarity",
      "project-story": "Project Storytelling",
      architecture: "Architecture & Trade-offs",
      "deep-follow-ups": "Deep Follow-ups",
      "final-boss": "Final Boss — Technical",
    },
  };
  return `Day ${day} — ${titles[pillar][phase] ?? "Daily Mission"}`;
}

export function getPrimaryPillarForDay(day: number): PillarId {
  return PILLAR_ROTATION[(day - 1) % 4];
}

export function getChallengeForDay(day: number, pillar?: PillarId): Challenge {
  const p = pillar ?? getPrimaryPillarForDay(day);
  const phase = phaseForDay(day, p);
  const { prepTime, speakingTarget, pressureLevel } = prepAndSpeak(day, p);
  return {
    day,
    pillar: p,
    phase,
    title: titleFor(day, p, phase),
    exercise: exerciseFor(day, p),
    prepTime,
    speakingTarget,
    pressureLevel,
    scoring: scoringForPillar(p),
    optionalTips:
      p === "zero-hesitation"
        ? [
            "3-second rule: act before you rehearse.",
            "Awkwardness is allowed.",
            "Rejection counts as a successful rep.",
          ]
        : undefined,
  };
}

export function getAllChallengesForDay(day: number): Challenge[] {
  return PILLAR_ROTATION.map((pillar) => getChallengeForDay(day, pillar));
}

export const TOTAL_PROGRAM_DAYS = 30;

export const WEEKLY_REVIEW_DAYS = [7, 14, 21, 28];
