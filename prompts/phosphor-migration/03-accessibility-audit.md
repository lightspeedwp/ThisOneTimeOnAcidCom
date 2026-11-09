# Book-site icon accessibility assessment

## 1. Objective

Assess icon-related controls and meaning under an explicitly identified accessibility target.

## 2. Inputs and scope

[repository instructions](../../AGENTS.md); [guideline reading order](../../guidelines/README.md); [book brief](../../content/book/this-one-time-on-acid-brief.md); [registered routes](../../src/app/routes.ts); [package manifest](../../package.json).

Inputs: actual src/app icon modules and consumers, package manifest/lockfile, bundler guidance, approved design tokens and current route inventory. Confirm paths before relying on historical examples.

Read current evidence before following historical path examples. This is a React/TypeScript/Vite book website, not a WordPress runtime or makeup-portfolio rebuild. Retain sourced memoir material without restoring its former page architecture.

## 3. Audit steps

1. Inventory current decorative, informative and interactive icons with actual parent controls and states. Check semantic elements, accessible names and contextual visible text; a label on a control is not always a label on its SVG.

2. Check decorative hiding, meaningful alternatives, duplicate announcements, tooltip availability and keyboard/focus/disabled/selected/loading states. Record actual assistive-technology observations separately from source inspection.

3. Distinguish visual icon size from pointer target size. WCAG 2.2 AA 2.5.8 generally uses 24 by 24 CSS pixels with exceptions; 44 by 44 belongs to enhanced 2.5.5 at AAA. Verify applicable level/exceptions rather than enforcing 44 on every icon.

4. Assess applicable non-text contrast, including 3:1 requirements for relevant UI/graphical states and exceptions for inactive/decorative cases. Text labels require their applicable text contrast; neither a weight nor token name certifies contrast.

5. Check both themes, responsive touch/keyboard states, focus visibility and reduced-motion handling for animated icons. Assess all actual contexts; do not declare all six weights universally accessible.

6. Return findings with criterion/version/level, trigger, impact, evidence, uncertainty and retest needs. No source, icon, token or guideline edits.

## 4. Missing evidence and permission boundaries

If a required source, current requirement, environment or permission is unavailable, identify the affected check and stop that part; do not fabricate a substitute or silently broaden scope. Treat historical totals and completion statements as reported evidence, not current results.

Default to read-only assessment. A request to edit or review this prompt does not authorise its underlying task. Do not edit application files, manuscript, images, guidelines, configuration, trackers or Linear records; execute commands, publish, archive or delete only under separately explicit authorisation. Never use age, zero imports or route absence alone as deletion approval. Preserve protected files and existing image sources.

Use UK English and sentence case while preserving exact quotations and proper nouns. Use he/him for Ash; do not alter other people’s pronouns. Do not invent dates, authors, social accounts, quotes, testimonials, transcripts, counts, progress, performance savings or duration estimates.

## 5. Success criteria

- [ ] Consumer/API assumptions are resolved or explicitly blocked with source evidence.
- [ ] Accessibility and visual compatibility decisions preserve current behaviour rather than enforcing blanket defaults.
- [ ] Coverage, exclusions and source revisions are recorded; planned, static and executed checks are distinct.
- [ ] Proposed changes and unresolved decisions are presented for approval; no implementation or publication is implied.

## 6. Report output

Return Markdown containing scope/revision, inspected inventory, evidence-linked findings, accepted exceptions, proposed actions and limitations. Record each finding’s path and lines, expected versus observed behaviour, impact, uncertainty and verification needed. Mark checks passed, failed, blocked, not tested or not applicable from evidence; never prefill results.

Drafts stay in the response unless a destination is explicitly approved. If repository report persistence is separately requested, propose a relevant root `reports/{topic}/` path and exact content first; task lists and tracker changes require their own approval. Do not overwrite historical reports, mark work complete automatically or move prompts to `.github/prompts/`.

## 7. Revision provenance

[Original prompt at the reviewed baseline](https://github.com/lightspeedwp/ThisOneTimeOnAcidCom/blob/3f583002482d80ffd1910676bcf7c63e13989b20/prompts/phosphor-migration/03-accessibility-audit.md). The original remains historical evidence, not additional execution instructions. Proposed replacement prepared on 24 October 2026; refresh the revision/date and seek renewed approval for material changes before application.
