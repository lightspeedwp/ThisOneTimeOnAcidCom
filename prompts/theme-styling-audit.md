**Originally created:** March 11, 2026

# Book-site theme, contrast and switcher evidence audit

## 1. Objective

Assess current light/dark styling, theme switching and accessible contrast through one canonical review without choosing a theme architecture or implementing fixes.

## 2. Inputs and scope

[repository instructions](../AGENTS.md); [guideline reading order](../guidelines/README.md); [book brief](../content/book/this-one-time-on-acid-brief.md); [registered routes](../src/app/routes.ts); [package manifest](../package.json).

Inputs: actual theme provider/control/storage logic, html/body attributes and CSS import/cascade, current tokens and book brief, relevant render environment if separately authorised. The consolidated dark/light/theme-switcher entry points are historical notices.

Read current evidence before following historical path examples. This is a React/TypeScript/Vite book website, not a WordPress runtime or makeup-portfolio rebuild. Retain sourced memoir material without restoring its former page architecture.

## 3. Audit steps

1. Inventory how the actual implementation initialises and changes theme, which element carries class/data attributes and how state reaches controls/styles. Separate saved preference, initial fallback, system preference and explicit user selection; do not assume dark is always the approved default.

2. Assess first paint and transitions, state persistence, invalid/missing/denied storage, cross-tab behaviour where implemented and environment-specific hydration assumptions. Figma Make is not proof an SSR fix is required; no runtime claim without observation.

3. Trace exact selectors, CSS load order, specificity, custom-property inheritance, layers and important declarations. Investigate the historical OR-selector issue (:root:not(.dark), body:not(.dark)) against actual element attributes; body:not(.dark) may match while root is dark. Show the real match/cascade before proposing a replacement.

4. Inventory base surfaces/backgrounds, typography, links, header/footer/navigation, buttons, forms, lists/tables, cards, overlays/dialogs, alerts/tags, icons, borders/shadows, gradients, loading/animations, reader, media/lightbox, search, tabs, scrollbar and selection. Include hover/focus/active/selected/disabled/error/empty states, not only token definitions. Independently of contrast, verify that colour is not the sole visual means of conveying information, meaning, status, errors or selection: inspect forms, alerts, badges and other applicable controls for text, icons, patterns or another non-colour cue. Record the affected task/state and evidence; decorative colour without informational meaning does not require an invented status cue.

5. Measure actual foreground/background pairs with alpha/compositing, imagery/gradient worst cases and computed states where available. Applicable text targets are generally 4.5:1 normal or 3:1 large text; large is at least 18pt (24px) or 14pt (about 18.67px) bold. Relevant UI/graphics may need 3:1 with contextual exceptions; disabled/decorative content is not universally subject to the same rule.

6. When calculating contrast, document sRGB linearisation (threshold 0.04045), relative luminance and ratio, or identify the verified measurement tool. Do not inherit old 14.8:1 or other sample ratios as fresh results, infer colour from token names, or claim compliance from a sampled page.

7. Check theme control semantics/accessible name/state, keyboard activation and focus, no theme-state race, image/icon/duotone adaptation and readable transitions. Dialog/lightbox focus containment/return and underlying content behaviour need their own evidence.

8. Check responsive, zoom/reflow, forced-colour and reduced-motion states where in scope and supported; distinguish tested, source-inspected, blocked and untested browser/assistive-technology states.

9. Compare actual palette/typography against current brief, including near-black #0B0B10 versus older #0F-style assumptions and the two-font maximum. Report conflicts and accepted exceptions; do not automatically replace every colour/font or add palette variants.

10. Return a component/state/theme/viewport contrast and switcher matrix, exact supported fix proposals, limitations and required decisions. No CSS, provider, storage, asset, token, guideline, report or task edits.

## Consolidated source coverage

This canonical review combines dark-mode-accessibility-contrast-audit.md, dark-mode-audit/00-ORCHESTRATOR.md, dark-mode-audit/01-theme-switcher-audit.md and light-dark-mode-audit.md. Their component inventories, initialisation/persistence/control behaviour, selector regression, state/viewport coverage, colour calculation and validation requirements are retained. Historical mandatory fix lists, copied scores, auto-created reports and unconditional compliance declarations are not approvals or results.

## 4. Missing evidence and permission boundaries

If a required source, current requirement, environment or permission is unavailable, identify the affected check and stop that part; do not fabricate a substitute or silently broaden scope. Treat historical totals and completion statements as reported evidence, not current results.

Default to read-only assessment. A request to edit or review this prompt does not authorise its underlying task. Do not edit application files, manuscript, images, guidelines, configuration, trackers or Linear records; execute commands, publish, archive or delete only under separately explicit authorisation. Never use age, zero imports or route absence alone as deletion approval. Preserve protected files and existing image sources.

Use UK English and sentence case while preserving exact quotations and proper nouns. Use he/him for Ash; do not alter other people’s pronouns. Do not invent dates, authors, social accounts, quotes, testimonials, transcripts, counts, progress, performance savings or duration estimates.

## 5. Success criteria

- [ ] All five consolidated theme entry points’ selector, switcher, coverage and contrast checks are retained.
- [ ] Contrast findings identify real pairs/states, applicable target and measurement method rather than unverified ratios.
- [ ] Theme defaults, storage and palette conflicts remain explicit decisions.
- [ ] Coverage, exclusions and source revisions are recorded; planned, static and executed checks are distinct.
- [ ] Proposed changes and unresolved decisions are presented for approval; no implementation or publication is implied.

## 6. Report output

Return Markdown containing scope/revision, inspected inventory, evidence-linked findings, accepted exceptions, proposed actions and limitations. Record each finding’s path and lines, expected versus observed behaviour, impact, uncertainty and verification needed. Mark checks passed, failed, blocked, not tested or not applicable from evidence; never prefill results.

Drafts stay in the response unless a destination is explicitly approved. If repository report persistence is separately requested, propose a relevant root `reports/{topic}/` path and exact content first; task lists and tracker changes require their own approval. Do not overwrite historical reports, mark work complete automatically or move prompts to `.github/prompts/`.

## 7. Revision provenance

[Original prompt at the reviewed baseline](https://github.com/lightspeedwp/ThisOneTimeOnAcidCom/blob/3f583002482d80ffd1910676bcf7c63e13989b20/prompts/theme-styling-audit.md). The original remains historical evidence, not additional execution instructions. Proposed replacement prepared on 24 October 2026; refresh the revision/date and seek renewed approval for material changes before application.
