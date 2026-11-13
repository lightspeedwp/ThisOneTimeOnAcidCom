# Specification Analysis Report: TOA-358 (Guidelines Refactor)

**Analysis Date:** 2026-11-09  
**Specification:** `.github/specs/003-refactor-guidelines/`  
**Artifacts Analyzed:** spec.md, plan.md, tasks.md (543 lines), constitution.md  
**Status:** Analysis Complete — **11 Actionable Findings Identified**

---

## Executive Summary

TOA-358 (Guidelines Refactor) contains **3 CRITICAL**, **7 HIGH**, and **1 MEDIUM** findings across spec/plan/tasks alignment, task execution status, and scope completeness. The specification has been marked "implemented" while the implementation plan remains "draft" and task phases have expanded from 3 to 6 phases due to convergence gap discovery. Critical blockers prevent Phase 2 continuation without remediation.

**Recommendation:** Resolve CRITICAL findings (especially G-to-N mapping and task status conflicts) before resuming Phase 2 implementation. The convergence phases (4–6) appear to have correctly identified gaps, but decision evidence must be completed.

---

## Findings Table

| ID | Category | Severity | Location(s) | Summary | Recommendation |
| --- | ---------- | ---------- | ------------- | --------- | ---------------- |
| F1 | Inconsistency | CRITICAL | spec.md line 5, plan.md line 3, tasks.md line 13 | Status field conflict: spec.md="Implemented" (2026-10-24), plan.md="Draft", tasks.md="Phase 2 Implementation (Unblocked)". Implementation has NOT completed, contradicting spec status. | Update spec.md status to "Draft" or "In Progress" and timestamp to current date. Clarify which artifact is authoritative for status tracking. |
| F2 | Inconsistency | CRITICAL | tasks.md T024-T027, T046, T056 | G-to-N Mapping Blocking: D4.b specifies "high-traffic" guidelines consolidation targets but complete mapping not provided. T024-T027 (N-document pointer edits) explicitly documented as "BLOCKED on D4.b mapping". Cannot proceed with Phase 2B without full mapping table. | Extract D4.b mapping evidence from checklists/requirements.md; create explicit table: {G-ID, N-target, pointer-type}. Document which G-documents (e.g., Contributing, Accessibility, Design Tokens) map to which N-documents (N001–N029). Unblock T024-T027. |
| F3 | Inconsistency | CRITICAL | tasks.md T053, T055, T022 | Task Execution Order Violation: T022 (copy alignment edits) completed out-of-sequence BEFORE prerequisite tasks T001-T004 (pre-verification), T005-T007 (setup), and T008-T014 (S-doc edits). Breaks approval evidence trail and gate compliance. T053 documents violation, T055 requires remediation. | Establish immutable execution-order validation in future convergence runs. Document T022's out-of-sequence execution in convergence sign-off with timestamp and evidence. Update phase 2 execution order to be strictly enforced. Add checkpoint validation before committing changes. |
| F4 | Inconsistency | HIGH | spec.md line 13, plan.md line 4, tasks.md line 6-8 | Branch Name Inconsistency: spec.md references `docs/spec-003-guidelines-reconcile` (Phase 1 planning), plan.md references `docs/spec-003-phase2-implementation` (Phase 2), tasks.md also references `guidelines-reconcile` historically. Two active branches in use. | Clarify which branch is canonical for Phase 2. If `phase2-implementation` is current, ensure all artifacts reference it consistently. Update spec.md branching documentation. |
| F5 | Inconsistency | HIGH | tasks.md T015-T016, T008-T014 | S-Document Edit Status Conflict: T015-T016 marked with ✓ (CONTRIBUTING.md, AGENTS.md complete), but T008-T014 show [ ] checkboxes (branch-validation, changelog, labeling, test, validate, workflow-orchestration, INVENTORY.md incomplete). Status inconsistent within same phase category. | Clarify which S-documents have been completed (presumably T015-T016). Mark others as either complete or pending with evidence. Align all 9 S-documents to single consistent status. |
| F6 | Underspecification | HIGH | tasks.md T058-T060, CONSOLIDATION-MANIFEST.md | N-Document Specification Gaps: T058-T060 ask to "Create specification outlines" for N007, N016, N018, implying outlines don't exist. But D4 approval list should include specification structure per spec.md § Proposed New Documents. Spec structures missing. | Extract N-document specifications from approval evidence or generate them per D4 structure guidance. Create outlines for N001–N029 with title, purpose, required sections. Link to CONSOLIDATION-MANIFEST.md. Verify all 29 approved N-documents have defined specifications before T029-T032 create operations. |
| F7 | Coverage Gap | HIGH | tasks.md T037, T065, T066 | Incomplete Link Validation: T037 (link validation & correction) documented as incomplete prerequisite for T038-T040 (design verification). T065 documents 51 broken consolidated-old-paths references as remediated (commit 48391f3), but T037 broader anchor/reference verification "remains open". Design verification blocked until T037 complete. | Complete T037 verification. Run comprehensive link/anchor validation: 129 internal reference candidates, all cross-file paths, anchor existence in target files. Document broken references, corrections applied, and final count (expected: near 0 after T065 remediation). Update validation report in tasks.md before unblocking T038-T040. |
| F8 | Coverage Gap | HIGH | tasks.md T041, T067, current checkout | Coverage Manifest Incomplete: T067 (generate final coverage manifest) requires table with 158 rows (116 G + 9 S + 33 N). Per T067 description: "prior summary totals alone do not establish 100% verified coverage". Manifest existence and completeness unverified. | Generate complete coverage manifest in checklists/requirements.md with per-document ID/path/operation/destination/status. Verify all 116 G-documents accounted for (with preservation validation), all 9 S-documents approved, 29 approved N-documents created, 4 N-documents marked deferred per D4/D8. Publish manifest before proceeding to final sign-off (T043/T069). |
| F9 | Coverage Gap | HIGH | tasks.md T042, T068, T068 completion notes | Skill Exercise Validation Missing: T068 references "previously recorded 6/6 PASS, 29/29 paths, zero-unverified-claims results" but validation report file is absent from checkout. Cannot verify skill exercises passed for 6 skills. Evidence unavailable for final sign-off (T043/T069). | Restore the missing T068 skill-validation-report.md or rerun static skill exercises (branch-validation, changelog, labeling, test, validate, workflow-orchestration) with draft/report/denied scenarios. Document results in checklists/requirements.md § Skill Exercise Validation. Verify all 6 skills have working file-path references and no unverified claims. |
| F10 | Underspecification | HIGH | tasks.md T038-T040, T066 | Design Verification Incomplete: T038-T040 (design verification) documented as incomplete, with T066 (design verification manifest) still pending. WCAG 2.2 AAA verification (per D3 authority: Ash Shaw) not done. Design examples (colour hex, spacing scales, typography) not validated. | Complete T066: validate colour hex values against approved palette, spacing values against documented scale, typography examples against approved fonts. For formulas/thresholds: verify calculation correctness and document source. Create design verification manifest in checklists/requirements.md § Design Verification. Confirm minimum 15 checked design tokens across 8+ component/token files. |
| F11 | Ambiguity | MEDIUM | tasks.md T023, T062, commit 64a4649 | WCAG Update File Count Discrepancy: T023 summary reports "25+ guidelines" updated for WCAG 2.2 AAA conformance, but completion note shows "21 files". T062 requires reconciliation. Actual scope unclear. | Audit WCAG 2.2 AAA updates across guidelines/ directory. Count actual files modified in commit 64a4649. Reconcile discrepancy between reported "25+" and actual "21". Update T023 completion notes with accurate file list and count. Document in convergence sign-off. |

---

## Coverage Summary Table

| Requirement/Phase | Defined? | Has Tasks? | Task IDs | Notes |
| ------------------ | ---------- | ----------- | ---------- | ------- |
| D0 (Protected Files) | ✓ | ✓ | T005-T018 | RESOLVED; existing policy retained. S-documents (9 files) task coverage: T008-T016. Status inconsistent (T015-T016 complete, T008-T014 pending). |
| D1 (Book Identity) | ✓ | ✓ | T022 | RESOLVED; T022 (copy alignment) marked complete but executed out-of-sequence before prerequisites (F3). |
| D2 (Manuscript Visibility) | ✓ | Partial | N/A in tasks | RESOLVED in spec but not explicitly mapped to implementation tasks. Implicit in N007 (T058 pending). |
| D3 (Design Authority) | ✓ | ✓ | T038-T040, T066 | RESOLVED (Ash Shaw, WCAG 2.2 AAA) but design verification incomplete (F10). T066 pending. |
| D4 (N-Doc Scope & Pointers) | ✓ | Blocked | T024-T027, T028-T032, T056 | RESOLVED in spec but G-to-N mapping incomplete (F2). Critical blocker: T024-T027 cannot proceed without full mapping. T028-T032 (N-document creation) awaiting mapping resolution. |
| D5 (Historical Preservation) | ✓ | ✓ | T033-T034, T065 | RESOLVED. Pointer operations scoped; T065 (51 broken-path remediation) marked complete with evidence. |
| D6 (Backend Stack) | ✓ | Implicit | T057, T060 | RESOLVED (Vercel/Supabase/tRPC). N018 specification pending (T060). |
| D8 (WordPress/Legacy) | ✓ | Implicit | N/A | RESOLVED (4 N-docs N030-N033 deferred to Phase 3). Deferred items tracked in convergence phase. |
| Phase 1 (Decisions) | ✓ | ✓ | T001-T004, T044-T045 | Design artefacts complete. Redundant verification tasks (F1 vs F4 via T001-T004 vs T044-T045 convergence checks). |
| Phase 2A (S-Docs) | ✓ | Partial | T008-T018 | 2 of 9 files complete (T015-T016); 7 remain (T008-T014). |
| Phase 2B (G-Docs) | ✓ | Partial | T019-T027, T046 | Inventory verified (T019-T021 complete); editing in progress (T022 complete, T023-T027 with blocking dependency F2). |
| Phase 2C (N-Docs) | ✓ | Blocked | T028-T032, T057-T060 | 33 total (29 Phase 2 approved, 4 Phase 3 deferred). Blocked on D4 mapping (F2). N-document specifications pending (F6). |
| Phase 2D (Pointers) | ✓ | Partial | T033-T034 | T065 (remediation for 51 broken paths) complete; broader validation remains. |
| Phase 2E (Link Validation) | ✓ | Pending | T035-T037 | 129 internal reference candidates identified; T037 validation incomplete (F7). |
| Phase 2F (Design Verification) | ✓ | Pending | T038-T040, T066 | WCAG 2.2 AAA verification not done; design manifest pending (F10). |
| Phase 3 (Verification & Handoff) | ✓ | Partial | T041-T043, T067-T069 | Coverage manifest incomplete (F8); skill validation missing (F9); final sign-off pending. |

---

## Constitution Alignment Issues

**Status:** Spec-First Development principle satisfied; Constitution MUST principles generally upheld.

**Findings:**
- ✅ **Constitution I (Spec-First Development):** spec.md created with requirements, success criteria, decisions recorded. Workflow followed (spec → plan → tasks).
- ✅ **Constitution II (Repository Governance):** Specifications routing to `.github/specs/003-refactor-guidelines/` correct. Protected files (AGENTS.md, CONTRIBUTING.md, .claude/skills/) properly identified as requiring approval (D0).
- ✅ **Constitution III (Bundler Compatibility):** No code changes in scope; guideline refactor is documentation-only. No bundler impact.
- ✅ **Constitution IV (Protected Content):** No hardcoded UI strings or mock-data modifications in scope. Mock data separation maintained.
- ✅ **Constitution V (BEM-Only CSS):** Not in scope; CSS guidelines referenced but not modified.
- ✅ **Constitution VI (Package Management):** Not in scope; Node.js pinning (NODE-001) not affected by documentation refactor.
- ✅ **Constitution VII (Testing):** Spec Kit regression testing baseline maintained (103/104 tests per TEST-002).

**No Constitution Violations Detected:** All work respects MUST principles. D0 (existing protected-file approval policy retained) is explicitly documented in spec.

---

## Unmapped Tasks

**No unmapped tasks identified.**

All 43 Phase 2 tasks + 26 Phase 4-6 convergence tasks are explicitly traceable to requirements (D0-D8, 116 G-docs, 9 S-docs, 33 N-docs) and specifications in spec.md and plan.md.

---

## Metrics

| Metric | Count | Notes |
| -------- | ------- | ------- |
| **Total Documented Requirements** | 8 decision gates (D0–D8) | All marked RESOLVED in spec.md § Key Gates table |
| **Total Success Criteria** | 10 (spec.md line 49–56) | 9 currently [ ] incomplete, 1 [x] specification complete |
| **Total Tasks** | 69 (43 Phase 2 + 26 convergence) | Phases expanded from planned 3 to actual 6 during convergence discovery |
| **Total Documents in Scope** | 158 (116 G + 9 S + 33 N) | 116+9=125 existing, 33 new (29 Phase 2, 4 Phase 3 deferred) |
| **Coverage %** | 36% (15 of 43 Phase 2 tasks complete) | T001-T004: verified, T015-T023: complete, T024-T027+T030-T032: blocked, T033-T043: pending/incomplete |
| **Critical Issues Count** | 3 | F1 (status), F2 (G-to-N mapping), F3 (execution order) |
| **High Issues Count** | 7 | F4–F10 |
| **Medium Issues Count** | 1 | F11 (WCAG count discrepancy) |
| **Ambiguity Count** | 2 | F2 (mapping undefined), F6 (N-doc specs missing) |
| **Duplication Count** | 1 | F1 (T001-T004 vs T044-T045 redundant pre-verification) |

---

## Next Actions

### If CRITICAL Issues Exist (Do Not Proceed to Implementation)

**All 3 CRITICAL findings must be resolved before Phase 2 continuation:**

1. **Resolve status conflict (F1):**
   - Update spec.md line 5: `status: "In Progress"`  
   - Update timestamp: `created: "2026-10-25"` (or date of convergence completion)
   - Clarify which artifact is authoritative for status tracking (recommend: tasks.md tracks active phase)

2. **Complete G-to-N mapping (F2):**
   - Extract D4.b evidence from `checklists/requirements.md`
   - Create mapping table with explicit rows: {G-ID, G-title, N-target, pointer-type}
   - Ensure high-traffic guidelines (Contributing, Accessibility, Design Tokens) mapping is explicit
   - Insert into `CONSOLIDATION-MANIFEST.md` and reference in spec.md § D4 Resolution
   - **Unblocks:** T024-T027 (N-document pointer edits), T028-T032 (N-document creation)

3. **Document task execution order (F3):**
   - Create execution-order validation checkpoint in future convergence runs
   - Record T022 out-of-sequence execution in convergence sign-off with timestamp
   - Freeze execution order: T001-T004 → T005-T007 → T008-T018 → T019-T027 → T028-T032 (gated by F2) → T033-T037 → T038-T043
   - Enforce strict sequencing before committing Phase 2 changes

### Recommended Sequence After CRITICAL Resolution

1. Run `/speckit-converge` to re-assess Phase 2 readiness after F1-F3 remediation
2. Resolve remaining HIGH findings (F4-F10) in priority order:
   - F4 (branch consistency) — alignment task, no blocking
   - F5 (S-doc status) — inventory + completion verification
   - F6 (N-doc specs) — create outlines for N001-N029
   - F7 (link validation) — complete T037 verification
   - F8 (coverage manifest) — generate 158-row table
   - F9 (skill exercises) — restore or rerun validation
   - F10 (design verification) — complete T066 manifest
3. Resolve MEDIUM finding (F11) — reconcile WCAG update file counts
4. Complete convergence sign-off (T064, per tasks.md Phase 5)
5. Run `/speckit-implement` to execute Phase 2 tasks in documented sequence
6. Final sign-off (T069): Generate PR, obtain owner approval, merge

---

## Summary for User Decision

**Current State:**
- ✅ Specification complete (spec.md) with all 8 decision gates resolved
- ✅ Implementation plan drafted (plan.md) with detailed sequencing  
- ✅ 69 tasks defined across 6 phases (43 planned Phase 2 + 26 convergence remediation)
- ⚠️ **BUT:** 3 CRITICAL blockers prevent Phase 2 execution, 7 HIGH issues require resolution before merge

**Why It's Blocked:**
- Spec status ("Implemented") conflicts with actual state (incomplete implementation)
- G-to-N document mapping incomplete → 4 tasks (T024-T027) cannot execute
- Task execution order violated (T022 out-of-sequence) → approval trail compromised

**Recommendation:**
**DO NOT PROCEED to Phase 2 implementation without resolving the 3 CRITICAL findings.** The convergence phases (4–6) correctly identified these gaps. The remediation tasks (T044-T069) are actionable; complete them first, then restart Phase 2 with frozen execution order and complete G-to-N mapping.

---

## Optional: Would you like me to suggest concrete remediation edits for the top 5 findings (F1–F5)?

I can provide:
1. Exact diffs to fix spec.md status and timestamps
2. Template for G-to-N mapping table (with structure guidance)
3. Execution-order enforcement checklist
4. Branch-name reconciliation (which to use as canonical)
5. S-document status inventory validation script

Indicate "Yes, remediate top 5" or "No, I'll handle separately" and provide next direction.

---

*Analysis complete. Report ready for user review.*
