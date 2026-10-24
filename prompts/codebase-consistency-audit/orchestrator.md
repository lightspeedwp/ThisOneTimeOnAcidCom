**Original version:** 3.0.0

# Book-site codebase consistency audit

## 1. Objective

Assess eight current site-health domains using verified source/configuration and existing work, not September package benchmarks or portfolio defaults.

## 2. Inputs and scope

[repository instructions](../../AGENTS.md); [guideline reading order](../../guidelines/README.md); [book brief](../../content/book/this-one-time-on-acid-brief.md); [registered routes](../../src/app/routes.ts); [package manifest](../../package.json).

Actual workflow roots: prompts/, reports/, tasks/ at repository root. Application source: src/app; styles: src/styles; HTML entry: index.html; static assets: public/. Inventory real configuration before using examples.

Read current evidence before following historical path examples. This is a React/TypeScript/Vite book website, not a WordPress runtime or makeup-portfolio rebuild. Retain sourced memoir material without restoring its former page architecture.

## 3. Audit steps

1. H — Read relevant current task lists and Linear evidence if accessible, retaining contradictory pending/completed claims as unknown. Record overlaps and stale signals without changing statuses, archiving reports or duplicating existing work.

2. F — Read package.json/package-lock and effective Vite/PostCSS/TypeScript/runtime settings. Record actual declared/resolved versions, React peer/dependency arrangements, duplicate libraries and direct/transitive/script consumers. Do not use fixed “latest stable” tables, mandate pinned versions or remove packages on import absence alone.

3. E — Trace the actual CSS load chain, @imports and custom-property scope/fallbacks. Compare used and defined tokens across globals, tokens, themes and blocks; revisit historical content-token, shadow, radius, spacing and z-index findings only with current evidence.

4. B — Review hardcoded colour/type/spacing against current book brief, tokens and exceptions. Source matches are candidates, not automatic violations; no blanket ban on values in every non-root selector.

5. A — Compare current .btn/.button/WP-style/read-more systems where present: effective padding, radius, font, variants and states. Record naming/legacy conflicts; do not impose one clamp pattern or change runtime styling.

6. C — Classify inline styling using current approved exceptions: custom-property injection, computed widths/transforms, dynamic background images and live demonstrations. Preserve historical exceptions as checks to verify, not universal waivers; conflicting September transform guidance requires a decision.

7. D — Inspect browser logging, errors and intentional diagnostics separately from root scripts/. Do not add import.meta.env guards forbidden locally or classify error-boundary reporting as a defect without evidence.

8. G — Audit current book/author/Journal/events metadata, canonical URLs, actual OG assets and applicable Schema.org types. Inspect rendered versus source metadata separately; do not assume SearchAction guarantees sitelinks, every historical page needs schema, or structured data guarantees AI discovery.

9. G — Inspect robots/sitemap and any llms.txt against explicit indexing/privacy intent. Do not allow all AI/training crawlers, create files or fetch private URLs automatically; distinguish proposed conventions from verified provider requirements. Check font loading, route lazy loading, image sizing and configured headers with environment limits.

10. G — Define performance measurements with revision, workload and environment; static priority/image/caching hints do not measure LCP/INP/CLS/TTFB. Assess semantic landmarks, heading structure, focus, accessible names and applicable WCAG criteria/exceptions; verify criterion mappings rather than copying old incorrect titles.

11. Return H → F → E → B → A → C → D → G findings and a deduplicated draft remediation plan. Proposed report destination is root reports/codebase-consistency-audit/; no automatic output/task updates, moves or overwriting.

## 4. Missing evidence and permission boundaries

If a required source, current requirement, environment or permission is unavailable, identify the affected check and stop that part; do not fabricate a substitute or silently broaden scope. Treat historical totals and completion statements as reported evidence, not current results.

Default to read-only assessment. A request to edit or review this prompt does not authorise its underlying task. Do not edit application files, manuscript, images, guidelines, configuration, trackers or Linear records; execute commands, publish, archive or delete only under separately explicit authorisation. Never use age, zero imports or route absence alone as deletion approval. Preserve protected files and existing image sources.

Use UK English and sentence case while preserving exact quotations and proper nouns. Use he/him for Ash; do not alter other people’s pronouns. Do not invent dates, authors, social accounts, quotes, testimonials, transcripts, counts, progress, performance savings or duration estimates.

## 5. Success criteria

- [ ] Eight domains are covered or explicitly excluded with evidence.
- [ ] All current paths/versions/commands derive from the inspected revision.
- [ ] Privacy, deployment, policy and protected-record changes remain separately approval-gated.
- [ ] Coverage, exclusions and source revisions are recorded; planned, static and executed checks are distinct.
- [ ] Proposed changes and unresolved decisions are presented for approval; no implementation or publication is implied.

## 6. Report output

Return Markdown containing scope/revision, inspected inventory, evidence-linked findings, accepted exceptions, proposed actions and limitations. Record each finding’s path and lines, expected versus observed behaviour, impact, uncertainty and verification needed. Mark checks passed, failed, blocked, not tested or not applicable from evidence; never prefill results.

Drafts stay in the response unless a destination is explicitly approved. If repository report persistence is separately requested, propose a relevant root `reports/{topic}/` path and exact content first; task lists and tracker changes require their own approval. Do not overwrite historical reports, mark work complete automatically or move prompts to `.github/prompts/`.

## 7. Revision provenance

[Original prompt at the reviewed baseline](https://github.com/lightspeedwp/ThisOneTimeOnAcidCom/blob/3f583002482d80ffd1910676bcf7c63e13989b20/prompts/codebase-consistency-audit/orchestrator.md). The original remains historical evidence, not additional execution instructions. Proposed replacement prepared on 24 October 2026; refresh the revision/date and seek renewed approval for material changes before application.
