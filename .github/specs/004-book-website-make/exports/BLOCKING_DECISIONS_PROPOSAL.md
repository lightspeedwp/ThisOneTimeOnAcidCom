# Blocking Decisions Proposal: Gate 1 Resolution

**Date**: 2026-11-11  
**Status**: Awaiting User Approval  
**Context**: 7 blocking decisions proposed for Spec 004 Book Website Figma Make Prompt Pack

---

## Summary

This document proposes answers to all 7 blocking decisions based on:
- Research recommendations documented in `research.md`
- Best practices for reader access systems
- Alignment with project goals (book website, reader verification, design system)
- UX/security/maintainability trade-offs

**Please review each proposal and approve, modify, or reject.**

---

## Decision 1: Recovery-First Race Condition

**Question**: What happens if both recovery and fresh verification occur simultaneously?

### Recommendation: **OPTION A** ✅

> **Recovery always takes precedence; cancel fresh verification if recovery succeeds**

**Rationale**:
- Prioritizes existing verified readers (better UX)
- Minimal state complexity (easier implementation)
- Matches user intent: if they have a previous verified session, reuse it
- Reduces unnecessary email sends
- Most conservative approach (doesn't surprise users)

**Impact**: Prompt 3B will document recovery flows with race-condition handling favoring recovery path.

**Approval**: [ ] Approve | [ ] Modify (propose alternative) | [ ] Reject

---

## Decision 2: Recovery Lifetime Eligibility

**Question**: How long is a confirmed redemption eligible for recovery access?

### Recommendation: **OPTION A** ✅

> **30-day rolling window from last successful recovery action**

**Rationale**:
- Matches device lifecycle assumption (30 days referenced in spec)
- Balances security with UX (doesn't force re-verification too quickly)
- Rolling window is forgiving (active readers stay verified)
- Simple expiry logic (no hard boundaries)
- Aligns with common session management patterns

**Impact**: Prompt 3B recovery flows will implement 30-day rolling session window with automatic cleanup.

**Approval**: [ ] Approve | [ ] Modify (propose alternative) | [ ] Reject

---

## Decision 3: Code Expiry Start Time

**Question**: When does a 10-minute verification code expiry clock start?

### Recommendation: **OPTION A** ✅

> **From code generation (most strict)**

**Rationale**:
- Consistent server-side timing (no dependencies on email delivery)
- Predictable security window (no surprises from email delays)
- Simpler to implement and verify
- Readers see realistic countdown (~9 min after email receipt, accounting for delivery delay)
- Standard approach for security codes (matches industry practice)

**Trade-off**: Readers experience slightly shorter effective window if email is delayed, but this is security-justified.

**Impact**: 
- Prompt 3A copy specifies: "Code expires 10 minutes from when it was generated"
- Prompt 3C error states document: "Code expired — it was valid for 10 minutes from generation"

**Approval**: [ ] Approve | [ ] Modify (propose alternative) | [ ] Reject

---

## Decision 4: Email Service Provider Selection

**Question**: Which email service provider handles verification code delivery?

### Recommendation: **OPTION B** ✅

> **SendGrid (industry standard)**

**Rationale**:
- Excellent documentation and developer experience
- Robust, reliable API (strong uptime reputation)
- Industry standard (easy to hire for, find solutions)
- Strong template support for branded emails
- Good rate limits and compliance features
- Newsletter integration possible (though Brevo may be slightly better)

**Alternative considered**: Brevo (Option A)
- ✅ Better newsletter integration
- ✅ Lower cost
- ❌ Smaller ecosystem
- Recommendation: SendGrid for primary email service; consider Brevo for newsletter separate from verification

**Impact**: Prompt 3A email template will use SendGrid template syntax and API patterns.

**Approval**: [ ] Approve | [ ] Modify (propose alternative) | [ ] Reject

---

## Decision 5: Manuscript Publication Readiness

**Question**: Is the manuscript approved and available for verified reader access?

### Recommendation: **OPTION A** ✅

> **Manuscript approved and available; ready for integration**

**Rationale**:
- Unblocks the reader access feature immediately
- Assumes manuscript is already in your possession and approved
- Aligns with stated scope (book website) that would have manuscript available
- Avoids dependency on separate manuscript approval process
- Enables concurrent development of access system

**Note**: If manuscript is *not* available, propose **OPTION B** instead (requires formatting pipeline first).

**Impact**: 
- Prompt 3A copy references actual manuscript access (e.g., "Access all chapters")
- Content delivery mechanism must be in place or created in parallel

**Approval**: [ ] Approve OPTION A (manuscript ready) | [ ] Choose OPTION B (formatting needed) | [ ] Choose OPTION C (not approved)

---

## Decision 6: Newsletter Destination (Sign-Up Link)

**Question**: Where does "Sign up for newsletter" link direct?

### Recommendation: **OPTION B** ✅

> **Link to external newsletter provider signup page**

**Rationale**:
- Proven, familiar pattern (users know what to expect)
- Separates concerns (newsletter is separate from reader access)
- Newsletter provider handles consent/preferences directly
- Simplest implementation (no server-side form needed)
- Clear intent capture (users explicitly choose to sign up)
- Avoids newsletter integration complexity in access flow

**Trade-off**: Users must visit external page; captures no additional data in reader access form.

**Impact**: 
- Prompt 3A copy: "Sign up for our newsletter" button links to external signup URL
- Post-verification flow stays focused on reader access, not newsletter enrollment

**Newsletter provider**: (To be determined separately) — could be SendGrid, Brevo, or other.

**Approval**: [ ] Approve | [ ] Modify (propose alternative) | [ ] Reject

---

## Decision 7: Route Enforcement Verification

**Question**: How is sitemap/noindex enforcement verified for /speaking, /events, /media routes?

### Recommendation: **OPTION A** ✅

> **Meta tags + Robots.txt + Sitemap.xml exclusion**

**Rationale**:
- Comprehensive coverage (multiple signals to search engines)
- Redundancy (if one mechanism fails, others provide backup)
- Verifiable at deploy time (can check each signal)
- Best practice for preventing search engine indexing
- Clear documentation for implementers

**Implementation approach**:
1. **Meta tags**: `<meta name="robots" content="noindex, nofollow">` in HTML `<head>`
2. **Robots.txt**: `Disallow: /speaking`, `Disallow: /events`, `Disallow: /media`
3. **Sitemap.xml**: Exclude these routes entirely from sitemap

**Impact**: 
- Prompt 1 navigation specification will document exact enforcement mechanism
- Deployment checklist must verify all three signals are in place
- QA can test with search engine crawlers (Google Search Console simulation)

**Approval**: [ ] Approve | [ ] Modify (propose alternative) | [ ] Reject

---

## Summary Table: Proposed Decisions

| # | Decision | Recommendation | Status | Blocks |
|---|----------|-----------------|--------|--------|
| 1 | Recovery-first race | **Option A** (recovery priority) | ✅ Proposed | Prompt 3B |
| 2 | Recovery lifetime | **Option A** (30-day rolling) | ✅ Proposed | Prompt 3B |
| 3 | Code expiry timing | **Option A** (from generation) | ✅ Proposed | Prompts 3A, 3C |
| 4 | Email provider | **Option B** (SendGrid) | ✅ Proposed | Prompt 3A |
| 5 | Manuscript ready | **Option A** (approved & available) | ✅ Proposed | Prompt 3A |
| 6 | Newsletter link | **Option B** (external signup) | ✅ Proposed | Prompt 3A |
| 7 | Route enforcement | **Option A** (meta + robots + sitemap) | ✅ Proposed | Prompt 1 |

---

## Next Steps After Approval

Once you approve (or modify) these decisions:

1. **Gate 1 ✅ Complete**
   - All 7 blocking decisions resolved
   - Document selections in `exports/decisions-matrix.md`

2. **Generate Blocked Prompts** (now possible)
   - Prompt 1: Navigation Exposure (full spec with route enforcement details)
   - Prompt 3A: Reader Access Copy (final copy with code expiry messaging, newsletter link)
   - Prompt 3B: Recovery Flows (race condition handling documented)
   - Prompt 3C: Error States (code expiry error messages)

3. **Gate 2 Approval** (Design Baseline)
   - Review and approve design tokens
   - Confirm unapproved candidates excluded

4. **Gate 3 Sign-Off** (Readiness)
   - Preflight complete
   - Project owner approval

5. **Execute Figma Make Prompts**
   - All 6 prompts executable
   - Generate design system exports
   - Prepare for implementation

---

## Your Input Needed

**Please indicate your approval for each decision**:

- [ ] **Decision 1**: Approve Option A | Propose different option: ___________
- [ ] **Decision 2**: Approve Option A | Propose different option: ___________
- [ ] **Decision 3**: Approve Option A | Propose different option: ___________
- [ ] **Decision 4**: Approve Option B (SendGrid) | Propose different: ___________
- [ ] **Decision 5**: Approve Option A (manuscript ready) | Propose different: ___________
- [ ] **Decision 6**: Approve Option B (external signup) | Propose different: ___________
- [ ] **Decision 7**: Approve Option A (meta + robots + sitemap) | Propose different: ___________

**Comments or concerns**:
_________________________________________________

---

**Once approved, these decisions unblock Prompts 1, 3A, 3B, and 3C for generation. Ready to proceed? ✅**
