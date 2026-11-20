# Phase 9 Convergence: Remaining Tasks T063–T074

**Branch**: `docs/spec-004-phase9-remaining`  
**Completed**: PR #630 (T060–T062)  
**Remaining**: 12 tasks (T063–T074)  
**Status**: ⏳ In Progress  

---

## Context: What T060–T062 Completed

✅ **T060**: Decision 7 route enforcement wording corrected (meta tags, robots.txt, sitemap exclusion)  
✅ **T061**: Execution authorization gates clarified (gated by 5 spec.md status conditions)  
✅ **T062**: All 7 blocking decisions documented; Spec 005 handover recorded  

**Key state change**: Reader-access work (Prompts 3A–3C) now owned by Spec 005; Spec 004 hands over its stage IDs to the master contract.

---

## Remaining Tasks: T063–T074

### T063: Raise Prompt 2A Preview Completeness to ≥95%

**Purpose**: Validate that Prompt 2A (Design System Baseline) meets minimum viable completeness threshold.

**Current state** (from implementation-readiness-checklist.md):
- Prompt 2A: ~89% completeness
- Target: ≥95%
- Gap: Error handling and CSS variable edge cases

**What to do**:
1. Read `.github/specs/004-book-website-make/contracts/prompt-2a-design-baseline.md`
2. Identify missing sections (error scenarios, unhandled states, missing themes)
3. Add placeholder or complete sections to reach 95%
4. Re-score the validation checklist in `exports/implementation-readiness-checklist.md`

**Deliverable**: Prompt 2A ≥95% complete; checklist updated with new score and date  
**Effort**: 30 min  
**Blocking**: No other tasks  

---

### T064: Create Design Export Artifacts (or Record Descoping)

**Purpose**: Decide whether Spec 004 owns design export artifacts or whether they belong to Spec 005.

**Decision needed**:
> **Should Spec 004 create design export outputs (CSS/JSON/Figma tokens)?**
> - Option A: Yes — create `exports/design-tokens.json` and `exports/design-tokens.css` as reference exports from Prompt 2A
> - Option B: No — descope; Spec 005 owns design exports; record that decision here and move on
> - Option C: Create placeholder/stub only; full exports come from Spec 005

**What to do** (varies by decision):

**If Option A**: Create two files:
- `exports/design-tokens.json` — JSON token format matching Prompt 2A approved baseline
- `exports/design-tokens.css` — CSS variables version of same tokens

**If Option B or C**: Create a note in `exports/DESCOPING_RATIONALE.md` explaining:
- Why design exports don't stay in Spec 004
- Where they will be generated instead
- Link to Spec 005 ownership

**Deliverable**: Either design token files OR descoping rationale; dated and signed  
**Effort**: 1 hour (Option A) or 15 min (Option B/C)  
**Blocking**: T065  

---

### T065: Create Readiness Exports (or Descope)

**Purpose**: Decide whether Spec 004 or Spec 005 owns implementation-readiness outputs.

**Decision needed**:
> **What readiness artifacts stay in Spec 004?**
> - Option A: Keep all (design readiness + reader access readiness) in Spec 004; create unified `READINESS_MANIFEST.md`
> - Option B: Move reader-access readiness to Spec 005; keep only design readiness in Spec 004
> - Option C: Create a "readiness handoff" document explaining what stays/goes where

**What to do** (varies by decision):

**If Option A**: 
- Create `exports/READINESS_MANIFEST.md` listing all readiness outputs
- Keep existing checklists; add reference to Spec 005 reader readiness

**If Option B**:
- Identify which checklists belong to reader access; mark for Spec 005 migration
- Create migration document explaining the split
- Keep design-only checklists in Spec 004

**If Option C**:
- Create `exports/READINESS_HANDOFF.md` explaining:
  - What's ready now (design, Prompts 1/2A/2B)
  - What moves to Spec 005 (reader access readiness)
  - Handoff timeline

**Deliverable**: Readiness manifest/handoff/split document with clear ownership  
**Effort**: 1 hour  
**Blocking**: T066, T069  

---

### T066: Close Prompt 3A–3C Tasks with Handover Notes to Spec 005

**Purpose**: Mark reader-access prompt tasks as "moved to Spec 005" with handover notes.

**Current state**:
- T015 (Prompt 3A execution) marked BLOCKED in tasks.md
- T025, T026 (Prompts 3B/3C) marked BLOCKED
- These tasks are now Spec 005 responsibility

**What to do**:
1. Update `tasks.md`:
   - Change T014–016 status from BLOCKED to MOVED_TO_SPEC_005
   - Change T025–027 status from BLOCKED to MOVED_TO_SPEC_005
   - Add note: "See Spec 005 (reader-access) for execution and completion"

2. Create `exports/SPEC_004_TO_005_HANDOVER.md` with:
   - Which tasks moved (T014–016, T025–027)
   - Which contracts stay in Spec 004 (1, 2A, 2B for reference)
   - Which contracts move to Spec 005 (3A, 3B, 3C full ownership)
   - Timeline for Spec 005 completion

**Deliverable**: Updated tasks.md + handover document  
**Effort**: 30 min  
**Blocking**: T067, T069  

---

### T067: Disambiguate Duplicate T014–T038 Task Sets

**Purpose**: Identify if there are duplicate/overlapping tasks and consolidate.

**Question to clarify**:
> **Are there duplicate task definitions in tasks.md that should be consolidated?**

**What to do**:
1. Read through all of tasks.md tasks T014–T038
2. Identify any duplicates or near-duplicates
3. For each duplicate pair:
   - Decide: Keep one and archive the other, or merge both into one clearer task
   - Document the decision in `exports/TASK_CONSOLIDATION_LOG.md`

4. Update task numbering if needed (or accept the gaps)

**Deliverable**: Consolidated task list in tasks.md + consolidation log  
**Effort**: 1 hour  
**Blocking**: None (can run parallel)  

---

### T068: Mark Phase 8 "Zero Gaps" Acceptance Item Unmet

**Purpose**: Formally acknowledge that Phase 8 completion criteria for "zero gaps" was not met.

**Context**: Phase 8 had an acceptance item "zero gaps in specification" that should be marked as not fully satisfied (reader-access work moved to Spec 005).

**What to do**:
1. Find Phase 8 completion checklist (likely in `exports/` or referenced in PROMPT_EXECUTION_PLAN.md)
2. Locate the "zero gaps" acceptance criterion
3. Mark it as:
   - ⚠️ PARTIALLY_MET — Design baseline has zero gaps; reader access moved to Spec 005 (not a gap, a scope change)
4. Document reason in `exports/PHASE_HISTORY.md`:
   - What was the criterion
   - Why it's not fully met
   - How the scope change explains it

**Deliverable**: Updated Phase 8 checklist + phase history document  
**Effort**: 20 min  
**Blocking**: None  

---

### T069: Update spec.md and plan.md with Spec 004 → Spec 005 Handover State

**Purpose**: Formally update the two main specification documents to reflect the reader-access handover.

**Current gaps**:
- spec.md mentions reader access but now it's Spec 005 responsibility
- plan.md references Prompts 3A–3C but doesn't clarify they're no longer executed here

**What to do**:
1. **Update spec.md**:
   - Find "User Story 2 - Reader Access" section
   - Add note: `⚠️ Moved to Spec 005. Reader access specification and execution now owned by [Spec 005](../005-reader-access/spec.md). Stage IDs 3A–3C remain here for reference only.`
   - Update Status field to clarify handover

2. **Update plan.md**:
   - Find "Figma Make Integration" section
   - Add: `Prompts 3A–3C execution moved to Spec 005; this spec owns design baseline (Prompts 1–2B) only`
   - Update project structure diagram to show 3A–3C removed

3. **Add handover table** to both:
   | Item | Owner (Spec 004) | Owner (Spec 005) | Note |
   | --- | --- | --- | --- |
   | Prompt 1 (Navigation) | ✅ | — | Design baseline |
   | Prompt 2A (Design System) | ✅ | — | Design baseline |
   | Prompt 2B (Navigation Design) | ✅ | — | Design baseline |
   | Prompt 3A (Reader Copy) | — | ✅ | Moved 2026-11-13 |
   | Prompt 3B (Recovery) | — | ✅ | Moved 2026-11-13 |
   | Prompt 3C (Error States) | — | ✅ | Moved 2026-11-13 |

**Deliverable**: Updated spec.md and plan.md with handover clarity + ownership table  
**Effort**: 1 hour  
**Blocking**: T070, T071, T072  

---

### T070: Replace content/book/0N Paths with references/0N Paths

**Purpose**: Update all references from old `content/book/` file locations to new `references/` locations.

**Context**: Spec 004 moved source documents from `content/book/` to `.github/specs/004-book-website-make/references/`.

**What to do**:
1. Search all files in `.github/specs/004-book-website-make/` for `content/book/`
2. For each occurrence, replace with `references/`
   - `content/book/01-book-website-specification.md` → `references/01-book-website-specification.md`
   - `content/book/02-companion-session-plan.md` → `references/02-companion-session-plan.md`
   - etc.

3. Verify no broken links remain
4. Document the migration in `exports/PATH_MIGRATION_LOG.md`:
   - Files moved
   - Date of migration
   - Verification that all references updated

**Deliverable**: All paths updated + migration log  
**Effort**: 30 min  
**Blocking**: None  

---

### T071: Replace Non-Baseline Colors or Mark Superseded

**Purpose**: Audit color usage and ensure only approved 9-color baseline is used (or candidates explicitly marked as unapproved).

**Approved baseline**:
- #0B0B10, #12121A, #171722 (darkest)
- #F6F2EB, #CFC7BB, #9C9488 (warm neutrals)
- #FF3AAE, #F4FF3C, #8A63FF (accents)

**Candidates** (unapproved, must be marked):
- R3, T1, RT2, C1 (from design brief)

**What to do**:
1. Search all spec files and contracts for color hex values
2. For each color found:
   - If in baseline: ✅ keep as-is
   - If not in baseline and not a candidate: ❓ REVIEW — why is this here?
   - If a candidate (R3/T1/RT2/C1): Mark as "UNAPPROVED — Candidate R3" (etc.)

3. Create `exports/COLOR_AUDIT.md`:
   - All colors found with locations
   - Which are baseline, which are candidates, which are "to review"
   - Decision on each non-baseline color

**Deliverable**: Color audit + fixes (replace or mark)  
**Effort**: 1 hour  
**Blocking**: None  

---

### T072: Relabel Decision 2 Option A as "Session Refresh with Absolute 30-Day Expiry"

**Purpose**: Clarify Decision 2 (recovery lifetime) selected wording.

**Current state**: Decision 2 (Option A selected) says "Recovery codes valid for X" but doesn't clarify the "absolute expiry" vs "sliding window" distinction.

**What to do**:
1. Find Decision 2 documentation in `research.md`
2. Update Option A label from something vague to:
   - `Option A: Session refresh with absolute 30-day expiry (no extension; fresh code required after 30 days)`

3. Update any references to this decision in:
   - spec.md
   - plan.md
   - contracts/prompt-3b-recovery-flows.md (if still referenced for context)

4. Verify no ambiguity remains

**Deliverable**: Decision 2 wording clarified and updated everywhere  
**Effort**: 20 min  
**Blocking**: None  

---

### T073: Restate or Close T045–T047 Against PR #589 Decisions

**Purpose**: Review tasks T045–T047 and confirm they're addressed by PR #589 decisions.

**Context**: PR #589 made decisions (B1–B5) that may have resolved or invalidated earlier tasks T045–T047.

**What to do**:
1. Find T045, T046, T047 in `tasks.md`
2. For each task:
   - Read its requirement
   - Check if PR #589 decisions (B1–B5 in LINEAR_SYNC_HANDOFF.md) addressed it
   - If yes: Mark task as ✅ CLOSED (satisfied by PR #589)
   - If no: Keep task; ensure it's clear what still needs doing
   - If changed: Restate the task with new wording

3. Document the mapping in `exports/TASK_STATUS_BY_PR_589.md`:
   - T045: Addressed by [Decision B#]
   - T046: Addressed by [Decision B#]
   - T047: Addressed by [Decision B#]

**Deliverable**: Tasks restated/closed + status document  
**Effort**: 30 min  
**Blocking**: None  

---

### T074: Justify staged/ Directory in plan.md or Archive It

**Purpose**: Clarify the purpose of the `staged/` subdirectory or archive/remove it if no longer needed.

**Current state**: `.github/specs/004-book-website-make/staged/` directory exists but its purpose may be unclear.

**Decision needed**:
> **What is the `staged/` directory for, and should it stay?**
> - Option A: Keep it; document its purpose (interim/draft files, staged Figma Make outputs?)
> - Option B: Archive it (move to `archived/` or delete if empty)
> - Option C: Repurpose it (rename to something clearer like `exports-draft/` or `figma-make-outputs/`)

**What to do**:

**If Option A (Keep)**:
1. Document in `plan.md` under "Project Structure":
   - What goes in `staged/`
   - Lifecycle (interim → finalized → exported)
   - Current contents

**If Option B (Archive)**:
1. Move `staged/` to `archived/staged-backup/` OR delete if empty
2. Document migration in `exports/DIRECTORY_MIGRATION.md`

**If Option C (Repurpose)**:
1. Rename `staged/` to new name
2. Update all references in plan.md, spec.md, etc.
3. Document migration

**Deliverable**: Updated plan.md with `staged/` justification/migration documented  
**Effort**: 20 min  
**Blocking**: None  

---

## Execution Order & Dependencies

**Priority 1 (No dependencies)**:
- T063 (Prompt 2A completeness)
- T067 (Disambiguate duplicates)
- T068 (Mark Phase 8 unmet)
- T070 (Path migration)
- T071 (Color audit)
- T072 (Decision 2 wording)
- T073 (Restate T045–T047)
- T074 (Staged directory)

**Priority 2 (Depends on decisions)**:
- T064 (Design exports) — wait for decision
- T065 (Readiness exports) — wait for decision
- T066 (3A–3C handover) — depends on T064–T065 decisions
- T069 (spec.md/plan.md update) — depends on T064–T065, T070–T072

**Suggested sequence**:
1. Run all Priority 1 tasks in parallel (8 tasks, ~4–5 hours total)
2. Make decisions on T064–T065 (30 min discussion)
3. Run Priority 2 tasks (2–3 hours total)
4. Verify spec.md/plan.md consistency

**Total effort**: 7–9 hours (including user decision time)

---

## Success Criteria

✅ **Phase 9 complete when**:
1. All 12 tasks (T063–T074) marked DONE
2. No "unresolved" or "TODO" markers remain in spec.md, plan.md, tasks.md
3. All handover documents created (T066, T069)
4. No broken internal links
5. All decisions relabeled clearly (T072)
6. Spec 005 ownership unambiguous

---

## Notes

- **Learning mode principle**: Key decisions (T064–T065, T074) are flagged for user input; I won't assume defaults.
- **No code, commits, or deployments**: This phase is documentation-only, like all previous Spec 004 work.
- **Handover focus**: Phase 9 emphasizes clarity for the Spec 005 reader-access team and future reference.

