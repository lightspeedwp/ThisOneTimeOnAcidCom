# Tasks: Book website — staged Figma Make package

| Field | Value |
| -- | -- |
| Version | 1.0.0 |
| Last revised | 2026-11-12 (Asia/Bangkok) |

The task IDs belong to this feature only and do not correspond to Linear issues.

**Status values:**

- `planned`: not started.
- `blocked`: waiting on a decision. The decision is named.
- `implemented`: changes applied, not yet checked.
- `verified`: checks recorded in `verification.md`.
- `accepted`: Ash accepted the stage.

**Markers:**

- `[P]`: can run in parallel because it shares no files and no unresolved decisions with other tasks.
- `[Gate]`: Ash's approval is needed before continuing.

## Phase 0: Preflight (Stage 00) — BASE-01, BASE-02

| ID | Task | Paths | Req | Depends on | Evidence | Status |
| -- | -- | -- | -- | -- | -- | -- |
| BASE-T001 | Record the Make snapshot, branch and local commit, and their relation to GitHub `main` | Make `.git/HEAD`, refs | BASE-01 | — | V-BASE-01 | planned |
| BASE-T002 | Build the parity table for every path in `plan.md` | All stage paths | BASE-01 | BASE-T001 | V-BASE-01 | planned |
| BASE-T003 | Report instruction conflicts in Make (`AGENTS.md`, `guidelines/`) | Make instructions | BASE-01 | BASE-T001 | Report | planned |
| BASE-T004 [Gate] | Propose the next stage; Ash selects it | — | BASE-02 | BASE-T002 | Approval | planned |

**Note:** a "complete" status for BASE-T001 in earlier Make reports is not carried forward (`sources.md` §4).

## Phase 1: Navigation (Stage 01) — NAV-01, NAV-02 (TOA-446)

| ID | Task | Paths | Req | Depends on | Evidence | Status |
| -- | -- | -- | -- | -- | -- | -- |
| NAV-T001 | List the before/after entries for the menu, footer and sitemap | `src/app/data/mock/book-site.ts`, `src/app/components/pages/SitemapPage.tsx` | NAV-01, NAV-02 | BASE-T004 | Preview | planned |
| NAV-T002 | Record approval of the 4 extra sitemap omissions/withholdings | — | NAV-02 | — | `decisions.md` D-15 | accepted (planning approval only) |
| NAV-T003 [Gate] | Exact preview, intentional non-changes, then approval and resumption authority | Above | NAV-01, NAV-02 | NAV-T001 | Approval | planned |
| NAV-T004 | Apply the approved data edits | `book-site.ts`, `SitemapPage.tsx` | NAV-01, NAV-02 | NAV-T003 | Diff | planned |
| NAV-T005 | Make conditional Header/Footer/CSS edits only where an empty group or gap is shown | `Header.tsx`, `Footer.tsx`, `blocks/*.css` | NAV-01 | NAV-T004 | Diff | planned |
| NAV-T006 | Run the authorised checks | — | NAV-01, NAV-02 | NAV-T004 | V-NAV-01–05 | planned |
| NAV-T007 [Gate] | Checkpoint report: `Commit to GitHub` or `Blocked — do not commit yet` | — | SAFE-01 | NAV-T006 | V-SAFE-01 | planned |

## Phase 2: Themes (Stage 02A) — THEME-01, THEME-02

| ID | Task | Paths | Req | Depends on | Evidence | Status |
| -- | -- | -- | -- | -- | -- | -- |
| THEME-T001 [P] | Trace theme state: provider mounting, controls, storage key, DOM target, module initialisation | `main.tsx`, `App.tsx`, `RootLayout.tsx`, `ThemeProvider.tsx`, `ThemeToggleES5.tsx`, `ThemeSwitcher.tsx` | THEME-02 | BASE-T004 | Report | planned |
| THEME-T002 [P] | Map primitive → semantic → component → state for dark and light | `styles/index.css`, `default_theme.css`, `globals.css`, `tokens/*`, `themes/*`, `blocks/book*.css` | THEME-01 | BASE-T004 | V-THEME-01 | planned |
| THEME-T003 | Calculate contrast for the approved pairings | — | THEME-01 | THEME-T002 | V-THEME-02 | planned |
| THEME-T004 | Ash decides the default, system preference, storage fallback and third mode | — | THEME-02 | Q-06, Q-07, Q-08 | `decisions.md` | blocked (Q-06–Q-08) |
| THEME-T005 [Gate] | Exact preview and approval | Mapped files | THEME-01, THEME-02 | THEME-T004 | Approval | planned |
| THEME-T006 | Apply the approved changes | Approved files | THEME-01, THEME-02 | THEME-T005 | Diff | planned |
| THEME-T007 | Run the authorised checks | — | THEME-02 | THEME-T006 | V-THEME-03–05 | planned |
| THEME-T008 [Gate] | Checkpoint | — | SAFE-01 | THEME-T007 | V-SAFE-01 | planned |

## Phase 3: Style guide (Stage 02B) — GUIDE-01 (TOA-445)

| ID | Task | Paths | Req | Depends on | Evidence | Status |
| -- | -- | -- | -- | -- | -- | -- |
| GUIDE-T001 | Write a section-by-section proposal for all nine anchors | `StyleGuidePage.tsx`, `blocks/style-guide-page.css` | GUIDE-01 | THEME-T008 | Preview | planned |
| GUIDE-T002 | List shared repairs separately (`body.dark` selector, nested `main`) | Same | GUIDE-01, THEME-02 | GUIDE-T001 | Report | planned |
| GUIDE-T003 | Brand section: logo revision, rights and credits | — | GUIDE-01 | Q-09 | `decisions.md` | blocked (Q-09) |
| GUIDE-T004 [Gate] | Exact preview and approval | Same | GUIDE-01 | GUIDE-T001 | Approval | planned |
| GUIDE-T005 | Apply the approved sections | Same | GUIDE-01 | GUIDE-T004 | Diff | planned |
| GUIDE-T006 | Run the authorised checks | — | GUIDE-01 | GUIDE-T005 | V-GUIDE-01–02 | planned |
| GUIDE-T007 [Gate] | Checkpoint | — | SAFE-01 | GUIDE-T006 | V-SAFE-01 | planned |

## Phase 4: Podcast data (Stage 03A) — POD-01, POD-02 (TOA-441, TOA-309)

| ID | Task | Paths | Req | Depends on | Evidence | Status |
| -- | -- | -- | -- | -- | -- | -- |
| POD-T001 [P] | Trace podcast data and consumers, including search; re-inspect `index.ts` behaviour | `data/types/podcast.ts`, `data/mock/podcasts/*.ts`, `data/mock/ui/podcasts.ts`, `content/podcasts/*.md` | POD-01 | BASE-T004 | Report | planned |
| POD-T002 | Collect decisions Q-11 to Q-18 | — | POD-01, POD-02 | Ash | `decisions.md` | blocked (Q-11–Q-18) |
| POD-T003 | Field-level contract and eligibility rule | Proposed only | POD-01, POD-02 | POD-T002 | V-POD-01 | planned |
| POD-T004 [Gate] | Exact data-file preview and approval | Approved files | POD-02 | POD-T003 | Approval | planned |
| POD-T005 | Apply the data changes; no routes, no player | Approved files | POD-02 | POD-T004 | Diff, V-POD-03 | planned |
| POD-T006 [Gate] | Checkpoint | — | SAFE-01 | POD-T005 | V-SAFE-01 | planned |

## Phase 5: Podcast routing (Stage 03B) — POD-01 (TOA-310)

| ID | Task | Paths | Req | Depends on | Evidence | Status |
| -- | -- | -- | -- | -- | -- | -- |
| POD-T010 | Routing and presentation proposal | `routes.ts`, `pages/podcasts/*.tsx`, shared archive files | POD-01 | POD-T006, Q-13 | Preview | planned |
| POD-T011 [Gate] | Approval | — | POD-01 | POD-T010 | Approval | planned |
| POD-T012 | Apply the approved changes | Approved files | POD-01 | POD-T011 | Diff | planned |
| POD-T013 | Run the authorised checks | — | POD-01 | POD-T012 | V-POD-02 | planned |
| POD-T014 [Gate] | Checkpoint | — | SAFE-01 | POD-T013 | V-SAFE-01 | planned |

## Phase 6: Playback (Stage 03C) — POD-03 (TOA-311)

| ID | Task | Paths | Req | Depends on | Evidence | Status |
| -- | -- | -- | -- | -- | -- | -- |
| POD-T020 | State-transition table and replacement for the simulated progress | `PodcastDetailPage.tsx`, `podcast.ts`, `ui/podcasts.ts`, `podcasts-page.css` | POD-03 | POD-T014, Q-14, Q-16 | Preview | planned |
| POD-T021 [Gate] | Approval | — | POD-03 | POD-T020 | Approval | planned |
| POD-T022 | Apply the approved changes | Approved files | POD-03 | POD-T021 | Diff | planned |
| POD-T023 | Real playback and keyboard checks | — | POD-03 | POD-T022 | V-POD-04–05 | planned |
| POD-T024 [Gate] | Checkpoint | — | SAFE-01 | POD-T023 | V-SAFE-01 | planned |

## Dependencies and execution order

- Phase 0 → 1 → 2 → 3 → 4 → 5 → 6.
- Phase 4 decision gathering (POD-T001, POD-T002) can run alongside Phase 2.
- `[P]` marks independence only within a read-only phase.
- No implementation tasks run in parallel across stages that share files.

## Notes

- No durations or owners are assigned.
- No stage starts without Ash's explicit selection and resumption authority.
