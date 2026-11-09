# N010: Dark Mode Implementation

**Purpose:** Theme switching, CSS variables for dark colors, and dark mode implementation patterns.

**Authority:** D4 (N-Document Approvals); D3 (Design Authority: WCAG 2.2 AAA)

---

## Implementation Method

Using `prefers-color-scheme` media query:

```css
/* Light mode (default) */
body {
  background-color: white;
  color: #333;
}

/* Dark mode override */
@media (prefers-color-scheme: dark) {
  body {
    background-color: #1a1a1a;
    color: #f5f5f5;
  }
}
```

## CSS Variables Strategy

```css
:root {
  --color-bg: white;
  --color-text: #333;
  --color-border: #e0e0e0;
}

@media (prefers-color-scheme: dark) {
  :root {
    --color-bg: #1a1a1a;
    --color-text: #f5f5f5;
    --color-border: #333;
  }
}

body {
  background-color: var(--color-bg);
  color: var(--color-text);
  border-color: var(--color-border);
}
```

## Component Support

All components must support dark mode:

```jsx
<div className="bg-white dark:bg-gray-900 text-gray-900 dark:text-white">
  Content automatically switches
</div>
```

## Contrast Verification

All color pairs must maintain 7:1 contrast in both light and dark modes (AAA).

---

**Authority:** D4 (N-Document Approvals) | D3 (WCAG 2.2 AAA)  
**Last Updated:** 2026-11-09  
**Related:** [N001: Design Token Reference](#) · [N002: Accessibility Checklist](#)
