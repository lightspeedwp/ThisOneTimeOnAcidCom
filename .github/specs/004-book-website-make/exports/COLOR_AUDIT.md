# Color Audit: Baseline Verification

**Date**: 2026-11-20  
**Phase**: 9 Convergence (T071)  
**Baseline**: Design Brief v1.1.2  
**Status**: Corrected 2026-11-20. The first audit missed non-baseline colours in the Prompt 3A/3C execution guides and data-model.md


> **Correction (Phase 9 reconciliation, 2026-11-20; updated 2026-11-26)**: An earlier version of this audit said no non-baseline colours were found. That was wrong: it checked the 3A/3C *contracts* but not their *execution guides*. The tables below show the current status, and items marked *historical* record what the first audit found.
> - `contracts/prompt-3a-execution-guide.md`: `#1a1a1a`, `#ffffff`, `#e8d4b8`, `#d4a574`, `#8b0000`, `#ff6b6b` and other greys/status colours. **Marked superseded** with a notice pointing to `design-tokens.json` (Spec 005 owns this guide)
> - `contracts/prompt-3c-execution-guide.md`: error colours `#8b0000` / `#ff6b6b`. **Marked superseded** in the same way
> - `data-model.md`: example value `#1a1a1a`. **Replaced** with baseline `#F6F2EB`
> - `exports/GATE_2_READINESS_REPORT.md`: `#d4a574` appears only as a "Was:" record of an earlier fix. **Left as history**

---

## Approved Baseline (9 Colors)

<!-- markdownlint-disable MD060 -->

| Primitive              | Hex Value | Usage                              | Theme(s) | Status      |
| ---------------------- | --------- | ---------------------------------- | -------- | ----------- |
| Deepest Dark           | #0B0B10   | Primary dark background            | Dark     | ✅ Baseline |
| Dark Purple-Black      | #12121A   | Secondary dark background          | Dark     | ✅ Baseline |
| Lighter Dark           | #171722   | Tertiary dark background           | Dark     | ✅ Baseline |
| Warm Cream             | #F6F2EB   | Light text, light background       | Both     | ✅ Baseline |
| Warm Tan               | #CFC7BB   | Secondary light/neutral            | Both     | ✅ Baseline |
| Warm Brown             | #9C9488   | Tertiary light/neutral             | Both     | ✅ Baseline |
| Hot Pink Accent        | #FF3AAE   | Interactive accent (hover, active) | Both     | ✅ Baseline |
| Electric Yellow Accent | #F4FF3C   | Highlight accent                   | Both     | ✅ Baseline |
| Purple Accent          | #8A63FF   | Tertiary accent                    | Both     | ✅ Baseline |

<!-- markdownlint-enable MD060 -->

---

## Audit Results

### Files Checked

✅ Files audited (includes non-baseline colors):

- `spec.md` — No color hex values (uses semantic names only)
- `plan.md` — No color hex values
- `research.md` — No color hex values in decision docs
- `contracts/prompt-*.md` — Design baseline colors only
- `exports/design-tokens.json` — All 9 baseline colors + theme mappings
- `exports/design-tokens.css` — All 9 baseline colors + theme mappings (light theme adjusted for WCAG AAA)
- `data-model.md` — ✅ Resolved 2026-11-26 (T077): examples now use baseline `#F6F2EB`. *Historical: contained `#1a1a1a` and `#ffffff`*
- `tasks.md` — ✅ Resolved: mentions the colours only in task descriptions (T077); no colour values to apply
- `exports/GATE_2_READINESS_REPORT.md` — Included in scope
- Prompt 3A/3C execution guides — Included in scope (moved to Spec 005)

### Colors Found in Specifications

<!-- markdownlint-disable MD060 -->

| File                                     | Color                              | Usage                              | Verification          | Status           |
| ---------------------------------------- | ---------------------------------- | ---------------------------------- | --------------------- | ---------------- |
| contracts/prompt-2a-design-baseline.md   | #0B0B10                            | Deepest Dark                       | Baseline primitive ✅ | ✅ OK            |
| contracts/prompt-2a-design-baseline.md   | #12121A                            | Dark Purple-Black                  | Baseline primitive ✅ | ✅ OK            |
| contracts/prompt-2a-design-baseline.md   | #171722                            | Lighter Dark                       | Baseline primitive ✅ | ✅ OK            |
| contracts/prompt-2a-design-baseline.md   | #F6F2EB                            | Warm Cream                         | Baseline primitive ✅ | ✅ OK            |
| contracts/prompt-2a-design-baseline.md   | #CFC7BB                            | Warm Tan                           | Baseline primitive ✅ | ✅ OK            |
| contracts/prompt-2a-design-baseline.md   | #9C9488                            | Warm Brown                         | Baseline primitive ✅ | ✅ OK            |
| contracts/prompt-2a-design-baseline.md   | #FF3AAE                            | Hot Pink                           | Baseline primitive ✅ | ✅ OK            |
| contracts/prompt-2b-navigation-design.md | #FF3AAE                            | Hot Pink (hover/active)            | Baseline primitive ✅ | ✅ OK            |
| contracts/prompt-2b-navigation-design.md | #F4FF3C                            | Electric Yellow                    | Baseline primitive ✅ | ✅ OK            |
| contracts/prompt-2b-navigation-design.md | #8A63FF                            | Purple                             | Baseline primitive ✅ | ✅ OK            |
| exports/design-tokens.json               | All 9 baseline                     | Complete palette + themes          | All baseline ✅       | ✅ OK            |
| exports/design-tokens.css                | All 9 baseline                     | Complete palette + themes          | All baseline ✅       | ✅ OK            |
| data-model.md (lines 45–46)              | #1a1a1a (historical)               | Near-black (not in baseline)       | Non-baseline ⚠️       | ✅ Replaced (T077) |
| data-model.md (lines 45–46)              | #ffffff (historical)               | Pure white (not in baseline)       | Non-baseline ⚠️       | ✅ Replaced (T077) |
| tasks.md (T077 description)              | #1a1a1a, #d4a574, #ff6b6b, #8b0000 | Named in a task description only   | Not applied ✅        | ✅ OK            |
| contracts/prompt-3a-execution-guide.md   | #1a1a1a, #ffffff, #e8d4b8, #d4a574, #8b0000, #ff6b6b and greys | Early-draft palette | Non-baseline ⚠️ | ⏸️ Superseded notice; Spec 005 owns |
| contracts/prompt-3c-execution-guide.md   | #8b0000, #ff6b6b                   | Early-draft error colours          | Non-baseline ⚠️       | ⏸️ Superseded notice; Spec 005 owns |

<!-- markdownlint-enable MD060 -->

### Unapproved Candidates (Explicitly Absent)

✅ **Confirmed not used anywhere in Spec 004:**

<!-- markdownlint-disable MD060 -->

| Candidate | Description                         | Status    |
| --------- | ----------------------------------- | --------- |
| R3        | Responsive Typography               | ✅ Absent |
| T1        | Additional Typography               | ✅ Absent |
| RT2       | Reader Typography Controls          | ✅ Absent |
| C1        | Reader Continuity/Progress Tracking | ✅ Absent |

<!-- markdownlint-enable MD060 -->

---

## Conclusion

**Audit Result** (updated 2026-11-26): PASS for Spec 004 files. The only non-baseline values left are in the Spec 005-owned Prompt 3A/3C execution guides, which carry a superseded notice.

**Design baseline (Prompts 1–2B, design tokens, exports)**:
✅ PASS — All approved 9-color baseline; no non-baseline colors in the Prompt 1, 2A and 2B design specifications or the token exports.

**Extended scope (data-model.md, tasks.md, Prompt 3A/3C guides)**:
✅ data-model.md now uses baseline values. ⏸️ The Prompt 3A/3C execution guides still contain early-draft colours, marked superseded; Spec 005 must confirm any success, warning or error colour that has no baseline token. *Historical: the first audit flagged data-model.md and tasks.md as pending under T071.*

**Action**: No remaining Spec 004 action (T077 closed). Spec 005 owns the 3A/3C guide colours. Unapproved candidates (R3, T1, RT2, C1) are confirmed absent from all audited files.

---

**Prepared by**: Claude Haiku 4.5  
**Session**: Phase 9 Convergence (T071)
