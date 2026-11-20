# Continuation Prompt: Spec 005 Reader Access — Phase 8 Convergence & CodeRabbit Review

## Session Context

**Repository:** `lightspeedwp/ThisOneTimeOnAcidCom`  
**Feature:** 005-reader-access (passwordless single-use email verification for protected book chapters)  
**Branch:** `docs/reader-access-alignment`  
**PR:** [#611 (draft → ready for review)](https://github.com/lightspeedwp/ThisOneTimeOnAcidCom/pull/611)  
**Commit HEAD:** `8723ef9` (2026-11-18, pre-convergence state)

## Specification Status

✅ **Complete documents:**
- `.github/specs/005-reader-access/spec.md` — full requirements, clarifications Q1–Q5 recorded
- `.github/specs/005-reader-access/plan.md` — implementation blueprint
- `.github/specs/005-reader-access/research.md` — R-01–R-12 decisions
- `.github/specs/005-reader-access/data-model.md` — VerificationCode, ReaderAccessRecord, DeviceSession, EditionManifest
- `.github/specs/005-reader-access/contracts/reader-access-functions.md` — POST/GET/DELETE function specs
- `.github/specs/005-reader-access/decisions.md` — recorded Q1–Q5 clarifications, unresolved decisions 1–11
- `.github/specs/005-reader-access/crosswalk.md` — links to 004 contracts (not moved)
- `.github/specs/005-reader-access/tasks.md` — RA-T001–RA-T052 (45 tasks, phases 0–7)

## Immediate Blockers

### 1. **Pending Convergence Approval (Gate: Explicit "Yes")**

Ash has not yet explicitly approved appending Phase 8 to `tasks.md`. The last user message was "Continue" after `/speckit-converge` presented the proposed block; this was ambiguous (could mean "continue processing notifications" rather than "approve the append").

**Proposed Phase 8 block** (ready to append on approval):
```markdown
## Phase 8: Convergence

- [ ] RA-T053 CRITICAL: Resolve the Constitution IV content location — editorial content now lives in src/content/ (PR #608) while constitution v1.0.0 names content/; amend .specify/memory/constitution.md through its amendment process or record an approved exception per Constitution IV (contradicts)
- [ ] RA-T054 Limit the book sources bundled by src/app/utils/bookContentLoader.ts to the chapters Ash has approved for early release (restrict BOOK_SOURCE_DIRECTORIES in src/app/utils/bookContentSource.ts or the files under src/content/book/) until RA-T035/RA-T037 serve chapters through the chapter function per RA-001, SC-004 (contradicts)
```

**Action:** Explicitly ask Ash: "Do you approve appending Phase 8 (RA-T053, RA-T054) to tasks.md?" If yes, proceed per "If Approved" below.

---

### 2. **CodeRabbit Review Findings on PR #611** (4 Issues)

PR marked ready for review by Ash on 2026-11-18 at 17:56:17Z. CodeRabbit (CHILL profile, Advanced plan) posted review comments at 18:04:25Z:

#### **Issue 1: R-09 Missing Rationale & Alternatives** (Line 73, research.md)
- **Finding:** R-09 section records Status, Decision, Open points only; no Rationale or Alternatives considered.
- **Requirement:** Research format requires all three entries.
- **Fix:** Add Rationale explaining why recovery-first rule was selected. Add Alternatives considered (record actual options evaluated; do not infer from provenance).
- **Link:** `.github/specs/005-reader-access/research.md:73`

#### **Issue 2: RA-T005–RA-T009 Missing File Path** (Line 40, tasks.md)
- **Finding:** These five owner-decision tasks have no file path in descriptions.
- **Requirement:** Task format requires file path.
- **Fix:** Add file path `src/content/book/05-design-reader-decision-register.md` to descriptions for RA-T005, RA-T006, RA-T007, RA-T008, RA-T009.
- **Link:** `.github/specs/005-reader-access/tasks.md:40`

#### **Issue 3: RA-T028 Missing Task Dependency** (Line 69, tasks.md)  
- **Finding:** R-03 leaves edition location to decision 11; RA-T006 covers manifest but does not select that location; RA-T028 has no decided location to use.
- **Requirement:** Coding guidelines state "each task must be specific enough that an LLM can complete it without additional context."
- **Fix:** Add a new task (RA-T053? collision?) for decision 11 (select protected-edition location). Make RA-T028 depend on both RA-T006 and that new task.
- **Complexity Note:** This overlaps with proposed Phase 8 RA-T053 (Constitution IV location). Coordinate: decide whether decision 11 (edition location) and Constitution IV issue are separate tasks or one combined resolution.
- **Link:** `.github/specs/005-reader-access/tasks.md:69`

#### **Issue 4: R-04 Guidance Needs Clarification** (Line 40, research.md)
- **Finding:** The research currently notes that manuscript chapters remain in the bundle (R-04 "Finding"). The proposed RA-T054 suggests limiting it to "approved chapters," which CodeRabbit flags as still exposing chapters without verification.
- **Requirement:** RA-001 and SC-004 demand protected content never enter public client bundle.
- **Fix:** Clarify R-04 and RA-T054 wording: **do not bundle any protected chapters into the public client bundle**, even approved ones, until an authorised server-side delivery mechanism exists (the chapter function in RA-035/RA-037).
- **Link:** `.github/specs/005-reader-access/research.md:40`

**CI Status:** "Validate configs (read-only)" check fails on this branch (same root cause as main per earlier summary; not a new issue introduced by this PR).

---

## Branch & Remote State

**Current branch:** `docs/reader-access-alignment`  
**Remote tracking:** No upstream set (intentional; PR #611 is owned by this session)  
**Base branch:** `origin/main` (commit `3b37b82`)  
**Relationship:** docs/reader-access-alignment is ahead of main by the alignment commits; PR #611 is a draft merge proposal.

**Snapshots (from previous converge run):**
- Spec hash: `162bc3b89cb9284a…` (Session 2026-11-19 05:58Z)
- Plan hash: `5ff89d862001bf86…`
- Tasks hash: `e913fa937d2554c0…`

Before appending Phase 8, run `/speckit-converge` again to obtain fresh snapshots and compare hashes to detect intervening changes. If snapshots are unavailable, re-run the converge and obtain Ash's re-confirmation before writing.

---

## Decision Points for Next Session

### **Path A: Address CodeRabbit Findings First** (Recommended)
1. Ask Ash: approve the four CodeRabbit fixes?
2. If yes:
   - Fix R-09: add Rationale and Alternatives (coordinate with Ash on alternatives actually evaluated)
   - Fix RA-T005–RA-T009: add file path
   - **Coordinate Issue 3 & Phase 8:** Clarify whether decision 11 (edition location) is separate from RA-T053 (Constitution IV location), or one combined task
   - Fix R-04: clarify no-bundling guidance
3. Lint, commit, push to PR #611.
4. Then ask Ash: approve Phase 8 append?

### **Path B: Get Convergence Approval First, Then Address CodeRabbit**
1. Ask Ash for explicit "yes" on Phase 8 append.
2. If yes: append Phase 8, commit, push.
3. Then address the four CodeRabbit findings per Path A steps 2–3.

**Recommendation:** Path A is safer; it resolves ambiguities (esp. decision 11) before Phase 8 is locked in.

---

## Critical Reminders

- **Never push to main.** All work stays on `docs/reader-access-alignment`.
- **Keep Lefthook enabled.** Do not use `--no-verify`.
- **Ash's decisions are binding.** Do not infer approval from earlier messages; ask for explicit "yes/no."
- **Snapshots matter.** Before appending Phase 8 to tasks.md, re-read the snapshots and compare hashes to detect intervening changes.
- **Attribution required.** Any commit must end with:
  ```text
  Co-Authored-By: Claude Haiku 4.5 <noreply@anthropic.com>
  Claude-Session: https://claude.ai/code/session_01CADHZfK8UtRaefpnLuSnoW
  ```

---

## Files to Review Before Starting

1. `.github/specs/005-reader-access/research.md` — R-04, R-09 sections need fixes
2. `.github/specs/005-reader-access/tasks.md` — RA-T005–RA-T009, RA-T028 need updates
3. `.github/specs/005-reader-access/decisions.md` — verify decision 11 wording matches intended scope
4. `/tmp/claude-0/-home-user-ThisOneTimeOnAcidCom/0222fe63-d935-5a4f-a433-04392917a614/scratchpad/converge-snapshot.txt` — before any append

---

## Next Steps

1. **Confirm branch status:** `git status` and `git log --oneline -5` on `docs/reader-access-alignment`.
2. **Ask Ash (via chat):**
   - Explicit approval for Phase 8 append? (or recommend Path A: fix CodeRabbit findings first)
   - If Path A: approve the four CodeRabbit fixes? (esp. clarify decision 11 vs. Constitution IV)
3. **Execute chosen path** (A or B above).
4. **Lint:** `npm run validate:branch-name && npx markdownlint-cli2 ".github/specs/005-reader-access/**/*.md" --fix`.
5. **Commit & push:** Use required attribution; `git push -u origin docs/reader-access-alignment`.
6. **Watch PR #611:** CodeRabbit review should update; CI may resolve or remain red on configs.

---

## Context Fragments

- **Ash's email:** ashley@lightspeedwp.agency
- **Org guidance:** [lightspeedwp/.github/CLAUDE.md](https://github.com/lightspeedwp/.github/blob/develop/CLAUDE.md)
- **Repo guidance:** [ThisOneTimeOnAcidCom/CLAUDE.md](https://github.com/lightspeedwp/ThisOneTimeOnAcidCom/blob/main/CLAUDE.md)
- **Constitution v1.0.0:** Spec Kit compliance rule set (principles I–VII, .specify/memory/constitution.md)
- **Linear v1.13.0 register:** Records recovery-first race selection (confirmed by Ash)
- **Manuscript location:** `src/content/book/` (moved from `content/` by PR #608); six chapter dirs + planning docs (excluded from BOOK_SOURCE_GLOBS)

---

**Session ended:** 2026-11-19 01:24Z (after ReadNotifications, before proceeding)  
**Model:** Claude Haiku 4.5  
**Tokens remaining:** ~15M
