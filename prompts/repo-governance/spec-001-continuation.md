# Specification 001 Continuation Prompt: Phase 9 Convergence & Bounded Implementation

**File**: `prompts/repo-governance/spec-001-continuation.md`
**Purpose**: Next-round implementation prompt for Phase 9 convergence and final validation
**Prepared**: October 22, 2026
**Base Branch**: develop @ c9dd145fbb5ee59544393e91abb114806ad95a61

---

## Mode: Planning Document (Not Execution Authorization)

**This is a READ-ONLY planning document.** Before executing any tasks below, the following approval gates must be cleared:
1. Owner (@ashley) approves scope and deliverables for Phase 9
2. Reconciliation report is reviewed and accepted
3. Outstanding approval boundaries (protected-files guard, manual GitHub steps) are confirmed in scope

**Do not execute this prompt or any nested tasks without explicit authorization.**

---

## Context from Spec 001 Reconciliation (Issue #409)

### Implementing Scope

**Issue**: lightspeedwp/ThisOneTimeOnAcidCom#409 "docs: repo-governance - Reconcile Spec 001 planning and traceability"

**Parent Epic**: #237 (closed; coordination only—not a PR closing target)

**Specification Package**: `.github/specs/001-repo-governance-layout-and-agentic-workflows/`

**Current Status**:
- Phases 1–8 complete and merged (PR #346 merged 2026-10-18; PR #429 merged 2026-10-22)
- Phase 9 convergence in progress; final acceptance gates outstanding

### Base State

**develop SHA**: c9dd145fbb5ee59544393e91abb114806ad95a61

**Last merge**: PR #429 (Phase 9 convergence documentation, commit `61cd3aade6c0bb4aeacb84ce63434912f08b80cd`)

**Test Status**:
- Jest: 588/588 unit tests passing (verified in PR #429 CI at commit 314881e)
- Bats: 12/12 build verification tests (reported passing in tasks.md)
- SpecKit: 103/104 baseline (accepted; 1 known deferred edge case)
- Playwright: Configured, not executed

### Resolved Decisions (9 ratified)

Preserve these; do not reopen:
- **SPEC-001**: Spec Kit output routing canonical path is `.github/specs/`
- **TEST-001**: Jest ESM configuration via @swc/core enabled
- **TEST-002**: Accept SpecKit baseline 103/104 (1 known failure: template precedence edge case)
- **GH-001**: GitHub Discussions enable with templates
- **GH-002**: PR templates route by branch prefix (local, from `lightspeedwp/.github` inheritance)
- **GH-003**: CODEOWNERS and branch protection rules enabled
- **PKG-001**: npm-only enforcement (pnpm removed)
- **NODE-001**: Node.js 24 LTS pinning (`.nvmrc`, `engines` field)
- **STYLE-001**: BEM-only CSS architecture (Tailwind removed)

---

## Outstanding Phase 9 Scope

**Goal**: Close final validation gates for Phase 9 convergence and document handoff

**Blocked Items**: 5 tasks cannot be completed without owner approval or manual GitHub Settings access:
1. **T035 / T060**: PR template routing verification (test PR evidence not recorded)
2. **T038 / T061**: Branch protection configuration (manual GitHub Settings step)
3. **T055 / T064**: Protected-file guard revalidation (approval + guard rerun required)
4. **T062**: GitHub Discussions enablement (manual GitHub Settings step)
5. **T065**: Final handoff documentation (contingent on T060, T061, T062, T064)

**Not in this scope**:
- Implementing Phase 9 tasks or executing any code changes
- Creating branches, committing, or pushing
- Modifying Linear or GitHub records
- Changing workflow configurations or protected files
- Installing integrations or modifying repository settings
- Approving or rejecting pull requests

---

## Approval Gates (Must Resolve Before Next Round)

### Gate 1: Owner Approval of Phase 9 Scope

**Decision Required From**: @ashley

**Question**: Is Phase 9 convergence (T055–T065) in scope for the next implementation round, or is it separate work?

**Options**:
- **(a) Include Phase 9**: Provide explicit approval for T055, T062, T064, T065 completion (requires protected-file change review)
- **(b) Exclude Phase 9**: Scope #409 covers only documentation reconciliation; Phase 9 is separate work
- **(c) Partial Phase 9**: Approve documentation (T060, T062, T065) but defer manual GitHub steps (T038, T061) and guard rerun (T064)

### Gate 2: Protected-Files Guard Approval

**Status**: PR #429 Check Protected Files failed due to changes to `.github/workflows/`, `scripts/`, `AGENTS.md`, and `CHANGELOG.md`

**Approval Record**: lightspeedwp/.github#3975 documents the change request

**Required Action**:
- Owner (@ashley) confirms approval of protected-file modifications
- Guard workflow rerun confirms passing result

### Gate 3: Manual GitHub Settings Tasks (T038, T061, T062)

**Status**: Three tasks require GitHub Settings UI access:
- **T038 / T061**: Enable branch protection on `develop` and `main`
- **T062**: Enable Discussions and configure categories

**Requires**: Owner (@ashley) access to Settings UI; cannot be automated

---

## Unresolved Boundaries

| Item | Gap | Owner | Decision Required |
| ------ | ----- | ------- | ------------------ |
| Supplementary Plan | "40-entry supplementary plan" not found | @ashley | Is this needed? |
| Deferred Workflows | 3 workflows documented as "deferred"; no enablement policy | @ashley | Approve which, if any? |
| T035/T060 Priority | PR template routing verification not tested | @ashley | Test required before closure? |

---

## Recommended Next Implementation Prompt Structure

### If Gate 1 = "Include Phase 9"

Prompt covers T055–T065 with explicit conditions:
- T055 (protected-file approval + guard rerun) → conditional on Gate 2 result
- T060 (test PR verification) → create 4 test PRs, record template/label results
- T061–T062 (manual GitHub) → owner completes; agent documents results
- T064 (guard revalidation) → conditional on T055 approval
- T065 (final handoff) → synthesize all results

### If Gate 1 = "Exclude Phase 9"

Prompt covers only #409 scope:
- Document reconciliation report and coverage matrix (delivered in this branch)
- Prepare PR with spec artifacts (no code changes)
- Route PR to @ashley for review and approval

### If Gate 1 = "Partial Phase 9"

Prompt covers documentation tasks only (T060, T062, T065):
- Manual GitHub steps (T038, T061) → owner action, not in prompt
- Guard rerun (T055, T064) → owner approval, then separate task
- Test PR verification (T035, T060) → included if approved

---

## Branch and PR Instructions

**Branch**: `docs/repo-governance-reconcile-spec-planning`
**Status**: ✅ Name passes validation
**Base**: develop @ c9dd145fbb5ee59544393e91abb114806ad95a61

**PR Template**: Documentation (`docs/*` prefix)
- Link to issue #409 as implementing child
- Summarize reconciliation work and three deliverables
- Reference outstanding items and approval gates
- Link to COMPLETION.md for Phase 9 status

**No changelog** (issue #409 labels `meta:no-changelog`)

**No epic association** (target issue #409 only; epic #237 is closed coordination)

---

## Summary of Outstanding Items

| ID | Task | Requirement | Status | Owner | Blocker |
| ----- | ------ | ------------- | -------- | ------- | --------- |
| T035 | PR template routing verification | R5.2 | ⏳ Unchecked | @claude | No test PR refs recorded |
| T038 | Branch protection enable (manual) | R5.3 | ⏳ Manual | @ashley | GitHub Settings access |
| T055 | Protected-file changes validation | R5.1–R5.3 | ⏳ Guard failed | @claude/@ashley | Approval + guard rerun |
| T060 | Routing verification completion | R5.2 | ⏳ Pending | @claude | Requires T035 test PRs |
| T061 | Branch protection config (manual) | R5.3 | ⏳ Manual | @ashley | GitHub Settings access |
| T062 | Discussions enablement (manual) | R5.1 | ⏳ Manual | @ashley | GitHub Settings access |
| T064 | Protected-file guard revalidation | R5.1–R5.3 | ⏳ Blocked | @claude | Requires T055 + T062 |
| T065 | Final handoff documentation | All | ⏳ Deferred | @claude | Requires T060, T061, T062, T064 |

---

Co-Authored-By: Claude Haiku 4.5 <noreply@anthropic.com>
Claude-Session: https://claude.ai/code/session_016hNMcvrE64pAKFHgLLMYJo
