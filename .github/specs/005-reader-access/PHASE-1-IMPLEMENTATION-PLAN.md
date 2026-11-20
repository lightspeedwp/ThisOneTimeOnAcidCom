# Phase 1 Implementation Plan: Shared Infrastructure

**Phase**: 1 (Shared infrastructure)  
**Date**: 2026-11-19  
**Status**: Ready to implement (Phase 0 approvals recorded)  
**Branch**: `feat/phase-1-reader-access-shared-infrastructure`  
**Target completion**: End of week (2026-11-22)

---

## Overview

Phase 1 sets up the foundation for all reader-access functionality. It creates:
1. Server-side infrastructure (Netlify Functions directories)
2. External dependencies (Mailgun, Netlify Blobs)
3. Visitor-facing copy and state definitions

**Three core tasks**:
- **RA-T019**: Netlify Functions infrastructure
- **RA-T020**: SDK and client dependencies
- **RA-T021**: Visitor copy mock data

---

## Task Breakdown

### RA-T019: Netlify Functions Directory Structure

**Objective**: Create the directory structure for Netlify Functions with server routing configured.

**Deliverables**:
- Create `netlify/functions/` directory (if not present)
- Create `netlify/lib/reader-access/` directory for shared utilities
- Verify `netlify.toml` routes `/api/reader/*` → Netlify Functions **before** `/*` → `/index.html` fallback

**Files to create**:
```
netlify/functions/
  reader-code-request.ts    # POST /api/reader/code-requests
  reader-verify.ts          # POST /api/reader/verifications
  reader-chapter.ts         # GET /api/reader/chapters/{chapterId}
  reader-session.ts         # GET/DELETE /api/reader/session
  reader-retention.ts       # Scheduled function (cleanup)

netlify/lib/reader-access/
  (empty directory; filled in Phase 2)
```

**Files to update**:
- `netlify.toml` — Add or confirm route precedence

**Mapping**: RA-001 (protected chapter delivery), SC-004 (server-only content access)

---

### RA-T020: Dependencies (Mailgun + Netlify Blobs)

**Objective**: Add required external service SDKs to the project.

**Current state**:
- `package.json` exists; Node 24 configured
- `package-lock.json` exists

**Changes**:
1. Add `mailgun.js` to `package.json` (or `@mailgun/mailgun.js`)
   - Latest version compatible with Node 24
   - Dev/prod: production dependency

2. Add Netlify Blobs client
   - Already included in Netlify Functions runtime (no explicit npm install needed)
   - But verify it's available via imports

3. Run `npm ci` to validate lockfile consistency
   - Ensure no conflicts
   - Check for security advisories

**Validation**:
- `npm audit` passes (no critical/high security issues)
- Lockfile diff is clean (only additions, no removals of existing deps)

**Mapping**: RA-006 (email provider), RA-002 (storage backend)

---

### RA-T021: Visitor Copy Mock Data

**Objective**: Create the reader-visible copy for all possible reader states, including privacy notice.

**File**: `src/app/data/mock/reader-access.ts`

**Content**: 
Visitor-facing strings for 10 states:
- `request-pending` — "Enter your email to request access"
- `request-received` — "Code sent; check your email"
- `delivery-uncertain` — "Code delivery delayed; try again or check spam"
- `verified` — "Access granted; reading..."
- `code-invalid` — "Invalid code; try again"
- `code-expired` — "Code expired; request a new one"
- `code-used` — "Code already used; request a new one"
- `limited` — "Too many attempts; try again in 1 hour" (or per RA-T007)
- `provider-failure` — "Service temporarily unavailable"
- `content-unavailable` — "Chapter not available yet"

Plus:
- Privacy notice (drafted by Ash, per RA-T009)
- Form labels and button copy
- Error messages

**Approval**: 
- Privacy notice text approved by Ash (privacy reviewer)
- All copy follows brand voice (UK English, Figma Make bundler safe)

**Mapping**: RA-003/RA-008 (feedback states), RA-006 (privacy notice)

---

## Implementation Sequence

| Task | Depends on | Effort | Days |
| --- | --- | --- | --- |
| RA-T019 | Phase 0 approval ✓ | 1–2 hours | 1 |
| RA-T020 | Phase 0 approval ✓ | 30–45 min | 1 |
| RA-T021 | Privacy notice (Ash) | 1–2 hours | 1 |

**All tasks can run in parallel** after RA-T021 copy is approved.

---

## Branch & PR Strategy

**Branch name** (per CLAUDE.md): `feat/phase-1-reader-access-shared-infrastructure`

**Single PR** covering all three tasks:
- Title: `feat: Phase 1 reader-access shared infrastructure`
- Label: `phase-1`, `reader-access`, `infrastructure`
- Linked issue: (reference any existing meta-issue if present)

**CI checks**:
- Linting (eslint, prettier, markdownlint)
- Build validation
- Lockfile check (no security advisories)

---

## Quality Gates

Before merging:
- [ ] All three directories/files created
- [ ] `netlify.toml` routing verified (manual or screenshot)
- [ ] `npm audit` clean
- [ ] No untracked files
- [ ] Copy approved by Ash
- [ ] All CI checks green

---

## Next Phase (Phase 2)

Once Phase 1 merges, Phase 2 (Foundational) can begin:
- **RA-T022**: Storage adapter (Netlify Blobs consume-once operation)
- **RA-T023**: Code hashing and validation
- **RA-T024**: Session cookies
- **RA-T025**: JSON response helpers
- **RA-T026**: Email adapter (Mailgun SDK integration)
- **RA-T027**: Edition manifest reader
- **RA-T028**: Bundle protection for protected edition
- **RA-T029**: Unit tests

---

## Blockers & Risks

| Item | Blocker? | Mitigation |
| --- | --- | --- |
| Privacy notice copy approval | No (can use placeholder) | Ash approves by EOD 2026-11-19 |
| Mailgun SDK version compatibility | Low | Test `npm ci` before merge |
| Netlify.toml route precedence | Low | Verify via screenshot or Netlify UI |

---

**Status**: ✅ Ready to start. All Phase 0 decisions approved. Proceeding to implementation.

