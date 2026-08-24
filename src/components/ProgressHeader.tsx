import { StudentData } from "@/data/progress";
import { daysUntil } from "@/lib/priority";

export function ProgressHeader({
  student,
  now,
}: {
  student: StudentData["student"];
  now: Date;
}) {
  const days = daysUntil(student.examDate, now);
  const weeks = Math.floor(days / 7);
  const examDateLabel = new Date(student.examDate + "T00:00:00").toLocaleDateString(
    "en-GB",
    { day: "numeric", month: "long", year: "numeric" }
  );

  return (
    <header className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
      <div>
        <p className="font-mono text-xs uppercase tracking-[0.18em] text-[var(--ink-muted)]">
          {student.examBoard} GCSE · {student.subject}
        </p>
        <h1 className="font-display mt-1 text-3xl font-medium tracking-tight text-[var(--ink)] sm:text-4xl">
          {student.name}&rsquo;s progress
        </h1>
      </div>

      <div className="flex items-center gap-4 rounded-xl border border-[var(--line)] bg-[var(--panel)] px-5 py-3">
        <div className="text-right">
          <p className="font-mono text-xs uppercase tracking-wide text-[var(--ink-muted)]">
            Exam day
          </p>
          <p className="text-sm text-[var(--ink)]">{examDateLabel}</p>
        </div>
        <div className="h-9 w-px bg-[var(--line)]" />
        <div>
          <p className="font-display text-2xl leading-none font-semibold text-[var(--brand-ink)]">
            {days}
          </p>
          <p className="font-mono text-xs text-[var(--ink-muted)]">
            days · {weeks} wks left
          </p>
        </div>
      </div>
    </header>
  );
}
