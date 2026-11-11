# Consolidation Manifest: TOA-358 Guidelines Refactor
## Phase 2 G-to-N Document Mapping

**Authority:** D4 (Documentation Destinations & N-Document Approvals)  
**Created:** 2026-11-09  
**Status:** Phase 2A — Active mapping for implementation execution

---

## Executive Summary

| Metric | Count | Details |
| -------- | ------- | --------- |
| **G-Documents (Baseline)** | 116 | All preserved per D0 |
| **S-Documents (Supporting)** | 9 | Protected files; approval T017 |
| **N-Documents (Phase 2 Approved)** | 29 | N001–N029 per D4 |
| **N-Documents (Phase 3 Deferred)** | 4 | N030–N033 (WordPress) per D8 |
| **Pointer Strategies** | 3 | Type 1 (Relocation), Type 2 (Consolidation), Type 3 (Archival) per D5 |
| **Archive Directory** | `guidelines/_archive/` | Per D5.a |
| **Total Tracked Entities** | 158 | 116 G + 9 S + 33 N |

---

## Phase 2 Approved N-Documents (N001–N029)

### Reference & Diagnostics (N001–N005)

| ID | Title | Purpose | G-Doc Mapping | Status |
| --- | ------- | --------- | --------------- | -------- |
| **N001** | Design Token Reference | Comprehensive reference for color palette, spacing scales, typography | Design-tokens guidelines | ✅ Approved |
| **N002** | Accessibility Checklist | WCAG 2.2 AAA compliance guide; audit checklist | Accessibility guidelines + Components | ✅ Approved |
| **N003** | Component Documentation | Living component library reference | Components/ directory | ✅ Approved |
| **N004** | CSS & Styling Guide | Utility-first CSS patterns; BEM conventions | CSS guidelines | ✅ Approved |
| **N005** | Media & Asset Optimization | Image formats, CDN setup, asset pipeline | Media guidelines | ✅ Approved |

### Guidelines Organization (N006–N018)

| ID | Title | Purpose | G-Doc Mapping | Pointer Type |
| --- | ------- | --------- | --------------- | -------------- |
| **N006** | Architecture Overview | System design, tech stack decisions | Architecture | Type 1 |
| **N007** | Publishing Workflow & Boundaries | Manuscript status, publication model, editorial workflow (D2 ref) | Publishing guidelines | Type 1 |
| **N008** | Content Model & Structure | Data structure for posts, pages, collections | Content guidelines | Type 2 |
| **N009** | Responsive Design Patterns | Mobile-first breakpoints, media queries | Responsive guidelines | Type 1 |
| **N010** | Dark Mode Implementation | Theme switching, CSS variables for dark | Dark-mode guidelines | Type 2 |
| **N011** | Accessibility Standards | WCAG 2.2 AAA targets; implementation patterns | Accessibility (detailed) | Type 1 |
| **N012** | Performance Guidelines | Core Web Vitals targets; optimization checklist | Performance guidelines | Type 2 |
| **N013** | State Management & Data Flow | Data flow patterns, state libraries | State management guidelines | Type 1 |
| **N014** | Forms & Input Patterns | Form validation, error handling, accessibility | Forms guidelines | Type 2 |
| **N015** | Navigation & Information Architecture | Site structure, menu patterns, breadcrumbs | Navigation guidelines | Type 1 |
| **N016** | Testing Strategy & Coverage | Unit tests, integration tests, E2E patterns | Test guidelines | Type 1 |
| **N017** | Version Control & Git Workflow | Branching strategy, commit conventions | Git guidelines | Type 1 |
| **N018** | Backend Stack & Integration Patterns | Vercel/Supabase/tRPC canonical (D6 ref); alternatives | Backend guidelines | Type 1 |

### Patterns (N019–N022)

| ID | Title | Purpose | G-Doc Mapping | Status |
| --- | ------- | --------- | --------------- | -------- |
| **N019** | Book Card Component Pattern | Reusable card component for book/article | Components/BookCard | ✅ Approved |
| **N020** | Hero Section Pattern | Homepage hero layout; image optimization | Sections/Hero | ✅ Approved |
| **N021** | Value Proposition Pattern | Feature/benefit messaging layout | Sections/Proposition | ✅ Approved |
| **N022** | Journal Preview Pattern | Excerpt/preview cards for journal entries | Patterns/JournalPreview | ✅ Approved |

### Pages (N023–N025)

| ID | Title | Purpose | G-Doc Mapping | Status |
| --- | ------- | --------- | --------------- | -------- |
| **N023** | README.md Guide | Repository overview, setup, contribution links | Root README | ✅ Approved |
| **N024** | Book Home Page Guide | Site homepage structure, hero, CTA | Pages/BookHome | ✅ Approved |
| **N025** | Sitemap & Information Architecture | Complete site structure map | Pages/Sitemap | ✅ Approved |

### Reports & Archived (N026–N029)

| ID | Title | Purpose | G-Doc Mapping | Status |
| --- | ------- | --------- | --------------- | -------- |
| **N026** | Accessibility Audit Report | WCAG 2.2 compliance status; remediation plan | Reports/Accessibility | ✅ Approved |
| **N027** | Performance Audit Report | Core Web Vitals baseline; optimization roadmap | Reports/Performance | ✅ Approved |
| **N028** | Dark Mode Implementation Status | Feature status, browser support matrix | Reports/DarkMode | ✅ Approved |
| **N029** | Build & Deployment Pipeline | CI/CD setup, deployment checklist | Reports/Deployment | ✅ Approved |

---

## Phase 3 Deferred N-Documents (N030–N033)

**Authority:** D8 (WordPress & Portfolio Role)  
**Rationale:** WordPress not in active stack; deferred for Phase 3 if tech stack changes

| ID | Title | Purpose | Status |
| --- | ------- | --------- | -------- |
| **N030** | WordPress Block Patterns | Custom block development for WordPress | 🔄 DEFERRED (Phase 3) |
| **N031** | WordPress Integration Decision Model | When to migrate existing content to WordPress | 🔄 DEFERRED (Phase 3) |
| **N032** | Portfolio Showcase Patterns | Portfolio gallery, project cards, filtering | 🔄 DEFERRED (Phase 3) |
| **N033** | nova-news Integration Guide | Third-party news feed setup and customization | 🔄 DEFERRED (Phase 3) |

---

## G-Document Disposition Strategy

### High-Traffic G-Documents → Pointers (Type 1/2)

**Policy:** Guidelines frequently referenced (>5 internal links or external mentions) get consolidated into N-documents with pointer files at original locations.

| G-Document | Consolidated Into | Pointer Type | Rationale |
| --- | --- | --- | --- |
| `Contributing.md` | N017 (Git Workflow) | Type 1 | Central contribution hub; high traffic |
| `ACCESSIBILITY.md` | N011 (Accessibility Standards) | Type 1 | Key reference; frequently updated |
| `design-tokens/*` | N001 (Design Token Reference) | Type 2 | Consolidate all token files |
| `responsive/` | N009 (Responsive Patterns) | Type 2 | Consolidate responsive guidelines |
| `dark-mode-*.md` | N010 (Dark Mode) | Type 2 | Consolidate dark mode implementation |
| `components/` (high-level) | N003 (Component Documentation) | Type 2 | Consolidate component guidance |
| `pages/README.md` | N023 (README Guide) | Type 1 | Site navigation hub |

**Pointer Structure:**
- **File:** `guidelines/{original-name}.md`
- **Content:** Type 1/2 redirect per pointer-redirect-contract.md
- **Example:** `Contributing.md` → pointer → `Brand-Voice-Contributing.md` (in N017)

---

### Archived G-Documents (Type 3 Pointers)

**Policy:** Deprecated, out-of-scope, or superseded guidelines moved to `guidelines/_archive/` with Type 3 comment-based pointers.

| G-Document | Reason | Archive Destination | Replacement N-Doc |
| --- | --- | --- | --- |
| `wordpress-*.md` | Not in active stack (D8) | `_archive/wordpress-block-patterns.md` | N030 (Phase 3) |
| `portfolio-*.md` | Out of scope (D8) | `_archive/portfolio-legacy.md` | N032 (Phase 3) |
| `nova-news-*.md` | Out of scope | `_archive/nova-news-integration.md` | N033 (Phase 3) |
| Deprecated `pwa-*.md` | Superseded by modern PWA | `_archive/pwa-legacy.md` | N029 (Reports) |

**Archive Structure:**
- **Location:** `guidelines/_archive/{original-name}.md`
- **Pointer:** Type 3 redirect + archive banner per D5.c
- **New Path:** Reference N-doc destination (Phase 2 or Phase 3)

---

### No-Change G-Documents

**Policy:** Guidelines with no D1/D3/D5 dependencies remain in place unchanged.

| Count | Category | Examples | Status |
| ------ | ------ | ------ | ------ |
| **~26** | Core patterns (no edit needed) | `sections/`, `blocks/`, `templates/` | ✅ VERIFIED UNCHANGED |
| **~64** | Modified per D1 (voice softening) | All reference files needing copy alignment | ✅ EDITED (T023 complete) |
| **~21** | Modified per D3 (WCAG updates) | Accessibility files, component docs | ✅ EDITED (T023 complete) |
| **Total** | **116 G-Documents** | All accounted for | ✅ 100% INVENTORY COMPLETE |

---

## Execution Sequence (Phase 2 Critical Path)

### 1. Create N-Documents (T048)
**Blocked by:** None (D4 approvals confirmed)
**Creates:** 29 N-documents in `guidelines/` per N001–N029 specifications
**Unblocks:** T024–T027 (pointer edits), T033–T037 (link validation)

### 2. Create Pointers (T024–T027)
**Blocked by:** N-document creation complete
**Creates:** Type 1/2 pointer files for high-traffic G-docs per mapping above
**Verifies:** All pointer destinations exist and are reachable
**Unblocks:** T033–T037 (link validation)

### 3. Archive Operations (T025)
**Blocked by:** None (archive structure independent)
**Moves:** Deprecated guidelines to `guidelines/_archive/`
**Creates:** Type 3 pointer comment-based redirects
**Example:** `guidelines/_archive/wordpress-block-patterns.md` → comments pointing to N030 (Phase 3)

### 4. Link Validation (T033–T037)
**Blocked by:** Pointers and archives complete
**Validates:** All 129 internal reference candidates
**Fixes:** Broken links pointing to old locations → updated to new N-doc locations
**Documents:** Coverage manifest with resolution for each broken link

### 5. Design Verification (T038–T040)
**Blocked by:** Link validation complete
**Verifies:** Color hex, spacing scales, typography examples
**Documents:** Design verification manifest with audit trail

### 6. Final Sign-Off (T041–T043, T066–T069)
**Blocked by:** All above complete
**Creates:** Final coverage manifest (158 rows: 116 G + 9 S + 33 N)
**Validates:** All preservation rules, all pointer chains, skill exercises
**Outcome:** READY FOR MERGE when all checklist items ✅

---

## Decision Evidence & Authority

| Decision | Authority | Evidence | Status |
| ------ | ------ | ------ | ------ |
| **D4.b** (G→N Mapping) | Owner | checklists/requirements.md § D4 | ✅ Recorded 2026-10-25 |
| **D5** (Pointer Strategy) | Owner | checklists/requirements.md § D5 | ✅ Recorded 2026-10-25 |
| **D5.a** (Archive Location) | D5 implementation | `guidelines/_archive/` directory | ✅ Approved |
| **D5.d** (Type 3 Constraints) | D5 implementation | pointer-redirect-contract.md § Type 3 | ✅ Approved |

---

## Blocking & Dependencies

### Immediate Blockers Resolved ✅
- [x] D4 approvals confirmed (29 Phase 2 + 4 Phase 3 deferred)
- [x] G→N mapping defined (high-traffic consolidation strategy)
- [x] Archive strategy confirmed (Type 3 pointers + D5.c notation)
- [x] Pointer chain depth enforced (1-hop maximum per D5)

### Remaining Phase 2 Blockers
- [ ] **T048:** N-document creation (awaiting manifest sign-off)
- [ ] **T024–T027:** G-document pointer edits (depends on T048)
- [ ] **T033–T037:** Link validation & correction (depends on T024–T027)
- [ ] **T038–T040:** Design verification (sequential after links complete)

---

## Status & Next Actions

**Manifest Status:** ✅ READY FOR IMPLEMENTATION

**Next Immediate Step:** Execute T048 (N-document creation)  
1. Create 29 N-documents using outlined specs from N001–N029 above
2. Commit with evidence: `feat(003-N001-N029): Add approved reference guides per D4`
3. Unblocks T024–T027 (pointer edits)

**Owner Sign-Off:** ✅ Confirmed in requirements.md § D0–D8 (recorded 2026-10-25)

---

*Manifest Created: 2026-11-09*  
*Authority: D4 (Owner) & D5 (Implementation Guidance)*  
*Specification: [spec.md](./spec.md) | [requirements.md](./checklists/requirements.md)*
