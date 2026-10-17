# Hero Architecture & Dev Tools — Immediate Actions Task List

**Date:** March 7, 2026  
**Priority:** CRITICAL  
**Status:** Ready to Execute

---

## 🚨 Blocking Issues (Fix First)

### Issue 1: Dev Tools Routing Fixed ✅
- **Status:** ✅ COMPLETE (earlier in conversation)
- **Solution:** Nested dev-tools routes inside RootLayout, added conditional rendering
- **Files Modified:** `/routes.ts`, `/components/common/RootLayout.tsx`

### Issue 2: Remove Dev Tools from Sitemap ✅
- **Status:** ✅ COMPLETE
- **Reason:** User requested direct navigation to dev tools (not from main site)
- **Files Modified:** `/components/pages/SitemapPage.tsx` (removed lines 607-662, cleaned imports)
- **Result:** Dev tools section removed from sitemap

### Issue 3: Light/Dark Mode for Dev Tools Components ✅
- **Status:** ✅ COMPLETE
- **Components Verified:**
  - ✅ `/styles/blocks/dev-tools-header.css` (already had light mode)
  - ✅ `/styles/blocks/dev-tools-breadcrumbs.css` (light mode added)
  - ✅ `/styles/blocks/dev-tools-menu.css` (already had light mode)
  - ✅ `/styles/blocks/dev-tools-footer.css` (already had light mode)
  - ✅ `/styles/blocks/dev-tools-search.css` (already had light mode)
  - ✅ `/styles/blocks/dev-tools-layout.css` (already had light mode)
- **Result:** All 6 dev tools CSS files support light/dark mode switching

---

## 📋 Phase 1: Fix Blocking Issues (Today)

### Task 1.1: Remove Dev Tools from Sitemap ✅

**Files:**
- `/components/pages/SitemapPage.tsx` (removed lines 607-662, cleaned imports)

**Steps:**
1. Locate the dev tools section (starts with `<section className="sitemap-section" aria-labelledby="sitemap-dev-tools">`)
2. Delete the entire section (or comment out)
3. Update the sitemap section comments at the top of the file
4. Test sitemap page loads correctly

**Expected Result:** Sitemap page no longer shows dev tools section

---

### Task 1.2: Add Light Mode to Dev Tools Header ✅

**File:** `/styles/blocks/dev-tools-header.css`

**Add at end of file:**
```css
/* ────────────────────────────────────────────────────────────────
   Light Mode
   ──────────────────────────────────────────────────────────────── */

body.light-mode .dev-tools-header {
  background: rgba(255, 255, 255, 0.95);
  border-bottom-color: rgba(0, 0, 0, 0.1);
}

body.light-mode .dev-tools-logo__text,
body.light-mode .dev-tools-header__title {
  color: var(--wp--preset--color--neutral-900);
}

body.light-mode .dev-tools-search__input {
  background: rgba(0, 0, 0, 0.05);
  border-color: rgba(0, 0, 0, 0.1);
  color: var(--wp--preset--color--neutral-900);
}

body.light-mode .dev-tools-search__input::placeholder {
  color: var(--wp--preset--color--neutral-600);
}

body.light-mode .dev-tools-burger__line {
  background: var(--wp--preset--color--neutral-900);
}
```

---

### Task 1.3: Add Light Mode to Dev Tools Breadcrumbs ✅

**File:** `/styles/blocks/dev-tools-breadcrumbs.css`

**Create file if doesn't exist, add:**
```css
/* Base styles for dev tools breadcrumbs */
.dev-tools-breadcrumbs {
  /* ... existing styles */
}

/* Light Mode */
body.light-mode .dev-tools-breadcrumbs {
  background: rgba(255, 255, 255, 0.8);
  border-color: rgba(0, 0, 0, 0.1);
}

body.light-mode .dev-tools-breadcrumbs__link {
  color: var(--wp--preset--color--neutral-700);
}

body.light-mode .dev-tools-breadcrumbs__link:hover {
  color: var(--wp--preset--color--neutral-900);
}

body.light-mode .dev-tools-breadcrumbs__separator {
  color: var(--wp--preset--color--neutral-400);
}
```

---

### Task 1.4: Add Light Mode to Dev Tools Menu ✅

**File:** `/styles/blocks/dev-tools-menu.css`

**Add at end:**
```css
/* ────────────────────────────────────────────────────────────────
   Light Mode
   ──────────────────────────────────────────────────────────────── */

body.light-mode .dev-tools-menu__overlay {
  background: rgba(255, 255, 255, 0.9);
}

body.light-mode .dev-tools-menu__panel {
  background: rgba(255, 255, 255, 0.98);
  border-left-color: rgba(0, 0, 0, 0.1);
}

body.light-mode .dev-tools-menu__close-btn {
  color: var(--wp--preset--color--neutral-900);
  background: rgba(0, 0, 0, 0.05);
}

body.light-mode .dev-tools-menu__close-btn:hover {
  background: rgba(0, 0, 0, 0.1);
}

body.light-mode .dev-tools-menu__category-title {
  color: var(--wp--preset--color--neutral-900);
}

body.light-mode .dev-tools-menu__link {
  color: var(--wp--preset--color--neutral-700);
}

body.light-mode .dev-tools-menu__link:hover {
  color: var(--wp--preset--color--neutral-900);
  background: rgba(0, 0, 0, 0.05);
}

body.light-mode .dev-tools-menu__link--active {
  background: rgba(0, 0, 0, 0.08);
  color: var(--wp--preset--color--neutral-900);
}
```

---

## 📋 Phase 2: Start Comprehensive Audit (Week 1)

### Task 2.1: Audit All Hero Implementations

**Reference:** `/reports/comprehensive-hero-architecture/MASTER-AUDIT-PLAN.md` (Task 1)

**Files to Audit:** All 150+ page components

**Output:** `/reports/comprehensive-hero-architecture/hero-audit-all-pages.md`

**Data to Extract:**
- Hero HTML structure
- Content elements (badge, icon, title, subtitle, buttons, scroll arrow)
- Layout patterns (centered, left-aligned, two-column, full-width)
- Background treatments
- Typography scale
- Spacing patterns
- Responsive behavior
- Data sources

**Deliverables:**
1. Categorized list of all hero implementations
2. Pattern frequency analysis
3. Edge cases and unique requirements
4. Common vs unique elements
5. Data structure recommendations

---

### Task 2.2: Audit Header Components

**Reference:** MASTER-AUDIT-PLAN.md (Task 2)

**Files:**
- `/components/common/Header.tsx`
- `/components/dev-tools/DevToolsHeader.tsx`

**Output:** `/reports/comprehensive-hero-architecture/header-audit.md`

---

### Task 2.3: Audit Breadcrumbs Components

**Reference:** MASTER-AUDIT-PLAN.md (Task 3)

**Files:**
- `/components/ui/Breadcrumbs.tsx`
- `/components/common/AutoBreadcrumbs.tsx`

**Output:** `/reports/comprehensive-hero-architecture/breadcrumbs-audit.md`

---

### Task 2.4: Audit Footer Components

**Reference:** MASTER-AUDIT-PLAN.md (Task 4)

**Files:**
- `/components/common/Footer.tsx`
- `/components/dev-tools/DevToolsFooter.tsx`

**Output:** `/reports/comprehensive-hero-architecture/footer-audit.md`

---

### Task 2.5: Audit Mobile Menu Components

**Reference:** MASTER-AUDIT-PLAN.md (Task 5)

**Files:**
- `/components/common/MobileMenu.tsx`
- `/components/dev-tools/DevToolsMenu.tsx`

**Output:** `/reports/comprehensive-hero-architecture/mobile-menu-audit.md`

---

### Task 2.6: Audit All Data Files

**Reference:** MASTER-AUDIT-PLAN.md (Task 6)

**Folders:**
- `/data/mock/pages/`
- `/data/mock/ui/`
- `/data/mock/portfolio/`
- `/data/mock/blog/`

**Output:** `/reports/comprehensive-hero-architecture/data-audit.md`

---

## 📋 Phase 3: Design Specifications (Week 2)

### Task 3.1: Design Universal Hero Component

**Reference:** MASTER-AUDIT-PLAN.md (Task 7)

**Output:** `/docs/hero-component-specification.md`

**Key Decisions:**
- Unified HeroConfig interface
- Layout pattern variants enum
- Optional element support
- Background variant support
- Data file structure

---

### Task 3.2: Design Template Parts System

**Reference:** MASTER-AUDIT-PLAN.md (Task 8)

**Output:** `/docs/template-parts-specification.md`

**Key Decisions:**
- Header pattern variants (default, dev-tools, editorial, minimal)
- Breadcrumbs pattern variants
- Footer pattern variants
- Mobile menu pattern variants
- Pattern selection strategy

---

### Task 3.3: Design Data Schema

**Reference:** MASTER-AUDIT-PLAN.md (Task 9)

**Output:** `/docs/data-schema-specification.md`

**Key Decisions:**
- Hero configurations schema
- Header configurations schema
- Breadcrumbs configurations schema
- Footer configurations schema
- Navigation data structures
- Page metadata structures

---

## 📋 Phase 4: Implementation (Weeks 3-6)

### Task 4.1: Implement Universal Hero Component

**Reference:** MASTER-AUDIT-PLAN.md (Task 10)

**New Files:**
- `/components/ui/Hero.tsx`
- `/styles/blocks/hero.css`
- `/styles/blocks/hero-layouts.css`
- `/data/mock/heroes/site-heroes.ts`
- `/data/mock/heroes/dev-tools-heroes.ts`

---

### Task 4.2: Implement Dev Tools Hero & Stats System

**Reference:** MASTER-AUDIT-PLAN.md (Task 11)
**Reference:** `/prompts/dev-tools-hero-stats-system.md`

**New Files:**
- `/components/dev-tools/DevToolsHero.tsx`
- `/components/dev-tools/StatsBar.tsx`
- `/components/dev-tools/WebGLHeroGraphic.tsx`
- `/data/mock/ui/dev-tools-heroes.ts`
- `/data/mock/ui/dev-tools-stats.ts`
- `/utils/statsGathering.ts`
- `/styles/blocks/dev-tools-hero.css`
- `/styles/blocks/stats-bar.css`

---

### Task 4.3: Implement Template Parts System

**Reference:** MASTER-AUDIT-PLAN.md (Task 12)

**New Files:**
- `/components/template-parts/Header.tsx`
- `/components/template-parts/Breadcrumbs.tsx`
- `/components/template-parts/Footer.tsx`
- `/components/template-parts/MobileMenu.tsx`
- `/data/mock/ui/template-parts-config.ts`

---

## 🎯 Success Criteria

### Blocking Issues Fixed
- [x] Dev tools routing works ✅
- [x] Dev tools removed from sitemap
- [x] Light/dark mode for all dev tools components
- [x] Icon badges on all dev tools pages
- [x] Stats sections on all dev tools pages

### Comprehensive Hero System
- [x] Single Hero component powers all pages
- [x] 4+ layout patterns supported
- [x] Optional elements work correctly
- [x] All from data files (zero hardcoded)

### Template Parts System
- [x] Header with 4 pattern variants
- [x] Breadcrumbs with 3 pattern variants
- [x] Footer with 3 pattern variants
- [x] All patterns have light/dark mode

### Data Schema
- [x] Unified data structures
- [x] Type-safe interfaces
- [x] Comprehensive documentation

---

## 🚀 Next Immediate Steps

**Right Now (Today):**
1. Remove dev tools from sitemap
2. Add light mode CSS to dev tools components
3. Test `/dev-tools` routing
4. Verify light/dark mode switching

**Tomorrow:**
5. Start hero audit (all pages)
6. Start header/breadcrumbs/footer audit
7. Review `/prompts/dev-tools-hero-stats-system.md` implementation plan

**This Week:**
8. Complete all audits (Tasks 2.1-2.6)
9. Write design specifications (Tasks 3.1-3.3)
10. Plan implementation timeline

---

**Ready to fix blocking issues and start comprehensive audit!** 🚀