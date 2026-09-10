# Comprehensive Hero Architecture & Dev Tools System - Master Audit Plan

**Date:** March 7, 2026  
**Status:** Planning Phase  
**Scope:** Site-wide hero standardization + Dev tools completion

---

## 🎯 Objectives

### 1. **Standardize All Hero Sections Site-Wide**
- Create universal Hero component powered by data files
- Support multiple layout patterns (centered, left-aligned, two-column, full-width)
- Optional elements: icon badge/chip, title, subtitle, button 1, button 2, scroll arrow
- Interchangeable layouts compatible with same data structure

### 2. **Complete Dev Tools Hero & Stats System**
- Implement left-aligned hero with WebGL 3D graphics (per `/prompts/dev-tools-hero-stats-system.md`)
- Add icon badges to all dev tools pages
- Implement stats bars below hero sections
- Automated metric gathering system

### 3. **Modularize Shared Components (WordPress-Style Template Parts)**
- Header component with pattern variants (default, dev-tools, editorial, minimal)
- Breadcrumbs component with pattern variants
- Footer component with pattern variants
- Mobile menu with pattern variants
- Hero component with layout variants

### 4. **Create Standardized Data Schema**
- Unified data structure for all components
- Type-safe interfaces for component props
- Single source of truth per component type

### 5. **Light/Dark Mode for Dev Tools**
- Dev tools header light/dark styles
- Dev tools footer light/dark styles
- Dev tools breadcrumbs light/dark styles
- Dev tools mobile menu light/dark styles

### 6. **Fix Current Issues**
- Dev tools routing broken (404 errors)
- Remove dev-tools from sitemap
- Missing icon badges on dev tools pages
- Missing stats sections on dev tools pages

---

## 📊 Audit Tasks

### Task 1: Audit All Current Hero Implementations ✅ CRITICAL

**Goal:** Document every hero section across the entire site

**Files to Audit:**
```
/components/pages/*.tsx (46 main pages)
/components/pages/about/*.tsx (21 hidden about pages)
/components/pages/blog/*.tsx (blog pages)
/components/pages/portfolio/*.tsx (portfolio pages)
/components/pages/podcasts/*.tsx (podcast pages)
/components/pages/videos/*.tsx (video pages)
/components/pages/dev-tools/*.tsx (46 dev tools pages)
/components/pages/ebook/*.tsx (ebook pages)
```

**Data to Extract:**
- [ ] Hero HTML structure (BEM classes, element hierarchy)
- [ ] Content elements (badge, icon, title, subtitle, buttons, scroll arrow)
- [ ] Layout pattern (centered, left-aligned, two-column, full-width, asymmetric)
- [ ] Background treatment (solid, gradient, image, video)
- [ ] Special features (breadcrumbs, tabs, filters, search)
- [ ] Typography scale (H1, H2, p font sizes)
- [ ] Spacing patterns (padding, margin, gaps)
- [ ] Responsive behavior (mobile, tablet, desktop)
- [ ] Data source (hardcoded vs imported from data files)

**Output:** `/reports/comprehensive-hero-architecture/hero-audit-all-pages.md`

**Deliverables:**
1. Categorized list of all hero implementations
2. Pattern frequency analysis (which layouts are most common)
3. Edge cases and unique requirements
4. Common vs unique elements
5. Data structure recommendations

---

### Task 2: Audit Header Component Implementations

**Goal:** Document all header variants and their data sources

**Files to Audit:**
```
/components/common/Header.tsx (main site header)
/components/dev-tools/DevToolsHeader.tsx (dev tools header)
```

**Data to Extract:**
- [ ] Component structure (logo, nav, search, burger menu)
- [ ] Props interface
- [ ] Data sources (navigation links, branding)
- [ ] State management (menu open/close, search query)
- [ ] Responsive behavior
- [ ] Light/dark mode support
- [ ] Accessibility features (keyboard nav, ARIA labels)

**Output:** `/reports/comprehensive-hero-architecture/header-audit.md`

---

### Task 3: Audit Breadcrumbs Component Implementations

**Goal:** Document breadcrumb patterns and data sources

**Files to Audit:**
```
/components/ui/Breadcrumbs.tsx (universal breadcrumbs)
/components/common/AutoBreadcrumbs.tsx (auto-generated)
```

**Data to Extract:**
- [ ] Component structure
- [ ] Props interface
- [ ] Data format (items array)
- [ ] Variant support (main-site vs dev-tools)
- [ ] Schema.org JSON-LD implementation
- [ ] Responsive behavior
- [ ] Light/dark mode support

**Output:** `/reports/comprehensive-hero-architecture/breadcrumbs-audit.md`

---

### Task 4: Audit Footer Component Implementations

**Goal:** Document all footer variants and their data sources

**Files to Audit:**
```
/components/common/Footer.tsx (main site footer)
/components/dev-tools/DevToolsFooter.tsx (dev tools footer)
```

**Data to Extract:**
- [ ] Component structure (columns, links, metadata)
- [ ] Props interface
- [ ] Data sources (navigation data, social links)
- [ ] Light/dark mode support
- [ ] Responsive behavior
- [ ] Accessibility features

**Output:** `/reports/comprehensive-hero-architecture/footer-audit.md`

---

### Task 5: Audit Mobile Menu Implementations

**Goal:** Document mobile menu patterns

**Files to Audit:**
```
/components/common/MobileMenu.tsx (main site mobile menu)
/components/dev-tools/DevToolsMenu.tsx (dev tools mobile menu)
```

**Data to Extract:**
- [ ] Component structure
- [ ] Props interface
- [ ] Data sources
- [ ] Animation patterns
- [ ] Focus trap implementation
- [ ] Keyboard navigation
- [ ] Light/dark mode support

**Output:** `/reports/comprehensive-hero-architecture/mobile-menu-audit.md`

---

### Task 6: Audit All Data Files

**Goal:** Document current data structure patterns

**Files to Audit:**
```
/data/mock/pages/*.ts (page content data)
/data/mock/ui/*.ts (UI component data)
/data/mock/portfolio/*.ts (portfolio data)
/data/mock/blog/*.ts (blog data)
```

**Data to Extract:**
- [ ] Data structure patterns (common interfaces)
- [ ] Naming conventions
- [ ] Type definitions
- [ ] Data relationships (cross-references)
- [ ] Gaps (missing data sources)

**Output:** `/reports/comprehensive-hero-architecture/data-audit.md`

---

## 🏗️ Design Phase

### Task 7: Design Universal Hero Component

**Based on audit findings, design:**
- [ ] Unified HeroConfig interface (works for all pages)
- [ ] Hero layout patterns enum (centered, left-aligned, two-column, etc.)
- [ ] Optional element support (badge, icon, buttons, scroll arrow)
- [ ] Background variant support (solid, gradient, image, video)
- [ ] Data-driven configuration file structure

**Output:** `/docs/hero-component-specification.md`

---

### Task 8: Design Template Parts System

**Based on WordPress template parts pattern:**
- [ ] Header pattern variants (default, dev-tools, editorial, minimal)
- [ ] Breadcrumbs pattern variants (main-site, dev-tools, editorial)
- [ ] Footer pattern variants (default, dev-tools, minimal)
- [ ] Mobile menu pattern variants
- [ ] Pattern selection strategy (route-based, data-driven, or component prop)

**Output:** `/docs/template-parts-specification.md`

---

### Task 9: Design Data Schema

**Create comprehensive schema for:**
- [ ] Hero configurations (all layout patterns)
- [ ] Header configurations (all variants)
- [ ] Breadcrumbs configurations
- [ ] Footer configurations
- [ ] Navigation data structures
- [ ] Page metadata structures

**Output:** `/docs/data-schema-specification.md`

---

## 🛠️ Implementation Phase

### Task 10: Implement Universal Hero Component

**Files to Create:**
- `/components/ui/Hero.tsx` (universal hero component)
- `/styles/blocks/hero.css` (base hero styles)
- `/styles/blocks/hero-layouts.css` (layout pattern variants)
- `/data/mock/heroes/site-heroes.ts` (all main site heroes)
- `/data/mock/heroes/dev-tools-heroes.ts` (all dev tools heroes)

**Implementation Steps:**
1. Create base Hero component with layout pattern prop
2. Create HeroConfig interface and data files
3. Implement layout patterns (centered, left-aligned, two-column, full-width)
4. Add optional element support (badge, icon, buttons, scroll arrow)
5. Add background variant support
6. Add responsive behavior
7. Add light/dark mode support
8. Add reduced motion support
9. Migrate 1 page as proof-of-concept
10. Iterate based on feedback
11. Migrate remaining pages

---

### Task 11: Implement Dev Tools Hero & Stats System

**Per `/prompts/dev-tools-hero-stats-system.md`:**

**Files to Create:**
- `/components/dev-tools/DevToolsHero.tsx` (left-aligned hero + WebGL)
- `/components/dev-tools/StatsBar.tsx` (universal stats bar)
- `/components/dev-tools/WebGLHeroGraphic.tsx` (WebGL 3D graphics)
- `/data/mock/ui/dev-tools-heroes.ts` (hero configs)
- `/data/mock/ui/dev-tools-stats.ts` (stats configs)
- `/utils/statsGathering.ts` (automated metric gathering)
- `/styles/blocks/dev-tools-hero.css` (hero styles)
- `/styles/blocks/stats-bar.css` (stats bar styles)

**Implementation Steps:**
1. Create DevToolsHero component with left-aligned layout
2. Create WebGL 3D graphic system (5 animation presets)
3. Create hero configuration data file (46 pages)
4. Create StatsBar component
5. Create stats configuration data file (46 pages)
6. Create automated stats gathering functions
7. Add icon badges to all dev tools pages
8. Migrate all 46 dev tools pages to new system

---

### Task 12: Implement Template Parts System

**Files to Create:**
- `/components/template-parts/Header.tsx` (universal header with patterns)
- `/components/template-parts/Breadcrumbs.tsx` (universal breadcrumbs with patterns)
- `/components/template-parts/Footer.tsx` (universal footer with patterns)
- `/components/template-parts/MobileMenu.tsx` (universal mobile menu with patterns)
- `/data/mock/ui/template-parts-config.ts` (pattern configurations)

**Implementation Steps:**
1. Create template parts folder structure
2. Migrate Header component with pattern variants
3. Migrate Breadcrumbs component with pattern variants
4. Migrate Footer component with pattern variants
5. Migrate MobileMenu component with pattern variants
6. Update RootLayout to use template parts
7. Update DevToolsLayout to use template parts
8. Add pattern selection logic (route-based or data-driven)

---

### Task 13: Add Light/Dark Mode to Dev Tools Components

**Files to Update:**
- `/styles/blocks/dev-tools-header.css`
- `/styles/blocks/dev-tools-footer.css`
- `/styles/blocks/dev-tools-breadcrumbs.css`
- `/styles/blocks/dev-tools-menu.css`

**Implementation Steps:**
1. Add light mode color overrides for header
2. Add light mode color overrides for footer
3. Add light mode color overrides for breadcrumbs
4. Add light mode color overrides for mobile menu
5. Test light/dark mode switching
6. Verify WCAG contrast ratios

---

### Task 14: Fix Current Issues

**Issues to Fix:**
1. ✅ Dev tools routing (already fixed earlier)
2. [ ] Remove dev-tools from sitemap
3. [ ] Add icon badges to all dev tools pages
4. [ ] Add stats sections to all dev tools pages
5. [ ] Verify all dev tools links work

---

## 📈 Success Metrics

### Hero Component System
- [ ] Single Hero component powers 100% of pages
- [ ] Zero hardcoded hero content (all from data files)
- [ ] 4+ layout patterns supported
- [ ] Optional elements work correctly
- [ ] Responsive on all breakpoints
- [ ] Light/dark mode support
- [ ] Reduced motion support

### Dev Tools System
- [ ] All 46 dev tools pages have left-aligned hero
- [ ] All 46 pages have icon badges
- [ ] All 46 pages have stats bars
- [ ] WebGL graphics render on all pages
- [ ] Automated stats gathering works
- [ ] Light/dark mode support

### Template Parts System
- [ ] Header component supports 4 patterns
- [ ] Breadcrumbs component supports 3 patterns
- [ ] Footer component supports 3 patterns
- [ ] Mobile menu component supports patterns
- [ ] Pattern selection works correctly
- [ ] All patterns have light/dark mode

### Data Schema
- [ ] Unified data structure for heroes
- [ ] Unified data structure for headers
- [ ] Unified data structure for breadcrumbs
- [ ] Unified data structure for footers
- [ ] Type-safe interfaces
- [ ] Comprehensive documentation

---

## 🗓️ Timeline Estimate

**Total Effort:** 4-6 weeks

### Week 1: Audit Phase
- Days 1-2: Hero audit (all pages)
- Day 3: Header, breadcrumbs, footer audit
- Day 4: Mobile menu, data files audit
- Day 5: Consolidate findings, write reports

### Week 2: Design Phase
- Days 1-2: Design universal hero component
- Day 3: Design template parts system
- Days 4-5: Design data schema

### Week 3-4: Implementation Phase 1 (Hero System)
- Week 3: Implement universal hero component
- Week 4: Migrate all pages to new hero system

### Week 5: Implementation Phase 2 (Dev Tools)
- Days 1-3: Implement dev tools hero & stats system
- Days 4-5: Migrate all 46 dev tools pages

### Week 6: Implementation Phase 3 (Template Parts)
- Days 1-3: Implement template parts system
- Days 4-5: Final polish, testing, QA

---

## 🚀 Next Steps

**Immediate Actions:**
1. **Start Task 1** — Audit all hero implementations
2. **Run dev tools routing test** — Verify `/dev-tools` loads
3. **Fix light/dark mode** — Add missing styles to dev tools components
4. **Remove dev-tools from sitemap** — Per user request

**Priority Order:**
1. Fix blocking issues (routing, light/dark mode)
2. Complete audit phase (Tasks 1-6)
3. Design phase (Tasks 7-9)
4. Implementation phase (Tasks 10-14)

---

**Ready to begin comprehensive hero architecture standardization!** 🚀
