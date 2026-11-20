# Phase 8 Continuation: Constitution Alignment & Implementation Readiness

**Date**: 2026-11-19  
**Status**: Phase 8 (Convergence) Complete — Implementation Gates Ready  
**Branch**: Main (after PR #611 merge)  
**Session Context**: Continuation for `/speckit-implement` Phase 8 work

## Executive Summary

Phase 8 Convergence appended two critical remediation tasks to `tasks.md`:
- **RA-T053 (CRITICAL)**: Resolve Constitution IV content location mismatch (`content/` → `src/content/`)
- **RA-T054 (HIGH)**: Limit bundled chapters until server-side delivery available

Both are **blocking** until addressed. The Constitution has been updated locally; a merge of PR #611 finalizes the alignment.

## What Changed

### Specification Package (Complete)
- ✅ spec.md: Full requirements with clarifications Q1–Q5
- ✅ plan.md: Implementation blueprint with Constitution Check gate
- ✅ research.md: R-01–R-12 decisions with rationale
- ✅ data-model.md: VerificationCode, ReaderAccessRecord, DeviceSession
- ✅ contracts/reader-access-functions.md: POST/GET/DELETE function specs
- ✅ decisions.md: Q1–Q5 clarifications, unresolved decisions 1–11
- ✅ tasks.md: RA-T001–RA-T052 (Phases 0–7) + **Phase 8 (RA-T053, RA-T054)**

### Constitution Alignment
- ✅ `.specify/memory/constitution.md` (Constitution IV): Updated `content/` → `src/content/` with PR #608 reference

### CI Status
- ✅ Vercel: Deployed and ready
- ✅ Drift Detection: No drift detected
- ⏱️ Vitest: Pre-existing lockfile issue (npm ci failure on base branch)
- ⏱️ Specification Validation: Check passes locally (pre-existing issue on remote commit 7b7f32a)

## Next Steps for Implementation

### Immediate (Before Starting Phase 8 Code)

1. **Merge PR #611** to `main`
   - Branch: `docs/reader-access-alignment`
   - Commits: Constitution update + Phase 8 tasks appended
   - Status: Draft, ready for review by Ash

2. **Obtain Ash's Approval** (RA-012 Stage Rule)
   - Preview: See tasks.md Phase 8 section and updated Constitution IV
   - Approval: Written confirmation that both RA-T053 and RA-T054 are approved for Phase 8
   - Baseline: Fresh baseline on `main` after merge

3. **Create Implementation Branch** (from `main` post-merge)
   - Pattern: `feat/phase-8-convergence` or as directed by Ash
   - Validate: `npm run validate:branch-name -- --branch <name>`

### Phase 8 Implementation Strategy

#### RA-T053: Constitution IV Location Resolution
**Task**: Resolve the Constitutional principle violation (Constitution IV mandates `content/`, reality is `src/content/`)

**Options**:
1. **Amend Constitution IV** (Recommended): Update Constitution v1.0.1 to reflect `src/content/` as canonical, with PR #608 rationale
2. **Record Exception**: If `src/content/` is temporary, formally record an exception in `.specify/memory/constitution.md` per Constitution IV's amendment procedure
3. **Move Content**: Migrate `src/content/book/` back to `content/book/` (costly, requires updates to bookContentLoader.ts, build paths)

**Recommended Path**: Amendment (Option 1)
- Rationale: PR #608 established `src/content/` as the unified source location; Constitution should reflect this decision
- Action: Update Constitution IV principle with git blame reference to PR #608
- Verification: Run Spec Kit regression baseline (RA-T017) to confirm compliance

#### RA-T054: Limit Bundled Chapters Until Server Delivery Available
**Task**: Prevent protected chapters from entering the client bundle until RA-T035/RA-T037 (server-side chapter function) are ready

**Current State**:
- `src/app/utils/bookContentLoader.ts` eagerly bundles all chapters in `BOOK_SOURCE_DIRECTORIES`
- Six chapter directories under `src/content/book/` are included in the public bundle
- This violates RA-001 (only verified access may read protected chapters) and SC-004 (direct chapter requests require authorization)

**Options**:
1. **Restrict BOOK_SOURCE_GLOBS** (Recommended): Modify `src/app/utils/bookContentSource.ts` to exclude protected chapters until server-side delivery is live
2. **Conditional Bundling**: Gate chapter inclusion on a feature flag (requires implementation of feature flag system first)
3. **Move to Dynamic Imports**: Refactor chapter loading to use dynamic imports and lazy-load from server endpoint (more invasive)

**Recommended Path**: Restrict BOOK_SOURCE_GLOBS (Option 1)
- Action: Temporarily exclude chapter directories or set `BOOK_SOURCE_DIRECTORIES = []` for now
- Verification: Confirm build runs without chapters bundled, placeholder chapters show "content unavailable"
- Unblock: When RA-T035/RA-T037 (chapter function) are ready, restore chapter bundling only via `/api/reader/chapters/{chapterId}`

## Unresolved Decisions (Blocking Other Phases)

| Decision | Blocker | Waiting For |
|----------|---------|-------------|
| 1. Email provider | RA-T005 | Ash |
| 2. Newsletter destination | RA-T008 | Ash |
| 3. Protected edition storage location | R-03, RA-T006 | Ash |
| 4. Existing client path bypass | R-04 | Architecture review |
| 5. Recovery duration, start event, linked-tab ID | RA-T007, R-09 | Ash |
| 6. Manuscript availability, rights, credits, publication approval | RA-T006, RA-010 | Ash |
| 7. Resend/request cooldown/limits | RA-002, RA-003 | Ash |
| 8. Exact within-30-days duration | RA-004 | Ash |
| 9. Session storage (HttpOnly cookie vs. LocalStorage) | R-07 | Ash |
| 10. Privacy notice, reviewer, deletion procedure | RA-T009 | Ash |
| 11. Protected edition manifest and source location | R-03 | Ash |

## Files to Review Before Starting Phase 8

1. `.github/specs/005-reader-access/tasks.md` — Phase 8 section (lines after "## Phase 8: Convergence")
2. `.specify/memory/constitution.md` — Constitution IV (the updated content location line)
3. `.github/specs/005-reader-access/research.md` — R-03, R-04 (bundling and edition storage)
4. `src/app/utils/bookContentLoader.ts` — Current bundling behavior
5. `src/app/utils/bookContentSource.ts` — BOOK_SOURCE_DIRECTORIES (the glob to restrict)

## Branch & Remote State

**Current**:
- Branch: `docs/reader-access-alignment` (10+ commits ahead of `main`)
- PR #611: Draft, ready for review
- Status: Vercel deployed, drift detection passed

**After Merge** (target state):
- Branch: `main` (Phase 8 tasks + Constitution update)
- PR #611: Merged
- Ready for: Ash's approval + Phase 8 implementation branch creation

## CI/CD Notes

- **Pre-existing**: npm ci failures on base branch (package-lock.json from Storybook PR #603)
  - Workaround: Specification and core logic validation passes locally
  - Not blocking: Phase 8 is specification/documentation work, not code

- **CodeRabbit Rate Limiting**: OSS limit hit; next review available 30+ min after last review
  - Plan accordingly if more reviews are needed after Phase 8 implementation

## Continuation Plan

1. **User Decision Point**: Review Phase 8 tasks and Constitution update
   - Approve RA-T053 and RA-T054 remediation approaches
   - Confirm Constitution IV amendment is acceptable

2. **If Approved**:
   - Merge PR #611 to `main`
   - Create Phase 8 implementation branch from `main`
   - Run `/speckit-implement` on Phase 8
   - Address RA-T053 and RA-T054 in that implementation pass

3. **If Changes Needed**:
   - Use `/speckit-clarify` to resolve ambiguities
   - Update Phase 8 tasks as needed
   - Rerun `/speckit-converge` to generate fresh snapshots

## Related Documents

- [SESSION_HANDOFF.md](./SESSION_HANDOFF.md) — Earlier handoff with CodeRabbit findings (now all addressed)
- [decisions.md](./decisions.md) — All 11 unresolved decisions
- [plan.md](./plan.md) — Implementation blueprint with Constitution Check
- [spec.md](./spec.md) — Full specification with clarifications Q1–Q5

---

**Session Completed**: 2026-11-19T07:42Z  
**Next Session**: Phase 8 implementation  
**Model**: Claude Haiku 4.5  
**Tokens Remaining**: ~15M
