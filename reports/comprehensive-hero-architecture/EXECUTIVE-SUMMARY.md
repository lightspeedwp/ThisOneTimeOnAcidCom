# Hero Architecture & Dev Tools System — Executive Summary

**Date:** March 7, 2026  
**Status:** Planning Complete, Ready for Implementation  
**Estimated Effort:** 4-6 weeks

---

## 🎯 Project Overview

This is a **comprehensive redesign** of the entire site's hero and template parts architecture, plus completion of the dev tools system with WebGL graphics and automated stats.

### Core Objectives

1. **Standardize all hero sections** across 150+ pages with a universal component
2. **Complete dev tools hero & stats system** with WebGL 3D graphics
3. **Modularize shared components** (WordPress-style template parts)
4. **Create standardized data schema** for all UI components
5. **Add light/dark mode** to all dev tools components
6. **Fix current routing and display issues**

---

## 📊 Current State Analysis

### Site Scale
- **150+ total pages** across main site, blog, portfolio, videos, podcasts, events, ebook, dev tools
- **46 dev tools pages** requiring specialized hero layout with WebGL graphics
- **21 hidden about pages** with unique storytelling heroes
- **50+ blog posts** with article-style heroes
- **4 shared components** (Header, Breadcrumbs, Footer, Mobile Menu) needing modularization

### Existing Issues
1. ✅ **Dev tools routing** — FIXED (nested routes inside RootLayout)
2. ⏳ **Dev tools on sitemap** — Needs removal (lines 607-662 in SitemapPage.tsx)
3. ⏳ **Light/dark mode** — Missing from dev tools header, breadcrumbs, menu
4. ⏳ **Icon badges** — Missing from all dev tools page heroes
5. ⏳ **Stats sections** — Missing from all dev tools pages

### Documentation Complete
- ✅ `/prompts/dev-tools-hero-stats-system.md` (comprehensive implementation plan)
- ✅ `/reports/comprehensive-hero-architecture/MASTER-AUDIT-PLAN.md` (audit strategy)
- ✅ `/tasks/hero-architecture-immediate-actions.md` (task breakdown)
- ✅ `/docs/interactions-hub-specification.md` (26 animations documentation plan)
- ✅ `/reports/dev-tools-updates-summary.md` (footer spacing + interactions hub)

---

## 🏗️ Architecture Vision

### Universal Hero Component

**One component, multiple layout patterns:**

```typescript
<Hero
  config={heroConfigs.homepage}  // Data-driven
  layout="centered"              // Pattern variant
  background="gradient"          // Visual treatment
/>
```

**Supported layouts:**
- `centered` — Traditional centered hero (homepage, about)
- `left-aligned` — Content left, visual right (portfolio, blog listing)
- `two-column` — Split content (about sub-pages)
- `full-width` — Edge-to-edge (video detail, podcast detail)
- `dev-tools` — Left content + WebGL 3D graphic (dev tools only)

**Optional elements:**
- Icon badge/chip (above title)
- Title (H1)
- Subtitle/description
- Button 1 (primary CTA)
- Button 2 (secondary CTA)
- Scroll down arrow

**Data structure (same for all layouts):**
```typescript
interface HeroConfig {
  badge?: { text: string; icon?: string; color?: NeonColor };
  title: string;
  subtitle?: string;
  buttons?: {
    primary?: { label: string; href: string; icon?: string };
    secondary?: { label: string; href: string; icon?: string };
  };
  scrollArrow?: boolean;
  background?: BackgroundConfig;
  layout: HeroLayout;
}
```

---

### Dev Tools Hero System (Special Case)

**Unique requirements per `/prompts/dev-tools-hero-stats-system.md`:**

1. **Left-aligned hero content**
   - Badge with icon
   - Title with gradient option
   - Description
   - Optional buttons

2. **WebGL 3D moving graphic** (right side)
   - 5 animation presets:
     1. SVG Morph
     2. Particle System
     3. Geometric Rotation
     4. Neon Flow
     5. Grid Wave
   - Mouse interactivity
   - Reduced motion fallback

3. **Universal stats bar** (below hero)
   - 3-6 metrics per page
   - Automated gathering functions
   - Neon color accents
   - Icons from Phosphor
   - Trend indicators (up/down arrows)

**Components to create:**
- `/components/dev-tools/DevToolsHero.tsx`
- `/components/dev-tools/StatsBar.tsx`
- `/components/dev-tools/WebGLHeroGraphic.tsx`
- `/data/mock/ui/dev-tools-heroes.ts` (46 pages)
- `/data/mock/ui/dev-tools-stats.ts` (46 pages)
- `/utils/statsGathering.ts`

---

### Template Parts System (WordPress Pattern)

**Modular shared components with pattern variants:**

#### Header Component
**Patterns:**
- `default` — Main site header (logo, nav, search, theme toggle)
- `dev-tools` — Dev tools header (search, burger menu, different styling)
- `editorial` — Minimal header for long-form content (ebook chapters)
- `minimal` — Logo only (contact page, legal pages)

#### Breadcrumbs Component
**Patterns:**
- `main-site` — Gray separators, light background
- `dev-tools` — Neon cyan separators, dark background, neon pink hover
- `editorial` — Minimal, compact (ebook navigation)

#### Footer Component
**Patterns:**
- `default` — Full footer (4 columns, social links, newsletter)
- `dev-tools` — Dev tools footer (categorized tool links, stats bar)
- `minimal` — Legal footer (copyright, terms, privacy only)

#### Mobile Menu Component
**Patterns:**
- `default` — Full-screen menu (main site navigation)
- `dev-tools` — Dev tools menu (categorized tools, search)

**Pattern selection strategy:**
```typescript
// Route-based automatic selection
<Header pattern={pathname.startsWith('/dev-tools') ? 'dev-tools' : 'default'} />

// Or explicit prop
<Header pattern="editorial" />
```

---

## 📋 Implementation Phases

### Phase 1: Fix Blocking Issues (1-2 days)

**Tasks:**
1. Remove dev tools from sitemap ✅
2. Add light/dark mode to dev tools components ✅
3. Verify routing works ✅
4. Test light/dark mode switching ✅

**Files to modify:**
- `/components/pages/SitemapPage.tsx` (delete lines 607-662)
- `/styles/blocks/dev-tools-header.css` (add light mode)
- `/styles/blocks/dev-tools-breadcrumbs.css` (add light mode)
- `/styles/blocks/dev-tools-menu.css` (add light mode)

---

### Phase 2: Audit Phase (Week 1)

**Tasks:**
1. Audit all 150+ hero implementations
2. Audit header components
3. Audit breadcrumbs components
4. Audit footer components
5. Audit mobile menu components
6. Audit all data files

**Deliverables:**
- `/reports/comprehensive-hero-architecture/hero-audit-all-pages.md`
- `/reports/comprehensive-hero-architecture/header-audit.md`
- `/reports/comprehensive-hero-architecture/breadcrumbs-audit.md`
- `/reports/comprehensive-hero-architecture/footer-audit.md`
- `/reports/comprehensive-hero-architecture/mobile-menu-audit.md`
- `/reports/comprehensive-hero-architecture/data-audit.md`

---

### Phase 3: Design Phase (Week 2)

**Tasks:**
1. Design universal hero component specification
2. Design template parts system specification
3. Design comprehensive data schema

**Deliverables:**
- `/docs/hero-component-specification.md`
- `/docs/template-parts-specification.md`
- `/docs/data-schema-specification.md`

---

### Phase 4: Implementation - Hero System (Weeks 3-4)

**Tasks:**
1. Create universal Hero component
2. Create hero layout pattern variants
3. Create hero data files for all pages
4. Migrate pages to new hero system (phased rollout)

**New files:**
- `/components/ui/Hero.tsx`
- `/styles/blocks/hero.css`
- `/styles/blocks/hero-layouts.css`
- `/data/mock/heroes/site-heroes.ts`
- `/data/mock/heroes/dev-tools-heroes.ts`

---

### Phase 5: Implementation - Dev Tools Hero & Stats (Week 5)

**Tasks:**
1. Create DevToolsHero component with WebGL
2. Create WebGL graphic system (5 animation presets)
3. Create StatsBar component
4. Create hero & stats data files
5. Create automated stats gathering functions
6. Migrate all 46 dev tools pages

**New files:**
- `/components/dev-tools/DevToolsHero.tsx`
- `/components/dev-tools/StatsBar.tsx`
- `/components/dev-tools/WebGLHeroGraphic.tsx`
- `/data/mock/ui/dev-tools-heroes.ts`
- `/data/mock/ui/dev-tools-stats.ts`
- `/utils/statsGathering.ts`
- `/styles/blocks/dev-tools-hero.css`
- `/styles/blocks/stats-bar.css`

---

### Phase 6: Implementation - Template Parts (Week 6)

**Tasks:**
1. Create template parts folder structure
2. Migrate Header with pattern variants
3. Migrate Breadcrumbs with pattern variants
4. Migrate Footer with pattern variants
5. Migrate MobileMenu with pattern variants
6. Update RootLayout and DevToolsLayout
7. Add pattern selection logic

**New files:**
- `/components/template-parts/Header.tsx`
- `/components/template-parts/Breadcrumbs.tsx`
- `/components/template-parts/Footer.tsx`
- `/components/template-parts/MobileMenu.tsx`
- `/data/mock/ui/template-parts-config.ts`

---

## 🎯 Success Metrics

### Hero System
- [ ] 100% of pages use universal Hero component
- [ ] Zero hardcoded hero content (all from data files)
- [ ] 5+ layout patterns implemented and working
- [ ] All optional elements work correctly
- [ ] Responsive on all breakpoints
- [ ] Light/dark mode support
- [ ] Reduced motion support

### Dev Tools System
- [ ] All 46 pages have left-aligned hero
- [ ] All 46 pages have icon badges
- [ ] All 46 pages have stats bars
- [ ] WebGL graphics render smoothly (60fps)
- [ ] Automated stats gathering functional
- [ ] Light/dark mode support

### Template Parts System
- [ ] Header supports 4 patterns
- [ ] Breadcrumbs supports 3 patterns
- [ ] Footer supports 3 patterns
- [ ] Mobile menu supports 2 patterns
- [ ] Pattern selection works automatically
- [ ] All patterns have light/dark mode

### Data Schema
- [ ] Unified HeroConfig interface
- [ ] Unified HeaderConfig interface
- [ ] Unified BreadcrumbsConfig interface
- [ ] Unified FooterConfig interface
- [ ] Type-safe, fully documented

---

## 💡 Key Design Decisions

### 1. Why One Hero Component vs Multiple?

**Decision:** Single component with layout patterns

**Rationale:**
- Easier maintenance (one place to update)
- Consistent data structure across all pages
- DRY principle (don't repeat code)
- Simpler mental model for developers
- Pattern switching requires only prop change

**Trade-offs:**
- Slightly more complex component logic
- Need robust pattern variant system
- Edge cases require careful handling

---

### 2. Why WordPress-Style Template Parts?

**Decision:** Modular components with pattern variants

**Rationale:**
- WordPress paradigm is familiar and proven
- Clear separation of concerns
- Reusable across different page types
- Easy to extend (add new patterns)
- Aligns with BEM CSS architecture

**Benefits:**
- `/components/template-parts/Header.tsx` + pattern prop = infinite flexibility
- Same component, different visual treatment
- No code duplication

---

### 3. Why Data-Driven Configuration?

**Decision:** All hero content in data files

**Rationale:**
- Single source of truth
- Easy content updates (no code changes)
- Type-safe interfaces
- Enables CMS integration later
- Simplifies testing and QA

**Structure:**
```
/data/mock/heroes/
├── site-heroes.ts        (main site pages)
├── blog-heroes.ts        (blog posts)
├── portfolio-heroes.ts   (portfolio entries)
├── dev-tools-heroes.ts   (dev tools pages)
└── ebook-heroes.ts       (ebook chapters)
```

---

### 4. Why WebGL for Dev Tools Graphics?

**Decision:** WebGL 3D animations (not just CSS/SVG)

**Rationale:**
- Dev tools deserve premium treatment
- Showcase technical capability
- Differentiates from main site
- Modern, impressive visuals
- GPU-accelerated performance

**Fallbacks:**
- Reduced motion: static SVG with subtle glow
- Old browsers: canvas 2D fallback
- Mobile: scaled-down version

---

## 🚀 Quick Start Guide

### For Immediate Fixes (Today)

**Run these tasks:**
1. Remove dev tools from sitemap
2. Add light mode CSS to dev tools components
3. Test `/dev-tools` routing
4. Verify light/dark mode

**Files to modify:**
- `/components/pages/SitemapPage.tsx`
- `/styles/blocks/dev-tools-header.css`
- `/styles/blocks/dev-tools-breadcrumbs.css`
- `/styles/blocks/dev-tools-menu.css`

**See:** `/tasks/hero-architecture-immediate-actions.md`

---

### For Hero Audit (This Week)

**Start with:**
1. Read `/prompts/dev-tools-hero-stats-system.md` (full implementation plan)
2. Read `/reports/comprehensive-hero-architecture/MASTER-AUDIT-PLAN.md` (audit strategy)
3. Begin Task 1: Audit all hero implementations

**Output:** `/reports/comprehensive-hero-architecture/hero-audit-all-pages.md`

---

### For Full Implementation (Weeks 2-6)

**Follow phases:**
1. Week 1: Complete audits
2. Week 2: Write specifications
3. Weeks 3-4: Implement hero system
4. Week 5: Implement dev tools system
5. Week 6: Implement template parts

**Track progress:** `/tasks/hero-architecture-immediate-actions.md`

---

## 📚 Documentation Map

### Planning & Strategy
- **This file** — Executive summary
- `/reports/comprehensive-hero-architecture/MASTER-AUDIT-PLAN.md` — Detailed audit plan
- `/tasks/hero-architecture-immediate-actions.md` — Task breakdown

### Implementation Guides
- `/prompts/dev-tools-hero-stats-system.md` — Dev tools hero & stats (v2.0.0, comprehensive)
- `/docs/interactions-hub-specification.md` — 26 animations documentation plan

### Completed Work
- `/reports/dev-tools-updates-summary.md` — Footer spacing + interactions hub
- `/reports/comprehensive-hero-architecture/routing-fix-FINAL.md` — Dev tools routing fix

---

## 🎉 Expected Impact

### Developer Experience
- **80% faster** hero implementation (no custom code per page)
- **Zero hero bugs** (single component, tested once)
- **Consistent patterns** across all pages
- **Easy content updates** (data files only)

### Design System
- **Single source of truth** for all heroes
- **4+ layout patterns** for different content types
- **100% type-safe** interfaces
- **WordPress-aligned** architecture

### User Experience
- **Consistent visual language** across site
- **Premium WebGL graphics** in dev tools
- **Smooth animations** everywhere
- **Perfect responsive behavior**

---

**This is the most comprehensive hero architecture redesign ever attempted for a portfolio site!** 🚀

Ready to begin? Start with immediate fixes in `/tasks/hero-architecture-immediate-actions.md` ✅
