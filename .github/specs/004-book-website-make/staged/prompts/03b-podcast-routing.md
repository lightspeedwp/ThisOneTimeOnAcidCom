# Prompt 03B — Podcast routing and presentation

Stage: 03B · Requirement: POD-01 · Tasks: POD-T010–T014 · Context: TOA-310 (reference only)
Prerequisite: accepted 03A contract and decisions Q-13.

```text
GOAL
Register only the approved podcast routes and present an intentional
one-episode archive and detail experience.

INSPECT
src/app/routes.ts
src/app/components/pages/podcasts/PodcastsPage.tsx, PodcastDetailPage.tsx,
PodcastCategoryPage.tsx, PodcastTagPage.tsx
src/app/components/ui/ArchiveFilters.tsx
src/app/components/pages/shared/TaxonomyArchiveLayout.tsx
src/app/utils/contentCounts.ts, simpleMarkdown.ts, schemaService.ts
src/app/data/mock/ui/breadcrumbs.ts, src/app/data/mock/seo.ts
src/styles/blocks/podcasts-page.css, archive-filters.css
Existing link patterns (not registered at 55079087): /podcasts,
/podcast/:slug, /podcasts/category/:slug, /podcasts/tag/:slug. Preserve
singular/plural distinctions; register only what Q-13 approves.

REQUIREMENTS
One-card archive, no fake cards; truthful counts, taxonomy, sorting; direct
load and refresh; unknown/unpublished slug recovery; honest empty state;
long titles, narrow/wide, missing artwork; approved metadata, canonical,
share and schema destinations; reuse approved book shell and tokens; no
preview-only content in public data or counts. Shared-component changes only
when necessary, naming other consumers.

EXCLUDE
Playback changes, global navigation exposure, RSS, analytics, offline,
external platform links.

ACCEPTANCE
POD-01 scenarios in spec.md User Story 5 (1–2). Check V-POD-02.
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
