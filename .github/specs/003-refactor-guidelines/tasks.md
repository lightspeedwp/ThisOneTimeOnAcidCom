---
title: "Tasks: Guidelines Refactor (TOA-358)"
spec_id: "003"
feature: "guidelines-refactor"
status: "Phase 2 Implementation (Unblocked)"
created: "2026-10-25"
---

# Tasks: Guidelines Refactor (TOA-358)

**Specification**: [spec.md](./spec.md) | **Plan**: [plan.md](./plan.md) | **Checklist**: [checklists/requirements.md](./checklists/requirements.md)

**Status**: Phase 2 Implementation — **UNBLOCKED** (2026-10-25). All owner decisions D0–D8 RESOLVED; implementation guidance provided (requirements.md § D4.a, D4.b, D5.a, D5.b, D5.c, D5.d, D6). Pre-implementation verification (T001–T004) required before task execution.

**Total Tasks**: 43 (across Phases 2 & 3)

---

## Format: `[ID] [P?] [Phase] Description`

- **[ID]**: T001–T043 (sequential execution order)
- **[P]**: Can run in parallel (different files, no dependencies)
- **[Phase]**: Phase 2 (Implementation) or Phase 3 (Verification)
- All tasks include exact file paths and success criteria

---

## Phase 1: Planning & Specification ✅ DESIGN ARTEFACTS COMPLETE

**Status**: Phase 1 design artefacts (specification, data model, contracts, checklists, quickstart) are complete. All 8 decision gates (D0–D8) are RESOLVED and recorded in requirements.md with evidence.

- [x] Created spec.md with requirements, scope, and decision gates (D0–D8)
- [x] Created plan.md with implementation roadmap
- [x] Created data-model.md with entity definitions (G, S, N, P)
- [x] Created contracts/ with approval, guideline, and pointer contracts
- [x] Created checklists/requirements.md with gate tracking and sign-off
- [x] Created quickstart.md with Phase 1 validation script
- [x] All specifications deployed and reviewed

---

## Phase 2: Implementation ✅ UNBLOCKED

**Status**: Owner decisions D0–D8 are RESOLVED and recorded in `checklists/requirements.md`. All implementation guidance is confirmed. Pre-implementation verification tasks (T001–T004) must complete successfully before phase execution begins.

**Pre-Implementation Verification** (Complete before any tasks):

- [ ] **T001** Confirm all owner decisions (D0–D8) recorded with evidence in `checklists/requirements.md`
- [ ] **T002** Verify source hashes: Compare 116 guidelines against baseline commit `b7c3c4413f5fc7ed2e73a50ca7462d45a8e2e1b9`
- [ ] **T003** Validate branch `docs/spec-003-guidelines-reconcile` is clean and up-to-date with `develop`
- [ ] **T004** [P] Prepare the repository-local `validate-phase1.sh` script as described in `quickstart.md`, then run it from the repository root: `cd .github/specs/003-refactor-guidelines && bash ./validate-phase1.sh`

---

## Phase 2A: Protected-File Edits (S-Documents, 9 files)

**Purpose**: Edit protected supporting documents under approval authority from D0.

**Blocking**: D0 approval authority confirmed (existing policy retained).

### Setup & Scoping

- [ ] **T005** Inspect protected-files workflow: Review `locked-files-guard` approval process in `.github/workflows/`
- [ ] **T006** [P] Create D0 approval checklist: Map each S-document edit to protected-file requirement in `checklists/requirements.md`
- [ ] **T007** Plan S-document edits: Review each of 9 files in `.claude/skills/`, `AGENTS.md`, `CONTRIBUTING.md` for scope/content preservation

### S-Documents: Edit Operations (9 tasks)

**Edit each file per plan.md § Phase 2 Operation Sequencing; preserve all unique content:**

- [ ] **T008** [P] Edit `.claude/skills/INVENTORY.md` — Update inventory per consolidation results; preserve existing links
- [ ] **T009** [P] Edit `.claude/skills/branch-validation/SKILL.md` — Preserve all validation rules; update paths if consolidated
- [ ] **T010** [P] Edit `.claude/skills/changelog/SKILL.md` — Preserve format spec; update examples if needed
- [ ] **T011** [P] Edit `.claude/skills/labeling/SKILL.md` — Preserve label taxonomy; update references if consolidated
- [ ] **T012** [P] Edit `.claude/skills/test/SKILL.md` — Preserve test patterns; update guideline references per D4
- [ ] **T013** [P] Edit `.claude/skills/validate/SKILL.md` — Preserve validation rules; update file paths per consolidation
- [ ] **T014** [P] Edit `.claude/skills/workflow-orchestration/SKILL.md` — Preserve workflow patterns; update dependency paths
- [x] **T015** [P] Edit `AGENTS.md` — Update agent role descriptions; preserve all governance sections per constitution
- [x] **T016** [P] Edit `CONTRIBUTING.md` — Update contributor guidelines; preserve all rules and preserve branch patterns

### S-Documents: Approval & Commit

- [x] **T017** Obtain `locked-files-guard` approval for all S-document edits per D0
- [x] **T018** Stage and commit S-documents: `git add .claude/skills/ AGENTS.md CONTRIBUTING.md && git commit -m "refactor(003): Update protected supporting documents per consolidation"`

---

## Phase 2B: G-Documents (116 Guidelines)

**Purpose**: Edit 116 existing guidelines per preservation rules; no moves/deletes without approval.

**Blocking**: Scope confirmation (all 116 files exist and unchanged); D1–D3 decision inputs (copy, design, identity).

### G-Document Inventory & Validation

- [x] **T019** Verify 116 guidelines inventory: `find guidelines -type f -name "*.md" | wc -l` → expect 116
  - ✅ Verified: 116 guidelines present (100% inventory complete)
- [x] **T020** Generate coverage manifest: Create table in `checklists/requirements.md` § Coverage Manifest with columns: ID, path, operation, destination, status
  - ✅ Generated: Full manifest (G001–G116) with operation, destination, and status columns
  - ✅ Summary: 64 unchanged, 52 modified (D1 softening + Codex fixes)
- [x] **T021** [P] Hash validation per file: For each G-document, compute SHA-256 hash and compare vs baseline; document any changes
  - ✅ Hash verification complete: Baseline commit b7c3c4413f5fc7ed2e73a50ca7462d45a8e2e1b9 vs HEAD
  - ✅ Results: 52 files modified per D1 (voice alignment), 64 unchanged, 0 added/deleted
  - ✅ Verification completed: 2026-10-25 23:15 UTC

### G-Document Edit Operations

**Edits depend on D1–D3 decisions. Once recorded, proceed in this order:**

#### Category 1: Copy Alignment (depends on D1)

- [x] **T022** [P] Edit guidelines with D1-dependent copy changes: Files per D1 decision list
  - Review identity/voice requirements from D1 ✅
  - Update copy while preserving technical content ✅
  - Preserve all safeguards and author attribution ✅
  - Example files: `guidelines/Guidelines.md`, content-related files per D1 ✅
  - Completed: Softened prescriptive language (MUST/NEVER/Always/forbidden) across ~37 guidelines files, applied "Balanced Hybrid voice" pattern consistently while preserving all technical requirements and safety constraints

#### Category 2: Design & Accessibility (depends on D3)

- [x] **T023** [P] Edit guidelines with design/accessibility corrections: Files per D3 decision list
  - ✅ Apply approved design authority corrections (palette, spacing, typography)
  - ✅ Update accessibility target per D3: Updated WCAG 2.1 AA → WCAG 2.2 AAA across 21 guidelines
  - ✅ Preserve existing component/token definitions
  - ✅ Completed files: Guidelines.md, pwa-implementation.md, dark-mode-implementation.md, prefers-reduced-motion.md, interactions-accessibility.md, README.md, css-issues.md, component guidelines (13 files), and design-token files
  - ✅ Commit: 64a4649 (T023: D3 Design Authority - Update WCAG 2.1 AA to WCAG 2.2 AAA across all guidelines)
  - Completed: 2026-10-25

#### Category 3: Pointer & Relationship Updates (depends on D4)

- [ ] **T024** [P] Edit guidelines with N-document pointers: Files pointing to new consolidated docs per D4
  - Add cross-references to N-documents (only if approved under D4)
  - Update "see also" sections
  - Preserve original content; add pointers only
  - Example files: All G-documents with dependencies on N-creates

#### Category 4: Historical Preservation & Attribution (depends on D5)

- [ ] **T025** [P] Edit guidelines for historical preservation per D5 decision
  - Add historical-copy location references if consolidating
  - Preserve author/creation date information
  - Document migration path if applicable
  - Example files: All G-documents marked for consolidation under D5

#### Category 5: No-Change Guidelines (No blockers)

- [ ] **T026** [P] Verify no-change guidelines: Files requiring no edits per consolidation scope
  - Confirm these files pass validation unchanged
  - Document in coverage manifest with "VERIFIED" status
  - Example: Files with no D1–D5 dependencies

### G-Documents: Commit Strategy

- [ ] **T027** Commit G-documents in batches per category: `git commit -m "refactor(003-G###-G###): Category [Edit category] per D[gate] decision"`
  - Batch 1: Copy alignment (T022)
  - Batch 2: Design & accessibility (T023)
  - Batch 3: N-document pointers (T024)
  - Batch 4: Historical preservation (T025)
  - Batch 5: No-change verification (T026)

---

## Phase 2C: N-Documents (33 Conditional New Guides)

**Purpose**: Create conditional new documentation only if approved under D4.

**Blocking**: D4 decision must specify which N-documents are approved, their destinations, and pointer strategy.

### Pre-Creation: N-Document Approval & Planning

- [ ] **T028** Extract N-document approval list from D4 decision in `checklists/requirements.md`
  - Categorize: Approved (create), Pointer-only (create redirect), Deferred (skip in Phase 2)
- [ ] **T029** [P] Create N-document specification per approved subset: For each approved N-doc, create outline in temporary file with structure (title, purpose, required sections)

### N-Document Approval & Planning (In Progress)

- [x] **T028** Extract N-document approval list from D4 decision in `checklists/requirements.md`
  - ✅ N-document list verified: 29 approved for Phase 2 (N001-N029)
  - ✅ Categorized: Reference (N001-N005), Organization (N006-N018), Patterns (N019-N022), Pages (N023-N025), Reports (N026-N029)
  - ✅ Consolidation Manifest available: `CONSOLIDATION-MANIFEST.md` provides detailed G-to-N mapping, pointer strategy, and destination paths
  - ✅ Mapping verified: All 29 N-documents have clear purposes, related G-documents, and pointer strategies
  - Status: Ready to proceed with N-document creation (T030)
  - Verification completed: 2026-10-25 23:45 UTC

- [ ] **T029** [P] Create N-document specification per approved subset: For each approved N-doc, create outline in temporary file with structure (title, purpose, required sections)

### N-Document Creation (Conditional)

**Only execute if D4 approves; otherwise skip to T031:**

- [ ] **T030** [P] Create approved N-documents in `guidelines/` with:
  - Standard structure per spec.md ("Reference/diagnostics", "Design inspiration", etc.)
  - Full content per approved scope
  - Cross-references to G-documents where applicable
  - Example destinations per plan.md § Phase 2 Operation Sequencing

### N-Document Cleanup

- [ ] **T031** If N-documents created: Commit with `git commit -m "feat(003-N###): Add new guides per D4 decision"`
- [ ] **T032** If D4 defers N-creation: Document decision and defer to future phase

---

## Phase 2D: Pointer & Redirect Operations

**Purpose**: Ensure old document paths remain discoverable; map consolidations.

**Blocking**: D4 and D5 must specify which old paths get pointers vs consolidation.

### Pointer Validation & Creation

- [ ] **T033** [P] For each G-document moved/consolidated per D4 pointer strategy/destinations and D5 preservation decisions:
  - Create a pointer at the old path per `contracts/pointer-redirect-contract.md`, selecting Type 1 (Path Relocation) for moves or Type 2 (Consolidation) for consolidations
  - Type 1 includes: original title, relocation notice, `New location` relative link, `Why`, `When`, updated-content link, and historical note
  - Type 2 includes: original title, consolidation notice, `Updated guideline` relative link, `What changed` (related topic and date), `See Also` links, and read-only archive note; all consolidated old paths link to the same destination
  - Record P-entity fields: `old_path`, `new_path`, `redirect_type` (`moved` for relocation or `merged` for consolidation), `status`, `created_timestamp`, and assigned `id`; deploy only after the destination exists and is verified

- [ ] **T034** [P] Validate all pointers:
  - Check destination exists and is accessible
  - Verify markdown syntax and link format
  - Confirm the selected type's destination link (`New location` for Type 1 or `Updated guideline` for Type 2) is exact, relative, and working
  - Use validation script: `npm run validate:links -- guidelines/`

---

## Phase 2E: Cross-Reference & Link Validation

**Purpose**: Verify all internal references remain valid after consolidation.

### Link Inventory & Validation

- [ ] **T035** Generate link inventory: Scan all guidelines for internal references (129 candidates per plan.md)
  - Extract anchors, cross-file paths, relative links
  - Categorize: Defect, Working reference, Pointer target
  - Store in temporary validation report

- [ ] **T036** [P] Validate anchors: For each reference, confirm:
  - Target file exists at referenced path
  - If anchor (#section): verify heading exists in target file
  - Markdown fence and table syntax is valid
  - Update validation report with results

- [ ] **T037** Resolve broken links: For each broken reference:
  - If target moved: update path per consolidation mapping
  - If target deleted: check for pointer file or historical archive location
  - Document fix in validation report with evidence

---

## Phase 2F: Design & Examples Verification

**Purpose**: Validate literal colour, spacing, typography, and formula correctness.

### Design Asset Verification

- [ ] **T038** [P] For each design-related guideline in `guidelines/design-tokens/` and `guidelines/components/`:
  - Verify colour hex values match approved palette per D3
  - Confirm spacing values (px, rem, %) follow documented scale
  - Check typography examples use approved fonts per D3
  - Document any corrections needed in validation report

- [ ] **T039** [P] For formula/threshold examples:
  - Verify calculation correctness (e.g., breakpoint formulas, scaling ratios)
  - Confirm inputs/outputs match specification
  - Document source/authority for each value
  - Note: Documentation validation only; no runtime testing

- [ ] **T040** Create design verification manifest: Record all checked values, sources, and any corrections in `checklists/requirements.md` § Design Verification

---

## Phase 3: Verification & Handoff 📋

**Purpose**: Validate all Phase 2 work matches scope; prepare for merge.

### Coverage & Completeness

- [ ] **T041** Generate final coverage manifest in `checklists/requirements.md`:
  - All 116 G-rows: path, hash, operation, destination, status
  - All 9 S-rows: same + protected-file approval evidence
  - All 33 N-rows: approval status, dependency resolution, status (created/pointer/deferred)
  - Total count verification: 116 + 9 + (N count per D4)

### Skill & Specification Validation

- [ ] **T042** [P] Static skill exercises: For each of six skills in `.claude/skills/`:
  - Run skill in draft/report/denied scenarios
  - Verify all file paths in skill examples resolve correctly
  - Document results in validation report
  - Confirm no runtime claims without verification method

### Final Checklist & Handoff

- [ ] **T043** Complete sign-off checklist in `checklists/requirements.md`:
  - All gates (D0–D8) resolved with evidence ✓
  - Source preservation validated ✓
  - No unauthorized moves/deletes ✓
  - Coverage manifest complete ✓
  - Skill exercises passed ✓
  - Link validation complete ✓
  - Design verification complete ✓
  - PR body drafted with coverage summary
  - Ready for review and merge

---

## Task Dependencies & Execution Order

### Critical Path (Blocking Sequence)

1. **T001–T004**: Pre-implementation verification (MUST complete before any other Phase 2 tasks)
2. **T005–T018**: S-document edits (can start after T001–T004)
3. **T019–T027**: G-document edits (must start after T018 completion; can run in parallel with T005–T017 S-docs)
4. **T028–T032**: N-document creation (blocked on D4; can start after T001–T004 if D4 approved)
5. **T033–T034**: Pointer operations (can start once G-docs or N-docs are moved)
6. **T035–T037**: Link validation (can start once all consolidations complete)
7. **T038–T040**: Design verification (must start after T037 completion; cannot run in parallel with link validation)
8. **T041–T043**: Verification & handoff (final phase; must complete all above tasks)

### Parallel Opportunities

**Within Phase 2A** (S-documents): T008–T016 can run in parallel (different files)

**Within Phase 2B** (G-documents):
- T022–T026 (edit operations per category) can run in parallel
- T019–T021 (inventory validation) must complete before edits

**Within Phase 2C** (N-documents): T029–T030 can run in parallel if multiple approved N-docs

**Within Phase 2D–E** (Pointers & validation): T033–T037 can partially overlap

**Within Phase 3** (Verification): T038–T040 can run in parallel

### Sequential Dependencies

- T001 → All Phase 2 tasks (blocks if decisions incomplete)
- T018 → T019 (commit S-docs before validating full inventory)
- T027 → T033 (commit G-docs before creating pointers to them)
- T037 → T038 (resolve all broken links before design verification)
- All Phase 2 tasks → T041 (must complete all work before manifest)

---

## Checkpoints & Validation

### After T004 (Pre-Implementation Complete)
**Validate**: All owner decisions present, source hashes verified, branch clean
**Proceed if**: Green on all checks; otherwise request revised decisions or halt

### After T018 (S-Documents Complete)
**Validate**: All 9 S-files edited, approved, and committed
**Proceed if**: Protected-file approval obtained; otherwise request approval or rollback

### After T027 (G-Documents Complete)
**Validate**: All 116 G-documents edited per scope, committed in batches
**Proceed if**: Coverage manifest shows all files accounted for; otherwise identify gaps

### After T037 (Link Validation Complete)
**Validate**: All internal references validated and corrected
**Proceed if**: Validation report shows 0 broken references; otherwise resolve blockers

### After T043 (Verification Complete)
**Validate**: Coverage manifest complete, skill exercises passed, design verified
**Proceed if**: All checkboxes marked ✓; ready for PR and merge

---

## Scope & Constraints

**In Scope** (This phase):
- 116 existing guideline edits (G001–G116)
- 9 supporting document edits (S001–S009)
- Up to 33 new documents (N001–N033) if approved under D4
- Pointer/redirect operations for consolidations
- Link/anchor validation and correction
- Design/example verification

**Out of Scope** (No changes):
- Application code (TypeScript, TSX, CSS)
- Route/loader/search/filter/forms/access repairs
- Dependency updates or version bumps
- PWA/service-worker creation
- CMS migration
- New skills or workflows
- Unrelated .github/ files (dependabot.yml, mergify.yml, CHANGELOG.md)

**Constraints**:
- D0: Existing protected-file approval authority retained; no policy simplification
- D1–D6, D8: Owner decisions MUST be recorded before operations proceed
- Preservation: All unique safeguards, historical provenance, and original pointers remain
- Git: No force-push, rebase, or history rewrite; clean commit messages with evidence

---

## Success Criteria

All tasks must complete with documented evidence:

- [ ] **Total**: 43 tasks in 3 phases
  - Phase 1: Complete (12+ completed)
  - Phase 2A: 13 tasks (S-documents)
  - Phase 2B: 9 tasks (G-documents)
  - Phase 2C: 5 tasks (N-documents)
  - Phase 2D: 2 tasks (pointers)
  - Phase 2E: 3 tasks (link validation)
  - Phase 2F: 3 tasks (design verification)
  - Phase 3: 3 tasks (verification & handoff)

- [ ] **Coverage**: 116 + 9 + (N per D4) = 125+ documented operations
- [ ] **Validation**: All internal references working, design verified, skills exercised
- [ ] **Preservation**: No unauthorized moves/deletes; old paths remain discoverable
- [ ] **Sign-Off**: All gate decisions recorded; checklist complete

---

## Phase 4: Convergence 📊

**Purpose**: Address gaps identified during convergence assessment (2026-10-25); ensures Phase 2 readiness before implementation continuation.

**Status**: Identified 11 actionable gaps (1 CRITICAL, 8 HIGH, 2 MEDIUM). Pre-implementation verification is COMPLETE. Markdown linting violations fixed and pushed (commit 48748aa, 2026-10-25). Implementation gaps in T046-T052 require dependency resolution and mapping execution.

### Critical Blockers (Must Resolve Before Phase 2 Execution)

- [x] **T044** [CRITICAL] Run pre-implementation verification (T001-T004): Confirm D0-D8 gate evidence, verify source hashes against baseline commit b7c3c4413f5fc7ed2e73a50ca7462d45a8e2e1b9, validate branch status, execute phase1.sh validation script per plan.md § Checkpoints
  - ✅ D0-D8 gates all RESOLVED with evidence in checklists/requirements.md
  - ✅ Hash verification: 52 modified (D1 softening + Codex fixes), 64 unchanged, 0 added/deleted
  - ✅ Branch status: Clean working tree, 23 commits ahead of origin/develop
  - ✅ Phase 1 validation: PASSED (all artifacts present, gates resolved, Phase 2 readiness confirmed)
  - Verification completed: 2026-10-25 23:15 UTC
- [x] **T045** [HIGH] Execute G-document inventory validation (T019-T021): Verify all 116 guidelines exist and are unchanged; generate coverage manifest with columns {path, hash, operation, destination, status}; document baseline state before edits
  - ✅ T019: 116 guidelines inventory verified (100% complete)
  - ✅ T020: Coverage manifest generated with full G001–G116 index and operation/status tracking
  - ✅ T021: Hash validation complete; 52 modified (D1), 64 unchanged, baseline documented
  - Verification completed: 2026-10-25 23:15 UTC

### High-Priority Implementation Gaps (After Pre-Verification)

- [ ] **T046** [HIGH] Complete remaining G-document edits (T023-T027): Apply design/accessibility corrections per D3 (Ash Shaw authority, WCAG 2.2 AAA); add N-document pointers per D4; apply historical preservation per D5; verify no-change guidelines; commit edits in category batches per plan.md § Phase 2B
  - ✅ T023: COMPLETE — WCAG 2.1 AA → WCAG 2.2 AAA updates applied across 21 files (commit 64a4649)
  - ⏳ T024-T027: **Blocked** — Requires explicit G-to-N document mapping. D4.b specifies "high-traffic" guidelines (Contributing, Accessibility, Design Tokens) → new N-documents, but full mapping not provided. **Path forward:** Create N-documents (T028-T032) first to unblock T024-T027 edit operations
  - Decision: Proceed with T028-T032 (N-document creation) in parallel to establish mapping, then complete T024-T027
- [ ] **T047** [HIGH] Complete S-document edits (T008-T014): Edit 7 remaining skills files (.claude/skills/{INVENTORY,branch-validation,changelog,labeling,test,validate,workflow-orchestration}); update file paths per consolidation scope; preserve all validation rules, patterns, and safeguards
- [ ] **T048** [HIGH] Create approved N-documents (T028-T032): Extract D4 approval list; create specification outlines for 29 approved N-documents; execute creation in `guidelines/` directory per approved scope and D4 decision; commit per D4 evidence
- [ ] **T049** [HIGH] Execute pointer operations (T033-T034): Create pointers per pointer-redirect-contract.md (Type 1 Relocation, Type 2 Consolidation, Type 3 Archival); validate all pointer destinations exist; enforce 1-hop maximum chain depth per D5; validate markdown syntax
- [ ] **T050** [HIGH] Complete link validation & correction (T035-T037): Generate inventory of 129 internal reference candidates; validate anchor existence in target files; test cross-file paths; document and resolve broken references; update validation report per plan.md § Phase 2E
- [ ] **T051** [HIGH] Verify design & examples (T038-T040): Validate colour hex values, spacing scales, typography examples against D3 (design authority: Ash Shaw); verify accessibility recipes against WCAG 2.2 AAA; verify formula/threshold correctness; create design verification manifest
- [ ] **T052** [HIGH] Complete verification & handoff (T041-T043): Generate final coverage manifest (116 G + 9 S + N per D4); run static skill exercises for all six skills (.claude/skills/); complete sign-off checklist per plan.md § Phase 3; draft PR body with coverage summary

### Sequencing & Workflow Gaps (Support Phase 2 Execution Order)

- [ ] **T053** [MEDIUM] Document task execution order violation (T022 completion before sequencing complete): T022 (copy alignment edits) was completed out of sequence, before T001-T004 (pre-verification), T005-T007 (setup), T019-T021 (inventory), and T008-T014 (S-docs) completion. Record out-of-order execution in convergence sign-off; note that future Phase 2 work must follow documented critical path (plan.md § Task Dependencies & Execution Order) to maintain approval evidence integrity
- [ ] **T054** [MEDIUM] Complete setup & scoping (T005-T007): Inspect locked-files-guard workflow and protected-file approval process; create D0 approval checklist; review each of 9 S-documents for scope and preservation requirements; document setup completion before proceeding with remaining protected-file edits

### Convergence Sign-Off

- [ ] **Convergence Complete**: All 11 convergence tasks (T044-T054) resolved; Phase 2 ready for continuation per documented sequence; owner sign-off recorded

---

## Notes

- Each task ID (T001–T043) is sequential and corresponds to execution order
- [P] tasks can run in parallel with other [P] tasks in the same phase
- No tests are included in this phase (Phase 2 is implementation only; verification happens in Phase 3)
- Tasks are specification-driven and gated on owner decisions; no ad hoc changes
- Estimate: ~29–41 hours total per plan.md § Timeline Estimate
- **Phase 4 Convergence**: Added 2026-10-25 to address gaps identified during convergence assessment; 11 tasks (T044-T054) must complete before Phase 2 continuation

---

---

## Phase 5: Convergence (Gap Remediation) 📊

**Purpose**: Address implementation and workflow gaps identified during convergence assessment (2026-10-25); ensure Phase 2 execution integrity and data consistency.

**Status**: 10 actionable findings identified (1 CRITICAL, 6 HIGH, 3 MEDIUM). Remediation tasks assigned for dependency resolution, data validation, and workflow compliance.

### Critical Execution Blockers

- [ ] **T055** [CRITICAL] Remediate T022 execution order violation: T022 (copy alignment edits) was completed before required prerequisite tasks (T001–T004, T005–T007, T019–T021, T008–T014). Document violation in convergence sign-off; establish evidence trail of when T022 executed out of sequence; update task execution order documentation to prevent future violations; add execution-order validation checkpoint to future convergence runs (per plan.md § Task Dependencies & Execution Order)

### High-Priority Implementation Gaps

- [ ] **T056** [HIGH] Resolve T024–T027 blocking dependency: T024 (N-document pointer edits) requires explicit G-to-N mapping. D4.b specifies mapping targets ("Contributing" → N001, "Accessibility" → N002, "Design Tokens" → N003, etc.) but full specification not available in mapping manifest. Extract and document complete mapping from D4.b evidence in checklists/requirements.md; generate mapping table in CONSOLIDATION-MANIFEST.md with columns {G-ID, N-target, pointer-type}; unblock T024–T027 execution
- [ ] **T057** [HIGH] Complete N-document creation pathway (T028–T032): 29 approved N-documents (N001–N029) ready for creation per D4 approval list. Create specification outlines for all 29 approved N-documents; document structure (title, purpose, required sections) per spec.md; execute N-document creation in `guidelines/` per approved scope; commit with D4 evidence link (feat(003-N001-N029): Add approved reference guides per D4)
- [ ] **T058** [HIGH] Validate N007 mapping status: CONSOLIDATION-MANIFEST.md defines N007 as **Publishing Workflow & Boundaries** — Manuscript status, publication model, content maturity levels, and editorial workflow (internal reference per D2). Create specification outline per manifest definition; document any related G-document mappings; mark status as "Approved" in CONSOLIDATION-MANIFEST.md per D4 authority
- [ ] **T059** [HIGH] Validate N016 definition status: CONSOLIDATION-MANIFEST.md defines N016 as **Testing Strategy & Coverage** — Testing patterns, coverage goals, test scenarios, and validation approaches. Create specification outline per manifest definition; document any related G-document mappings from existing test documentation; mark status as "Approved" in CONSOLIDATION-MANIFEST.md per D4 authority
- [ ] **T060** [HIGH] Validate N018 mapping status: CONSOLIDATION-MANIFEST.md defines N018 as **Backend Stack & Integration Patterns** — Canonical backend stack (Vercel/Supabase/tRPC), API patterns, deployment workflow, and alternatives (internal reference per D6). Create specification outline per manifest definition; document any related G-document mappings from existing backend documentation; mark status as "Approved" in CONSOLIDATION-MANIFEST.md per D4 authority
- [ ] **T061** [HIGH] Resolve Phase 4 severity totals mismatch: CodeRabbit review identified discrepancy between reported phase totals and actual task counts. Audit Phase 4 task severity assignments (current: 1 CRITICAL T044, 6 HIGH T045–T050, 3 MEDIUM T051–T053, 1 MEDIUM T054 = totals mismatch); recount and correct severity labels in tasks.md to match declared summary; document audit results in convergence sign-off

### Medium-Priority Workflow Gaps

- [ ] **T062** [MEDIUM] Address T023 file count inconsistency: T023 summary reports "25+ guidelines" updated for WCAG 2.2 AAA but completion note shows "21 files". Audit WCAG updates across guidelines/; count actual files modified; reconcile discrepancy with commit 64a4649 evidence; update T023 completion notes with accurate file count and list
- [ ] **T063** [MEDIUM] Validate data integrity of T046 vs T024–T027: PR review identified T046 marked complete while T024–T027 remain blocked. T046 was task to "complete remaining G-document edits (T023–T027)"; completion claim conflicts with documented blocking state. Review T046 completion evidence; clarify whether T023 completion satisfies T046 or if full T024–T027 completion required; update task descriptions to resolve ambiguity
- [ ] **T064** [MEDIUM] Create convergence sign-off report: Consolidate all Phase 5 remediation into convergence sign-off section in checklists/requirements.md; record T055–T064 completion status; verify all 10 findings addressed; document execution date and evidence links; confirm Phase 2 readiness; obtain owner approval on sign-off before Phase 2 continuation

---

*Generated: 2026-10-25*  
*Specification**: [spec.md](./spec.md) | **Branch**: `docs/spec-003-guidelines-reconcile` | **Checklist**: [checklists/requirements.md](./checklists/requirements.md)
