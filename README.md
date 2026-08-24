# Priya's Biology Progress — Student Progress Screen

A screen for a GCSE Biology student to see where she stands across 8 topics
and, more importantly, what to study next.

Built with Next.js (App Router), React, TypeScript and Tailwind CSS.

## Design decisions

**"Not started" is not "0%".** Two topics (Homeostasis, Inheritance) have
never been opened. Showing a red 0% bar next to a topic she's actually
attempted and failed (like Respiration at 23%) would visually equate "never
tried" with "struggling" — those are different problems with different
fixes. Not-started topics get a neutral dashed card and a "Not started"
label instead of a progress bar.

**"What to do next" is a real recommendation, not a random pick.** Every
topic gets an urgency score: `(100 − mastery) + staleness bonus`, capped so
old topics don't dominate purely on age; not-started topics get a fixed
baseline score (zero coverage is serious, but a topic that's both weak *and*
fading from memory is more urgent than one simply not yet begun). The logic
lives in `src/lib/priority.ts` and the reasoning is shown in the UI itself
("last opened 75 days ago") so it isn't a black box. With this data set it
correctly surfaces **Respiration** (23% mastery, only 6 questions, last
touched 75 days ago) ahead of the two untouched topics.

**Two different percentages, kept apart.** "Mastery" (per topic) and
"Syllabus coverage" (average mastery across all 8 topics, with not-started
counted as 0) are labelled separately so a good mastery score on attempted
topics doesn't get read as good exam-readiness overall.

**Exam countdown**, because the whole point of the screen is deciding what
to do with the time that's left, not just admiring past mastery.

## Structure

```
src/data/progress.ts        the given dataset, untouched
src/lib/priority.ts         tier logic + urgency scoring (pure, testable)
src/components/             ProgressHeader, CoverageStrip, NextUpCard, TopicCard
src/app/page.tsx            assembles the screen
```

## Run locally

```bash
npm install
npm run dev
```

## Deploy

```bash
npx vercel
```
or connect the GitHub repo at vercel.com/new.
