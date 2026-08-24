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
      className="animate-rise relative overflow-hidden rounded-2xl border border-[var(--brand)]/30 bg-[var(--brand-ink)] p-6 text-[#f2f6f4] shadow-[0_8px_24px_-12px_rgba(15,65,55,0.5)] sm:p-8"
      style={{ animationDelay: "80ms" }}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute -right-16 -top-16 h-64 w-64 rounded-full opacity-25"
        style={{ background: "radial-gradient(circle, var(--brand-soft), transparent 70%)" }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.06]"
        style={{
          backgroundImage:
            "linear-gradient(135deg, transparent 0%, transparent 48%, #f2f6f4 48%, #f2f6f4 52%, transparent 52%, transparent 100%)",
          backgroundSize: "14px 14px",
        }}
      />

      <div className="relative flex items-center gap-2">
        <span className="flex h-6 w-6 items-center justify-center rounded-full bg-[#7fd6b4]/20">
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" aria-hidden>
            <path
              d="M13 2 4 14h6l-1 8 9-12h-6l1-8Z"
              fill="#7fd6b4"
            />
          </svg>
        </span>
        <p className="font-mono text-xs uppercase tracking-[0.2em] text-[var(--brand-soft)]">
          Next up
        </p>
      </div>

      <div className="relative mt-4 flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
        <div className="max-w-xl">
          <h2 className="font-display text-3xl font-medium tracking-tight sm:text-4xl">
            {topic.name}
          </h2>
          <p className="mt-2.5 text-sm leading-relaxed text-[#cfe0d8] sm:text-base">
            {reason}
          </p>

          <div className="mt-5 flex flex-wrap gap-2">
            <span
              className="rounded-full px-3 py-1 font-mono text-xs"
              style={{ backgroundColor: "rgba(242,246,244,0.12)" }}
            >
              {meta.label}
            </span>
            <span
              className="num rounded-full px-3 py-1 font-mono text-xs"
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
