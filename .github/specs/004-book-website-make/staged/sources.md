# Source register — 004 book website Make package

| Field | Value |
| -- | -- |
| Version | 1.0.0 |
| Last revised | 2026-11-12 (Asia/Bangkok) |
| Inspected revision | Application source: `55079087373e6bc2c85e689aecde2815130b146b` (`main`). Documentation branch `docs/book-website-make-spec` at `f5ef1ef`, which contains `5507908`. |
| Branch delta | At `f5ef1ef`, the inspected application paths differ from `5507908` only in comments, in `RootLayout.tsx` and `SafetyWrapper.tsx`. `content/book/01`–`06` have moved to `../references/` on this branch. |

## 1. Governing packet

The seven documents below were read completely at the inspected revision.

| Path | Recorded version | Last revised | Role | Notes |
| -- | -- | -- | -- | -- |
| `../references/01-book-website-specification.md` | 1.0.0 | 2026-11-09 | Staged execution contract; requirement IDs; prompts 0–3C | Cites author brief 1.2.1 and register 1.7.0 as its own inspection snapshot. Pins `develop@84242de`. |
| `../references/02-companion-session-plan.md` | 1.0.4 | 2026-11-09 | Preparation context; static findings at `84242de` | Context only; it does not govern execution. |
| `../references/03-author-decisions-launch-scope.md` | 1.3.0 | 2026-11-09 | Author decisions; launch inventory | Records the wording-approved (9 Nov 05:07 UTC) Speaking/Events/Media sitemap-card omission as a planning requirement. |
| `../references/04-design-brief.md` | 1.1.2 | 2026-11-08 | Design requirements WEB-D01–12; confirmed baseline | S-11 cites register v1.0.0 deliberately as a historical snapshot. |
| `../references/05-design-reader-decision-register.md` | **1.9.0** | 2026-11-09 | Approved baseline; dark interaction choices; R3/T1/RT2/C1 | The previously referenced version was 1.7.0. Changes in 1.8.0 and 1.9.0 concern form feedback and recovery and do not alter navigation, theme, guide or podcast decisions. |
| `../references/06-website-reading-prd.md` | 1.1.1 | 2026-11-04 | REQ-001–010; AC-001–011 | Pins `develop@eeb4b185`. REQ-010/AC-011 covers retained public, unlinked, noindex pages and the podcast "≥1 approved item" condition. |
| `../references/13-this-one-time-on-acid-brief.md` | none | — | Historical supplementary material only | Superseded positions are listed in §3. |

Document 05 changed from the 1.7.0 snapshot cited in 01 and 02 to the current 1.9.0. The difference is not material to stages 00–03C. Both values are recorded and neither is substituted for the other.

## 2. Repository facts at the inspected revision

These facts come from static inspection only. They say nothing about runtime behaviour or Make parity.

- All 67 paths named in 01's prompts exist.
- Two prompt-named files exist but are not imported: `src/styles/blocks/header.css` and `src/styles/themes/brutalist.css`.
- CSS chain:
  - `src/main.tsx` imports `styles/index.css`.
  - `styles/index.css` imports `default_theme.css`, then `globals.css`.
  - `globals.css` imports `tokens/content-*.css` → `themes/light.css`, `themes/dark.css`, `themes/dark-extended.css` → `blocks/book-dark-mode.css`, `blocks/book.css`.
  - Component CSS is imported by its components.
- Theme state:
  - `ThemeProvider` is not mounted. `App.tsx` renders only `RouterProvider`.
  - The footer `ThemeSwitcher` falls back to `{theme:'dark', setTheme(){}}`. It therefore does nothing and always shows dark as selected.
  - The header `ThemeToggleES5` keeps its own state and handles light and dark only.
  - Both use `localStorage['theme']` and set `.dark` and `data-theme` on `<html>`.
  - The modes are `light | dark | brutalist`.
  - When nothing is saved, the default is dark and `'dark'` is written to storage.
- Routes:
  - Registered: `/`, `/the-book`, `/read-the-draft`, `/read-the-book`, `/thank-you`, `/ebook`, `/about-ash`, `/waitlist`, `/journal`, `/journal/:slug`, `/events`, `/speaking`, `/contact`, `/media`, `/search`, `/sitemap`, `/style-guide`, `*`.
  - Not registered: `/podcasts`, `/podcast/:slug`, `/draft-viewer`, `/privacy`, `/terms`.
- `bookSiteData.nav` (11 items) includes Events, Speaking and Media.
- `footerGroups` has four groups: "The Book", "Author & Press", "Content" and "Discover". "Author & Press" includes Speaking & Workshops, Events and Media & Press.
- `SitemapPage` `bookPages` (15 items) still includes all seven NAV-02 omissions/withholdings.
- Style guide:
  - Nine anchors are present: `brand`, `colors`, `typography`, `buttons`, `forms`, `cards`, `tags`, `icons`, `content`.
  - Nova News branding appears at lines 84, 288, 371, 374 and 615.
  - The page has a nested `main` element with a duplicate `id="main-content"`.
  - Swatches cannot be activated by keyboard.
  - `style-guide-page.css` uses `body.dark`, but the toggles set the class on `html`.
- `globals.css` uses `#0F0F0F` and `#FF10F0`, not the approved values.
- Podcast:
  - `episodes.ts:46` uses `https://example.com/...mp3`.
  - `PodcastDetailPage` has no `<audio>` element.
  - Podcast data is consumed by `SearchResultsPage` although no podcast route exists.
- `public/sitemap.xml` (10 URLs on `ashshaw.com`) includes `/events`, `/speaking` and `/media`. `robots.txt` allows all crawlers.
- These findings match the `84242de` baseline in document 02. The new details are the brutalist mode and the search consumer.

## 3. Superseded positions in the unnumbered brief

Do not restore the following positions from `../references/13-this-one-time-on-acid-brief.md`.

| Position | Brief lines | Superseded by |
| -- | -- | -- |
| Signup unlocks draft/excerpts; "Draft Unlocked" | 39, 500, 714–725, 735, 758, 777–793, 1094–1096 | 03 access reconciliation; PRD REQ-002/003 |
| Reading bundled with newsletter follow-up | 338, 742–743, 792–793 | PRD REQ-004; AC-005 |
| Pre-orders and future-edition promises | 43, 339, 344, 404, 580, 702, 742, 793, 1012–1023 | 03 launch exclusions |
| Speaking/Events/Media in navigation, CTAs and teasers | 217–264, 329–330, 348–349, 372–376, 514–571, 1042–1045 | 03 v1.3.0; PRD REQ-010 |
| Sample events and testimonial strips | 306, 930 | 03 editorial authority |
| Podcast as a Journal category only | 556, 866–884 | PRD launch inventory (separate conditional Podcast page) |
| WordPress content model | 1183–1196 | PRD: React/Vite application |

## 4. Make report — `../references/11-toa-figma-make.md`

This report is historical supporting evidence, not instructions. Make treated its own reported findings as unverified; repository facts above take precedence for the inspected revision.

| ID | Lines | Content | Classification |
| -- | -- | -- | -- |
| U1 | 1–55 | Prompt 0 kickoff. It expected companion 1.0.3, author brief 1.2.2 and register 1.7.0, and called the sitemap treatment "unresolved". | User instruction (now superseded by 03 v1.3.0) |
| S1 | 57–449 | First response. The attachments were unreadable, so it used local Make files. It reports Make `main` at `3fe4bbfc…` (111–112). | Agent-reported static findings |
| U2 | 451–459 | GitHub `develop` links supplied. | User instruction |
| S2 | 461–877 | Second response. It used document snapshot `df707317…` and gave a parity map (520–544). | Agent-reported; claimed complete reading (465) |
| S2-dup | 878–1295 | Near-verbatim duplicate of S2. | Repeat, not a separate snapshot |
| U3 | 1297–1539 | Recovery prompt. It reports a switch to `develop`, `fix/preview-develop-bootstrap` and local commit `e7f65f8` (1328–1342). | User-relayed reports, explicitly unverified (1333) |
| S3 | 1541–1835 | Recovery report. The workspace is "shallow/grafted" and lacks `e7f65f8` (1550). It claims "22/22 present" path parity only (1557). | Agent-reported; claimed static checks |

Unverified items:

- No push, export receipt, PR or deployment appears anywhere in the file.
- Ancestry and parity between Make, `3fe4bbfc`, `df707317`, `e7f65f8` and GitHub `main` are not established.
- Neither the bootstrap branch nor a matching PR was found by an earlier external check (1352).

Conflicts:

- **`podcasts/index.ts` behaviour.** S2 says it maps `markdownPodcasts` over a fallback (542); S3 says it only re-exports (1595). Stage 03A must re-inspect the file.
- **Paths that differ from the repository.** Make reports `src/app/public/sitemap.xml`, `src/app/content/book/` and `src/content/podcasts/`. The repository has `public/` and `content/`. Treat the Make paths as inferred counterparts.
- **Guideline conflict.** `AGENTS.md` in Make points to `guidelines/Guidelines.md` (titled "Ash Shaw Makeup Portfolio", v8.4.0). That guideline bans Tailwind, but `index.css` imports it (1561–1567). This is a Make-side instruction conflict to report, not to resolve.

Authority correction: lines 834 and 1251 say "Preserve the current Make source as the editable authority". This package corrects that position. Make is the editing target only. Product and design authority remain with Ash and the recorded sources (U3 line 1450 gives the same correction).

Completion claims not carried forward:

- BASE-T001 marked complete (725, 1719).
- "Prompt 0 is complete" (873, 1290).
- "Navigation exact-preview ready" (1821).
- The preview/bootstrap/build checks claimed at 1331.

## 5. Existing 004 work in the parent folder

The parent folder `.github/specs/004-book-website-make/` holds earlier work on this branch. At branch tip `f5ef1ef` that is 46 files, including:

- `spec.md`, `plan.md`, `tasks.md`
- `contracts/`, `exports/` (Gate 1 and Gate 2 reports)
- `references/`
- `approval-boundaries.md`, `codebase-consistency-crosswalk.md`
- `source-file-inventory.md`, `version-reconciliation.md`

This package leaves all of those files unchanged. Its own scope differs from that set in four ways:

- That set's stages 2B–3C cover navigation design and reader access (recovery, error states). This package follows the recorded source stages: 2B is the style guide, and 3A–3C are podcast data, routing and playback.
- That set does not use the 11 stable requirement IDs.
- That set records reader-access decisions as approved (Gate 1, commit `12a2276`). This package does not re-examine that evidence; see `decisions.md` §5.
- The parent `spec.md` states "Ready for Figma Make Execution". This package records Make parity and resumption authority as unresolved.

Which set governs Make is open question Q-19.

### Reference copies

`../references/01`–`06` and `../references/13` are byte-identical to `content/book/` on `main` at `5507908`. `../references/11` and `../references/12` differ from `content/book/TOA-Figma-Make.md` and `content/book/TOA-claude-prompt.md` only in trailing whitespace. Line numbers cited in §4 therefore still apply.

## 6. Unavailable references and parity limits

- Linear documents and issues (TOA-446, TOA-445, TOA-441, TOA-309, TOA-310, TOA-311, TOA-90, TOA-420, TOA-410, TOA-6) were not inspected. They are references only.
- The Make project was not inspected for this package. Its editable revision, credits and parity are unknown.
- `../references/07`–`10` were not inspected for this package. That includes `09-toa-figma-make-delivery-specification.md`, which is not a copy of a `content/book/` file.
- Netlify site settings were not inspected live. The deployment inference relies on `AGENTS.md` lines 404–410 and `CONTRIBUTING.md` line 647.
