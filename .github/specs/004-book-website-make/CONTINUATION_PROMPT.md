# Continuation Prompt: Spec 004 (Book Website Figma Make)

**Session Handoff:** 2026-11-20  
**Previous Session:** https://claude.ai/code/session_01CADHZhqYsm58QZoCnf81J8  
**Branch:** `ccr-01b4e649-64vj1f`  
**PR:** #642 (ready for review, merge conflict to resolve)

---

## 1. Where We Left Off

**Phase Completed:** Phase 1 (Setup & Validation) ✅
- All blocking decisions approved (7/7)
- Design baseline locked and verified
- Spec Kit workflow phases documented (Specification → Clarification → Planning → Task Decomposition)
- Gate 2 approval documents prepared

**Current Status:**
- Gate 1: ✅ COMPLETE (all 7 blocking decisions resolved)
- Gate 2: 🟡 PENDING (design baseline approval ready, needs sign-off)
- Gate 3: ✅ COMPLETE (preflight analysis passed)

**Critical Pivot:** Figma Make API access is not viable. All prompt execution must shift to Claude Code direct execution (not Figma Make).

---

## 2. Phase 2 Objectives

### Gate 2 Approval (Design Baseline Sign-Off)

**What needs to happen:**
1. Review live design baseline from thisonetimeonacid.com
2. Verify design system matches approved spec
3. Document any design updates needed for consistency
4. Formally approve proceeding to Phase 2 implementation

**Design Baseline Specification:**
- **Typography:** Space Grotesk (headings: 600, 700; 24-48px) + Inter (body/UI: 400-600; 12-18px)
- **Colors:** 9-color palette approved (see `.github/specs/004-book-website-make/exports/GATE_2_SIGN_OFF_SUMMARY.md`)
- **Unapproved Candidates:** R3, T1, RT2, C1 (explicitly excluded)

**Reference Files:**
- Design Brief: `.github/specs/004-book-website-make/references/04-design-brief.md` (v1.1.2)
- Design Register: `.github/specs/004-book-website-make/references/05-design-reader-decision-register.md` (v1.9.0)
- Full Readiness Report: `.github/specs/004-book-website-make/exports/GATE_2_READINESS_REPORT.md`
- Sign-Off Summary: `.github/specs/004-book-website-make/exports/GATE_2_SIGN_OFF_SUMMARY.md`

---

## 3. Live Design Baseline (From thisonetimeonacid.com)

**TODO: Ash to provide:**

### Fonts Currently Used
```
[Ash: What font families are on the live site? Please list actual fonts in use]
```

### Color Palette Currently Used
```
[Ash: What is the current color palette? List the hex values or color names]
```

### Menu Structure
```
[Ash: How is the navigation structured on the live site? What are the menu items and hierarchy?]
```

---

## 4. Menu Design Recovery Strategy

### The Challenge
The previous menu design (mobile nav + flyout popover) was destroyed by Figma Make changes. We need to recover and improve it.

### Desired Outcome
Blend:
- **Old Mobile Nav:** [Ash: What made this better?]
- **New Flyout Popover:** [Ash: What's bland about the new one?]
- **Ideal Hybrid:** [Ash: What should the hybrid look like?]

### Next Steps
1. Document current live menu structure
2. Identify what should be recovered from old design
3. Implement hybrid menu using Claude Code (not Figma Make)

---

## 5. Branch Strategy for Next Session

**Current Branch:** `ccr-01b4e649-64vj1f` (CCR session format)

**TODO: Ash to specify preferred pattern for next session:**

### Option A: CCR Session Format (Current)
```
Branch name: ccr-01b4e649-64vj1f
Pattern: ccr-{uuid}
Benefit: Session-specific, easy tracking
```

### Option B: Standard Feature Branch Pattern
```
Branch name: feat/spec-004-phase-2-implementation
Pattern: {type}/{scope}-{title}
Benefit: Human-readable, follows repository conventions
Validation: npm run validate:branch-name -- --branch <branch-name>
```

**Recommendation:** Specify which developers should use in next session:
- Full team? Or specific users?
- Any constraints on naming?

---

## 6. Claude Code Execution (Not Figma Make)

**Key Differences from Previous Plan:**

### Why Pivot?
Figma Make API access is not viable due to:
- File key / API token authorization issues
- No path forward without external Figma API access

### New Approach
Execute all prompts directly in Claude Code:
1. **Prompt 1 (Navigation Exposure):** Generate navigation component spec + route handling
2. **Prompt 2A (Design Baseline Export):** Generate CSS variables + design tokens
3. **Prompt 2B (Navigation Design):** Implement navigation component with all states
4. **Prompts 3A–3C (Reader Access):** Implement after blocking decisions finalized

### Execution Steps
1. Load each prompt specification from `.github/specs/004-book-website-make/contracts/`
2. Execute prompt directly in Claude Code (this session or next)
3. Validate output against acceptance criteria
4. Commit results to repository
5. Test in deployed preview (Vercel live at: https://thisonetimeonacidcom-git-ccr-01b4e649-64vj1f-lightspeedwp.vercel.app)

---

## 7. Immediate Actions (Next Session)

### Before Starting Phase 2:
- [ ] Resolve PR #642 merge conflict (merge main into CCR branch, push)
- [ ] Get Ash approval on three items above (design baseline, menu strategy, branch naming)
- [ ] Formal Gate 2 sign-off

### Phase 2 Execution (After Gate 2):
- [ ] Execute Prompt 1 (Navigation Exposure)
- [ ] Execute Prompt 2A (Design Baseline Export)
- [ ] Execute Prompt 2B (Navigation Design with Menu Recovery)
- [ ] Validate each prompt against acceptance criteria
- [ ] Test in Vercel preview
- [ ] Commit and push
- [ ] Gate 3 (Preflight Analysis) sign-off
- [ ] Proceed to Phase B (Prompts 3A–3C) once blocking decisions resolved

---

## 8. File References

### Specification Documents
- **Main Spec:** `.github/specs/004-book-website-make/spec.md`
- **Plan:** `.github/specs/004-book-website-make/plan.md`
- **Tasks:** `.github/specs/004-book-website-make/tasks.md`
- **Quickstart:** `.github/specs/004-book-website-make/quickstart.md`

### Contract Specifications (Ready for Execution)
- **Prompt 1:** `.github/specs/004-book-website-make/contracts/prompt-1-navigation-exposure.md`
- **Prompt 2A:** `.github/specs/004-book-website-make/contracts/prompt-2a-design-baseline.md`
- **Prompt 2B:** `.github/specs/004-book-website-make/contracts/prompt-2b-navigation-design.md`
- **Prompt 2B Execution Guide:** `.github/specs/004-book-website-make/contracts/prompt-2b-execution-guide.md`

### Reference Documents (Source of Truth)
- `references/03-author-decisions-launch-scope.md` (v1.3.0)
- `references/04-design-brief.md` (v1.1.2)
- `references/05-design-reader-decision-register.md` (v1.9.0)
- `references/06-website-reading-prd.md` (v1.1.1)

### Approval Documents
- **Gate 2 Readiness Report:** `.github/specs/004-book-website-make/exports/GATE_2_READINESS_REPORT.md`
- **Gate 2 Sign-Off Summary:** `.github/specs/004-book-website-make/exports/GATE_2_SIGN_OFF_SUMMARY.md`

---

## 9. Git Status

**Pending:**
- PR #642: Ready for review, merge conflict needs resolution
- Continuation prompt: Needs Ash input (this document)

**Next Steps:**
1. Resolve merge conflict
2. Fill in TODO sections above with Ash's information
3. Commit continuation prompt to main
4. Session wrap-up complete

---

**Instructions for Next Session:**

1. Read this continuation prompt first
2. Verify Gate 2 sign-off (check that design baseline is approved)
3. Resolve PR #642 merge conflict if not yet done
4. Begin Phase 2 execution:
   - Load Prompt 1 contract
   - Execute in Claude Code (not Figma Make)
   - Validate output
   - Commit and push
5. Repeat for Prompts 2A and 2B
6. Document progress and blockers

---

**Last Updated:** 2026-11-20  
**Status:** ⏳ Awaiting Ash input on three items above (sections 3, 4, 5)  
**Session:** https://claude.ai/code/session_01CADHZhqYsm58QZoCnf81J8
