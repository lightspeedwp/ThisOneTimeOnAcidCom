# Phase 3 Implementation Tasks — Reader Access

**Phase 3: User Story 1 — Verify and read online (MVP)**

Based on Spec 005 RA-T030–RA-T038

## Tests (Contract & Unit Tests)

- [ ] RA-T030 Contract tests: code-request handler (202 received, 502 failure, 429 limited, 400 invalid)
- [ ] RA-T031 Contract tests: verify handler (200 verified with cookie, 400 invalid, 410 expired/used, 429 limited, concurrent race handling)
- [ ] RA-T032 Contract tests: chapter handler (200 with active session + approved chapter, 401 no content, 404/503 unavailable)

## Implementation (Handlers & Integration)

- [ ] RA-T033 Implement netlify/functions/reader-code-request.ts (POST /api/reader/code-requests)
- [ ] RA-T034 Implement netlify/functions/reader-verify.ts (POST /api/reader/verifications) with atomic code consumption
- [ ] RA-T035 Implement netlify/functions/reader-chapter.ts (GET /api/reader/chapters/{chapterId})
- [ ] RA-T036 Build UI: ReaderAccessForm.tsx component with reader-access-form.css styles
- [ ] RA-T037 Update EbookPage.tsx to load chapters from /api/reader/chapters/{chapterId}

## End-to-End Tests

- [ ] RA-T038 Add Playwright e2e journeys in e2e/reader-access.spec.ts for complete verification flow

## Checkpoint: US1 MVP complete and testable
