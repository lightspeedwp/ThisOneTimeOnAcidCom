# Requirements Verification Checklist: TOA-358 Guidelines Refactor

**Feature**: [Specification 003](../spec.md) · [Implementation plan](../plan.md)

**Owner Sign-Off Required:** Before implementation begins  
**Updated:** 2026-10-24

---

## Phase 1: Gate Resolution PENDING

### D0: Protected-File Process (RESOLVED)
- [x] Existing approval requirement confirmed in [the protected-file list](../../../PROTECTED_FILES.txt), including `.github/`
- [x] `locked-files-guard` approval requirement retained
- [x] D0 resolution is retention of existing policy; any simplification requires a recorded authorised decision

### D1: Book/Site Identity (PENDING)
- [ ] Canonical book brief identity confirmed
- [ ] Approved memoir voice documented
- [ ] Approved Journal voice documented
- [ ] Approved press biography voice documented
- [ ] Reader journey/CTA hierarchy defined
- [ ] Retained art/festival context identified
- [ ] Evidence source for identity claims provided

**Owner Input Needed:** Book brief reference, voice examples, reader journey map

---

### D2: Manuscript & Access Control (PENDING)
- [ ] Canonical manuscript source(s) identified
- [ ] Canonical Journal source(s) identified
- [ ] Preview/full-draft visibility rules defined
- [ ] Indexing boundaries confirmed
- [ ] Download/share/cache boundaries defined
- [ ] Soft capture vs real access control decision made

**Owner Input Needed:** Publication boundaries, access control model

---

### D3: Design Authority (PENDING)
- [ ] Current CSS/design-contract authority confirmed
- [ ] Palette role and authority identified
- [ ] Font roles and authority identified
- [ ] Accessibility target (AA/AAA) confirmed
- [ ] Design-review/handoff owner identified
- [ ] Sample arithmetic/colour verification method agreed

**Owner Input Needed:** Design contract owner, accessibility target, design review process

---

### D4: Documentation Destinations & Pointer Strategy (PENDING)
- [ ] Exact canonical destinations for G001–G116 confirmed
- [ ] Pointer-treatment approach selected: ◯ Full replacement ◯ Pointer-only ◯ Procedural extraction ◯ Mixed
- [ ] Six-existing-skill reference approach confirmed
- [ ] Conditional N-document subset approved
- [ ] New skill proposal status (optional N skills): approved / rejected

**Owner Input Needed:** G→destination mapping, N-subset approval, skill decision

---

### D5: Historical Preservation (PENDING)
- [ ] Artefact-specific retention rules defined
- [ ] Historical preservation-copy locations confirmed
- [ ] Move/Delete authorization for archived items
- [ ] Status notation approach (e.g., "Archived: see X")

**Owner Input Needed:** Preservation locations, archival rules

---

### D6: Backend/Provider Integration (PENDING)
- [ ] Signup/contact/waitlist provider confirmed
- [ ] Backend provider confirmed
- [ ] CMS provider confirmed (if any)
- [ ] Verification evidence attached (credentials redacted)
- [ ] Delivery method for secure unlock defined
- [ ] Live CMS/PWA/offline claims scope confirmed

**Owner Input Needed:** Provider details, delivery model, claims scope

---

### D7: Branch & PR Strategy (RESOLVED)
- [x] Branch name validated: `docs/spec-003-guidelines-reconcile`
- [x] Reuse scope confirmed: fresh branch from develop
- [x] Manual template/label handling: documented
- [x] Side effects of current routing: understood

---

### D8: WordPress & Portfolio (PENDING)
- [ ] WordPress/portfolio retained-reference role confirmed
- [ ] Future-option vs deprecated decision made
- [ ] Migration requirements (if any) documented
- [ ] Legacy requirements documented

**Owner Input Needed:** WordPress migration status, portfolio future role

---

## Phase 2: Source Validation PENDING

### Source State Verification
- [ ] Baseline observation hash confirmed: `8af4e7c37c19e2ac56df5a93952014a97bbffa15577d669cbbd2e2cae58b874f`
- [ ] All 116 guidelines accessible and unchanged
- [ ] 9 supporting documents readable
- [ ] Current `develop` branch clean of unrelated changes
- [ ] `.github/dependabot.yml`, `.github/mergify.yml`, `CHANGELOG.md` unchanged

### Scope Integrity
- [ ] 116 G-rows inventoried
- [ ] 9 S-rows inventoried
- [ ] 33 N-rows inventoried (conditional)
- [ ] No unexpected files added/removed since baseline
- [ ] Original pasted.md attachment intact
- [ ] Original design caveat preserved

---

## Phase 3: Implementation Readiness PENDING

### Pre-Implementation
- [ ] All D0–D8 gates resolved with evidence
- [ ] Branch `docs/spec-003-guidelines-reconcile` created and clean
- [ ] Task breakdown generated with checkpoints
- [ ] Approval authority for each operation documented
- [ ] No unrelated work on branch

### Per-Operation Approval
- [ ] S001–S009: Protected-file edits scoped and approved
- [ ] G001–G116: Destination mapping confirmed and approved
- [ ] N001–N033: Approved subset identified with dependencies
- [ ] Pointer strategy: old paths → new locations mapped and validated

---

## Phase 4: Verification & Quality PENDING

### Coverage Manifest
- [ ] All 116 G-rows: { path, hash, operation, destination, decision, status }
- [ ] All 9 S-rows: same + protected-file approval reference
- [ ] All 33 N-rows: { approval status, dependency resolution, pointer validation }
- [ ] Row counts reconcile: 116 + 9 + 33 + 0 (no move/delete) = 158 tracked

### Link & Anchor Validation
- [ ] 129 internal reference candidates classified (defect vs working)
- [ ] Anchors validated in current docs
- [ ] Cross-file paths tested
- [ ] Relative link corrections documented
- [ ] Markdown fence/table rendering verified

### Design Example Verification
- [ ] Colour hex values checked for accuracy
- [ ] Spacing values verified against CSS/tokens
- [ ] Typography scale arithmetic validated
- [ ] Keyboard/focus rules verified for accessibility recipes
- [ ] Reduced-motion examples validated
- [ ] Formula/input/threshold evidence documented per example

### Skill Exercise Validation
- [ ] branch-validation: Supports all branch patterns in docs
- [ ] changelog: Integration with existing change tracking
- [ ] labeling: Label definitions reference verified
- [ ] test: Test scenario coverage (draft/report/denied/missing-policy)
- [ ] validate: Validation checks execute without side effects
- [ ] workflow-orchestration: Workflow references intact and functional

**Methods:** Static code review; no actual label/workflow changes, no PR creation

### Preservation Audit
- [ ] No files moved without explicit approval
- [ ] No files deleted without explicit approval
- [ ] All unique safeguards preserved
- [ ] All historical provenance documented
- [ ] Original attachments and design caveat intact

---

## Final Sign-Off

### Implementation Owner
- [ ] Understands full scope (116+9+33 documents)
- [ ] Has authority to edit protected files (D0)
- [ ] Has received resolved gates for D1–D8
- [ ] Agrees to non-destructive consolidation approach
- [ ] Commits to preservation rules

### Quality Owner
- [ ] Verification register complete with evidence
- [ ] All manual checks documented
- [ ] No runtime claims without verification method noted
- [ ] Coverage manifest accurate and reconciled
- [ ] Blockers/deferred items clearly identified

### Ready for PR Review
- [ ] Spec: Draft; pending owner decisions
- [ ] Plan: Draft; pending Phase 1 completion
- [ ] Tasks: 🔄 Pending Phase 1 completion
- [ ] Implementation: 🔄 Pending all gate resolutions
- [ ] Verification: 🔄 Pending implementation

---

**Status Summary:**

| Component | Status | Blocker | Next Step |
| --- | --- | --- | --- |
| Gates D0–D8 | 2 resolved / 7 pending | D1–D6 and D8 pending; D0 and D7 resolved | Owner decisions |
| Source validation | Pending | Baseline comparison outstanding | Pre-impl check |
| Implementation | Not started | 🔄 Gates | Await decisions |
| Verification | Not started | 🔄 Gates | Post-impl audit |

---

*Updated 2026-10-24 | Branch: docs/spec-003-guidelines-reconcile*
