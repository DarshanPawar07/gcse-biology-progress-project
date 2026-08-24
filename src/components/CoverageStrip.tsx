import { Topic } from "@/data/progress";
import { getTier, tierMeta, Tier } from "@/lib/priority";

const TIER_ORDER: Tier[] = ["strong", "building", "atRisk", "notStarted"];

export function CoverageStrip({ topics }: { topics: Topic[] }) {
  const counts: Record<Tier, number> = {
    strong: 0,
    building: 0,
    atRisk: 0,
    notStarted: 0,
  };
  topics.forEach((t) => {
    counts[getTier(t)]++;
  });

  // Coverage = average mastery across the full syllabus slice, treating
  // not-started topics as 0 contribution — this is a coverage figure,
  // deliberately labelled differently from "mastery" so it isn't read
  // as an average of only the topics she's touched.
  const coverage = Math.round(
    topics.reduce((sum, t) => sum + t.mastery, 0) / topics.length
  );

  return (
    <section
      aria-label="Overall syllabus coverage"
      className="rounded-2xl border border-[var(--line)] bg-[var(--panel)] p-5 sm:p-6"
    >
      <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-4">
          <div className="w-full max-w-[180px]">
            <div className="flex items-baseline justify-between">
              <span className="font-mono text-xs uppercase tracking-wide text-[var(--ink-muted)]">
                Syllabus coverage
              </span>
              <span className="font-mono text-sm font-medium text-[var(--ink)]">
                {coverage}%
              </span>
            </div>
            <div className="mt-2 h-2 w-full overflow-hidden rounded-full bg-[var(--not-started-soft)]">
              <div
                className="h-full rounded-full bg-[var(--brand)]"
                style={{ width: `${coverage}%` }}
              />
            </div>
            <p className="mt-1.5 text-xs text-[var(--ink-muted)]">
              across all {topics.length} topics, not-started counted as 0
            </p>
          </div>
        </div>

        <dl className="grid grid-cols-2 gap-x-6 gap-y-3 sm:flex sm:gap-6">
          {TIER_ORDER.map((tier) => {
            const meta = tierMeta(tier);
            return (
              <div key={tier} className="flex items-center gap-2">
                <span
                  className="h-2.5 w-2.5 rounded-full"
                  style={{ backgroundColor: meta.color }}
                />
                <div>
                  <dt className="text-xs text-[var(--ink-muted)]">{meta.label}</dt>
                  <dd className="font-mono text-sm font-medium text-[var(--ink)]">
                    {counts[tier]}
                  </dd>
                </div>
              </div>
            );
          })}
        </dl>
      </div>
    </section>
  );
}
