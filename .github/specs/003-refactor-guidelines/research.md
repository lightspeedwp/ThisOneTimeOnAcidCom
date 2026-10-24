# Research: Guidelines Refactor (TOA-358)

**Specification:** [Specification 003](./spec.md)  
**Status:** Complete — All NEEDS CLARIFICATION items resolved to EVIDENCE PENDING status  
**Date:** 2026-10-24

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

**Finding:** `.github/specs/003-refactor-guidelines/` is itself a protected artifact under Constitution § II.Protected Files.

**Evidence:**
- Constitution § II: "Protected Files: CHANGELOG.md, ATTRIBUTIONS.md, guidelines/, Supabase utils, .github/workflows/* are read-only system artifacts"
- AGENTS.md § 332–343: `.github/` hierarchy is protected; changes require `locked-files-guard` approval
- spec.md line 44 references broken path `../../PROTECTED_FILES.txt` (does not exist)

**Resolution:**
- Proposed change to spec.md line 44: Replace broken reference with "Protected-file edits under `.github/` require `locked-files-guard` approval (see AGENTS.md § 331–343 and CONTRIBUTING.md § 612–627)"
- **Rationale:** Canonical governance reference is in AGENTS.md/CONTRIBUTING.md, not a separate file

### 3. Source Inventory Verification

**Finding:** Guideline file count matches specification claim (116 files confirmed).

**Evidence:**
```bash
$ find guidelines -type f -name "*.md" | wc -l
116
```

**Status:** ✅ VERIFIED — No discrepancy between spec and actual repository

### 4. PR Template Routing Configuration

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
- **Verification Method:** Run `npm run validate:branch-name -- --branch aiops/refactor-guidelines` to confirm routing
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
- ✅ **Principle II (Governance):** Specification preserves `.github/` and `guidelines/` protected status; D0 retains approval requirement
- ✅ **Principle III (Bundler):** No bundler syntax changes proposed; guidelines document compatibility rules only
- ✅ **Principle IV (Content):** No mock data or editorial content changes; guidelines refactor only
- ✅ **Principle V (BEM CSS):** No CSS changes; guidelines documentation only
- ✅ **Principle VI (npm/Node):** No dependencies or runtime changes proposed
- ✅ **Principle VII (Testing):** Static verification approach; no runtime checks claimed

**Status:** ✅ COMPLIANT — No constitutional conflicts identified

---

## Phase 1: Evidence-Pending Decisions (Gates D1–D8)

These decisions require owner input and are documented here as dependencies for Phase 2 implementation.

### Gate D1: Book/Site Identity & Voices (PENDING OWNER DECISION)

**Requirement:** Canonical book brief identity, approved memoir/Journal/press voices, reader journey/CTA hierarchy, retained art/festival context

**Questions for owner:**
1. What is the canonical book brief (title, subtitle, intended audience)?
2. What are the approved voices for: memoir content, journal entries, press biography?
3. What reader journey and CTA hierarchy should guidelines enforce?
4. Which art/festival context should be retained in messaging?

**Impact:** Gates all new normative copy (N-documents) and identity claims in refactored guidelines

**Evidence collection method:** Owner decision session with recorded decisions

---

### Gate D2: Manuscript & Access Control (PENDING OWNER DECISION)

**Requirement:** Canonical manuscript/Journal sources; preview/full-draft visibility; indexing/cache boundaries

**Questions for owner:**
1. What is the canonical source for the manuscript (file location, version)?
2. What is the canonical source for journal entries?
3. What preview/full-draft visibility rules should apply (public, private, beta)?
4. What indexing boundaries apply (search engine inclusion, link indexing)?
5. What cache/download/share boundaries apply?

**Impact:** Gates publication/exposure contracts in updated guidelines

**Evidence collection method:** Owner decision session with recorded decisions

---

### Gate D3: Design Authority & Accessibility (PENDING OWNER DECISION)

**Requirement:** Brief/current-CSS/approved-design-contract authority, palette/font roles, accessibility target

**Questions for owner:**
1. Who is the design authority (Figma project, current designer, guidelines author)?
2. What is the approved design contract (current CSS/BEM blocks, spacing, typography)?
3. What are the palette roles (primary, secondary, accent, semantic)?
4. What are the font roles (display, body, code)?
5. What accessibility target applies (WCAG 2.2 AA or AAA)?

**Impact:** Gates design example verification and arithmetic corrections in guidelines

**Evidence collection method:** Owner decision session with recorded design authority reference

---

### Gate D4: Documentation Destinations & Pointer Strategy (PENDING OWNER DECISION)

**Requirement:** Exact canonical destinations for G001–G116; pointer-treatment approach; six-skill reference method; conditional N-document subset approval

**Questions for owner:**
1. For G001–G116: What are the canonical destinations (preserve current paths, consolidate into subdirectories, create new structure)?
2. Pointer strategy: Should old paths → pointer-only replacements, procedural extractions, or a mix?
3. How should six existing skills (branch-validation, changelog, labeling, test, validate, workflow-orchestration) be referenced in updated guidelines?
4. Of the 33 N-documents, which subset should be created? (Approval-dependent conditional creates)
5. Should new skills be proposed, or should all guidance fit within existing six skills?

**Impact:** Gates all G/N-document creates and the pointer mapping strategy for Phase 2 implementation

**Evidence collection method:** Owner decision session with exact G→destination mapping and N-subset approval list

---

### Gate D5: Historical Preservation (PENDING OWNER DECISION)

**Requirement:** Artefact-specific retention rules; historical preservation-copy locations; move/delete authorization for archived items

**Questions for owner:**
1. Should deprecated guidelines be archived, moved to a historical folder, or deleted?
2. Where should historical preservation-copies live (e.g., `guidelines/_archived/`, `docs/historical/`)?
3. What status notation approach applies (e.g., "Archived: see X", "Historical: updated here")?
4. Which artefacts (if any) require special retention rules (design caveats, pasted examples, original author notes)?

**Impact:** Gates preservation operations (moves, deletes, status notations) during Phase 2

**Evidence collection method:** Owner decision session with retention/archival strategy

---

### Gate D6: Backend Provider & Delivery (PENDING OWNER DECISION)

**Requirement:** Signup/contact/waitlist/backend provider confirmation; verification evidence; delivery method for secure unlock; live CMS/PWA/offline claims scope

**Questions for owner:**
1. What backend provider powers signup/contact/waitlist? (None, third-party SaaS, self-hosted, planned?)
2. What verification evidence exists (credentials redacted)?
3. How is secure unlock/content delivery implemented?
4. What claims about live CMS, PWA, offline functionality are authorised? (Scope for documentation)

**Impact:** Gates backend integration claims and feature availability documentation

**Evidence collection method:** Owner decision session with provider details and delivery model

---

### Gate D8: WordPress & Portfolio Role (PENDING OWNER DECISION)

**Requirement:** WordPress/portfolio retained-reference role; future-option vs deprecated decision; migration requirements; legacy requirements

**Questions for owner:**
1. Is WordPress/portfolio content retained (current), deprecated (future removal), or optional (future evaluation)?
2. Are there migration requirements documented?
3. Are there legacy requirements to preserve (backward compatibility, old URLs, archived content)?
4. Should guidelines reference WordPress patterns or omit them?

**Impact:** Gates WordPress-related guidance, migration documentation, and legacy considerations

**Evidence collection method:** Owner decision session with migration/legacy status

---

## Summary of Research Findings

| Item | Status | Evidence | Blocker |
| --- | --- | --- | --- |
| Constitutional alignment | ✅ VERIFIED | Constitution § I–VII all compatible | NO |
| Protected-files governance | ✅ VERIFIED | AGENTS.md § 331–343; Constitution § II | NO |
| Guideline file count | ✅ VERIFIED | 116 files confirmed | NO |
| PR template routing | 🟡 IDENTIFIED | Router lacks `aiops` entry | NO (documentation issue) |
| Baseline commit reconciliation | 🟡 PENDING | Checklist needs grounding | NO (verification issue) |
| Gates D1–D6, D8 | 🔴 PENDING OWNER | 7 decisions awaiting input | YES (Phase 2 blocker) |

---

## Next Steps

1. **Owner Decision Session:** Resolve D1–D6 and D8 using the questions above; record decisions
2. **Baseline Reconciliation:** Verify current-develop against baseline commit `b7c3c4413f5fc7ed2e73a50ca7462d45a8e2e1b9`
3. **PR Template Routing:** Apply proposed fix to `scripts/pr-template-router.js` (optional for plan phase, required before implementation PR)
4. **Phase 1 Design:** Proceed to data-model.md, contracts/, and quickstart.md once gates are resolved

---

*Research complete 2026-10-24 | Next phase: Design artifacts (data-model.md, contracts/, quickstart.md)*
