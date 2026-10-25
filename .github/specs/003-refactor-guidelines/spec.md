---
spec_id: "003"
feature: "guidelines-refactor"
issue: "TOA-358"
status: "draft"
created: "2026-10-24"
---

# Specification 003: Refactor Guidelines (TOA-358)

**Status:** Draft  
**Issue:** [TOA-358](https://linear.app/lightspeedwp/issue/TOA-358) | [GitHub #416](https://github.com/lightspeedwp/ThisOneTimeOnAcidCom/issues/416)  
**Branch:** `docs/spec-003-phase2-implementation`\
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
| **D1** | Canonical book/site identity, approved memoir/Journal/press voices, reader journey/CTA hierarchy, retained art/festival context | New normative copy, identity claims | ✅ RESOLVED |
| **D2** | Canonical manuscript/Journal sources; preview/full-draft visibility; indexing/cache boundaries | Publication/exposure contracts | ✅ RESOLVED |
| **D3** | Brief/current-CSS/approved-design-contract authority, palette/font roles, accessibility target | Design authority; arithmetic/sample corrections | ✅ RESOLVED |
| **D4** | Exact canonical destinations/pointer treatment, six-skill reference approach | Conditional N creates, pointer-only replacement, extraction | ✅ RESOLVED |
| **D5** | Artefact-specific retention and historical preservation-copy locations | Historical-copy operations | ✅ RESOLVED |
| **D6** | Signup/contact/waitlist/backend provider and verification | Delivery, secure unlock, CMS claims | ✅ RESOLVED |
| **D7** | Verified final branch/reuse scope, manual template/label handling | Branch selection, PR metadata | ✅ RESOLVED (`docs/spec-003-phase2-implementation`) |
| **D8** | WordPress/portfolio retained-reference vs future-option role | Migration/legacy requirements | ✅ RESOLVED |

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
both contain 116 Markdown files. The 2026-10-25 rerun compared baseline commit
`b7c3c4413f5fc7ed2e73a50ca7462d45a8e2e1b9` with checkout revision
`bb5888cf4681ed40402b2fc0b05d1366f109f4ad`: identical path sets and SHA-256
hashes for all 116 files, with zero changes. See the [T021 report](./validation-reports/T021-hash-validation.md)
and [baseline hash manifest](./validation-reports/T021-baseline.sha256).
This verifies the Git baseline comparison; the original observation attachment
remains unidentified. Phase 2B is **blocked** pending T017 `locked-files-guard` approval.

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

All decision gates (D0–D8) are resolved; implementation is underway per Phase 2 tasks.

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

## Resolved Decisions

All gates D0–D8 are resolved. Decision evidence and implementation guidance recorded in [requirements checklist](./checklists/requirements.md):

- **D0–D8:** Fully resolved with rationale and implementation guidance (2026-10-25)
- **D7 Branch:** `docs/spec-003-phase2-implementation` (Phase 2 implementation branch)
- **Historical branch:** `docs/spec-003-guidelines-reconcile` (Phase 1 planning branch, superseded)

## Phase 2 Implementation Steps

**Phase 2A: Protected-File Edits** (Tasks T005–T017)
1. Review `locked-files-guard` approval process
2. Edit 9 supporting documents (.claude/skills, AGENTS.md, CONTRIBUTING.md) with approval
3. Complete protected-file edits per approval gate T017

**Phase 2B: Guideline Document Edits** (Tasks T019–T027)

**Blocked:** Record T017 `locked-files-guard` approval before G-document edits.
Hash validation does not grant protected-file approval.

1. Execute 116 G-document category-based edits (T019–T026)
2. Complete pointer validation (T028–T032)
3. Validate all 129 internal reference candidates

**Phase 2C: Conditional N-Document Creation** (Tasks N001–N033)
1. Create approved N-documents per D4 decision
2. Resolve dependencies per approval status
3. Integrate new documents with existing guidelines

See [plan.md](./plan.md) and [tasks.md](./tasks.md) for full task breakdown and acceptance criteria.

---

*Source: TOA-358 implementation prompt (repository path not recorded; obtain the
original prompt and record its relative path before validating source hashes).*
