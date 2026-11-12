# Research: Blocking Decisions Analysis

**Feature**: Book Website Figma Make Prompt Pack (004)
**Date**: 2026-11-09
**Status**: Research Phase Complete

---

## Overview

This document analyzes the seven blocking decisions that prevent Prompts 3B (recovery flows) and 3C (error states) from execution. Each decision is documented with options, rationale, and impact assessment to unblock implementation planning.

---

## Blocking Decision 1: Recovery-First Race Condition

**Decision Point**: What happens if both recovery and fresh verification occur simultaneously?

**Rationale**: Reader access policy allows two paths to verification: (1) recovery of a previous confirmed session, or (2) fresh email verification. If both are triggered in the same request window, a race condition exists that determines which path succeeds first and how state is reconciled.

**Options**:

| Option | Description | Trade-offs |
| -------- | ------------- | ----------- |
| **A (Recommended)** | Recovery always takes precedence; cancel fresh verification if recovery succeeds | Prioritizes already-verified readers; minimal state complexity; matches user intent (reuse existing access) |
| B | Fresh verification always takes precedence; invalidate recovery attempt | Ensures latest verification; higher security posture; confusing UX for users expecting recovery to work |
| C | Last-writer-wins (request timestamp order) | Simple implementation; unpredictable UX; may lose user-initiated recovery |
| D | Require explicit user choice before attempting either path | Clearest intent capture; adds friction to UX; delays access by 1+ clicks |

**Decision**: ✅ APPROVED — Option A (Recovery takes precedence; cancel fresh verification if recovery succeeds)

**Impact on Prompt 3B**: Recovery flows specification (Prompt 3B) cannot be finalized until this race condition is documented. Error handling and success criteria depend on the chosen resolution strategy.

---

## Blocking Decision 2: Recovery Lifetime Eligibility

**Decision Point**: How long is a confirmed redemption eligible for recovery access?

**Rationale**: When a reader confirms access via email code, their verification is stored as a recoverable session. The recovery lifetime determines how long that session remains eligible for recovery before it expires and requires fresh verification.

**Options**:

| Option | Description | Trade-offs |
| -------- | ------------- | ----------- |
| **A (Recommended)** | 30-day rolling window from last successful recovery action | Matches device lifecycle (30 days); balances security with UX; simple expiry logic |
| B | 30-day fixed window from initial verification (no rolling) | Simpler implementation; forces re-verification at hard boundary; less forgiving of inactive readers |
| C | No expiry—recovery sessions valid indefinitely | Maximum UX convenience; highest security risk; may conflict with data retention policy |
| D | Configurable per-reader basis (support override) | Flexibility for special cases; added complexity; support burden |

**Decision**: ✅ APPROVED — Option A (30-day device lifecycle with recovery session refresh; absolute 30-day expiry enforced regardless of recovery activity)

**Impact on Prompt 3B**: Recovery flows specification depends on absolute device expiry for state management, cleanup schedules, and error messaging when device lifecycle expires.

---

## Blocking Decision 3: Code Expiry Start Time

**Decision Point**: When does a 10-minute verification code expiry clock start?

**Rationale**: The specification promises a 10-minute verification code, but the start point is ambiguous: (1) generation (when code is created), (2) receipt (when code reaches reader's email), or (3) page load (when reader opens verification page). Each affects UX, security, and error messaging.

**Options**:

| Option | Description | Trade-ties |
| -------- | ------------- | ----------- |
| **A (Recommended)** | From code generation (most strict) | Consistent server-side timing; predictable security window; readers see countdown as ~9 min after email receipt |
| B | From email receipt (configurable by email provider) | Fairest to reader (delay not their fault); requires email provider cooperation; unpredictable for readers without receipt timestamp |
| C | From verification page load (most lenient) | Maximizes UX; reader sees full 10 minutes; expiry can stretch to 10+ minutes with network delays; least secure |

**Decision**: ✅ APPROVED — Option A (From code generation; most strict)

**Impact on Prompts 3A & 3C**:
- Prompt 3A (reader access copy) requires exact timer messaging ("Code expires in 10 minutes from generation" vs. "10 minutes from when you received this email")
- Prompt 3C (error states) error handling for expired codes depends on start time and how to communicate expiry reason to reader

---

## Blocking Decision 4: Email Service Provider Selection

**Decision Point**: Which email service provider will handle verification code delivery?

**Rationale**: The specification references "email service" abstractly, but no concrete provider has been selected. Provider choice affects API capabilities, rate limits, delivery reliability, newsletter integration, and implementation complexity.

**Options**:

| Option | Description | Trade-offs |
| -------- | ------------- | ----------- |
| A | Brevo (formerly Sendinblue) | Strong newsletter integration; good deliverability; familiar to team |
| **B (Recommended)** | SendGrid (industry standard) | Excellent documentation; robust API; strong reputation; higher cost |
| C | Mailgun | Powerful API; strong developers; less newsletter-focused |
| D | Other (AWS SES, Postmark, etc.) | Varies; requires evaluation |

**Decision**: ✅ APPROVED — Hybrid (SendGrid for transactional email + Brevo for newsletters)

**Impact on Prompt 3A**: Email template specification (subject line, body copy, footer branding) must match SendGrid's SMTP template syntax. Newsletter link must direct to Brevo signup URL per Decision 6.

---

## Blocking Decision 5: Manuscript Publication Readiness

**Decision Point**: Is the manuscript approved and available for verified reader access?

**Rationale**: The specification defines reader access to a manuscript (chapters, journal entries, articles), but the manuscript's availability status is unknown. Implementation cannot proceed until the manuscript is confirmed as approved, formatted, and ready for delivery to verified readers.

**Options**:

| Option | Description | Trade-offs |
| -------- | ------------- | ----------- |
| A | Manuscript approved and available; ready for integration | Unblocks access implementation; requires manuscript delivery mechanism in place |
| B | Manuscript approved but not yet formatted for web delivery | Requires formatting/export pipeline before integration; delays access feature |
| **C (Selected)** | Manuscript not yet approved | Access feature cannot launch; requires separate approval gate |

**Decision**: ❌ Option C (NOT APPROVED) — Manuscript in development, targeting approval by January 2027 launch

**Impact on Prompt 3A**: Reader access copy must reference actual manuscript content (e.g., "Access all 12 chapters" vs. "Access selected chapters"). Content delivery mechanism and availability timeframe depend on manuscript readiness status.

---

## Blocking Decision 6: Newsletter Destination (Sign-Up Link)

**Decision Point**: Where does "Sign up for newsletter" link direct?

**Rationale**: The specification separates newsletter signup from reading access verification. However, the signup link's destination is unspecified: (1) inline newsletter consent form on the site, (2) external newsletter provider URL, or (3) separate signup form component.

**Options**:

| Option | Description | Trade-offs |
| -------- | ------------- | ----------- |
| A | Inline consent form (on same page as reader access) | Seamless UX; captures consent server-side; requires newsletter integration |
| **B (Recommended)** | Link to external newsletter provider signup page | Proven pattern; delegated consent handling; readers control subscription directly |
| C | Separate signup form component (post-verification) | Higher friction; newsletter signup becomes second step; clearer intent capture |
| D | No "Sign up" link—newsletter managed separately | Simplest implementation; loses reader opportunity; newsletter signup independent |

**Decision**: ✅ APPROVED — Brevo (external signup page)

**Impact on Prompt 3A**: Copy specification must link to Brevo newsletter signup URL. Form layout and post-verification flow include external link to newsletter subscription.

---

## Blocking Decision 7: Route Enforcement Verification

**Decision Point**: How is sitemap/noindex enforcement verified for /speaking, /events, /media routes?

**Rationale**: Design specification documents that Speaking, Events, and Media should be hidden from the public sitemap (noindex, sitemap exclusion). However, the verification method and enforcement mechanism are unspecified. Options include robots.txt rules, sitemap.xml filtering, or Meta tag verification.

**Options**:

| Option | Description | Trade-ties |
| -------- | ------------- | ----------- |
| **A (Recommended)** | Meta tags + Robots.txt + Sitemap.xml exclusion | Comprehensive coverage; multiple signal to search engines; verifiable at deploy time |
| B | Robots.txt only | Standard method; simpler to implement; less comprehensive (Meta tags still visible in HTML) |
| C | Meta tags only (x-robots-tag in response headers) | Flexible; can vary per request; not visible in sitemap |
| D | Sitemap.xml filtering only | Works for sitemaps; doesn't prevent indexing if URL is discovered elsewhere |

**Decision**: ✅ APPROVED — Option A (Meta tags + Sitemap exclusion; avoid conflicting Robots.txt Disallow rules)

**Impact on Prompt 1** (and verification): Navigation exposure specification (Prompt 1) must document exact enforcement strategy. Implementation validation requires confirmation that /speaking, /events, /media are not published to search engines.

---

## Blocking Decision Summary

| # | Decision | Status | Decision | Impact |
| --- | ---------- | -------- | --- | --- |
| 1 | Recovery-first race condition | ✅ APPROVED | Option A (Recovery precedence) | Prompt 3B (recovery flows) |
| 2 | Recovery lifetime eligibility | ✅ APPROVED | Option A (30-day rolling window) | Prompt 3B (session state) |
| 3 | Code expiry start time | ✅ APPROVED | Option A (From code generation) | Prompts 3A (copy), 3C (errors) |
| 4 | Email service provider | ✅ APPROVED | SendGrid (API key + SMTP) | Prompt 3A (email integration) |
| 5 | Manuscript publication readiness | ✅ DECIDED | Option C (Not yet approved — Draft by Jan 31) | Prompt 3A (content messaging) |
| 6 | Newsletter destination | ✅ APPROVED | Brevo (external signup link) | Prompt 3A (signup link) |
| 7 | Route enforcement verification | ✅ APPROVED | Option A (Meta + Robots + Sitemap) | Prompt 1 (navigation validation) |

**Execution Status** (all decisions resolved):
- ✅ Prompt 1 (Navigation Exposure) — Ready for execution (Decision 7 resolved)
- ✅ Prompt 2A (Design System Baseline) — Ready for execution (no blocking decisions)
- ✅ Prompt 2B (Navigation Design) — Ready for execution (no blocking decisions)
- ✅ Prompt 3A (Reader Access Copy) — Ready for execution (Decisions 3, 4, 5, 6 resolved — uses placeholder messaging for manuscript until approved)
- ⏳ Prompt 3B (Recovery Flows) — Ready for execution (Decisions 1, 2 resolved)
- ⏳ Prompt 3C (Error States) — Ready for execution (Decision 3 resolved)

---

## Status Update (2026-11-11)

✅ **All 7 blocking decisions have been resolved by user:**

1. Recovery-first race: **Option A** (Recovery takes precedence)
2. Recovery lifetime: **Option A** (30-day rolling window)
3. Code expiry start: **Option A** (From code generation)
4. Email service provider: **SendGrid** (API key + SMTP)
5. Manuscript status: **Not yet approved** (Draft ready by 2026-01-31 — using placeholder copy for now)
6. Newsletter destination: **Brevo** (External signup link)
7. Route enforcement: **Option A** (Meta tags + Robots.txt + Sitemap.xml)

**Next Steps**:
1. ✅ All Prompts (1, 2A, 2B, 3A, 3B, 3C) now unblocked and ready for Figma Make execution
2. ✅ Prompt 3A uses placeholder messaging for manuscript content until approved
3. ✅ Proceed to Figma Make execution phase with all decisions locked in

---

## Implementation Constraint: Figma Make Environment Access

**Decision Point** (2026-11-12): Will Figma Make environment (file key, API token, workspace) be used to execute prompts and export design assets?

**Decision**: ❌ **NO** — Figma Make environment will NOT be used for asset exports.

**Impact**:
- **Blocked Tasks**: T008, T009, T010 (Prompt 1, 2A, 2B execution in Figma Make)
- **Blocked Tasks**: T015, T025, T026 (Prompt 3A, 3B, 3C execution)
- **Phase A Status**: Design hand-off prompts cannot be executed via Figma Make
- **Phase B Status**: Reader access and recovery flow prompts cannot be executed via Figma Make
- **Implementation Path**: Prompts exist as exact specifications in `contracts/` folder; manual Figma design work or alternative execution path required

**Revised Workflow**:
1. ✅ Gate 2 approval (T001-T004) — Design baseline confirmed
2. ✅ Specification validation (T005-T007, T012-T013, T017-T018) — Contract review only
3. ❌ **SKIPPED**: Figma Make prompt execution (T008-T010, T015, T025-T026)
4. ✅ Decision resolution (T019-T024) — Proceeds independently
5. ✅ Documentation packaging (T028-T034) — Specifications ready for alternative execution
6. ✅ Polish & validation (T035-T038) — Cross-cutting checks

**Alternative Execution Path**:
- Prompt specifications in `contracts/` are ready for manual Figma design work
- Exact previews can be generated manually by design team
- Design team references contracts/ for exact component names, states, acceptance criteria
- No automated Figma Make execution path available
