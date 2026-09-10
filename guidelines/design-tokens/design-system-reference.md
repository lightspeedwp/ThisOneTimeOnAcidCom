# Complete Design System Reference

**Version:** 9.0.0  
**Last Updated:** March 7, 2026  
**Project:** Ash Shaw Makeup Portfolio

---

## Table of Contents

1. [Color System](#color-system)
2. [Gradients](#gradients)
3. [Typography](#typography)
4. [Spacing](#spacing)
5. [Animations](#animations)
6. [Iconography](#iconography)
7. [Light/Dark Mode](#lightdark-mode)

---

## Color System

### Philosophy: Neon vs Atomic Black

The Ash Shaw Makeup Portfolio uses a bold **Neon vs Atomic Black** visual identity that reflects the vibrant, energetic nature of makeup artistry and Berlin techno culture.

**Core Principle:** Pair neon colors against very dark backgrounds like `#000000` (Pure Black) or `#0F0F0F` (Atomic Black) to create maximum contrast and visual "pop." Simulate physical glow using `text-shadow` or `box-shadow` for luminous halo effects.

---

### Core Neon Palette

These are the 8 foundational neon colors used throughout the site:

| Color Name | Hex Code | CSS Variable | Description |
|---|---|---|---|
| **Neon Green** | `#39FF14` | `--wp--preset--color--neon-green` | Electric Lime — classic high-visibility glow |
| **Neon Pink** | `#FF10F0` | `--wp--preset--color--neon-pink` | Hot pink with strong violet undertone |
| **Neon Blue** | `#1F51FF` | `--wp--preset--color--neon-blue` | Vivid electric cerulean |
| **Neon Yellow** | `#FFFF00` | `--wp--preset--color--neon-yellow` | Pure digital yellow (Laser Yellow) |
| **Neon Orange** | `#FF5F1F` | `--wp--preset--color--neon-orange` | Bright punchy orange |
| **Neon Purple** | `#BE00FE` | `--wp--preset--color--neon-purple` | Deep electric violet |
| **Neon Cyan** | `#00F7FF` | `--wp--preset--color--neon-cyan` | Electric aqua |
| **Neon Red** | `#FF3131` | `--wp--preset--color--neon-red` | Vibrant hot red |

---

### Electric Variations

Specialized neon variations for specific design needs:

- **Electric Cyan/Aqua:** `#00F7FF` — Brighter than standard cyan
- **Electric Magenta:** `#FF0090` — Piercing reddish-pink
- **Electric Violet:** `#8B5DFF` — Softer purple variation

---

### Neon Color Pairings

#### Neon Green (`#39FF14`)

**Best Paired With:**
- **Complementary:** Deep Magenta `#FF00FF` or Electric Violet `#8B5DFF`
- **Grounding Neutrals:** Atomic Black `#0F0F0F` or Charcoal Gray `#333333`
- **Secondary Accents:** Royal Blue `#305CDE`

**Similar Shades:**
- Green `#00FF00`
- Seafoam Green `#98FF98`
- Yellow Green `#9ACD32`
- Forest Green `#228B22`
- Lime Green `#32CD32`

---

#### Neon Pink (`#FF10F0`)

**Best Paired With:**
- **Complementary:** Mint Green `#10FF20` or Teal/Cyan `#00F7FF` (synthwave aesthetic)
- **Refining Pairings:** Mauve `#E0AFFF` or Lavender `#D3D3FF`
- **Avoid:** Peachy tones or low-saturation oranges

---

#### Neon Blue (`#1F51FF`)

**Best Paired With:**
- **Complementary:** Neon Orange `#FF5C00` or Mustard Yellow `#FFCE1B`
- **Professional Contrast:** Navy Blue `#000080` or Silver `#C4C4C4`
- **High Energy:** Bright Yellow `#FFED29`

---

#### Neon Yellow (`#FFFF00`)

**Usage Note:** Notoriously difficult on the eyes — requires dark, heavy backgrounds.

**Best Paired With:**
- **Complementary:** Deep Purple `#9D00FF` or Navy Blue `#000080`
- **Modern Professional:** Ultimate Gray `#939597`
- **Fresh Contrast:** Mint Green `#ADEBB3` or Light Blue `#90D5FF`

---

### 33 Curated Color Palettes

The design system includes 33 professionally curated neon color palettes organized by theme and use case. Each palette is designed for specific interface contexts and emotional impact.

#### Palette 1: Cyberpunk Classic
**Colors:** Pink `#FF10F0`, Blue `#1F51FF`  
**Use Cases:** Hero sections, CTAs, high-energy landing pages  
**Mood:** Futuristic, tech-forward, electric

#### Palette 2: Toxic Lime
**Colors:** Neon Green `#39FF14`, Cyan `#00F7FF`  
**Use Cases:** Fresh tech interfaces, environmental themes, energy  
**Mood:** High-energy, futuristic, clean

#### Palette 3: Solar Flare
**Colors:** Neon Orange `#FF5F1F`, Yellow `#FFFF00`  
**Use Cases:** High-visibility alerts, energetic branding, warnings  
**Mood:** Urgent, energetic, attention-grabbing

#### Palette 4: Hyperpop Fusion
**Colors:** Deep Lilac `#9955BB`, Hot Pink `#FF69B3`, Creme De Banane `#FFFF99`, Turquoise `#2BD9C6`, Soft Navy Blue `#43318F`  
**Use Cases:** Playful interfaces, music/festival branding  
**Mood:** Vibrant, youthful, maximalist

#### Palette 5: Bright Neons
**Colors:** Electric Purple `#CB0FFF`, Digital Yellow `#FDFF00`, Laser Green `#38FF12`, Bright Indigo `#6600FF`, Aqua `#00F7FF`  
**Use Cases:** Dashboard UI, data visualization, neon art  
**Mood:** Electric, high-contrast, bold

#### Palette 6: All Bright
**Colors:** Full Green `#0DFF00`, Vibrant Purple `#A600FF`, Bright Pink `#FF007B`, Hot Yellow `#FFD900`, Vibrant Blue `#0014F1`, Vivid Cyan `#00EAFF`  
**Use Cases:** Festival posters, maximalist designs  
**Mood:** Saturated, joyful, explosive

#### Palette 7: Tribal Facepaint
**Colors:** Deep Black `#040203`, Electric Green `#73EB1E`, Valentine `#EB1F5B`, Marine Blue `#157FD1`  
**Use Cases:** Editorial photography, makeup portfolios  
**Mood:** Tribal, artistic, cultural

#### Palette 8: Neon Gradient
**Colors:** Laser Green `#39FF14`, Pure Lime Green `#88FF0C`, Spring Bud `#B0FF08`, Bright Yellowish-Green `#D7FF04`, Digital Yellow `#FFFF00`  
**Use Cases:** Gradient backgrounds, smooth transitions  
**Mood:** Energetic, flowing, progressive

#### Palette 9: DJ Of Love
**Colors:** Red Hot `#F11501`, Yellow Sea `#FEA900`, Digital Yellow `#FFFF00`, Neon Green `#1AFF00`, Bright Magenta `#FF00CE`, Purple (Munsell) `#9F00D0`  
**Use Cases:** Music interfaces, DJ branding, nightlife  
**Mood:** Party, nightlife, electric

#### Palette 10: Neons For Boys
**Colors:** Fuchsia `#FE00F6`, Erin `#05FF51`, Hot Lemon `#EEFF00`, Full White `#FFFFFF`, Vivid Cyan `#00EEFF`, Blue Screen `#1F10FF`  
**Use Cases:** Gaming UI, sports branding  
**Mood:** Bold, masculine, tech

#### Palette 11: Electric Colors
**Colors:** Azure `#037CFE`, Citrine White `#00FFE0`, Lemon `#FFF903`, Vibrant Lime `#94EC0E`, Sporty Pink `#FA0098`  
**Use Cases:** Athletic branding, sports apps  
**Mood:** Active, energetic, sporty

#### Palette 12: Neon And Colorful
**Colors:** Glossy Green `#44EC1E`, Candy Apple Red `#FF2910`, Gold Rush `#FFC422`, Roseine `#E013E0`, Busty Blue `#4411DB`, Turquoise Stone `#0DC1E8`  
**Use Cases:** Playful UI, toy branding, children's content  
**Mood:** Fun, colorful, joyful

---

### Atomic Black Background System

| Background | Hex Code | CSS Variable | Use Case |
|---|---|---|---|
| **Pure Black** | `#000000` | `--wp--preset--color--black` | Maximum contrast, OLED-friendly |
| **Atomic Black** | `#0F0F0F` | `--wp--preset--color--atomic-black` | Primary dark background |
| **Charcoal** | `#333333` | `--wp--preset--color--charcoal` | Secondary dark surfaces |
| **Neutral 900** | `#1A1A1A` | `--wp--preset--color--neutral-900` | Card backgrounds |

---

## Gradients

### 4 Signature Gradients

#### 1. Cyberpunk Classic (Pink to Blue)

**Description:** The quintessential neon look, perfect for hero sections and CTAs.

```css
/* Vivid Magenta to Electric Blue */
background: linear-gradient(135deg, #FF10F0 0%, #1F51FF 100%);
```

**CSS Variable:**
```css
.gradient-cyberpunk {
  background: var(--wp--gradient--cyberpunk);
}
```

**Use Cases:**
- Hero section backgrounds
- Call-to-action buttons
- Featured cards
- Navigation highlights

---

#### 2. Toxic Lime (Neon Green to Cyan)

**Description:** High-energy "tech" vibe that feels fresh and futuristic.

```css
/* Laser Green to Electric Aqua */
background: linear-gradient(to right, #39FF14 0%, #12FFF7 100%);
```

**CSS Variable:**
```css
.gradient-toxic-lime {
  background: var(--wp--gradient--toxic-lime);
}
```

**Use Cases:**
- Fresh tech interfaces
- Environmental/eco themes
- Success states
- Data visualization accents

---

#### 3. Solar Flare (Neon Orange to Yellow)

**Description:** High-visibility gradient for alerts and energetic branding.

```css
/* Electric Orange to Digital Yellow */
background: linear-gradient(45deg, #FF5F1F 0%, #FFFF00 100%);
```

**CSS Variable:**
```css
.gradient-solar-flare {
  background: var(--wp--gradient--solar-flare);
}
```

**Use Cases:**
- Warning/alert states
- High-energy CTAs
- Festival/event branding
- Attention-grabbing headers

---

#### 4. Aurora Mesh Effect (Multi-Radial)

**Description:** Modern design uses multiple radial gradients to create a "glowing cloud" effect. Works beautifully as full-page background on dark themes.

```css
background-color: #000000;
background-image: 
  radial-gradient(at 0% 0%, hsla(285,100%,50%,0.3) 0, transparent 50%), 
  radial-gradient(at 100% 100%, hsla(190,100%,50%,0.3) 0, transparent 50%);
```

**CSS Variable:**
```css
.gradient-aurora {
  background: var(--wp--gradient--aurora);
}
```

**Use Cases:**
- Full-page hero backgrounds
- Section dividers
- Modal/dialog backgrounds
- Ambient design elements

---

### Animated Gradients

#### Electric Aurora (Animated Shift)

**Description:** Makes gradients "breathe" by animating background position. Creates fluid, liquid motion.

```css
.neon-glow-bg {
  /* Step 1: Define colors — make background 400% larger */
  background: linear-gradient(-45deg, #FF10F0, #1F51FF, #00F7FF, #39FF14);
  background-size: 400% 400%;
  
  /* Step 2: Run animation */
  animation: gradientShift 15s ease infinite;
  
  /* Optional: Full-page hero styling */
  width: 100%;
  height: 100vh;
}

/* Step 3: Define movement */
@keyframes gradientShift {
  0% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
  100% {
    background-position: 0% 50%;
  }
}
```

**Reduced Motion Support:**
```css
@media (prefers-reduced-motion: reduce) {
  .neon-glow-bg {
    animation: none;
    background-size: 100% 100%;
  }
}
```

---

#### Neon Pulse (Box-Shadow Animation)

**Description:** Makes elements appear to emit light with pulsing glow.

```css
.neon-card {
  border: 2px solid #39FF14;
  box-shadow: 0 0 10px #39FF14, inset 0 0 5px #39FF14;
  animation: neonPulse 2s infinite alternate;
}

@keyframes neonPulse {
  from {
    box-shadow: 0 0 10px #39FF14, 0 0 20px #39FF14;
  }
  to {
    box-shadow: 0 0 20px #39FF14, 0 0 40px #39FF14;
  }
}
```

**Reduced Motion Support:**
```css
@media (prefers-reduced-motion: reduce) {
  .neon-card {
    animation: none;
    box-shadow: 0 0 10px #39FF14, inset 0 0 5px #39FF14;
  }
}
```

---

### Gradient Implementation Tips

**Text Contrast:**
- Never put thin white text directly over bright yellow or green gradients
- Use dark overlay or keep text bold and black for readability

**Glow Animation:**
- Animate `background-position` to make gradients "breathe"
- Use `background-size: 400% 400%` for smooth shifting

**Performance Optimization:**
- Use `will-change: background-position` for smooth mobile animation
- Dark backgrounds (`#050505`) prevent "muddy" appearance

**Tools:**
- [CSS Gradient](https://cssgradient.io/) — Visual gradient tweaker
- [uiGradients](https://uigradients.com/) — Gradient library

---

## Typography

### Font Stack

```css
/* Headings — Elegant serif */
font-family: var(--wp--preset--font-family--heading);
/* Playfair Display, Georgia, serif */

/* Body Text — Readable sans-serif */
font-family: var(--wp--preset--font-family--body);
/* Inter, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif */

/* Hero Titles — Bold display */
font-family: var(--wp--preset--font-family--title);
/* Righteous, Impact, sans-serif */
```

---

### Fluid Typography Scale

The site uses fluid typography that scales responsively between mobile and desktop viewports.

| Element | Mobile (320px) | Desktop (1920px) | CSS Class |
|---|---|---|---|
| **Hero H1** | 36px | 120px | `.text-hero-h1` |
| **Section H2** | 24px | 48px | `.text-section-h2` |
| **Card H3** | 20px | 32px | `.text-card-h3` |
| **Body P** | 16px | 20px | `.text-body-p` |
| **Small** | 14px | 16px | `.text-small` |

**Implementation:**
```css
/* WordPress-style fluid typography */
.text-hero-h1 {
  font-size: clamp(36px, 6vw, 120px);
  line-height: 1.1;
}

.text-section-h2 {
  font-size: clamp(24px, 3vw, 48px);
  line-height: 1.2;
}
```

---

### Typography Classes

```css
.font-heading          /* Playfair Display — elegant headings */
.font-body             /* Inter — readable body text */
.font-title            /* Righteous — main hero titles */

.text-hero-h1          /* Fluid 36px→120px */
.text-section-h2       /* Fluid 24px→48px */
.text-card-h3          /* Fluid 20px→32px */
.text-body-p           /* Fluid 16px→20px */
.text-small            /* Fluid 14px→16px */
```

---

## Spacing

### Spacing Scale

The design system uses an 8px-based spacing scale with WordPress-style variable naming.

| Name | Value | CSS Variable | Common Use |
|---|---|---|---|
| **10** | 8px | `--wp--preset--spacing--10` | Tight spacing (icon gaps, compact UI) |
| **20** | 16px | `--wp--preset--spacing--20` | Small spacing (button padding, card gaps) |
| **30** | 24px | `--wp--preset--spacing--30` | Medium spacing (section padding) |
| **40** | 32px | `--wp--preset--spacing--40` | Large spacing (component margins) |
| **50** | 40px | `--wp--preset--spacing--50` | XL spacing (section gaps) |
| **60** | 48px | `--wp--preset--spacing--60` | XXL spacing (hero padding) |
| **70** | 64px | `--wp--preset--spacing--70` | Major section spacing |
| **80** | 80px | `--wp--preset--spacing--80` | Hero vertical spacing |

**Usage:**
```css
.hero {
  padding: var(--wp--preset--spacing--80) var(--wp--preset--spacing--30);
}

.card {
  gap: var(--wp--preset--spacing--20);
  padding: var(--wp--preset--spacing--30);
}
```

---

## Animations

The design system includes 26 custom animations organized by category. **All animations must respect `prefers-reduced-motion`.**

### Animation Categories

1. **Entrance Animations** (7 animations)
   - Fade In, Slide Up, Slide Down, Slide Left, Slide Right, Zoom In, Bounce In

2. **Emphasis Animations** (6 animations)
   - Pulse, Shake, Wiggle, Flash, Glow, Rubber Band

3. **Exit Animations** (4 animations)
   - Fade Out, Slide Out Up, Slide Out Down, Zoom Out

4. **Neon Effects** (5 animations)
   - Neon Pulse, Neon Flicker, Gradient Shift, Color Cycle, Text Glow

5. **Utility Animations** (4 animations)
   - Spin, Float, Bounce, Swing

**Full documentation:** See `/guidelines/design-tokens/animations.md`

---

### Reduced Motion Compliance

**Every animation must include a reduced motion fallback:**

```css
.element {
  animation: slideUp 0.6s ease-out;
}

@media (prefers-reduced-motion: reduce) {
  .element {
    animation: none;
    opacity: 1;
    transform: none;
  }
}
```

**Coding Standards:** See `/guidelines/prefers-reduced-motion.md` for complete implementation guide.

---

## Iconography

### Primary Icon Library: Phosphor Icons

The site uses **Phosphor Icons** (`@phosphor-icons/react`) with 6 weight variants:

- **Thin** (100) — Delicate, minimal UI
- **Light** (200) — Subtle interface elements
- **Regular** (400) — Default weight (most common)
- **Bold** (600) — Emphasis, headings
- **Fill** (solid) — Filled variants for active states
- **Duotone** — Two-tone style for visual interest

**Import:**
```tsx
import { Icon } from '@phosphor-icons/react';

<Icon size={24} weight="duotone" />
```

**Common Sizes:**
- 16px — Inline text icons
- 20px — Small UI elements
- 24px — Standard icons
- 32px — Large icons
- 48px — Hero/feature icons

**Full documentation:** See `/guidelines/overview-icons.md`

---

## Light/Dark Mode

### Dual Theme System

The site supports both light and dark modes with neon colors adapted for each context.

#### Dark Mode (Default)
- Background: Atomic Black `#0F0F0F`
- Text: Neutral 100 `#F5F5F5`
- Neon colors: Full brightness
- Glow effects: Maximum intensity

#### Light Mode
- Background: White `#FFFFFF`
- Text: Neutral 900 `#1A1A1A`
- Neon colors: Accessible text variants
- Glow effects: Reduced or removed

---

### Component-Specific Patterns

**General Pattern:**
```css
.component {
  background: var(--wp--preset--color--atomic-black);
  color: var(--wp--preset--color--neutral-100);
}

body.light-mode .component {
  background: var(--wp--preset--color--white);
  color: var(--wp--preset--color--neutral-900);
}
```

**Full documentation:**
- See `/guidelines/dark-mode-implementation.md` for complete system
- See `/guidelines/component-dark-mode.md` for component-specific patterns

---

## Usage Guidelines

### When to Use Neon Colors

**✅ Good Use Cases:**
- Hero section accents
- Call-to-action buttons
- Focus states
- Hover effects
- Icon highlights
- Badge/chip backgrounds
- Gradient overlays

**❌ Avoid:**
- Long-form body text
- Low-contrast pairings (yellow on white)
- Overuse (more than 2-3 neon colors per screen)
- Thin text on bright backgrounds

---

### Accessibility Requirements

**Color Contrast:**
- Body text: 4.5:1 minimum (WCAG AA)
- Dark mode achieves 7:1+ (WCAG AAA)
- Always test neon colors against backgrounds

**Reduced Motion:**
- All animations must have `prefers-reduced-motion` fallbacks
- No motion for users who request reduced motion

**Full compliance:** WCAG 2.1 Level AA — See `/guidelines/accessibility-report-feb-2025.md`

---

## Quick Reference

### CSS Variables

```css
/* Core Neon Colors */
var(--wp--preset--color--neon-green)
var(--wp--preset--color--neon-pink)
var(--wp--preset--color--neon-blue)
var(--wp--preset--color--neon-yellow)
var(--wp--preset--color--neon-orange)
var(--wp--preset--color--neon-purple)
var(--wp--preset--color--neon-cyan)
var(--wp--preset--color--neon-red)

/* Backgrounds */
var(--wp--preset--color--atomic-black)
var(--wp--preset--color--charcoal)
var(--wp--preset--color--neutral-900)

/* Gradients */
var(--wp--gradient--cyberpunk)
var(--wp--gradient--toxic-lime)
var(--wp--gradient--solar-flare)
var(--wp--gradient--aurora)

/* Typography */
var(--wp--preset--font-family--heading)
var(--wp--preset--font-family--body)
var(--wp--preset--font-family--title)

/* Spacing */
var(--wp--preset--spacing--10)  /* 8px */
var(--wp--preset--spacing--20)  /* 16px */
var(--wp--preset--spacing--30)  /* 24px */
var(--wp--preset--spacing--40)  /* 32px */
var(--wp--preset--spacing--50)  /* 40px */
var(--wp--preset--spacing--60)  /* 48px */
var(--wp--preset--spacing--70)  /* 64px */
var(--wp--preset--spacing--80)  /* 80px */
```

---

**This is a living document. Always verify token values in `/styles/globals.css` for the most up-to-date implementation.**

**Last Updated:** March 7, 2026  
**Maintained by:** Ash Shaw Portfolio Team
