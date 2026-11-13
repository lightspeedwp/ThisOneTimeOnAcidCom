# Prompt 03A — Podcast decisions and data contract

Stage: 03A · Requirements: POD-01, POD-02 · Tasks: POD-T001–T006 · Context: TOA-441, TOA-309 (reference only)

```text
GOAL
Resolve the podcast decisions and propose a field-level data contract with
eligibility. No route registration and no player work in this stage.

INSPECT
src/app/data/types/podcast.ts
src/app/data/mock/podcasts/episodes.ts, episodes-season1.ts, index.ts,
categories.ts, tags.ts
src/app/data/mock/ui/podcasts.ts
content/podcasts/welcome-to-neon-vs-atomic-black.md,
the-dancefloor-gave-me-everything.md, berlin-calling.md,
six-cats-and-the-green-garden.md
All consumers, including search (SearchResultsPage imports podcast data at
55079087 although no podcast route is registered).
Re-inspect index.ts: earlier Make reports disagree on whether it maps
Markdown or only re-exports TypeScript data.

DECISIONS TO OBTAIN (decisions Q-11–Q-18)
Show identity and relationship to the book; editorial source authority and
transformation; canonical routes/origin; audio hosting; preview/public
eligibility; first-episode audio and recording-checked text revisions, date
and duration; chronology clarification if the selected episode contains the
South Africa / Berlin "first face" passages; rights, credits, disclosure.
Do not infer approval from publishedAt, filenames, example.com audio or mock
data. Distinguish notes, scripts and recording-checked text.

RETURN
Contract table: field | source authority | current consumer | proposed
transformation | validation | missing-input behaviour | eligibility.
Unpublished-content exclusion before public bundling and from search/counts.
Label any adapter or parser as a proposed new file; invent no path before
the contract is accepted. No dependencies or providers.

ACCEPTANCE
POD-01: one eligible episode; nothing ineligible reaches public data,
search or counts. POD-02: approved media/text revisions, rights and credits
identified. Check V-POD-01, V-POD-03.
```

```text
PROTOCOL (applies to this stage; self-contained)
1. Goal and stage are named above. Do only this stage.
2. Re-read: .github/specs/004-book-website-make/staged/spec.md, plan.md (this
   stage), tasks.md (this phase), decisions.md, sources.md, verification.md
   and this prompt file. Do not rely on chat memory, Linear or skills.
3. Record the current Make snapshot (branch, local commit) and its relation
   to GitHub main. Do not assume they match or infer a push.
4. Inspect the actual files and active consumers listed in this prompt. Similar names
   are not proof of use. Label each path: verified / inferred counterpart /
   proposed new.
5. Restate the requirements, acceptance criteria and exclusions in this prompt.
6. Show exact proposed diffs or new-file bodies BEFORE any edit.
7. List intentional non-changes and consequential effects.
8. STOP for Ash's exact approval and bounded authority to resume.
9. After approval, re-read affected files before writing.
10. If source changed materially since the preview, stop for revised approval.
11. Perform only checks Ash authorised; report results as passed / failed /
    Not run. Separate static, calculated, runtime and deployment evidence.
12. Report actual changed files and results, then stop at the checkpoint:
    - all required checks passed or exceptions explicitly accepted, no
      blocking findings → list changed files, checks, exceptions, target
      repository lightspeedwp/ThisOneTimeOnAcidCom and branch main; note a
      push to main may trigger a Netlify production deploy; end with the
      standalone line:  Commit to GitHub
    - otherwise end with:  Blocked — do not commit yet
   Do not start the next stage until Ash confirms the checkpoint and asks.

PERMISSIONS
Never: commit, push, create branches/PRs, publish, deploy, install packages,
change dependencies, provision providers, upload media, change credentials,
edit governance/workflows/skills/guidelines, change Linear records.
Make's current source is the editing target, not the product or design
authority. Use UK English. Do not invent biography, media, rights or credits.
```
