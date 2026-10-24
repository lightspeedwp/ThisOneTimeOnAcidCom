# Book-site CSS cascade, utility and BEM review

## 1. Objective

Assess actual CSS structure and any proposed utility-to-BEM mapping without removing Tailwind or imposing a WordPress runtime.

## 2. Inputs and scope

[repository instructions](../../AGENTS.md); [guideline reading order](../../guidelines/README.md); [book brief](../../content/book/this-one-time-on-acid-brief.md); [registered routes](../../src/app/routes.ts); [package manifest](../../package.json).

Inputs: current repository instructions, actual source/configuration/manifest, approved scope and relevant existing work. Confirm paths and scripts against the inspected revision; no implied command execution.

Read current evidence before following historical path examples. This is a React/TypeScript/Vite book website, not a WordPress runtime or makeup-portfolio rebuild. Retain sourced memoir material without restoring its former page architecture.

## 3. Audit steps

1. Trace actual style entry/import order from src/main.tsx through imported sheets, layers, theme selectors and component scopes. Resolve cascade, specificity, inheritance and computed values; a custom property need not be declared earlier textually if available at computed-value time.

2. Inventory current utility-shaped classes, BEM blocks/elements/modifiers, dynamic class construction and selector definitions before calling a class a Tailwind violation. Tailwind package presence and utility-like spelling do not alone prove active generated utilities or removal readiness.

3. Assess spacing/sizing, layout/flex/grid, typography, colour/background/border, radius/shadow, responsive, interaction/state, pseudo-selector and arbitrary-value families against actual tokens and local restrictions. Include global reset/import order and meaningful legitimate inline-style exceptions. Inventory actual CSS custom-property definitions in loaded global, token and block sheets, including scoped/theme variants, and compare them with [design-token documentation](../../guidelines/design-tokens/). Record defined-but-undocumented properties, documented-but-absent or obsolete properties, and conflicting names/values/scopes, citing both source and documentation revisions. Distinguish intentional local/internal exceptions and unknown loading evidence from confirmed drift. Return read-only reconciliation findings; documentation or token changes outside this prompt require separate exact proposals and approval.

4. For each utility-to-BEM candidate draft an exact existing-class to proposed-selector/declaration mapping, current token source, affected consumers, breakpoints/states and expected computed behaviour. Do not invent a token, equivalent value or new class as a universal substitute.

5. Check CSS source structure, duplicate/orphan candidates, related small sheets and source-size split proposals against full consumer/cascade evidence. Preserve media queries, keyframes, theme/reduced-motion, conditional selectors and intentional exceptions.

6. Keep WordPress alignment child 04 held; .wp-* or Gutenberg class conventions are not current React runtime requirements. No automatic Tailwind/package removal, generated CSS, class rewrites, new guidelines or cascade reordering.

7. Return the cascade/consumer inventory, exact mapping candidates and visual/accessibility regression needs. Missing package/API/computed-style evidence blocks affected mapping instead of silently guessing.

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

[Original prompt at the reviewed baseline](https://github.com/lightspeedwp/ThisOneTimeOnAcidCom/blob/3f583002482d80ffd1910676bcf7c63e13989b20/prompts/project-stability-audit/06-css-structure.md). The original remains historical evidence, not additional execution instructions. Proposed replacement prepared on 24 October 2026; refresh the revision/date and seek renewed approval for material changes before application.
