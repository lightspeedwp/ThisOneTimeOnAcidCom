---
title: "Dark mode troubleshooting guide"
filename: "/docs/dark-mode-troubleshooting.md"
created: "2026-03-12"
---

# Dark mode troubleshooting guide

Source review: 24 October 2026, revision
`3f583002482d80ffd1910676bcf7c63e13989b20`.
Inspect theme behaviour without clearing preferences or forcing a different
reading experience. No browser behaviour was tested for this review.

## Read-only quick check

Open browser DevTools and record the route and intended theme.
This diagnostic does not change storage or classes:

```javascript
var storedTheme;
try {
  storedTheme = localStorage.getItem('theme');
} catch (error) {
  storedTheme = 'Storage unavailable';
}
console.log({
  hasDarkClass: document.documentElement.classList.contains('dark'),
  dataTheme: document.documentElement.getAttribute('data-theme'),
  storedTheme: storedTheme
});
```

There is no universal requirement for all values to indicate dark mode.
A saved light preference is legitimate. Missing or inconsistent values are
evidence to investigate, not permission to reset preferences.

## Which controller is involved?

The current source chain is:

1. Root `index.html` loads `src/main.tsx`.
2. `App.tsx` uses `routes.ts`, whose root component is `RootLayout.tsx`.
3. The layout renders the header and footer.
4. The header renders `ThemeToggleES5.tsx`, which maintains independent
   light/dark state and writes `theme`, the root class and `data-theme`.
5. The footer renders `ThemeSwitcher.tsx`, which uses `ThemeProvider.tsx`
   context. The reviewed entry does not mount that provider. Its hook defines
   a fallback value and no-op setter when context is absent.

The provider module also contains initialisation logic and a `brutalist` value.
This does not prove its context is mounted or that the header and footer share
state. Do not document them as one synchronised controller.

Use the header control only when intentionally changing the site theme.
Record disagreement between controls before proposing a separately approved
runtime correction. The ebook service's `ash-ebook-theme` is a distinct key;
see [ebook preferences](ebook-preferences.md).

## Initial rendering and styles

Root `index.html` contains no inline theme initialisation script.
The separate `src/app/index.html` contains one, but its existence does not
establish that the current entry uses it. Trace actual imports and browser
observations before attributing a flash or override to system preference.

`src/main.tsx` imports `src/styles/index.css`, which imports `globals.css`.
`src/styles/globals.css` already imports theme styles and
`./blocks/book-dark-mode.css`. Do not add a duplicate import as a speculative fix.

Production CSS may be bundled into hashed assets. Do not require a separate
Network request named `blocks/book-dark-mode.css`; inspect loaded stylesheets,
matched rules and computed values.

Token names differ:

- `globals.css` declares `--wp--preset--color--neon-pink: #FF10F0`.
- `themes/dark.css` declares `--color-neon-pink: #FF3AAE` under dark selectors.

These declarations do not establish which rule wins on an element, its
rendered colour or accessibility compliance.

## Verification checklist

For the intended theme and affected route, record:

- Visible control state, root classes, `data-theme` and stored `theme`
- Storage-access and console errors
- Loaded stylesheet responses and rule provenance
- Computed foreground, background, focus and interaction styles
- Text readability, links, buttons, cards and responsive behaviour
- Exact reproduction steps and any differences between header and footer

Do not classify a legitimate light theme as broken or force dark mode because
a component differs from an old colour checklist.

## Reloads and data preservation

A hard reload can help distinguish loaded-resource behaviour from an ordinary
reload. Record the result separately; it is not proof of normal caching or a
permanent fix.

- Chrome/Edge: `Ctrl+Shift+R` on Windows or `Cmd+Shift+R` on Mac
- Firefox: `Ctrl+F5` on Windows or `Cmd+Shift+R` on Mac
- Safari: `Cmd+Option+R`

Do not clear localStorage or sessionStorage, replace the root element's complete
class list or call the ebook preference-clearing API. Preserve reading position,
reader settings and unrelated classes such as cursor-effect preferences.

## Historical guidance and further investigation

The original guide was created on 12 March 2026. It claimed a permanent
always-dark fix, prescribed fixed colours and network filenames, pointed to old
line numbers and recommended forced preferences and destructive resets.
Those assertions are not current validation evidence or safe default remedies.

Follow file paths, selectors and function names rather than stale line numbers:

- `index.html`, `src/main.tsx`, `src/app/App.tsx`, `src/app/routes.ts`
- `src/app/components/common/RootLayout.tsx`, `Header.tsx`, `Footer.tsx`
- `ThemeToggleES5.tsx`, `ThemeSwitcher.tsx`, `ThemeProvider.tsx`
- `src/styles/index.css`, `globals.css`, relevant theme and block styles

Controller reconciliation and any runtime or stylesheet correction require
separate scope and approval. Source inspection did not verify visual behaviour,
initial-render flashing, contrast, keyboard interaction or a permanent fix.
