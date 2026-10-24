# Specification 003: Refactor Guidelines (TOA-358)

**Status:** Draft  
**Issue:** [TOA-358](https://linear.app/lightspeedwp/issue/TOA-358) | [GitHub #416](https://github.com/lightspeedwp/ThisOneTimeOnAcidCom/issues/416)  
**Branch:** `aiops/refactor-guidelines`  
**Created:** 2026-10-24

## Overview

Consolidate and refactor 116 existing guideline documents plus 33 conditional new documentation to establish canonical book/site instructions following the bounded memoir/creative-life-guide brief, with non-destructive consolidation and existing-skill integration.

## Requirements

### Scope & Constraints

- **In Scope:** 116 existing guideline edits (G001–G116), 9 supporting documents (S001–S009), 33 proposed new documents (N001–N033)
- **Out of Scope:** Application code changes (TS/TSX/CSS), route/loader/search/filter/forms/access repairs, dependency updates, PWA/service-worker creation, CMS migration, new skills
- **Preservation Rules:** Every unique policy/safeguard, historical provenance, original pointers remain; non-destructive consolidation only
- **Skill Reuse:** Integrate with existing six skills (branch-validation, changelog, labeling, test, validate, workflow-orchestration)

### Key Gates (Decision Required)

| Gate | Decision | Impact | Status |
| --- | --- | --- | --- |
| **D0** | Retain the existing protected-file approval requirement; no policy simplification is authorised | Protected edits, including all changes under `.github/` | ✅ RESOLVED (existing policy retained) |
| **D1** | Canonical book/site identity, approved memoir/Journal/press voices, reader journey/CTA hierarchy, retained art/festival context | New normative copy, identity claims | 🔄 PENDING |
| **D2** | Canonical manuscript/Journal sources; preview/full-draft visibility; indexing/cache boundaries | Publication/exposure contracts | 🔄 PENDING |
| **D3** | Brief/current-CSS/approved-design-contract authority, palette/font roles, accessibility target | Design authority; arithmetic/sample corrections | 🔄 PENDING |
| **D4** | Exact canonical destinations/pointer treatment, six-skill reference approach | Conditional N creates, pointer-only replacement, extraction | 🔄 PENDING |
| **D5** | Artefact-specific retention and historical preservation-copy locations | Historical-copy operations | 🔄 PENDING |
| **D6** | Signup/contact/waitlist/backend provider and verification | Delivery, secure unlock, CMS claims | 🔄 PENDING |
| **D7** | Verified final branch/reuse scope, manual template/label handling | Branch selection, PR metadata | ✅ RESOLVED (`aiops/refactor-guidelines`) |
| **D8** | WordPress/portfolio retained-reference vs future-option role | Migration/legacy requirements | 🔄 PENDING |

D0 confirms the current approval requirement, not approval to remove it.
The canonical [protected-file list](../../PROTECTED_FILES.txt) includes `.github/`;
`locked-files-guard` requires approval before merging those changes. Any policy
change requires a recorded authorised decision under the
[constitution amendment process](../../../.specify/memory/constitution.md#amendment-process).

### Acceptance Criteria (Target State)

- **Specification Complete:** All gates resolved, scope confirmed, implementation plan created
- **Implementation Ready:** Branch clean, PR template prepared, no unrelated changes
- **Verification:** Coverage manifest reconciles 116+9+33 paths; all dependencies resolved
- **Quality Gate:** Static skill exercises pass; no runtime claims without verification method noted

## Source Inventory

### Existing Guidelines (116 files)

All at `guidelines/` and subdirectories. Current tracked and on-disk inventories
both contain 116 files; comparison with the observation baseline remains pending.

**Subdirectories:**
- `blocks/` (4 files)
- `components/` (34 files)
- `design-tokens/` (10 files)
- `icons/` (2 files)
- `mobile/` (7 files)
- `pages/` (1 file)
- `parts/` (3 files)
- `patterns/` (1 file)
- `responsive/` (7 files)
- `sections/` (6 files)
- `templates/` (1 file)
- `troubleshooting/` (3 files)
- Root level (37 files)

### Supporting Documents (9 files)

**Protected/.claude/ files:**
- `.claude/skills/INVENTORY.md`
- `.claude/skills/workflow-orchestration/SKILL.md`
- `.claude/skills/validate/SKILL.md`
- `.claude/skills/test/SKILL.md`
- `.claude/skills/changelog/SKILL.md`
- `.claude/skills/branch-validation/SKILL.md`
- `.claude/skills/labeling/SKILL.md`
- `AGENTS.md`
- `CONTRIBUTING.md`

### Proposed New Documents (33 conditional)

**Categories:**
- Reference/diagnostics (5): CSS, media, component docs
- Design inspiration (1): Neon palettes
- WordPress migration (2): Block patterns, decision model
- Guidelines organization (13): Accessibility, architecture, content model, etc.
- Pages (3): README, book-home, sitemap
- Patterns (4): Book cards, hero, proposition, journal preview
- Reports/archived (4): Accessibility, performance, dark-mode, nova-news
- Platform/service (1): PWA

## Success Criteria (Target State)

These outcomes remain unverified while owner gates and implementation are pending.

1. [ ] All 116 existing guidelines source-read and disposition verified
2. [ ] Original file hashes validated; current state vs observation documented
3. [ ] S001–S009 protected-file edits scoped and dependencies mapped
4. [ ] D0–D8 decisions recorded with evidence
5. [ ] Pointer/anchor validation completed for all 129 internal reference candidates
6. [ ] Design/typography/spacing examples verified; literal corrections documented
7. [ ] Six existing skills statically exercised in draft/report/denied scenarios
8. [ ] Non-destructive consolidation confirmed; old paths mapped to new
9. [ ] No unapproved file moves/deletes; all changes reviewable
10. [ ] Final handoff report with coverage manifest, verification register, open decisions

## Open Questions

1. What are the canonical book brief identity markers and approved voices (D1)?
2. What are the manuscript visibility/indexing/cache boundaries (D2)?
3. Who owns design authority and what's the current CSS/palette/font strategy (D3)?
4. For the 33 N-docs: are these pointer-only replacements or full new guides (D4)?
5. Where should historical copies of deprecated guides be preserved (D5)?
6. What backend/provider owns signup/waitlist functionality (D6)?
7. Is WordPress portfolio content retained or deprecated (D8)?

## Next Steps

1. **Owner Decision Session:** Use [the plan](./plan.md) and [requirements checklist](./checklists/requirements.md) to resolve D1–D6 and D8 with focused evidence; retain D0 and D7 resolutions
2. **Implementation Plan:** Update [the existing plan](./plan.md) with exact source→destination mapping
3. **Task Breakdown:** Generate `tasks.md` with verifiable steps
4. **Quality Checklist:** Complete [the existing requirements checklist](./checklists/requirements.md)
5. **Implementation:** Execute within approved scope; validate at each checkpoint

---

*Source: TOA-358 implementation prompt (repository path not recorded; obtain the
original prompt and record its relative path before validating source hashes).*
