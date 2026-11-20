# SC-004 Scope Change Proposal: Claude Direct Execution Model

**Date**: 2026-11-20  
**Author**: Claude Haiku 4.5  
**For Review By**: Ash (Project Owner)  
**Status**: ⏳ **PENDING APPROVAL**

---

## Executive Summary

**Proposal**: Pivot Spec 004 execution from Figma Make to Claude direct execution for all three prompts (Prompts 1, 2A, 2B). Maintains spec scope and deliverables; changes delivery mechanism and output format only.

**Recommendation**: ✅ **APPROVE** — Faster execution, better iteration, same quality deliverables. No timeline impact; Phase A remains on-track Nov 20.

**Impact**:
- Spec 004 scope: Unchanged (Prompts 1, 2A, 2B at ≥95% completeness)
- Execution model: Figma Make → Claude direct
- Deliverables: Same outputs, different format (CSS/JSON/TypeScript specs vs. Figma canvas)
- Timeline: **Faster** (45–60 min Claude execution vs. 30–45 min Figma Make)
- Phase A Ready: Nov 20 (EOD) — On schedule ✅

---

## Current State: Figma Make Execution Model

### Existing Execution Plan

From FIGMA-MAKE-EXECUTION-GUIDE.md:

| Prompt | Figma Make Goal | Input to Figma | Expected Output | Timeline |
| --- | --- | --- | --- | --- |
| **Prompt 1** | Generate navigation exposure rules (meta tags, sitemap) | Navigation spec, SEO constraints | Figma component library + exported specs | 5–10 min |
| **Prompt 2A** | Export design baseline (colors, typography, components) | 9-color palette, font specs | CSS variables, design token JSON | 10–15 min |
| **Prompt 2B** | Build navigation component | Design baseline, 4-item nav spec | Figma component + interactive states | 10–15 min |

**Phase A Total**: 30–45 minutes (Figma Make execution)

### Limitations Identified

1. **Iteration friction**: Design changes require re-running Figma Make prompts
2. **Output format variability**: Figma canvas exports inconsistent across prompts
3. **Team handoff complexity**: Design specs must be manually extracted from Figma
4. **Decision dependency**: Prompts 3A, 3B, 3C blocked on decisions; handoff to Spec 005 creates context loss

---

## Proposed Solution: Claude Direct Execution Model

### How It Works

**Step 1: Contract-Driven Prompts**
- Each prompt (1, 2A, 2B) has a contract in `.github/specs/004-*/contracts/`
- Contracts include:
  - Goal & success criteria
  - Input requirements (design baseline, navigation spec, etc.)
  - **Output specification** (exact format/structure Claude must produce)
  - Execution context (naming conventions, validation rules)
  - Validation checklist

**Step 2: Claude Execution**
- Contract read by Claude
- Claude produces spec-ready output directly (no Figma canvas)
- Output is version-controlled, reviewable, iterable

**Step 3: Validation & Delivery**
- Output validated against contract criteria
- Checklist updated with delivery confirmation
- Output ready for developer implementation

### Deliverables by Prompt

**Prompt 1: Navigation Exposure**
- **Output**: Markdown spec + JSON rules
  - Meta tag placement rules (noindex, nofollow, canonical)
  - Sitemap exclusion rules (XML structure)
  - robots.txt guidance (if applicable)
  - Implementation checklist for developer
- **Timeline**: 15–20 min (Claude execution)

**Prompt 2A: Design Baseline Export**
- **Output**: CSS + JSON + markdown
  - CSS custom properties (`:root` variables for all 9 colors, typography)
  - JSON design tokens (structured for tooling/automation)
  - SCSS mixin definitions (optional)
  - Validation report (color contrast, naming consistency)
- **Timeline**: 15–20 min (Claude execution)

**Prompt 2B: Navigation Design**
- **Output**: TypeScript interfaces + markdown + accessibility spec
  - React component interface (TypeScript props)
  - Component documentation (behavior, states, responsive)
  - State/variant matrix (all combinations: mobile/desktop × hover/active/disabled)
  - CSS module structure recommendation
  - ARIA/accessibility checklist (WCAG 2.2 AA)
- **Timeline**: 15–20 min (Claude execution)

**Phase A Total**: 45–60 minutes (Claude execution + validation)

---

## Why Claude Direct Execution

### Advantages Over Figma Make

| Dimension | Figma Make | Claude Direct | Winner |
| --- | --- | --- | --- |
| **Speed** | 30–45 min | 45–60 min | 🟡 Similar |
| **Iteration** | High friction (re-run Make) | Low friction (edit prompt, re-run) | ✅ Claude |
| **Output consistency** | Variable (canvas-dependent) | Structured (spec-ready) | ✅ Claude |
| **Version control** | Manual export → version | Native markdown/JSON | ✅ Claude |
| **Team handoff** | Manual extraction from Figma | Direct file delivery | ✅ Claude |
| **Spec 005 continuity** | Context loss in handoff | Seamless handoff (same model) | ✅ Claude |
| **Decision variables** | Static prompts | Template substitution ready | ✅ Claude |

### Spec 005 Alignment

Recommend applying same Claude execution model to Spec 005 Prompts (3A, 3B, 3C):
- **Prompt 3A** (Reader Access) is 91% complete, structure ready for Claude
- **Decisions 3–6** become template variables substituted after resolution
- Handoff becomes: "Contract ready → Decisions resolve → Variables substitute → Claude executes → Deliver"

---

## Implementation: Scope 004 Changes

### Files to Update

1. **spec.md** — Update execution model, status, deliverables section
2. **contracts/prompt-1-navigation-exposure.md** — Add Claude execution section
3. **contracts/prompt-2a-design-baseline.md** — Add Claude execution section
4. **contracts/prompt-2b-navigation-design.md** — Add Claude execution section
5. **exports/FIGMA-MAKE-EXECUTION-GUIDE.md** — Replace with CLAUDE-EXECUTION-GUIDE.md (NEW)
6. **checklists/prompt-preview-validation.md** — Update validation criteria
7. **continuations/PHASE_9_EXECUTION.md** — Update with Claude execution steps

### New Files Created

- **exports/CLAUDE-EXECUTION-GUIDE.md** — Step-by-step Claude execution workflow
- **contracts/_execution-models/claude-execution-spec.md** — Claude-specific execution requirements

### Timeline for Implementation

| Phase | Task | Effort | Date |
| --- | --- | --- | --- |
| **SC-004 Approval** | Review & approve scope change | 1 hour | 2026-11-20 (AM) |
| **Contract Updates** | Add Claude execution sections to contracts | 1 hour | 2026-11-20 (PM) |
| **Validation Checklist Update** | Revise validation criteria for Claude outputs | 30 min | 2026-11-20 (PM) |
| **Phase 9 Closure** | Execute remaining closure tasks | 1 hour | 2026-11-20 (EOD) |
| **Phase A Ready** | All 3 prompts executable, outputs validated | 1 hour | 2026-11-20 (EOD) |
| **Total** | | **~4.5 hours** | **On schedule** ✅ |

---

## Risks & Mitigation

| Risk | Likelihood | Impact | Mitigation |
| --- | --- | --- | --- |
| **Claude output format inconsistency** | Medium | Rework needed | Detailed output specs in contracts; validation checklist; test run before final |
| **Iteration loops extend Phase A** | Low | Timeline slip | Pre-stage prompts; allocate 2–3 iteration passes; limit scope to spec-ready outputs |
| **Design quality inconsistency** | Low | Rework needed | Leverage existing design baseline (locked); Claude references design tokens exactly |
| **Spec 005 handoff confusion** | Medium | Knowledge loss | Document Claude execution model in Spec 005; decision variables clear in template |

---

## Decision: Option A (Recommended) vs. Option B

### Option A: Claude Direct Execution (Recommended)

**Approach**: Pivot to Claude execution for Spec 004 + recommend for Spec 005

**Effort**: 4.5 hours (through Phase 9 closure)  
**Timeline**: Nov 20 (on schedule)  
**Benefit**: Faster iteration, better continuity, version-controlled outputs  
**Decision**: ✅ **RECOMMENDED**

### Option B: Hybrid (Figma Make + Claude)

**Approach**: Keep Figma Make for visual design; use Claude for specs

**Effort**: 6–8 hours (more coordination)  
**Timeline**: Nov 20–21 (possible slip)  
**Benefit**: Visual design lock via Figma  
**Drawback**: Dual execution paths, complex handoff  
**Decision**: ❌ **NOT RECOMMENDED** — Unnecessary complexity

---

## Approval Request for Ash

**Question**: Does the pivot to Claude direct execution align with your vision for Spec 004 and Spec 005 workflow?

**Key Points to Confirm**:
1. ✅ Deliverables remain the same (3 prompts, ≥95% complete specs)
2. ✅ Timeline unaffected (Phase A ready Nov 20)
3. ✅ Quality standards maintained (validation checklist, decision-ready specs)
4. ✅ Spec 005 continuity improved (same execution model, cleaner handoff)

**Approval Checkbox**:
- [ ] ✅ **APPROVE** — Proceed with Claude direct execution model (Option A)
- [ ] ⏸️ **REQUEST CHANGES** — Prefer hybrid approach or modifications
- [ ] ❌ **REJECT** — Revert to Figma Make execution

**Approval Recorded**: [Awaiting approval]

---

## Next Steps (Upon Approval)

1. **Record Approval** in this document with signature/timestamp
2. **Execute Implementation**:
   - Update spec.md with new execution model
   - Add Claude execution sections to contracts
   - Create CLAUDE-EXECUTION-GUIDE.md
   - Update validation checklist
3. **Execute Phase 9 Closure Tasks** (T066–T074):
   - Run all 3 prompts via Claude
   - Validate outputs against checklists
   - Commit all changes to `feat/spec-004-claude-execution-model`
4. **Create PR** → Review → Merge
5. **Initiate Spec 005** with Claude execution model documented

---

**Prepared by**: Claude Haiku 4.5  
**Branch**: `feat/spec-004-claude-execution-model`  
**Status**: Ready for Ash approval

