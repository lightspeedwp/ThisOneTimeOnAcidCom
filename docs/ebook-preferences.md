# Ebook preferences and settings

Source review: 24 October 2026, revision
`3f583002482d80ffd1910676bcf7c63e13989b20`.
This guide describes inspected source, not a new browser or persistence test.

## Storage contract

The service is [ebookPreferences.ts](../src/app/utils/ebookPreferences.ts).
Keep its existing keys unchanged; no storage migration is proposed.

| Setting | localStorage key | Values | Default |
|---|---|---|---|
| Reading position | `ash-ebook-position` | Page index stored as a string | `0` |
| Font size | `ash-ebook-font-size` | `small`, `medium`, `large`, `x-large` | `medium` |
| Minimal mode | `ash-ebook-minimal-mode` | Strings `true` or `false` | `false` |
| Reader theme | `ash-ebook-theme` | `light`, `dark`, `system` | `system` |
| Fullscreen preference | `ash-ebook-fullscreen-pref` | Strings `true` or `false` | `false` |
| Paging effect | `ash-ebook-paging-effect` | `slide`, `3d-flip`, `fade`, `none` | `3d-flip` |

## Service API

| Setting | Read | Write |
|---|---|---|
| Reading position | `readSavedPage(maxIndex)` | `savePage(pageIndex)` |
| Font size | `readFontSize()` | `saveFontSize(size)` |
| Minimal mode | `readMinimalMode()` | `saveMinimalMode(enabled)` |
| Reader theme | `readTheme()` | `saveTheme(theme)` |
| Fullscreen preference | `readFullscreenPref()` | `saveFullscreenPref(enabled)` |
| Paging effect | `readPagingEffect()` | `savePagingEffect(effect)` |

`readSavedPage(maxIndex)` parses the stored value in base 10. It returns `0`
when the value is missing, cannot be parsed, is negative, exceeds `maxIndex`
or storage access throws. Boolean readers return `true` only for `'true'`.

`readAllPreferences()` reads all six settings but uses `999` as its page limit;
it does not receive the current book length.

`clearAllPreferences()` attempts to remove these six keys, including reading
position. Do not use it as routine troubleshooting. Storage errors are caught:
reads fall back and failed writes are silent, so persistence is not guaranteed.

## Current reader integration

[EbookPage.tsx](../src/app/components/pages/about/EbookPage.tsx) reads and
persists position, font size, minimal mode and paging effect. Its initial
position read uses the static book length; later pagination changes adjust
the current position.

`FONT_SIZE_SCALE` maps `small`, `medium`, `large` and `x-large` to
`0.875`, `1`, `1.125` and `1.25`. The reader applies the scale through
`--ebook-font-scale`. Minimal mode adds `.ebook-reader--minimal`.

The page manages fullscreen through component state and the browser
Fullscreen API, not the service's fullscreen preference. It does not call the
service's reader-theme functions.

## Reader theme versus site controls

The service's `ash-ebook-theme` is separate from the site key `theme`.

The header renders `ThemeToggleES5.tsx`, which maintains independent light/dark
state. The footer renders `ThemeSwitcher.tsx`, which uses `ThemeProvider.tsx`
context. The reviewed application entry does not mount that provider; its hook
defines a fallback value and no-op setter when context is absent.

Do not describe these controllers as one synchronised preference system or
assume the footer reflects the header. See
[theme troubleshooting](dark-mode-troubleshooting.md) for source tracing and
read-only diagnostics. Controller reconciliation requires separate approval.
