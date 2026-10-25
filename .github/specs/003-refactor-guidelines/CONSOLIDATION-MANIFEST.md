---
title: "Consolidation Manifest: G→N Document Mapping"
spec_id: "003"
created: "2026-10-25"
status: "Phase 2A Working Document"
---

# Consolidation Manifest: G→N Document Mapping

**Purpose:** This document maps 116 existing G-documents (guidelines) to 29 approved N-documents (new consolidated guides) per D4 decision. It serves as the operational guide for Phase 2B (G-document edits) and Phase 2C (N-document creation).

**Status:** Phase 2A working document; will be finalized in checklists/requirements.md as Phase 2A completes.

**D4 Authority:** Requirements.md § D4 – 29 of 33 N-documents approved for Phase 2; hybrid consolidation strategy (pointers for high-traffic, archive for deprecated per D5).

---

## Reference Documents (N001–N005)

### N001: Design Token Reference  
**Purpose:** Comprehensive reference for all design tokens (colors, spacing, typography, animations, iconography) with values and usage patterns.  
**Related G-Documents (Consolidate):**
- guidelines/design-tokens/design-system-reference.md (integrate)
- guidelines/design-tokens/colors.md (reference, keep pointer)
- guidelines/design-tokens/typography.md (reference, keep pointer)
- guidelines/design-tokens/spacing.md (reference, keep pointer)
- guidelines/design-tokens/animations.md (reference, keep pointer)
- guidelines/design-tokens/neon-colors.md (reference, keep pointer)
- guidelines/design-tokens/neon-system.md (reference, keep pointer)
- guidelines/design-tokens/light-dark-mode.md (reference, keep pointer)
- guidelines/design-tokens/iconography.md (reference, keep pointer)
- guidelines/design-tokens/portfolio-design-tokens.md (reference, keep pointer)

**Destination Path:** `guidelines/design-tokens-reference.md`  
**Pointer Strategy:** Type 1 (Relocation) for design-tokens/* files — old paths become pointers to this new reference.  
**Status:** Create new, with cross-references to existing G-docs

---

### N002: Accessibility Checklist & Standards
**Purpose:** Actionable checklist for accessibility compliance (WCAG 2.2 AAA per D3) with recipes, audit report, and interaction guidelines.  
**Related G-Documents (Consolidate):**
- guidelines/accessibility-report-feb-2025.md (content, archive original)
- guidelines/interactions-accessibility.md (reference, keep pointer)
- guidelines/prefers-reduced-motion.md (reference, keep pointer)

**Destination Path:** `guidelines/accessibility-checklist.md`  
**Pointer Strategy:** Type 2 (Consolidation) — old paths point to new Accessibility Checklist.  
**Status:** Create new

---

### N003: CSS Architecture & Pattern Reference
**Purpose:** Comprehensive CSS guidance with BEM/architecture patterns, dark-mode rules, and responsive breakpoints.  
**Related G-Documents (Consolidate):**
- guidelines/css-architecture.md (content)
- guidelines/dark-mode-implementation.md (reference, keep pointer)
- guidelines/dark-mode-lessons-learned.md (reference, keep pointer)
- guidelines/tailwind-to-bem-mapping.md (reference, keep pointer)

**Destination Path:** `guidelines/css-architecture-reference.md`  
**Pointer Strategy:** Type 2 (Consolidation) for dark-mode files.  
**Status:** Create new with extended patterns

---

### N004: Media & Asset Guidelines
**Purpose:** Image optimization, iconography, responsive images, and asset management.  
**Related G-Documents (Consolidate):**
- guidelines/image-optimization.md (content)
- guidelines/icons/interface.md (reference, keep pointer)
- guidelines/icons/travel.md (reference, keep pointer)

**Destination Path:** `guidelines/media-guidelines.md`  
**Pointer Strategy:** Type 2 (Consolidation) for icon guidelines.  
**Status:** Create new

---

### N005: Component Reference Catalog
**Purpose:** Index and quick reference for all components with links to individual component guidelines (preserve as G-docs).  
**Related G-Documents (Reference, Keep):**
- All guidelines/components/*.md (30 component guides)
- guidelines/overview-components.md

**Destination Path:** `guidelines/component-catalog.md`  
**Pointer Strategy:** None (keep existing component docs; this N-doc is an index).  
**Status:** Create new index pointing to existing components

---

## Organization & Core Guidance (N006–N018)

### N006: Brand Voice & Messaging
**Purpose:** Site/book identity, voice principles, tone guidance, and messaging framework.  
**Related G-Documents (Consolidate):**
- guidelines/voice-and-tone.md (content, archive original)

**Destination Path:** `guidelines/brand-voice-messaging.md`  
**Pointer Strategy:** Type 1 (Relocation) – old voice-and-tone.md becomes pointer.  
**Status:** Create new

---

### N007: Publishing Workflow & Boundaries
**Purpose:** Manuscript status, publication model, content maturity levels, and editorial workflow (internal reference per D2).  
**Related G-Documents:**
- Existing G-docs with publication context (if any) — TBD per D2 decision

**Destination Path:** `guidelines/publishing-workflow.md`  
**Pointer Strategy:** N/A (new document for internal reference).  
**Status:** Create new

---

### N008: Accessibility Standards & Recipes
**Purpose:** Detailed WCAG 2.2 AAA recipes, reduced-motion handling, focus management, screen-reader patterns.  
**Related G-Documents (Cross-Reference):**
- guidelines/interactions-accessibility.md (referenced)
- guidelines/prefers-reduced-motion.md (referenced)

**Destination Path:** `guidelines/accessibility-recipes.md`  
**Pointer Strategy:** Reference (no consolidation; these remain active G-docs).  
**Status:** Create new with references to existing G-docs

---

### N009: Responsive Design & Breakpoints
**Purpose:** Breakpoint system, layout patterns, responsive typography, spacing adjustments.  
**Related G-Documents (Consolidate/Reference):**
- guidelines/responsive/README.md (organize under this N-doc)
- guidelines/responsive/breakpoints-system.md (reference)
- guidelines/responsive/layout-patterns.md (reference)
- guidelines/responsive/typography-scaling.md (reference)
- guidelines/responsive/spacing-adjustments.md (reference)
- guidelines/responsive/interaction-modes.md (reference)
- guidelines/responsive/navigation-responsive.md (reference)

**Destination Path:** `guidelines/responsive-design.md`  
**Pointer Strategy:** Type 2 (Consolidation) – responsive/* files become pointers.  
**Status:** Create new consolidating responsive guidance

---

### N010: Data Models & Architecture
**Purpose:** Data structures, content model, entity relationships, and system design patterns.  
**Related G-Documents (Consolidate):**
- guidelines/data-models.md (content)
- guidelines/ARCHITECTURE.md (architecture overview, integrate)

**Destination Path:** `guidelines/data-architecture.md`  
**Pointer Strategy:** Type 1 (Relocation) – Architecture.md becomes pointer if consolidated.  
**Status:** Create new

---

### N011: Content Taxonomy & Organization
**Purpose:** Content model taxonomy, categorization system, metadata structure for blog/portfolio content.  
**Related G-Documents:**
- guidelines/overview-blog-filtering.md (reference)
- guidelines/search-system.md (reference)

**Destination Path:** `guidelines/content-taxonomy.md`  
**Pointer Strategy:** Reference (keep existing overview docs).  
**Status:** Create new

---

### N012: Typography System & Specification
**Purpose:** Font stack, sizing scale, line-height rules, and typographic hierarchy (detailed reference).  
**Related G-Documents (Reference):**
- guidelines/design-tokens/typography.md (referenced from N001)
- guidelines/responsive/typography-scaling.md (referenced from N009)

**Destination Path:** `guidelines/typography-spec.md`  
**Pointer Strategy:** Reference (consolidate with N001 Design Token Reference if too redundant).  
**Status:** Create new or consolidate with N001

---

### N013: Spacing & Layout Grid
**Purpose:** Spacing scale, grid system, margin/padding rules, and layout primitives.  
**Related G-Documents (Reference):**
- guidelines/design-tokens/spacing.md (referenced from N001)
- guidelines/responsive/spacing-adjustments.md (referenced from N009)

**Destination Path:** `guidelines/spacing-grid.md`  
**Pointer Strategy:** Reference (consolidate with N001 if too redundant).  
**Status:** Create new or consolidate with N001

---

### N014: Color Palette & Contrast Standards
**Purpose:** Color palette (neon, brand colors), contrast ratios, dark-mode palette, accessibility compliance.  
**Related G-Documents (Reference):**
- guidelines/design-tokens/colors.md (referenced from N001)
- guidelines/design-tokens/neon-colors.md (referenced from N001)
- guidelines/design-tokens/neon-system.md (referenced from N001)
- guidelines/design-tokens/light-dark-mode.md (referenced from N001)

**Destination Path:** `guidelines/color-palette.md`  
**Pointer Strategy:** Reference (part of N001 Design Token Reference).  
**Status:** Create as detailed reference or subset of N001

---

### N015: Interactions & Animations
**Purpose:** Animation principles, interaction patterns, reduced-motion recipes, and transition timing.  
**Related G-Documents (Consolidate):**
- guidelines/design-tokens/animations.md (content, keep pointer)
- guidelines/interactions-accessibility.md (content, archive and pointer)
- guidelines/prefers-reduced-motion.md (content, keep pointer)

**Destination Path:** `guidelines/interactions-animations.md`  
**Pointer Strategy:** Type 2 (Consolidation).  
**Status:** Create new

---

### N016: Testing Strategy & Coverage
**Purpose:** Testing patterns, coverage goals, test scenarios, and validation approaches.  
**Related G-Documents:**
- To be defined based on existing test documentation (if any)

**Destination Path:** `guidelines/testing-strategy.md`  
**Pointer Strategy:** N/A (likely new topic).  
**Status:** Create new

---

### N017: Performance Budgets & Optimization
**Purpose:** Performance targets, image optimization, lazy-loading, and optimization checklist.  
**Related G-Documents (Consolidate):**
- guidelines/performance-optimization.md (content)
- guidelines/performance-optimization-report.md (report, archive)
- guidelines/image-optimization.md (reference from N004)
- guidelines/mobile/performance.md (reference)

**Destination Path:** `guidelines/performance-optimization.md` (existing; update with N017 scope)  
**Pointer Strategy:** Type 2 (Consolidation) for report → reference new optimization guide.  
**Status:** Update existing or create new consolidation

---

### N018: Backend Stack & Integration Patterns
**Purpose:** Canonical backend stack (Vercel/Supabase/tRPC), API patterns, deployment workflow, alternatives.  
**Related G-Documents:**
- Guidelines referencing backend stack (if any) – TBD

**Destination Path:** `guidelines/backend-integration.md`  
**Pointer Strategy:** N/A (new documentation per D6).  
**Status:** Create new

---

## Pattern Libraries (N019–N022)

### N019: Book Card Patterns
**Purpose:** Book card component variations, interactions, states, and responsive behavior.  
**Related G-Documents (Reference):**
- guidelines/components/BlogCard.md (reference)
- guidelines/components/PortfolioCard.md (reference)
- guidelines/patterns/CardGridWithFilters.md (reference)
- guidelines/sections/ThreeColumnPortfolioSection.md (reference)

**Destination Path:** `guidelines/patterns-book-cards.md`  
**Pointer Strategy:** Reference (keep existing component docs; this is a pattern guide).  
**Status:** Create new

---

### N020: Hero Section Patterns
**Purpose:** Hero section layouts, background patterns, text treatment, and responsive variants.  
**Related G-Documents (Reference):**
- guidelines/components/HeroSection.md (reference)
- guidelines/sections/HeroSection.md (reference)

**Destination Path:** `guidelines/patterns-hero.md`  
**Pointer Strategy:** Reference (keep existing docs; this is a pattern guide).  
**Status:** Create new

---

### N021: Brand Proposition Patterns
**Purpose:** Proposition section layouts, visual hierarchy, and messaging integration.  
**Related G-Documents (Reference):**
- guidelines/sections/WhySection.md (reference)

**Destination Path:** `guidelines/patterns-proposition.md`  
**Pointer Strategy:** Reference.  
**Status:** Create new

---

### N022: Journal & Blog Preview Patterns
**Purpose:** Journal entry patterns, preview cards, filtering UI, and list layouts.  
**Related G-Documents (Reference):**
- guidelines/components/SectionCard.md (reference)
- guidelines/sections/BlogPreviewSection.md (reference)
- guidelines/sections/FeaturedSection.md (reference)
- guidelines/overview-blog-filtering.md (reference)

**Destination Path:** `guidelines/patterns-journal-preview.md`  
**Pointer Strategy:** Reference.  
**Status:** Create new

---

## Page & Template Guides (N023–N025)

### N023: README & Getting Started
**Purpose:** First-time contributor guide, quick-start navigation, and documentation overview.  
**Related G-Documents (Consolidate/Update):**
- guidelines/README.md (existing; update or consolidate)
- guidelines/Guidelines.md (existing overview; integrate or archive)

**Destination Path:** `guidelines/getting-started.md`  
**Pointer Strategy:** Type 1 (Relocation) – old README.md becomes pointer if consolidated.  
**Status:** Update/consolidate existing

---

### N024: Book Homepage Layout Guide
**Purpose:** Homepage layout, section structure, hero placement, and component integration.  
**Related G-Documents (Reference):**
- guidelines/templates/HomePage.md (reference)
- guidelines/sections/HeroSection.md (referenced from N020)

**Destination Path:** `guidelines/homepage-layout.md`  
**Pointer Strategy:** Reference (keep existing template guide).  
**Status:** Create new

---

### N025: Sitemap & Navigation Structure
**Purpose:** Site structure, navigation hierarchy, routing, and wayfinding.  
**Related G-Documents (Consolidate):**
- guidelines/SITEMAP.md (content, update)
- guidelines/sitemap-routes.md (reference, update)
- guidelines/pages/sitemap-page.md (reference)

**Destination Path:** `guidelines/sitemap-navigation.md`  
**Pointer Strategy:** Type 2 (Consolidation) – sitemap-*.md files become pointers.  
**Status:** Create/consolidate

---

## Reports & Archived Guidance (N026–N029)

### N026: Accessibility Audit Report
**Purpose:** Accessibility audit findings, remediation checklist, and compliance tracking (archive of Feb 2025 report).  
**Related G-Documents (Archive):**
- guidelines/accessibility-report-feb-2025.md (archive)

**Destination Path:** `guidelines/_archive/accessibility-report-feb-2025.md`  
**Pointer Strategy:** Type 3 (Archival) – comment pointer in archive noting consolidation into N002.  
**Status:** Archive existing; create pointer in archive comment

---

### N027: Performance Audit Report
**Purpose:** Performance audit findings, optimization opportunities, and bottleneck analysis (archive of report).  
**Related G-Documents (Archive):**
- guidelines/performance-optimization-report.md (archive)

**Destination Path:** `guidelines/_archive/performance-report.md`  
**Pointer Strategy:** Type 3 (Archival) – comment pointer noting consolidation into N017.  
**Status:** Archive existing; create pointer

---

### N028: Dark Mode Implementation Report
**Purpose:** Dark mode implementation findings, design decisions, and lessons learned (archive of report).  
**Related G-Documents (Archive):**
- guidelines/dark-mode-lessons-learned.md (archive)
- guidelines/nova-news-dark-mode.md (archive; out-of-scope per D8 if Nova News unrelated)

**Destination Path:** `guidelines/_archive/dark-mode-report.md`  
**Pointer Strategy:** Type 3 (Archival).  
**Status:** Archive existing; create pointer

---

### N029: Migration & Archive Index
**Purpose:** Historical guide to archived/deprecated documents, migration notes, and version history.  
**Related G-Documents (Archive/Reference):**
- guidelines/wordpress-migration-guide.md (archive per D8 – WordPress not in use)
- guidelines/wordpress-block-patterns.md (archive per D8)
- guidelines/wordpress-preset-system.md (archive per D8)

**Destination Path:** `guidelines/_archive/ARCHIVE-INDEX.md`  
**Pointer Strategy:** N/A (archive index document).  
**Status:** Create index for archived documents

---

## Documents Out of Phase 2 Scope (Per D8)

These 4 N-documents are deferred to Phase 3 per D8 decision (WordPress not in active use):

- N030: WordPress Block Patterns & Integration
- N031: WordPress Migration & Setup Guide
- N032: PWA Implementation & Service Worker
- N033: Portfolio Showcase Patterns

---

## G-Documents Without N-Consolidation (Remain Standalone)

These guidelines remain active and unchanged (no consolidation into N-documents):

### Component Guidelines (Keep Standalone)
- guidelines/components/*.md (30 component-specific guides)
- guidelines/blocks/*.md (block-specific guides)
- guidelines/mobile/*.md (7 mobile guidelines)
- guidelines/parts/*.md (3 template parts)
- guidelines/sections/*.md (6 section patterns)
- guidelines/icons/*.md (2 icon set guides)
- guidelines/templates/*.md (template guides)
- guidelines/overview-*.md (4 overview guides)
- guidelines/troubleshooting/*.md (3 troubleshooting guides)

### Rationale
These component/template/override guides are highly specific and benefit from standalone documentation. N-documents reference them or they appear in component catalogs (N005), but are not consolidated.

---

## Pointer Strategy Summary

| Operation | Count | Details |
|-----------|-------|---------|
| Type 1 (Relocation) | ~8 | Old paths → new N-document location |
| Type 2 (Consolidation) | ~12 | Multiple G-docs → single N-document destination |
| Type 3 (Archival) | ~4 | Deprecated/out-of-scope → `guidelines/_archive/` |
| Reference (Keep) | ~92 | Standalone or indexed in N-documents |
| **Total** | **116** | All G-documents accounted for |

---

## Implementation Sequence

1. **Phase 2C (T028–T032):** Create N-documents N001–N029 using this manifest as guide
2. **Phase 2B (T024–T027):** Edit G-documents to add N-document pointers per this mapping
3. **Phase 2D (T033–T034):** Create Type 1/2/3 pointers per above strategy
4. **Phase 3 (T041–T043):** Verify consolidation manifest completeness; document any exceptions

---

## Next Steps

- [ ] Review mapping against existing G-document inventory
- [ ] Confirm N-document names with design authority (Ash Shaw per D3)
- [ ] Validate that all 116 G-documents are accounted for
- [ ] Identify any G-documents requiring special handling or approved exceptions
- [ ] Begin N-document creation (Phase 2C)

---

*Generated: 2026-10-25*  
*Authority: D4 decision (requirements.md § D4)*  
*Branch: docs/spec-003-planning-reconciliation*
