# Spec 005: Decision Request for Ash Shaw

**From**: Implementation team  
**Date**: 2026-11-20  
**Subject**: Unlock Phases 3–7 of Spec 005 (Reader Access)

---

## Background

Phase 2 (Foundational Infrastructure) is now **LOCKED and ready for implementation** ✅

To unblock Phases 3–7, we need your decisions on **25 questions** organized by topic. Each question has 2–3 options with rationale.

**Reference document**: `.github/specs/005-reader-access/decision-gates.md` (all decisions captured there)

---

## Decision Batches

Decisions are grouped by phase. You can respond by **phase** or **topic** — whichever is easier.

### Batch 1: Phase 3 (MVP/User Story 1) — 7 Decisions

**Topic**: Verify & read online; request code → verify → access chapters

**When needed**: To start RA-T030–RA-T038 (forms, functions, E2E tests)

**Questions**:
1. **Code entry UX**: Single input or six separate digit fields?
2. **Chapter rendering**: Markdown parser, component-per-chapter, or sanitized HTML?
3. **Code resend cooldown**: Confirm 60 seconds? ✅ (already locked)
4. **Per-email rate limit**: Confirm 10/24h? ✅ (already locked)
5. **Per-network rate limit**: Confirm 50/24h? ✅ (already locked)
6. **Bundling verification**: Automated CI check, manual verification, or both?
7. **Form submission UX**: Inline state changes or separate page?

**Expected response time**: ~10 min

**→ [Respond to Batch 1](#batch-1-response-template)**

---

### Batch 2: Phase 4 (Renewal/User Story 2) — 2 Decisions

**Topic**: Returning access; session renewal & sign-out

**When needed**: After Phase 3; to start RA-T039–RA-T043

**Questions**:
1. **Session renewal messaging**: Silent extend, "Welcome back!" message, or status display?
2. **Sign-out behavior**: Immediate cookie clear, server invalidation only, or both with confirmation?

**Expected response time**: ~5 min

**→ [Respond to Batch 2](#batch-2-response-template)**

---

### Batch 3: Phase 5 (Truthfulness/User Story 3) — 3 Decisions

**Topic**: Separate newsletter from reader access; honest feedback

**When needed**: After Phase 3; can run in parallel; to start RA-T044–RA-T046

**Questions**:
1. **Newsletter form location**: Separate form, checkbox in reader form, or post-verification page?
2. **Brevo integration**: API call from function, embedded client form, or Brevo double opt-in?
3. **Thank-you page messaging**: Generic, email-specific, or conditional based on user action?

**Expected response time**: ~10 min

**→ [Respond to Batch 3](#batch-3-response-template)**

---

### Batch 4: Phase 7 (Polish) — 2 Decisions

**Topic**: Accessibility & retention cleanup

**When needed**: After Phases 3–5; to start RA-T049–RA-T052

**Questions**:
1. **Accessibility conformance**: WCAG 2.2 AA, AAA, or AA with documented gaps?
2. **Cleanup frequency**: Hourly, daily, or weekly deletions of inactive records?

**Expected response time**: ~5 min

**→ [Respond to Batch 4](#batch-4-response-template)**

---

### Batch 5: Blockers & Confirmations — 1 Item

**Topic**: Mailgun verification

**When needed**: Before Phase 2 email testing (RA-T026)

**Question**:
1. **Mailgun domain**: Is `thisonetimeonacid.com` already verified in Mailgun console, or needs DNS setup?

**Expected response time**: ~2 min (may require checking Mailgun account)

**→ [Respond to Batch 5](#batch-5-response-template)**

---

## Response Format

For each batch, copy the template below, fill in your selections, and **reply in this document** or **in a comment on the GitHub PR** when available.

Each response updates `decision-gates.md` automatically.

---

## Batch 1 Response Template

```markdown
### Batch 1: Phase 3 (MVP) — Ash's Answers

**Q3.1 Code entry UX**
- [x] A: Single input (paste-friendly)
- [ ] B: Six separate inputs
- [ ] C: User choice

**Q3.2 Chapter rendering**
- [ ] A: Markdown parser
- [ ] B: Component per chapter
- [ ] C: Sanitized HTML

**Q3.6 Bundling verification**
- [ ] A: Automated CI only
- [ ] B: Manual only
- [x] C: Both

**Q3.7 Form submission UX**
- [ ] A: Inline state changes
- [ ] B: Separate page
- [ ] C: Other (explain)

**Approved by**: Ash Shaw  
**Date**: YYYY-MM-DD  
**Notes**: [any context or trade-off reasoning]
```

---

## Batch 2 Response Template

```markdown
### Batch 2: Phase 4 (Renewal) — Ash's Answers

**Q4.1 Session renewal messaging**
- [ ] A: Silent extend
- [ ] B: "Welcome back!" message
- [ ] C: Status display

**Q4.2 Sign-out behavior**
- [ ] A: Immediate cookie clear
- [ ] B: Server invalidation only
- [ ] C: Both + confirmation modal

**Approved by**: Ash Shaw  
**Date**: YYYY-MM-DD
```

---

## Batch 3 Response Template

```markdown
### Batch 3: Phase 5 (Newsletter) — Ash's Answers

**Q5.1 Newsletter form location**
- [ ] A: Separate form
- [ ] B: Checkbox in reader form
- [ ] C: Post-verification page

**Q5.2 Brevo integration**
- [ ] A: API call from function
- [ ] B: Embedded client form
- [ ] C: Brevo double opt-in

**Q5.3 Thank-you page messaging**
- [ ] A: Generic
- [ ] B: Email-specific
- [ ] C: Conditional

**Approved by**: Ash Shaw  
**Date**: YYYY-MM-DD
```

---

## Batch 4 Response Template

```markdown
### Batch 4: Phase 7 (Polish) — Ash's Answers

**Q7.1 Accessibility conformance**
- [ ] A: WCAG 2.2 AA
- [ ] B: WCAG 2.2 AAA
- [ ] C: AA + documented gaps

**Q7.2 Cleanup frequency**
- [ ] A: Hourly
- [ ] B: Daily
- [ ] C: Weekly

**Approved by**: Ash Shaw  
**Date**: YYYY-MM-DD
```

---

## Batch 5 Response Template

```markdown
### Batch 5: Blockers — Ash's Confirmation

**Mailgun domain verification**
- [ ] A: Domain verified, DNS confirmed in Mailgun
- [ ] B: Domain not yet verified, needs DNS setup
- [ ] C: Needs confirmation (checking now)

**Status**: [Ready to proceed / Blocked until verified]  
**Date**: YYYY-MM-DD
```

---

## How This Works

1. **You respond to this document** with your selections (checkboxes)
2. **Implementation team** records answers in `decision-gates.md`
3. **Phase gates unlock** as batches are approved
4. **Implementation starts** immediately when a phase gate opens

---

## Timeline

- **Phase 2**: ✅ LOCKED — Implementation begins now
- **Batch 1 (Phase 3)**: Answers received → Phase 3 unblocks (MVP ready in ~1–2 weeks)
- **Batch 2 (Phase 4)**: Answers received → Phase 4 unblocks
- **Batch 3 (Phase 5)**: Answers received → Phase 5 unblocks
- **Batch 4 (Phase 7)**: Answers received → Phase 7 unblocks
- **Batch 5 (Blocker)**: Confirm Mailgun → Email testing can proceed

---

## Questions?

If any decision option needs clarification, ask in the response or raise it in the PR.

**Reference**: Full decision context and rationale in `.github/specs/005-reader-access/decision-gates.md`

---

**Ready to respond?** Pick a batch and use the template above. You can answer all at once or batch by batch. 🚀
