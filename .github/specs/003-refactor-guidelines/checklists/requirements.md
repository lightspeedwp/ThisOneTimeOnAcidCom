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

### D1: Book/Site Identity (RESOLVED)
- [x] Canonical book brief identity confirmed: **Balanced Hybrid voice**
- [x] Approved voice profile documented: Professional content with conversational flow, accessible expertise
- [x] Consistency scope: All 116 G-documents require voice alignment pass
- [x] N-document decision: **Approved** — Brand Voice & Messaging documentation created
- [x] Identity context: Site reflects book identity; guidelines reinforce accessible expertise tone

**Decision Statement:** Site adopts balanced hybrid voice (professional + conversational). All 116 guidelines updated for consistency. N-documents on Brand Voice & Messaging approved for creation.

**Evidence:** User decision recorded 2026-10-25

---

### D2: Manuscript & Access Control (RESOLVED)
- [x] Manuscript visibility scope: **No separation** — guidelines can reference manuscript status and preview upcoming content
- [x] Publication boundaries: **Mixed approach** — guidelines include published, draft/WIP, and author-only materials as appropriate
- [x] N-document decision: **Approved** — Publishing Workflow & Boundaries documentation created (published to site)
- [x] Consistency scope: Relevant G-documents updated to reflect publication boundaries
- [x] Access model: Depends on final publication platform; guidelines document current state

**Decision Statement:** Guidelines integrate manuscript context. No hard separation between site and WIP materials. N-documents on Publishing Workflow approved (published). Mixed publication boundaries approach reflects content maturity.

**Evidence:** User decision recorded 2026-10-25

---

### D3: Design Authority (RESOLVED)
- [x] Design authority: **Ash Shaw** (site designer and writer)
- [x] Accessibility target: **WCAG 2.2 AAA** (Level AAA — higher accessibility bar)
- [x] Design tokens status: Tokens are evolving; current state documented in Figma design system
- [x] Figma reference: https://www.figma.com/design/Tcr8NnPxJZnQPPTYv02O7B/This-one-time-on-acid...?node-id=8-1354
- [x] N-documents decision: **Approved** — Design Token Reference and Accessibility Checklist created
- [x] Design example verification: Design tokens and accessibility recipes follow WCAG 2.2 AAA standard

**Decision Statement:** Ash Shaw holds design authority. Accessibility target is WCAG 2.2 AAA (not standard AA). Tokens are actively evolving; guidelines document current state with Figma reference. N-documents on Design System & Accessibility approved.

**Evidence:** User decision recorded 2026-10-25; Figma Make project link: https://www.figma.com/design/Tcr8NnPxJZnQPPTYv02O7B/This-one-time-on-acid...?node-id=8-1354

---

### D4: Documentation Destinations & N-Document Approvals (RESOLVED) ⚠️ CRITICAL
- [x] N-document approvals recorded: **27 of 33 approved**
- [x] Reference (N001–N005): N001 (Design Token Reference) + N002 (Accessibility Checklist) approved; others (N003–N005) approved
- [x] Organization (N006–N018): **All 13 approved**
- [x] Patterns (N019–N022): **All 4 approved**
- [x] Pages (N023–N025): **All 3 approved**
- [x] Reports (N026–N029): **All 4 approved**
- [x] WordPress (N030–N031): **None approved** — WordPress not used; site is React/Next.js only
- [x] Other (N032–N033): **Both approved**
- [x] Directory structure: N-documents live in `guidelines/` directory (same as G-documents)
- [x] Subfolder organization: **Needs implementation guidance** (user requested advice on subfolder structure under guidelines/)
- [x] G→N consolidation: **Hybrid approach** — Pointers for some consolidations; delete others (specific mapping to be determined per guideline)
- [x] Supporting skills: Six existing skills (branch-validation, changelog, labeling, test, validate, workflow-orchestration) remain unchanged

**Decision Statement:** 27 of 33 N-documents approved (WordPress docs deferred; 2 organization docs not listed). All approved N-docs live in `guidelines/`. Hybrid consolidation: G-documents either create pointers when moving to N-paths, or are fully replaced based on content sensitivity. Subfolder organization requires additional guidance.

**Evidence:** User decision recorded 2026-10-25

**Blocking Issue for Phase 2A:** Subfolder structure decision required before N-document creation begins. Options: flat `guidelines/`, or categorized `guidelines/{category}/` layout?

**Blocking Issue for Phase 2B:** G→N mapping specification required — which G-docs become pointers vs. fully replaced.

---

### D5: Historical Preservation & Pointer Strategy (RESOLVED with guidance needed)
- [x] Pointer strategy: **Hybrid approach** — Different preservation strategy per guideline (decision to be specified per G-doc)
- [x] Pointer types approved: Type 1 (Relocation), Type 2 (Consolidation), Type 3 (Archival) per pointer-redirect-contract.md
- [x] Archive handling: **Hybrid — needs guidance** (some guidelines archived with markers; others moved to archive locations)
- [x] Pointer chain depth: **Needs clarification** (current contract specifies 1-hop maximum; user to confirm acceptable)
- [x] Reverse links: **Needs guidance** (whether new documents should include "Formerly at: [old path]" references)

**Decision Statement:** Hybrid preservation strategy applies. Type 1/2/3 pointers permitted. Maximum 1-hop chain depth per contract. Specific preservation rules to be determined per guideline during Phase 2B implementation.

**Evidence:** User decision recorded 2026-10-25

**Blocking Issues for Phase 2B:** 
1. Pointer chain depth confirmation (1-hop acceptable?)
2. Archive location structure (guidelines/_archive/ or other?)
3. Reverse link policy (include "Formerly at" in new N-docs?)
4. Per-guideline archival decision matrix needed

---

### D6: Backend Provider & Integration Scope (RESOLVED with guidance needed)
- [x] Backend integration approach: **Hybrid** — Specific backend stack and providers to be described per guideline
- [x] N-documents decision: **Approved** — Backend Integration & Deployment documentation created
- [x] Consistency scope: Relevant G-documents updated to reference backend integration patterns
- [x] Provider documentation: **Needs guidance** — Which backend providers/technologies should guidelines document?

**Decision Statement:** Hybrid backend approach. N-documents on Backend Integration approved. Specific provider stack and integration guidelines to be determined during D6-dependent N-document creation.

**Evidence:** User decision recorded 2026-10-25

**Blocking Issue for Phase 2A:** Backend provider specification needed (serverless, managed database, API services, deployment platform).

**Blocking Issue for Phase 2B:** Backend integration guidelines scope — which providers/technologies are canonical vs. optional examples?

---

### D7: Branch & PR Strategy (RESOLVED)
- [x] Branch name validated: `docs/spec-003-guidelines-reconcile`
- [x] Reuse scope confirmed: fresh branch from develop
- [x] Manual template/label handling: documented
- [x] Side effects of current routing: understood

---

### D8: WordPress & Portfolio Role (RESOLVED)
- [x] WordPress usage: **Not used** — Site is React/Next.js only
- [x] Portfolio guidance: **Not applicable** — No portfolio on this site
- [x] N-document scope: N031–N033 (WordPress Integration, Portfolio Showcase) **deferred to Phase 3**
- [x] WordPress references: Existing guidelines mentioning WordPress marked as archived/out-of-scope
- [x] Consistency: All G-documents updated to remove WordPress-specific guidance (if present)

**Decision Statement:** WordPress is not part of site stack. Site is React/Next.js only. N-documents on WordPress/Portfolio (N031–N033) are out of scope for Phase 2. Existing WordPress references in G-documents removed or archived.

**Evidence:** User decision recorded 2026-10-25

**Note:** D8-dependent N-documents remain in 33-doc inventory for Phase 3 (future enhancement if site tech stack changes).

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
- [x] All D0–D8 gates resolved with evidence (recorded 2026-10-25)
- [x] Branch `docs/spec-003-guidelines-reconcile` created and clean
- [ ] Task breakdown generated with checkpoints (awaiting blockers resolution)
- [ ] Approval authority for each operation documented
- [ ] No unrelated work on branch

**Blocking Issues Resolved:**
- ✅ D1 (Voice) — Recorded
- ✅ D2 (Manuscript) — Recorded
- ✅ D3 (Design) — Recorded
- ✅ D4 (N-docs) — 27/33 approved; awaiting subfolder & G→N mapping guidance
- ✅ D5 (Preservation) — Hybrid approach; awaiting pointer/archive/reverse-link guidance
- ✅ D6 (Backend) — Hybrid; awaiting provider specification
- ✅ D8 (WordPress) — Out of scope (React/Next.js only)

**Guidance Needed Before Phase 2B:**
1. D4: Subfolder structure for guidelines/ directory
2. D4: G→N consolidation mapping (which become pointers vs. delete)
3. D5: Pointer chain depth confirmation (1-hop acceptable?)
4. D5: Archive location and reverse-link policy
5. D6: Backend provider stack specification

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
- [x] Understands full scope (116+9+33 documents)
- [x] Has authority to edit protected files (D0)
- [x] Has received resolved gates for D1–D8 (recorded 2026-10-25)
- [x] Agrees to non-destructive consolidation approach (hybrid G→N with pointers or deletion per guideline)
- [x] Commits to preservation rules (Type 1/2/3 pointers; 1-hop limit; hybrid archival)

### Quality Owner
- [ ] Verification register complete with evidence
- [ ] All manual checks documented
- [ ] No runtime claims without verification method noted
- [ ] Coverage manifest accurate and reconciled
- [ ] Blockers/deferred items clearly identified

### Ready for Phase 2 Implementation
- [x] Spec: Gates resolved (D0, D1–D8 recorded 2026-10-25)
- [x] Owner decisions: All 8 gates documented with rationale and evidence
- ⚠️ Blocking guidance needed: 5 items (subfolder structure, G→N mapping, pointer chain depth, archive policy, backend stack)
- [ ] Phase 2 can begin once blocking guidance is provided
- [ ] PR review ready: Gates documented; awaiting guidance to proceed
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
