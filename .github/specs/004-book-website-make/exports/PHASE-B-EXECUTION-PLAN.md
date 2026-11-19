# Phase B: Reader Access Implementation Plan — Spec 004

**Status**: ✅ Ready for Execution (All Decisions Approved)  
**Date Confirmed**: 2026-11-19 (Ash confirmed Decision 5)  
**Manuscript Approval**: Chapter 1 live; other chapters pending individual approval  

---

## Decision 5 Confirmation (Ash — 2026-11-19)

✅ **Early Release Mode Approved**:
- **Chapter 1**: Approved for immediate website & e-reader use
- **Other Chapters** (2–N): Pending individual approval, available for e-reader development
- **Front Matter**: Cover, back matter, parts, index pending approval, ready for e-reader
- **Implementation**: Build feature now; publish chapters as approved

---

## Phase B Deliverables

### Prompt 3A: Reader Access Copy & Forms

| Criterion | Status | Details |
| --- | --- | --- |
| **Email Copy** | ✅ Approved | Ash approved 2026-11-13; exact wording locked |
| **Form Specification** | ✅ Complete | Email entry, code entry, success state all defined |
| **Error Messages** | ✅ Complete | Invalid, expired, rate-limited all specified |
| **Newsletter CTA** | ✅ Complete | Separate section, Brevo external link (Decision 6) |
| **Decision Integration** | ✅ Ready | Decisions 3, 4, 5, 6 all applied |
| **Manuscript Ref** | ✅ Updated | "Chapter 1 and selected chapters" copy (early release) |

**Figma Make Execution**: Design email template, entry forms, error states, success confirmation  
**Timeline**: 15–20 minutes (all copy approved)

---

### Prompt 3B: Recovery Flows

| Criterion | Status | Details |
| --- | --- | --- |
| **Flow Definition** | ✅ Complete | 3 paths: success, expired, invalid |
| **Race Condition** | ✅ Approved | Decision 1 Option A (recovery precedence) |
| **Session Lifetime** | ✅ Approved | Decision 2 Option A (30-day absolute expiry) |
| **Error Handling** | ✅ Complete | All failure scenarios documented |
| **Manuscript Scenario** | ✅ Updated | Recovery flow integrates with Chapter 1 live model |

**Figma Make Execution**: Design recovery states, session-expired error, race-condition handling  
**Timeline**: 15–20 minutes (all decisions resolved)

---

### Prompt 3C: Error States

| Criterion | Status | Details |
| --- | --- | --- |
| **5 Error States** | ✅ Complete | Invalid, expired, rate-limited, server, session-conflict |
| **Expiry Messaging** | ✅ Approved | Decision 3 Option A (from code generation) |
| **Race Condition** | ✅ Approved | Decision 1 Option A (recovery state) |
| **User Actions** | ✅ Complete | Retry, request new code, wait logic all defined |
| **Styling** | ✅ Complete | Error borders, text color, icons per design baseline |

**Figma Make Execution**: Design all 5 error state form variants with messaging  
**Timeline**: 15–20 minutes (all decisions resolved)

---

## Manuscript Availability: Chapter 1 Launch + Pending Release

### Chapter 1 (Approved Now)
✅ Available for immediate website display  
✅ Available for e-reader preview  
✅ Full content ready for verified readers  

### Chapters 2–N (Pending Approval)
📋 Markdown files ready for e-reader  
📋 Awaiting Ash's individual approval for each chapter  
📋 Reader-facing message: "More chapters coming as approved"  

### Front Matter (Pending Approval)
📋 Cover design, back matter, parts, index ready  
📋 Awaiting Ash's approval  
📋 Can be integrated into e-reader UI before final approval  

### Copy References
- Email form: "Access Chapter 1 and selected chapters"
- Success message: "Access confirmed. Chapter 1 is ready to read."
- E-reader UI: "Chapter 1 available. More chapters coming as approved."

---

## Execution Sequence & Timeline

### Phase B Part 1: Figma Make Prompt Generation (45–60 minutes)

| Prompt | Timeline | Dependencies |
| --- | --- | --- |
| **3A** (Reader Access Copy) | 15–20 min | Decisions 3, 4, 5, 6 (all ✅) |
| **3B** (Recovery Flows) | 15–20 min | Decisions 1, 2, 5 (all ✅) |
| **3C** (Error States) | 15–20 min | Decisions 3, 1, 5 (all ✅) |

**Parallel Execution**: All 3 prompts can run in parallel (no dependencies between them)  
**Total Wall Clock**: 15–20 minutes (parallel execution)

### Phase B Part 2: Integration & Testing (Target: 2026-11-21)

1. ✅ Confirm Figma Make outputs match Spec 004 acceptance criteria (CR-3A.1 through CR-3C.5)
2. ✅ Integrate reader-access forms into Spec 005 implementation
3. ✅ Verify e-reader chapter availability model works with Chapter 1 live + pending
4. ✅ Test recovery flow with 30-day session lifetime
5. ✅ Validate all error states with Decision 3 (code expiry from generation)

---

## Blocking Items (None)

✅ **Decision 1**: Recovered (Option A — recovery precedence)  
✅ **Decision 2**: Resolved (Option A — 30-day session lifetime)  
✅ **Decision 3**: Resolved (Option A — code expiry from generation)  
✅ **Decision 4**: Resolved (SendGrid + Brevo)  
✅ **Decision 5**: APPROVED (Early release — Chapter 1 now, others pending)  
✅ **Decision 6**: Resolved (Brevo newsletter link)  

---

## Success Criteria

- ✅ All 3 prompts (3A, 3B, 3C) have exact previews generated in Figma Make
- ✅ All acceptance criteria (CR-3A.1–3A.8, CR-3B.1–3B.6, CR-3C.1–3C.5) verified
- ✅ Copy references "Chapter 1" for immediate launch scenario
- ✅ Recovery flow integrates with 30-day device lifecycle
- ✅ Error messages reflect approved Decision 3 (expiry from code generation)
- ✅ Newsletter CTA separate and optional (Decision 6)
- ✅ Prompts handed to Spec 005 for implementation integration

---

## Next Steps (After Phase B Figma Make Execution)

1. **Spec 005 Integration** (2026-11-21+)
   - Implement Netlify Functions based on Prompts 3A, 3B, 3C
   - Integrate e-reader with reader-access verification
   - Publish Chapter 1 on website with reader verification gate

2. **Chapter Approval Loop** (2026-11-21+)
   - Ash approves chapters individually
   - Publish each chapter as approved
   - Update e-reader with "More chapters coming" messaging

3. **Phase B Completion** (2026-12-15 target)
   - All decision integration complete
   - Prompts 3A, 3B, 3C fully implemented in Spec 005
   - Reader access feature live with Chapter 1 available

---

**Version**: 1.0.0 | **Status**: Ready for Execution | **Date**: 2026-11-19 | **Approval**: Ash ✅

