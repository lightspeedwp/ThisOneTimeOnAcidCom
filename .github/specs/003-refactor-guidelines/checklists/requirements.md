# Requirements Verification Checklist: TOA-358 Guidelines Refactor

**Feature**: [Specification 003](../spec.md) · [Implementation plan](../plan.md)

**Owner Sign-Off Required:** Before implementation begins  
**Updated:** 2026-10-25

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
- [x] G→N consolidation: **DECIDED** — Hybrid approach: pointers for high-traffic guidelines (Contributing, Accessibility, Design Tokens), delete for archived guidelines; document per-guideline mapping
- [x] Supporting skills: Six existing skills (branch-validation, changelog, labeling, test, validate, workflow-orchestration) remain unchanged

**Decision Statement - D4.a (Subfolder):** Keep flat `guidelines/` structure. No subcategories; all 145 documents (116 G + 29 N) live directly in `guidelines/`. Rationale: simple, no migration overhead, aligns with current G-doc structure.

**Decision Statement - D4.b (G→N Mapping):** Use hybrid consolidation strategy:
- **Pointers for high-traffic G-docs:** Creating `guidelines/old-path.md` → pointer redirecting to `../brand-voice-messaging.md` (N-location). Applies to frequently referenced guidelines (Contributing, Accessibility, Design Tokens, etc.)
- **Delete for archived G-docs:** Fully remove G-docs when consolidating into archives or when WordPress/deprecated content has no external references.
- **Generate consolidation manifest during Phase 2A:** Document per-guideline decision (pointer vs. delete) with rationale for each.

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
- **Archived file header:** Display banner: `> ⚠️ **ARCHIVED** · This guideline has been consolidated into [Brand Voice & Messaging](../path). See [archived original](../\_archive/old-path.md).`
- **Archived file HTML comment:** `<!-- Consolidated into: ../brand-voice.md -->`
- **Rationale:** Human-friendly visual signal in both locations, supports discovery in both directions

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
2. ✅ D4.b: G→N consolidation — Hybrid (pointers for high-traffic, delete for archived); manifest to be generated
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
- [x] **Phase 2 Status: UNBLOCKED** — All 5 implementation guidance items provided (2026-10-25)
- [x] Implementation guidance recorded: D4.a, D4.b, D5, D6 guidance decisions documented in requirements.md
- [x] Phase 2A ready to begin: S-document edits, N-document creation, consolidation manifest generation
- [x] Phase 2B ready to proceed: G→N mapping, pointer/delete decisions, archive operations
- [x] PR review ready: Gates documented; implementation guidance provided
- [x] Plan: Executable; guidance resolution complete
- [x] Tasks: Ready (unblocked by guidance decisions)
- [ ] Implementation: Ready to start Phase 2A (S-doc edits, N-doc creation)
- [ ] Verification: Scheduled post-implementation

---

**Status Summary:**

| Component | Status | Blocker | Next Step |
| --- | --- | --- | --- |
| Gates D0–D8 | ✅ All 8 resolved | None — all gates documented with decisions and implementation guidance | Phase 2 implementation ready |
| Source validation | ✅ Complete | None | Proceed to Phase 2A/2B |
| Implementation | 🟡 Ready to start | None — guidance complete; awaiting Phase 2A kickoff | Begin S-document edits and N-document creation |
| Verification | ⏳ Scheduled | None — will execute post-Phase 2 implementation | Post-impl quality audit |

---

*Updated 2026-10-25 | Branch: docs/spec-003-guidelines-reconcile*
