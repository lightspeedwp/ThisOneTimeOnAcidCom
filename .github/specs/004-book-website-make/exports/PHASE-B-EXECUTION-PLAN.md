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

**Spec 005 Handoff**: Email template specs, form wording, error messages handed to Spec 005 implementation  
**Status**: ✅ All specifications complete; ready for Spec 005 implementation

---

### Prompt 3B: Recovery Flows

| Criterion | Status | Details |
| --- | --- | --- |
| **Flow Definition** | ✅ Complete | 3 paths: success, expired, invalid |
| **Race Condition** | ✅ Approved | Decision 1 Option A (recovery precedence) |
| **Session Lifetime** | ✅ Approved | Decision 2 Option A (30-day absolute expiry) |
| **Error Handling** | ✅ Complete | All failure scenarios documented |
| **Manuscript Scenario** | ✅ Updated | Recovery flow integrates with Chapter 1 live model |

**Spec 005 Handoff**: Recovery flow specs, session handling, error scenarios handed to Spec 005 implementation  
**Status**: ✅ All specifications complete; ready for Spec 005 implementation

---

### Prompt 3C: Error States

| Criterion | Status | Details |
| --- | --- | --- |
| **5 Error States** | ✅ Complete | Invalid, expired, rate-limited, server, session-conflict |
| **Expiry Messaging** | ✅ Approved | Decision 3 Option A (from code generation) |
| **Race Condition** | ✅ Approved | Decision 1 Option A (recovery state) |
| **User Actions** | ✅ Complete | Retry, request new code, wait logic all defined |
| **Styling** | ✅ Complete | Error borders, text color, icons per design baseline |

**Spec 005 Handoff**: Error state specs with Decision 3 messaging handed to Spec 005 implementation  
**Status**: ✅ All specifications complete; ready for Spec 005 implementation

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

### Phase B: Spec 005 Handoff (Prompts 3A, 3B, 3C)

All three prompts are handed off to [Spec 005: Reader Access](../../005-reader-access/spec.md) for direct implementation:

| Prompt | Specification | Handoff Status |
| --- | --- | --- |
| **3A** (Reader Access Copy & Forms) | prompt-3a-execution-guide.md | ✅ Handed to Spec 005 |
| **3B** (Recovery Flows) | prompt-3b-execution-guide.md | ✅ Handed to Spec 005 |
| **3C** (Error States) | prompt-3c-execution-guide.md | ✅ Handed to Spec 005 |

**Handoff Model**: All prompt specifications are source records for Spec 005, which owns the implementation flow, stages, and dependencies.  
**Status**: All 7 blocking decisions resolved; specifications ready for implementation.

### Phase B Part 2: Spec 005 Implementation & Testing (Target: 2026-11-21+)

1. ✅ Spec 005 owns implementation of Prompts 3A, 3B, 3C specifications
2. ✅ Implement reader-access verification flow per Spec 005 (Netlify Functions, frontend forms)
3. ✅ Verify e-reader chapter availability model works with Chapter 1 live + pending
4. ✅ Test recovery flow with 30-day session lifetime (Decision 2)
5. ✅ Validate all error states with Decision 3 messaging (code expiry from generation)

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

<<<<<<< HEAD
- ✅ All 3 prompts (3A, 3B, 3C) specifications handed to Spec 005
- ✅ Spec 005 implements per all acceptance criteria (CR-3A.1–3A.8, CR-3B.1–3B.6, CR-3C.1–3C.5)
- ✅ Copy references "Chapter 1" for immediate launch scenario
- ✅ Recovery flow integrates with 30-day device lifecycle (Decision 2)
- ✅ Error messages reflect approved Decision 3 (expiry from code generation)
- ✅ Newsletter CTA separate and optional (Decision 6)
- ✅ Spec 005 owns complete reader access implementation flow

---

## Next Steps (After Phase B Handoff to Spec 005)

1. **Spec 005 Implementation** (2026-11-21+)
   - Implement reader access verification flow per Spec 005
   - Build Netlify Functions for code generation, verification, session management
   - Implement recovery flow with 30-day device lifecycle
   - Build form UI with all error states per Decision 3
=======
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
>>>>>>> origin/main

2. **Chapter Approval Loop** (2026-11-21+)
   - Ash approves chapters individually
   - Publish each chapter as approved
   - Update e-reader with "More chapters coming" messaging

3. **Phase B Completion** (2026-12-15 target)
<<<<<<< HEAD
   - Spec 005 implementation complete
   - Prompts 3A, 3B, 3C fully integrated in Spec 005
   - Reader access feature live with Chapter 1 available
   - Recovery flow, error handling, and all decision integrations verified
=======
   - All decision integration complete
   - Prompts 3A, 3B, 3C fully implemented in Spec 005
   - Reader access feature live with Chapter 1 available
>>>>>>> origin/main

---

**Version**: 1.0.0 | **Status**: Ready for Execution | **Date**: 2026-11-19 | **Approval**: Ash ✅

