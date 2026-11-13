# Prompt 03C — Genuine accessible playback

Stage: 03C · Requirement: POD-03 · Tasks: POD-T020–T024 · Context: TOA-311 (reference only)
Prerequisites: approved media and recording-checked text (Q-14, Q-16),
accepted 03A contract, 03B checkpoint.

```text
GOAL
Replace simulated progress with real, source-bound, accessible playback, or
honest unavailability when approved media is missing.

INSPECT
src/app/components/pages/podcasts/PodcastDetailPage.tsx (simulated progress;
no <audio> element at 55079087)
src/app/data/types/podcast.ts, src/app/data/mock/ui/podcasts.ts
src/styles/blocks/podcasts-page.css
Shared imports where relevant: portfolio-detail-page.css, blog-article.css

REQUIREMENTS
Real media element bound to the approved source; no autoplay.
Duration, current time and progress from actual media events.
States: loading, buffering, ready, playing, paused, seeking, ended,
unavailable source, rejected playback, network failure, recovery/retry.
Keyboard-operable play/pause and labelled seeking; accessible names; visible
focus; proportionate status announcements; cleanup on navigation/unmount.
Checked equivalent text presented distinctly from show notes.
Truthful duration and media revision. No simulated playback, placeholder
audio or fabricated durations; do not generate or upload audio or infer
service links.

RETURN
State-transition table; exact file proposal; media/text references;
Given/When/Then scenarios; authorised verification proposal.

EXCLUDE
Offline downloads, RSS, directory submission, analytics, providers,
publication.

ACCEPTANCE
spec.md User Story 5 (3–5). Checks V-POD-04–05; real playback evidence is
reported separately from static inspection. If it cannot be verified, end
Blocked — do not commit yet.
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
