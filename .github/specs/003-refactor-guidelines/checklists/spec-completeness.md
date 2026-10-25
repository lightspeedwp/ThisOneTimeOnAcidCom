# Checklist: Specification Completeness (TOA-358)

**Purpose:** Validate that `spec.md` requirements are complete, unambiguous, and measurable.

**Validation Method:** Unit tests for specification requirements (not implementation)

**Created:** 2026-10-25 | **Reviewer:** [Owner/Team]

---

## Requirements Definition & Clarity

- [ ] **CHK001** All scope items (116 G-docs, 9 S-docs, 33 N-docs) are quantified with evidence (e.g., "verified count: 116")
- [ ] **CHK002** "In Scope" and "Out of Scope" sections are mutually exclusive; no item appears in both
- [ ] **CHK003** Each preservation rule in spec.md § Scope & Constraints has at least one concrete example or guideline cross-reference
- [ ] **CHK004** All 9 decision gates (D0–D8) have clear impact statements describing what gets blocked/enabled by resolution
- [ ] **CHK005** Decision gates do not reference each other in circular dependency chains (e.g., D1 doesn't require D4, which requires D1)

---

## Acceptance Criteria Validation

- [ ] **CHK006** Each of 10 success criteria (spec.md § Success Criteria) is independently verifiable (not dependent on another criterion for truth)
- [ ] **CHK007** Success criteria do not contain negations that are hard to verify (e.g., "No X happens" is avoided; replaced with "X is audited/logged")
- [ ] **CHK008** Each success criterion maps to at least one task in `tasks.md` or one contract requirement
- [ ] **CHK009** Success criteria cover all three entity types: G-documents, S-documents, N-documents
- [ ] **CHK010** Success criteria include verification methods (e.g., "hash validation", "static link check", "inventory reconciliation")

---

## Gate Requirements & Evidence Scaffolding

- [ ] **CHK011** Each pending gate (D1–D6, D8) has a **Decision Scope** section defining what must be decided
- [ ] **CHK012** Each gate specifies what "resolved" means (e.g., D4 resolved = N-document list approved and G→N mapping defined)
- [ ] **CHK013** Each gate's **Open Questions** section asks questions that are answerable (not rhetorical)
- [ ] **CHK014** Gate interdependencies are documented (e.g., "D4 blocks N operations; D5 blocks P operations")
- [ ] **CHK015** Resolved gates (D0, D7) have evidence references that are checkable (GitHub issue, branch name, etc.)

---

## Constraint & Limitation Coverage

- [ ] **CHK016** All constraints from § Scope & Constraints are reflected in at least one acceptance criterion or gate requirement
- [ ] **CHK017** Preservation rules specify *what* is preserved (e.g., "all unique safeguards") and reference examples (e.g., "see G042 bundler guards")
- [ ] **CHK018** Skill reuse requirement (§ Scope & Constraints) maps to at least one task that validates existing skill compatibility
- [ ] **CHK019** Non-destructive consolidation principle is defined operationally (not just stated philosophically)
- [ ] **CHK020** "Protected-file approval requirement" (D0) has a specific reference (e.g., "AGENTS.md § 331–343", "locked-files-guard tool")

---

## Source Inventory Completeness

- [ ] **CHK021** Subdirectory breakdown for 116 guidelines sums to 116; no discrepancy noted
- [ ] **CHK022** Each supporting document (S001–S009) is listed with current path and protection status
- [ ] **CHK023** Proposed new documents (N001–N033) are categorized and each category is defined in spec
- [ ] **CHK024** If inventory note says "comparison with observation baseline remains pending", a follow-up task exists to validate
- [ ] **CHK025** Each inventory section specifies whether list is "tracked", "on-disk", or "observation baseline" verified

---

## Open Questions & Ambiguities

- [ ] **CHK026** Each "Open Question" (spec.md § Open Questions) is answerable by an owner decision (not a technical investigation)
- [ ] **CHK027** No open question is answered in the spec without explicitly labeling it as "Example" or "Non-binding"
- [ ] **CHK028** Open questions map 1:1 to pending gates (7 questions, 7 pending gates: D1–D6, D8)
- [ ] **CHK029** If a question cannot be answered in Phase 1, a deferred-decision task is noted in plan.md § Risk Mitigation
- [ ] **CHK030** Terminology is consistent (e.g., "G-document", "G-entity", "guideline" used distinctly or defined as synonyms)

---

## Cross-Reference & Traceability

- [ ] **CHK031** All cross-references to other files (plan.md, contracts/, data-model.md) are relative paths or markdown links
- [ ] **CHK032** Constitution reference (§ II) is accurate if cited; verify with `.specify/memory/constitution.md` if accessible
- [ ] **CHK033** AGENTS.md § references are accurate (e.g., "§ 331–343" for protected files); spot-check at least 3
- [ ] **CHK034** Specification does not orphan any entity type (every G, S, N, P type discussed has at least one acceptance criterion)
- [ ] **CHK035** Each gate references related acceptance criteria and dependencies; no gate is isolated

---

## Specification Scope Boundaries

- [ ] **CHK036** Specification distinguishes between *this refactor* (scope) and *future work* (out of scope) for 33 N-documents
- [ ] **CHK037** Application code changes are explicitly listed as out of scope with at least one example (e.g., "TS/TSX/CSS changes")
- [ ] **CHK038** CMS migration is mentioned as out of scope; specification does not assume CMS role or feature
- [ ] **CHK039** PWA/service-worker creation is mentioned as out of scope (if applicable to project)
- [ ] **CHK040** Specification identifies what "complete" means (delivered state, not ongoing work)

---

## Governance & Authority Anchoring

- [ ] **CHK041** D0 (protected-file policy) decision is confirmed as "retain existing"; no policy simplification is proposed without separate amendment
- [ ] **CHK042** Protected-file approval authority is named (e.g., "owner", "code owner", specific GitHub teams) in approval-process.md contract
- [ ] **CHK043** Decision records are anchored to specific locations (GitHub issues, Linear, decision docs); not left as "TBD"
- [ ] **CHK044** Specification does not assume approval rights that contradict existing governance (e.g., cannot simplify locked-files-guard policy in this spec)
- [ ] **CHK045** Constitution or AGENTS.md overrides are documented if any spec requirement conflicts with canonical governance

---

## Completeness Summary

**Validation Results: Pending**
- [ ] Pending validation: Requirements are quantified and verifiable
- [ ] Pending validation: Acceptance criteria are specific and independent
- [ ] Pending validation: Gates are documented with clear resolution criteria
- [ ] Pending validation: Constraints are operational and concrete
- [ ] Pending validation: Open questions map to pending decisions
- [ ] Pending validation: Cross-references and traceability are checkable
- [ ] Pending validation: Scope boundaries are explicit
- [ ] Pending validation: Governance authority is anchored

**Blockers Identified:**
- [ ] Validation remains pending: all CHK items above are unchecked; Phase 2 readiness has not been established.
- [ ] Unresolved protected-path scope conflict: `.github/PROTECTED_FILES.txt` and the local approval checker include all of `.github/`, while the workflow contract lists narrower paths and omits `.github/specs/`. The feature approval contract also treats S002–S009 as protected, beyond the canonical list's explicit S-path coverage. Reconcile these scopes with the owner before claiming consistency or an exemption; retain existing approval requirements. See [research § 2](../research.md#2-protected-files-governance).
- [ ] Owner decisions D1–D6 and D8 remain pending and block Phase 2.

**Recommended Improvements:** (List items for future enhancement; do not block Phase 2)
- [ ] None recorded

---

**Checklist Status:**
- **Completeness:** 0 of 45 items verified — pending
- **Blocking Issues:** Unresolved — see blockers above; further assessment pending
- **Non-Blocking Recommendations:** ___ (logged for future reference)
- **Approved for Phase 2:** No — pending validation, scope reconciliation, and owner decisions

**Reviewer:** ________________________  **Date:** __________

---

*Checklist template: Specification Completeness | Part of TOA-358 Requirements-Quality Validation*
