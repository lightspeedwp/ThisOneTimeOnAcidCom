# Book-site build, size and memory investigation

## 1. Objective

Identify measured build/resource issues and safe investigation proposals without implementing optimisations.

## 2. Inputs and scope

[repository instructions](../../AGENTS.md); [guideline reading order](../../guidelines/README.md); [book brief](../../content/book/this-one-time-on-acid-brief.md); [registered routes](../../src/app/routes.ts); [package manifest](../../package.json).

Inputs: current repository instructions, actual source/configuration/manifest, approved scope and relevant existing work. Confirm paths and scripts against the inspected revision; no implied command execution.

Read current evidence before following historical path examples. This is a React/TypeScript/Vite book website, not a WordPress runtime or makeup-portfolio rebuild. Retain sourced memoir material without restoring its former page architecture.

## 3. Audit steps

1. Inventory current manifest/scripts, configuration, dependency/asset/source-size evidence and build outputs only if available. Record environment, revision and whether commands actually ran; do not execute source scripts merely to populate a report.

2. Distinguish source line count, source bytes, emitted bundle bytes, compressed transfer, runtime heap, DOM count and build memory. No one measure proves another; historical limits or large files are investigation signals, not defects by definition.

3. Assess actual import graph, dynamic loading/chunk boundaries, duplicated dependencies/assets, caches and expensive render paths where evidence exists. Missing static imports alone do not prove unused code or a safe package removal.

4. For files above historical 400-line or other thresholds, assess meaningful module/component/data/CSS boundaries, dependency cycles, import updates and cascade/order effects. No mandatory splitting or claimed savings without comparison measurements.

5. Coordinate orphan/retention/utility/SVG recommendations with ../general-codebase-audit.md through its canonical path; protected manuscript, images, stubs and reports remain intact.

6. Return measured baseline and precise investigation/optimisation candidates, confounders, verification commands that actually exist, dependencies and rollback. No install/build/test/cache/config/source changes or permanent guideline updates without separate approval.

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

[Original prompt at the reviewed baseline](https://github.com/lightspeedwp/ThisOneTimeOnAcidCom/blob/3f583002482d80ffd1910676bcf7c63e13989b20/prompts/project-stability-audit/02-build-optimisation.md). The original remains historical evidence, not additional execution instructions. Proposed replacement prepared on 24 October 2026; refresh the revision/date and seek renewed approval for material changes before application.
