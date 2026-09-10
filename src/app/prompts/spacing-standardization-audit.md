# 🎨 Global Spacing Standardization Audit Prompt

This prompt defines the scope and steps for a comprehensive global codebase review to identify and standardize inconsistent spacing patterns across the Ash Shaw Makeup Portfolio.

## 🎯 Objective

Conduct a full codebase audit to eliminate spacing inconsistencies and enforce the strict BEM semantic spacing system defined in the design tokens. Ensure zero hardcoded values, zero Tailwind utilities, and 100% compliance with the established spacing architecture.

## 📋 Comprehensive Audit Scope

### 1. CSS Files — Complete Review
**Target:** All files in `/styles/` (all subdirectories)

**Check for:**
- ❌ Hardcoded pixel values for padding/margin/gap (e.g., `padding: 16px`, `margin-top: 32px`)
- ❌ Hardcoded rem values (e.g., `padding: 2rem`, `gap: 1.5rem`)
- ❌ Hardcoded percentage values (e.g., `margin: 0 auto`, non-token percentages)
- ❌ Tailwind utility classes in CSS files (should not exist in BEM architecture)
- ❌ Inline `calc()` expressions not using CSS custom properties
- ✅ Verify all spacing uses CSS custom properties: `var(--wp--preset--spacing--*)`

**Target patterns:**
```css
/* ❌ VIOLATIONS */
.example { padding: 24px; }
.example { margin-top: 2rem; }
.example { gap: 1.5rem; }

/* ✅ CORRECT */
.example { padding: var(--wp--preset--spacing--fluid-md); }
.example { margin-top: var(--wp--preset--spacing--fluid-lg); }
.example { gap: var(--wp--preset--spacing--block-gap); }
```

### 2. TSX/React Components — Complete Review
**Target:** All files in `/components/` (all subdirectories)

**Check for:**
- ❌ Inline `style` prop with hardcoded spacing (e.g., `style={{ padding: '16px' }}`)
- ❌ Tailwind spacing utilities in `className` (e.g., `px-4`, `py-8`, `gap-6`, `m-4`, `mt-2`)
- ❌ Custom spacing classes not defined in `/styles/` (e.g., `custom-padding-class`)
- ✅ Verify all spacing uses semantic BEM classes: `.px-horizontal-section`, `.section-spacing`, `.gap-block-md`

**Target patterns:**
```tsx
{/* ❌ VIOLATIONS */}
<div style={{ padding: '16px' }}>...</div>
<section className="flex gap-4 px-8 py-12">...</section>

{/* ✅ CORRECT */}
<div className="card__content">...</div>
<section className="section-spacing px-horizontal-section gap-block-md">...</section>
```

### 3. Data Files — Configuration Review
**Target:** All mock data files in `/data/mock/`

**Check for:**
- ❌ Hardcoded spacing configuration in data objects
- ❌ Style objects with spacing values passed to components
- ✅ Verify data-driven components reference semantic class names only

### 4. Utility/Hook Files — Logic Review
**Target:** `/utils/`, `/hooks/`, `/lib/`

**Check for:**
- ❌ Dynamic inline style generation with hardcoded spacing
- ❌ Style manipulation functions creating non-token spacing
- ✅ Verify any dynamic styling uses CSS custom property values

### 5. Design Token Definitions — Source of Truth
**Target:** `/styles/globals.css` (CSS custom properties section)

**Verify:**
- ✅ All spacing tokens properly defined with fluid clamp() values
- ✅ Horizontal section spacing: `--wp--preset--spacing--section-horizontal`
- ✅ Vertical section spacing: `--wp--preset--spacing--section-vertical`
- ✅ Fluid spacing scale: `--wp--preset--spacing--fluid-{xs|sm|md|lg|xl|2xl}`
- ✅ Block gap token: `--wp--preset--spacing--block-gap`
- ✅ No unused/orphaned spacing tokens

## 🛠️ Detailed Audit Steps

### Phase 1: Automated Pattern Search (File Search)
1. Search for hardcoded pixel patterns: `padding: \d+px`, `margin: \d+px`, `gap: \d+px`
2. Search for hardcoded rem patterns: `padding: \d+\.?\d*rem`, `margin: \d+\.?\d*rem`
3. Search for Tailwind spacing utilities: `className.*[pm][xytblr]?-\d+`, `className.*gap-\d+`
4. Search for inline style objects: `style={{.*padding`, `style={{.*margin`, `style={{.*gap`
5. Generate initial violation count and file list

### Phase 2: Manual CSS Block Review
1. Read each CSS file in `/styles/blocks/`
2. Read each CSS file in `/styles/` (root level)
3. Identify non-compliant spacing declarations
4. Categorize violations by type:
   - Legacy hardcoded values
   - Missing semantic classes
   - Incorrect token usage
   - Mobile/responsive override issues

### Phase 3: Component Pattern Analysis
1. Review all page components (`/components/pages/`)
2. Review all section components (`/components/sections/`)
3. Review all UI primitives (`/components/ui/`)
4. Review all common components (`/components/common/`)
5. Identify components using deprecated spacing patterns
6. Check for prop-based dynamic spacing (anti-pattern)

### Phase 4: Cross-Reference Validation
1. Verify all spacing classes referenced in TSX exist in CSS
2. Verify all spacing tokens referenced in CSS are defined in `globals.css`
3. Identify unused helper classes (e.g., `.gap-block-sm` defined but never used)
4. Check for duplicate/redundant spacing definitions across CSS files

### Phase 5: Responsive Behavior Audit
1. Verify fluid spacing scales correctly across breakpoints
2. Check mobile-specific overrides use appropriate tokens
3. Identify any breakpoint-specific hardcoded spacing
4. Validate container max-width + padding alignment at all viewports

## 📊 Report Structure

Create `/reports/spacing-standardization/report.md` with:

### 1. Executive Summary
- Total violations found
- Files affected (count + percentage)
- Violation breakdown by category
- Estimated refactor effort (hours)

### 2. Critical Violations (P0)
- Hardcoded spacing in production components
- Missing semantic classes in primary sections
- Tailwind utilities in user-facing pages

### 3. Standard Violations (P1)
- Hardcoded spacing in secondary components
- Inconsistent token usage patterns
- Missing mobile responsiveness

### 4. Minor Violations (P2)
- Developer tool pages with legacy patterns
- Internal utility spacing issues
- Documentation examples with old syntax

### 5. File-by-File Breakdown
For each violating file:
- File path
- Violation count
- Specific line numbers
- Code snippets (before)
- Recommended fix (after)

### 6. Token Coverage Report
- Tokens defined: X
- Tokens actively used: Y
- Orphaned tokens: Z
- Missing tokens (gaps in scale): A

### 7. Recommended Refactor Plan
- Prioritized task list
- Estimated time per task
- Risk assessment (bundler constraints)
- Testing requirements

## 📝 Task List Structure

Create `/tasks/spacing-standardization-tasks.md` with:

### Priority Tiers
- **P0** — Critical user-facing violations (do first)
- **P1** — Standard violations in core components (do second)
- **P2** — Minor violations in dev tools/edge cases (do last)

### Task Format
```markdown
- [ ] **T01** Fix hardcoded padding in `HomePage.tsx` hero section
  - File: `/components/pages/HomePage.tsx`
  - Lines: 45, 67, 89
  - Replace: `className="px-8 py-12"` → `className="px-horizontal-section section-spacing"`
  - Impact: High visibility (landing page)
```

## 🔍 Search Patterns Reference

### CSS Hardcoded Values
```regex
padding:\s*\d+px
margin:\s*\d+px
gap:\s*\d+px
padding:\s*\d+\.?\d*rem
margin:\s*\d+\.?\d*rem
gap:\s*\d+\.?\d*rem
```

### Tailwind Utilities in JSX
```regex
className="[^"]*\b(px|py|pt|pb|pl|pr|mx|my|mt|mb|ml|mr|gap)-\d+
className='[^']*\b(px|py|pt|pb|pl|pr|mx|my|mt|mb|ml|mr|gap)-\d+
```

### Inline Styles
```regex
style={{[^}]*(padding|margin|gap):\s*['"]?\d+
```

## ✅ Success Criteria

Audit is complete when:
- [x] All CSS files reviewed (100% coverage)
- [x] All TSX component files reviewed (100% coverage)
- [x] All violations documented with line numbers
- [x] All violations categorized by priority
- [x] Task list created with estimated effort
- [x] Report includes before/after code examples
- [x] Token coverage analysis complete
- [x] Responsive behavior validated

## 🔗 References

- [CSS Architecture Guide](../guidelines/css-architecture.md)
- [Spacing Tokens Reference](../guidelines/design-tokens/spacing.md)
- [BEM Methodology](../guidelines/Guidelines.md#-critical-styling-rule---strict-bem-architecture)
- [Bundler Compatibility Rules](../guidelines/Guidelines.md#-bundler-compatibility-rules-figma-make)
- [Design Tokens Overview](../guidelines/design-tokens/)

## 🚨 Critical Notes

1. **Bundler Constraints:** All fixes must use bundler-safe syntax (no arrow functions, no destructuring in certain contexts)
2. **CSS Specificity:** Ensure spacing refactors don't break cascade/specificity rules
3. **Visual Regression:** Flag any spacing changes that may affect layout significantly
4. **Mobile Testing:** All spacing fixes must be verified on mobile viewports
5. **Light/Dark Mode:** Spacing tokens must work in both theme modes

---

**Version:** 2.0.0 — Global codebase review scope  
**Last Updated:** March 3, 2026  
**Status:** Ready to execute
