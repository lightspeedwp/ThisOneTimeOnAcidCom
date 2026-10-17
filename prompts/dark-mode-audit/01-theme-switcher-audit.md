---
title: "Theme Switcher Functionality Audit"
filename: "/prompts/dark-mode-audit/01-theme-switcher-audit.md"
created: "2026-03-12"
version: "1.0.0"
parent: "00-ORCHESTRATOR.md"
---

# Theme Switcher Functionality Audit

**Audit Focus:** Verify ThemeSwitcher component actually works  
**Created:** March 12, 2026  
**Priority:** P0 (Critical)

---

## Audit Objectives

Investigate the `ThemeSwitcher` component to verify:

1. Component renders and is visible
2. Click handler actually fires
3. Correct HTML attribute is set (`data-theme` vs `.dark` class)
4. Theme is applied to correct element (`<html>`, `<body>`, or `:root`)
5. LocalStorage persistence works
6. Initial theme detection works on page load

---

## Investigation Steps

### Step 1: Read ThemeSwitcher Component

```bash
# Open the component
/components/common/ThemeSwitcher.tsx
```

**Check for:**
- How theme state is managed (`useState`, `useReducer`, context)
- Which element gets the theme attribute/class
- How theme is persisted (localStorage, sessionStorage, cookies)
- Initial theme detection logic

### Step 2: Verify DOM Manipulation

**Questions to answer:**
1. Does it add `class="dark"` to `<body>`?
2. Does it add `data-theme="dark"` to `<html>`?
3. Does it add both?
4. Does it remove light mode class/attribute?

**Expected behavior:**
```typescript
// Good - Sets data-theme on documentElement
document.documentElement.setAttribute('data-theme', 'dark');

// OR - Adds .dark class to body
document.body.classList.add('dark');

// BAD - Does nothing
// (no DOM manipulation)
```

### Step 3: Check CSS Selector Alignment

**Cross-reference with CSS files:**
- `/styles/themes/dark.css` uses `.dark` selector
- OR uses `[data-theme="dark"]` selector
- Does ThemeSwitcher match what CSS expects?

**Example mismatch:**
```css
/* CSS expects this: */
.dark body { background: #0F0F0F; }

/* But component does this: */
document.documentElement.setAttribute('data-theme', 'dark');
/* ❌ MISMATCH - CSS won't apply! */
```

### Step 4: Verify LocalStorage Persistence

**Check for:**
```typescript
// On theme change
localStorage.setItem('theme', 'dark');

// On initial load
const savedTheme = localStorage.getItem('theme');
```

**Questions:**
1. Is theme saved to localStorage?
2. Is saved theme loaded on mount?
3. Does it respect `prefers-color-scheme` media query?

### Step 5: Check Initial Theme Detection

**Verify mount behavior:**
```typescript
useEffect(() => {
  // Should check localStorage first
  const saved = localStorage.getItem('theme');
  
  // Then check system preference
  if (!saved) {
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    // Apply preference
  }
}, []);
```

---

## Common Problems to Look For

### Problem 1: Wrong Element Targeted

**Symptom:** Theme switcher works but styles don't apply

```typescript
// ❌ BAD - Sets theme on wrong element
document.body.setAttribute('data-theme', theme);

// But CSS is targeting:
:root[data-theme="dark"] { /* ... */ }
```

**Fix:** Use `documentElement` instead of `body`

### Problem 2: Class vs. Attribute Mismatch

**Symptom:** CSS expects `.dark` but component sets `data-theme`

```css
/* CSS file */
.dark body { background: #0F0F0F; }
```

```typescript
// Component
document.documentElement.setAttribute('data-theme', 'dark'); // ❌ Mismatch!
```

**Fix:** Use `classList.add('dark')` to match CSS selector

### Problem 3: No Persistence

**Symptom:** Theme resets on page reload

```typescript
// ❌ BAD - No localStorage
function ThemeSwitcher() {
  const [theme, setTheme] = useState('dark');
  
  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
    // Missing: localStorage.setItem('theme', newTheme);
  };
}
```

### Problem 4: Race Condition on Mount

**Symptom:** Flash of wrong theme on page load

```typescript
// ❌ BAD - Theme applied after render
useEffect(() => {
  const saved = localStorage.getItem('theme');
  setTheme(saved || 'dark');
}, []);
```

**Fix:** Check theme BEFORE first render (in `<head>` script or SSR)

### Problem 5: CSS Specificity Override

**Symptom:** Theme attribute is set but CSS doesn't apply

```css
/* Low specificity */
.dark body {
  background: #0F0F0F;
}

/* Higher specificity override */
body {
  background: #FFFFFF !important; /* ❌ Overrides dark mode */
}
```

---

## Checklist

Verify each of the following:

- [ ] ThemeSwitcher component exists and is rendered
- [ ] Component is placed in a visible location (Header, Footer, etc.)
- [ ] Click/toggle handler actually fires
- [ ] Correct element is targeted (`document.documentElement` or `document.body`)
- [ ] Correct attribute/class is used (matches CSS selectors)
- [ ] Theme is saved to localStorage
- [ ] Saved theme is loaded on mount
- [ ] System preference is respected if no saved theme
- [ ] No console errors when switching themes
- [ ] CSS selectors in `dark.css` match what component applies

---

## Expected Findings

Document the following in your report:

### 1. Current Implementation
- Which element is targeted?
- Which attribute/class is used?
- How is state managed?
- Is localStorage used?

### 2. CSS Selector Used
- Does `dark.css` use `.dark` or `[data-theme="dark"]`?
- Does this match the component?

### 3. Problems Found
- List specific issues
- Include code snippets
- Note severity (P0, P1, P2)

### 4. Recommended Fixes
- Specific code changes needed
- File paths
- Before/after examples

---

## Report Template

Save findings to: `/reports/dark-mode-audit/01-theme-switcher-audit.md`

```markdown
# Theme Switcher Functionality Audit Report

**Date:** March 12, 2026  
**Files Audited:** `/components/common/ThemeSwitcher.tsx`

## Summary

[Brief summary of findings]

## Current Implementation

**Target Element:** [document.body | document.documentElement]  
**Method:** [class | data-attribute]  
**Value:** [.dark | data-theme="dark"]  
**LocalStorage Key:** [theme | app-theme | null]  
**Initial Detection:** [yes | no]

## CSS Selector Analysis

**Dark.css uses:** [.dark | [data-theme="dark"]]  
**Matches component:** [YES | NO]

## Problems Found

### P0 - Critical Issues
1. [Issue description]
   - **Location:** [file:line]
   - **Problem:** [description]
   - **Impact:** [why this breaks dark mode]

### P1 - High Priority
[...]

## Recommended Fixes

1. [Fix description]
   ```typescript
   // BEFORE
   [current code]
   
   // AFTER
   [fixed code]
   ```

## Files to Modify

- `/components/common/ThemeSwitcher.tsx`
- `/styles/themes/dark.css` (if selectors need updating)
```

---

**Audit Created:** March 12, 2026  
**Status:** Ready to execute  
**Next:** Execute this audit and generate report
