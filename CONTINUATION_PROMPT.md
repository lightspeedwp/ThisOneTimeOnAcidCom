# Continuation Prompt: Spec 004 Phase 9 Convergence Execution

**Branch**: `docs/spec-004-linear-sync-handoff`  
**Session Context**: Resuming Phase 9 Convergence (T060-T074) execution  
**Date**: 2026-11-19  
**Status**: Ready for implementation

## Background

This ThisOneTimeOnAcidCom repository is working on **Spec 004: Book Website Figma Make Prompt Pack** — a documentation-only specification package with no code implementation.

### Completed Work (Previous Session)

1. ✅ **Linear Sync Hand-off Executed** (PR #589, Nov 19)
   - Part A: Updated 2 Linear documents (A1 v1.0.0→v1.0.1, A2 v1.0.4→v1.0.5)
   - Part B: Documented 5 decisions (B1-B5) and flagged 30-day recovery ceiling conflict
   - GitHub Issue #616 created for tracking

2. ✅ **Convergence Assessment Completed**
   - Phase 9 Convergence (T060-T074) is comprehensive and sufficient
   - All gaps from Linear sync are properly captured in Phase 9 tasks
   - 100% requirements coverage confirmed
   - No Phase 10 needed

3. ✅ **Specification Analysis Complete**
   - Zero critical issues identified
   - Phase 9 addresses all identified gaps
   - Ready to proceed with implementation

4. ✅ **Partial Execution Started**
   - T060 (partial): Decision 7 wording corrected in `contracts/prompt-1-navigation-exposure.md`
   - Commit: `01ff63f` - T060 (partial) corrections pushed

### Current State

**Files Modified**:
- `.github/specs/004-book-website-make/contracts/prompt-1-navigation-exposure.md` (1/5 files for T060 updated)

**Remaining Phase 9 Tasks** (15 total):
- T060 (4 more files): PROMPT_EXECUTION_PLAN.md, exports/GATE_2_SIGN_OFF_SUMMARY.md, exports/GATE_2_READINESS_REPORT.md, checklists/blocking-decisions-validation.md
- T061-T074: Path updates, version updates, artifact creation, task disambiguation

**Branch Status**:
- Branch: `docs/spec-004-linear-sync-handoff`
- Validation: ✅ Passes `npm run validate:branch-name`
- Working tree: Clean (no uncommitted changes)
- Remote: Tracked and up-to-date

## Task: Execute Phase 9 Convergence

**Goal**: Complete all 15 Phase 9 tasks (T060-T074) to close gaps from Linear sync and prepare for final specification approval.

**Priority Order**:
1. **CRITICAL** (T060-T062, T069): Resolve contradictions from Linear sync
   - T060: Replace Decision 7 stale wording across 5 files
   - T061: Reword "Ready to Execute" claims 
   - T062: Record resolved Decisions 1-7 and handover
   - T069: Update spec.md and plan.md to resolved state

2. **HIGH** (T070-T074): Reference and content corrections
   - T070: Replace content/book/ paths with references/ paths
   - T071: Replace non-baseline colours
   - T072: Relabel Decision 2
   - T073: Restate/close T045-T047
   - T074: Justify/archive staged/ directory

3. **MEDIUM** (T063-T068): Artifact creation and disambiguation
   - T063: Raise Prompt 2A completeness to 95%+
   - T064: Create design-baseline validation artifacts
   - T065: Create implementation-readiness artifacts
   - T066: Close Prompt 3A-3C tasks
   - T067: Disambiguate duplicate task sets
   - T068: Mark Phase 8 acceptance unmet

## Execution Instructions

### For New Session

```bash
# Start fresh chat with:
cd /home/user/ThisOneTimeOnAcidCom
git checkout docs/spec-004-linear-sync-handoff
npm run validate:branch-name  # Should pass ✅

# Then invoke:
/speckit-implement
```

**Expected Flow**:
1. `/speckit-implement` will load tasks.md from Spec 004
2. It will recognize Phase 9 Convergence tasks
3. Execute them systematically in priority order
4. Mark each as [X] when complete
5. Commit changes after each logical group

### Key Files to Update

**Decision 7 Updates** (T060):
- Locations: 5 files need "Meta tags + Robots.txt + Sitemap" → "noindex meta tags + sitemap exclusion (no robots.txt Disallow)"
  - contracts/prompt-1-navigation-exposure.md ✅ (partial)
  - PROMPT_EXECUTION_PLAN.md
  - exports/GATE_2_SIGN_OFF_SUMMARY.md
  - exports/GATE_2_READINESS_REPORT.md
  - checklists/blocking-decisions-validation.md

**Spec/Plan Updates** (T069):
- spec.md: Update Linear document version references (v1.0.4 → v1.0.5 for 02-companion-session-plan.md)
- plan.md: Same version updates
- Both: Add notes about Linear sync hand-off and Decisions 1-7 resolution

**Path Updates** (T070):
- Replace `content/book/` with `references/` across:
  - spec.md
  - plan.md
  - data-model.md
  - quickstart.md
  - source-file-inventory.md
  - version-reconciliation.md
  - checklists/

**Artifact Creation** (T064-T065):
- Create exports/design-baseline-validation.md
- Create exports/navigation-specification.md
- Create exports/design-baseline-acceptance-report.md
- Create exports/decisions-selected.md
- Create exports/implementation-readiness-checklist.md
- Create exports/preflight-analysis-final.md
- Create exports/workflow-completion-report.md

## Checklist Status

⚠️ **Note**: 2 items in `specification-quality.md` are unchecked, but proceeding has been approved.

## Verification After Phase 9

After completing all Phase 9 tasks:

```bash
# Run final convergence check
/speckit-converge

# Expected result: ✅ Converged - all spec/plan/tasks aligned
# Then: Ready for PR review and merge to main
```

## Post-Execution Steps

1. ✅ All Phase 9 tasks complete (T060-T074 marked [X])
2. ⏳ Final convergence verification
3. ⏳ Create PR from `docs/spec-004-linear-sync-handoff` to `main`
4. ⏳ PR title: "docs: Phase 9 Convergence - Linear sync hand-off and specification alignment"
5. ⏳ Merge to main
6. ⏳ Delete feature branch

## Questions or Issues

If you encounter blockers during Phase 9 execution:
- Check the specific task description in tasks.md (T060-T074)
- Reference LINEAR_SYNC_HANDOFF.md for exact changes needed
- Run `/speckit-analyze` to verify spec/plan alignment
- Run `/speckit-converge` to validate before each commit

---

**Branch Validation**: ✅ docs/spec-004-linear-sync-handoff  
**Last Commit**: 01ff63f - T060 (partial) corrections  
**Token Context**: Fresh session recommended (previous session at token limit)
