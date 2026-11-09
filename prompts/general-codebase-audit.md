**Originally created:** February 25, 2026

# Book-site codebase discovery audit

## 1. Objective

Identify evidenced codebase hygiene and memory-investigation opportunities without performing cleanup.

## 2. Inputs and scope

[repository instructions](../AGENTS.md); [guideline reading order](../guidelines/README.md); [book brief](../content/book/this-one-time-on-acid-brief.md); [registered routes](../src/app/routes.ts); [package manifest](../package.json).

Inputs: approved audit boundaries, current source tree, root `content/`, `src/app/{components,hooks,utils,data,lib}/`, `src/styles/`, `public/`, configuration and relevant existing tasks/reports. Establish a verified inventory before claiming complete coverage.

Read current evidence before following historical path examples. This is a React/TypeScript/Vite book website, not a WordPress runtime or makeup-portfolio rebuild. Retain sourced memoir material without restoring its former page architecture.

## 3. Audit steps

1. Inventory root files and folders, generated output and configuration consumers. Recognise root AGENTS.md, CONTRIBUTING.md and ATTRIBUTIONS.md exceptions; documentation/reference assets need no TypeScript import to be intentional. Assess attribution-file duplication, theme.json and schema documentation by purpose, not filename.

2. Trace static/dynamic imports, re-exports, import.meta.glob patterns, Markdown links, parsers, scripts, route/data/configuration references and intentional stubs before proposing an unused-file finding. Protect root content/book and content/journal. No dependency match is not a safe-deletion certificate.

3. Review unused, duplicate and type-only imports and CSS side effects. Resolve class use through global cascade, responsive/theme/conditional selectors, dynamically constructed names and shared sheets before flagging an orphan. Identify duplicate definitions, keyframes and very small related sheets as consolidation candidates only.

4. Review useContentful → useContent references if they still exist; propose consumer-by-consumer migration rather than executing it. Assess JSX content sourcing, inline styling, logging and bundler syntax against current local rules; do not introduce forbidden import.meta.env guards. For current mock-data consumers, check deprecated field names and whether TypeScript declarations match actual data shapes, including optional/null values; record exact definition and consumer evidence. Use the [data-contract review](project-stability-audit/04-mock-data-types.md) for detailed schema verification when requested; this handoff does not authorise execution or data/type edits.

5. For utilities such as imageManifest, imageOptimizer and contentCounts, trace actual current consumers. Record UI primitive/library stubs and protected Supabase deployment artefacts separately; no replacement images, deletion or backend integration.

6. Measure current source sizes and complexity before proposing splits. Examine globals helpers, icon-library features, reader/style-guide CSS, posts/SEO/palette data and duplicated wrappers/branches where present. Propose logical boundaries, exact import changes and circular-dependency/rollback checks; thresholds alone do not mandate splitting.

7. Inspect shared Markdown styling, taxonomy archive layouts, container helpers and blockquote/quote duplication for genuinely reusable structure. Preserve meaningful content differences, BEM semantics, theme states and actual approved two-font direction; no assumed 60–70% saving or unsupported CSS @extend.

8. Review current inline SVG complexity, duplicated defs, ColorfulIcons and RootLayout noise if present. Record shape counts and actual measurements; do not simplify protected images or replace assets without exact approval.

9. Review report/task/prompt/docs/public/dist lifecycle by current purpose and consumer evidence. Record conflicting retention instructions for owner resolution; never delete active or archived material on a blanket seven-/30-day rule, overwrite reports or infer obsolete prompts from historical execution.

10. Compare findings with existing tracked work; deduplicate recommendations and record links, without changing task states or promoting priorities automatically.

## Consolidated requirement coverage

The former root-cleanup, comprehensive-cleanup and memory-reduction entry points now refer here. Their useful root/configuration, content, hook, UI-stub, utility, CSS, import, retention, source-size, SVG and DRY checks are covered above. Historical path inventories remain in their pinned originals; they do not certify current existence, completion or cancellation.

## 4. Missing evidence and permission boundaries

If a required source, current requirement, environment or permission is unavailable, identify the affected check and stop that part; do not fabricate a substitute or silently broaden scope. Treat historical totals and completion statements as reported evidence, not current results.

Default to read-only assessment. A request to edit or review this prompt does not authorise its underlying task. Do not edit application files, manuscript, images, guidelines, configuration, trackers or Linear records; execute commands, publish, archive or delete only under separately explicit authorisation. Never use age, zero imports or route absence alone as deletion approval. Preserve protected files and existing image sources.

Use UK English and sentence case while preserving exact quotations and proper nouns. Use he/him for Ash; do not alter other people’s pronouns. Do not invent dates, authors, social accounts, quotes, testimonials, transcripts, counts, progress, performance savings or duration estimates.

## 5. Success criteria

- [ ] Every potential orphan has purpose/consumer evidence and an explicit preservation decision.
- [ ] Memory/size recommendations separate measurements from hypotheses and do not invent realised savings.
- [ ] Protected manuscript, assets, stubs and historical reports remain intact.
- [ ] Coverage, exclusions and source revisions are recorded; planned, static and executed checks are distinct.
- [ ] Proposed changes and unresolved decisions are presented for approval; no implementation or publication is implied.

## 6. Report output

Return Markdown containing scope/revision, inspected inventory, evidence-linked findings, accepted exceptions, proposed actions and limitations. Record each finding’s path and lines, expected versus observed behaviour, impact, uncertainty and verification needed. Mark checks passed, failed, blocked, not tested or not applicable from evidence; never prefill results.

Drafts stay in the response unless a destination is explicitly approved. If repository report persistence is separately requested, propose a relevant root `reports/{topic}/` path and exact content first; task lists and tracker changes require their own approval. Do not overwrite historical reports, mark work complete automatically or move prompts to `.github/prompts/`.

## 7. Revision provenance

[Original prompt at the reviewed baseline](https://github.com/lightspeedwp/ThisOneTimeOnAcidCom/blob/3f583002482d80ffd1910676bcf7c63e13989b20/prompts/general-codebase-audit.md). The original remains historical evidence, not additional execution instructions. Proposed replacement prepared on 24 October 2026; refresh the revision/date and seek renewed approval for material changes before application.
