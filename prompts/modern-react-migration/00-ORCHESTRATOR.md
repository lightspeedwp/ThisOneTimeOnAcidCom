---
title: "Book-site React compatibility scope coordinator"
filename: "/prompts/modern-react-migration/00-ORCHESTRATOR.md"
created: "2026-03-11"
modified: "2026-10-24"
version: "2.0.0"
prompt_type: "orchestrator"
historical_related_reports: "/reports/2026-03-11-modern-react-migration/"
historical_related_tasks: "/tasks/modern-react-migration-tasks.md"
---

# Book-site React compatibility scope coordinator

## 1. Objective

Reconcile historical React/CSS migration prompts with current audit entry points without initiating a WordPress migration.

## 2. Inputs and scope

[repository instructions](../../AGENTS.md); [guideline reading order](../../guidelines/README.md); [book brief](../../content/book/this-one-time-on-acid-brief.md); [registered routes](../../src/app/routes.ts); [package manifest](../../package.json).

Inputs: current manifest/configuration, bundler rules and React consumers. Preserve original paths; 01, 02, 03 and 05 are compatibility notices; 04-wordpress-css-alignment.md remains held.

Read current evidence before following historical path examples. This is a React/TypeScript/Vite book website, not a WordPress runtime or makeup-portfolio rebuild. Retain sourced memoir material without restoring its former page architecture.

## 3. Audit steps

1. Inventory the actual React/TypeScript/Vite setup and current scripts. The presence of Tailwind packages or a migration prompt is not evidence they should be removed or a WordPress runtime should be created.

2. Use ../bundler-compatibility-audit.md for child 01’s syntax/hooks/state/types/composition/error/accessibility checks; use ../project-stability-audit/06-css-structure.md for children 02/03’s utility-to-BEM/CSS mapping checks.

3. Use ../project-stability-audit/01-application-stability.md for child 05’s component structure, logic boundaries, exports, hooks and type checks. Retain unique requirement provenance through each compatibility notice.

4. Preserve child 04 unchanged and identify its WordPress-alignment scope as held. Do not apply WordPress class names, migrate the application or create a new stylesheet under this review.

5. Reconcile contradictory historical “complete”, 40/52 or other totals by revision/evidence; do not infer completion, run scripts, install dependencies or update trackers. Return a scope/dependency report with current findings and missing evidence.

## 4. Missing evidence and permission boundaries

If a required source, current requirement, environment or permission is unavailable, identify the affected check and stop that part; do not fabricate a substitute or silently broaden scope. Treat historical totals and completion statements as reported evidence, not current results.

Default to read-only assessment. A request to edit or review this prompt does not authorise its underlying task. Do not edit application files, manuscript, images, guidelines, configuration, trackers or Linear records; execute commands, publish, archive or delete only under separately explicit authorisation. Never use age, zero imports or route absence alone as deletion approval. Preserve protected files and existing image sources.

Use UK English and sentence case while preserving exact quotations and proper nouns. Use he/him for Ash; do not alter other people’s pronouns. Do not invent dates, authors, social accounts, quotes, testimonials, transcripts, counts, progress, performance savings or duration estimates.

## 5. Success criteria

- [ ] All five original children have a clear canonical or held disposition.
- [ ] No assumed migration, Tailwind removal or nonexistent typecheck command is introduced.
- [ ] Coverage, exclusions and source revisions are recorded; planned, static and executed checks are distinct.
- [ ] Proposed changes and unresolved decisions are presented for approval; no implementation or publication is implied.

## 6. Report output

Return Markdown containing scope/revision, inspected inventory, evidence-linked findings, accepted exceptions, proposed actions and limitations. Record each finding’s path and lines, expected versus observed behaviour, impact, uncertainty and verification needed. Mark checks passed, failed, blocked, not tested or not applicable from evidence; never prefill results.

Drafts stay in the response unless a destination is explicitly approved. If repository report persistence is separately requested, propose a relevant root `reports/{topic}/` path and exact content first; task lists and tracker changes require their own approval. Do not overwrite historical reports, mark work complete automatically or move prompts to `.github/prompts/`.

## 7. Revision provenance

[Original prompt at the reviewed baseline](https://github.com/lightspeedwp/ThisOneTimeOnAcidCom/blob/3f583002482d80ffd1910676bcf7c63e13989b20/prompts/modern-react-migration/00-ORCHESTRATOR.md). The original remains historical evidence, not additional execution instructions. Proposed replacement prepared on 24 October 2026; refresh the revision/date and seek renewed approval for material changes before application.
