# Immediate Fixes & Action Plan

**Date:** March 7, 2026  
**Status:** In Progress

---

## ✅ Fixed: Dev Tools Routing Issue

**Problem:** All `/dev-tools/*` URLs were not working

**Root Cause:** Incorrect path configuration in routes.ts  
- Route was defined as `path: '/dev-tools'` (absolute)
- Should be `path: 'dev-tools'` (relative) when used in nested route configuration

**Fix Applied:**
```typescript
// BEFORE (broken)
{
  path: '/dev-tools',  // ❌ Absolute path at root level
  Component: DevToolsLayout,
  children: [...]
}

// AFTER (working)
{
  path: 'dev-tools',   // ✅ Relative path under root router
  Component: DevToolsLayout,
  children: [...]
}
```

**Files Changed:**
- `/routes.ts` - Line 284

**Result:** All dev tools routes should now work correctly at `/dev-tools/*`

---

## Next: Comprehensive Architecture Audit

**Objectives:**
1. Remove dev tools from sitemap
2. Standardize hero system across all pages
3. Modularize layout components (Header, Breadcrumbs, Hero, Footer, Mobile Menu)
4. Create unified data schema
5. Implement pattern variants (WordPress template part approach)

**Audit Prompt Created:**
- `/prompts/comprehensive-hero-architecture-audit.md`

**Implementation Phases:**

### Phase 1: Current State Audit (Next)
- Component audit (Header, Breadcrumbs, Hero, Footer, Mobile Menu)
- Data structure audit (all `/data/mock/` files)
- Hero pattern audit (all page components)

### Phase 2: Data Schema Design
- Create TypeScript interfaces
- Design universal data structures
- Plan centralized data files

### Phase 3: Component Redesign
- Universal Hero component
- Modular Header with pattern support
- Modular Breadcrumbs with pattern support
- Modular Footer with pattern support
- Modular Mobile Menu with pattern support

### Phase 4: Data File Structure
- Centralized hero configs
- Centralized header configs
- Centralized breadcrumb configs (auto-generated?)
- Centralized footer configs
- Centralized mobile menu configs

### Phase 5: Implementation
1. Fix immediate issues ✅ (routing fixed)
2. Create data schema
3. Build universal hero component
4. Modularize layout components
5. Migrate all pages
6. Documentation

---

## Immediate Next Steps

1. **Remove dev tools from sitemap**
   - Edit `/components/pages/SitemapPage.tsx`
   - Or edit sitemap data file if centralized

2. **Begin comprehensive audit**
   - Run audit prompt
   - Document current state
   - Create findings report
   - Create implementation task list

**Ready to proceed with sitemap update and comprehensive audit?**
