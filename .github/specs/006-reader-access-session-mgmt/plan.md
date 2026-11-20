# Implementation Plan: Reader Access Session Management (Phase 3)

**Branch**: `feat/phase-3-reader-access` | **Date**: 2026-11-19 | **Spec**: [spec.md](spec.md)

**Input**: Phase 3 reader session lifecycle management with 30-day rolling window, device tracking, and secure session validation.

**Foundation**: Builds on Phase 2 (email verification) implementation. Reuses verification code storage and extends session storage adapter.

## Summary

Implement user session lifecycle (creation, renewal, expiration, termination) with 30-day rolling window, activity tracking, and concurrent device limit enforcement. Enable seamless chapter access after verification using security-first session validation (HttpOnly cookies, strong consistency, constant-time comparison).

## Technical Context

**Language/Version**: TypeScript 5.x (Node.js runtime; Netlify Functions)

**Primary Dependencies**: 
- @netlify/blobs (session persistence with strong consistency)
- Node crypto module (session token generation + constant-time comparison)
- Express/HTTP cookie handling (HttpOnly, Secure, SameSite)

**Storage**: Netlify Blobs (consistent strong writes; extends Phase 2 store adapter)

**Testing**: Vitest unit tests + Playwright E2E tests (reuse Phase 2 test suite patterns)

**Target Platform**: Netlify Functions (serverless) + browser with cookie support

**Project Type**: Web service (Netlify-hosted SPA backend)

**Performance Goals**: 
- Session creation: <200ms (acceptable: <500ms)
- Session validation: <100ms per request (acceptable: <200ms)
- Support 1000 concurrent readers with multiple sessions each

**Constraints**: 
- <100ms p95 for chapter access latency (after session validation)
- Zero grace period for expired sessions (immediate 401)
- Constant-time comparison for token validation (timing attack prevention)

**Scale/Scope**: 
- Multi-device support (2-3 concurrent devices per reader)
- 30-day session window
- Activity tracking and audit logging
- Device fingerprinting (User-Agent + IP)

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

[Gates determined based on constitution file]

## Project Structure

### Documentation (this feature)

```text
.github/specs/[###-feature]/
├── plan.md              # This file (/speckit.plan command output)
├── research.md          # Phase 0 output (/speckit.plan command)
├── data-model.md        # Phase 1 output (/speckit.plan command)
├── quickstart.md        # Phase 1 output (/speckit.plan command)
├── contracts/           # Phase 1 output (/speckit.plan command)
└── tasks.md # Phase 2 output (/speckit.tasks command - NOT created by
/speckit.plan)

```text

### Source Code (repository root)

<!--
  ACTION REQUIRED: Replace the placeholder tree below with the concrete layout
  for this feature. Delete unused options and expand the chosen structure with
  real paths (e.g., apps/admin, packages/something). The delivered plan must
  not include Option labels.
-->

```text

# [REMOVE IF UNUSED] Option 1: Single project (DEFAULT)

src/
├── models/
├── services/
├── cli/
└── lib/

tests/
├── contract/
├── integration/
└── unit/

# [REMOVE IF UNUSED] Option 2: Web application (when "frontend" + "backend" detected)

backend/
├── src/
│   ├── models/
│   ├── services/
│   └── api/
└── tests/

frontend/
├── src/
│   ├── components/
│   ├── pages/
│   └── services/
└── tests/

# [REMOVE IF UNUSED] Option 3: Mobile + API (when "iOS/Android" detected)

api/
└── [same as backend above]

ios/ or android/
└── [platform-specific structure: feature modules, UI flows, platform tests]

```text

**Structure Decision**: [Document the selected structure and reference the real
directories captured above]

## Complexity Tracking

> **Fill ONLY if Constitution Check has violations that must be justified**

| Violation | Why Needed | Simpler Alternative Rejected Because |
|-----------|------------|-------------------------------------|
| [e.g., 4th project] | [current need] | [why 3 projects insufficient] |
| [e.g., Repository pattern] | [specific problem] | [why direct DB access insufficient] |
