# Checklist: Contract Validation (TOA-358)

**Purpose:** Validate that the three approval/interface/pointer contracts are complete, consistent, and aligned with specification.

**Validation Method:** Unit tests for contract consistency and completeness

**Created:** 2026-10-25 | **Reviewer:** [Owner/Team]

---

## Contract Completeness

### Approval Process Contract

- [ ] **CHK111** approval-process.md defines all protected paths requiring approval (S002–S009, G-entities)
- [ ] **CHK112** Approval workflow phases are defined: Pre-Approval, Approval Request, Approval, Post-Approval
- [ ] **CHK113** Approval evidence requirements are explicit (GitHub PR approval, recorded decision, or checklist entry)
- [ ] **CHK114** S001 (INVENTORY.md) status is clarified: reference document, approval required for edits? (Confirm: "may not require formal approval if scope-bounded to inventory only")
- [ ] **CHK115** Commit message template includes approval reference; not left as placeholder

### Guideline Interface Contract

- [ ] **CHK116** guideline-interface.md defines required sections per G-document (Purpose & Scope, Core Rules, etc.)
- [ ] **CHK117** Exemptions are documented (e.g., pointer documents exempt from full structure)
- [ ] **CHK118** Design example verification rules reference D3 (design authority) gate requirement
- [ ] **CHK119** Safeguard preservation rules are concrete with examples (not just "preserve everything")
- [ ] **CHK120** Contract specifies what "unique safeguard" means with at least 3 examples

### Pointer & Redirect Contract

- [ ] **CHK121** Three pointer types are fully defined: Relocation, Consolidation, Archival/Deprecation
- [ ] **CHK122** Each pointer type includes format template and validation checklist
- [ ] **CHK123** Pointer governance section specifies creation authority (D5 resolution required)
- [ ] **CHK124** Maximum pointer chain depth (1 hop) is stated with rationale and [WRONG] vs. [RIGHT] example
- [ ] **CHK125** Link integrity validation process is documented (both before and after merge)

---

## Cross-Contract Consistency

- [ ] **CHK126** Approval process contract (S-edits) does not conflict with guideline interface contract (G-content rules)
- [ ] **CHK127** Pointer contract references approval process for locked-files-guard requirement (not duplicated, consistently referenced)
- [ ] **CHK128** All three contracts reference same protected-file list (S002–S009 in approval-process.md matches data-model.md entity mapping)
- [ ] **CHK129** Safeguard preservation language is consistent across contracts (same definition or explicit cross-reference)
- [ ] **CHK130** Gate dependencies are consistent (e.g., D5 blocks pointer operations in all three contracts)

---

## Alignment with Specification

- [ ] **CHK131** Approval process contract references D0 (protected-file policy) with evidence link
- [ ] **CHK132** Guideline interface contract references D3 (design authority) gate as blocking for design example verification
- [ ] **CHK133** Pointer contract references D5 (preservation strategy) as blocking for creation authority
- [ ] **CHK134** All three contracts are referenced from spec.md § Open Questions or acceptance criteria
- [ ] **CHK135** Contracts use same terminology as spec.md for entity types (G-entity, S-entity, N-entity, P-entity)

---

## Approval Authority & Decision Authority

- [ ] **CHK136** Approval process contract explicitly names approval authority (owner, code owner, GitHub team)
- [ ] **CHK137** Approval without D-gate resolution is permitted only for reference-only edits (e.g., S updates that don't make identity claims)
- [ ] **CHK138** Exceptions to approval requirement are listed (e.g., INVENTORY.md reference-only edits may not require locked-files-guard)
- [ ] **CHK139** No contract assumes approval rights that override existing AGENTS.md or Constitution
- [ ] **CHK140** Approval checklist in approval-process.md § Approval Phase includes "Depends-on D-gates are resolved or noted"

---

## Safeguard & Preservation Rules

- [ ] **CHK141** Guideline interface contract lists all unique safeguards (e.g., bundler guards, access restrictions, format requirements)
- [ ] **CHK142** Preservation rules include: content preservation, historical provenance, author context, related issues/PRs
- [ ] **CHK143** Pointer contract preserves historical content in full (Type 3 archival format includes original content)
- [ ] **CHK144** No contract permits deletion of content without explicit approval evidence
- [ ] **CHK145** Consolidation strategy (G→N or G→G mapping) is defined in pointer contract with validation checklist

---

## Design Example Verification

- [ ] **CHK146** Guideline interface contract specifies what "literal colour/spacing/typography" verification means
- [ ] **CHK147** Design authority is tied to D3 gate decision (specified in contract acceptance criteria)
- [ ] **CHK148** Contract includes examples of verifiable design claims (e.g., "primary color is #ABC123" vs. vague "brand color")
- [ ] **CHK149** Contract distinguishes Markdown-only claims (verifiable) from runtime claims (require code inspection or test)
- [ ] **CHK150** Formula/input/threshold verification is defined per contract (e.g., "spacing value = base * 8px")

---

## Pointer Format & Validation

- [ ] **CHK151** Each of three pointer types (Relocation, Consolidation, Archival) has a complete markdown template
- [ ] **CHK152** Pointer templates include required fields: title, redirect explanation, new location link, historical note
- [ ] **CHK153** Validation checklist for each pointer type covers: old path exists, new path exists, link works, format correct
- [ ] **CHK154** Pointer validation requires testing both directions (old → new and reverse link in new document)
- [ ] **CHK155** Hardcoded path prohibition is explicit (all pointers use relative links)

---

## Data Model Alignment

- [ ] **CHK156** Entity lifecycle state transitions (spec.md data-model.md) are enforced by contracts
- [ ] **CHK157** G-entity state transitions (BASELINE → REVIEWED → RECONCILED → CONSOLIDATED → VERIFIED → COMPLETE) have corresponding contract rules
- [ ] **CHK158** S-entity approval workflow (BASELINE → SCOPED → APPROVAL REQUESTED → APPROVED → UPDATED → VERIFIED → COMPLETE) maps to approval-process.md phases
- [ ] **CHK159** P-entity validation (pending → deployed → verified) matches pointer validation checklist
- [ ] **CHK160** N-entity dependencies on D-gates are reflected in each contract (e.g., guideline interface restricts identity claims until D1 resolved)

---

## Protection & Governance Anchors

- [ ] **CHK161** All three contracts reference Constitution § II (Repository Governance) or Constitution § II.Protected Files
- [ ] **CHK162** AGENTS.md § 331–343 (Protected Files) is cited consistently across contracts
- [ ] **CHK163** CONTRIBUTING.md § 612–627 (Contributor Workflow) is referenced for governance context
- [ ] **CHK164** No contract assumes authority it does not have (e.g., cannot override locked-files-guard policy)
- [ ] **CHK165** Approval process contract explicitly references locked-files-guard tool/label by name

---

## Acceptance Criteria per Contract

### Approval Process Acceptance Criteria

- [ ] **CHK166** "Approval process is followed when..." checklist (6 items at end of approval-process.md) is testable
- [ ] **CHK167** Each item in acceptance checklist has a verification method (not just yes/no)

### Guideline Interface Acceptance Criteria

- [ ] **CHK168** Acceptance criteria include: structure verified, safeguards preserved, design examples valid, cross-references tested
- [ ] **CHK169** Acceptance criteria are measured against each G-document, not just sampled

### Pointer & Redirect Acceptance Criteria

- [ ] **CHK170** "Pointer contract is satisfied when..." checklist (7 items at end of pointer-redirect-contract.md) covers all three pointer types
- [ ] **CHK171** Each acceptance criterion is independently verifiable before merge

---

## Contract Completeness & Closure

- [ ] **CHK172** All three contracts include "Contract complete" date stamp and status (e.g., "Awaiting D-gate decision")
- [ ] **CHK173** No contract is marked "Draft" or "Incomplete"; all have explicit status
- [ ] **CHK174** Each contract identifies blocking decisions clearly (D0, D3, D5 for the respective contracts)
- [ ] **CHK175** Post-approval phase is defined for each contract that requires approval (approval-process.md includes commit template, pointer contract includes link validation)

---

## Contract Consistency Summary

**Validation Results: Pending**
- [ ] Pending validation: All three contracts are complete and scoped
- [ ] Pending validation: Protected paths and approval authority are consistent
- [ ] Pending validation: Safeguard preservation rules are enforced across contracts
- [ ] Pending validation: Pointer formats and validation are rigorous
- [ ] Pending validation: Design example verification is defined operationally
- [ ] Pending validation: Data model state transitions align with contract workflows
- [ ] Pending validation: Gate dependencies are documented and consistent
- [ ] Pending validation: Governance anchors are accurate and verifiable

**Blockers Identified:**
- [ ] Validation remains pending: all CHK items above are unchecked; Phase 2 readiness has not been established.
- [ ] Unresolved protected-path scope conflict: `.github/PROTECTED_FILES.txt` and the local approval checker include all of `.github/`, while the workflow contract lists narrower paths and omits `.github/specs/`. The feature approval contract also treats S002–S009 as protected, beyond the canonical list's explicit S-path coverage. Reconcile these scopes with the owner before claiming consistency or an exemption; retain existing approval requirements. See [research § 2](../research.md#2-protected-files-governance).
- [ ] Owner decisions D1–D6 and D8 remain pending and block Phase 2.

**Recommended Improvements:** (List items for future enhancement; do not block Phase 2)
- [ ] None recorded

---

**Checklist Status:**
- **Consistency:** 0 of 65 items verified — pending
- **Blocking Issues:** Unresolved — see blockers above; further assessment pending
- **Non-Blocking Recommendations:** ___ (logged for future reference)
- **Approved for Phase 2:** No — pending validation, scope reconciliation, and owner decisions

**Reviewer:** ________________________  **Date:** __________

---

*Checklist template: Contract Validation | Part of TOA-358 Requirements-Quality Validation*
