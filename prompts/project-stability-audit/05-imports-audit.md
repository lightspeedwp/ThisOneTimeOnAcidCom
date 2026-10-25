# Book-site import and dependency integrity review

## 1. Objective

Assess current import resolution and dependency evidence without treating regex searches as a complete graph.

## 2. Inputs and scope

[repository instructions](../../AGENTS.md); [guideline reading order](../../guidelines/README.md); [book brief](../../content/book/this-one-time-on-acid-brief.md); [registered routes](../../src/app/routes.ts); [package manifest](../../package.json).

Inputs: current repository instructions, actual source/configuration/manifest, approved scope and relevant existing work. Confirm paths and scripts against the inspected revision; no implied command execution.

Read current evidence before following historical path examples. This is a React/TypeScript/Vite book website, not a WordPress runtime or makeup-portfolio rebuild. Retain sourced memoir material without restoring its former page architecture.

## 3. Audit steps

1. Inventory static imports, re-exports, type-only imports, dynamic imports, import.meta.glob patterns, CSS side effects, asset references, aliases and route/lazy-loading consumers. Record scope and unresolved computed paths. Check actual use of every named, default, namespace and type-only imported symbol in its value/type context. Identify repeated imports from the same resolved module and distinguish legitimate separate type/value or side-effect declarations from redundant duplicates. Return evidence tables with file/line, symbol or module, usage/duplicate evidence, legitimate exception, uncertainty and the smallest proposed correction. CSS side-effect imports may serve global, theme or dynamically selected consumers; absence of a local symbol or JSX class is not proof they are unused. Do not remove, merge or sort imports automatically.

2. Check relative/alias paths, case sensitivity, extensions, actual export shape, package exports and runtime/bundler context. Node built-ins in scripts and browser imports have different constraints; do not conflate them.

3. Check current package declarations/lockfile, peer/optional dependencies, script/config/parser consumers and documentation before suggesting an unused dependency. No direct import is not proof a package is removable.

4. Assess cycles by actual runtime/type/initialisation impact; a cycle or barrel is not automatically a defect. Check CSS import ordering and protected asset/stub consumers before proposals.

5. Assess documented import ordering/type conventions with accepted exceptions. Preserve image sources and shared wrappers; no automatic import sorting, package removal or guessed module replacement.

6. Return exact resolution/consumer evidence, limitations of any static search and proposed fixes/retest needs. Do not run source scripts, install dependencies or alter imports.

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

[Original prompt at the reviewed baseline](https://github.com/lightspeedwp/ThisOneTimeOnAcidCom/blob/3f583002482d80ffd1910676bcf7c63e13989b20/prompts/project-stability-audit/05-imports-audit.md). The original remains historical evidence, not additional execution instructions. Proposed replacement prepared on 24 October 2026; refresh the revision/date and seek renewed approval for material changes before application.
