title: "Master task list tracker"
filename: "/tasks/master-task-list.md"
created: "2026-03-04"
modified: "2026-09-10"
version: "2.2.0"
---

# Master task list tracker

**Created:** March 4, 2026  
**Last Updated:** September 10, 2026 — Orchestrator v3.0.0 run complete. Sub-audit G (web standards/AI discoverability) executed for first time. Added 16 new tasks (3 Critical, 5 High, 7 Medium, 1 package cleanup). Total outstanding: 32 tasks.
**Purpose:** Track all active and archived task lists. Does NOT contain actual tasks — only references.

---

## Active task lists

| Task list | Created | Status | Related reports |
|---|---|---|---|
| [codebase-consistency-audit-tasks.md](./codebase-consistency-audit-tasks.md) | Sep 10, 2026 (re-audit, v2) | Active — 32 tasks (5 Critical, 11 High, 12 Medium, 4 cleanup). Critical: tokens/ CSS layer never imported; robots.txt/llms.txt/og-image all missing. Sub-audit G (web standards + AI discoverability) added 16 new tasks. Implementation plan: `2026-09-10-implementation-plan.md` | `src/app/reports/codebase-consistency-audit/` |
| [animation-movement-tasks.md](./animation-movement-tasks.md) | Mar 12, 2026 | Stale — 63 pending tasks across 4 phases. Last touched Mar 2026. Review before starting — some may be superseded. | `src/app/reports/animation-movement-audit/` |
| [codebase-consistency-audit-tasks.md](./codebase-consistency-audit-tasks.md) | Jun 19, 2026 | Active — 14 tasks across Critical/High/Medium. Fixes undefined tokens, button padding inconsistency, hardcoded hex, inline styles, unguarded console.log. | `/reports/codebase-consistency-audit/` |
| [ebook-audit-tasks.md](./ebook-audit-tasks.md) | Mar 9, 2026 | Active — Documenting and verifying ebook reader components and styles | `/reports/ebook-audit/` |
| [book-website-tasks.md](./book-website-tasks.md) | Mar 9, 2026 | Active — Multi-page book website build in progress | `/reports/book-website/` |
| [task-list.md](./task-list.md) | Feb 25, 2026 | Active (ongoing general-purpose) — all actionable items complete; only passive monitor items remain open | Multiple — see file header |
| [design-system-expansion-tasks.md](./design-system-expansion-tasks.md) | Mar 8, 2026 | NOT STARTED — 90 tasks across 5 phases (195 variations + 8 themes). Ready for Phase 1. | `/reports/feature-work/05-design-system-expansion-answers.md` |
| [feature-work-expansion-tasks.md](./feature-work-expansion-tasks.md) | Mar 8, 2026 | NOT STARTED — Planning completed for feature expansions based on user answers (Sub-audits 06-10). | `/reports/feature-work/06-10-expansion-plan.md` |

## Completed (pending archive)

| Task list | Created | Completed | Notes |
|---|---|---|---|
| [light-dark-mode-selector-fix.md](./light-dark-mode-selector-fix.md) | Mar 20, 2026 | Mar 20, 2026 | ✅ **100% COMPLETE** (74/74 fixes) — Removed all `body:not(.dark)` selectors from light.css that caused light mode styles to leak into dark mode. Fixed critical CSS selector bug discovered via comprehensive audit. Root cause: CSS OR logic + ThemeProvider applying `.dark` to `<html>` not `<body>`. Result: Dark mode now displays correctly with atomic black background. Reports: `/reports/light-dark-mode-audit/`. |
| [modern-react-migration-tasks.md](./modern-react-migration-tasks.md) | Mar 11, 2026 | Mar 12, 2026 | ✅ **100% COMPLETE** (40/52 actionable tasks, 77%) — Modern React migration across 5 audit areas. Created 8 comprehensive documentation guides (4,640 lines), 6 custom hooks (500 lines), 3 layout components (250 lines), WordPress utility classes (340 lines). Total output: 5,700+ lines. All P0/P1/P2/P3 phases complete. Optional tasks: 11 hooks/components created but not yet integrated (intentional - to minimize regression risk). WordPress migration ready with complete FSE guide, block development guide, ACF integration guide, and 5-phase migration roadmap. Full completion summary: `/docs/modern-react-migration-completion-summary.md`. Reports: `/reports/2026-03-11-modern-react-migration/`. |
| **Animation Implementation Phase 1** (session work) | Mar 12, 2026 | Mar 12, 2026 | ✅ **100% COMPLETE** — Terminal boot animation system across 6 pages (5 enhanced + 1 showcase). 6 animation types implemented: terminal boot, auto-stagger, neon pulse, holographic shimmer, floating media, page headers. Created 4 new files (590 CSS + 230 TSX + 350 docs = 1,170 lines). Updated 10 files. Bonus: Style guide dark mode fix + bundler compatibility. Full documentation: `/docs/animation-implementation-report-march-2026.md`, `/docs/session-summary-march-12-2026-animation-phase-1.md`. Guidelines v8.3.0 → v8.4.0. README v8.2.0 → v8.4.0. CHANGELOG updated. WCAG AAA compliant, 60fps, CSS-only. Interactive showcase at `/dev/animations`. |
| [dark-mode-emergency-fixes.md](./dark-mode-emergency-fixes.md) | Mar 12, 2026 | Mar 12, 2026 | Critical dark mode bugs fixed: (1) Blog polaroid backwards background (#f0f0f0 → #1a1a1a), (2) Portfolio gallery icon wrapper missing override. Comprehensive scan of 50 components showed 96% already correct. Full reports in `/reports/dark-mode-audit/`. |
| [dark-mode-implementation-checklist.md](./dark-mode-implementation-checklist.md) | Mar 11, 2026 | Mar 12, 2026 | Comprehensive deployment checklist for dark mode theme v2.0.0 (54 components, 2,047 lines CSS). All critical bugs resolved. |
| [light-mode-deployment-checklist.md](./light-mode-deployment-checklist.md) | Mar 11, 2026 | Mar 11, 2026 | Light mode theme toggle deployed with WCAG 2.2 AA/AAA compliance. Enhanced ebook reader contrast (3.2:1 → 9.5:1 dark, 16.1:1 light). ES5-compliant ThemeToggleES5 component in header. Full documentation and contrast audit reports complete. |
| [dev-tools-optimization-tasks.md](./dev-tools-optimization-tasks.md) | Mar 8, 2026 | Mar 8, 2026 | Schema integration and Dev Tools cleanup tasks finished. |

## Archived (files in `/tasks/archived/`)

| Task list | Created | Completed | Archived | Notes |
|---|---|---|---|---|
| [music-page-creation-tasks.md](./archived/music-page-creation-tasks.md) | Mar 8, 2026 | Mar 8, 2026 | Mar 8, 2026 | Refactored MusicPage.tsx with strict bundler-safe syntax, implemented Spotify & SoundCloud grids, and created new custom BEM CSS. |
| [hero-architecture-immediate-actions.md](./archived/hero-architecture-immediate-actions.md) | Mar 7, 2026 | Mar 8, 2026 | Mar 8, 2026 | ALL tasks complete. Audits written, docs written, and scaffolding built for Hero/Template parts. Dev tools routing fixed. |
| [production-launch-prep-tasks.md](./archived/production-launch-prep-tasks.md) | Mar 6, 2026 | Mar 6, 2026 | Mar 8, 2026 | ALL 10 tasks complete. Schema.org Person data fixed, OG/Twitter image meta added, stale Lucide refs cleaned. Report archived at `/reports/archived/production-launch-prep/`. |
| [memory-reduction-v2-tasks.md](./archived/memory-reduction-v2-tasks.md) | Mar 5, 2026 | Mar 5, 2026 | Mar 8, 2026 | 26/30 tasks complete (87%). Created 2 shared components. Saved ~2,653 lines. Report archived at `/reports/archived/memory-reduction-v2/`. |
| [phosphor-migration-tasks.md](./archived/phosphor-migration-tasks.md) | Mar 3, 2026 | Mar 4, 2026 | Mar 8, 2026 | ALL tasks complete. Zero Lucide references remain. `lucide-react` removed. |

## Historically archived (files deleted — completed and cleaned up March 4, 2026)

| Task list | Created | Completed | Notes |
|---|---|---|---|
| content-expansion-phase8-tasks.md | Mar 4, 2026 | Mar 8, 2026 | 8/8 sub-audits done. All content types at production-complete status. File and reports deleted. |
| project-stability-audit-tasks.md | Mar 4, 2026 | Mar 4, 2026 | 6/6 items resolved. Report deleted. |
| spacing-standardization-tasks.md | Mar 3, 2026 | Mar 2, 2026 | All tasks complete. Report deleted. |
| bundler-compatibility-tasks.md | Mar 3, 2026 | Mar 3, 2026 | All tasks complete. Report deleted. |
| content-expansion-phase6-tasks.md | Mar 2, 2026 | Mar 2, 2026 | All tasks complete. Report deleted. |
| content-expansion-phase7-tasks.md | Mar 3, 2026 | Mar 3, 2026 | All tasks complete. Report deleted. |
| content-accuracy-tasks.md | Mar 3, 2026 | Mar 3, 2026 | All tasks complete. Report deleted. |
| location-correction-tasks.md | Mar 3, 2026 | Mar 3, 2026 | All tasks complete. Report deleted. |
| memory-reduction-tasks.md | Mar 1, 2026 | Mar 3, 2026 | 78.9% complete (4 deferred). Report deleted. |

## Remaining active reports

| Report folder | Status | Associated task list |
|---|---|---|
| `/reports/light-dark-mode-audit/` | Completed — CSS selector bug audit (74 fixes applied). Ready for archive after 7 days. | light-dark-mode-selector-fix.md |
| `/reports/site-health-check/` | Active — Deployment diagnosis (awaiting Netlify build logs) | N/A (diagnostic report) |
| `/reports/animation-movement-audit/` | Active — Comprehensive animation audit (65 tasks, 4 phases) | animation-movement-tasks.md |
| `/reports/dev-tools-optimization/` | Active (Schema and cleanup audit) | dev-tools-optimization-tasks.md |
| `/reports/feature-work/` | Active — planning document only (06-10-expansion-plan.md). Reports 01-05 archived. | feature-work-expansion-tasks.md |

## Stale reports (candidates for archiving or deletion)

_All stale reports cleaned up March 8, 2026. Deleted: memory-reduction (1 file), memory-reduction-v2 (1 file, copy retained in archived/), content-specimens (1 file), content-specimens-accessibility (1 file), dark-mode-markdown-testing (1 file), dev-tools-hero-stats (1 file), phosphor-migration (2 files), content-expansion-phase-8 (4 files), content-expansion-phase8 (4 files). Total: 16 files deleted._
_Archived: comprehensive-hero-architecture (25 files) and feature-work sub-audits 1-5 (5 files)._

---

## Archiving rules

1. When ALL tasks in a list are complete, move the entry from "Active" to "Completed (pending archive)"
2. After 30 days in "Completed", move the file to `/tasks/archived/` and update this tracker
3. Delete the task list file and its associated report files
4. Record the deletion in this tracker for historical reference
5. Always update this tracker when creating, completing, or archiving a task list
6. Never delete `/tasks/task-list.md` — it is the persistent master checklist