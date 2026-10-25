---
title: "Tasks: Guidelines Refactor (TOA-358)"
spec_id: "003"
feature: "guidelines-refactor"
status: "Phase 2B Blocked Pending Approval"
created: "2026-10-25"
---

# Tasks: Guidelines Refactor (TOA-358)

**Specification**: [spec.md](./spec.md) | **Plan**: [plan.md](./plan.md) | **Checklist**: [checklists/requirements.md](./checklists/requirements.md)

**Status**: Phase 2B — **BLOCKED** pending T017 `locked-files-guard` approval; owner decisions D0–D8 are recorded in requirements.md.

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

## Phase 2: Implementation — Approval Pending

**Decision Status** (2026-10-25): All owner decisions D0–D8 are recorded as RESOLVED in `checklists/requirements.md` with implementation guidance. Decision resolution does not supply T017 protected-file approval:
1. ✅ All gates D0–D8 have gate headings with RESOLVED status and recorded evidence
2. ✅ All guidance items for D4, D5, D6 have recorded answers in requirements.md
3. Phase 2B remains **BLOCKED** until T017 `locked-files-guard` approval is recorded

**Pre-Implementation Verification** — T003 remains open (2026-10-25):

- [x] **T001** Confirm all owner decisions (D0–D8) recorded with evidence in `checklists/requirements.md` — ✅ All 9 gates RESOLVED
- [x] **T002** Verify source hashes: Compare 116 guidelines against baseline commit `b7c3c4413f5fc7ed2e73a50ca7462d45a8e2e1b9` — ✅ 116 files verified; inventory consistent
- [ ] **T003** Validate branch `docs/spec-003-phase2-implementation` is clean and up-to-date with `develop` — 2026-10-25 rerun: name valid; 0 behind, 9 ahead; target checkout cleanliness remains unverified.
  - Target follows current spec.md and D7; `docs/spec-003-guidelines-reconcile` is superseded.
  - `npm run validate:branch-name -- --branch docs/spec-003-phase2-implementation` passed (exit 0).
  - After `git fetch --no-tags origin develop`, `git rev-list --left-right --count origin/develop...origin/docs/spec-003-phase2-implementation` returned `0 9` (exit 0); `git merge-base --is-ancestor origin/develop origin/docs/spec-003-phase2-implementation` passed (exit 0).
  - Compared target `bb5888cf4681ed40402b2fc0b05d1366f109f4ad` with `develop` at `6fa38aaa02e70650190f5b2e95d0991acbb694c8`. This sandbox uses assigned branch `coderabbit/reconcile-validation-evidence/d8242bd6`; rerun on the target checkout and record cleanliness before closing T003.
- [x] **T004** [P] Prepare the repository-local `validate-phase1.sh` script as described in `quickstart.md`, then run it from the repository root: `cd .github/specs/003-refactor-guidelines && bash ./validate-phase1.sh` — ✅ Phase 1 artifact validation passed; T017 approval remains pending

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

- [x] **T008** [P] Edit `.claude/skills/INVENTORY.md` — Update inventory per consolidation results; preserve existing links
- [x] **T009** [P] Edit `.claude/skills/branch-validation/SKILL.md` — Preserve all validation rules; update paths if consolidated
- [x] **T010** [P] Edit `.claude/skills/changelog/SKILL.md` — Preserve format spec; update examples if needed
- [x] **T011** [P] Edit `.claude/skills/labeling/SKILL.md` — Preserve label taxonomy; update references if consolidated
- [x] **T012** [P] Edit `.claude/skills/test/SKILL.md` — Preserve test patterns; update guideline references per D4
- [x] **T013** [P] Edit `.claude/skills/validate/SKILL.md` — Preserve validation rules; update file paths per consolidation
- [x] **T014** [P] Edit `.claude/skills/workflow-orchestration/SKILL.md` — Preserve workflow patterns; update dependency paths
- [x] **T015** [P] Edit `AGENTS.md` — Update agent role descriptions; preserve all governance sections per constitution
- [x] **T016** [P] Edit `CONTRIBUTING.md` — Update contributor guidelines; preserve all rules and preserve branch patterns

### S-Documents: Approval & Commit

- [ ] **T017** Obtain `locked-files-guard` approval for all S-document edits per D0
- [x] **T018** Stage and commit S-documents: `git add .claude/skills/ AGENTS.md CONTRIBUTING.md && git commit -m "refactor(003): Update protected supporting documents per consolidation"` ✓ Commit edb647c

---

## Phase 2B: G-Documents (116 Guidelines)

**Purpose**: Edit 116 existing guidelines per preservation rules; no moves/deletes without approval.

**Blocking**: T017 `locked-files-guard` approval is not recorded. Scope confirmation and D1–D3 decision inputs do not grant protected-file approval.

### G-Document Inventory & Validation

- [x] **T019** Verify 116 guidelines inventory: `find guidelines -type f -name "*.md" | wc -l` → expect 116 ✓ Verified 116 files
- [ ] **T020** Generate coverage manifest: Create table in `checklists/requirements.md` § Coverage Manifest with columns: ID, path, operation, destination, status — Per-file hashes are saved in [T021 baseline manifest](./validation-reports/T021-baseline.sha256); coverage table remains pending in requirements.md
- [x] **T021** [P] Hash validation per file: For each G-document, compute SHA-256 hash and compare vs baseline; document any changes ✓ 116 files verified unchanged against the Git baseline; see [T021 evidence](./validation-reports/T021-hash-validation.md). T017 approval remains pending

### G-Document Edit Operations

**Edits require recorded T017 approval and the applicable D1–D5 decisions. Phase 2B remains blocked pending approval:**

#### Category 1: Copy Alignment (depends on D1)

- [ ] **T022** [P] Edit guidelines with D1-dependent copy changes: Files per D1 decision list
  - Review identity/voice requirements from D1
  - Update copy while preserving technical content
  - Preserve all safeguards and author attribution
  - Example files: `guidelines/Guidelines.md`, content-related files per D1

#### Category 2: Design & Accessibility (depends on D3)

- [ ] **T023** [P] Edit guidelines with design/accessibility corrections: Files per D3 decision list
  - Apply approved design authority corrections (palette, spacing, typography)
  - Update accessibility target per D3
  - Preserve existing component/token definitions
  - Example files: `guidelines/design-tokens/`, `guidelines/components/`

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

## Notes

- Each task ID (T001–T043) is sequential and corresponds to execution order
- [P] tasks can run in parallel with other [P] tasks in the same phase
- No tests are included in this phase (Phase 2 is implementation only; verification happens in Phase 3)
- Tasks are specification-driven and gated on owner decisions; no ad hoc changes
- Estimate: ~29–41 hours total per plan.md § Timeline Estimate

---

*Generated: 2026-10-25*  
*Specification**: [spec.md](./spec.md) | **Branch**: `docs/spec-003-guidelines-reconcile` | **Checklist**: [checklists/requirements.md](./checklists/requirements.md)
