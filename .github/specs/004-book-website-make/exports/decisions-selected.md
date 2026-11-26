# Blocking Decisions: Status & Selection Summary — Spec 004 (US4)

**Date**: 2026-11-19  
**User Story**: US4 (Documentation-Only Workflow Completion)  
**Task**: T065 (Phase 9 Convergence)  
**Reference**: `.github/specs/004-book-website-make/research.md`  
**Status**: ⏳ **PENDING HANDOVER TO SPEC 005**


> ⚠️ **Superseded snapshot (noted 2026-11-26)**: this file shows Decisions 1–6 as pending, but all seven were approved on 2026-11-13. The authoritative record is [`research.md`](../research.md) (each decision's **Decision** line). The option letters below do not match `research.md` (for example, the 30-day option for Decision 2 is labelled C here and A in `research.md`). Spec 005 later replaced SendGrid with Mailgun for Decision 4.

---

## Executive Summary

Spec 004 identifies **7 blocking decisions** required for Figma Make prompt execution. Decision 7 (Route Enforcement Verification) is **resolved in Spec 004**. Decisions 1–6 are **documented and handed over to Spec 005** for resolution during Phase 1 readiness planning.

**Timeline**:

- Spec 004: Decision 7 resolved (Phase 8 Complete)
- Spec 005: Decisions 1–6 resolution target 2026-12-15

---

## Decision 7: RESOLVED ✅

### Decision: Route Enforcement Verification

**Question**: How is sitemap/noindex enforcement verified for /speaking, /events, /media routes?

**Selected Option**: **A — Noindex Meta Tags + Sitemap Exclusion (Primary) + Robots.txt (Optional)**

**Selection Status**: ✅ **RESOLVED** (Gate 2 Approval)

**Implementation Details**:

- Primary mechanism: `<meta name="robots" content="noindex, nofollow">` on hidden routes
- Primary mechanism: Sitemap.xml excludes /speaking, /events, /media
- Optional fallback: Robots.txt rules (if enforcement needs strengthening)

**Impact on Prompts**:

- **Prompt 1**: Navigation Exposure contract specifies this enforcement strategy
- **Verification**: Decision 7 is fully documented in `contracts/prompt-1-navigation-exposure.md`

**Status in Spec 004**: ✅ **COMPLETE** — No further action needed

---

## Decisions 1–6: PENDING → HANDOVER TO SPEC 005

### Overview Table

| Decision # | Question                         | Options                | Impact Scope                     | Blocking                          | Handover Status |
| ---------- | -------------------------------- | ---------------------- | -------------------------------- | --------------------------------- | --------------- |
| **1**      | Recovery-first race condition    | A, B, C, D (4 options) | Prompt 3B, Prompt 3C (partial)   | Decisions 1 & 2 unblock Prompt 3B | 🔄 Spec 005     |
| **2**      | Recovery lifetime eligibility    | A, B, C (3 options)    | Prompt 3B, session lifecycle     | Decisions 1 & 2 unblock Prompt 3B | 🔄 Spec 005     |
| **3**      | Code expiry start time           | A, B, C (3 options)    | Prompt 3A, Prompt 3C (error msg) | Decision 3 unblocks Prompts 3A/3C | 🔄 Spec 005     |
| **4**      | Email service provider           | A, B, C, D (4 options) | Prompt 3A template syntax        | Decision 4 unblocks Prompt 3A     | 🔄 Spec 005     |
| **5**      | Manuscript publication readiness | A, B, C (3 options)    | Prompt 3A confirmation messaging | Decision 5 unblocks Prompt 3A     | 🔄 Spec 005     |
| **6**      | Newsletter destination/signup    | A, B, C, D (4 options) | Prompt 3A newsletter CTA         | Decision 6 unblocks Prompt 3A     | 🔄 Spec 005     |

---

## Decision 1: Recovery-First Race Condition

**Question**: When recovery and fresh verification race, which takes precedence?

**Options**:

- **A**: Recovery first (prioritize account recovery)
- **B**: Fresh verification first (prioritize new account creation)
- **C**: Last-writer-wins (last action submitted wins)
- **D**: User chooses (prompt user to select)

**Current State**: ⏳ PENDING USER DECISION

**Impact**:

- Affects Prompt 3B (recovery flows design)
- Influences Prompt 3C Error State 5 (session conflict error message)
- Determines race condition handling strategy

**Complexity**: Medium (affects session lifecycle logic)  
**Timeline**: ~1–2 hours to decide (design tradeoff analysis required)

**Handover to Spec 005**: Yes — Included in Phase 1 decision resolution

---

## Decision 2: Recovery Lifetime Eligibility

**Question**: How long is a recovery code valid? (Session refresh + expiry rules)

**Options**:

- **A**: 24 hours (session refresh + 24h absolute expiry)
- **B**: 7 days (session refresh + 7d absolute expiry)
- **C**: 30 days (session refresh + 30d absolute expiry)

**Current State**: ⏳ PENDING USER DECISION

**Impact**:

- Affects Prompt 3B recovery flows (validation rules, success/error messaging)
- Determines how long users can recover accounts after initial attempt
- Security vs. UX tradeoff (longer = more user-friendly, shorter = more secure)

**Complexity**: Medium (security/UX analysis required)  
**Timeline**: ~1–2 hours to decide (session lifecycle tradeoff)

**Handover to Spec 005**: Yes — Included in Phase 1 decision resolution

---

## Decision 3: Code Expiry Start Time

**Question**: When does code expiry timer begin? (From generation? Receipt? Page load?)

**Options**:

- **A**: From code generation (server-side timer)
- **B**: From code receipt (email delivery timestamp)
- **C**: From page load (user visits verification page)

**Current State**: ⏳ PENDING USER DECISION

**Impact**:

- **Prompt 3A**: Email verification copy & error messages (timing language)
- **Prompt 3C**: Error state design for "Code expired" scenarios (messaging)
- Determines exact error message wording for expiry notifications

**Example Impact**:

- If **A** (from generation): "Code expired after 10 minutes of creation"
- If **B** (from receipt): "Code expired after 10 minutes of email delivery"
- If **C** (from page load): "Code expired after 10 minutes of page load"

**Complexity**: Low (messaging only, no logic change)  
**Timeline**: ~1 hour to decide (mostly communication/UX wording)

**Handover to Spec 005**: Yes — Required for Prompt 3A/3C messaging finalization

---

## Decision 4: Email Service Provider

**Question**: Which email service provider? (SendGrid? Brevo? AWS SES? Mailgun?)

**Options**:

- **A**: SendGrid (robust, well-documented)
- **B**: Brevo (cost-effective, good for newsletters)
- **C**: AWS SES (integrated with AWS infrastructure)
- **D**: Mailgun (developer-friendly, flexible)

**Current State**: ⏳ PENDING USER DECISION

**Impact**:

- **Prompt 3A**: Email template syntax and capabilities
- Determines available email features (dynamic content, templates, tracking)
- Affects implementation complexity and ongoing costs

**Decision Owners**: Tech lead, project budget lead  
**Complexity**: Medium (vendor evaluation, cost/features analysis)  
**Timeline**: ~1–2 hours for evaluation

**Handover to Spec 005**: Yes — Required for Prompt 3A template specification

---

## Decision 5: Manuscript Publication Readiness

**Question**: When is manuscript approved & available for readers?

**Options**:

- **A**: Now (manuscript ready, can be published immediately)
- **B**: 2026-12-31 (manuscript ready by end of year)
- **C**: 2027-01-31 (manuscript ready by end of January)

**Current State**: ⏳ PENDING AUTHOR APPROVAL

**Impact**:

- **Prompt 3A**: Confirmation messaging (when book will be available to reader)
- Determines success state messaging ("Book will be available on [date]" vs. "Book is now available")
- External dependency on author manuscript completion

**Decision Owner**: Ash (author/project owner)  
**Complexity**: Low (external date, not technical decision)  
**Timeline**: Author confirms availability; planning estimate: 2027-01-31

**Handover to Spec 005**: Yes — Critical for Prompt 3A messaging finalization

**Note**: This is the most externally constrained decision; Spec 004 is not blocked by manuscript approval timeline.

---

## Decision 6: Newsletter Destination

**Question**: Where should newsletter signup link point?

**Options**:

- **A**: Brevo signup link (direct newsletter signup)
- **B**: Custom landing page (custom newsletter signup flow)
- **C**: Typeform embedded form (survey + newsletter signup)
- **D**: External newsletter platform (Substack, Ghost, etc.)

**Current State**: ⏳ PENDING USER DECISION

**Impact**:

- **Prompt 3A**: Newsletter CTA section design (link destination, text, UX)
- Determines whether link opens in same tab/new tab, inline form vs. external page
- Affects reader friction & newsletter signup flow

**Decision Owner**: Product lead, marketing lead  
**Complexity**: Medium (platform/UX evaluation)  
**Timeline**: ~1 hour to decide (platform features & UX tradeoff)

**Handover to Spec 005**: Yes — Required for Prompt 3A newsletter section

---

## Decision Resolution Summary

### Spec 004 Status

| Decision | Status      | Action                       | Timeline                    |
| -------- | ----------- | ---------------------------- | --------------------------- |
| **1–6**  | ⏳ PENDING  | Handover to Spec 005 Phase 1 | 2026-11-21 (Spec 005 start) |
| **7**    | ✅ RESOLVED | No further action            | Complete                    |

### Spec 005 Timeline

**Phase 1 Readiness** (Target: 2026-12-15):

- Decisions 1–2: Recovery race condition & lifetime (~2 hours)
- Decision 3: Code expiry timing (~1 hour)
- Decision 4: Email provider (~2 hours)
- Decision 5: Manuscript approval (author input)
- Decision 6: Newsletter destination (~1 hour)

**Total Decision Effort**: ~6–7 hours (parallelizable, estimate excludes manuscript approval wait)

---

## Documentation References

**For Decision Details**: `.github/specs/004-book-website-make/research.md`

- Sections: Decision 1 through Decision 7
- Includes: Options A–D, impact assessment, tradeoff analysis

**For Decision Dependencies**: `.github/specs/004-book-website-make/PROMPT_EXECUTION_PLAN.md`

- Section: Decision Map (which decisions block which prompts)
- Recommended resolution sequence

**For Decision Application**:

- Prompt 3A contract (Decisions 3, 4, 5, 6)
- Prompt 3B contract (Decisions 1, 2)
- Prompt 3C contract (Decision 3 for code-expiry messaging)

---

## Handover to Spec 005

**Deliverable**: This document + research.md + prompt contracts with decision placeholders

**Spec 005 Responsibility**:

1. ✅ Review all 6 decisions and their options
2. ✅ Gather stakeholder input (Ash, tech lead, product lead)
3. ✅ Select option for each decision (A, B, C, or D)
4. ✅ Document selected options in research.md
5. ✅ Update Prompt 3A, 3B, 3C contracts with selected values
6. ✅ Execute Prompts 3A, 3B, 3C in Figma Make

**Timeline**: Phase 1 readiness completion target 2026-12-15

---

## Approval Sign-Off

**Spec 004 Completion**: ✅ READY

Decision 7 is resolved. Decisions 1–6 are fully documented and ready for Spec 005 Phase 1 resolution.

**Prepared by**: Claude Haiku 4.5  
**Date**: 2026-11-19  
**Task**: T065 (Phase 9 Convergence — Documentation-Only Workflow)  
**Status**: Ready for handover to Spec 005
