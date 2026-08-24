import { Topic } from "@/data/progress";

export type Tier = "strong" | "building" | "atRisk" | "notStarted";

export function daysSince(dateStr: string | null, now: Date): number | null {
  if (!dateStr) return null;
  const then = new Date(dateStr + "T00:00:00");
  const ms = now.getTime() - then.getTime();
  return Math.max(0, Math.round(ms / (1000 * 60 * 60 * 24)));
}

export function daysUntil(dateStr: string, now: Date): number {
  const then = new Date(dateStr + "T00:00:00");
  const ms = then.getTime() - now.getTime();
  return Math.ceil(ms / (1000 * 60 * 60 * 24));
}

export function getTier(topic: Topic): Tier {
  if (topic.lastStudied === null && topic.questionsAttempted === 0) {
    return "notStarted";
  }
  if (topic.mastery >= 80) return "strong";
  if (topic.mastery >= 45) return "building";
  return "atRisk";
}

/**
 * Urgency score used to decide what a student should revise next.
 *
 * Rationale (shown in the UI so the recommendation isn't a black box):
 * - Lower mastery is more urgent: weight = (100 - mastery).
 * - A topic that's gone stale (not revisited in a while) decays in
 *   working memory, so staleness adds urgency, capped so a topic
 *   studied once a year ago doesn't dominate purely on age.
 * - Not-started topics get a fixed high baseline (zero syllabus
 *   coverage is serious) but rank below a started topic that is both
 *   weak AND fading, because that topic is actively at risk of being
 *   forgotten before it's ever solidified.
 */
export function urgencyScore(topic: Topic, now: Date): number {
  if (topic.lastStudied === null && topic.questionsAttempted === 0) {
    return 85; // fixed baseline for zero coverage
  }
  const stale = daysSince(topic.lastStudied, now) ?? 0;
  const staleBonus = Math.min(stale, 90) / 3; // capped decay contribution
  return 100 - topic.mastery + staleBonus;
}

export function reasonFor(topic: Topic, now: Date): string {
  if (topic.lastStudied === null && topic.questionsAttempted === 0) {
    return "Not started yet — zero coverage on this topic.";
  }
  const stale = daysSince(topic.lastStudied, now) ?? 0;
  if (topic.mastery < 45 && stale > 30) {
    return `Weak and fading — ${topic.mastery}% mastery, last opened ${stale} days ago.`;
  }
  if (topic.mastery < 45) {
    return `Lowest mastery on the board, at ${topic.mastery}%.`;
  }
  if (stale > 30) {
    return `Going stale — it's been ${stale} days since the last session.`;
  }
  return `Mastery sitting at ${topic.mastery}%, worth another pass.`;
}

export function rankByUrgency(topics: Topic[], now: Date): Topic[] {
  return [...topics].sort((a, b) => urgencyScore(b, now) - urgencyScore(a, now));
}

export function tierMeta(tier: Tier) {
  switch (tier) {
    case "strong":
      return { label: "Strong", color: "var(--strong)", soft: "var(--strong-soft)" };
    case "building":
      return { label: "Building", color: "var(--building)", soft: "var(--building-soft)" };
    case "atRisk":
      return { label: "At risk", color: "var(--risk)", soft: "var(--risk-soft)" };
    case "notStarted":
      return { label: "Not started", color: "var(--not-started)", soft: "var(--not-started-soft)" };
  }
}
