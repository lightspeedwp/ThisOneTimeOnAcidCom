# Blocking Decisions Resolution: Gate 1 APPROVED

**Date**: 2026-11-11
**Status**: ✅ USER DECISIONS RECEIVED AND DOCUMENTED
**Context**: 7 blocking decisions for Spec 004 Book Website Figma Make Prompt Pack

---

## Summary

This document records the final decisions for all 7 blocking decisions, approved by Ash on 2026-11-11.

**⚠️ CRITICAL DECISION**: Decision 5 (Manuscript Publication Readiness) → **Option C (NOT APPROVED)**
- Website launches January 2026
- Manuscript in development, will be ready for e-reader by launch
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

> **30-day rolling window from last successful recovery action**

**User Approval**: ✅ Approved (2026-11-11)

**Impact**: Prompt 3B recovery flows will implement 30-day rolling session window with automatic cleanup.

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

**Question**: Is the manuscript approved and available for verified reader access?

### **DECISION: OPTION C** ❌ NOT APPROVED (In Development)

> **Manuscript not yet approved; in development, targeting January 2026 launch**

**User Decision**: ✅ Approved - Option C (2026-11-11)

**Critical Status**:
- Website officially launches: **January 2026**
- Manuscript timeline: In development, will be ready for e-reader by website launch
- **Impact**: Prompts 3A (reader access copy), 3B (recovery flows), 3C (error states) REMAIN BLOCKED
- Placeholder messaging required for Prompt 3A until manuscript is approved

**Blocking Effect**:
- **Prompts 1, 2A, 2B**: ✅ Executable (navigation, design system, component design)
- **Prompts 3A, 3B, 3C**: ❌ Blocked pending manuscript approval (expected late January 2026)
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

> **Meta tags + Robots.txt + Sitemap.xml exclusion**

**User Approval**: ✅ Approved (2026-11-11)

**Implementation Strategy**:
1. **Meta tags**: `<meta name="robots" content="noindex, nofollow">` in HTML `<head>`
2. **Robots.txt**: `Disallow: /speaking`, `Disallow: /events`, `Disallow: /media`
3. **Sitemap.xml**: Exclude these routes entirely from sitemap

**Impact**:
- Prompt 1 navigation specification documents exact enforcement mechanism
- Deployment checklist verifies all three signals are in place
- QA tests with search engine crawlers (Google Search Console simulation)
- Comprehensive redundancy ensures SEO compliance

---

## Summary Table: Approved Decisions

| # | Decision | Selection | Status | Impact |
|---|----------|-----------|--------|--------|
| 1 | Recovery-first race | **Option A** (recovery priority) | ✅ APPROVED | Unblocks Prompt 3B |
| 2 | Recovery lifetime | **Option A** (30-day rolling) | ✅ APPROVED | Unblocks Prompt 3B |
| 3 | Code expiry timing | **Option A** (from generation) | ✅ APPROVED | Unblocks Prompts 3A, 3C |
| 4 | Email provider | **Hybrid** (SendGrid + Brevo) | ✅ APPROVED | Unblocks Prompt 3A |
| 5 | Manuscript ready | **Option C** (NOT APPROVED) | ❌ BLOCKS | **BLOCKS Prompts 3A, 3B, 3C** |
| 6 | Newsletter link | **Brevo** (external signup) | ✅ APPROVED | Unblocks Prompt 3A (newsletter) |
| 7 | Route enforcement | **Option A** (meta + robots + sitemap) | ✅ APPROVED | Unblocks Prompt 1 |

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
- ✅ **Prompt 1**: Navigation Exposure (route enforcement via meta tags + robots.txt + sitemap)
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

### Manuscript Approval Workflow (Late January 2026)
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
- [x] **Decision 2**: ✅ Option A (30-day rolling recovery lifetime)
- [x] **Decision 3**: ✅ Option A (code expiry from generation)
- [x] **Decision 4**: ✅ **Hybrid** (SendGrid SMTP + Brevo newsletters)
- [x] **Decision 5**: ❌ **Option C** (manuscript NOT approved — in development, January launch)
- [x] **Decision 6**: ✅ Brevo (newsletter subscriptions)
- [x] **Decision 7**: ✅ Option A (meta tags + robots.txt + sitemap)

---

## Status: Gate 1 APPROVED ✅

**Ready for**:
- Immediate execution: Prompts 1, 2A, 2B
- Deferred execution: Prompts 3A, 3B, 3C (awaiting manuscript approval, late January 2026)
