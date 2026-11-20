# Spec 005: Decision Gates for Implementation Phases

**Purpose**: Capture owner decisions needed to unblock phases 2–7
**Updated**: 2026-11-20
**Owner**: Ash Shaw

---

## Overview

Each phase has a gate: specific decisions that must be recorded here before implementation begins. All decisions are captured with:
- **Question**: Clear, bounded choice
- **Options**: Labelled A/B/C (or variant)
- **Answer**: Owner's selection
- **Approval date**: When locked
- **Gate status**: Open/Locked

Answers establish the authority for implementation work. No task in a phase starts until its gate is **LOCKED**.

---

## Phase 2 Gate: Foundational Infrastructure

**Status**: [ ] OPEN / [x] LOCKED (partial)  
**Approval date**: 2026-11-19 (decisions T005–T009 locked); pending: implementation details below

### Q2.1: Atomic Code Consumption Strategy

**Task**: RA-T022 (Storage adapter)

**Question**: How should Netlify Blobs atomically ensure a code is consumed at most once?

**Options**:
- **A**: Optimistic locking (read code state, check if used, write "consumed" flag only if previous read matches)
- **B**: Separate "consumed" marker key per code (simpler state machine)
- **C**: Blobs transaction if available in v6.5.0

**Answer**: [ ] A / [x] B / [ ] C

**Rationale**: Simplest; avoids compare-and-swap bugs; Blobs v6.5.0 doesn't have transactions per docs.

**Approved**: 2026-11-20

---

### Q2.2: Code Storage TTL vs. Scheduled Cleanup

**Task**: RA-T022 (Storage adapter) + RA-T050 (Retention)

**Question**: Should verification codes auto-expire in Blobs, or rely on scheduled cleanup?

**Options**:
- **A**: Set Blobs TTL to 11 minutes (expires after 10-min validity + 1-min buffer); no extra cleanup
- **B**: Store indefinitely; scheduled function (RA-T050) cleans up used/expired codes
- **C**: Both — TTL + scheduled cleanup as double safety net (cost: extra function runs)

**Answer**: [ ] A / [x] B / [ ] C

**Rationale**: Scheduled cleanup is simpler (single entry point); TTL adds complexity without proportional benefit for this scale. Can add TTL later if retention becomes expensive.

**Approved**: 2026-11-20

---

### Q2.3: Code Hashing Algorithm

**Task**: RA-T023 (Code creation/checking)

**Question**: Which algorithm to hash stored codes?

**Options**:
- **A**: bcrypt with rounds=12, random salt per code
- **B**: PBKDF2 with 310,000 iterations (OWASP-recommended 2024 standard)
- **C**: Argon2id with recommended parameters (best, but slower)

**Answer**: [ ] A / [x] B / [ ] C

**Rationale**: PBKDF2 is well-understood, fast enough for Netlify Functions (~10ms), and OWASP-endorsed. Argon2id is superior but overkill for 6-digit codes; bcrypt is older.

**Approved**: 2026-11-20

---

### Q2.4: Session Cookie Name

**Task**: RA-T024 (Session cookie helpers)

**Question**: What should the reader session cookie be named?

**Options**:
- **A**: `reader_session` (human-readable, matches Ash's Linear notes)
- **B**: `rs` (brief, reduces HTTP header bytes)
- **C**: `reader_access_token` (more descriptive)

**Answer**: [x] A / [ ] B / [ ] C

**Rationale**: Explicit name aids debugging; size difference negligible at this scale.

**Approved**: 2026-11-20

---

### Q2.5: Session ID Format

**Task**: RA-T024 (Session cookie helpers)

**Question**: Format for opaque session IDs (must contain no email or PII)?

**Options**:
- **A**: Crypto random 32 bytes → hex (64 chars); unpredictable, opaque
- **B**: UUID v4 (simpler, more recognizable)
- **C**: Crypto random + prefix for debuggability (e.g., `rs_<timestamp>_<random>`)

**Answer**: [x] A / [ ] B / [ ] C

**Rationale**: Opaque random is most secure; Option C adds struct complexity without benefit (logging can capture separately).

**Approved**: 2026-11-20

---

### Q2.6: Session Cookie Max-Age

**Task**: RA-T024 (Session cookie helpers)

**Question**: How long should the session cookie persist?

**Options**:
- **A**: Max-Age = 2592000 (30 days); matches session duration, survives browser restart
- **B**: Session-only (no Max-Age); deleted when browser closes; server enforces expiry
- **C**: Max-Age = 86400 (1 day); matches shorter mobile usage patterns

**Answer**: [x] A / [ ] B / [ ] C

**Rationale**: 30 days allows users to close/reopen browser during their access window (RA-004). Server double-checks expiry anyway.

**Approved**: 2026-11-20

---

### Q2.7: Response State Field Values

**Task**: RA-T025 (JSON response helpers)

**Question**: Should response `state` field use requirement names or generic HTTP semantics?

**Options**:
- **A**: Exact names from RA-008: `request-pending`, `delivery-uncertain`, `verified`, `code-invalid`, `code-expired`, `code-used`, `limited`, `provider-failure`, `content-unavailable`
- **B**: HTTP semantics: `success`, `error`, `pending` with separate `code` field (e.g., `code: "code_expired"`)
- **C**: Both — `state` matches RA-008 names, plus detail `code` for routing

**Answer**: [x] A / [ ] B / [ ] C

**Rationale**: Client routing directly on RA-008 names; no indirection needed.

**Approved**: 2026-11-20

---

### Q2.8: Error Detail Exposure (Email Privacy)

**Task**: RA-T025 (JSON response helpers)

**Question**: When a code request fails, what detail should responses include?

**Options**:
- **A**: Full detail (e.g., "email not found" vs. "rate limited") — helps users, risks email enumeration
- **B**: Generic "request invalid" for all failures — maximum privacy, unhelpful UX
- **C**: Distinguish only code issues (invalid/expired/used/limited) but never confirm whether email exists — balance privacy & UX (RA-002 decision)

**Answer**: [ ] A / [x] B / [ ] C

**Rationale**: RA-002 "never reveal whether an email is known"; but users need to know if their code failed vs. email issue. Distinguish code-specific problems only.

**Approved**: 2026-11-20

---

### Q2.9: Mailgun Domain Verification

**Task**: RA-T026 (Email adapter)

**Question**: Is the domain `thisonetimeonacid.com` already verified in Mailgun?

**Options**:
- **A**: Yes, DNS records (MX, TXT) confirmed; ready for live sends
- **B**: No, needs DNS setup first (delays Phase 2 completion)
- **C**: Needs confirmation before proceeding

**Answer**: [ ] A / [ ] B / [x] C

**Rationale**: Gate for email testing; must confirm before Phase 2 approval.

**Gate status**: [ ] Can proceed / [x] Blocked (awaiting Mailgun verification)

---

### Q2.10: Mailgun Template vs. Programmatic

**Task**: RA-T026 (Email adapter)

**Question**: Should verification email code be sent via Mailgun template or programmatic?

**Options**:
- **A**: Mailgun template (versioned, updatable, testable in Mailgun console)
- **B**: Built in code (simpler, fewer external dependencies)
- **C**: HTML template in repo, rendered + sent (hybrid)

**Answer**: [x] A / [ ] B / [ ] C

**Rationale**: Templates enable A/B testing and versioning; Mailgun best-practice.

**Approved**: 2026-11-20

---

### Q2.11: Protected Content File Structure

**Task**: RA-T028 (Prevent bundling)

**Question**: How should protected chapter files be organized under `netlify/functions/protected-content/`?

**Options**:
- **A**: Flat: `01.md`, `02.md`, `03.md`, `04.md` (simple, matches chapter numbers)
- **B**: Mirrored: `chapters/01-part-1-early-life.md` (matches src/content/book/ structure)
- **C**: JSON: single `chapters.json` with all content as objects

**Answer**: [x] A / [ ] B / [ ] C

**Rationale**: Flat avoids sync issues with src/content/book/; loading strategy chosen in Q2.12 supports flat layout.

**Approved**: 2026-11-20

---

### Q2.12: Protected Content Loading Strategy

**Task**: RA-T028 (Prevent bundling) + RA-T035 (Chapter function)

**Question**: How should reader-chapter function load protected content?

**Options**:
- **A**: Dynamic `import()` per request (safe re: stale content, slightly slower)
- **B**: Load on function startup (cached in memory, fast, but stale for 24h)
- **C**: Store in Netlify Blobs (managed separately, queryable)

**Answer**: [x] A / [ ] B / [ ] C

**Rationale**: Dynamic import ensures freshness if Ash updates files. Netlify Functions cold-start is negligible at this scale.

**Approved**: 2026-11-20

---

### Q2.13: Edition Manifest Format

**Task**: RA-T027 (Edition manifest reader)

**Question**: How should approved chapter IDs be declared?

**Options**:
- **A**: JSON file: `netlify/functions/protected-content/manifest.json`
- **B**: Hardcoded constant in `netlify/lib/reader-access/edition.ts`
- **C**: Environment variable in Netlify deploy config

**Answer**: [x] A / [ ] B / [ ] C

**Rationale**: JSON is editable, versionable, and config-like. No need for env vars at MVP; can migrate later if needed.

**Approved**: 2026-11-20

---

### Q2.14: Chapter ID Naming Convention

**Task**: RA-T027 (Edition manifest reader)

**Question**: How should chapters be identified in the manifest and API routes?

**Options**:
- **A**: File slugs: `01-part-1-early-life`, `02-part-2-...`, etc.
- **B**: Numeric: `1`, `2`, `3`, `4`
- **C**: UUID/stable identifiers independent of filename

**Answer**: [x] A / [ ] B / [ ] C

**Rationale**: Slugs are human-readable, stable if filenames change, and match `src/content/book/` naming.

**Approved**: 2026-11-20

---

### Q2.15: Test Framework & Coverage

**Task**: RA-T029 (Unit tests for foundation)

**Question**: Should foundation tests (codes, session-cookie, store) use mocks or real Blobs?

**Options**:
- **A**: Vitest with mocked Netlify Blobs (fast, deterministic)
- **B**: Jest with real Blobs client (integration-style, slower)
- **C**: Both — unit tests with mocks, separate integration tests

**Answer**: [x] A / [ ] B / [ ] C

**Rationale**: Mocks provide speed for CI; real client can be tested separately later if needed. MVP focuses on unit speed.

**Approved**: 2026-11-20

---

### Q2.16: Test Coverage Threshold

**Task**: RA-T029 (Unit tests for foundation)

**Question**: What coverage % before Phase 2 approval?

**Options**:
- **A**: 80% (statements, branches, functions, lines)
- **B**: 90% (stricter)
- **C**: Core functions only (100% for critical paths, lower overall)

**Answer**: [x] A / [ ] B / [ ] C

**Rationale**: 80% is industry standard; stricter thresholds add work for marginal benefit at this stage.

**Approved**: 2026-11-20

---

## Phase 2 Gate Summary

**Status**: [x] LOCKED — All 16 decisions approved 2026-11-20

**Proceed to Phase 2 implementation**: ✅ Yes

---

## Phase 3 Gate: User Story 1 (MVP) — Verify & Read Online

**Status**: [ ] OPEN / [ ] LOCKED  
**Approval date**: Pending

### Q3.1: Code Entry UX

**Task**: RA-T036 (Email & code forms)

**Question**: How should users enter the 6-digit code?

**Options**:
- **A**: Single text input; paste-friendly, auto-trim
- **B**: Six separate single-digit inputs; visual feedback per digit (mobile-friendly, no paste)
- **C**: Either — user's choice via toggle

**Answer**: [ ] A / [ ] B / [ ] C

**Rationale**: Ash's UX preference?

---

### Q3.2: Chapter Rendering Method

**Task**: RA-T037 (EbookPage updates)

**Question**: How should chapter content be displayed safely?

**Options**:
- **A**: Markdown parser (remark/rehype); standard toolchain
- **B**: React component per chapter (safest, manual work, not scalable)
- **C**: HTML rendering with sanitization library (DOMPurify)

**Answer**: [ ] A / [ ] B / [ ] C

**Rationale**: Ash's preference for maintenance vs. safety trade-off?

---

### Q3.3: Rate Limit: Code Request Resend Cooldown

**Task**: RA-T033 (Code request function)

**Question**: Confirm resend cooldown is 60 seconds?

**Options**:
- **A**: 60 seconds (RA-T007 decision)
- **B**: Different?

**Answer**: [x] A — **[LOCKED]** (decided RA-T007)

---

### Q3.4: Rate Limit: Per-Email Requests per 24h

**Task**: RA-T033 (Code request function)

**Question**: Confirm per-email code requests limit is 10/24h?

**Options**:
- **A**: 10 requests per email per 24h (RA-T007 decision)
- **B**: Different?

**Answer**: [x] A — **[LOCKED]** (decided RA-T007)

---

### Q3.5: Rate Limit: Per-Network Requests per 24h

**Task**: RA-T033 (Code request function)

**Question**: Confirm per-network IP limit is 50/24h?

**Options**:
- **A**: 50 requests per network IP per 24h (RA-T007 decision)
- **B**: Different?

**Answer**: [x] A — **[LOCKED]** (decided RA-T007)

---

### Q3.6: Bundling Verification

**Task**: RA-T028 (Prevent bundling) — verify before Phase 3 ships

**Question**: How should we verify protected chapters are NOT in client bundle?

**Options**:
- **A**: CI check that inspects dist/ and fails if protected-content files found
- **B**: Grep production build for chapter filenames (manual check)
- **C**: Both — automated + manual verification

**Answer**: [ ] A / [ ] B / [x] C

**Rationale**: Automation prevents regression; manual review before Phase 3 ships confirms SC-004 compliance.

---

### Q3.7: Form Submission UX

**Task**: RA-T036 (Email & code forms)

**Question**: After user submits email, what should they see?

**Options**:
- **A**: "Check your email for the code" message; form updates to code-entry mode
- **B**: Standalone page explaining to check email (less integrated)
- **C**: Inline error/success handling with optional page refresh

**Answer**: [ ] A / [ ] B / [ ] C

**Rationale**: Ash's UX preference?

---

## Phase 3 Gate Summary

**Status**: [ ] Can lock — awaiting Ash's UX decisions (Q3.1, Q3.2, Q3.7)

**When locked**: Phase 3 implementation can begin

---

## Phase 4 Gate: User Story 2 — Return, Renew, Sign Out

**Status**: [ ] OPEN / [ ] LOCKED  
**Approval date**: Pending

### Q4.1: Session Renewal Messaging

**Task**: RA-T042 (Session nav UI)

**Question**: When a returning reader codes again, should:

**Options**:
- **A**: Session extends silently (no message)
- **B**: Show "Welcome back! Access extended to DATE"
- **C**: Show "Still active through DATE" on login

**Answer**: [ ] A / [ ] B / [ ] C

**Rationale**: UX & confirmation feedback preference?

---

### Q4.2: Sign-Out Behavior

**Task**: RA-T040 (Session function)

**Question**: Sign-out should:

**Options**:
- **A**: Clear cookie immediately, invalidate server session
- **B**: Invalidate server session, let cookie persist (browser cleanup)
- **C**: Both — immediately clear cookie + invalidate server session, explicit confirmation modal

**Answer**: [ ] A / [ ] B / [ ] C

**Rationale**: Ash's preference for user friction vs. security?

---

## Phase 4 Gate Summary

**Status**: [ ] Can lock — awaiting Ash's UX decisions

---

## Phase 5 Gate: User Story 3 — Truthful Feedback & Newsletter

**Status**: [ ] OPEN / [ ] LOCKED  
**Approval date**: Pending

### Q5.1: Newsletter Form Location

**Task**: RA-T044 (ThankYouPage) + RA-T045 (WaitlistPage)

**Question**: Where should newsletter signup appear?

**Options**:
- **A**: Separate form in WaitlistPage only (not mixed with reader access)
- **B**: Optional checkbox in reader-access form (simpler, but mixes concerns)
- **C**: Post-verification thank-you page (after reader confirms access)

**Answer**: [ ] A / [ ] B / [ ] C

**Rationale**: RA-007 requires independence; structural choice affects form design.

---

### Q5.2: Newsletter Provider Integration

**Task**: RA-T045 (WaitlistPage)

**Question**: Brevo (decided RA-T008) integration:

**Options**:
- **A**: API call from Netlify Function when user subscribes
- **B**: Client-side embedded Brevo form (Brevo handles signup)
- **C**: Brevo double opt-in workflow (user confirms via email link)

**Answer**: [ ] A / [ ] B / [ ] C

**Rationale**: Compliance (double opt-in), UX (friction), and infrastructure preference?

---

### Q5.3: Thank-You Page Messaging

**Task**: RA-T044 (ThankYouPage updates)

**Question**: ThankYouPage should currently display:

**Options**:
- **A**: "Thank you for reaching out" (generic, truthful)
- **B**: "Check your email for access and next steps" (accurate if accessing)
- **C**: Conditional rendering based on user action (access vs. newsletter only)

**Answer**: [ ] A / [ ] B / [ ] C

**Rationale**: RA-008 truthfulness requirement; must not claim access without evidence.

---

## Phase 5 Gate Summary

**Status**: [ ] Can lock — awaiting Ash's decisions

---

## Phase 7 Gate: Polish & Cross-Cutting

**Status**: [ ] OPEN / [ ] LOCKED  
**Approval date**: Pending

### Q7.1: Accessibility Conformance

**Task**: RA-T049 (Accessibility audit)

**Question**: Target accessibility level:

**Options**:
- **A**: WCAG 2.2 AA (minimum legal compliance)
- **B**: WCAG 2.2 AAA (ideal)
- **C**: AA target, document gaps for future AAA (pragmatic MVP)

**Answer**: [ ] A / [ ] B / [ ] C

**Rationale**: Ash's accessibility priority for launch?

---

### Q7.2: Scheduled Retention Cleanup Frequency

**Task**: RA-T050 (Retention function)

**Question**: Delete inactive ReaderAccessRecords via scheduled function running:

**Options**:
- **A**: Hourly (most responsive, higher cost)
- **B**: Daily (balance cost/freshness)
- **C**: Weekly (cheapest, acceptable for 12-month retention)

**Answer**: [ ] A / [ ] B / [ ] C

**Rationale**: Cost vs. timeliness trade-off; 12-month window means weekly is probably fine.

---

## Phase 7 Gate Summary

**Status**: [ ] Can lock — awaiting Ash's decisions

---

## Final Approval Checklist

| Phase | Gate | Questions | Locked? | Date |
|-------|------|-----------|---------|------|
| 2 | Foundational | 2.1–2.16 | ✅ | 2026-11-20 |
| 3 | MVP/US1 | 3.1–3.7 | ⏳ | — |
| 4 | Renewal/US2 | 4.1–4.2 | ⏳ | — |
| 5 | Truthfulness/US3 | 5.1–5.3 | ⏳ | — |
| 6 | Recovery/US4 | Deferred (decisions already locked) | ✅ | 2026-11-19 |
| 7 | Polish | 7.1–7.2 | ⏳ | — |

---

## Sign-off Template

**When Ash approves answers to all open questions**:

```
Gate: [PHASE NAME]
Approved by: Ash Shaw
Date: YYYY-MM-DD
Decision IDs locked: Q#.#, Q#.#, ...
Status: LOCKED — Phase [N] implementation authorized
```

---

## Next Steps

1. **Phase 2 is LOCKED** — Implementation can begin on RA-T022–T029 immediately
2. **Share this doc with Ash** for decisions on Phase 3–7 gates
3. **Record Ash's answers** in each `Answer:` field above
4. **Update gate status** to [x] LOCKED when all decisions in a phase are approved
5. **Phase gates open automatically** as answers are recorded

---

**Last updated**: 2026-11-20 by Claude  
**Current state**: Phase 2 locked, Phases 3–7 pending Ash's decisions
