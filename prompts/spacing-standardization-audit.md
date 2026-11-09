**Original version:** 2.0.0 — Global codebase review scope

# Book-site spacing consistency audit

## 1. Objective

Identify evidenced spacing inconsistencies in current book-site layouts and propose token-aligned fixes with justified exceptions.

## 2. Inputs and scope

[repository instructions](../AGENTS.md); [guideline reading order](../guidelines/README.md); [book brief](../content/book/this-one-time-on-acid-brief.md); [registered routes](../src/app/routes.ts); [package manifest](../package.json).

Inputs: `src/styles/` and token definitions; `src/app/components/`, `src/app/data/mock/`, `src/app/hooks/`, `src/app/utils/` and `src/app/lib/`; responsive breakpoints and current spacing guidelines. Inspect actual CSS definitions before labelling utility-looking classes.

Read current evidence before following historical path examples. This is a React/TypeScript/Vite book website, not a WordPress runtime or makeup-portfolio rebuild. Retain sourced memoir material without restoring its former page architecture.

## 3. Audit steps

1. Search padding/margin/gap, inline spacing, dynamic style generation and data-driven configuration. Treat matches as candidates, not proof: zero, auto centring, percentages, calc/clamp and contextually necessary values are not blanket violations.

2. Cross-reference every used spacing token and helper class against actual loaded definitions; identify missing, duplicate, undocumented and apparently unused tokens with consumer evidence. Verify section horizontal/vertical, fluid scale and block-gap purpose without inventing new tokens.

3. Review page/section/UI/common components, nested layouts, container max-width plus padding and dynamic values. Check BEM classes and accepted CSS-custom-property injection; protect required dynamic calculations and documented exceptions.

4. Compare mobile/tablet/desktop spacing, reading measure, vertical rhythm, responsive overrides, grid gaps and touch/focus clearance. Browser layout claims require observed viewports; static CSS alone does not prove responsive behaviour.

5. For each confirmed mismatch provide exact file/line, declaration, source rule, expected versus observed layout, proposed token/class change, cascade/specificity risk and retest cases in both themes.

6. Return unique affected-file counts and token coverage with denominators; severity follows user impact, not raw syntax. Recommend bounded changes without hour estimates or inherited 100% checkmarks.

## 4. Missing evidence and permission boundaries

If a required source, current requirement, environment or permission is unavailable, identify the affected check and stop that part; do not fabricate a substitute or silently broaden scope. Treat historical totals and completion statements as reported evidence, not current results.

Default to read-only assessment. A request to edit or review this prompt does not authorise its underlying task. Do not edit application files, manuscript, images, guidelines, configuration, trackers or Linear records; execute commands, publish, archive or delete only under separately explicit authorisation. Never use age, zero imports or route absence alone as deletion approval. Preserve protected files and existing image sources.

Use UK English and sentence case while preserving exact quotations and proper nouns. Use he/him for Ash; do not alter other people’s pronouns. Do not invent dates, authors, social accounts, quotes, testimonials, transcripts, counts, progress, performance savings or duration estimates.

## 5. Success criteria

- [ ] Each mismatch distinguishes unsupported hardcoding from a justified layout exception.
- [ ] Token/class references and responsive risks are evidenced.
- [ ] All counts, coverage and unexecuted browser checks are explicitly qualified.
- [ ] Coverage, exclusions and source revisions are recorded; planned, static and executed checks are distinct.
- [ ] Proposed changes and unresolved decisions are presented for approval; no implementation or publication is implied.

## 6. Report output

Return Markdown containing scope/revision, inspected inventory, evidence-linked findings, accepted exceptions, proposed actions and limitations. Record each finding’s path and lines, expected versus observed behaviour, impact, uncertainty and verification needed. Mark checks passed, failed, blocked, not tested or not applicable from evidence; never prefill results.

Drafts stay in the response unless a destination is explicitly approved. If repository report persistence is separately requested, propose a relevant root `reports/{topic}/` path and exact content first; task lists and tracker changes require their own approval. Do not overwrite historical reports, mark work complete automatically or move prompts to `.github/prompts/`.

## 7. Revision provenance

[Original prompt at the reviewed baseline](https://github.com/lightspeedwp/ThisOneTimeOnAcidCom/blob/3f583002482d80ffd1910676bcf7c63e13989b20/prompts/spacing-standardization-audit.md). The original remains historical evidence, not additional execution instructions. Proposed replacement prepared on 24 October 2026; refresh the revision/date and seek renewed approval for material changes before application.
