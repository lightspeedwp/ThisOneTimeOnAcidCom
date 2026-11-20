# Phase 3: Session Management — Research & Design Decisions

**Date**: 2026-11-19  
**Feature**: Reader Access Session Management  
**Foundation**: Phase 2 (email verification) implementation complete

---

## Session Storage Architecture

### Decision: Netlify Blobs for Session Persistence

**What**: Use Netlify Blobs (consistent strong writes) to store session data alongside Phase 2 verification codes.

**Rationale**:
- **Consistency guarantee**: Strong consistency mode prevents race conditions on concurrent reads/writes
- **Reuse Phase 2 patterns**: Already validated and deployed in Phase 2
- **Atomic operations**: Session read-modify-write cycles are safe from duplication
- **Built-in duplication**: No external database dependency; hosted within Netlify infrastructure
- **Performance**: Sub-100ms latency for session lookups (cached in memory when possible)

**Alternatives considered**:
- In-memory session store: Risk of data loss on cold start; doesn't survive deployments
- Database (PostgreSQL/MySQL): Adds infrastructure complexity; overkill for session-only data
- Redis: Requires external service; session loss on cache expiry unacceptable
- Edge storage (Durable Objects/Firestore): Regional latency risks; Blobs is simpler

**Implementation**: Extend Phase 2 store adapter to include session operations alongside code storage.

---

## Session Lifecycle & Expiry Model

### Decision: 30-Day Rolling Window with Passive Renewal

**What**: Sessions extend to 30 days from current time on any read activity. No explicit "refresh" endpoint needed.

**Rationale**:
- **User confidence**: Reader never interrupted mid-read (no surprise logouts)
- **Security appropriate**: 30-day window balances security against account takeover vs. usability
- **Passive renewal**: No extra API calls; renewal happens during chapter access validation
- **Simplicity**: One expiry rule; no session tiers or grace periods
- **Analytics value**: Activity tracking shows real engagement patterns (renewals = active readers)

**Alternatives considered**:
- 7-day expiry + explicit "refresh session" button: Extra UX friction; users forget to click
- 60-day sliding window: Too permissive for security-conscious readers
- Hard expiry (no renewal): Frustrating for engaged readers (forced logout mid-read)
- Session tiers (long/short): Added complexity; spec calls for single uniform behavior

**Edge case handling**:
- Inactive for full 30 days → session expires → reader must reverify email
- Activity detected within window → automatic extend (seamless)
- Logout request → immediate termination (no grace period)

---

## Session Cookie Security

### Decision: HttpOnly + Secure + SameSite=Lax

**What**: Session stored in secure HTTP cookie with no JavaScript access.

**Rationale**:
- **HttpOnly flag**: Prevents XSS attacks from stealing session token via JavaScript
- **Secure flag**: Cookie transmitted only over HTTPS; never on HTTP
- **SameSite=Lax**: Protects against CSRF attacks while allowing normal navigation
- **No token in URL**: Avoids accidental leakage in browser history/logs
- **Browser-managed**: No application code has direct access to token; reduces token-handling bugs

**Alternatives considered**:
- Bearer token in Authorization header: Requires custom storage; more XSS-prone
- localStorage: Vulnerable to XSS (JavaScript-readable); not recommended
- SameSite=Strict: Breaks legitimate cross-site navigation (too restrictive)
- Custom JWT tokens: Higher complexity; less secure than browser-managed cookies

**Validation**: Constant-time comparison of session tokens prevents timing attacks.

---

## Device Identification & Concurrent Limits

### Decision: Device Fingerprint + Configurable Limit (2-3 devices default)

**What**: Identify devices via combination of User-Agent, IP address, and optional device characteristics. Enforce per-reader session limit.

**Rationale**:
- **Multi-device support**: Readers want phone + tablet + desktop access
- **Fairness**: Concurrent limit prevents account sharing abuse
- **Configurable**: Allows tuning per use case without code changes
- **Non-invasive**: No biometric data; privacy-first fingerprinting
- **Fallback graceful**: Users can explicitly select device to terminate (not forced)

**Device identification components**:
1. User-Agent (browser/device type)
2. IP address (network location)
3. Optional: Device timezone, screen resolution (if available)

**Alternatives considered**:
- No concurrent limit: Allows unlimited account sharing (unfair)
- IP-based only: Fails for mobile users switching networks (overly strict)
- Biometric fingerprinting: Privacy concerns; invasive
- UUID from localStorage: Easily cleared; not reliable

**Concurrent limit options**:
- 1 device: Too restrictive for modern readers
- 2 devices: Reasonable (phone + one other)
- 3 devices: More permissive (phone + tablet + desktop)
- Configurable via environment variable for ops flexibility

---

## Activity Tracking & Audit Trail

### Decision: Timestamp Logging for All Session Events

**What**: Record creation, renewal, and termination timestamps for each session in persistent storage.

**Rationale**:
- **Audit trail**: Proves session lifecycle for security investigation
- **Analytics**: Understand reader engagement (how long sessions live; renewal patterns)
- **Debugging**: Troubleshoot session issues with concrete timestamp evidence
- **Compliance**: Demonstrates activity logging for privacy policies
- **Performance**: Timestamps are lightweight; no expensive queries

**Events tracked**:
- `created_at`: When session first established (after verification)
- `renewed_at`: Most recent activity timestamp (auto-updated)
- `terminated_at`: When session ended (logout or expiry)

**Storage**: Stored in session record itself (denormalized); no separate audit log table.

**Alternatives considered**:
- No tracking: Lost operational visibility
- Real-time event stream (Kafka/Pub-Sub): Overkill; adds latency
- Separate audit table: Doubles storage; Blobs handles all via single record

---

## Session Termination Semantics

### Decision: Immediate Logout + No Grace Period

**What**: When reader signs out or session expires, all subsequent access is denied immediately without retry window.

**Rationale**:
- **Security first**: Terminated sessions grant zero access
- **No ambiguity**: Clear before/after state (no "about to expire" grace)
- **Performance**: No expiry grace period lookups; simpler code
- **User control**: Logout is instant and predictable

**Alternatives considered**:
- 5-minute grace period: Allows slow requests to complete; risks security
- Soft expiry (warnings): Extra UX complexity; users ignore warnings
- Lazy deletion: Session lingering after logout; security risk

**Implementation**:
- Logout endpoint immediately invalidates session
- Expired session checked on each chapter access
- 401 response returned on invalid/expired token
- No retry logic; reader must re-verify

---

## Session Validation on Chapter Access

### Decision: Cookie Present + Valid Token + Not Expired

**What**: Three-part check before granting chapter access.

**Rationale**:
- **Defense in depth**: Multiple validation layers catch different failure modes
- **Fast path**: Most valid sessions pass in <100ms
- **Clear error handling**: Each failure type maps to specific error response

**Validation sequence**:
1. Verify cookie present in request
2. Retrieve session from Blobs storage using token
3. Check expiry timestamp against current time
4. Grant access if all three pass

**Error responses**:
- Missing cookie → 401 (redirect to verification)
- Session not found → 401 (token invalid/expired)
- Session expired → 401 (refresh required)

**Optimization**: Cache valid sessions in memory for <100ms ttl to reduce Blobs lookups.

---

## Cross-Tab Session Persistence

### Decision: Shared Cookie + Server-Side Validation

**What**: Session stored in browser cookie (shared across tabs); validation always hits server to check expiry.

**Rationale**:
- **Tab synchronization**: All tabs see same cookie automatically
- **Fresh expiry check**: Each tab access validates against current time
- **No clock skew**: Server truth-of-record for expiry
- **Minimal latency**: Cookie already in HTTP headers; one lookup to Blobs

**Alternatives considered**:
- localStorage: Not shared across tabs reliably; vulnerable to XSS
- SessionStorage: Not shared across tabs by design
- BroadcastChannel API: Requires JavaScript; more complex

---

## Summary: Key Design Principles

| Principle | Implementation |
|-----------|-----------------|
| **Secure-first** | HttpOnly cookies, server-side validation, constant-time comparison |
| **User-friendly** | Auto-renewal, cross-tab persistence, graceful device overflow |
| **Operational** | Activity tracking, audit trail, configurable limits |
| **Performant** | Blobs consistency, session caching, <100ms access latency |
| **Simple** | One-liner rules (30-day window, 2-3 device limit, immediate logout) |

---

## Next Phase: Implementation Planning

These decisions inform:
- **Data model**: Session entity with timestamps + device tracking
- **API contracts**: Session endpoints and validation hooks
- **Storage schema**: Blobs key structure and consistency requirements
- **Testing strategy**: Validation of expiry logic, concurrent access, device limits
