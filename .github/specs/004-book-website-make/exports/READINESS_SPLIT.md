# Readiness Exports: Spec 004 ↔ Spec 005 Split

**Date**: 2026-11-20  
**Phase**: 9 Convergence (T065)  
**Decision**: Option B (Split design readiness from reader-access readiness)  
**Status**: Complete

---

## Rationale

After reader-access work moved to Spec 005, Spec 004 readiness checklists should reflect **design-only readiness**, not reader-access implementation readiness. Keeping reader-readiness items in Spec 004 creates false ownership and confusion.

**Decision**: Split now.
- Spec 004 owns: Design baseline readiness (Prompts 1–2B, design tokens, design export artifacts)
- Spec 005 owns: Reader-access readiness (Prompts 3A–3C, reader UX, error handling, verification flows)

---

## Spec 004 Readiness (Design Only)

✅ **Currently maintained in Spec 004**:
- `.github/specs/004-book-website-make/exports/implementation-readiness-checklist.md` — Design readiness items
- `.github/specs/004-book-website-make/checklists/prompt-preview-validation.md` — Prompt 1–2B preview completeness
- `.github/specs/004-book-website-make/exports/GATE_2_SIGN_OFF_SUMMARY.md` — Design baseline approval gate

**What stays**:
- Prompt 1 (Navigation) readiness → Design baseline ✅
- Prompt 2A (Design System) readiness → Design baseline ✅
- Prompt 2B (Navigation Design) readiness → Design baseline ✅
- Design token export artifacts readiness → Design baseline ✅
- Design baseline approval (Gate 2) → Design baseline ✅

**Success criteria**:
- Design baseline complete and approved ✅
- Design tokens exported (JSON + CSS) ✅
- Prompts 1–2B ready for Figma Make execution ✅
- No breaking changes after Gate 2 approval ✅

---

## Spec 005 Readiness (Reader Access)

⏳ **To be maintained in Spec 005**:
- Reader-access implementation readiness
- Prompt 3A (Reader Copy & Forms) readiness
- Prompt 3B (Recovery Flows) readiness
- Prompt 3C (Error States) readiness
- Decision resolution readiness (Decisions 3–6, with 1–2 from Spec 004)

**What moves**:
- Reader-access testing scenarios → Spec 005
- Form state validation → Spec 005
- Error messaging validation → Spec 005
- Verification flow readiness → Spec 005
- Newsletter integration readiness → Spec 005

**Spec 005 should create**:
- `exports/implementation-readiness-checklist.md` (reader access only)
- `exports/GATE_3_READINESS_REPORT.md` (reader-access gate approval)
- Checklists for Prompts 3A–3C validation

---

## Handoff Checklist

✅ **Spec 004 side**:
- [x] Design-only readiness checklists remain in place
- [x] Reader-access items removed from scope
- [x] Design token exports completed
- [ ] Prompt 2A verification completed (≥95%, T063)
- [x] Decision 1–7 documented in `research.md`
- [x] Handover document prepared
- [x] Spec 005 readiness scope defined (this document)

⏳ **Spec 005 side** (independent):
- [ ] Create reader-access readiness checklist
- [ ] Review Decisions 1–6 (available in Spec 004 `research.md`)
- [ ] Define reader-access approval gate (Gate 3?)
- [ ] Coordinate with Ash on Decision 6
- [ ] Execute Figma Make Prompts 3A–3C
- [ ] Validate against readiness criteria

---

## Implementation Notes

**For Spec 004 maintainers**:
- Keep `implementation-readiness-checklist.md` updated with design-only criteria
- Do NOT add reader-access items to design readiness
- Reference this document if reader-access readiness questions arise

**For Spec 005 team**:
- Reference Spec 004's design readiness as a model for your own checklist
- Use same format/structure for consistency
- Call out dependencies on Decisions 1–2 (resolved in Spec 004) where needed

---

**Prepared by**: Claude Haiku 4.5  
**Session**: Phase 9 Convergence (T065)
