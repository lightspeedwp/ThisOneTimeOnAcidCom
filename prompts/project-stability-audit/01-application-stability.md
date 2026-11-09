# Book-site application and component stability review

## 1. Objective

Assess actual application stability and component structure without performing a migration or refactor.

## 2. Inputs and scope

[repository instructions](../../AGENTS.md); [guideline reading order](../../guidelines/README.md); [book brief](../../content/book/this-one-time-on-acid-brief.md); [registered routes](../../src/app/routes.ts); [package manifest](../../package.json).

Inputs: current repository instructions, actual source/configuration/manifest, approved scope and relevant existing work. Confirm paths and scripts against the inspected revision; no implied command execution.

Read current evidence before following historical path examples. This is a React/TypeScript/Vite book website, not a WordPress runtime or makeup-portfolio rebuild. Retain sourced memoir material without restoring its former page architecture.

## 3. Audit steps

1. Inventory actual entry points, router/root providers, configuration and current TypeScript setup. Locate configuration rather than assuming a root tsconfig.json; check the current manifest and runtime before prescribing commands. Inspect current `vite.config.ts`, `src/app/tsconfig.json`, `src/app/tsconfig.node.json` and their actual extends/references chain, recording missing or changed paths rather than inventing a root config. Compare Vite resolve aliases with TypeScript paths/base-directory resolution; verify that applicable compiler include/exclude patterns cover intended application/tooling source without unintentionally omitting required files. Inspect the actual `index.html` entry and its viewport metadata, recording the declaration and any source-level omission; source inspection does not prove observed mobile/zoom behaviour. Report mismatches read-only, without changing configuration or running a compiler.

2. Trace initial render, route loading, Suspense/error boundaries, provider dependencies and current loading/error/empty behaviour. A blank or coloured screen is a symptom: establish a failing step and relevant console/network evidence before assigning cause.

3. Assess actual hook order/dependencies, subscriptions/timers cleanup, state updates, async races, repeated render behaviour and side effects. Import/provider restructuring and blanket memoisation are proposals, not automatic cures.

4. Assess component naming/purpose and organisation, responsibility boundaries, complexity, presentation versus logic, reusable patterns and prop/data flow. Historical line-count thresholds are review signals, not mandatory splits.

5. Check exports/imports—including lazy-loading requirements—shared types, any/optional props, hook extraction and documentation of non-obvious contracts. Assess dependency direction/coupling and circular initialisation with actual consumer evidence; a type-only cycle is not automatically a runtime defect. Do not mandate named-only exports, barrels for all modules or renaming every generic component.

6. Assess semantic controls, keyboard/focus, responsive and both-theme behaviour for affected real components. Preserve behaviour and protected content; distinguish source review from executed tests.

7. Return evidence-linked findings, the smallest proposed refactors and dependencies/rollback/retest needs. No application/configuration/type/hook changes, script execution or false “all clear” result.

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

[Original prompt at the reviewed baseline](https://github.com/lightspeedwp/ThisOneTimeOnAcidCom/blob/3f583002482d80ffd1910676bcf7c63e13989b20/prompts/project-stability-audit/01-application-stability.md). The original remains historical evidence, not additional execution instructions. Proposed replacement prepared on 24 October 2026; refresh the revision/date and seek renewed approval for material changes before application.
