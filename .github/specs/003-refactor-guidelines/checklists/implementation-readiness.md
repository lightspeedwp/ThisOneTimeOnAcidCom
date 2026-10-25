# Checklist: Implementation Readiness (TOA-358)

**Purpose:** Validate that `tasks.md`, `plan.md`, and `quickstart.md` adequately map Phase 1 requirements to Phase 2 actionable work.

**Validation Method:** Unit tests for specification-to-implementation traceability

**Created:** 2026-10-25 | **Reviewer:** [Owner/Team]

---

## Task Completeness & Traceability

- [ ] **CHK046** All 43 tasks in `tasks.md` are assigned a unique Task ID (T001–T043)
- [ ] **CHK047** Each task maps back to at least one acceptance criterion from spec.md § Success Criteria
- [ ] **CHK048** Phase 2 tasks (T005–T040) are organized by operation category (S-docs, G-docs, N-docs, pointers, validation)
- [ ] **CHK049** Pre-implementation verification tasks (T001–T004) include explicit success criteria (e.g., "all D-gates recorded" for T001)
- [ ] **CHK050** Each task includes a file path or scope statement; no task is vague about what file(s) it affects

---

## Phase Organization & Dependencies

- [ ] **CHK051** Phase 2A (protected-file edits, T005–T018) comes before Phase 2B (guideline edits, T019–T027)
- [ ] **CHK052** Phase 2C (N-document creation, T028–T032) includes explicit dependency note: "Blocked on D4 approval"
- [ ] **CHK053** Phase 2D (pointer operations, T033–T034) explicitly requires D4 approval for pointer strategy and destination decisions and D5 approval for preservation decisions before pointer operations
- [ ] **CHK054** Task dependencies are documented (e.g., T019 depends on T005–T018 completion, not assumed)
- [ ] **CHK055** Each task explicitly states blocking conditions: "Proceed only if...", "Blocked until..."

---

## Gate Dependencies & Handoff Conditions

- [ ] **CHK056** Pre-implementation task T001 explicitly checks: "All D1–D6, D8 gates have recorded decisions with evidence"
- [ ] **CHK057** T001 success criteria include: "Evidence links are present in `checklists/requirements.md` lines 30–43"
- [ ] **CHK058** Phase 2 cannot start without T001–T004 completion (documented in plan.md § Pre-Implementation Verification)
- [ ] **CHK059** Each D-gate dependency is mapped to task(s) that depend on it (e.g., D4 blocks T028–T032)
- [ ] **CHK060** If a task is "Blocked on D-gate", an alternative fallback path or waiting task is defined (no tasks just stall)

---

## Parallelization & Effort Estimation

- [ ] **CHK061** Tasks marked [P] (parallelizable) do not depend on each other or on prior non-[P] tasks
- [ ] **CHK062** Only Phase 2B tasks T021–T026 (six tasks) are marked [P]; parallel execution respects prerequisites and avoids overlapping file edits
- [ ] **CHK063** At least one parallelizable task grouping is documented (e.g., "T019–T021 can run in parallel; T022–T024 can run in parallel")
- [ ] **CHK064** Effort estimates in plan.md § Timeline Estimate match task granularity (e.g., "6–8 hours per 30 guidelines" aligns with task count)
- [ ] **CHK065** If effort estimate assumes parallelization, [P] markers match that assumption

---

## Protected-File Approval Workflow

- [ ] **CHK066** S-document edits (T005–T018) reference approval-process.md contract for required workflow
- [ ] **CHK067** Each S-document task (T005–T018) includes scope statement (e.g., "Update G042 reference in AGENTS.md")
- [ ] **CHK068** Approval workflow is documented before task execution, not after (approval-process.md exists and is current)
- [ ] **CHK069** No S-document task assumes approval has been recorded; all state "Approval required before commit"
- [ ] **CHK070** Protected-file approval evidence is tied to a gate or PR review (not left undefined)

---

## Guideline Preservation & Reconciliation

- [ ] **CHK071** G-document edit tasks (T019–T027) explicitly mention: "Preserve all unique safeguards and historical provenance"
- [ ] **CHK072** Consolidation strategy is defined in plan.md; G→N mapping is documented before G-edits commence
- [ ] **CHK073** No task deletes a G-document without creating an explicit pointer task (P-entity creation task)
- [ ] **CHK074** Consolidation tasks include validation step (e.g., "Verify hash after edit", "Run link validation check")
- [ ] **CHK075** G-document edit tasks are scoped to "guidelines/ only" (no edits to other paths permitted)

---

## New Document (N-Document) Conditional Gates

- [ ] **CHK076** N-document creation tasks (T028–T032) are clearly marked as "Blocked on D4 approval"
- [ ] **CHK077** If D4 is not resolved, Phase 2C is explicitly stated as "Deferred to Phase 2.1" or similar
- [ ] **CHK078** Each N-document task includes dependency list (e.g., "Related to N001, N002"; references data-model.md N-entities)
- [ ] **CHK079** N-document creation does not assume old G-paths; pointers (P-tasks) create old paths when needed
- [ ] **CHK080** Maximum 5 N-document tasks are listed (placeholder for D4 approval subset); specification doesn't enumerate all 33

---

## Pointer & Redirect Operations

- [ ] **CHK081** Pointer creation tasks (T033–T034) reference pointer-redirect-contract.md for format and validation
- [ ] **CHK082** Each pointer task includes validation step (e.g., "Test link from old path → new path")
- [ ] **CHK083** Pointer tasks are marked as "Blocked on D5 approval" (preservation strategy decision)
- [ ] **CHK084** No task assumes a pointer will work without verifying new destination exists first
- [ ] **CHK085** Maximum pointer chain depth (1 hop) is mentioned in pointer task success criteria

---

## Link & Reference Validation

- [ ] **CHK086** Link validation tasks (T035–T037) include specific validation methods (e.g., "grep for markdown links", "Markdown lint check")
- [ ] **CHK087** Design verification tasks (T038–T040) reference contracts for design authority (guideline-interface.md)
- [ ] **CHK088** Validation tasks include "Defect vs. working reference" classification (per spec.md § Verification)
- [ ] **CHK089** At least one validation task checks for hardcoded absolute paths (pointer-redirect-contract.md requirement)
- [ ] **CHK090** Anchor validation is scoped (e.g., "Check H2 anchors in 3 consolidated documents", not all 116)

---

## Verification & Handoff Tasks

- [ ] **CHK091** Phase 3 tasks (T041–T043) generate a coverage manifest covering 116 G + 9 S + 33 N paths
- [ ] **CHK092** Verification report template is documented (plan.md § Verification checklist) before Phase 2 starts
- [ ] **CHK093** Phase 3 includes a PR description generation task (not assumed to be written ad-hoc)
- [ ] **CHK094** Final verification report includes "Verdict" section: Blocked / Partial / Verified / Complete
- [ ] **CHK095** Handoff report explicitly states whether Phase 2 is ready for merge or deferred

---

## Branch & Git Operations

- [ ] **CHK096** Tasks reference correct branch name: `docs/spec-003-guidelines-reconcile` (per plan.md § Branch)
- [ ] **CHK097** No task assumes branch validation has passed; T001 includes "npm run validate:branch-name" verification
- [ ] **CHK098** Commit message template is provided in approval-process.md or tasks.md for S-document changes
- [ ] **CHK099** Push instructions specify `-u origin <branch>` flag (upstream tracking)
- [ ] **CHK100** CI/CD validation (build, link checks) is explicitly listed as blocking before merge (not assumed)

---

## Risk Mitigation & Rollback

- [ ] **CHK101** Rollback plan is defined in plan.md § Rollback Plan with specific checkpoints
- [ ] **CHK102** Each Phase 2 checkpoint (after S-docs, after G-docs, etc.) includes a "Stop and report" decision point
- [ ] **CHK103** If a task fails, unblocking steps are documented (e.g., "Seek D-gate clarification", not "Skip task")
- [ ] **CHK104** No task assumes workarounds for scope creep (e.g., "If this doc is also a README, just skip the README" — forbidden)
- [ ] **CHK105** Contingency for missing owner decisions is explicit (e.g., "Phase 2C deferred if D4 unresolved by [date]")

---

## Quickstart & Pre-Implementation Setup

- [ ] **CHK106** Quickstart script (quickstart.md) is executable without manual edits (paths are checkout-relative, not hardcoded)
- [ ] **CHK107** Quickstart validates branch name before proceeding (calls `npm run validate:branch-name`)
- [ ] **CHK108** Quickstart includes baseline hash verification step (compares current state against b7c3c4413f5fc7ed2e73a50ca7462d45a8e2e1b9)
- [ ] **CHK109** Quickstart output includes a checklist of verification results (not just success/fail)
- [ ] **CHK110** Quickstart does NOT modify files; it only validates and reports state

---

## Implementation Readiness Summary

**Validation Results: Pending**
- [ ] Pending validation: Tasks are complete, traceable, and scoped
- [ ] Pending validation: Phases are ordered with explicit dependencies
- [ ] Pending validation: Gate dependencies are documented and blocking
- [ ] Pending validation: Parallelization is possible and marked
- [ ] Pending validation: Approval workflows are defined before execution
- [ ] Pending validation: Preservation rules are enforced per task
- [ ] Pending validation: Validation and verification are integrated
- [ ] Pending validation: Rollback and contingency are planned

**Blockers Identified:**
- [ ] Validation remains pending: all CHK items above are unchecked; Phase 2 readiness has not been established.
- [ ] Unresolved protected-path scope conflict: `.github/PROTECTED_FILES.txt` and the local approval checker include all of `.github/`, while the workflow contract lists narrower paths and omits `.github/specs/`. The feature approval contract also treats S002–S009 as protected, beyond the canonical list's explicit S-path coverage. Reconcile these scopes with the owner before claiming consistency or an exemption; retain existing approval requirements. See [research § 2](../research.md#2-protected-files-governance).
- [ ] Owner decisions D1–D6 and D8 remain pending and block Phase 2.

**Recommended Improvements:** (List items for future enhancement; do not block Phase 2)
- [ ] None recorded

---

**Checklist Status:**
- **Readiness:** 0 of 65 items verified — pending
- **Blocking Issues:** Unresolved — see blockers above; further assessment pending
- **Non-Blocking Recommendations:** ___ (logged for future reference)
- **Approved for Phase 2:** No — pending validation, scope reconciliation, and owner decisions

**Reviewer:** ________________________  **Date:** __________

---

*Checklist template: Implementation Readiness | Part of TOA-358 Requirements-Quality Validation*
