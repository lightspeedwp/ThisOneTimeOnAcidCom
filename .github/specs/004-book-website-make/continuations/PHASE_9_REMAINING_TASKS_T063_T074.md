# Phase 9 Convergence Continuation — Tasks T063–T074

**Session**: Phase 9 Convergence (Remaining)  
**Branch**: `docs/spec-004-phase9-remaining` (create from `main`)  
**PR Strategy**: Create single PR after all tasks complete; mark as draft if awaiting review  
**Status**: Ready to execute T063–T074 (12 remaining tasks)  
**Completed**: T060–T062 (PR #630 merged or pending)  
**Date**: 2026-11-20

---

## Context: What Was Completed (T060–T062)

✅ **Phase 9 Convergence Work** (3 tasks, committed to `docs/spec-004-linear-sync-handoff`):

1. **T060**: Decision 7 route enforcement wording corrected across 5 files
   - Changed from: "Meta tags + Robots.txt + Sitemap"
   - Changed to: "Meta tags + Sitemap exclusion; no robots.txt Disallow"

2. **T061**: Execution-readiness claims reworded across 3 export files
   - Clarified: "Specification-ready (no blocking decisions); execution gated by spec.md Status gates"
   - Documented 5 open status gates

3. **T062**: All 7 blocking decisions recorded; Spec 005 handover documented
   - Decision resolutions: 1–7 all resolved (Decision 5 revised 2026-11-13)
   - Prompts 3A–3C transferred to Spec 005 ownership
   - Spec 004 scope: Prompts 1, 2A, 2B only

**PR #630**: Phase 9 Convergence (T060–T062)  
Link: https://github.com/lightspeedwp/ThisOneTimeOnAcidCom/pull/630

---

## Remaining Tasks: T063–T074 (12 tasks)

### Task Breakdown by Category

#### File Creation & Export Generation (T063–T065)

**T063**: Raise Prompt 2A preview completeness to 95%+ and re-score validation
- **Files to update/create**:
  - `checklists/prompt-preview-validation.md` — Re-score Prompt 2A from current to ≥95%
  - `contracts/prompt-2a-design-baseline.md` — Verify completeness (should be near 100%)
  - Create or link approved SC-003 scope change record
- **Acceptance**: Prompt 2A preview completeness ≥95%, re-scored in checklist
- **Notes**: This is about documentation completeness, not code. Check what's missing from the Prompt 2A specification and ensure it's documented.

**T064**: Create design export artifacts (or record descoping)
- **Files to create or link**:
  - `exports/design-baseline-validation.md` — Design baseline acceptance criteria validation
  - `exports/navigation-specification.md` — Navigation component spec (from Prompt 1)
  - `exports/design-baseline-acceptance-report.md` — Sign-off report
- **Acceptance**: Either create all 3 exports documenting approved design baseline, or record approved descoping decision with rationale
- **Notes**: Check if these exports should synthesize data from existing contract files or if they should reference contracts as source of truth

**T065**: Create implementation readiness exports (or record descoping)
- **Files to create or link**:
  - `exports/decisions-selected.md` — All 7 blocking decisions in decision-register format
  - `exports/implementation-readiness-checklist.md` — Checklist confirming all prerequisites met
  - `exports/preflight-analysis-final.md` — Final preflight report (gate 3)
  - `exports/workflow-completion-report.md` — Spec completion summary
- **Acceptance**: Either create all 4 exports documenting readiness state, or record approved descoping with rationale
- **Notes**: These may be synthesized from existing checklists and exports; check for duplication

#### Task Structuring & Closure (T066–T067)

**T066**: Close Prompt 3A–3C tasks and resolved decision-clarification tasks
- **What to do**:
  - Find and mark as [x] or close all T012–T027 and T022–T038 tasks (reader-access and decision-related)
  - Add handover notes explaining transfer to Spec 005
  - Link to Spec 005 spec.md where ownership continues
- **Files to update**: `tasks.md`
- **Acceptance**: All reader-access tasks (T012–T027, T022–T038, T045–T047) marked with handover notes
- **Notes**: This is about documenting why these tasks are ending; execution continues in Spec 005

**T067**: Disambiguate duplicate T014–T038 task sets and repoint dependencies
- **What to do**:
  - Identify and document why T014–T038 appears (should be single set)
  - Repoint all Phase 8 dependencies that reference T014–T038 to canonical set
  - Clean up duplicate numbering in `tasks.md`
- **Files to update**: `tasks.md`, any files cross-referencing tasks
- **Acceptance**: No duplicate task numbering; all dependencies point to single canonical set
- **Notes**: This may require comparing task lists across phases and merging duplicates

#### Status & Acceptance Gates (T068–T069)

**T068**: Mark Phase 8 "zero unresolved validation gaps" acceptance item unmet
- **What to do**:
  - Find Phase 8 completion checklist/acceptance criteria
  - Locate "zero unresolved validation gaps" item
  - Mark as ❌ unmet (since T067 reveals task duplication, Phase 8 acceptance is incomplete)
- **Files to update**: `tasks.md` or `checklists/` file holding Phase 8 acceptance
- **Acceptance**: Phase 8 "zero gaps" item marked unmet with note about T067 duplication
- **Notes**: This acknowledges that Phase 8 completion gates are still open pending T067 resolution

**T069**: Update spec.md and plan.md with resolved, handed-over state
- **Files to update**:
  - `spec.md` — Update Assumptions, Deliverables, Next Steps sections to reflect Spec 004 → Spec 005 handover
  - `plan.md` — Update Summary and Technical Context with Phase 9 resolution state
- **What to include**:
  - Spec 004 scope is now Prompts 1, 2A, 2B only
  - Prompts 3A–3C owned by Spec 005
  - All 7 blocking decisions resolved (link to LINEAR_SYNC_HANDOFF.md for details)
  - Execution gated by 5 status conditions in spec.md Status section
- **Acceptance**: spec.md and plan.md reflect final state (handed-over, reduced scope, all decisions resolved)
- **Notes**: This is the "as-built" documentation update

#### Content & Reference Updates (T070–T072)

**T070**: Replace `content/book/0N` source paths with `references/0N-*.md` paths
- **Files to update** (search and replace across):
  - `spec.md`
  - `plan.md`
  - `data-model.md`
  - `quickstart.md`
  - `source-file-inventory.md`
  - `version-reconciliation.md`
  - `checklists/` files
- **Replace pattern**:
  - From: `content/book/03-author-decisions-launch-scope.md`
  - To: `.github/specs/004-book-website-make/references/03-author-decisions-launch-scope.md`
- **Acceptance**: All references to `content/book/0N` updated to `references/0N` paths
- **Notes**: These are repository consolidation changes; `content/book/` folder is legacy

**T071**: Replace non-baseline colours or mark superseded
- **Files to check/update**:
  - `data-model.md` — Check for #1a1a1a, #d4a574, #ff6b6b, #8b0000
  - `exports/GATE_2_READINESS_REPORT.md` — Check colour references
  - `contracts/prompt-3a-reader-access.md` — Reader access colour guide
  - `contracts/prompt-3c-error-states.md` — Error state colour guide
- **Action**: Either replace with approved 9-color palette, or add note "Superseded by [approved palette reference]"
- **Acceptance**: No non-baseline colours remain without supersession note
- **Notes**: The approved baseline palette is documented in `plan.md` design section

**T072**: Relabel Decision 2 Option A as "session refresh" with 30-day expiry
- **Files to update**:
  - `contracts/prompt-3b-execution-guide.md` — Relabel recovery option
  - `checklists/blocking-decisions-validation.md` — Update decision 2 option description
- **Change from**: "30-day device lifecycle with recovery session refresh"
- **Change to**: "Session refresh with absolute 30-day expiry (rolling refresh cannot extend beyond 30 days from initial verification)"
- **Acceptance**: Decision 2 terminology consistent across both files
- **Notes**: This clarifies that recovery refresh doesn't extend the absolute expiry limit

#### Task Verification & Cleanup (T073–T074)

**T073**: Restate or close T045–T047 against merged PR #589 state
- **What to do**:
  - Find T045, T046, T047 entries in `tasks.md`
  - Check if they're still relevant after PR #589 decisions
  - Either restate them with updated context, or close them with resolution note
- **Files to update**: `tasks.md`
- **Acceptance**: T045–T047 either updated with new context or closed with rationale
- **Notes**: These tasks were created pre-PR #589; decisions may have resolved them

**T074**: Justify `staged/` directory in `plan.md` or archive it
- **What to do**:
  - Either: Add documentation to `plan.md` explaining why `staged/` subdirectory exists and what belongs there
  - Or: Move `staged/` contents to main spec directories and remove `staged/` folder
- **Files**: `plan.md` (add justification) OR archive `staged/` folder
- **Acceptance**: Either `staged/` is documented and justified in `plan.md`, OR it's removed and contents migrated
- **Notes**: The `staged/` folder contains prompts that are "ready but not yet approved for execution"; either keep it with clear governance, or flatten the structure

---

## Execution Strategy

### Branch & PR Workflow

1. **Create feature branch** from `main`:
   ```bash
   git checkout -b docs/spec-004-phase9-remaining main
   ```

2. **Execute tasks T063–T074** in order (some can be parallel):
   - **Sequential dependencies**: T066 → T067 → T068 (task structure cleanup)
   - **Parallel-safe**: T063, T064, T065, T069, T070, T071, T072, T073, T074

3. **Commit strategy**:
   - One commit per task (or group of closely-related tasks)
   - Use commit message format: `fix(spec-004): T063 — Raise Prompt 2A preview completeness to 95%+`
   - Include task ID in commit message for traceability

4. **Testing before commit**:
   - Validate branch name: `npm run validate:branch-name`
   - Run build check: `npm run build` (if relevant changes made)
   - Spot-check updated files for broken links or inconsistencies

5. **PR Creation** (after all tasks complete):
   ```bash
   git push -u origin docs/spec-004-phase9-remaining
   gh pr create --draft --title "refactor(spec-004): Phase 9 Convergence (T063–T074) — file exports, task closure, and state finalization"
   ```

### Key Files to Reference

- **spec.md** — Current specification state; update Assumptions, Deliverables, Next Steps
- **plan.md** — Technical context; update Summary and Technical Context sections
- **tasks.md** — Task list; mark T063–T074 as completed; close T012–T038 with handover notes
- **LINEAR_SYNC_HANDOFF.md** — Decisions documentation for reference
- **references/** — Source files for content migration (T070)
- **checklists/** — Quality validation; update as specs change
- **contracts/** — Prompt specifications; verify completeness (T063), update colors (T071), relabel decisions (T072)
- **exports/** — Export files to create or verify (T064, T065)

### Success Criteria

✅ **All 12 remaining tasks (T063–T074) completed and committed**  
✅ **spec.md and plan.md reflect final Spec 004 state**  
✅ **All 7 blocking decisions documented in exports**  
✅ **Task duplication resolved (T067)**  
✅ **Phase 8 acceptance gates updated (T068)**  
✅ **No broken cross-references or stale paths**  
✅ **Build succeeds after all changes**  
✅ **PR created and ready for review**

---

## Notes for Next Session

1. **T063–T065 may require judgment calls**: If export files would duplicate existing contract documentation, link to contracts instead of creating new files. Document this decision.

2. **T067 (task duplication) is critical**: This may reveal systemic issues with how tasks are numbered. Take time to understand the root cause before fixing.

3. **T069 is the "publication update"**: This is where Spec 004 is closed out as specification-complete-but-not-authorised-for-execution. Make sure the language is clear and final.

4. **T070 is mechanical but comprehensive**: Use find-and-replace carefully. Verify each replacement makes sense in context.

5. **After T074, Spec 004 should be in final state** ready for release (though not yet executable pending status gates). Consider whether a final "spec.md status = SPECIFICATION_FINAL" state needs to be declared.

---

## Commands Quick Reference

```bash
# Start the branch
git checkout -b docs/spec-004-phase9-remaining main

# Validate branch name
npm run validate:branch-name

# Build check
npm run build

# Commit a task
git add .github/specs/004-book-website-make/
git commit -m "fix(spec-004): T063 — Raise Prompt 2A preview completeness to 95%+"

# Push branch
git push -u origin docs/spec-004-phase9-remaining

# Create PR (after all tasks)
gh pr create --draft --title "refactor(spec-004): Phase 9 Convergence (T063–T074) — file exports, task closure, and state finalization"
```

---

**Next Chat Prompt**: See PHASE_9_CONTINUATION_PROMPT.txt for quick-start version.
