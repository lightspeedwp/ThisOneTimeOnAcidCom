**Originally created:** March 2, 2026

**Historical source provenance:** `/imports/ash-shaw-makeup-audit-1.md`

**Original version:** 1.0.0

# Book-site design-system audit

## 1. Objective

Audit the current book-first design system, component hierarchy and relevant accessibility behaviour without changing production assets.

## 2. Inputs and scope

[repository instructions](../AGENTS.md); [guideline reading order](../guidelines/README.md); [book brief](../content/book/this-one-time-on-acid-brief.md); [registered routes](../src/app/routes.ts); [package manifest](../package.json).

Inputs: current routes/components/CSS/data, book brief, architecture, token/theme/motion/voice/icon guidance. Capture contradictions—such as old three-/21-font direction versus maximum two fonts—without silently rewriting shared policy.

Read current evidence before following historical path examples. This is a React/TypeScript/Vite book website, not a WordPress runtime or makeup-portfolio rebuild. Retain sourced memoir material without restoring its former page architecture.

## 3. Audit steps

1. Inventory registered pages and nested styled elements, components/sections/primitives, CSS and source-data consumers. Classify heroes/cards/grids/sections/template parts; record unseen/unregistered legacy assets separately, not as required pages.

2. Record typography family/weight/size/leading/tracking, colours/gradients, spacing, radius, borders, shadows/glows and motion source per relevant element. Verify class definitions and loaded cascade before alleging Tailwind or orphaned CSS.

3. Assess the brief’s maximum two-font direction and readable type hierarchy; review headings semantically and sentence-case content while preserving quotations/proper nouns. Exactly one H1 is a project convention where applicable, not a universal WCAG compliance proof.

4. Assess pink/yellow accents, near-black surfaces and warm body copy against current brief/tokens. Check meaningful colour use and gradients in both themes, measured contrast with contextual thresholds, and restrained motion rather than requiring all historical neon palettes/gradients.

5. Check responsive spacing/container behaviour, token references, radii, shadows and transition/easing definitions. Raw numbers or absent per-component dark selectors are signals; inherited custom properties may already provide the correct result.

6. Check semantic landmarks and skip-link destination, keyboard Tab/Enter/Space/Arrows/Escape behaviour where applicable, focus/overlay interactions, images and icons. Informative images need appropriate alternatives; decorative images may use empty alt. No universal ARIA label on decorative icons.

7. Check BEM naming, component placement, documentation hooks, UI strings from src/app/data/mock versus editorial content/, and preservation of figma assets and protected ImageWithFallback. Identify conflicts without modifying protected sources.

8. Assess reduced-motion effects and transitions from computed effective behaviour; a separate media block in every file is not itself the requirement. Variable fonts, font payload and visual effects need measured evidence, not automatic optimisation claims.

9. Compile findings with source rules, accepted exceptions and exact proposed corrections; deduplicate into draft task recommendations only. Record inventory/element denominators, actual test environment and uninspected content.

## Accepted-exception review

Preserve and verify documented CSS custom-property injection for stagger values, computed percentage widths, slider/swipe transforms and demonstration-only live values. The shorter audit’s blanket ban does not override these existing exceptions; where current policy disagrees, record an unresolved decision. Semantic helper classes defined in project CSS are not Tailwind merely because their names resemble utilities.

## Consolidated coverage

Includes the shorter audit’s full prerequisite categories, nested-element inventory, typography/colour/layout/effect checks, keyboard interactions, component organisation and documentation hooks. Historical font names, neon mappings, breakpoint tables and target values are preserved in the pinned original as historical references, not adopted automatically.

## 4. Missing evidence and permission boundaries

If a required source, current requirement, environment or permission is unavailable, identify the affected check and stop that part; do not fabricate a substitute or silently broaden scope. Treat historical totals and completion statements as reported evidence, not current results.

Default to read-only assessment. A request to edit or review this prompt does not authorise its underlying task. Do not edit application files, manuscript, images, guidelines, configuration, trackers or Linear records; execute commands, publish, archive or delete only under separately explicit authorisation. Never use age, zero imports or route absence alone as deletion approval. Preserve protected files and existing image sources.

Use UK English and sentence case while preserving exact quotations and proper nouns. Use he/him for Ash; do not alter other people’s pronouns. Do not invent dates, authors, social accounts, quotes, testimonials, transcripts, counts, progress, performance savings or duration estimates.

## 5. Success criteria

- [ ] Every confirmed deviation cites effective source, rule and user impact.
- [ ] Documented styling exceptions are assessed before a violation is claimed.
- [ ] Accessibility and visual review results do not imply whole-site compliance.
- [ ] Coverage, exclusions and source revisions are recorded; planned, static and executed checks are distinct.
- [ ] Proposed changes and unresolved decisions are presented for approval; no implementation or publication is implied.

## 6. Report output

Return Markdown containing scope/revision, inspected inventory, evidence-linked findings, accepted exceptions, proposed actions and limitations. Record each finding’s path and lines, expected versus observed behaviour, impact, uncertainty and verification needed. Mark checks passed, failed, blocked, not tested or not applicable from evidence; never prefill results.

Drafts stay in the response unless a destination is explicitly approved. If repository report persistence is separately requested, propose a relevant root `reports/{topic}/` path and exact content first; task lists and tracker changes require their own approval. Do not overwrite historical reports, mark work complete automatically or move prompts to `.github/prompts/`.

## 7. Revision provenance

[Original prompt at the reviewed baseline](https://github.com/lightspeedwp/ThisOneTimeOnAcidCom/blob/3f583002482d80ffd1910676bcf7c63e13989b20/prompts/design-system-audit-full.md). The original remains historical evidence, not additional execution instructions. Proposed replacement prepared on 24 October 2026; refresh the revision/date and seek renewed approval for material changes before application.
