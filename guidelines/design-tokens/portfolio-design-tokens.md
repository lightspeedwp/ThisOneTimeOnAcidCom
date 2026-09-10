# Portfolio Design Tokens — Comprehensive Reference

**Version:** 1.0.0  
**Created:** March 4, 2026  
**Status:** Living Document

This guideline documents all design tokens created and used across the Ash Shaw Makeup Portfolio project. Design tokens are the atomic design decisions that power the visual consistency of the entire system — colors, typography, spacing, shadows, border radii, and animations.

---

## 📐 Token Philosophy

**Design tokens are:**
- ✅ **Single source of truth** — All visual decisions defined in one place (`/styles/globals.css`)
- ✅ **Semantic naming** — Token names describe purpose, not value (e.g., `--neutral-900` not `--gray-dark`)
- ✅ **Fluid & responsive** — Values scale with viewport using `clamp()` for accessibility
- ✅ **Theme-aware** — Light and dark mode variants defined via `.dark` selector
- ✅ **BEM-compatible** — Applied via CSS classes, never inline (except color swatches in specimens)

**Design tokens are NOT:**
- ❌ Inline styles (forbidden by Guidelines.md)
- ❌ Tailwind utilities (replaced by semantic BEM classes)
- ❌ Hardcoded pixel values scattered across components
- ❌ Magic numbers without documentation

---

## 🎨 Token Categories

### 1. Color Tokens

#### 1.1 Neon Colors (Brand Identity)
**File:** `/styles/globals.css`  
**Reference:** [neon-colors.md](./neon-colors.md)

| Token Name | Hex Value | Usage | Content Type |
|---|---|---|---|
| `--wp--preset--color--neon-pink` | `#FF10F0` | Primary brand, blog accents, buttons | Blog, Makeup |
| `--wp--preset--color--neon-green` | `#39FF14` | Portfolio accents, success states | Portfolio, Cycling |
| `--wp--preset--color--neon-blue` | `#1F51FF` | Links, podcast accents | Podcasts, Code |
| `--wp--preset--color--neon-purple` | `#BE00FE` | Video accents, secondary brand | Videos, Music |
| `--wp--preset--color--neon-orange` | `#FF5F1F` | Event accents, warnings | Events, Travel |
| `--wp--preset--color--neon-yellow` | `#FFFF00` | FAQ accents, highlights | FAQs, Education |
| `--wp--preset--color--neon-cyan` | `#00F7FF` | Content accents, info states | Fitness, ADHD |
| `--wp--preset--color--neon-red` | `#FF3131` | Alerts, error states | Personal, Urgent |

**Application:**
```css
/* BEM class using neon token */
.blog-card {
  border: 2px solid var(--wp--preset--color--neon-pink);
}

.portfolio-badge {
  background: var(--wp--preset--color--neon-green);
  color: var(--wp--preset--color--atomic-black);
}
```

#### 1.2 Neutral Colors (Base Palette)
**File:** `/styles/globals.css`

| Token Name | Light Value | Dark Value | Usage |
|---|---|---|---|
| `--wp--preset--color--atomic-black` | `#0F0F0F` | `#0F0F0F` | Dark mode background, neon contrast |
| `--wp--preset--color--neutral-50` | `#FAFAFA` | — | Light mode background |
| `--wp--preset--color--neutral-100` | `#F5F5F5` | — | Light mode card backgrounds |
| `--wp--preset--color--neutral-200` | `#E5E5E5` | — | Light mode borders |
| `--wp--preset--color--neutral-300` | `#D4D4D4` | — | Light mode subtle text |
| `--wp--preset--color--neutral-600` | `#525252` | — | Light mode body text |
| `--wp--preset--color--neutral-700` | `#404040` | — | Light mode headings |
| `--wp--preset--color--neutral-800` | `#262626` | `#262626` | Dark mode card backgrounds |
| `--wp--preset--color--neutral-900` | `#171717` | `#171717` | Dark mode section backgrounds |

**Theme Switching:**
```css
/* Light mode default */
.page-background {
  background: var(--wp--preset--color--neutral-50);
}

/* Dark mode override */
.dark .page-background {
  background: var(--wp--preset--color--atomic-black);
}
```

#### 1.3 Gradient Tokens
**File:** `/styles/globals.css`  
**Reference:** [neon-colors.md](./neon-colors.md)

| Token Name | Gradient Definition | Usage |
|---|---|---|
| `--wp--preset--gradient--cyberpunk` | `linear-gradient(135deg, #FF10F0 0%, #1F51FF 100%)` | Hero titles, primary CTAs |
| `--wp--preset--gradient--toxic-lime` | `linear-gradient(135deg, #39FF14 0%, #00F7FF 100%)` | Portfolio headers, success messages |
| `--wp--preset--gradient--solar-flare` | `linear-gradient(135deg, #FF5F1F 0%, #FFFF00 100%)` | Event headers, warnings |
| `--wp--preset--gradient--hyperpop` | `linear-gradient(90deg, #FF10F0, #BE00FE, #1F51FF, #00F7FF, #39FF14, #FFFF00, #FF5F1F, #FF3131)` | Animated backgrounds, loading states |

**Application:**
```css
.text-gradient-pink-purple-blue {
  background: var(--wp--preset--gradient--cyberpunk);
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}
```

---

### 2. Typography Tokens

**File:** `/styles/globals.css`  
**Reference:** [typography.md](./typography.md)

#### 2.1 Font Families

| Token Name | Value | Usage |
|---|---|---|
| `--wp--preset--font-family--brand-title` | `'Righteous', cursive` | Hero titles, main headings |
| `--wp--preset--font-family--brand-heading` | `'Playfair Display', serif` | Section headings, card titles |
| `--wp--preset--font-family--brand-body` | `'Inter', sans-serif` | Body text, UI elements |

**Variable Font Loading:**
```css
@font-face {
  font-family: 'Inter';
  src: url('https://fonts.googleapis.com/css2?family=Inter:wght@100..900&display=swap');
  font-display: swap;
  font-weight: 100 900; /* Variable font range */
}
```

#### 2.2 Font Size Scale (Fluid Typography)

**Base Scale:** 16px → 20px (viewport-responsive via `clamp()`)

| Token Name | Min Size | Max Size | Usage |
|---|---|---|---|
| `--wp--preset--font-size--100` | `0.75rem` (12px) | `0.875rem` (14px) | Captions, metadata |
| `--wp--preset--font-size--200` | `0.875rem` (14px) | `1rem` (16px) | Small body text, labels |
| `--wp--preset--font-size--300` | `1rem` (16px) | `1.125rem` (18px) | Base body text |
| `--wp--preset--font-size--400` | `1.125rem` (18px) | `1.25rem` (20px) | Large body, card titles |
| `--wp--preset--font-size--500` | `1.25rem` (20px) | `1.5rem` (24px) | H3 headings |
| `--wp--preset--font-size--600` | `1.5rem` (24px) | `2rem` (32px) | H2 headings |
| `--wp--preset--font-size--700` | `2rem` (32px) | `3rem` (48px) | H1 headings |
| `--wp--preset--font-size--800` | `2.5rem` (40px) | `4rem` (64px) | Section headings |
| `--wp--preset--font-size--900` | `3rem` (48px) | `7.5rem` (120px) | Hero titles |

**Fluid Typography Classes:**
```css
.text-hero-h1 {
  font-size: clamp(2.25rem, 2.036rem + 1.071vw, 3rem); /* 36px → 48px */
  font-family: var(--wp--preset--font-family--brand-title);
}

.text-body-p {
  font-size: clamp(1rem, 0.964rem + 0.179vw, 1.125rem); /* 16px → 18px */
  font-family: var(--wp--preset--font-family--brand-body);
}
```

#### 2.3 Font Weight Tokens

| Token Name | Value | Usage |
|---|---|---|
| `--wp--preset--font-weight--light` | `300` | Subtle text, disclaimers |
| `--wp--preset--font-weight--regular` | `400` | Body text default |
| `--wp--preset--font-weight--medium` | `500` | Emphasis, labels |
| `--wp--preset--font-weight--semibold` | `600` | Card titles, buttons |
| `--wp--preset--font-weight--bold` | `700` | Headings, strong emphasis |
| `--wp--preset--font-weight--black` | `900` | Hero titles, impact text |

#### 2.4 Line Height Tokens

| Token Name | Value | Usage |
|---|---|---|
| `--wp--preset--line-height--tight` | `1.1` | Hero titles, display text |
| `--wp--preset--line-height--snug` | `1.3` | Headings |
| `--wp--preset--line-height--normal` | `1.5` | UI elements, short text |
| `--wp--preset--line-height--relaxed` | `1.7` | Body paragraphs, long-form content |
| `--wp--preset--line-height--loose` | `2.0` | Poetry, special formatting |

---

### 3. Spacing Tokens

**File:** `/styles/globals.css`  
**Reference:** [spacing.md](./spacing.md)

#### 3.1 Base Scale

| Token Name | Value | Usage |
|---|---|---|
| `--wp--preset--spacing--xs` | `0.5rem` (8px) | Tight spacing, inline elements |
| `--wp--preset--spacing--sm` | `1rem` (16px) | Small gaps, padding |
| `--wp--preset--spacing--md` | `1.5rem` (24px) | Default spacing |
| `--wp--preset--spacing--lg` | `2rem` (32px) | Section padding |
| `--wp--preset--spacing--xl` | `3rem` (48px) | Large section gaps |
| `--wp--preset--spacing--2xl` | `4rem` (64px) | Major section dividers |
| `--wp--preset--spacing--3xl` | `6rem` (96px) | Hero section spacing |

#### 3.2 Fluid Spacing (Viewport-Responsive)

| Token Name | Min Size | Max Size | Usage |
|---|---|---|---|
| `--wp--preset--spacing--fluid-sm` | `1rem` | `1.5rem` | Card padding |
| `--wp--preset--spacing--fluid-md` | `1.5rem` | `2.5rem` | Section padding |
| `--wp--preset--spacing--fluid-lg` | `2rem` | `4rem` | Large section spacing |
| `--wp--preset--spacing--fluid-xl` | `3rem` | `6rem` | Hero section spacing |
| `--wp--preset--spacing--fluid-2xl` | `4rem` | `8rem` | Major page dividers |

**Application:**
```css
.section-padding {
  padding-top: var(--wp--preset--spacing--fluid-xl);
  padding-bottom: var(--wp--preset--spacing--fluid-xl);
}
```

#### 3.3 Horizontal Section Padding

| Token Name | Value | Usage |
|---|---|---|
| `--wp--preset--spacing--section-horizontal` | `clamp(1rem, 5vw, 3rem)` | Left/right page margins |

---

### 4. Layout Tokens

**File:** `/styles/globals.css`  
**Reference:** [spacing.md](./spacing.md)

#### 4.1 Container Max Widths

| Token Name | Value | Usage |
|---|---|---|
| `--wp--preset--layout--content` | `800px` | Long-form reading content |
| `--wp--preset--layout--wide` | `1440px` | Standard desktop layouts |
| `--wp--preset--layout--desktop-wide` | `1568px` | Wide desktop (4 columns) |
| `--wp--preset--layout--ultra-wide` | `1768px` | Ultra-wide displays (4-5 columns) |
| `--wp--preset--layout--desktop-xl` | `1800px` | Extra large desktop (5 columns) |
| `--wp--preset--layout--full-hd` | `1920px` | Full HD displays (5-6 columns) |
| `--wp--preset--layout--full` | `100%` | Full viewport width |

**Application:**
```css
.container-wide {
  max-width: var(--wp--preset--layout--wide);
  margin: 0 auto;
  padding: 0 var(--wp--preset--spacing--section-horizontal);
}
```

#### 4.2 Breakpoint Tokens

| Token Name | Min Width | Usage |
|---|---|---|
| `--wp--breakpoint--mobile-compact` | `320px` | 1 column |
| `--wp--breakpoint--mobile` | `480px` | 1-2 columns |
| `--wp--breakpoint--small` | `600px` | 2 columns |
| `--wp--breakpoint--tablet-portrait` | `768px` | 2-3 columns |
| `--wp--breakpoint--tablet-landscape` | `1024px` | 3 columns |
| `--wp--breakpoint--wide` | `1280px` | 3-4 columns |
| `--wp--breakpoint--desktop` | `1440px` | 3-4 columns |
| `--wp--breakpoint--desktop-wide` | `1568px` | 4 columns |
| `--wp--breakpoint--ultra-wide` | `1768px` | 4-5 columns |
| `--wp--breakpoint--desktop-xl` | `1800px` | 5 columns |
| `--wp--breakpoint--full-hd` | `1920px` | 5-6 columns |

**Usage:**
```css
.grid-responsive {
  display: grid;
  grid-template-columns: repeat(1, 1fr);
}

@media (min-width: 768px) {
  .grid-responsive {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (min-width: 1024px) {
  .grid-responsive {
    grid-template-columns: repeat(3, 1fr);
  }
}
```

---

### 5. Shadow Tokens

**File:** `/styles/globals.css`

| Token Name | Value | Usage |
|---|---|---|
| `--wp--preset--shadow--xs` | `0 1px 2px rgba(0,0,0,0.05)` | Subtle lift |
| `--wp--preset--shadow--sm` | `0 1px 3px rgba(0,0,0,0.1)` | Card hover state |
| `--wp--preset--shadow--md` | `0 4px 6px rgba(0,0,0,0.1)` | Floating elements |
| `--wp--preset--shadow--lg` | `0 10px 15px rgba(0,0,0,0.1)` | Modals, popovers |
| `--wp--preset--shadow--xl` | `0 20px 25px rgba(0,0,0,0.15)` | Major elevation |
| `--wp--preset--shadow--2xl` | `0 25px 50px rgba(0,0,0,0.25)` | Maximum depth |

**Neon Glow Shadows:**

| Token Name | Value | Usage |
|---|---|---|
| `--wp--preset--shadow--neon-pink` | `0 0 20px rgba(255, 16, 240, 0.6)` | Pink glow effect |
| `--wp--preset--shadow--neon-green` | `0 0 20px rgba(57, 255, 20, 0.6)` | Green glow effect |
| `--wp--preset--shadow--neon-blue` | `0 0 20px rgba(31, 81, 255, 0.6)` | Blue glow effect |

**Application:**
```css
.card-elevated {
  box-shadow: var(--wp--preset--shadow--md);
}

.button-neon-glow {
  box-shadow: var(--wp--preset--shadow--neon-pink);
}
```

---

### 6. Border Radius Tokens

**File:** `/styles/globals.css`

| Token Name | Value | Usage |
|---|---|---|
| `--wp--preset--border-radius--none` | `0` | Sharp edges |
| `--wp--preset--border-radius--sm` | `0.25rem` (4px) | Subtle rounding |
| `--wp--preset--border-radius--md` | `0.5rem` (8px) | Default cards |
| `--wp--preset--border-radius--lg` | `0.75rem` (12px) | Prominent elements |
| `--wp--preset--border-radius--xl` | `1rem` (16px) | Hero cards |
| `--wp--preset--border-radius--2xl` | `1.5rem` (24px) | Large containers |
| `--wp--preset--border-radius--full` | `9999px` | Circular buttons, pills |
| `--wp--preset--border-radius--pill` | `50rem` | Pill-shaped badges |

**Application:**
```css
.badge {
  border-radius: var(--wp--preset--border-radius--pill);
}

.card {
  border-radius: var(--wp--preset--border-radius--md);
}
```

---

### 7. Animation Tokens

**File:** `/styles/globals.css`  
**Reference:** [animations.md](./animations.md)

#### 7.1 Timing Function Tokens

| Token Name | Value | Usage |
|---|---|---|
| `--wp--preset--timing--linear` | `linear` | Constant speed |
| `--wp--preset--timing--ease` | `ease` | Default easing |
| `--wp--preset--timing--ease-in` | `ease-in` | Slow start |
| `--wp--preset--timing--ease-out` | `ease-out` | Slow end |
| `--wp--preset--timing--ease-in-out` | `ease-in-out` | Slow start & end |

#### 7.2 Duration Tokens

| Token Name | Value | Usage |
|---|---|---|
| `--wp--preset--duration--fast` | `150ms` | Micro-interactions |
| `--wp--preset--duration--normal` | `250ms` | Default transitions |
| `--wp--preset--duration--slow` | `400ms` | Deliberate animations |
| `--wp--preset--duration--slower` | `600ms` | Emphasis animations |

#### 7.3 Named Animations (26 Keyframes)

**Reference:** See [animations.md](./animations.md) for complete list.

Key animations:
- `neon-pulse` — Breathing glow effect
- `gradient-shift` — Color gradient animation
- `float` — Gentle vertical bobbing
- `bounce-in` — Energetic entrance
- `slide-in-up` — Upward reveal
- `rotate-continuous` — 360° rotation
- `shake` — Attention grab
- `blink-neon` — Strobe effect

**Application:**
```css
.neon-text {
  animation: neon-pulse 2s ease-in-out infinite;
}

@media (prefers-reduced-motion: reduce) {
  .neon-text {
    animation: none;
  }
}
```

---

## 🎯 Content-Type Color Mapping

Each content type has a dedicated neon accent color used consistently across:
- Card borders
- Category badges
- Icon highlights
- Link hover states
- Markdown elements (headings, lists, code blocks, tables)

| Content Type | Primary Neon | CSS Variable | Markdown Classes Prefix |
|---|---|---|---|
| Blog | Pink | `--wp--preset--color--neon-pink` | `.blog-*` |
| Portfolio | Green | `--wp--preset--color--neon-green` | `.portfolio-*` |
| Video | Purple | `--wp--preset--color--neon-purple` | `.video-*` |
| Podcast | Blue | `--wp--preset--color--neon-blue` | `.podcast-*` |
| Event | Orange | `--wp--preset--color--neon-orange` | `.event-*` |
| FAQ | Yellow | `--wp--preset--color--neon-yellow` | `.faq-*` |
| Content (generic) | Cyan | `--wp--preset--color--neon-cyan` | `.content-*` |

**Example Markdown Class Pattern:**

```css
/* Blog markdown uses neon pink */
.blog-h2 {
  border-bottom: 2px solid var(--wp--preset--color--neon-pink);
}

.blog-link {
  color: var(--wp--preset--color--neon-pink);
}

.blog-table th {
  background: var(--wp--preset--color--neon-pink);
}

/* Portfolio markdown uses neon green */
.portfolio-h2 {
  border-bottom: 2px solid var(--wp--preset--color--neon-green);
}

.portfolio-link {
  color: var(--wp--preset--color--neon-green);
}

.portfolio-table th {
  background: var(--wp--preset--color--neon-green);
}
```

---

## 📋 Token Usage Guidelines

### DO ✅

1. **Always use tokens via CSS variables:**
   ```css
   .element {
     color: var(--wp--preset--color--neon-pink);
     padding: var(--wp--preset--spacing--md);
     border-radius: var(--wp--preset--border-radius--md);
   }
   ```

2. **Apply tokens through BEM classes:**
   ```tsx
   <div className="card card--featured">
     <h2 className="card__title">Title</h2>
   </div>
   ```

3. **Use fluid tokens for responsive scaling:**
   ```css
   .section {
     padding: var(--wp--preset--spacing--fluid-xl) 
              var(--wp--preset--spacing--section-horizontal);
   }
   ```

4. **Provide dark mode variants:**
   ```css
   .card {
     background: var(--wp--preset--color--neutral-100);
   }
   
   .dark .card {
     background: var(--wp--preset--color--neutral-900);
   }
   ```

### DON'T ❌

1. **Never use hardcoded values:**
   ```css
   /* ❌ WRONG */
   .element {
     color: #FF10F0;
     padding: 24px;
     border-radius: 8px;
   }
   ```

2. **Never use Tailwind utilities:**
   ```tsx
   {/* ❌ WRONG */}
   <div className="flex items-center gap-4 p-6 rounded-lg">
   ```

3. **Never use inline styles (except color swatches in specimen pages):**
   ```tsx
   {/* ❌ WRONG */}
   <div style={{ padding: '24px', color: '#FF10F0' }}>
   ```

4. **Never skip accessibility considerations:**
   ```css
   /* ❌ WRONG - no reduced motion support */
   .element {
     animation: spin 1s infinite;
   }
   
   /* ✅ CORRECT */
   .element {
     animation: spin 1s infinite;
   }
   
   @media (prefers-reduced-motion: reduce) {
     .element {
       animation: none;
     }
   }
   ```

---

## 🔗 Related Guidelines

- **[neon-colors.md](./neon-colors.md)** — Complete neon color system documentation
- **[animations.md](./animations.md)** — All 26 animation keyframes reference
- **[typography.md](./typography.md)** — Typography scale and hierarchy
- **[spacing.md](./spacing.md)** — Spacing system and responsive patterns
- **[dark-mode-implementation.md](../dark-mode-implementation.md)** — Dark mode system guide
- **[prefers-reduced-motion.md](../prefers-reduced-motion.md)** — Accessibility animation guidelines

---

## 📝 Token Creation Workflow

When adding new design tokens:

1. **Define the token in `/styles/globals.css`:**
   ```css
   --wp--preset--color--new-accent: #ABC123;
   ```

2. **Create BEM class using the token:**
   ```css
   .new-component {
     color: var(--wp--preset--color--new-accent);
   }
   ```

3. **Document the token in this file** — Add to appropriate category table

4. **Add dark mode variant if needed:**
   ```css
   .dark .new-component {
     color: var(--wp--preset--color--new-accent-dark);
   }
   ```

5. **Test across all breakpoints** — Verify fluid scaling works

6. **Update specimen pages** if token affects content-type styling

---

## 🎓 Token Naming Conventions

### Prefix Pattern

All WordPress-compatible tokens use the prefix: `--wp--preset--{category}--{name}`

**Categories:**
- `color` — Color values
- `font-family` — Font stacks
- `font-size` — Type scale
- `font-weight` — Weight values
- `line-height` — Leading values
- `spacing` — Spacing scale
- `layout` — Container widths
- `shadow` — Shadow definitions
- `border-radius` — Rounding values
- `gradient` — Gradient definitions
- `timing` — Animation timing functions
- `duration` — Animation durations

### Naming Best Practices

✅ **Semantic names** (describe purpose, not appearance):
- `--wp--preset--color--neutral-900` ✅
- `--wp--preset--color--dark-gray` ❌

✅ **Consistent scale** (use numeric scales for gradations):
- `--wp--preset--font-size--100` through `--wp--preset--font-size--900` ✅
- `--wp--preset--font-size--small`, `--wp--preset--font-size--medium` ❌

✅ **Clear hierarchy**:
- `--wp--preset--spacing--xs`, `--wp--preset--spacing--sm`, `--wp--preset--spacing--md` ✅
- `--wp--preset--spacing--tiny`, `--wp--preset--spacing--biggish` ❌

---

## 🚀 Next Steps

1. **Expand markdown specimens** — Implement `/prompts/content-specimens-markdown-expansion.md`
2. **Audit token usage** — Ensure all components use tokens consistently
3. **Create token migration script** — Auto-replace hardcoded values with tokens
4. **Build token visualization tool** — Interactive specimen page showing all tokens

---

**Version History:**
- v1.0.0 (March 4, 2026) — Initial comprehensive token documentation

**Maintained by:** Ash Shaw Portfolio Team  
**Last Updated:** March 4, 2026
