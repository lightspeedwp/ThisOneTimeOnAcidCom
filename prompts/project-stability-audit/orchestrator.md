**Originally created:** March 4, 2026

**Original version:** 1.0.0

# Book-site stability and regression evidence coordinator

## 1. Objective

Coordinate seven stability reviews and retain useful Phase 6 QA coverage without executing tests or resurrecting legacy feature requirements.

## 2. Inputs and scope

[repository instructions](../../AGENTS.md); [guideline reading order](../../guidelines/README.md); [book brief](../../content/book/this-one-time-on-acid-brief.md); [registered routes](../../src/app/routes.ts); [package manifest](../../package.json).

Inputs: seven sibling prompts 01–07, current book journeys and any separately authorised runtime/check evidence. Root qa-testing-phase6.md is a compatibility notice, not an extra execution programme.

Read current evidence before following historical path examples. This is a React/TypeScript/Vite book website, not a WordPress runtime or makeup-portfolio rebuild. Retain sourced memoir material without restoring its former page architecture.

## 3. Audit steps

1. Establish protections/holds with child 07 before review, then assess 01 application, 02 build/resource, 03 routes, 04 data/types, 05 imports and 06 CSS as relevant. Child order does not authorise execution or source changes.

2. Inventory current routes/components/data and existing overlapping issues. Map every relevant historical QA check to a current surface, a held legacy surface, an explicit not-applicable decision or an evidence gap; never silently treat a missing legacy route as a pass.

3. Cover route/render/link evidence; current book/reader/waitlist flows; applicable search/filter/pagination/media interactions; keyboard/focus/names/contrast; performance measurements; responsive/zoom behaviour; and data/type integrity. Use the detailed 27-check mapping below to avoid dropping unique cases.

4. Use viewport candidates 375, 768, 1440 and 1920 CSS pixels only as an explicit test plan when browser work is approved. Do not disable pinch zoom or infer responsive correctness from source alone.

5. Check current global search, metadata/social/structured-data and sitemap behaviour against actual current implementations. Analytics or local “stats” require privacy/source evidence; local storage counts are not genuine visitor statistics.

6. Use only current documented scripts when separately authorised. Historical Lighthouse 95 targets, screenshots, badges or checkmarks are not results or compliance. Record passed/failed/pending/skipped/blocked/not-run distinctly.

7. Return one revision/coverage/findings/check-result register, duplicate/held-work mapping and prioritised exact proposals. No automatic child execution, test generation, report/task persistence or completion updates.

## Consolidated Phase 6 check mapping

This mapping retains the original 27 identifiers and their distinct purposes; actual result fields must remain unfilled until reviewed.

| Original check | Original purpose and current disposition |
| --- | --- |
| 1.1 | Portfolio rendering: held legacy context; assess analogous current card rendering only if a real consumer exists |
| 1.2 | Featured portfolio entries: held legacy context; retain featured/standard ordering and metadata checks for explicitly relevant current cards |
| 1.3 | Sticker rendering: held legacy context; no sticker page recreation or invented counts |
| 1.4 | Blog rendering: current Journal list/article metadata, source content, categories, images and responsive states |
| 1.5 | Video rendering: current real-video consumers only; otherwise historical, not a pass |
| 2.1 | Portfolio lightbox: held context; retain open/close, next/previous, escape, focus and media-boundary checks for any current lightbox |
| 2.2 | Sticker theme filtering: held legacy context; no new filter requirement |
| 2.3 | Sticker search: held legacy context; retain query/empty/reset cases only for an explicitly relevant current consumer |
| 2.4 | Blog search/filtering: current Journal query/category combinations, reset and no-result states where implemented |
| 2.5 | Video category filtering: current video filters/counts only if present; otherwise historical |
| 3.1 | Portfolio keyboard navigation: held surface; retain tab order, operation and visible focus for current equivalent controls |
| 3.2 | Screen-reader testing: identify current scope and actual assistive-technology evidence; source review is not an executed test |
| 3.3 | Contrast verification: current applicable text/UI targets and both themes; criterion, pairs and states required |
| 4.1 | Portfolio Lighthouse: held surface; any current-page measurement needs environment/revision and separate authorisation; score is not compliance |
| 4.2 | Image optimisation: current dimensions/loading/format/alt/layout-shift evidence; protected sources unchanged |
| 4.3 | Build verification: actual current package commands/environment; not run unless authorised, no invented typecheck script |
| 5.1 | Portfolio grid breakpoints: held surface; current card grid candidate only where evidenced, no prescribed legacy columns |
| 5.2 | Sticker grid breakpoints: held legacy context; do not recreate sticker grid |
| 5.3 | Lightbox mobile gestures: current lightbox if present; swipe/pinch/close/orientation and keyboard alternatives need observed tests; preserve zoom |
| 6.1 | TypeScript checking: current config/scripts and consumer type contracts; no invented command or claimed run |
| 6.2 | Unique IDs: current IDs/slugs and cross-reference collisions by actual schema; child 04 |
| 6.3 | Date validation: actual format/parse/order and publication-versus-event semantics; never fabricate/backdate dates |
| 6.4 | Required fields: current optional/required/null/type/asset contracts; legacy portfolio/sticker structures remain historical |
| 7.1 | Global search: actual indexed content, query/navigation/no-results and current consumer coverage; no legacy quota |
| 7.2 | Analytics: verify event names/data flows and privacy/consent; local counters are not traffic evidence; no new tracking |
| 7.3 | SEO metadata: actual title/description/canonical/social content and genuine URLs per current route |
| 7.4 | Schema.org: applicability and source-backed structured data; validate current output, no invented SearchAction or compliance |


Legacy portfolio, stickers, gear and dev-tools cases remain historical or held unless a current consumer and explicitly approved requirement establish relevance. This is a proposed scope adaptation, not a statement that old runtime checks passed.

## 4. Missing evidence and permission boundaries

If a required source, current requirement, environment or permission is unavailable, identify the affected check and stop that part; do not fabricate a substitute or silently broaden scope. Treat historical totals and completion statements as reported evidence, not current results.

Default to read-only assessment. A request to edit or review this prompt does not authorise its underlying task. Do not edit application files, manuscript, images, guidelines, configuration, trackers or Linear records; execute commands, publish, archive or delete only under separately explicit authorisation. Never use age, zero imports or route absence alone as deletion approval. Preserve protected files and existing image sources.

Use UK English and sentence case while preserving exact quotations and proper nouns. Use he/him for Ash; do not alter other people’s pronouns. Do not invent dates, authors, social accounts, quotes, testimonials, transcripts, counts, progress, performance savings or duration estimates.

## 5. Success criteria

- [ ] Seven children and all 27 historical QA check IDs have a disposition.
- [ ] No held portfolio/sticker/dev-tools scope is silently reintroduced or cancelled.
- [ ] Coverage, exclusions and source revisions are recorded; planned, static and executed checks are distinct.
- [ ] Proposed changes and unresolved decisions are presented for approval; no implementation or publication is implied.

## 6. Report output

Return Markdown containing scope/revision, inspected inventory, evidence-linked findings, accepted exceptions, proposed actions and limitations. Record each finding’s path and lines, expected versus observed behaviour, impact, uncertainty and verification needed. Mark checks passed, failed, blocked, not tested or not applicable from evidence; never prefill results.

Drafts stay in the response unless a destination is explicitly approved. If repository report persistence is separately requested, propose a relevant root `reports/{topic}/` path and exact content first; task lists and tracker changes require their own approval. Do not overwrite historical reports, mark work complete automatically or move prompts to `.github/prompts/`.

## 7. Revision provenance

[Original prompt at the reviewed baseline](https://github.com/lightspeedwp/ThisOneTimeOnAcidCom/blob/3f583002482d80ffd1910676bcf7c63e13989b20/prompts/project-stability-audit/orchestrator.md). The original remains historical evidence, not additional execution instructions. Proposed replacement prepared on 24 October 2026; refresh the revision/date and seek renewed approval for material changes before application.
