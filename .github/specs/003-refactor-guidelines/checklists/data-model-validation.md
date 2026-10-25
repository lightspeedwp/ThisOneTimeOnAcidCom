# Checklist: Data Model Validation (TOA-358)

**Purpose:** Validate that entity definitions (G/S/N/P) and relationships fully capture the refactoring scope and enable Phase 2 operations.

**Validation Method:** Unit tests for data model completeness and consistency

**Created:** 2026-10-25 | **Reviewer:** [Owner/Team]

---

## Entity Definition Completeness

### G-Entity (Guideline Document)

- [ ] **CHK176** Each of 116 G-entities has all required fields: id (G001–G116), current_path, current_hash, content_type, unique_safeguards, historical_provenance, dependencies
- [ ] **CHK177** Content types are predefined and mutually exclusive: rule, reference, example, decision, pattern, troubleshooting
- [ ] **CHK178** At least one G-entity is documented with complete field values as example (e.g., G001, G042, or another representative)
- [ ] **CHK179** Baseline hash field references commit b7c3c4413f5fc7ed2e73a50ca7462d45a8e2e1b9 consistently
- [ ] **CHK180** Dependencies field captures cross-references (e.g., "G001 depends on G042 for bundler rules")

### S-Entity (Supporting Document)

- [ ] **CHK181** Each of 9 S-entities has all required fields: id (S001–S009), path, status, protected_file_approval_required, current_content_hash, dependencies, edits_required
- [ ] **CHK182** Status values are consistent: protected, locked, inventory, reference
- [ ] **CHK183** S001–S009 mapping is accurate (confirmed against current repository structure: .claude/skills/*, AGENTS.md, CONTRIBUTING.md)
- [ ] **CHK184** Protected file approval requirement flag (boolean) is correctly set for each S-entity (S002–S009 require approval; S001 status unclear, noted in contract)
- [ ] **CHK185** Symlink targets are documented for S002–S007 (linked to .agents/skills/ sources)

### N-Entity (New Guidance Document)

- [ ] **CHK186** Each of 33 N-entities has all required fields: id (N001–N033), proposed_path, category, approval_status, dependencies, related_g_entities, estimated_size
- [ ] **CHK187** Categories are predefined: reference, inspiration, wordpress, organization, pages, patterns, reports, platform
- [ ] **CHK188** Approval status values are consistent: pending, approved, rejected, conditional
- [ ] **CHK189** Dependencies field references gate IDs (D1–D8) that must be resolved before creation
- [ ] **CHK190** Related G-entities field maps N-documents to G-documents they complement or replace (enables G→N consolidation tracking)

### P-Entity (Pointer / Redirect)

- [ ] **CHK191** P-entity schema includes all required fields: id (P001–P∞), old_path, new_path, redirect_type, status, created_timestamp
- [ ] **CHK192** Redirect types are predefined and mutually exclusive: moved, merged, archived, renamed
- [ ] **CHK193** Status values are consistent: pending, deployed, verified
- [ ] **CHK194** At least one P-entity example is documented showing old_path → new_path mapping
- [ ] **CHK195** P-entity creation is explicitly gated on D5 (preservation strategy) approval

---

## State Transition Validation

### G-Entity Lifecycle

- [ ] **CHK196** G-document state sequence (BASELINE → REVIEWED → RECONCILED → CONSOLIDATED → VERIFIED → COMPLETE) is unidirectional (no backward states)
- [ ] **CHK197** REVIEWED state is triggered by source read-only inspection (Phase 2 task T019 or similar)
- [ ] **CHK198** RECONCILED state requires D4 decision (G→N mapping defined)
- [ ] **CHK199** CONSOLIDATED state applies changes while preserving safeguards (Phase 2 task implementation)
- [ ] **CHK200** VERIFIED state includes hash validation (post-edit checksum matches expected)

### S-Entity Lifecycle

- [ ] **CHK201** S-document state sequence (BASELINE → SCOPED → APPROVAL REQUESTED → APPROVED → UPDATED → VERIFIED → COMPLETE) maps to approval-process.md phases
- [ ] **CHK202** SCOPED state is triggered by plan.md scope definition (before Phase 2 begins)
- [ ] **CHK203** APPROVAL REQUESTED state is triggered by PR creation with approval template (approval-process.md format)
- [ ] **CHK204** APPROVED state requires evidence (GitHub review or recorded decision)
- [ ] **CHK205** VERIFIED state includes dependency cross-check (related G/N references updated)

### N-Entity Lifecycle

- [ ] **CHK206** N-document state sequence starts PROPOSED → APPROVAL PENDING, then follows either APPROVED → CONTENT DEVELOPED → INTEGRATED → VERIFIED → COMPLETE in order or REJECTED → ARCHIVED
- [ ] **CHK207** APPROVAL PENDING state is triggered by awaiting owner decision D4
- [ ] **CHK208** APPROVED state requires explicit approval recorded in D4 decision
- [ ] **CHK209** CONTENT DEVELOPED state follows approval (Phase 2 task T028–T032)
- [ ] **CHK210** INTEGRATED state includes pointer creation and G-replacement mapping

### P-Entity Lifecycle

- [ ] **CHK211** P-document state sequence (pending → deployed → verified) is sequential
- [ ] **CHK212** PENDING state requires D5 approval (preservation strategy decision)
- [ ] **CHK213** DEPLOYED state is triggered when pointer file is created and new destination exists
- [ ] **CHK214** VERIFIED state includes link test (old → new works, new path is accessible)

---

## Entity Relationships & Dependencies

### G-to-N Dependencies

- [ ] **CHK215** G→N consolidation relationships are defined (e.g., "G042 consolidates into N014")
- [ ] **CHK216** If G is consolidated, a P-entity is created to redirect old path to new N-path
- [ ] **CHK217** G→N references are bidirectional: N-entity `related_g_entities` field lists G-docs it replaces
- [ ] **CHK218** No G-document is orphaned: each G has state transition path or consolidation mapping

### G-to-P Dependencies

- [ ] **CHK219** P-entities always link old G-path → new location (either consolidated N or moved G)
- [ ] **CHK220** Each P-entity has old_path that corresponds to verified G-entity at baseline
- [ ] **CHK221** New destination (new_path) is either another G-entity or approved N-entity
- [ ] **CHK222** Pointer chain depth is limited to 1 hop (P does not point to another P)

### S-to-G/N Dependencies

- [ ] **CHK223** S-entities track which G/N entities they reference (dependencies field)
- [ ] **CHK224** Example: S008 (AGENTS.md) references G012 (path convention table); when G012 moves, S008 must update reference
- [ ] **CHK225** S-entity edits include cross-reference update tasks (T005–T018 in tasks.md)
- [ ] **CHK226** No S-entity references a P-entity directly; only G-entities or N-entities

### Gate Dependencies

- [ ] **CHK227** D1 gate blocks N-documents that make identity claims (e.g., N001–N010 "Brand Voice" category)
- [ ] **CHK228** D2 gate blocks N-documents about publication boundaries (e.g., N031–N033 on access control)
- [ ] **CHK229** D3 gate blocks design-related N-documents within the defined N001–N033 range (design examples and palette/font references) until design authority is confirmed
- [ ] **CHK230** D4 gate gates all N-document creation (N001–N033 pending approval)
- [ ] **CHK231** D5 gate blocks all P-entity creation (pointers/redirects)

---

## Inventory Reconciliation

### G-Entity Count Validation

- [ ] **CHK232** 116 G-entities are accounted for (baseline count verified)
- [ ] **CHK233** Subdirectory breakdown sums correctly: blocks(4) + components(34) + design-tokens(10) + icons(2) + mobile(7) + pages(1) + parts(3) + patterns(1) + responsive(7) + sections(6) + templates(1) + troubleshooting(3) + root(37) = 116
- [ ] **CHK234** Each subdirectory group has representative G-entities documented with full field values
- [ ] **CHK235** Current inventory is compared against baseline commit b7c3c4413f5fc7ed2e73a50ca7462d45a8e2e1b9 (status: pending, noted in spec.md)

### S-Entity Count Validation

- [ ] **CHK236** 9 S-entities are accounted for: S001–S009
- [ ] **CHK237** Protected file list (S002–S009) is consistent with AGENTS.md § 331–343 canonical list
- [ ] **CHK238** Symlink targets confirmed: S002–S007 point to .agents/skills/ sources

### N-Entity Count Validation

- [ ] **CHK239** 33 N-entities are proposed and categorized by category field
- [ ] **CHK240** Category distribution matches spec.md (reference 5, inspiration 1, wordpress 2, organization 13, pages 3, patterns 4, reports 4, platform 1)
- [ ] **CHK241** All N-entities are marked PROPOSED status (awaiting D4 approval)

### P-Entity Count Validation

- [ ] **CHK242** P-entity count is variable (depends on D5 approval and actual G→N consolidation)
- [ ] **CHK243** Placeholder P-entities are NOT pre-numbered (not P001–P100); only created post-D5 during Phase 2D
- [ ] **CHK244** Each P-entity created is traced to a specific G-entity baseline state and new destination

---

## Validation & Consistency Rules

### Cross-Entity Consistency

- [ ] **CHK245** No G-entity appears in two different states simultaneously
- [ ] **CHK246** S-entity references to G-entities are kept in sync during Phase 2 (T005–T018 update references)
- [ ] **CHK247** N-entity `related_g_entities` field does not reference G-entities that will be deleted (preserves traceability)
- [ ] **CHK248** P-entity old_path always exists at baseline (pre-verified before Phase 2)
- [ ] **CHK249** P-entity new_path is either existing G-path or approved N-path

### Verification Checksum

- [ ] **CHK250** Baseline checksum is computed at commit b7c3c4413f5fc7ed2e73a50ca7462d45a8e2e1b9 (documented in data-model.md)
- [ ] **CHK251** Checksum is documented as: all 116 unique safeguards preserved ✓, all 9 S-files dependencies updated ✓, all references/pointers validated ✓
- [ ] **CHK252** Post-refactor verification includes hash re-validation (no changes lost during consolidation)
- [ ] **CHK253** Discrepancies between baseline and current state are documented (spec.md notes: "comparison with observation baseline remains pending")

### Dependency Graph Validation

- [ ] **CHK254** No cyclic dependencies exist: G1 → G2 and G2 → G1 form the forbidden cycle G1 → G2 → G1, including when these edges are references recorded in the `dependencies` field
- [ ] **CHK255** Gate dependencies form a DAG (directed acyclic graph): D0 does not depend on D1; D1–D6 do not depend on D0
- [ ] **CHK256** Critical path (blocking operations) is identified: Phase 2 cannot proceed without T001–T004 (D-gate resolution)

---

## Entity Coverage & Completeness

- [ ] **CHK257** Every G-entity (G001–G116) has a state transition path to COMPLETE state
- [ ] **CHK258** Every S-entity (S001–S009) has a state transition path to COMPLETE state
- [ ] **CHK259** Every N-entity (N001–N033) has a full approved or rejected lifecycle path as specified in CHK206
- [ ] **CHK260** No entity is left undefined or orphaned at end of Phase 3

---

## Data Model Completeness Summary

**Validation Results: Pending**
- [ ] Pending validation: All entity types are fully defined with required fields
- [ ] Pending validation: State transitions are unidirectional and verifiable
- [ ] Pending validation: Relationships capture consolidation, references, and redirects
- [ ] Pending validation: Gate dependencies are documented and enforced
- [ ] Pending validation: Inventory counts are reconciled and verified
- [ ] Pending validation: Consistency rules prevent invalid states
- [ ] Pending validation: Verification checksums enable validation
- [ ] Pending validation: No entity is orphaned or undefined

**Blockers Identified:**
- [ ] Validation remains pending: all CHK items above are unchecked; Phase 2 readiness has not been established.
- [ ] Unresolved protected-path scope conflict: `.github/PROTECTED_FILES.txt` and the local approval checker include all of `.github/`, while the workflow contract lists narrower paths and omits `.github/specs/`. The feature approval contract also treats S002–S009 as protected, beyond the canonical list's explicit S-path coverage. Reconcile these scopes with the owner before claiming consistency or an exemption; retain existing approval requirements. See [research § 2](../research.md#2-protected-files-governance).
- [ ] Owner decisions D1–D6 and D8 remain pending and block Phase 2.

**Recommended Improvements:** (List items for future enhancement; do not block Phase 2)
- [ ] Complete baseline observation comparison (noted as pending in spec.md)
- [ ] Add representative examples with full field values for each entity type

---

**Checklist Status:**
- **Completeness:** 0 of 85 items verified — pending
- **Blocking Issues:** Unresolved — see blockers above; further assessment pending
- **Non-Blocking Recommendations:** ___ (logged for future reference)
- **Approved for Phase 2:** No — pending validation, scope reconciliation, and owner decisions

**Reviewer:** ________________________  **Date:** __________

---

*Checklist template: Data Model Validation | Part of TOA-358 Requirements-Quality Validation*
