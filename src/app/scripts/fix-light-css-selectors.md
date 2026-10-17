# Script: Remove All body:not(.dark) Selectors from light.css

**Purpose:** Remove all `body:not(.dark)` selectors that cause light mode styles to leak into dark mode.

**Pattern to Remove:**
```css
/* WRONG - Remove all instances of this pattern */
:root:not(.dark) .element,
body:not(.dark) .element {
  /* styles */
}
```

**Replace With:**
```css
/* CORRECT - Use only :root:not(.dark) */
:root:not(.dark) .element {
  /* styles */
}
```

**Total Instances to Fix:** 73+

**Method:** 
Since find/replace in CSS requires preserving the styles and only removing the selector, I'll need to manually remove each `body:not(.dark)` line while keeping the `:root:not(.dark)` version.

**Pattern:**
1. Find: `:root:not(.dark) SELECTOR,\nbody:not(.dark) SELECTOR {`
2. Replace: `:root:not(.dark) SELECTOR {`

**Example:**
```css
/* Before */
:root:not(.dark) .header,
body:not(.dark) .header {
  background: pink;
}

/* After */
:root:not(.dark) .header {
  background: pink;
}
```

**Note:** This is a manual refactoring task due to the variable nature of selectors.
