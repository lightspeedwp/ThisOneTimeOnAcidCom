# Spec 004 → Spec 005 Handover Document

**Date**: 2026-11-20  
**Phase**: 9 Convergence (T066)  
**Decision Date**: 2026-11-13  
**Status**: Handover complete; Spec 005 owns reader access

---

## Summary

Spec 004 completes design specification and hand-off to Spec 005 for reader-access implementation. Stage IDs 3A–3C (reader access, recovery flows, error states) transition from Spec 004 responsibility to [Spec 005 — Reader Access](../../005-reader-access/spec.md) full ownership.

---

## What Moves to Spec 005

### Tasks Moved

| Task ID | Original | Description | New Owner | Note |
|---------|----------|-------------|-----------|------|
| T014 | Spec 004 | Review Prompt 3A contract | Spec 005 | Decision blocking resolved |
| T015 | Spec 004 | Execute Prompt 3A (copy & forms) | Spec 005 | Figma Make execution |
| T016 | Spec 004 | Validate Prompt 3A specification | Spec 005 | Verification after execution |
| T025 | Spec 004 | Execute Prompt 3B (recovery flows) | Spec 005 | Depends on Decisions 1–2 ✅ |
| T026 | Spec 004 | Execute Prompt 3C (error states) | Spec 005 | Depends on Decision 3 ✅ |
| T027 | Spec 004 | Validate Prompts 3B/3C | Spec 005 | Verification after execution |

### Contracts Transferred

**Full Ownership** (move to Spec 005 for execution):
- `contracts/prompt-3a-reader-access.md` — Email copy, form wording, error messages, newsletter CTA
- `contracts/prompt-3b-recovery-flows.md` — Recovery UI/UX flows, race condition handling, session lifecycle
- `contracts/prompt-3c-error-states.md` — Error messaging, code expiry, edge cases

**Reference Only** (remain in Spec 004 for historical traceability):
- `contracts/prompt-1-navigation-exposure.md` — Design baseline (stays)
- `contracts/prompt-2a-design-baseline.md` — Design baseline (stays)
- `contracts/prompt-2b-navigation-design.md` — Design baseline (stays)

### Decisions Transferred

**Decision Ownership**:
| Decision | Blocking | Status | Owner | Note |
|----------|----------|--------|-------|------|
| **Decision 1** | Race condition handling | ✅ Resolved | Spec 004 | Used by Spec 005 |
| **Decision 2** | Recovery lifetime (30-day absolute) | ✅ Resolved | Spec 004 | Used by Spec 005 |
| **Decision 3** | Code expiry start time | ✅ Resolved | Spec 004 | Used by Spec 005 |
| **Decision 4** | Email provider (SendGrid + Brevo) | ✅ Resolved | Spec 004 | Used by Spec 005 |
| **Decision 5** | Manuscript readiness (early release) | ✅ Resolved | Ash | Shared with Spec 005 |
| **Decision 6** | Newsletter destination | ⏳ Pending | Spec 005 | To be resolved by Spec 005 |
| **Decision 7** | Route enforcement (meta tags + robots + sitemap) | ✅ Resolved | Spec 004 | Remains with design |

### Reference Documents

Reader-access reference documents remain available for Spec 005:
- `.github/specs/004-book-website-make/references/03-author-decisions-launch-scope.md` — Ash's approval for early release (2026-11-13)
- `.github/specs/004-book-website-make/references/06-website-reading-prd.md` — Product requirements for reader access
- `.github/specs/004-book-website-make/references/05-design-reader-decision-register.md` — Design decisions impacting reader UX

---

## What Stays in Spec 004

### Design Baseline (Complete)

✅ **Prompts 1–2B** remain with Spec 004:
- Prompt 1: Navigation Exposure (hide /speaking, /events, /media)
- Prompt 2A: Design System Baseline (CSS tokens + JSON design tokens)
- Prompt 2B: Navigation Design (responsive, all states)

✅ **Exports** (Spec 004 deliverables):
- `exports/design-tokens.json` — JSON design token format (Prompt 2A output)
- `exports/design-tokens.css` — CSS variables format (Prompt 2A output)
- `exports/GATE_2_SIGN_OFF_SUMMARY.md` — Design baseline approval
- `exports/GATE_2_READINESS_REPORT.md` — Technical readiness

✅ **Decisions 1–7** (Spec 004 owns documentation):
- Decision 7 (route enforcement) stays with design; Decisions 1–6 are inputs to Spec 005
- All documented in `research.md` for future reference

---

## Handoff Checklist

✅ **Spec 004 side**:
- [x] Decisions 1–6 clarified and recorded in `research.md`
- [x] Stage IDs 3A–3C marked as "moved to Spec 005" in `spec.md`
- [x] Contracts remain available for reference
- [x] Design baseline (Prompts 1–2B) complete and exported
- [x] Tasks T014–016, T025–027 marked as MOVED_TO_SPEC_005 in `tasks.md`
- [x] Handover document created (this file)

⏳ **Spec 005 side** (independent):
- [ ] Read contracts/prompt-3a-reader-access.md, 3b, 3c
- [ ] Review Decisions 1–6 in Spec 004 `research.md`
- [ ] Establish own task breakdown for reader-access execution
- [ ] Coordinate with Ash on Decision 6 (newsletter destination)
- [ ] Execute Figma Make Prompts 3A–3C
- [ ] Validate reader-access outputs against contracts

---

## Timeline

| Date | Event | Owner |
|------|-------|-------|
| 2026-11-09 | Spec 004 research & decisions begun | Spec 004 |
| 2026-11-13 | Decisions 1–6 finalized; early-release approval (Ash) | Ash |
| 2026-11-13 | Reader-access work formally moved to Spec 005 | Spec 004 |
| 2026-11-20 | Phase 9 convergence: handover document prepared | Spec 004 |
| 2026-11-20+ | Spec 005 execution (Figma Make Prompts 3A–3C) | Spec 005 |

---

## Questions for Spec 005

**Before starting Prompt 3A execution**:
1. Do all Decisions 1–6 sufficiently clarify requirements, or do you need additional research?
2. Is Decision 6 (newsletter destination) ready, or should Spec 005 resolve it first?
3. Should reader-access error messages reference the now-resolved Decisions 1–3?
4. Do you need any changes to the contracts (3A–3C) based on Decision 5's early-release direction?

---

## References

- **Spec 004**: [.github/specs/004-book-website-make/spec.md](../spec.md)
- **Spec 005**: [.github/specs/005-reader-access/spec.md](../../005-reader-access/spec.md)
- **Decisions**: [Spec 004 research.md](../research.md)
- **Contracts**: [Spec 004 contracts/](../contracts/)

---

**Prepared by**: Claude Haiku 4.5  
**Session**: Phase 9 Convergence (T066)
