import { Topic } from "@/data/progress";
import { daysSince, getTier, tierMeta } from "@/lib/priority";

export function TopicCard({ topic, now }: { topic: Topic; now: Date }) {
  const tier = getTier(topic);
  const meta = tierMeta(tier);
  const notStarted = tier === "notStarted";
  const stale = daysSince(topic.lastStudied, now);

  return (
    <article className="group flex h-full flex-col justify-between rounded-2xl border border-[var(--line)] bg-[var(--panel)] p-5 transition-all duration-200 hover:-translate-y-0.5 hover:border-[var(--brand)]/25 hover:shadow-[0_10px_24px_-16px_rgba(22,33,28,0.25)]">
      <div>
        <div className="flex items-start justify-between gap-3">
          <h3 className="font-display text-lg font-medium leading-snug text-[var(--ink)]">
            {topic.name}
          </h3>
          <span
            className="shrink-0 rounded-full px-2.5 py-1 font-mono text-[11px] font-medium"
            style={{ backgroundColor: meta.soft, color: meta.color }}
          >
            {meta.label}
          </span>
        </div>

        {notStarted ? (
          <div className="mt-4 rounded-lg border border-dashed border-[var(--line)] bg-[var(--not-started-soft)]/60 px-3 py-3">
            <p className="text-sm text-[var(--ink-muted)]">
              No sessions logged yet. This topic hasn&rsquo;t been introduced.
            </p>
          </div>
        ) : (
          <div className="mt-4">
            <div className="flex items-baseline justify-between">
              <span className="text-xs text-[var(--ink-muted)]">Mastery</span>
              <span className="num font-mono text-sm font-medium" style={{ color: meta.color }}>
                {topic.mastery}%
              </span>
            </div>
            <div className="mt-1.5 h-1.5 w-full overflow-hidden rounded-full bg-[var(--not-started-soft)]">
              <div
                className="h-full rounded-full transition-[width] duration-500 ease-out"
                style={{ width: `${topic.mastery}%`, backgroundColor: meta.color }}
              />
            </div>
          </div>
        )}
      </div>

      <dl className="mt-5 flex items-center justify-between border-t border-[var(--line)] pt-3">
        <div>
          <dt className="text-[11px] text-[var(--ink-muted)]">Questions</dt>
          <dd className="num font-mono text-sm text-[var(--ink)]">
            {topic.questionsAttempted}
          </dd>
        </div>
        <div className="text-right">
          <dt className="text-[11px] text-[var(--ink-muted)]">Last studied</dt>
          <dd className="num font-mono text-sm text-[var(--ink)]">
            {notStarted ? "—" : `${stale}d ago`}
          </dd>
        </div>
      </dl>
    </article>
  );
}
