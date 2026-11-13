# Blocking Decisions Resolution: Gate 1 APPROVED

**Date**: 2026-11-11
**Status**: ✅ USER DECISIONS RECEIVED AND DOCUMENTED
**Context**: 7 blocking decisions for Spec 004 Book Website Figma Make Prompt Pack

---

## Summary

This document records the final decisions for all 7 blocking decisions, approved by Ash on 2026-11-11.

**Timeline Note**: 27 January 2027 is the author's stated launch intention, recorded as **unapproved** in [reference 03](../references/03-author-decisions-launch-scope.md); it is not an approved launch date. The manuscript is in development. No manuscript approval date has been set; Ash must confirm one, and it must fall before any approved launch date.

**⚠️ CRITICAL DECISION**: Decision 5 (Manuscript Publication Readiness) → **Option C (NOT APPROVED)**
- Website launch target: 27 January 2027 (unapproved intention, not an approved launch date)
- Manuscript in development; approval date not yet set (owner: Ash)
- **Impact**: Blocks Prompt 3A (reader access copy) from final generation; placeholder copy needed
- Prompts 1, 2A, 2B remain unblocked and executable
- Prompts 3A, 3B, 3C remain blocked pending manuscript approval

**Other Decisions**: All approved with one hybrid approach (Decision 4: SendGrid + Brevo dual solution)

---

## Decision 1: Recovery-First Race Condition

**Question**: What happens if both recovery and fresh verification occur simultaneously?

### **DECISION: OPTION A** ✅ APPROVED

> **Recovery always takes precedence; cancel fresh verification if recovery succeeds**

**User Approval**: ✅ Approved (2026-11-11)

**Impact**: Prompt 3B will document recovery flows with race-condition handling favoring recovery path.

---

## Decision 2: Recovery Lifetime Eligibility

**Question**: How long is a confirmed redemption eligible for recovery access?

### **DECISION: OPTION A** ✅ APPROVED

> **30-day device lifecycle from initial verification, with session refresh on recovery**
>
> **Policy**: Sessions remain valid for 30 days from initial device verification. Successful recovery actions reset the session timer but cannot extend the absolute 30-day device expiry. Upon reaching day 30 from initial verification, user must re-verify via email, regardless of recovery activity.

**User Approval**: ✅ Approved (2026-11-11)

**Impact**: Prompt 3B recovery flows will enforce absolute 30-day device expiry alongside recovery session refreshes. Users cannot extend access beyond 30 days from initial verification through recovery alone.

---

## Decision 3: Code Expiry Start Time

**Question**: When does a 10-minute verification code expiry clock start?

### **DECISION: OPTION A** ✅ APPROVED

> **From code generation (most strict)**

**User Approval**: ✅ Approved (2026-11-11)

**Impact**:
- Prompt 3A copy specifies: "Code expires 10 minutes from when it was generated"
- Prompt 3C error states document: "Code expired — it was valid for 10 minutes from generation"

---

## Decision 4: Email Service Provider Selection

**Question**: Which email service provider(s) will handle verification code delivery?

### **DECISION: HYBRID APPROACH** ✅ APPROVED

> **SendGrid for SMTP (verification code forms) + Brevo for newsletter sending and subscription management**

**User Approval**: ✅ Approved - Hybrid solution (2026-11-11)

**Implementation Strategy**:
- **SendGrid**: SMTP provider for verification code email delivery (used by verification forms)
- **Brevo**: Newsletter campaign sending and subscription list management (separate system)
- **Rationale**: Separates concerns; SendGrid for transactional email (security-critical), Brevo for marketing/newsletter workflows

**Impact**:
- Prompt 3A email template uses SendGrid SMTP for verification codes
- Newsletter signup (Decision 6) uses Brevo for subscription management

---

## Decision 5: Manuscript Publication Readiness

> **Revised 2026-11-13**: Decision 5 revised by Ash on 2026-11-13: **early release**. Build all reader screens and functionality now; publish chapters and addendums one at a time as Ash approves each. The website edition is shorter than the printed book and will be offered for sale via the website at a later stage. Full-manuscript approval no longer gates the reader screens; each chapter still needs Ash's approval before it is published. Ash is moving the root `content/` folder to `src/content/`. Reader-access work (historically Spec 004 Prompts 3A–3C) is now owned by [Spec 005 — reader access](../../005-reader-access/spec.md), which defines its own flow, stages and dependencies. The original record below is kept for history.

**Question**: Is the manuscript approved and available for verified reader access?

### **DECISION: OPTION C** ❌ NOT APPROVED (In Development)

> **Manuscript not yet approved; in development. The unapproved launch intention is 27 January 2027.**

**User Decision**: ✅ Approved - Option C (2026-11-11)

**Critical Status**:
- Website launch target: **27 January 2027** (unapproved intention; not an approved launch date)
- Manuscript timeline: In development; approval date not yet set. Ash must confirm a manuscript approval date that precedes any approved launch date
- **Impact**: Prompts 3A (reader access copy), 3B (recovery flows), 3C (error states) REMAIN BLOCKED
- Placeholder messaging required for Prompt 3A until manuscript is approved

**Blocking Effect**:
- **Prompts 1, 2A, 2B**: ✅ Executable (navigation, design system, component design)
- **Prompts 3A, 3B, 3C**: ❌ Blocked pending manuscript approval (approval date to be confirmed by Ash)
- Re-finalization of access copy will be required once manuscript is approved for e-reader

---

## Decision 6: Newsletter Destination (Sign-Up Link)

**Question**: Where does "Sign up for newsletter" link direct and which provider manages subscriptions?

### **DECISION: BREVO** ✅ APPROVED

> **Brevo for newsletter sending and subscription list management**

**User Decision**: ✅ Approved - Brevo (2026-11-11)

**Implementation**:
- Newsletter signup link directs to Brevo external signup page
- Brevo manages subscription list, campaigns, and newsletter delivery
- Newsletter provider: **Brevo** (consistent with Decision 4 hybrid approach)
- Separates newsletter concerns from verification code delivery (SendGrid handles verification)

**Impact**:
- Prompt 3A copy: "Sign up for our newsletter" button links to external Brevo signup URL
- Post-verification flow stays focused on reader access, not newsletter enrollment
- Newsletter management integrated with decision 4 email strategy

---

## Decision 7: Route Enforcement Verification

**Question**: How is sitemap/noindex enforcement verified for /speaking, /events, /media routes?

### **DECISION: OPTION A** ✅ APPROVED

> **Meta tags + Sitemap.xml exclusion (no robots.txt `Disallow` rules for these routes)**

**User Approval**: ✅ Approved (2026-11-11)

**Implementation Strategy**:
> **Clarification**: Robots.txt Disallow rules prevent crawlers from fetching pages, making noindex tags unreachable. The correct approach:

1. **Meta tags (Primary)**: `<meta name="robots" content="noindex, nofollow">` in HTML `<head>`
2. **Sitemap.xml**: Exclude /speaking, /events, /media routes entirely
3. **Robots.txt**: Do NOT add `Disallow` rules for these routes; crawlers must be able to fetch the pages to see the noindex directive

**Selected approach**: Meta tags + Sitemap exclusion. Crawlers can fetch the routes and read the noindex directive; external links to these pages are not prevented. A robots.txt-only approach is rejected because it would hide the noindex directive and does not reliably remove URLs discovered elsewhere.

**Acceptance criteria**:

- Each of /speaking, /events and /media serves `noindex` in its HTML `<head>`
- None of the three routes appears in sitemap.xml
- robots.txt contains no `Disallow` rule matching any of the three routes

**Impact**:
- Prompt 1 navigation specification documents exact enforcement mechanism
- Deployment checklist verifies meta tags are served and routes excluded from sitemap
- QA tests with search engine crawlers (Google Search Console simulation)
- Clear enforcement strategy prevents conflicting directives

---

## Summary Table: Approved Decisions

| # | Decision | Selection | Status | Impact |
| --- | ---------- | ----------- | -------- | -------- |
| 1 | Recovery-first race | **Option A** (recovery priority) | ✅ APPROVED | Unblocks Prompt 3B |
| 2 | Recovery lifetime | **Option A** (30-day absolute expiry from initial verification) | ✅ APPROVED | Unblocks Prompt 3B |
| 3 | Code expiry timing | **Option A** (from generation) | ✅ APPROVED | Unblocks Prompts 3A, 3C |
| 4 | Email provider | **Hybrid** (SendGrid + Brevo) | ✅ APPROVED | Unblocks Prompt 3A |
| 5 | Manuscript ready | **Option C** (NOT APPROVED) | ❌ BLOCKS | **BLOCKS Prompts 3A, 3B, 3C** |
| 6 | Newsletter link | **Brevo** (external signup) | ✅ APPROVED | Unblocks Prompt 3A (newsletter) |
| 7 | Route enforcement | **Option A** (noindex meta + sitemap exclusion; no robots.txt Disallow) | ✅ APPROVED | Unblocks Prompt 1 |

---

## Prompt Execution Status

**✅ UNBLOCKED & EXECUTABLE** (All prerequisites resolved):
- **Prompt 1**: Navigation Exposure (/speaking, /events, /media hidden from sitemap)
- **Prompt 2A**: Design Baseline (typography, colors, components)
- **Prompt 2B**: Navigation Design (component specifications)

**⚠️ PARTIALLY BLOCKED** (Awaiting manuscript approval):
- **Prompt 3A**: Reader Access Copy (BLOCKED — placeholder messaging until manuscript approved)
- **Prompt 3B**: Recovery Flows (decisions 1–2 resolved ✅, but dependent on 3A messaging)
- **Prompt 3C**: Error States (decision 3 resolved ✅, but dependent on 3A messaging)

---

## Next Steps: Gate 1 ✅ COMPLETE

**✅ Gate 1 Complete** — All 7 blocking decisions documented and approved by Ash (2026-11-11)

### Immediate Actions

**Generate Unblocked Prompts** (Ready NOW):
- ✅ **Prompt 1**: Navigation Exposure (route enforcement via noindex meta tags + sitemap exclusion; no robots.txt Disallow)
- ✅ **Prompt 2A**: Design Baseline (Space Grotesk, Inter, 9-color palette, both themes)
- ✅ **Prompt 2B**: Navigation Design (component styles and states)

**Defer Manuscript-Dependent Prompts**:
- ⏸️ **Prompt 3A**: Reader Access Copy (use placeholder messaging until manuscript approved)
- ⏸️ **Prompt 3B**: Recovery Flows (blocked on 3A messaging)
- ⏸️ **Prompt 3C**: Error States (blocked on 3A messaging)

### Gate 2 Approval (Design Baseline)
After unblocked prompts are generated:
1. Review and approve design tokens from Prompt 2A
2. Confirm unapproved candidates (R3, T1, RT2, C1) are excluded
3. Sign off on navigation and component design

### Manuscript Approval Workflow (Date To Be Confirmed)
When manuscript is approved for e-reader:
1. Regenerate Prompt 3A with final copy (not placeholder)
2. Complete Prompts 3B and 3C based on final 3A messaging
3. Re-approve reader access and error states

### Gate 3 Sign-Off (Readiness)
After all prompts are generated:
1. Preflight analysis complete
2. Project owner approval
3. Ready for implementation

---

## ✅ USER DECISIONS RECORDED

**All 7 blocking decisions received and documented** (2026-11-11):

- [x] **Decision 1**: ✅ Option A (recovery-first race condition)
- [x] **Decision 2**: ✅ Option A (30-day recovery lifetime; absolute expiry 30 days after initial verification)
- [x] **Decision 3**: ✅ Option A (code expiry from generation)
- [x] **Decision 4**: ✅ **Hybrid** (SendGrid SMTP + Brevo newsletters)
- [x] **Decision 5**: ❌ **Option C** (manuscript NOT approved — in development; 27 January 2027 launch intention unapproved)
- [x] **Decision 6**: ✅ Brevo (newsletter subscriptions)
- [x] **Decision 7**: ✅ Option A (noindex meta tags + sitemap exclusion; no robots.txt Disallow)

---

## Status: Gate 1 APPROVED ✅

**Ready for**:
- Immediate execution: Prompts 1, 2A, 2B
- Deferred execution: Prompts 3A, 3B, 3C (awaiting manuscript approval; approval date to be confirmed by Ash)
