# Book manuscript and reader audit

## 1. Objective

Discover the current manuscript-to-reader pipeline and assess technical/editorial gaps without implementing reader fixes or writing the manuscript.

## 2. Inputs and scope

[repository instructions](../AGENTS.md); [guideline reading order](../guidelines/README.md); [book brief](../content/book/this-one-time-on-acid-brief.md); [registered routes](../src/app/routes.ts); [package manifest](../package.json).

Inputs: root content/book, src/app/utils/bookContentLoader.ts, current reader/page/helper/data/CSS files, current routes, relevant guidelines and plan/ebook-development-plan.md if present. Resolve actual paths rather than machine-specific workspace locations.

Read current evidence before following historical path examples. This is a React/TypeScript/Vite book website, not a WordPress runtime or makeup-portfolio rebuild. Retain sourced memoir material without restoring its former page architecture.

## 3. Audit steps

1. Inventory manuscript Markdown, front/back matter, chapter ordering, split rules, metadata and derived UI mock data separately. Trace the loader glob through assembly to the reader; explicitly investigate root content/book versus a /src/content/book glob without moving content or changing code.

2. Map reader components, ebookHelpers, EbookPageContent, page types, CSS, drawer/TOC/navigation/settings and related documentation. Identify actual source authority and report missing files; do not assume ebook-pages.ts is the manuscript.

3. Assess page-number assignment, explicit frontmatter numbers, TOC chapter starts and spread positions. The old continuation both rejects and preserves hardcoded numbers: present the options and require a decision rather than implementing either interpretation.

4. Assess spread-mode wheel behaviour, internal scroll needs, repeated events and page boundaries before proposing simple next/previous handlers. Investigate resize/orientation re-pagination and the 768px historical breakpoint against current behaviour; do not mandate full-page reloads.

5. Assess chapter deep links, invalid/missing chapter parameters, current reader route and access-gate behaviour. /book and /ebook?chapter=N examples are historical inputs; derive current destinations from routes.

6. Locate foreword, afterword and chapter 1 sources and determine actual completeness. Preserve the requested memoir voice, expectations, acknowledgements, ongoing-life closure, Paarl/snails/childhood threads as editorial questions requiring author evidence—not permission to invent memories or produce pages.

7. For separately authorised runtime verification, define reader cases: pagination/overflow, TOC accuracy, multi-page chapter rendering, wheel/keyboard controls, deep links, orientation/viewport changes, loading/error/empty states and both themes. Note module-load assembly/HMR assumptions for direct confirmation.

8. Check any proposed source/Unicode handling against actual file type and local bundler rules. npm is required; no pnpm or nonexistent type-check/verify command. Specify actual checks, environment and results only when executed.

## 4. Missing evidence and permission boundaries

If a required source, current requirement, environment or permission is unavailable, identify the affected check and stop that part; do not fabricate a substitute or silently broaden scope. Treat historical totals and completion statements as reported evidence, not current results.

Default to read-only assessment. A request to edit or review this prompt does not authorise its underlying task. Do not edit application files, manuscript, images, guidelines, configuration, trackers or Linear records; execute commands, publish, archive or delete only under separately explicit authorisation. Never use age, zero imports or route absence alone as deletion approval. Preserve protected files and existing image sources.

Use UK English and sentence case while preserving exact quotations and proper nouns. Use he/him for Ash; do not alter other people’s pronouns. Do not invent dates, authors, social accounts, quotes, testimonials, transcripts, counts, progress, performance savings or duration estimates.

## 5. Success criteria

- [ ] Source/loader/reader relationships and unresolved path conflict are documented.
- [ ] Historical continuation requirements are assessed individually, not assumed outstanding or completed.
- [ ] No manuscript, pagination, route or access-control changes occur under the audit.
- [ ] Coverage, exclusions and source revisions are recorded; planned, static and executed checks are distinct.
- [ ] Proposed changes and unresolved decisions are presented for approval; no implementation or publication is implied.

## 6. Report output

Return Markdown containing scope/revision, inspected inventory, evidence-linked findings, accepted exceptions, proposed actions and limitations. Record each finding’s path and lines, expected versus observed behaviour, impact, uncertainty and verification needed. Mark checks passed, failed, blocked, not tested or not applicable from evidence; never prefill results.

Drafts stay in the response unless a destination is explicitly approved. If repository report persistence is separately requested, propose a relevant root `reports/{topic}/` path and exact content first; task lists and tracker changes require their own approval. Do not overwrite historical reports, mark work complete automatically or move prompts to `.github/prompts/`.

## 7. Revision provenance

[Original prompt at the reviewed baseline](https://github.com/lightspeedwp/ThisOneTimeOnAcidCom/blob/3f583002482d80ffd1910676bcf7c63e13989b20/prompts/ebook-audit.md). The original remains historical evidence, not additional execution instructions. Proposed replacement prepared on 24 October 2026; refresh the revision/date and seek renewed approval for material changes before application.
