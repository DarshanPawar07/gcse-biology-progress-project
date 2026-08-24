import { progressData } from "@/data/progress";
import { rankByUrgency } from "@/lib/priority";
import { ProgressHeader } from "@/components/ProgressHeader";
import { CoverageStrip } from "@/components/CoverageStrip";
import { NextUpCard } from "@/components/NextUpCard";
import { TopicCard } from "@/components/TopicCard";

export default function Home() {
  const now = new Date();
  const { student, topics } = progressData;
  const ranked = rankByUrgency(topics, now);
  const nextTopic = ranked[0];
  const rest = ranked.slice(1);

  return (
    <main className="mx-auto flex max-w-5xl flex-col gap-8 px-5 py-10 sm:px-8 sm:py-14">
      <ProgressHeader student={student} now={now} />
      <CoverageStrip topics={topics} />
      <NextUpCard topic={nextTopic} now={now} />

      <section>
        <div className="mb-4 flex items-baseline justify-between">
          <h2 className="font-display text-lg font-medium text-[var(--ink)]">
            All topics
          </h2>
          <p className="text-xs text-[var(--ink-muted)]">
            sorted by what needs attention first
          </p>
        </div>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {rest.map((topic) => (
            <TopicCard key={topic.id} topic={topic} now={now} />
          ))}
        </div>
      </section>

      <footer className="pt-4 text-center text-xs text-[var(--ink-muted)]">
        Keep going, {student.name} — steady sessions beat cramming.
      </footer>
    </main>
  );
}
