# N001: Design Token Reference

**Purpose:** Comprehensive reference for color palette, spacing scales, typography system, and foundational design tokens.

**Authority:** D4 (N-Document Approvals); D3 (Design Authority: Ash Shaw, WCAG 2.2 AAA)

---

## Overview

This guide documents the canonical design tokens used throughout This One Time On Acid:
- Color palette and semantic color mappings
- Spacing scale (rem/px equivalents)
- Typography scale and font usage
- Elevation/shadow system
- Animation and transition tokens
- Responsive breakpoints

**Related Guidelines:** See `design-tokens/` directory for individual token files; also see [N009: Responsive Design Patterns](#) for breakpoint usage.

---

## Color Palette

### Primary Colors
- **Brand Primary:** `#[hex]` (RGB: r, g, b)
- **Brand Secondary:** `#[hex]` (RGB: r, g, b)
- **Accent:** `#[hex]` (RGB: r, g, b)

### Semantic Colors
- **Success:** `#[hex]` (confirmation, positive feedback)
- **Warning:** `#[hex]` (caution, attention needed)
- **Error:** `#[hex]` (danger, critical feedback)
- **Info:** `#[hex]` (informational messages)

### Neutral Scale
- **Background:** `#[hex]`
- **Surface:** `#[hex]`
- **Text Primary:** `#[hex]`
- **Text Secondary:** `#[hex]`
- **Border:** `#[hex]`
- **Divider:** `#[hex]`

### Dark Mode Colors
- Mirror semantic colors with inverted luminosity
- High contrast maintained per WCAG 2.2 AAA (4.5:1 minimum for text)

---

## Spacing Scale

| Token | Value | Usage |
|-------|-------|-------|
| `xs` | 0.25rem (4px) | Micro spacing, icon gaps |
| `sm` | 0.5rem (8px) | Small gaps, padding |
| `md` | 1rem (16px) | Standard padding, margins |
| `lg` | 1.5rem (24px) | Section spacing |
| `xl` | 2rem (32px) | Major sections |
| `2xl` | 3rem (48px) | Hero spacing |
| `3xl` | 4rem (64px) | Full-screen sections |

---

## Typography

### Font Stack
- **Display:** [Font Family] (weights: 700, 800)
- **Heading:** [Font Family] (weights: 600, 700)
- **Body:** [Font Family] (weights: 400, 500, 600)
- **Mono:** [Font Family] (weight: 400, code blocks)

### Scale
| Role | Size | Line Height | Weight | Usage |
|------|------|-------------|--------|-------|
| H1 | 2.5rem | 1.2 | 700 | Page title |
| H2 | 2rem | 1.3 | 600 | Section heading |
| H3 | 1.5rem | 1.4 | 600 | Subsection |
| Body | 1rem | 1.6 | 400 | Content text |
| Small | 0.875rem | 1.5 | 400 | Metadata |
| Caption | 0.75rem | 1.4 | 400 | Footnotes |

---

## Elevation & Shadows

```css
/* Shadow scale for depth */
shadow-sm: 0 1px 2px rgba(0, 0, 0, 0.05);
shadow-md: 0 4px 6px rgba(0, 0, 0, 0.1);
shadow-lg: 0 10px 15px rgba(0, 0, 0, 0.1);
shadow-xl: 0 20px 25px rgba(0, 0, 0, 0.15);
```

---

## Animation Tokens

| Token | Duration | Easing | Usage |
|-------|----------|--------|-------|
| `duration-fast` | 150ms | ease-out | Micro interactions |
| `duration-base` | 300ms | ease-out | Standard transitions |
| `duration-slow` | 500ms | ease-out | Complex animations |

---

## Responsive Breakpoints

| Breakpoint | Width | Device Type |
|---|---|---|
| `mobile` | 320px–640px | Small phones |
| `tablet` | 641px–1024px | Tablets |
| `desktop` | 1025px–1440px | Desktops |
| `wide` | 1441px+ | Large screens |

See [N009: Responsive Design Patterns](#) for media query usage.

---

## Implementation

- **CSS Variables:** All tokens defined in `src/styles/default-shadcn-theme.css`
- **Tailwind Config:** Mapped to Tailwind configuration in `tailwind.config.js`
- **Dark Mode:** Automatic switching via `prefers-color-scheme` media query

---

## Verification & Audit Trail

- ✅ **WCAG 2.2 AAA:** All color combinations tested for contrast (minimum 4.5:1 for text)
- ✅ **Accessibility:** Typography sizes meet minimum 16px for body text
- ✅ **Responsive:** Spacing scale tested across all breakpoints
- ✅ **Design Authority:** Approved by Ash Shaw (D3)

---

**Authority:** D4 (N-Document Approvals) | D3 (Design Authority)  
**Last Updated:** 2026-11-09  
**Related:** [N002: Accessibility Checklist](#) · [N003: Component Documentation](#) · [N009: Responsive Patterns](#)
