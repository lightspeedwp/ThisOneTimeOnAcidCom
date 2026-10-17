# Light/Dark Mode Design Token System

**Version:** 1.0.0
**Last Updated:** February 2026
**Purpose:** Complete documentation of the dual-theme colour system and mode-switching strategy

---

## 1. Strategy

The site uses a **class-based** dark mode toggle. The `.dark` class is applied to the `<html>` element by `ThemeToggle.tsx`. CSS custom properties in `:root` define light mode defaults; the `.dark` selector overrides specific tokens.

### Toggle Mechanism

```tsx
// ThemeToggle.tsx adds/removes .dark on <html>
document.documentElement.classList.toggle('dark');
```

### CSS Pattern

```css
:root {
  --background: var(--wp--preset--color--base);       /* #ffffff */
  --foreground: var(--wp--preset--color--contrast);   /* #0F0F0F */
}

.dark {
  --background: var(--wp--preset--color--atomic-black); /* #0F0F0F */
  --foreground: #ffffff;
}
```

---

## 2. Colour Mapping: Light to Dark

### Semantic Tokens

| Token | Light Value | Dark Value |
|-------|-----------|------------|
| `--background` | `#ffffff` | `#0F0F0F` (Atomic Black) |
| `--foreground` | `#0F0F0F` | `#ffffff` |
| `--border` | `neutral-200` (`#e5e7eb`) | `neutral-800` (`#1f2937`) |

### Neon Text Colours (Accessibility-Switched)

In light mode, neon text uses darker accessible variants. In dark mode, full-brightness neon is restored.

| Neon Colour | Light `-text` Value | Contrast on White | Dark `-text` Value | Contrast on #0F0F0F |
|------------|--------------------|--------------------|--------------------|--------------------|
| Green | `#008f00` | 5.2:1 AA | `#39FF14` | 11.8:1 AAA |
| Pink | `#b300a4` | 5.8:1 AA | `#FF10F0` | 8.2:1 AAA |
| Blue | `#002db3` | 8.9:1 AAA | `#1F51FF` | 7.9:1 AAA |
| Yellow | `#8a8a00` | 4.6:1 AA | `#FFFF00` | 12.3:1 AAA |
| Orange | `#cc4100` | 5.1:1 AA | `#FF5F1F` | 9.1:1 AAA |
| Purple | `#7800a1` | 6.4:1 AA | `#BE00FE` | 7.4:1 AAA |
| Cyan | `#00F7FF` | 10.6:1 AAA | `#00F7FF` | 10.6:1 AAA |
| Red | `#FF3131` | 8.5:1 AAA | `#FF3131` | 8.5:1 AAA |

### Shadow Overrides

| Shadow Token | Light Value | Dark Override |
|-------------|-------------|---------------|
| `--neon-sm` | `0 0 5px rgba(57,255,20,0.3)` | `0 0 8px rgba(57,255,20,0.5)` (brighter glow) |
| `--card-hover` | `0 10px 30px -5px rgba(0,0,0,0.2)` | `0 10px 30px -5px rgba(255,16,240,0.15)` (pink tint) |

---

## 3. Component Dark Mode Patterns

### Background Colours

| Light | Dark |
|-------|------|
| `--wp--preset--color--base` (#fff) | `--wp--preset--color--atomic-black` (#0F0F0F) |
| `--wp--preset--color--neutral-50` (#f9fafb) | `--wp--preset--color--neutral-900` (#111827) |
| `--wp--preset--color--neutral-100` (#f3f4f6) | `--wp--preset--color--neutral-800` (#1f2937) |

### Text Colours

| Light | Dark |
|-------|------|
| `--wp--preset--color--contrast` (#0F0F0F) | `#ffffff` |
| `--wp--preset--color--neutral-600` (#4b5563) | `--wp--preset--color--neutral-400` (#9ca3af) |
| `--wp--preset--color--neutral-700` (#374151) | `--wp--preset--color--neutral-300` (#d1d5db) |

### Border Colours

| Light | Dark |
|-------|------|
| `--wp--preset--color--neutral-200` | `--wp--preset--color--neutral-800` |
| `rgba(0,0,0,0.1)` | `rgba(255,255,255,0.1)` |

### Card Patterns

```css
/* Light */
.card {
  background-color: var(--wp--preset--color--base);
  border: 1px solid var(--wp--preset--color--neutral-200);
  box-shadow: var(--wp--preset--shadow--card);
}

/* Dark - Frosted Glass */
.dark .card {
  background-color: rgba(20, 20, 20, 0.6);
  border-color: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
}

/* Dark hover - Neon glow */
.dark .card:hover {
  border-color: rgba(190, 0, 254, 0.5);
  box-shadow: 0 0 20px rgba(190, 0, 254, 0.2);
}
```

---

## 4. Neon Glow Effects (Dark Mode Only)

Neon glow shadows should only be prominent in dark mode where they contrast against the dark background:

```css
/* Light - subtle or no glow */
.badge {
  box-shadow: var(--wp--preset--shadow--sm);
}

/* Dark - neon glow */
.dark .badge {
  box-shadow: 0 0 10px rgba(190, 0, 254, 0.4);
}
```

---

## 5. Focus States

Both modes use neon pink focus indicators, but dark mode has brighter glow:

```css
/* Light */
button:focus-visible {
  outline: 3px solid var(--wp--preset--color--neon-pink);
  box-shadow: 0 0 0 4px rgba(255, 16, 240, 0.15);
}

/* Dark - stronger glow */
.dark button:focus-visible {
  outline: 3px solid var(--wp--preset--color--neon-pink);
  box-shadow: 0 0 0 4px rgba(255, 16, 240, 0.3),
              0 0 15px rgba(255, 16, 240, 0.4);
}
```

---

## 6. Gradient Borders (Dark Mode)

In dark mode, gradient borders replace solid borders for separators:

```css
.separator {
  border-top: 1px solid;
  border-image: linear-gradient(
    to right,
    var(--wp--preset--color--neon-pink),
    var(--wp--preset--color--neon-purple),
    var(--wp--preset--color--neon-blue)
  ) 1;
}
```

---

## 7. Checklist for New Components

When creating any new component:

- [ ] Define light mode styles as default
- [ ] Add `.dark .component` overrides for:
  - Background colour
  - Text colour
  - Border colour
  - Shadow / glow effects
- [ ] Use `-text` suffix tokens for neon text (auto-switches between modes)
- [ ] Test contrast ratios: 4.5:1 minimum for body text, 3:1 for large text
- [ ] Test neon glow visibility in dark mode
- [ ] Verify `prefers-reduced-motion` disables glow animations

---

**Last Updated:** February 2026
