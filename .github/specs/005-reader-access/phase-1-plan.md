# Phase 1: Setup (Shared Infrastructure) — Implementation Plan

**Status:** Ready to implement (all decision blockers resolved)  
**Date Prepared:** 2026-11-19  
**Author:** Claude Haiku 4.5  

---

## Overview

Phase 1 establishes the foundational infrastructure for reader-access feature:
- Directory structure for Netlify Functions
- Dependencies: Mailgun (transactional email) + Netlify Blobs (storage)
- Mock data layer with reader-visible copy (all 10 UI states)

**Checkpoint:** After Phase 1 completes, all three user stories can begin in parallel (Phase 2 → Phase 3).

---

## RA-T019: Netlify Functions Directory Structure

**Goal:** Create function paths and validate routing precedence  
**Owner Decision:** None (infrastructure standard)  
**Effort:** ~2 hours

### Acceptance Criteria

- [ ] `netlify/functions/` directory created
- [ ] `netlify/lib/reader-access/` directory created with subdirectories:
  - `netlify/lib/reader-access/store.ts` (placeholder)
  - `netlify/lib/reader-access/codes.ts` (placeholder)
  - `netlify/lib/reader-access/session-cookie.ts` (placeholder)
  - `netlify/lib/reader-access/mailer.ts` (placeholder)
  - `netlify/lib/reader-access/edition.ts` (placeholder)
  - `netlify/lib/reader-access/responses.ts` (placeholder)
- [ ] `netlify/functions/reader-code-request.ts` (placeholder)
- [ ] `netlify/functions/reader-verify.ts` (placeholder)
- [ ] `netlify/functions/reader-chapter.ts` (placeholder)
- [ ] `netlify/functions/reader-session.ts` (placeholder)
- [ ] `netlify/functions/reader-retention.ts` (placeholder)
- [ ] `netlify.toml` updated: Confirm function routes under `/api/reader/*` are served BEFORE the `/*` → `/index.html` SPA fallback

### Implementation Notes

```toml
# netlify.toml routing verification
# Functions routes must precede:
[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200
```

**Reference:** R-01 (Server-side authorisation location)

---

## RA-T020: Add Dependencies (Mailgun + Netlify Blobs)

**Goal:** Install approved packages for email + storage  
**Owner Decision:** ✅ Mailgun for transactional SMTP; Netlify Blobs for storage (resolved 2026-11-19)  
**Effort:** ~1 hour

### Acceptance Criteria

- [ ] `@mailgun/mailgun.js` added to package.json
- [ ] `@netlify/blobs` added to package.json
- [ ] `npm ci` on Node 24 succeeds
- [ ] `package-lock.json` is consistent (no mismatches)
- [ ] No unexpected transitive dependencies added

### Packages to Add

```json
{
  "dependencies": {
    "@mailgun/mailgun.js": "^9.x.x",
    "@netlify/blobs": "^6.x.x"
  }
}
```

**Verification:**
```bash
npm ci
npm ls @mailgun/mailgun.js @netlify/blobs
```

---

## RA-T021: Create Mock Data Layer with Reader-Visible Copy

**Goal:** Build centralized copy for all 10 reader-visible states  
**Owner Decision:** ⏳ **Copy approval needed** (wording for 10 states)  
**Effort:** ~1.5 hours (once copy approved)

### File Location

`src/app/data/mock/reader-access.ts`

### Acceptance Criteria

- [ ] All 10 reader-visible states covered:
  1. `request-pending` — Email requested, not yet sent
  2. `request-received` — Mailgun accepted request
  3. `delivery-uncertain` — Mailgun reported uncertain delivery
  4. `verified` — Code verified; session created
  5. `code-invalid` — Code format invalid or already used
  6. `code-expired` — 10 minutes elapsed
  7. `code-used` — Consumed by another attempt
  8. `limited` — Too many failed attempts (5)
  9. `provider-failure` — Mailgun error
  10. `content-unavailable` — Edition not in approved manifest
- [ ] All copy includes: "within 10 minutes of requesting it" for time-sensitive states
- [ ] Copy distinguishes reader-facing messages from internal error codes
- [ ] No hardcoded strings left in components (all reference mock data)

### Copy Framework

The object structure should be:

```typescript
export const readerAccessCopy = {
  states: {
    requestPending: {
      title: string,
      message: string,
      action?: string,
    },
    requestReceived: {
      title: string,
      message: string,
    },
    // ... 8 more states
  },
  codeValidity: {
    duration: "10 minutes",
    prompt: "Check your email within 10 minutes of requesting it",
  },
};
```

### Next Step: Copy Review

**Before implementation, please review and approve:**

**Proposed Copy (Draft for Review):**

| State | Title | Message |
|-------|-------|---------|
| `request-pending` | Sending code… | We're preparing your verification code. This may take a moment. |
| `request-received` | Check your email | A code has been sent to your email address. Check within 10 minutes of requesting it. |
| `delivery-uncertain` | Email may be delayed | We've prepared your code, but delivery is uncertain. If it doesn't arrive, request a new one. |
| `verified` | Access granted | You can now read this chapter. Your access is active on this device for up to 30 days. |
| `code-invalid` | Code not recognised | That code is invalid. Check it matches exactly, or request a new one. |
| `code-expired` | Code expired | Your code is no longer valid. Codes expire 10 minutes after request. Request a new one. |
| `code-used` | Code already used | That code has already been used. Request a new one to try again. |
| `limited` | Too many attempts | You've tried too many times. Wait a moment and request a new code. |
| `provider-failure` | Email service error | We couldn't send your code right now. Try again in a moment. |
| `content-unavailable` | Chapter not available | This chapter is not yet available. Check back later. |

---

## Execution Order & Dependencies

```
Phase 0 (must complete before Phase 1 starts)
├── RA-T018 (spec alignment) ✅ On PR #611
├── RA-T001 (re-read) — Planned
├── RA-T002 (reconcile 004) — Planned
├── RA-T003 (reconcile contracts) — Planned
└── RA-T004 (Make parity) — Planned

Phase 1 (can run in parallel after Phase 0 complete)
├── RA-T019 (Netlify functions) → Can start immediately (no blockers)
│   └── RA-T020 (dependencies) → Depends on RA-T019; unblocked by decision 1 ✅
│       └── RA-T021 (mock data) → Depends on copy approval ⏳
└── RA-T017 (regression baseline) — Needs approval to run
```

---

## Blockers & Decision Status

| Task | Blocker | Status | Action |
|------|---------|--------|--------|
| RA-T019 | Phase 0 completion | Planned | Confirm RA-T001–RA-T004 start date |
| RA-T020 | Decision 1 (email provider) | ✅ **Resolved** | Mailgun approved |
| RA-T021 | Copy approval | ⏳ **Pending** | Review proposed copy above |

---

## Checkpoint & Transition

**Phase 1 Completion Criteria:**
- ✅ All three tasks (RA-T019, RA-T020, RA-T021) complete
- ✅ Build passes (lint, tests, type checks)
- ✅ netlify.toml routes verified
- ✅ Mock data wired into BookHomePage/EbookPage components

**Transition to Phase 2:**
Once Phase 1 passes, Phase 2 (Foundational layer) can begin:
- RA-T022–RA-T029: Storage, codes, sessions, manifests, tests

---

## Questions for Ash

1. **Phase 0 Timeline:** When can RA-T001–RA-T004 start? (These unblock Phase 1 formally, though RA-T019–RA-T021 can proceed in parallel.)

2. **Copy Review:** Does the proposed copy (table above) work, or do you have different wording preferences?

3. **Phase 1 Start:** Ready to begin RA-T019 immediately, or wait for Phase 0 completion?

---

**Next Steps Once Approved:**
- Approve proposed copy → Unblocks RA-T021
- Confirm Phase 0 timeline → Formalizes Phase 1 go-ahead
- Begin RA-T019 → Creates function directory structure
