# Prompt 00 — Preflight (read-only)

Stage: 00 · Requirements: BASE-01, BASE-02 · Tasks: BASE-T001–T004

```text
GOAL
Produce a read-only source inventory and parity report for Ash's personal
book website, then propose the next stage. Change no files. Do not issue a
commit checkpoint.

INSPECT (repository-verified paths at 55079087; find Make equivalents)
Entry:      src/main.tsx, src/app/App.tsx, src/app/routes.ts,
            src/app/components/common/RootLayout.tsx
Navigation: src/app/data/mock/book-site.ts,
            src/app/components/common/Header.tsx, Footer.tsx,
            src/app/components/pages/SitemapPage.tsx
Themes:     ThemeProvider.tsx, ThemeToggleES5.tsx, ThemeSwitcher.tsx
            (src/app/components/common/), src/styles/index.css,
            default_theme.css, globals.css, tokens/*, themes/*,
            blocks/book-dark-mode.css, blocks/book.css
Guide:      src/app/components/pages/StyleGuidePage.tsx,
            src/styles/blocks/style-guide-page.css
Podcasts:   src/app/data/types/podcast.ts, src/app/data/mock/podcasts/*.ts,
            src/app/components/pages/podcasts/*.tsx, content/podcasts/*.md
Instructions: Make AGENTS.md and guidelines/ (report conflicts, e.g. a
            guideline banning Tailwind while index.css imports it).

Previous Make reports named src/app/public/ and src/app/content/ paths;
treat those as inferred counterparts until verified.

RETURN
A. Make snapshot: branch, local commit, shallow/grafted status, relation to
   GitHub main (state "not established" where unknown). Credits only if
   directly verifiable.
B. Parity table: reference path | actual Make path | active consumer |
   status | relevant difference.
C. Instruction conflicts.
D. Differences from sources.md §2 repository facts.
E. Blockers and proposed next stage (normally 01).

EXCLUSIONS
No edits, commands, tests, installs, Git operations, bootstrap repair or
relocation (fix/preview-develop-bootstrap, e7f65f8 are out of scope).
Do not mark earlier "Prompt 0 complete" claims as current evidence.

ACCEPTANCE
BASE-01: every listed path has a parity row or explicit gap.
BASE-02: no file changed; next stage proposed, not started.

STOP after the report. Do not output "Commit to GitHub".
For this read-only stage, protocol steps 6–10 and the step 12 checkpoint
lines do not apply; this override takes precedence.
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
