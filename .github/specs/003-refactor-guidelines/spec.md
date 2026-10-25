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
**Branch:** `docs/spec-003-guidelines-reconcile`\
**Created:** 2026-10-24

## Overview

Consolidate and refactor 116 existing guideline documents plus 29 approved new documents (Phase 2) and 4 deferred new documents (Phase 3) to establish canonical book/site instructions following the bounded memoir/creative-life-guide brief, with non-destructive consolidation and existing-skill integration.

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
| **D7** | Verified final branch/reuse scope, manual template/label handling | Branch selection, PR metadata | ✅ RESOLVED (`docs/spec-003-guidelines-reconcile`) |
| **D8** | WordPress/portfolio retained-reference vs future-option role | Migration/legacy requirements | 🔄 PENDING |

**D0 Resolution:** Decision gate RESOLVED. The existing protected-file approval policy (requiring `locked-files-guard` approval for `.github/` and protected paths) remains in force. This is a policy decision (no simplification).

**Procedural Requirement for Phase 2:** S-documents (AGENTS.md, CONTRIBUTING.md, `.claude/skills/*`) are protected files and require formal approval before PR merge. This is a *workflow gate*, not a *decision gate*. See tasks.md T001.4 for pre-implementation approval readiness check.

See [constitution amendment process](../../../.specify/memory/constitution.md#amendment-process) for policy change procedures.

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

### Proposed New Documents (33 total; 29 Phase 2, 4 Phase 3)

**Phase 2 Scope (N001–N029):**
- Reference/diagnostics (5): CSS, media, component docs
- Design inspiration (1): Neon palettes
- Guidelines organization (13): Accessibility, architecture, content model, etc.
- Pages (3): README, book-home, sitemap
- Patterns (4): Book cards, hero, proposition, journal preview
- Reports/archived (3): Accessibility, performance, dark-mode

**Phase 3 Deferred (N030–N033, per D8 decision):**
- WordPress migration (2): Block patterns, decision model
- Reports/archived (1): nova-news
- Platform/service (1): PWA

**Rationale:** Approved in D4; WordPress content deferred to Phase 3 per D8 decision (WordPress not in active use).

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

## Resolved Decisions (D0–D8)

All owner decisions have been recorded and approved as of 2026-10-25.
See [checklists/requirements.md § Resolved Decisions](./checklists/requirements.md#resolved-decisions) 
for complete decision statements, evidence, and Phase 2 implementation guidance.

**Decision Cross-Reference:**

| Question | Decision | Answer | Evidence |
|----------|----------|--------|----------|
| Canonical book identity & voices | D1 | Balanced Hybrid (Professional + conversational) | requirements.md § D1 |
| Manuscript visibility & boundaries | D2 | Mixed publication model; no hard separation | requirements.md § D2 |
| Design authority & accessibility | D3 | Ash Shaw; WCAG 2.2 AAA target | requirements.md § D3 |
| N-doc scope & pointer strategy | D4 | Hybrid consolidation; 29 approved Phase 2, 4 deferred Phase 3 | requirements.md § D4 |
| Historical preservation approach | D5 | Archive in `guidelines/_archive/`; Type 3 pointer constraints | requirements.md § D5 |
| Backend stack & signup | D6 | Vercel Functions + Supabase PostgreSQL + tRPC | requirements.md § D6 |
| WordPress role & legacy content | D8 | Not in active use; 4 N-docs deferred to Phase 3 | requirements.md § D8 |

## Next Steps

1. **Owner Decision Session:** Use [the plan](./plan.md) and [requirements checklist](./checklists/requirements.md) to resolve D1–D6 and D8 with focused evidence; retain D0 and D7 resolutions
2. **Implementation Plan:** Update [the existing plan](./plan.md) with exact source→destination mapping
3. **Task Breakdown:** Generate `tasks.md` with verifiable steps
4. **Quality Checklist:** Complete [the existing requirements checklist](./checklists/requirements.md)
5. **Implementation:** Execute within approved scope; validate at each checkpoint

---

*Source: TOA-358 implementation prompt (repository path not recorded; obtain the
original prompt and record its relative path before validating source hashes).*
