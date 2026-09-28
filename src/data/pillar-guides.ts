import type { PillarId } from "@/types";

export interface PillarGuide {
  mantra: string;
  goal: string;
  mindset: string[];
  rules: { title: string; detail: string }[];
  beforeYouPractice: string[];
  howToAce: string[];
  commonMistakes: string[];
  dailyChecklist: string[];
  frameworks?: { label: string; text: string }[];
}

export const PILLAR_GUIDES: Record<PillarId, PillarGuide> = {
  "zero-hesitation": {
    mantra: "Notice → decide → act (within 3 seconds).",
    goal: "Stop avoiding. Courage is a behavior, not a feeling.",
    mindset: [
      "You don't need to feel confident to act.",
      "Awkward conversations still count as wins.",
      "Rejection after a respectful attempt = successful rep.",
      "Measure whether you acted, not whether it went perfectly.",
    ],
    rules: [
      {
        title: "3-second rule",
        detail:
          "When a reasonable social chance appears, move within 3 seconds. Don't rehearse the perfect line in your head.",
      },
      {
        title: "Awkwardness is allowed",
        detail: "The goal is to stop avoiding — not to charm everyone.",
      },
      {
        title: "Rejection = success",
        detail: "You initiated respectfully. That trains the habit you want.",
      },
      {
        title: "No fake confidence",
        detail: "Be yourself: 'I'm nervous, but I'm doing it anyway.'",
      },
    ],
    beforeYouPractice: [
      "Spot one opportunity you would normally skip today.",
      "Decide your minimum action (hello, one question, 30-second chat).",
      "When the moment comes, count 1-2-3 and move.",
    ],
    howToAce: [
      "Stack small reps daily (1–5 early, 5+ later in the program).",
      "Increase conversation length week by week.",
      "Add discomfort on purpose: opinions, questions in public, senior people.",
      "At work: ask, share one idea, ask for feedback — one action per day minimum.",
    ],
    commonMistakes: [
      "Waiting until you feel ready.",
      "Over-rehearsing instead of speaking.",
      "Only counting wins when the other person was enthusiastic.",
      "Avoiding the whole day because one interaction felt awkward.",
    ],
    dailyChecklist: [
      "I took at least one action I would have avoided before.",
      "I used the 3-second rule at least once.",
      "I did not cancel a rep because of fear.",
    ],
  },
  communication: {
    mantra: "Thought → speak (not thought → translate → worry → speak).",
    goal: "Simple, clear, spontaneous English — not fancy vocabulary.",
    mindset: [
      "Fluency beats perfection.",
      "One fix per day — not ten.",
      "Never restart the recording mid-session.",
      "Think in English during routine tasks when you can.",
    ],
    rules: [
      {
        title: "45-minute routine (when you have time)",
        detail:
          "10 shadow · 10 think-in-English · 10 impromptu record · 10 read aloud · 5 review one weakness.",
      },
      {
        title: "Impromptu rule",
        detail: "Pick a topic, hit record, keep talking. No restart.",
      },
      {
        title: "One weakness",
        detail:
          "After listening back, fix ONE thing tomorrow (fillers, speed, pauses, etc.).",
      },
    ],
    beforeYouPractice: [
      "Choose today's prompt or topic before you press record.",
      "Put phone on do-not-disturb for speaking block.",
      "Aim for continuous speech, even if messy.",
    ],
    howToAce: [
      "Week 1: survive 1 minute without freezing.",
      "Week 2: 2 minutes — questions, answers, follow-ups.",
      "Week 3: structure — Point → Reason → Example → Conclusion.",
      "Week 4: longer pressure reps; clarity over complexity.",
    ],
    commonMistakes: [
      "Translating from Hindi in your head while speaking.",
      "Stopping and restarting when you make a mistake.",
      "Trying to sound impressive instead of clear.",
      "Skipping the review step.",
    ],
    dailyChecklist: [
      "I spoke out loud today (recorded or live).",
      "I did not restart mid-recording.",
      "I noted one thing to improve tomorrow.",
    ],
    frameworks: [
      { label: "Buying time", text: "Let me think about that for a second." },
      { label: "Clarifying", text: "Just to make sure I understand..." },
      { label: "Rephrase", text: "Let me rephrase that." },
      { label: "Uncertainty", text: "I'm not completely sure, but my understanding is..." },
      { label: "Structure", text: "There are three things I'd consider." },
      { label: "Summary", text: "So, in short..." },
      { label: "Disagree", text: "I see your point, but I look at it slightly differently." },
    ],
  },
  "impromptu-thinking": {
    mantra: "THINK → STRUCTURE → SPEAK.",
    goal: "Reasonable answers under pressure — even when you don't know yet.",
    mindset: [
      "2–5 seconds of silence is professional, not failure.",
      "Structure buys you time and clarity.",
      "You can reason without having the answer memorized.",
      "Rambling is a structure problem, not an intelligence problem.",
    ],
    rules: [
      {
        title: "Pause",
        detail: 'Say: "Let me think about that for a second." Then structure.',
      },
      {
        title: "PREP",
        detail: "Point → Reason → Example → Point (repeat).",
      },
      {
        title: "Unknowns",
        detail:
          "Clarify → assumptions → break down → reason → conclusion. Don't fake certainty.",
      },
    ],
    beforeYouPractice: [
      "Read the question twice.",
      "Pick a structure before you speak (2–3 buckets).",
      "Set a timer — stop when it ends.",
    ],
    howToAce: [
      "Train retrieval: short prep, 60s answers.",
      "Train structure: PREP on hard questions.",
      "Train unknowns: no Googling — reason out loud.",
      "Train pressure: follow-ups, pushback, changing assumptions.",
    ],
    commonMistakes: [
      "Starting to speak before you have a structure.",
      "Freezing instead of clarifying the question.",
      "Contradicting yourself mid-answer.",
      "Giving up when challenged instead of adjusting.",
    ],
    dailyChecklist: [
      "I used a visible structure (PREP or numbered points).",
      "I recovered at least once if I got stuck.",
      "I answered at least one question I did not know in advance.",
    ],
    frameworks: [
      { label: "Unknown", text: "I'm not completely sure, so I'd break the problem down first." },
      { label: "Angles", text: "I'd look at this from three angles." },
      { label: "Trade-off", text: "It depends on — let me call out the trade-off." },
    ],
  },
  "technical-communication": {
    mantra: "What → Why → How → Example → Trade-off.",
    goal: "Another engineer understands your thinking — and you can defend it.",
    mindset: [
      "Knowing the answer is not enough; explaining the why is the job.",
      "Trade-offs separate senior communication from textbook definitions.",
      "Your projects are your best practice material.",
      "Follow-up questions are part of the exercise — welcome them.",
    ],
    rules: [
      {
        title: "Concept framework",
        detail: "What is it? Why use it? How does it work? Example? What do you sacrifice?",
      },
      {
        title: "Project framework",
        detail:
          "Context → Problem → Options → Decision → Your contribution → Architecture → Result → Trade-offs → Failure modes.",
      },
      {
        title: "Self-attack",
        detail:
          "After each answer ask: Why not the alternative? What breaks at scale? What fails in deploy?",
      },
    ],
    beforeYouPractice: [
      "Pick one concept or one project slice (not the whole career).",
      "Sketch 3 bullets on paper — don't memorize a script.",
      "End with one trade-off you chose consciously.",
    ],
    howToAce: [
      "Week 1: explain simple concepts in ~2 minutes.",
      "Week 2: tell project stories with clear ownership ('I did X').",
      "Week 3: architecture debates — SQL vs NoSQL, sync vs async, etc.",
      "Week 4: deep follow-ups and unknown technical questions.",
    ],
    commonMistakes: [
      "Definition dumping without why or trade-offs.",
      "Hiding behind 'we' when describing your work.",
      "No example from real experience.",
      "Getting defensive instead of clarifying assumptions.",
    ],
    dailyChecklist: [
      "I explained one technical idea out loud today.",
      "I stated at least one trade-off.",
      "I could answer one 'why not X instead?' follow-up.",
    ],
    frameworks: [
      { label: "Project pitch", text: "Context, problem, what I built, outcome." },
      { label: "Defense", text: "We chose X because Y; the cost was Z." },
      { label: "Scale", text: "At 10×, the bottleneck would likely be..." },
    ],
  },
};
