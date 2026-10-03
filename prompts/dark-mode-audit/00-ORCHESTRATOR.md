---
title: "Dark Mode Comprehensive Audit - ORCHESTRATOR"
filename: "/prompts/dark-mode-audit/00-ORCHESTRATOR.md"
created: "2026-03-12"
version: "1.0.0"
purpose: "Investigate why dark mode isn't actually dark and light mode issues"
---

# Dark Mode Comprehensive Audit - ORCHESTRATOR

**Created:** March 12, 2026  
**Audit Type:** Multi-prompt orchestrator  
**Priority:** CRITICAL (P0)  
**User Concern:** "Dark mode hardly has any dark in it"

---

## Critical User Feedback

**User Statement:**
> "I keep telling you that the light and dark mode is broken and you keep telling me it's not. I need you to do a deep audit of the full codebase because **dark mode hardly has any dark in it**."

**This is a CRITICAL issue that must be taken seriously.**

---

## Audit Objectives

### Primary Goal
Perform a comprehensive investigation of the entire light/dark mode system to identify:

1. **Why dark mode isn't dark**
   - Check actual background colors being applied
   - Verify CSS variable cascading
   - Identify components overriding dark mode styles

2. **Light mode functionality**
   - Verify light mode is actually light
   - Check contrast ratios
   - Identify any broken styling

3. **Theme switching mechanism**
   - Verify `ThemeSwitcher` component functionality
   - Check `data-theme` attribute application
   - Identify localStorage persistence issues

4. **CSS architecture problems**
   - Find specificity wars
   - Identify missing `.dark` selectors
   - Check for hardcoded colors overriding theme variables

---

## Sub-Audits

Execute the following sub-prompts in sequence:

### 01 - Theme Switcher Functionality Audit
**File:** `01-theme-switcher-audit.md`  
**Focus:** Verify ThemeSwitcher component actually works  
**Checks:**
- Component renders correctly
- Click handlers fire
- `data-theme` attribute gets set on `<body>` or `:root`
- LocalStorage persists theme choice
- Initial theme detection works

### 02 - CSS Variable Cascade Audit
**File:** `02-css-variable-cascade-audit.md`  
**Focus:** Trace how CSS variables flow through the system  
**Checks:**
- `:root` vs `.dark` vs `[data-theme="dark"]` selector specificity
- Which variables are being applied in dark mode
- Hardcoded color values overriding variables
- Component-specific CSS files overriding global theme

### 03 - Background Color Audit
**File:** `03-background-color-audit.md`  
**Focus:** Find every background color in the codebase  
**Checks:**
- Scan ALL CSS files for `background-color`, `background:`
- Identify hardcoded light backgrounds in dark mode
- Find components with `#FFFFFF`, `white`, `#F0F0F0` hardcoded
- Check if `body` background is actually `#0F0F0F` in dark mode

### 04 - Component Dark Mode Coverage Audit
**File:** `04-component-dark-mode-coverage.md`  
**Focus:** Check every component for dark mode support  
**Checks:**
- Scan all `/components/**/*.tsx` files
- Identify inline styles that don't respect theme
- Find className assignments missing `.dark` variants
- Check if BEM CSS files have dark mode rules

### 05 - Contrast Ratio Verification Audit
**File:** `05-contrast-ratio-audit.md`  
**Focus:** Verify actual contrast ratios in both modes  
**Checks:**
- Measure text contrast in dark mode
- Measure text contrast in light mode
- Identify illegible text combinations
- Check if neon colors are actually neon in dark mode

---

## Investigation Methodology

### Step 1: Check ThemeSwitcher Component
1. Open `/components/common/ThemeSwitcher.tsx`
2. Verify it actually adds `data-theme="dark"` or `.dark` class to HTML
3. Check if it's using the correct selector (body vs html vs :root)
4. Confirm localStorage persistence works

### Step 2: Check CSS Selector Specificity
1. Open `/styles/themes/dark.css`
2. Check if `.dark` selectors have enough specificity
3. Verify dark mode variables are actually being applied
4. Compare to light mode selectors

### Step 3: Scan for Hardcoded Colors
1. Search ALL CSS files for:
   - `background-color: #FFFFFF`
   - `background-color: white`
   - `background: #F0F0F0`
   - `color: #000000`
2. Check if these have `.dark` overrides

### Step 4: Check Component Inline Styles
1. Search ALL `.tsx` files for:
   - `style={{`
   - `backgroundColor:`
   - Hardcoded color values in JSX

### Step 5: Verify Actual DOM in Browser
1. Inspect actual rendered HTML
2. Check computed styles on body element
3. Verify dark mode class is present
4. Check if CSS variables are being applied

---

## Expected Output

Each sub-audit will generate a detailed report in `/reports/dark-mode-audit/` with:

1. **Findings Summary**
   - List of broken components
   - List of hardcoded colors
   - CSS specificity issues

2. **Visual Evidence**
   - Code samples showing problems
   - Expected vs. actual colors
   - CSS variable values

3. **Root Cause Analysis**
   - Why dark mode isn't dark
   - Which files are causing the problem
   - Specificity wars or missing selectors

4. **Recommended Fixes**
   - Specific file changes needed
   - CSS selector updates
   - Component refactoring required

---

## Consolidated Task List

After all 5 sub-audits complete, create a single consolidated task list in `/tasks/dark-mode-fixes.md` with:

- **P0 (Critical):** Fixes that make dark mode actually dark
- **P1 (High):** Fixes for broken light mode
- **P2 (Medium):** Contrast ratio improvements
- **P3 (Low):** Polish and edge cases

---

## Success Criteria

Dark mode audit is successful when:

- [x] We identify WHY dark mode isn't dark
- [x] We have a complete list of broken components
- [x] We have a comprehensive fix plan
- [x] User's concern is validated and addressed

---

## Notes

**User has repeatedly stated this is broken.** We must:
1. Believe the user
2. Find the actual root cause
3. Provide concrete evidence
4. Create actionable fixes

**DO NOT dismiss the concern.** The user is experiencing real problems.

---

## Execution Instructions

1. Run this orchestrator prompt
2. Execute all 5 sub-prompts in sequence
3. Generate individual reports for each
4. Create consolidated task list
5. Present findings to user with honesty about what's broken

---

**Orchestrator Created:** March 12, 2026  
**Priority:** CRITICAL (P0)  
**Status:** Ready to execute
