# Book-site bundler and React compatibility audit

## 1. Objective

Assess current Figma Make compatibility and React behaviour from current source and reproduced evidence, without assuming a pending WordPress migration.

## 2. Inputs and scope

[repository instructions](../AGENTS.md); [guideline reading order](../guidelines/README.md); [book brief](../content/book/this-one-time-on-acid-brief.md); [registered routes](../src/app/routes.ts); [package manifest](../package.json).

Inputs: local bundler restrictions; current src/app components, hooks, lib/router.tsx, utilities and route imports; current manifest/build configuration; historical verification claims when relevant.

Read current evidence before following historical path examples. This is a React/TypeScript/Vite book website, not a WordPress runtime or makeup-portfolio rebuild. Retain sourced memoir material without restoring its former page architecture.

## 3. Audit steps

1. Inventory actual import/hook consumers. Locate useContent, useMockData, useWordPress, useBlogPosts, usePortfolioEntries and usePortfolioSections only if present; absent legacy hooks are observations, not instructions to create them.

2. Check optional chaining, nullish coalescing, import.meta.env, nested ternaries, for...of, new Set generics in TSX, object construction/access, arrow callbacks and template literals in their actual contexts against the current restriction table. Verify helper usage (grab, arrayGet, setProp) without a wholesale syntax or React.createElement conversion.

3. Analyse effect dependencies, cleanup for subscriptions/timers, state initialisation and updater use, stable hook options and recurring re-renders. Complex state, absent memoisation or an inline handler is not automatically a defect: establish behaviour and any measured cost before recommending useReducer/useMemo/useCallback/React.memo/virtualisation.

4. Review props/children typing, any usage, shared interfaces, hook naming, list keys, event binding, component composition and data-flow boundaries. Treat line counts and prop-drilling depth as review signals rather than mandatory rewrites.

5. Inspect async errors, rejected promises, loading/error/empty states, error boundaries, semantic controls, keyboard and focus behaviour; distinguish static source inspection from runtime checks.

6. Where legacy WordPress API strings or USE_WORDPRESS toggles remain, inventory their consumers and report whether they are active, historical or unresolved. Do not enable a CMS, change providers or treat portability as a current runtime requirement.

7. Compare v8.2.1 or other historical changelog/report claims with the inspected revision, including old IIFE/loop/hook assertions only where relevant. No historical “100% compliant” claim is a fresh result.

8. Check sentence-case UI labels and sourced Phase 7 content where in scope. Report current configuration conflicts and stop proposed fixes dependent on unresolved policy. Tests/build/import experiments require separate permission and an identified environment.

## Consolidated checks

Includes the former final-verification prompt and modern-react-migration child 01: syntax/context, hook dependencies and cleanup, props/types, state, keys/binding, composition, measured performance, async/error states and accessibility. No fixed count of legacy icons/components or present-day claim is inherited.

## 4. Missing evidence and permission boundaries

If a required source, current requirement, environment or permission is unavailable, identify the affected check and stop that part; do not fabricate a substitute or silently broaden scope. Treat historical totals and completion statements as reported evidence, not current results.

Default to read-only assessment. A request to edit or review this prompt does not authorise its underlying task. Do not edit application files, manuscript, images, guidelines, configuration, trackers or Linear records; execute commands, publish, archive or delete only under separately explicit authorisation. Never use age, zero imports or route absence alone as deletion approval. Preserve protected files and existing image sources.

Use UK English and sentence case while preserving exact quotations and proper nouns. Use he/him for Ash; do not alter other people’s pronouns. Do not invent dates, authors, social accounts, quotes, testimonials, transcripts, counts, progress, performance savings or duration estimates.

## 5. Success criteria

- [ ] Each syntax finding cites the current local restriction and actual affected context.
- [ ] React recommendations have behavioural evidence, not blanket performance prescriptions.
- [ ] Historical migration/verification claims and unexecuted checks are clearly labelled.
- [ ] Coverage, exclusions and source revisions are recorded; planned, static and executed checks are distinct.
- [ ] Proposed changes and unresolved decisions are presented for approval; no implementation or publication is implied.

## 6. Report output

Return Markdown containing scope/revision, inspected inventory, evidence-linked findings, accepted exceptions, proposed actions and limitations. Record each finding’s path and lines, expected versus observed behaviour, impact, uncertainty and verification needed. Mark checks passed, failed, blocked, not tested or not applicable from evidence; never prefill results.

Drafts stay in the response unless a destination is explicitly approved. If repository report persistence is separately requested, propose a relevant root `reports/{topic}/` path and exact content first; task lists and tracker changes require their own approval. Do not overwrite historical reports, mark work complete automatically or move prompts to `.github/prompts/`.

## 7. Revision provenance

[Original prompt at the reviewed baseline](https://github.com/lightspeedwp/ThisOneTimeOnAcidCom/blob/3f583002482d80ffd1910676bcf7c63e13989b20/prompts/bundler-compatibility-audit.md). The original remains historical evidence, not additional execution instructions. Proposed replacement prepared on 24 October 2026; refresh the revision/date and seek renewed approval for material changes before application.
