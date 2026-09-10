# Light & Dark Mode Comprehensive Audit Prompt

**Version:** 1.0.0  
**Created:** March 20, 2026  
**Completed:** March 20, 2026  
**Status:** ✅ COMPLETE - All issues resolved  
**Purpose:** Audit and fix light/dark mode styling issues after light mode polish  
**Priority:** CRITICAL

---

## ⚠️ AUDIT STATUS: COMPLETE

**Date Completed:** March 20, 2026  
**Total Fixes Applied:** 74/74  
**Result:** All `body:not(.dark)` selectors removed from light.css

**Reports Generated:**
- `/reports/light-dark-mode-audit/critical-bug-found.md` - Initial discovery
- `/reports/light-dark-mode-audit/selector-audit-findings.md` - All 74 instances documented
- `/reports/light-dark-mode-audit/audit-complete-summary.md` - Executive summary
- `/reports/light-dark-mode-audit/fix-complete.md` - Final completion report

**Task List:**
- `/tasks/light-dark-mode-selector-fix.md` - 100% complete

**Root Cause Found:**
CSS selector lists use OR logic. Pattern like:
```css
:root:not(.dark) .element,
body:not(.dark) .element {
```
Caused light mode styles to apply in dark mode because `<body>` never receives `.dark` class (only `<html>` does).

**Solution Applied:**
Removed ALL `body:not(.dark)` selectors, keeping ONLY `:root:not(.dark)` selectors.

---

## Audit Scope

This audit will:

1. **Verify dark mode integrity** - Ensure dark mode still uses #0F0F0F backgrounds and full-brightness neon colors
2. **Verify light mode improvements** - Confirm light mode uses vibrant pastels without breaking dark mode
3. **Check CSS specificity** - Verify selector specificity doesn't cause conflicts
4. **Test theme switching** - Ensure ThemeProvider correctly applies `.dark` class
5. **Review import order** - Confirm CSS file imports don't cause cascade issues

---

## Step 1: Verify Current CSS Import Order

**File:** `/styles/globals.css` (lines 1-5)

```css
@import "tailwindcss";
@import "./themes/light.css";
@import "./themes/dark.css";
@import "./themes/dark-extended.css";
@import "./blocks/book-dark-mode.css";
```

**Analysis Required:**
- Does `light.css` only apply when `.dark` class is NOT present?
- Does `dark.css` properly override light.css when `.dark` is present?
- Do `dark-extended.css` and `book-dark-mode.css` use `!important` unnecessarily?

---

## Step 2: Audit Light Mode Selectors

**File:** `/styles/themes/light.css`

**Expected Pattern:**
```css
:root:not(.dark), body:not(.dark) {
  /* Variables that ONLY apply in light mode */
}

:root:not(.dark) .element,
body:not(.dark) .element {
  /* Styles that ONLY apply in light mode */
}
```

**Check:**
- [ ] All selectors use `:root:not(.dark)` or `body:not(.dark)`
- [ ] NO selectors accidentally apply to dark mode
- [ ] Color variables are properly scoped

---

## Step 3: Audit Dark Mode Selectors

**File:** `/styles/themes/dark.css`

**Expected Pattern:**
```css
.dark, [data-theme="dark"] {
  /* Variables that apply in dark mode */
}

.dark .element,
body.dark .element {
  /* Styles that apply in dark mode */
}
```

**Critical Values to Verify:**
- Background: `#0F0F0F` (atomic black)
- Neon Pink: `#FF3AAE` (full brightness)
- Neon Yellow: `#F4FF3C` (full brightness)
- Text: `#F6F2EB` (warm white)

---

## Step 4: Check Theme Provider Implementation

**File:** `/components/common/ThemeProvider.tsx`

**Verify:**
- [ ] `document.documentElement.classList.add('dark')` is called correctly
- [ ] `document.documentElement.classList.remove('dark')` is called when switching to light
- [ ] Default theme is 'dark'
- [ ] localStorage persistence works

---

## Step 5: Test CSS Specificity

**Potential Conflicts:**

1. **Light mode trying to override dark mode:**
   - If `:root:not(.dark)` has higher specificity than `.dark`, it could win
   - Solution: Ensure dark.css comes AFTER light.css in import order ✓

2. **!important rules in book-dark-mode.css:**
   - Could force dark styles even in light mode
   - Solution: Add `:not(.light)` or check selectors

---

## Step 6: Create Test Cases

Test the following scenarios:

1. **Fresh page load (no localStorage):**
   - Should default to dark mode
   - Background should be #0F0F0F
   - Text should be #F6F2EB

2. **Switch to light mode:**
   - Background should change to pink gradient
   - Text should change to #2A1A2A
   - `.dark` class should be removed from `<html>`

3. **Switch back to dark mode:**
   - Background should return to #0F0F0F
   - Neon colors should be full brightness
   - `.dark` class should be added back to `<html>`

4. **Page refresh in light mode:**
   - Should remember light mode from localStorage
   - Should NOT show dark mode flash

---

## Expected Findings

### Dark Mode (CORRECT STATE):
```css
body {
  background-color: #0F0F0F; /* Atomic black */
  color: #F6F2EB; /* Warm white */
}

.header {
  background-color: rgba(15, 15, 15, 0.95);
  border-bottom: 1px solid #333333;
}

/* Neon colors at FULL brightness */
--color-neon-pink: #FF3AAE;
--color-neon-yellow: #F4FF3C;
```

### Light Mode (CORRECT STATE):
```css
body {
  background: linear-gradient(135deg, #FFFBFE 0%, #FFF5FC 50%, #F0F8FF 100%);
  color: #2A1A2A; /* Deep charcoal */
}

.header {
  background: linear-gradient(135deg, rgba(255, 251, 254, 0.98) 0%, rgba(255, 245, 252, 0.98) 100%);
  border-bottom: 2px solid #FFD0EE;
}

/* Neon colors darkened for accessibility */
--color-neon-pink: #E0007A;
--color-neon-yellow: #A08800;
```

---

## Fixes Required

Based on audit findings, create fixes for:

1. **CSS Selector Conflicts:**
   - Adjust specificity if needed
   - Ensure proper scoping with `:not(.dark)`

2. **Import Order Issues:**
   - Reorder CSS imports if needed
   - Remove duplicate declarations

3. **ThemeProvider Logic:**
   - Fix class application timing
   - Ensure body/html sync

4. **Variable Inheritance:**
   - Check if CSS variables are properly scoped
   - Verify cascade doesn't leak between modes

---

## Deliverables

1. **Audit Report:** `/reports/light-dark-mode-audit/findings.md`
2. **Fix Implementation:** Updated CSS files
3. **Test Results:** Documented theme switching behavior
4. **Task List:** `/tasks/light-dark-mode-fixes.md`

---

## Success Criteria

- [ ] Dark mode uses #0F0F0F background
- [ ] Dark mode uses full-brightness neon colors (#FF3AAE, #F4FF3C)
- [ ] Light mode uses vibrant pastel backgrounds
- [ ] Light mode uses accessible darkened neon colors
- [ ] Theme switching works instantly without flash
- [ ] Both modes are WCAG 2.2 AA compliant
- [ ] NO CSS conflicts or specificity wars