# Book-site content, mock-data and type-contract review

## 1. Objective

Assess actual data contracts while keeping editorial sources distinct from display/mock data.

## 2. Inputs and scope

[repository instructions](../../AGENTS.md); [guideline reading order](../../guidelines/README.md); [book brief](../../content/book/this-one-time-on-acid-brief.md); [registered routes](../../src/app/routes.ts); [package manifest](../../package.json).

Inputs: current repository instructions, actual source/configuration/manifest, approved scope and relevant existing work. Confirm paths and scripts against the inspected revision; no implied command execution.

Read current evidence before following historical path examples. This is a React/TypeScript/Vite book website, not a WordPress runtime or makeup-portfolio rebuild. Retain sourced memoir material without restoring its former page architecture.

## 3. Audit steps

1. Inventory authoritative root content, derived reader/Journal material, app data, mock fixtures and type declarations with their consumers. A mock object or generated excerpt is not authoritative memoir evidence.

2. Check schema alignment, required/optional/null values, discriminants, names, IDs/slugs, duplicate identifiers and references. Do not fill unknown metadata with invented names, dates or claims merely to satisfy a type.

3. Check date semantics, image/attribution paths, taxonomy definitions/usage, SEO/route metadata and current display/filter/search/reader assumptions. Separate publication/event/recording dates and past/current/future status.

4. Assess exports and module boundaries through actual consumers; internal modules need not all be barrel-exported. Source-size or naming heuristics alone do not require splitting or converting every string into a constant.

5. For any proposed contract change identify affected content, parsers, renderers, route consumers and migration/rollback requirements. Missing data can require a question, not a schema expansion or fabricated fallback.

6. Return the contract/consumer matrix, confirmed inconsistencies, supported exact data/type proposals and unresolved factual/ownership questions. No data, manuscript, type, parser or export edits.

## 4. Missing evidence and permission boundaries

If a required source, current requirement, environment or permission is unavailable, identify the affected check and stop that part; do not fabricate a substitute or silently broaden scope. Treat historical totals and completion statements as reported evidence, not current results.

Default to read-only assessment. A request to edit or review this prompt does not authorise its underlying task. Do not edit application files, manuscript, images, guidelines, configuration, trackers or Linear records; execute commands, publish, archive or delete only under separately explicit authorisation. Never use age, zero imports or route absence alone as deletion approval. Preserve protected files and existing image sources.

Use UK English and sentence case while preserving exact quotations and proper nouns. Use he/him for Ash; do not alter other people’s pronouns. Do not invent dates, authors, social accounts, quotes, testimonials, transcripts, counts, progress, performance savings or duration estimates.

## 5. Success criteria

- [ ] The complete in-scope inventory, consumers and protected exceptions are recorded.
- [ ] Each proposed change preserves actual contracts and has evidence, dependencies and verification needs.
- [ ] Coverage, exclusions and source revisions are recorded; planned, static and executed checks are distinct.
- [ ] Proposed changes and unresolved decisions are presented for approval; no implementation or publication is implied.

## 6. Report output

Return Markdown containing scope/revision, inspected inventory, evidence-linked findings, accepted exceptions, proposed actions and limitations. Record each finding’s path and lines, expected versus observed behaviour, impact, uncertainty and verification needed. Mark checks passed, failed, blocked, not tested or not applicable from evidence; never prefill results.

Drafts stay in the response unless a destination is explicitly approved. If repository report persistence is separately requested, propose a relevant root `reports/{topic}/` path and exact content first; task lists and tracker changes require their own approval. Do not overwrite historical reports, mark work complete automatically or move prompts to `.github/prompts/`.

## 7. Revision provenance

[Original prompt at the reviewed baseline](https://github.com/lightspeedwp/ThisOneTimeOnAcidCom/blob/3f583002482d80ffd1910676bcf7c63e13989b20/prompts/project-stability-audit/04-mock-data-types.md). The original remains historical evidence, not additional execution instructions. Proposed replacement prepared on 24 October 2026; refresh the revision/date and seek renewed approval for material changes before application.
