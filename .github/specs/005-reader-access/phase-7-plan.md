# Phase 7 Implementation Plan: Polish and Cross-cutting

**Feature:** Reader access polish and infrastructure validation  
**Priority:** P2 (after MVP completion)  
**Prerequisite:** Phases 1–6 complete; all user stories implemented

---

## Overview

Phase 7 completes the Reader Access feature by:
1. Validating accessibility across all reader-facing forms and states
2. Implementing scheduled data retention/cleanup
3. Reading back and verifying each saved stage with actual results
4. Establishing deployment infrastructure before production push

---

## Deliverables

### RA-T049 ✅ Accessibility Review (WCAG 2.2 AAA target)
- **Scope:** Keyboard navigation, focus management, screen reader compatibility, color contrast, responsive design
- **Coverage:** All reader-access forms, all 10 reader-visible states (request-pending, request-received, delivery-uncertain, verified, code-invalid, code-expired, code-used, limited, provider-failure, content-unavailable)
- **Files to test:**
  - `src/app/components/ui/ReaderAccessForm.tsx` and `reader-access-form.css`
  - `src/app/components/pages/about/EbookPage.tsx`
  - `src/app/components/pages/book-site/BookHomePage.tsx`
  - `src/app/components/pages/book-site/ThankYouPage.tsx`
  - `src/app/components/pages/book-site/WaitlistPage.tsx`
- **Testing:** Manual review using WAVE, Lighthouse, keyboard navigation, screen reader simulation
- **Output:** Findings recorded in `.github/specs/005-reader-access/verification.md`
- **Note:** AAA is a target (aspirational), not a conformance claim

### RA-T050 ✅ Data Retention & Scheduled Cleanup
- **Implementation:** Create `netlify/functions/reader-retention.ts`
- **Function:** Scheduled deletion of ReaderAccessRecord entries past `delete_after` timestamp
- **Policy:** Automatic cleanup of records 12 months after last authentication (per RA-006, RA-T009)
- **Schedule:** Daily background execution (via Netlify scheduled functions)
- **Safety:** Atomic batch operations, non-destructive validation before deletion

### RA-T051 ✅ Stage Readback & Verification
- **Task:** Document actual results of each saved implementation stage
- **Record:** In `.github/specs/005-reader-access/verification.md`
- **For each stage:**
  - Revision/commit hash of saved work
  - Environment tested (local/preview/staging)
  - Test results and evidence
  - Deviations from spec or discovered gaps
- **Maps to:** RA-012 (stage rule), SC-007 (checks remain "Not run" until executed)

### RA-T052 ✅ Deployment Infrastructure Validation
- **Decision:** Which host serves production? Netlify (via netlify.toml) or Vercel (GitHub app)?
- **Gate:** Must be decided BEFORE any push to main for production
- **Validation:**
  - Confirm netlify.toml routing rules are correct
  - Verify function paths under `/api/reader/` are served before SPA fallback
  - Check environment variables and secrets configuration
  - Validate preview deployments work correctly
- **Maps to:** RA-012 (RA-T052 research R-12)

---

## Success Criteria

- ✅ Accessibility review completed; findings recorded with severity levels
- ✅ Retention function implemented and tested with mock data
- ✅ All stages documented in verification.md with actual results
- ✅ Deployment infrastructure choice documented and validated
- ✅ All 10 reader-visible states tested on actual deployed preview
- ✅ No blocking accessibility issues remain (fixable issues documented)

---

## Branch & Merge Strategy

- **Branch:** `feat/reader-polish-cross-cutting` (created 2026-11-19)
- **Base:** `main` (all Phase 1-6 work merged)
- **Commits:** One per deliverable (RA-T049, RA-T050, RA-T051, RA-T052)
- **PR:** Draft until all checks green
- **Gate:** RA-T052 validation must pass before any main merge to production

---

## Dependencies & Execution Order

**All tasks can proceed in parallel (marked [P]):**
- RA-T049 (accessibility) — independent, requires no implementation changes
- RA-T050 (retention) — standalone scheduled function
- RA-T051 (readback) — documentation task, runs after each prior phase
- RA-T052 (deployment) — infrastructure validation, independent

---

## Notes

- **Decision 4 & 6 settled:** Recovery window (4 hours), recovery-first race handling, 30-day renewals with no ceiling
- **Privacy:** 12-month inactivity TTL for automatic cleanup (per RA-006, RA-T009)
- **Deployment:** This phase **gates production push** — RA-T052 must complete before main→production
- **Accessibility:** AAA target is aspirational; focus on critical WCAG AA compliance

---

**Status:** Ready to implement  
**Branch:** `feat/reader-polish-cross-cutting`  
**Start Date:** 2026-11-19  
**Maps to requirements:** RA-006, RA-012, SC-007
