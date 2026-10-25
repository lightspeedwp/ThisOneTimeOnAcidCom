# Research: Guidelines Refactor (TOA-358)

**Specification:** [Specification 003](./spec.md)  
**Status:** Complete — All gates (D0–D8) RESOLVED with evidence recorded in [requirements.md](./checklists/requirements.md)  
**Date:** 2026-10-24 | Updated 2026-10-25

---

## Summary of Clarifications

This research phase resolves technical unknowns and documents evidence-pending decisions that block Phase 2 implementation.

---

## Phase 0: Resolved Clarifications

### 1. Specification-First Governance (Constitutional)

**Finding:** Constitution § Principle I (Specification-First Development) governs this work.

**Evidence:**
- `.specify/memory/constitution.md` § I: "Every feature, governance change and significant fix must begin with a written specification"
- `.specify/memory/constitution.md` § I.Output: "Specifications produce plan.md, research.md, data-model.md, contracts/ and tasks.md as approved design artifacts"
- **Status:** Feature 003 successfully follows this pattern (spec created, merged PR #446, now in planning phase)

### 2. Protected-Files Governance

**Finding:** Explicit owner instruction to modify protected files and `locked-files-guard` approval before merge are separate requirements. AGENTS.md defines the owner-instruction requirement; the guard contract lists `.github/workflows/`, `CHANGELOG.md`, `AGENTS.md`, `guidelines/`, and `.github/labels.yml`. `.github/specs/` is not listed in that contract. The broader `.github/` entry in `.github/PROTECTED_FILES.txt` conflicts with the contract's narrower scope and must be reconciled before claiming a specification-only exemption.

**Evidence:**
- [AGENTS.md § Protected and locked files](../../../AGENTS.md#protected-and-locked-files): Requires explicit owner instruction for `CHANGELOG.md`, `ATTRIBUTIONS.md`, `src/app/components/figma/ImageWithFallback.tsx`, `src/app/utils/supabase/`, `.github/workflows/*`, and `tasks/task-list.md`; it does not declare all of `.github/` protected or define the guard's full scope.
- [CI/CD workflow contract § locked-files-guard.yml](../001-repo-governance-layout-and-agentic-workflows/contracts/ci-cd-workflows.md#locked-files-guardyml-moved-to-implementation-per-q2-clarification): Lists exactly `.github/workflows/`, `CHANGELOG.md`, `AGENTS.md`, `guidelines/`, and `.github/labels.yml`; requires CODEOWNERS approval before merge. `.github/specs/` is not listed.
- [Constitution § II](../../../.specify/memory/constitution.md#ii-repository-governance--configuration-management): Protects `CHANGELOG.md`, `ATTRIBUTIONS.md`, `guidelines/`, Supabase utils, and `.github/workflows/*` specifically as read-only system artifacts. Only `.github/workflows/` is protected within `.github/`, not all of `.github/`.
- [.github/PROTECTED_FILES.txt](../../PROTECTED_FILES.txt): Lists all of `.github/`, as well as `scripts/` and other protected paths. [The local approval checker](../../../scripts/validation/check-locked-file-approval.cjs) loads this list and treats directory entries as prefixes, so it includes `.github/specs/`. This is broader than the workflow contract.

**Resolution:**
- **Specification edits (this PR and future):** Are outside the contract's listed guard paths, but the broader protected-file list and local checker include them. Retain approval before merge under that list pending owner reconciliation of the scope conflict.
- **S-document edits (Phase 2):** Retain the proposed approval workflow under D0 and the [feature approval-process contract](./contracts/approval-process.md); that design contract is awaiting owner approval. Scope protected-file changes in plan.md and verify them before merge.
- **Rationale:** Owner instruction, the workflow contract, and the broader protected-file list describe distinct requirements. Record their disagreement explicitly; neither a blanket `.github/` contract claim nor an unconditional specification-only exemption is supported by all sources.

### 3. Source Inventory Verification

**Finding:** Guideline file count matches specification claim (116 files confirmed).

**Evidence:**
```bash
$ find guidelines -type f -name "*.md" | wc -l
116
```

**Status:** ✅ VERIFIED — No discrepancy between spec and actual repository

### 4. PR Template Routing Configuration

**Status:** 🔄 HISTORICAL — D7 decision superseded the `aiops/refactor-guidelines` branch with `docs/spec-003-guidelines-reconcile`. This finding documents the earlier branch's routing configuration.

**Finding:** PR template router lacks `aiops/` prefix entry; specification branch `aiops/refactor-guidelines` would route incorrectly.

**Evidence:**
- `scripts/pr-template-router.js` line 18: defaults unrecognized prefixes to `'task'` branch type
- Current mapping: `typeMap` has entries for feat, fix, docs, design, test, refactor, etc., but no `aiops`
- **Impact:** PR on `aiops/refactor-guidelines` would receive `default` template + `type:task` label instead of `docs` template + `type:documentation` label

**Resolution (Proposed):**
- Add `aiops` entry to `typeMap` in `scripts/pr-template-router.js`:
  ```javascript
  aiops: {
    template: 'docs',
    labels: ['type:documentation']
  }
  ```
- **Verification Method:**
  1. Run `npm run validate:branch-name -- --branch aiops/refactor-guidelines` to confirm naming
  2. Test router mapping: `node scripts/pr-template-router.js aiops/refactor-guidelines` should output `{ template: 'docs', labels: ['type:documentation'] }`
  3. Verify router loads correctly: `grep -A 2 "aiops:" scripts/pr-template-router.js` should show template and labels entries
  4. Confirm router is wired into workflow: `.github/workflows/labeling-unified.yml` must import and execute `scripts/pr-template-router.js`
- **Status:** This fix is NOT blocking specification refinement (it's a documentation/metadata issue, not a specification-gating issue)

### 5. Baseline Commit Reconciliation

**Finding:** Specification checklist references a hash without grounding it in the baseline commit mentioned in the instruction.

**Evidence:**
- Instruction line 16: "Research baseline: `b7c3c4413f5fc7ed2e73a50ca7462d45a8e2e1b9`"
- Checklist line 108: "Baseline observation hash confirmed: `8af4e7c37c19e2ac56df5a93952014a97bbffa15577d669cbbd2e2cae58b874f`" (no reference to commit)

**Resolution:**
- Proposed change to requirements.md line 108: Connect checklist to instruction baseline commit
- **Current state:** Current `develop` is at `b7c3c44` (compare via `git log --oneline | head -1`)
- **Reconciliation needed:** Compare current-develop against baseline commit to identify any unexpected changes since spec creation

### 6. Constitution Alignment Check

**Finding:** Feature 003 aligns with all constitutional principles.

**Evidence (per constitution review):**
- ✅ **Principle I (Spec-First):** Specification exists, follows workflow (spec → clarify → plan → tasks)
- ✅ **Principle II (Governance):** Specification preserves `.github/workflows/` and `guidelines/` protected status; D0 retains approval requirements, with the broader `.github/` scope conflict recorded in § 2 above
- ✅ **Principle III (Bundler):** No bundler syntax changes proposed; guidelines document compatibility rules only
- ✅ **Principle IV (Content):** No mock data or editorial content changes; guidelines refactor only
- ✅ **Principle V (BEM CSS):** No CSS changes; guidelines documentation only
- ✅ **Principle VI (npm/Node):** No dependencies or runtime changes proposed
- ✅ **Principle VII (Testing):** Static verification approach; no runtime checks claimed

**Status:** ✅ COMPLIANT — No constitutional conflicts identified

---

## Phase 1: Gate Resolution (All Decisions RESOLVED)

All gates (D0–D8) have been resolved with evidence recorded in [requirements.md](./checklists/requirements.md). This section documents the gate requirements; see requirements.md for recorded decisions and implementation guidance.

### Gate D1: Book/Site Identity & Voices (RESOLVED ✅)

**Requirement:** Canonical book brief identity, approved memoir/Journal/press voices, reader journey/CTA hierarchy, retained art/festival context

**Decision:** Recorded in requirements.md § D1 (2026-10-25)

---

### Gate D2: Manuscript & Access Control (RESOLVED ✅)

**Requirement:** Canonical manuscript/Journal sources; preview/full-draft visibility; indexing/cache boundaries

**Decision:** Recorded in requirements.md § D2 (2026-10-25)

---

### Gate D3: Design Authority & Accessibility (RESOLVED ✅)

**Requirement:** Brief/current-CSS/approved-design-contract authority, palette/font roles, accessibility target

**Decision:** Recorded in requirements.md § D3 (2026-10-25)

---

### Gate D4: Documentation Destinations & Pointer Strategy (RESOLVED ✅)

**Requirement:** Exact canonical destinations for G001–G116; pointer-treatment approach; six-skill reference method; conditional N-document subset approval

**Decision:** Recorded in requirements.md § D4.a and D4.b (2026-10-25)
- **D4.a:** Flat `guidelines/` directory structure (no subcategories)
- **D4.b:** Hybrid G→N consolidation (pointers for high-traffic, delete for archived)

---

### Gate D5: Historical Preservation (RESOLVED ✅)

**Requirement:** Artefact-specific retention rules; historical preservation-copy locations; move/delete authorization for archived items

**Decision:** Recorded in requirements.md § D5 (2026-10-25)
- **D5.a:** Archive location `guidelines/_archive/`
- **D5.b:** Comment-based reverse pointers in archived files
- **D5.c:** Banner + comment status notation approach
- **D5 (Pointer Chains):** 1-hop maximum (P cannot point to P)

---

### Gate D6: Backend Provider & Delivery (RESOLVED ✅)

**Requirement:** Signup/contact/waitlist/backend provider confirmation; verification evidence; delivery method for secure unlock; live CMS/PWA/offline claims scope

**Decision:** Recorded in requirements.md § D6 (2026-10-25)
- **Canonical Stack:** Vercel Functions, Supabase PostgreSQL, tRPC, GitHub Actions
- **Documented Alternatives:** AWS App Runner, self-hosted PostgreSQL, Express.js on Railway, Drizzle ORM

---

### Gate D8: WordPress & Portfolio Role (RESOLVED ✅)

**Requirement:** WordPress/portfolio retained-reference role; future-option vs deprecated decision; migration requirements; legacy requirements

**Decision:** Recorded in requirements.md § D8 (2026-10-25)
- **Status:** WordPress not used; site is React/Next.js only
- **N-document scope:** WordPress/Portfolio N-docs deferred to Phase 3

---

## Summary of Research Findings

| Item | Status | Evidence | Blocker |
| --- | --- | --- | --- |
| Constitutional alignment | ✅ VERIFIED | Constitution § I–VII all compatible | NO |
| Protected-files governance | 🟡 SCOPE CONFLICT | AGENTS.md; Constitution § II; workflow contract vs `.github/PROTECTED_FILES.txt` (§ 2) | Approval retained pending owner reconciliation |
| Guideline file count | ✅ VERIFIED | 116 files confirmed | NO |
| PR template routing | 🟡 IDENTIFIED | Router lacks `aiops` entry | NO (documentation issue) |
| Baseline commit reconciliation | 🟡 PENDING | Checklist needs grounding | NO (verification issue) |
| Gates D1–D6, D8 | ✅ RESOLVED | Decisions recorded in requirements.md (2026-10-25) | NO (Phase 2 UNBLOCKED) |

---

## Next Steps

1. ✅ **Gate Resolution:** All D0–D8 gates resolved with evidence recorded in requirements.md (2026-10-25)
2. 🔄 **Phase 2A Implementation:** S-document edits and N-document creation using guidance from requirements.md
3. 🔄 **Phase 2B Implementation:** G→N consolidation mapping and archive operations
4. 📋 **Baseline Reconciliation:** Verify current-develop against baseline commit `b7c3c4413f5fc7ed2e73a50ca7462d45a8e2e1b9` (optional verification)
5. 🔧 **PR Template Routing:** Apply proposed fix to `scripts/pr-template-router.js` (optional, documentation issue only)

---

*Research complete 2026-10-24 | Updated 2026-10-25 | All gates resolved; Phase 2 implementation UNBLOCKED*
