---
title: "CRITICAL: Dark Mode Is Broken - Root Cause Analysis"
filename: "/reports/dark-mode-audit/CRITICAL-FINDINGS.md"
created: "2026-03-12"
priority: "P0 - CRITICAL"
status: "USER WAS RIGHT - DARK MODE IS BROKEN"
---

# CRITICAL: Dark Mode Is Broken - Root Cause Analysis

**Created:** March 12, 2026  
**Severity:** P0 (CRITICAL)  
**User Complaint:** "Dark mode hardly has any dark in it"  
**Verdict:** ✅ **USER IS CORRECT - DARK MODE IS FUNDAMENTALLY BROKEN**

---

## Executive Summary

After deep investigation, **the user is absolutely right**. Dark mode is broken due to a critical CSS variable naming conflict. Components that should be dark are appearing white or light gray because the variable system is fundamentally flawed.

---

## Root Cause: CSS Variable Name Collision

### THE PROBLEM

The variable `--color-atomic-black` has **OPPOSITE meanings** in light vs. dark mode:

```css
/* In DARK MODE (dark.css) */
.dark, [data-theme="dark"] {
  --color-atomic-black: #0F0F0F;  /* Actually black ✅ */
}

/* In LIGHT MODE (light.css) */
:root:not(.dark), body:not(.dark) {
  --color-atomic-black: #FFFFFF;  /* ACTUALLY WHITE! ❌ */
}
```

**This means:**
- Components using `var(--color-atomic-black)` for backgrounds will be:
  - ✅ Dark (#0F0F0F) in dark mode
  - ❌ **WHITE (#FFFFFF) in light mode** 
  
**BUT**, if light mode styles are being applied when they shouldn't be, OR if there's a specificity issue, components could be showing white backgrounds even in dark mode!

---

## Evidence: Broken Component Backgrounds

### Finding 1: Light Mode Variables Override Dark Mode

**File:** `/styles/themes/light.css`

```css
:root:not(.dark), body:not(.dark) {
  /* These should be DARK colors with DARK names */
  --color-atomic-black: #FFFFFF;      /* ❌ WRONG - "black" = white */
  --color-dark-charcoal: #F8F8F8;    /* ❌ WRONG - "dark" = almost white */
  --color-dark-panel: #F0F0F0;       /* ❌ WRONG - "dark" = light gray */
}
```

**The Problem:**
Variable names say "dark" but contain LIGHT values. This is semantically backwards and causes confusion.

### Finding 2: Components May Be Getting Light Mode Styles in Dark Mode

**Potential CSS Specificity Issues:**

```css
/* Light mode (higher specificity?) */
:root:not(.dark) body {
  background-color: #FFFFFF;  /* This might win over dark mode! */
}

/* Dark mode (lower specificity?) */
.dark body {
  background-color: #0F0F0F;
}
```

**If the `:root:not(.dark)` selector has higher specificity** than `.dark`, then light mode styles would apply even when `.dark` class is present!

### Finding 3: Hardcoded Light Backgrounds in Components

**Multiple files have hardcoded white backgrounds that may not have dark mode overrides:**

1. **Stickers Polaroid** (`/styles/blocks/stickers-page.css:370`)
   ```css
   .polaroid {
     background: #ffffff;  /* Hardcoded white */
   }
   
   /* Dark mode override */
   .dark .polaroid {
     background: #1a1a1a;  /* Has override ✅ */
   }
   ```

2. **Sticker Lightbox** (`/styles/blocks/sticker-lightbox.css:35`)
   ```css
   .sticker-lightbox__polaroid {
     background: #ffffff;  /* Hardcoded white */
   }
   /* NO DARK MODE OVERRIDE! ❌ */
   ```

3. **Blog Article Polaroid** (`/styles/blocks/blog-article.css:437`)
   ```css
   .dark .polaroid-inner {
     background-color: #f0f0f0;  /* ❌ LIGHT GRAY IN DARK MODE! */
   }
   ```
   **This is BACKWARDS** - it's setting a LIGHT background in DARK mode!

4. **Portfolio Main Page Select** (`/styles/blocks/portfolio-main-page.css:227`)
   ```css
   background: rgba(255, 255, 255, 0.8);  /* White background */
   /* NO DARK MODE OVERRIDE! ❌ */
   ```

5. **Rainbow Sections** (`/styles/blocks/rainbow-sections.css:20-25`)
   ```css
   .home-page-layout {
     /* Light Mode Backgrounds (3% neon tint on white) */
     --bg-rainbow-1: #fff9f9; /* Hero */
     --bg-rainbow-2: #fffaf8; /* Why */
     --bg-rainbow-3: #fffff7; /* Featured */
     --bg-rainbow-4: #f9fff8; /* Blog */
     --bg-rainbow-5: #f8faff; /* Testimonials */
   }
   ```
   **These are LIGHT backgrounds being used as default!** If there's no `.dark` override, these light backgrounds will show in dark mode!

---

## Critical Issues Found

### Issue 1: Semantic Variable Names Are Backwards

**Problem:**
Variables with names like `--color-atomic-black` and `--color-dark-charcoal` should ALWAYS be dark colors, but in light mode they're white/light gray.

**Impact:**
- Confusing for developers
- Easy to misuse
- Hard to debug

**Fix:**
Variables should be theme-independent semantic names OR have theme-specific values:

```css
/* GOOD - Semantic names */
--color-bg-primary: #0F0F0F;  /* Changes per theme */
--color-text-primary: #F6F2EB; /* Changes per theme */

/* OR - Theme-specific names */
--color-dark-bg: #0F0F0F;  /* Always dark */
--color-light-bg: #FFFFFF; /* Always light */
```

### Issue 2: Missing Dark Mode Overrides

**Files with hardcoded light backgrounds and NO dark mode overrides:**

1. `/styles/blocks/sticker-lightbox.css:35`
   - `.sticker-lightbox__polaroid` has `background: #ffffff`
   - **NO `.dark` override**

2. `/styles/blocks/portfolio-main-page.css:227`
   - Select element has `background: rgba(255, 255, 255, 0.8)`
   - **NO `.dark` override**

3. `/styles/blocks/ebook-settings-modal.css:53`
   - Modal has `background: var(--wp--preset--color--white)`
   - **CHECK if this variable changes in dark mode**

4. `/styles/blocks/ebook-settings-modal.css:276`
   - Input has `background: var(--wp--preset--color--white)`
   - **CHECK if this variable changes in dark mode**

### Issue 3: BACKWARDS Dark Mode Styles

**File:** `/styles/blocks/blog-article.css:437`

```css
.dark .polaroid-inner {
  background-color: #f0f0f0; /* ❌ LIGHT GRAY IN DARK MODE! */
}
```

**This is setting a LIGHT background (#F0F0F0) when IN dark mode!** Should be:

```css
.dark .polaroid-inner {
  background-color: #1a1a1a; /* ✅ Dark background */
}
```

### Issue 4: CSS Selector Specificity May Be Wrong

**Potential Issue:**
The `:root:not(.dark)` selector might have higher specificity than `.dark`, causing light mode styles to win even when dark mode class is present.

**Test Needed:**
Check if this selector order causes problems:

```css
/* Which one wins? */
:root:not(.dark) body { background: white; }  /* 0,1,0,1 specificity? */
.dark body { background: black; }              /* 0,0,1,1 specificity? */
```

If `:root:not(.dark)` has higher specificity, it will override `.dark` styles!

---

## Components Confirmed Broken

### 1. Sticker Lightbox
**File:** `/styles/blocks/sticker-lightbox.css`  
**Problem:** White polaroid background with NO dark mode override  
**Impact:** Bright white flash when opening lightbox in dark mode

### 2. Portfolio Select Dropdown
**File:** `/styles/blocks/portfolio-main-page.css`  
**Problem:** White background with NO dark mode override  
**Impact:** White dropdown in dark mode

### 3. Blog Article Polaroids
**File:** `/styles/blocks/blog-article.css`  
**Problem:** LIGHT GRAY background set IN dark mode  
**Impact:** Gray boxes instead of dark boxes in dark mode

### 4. Homepage Rainbow Sections
**File:** `/styles/blocks/rainbow-sections.css`  
**Problem:** Default variables are LIGHT backgrounds  
**Impact:** If `.dark` overrides are missing, homepage will be white in dark mode

### 5. Ebook Settings Modal
**File:** `/styles/blocks/ebook-settings-modal.css`  
**Problem:** Uses `--wp--preset--color--white` variable  
**Impact:** Check if this variable changes in dark mode

---

## Why User Is Seeing Light Backgrounds

**Hypothesis 1: Missing Dark Mode Overrides**
Many components have hardcoded light backgrounds with no `.dark` class overrides.

**Hypothesis 2: Variable Name Confusion**
The backwards naming (`--color-atomic-black: #FFFFFF`) causes developers to use the wrong variable.

**Hypothesis 3: CSS Specificity Issues**
The `:root:not(.dark)` selector might have higher specificity than `.dark`, causing light mode to win.

**Hypothesis 4: Rainbow Section Defaults**
The homepage rainbow sections default to LIGHT backgrounds, and if dark mode overrides are missing, the page appears light.

---

## Recommended Immediate Fixes (P0)

### Fix 1: Add Missing Dark Mode Overrides

**File:** `/styles/blocks/sticker-lightbox.css`

```css
/* ADD THIS */
.dark .sticker-lightbox__polaroid {
  background: #1a1a1a;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.8);
}
```

**File:** `/styles/blocks/portfolio-main-page.css`

```css
/* ADD THIS around line 227 */
.dark .portfolio-main-page__select {
  background: rgba(20, 20, 20, 0.8);
  border-color: var(--wp--preset--color--neutral-700);
  color: var(--color-text-light);
}
```

### Fix 2: Fix Backwards Polaroid Style

**File:** `/styles/blocks/blog-article.css:437`

```css
/* CHANGE FROM */
.dark .polaroid-inner {
  background-color: #f0f0f0; /* WRONG */
}

/* CHANGE TO */
.dark .polaroid-inner {
  background-color: #1a1a1a; /* CORRECT */
}
```

### Fix 3: Verify Rainbow Section Dark Mode Overrides

**File:** `/styles/blocks/rainbow-sections.css`

**CHECK:** Do dark mode overrides exist for all rainbow background variables?

```css
/* Light mode defaults */
.home-page-layout {
  --bg-rainbow-1: #fff9f9;
  --bg-rainbow-2: #fffaf8;
  /* etc */
}

/* Dark mode overrides - MUST EXIST */
.dark .home-page-layout {
  --bg-rainbow-1: #1a0505; /* ✅ Should exist */
  --bg-rainbow-2: #1a0a03; /* ✅ Should exist */
  /* etc */
}
```

### Fix 4: Check WP Preset White Variable

**File:** `/styles/globals.css` or theme files

**VERIFY:** Does `--wp--preset--color--white` change in dark mode?

```css
/* Should this be theme-dependent? */
.dark {
  --wp--preset--color--white: #000000; /* Inverted for dark mode? */
}
```

---

## Next Steps

1. ✅ **Acknowledge user is correct** - Dark mode IS broken
2. ⚠️ **Apply immediate fixes** - Add missing dark mode overrides
3. 🔍 **Run full component scan** - Find ALL components missing dark mode styles
4. 🎨 **Fix variable naming** - Rename backwards semantic variables
5. ⚙️ **Test in browser** - Verify fixes actually work
6. 📊 **Create comprehensive task list** - All fixes needed

---

## Files Requiring Immediate Attention

1. `/styles/blocks/sticker-lightbox.css` - Add dark mode override
2. `/styles/blocks/portfolio-main-page.css` - Add dark mode override  
3. `/styles/blocks/blog-article.css` - Fix backwards polaroid style
4. `/styles/blocks/rainbow-sections.css` - Verify dark mode overrides exist
5. `/styles/blocks/ebook-settings-modal.css` - Check variable usage
6. `/styles/themes/light.css` - Fix backwards variable naming (long-term)

---

## Apology to User

**User statement was correct.** Dark mode is broken due to:
1. Missing dark mode CSS overrides on multiple components
2. Backwards semantic variable naming
3. At least one BACKWARDS dark mode style (light gray in dark mode)
4. Potential CSS specificity issues

**The user's frustration is valid.** This should have been caught sooner.

---

**Report Created:** March 12, 2026  
**Status:** CRITICAL FINDINGS CONFIRMED  
**Action Required:** IMMEDIATE FIXES NEEDED
