# Phase 3 Implementation Continuation Prompt

**Status**: Phase 1-2 Foundation COMPLETE & MERGED to main
**Branch**: feat/phase-3-reader-access (or create new from main)
**Date Started**: 2026-11-20
**Foundation Merged**: PR #635 ✅

---

## 🎯 Objective

Implement Phase 3: Reader Access Session Management — Full user journey implementation with 53 tasks across 5 user stories, building on the production-ready Phase 1-2 foundation.

## 📦 What's Ready (Phase 1-2 Foundation)

✅ **Session Infrastructure** (now in main):
- Session lifecycle management (create/validate/renew/terminate)
- 30-day rolling expiration with passive renewal
- 256-bit cryptographically secure tokens (UUID v4)
- Device fingerprinting (User-Agent + IP + timezone hash)
- Constant-time token comparison (timing attack prevention)
- HttpOnly/Secure/SameSite=Lax cookie security
- Netlify Blobs storage adapter with strong consistency
- Session service orchestrating all operations
- Comprehensive test fixtures (771 passing tests)

✅ **Files Available**:
- `netlify/lib/reader-access/session.ts` — Session entity types
- `netlify/lib/reader-access/session-config.ts` — Configuration
- `netlify/lib/reader-access/session-cookie.ts` — Cookie utilities
- `netlify/lib/reader-access/session-middleware.ts` — Validation middleware
- `netlify/lib/reader-access/session-service.ts` — Business logic
- `netlify/lib/reader-access/store.ts` — Netlify Blobs adapter
- `netlify/lib/reader-access/crypto.ts` — Token generation
- `netlify/lib/reader-access/device-fingerprint.ts` — Device tracking
- `.github/specs/006-reader-access-session-mgmt/` — Full specification

---

## 🚀 Phase 3 Scope: 53 Tasks Across 5 User Stories

### User Story 1 (P1): Seamless Chapter Access After Email Verification — 10 tasks
- Session creation after verification completion
- Cookie-based session persistence across tabs/reloads
- Chapter access middleware integration
- Error handling for missing/invalid sessions
- Session validation performance optimization

### User Story 2 (P1): 30-Day Rolling Session Renewal — 10 tasks
- Automatic session renewal on activity
- Expiry timestamp updates
- Session extension logic
- Edge case handling (clock skew, concurrent requests)
- Renewal coalescing (<1 second requests)

### User Story 3 (P2): Activity Tracking for Session Lifecycle — 10 tasks
- Creation event logging
- Renewal event tracking
- Termination/expiry recording
- Audit trail persistence
- Analytics event emission

### User Story 4 (P2): Concurrent Device Limit Enforcement — 10 tasks
- Device limit configuration (default 2-3 devices)
- Active session enumeration per reader
- Device selection/termination flow
- Error responses for exceeded limits
- Device management UI components

### User Story 5 (P1): Secure Session Termination — 13 tasks
- Explicit logout endpoint
- Session cookie clearing
- Terminated session persistence
- 401 handling for terminated sessions
- Session reuse prevention

### Polish & Cross-Cutting — 14 tasks
- Performance optimization (<100ms validation)
- Error handling and recovery
- Logging and observability
- Security audit logging
- E2E test coverage
- Documentation

---

## 🏗️ Implementation Strategy

**Recommended MVP scope**: User Stories 1 + 5 (seamless access + secure termination)
- Core user value: immediate chapter access after verification, controlled logout
- Security-critical: termination prevents session reuse
- Foundation: enables all other stories

**Phased rollout**:
1. Phase 3a: US1 + US5 (MVP)
2. Phase 3b: US2 (renewal)
3. Phase 3c: US3 + US4 (analytics & device limits)

---

## 🔄 How to Continue

### In Claude Code

1. **Create new session from main**:
   ```bash
   git checkout main
   git pull origin main
   git checkout -b feat/phase-3-reader-access-impl
   ```

2. **Run /speckit-tasks** to generate the implementation task breakdown:
   - Point to `.github/specs/006-reader-access-session-mgmt/`
   - Use existing spec.md, plan.md, data-model.md, contracts/
   - Generate prioritized task list

3. **Follow the specification documents**:
   - Start with spec.md for user story details
   - Use data-model.md for entity structure
   - Follow contracts/session-api.md for endpoint design
   - Execute tasks.md tasks in order

### Next Steps

1. **Generate implementation tasks**
```text
   /speckit-tasks
   ```

2. **Start with Phase 3a (MVP)**
   - Implement US1: Seamless Chapter Access
   - Implement US5: Secure Session Termination
   - Write E2E tests
   - Deploy to preview

3. **Iterate through user stories**
   - Each story independently testable
   - Each story independently deployable
   - Validate with performance targets (<100ms validation)

---

## 📋 Validation Checklist

- [ ] All 53 Phase 3 tasks completed
- [ ] 771 Phase 1-2 tests still passing
- [ ] All new tests passing (target: 100+ new tests)
- [ ] Performance targets met (<100ms validation, <200ms creation)
- [ ] Security audit: timing attacks, token replay, device limits
- [ ] E2E tests covering all 5 user stories
- [ ] Documentation updated
- [ ] Merged to main
- [ ] Deployed to production

---

## 🔐 Security Reminders

- Tokens: cryptographically secure, never in URLs, constant-time comparison
- Cookies: HttpOnly, Secure, SameSite=Lax always
- Device limits: prevent account abuse (2-3 concurrent devices)
- Termination: immediate 401 on terminated sessions, no reuse
- Concurrency: strong consistency, atomic operations
- Logging: no PII in logs, audit trail immutable

---

## 📚 Reference

- **Foundation code**: Phase 1-2 (merged to main)
- **Specification**: `.github/specs/006-reader-access-session-mgmt/`
- **API Contracts**: `.github/specs/006-reader-access-session-mgmt/contracts/session-api.md`
- **Data Model**: `.github/specs/006-reader-access-session-mgmt/data-model.md`
- **Test Patterns**: Phase 1-2 unit/E2E tests in codebase

---

**Ready to continue? Run `/speckit-tasks` to generate Phase 3 implementation tasks!**
