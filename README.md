# GCSE Biology Progress — Priya

**Deployed:** https://gcse-biology-progress-project.vercel.app/

1. **Design decisions:** I made "what to study next" the most visible thing on the screen — a single scored recommendation with its reasoning shown, not a flat list of 8 rows — because a student under exam pressure needs a decision, not a data dump. I also refused to show not-started topics as "0% mastery," since that would visually equate "never opened it" with "tried and failed"; they get their own neutral state instead.

2. **AI tools used:** I used Claude to scaffold the Next.js/Tailwind app and write the urgency-scoring logic. It first diagnosed a hydration warning as a `Date()` timing issue and applied `force-dynamic`, but that didn't fix it — testing in the browser showed the real cause was a browser extension injecting an attribute onto `<html>`, which I caught by pasting the actual console error back, leading to the correct fix (`suppressHydrationWarning`).