import { Topic } from "@/data/progress";
import { getTier, reasonFor, tierMeta } from "@/lib/priority";
import { MasteryRing } from "./MasteryRing";

export function NextUpCard({ topic, now }: { topic: Topic; now: Date }) {
  const tier = getTier(topic);
  const meta = tierMeta(tier);
  const reason = reasonFor(topic, now);
  const notStarted = tier === "notStarted";

  return (
    <section
      aria-label="Recommended next topic"
      className="relative overflow-hidden rounded-2xl border border-[var(--brand)]/30 bg-[var(--brand-ink)] p-6 text-[#f2f6f4] sm:p-8"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute -right-16 -top-16 h-56 w-56 rounded-full opacity-20"
        style={{ background: "radial-gradient(circle, var(--brand-soft), transparent 70%)" }}
      />

      <p className="font-mono text-xs uppercase tracking-[0.18em] text-[var(--brand-soft)]">
        Next up
      </p>

      <div className="mt-3 flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
        <div className="max-w-xl">
          <h2 className="font-display text-2xl font-medium sm:text-3xl">{topic.name}</h2>
          <p className="mt-2 text-sm text-[#cfe0d8] sm:text-base">{reason}</p>

          <div className="mt-4 flex flex-wrap gap-2">
            <span
              className="rounded-full px-3 py-1 font-mono text-xs"
              style={{ backgroundColor: "rgba(242,246,244,0.12)" }}
            >
              {meta.label}
            </span>
            <span
              className="rounded-full px-3 py-1 font-mono text-xs"
              style={{ backgroundColor: "rgba(242,246,244,0.12)" }}
            >
              {topic.questionsAttempted} questions attempted
            </span>
          </div>
        </div>

        {!notStarted && (
          <div className="shrink-0 rounded-xl bg-[#f2f6f4]/[0.06] p-3">
            <MasteryRing value={topic.mastery} color="#7fd6b4" trackColor="rgba(242,246,244,0.15)" />
          </div>
        )}
      </div>
    </section>
  );
}
