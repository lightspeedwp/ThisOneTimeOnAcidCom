# `thisonetimeonacid.com` — ebook development plan

**Historical baseline:** 27 September 2026
**Documentation review:** 2026-10-24
**Verified revision:** `3f583002482d80ffd1910676bcf7c63e13989b20` on `develop`
**Status:** Source-verified architecture notes and proposed work; not a launch-readiness declaration

## Purpose and scope

This plan describes the existing ebook reader for Ash Shaw's memoir,
“This one time on acid...”, and the remaining source-loading and reading
continuity decisions.

The documentation rewrite is tracked in
[TOA-369](https://linear.app/lightspeedwp/issue/TOA-369/docs-plan-remove-obsolete-assumptions-and-refresh-retained-guidance).
It does not implement reader fixes, edit manuscript prose, replace assets,
change dependencies, provision a backend or alter publication behaviour.

Keep this document at its existing path. Any relocation belongs to
[TOA-255](https://linear.app/lightspeedwp/issue/TOA-255/refactor-repo-governance-organise-planning-documents)
and needs an approved destination and reference-migration plan.

“Verified” below means inspected in source at the pinned revision. It does not
mean a build, browser test, accessibility review or deployment was performed.

## Current reader architecture

The application uses React, TypeScript and Vite. Read the current
[package manifest](../package.json) rather than copying historical version
numbers from this plan.

| File | Current responsibility |
|---|---|
| [`bookContentLoader.ts`](../src/app/utils/bookContentLoader.ts) | Eager raw-Markdown glob; custom frontmatter parsing; ordered page assembly; generated contents; paragraph-count fallback splitting |
| [`ebook-pages.ts`](../src/app/data/mock/pages/ebook-pages.ts) | Re-exports types and loader output; it does not activate the older TypeScript manuscript modules as a fallback |
| [`ebook/types.ts`](../src/app/data/mock/pages/ebook/types.ts) | `BookPage` and the 14 reader page types |
| [`EbookPage.tsx`](../src/app/components/pages/about/EbookPage.tsx) | Reader state, single/spread views, navigation, touch/keyboard handling, settings, fullscreen and progress |
| [`ebookHelpers.ts`](../src/app/components/pages/about/ebook/ebookHelpers.ts) | Chapter index, drawer groups, spread mapping, media-query hooks and measured pagination |
| [`EbookPageContent.tsx`](../src/app/components/pages/about/ebook/EbookPageContent.tsx) | Page-type rendering; body strings are rendered as text rather than general Markdown |
| [`ebookPreferences.ts`](../src/app/utils/ebookPreferences.ts) | Numeric reading position and reader preferences in local storage |
| [`journal-schema.ts`](../scripts/journal-schema.ts) | Existing Zod ebook frontmatter schema, separate from the reader's custom parser |
| [`routes.ts`](../src/app/routes.ts) | Current route definitions |
| [`ebook-base.css`](../src/styles/blocks/ebook-base.css) and sibling ebook stylesheets | Reader surface, layout, page types, navigation, responsive presentation and theme styling |

Reader page types are `cover`, `inside-front`, `title`, `dedication`,
`epigraph`, `toc`, `foreword`, `part-title`, `chapter-start`,
`chapter-content`, `appendix-title`, `afterword`, `about-author` and
`back-cover`.

Source frontmatter types are not identical to renderer types: for example,
`chapter` produces chapter-start/content pages, while `appendix` and
`appendix-divider` produce appendix-related pages.

### Navigation and presentation

The inspected implementation includes:

- Single-page mode below the `1024px` spread breakpoint.
- A cover-first spread mapping, followed by pairs of pages.
- Touch, keyboard and button navigation.
- Drawer entries rebuilt from dynamically paginated pages.
- Font-size, minimal-mode and paging-effect preferences.
- Fullscreen handling with a visual fallback when the browser API is denied.
- Reduced-motion checks in navigation and supporting CSS.

These are code paths, not a guarantee that every combination works correctly.

## Source inventory and the loading mismatch

### Existing files

Root [`content/book/`](../content/book/) contains six numbered directories with
36 Markdown files, plus `this-one-time-on-acid-brief.md`:

| Directory | Listed files | Intended structural role |
|---|---:|---|
| `00-front-matter/` | 6 | Cover through foreword |
| `01-part-1-early-life/` | 5 | Part divider and chapters 1–4 |
| `02-part-2-carefree-20s/` | 6 | Part divider and chapters 5–9 |
| `03-part-3-nomadic-life/` | 6 | Part divider and chapters 10–14 |
| `04-part-4-re-emergence/` | 7 | Part divider and chapters 15–20 |
| `05-back-matter/` | 6 | Afterword, appendices, author page and back cover |

This is a directory inventory, not confirmation that all files are approved,
complete, valid or publishable manuscript sources.

The earlier plan's blanket claims that all chapter files are empty or
AI placeholders, and that the foreword and afterword are empty, must not be
retained as current facts. Inspected examples contain prose:

- `00-front-matter/06-foreword.md`.
- `01-part-1-early-life/01-snails.md`.
- `05-back-matter/01-afterword.md`.
- `05-back-matter/03-appendix-a.md`.
- `05-back-matter/04-appendix-b-tribes.md`.

Prose presence does not establish authorship, factual accuracy, editorial
approval or completion. Preserve Ash Shaw's legitimate author identity and
existing editorial wording; do not invent replacement manuscript text.

### Actual discovery path

The loader still uses:

```typescript
import.meta.glob<string>('/src/content/book/**/*.md', {
  eager: true,
  query: '?raw',
  import: 'default',
});
```

`src/content/book/` is absent at the verified revision. Root `content/book/`
exists, but the glob does not target it.

The barrel's comment saying content is sourced from `src/content/book/` is
therefore not proof that the existing root manuscript reaches the reader.
Older TypeScript ebook modules are not imported as an active fallback by that
barrel.

Do not promise that editing root manuscript files immediately updates the
reader. Source approval, discovery and validation must first be reconciled.

### Existing workstream

[TOA-328](https://linear.app/lightspeedwp/issue/TOA-328/feat-ebook-align-manuscript-loading-with-validated-sources)
owns manuscript-source discovery and integration. Its remaining decisions
include:

- Approved canonical files and confirmed missing assets.
- Exclusion of `this-one-time-on-acid-brief.md` from reader content.
- Requiredness of type, chapter/part, title/subtitle, page/order and appendix
  metadata.
- Deterministic ordering, explicit page breaks and contents mapping.
- Diagnostics and fixtures for invalid, unsupported and empty sources.
- Reconciliation with existing validation.

Do not simply broaden the glob to every Markdown file under `content/book/`:
that would also discover the brief and would not settle editorial approval.

## Current parsing and assembly contract

The reader's parser recognises a simple frontmatter block, splits lines at the
first colon, strips matching surrounding quotes and converts numeric-looking
values. It is not a complete YAML parser.

Recognised metadata includes `type`, `chapter`, `part`, `title`, `subtitle`,
`startPage`, `pageNumber` and `appendixId`.

Important limitations:

- Multiline YAML values are not handled as general YAML. The inspected first
  chapter includes a wrapped subtitle, so parser/schema parity needs evidence.
- An unsupported or missing type has no explicit diagnostic path in the loader.
- Paths are sorted lexically; numbered names influence ordering.
- `part-title` establishes the current part used by chapter contents entries.
- Chapter and appendix bodies split at standalone `---` separators, then into
  paragraph strings on blank lines.
- Contents are inserted between pre-foreword material and the foreword.
- `buildTocPages()` includes part/chapter entries and collected appendix
  entries, with 11 entries per contents page.
- Titles, subtitles and body paragraphs are rendered according to page type;
  arbitrary Markdown/HTML formatting is not interpreted by the body renderer.

The existing Zod schema requires positive chapter/part numbers for chapter
sources, permits optional non-negative `startPage`, and constrains appendix IDs
to a lowercase letter. That schema's existence does not prove the browser
loader invokes it or that current manuscript files pass it.

Retain simple paragraphs and explicit page breaks when preparing approved
sources. Do not remove headings, rewrite prose or change metadata merely to
fit an unapproved integration decision.

## Pagination: current behaviour and remaining risks

### Two existing stages

1. `splitLargePages()` produces the static fallback from `rawBookPages`.
   Its paragraph-count limits are 3 below `480px`, 4 below `768px`, 6 otherwise,
   and 5 without `window`.
2. `useDynamicPagination()` measures paragraph heights with a hidden DOM probe,
   using available height and font preference to split supported page types.

The reader observes the single-page wrapper with `ResizeObserver` and derives
navigation collections from `dynamicPages`.

The old description that pagination only runs once at module load is therefore
incomplete. The proposed reload-on-resize snippet is removed: dynamic
pagination already exists, and reloading is not an approved continuity strategy.

### Verification gaps

- The measurement observer attaches to the single-page wrapper; equivalent
  initial spread-mode measurement is not established by that code.
- Width changes, font application/loading, padding, headings and the probe's
  measurement surface need representative browser checks.
- Height splitting does not divide an individual oversized paragraph.
- Both splitters retain source `pageNumber` values across derived chunks.
  These are not necessarily unique rendered-page numbers.
- Clamping a numeric index after repagination does not preserve the same
  logical passage.
- Empty data is unsafe in the single-page render path: the active page can be
  undefined before `pageTypeClass()` and `PageContent` use it.
- `buildSpreads([])` creates a cover-shaped entry without actual content; this
  is not an explicit, tested empty-state experience.

These are source observations and test requirements, not fixes made by this
documentation rewrite.

## Page labels, contents and reading continuity

Keep four concepts separate:

- Source identity.
- Position within a source.
- Current array index.
- Displayed page number.

The loader uses frontmatter numbers for chapter starts, section pages and
contents entries. Derived chunks can repeat a number. The old proposed
post-assembly pass only filled missing numbers; it would not correct all
existing labels, contents entries or later measured splits.

Neither deleting all frontmatter numbers nor manually renumbering every chapter
is approved here. Decide the display-number/contents contract within the
existing source and reader workstreams.

[TOA-329](https://linear.app/lightspeedwp/issue/TOA-329/feat-ebook-add-source-anchored-reading-continuity)
owns logical reading continuity and safe collection states:

- Stable source identity and a location within it, independent of display
  pagination.
- Continuity across font, viewport/orientation and single/spread changes.
- Migration or fallback for legacy numeric progress.
- Defined behaviour for removed content and unavailable/corrupt storage.
- Safe empty/invalid collections and recovery tests.

Current `ebookPreferences.ts` stores a numeric index under
`ash-ebook-position`. Reads validate its range; storage errors fall back or fail
silently. This is not source anchoring, and it does not establish continuity
after content or layout changes.

## Wheel behaviour and deep links

### Mouse wheel

`handleBookWheel()` currently forwards wheel movement to the left or right page
inner based on pointer position. The stylesheet uses `overflow: hidden`.

The old unconditional wheel-to-page-turn replacement is not an accepted fix.
Verify actual browser behaviour and decide the intended interaction before
changing it; include trackpads, rapid input, animation state and keyboard
alternatives.

### Routes and chapter links

Current routes include:

- `/the-book` — book information.
- `/read-the-draft` and `/read-the-book` — the draft-entry page.
- `/ebook` — the reader.

The old `/book` route assumption is not supported by the current route table.
`EbookPage.tsx` does not currently implement the proposed `?chapter=` handler.

Chapter deep links and a page-hash fallback remain proposals, not shipped
features. Resolve link identity and precedence against saved progress and
repagination before implementation. Do not paste the old mount-only snippet:
it used a static page collection and suppressed dependency checking.

The existing draft-entry page is not evidence of a production subscription
backend or secure reader access control. Changes to that flow are outside this
documentation scope.

## Historical September change log

The previous plan reported the following changes. They are retained as
historical assertions, not newly validated fixes or implementation dates:

| Earlier reported change | Current evidential treatment |
|---|---|
| Light-theme selectors moved from `body:not(.dark)` to `:root:not(.dark)`; 39 instances claimed | Historical count not rerun |
| Reader breadcrumb/hero spacing adjusted | Requires visual regression evidence |
| An esbuild/em-dash compatibility issue was addressed | Do not generalise into a ban on Unicode or repeat ambiguous escape advice |
| Author-page title casing corrected | Current source/editorial review required |
| Appendix entries added to contents | `buildTocPages()` currently accepts collected appendix entries |
| Part contents labels retain subtitles | Current loader includes part subtitles in assembled labels |
| A comment glob prematurely closed JSDoc | Historical syntax-maintenance note |
| Overflow hidden and paragraph splitting introduced | Both remain visible in current source; not proof that all content fits |
| Footer theme widget hidden during reading | Reader body class and matching footer CSS remain |
| 24 template CSS files and orphaned exports removed | Historical deletion count not independently revalidated |

## Proposed delivery sequence

No dates, effort estimates or new implementation authorisation are established
by this sequence.

1. **Approve and apply the documentation-only rewrite.**
   Keep both plan paths, preserve provenance, resolve changelog/PR-template
   treatment and record actual checks.
2. **Continue TOA-328 through its existing approval process.**
   Approve sources, metadata and diagnostics; demonstrate discovery and mapping
   with representative fixtures before claiming manuscript integration.
3. **Continue TOA-329 and representative reader validation.**
   Establish logical continuity and safe states, then verify navigation,
   pagination and recovery on realistic content.

Editorial review remains separate. Existing prose must not be labelled final,
rewritten or published solely because it exists in the inventory.

Font changes also need a design decision. Review current tokens and long-form
readability first; the old suggestions to add Lora, Georgia or other fonts are
not approval to change typography, assets or loading.

## npm workflow and verification

Read [AGENTS.md](../AGENTS.md) and [CONTRIBUTING.md](../CONTRIBUTING.md).
This repository uses npm and `package-lock.json`; do not restore pnpm commands
or introduce another lockfile.

Commands defined for an appropriately authorised working checkout include:

```bash
npm ci
npm run dev
npm run build
npm run test:unit
npm run test:build
npm run test:e2e
```

Installation, development and build commands can write files. They were not run
for this read-only documentation review. End-to-end execution may require
browser setup; report actual results rather than copying historical pass
counts.

`package.json` has no `lint`, `type-check`, `typecheck` or `verify` script.
Journal validation commands are not evidence that ebook sources pass the ebook
schema.

After source integration is approved, verify:

- Approved discovery, exclusion of the brief, stable ordering and diagnostics.
- Frontmatter parsing/schema parity and all supported page types.
- Contents labels, appendix entries and chapter navigation.
- First/last page, empty/invalid input and removed content.
- Font changes, compact/mobile/tablet/spread layouts and orientation changes.
- Long paragraphs, overflow, wheel input and rapid navigation.
- Saved-position migration, blocked storage and logical-location continuity.
- Keyboard/focus behaviour, reduced motion, fullscreen and both themes.

Record revision, commands, fixtures/devices and outcomes. A build alone cannot
prove these reader behaviours or editorial readiness.

## Open decisions and protected boundaries

- Approve canonical manuscript sources and distinguish draft, reference and
  publishable material.
- Resolve parser/schema requiredness, ordering and display-number semantics in
  the existing implementation workstreams.
- Agree continuity, recovery and any deep-link behaviour before coding it.
- Resolve contradictory inherited instructions about importing `content/`;
  do not treat old “content folder deleted” prose as current inventory.
- Resolve documentation-only changelog treatment and local/shared PR-template
  differences before preparing a PR.
- Preserve protected files, images, attribution and governance configuration.
  No changelog, workflow, template, dependency or deployment edit is included.
- Preserve this document's location pending TOA-255.

## Review report reconciliation

The supporting review for this reconciliation is documented in
[TOA-369](https://linear.app/lightspeedwp/issue/TOA-369/docs-plan-remove-obsolete-assumptions-and-refresh-retained-guidance),
which reviewed revision `6b3b76baa955acdfaee0d5e4aef39e099b4b083e`. This
replacement draft uses the newer verified revision stated above and reconciles
its applicable findings as follows:

- **PLAN-07:** explains the absent discovery path without implying that documentation changes integrate the root manuscript.
- **PLAN-08:** distinguishes existing prose from authorship, editorial approval and publication readiness.
- **PLAN-09:** replaces pnpm instructions with verified npm commands and records that none were executed for this review.
- **PLAN-10:** separates source identity, array position and displayed numbering; withdraws the incomplete numbering proposal.
- **PLAN-11:** documents measured dynamic pagination and retains its verification gaps rather than prescribing a reload workaround.
- **PLAN-12:** the original report identified a proposed snippet using a static page index for dynamically paginated navigation. This replacement removes that proposal and records that the current reader has no chapter-query handler; it does not claim a runtime fix or an implemented deep-link feature.

This reconciliation changes documentation only; reader integration and
continuity remain within their existing implementation workstreams.

**Review outcome:** the reader architecture exists, but manuscript discovery,
safe empty states and source-aware continuity must not be described as complete.
No runtime fix, manuscript edit, test pass or production release is asserted.
