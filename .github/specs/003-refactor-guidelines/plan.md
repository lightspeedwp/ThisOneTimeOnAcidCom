# Implementation Plan: TOA-358 Guidelines Refactor

**Status:** Draft  
**Branch:** `aiops/refactor-guidelines`  
**Timeline:** Phased (gates → planning → implementation → verification)

## Phase 1: Gate Resolution & Planning

**Objective:** Resolve all owner decisions; create detailed implementation roadmap

### Tasks

1. **Owner Decision Session**
   - Present D1–D8 gates with evidence requirements
   - Record explicit decisions with sources
   - Document dependencies (e.g., D4 gates conditional N operations)

2. **Validate Source Hashes**
   - Verify 116 guidelines unchanged from observation baseline
   - Compare current `develop` against saved baseline
   - Document any unexpected changes

3. **Create Task Breakdown**
   - Generate `tasks.md` from each G/S/N row
   - Map dependencies and verification steps
   - Estimate effort per operation

4. **Quality Checklist**
   - Complete `checklists/requirements.md`
   - Identify manual verification points
   - Define acceptance per operation type

### Completion Criteria

- ✅ D0–D8 decisions recorded with evidence
- ✅ Source hash validation complete
- ✅ Task breakdown generated
- ✅ Checklist signed off

---

## Phase 2: Implementation (Conditional on Phase 1)

**Objective:** Execute approved edits within confirmed scope

### Pre-Implementation Verification

- [ ] D1–D8 owner approvals present
- [ ] Branch `aiops/refactor-guidelines` clean and up-to-date with `develop`
- [ ] All 116 guidelines readable and unchanged
- [ ] S001–S009 protected-file edits scoped

### Operation Sequencing

**Order by dependency:**

1. **S-Documents First** (Supporting): Protected-file edits to .claude/, AGENTS.md, CONTRIBUTING.md
2. **G-Documents** (Guidelines): In reading order, preserve unique safeguards
3. **N-Documents** (New): Only approved subset; old-path preservation first
4. **Verification**: Link validation, anchor checks, design example verification

### Change Categories

| Operation | Count | Verification Method |
| --- | --- | --- |
| Edit existing guideline | 116 | Source read → tailored change → preserve safeguards |
| Edit supporting document | 9 | Scope row → bounded change → preserve unique content |
| Create new document | 43 (conditional) | Dependency check → create only approved → validate pointers |
| Create pointer | Variable | Old-path mapping → validation → status notes |
| **Total verified** | 125+ | Static review + pointer validation |

### Change Preservation

- **Original paths:** Every guideline remains at current path or gets explicit pointer
- **Unique content:** All safeguards, historical notes, author context preserved
- **Attachments:** Design caveat and pasted.md preserved unchanged
- **Unrelated work:** `.github/dependabot.yml`, `.github/mergify.yml`, `CHANGELOG.md` unchanged

---

## Phase 3: Verification

**Objective:** Validate that implementation matches scope; generate handoff

### Verification Checklist

1. **Coverage Manifest**
   - All 116 G-rows: path, hash, operation, destination, status
   - All 9 S-rows: same + protected-file approval evidence
   - All 43 N-rows: approval status, dependency resolution, pointer validation

2. **Internal Links**
   - 129 candidates: classify defect vs working reference
   - Validate anchors, cross-file paths, relative links
   - Markdown fence/table rendering check

3. **Design/Examples**
   - Literal colour/spacing/typography verification
   - Formula/input/threshold evidence documented
   - Markdown-only syntax validated (no runtime claims)

4. **Skill Exercises**
   - draft → inspect/report scenarios
   - denied → missing-policy scenarios
   - Dependencies: all local files, inline templates present

5. **Preservation Validation**
   - No files moved/deleted without approval
   - Old pointers in place
   - No unapproved removal

### Completion Report

- **Verdict:** Blocked / Partial / Verified / Complete
- **Coverage:** Exact G/S/N counts with status per row
- **Issues:** Any blockers, deferred items, limitations
- **Evidence:** Methods used, manual checks documented
- **Next Steps:** Final cleanup, PR body, merge readiness

---

## Rollback Plan

If unresolved issues appear during implementation:

1. **Stop at checkpoint** (after each major category)
2. **Preserve work** (all edits staged, not committed)
3. **Identify blocker** with evidence
4. **Request revised decision** before proceeding
5. **No automatic workarounds or scope creep**

---

## Timeline Estimate

| Phase | Checkpoint | Effort |
| --- | --- | --- |
| Phase 1: Decisions + Planning | Gate resolution | 2–4 hours (owner time) |
| Phase 2: Implementation | Checkpoint after S-docs | 6–8 hours per 30 guidelines |
| Phase 3: Verification | Manifest + final report | 4–6 hours |
| **Total** | **Ready to merge** | ~20–30 hours |

**Note:** Estimates assume no runtime checks required; verification method substitutions may extend timeline.

---

## Risk Mitigation

| Risk | Mitigation |
| --- | --- |
| Scope creep (new features, fixes) | Strict gate check at each phase boundary |
| Missing decisions (D1–D8) | Blocked handoff if evidence incomplete |
| Link/pointer breakage | Static validation before operations; old paths preserved |
| Protected-file conflicts | D0 resolved; S-rows bounded and scoped |
| Unrelated changes slip in | Explicit allowlist; git status review before commit |

---

## Success Definition

- ✅ All 116 guidelines accounted for (current path or explicit pointer)
- ✅ 9 supporting documents edited within approved scope
- ✅ 43 new documents created only if approved; old pointers preserved
- ✅ Verification register complete with evidence for every operation
- ✅ No files moved/deleted without explicit approval
- ✅ PR ready for review with clean diff and complete description

---

*See spec.md for gates, scope, and acceptance criteria*
