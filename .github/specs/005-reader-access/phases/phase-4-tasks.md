# Phase 4 Implementation Tasks — Reader Access Session Management

**Phase 4: User Story 2 — Return, renew and sign out**

Based on Spec 005 RA-T039–RA-T043

## Tests (Contract Tests)

- [ ] RA-T039 Contract tests: session endpoints
  - GET /api/reader/session: 200 with expiresAt, or 401 no session
  - DELETE /api/reader/session: 204 success, 204 even if already ended
  - Renewal: fresh-code verification renews expiresAt forward 30 days

## Implementation (Handlers & Integration)

- [ ] RA-T040 Implement netlify/functions/reader-session.ts
  - GET handler: return session status or 401
  - DELETE handler: end session and clear cookie

- [ ] RA-T041 Extend netlify/functions/reader-verify.ts
  - Fresh-code verification on active session renews it
  - Renewals repeat with no overall ceiling (up to 30 days)
  - Maps RA-004 (session lifecycle)

## UI & Integration

- [ ] RA-T042 Add session controls to EbookReaderNav.tsx
  - Display session status/expiry
  - Sign-out button (DELETE session)
  - Copy from reader-access.ts mock data

## End-to-End Tests

- [ ] RA-T043 Add Playwright e2e for session scenarios
  - Verify session created after code verification
  - Check session expiry display
  - Renew session on fresh code verification
  - Sign-out clears session and redirects

## Checkpoint: US2 (Return & Renew) complete and testable
