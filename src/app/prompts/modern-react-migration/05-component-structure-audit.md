---
title: "Component Structure Audit"
filename: "/prompts/modern-react-migration/05-component-structure-audit.md"
created: "2026-03-11"
modified: "2026-03-11"
version: "1.0.0"
prompt_type: "sub-prompt"
parent_orchestrator: "/prompts/modern-react-migration/00-ORCHESTRATOR.md"
estimated_duration: "30 minutes"
output_report: "/reports/2026-03-11-modern-react-migration/05-component-structure-audit.md"
---

# Sub-Prompt 05: Component Structure Audit

## Purpose

Audit component file organization, naming conventions, separation of concerns, and opportunities for reuse. This ensures the codebase follows React best practices for maintainability and scalability.

---

## Scope

Scan ALL component-related files:

```
/components/
/pages/
/hooks/
/utils/
/lib/
App.tsx
```

---

## Audit Checklist

### 1. File Organization

**Check for:**
- ✅ Proper folder structure (common, pages, sections, ui)
- ✅ Components grouped by feature/domain
- ✅ Consistent file naming (PascalCase for components)
- ❌ Components in wrong folders
- ❌ Inconsistent naming conventions
- ❌ Deeply nested folder structures (>3 levels)

**Document:**
- Components in wrong locations
- Folder structure recommendations
- Naming inconsistencies

**Example Findings:**
```
✅ WELL ORGANIZED:
/components/common/Header.tsx
/components/pages/HomePage.tsx
/components/ui/Button.tsx

❌ POORLY ORGANIZED:
/components/HeaderComponent.tsx     → Should be /components/common/Header.tsx
/pages/HomePageContent.tsx          → Should be /components/pages/HomePage.tsx
/Button.tsx                         → Should be /components/ui/Button.tsx
```

---

### 2. Component Size and Complexity

**Check for:**
- ✅ Components under 300 lines
- ✅ Single Responsibility Principle followed
- ✅ Complex logic extracted into hooks
- ❌ "God components" (>300 lines)
- ❌ Multiple responsibilities in one component
- ❌ Inline business logic (should be in utils/hooks)

**Document:**
- Components that should be split
- Component line counts
- Opportunities to extract logic

**Example Findings:**
```
❌ TOO LARGE:
HomePage.tsx (450 lines)
  → Split into: HomePage.tsx + HeroSection.tsx + FeaturedWork.tsx

❌ MULTIPLE RESPONSIBILITIES:
PortfolioCard.tsx (handles data fetching + rendering + state)
  → Extract: usePortfolioData hook + PortfolioCard (presentation only)
```

---

### 3. Component Naming Conventions

**Check for:**
- ✅ PascalCase for component files
- ✅ Descriptive names matching purpose
- ✅ Consistent naming across similar components
- ❌ Vague names (Component, Item, Container)
- ❌ Inconsistent suffixes (Page vs PageContent)
- ❌ Abbreviations (Btn vs Button)

**Document:**
- Components with unclear names
- Naming pattern recommendations
- Renamings needed

**Example Findings:**
```
✅ GOOD NAMES:
PortfolioCard.tsx
BlogPostPreview.tsx
NavigationMenu.tsx

❌ POOR NAMES:
Card.tsx                → Should be PortfolioCard.tsx or BlogCard.tsx
Item.tsx                → Should be GalleryItem.tsx or ListItem.tsx
Container.tsx           → Should be ContentContainer.tsx or PageWrapper.tsx
```

---

### 4. Separation of Concerns

**Check for:**
- ✅ Presentation components (UI only)
- ✅ Container components (logic only)
- ✅ Business logic in utils/services
- ✅ Data fetching in hooks
- ❌ Mixed presentation + logic
- ❌ API calls in components
- ❌ Complex calculations in render

**Document:**
- Components violating separation of concerns
- Logic that should be extracted
- Opportunities for custom hooks

**Example Findings:**
```
✅ WELL SEPARATED:
/components/ui/Button.tsx              (presentation)
/hooks/usePortfolioData.ts             (data fetching)
/utils/portfolioService.ts             (business logic)

❌ MIXED CONCERNS:
/components/PortfolioGallery.tsx       (fetch + render + state + validation)
  → Split into:
    - usePortfolioGallery hook (data + state)
    - portfolioService (validation)
    - PortfolioGallery (presentation)
```

---

### 5. Component Reusability

**Check for:**
- ✅ Generic components in `/components/ui/`
- ✅ Configurable props (not hardcoded)
- ✅ Composition over inheritance
- ❌ Duplicate UI patterns
- ❌ Hardcoded values in components
- ❌ Over-specific components

**Document:**
- Duplicate patterns that should be unified
- Components that should be made reusable
- New reusable components to create

**Example Findings:**
```
❌ DUPLICATE PATTERNS:
BlogCard.tsx + PortfolioCard.tsx + VideoCard.tsx
  → All share 80% same structure
  → Create: Card.tsx (generic) + specific variants

❌ HARDCODED VALUES:
<Button className="btn btn--primary">Submit</Button>
  → Should be:
    <Button variant="primary">Submit</Button>

✅ GOOD REUSABILITY:
<Card variant="blog" image={img} title={title} />
<Card variant="portfolio" image={img} title={title} />
```

---

### 6. Export Patterns

**Check for:**
- ✅ Named exports for components
- ✅ Barrel exports (index.tsx files)
- ✅ Type exports for shared interfaces
- ❌ Default exports (except App.tsx)
- ❌ Missing barrel exports
- ❌ Inconsistent export styles

**Document:**
- Components using default exports
- Missing barrel exports
- Opportunities for cleaner imports

**Example Findings:**
```
✅ GOOD EXPORTS:
// Button.tsx
export function Button(props) { ... }
export type ButtonProps = { ... }

// ui/index.tsx (barrel export)
export { Button } from './Button';
export { Input } from './Input';

❌ BAD EXPORTS:
// Card.tsx
export default function Card() { ... }  → Should be named export

// No barrel export in /components/ui/
→ Create index.tsx for cleaner imports
```

---

### 7. TypeScript Interface Organization

**Check for:**
- ✅ Interfaces defined with components
- ✅ Shared types in `/data/types/`
- ✅ Proper prop interface naming (ComponentProps)
- ❌ Duplicate type definitions
- ❌ Types in wrong locations
- ❌ Inconsistent interface naming

**Document:**
- Duplicate interfaces to consolidate
- Shared types to extract
- Interface naming inconsistencies

**Example Findings:**
```
✅ WELL ORGANIZED:
/components/ui/Button.tsx
  → export type ButtonProps = { ... }

/data/types/portfolio.ts
  → export type PortfolioEntry = { ... }

❌ POORLY ORGANIZED:
PortfolioCard.tsx defines PortfolioEntry type
BlogCard.tsx ALSO defines PortfolioEntry type
  → Extract to /data/types/portfolio.ts

❌ INCONSISTENT NAMING:
ButtonProps ✅
CardProperties ❌ (should be CardProps)
InputInterface ❌ (should be InputProps)
```

---

### 8. Custom Hooks Organization

**Check for:**
- ✅ Hooks in `/hooks/` directory
- ✅ Proper naming (`use*`)
- ✅ Single responsibility per hook
- ❌ Hooks defined inline in components
- ❌ Multi-purpose hooks
- ❌ Missing hook extraction opportunities

**Document:**
- Inline hooks to extract
- Hooks that should be split
- New hooks to create

**Example Findings:**
```
✅ GOOD HOOKS:
/hooks/usePortfolioData.ts          (data fetching)
/hooks/useScrollPosition.ts         (scroll tracking)
/hooks/useDarkMode.ts               (theme management)

❌ INLINE HOOKS:
HomePage.tsx defines usePageData hook inline
  → Extract to /hooks/usePageData.ts

❌ MULTI-PURPOSE:
useAppState.ts (handles auth + theme + data + navigation)
  → Split into: useAuth + useTheme + useAppData + useNavigation
```

---

### 9. Component Dependencies

**Check for:**
- ✅ Minimal coupling between components
- ✅ Props over context (when appropriate)
- ✅ Clear dependency chains
- ❌ Circular dependencies
- ❌ Tight coupling
- ❌ Unnecessary prop drilling (>3 levels)

**Document:**
- Circular dependencies to break
- Tightly coupled components
- Prop drilling to eliminate

**Example Findings:**
```
❌ CIRCULAR DEPENDENCY:
Header.tsx → imports NavigationMenu.tsx
NavigationMenu.tsx → imports Header.tsx
  → Refactor: Extract shared logic to utils

❌ PROP DRILLING:
App → HomePage → HeroSection → Button (passing theme through 3 levels)
  → Use context or lift state
```

---

### 10. Component Documentation

**Check for:**
- ✅ JSDoc comments on all components
- ✅ Prop descriptions in interfaces
- ✅ Example usage in comments
- ❌ Undocumented components
- ❌ Missing prop descriptions
- ❌ No usage examples

**Document:**
- Undocumented components
- Missing JSDoc comments
- Components needing usage examples

**Example Findings:**
```
✅ WELL DOCUMENTED:
/**
 * Primary button component for user actions
 * @param {ButtonProps} props - Button properties
 * @example
 * <Button variant="primary" onClick={handleClick}>
 *   Click Me
 * </Button>
 */
export function Button(props: ButtonProps) { ... }

❌ UNDOCUMENTED:
export function Card(props) { ... }  // No JSDoc, no prop types
```

---

## Report Structure

Save findings to: `/reports/2026-03-11-modern-react-migration/05-component-structure-audit.md`

Use this template:

```markdown
---
title: "Component Structure Audit Report"
filename: "/reports/2026-03-11-modern-react-migration/05-component-structure-audit.md"
created: "2026-03-11"
completed: "[DATE]"
version: "1.0.0"
status: "complete"
auditor: "AI Assistant"
related_prompt: "/prompts/modern-react-migration/05-component-structure-audit.md"
---

# Component Structure Audit Report

**Audit Date:** [DATE]  
**Components Scanned:** [NUMBER] total  
**Issues Found:** [NUMBER] total

---

## Executive Summary

[2-3 paragraphs summarizing component structure quality]

**Well Structured:** [NUMBER] components  
**Needs Improvement:** [NUMBER] components  
**Critical Issues:** [NUMBER] components

---

## 1. File Organization

### Current Structure

```
/components/
├── common/           [N] components
├── pages/            [N] components
├── sections/         [N] components
├── ui/               [N] components
└── figma/            [N] components (protected)
```

### ✅ Well Organized ([NUMBER])
- [List well-organized components]

### ❌ Needs Reorganization ([NUMBER])

| Component | Current Location | Should Be | Priority |
|-----------|-----------------|-----------|----------|
| HeaderComponent.tsx | `/components/` | `/components/common/Header.tsx` | P1 |
| Button.tsx | `/components/` | `/components/ui/Button.tsx` | P1 |

---

## 2. Component Size and Complexity

### ✅ Appropriately Sized ([NUMBER])
- Components under 300 lines
- Single responsibility
- Clean separation of concerns

### ❌ Too Large ([NUMBER])

| Component | Lines | Issue | Recommendation | Priority |
|-----------|-------|-------|----------------|----------|
| HomePage.tsx | 450 | Multiple sections | Split into Hero + Featured + BlogPreview | P1 |
| PortfolioPage.tsx | 380 | Gallery + filtering | Extract PortfolioGallery + PortfolioFilters | P2 |

---

## 3. Component Naming Conventions

### ✅ Well Named ([NUMBER])
```
PortfolioCard.tsx
BlogPostPreview.tsx
NavigationMenu.tsx
```

### ❌ Needs Renaming ([NUMBER])

| Current Name | Should Be | Reason | Priority |
|--------------|-----------|--------|----------|
| Card.tsx | PortfolioCard.tsx | Too generic | P1 |
| Item.tsx | GalleryItem.tsx | Unclear purpose | P1 |
| Btn.tsx | Button.tsx | Abbreviation | P2 |

---

## 4. Separation of Concerns

### ✅ Well Separated ([NUMBER])

**Example: Button Component**
```tsx
// Presentation only - perfect separation
export function Button({ variant, children, onClick }: ButtonProps) {
  return createElement('button', {
    className: `btn btn--${variant}`,
    onClick
  }, children);
}
```

### ❌ Mixed Concerns ([NUMBER])

**Component:** PortfolioGallery.tsx  
**Issues:**
- Data fetching (should be in hook)
- State management (should be in hook)
- Validation logic (should be in service)
- Rendering (OK to keep)

**Recommendation:**
```
Extract:
1. usePortfolioGallery hook (data + state)
2. portfolioService (validation)
3. PortfolioGallery (presentation only)
```

---

## 5. Component Reusability

### ✅ Reusable Components ([NUMBER])
```tsx
<Card variant="blog" image={img} title={title} />
<Card variant="portfolio" image={img} title={title} />
<Button variant="primary">Submit</Button>
```

### ❌ Duplicate Patterns ([NUMBER])

**Pattern:** Card Components  
**Duplicates:** BlogCard.tsx, PortfolioCard.tsx, VideoCard.tsx  
**Similarity:** 80% shared structure  
**Recommendation:** Create generic Card.tsx with variant prop  
**Priority:** P1

---

## 6. Export Patterns

### ✅ Good Exports ([NUMBER])
```tsx
// Named exports
export function Button(props: ButtonProps) { ... }
export type ButtonProps = { ... }

// Barrel export
export { Button } from './Button';
```

### ❌ Export Issues ([NUMBER])

| File | Issue | Fix | Priority |
|------|-------|-----|----------|
| Card.tsx | Default export | Change to named export | P1 |
| /components/ui/ | No barrel export | Create index.tsx | P2 |

---

## 7. TypeScript Interface Organization

### ✅ Well Organized ([NUMBER])

```typescript
// Component-specific
/components/ui/Button.tsx
  → export type ButtonProps = { ... }

// Shared types
/data/types/portfolio.ts
  → export type PortfolioEntry = { ... }
```

### ❌ Interface Issues ([NUMBER])

| Issue | Example | Fix | Priority |
|-------|---------|-----|----------|
| Duplicate | PortfolioEntry defined in 3 files | Extract to `/data/types/` | P1 |
| Inconsistent naming | CardProperties | Rename to CardProps | P2 |

---

## 8. Custom Hooks Organization

### ✅ Well Organized Hooks ([NUMBER])
```
/hooks/
├── usePortfolioData.ts
├── useScrollPosition.ts
└── useDarkMode.ts
```

### ❌ Hook Issues ([NUMBER])

| Issue | Example | Fix | Priority |
|-------|---------|-----|----------|
| Inline hook | usePageData in HomePage.tsx | Extract to `/hooks/` | P1 |
| Multi-purpose | useAppState (auth+theme+data) | Split into separate hooks | P1 |

---

## 9. Component Dependencies

### ✅ Well Decoupled ([NUMBER])
- Minimal prop passing
- Clear dependency chains
- No circular dependencies

### ❌ Dependency Issues ([NUMBER])

**Circular Dependency:**
```
Header.tsx ⟷ NavigationMenu.tsx
Fix: Extract shared logic to utils
Priority: P0
```

**Prop Drilling:**
```
App → HomePage → HeroSection → Button (theme prop)
Fix: Use context or lift state
Priority: P1
```

---

## 10. Component Documentation

### ✅ Well Documented ([NUMBER])
```tsx
/**
 * Primary button component
 * @param {ButtonProps} props
 * @example
 * <Button variant="primary">Click</Button>
 */
export function Button(props: ButtonProps) { ... }
```

### ❌ Undocumented ([NUMBER])

| Component | Missing | Priority |
|-----------|---------|----------|
| Card.tsx | JSDoc + prop descriptions | P2 |
| Gallery.tsx | Usage examples | P3 |

---

## Recommendations

### Immediate Actions (P0)
1. Fix circular dependencies
2. [Other P0 items]

### High Priority (P1)
1. Split oversized components (>300 lines)
2. Rename poorly named components
3. Extract duplicate patterns into reusable components
4. Fix export patterns (remove default exports)
5. Extract inline hooks

### Improvements (P2)
1. Create barrel exports for component folders
2. Improve component documentation
3. Consolidate duplicate TypeScript interfaces

### Documentation (P3)
1. Add JSDoc comments to all components
2. Create component usage examples
3. Document component design patterns

---

## Component Metrics

| Metric | Value |
|--------|-------|
| Total Components | [N] |
| Average Component Size | [N] lines |
| Components >300 lines | [N] |
| Components with JSDoc | [N] / [N] ([N]%) |
| Reusable Components | [N] / [N] ([N]%) |
| Components with TypeScript | [N] / [N] ([N]%) |

---

## Restructuring Recommendations

### High-Level Changes

1. **Create Generic Components**
   - Extract Card component from BlogCard, PortfolioCard, VideoCard
   - Create flexible Section component for reusable layouts

2. **Improve Folder Structure**
   - Move all UI primitives to `/components/ui/`
   - Create `/components/features/` for feature-specific components
   - Add barrel exports to all folders

3. **Extract Business Logic**
   - Move data fetching to hooks
   - Move validation to services
   - Keep components focused on presentation

4. **Consolidate Types**
   - Extract shared interfaces to `/data/types/`
   - Remove duplicate type definitions
   - Standardize interface naming (ComponentProps pattern)

---

## Next Steps

1. Extract actionable items into task list
2. Prioritize component refactoring work
3. Update component guidelines with new patterns
4. Create component library documentation

---

**Audit Completed:** [DATE]  
**Report Status:** Complete
```

---

## Success Criteria

This audit is COMPLETE when:

- [x] All components scanned
- [x] All 10 categories audited
- [x] Component metrics calculated
- [x] Restructuring recommendations provided
- [x] Report saved with status "complete"

---

## Related Documentation

**Parent Orchestrator:** [00-ORCHESTRATOR.md](./00-ORCHESTRATOR.md)

**Related Guidelines:**
- [Component Guidelines](../../guidelines/overview-components.md)
- [TypeScript Standards](../../guidelines/Guidelines.md)
- [File Organization](../../guidelines/Guidelines.md#project-structure--architecture)

---

**Last Updated:** March 11, 2026  
**Maintained By:** Development Team
