import { PILLAR_GUIDES } from "@/data/pillar-guides";
import { PILLAR_META, type PillarId } from "@/types";
import { cn } from "@/lib/cn";

export function PillarGuidePanel({ pillar }: { pillar: PillarId }) {
  const guide = PILLAR_GUIDES[pillar];
  const meta = PILLAR_META[pillar];

  return (
    <div className="space-y-8">
      <div
        className={cn(
          "rounded-2xl border p-6",
          meta.border,
          "bg-gradient-to-br",
          meta.gradient,
        )}
      >
        <p className="text-xs font-bold uppercase tracking-widest text-zinc-500">
          Keep in mind
        </p>
        <p className="mt-2 text-lg font-semibold text-zinc-900 dark:text-zinc-50">
          {guide.mantra}
        </p>
        <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
          {guide.goal}
        </p>
      </div>

      <Section title="Mindset">
        <ul className="space-y-2">
          {guide.mindset.map((item) => (
            <li
              key={item}
              className="flex gap-2 text-sm text-zinc-700 dark:text-zinc-300"
            >
              <span className="text-violet-500">•</span>
              {item}
            </li>
          ))}
        </ul>
      </Section>

      <Section title="Rules that matter">
        <div className="space-y-3">
          {guide.rules.map((r) => (
            <div
              key={r.title}
              className="rounded-xl border border-zinc-200 p-4 dark:border-zinc-800"
            >
              <p className="font-medium text-zinc-900 dark:text-zinc-100">
                {r.title}
              </p>
              <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">
                {r.detail}
              </p>
            </div>
          ))}
        </div>
      </Section>

      <Section title="Before you practice">
        <ol className="list-decimal space-y-2 pl-5 text-sm text-zinc-700 dark:text-zinc-300">
          {guide.beforeYouPractice.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ol>
      </Section>

      <Section title="How to ace this pillar">
        <ol className="list-decimal space-y-2 pl-5 text-sm text-zinc-700 dark:text-zinc-300">
          {guide.howToAce.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ol>
      </Section>

      <Section title="Avoid these traps">
        <ul className="space-y-2">
          {guide.commonMistakes.map((item) => (
            <li
              key={item}
              className="rounded-lg bg-rose-500/5 px-3 py-2 text-sm text-zinc-700 dark:text-zinc-300"
            >
              {item}
            </li>
          ))}
        </ul>
      </Section>

      <Section title="End-of-day checklist">
        <ul className="space-y-2">
          {guide.dailyChecklist.map((item) => (
            <li
              key={item}
              className="flex gap-2 text-sm text-zinc-700 dark:text-zinc-300"
            >
              <span className="text-emerald-500">✓</span>
              {item}
            </li>
          ))}
        </ul>
      </Section>

      {guide.frameworks && guide.frameworks.length > 0 && (
        <Section title="Phrases to make automatic">
          <div className="grid gap-2 sm:grid-cols-2">
            {guide.frameworks.map((f) => (
              <div
                key={f.text}
                className="rounded-xl border border-zinc-200 p-3 dark:border-zinc-800"
              >
                <p className="text-xs font-medium uppercase text-zinc-500">
                  {f.label}
                </p>
                <p className="mt-1 text-sm font-medium">{f.text}</p>
              </div>
            ))}
          </div>
        </Section>
      )}
    </div>
  );
}

function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section>
      <h2 className="mb-3 text-base font-semibold text-zinc-900 dark:text-zinc-50">
        {title}
      </h2>
      {children}
    </section>
  );
}
