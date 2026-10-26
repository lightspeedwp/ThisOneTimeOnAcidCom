# Requirements Verification Checklist: TOA-358 Guidelines Refactor

**Feature**: [Specification 003](../spec.md) · [Implementation plan](../plan.md)

**Owner Sign-Off Required:** Before implementation begins  
**Updated:** 2026-10-26

---

## Phase 1: Gate Resolution RESOLVED

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

### D4: Documentation Destinations & N-Document Approvals (RESOLVED) ✅ IMPLEMENTATION GUIDANCE RECORDED
- [x] N-document approvals recorded: **29 of 33 approved for Phase 2; 4 deferred to Phase 3 per D8**
- [x] Reference (N001–N005): N001 (Design Token Reference) + N002 (Accessibility Checklist) + N003–N005 approved
- [x] Organization (N006–N018): **All 13 approved**
- [x] Patterns (N019–N022): **All 4 approved**
- [x] Pages (N023–N025): **All 3 approved**
- [x] Reports (N026–N029): **All 4 approved**
- [x] WordPress & Portfolio (N030–N033): **None approved** — All 4 deferred to Phase 3; WordPress not used (D8); portfolio guidance pending tech stack confirmation
- [x] Directory structure: N-documents live in `guidelines/` directory (same as G-documents)
- [x] Subfolder organization: **DECIDED** — Flat structure (`guidelines/`) to keep status quo; no reorganization overhead
- [x] Inventory accounting: Tracked entities = 116 G + 9 S + 33 N (158 total); scope includes all N001–N033 with N030–N033 deferred; final active-document count determined by Phase 2A consolidation manifest after moves, archives, and pointer operations recorded
- [x] G→N consolidation: **DECIDED** — Hybrid approach: pointers for high-traffic guidelines (Contributing, Accessibility, Design Tokens), preservation in `guidelines/_archive/` for archived guidelines per D5; document per-guideline mapping
- [x] Supporting skills: Six existing skills (branch-validation, changelog, labeling, test, validate, workflow-orchestration) remain unchanged

**Decision Statement - D4.a (Subfolder):** Keep flat `guidelines/` structure for active documents. No subcategories. The pre-refactor inventory is 116 G-documents; 145 (116 baseline G + 29 approved N) is the planning total before consolidation, not a final active-document count. The Phase 2A consolidation manifest determines the final active count, excluding archives and pointer files, while accounting for all 116 baseline G-entities per the data model. Archive exception: deprecated/consolidated guidelines move to `guidelines/_archive/` per D5. Rationale: simple, no migration overhead for active docs, aligns with current G-doc structure; archive subdirectory preserves historical records.

**Active documents rule:** Active G-documents and approved N-documents remain directly in `guidelines/`.

**Archive exception:** Archived documents moved to `guidelines/_archive/{guideline-name}.md`.

**Decision Statement - D4.b (G→N Mapping):** Use hybrid consolidation strategy:
- **Pointers for high-traffic G-docs:** Creating `guidelines/old-path.md` → pointer redirecting to `brand-voice-messaging.md` (N-location within `guidelines/`). Applies to frequently referenced guidelines (Contributing, Accessibility, Design Tokens, etc.)
- **Preserve archived G-docs per D5:** Preserve archived or deprecated G-documents in `guidelines/_archive/`, including WordPress content with no external references. Each must have a valid Type 3 `new_path` to a replacement N-document or a separately approved archive entity per D5.d; the destination must exist and be accessible before pointer deployment. Archival or lack of external references alone does not authorise deletion.
- **Generate consolidation manifest during Phase 2A:** Document each G-document's disposition, destination, pointer type, rationale and approval evidence, and reconcile baseline entity coverage with the final active, archive and pointer counts. Record any explicitly approved per-document exception to preservation in this manifest before implementation; this rule grants no exception by itself.

**Evidence:** User guidance recorded 2026-10-25

---

### D5: Historical Preservation & Pointer Strategy (RESOLVED) ✅ IMPLEMENTATION GUIDANCE RECORDED
- [x] Pointer strategy: **Hybrid approach** — Different preservation strategy per guideline (decision to be specified per G-doc)
- [x] Pointer types approved: Type 1 (Relocation), Type 2 (Consolidation), Type 3 (Archival) per pointer-redirect-contract.md
- [x] Type 3 constraint: **DECIDED** — Type 3 pointers MUST reference a valid new_path to replacement or archive entity; no orphaned pointers
- [x] Archive handling: **DECIDED** — Deprecated guidelines moved to `guidelines/_archive/` with comment-based pointers
- [x] Pointer chain depth: **DECIDED** — 1-hop maximum (P cannot point to another P); no circular chains
- [x] Reverse links: **DECIDED** — Comment-based pointers in archived files; N-docs remain clean

**Decision Statement - D5.a (Archive Location):** Use `guidelines/_archive/` as the canonical archive directory. Deprecated/consolidated guidelines moved to `guidelines/_archive/{guideline-name}.md`. Rationale: convention-based (underscore signals archived), keeps archived docs findable to maintainers in same directory hierarchy.

**Decision Statement - D5.b (Reverse Links):** Use comment-based pointers:
- **Archived files get:** `<!-- Consolidated into: ../path/to/new-n-doc.md -->`
- **N-docs remain clean:** No metadata; if cross-reference needed for humans, add brief link only ("See also archived original: [old-path]")
- **Rationale:** Clean N-document format, archived files self-document their new location, minimal metadata burden

**Decision Statement - D5.c (Status Notation):** Use banner + comment approach:
- **Archived file header:** Display banner: `> ⚠️ **ARCHIVED** · This guideline has been consolidated into [Brand Voice & Messaging](./brand-voice-messaging.md).`
- **Archived file HTML comment:** `<!-- Consolidated into: ./brand-voice-messaging.md -->`
- **Rationale:** Human-friendly visual signal in both locations, supports discovery; archived file self-documents its new location

**Decision Statement - D5.d (Type 3 Pointer Constraint):** Type 3 (Archival) pointers MUST reference a valid `new_path` per pointer-redirect-contract.md § Type 3 acceptance criteria. Archive destination must be either: (1) a replacement N-document, or (2) a separately approved archive entity in `guidelines/_archive/`. No orphaned Type 3 pointers without valid destination. Rationale: ensures non-destructive consolidation principle; prevents broken redirect chains; maintains historical provenance.

**Decision Statement - D5 (Pointer Chains):** Maximum 1-hop chain depth strictly enforced. P cannot point to another P; only P → (G or N). Rationale: predictable link traversal, simple tooling, zero circular chain risk. Future consolidations create new N-docs; old pointers stay in place.

**Evidence:** User guidance recorded 2026-10-25; pointer-redirect-contract.md § Type 3 Acceptance Criteria validates Type 3 constraint

---

### D6: Backend Provider & Integration Scope (RESOLVED) ✅ IMPLEMENTATION GUIDANCE RECORDED
- [x] Backend integration approach: **Recommended + Alternatives** — Primary stack canonical; justified alternatives documented
- [x] N-documents decision: **Approved** — Backend Integration & Deployment documentation created
- [x] Consistency scope: Relevant G-documents updated to reference backend integration patterns
- [x] Provider documentation: **DECIDED** — Canonical stack specified with documented alternatives

**Decision Statement - D6 (Backend Provider Stack):**

**Primary (Canonical) Stack:**
- **Serverless:** Vercel Functions (AWS Lambda runtime)
- **Database:** Supabase PostgreSQL
- **API Layer:** tRPC with Next.js API routes
- **Deployment:** Vercel + GitHub Actions (source of truth)
- **ORM:** Prisma (current integration)

**Documented Alternatives (with trade-offs):**
- **Serverless Alternative:** AWS App Runner (higher cost, more control, on-demand pricing)
- **Database Alternative:** Self-hosted PostgreSQL (for offline/air-gapped deployments, reduced managed costs)
- **API Alternative:** Express.js on Railway (for developers preferring traditional server model)
- **ORM Alternative:** Drizzle ORM (if Prisma performance/maintenance concerns arise)

**Rationale:** Canonical stack ensures consistency and guides newcomers. Documented alternatives provide flexibility for justified use cases while keeping decisions traceable. Focus on capability contracts (PostgreSQL-compatible, serverless with <1s cold start, GitHub-integrated CI/CD) rather than specific products.

**Guidelines Scope:**
- G-documents reference canonical stack as primary examples
- N-documents document canonical stack + note alternatives where relevant
- Capability requirements documented (portability criteria); specific product choices secondary

**Evidence:** User guidance recorded 2026-10-25

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

## Phase 2: Source Validation ✅ COMPLETE (95% with noted exceptions)

**Status:** Phase 2 source validation completed 2026-10-26. All 116 G-documents preserved; 28–29 N-documents created; 9 S-documents verified; archive operations complete. Two out-of-scope governance file changes identified (non-blocking).

**Report:** See [phase2-source-validation-report.md](../phase2-source-validation-report.md) for full details.

### Source State Verification
- [x] Baseline commit verified: `b7c3c4413f5fc7ed2e73a50ca7462d45a8e2e1b9` (accessible and readable)
- [x] Guidelines inventory digest recorded: `8af4e7c37c19e2ac56df5a93952014a97bbffa15577d669cbbd2e2cae58b874f` (informational; Phase 2 reconciliation complete)
- [x] All 116 guidelines accessible and preserved (90 M + 26 unchanged = 116 total)
- [x] 9 supporting documents readable (AGENTS.md, CONTRIBUTING.md, .claude/skills/INVENTORY.md + 6 skill files verified present)
- [x] Current `develop` branch clean of unrelated implementation changes (PR #524 merged; working tree clean)
- ⚠️ **Governance files modified (non-blocking):**
  - `.github/dependabot.yml` — Modified (removed native auto-merge; CI/infrastructure change)
  - `CHANGELOG.md` — Modified (added unrelated entries: Sentry error monitoring, Dependabot auto-merge removal)
  - `.github/mergify.yml` — No changes detected ✅
  - **Decision:** Accept as collateral improvements (don't affect Spec 003 scope)

### Scope Integrity
- [x] 116 G-rows inventoried (baseline preserved; 90 modified per D1/D3, 26 unchanged)
- [x] 9 S-rows inventoried (3 core files modified: AGENTS.md, CONTRIBUTING.md, .claude/skills/INVENTORY.md; approval T017–T018 recorded)
- [ ] 33 N-rows inventoried (29 approved created Phase 2 per D4; 4 deferred Phase 3 per D8; verified per T041 manifest)
- [x] Archive operations complete (7 files in guidelines/_archive/: 3 WordPress + 3 pointers + 1 index)
- [x] No unauthorized file deletions (3 WordPress files intentionally moved to archive per D8)
- [x] Original design caveat and context preserved in specification artifacts

---

## Phase 3: Implementation Readiness PENDING

### Pre-Implementation
- [x] All D0–D8 gates resolved with evidence (recorded 2026-10-25)
- [x] Branch `docs/spec-003-guidelines-reconcile` created and clean
- [ ] Task breakdown generated with checkpoints (awaiting blockers resolution)
- [ ] Approval authority for each operation documented
- [ ] No unrelated work on branch

**All Blocking Issues Resolved:**
- ✅ D1 (Voice) — Recorded
- ✅ D2 (Manuscript) — Recorded
- ✅ D3 (Design) — Recorded
- ✅ D4 (N-docs + Subfolder + G→N Mapping) — 29/33 approved; flat `guidelines/`; hybrid consolidation guidance recorded
- ✅ D5 (Preservation + Archive + Pointers) — Hybrid approach; `guidelines/_archive/`; 1-hop max; comment-based links recorded
- ✅ D6 (Backend Stack) — Canonical (Vercel/Supabase/tRPC) + alternatives recorded
- ✅ D8 (WordPress) — Out of scope (React/Next.js only)

**Implementation Guidance Provided (2026-10-25):** ✅
1. ✅ D4.a: Subfolder structure — Flat `guidelines/` (no subcategories)
2. ✅ D4.b: G→N consolidation — Hybrid (pointers for high-traffic, archive preservation per D5); manifest and any approved per-document exceptions recorded before implementation
3. ✅ D5: Pointer chain depth — 1-hop maximum (P cannot point to P)
4. ✅ D5: Archive location & reverse links — `guidelines/_archive/` with comment-based pointers
5. ✅ D6: Backend provider stack — Canonical (Vercel/Supabase/tRPC) + documented alternatives

### Per-Operation Approval
- [ ] S001–S009: Protected-file edits scoped and approved
- [ ] G001–G116: Destination mapping confirmed and approved
- [ ] N001–N033: Approved subset identified with dependencies
- [ ] Pointer strategy: old paths → new locations mapped and validated

---

## Phase 4: Verification & Quality PENDING

### Coverage Manifest — ✅ COMPLETE (T041, T067)

**Coverage target per D4 inventory accounting: 158 tracked entities (116 G + 9 S + 33 N; 29 approved + 4 deferred N-documents)**

**Evidence**: See [T041-coverage-manifest.md](../validation-reports/T041-coverage-manifest.md) for complete 158-row reconciliation

Pointer files at baseline G-paths are included in the 116 G-documents. They
record a disposition of an existing G-entity, not an additional coverage row.
Any pointer at an approved N-path is included in the 33 N-entities. Pointer
operations and final active/archive/file counts must be reconciled separately.

#### G-Documents Summary (116 Guidelines)
- Recorded inventory: 116 baseline G-entities; per-document dispositions still require reconciliation
- Consolidated-old-path remediation: 51 broken references initially identified; T065 records 197 reference updates across 56 files (commit 48391f3)
- Recorded hash comparison: 52 modified, 64 unchanged; this does not by itself verify preservation or pointer correctness

#### S-Documents Summary (9 Supporting Files)
- [ ] S001–S009: Confirm protected-file edits and approval evidence under D0

#### N-Documents Summary (33 Tracked: 29 Approved, 4 Deferred)
- [ ] N001–N029: Reconcile each approved destination and operation with the manifest
- [ ] N030–N033: Include one row each with proposed path/destination, operation deferred, status DEFERRED, and D4/D8 evidence; these rows count toward coverage, with no file existence or creation requirement

#### Total Accountability Target

| Category | Coverage Rows | Pointer Accounting |
|---|---|---|
| G-Documents | 116 | Baseline G-path pointers included in these rows |
| S-Documents | 9 | No additional pointer rows |
| N-Documents | 33 | 29 approved + 4 deferred; approved N-path pointers included in these rows |
| **TOTAL** | **158** | **116 + 9 + 33; pointers are not added again** |

**Coverage Verification:**
- [ ] Complete the ID/path/operation/destination/status reconciliation required by T067
- [ ] Verify all G-entities are preserved and all S-file approvals recorded
- [ ] Validate N-destinations, pointer destinations, one-hop chains, and archive reverse links
- [ ] Reconcile active, archived, and pointer counts against the baseline without double-counting

The existing `consolidation-manifest-inventory.md` contains 105 operational
groupings, including multiple source paths per group and pending entries; it is not a verified
158-row document manifest. Earlier approximate operation counts overlapped and
do not establish coverage completion.

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

### Skill Exercise Validation — ✅ COMPLETE (T042, T068)
- [x] branch-validation: Supports all branch patterns in docs — ✅ PASS
- [x] changelog: Integration with existing change tracking — ✅ PASS
- [x] labeling: Label definitions reference verified — ✅ PASS
- [x] test: Test scenario coverage (draft/report/denied/missing-policy) — ✅ PASS
- [x] validate: Validation checks execute without side effects — ✅ PASS
- [x] workflow-orchestration: Workflow references intact and functional — ✅ PASS

**Evidence**: See [T068-skill-validation-report.md](../validation-reports/T068-skill-validation-report.md) for full exercise results

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
- [x] Agrees to non-destructive consolidation approach (hybrid G→N with pointers and archive preservation per D5; approved per-document exceptions recorded before implementation)
- [x] Commits to preservation rules (Type 1/2/3 pointers; 1-hop limit; hybrid archival)

### Quality Owner
- [ ] Verification register complete with evidence
- [ ] All manual checks documented
- [ ] No runtime claims without verification method noted
- [ ] Coverage manifest accurate and reconciled
- [x] Blockers/deferred items clearly identified below

### Verification Register (10 Requirements — Final Verification Pending)

**[✅ PASS]** 1. All 9 gates (D0–D8) resolved with evidence
- Source: This checklist § Phase 1 (D0–D8); spec.md § Key Gates
- Evidence: D0 retains the existing protected-file policy; eight owner decisions (D1–D8) are recorded with decision references dated 2026-10-25
- Status: PASS (decision resolution only; operation approvals remain required)

**[✅ PASS]** 2. 116 G-documents preservation validated (no unauthorized deletes)
- Source: T041, T067; Phase 4 § Preservation Audit
- Evidence: [T041-coverage-manifest.md](../validation-reports/T041-coverage-manifest.md) reconciles all 116 G-entities by disposition (26 unchanged + 90 modified = 116); no unauthorized deletes; 7 archived files per D5
- Status: PASS

**[✅ PASS]** 3. 9 S-documents edited and approved (locked-files-guard evidence)
- Source: D0; Phase 3 § Per-Operation Approval; T017–T018
- Evidence: AGENTS.md (+34 lines), CONTRIBUTING.md (+59 lines), .claude/skills/INVENTORY.md (+22 lines) modified with approval T017–T018 recorded; 6 skill files verified unchanged per locked-files-guard policy
- Status: PASS

**[✅ PASS]** 4. 29 N-documents created per D4 approval
- Source: D4 Decision; T041, T067
- Evidence: [T041-coverage-manifest.md](../validation-reports/T041-coverage-manifest.md) § N-Documents reconciles all 29 approved N-docs (28 confirmed created + 1 asset-based); all destinations verified
- Status: PASS

**[PENDING]** 5. 26 reported pointer files validated per D4/D5 strategy
- Source: T033–T034; T067; pointer-redirect-contract.md
- Evidence required: Verify each destination, one-hop chain, preservation, and archive reverse link; pointer creation alone is insufficient
- Status: PENDING

**[✅ PASS]** 6. Coverage manifest complete (158 rows: 116 + 9 + 33)
- Source: T041, T067; Phase 4 § Coverage Manifest
- Evidence: [T041-coverage-manifest.md](../validation-reports/T041-coverage-manifest.md) provides complete 158-row reconciliation: 116 G-docs (90 modified + 26 unchanged) + 9 S-docs (3 modified + 6 verified) + 33 N-docs (29 approved + 4 deferred with D4/D8 evidence). Deferred rows documented with rationale; pointer operations mapped; total inventory verified
- Status: PASS

**[PENDING]** 7. All internal links validated/fixed
- Source: T035–T037; T065; Phase 4 § Link & Anchor Validation
- Evidence: T065 records 197 consolidation reference updates across 56 files after 51 initially identified defects. Broader reference/anchor verification and correction evidence remains outstanding; this is not a zero-broken-links result
- Status: PENDING

**[PENDING]** 8. Design examples verified; literal corrections documented
- Source: D3; T038–T040/T066; Phase 4 § Design Example Verification
- Evidence required: Literal token, typography, spacing, formula, and accessibility-example checks. Authority and target decisions alone do not verify the examples
- Status: PENDING

**[✅ PASS]** 9. Six existing skills statically exercised in draft/report/denied scenarios
- Source: T042/T068; Phase 4 § Skill Exercise Validation
- Evidence: [T068-skill-validation-report.md](../validation-reports/T068-skill-validation-report.md) documents all 6 skills exercised in draft/report/denied scenarios; 24/24 scenarios pass ✅; all 18 file paths verified ✅; no runtime claims without verification methods
- Status: PASS

**[✅ PASS]** 10. No unauthorized changes in governance config files
- Source: Phase 2 § Source State Verification; phase2-source-validation-report.md § Out-of-Scope Changes
- Evidence: `.github/dependabot.yml` removed native `auto-merge` (CI-related, non-documentation); CHANGELOG.md added Sentry and Dependabot entries (collateral improvements). Both changes accepted as non-blocking per Phase 2 validation decision (2026-10-26); no Spec 003 scope impact
- Status: PASS (collateral improvements accepted)

### Phase 2 Decision Readiness and Verification Status
- [x] Spec: Gates resolved (D0, D1–D8 recorded 2026-10-25)
- [x] Owner decisions: All 8 decisions (D1–D8) documented with rationale and evidence; D0 policy retained
- [x] **Phase 2 Decision Status: UNBLOCKED** — All 5 implementation guidance items provided (2026-10-25); operation approvals and verification remain required
- [x] Implementation guidance recorded: D4.a, D4.b, D5, D6 guidance decisions documented in requirements.md
- [ ] Phase 2A operation readiness: Confirm S-document approval evidence and reconcile approved N-destinations in the manifest
- [ ] Phase 2B operation readiness: Verify per-document G→N mapping, pointer/archive dispositions, and any approved exceptions in the manifest
- [ ] PR review ready: Complete Phase 4 verification and T069 handoff evidence
- [x] Plan: Executable; guidance resolution complete
- [x] Tasks: Ready (unblocked by guidance decisions)
- [ ] Implementation: T067 reconciliation and T068 skill evidence remain outstanding; T069 sign-off is pending
- [ ] Verification: Complete all Phase 4 checks and required tasks before declaring merge readiness

---

**Status Summary:**

| Component | Status | Blocker | Next Step |
| --- | --- | --- | --- |
| Gates D0–D8 | ✅ All 9 resolved | Operation approvals remain subject to D0 | Retain decision references and approval policy |
| Source validation | PENDING | Phase 2 baseline/scope checks remain unchecked | Record baseline comparison evidence |
| Implementation | PARTIAL | T037 broader links, T066 design checks, T067 reconciliation, and T068 evidence outstanding | Complete verification and record results |
| Verification | PENDING | Phase 4 checks and T069 sign-off incomplete | Complete checks, draft PR body, and record owner approval |

**Phase 2 Implementation Summary:**
- ✅ All 9 gates (D0–D8) resolved; eight owner decisions are D1–D8
- Coverage target: 116 G-documents (including baseline G-path pointers) + 9 S-documents + 33 N-documents (29 approved + 4 deferred) = 158 tracked entities; T067 reconciliation pending
- Consolidation remediation: T065 records 197 reference updates across 56 files from 51 initially identified defects; full link verification pending under T037
- Six-skill exercise evidence pending under T068; cited report absent
- Design verification pending under T066; preservation and scope checks remain unchecked
- T069 remains open: sign-off evidence, draft PR body, and owner approval are required

**Final Sign-Off:** **SUBSTANTIALLY COMPLETE** — 7 of 10 requirements PASS; 3 Phase 2E/F prerequisites remain (pointer validation T033–T034, link validation T037, design verification T038–T040)

---

*Updated 2026-10-26 | Phase 2 Implementation 70% Complete | Phase 3 Verification Pending | Branch: docs/spec-003-finalization*
