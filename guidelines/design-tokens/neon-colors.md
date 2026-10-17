# Neon Color System

**Version:** 1.0.0  
**Last Updated:** February 2026  
**Last Reviewed:** February 21, 2026
**Design System:** Neon vs Atomic Black

---

## 🎨 Overview

The **Neon vs Atomic Black** design system is the core visual identity of the Ash Shaw Makeup Portfolio. It features high-saturation neon colors on deep black backgrounds, creating a bold, energetic aesthetic that reflects the vibrant makeup artistry.

**Philosophy:**
- **Light Mode:** Accessible darker neon variants for readability on white
- **Dark Mode:** Full-brightness neon colors with glowing effects on atomic black (#0F0F0F)
- **Contrast:** All combinations meet WCAG 2.1 AA standards
- **Energy:** Bold, vibrant, unapologetically colorful

---

## 🌈 Neon Color Palette

### Core Neon Colors

All neon colors are defined as CSS variables in `/styles/globals.css` (lines 53-62):

```css
:root {
  /* High Saturation Neon Colors */
  --wp--preset--color--neon-green: #39FF14;
  --wp--preset--color--neon-pink: #FF10F0;
  --wp--preset--color--neon-blue: #1F51FF;
  --wp--preset--color--neon-yellow: #FFFF00;
  --wp--preset--color--neon-orange: #FF5F1F;
  --wp--preset--color--neon-purple: #BE00FE;
  --wp--preset--color--neon-cyan: #00F7FF;
  --wp--preset--color--neon-red: #FF3131;
}
```

### Visual Reference

```
┌─────────────────────────────────────────────────────────────────┐
│                     NEON COLOR PALETTE                          │
└─────────────────────────────────────────────────────────────────┘

NEON GREEN       ██████  #39FF14  Electric lime, toxic glow
NEON PINK        ██████  #FF10F0  Hot magenta, cyber pink
NEON BLUE        ██████  #1F51FF  Electric blue, royal neon
NEON YELLOW      ██████  #FFFF00  Pure yellow, highlighter
NEON ORANGE      ██████  #FF5F1F  Blazing orange, sunset fire
NEON PURPLE      ██████  #BE00FE  Violet electric, cyber purple
NEON CYAN        ██████  #00F7FF  Aqua neon, electric teal
NEON RED         ██████  #FF3131  Hot red, danger glow
```

---

## 🔆 Light Mode - Accessible Text Colors

For readability on white/light backgrounds, darker accessible variants are used (globals.css lines 63-72):

```css
:root {
  /* Accessible Text Colors (Light Mode) */
  --wp--preset--color--neon-green-text: #008f00;
  --wp--preset--color--neon-pink-text: #b300a4;
  --wp--preset--color--neon-blue-text: #002db3;
  --wp--preset--color--neon-yellow-text: #8a8a00;
  --wp--preset--color--neon-orange-text: #cc4100;
  --wp--preset--color--neon-purple-text: #7800a1;
  --wp--preset--color--neon-cyan-text: #008f94;
}
```

### Utility Classes

```css
.text-neon-pink { color: var(--wp--preset--color--neon-pink-text); }
.text-neon-blue { color: var(--wp--preset--color--neon-blue-text); }
.text-neon-purple { color: var(--wp--preset--color--neon-purple-text); }
.text-neon-green { color: var(--wp--preset--color--neon-green-text); }
.text-neon-yellow { color: var(--wp--preset--color--neon-yellow-text); }
.text-neon-orange { color: var(--wp--preset--color--neon-orange-text); }
```

### Usage Example

```tsx
// ✅ CORRECT - Accessible in light mode
<p className="text-neon-pink">
  Vibrant pink text with proper contrast on white background
</p>

// ✅ CORRECT - Use BEM semantic class when available
<div className="card__badge card__badge--neon-pink">
  Featured
</div>
```

---

## 🌙 Dark Mode - Full Brightness Neon

In dark mode, neon colors restore to full brightness for maximum impact (globals.css lines 217-223):

```css
.dark {
  /* Restore bright neon text colors in dark mode */
  --wp--preset--color--neon-green-text: #39FF14;
  --wp--preset--color--neon-pink-text: #FF10F0;
  --wp--preset--color--neon-blue-text: #1F51FF;
  --wp--preset--color--neon-yellow-text: #FFFF00;
  --wp--preset--color--neon-orange-text: #FF5F1F;
  --wp--preset--color--neon-purple-text: #BE00FE;
  --wp--preset--color--neon-cyan-text: #00F7FF;
}
```

### Atomic Black Background

```css
:root {
  --wp--preset--color--atomic-black: #0F0F0F;
  --wp--preset--color--pure-black: #000000;
}
```

### Dark Mode Example

```tsx
// ✅ CORRECT - Full brightness neon on atomic black
<div className="dark:bg-atomic-black">
  <p className="text-neon-pink">
    Full brightness #FF10F0 pink in dark mode
  </p>
</div>
```

---

## ✨ Neon Glow Effects (Shadows)

Neon shadows create glowing effects (globals.css lines 183-186, 225-226):

```css
:root {
  /* Light Mode - Subtle Glow */
  --wp--preset--shadow--neon-sm: 0 0 5px rgba(57, 255, 20, 0.3);
  --wp--preset--shadow--neon-md: 0 0 10px rgba(57, 255, 20, 0.4), 0 0 20px rgba(57, 255, 20, 0.2);
  --wp--preset--shadow--neon-lg: 0 0 15px rgba(57, 255, 20, 0.5), 0 0 30px rgba(57, 255, 20, 0.3);
}

.dark {
  /* Dark Mode - Enhanced Glow */
  --wp--preset--shadow--neon-sm: 0 0 8px rgba(57, 255, 20, 0.5);
  --wp--preset--shadow--card-hover: 0 10px 30px -5px rgba(255, 16, 240, 0.15);
}
```

### Usage Example

```tsx
// ✅ CORRECT - Neon glow button
<button className="btn btn--neon-primary shadow-neon-md hover:shadow-neon-lg">
  Click Me
</button>

// Using inline style for custom glow color
<div style={{ boxShadow: 'var(--wp--preset--shadow--neon-md)' }}>
  Glowing element
</div>
```

---

## 🎨 Neon Gradients

Four signature gradient presets (globals.css lines 95-99):

### 1. Cyberpunk (Pink → Blue)

```css
--wp--preset--gradient--cyberpunk: linear-gradient(135deg, #FF10F0 0%, #1F51FF 100%);
```

**Usage:**
- Primary CTAs
- Hero titles
- Featured content
- "Read More" links

**CSS Class:**
```css
.text-gradient-pink-purple-blue {
  background: var(--wp--preset--gradient--cyberpunk);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
}
```

**Example:**
```tsx
// ✅ CORRECT - Gradient text
<h1 className="text-gradient-pink-purple-blue">
  Ash Shaw Makeup Artist
</h1>

// ✅ CORRECT - Gradient button background
<button className="btn btn--neon-primary">
  {/* Uses var(--wp--preset--gradient--cyberpunk) */}
  Explore Portfolio
</button>
```

### 2. Toxic Lime (Green → Cyan)

```css
--wp--preset--gradient--toxic-lime: linear-gradient(to right, #39FF14 0%, #12FFF7 100%);
```

**Usage:**
- Secondary CTAs
- Section accents
- Energy/nature themes

**CSS Class:**
```css
.text-gradient-blue-teal-green {
  background: var(--wp--preset--gradient--toxic-lime);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
}
```

### 3. Solar Flare (Orange → Yellow)

```css
--wp--preset--gradient--solar-flare: linear-gradient(45deg, #FF5F1F 0%, #FFFF00 100%);
```

**Usage:**
- Accent highlights
- Featured badges
- Warning/attention elements

**CSS Class:**
```css
.text-gradient-gold-peach-coral {
  background: var(--wp--preset--gradient--solar-flare);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
}
```

### 4. Hyperpop (Multi-Color Animated)

```css
--wp--preset--gradient--hyperpop: linear-gradient(-45deg, #FF10F0, #1F51FF, #00F7FF, #39FF14);
```

**Usage:**
- Animated backgrounds
- Loading states
- Dynamic elements

**Animation Class:**
```css
.animate-neon-glow-bg {
  background: var(--wp--preset--gradient--hyperpop);
  background-size: 400% 400%;
  animation: gradientShift 15s ease infinite;
  will-change: background-position;
}

@keyframes gradientShift {
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
}
```

**Example:**
```tsx
// ✅ CORRECT - Animated gradient background
<div className="animate-neon-glow-bg">
  Dynamic animated section
</div>
```

---

## 🌟 Neon Pulse Animations

Three color variants for pulsing glow effects (globals.css lines 421-450):

### Utility Classes

```css
.animate-neon-pulse-green {
  --glow-color: var(--wp--preset--color--neon-green);
  animation: neonPulse 2s infinite alternate;
  will-change: box-shadow;
}

.animate-neon-pulse-pink {
  --glow-color: var(--wp--preset--color--neon-pink);
  animation: neonPulse 2s infinite alternate;
  will-change: box-shadow;
}

.animate-neon-pulse-blue {
  --glow-color: var(--wp--preset--color--neon-blue);
  animation: neonPulse 2s infinite alternate;
  will-change: box-shadow;
}

@keyframes neonPulse {
  from { box-shadow: 0 0 5px var(--glow-color), 0 0 10px var(--glow-color); }
  to { box-shadow: 0 0 10px var(--glow-color), 0 0 20px var(--glow-color); }
}
```

### Usage Example

```tsx
// ✅ CORRECT - Pulsing neon button
<button className="btn btn--primary animate-neon-pulse-pink">
  Live Now
</button>

// ✅ CORRECT - Pulsing indicator
<div className="notification-dot animate-neon-pulse-green">
  •
</div>
```

---

## 🌌 Special Background Effects

### Aurora Mesh (Light Mode)

Subtle gradient mesh for light backgrounds (globals.css lines 398-411):

```css
.bg-aurora-mesh {
  background-color: var(--wp--preset--color--base);
  background-image: 
    radial-gradient(at 0% 0%, rgba(190, 0, 254, 0.15) 0, transparent 50%), 
    radial-gradient(at 100% 100%, rgba(31, 81, 255, 0.15) 0, transparent 50%);
  transition: background 0.3s ease;
}

.dark .bg-aurora-mesh {
  background-color: var(--wp--preset--color--atomic-black);
  background-image: 
    radial-gradient(at 0% 0%, rgba(190, 0, 254, 0.3) 0, transparent 50%), 
    radial-gradient(at 100% 100%, rgba(31, 81, 255, 0.3) 0, transparent 50%);
}
```

**Usage:**
```tsx
// ✅ CORRECT - Subtle gradient mesh background
<section className="bg-aurora-mesh py-section">
  Content with aurora gradient background
</section>
```

### Atomic Noise Texture

Textured black background for dark mode (globals.css lines 230-237):

```css
.bg-atomic-noise {
  background-color: var(--wp--preset--color--atomic-black);
  background-image: radial-gradient(circle at center, rgba(30, 30, 30, 0.3) 0%, transparent 70%);
}

.dark .bg-atomic-noise {
  background-image: radial-gradient(circle at center, rgba(50, 50, 50, 0.2) 0%, transparent 70%);
}
```

**Usage:**
```tsx
// ✅ CORRECT - Textured atomic black
<div className="bg-atomic-noise">
  Dark content with subtle noise texture
</div>
```

### SVG Grain Noise Texture (Site-Wide)

**Version 5.4.0:** A fractal noise grain overlay is now applied **site-wide** via CSS `::before` pseudo-elements. Originally from the Contact page, this texture adds subtle depth and tactile quality to every major section.

**Design Tokens (globals.css):**

```css
:root {
  /* Opacity tokens only — the SVG data URI is inlined in each section's ::before */
  /* because url() inside CSS custom properties triggers bundler module resolution */
  --noise-texture-opacity: 0.03;        /* Light mode — barely visible */
  --noise-texture-opacity-dark: 0.045;   /* Dark mode — slightly more visible */
}
```

**Sections with noise overlay:**
- `.hero` — Homepage and page heroes
- `.featured-section` — Homepage Featured Work
- `.blog-preview` — Homepage blog preview slider
- `.why-section` — "Why Choose Ash" feature cards
- `.footer` — Global footer
- `.blog-list-view` — Blog listing page
- `.portfolio-main-page` — Portfolio gallery page
- `.videos-page` — Videos showcase page
- `.about-page-container` — About page
- `.contact-page-container` — Contact page (original source)

**Implementation pattern:**

```css
/* Applied to every major section via ::before pseudo-element */
/* The SVG feTurbulence data URI is inlined directly (not via custom property) */
.section-name::before {
  content: '';
  position: absolute;
  inset: 0;
  background-image: url("data:image/svg+xml,...feTurbulence...");
  background-repeat: repeat;
  opacity: var(--noise-texture-opacity);
  z-index: 0;
  pointer-events: none;
}

.dark .section-name::before {
  opacity: var(--noise-texture-opacity-dark);
}
```

**Requirements:**
- The parent section MUST have `position: relative` and `overflow: hidden`
- Section content MUST sit above the noise layer (use `position: relative; z-index: 1` or higher)
- The grain is purely decorative — `pointer-events: none` and `aria-hidden` are implicit

**Usage:**
```css
/* ✅ CORRECT — Already applied via section CSS files */
/* No extra JSX needed. The ::before pseudo-element is automatic. */

/* ❌ WRONG — Do not use inline style data URIs for noise */
<div style={{ backgroundImage: `url("data:image/svg+xml,...")` }} />
```

---

## 🎯 Semantic Neon Roles

Primary semantic roles map to neon colors (globals.css lines 73-79):

```css
:root {
  --wp--preset--color--primary: var(--wp--preset--color--neon-purple);
  --wp--preset--color--brand: var(--wp--preset--color--neon-pink);
  --wp--preset--color--cta: var(--wp--preset--color--neon-blue);
}
```

### Usage

```tsx
// ✅ CORRECT - Semantic neon roles
<button className="btn btn--primary">
  {/* Uses neon purple */}
  Primary Action
</button>

<div className="brand-badge">
  {/* Uses neon pink */}
  Brand Element
</div>

<a className="cta-link">
  {/* Uses neon blue */}
  Call to Action
</a>
```

---

## 🎨 Complete Color Palette Library

The Ash Shaw design system includes **33 curated neon color palettes** for different interface contexts. All palettes are documented in `/data/mock/color-palettes.ts` and can be previewed at `/dev-tools/color-palettes`.

### Brand Core Palettes

#### 1. Ash Shaw Core Palette

**Colors:** All 8 core neon colors  
**Use Cases:**
- Dark mode dashboard with neon glowing cards and buttons on atomic black (#0F0F0F) background
- Portfolio grid with hover states that pulse each color with box-shadow glow effects
- Navigation menu where active links use gradient text from pink→purple→blue with neon glow

```css
/* Core 8 Colors */
#39FF14 - Neon Green (Electric lime, toxic glow)
#FF10F0 - Neon Pink (Hot magenta, cyber pink)
#1F51FF - Neon Blue (Electric blue, royal neon)
#FFFF00 - Neon Yellow (Pure yellow, highlighter)
#FF5F1F - Neon Orange (Blazing orange, sunset fire)
#BE00FE - Neon Purple (Violet electric, cyber purple)
#00F7FF - Neon Cyan (Aqua neon, electric teal)
#FF3131 - Neon Red (Hot red, danger glow)
```

### Signature Gradients

#### 2. Cyberpunk Gradient (Pink → Blue)

**Colors:** #FF10F0, #8F38FF, #1F51FF  
**Use Cases:**
- Hero section with large gradient text titles using background-clip: text
- Primary CTA buttons with gradient background and white text, adding glow on hover
- Featured content cards with gradient borders and subtle gradient overlay backgrounds

```css
background: linear-gradient(135deg, #FF10F0 0%, #1F51FF 100%);
```

#### 3. Toxic Lime Gradient (Green → Cyan)

**Colors:** #39FF14, #26FF8B, #12FFF7  
**Use Cases:**
- Success messages and notifications with gradient background and pulsing animation
- Section headers for blog posts or portfolio categories with gradient underline effect
- Loading progress bars with animated gradient that shifts position

```css
background: linear-gradient(to right, #39FF14 0%, #12FFF7 100%);
```

#### 4. Solar Flare Gradient (Orange → Yellow)

**Colors:** #FF5F1F, #FFAA0F, #FFFF00  
**Use Cases:**
- Featured badges and "New" labels with gradient fill and subtle glow
- Warning alerts and important callouts with gradient border and icon
- Event countdown timers with gradient numbers that pulse on each second

```css
background: linear-gradient(45deg, #FF5F1F 0%, #FFFF00 100%);
```

#### 5. Hyperpop Animated (Full Spectrum)

**Colors:** All 8 core colors in sequence  
**Use Cases:**
- Animated page background using gradientShift keyframe with 400% background-size
- Loading spinner or skeleton screens with shifting rainbow gradient
- Hero section backdrop with slow-moving multi-color gradient (15s animation loop)

```css
background: linear-gradient(-45deg, #FF10F0, #BE00FE, #1F51FF, #00F7FF, #39FF14, #FFFF00, #FF5F1F, #FF3131);
background-size: 400% 400%;
animation: gradientShift 15s ease infinite;
```

### Monochrome Spectrums

#### 6. Monochrome Pink Spectrum

**Colors:** #FFB3EC, #FF66D9, #FF10F0, #CC00BF, #66007F  
**Use Cases:**
- Pricing tables with tonal pink backgrounds ranging from light to dark per tier
- Data visualization charts using pink spectrum for different data series
- Image gallery with pink tonal overlays on hover, lightest to darkest

#### 7. Monochrome Blue Spectrum

**Colors:** #8FA7FF, #5F7AFF, #1F51FF, #0028BF, #001466  
**Use Cases:**
- Blog post cards with blue tonal backgrounds, darker for featured posts
- Navigation hierarchy using blue spectrum from light (sub-items) to dark (main nav)
- Timeline component with blue gradient progression from past (dark) to future (light)

### Complementary Pairs

#### 8. Complementary Orange & Blue

**Colors:** #FF5F1F, #1F51FF, #FFCDB3, #B3C7FF, #808080  
**Use Cases:**
- Split-screen layouts with orange (left/warm) and blue (right/cool) sections
- Toggle switches or tabs where orange = active, blue = inactive (or vice versa)
- Call-to-action pairing: primary orange button, secondary blue outline button

#### 9. Complementary Pink & Green

**Colors:** #FF10F0, #39FF14, #0F0F0F, #FFB3F7, #B3FF9E  
**Use Cases:**
- Status indicators: pink = error/alert, green = success/active
- Gaming or music interfaces with pink (player 1) vs green (player 2) themes
- Comparison tables with pink column (option A) and green column (option B)

### Temperature Palettes

#### 10. Warm Neon Sunset

**Colors:** #FF3131, #FF5F1F, #FFFF00, #FF10F0  
**Use Cases:**
- Sunset-themed hero backgrounds with horizontal warm gradient
- Heat map visualizations using warm spectrum (cool data = red, hot data = yellow)
- Energy or intensity meters with gradient fill from red (low) to yellow (high)

#### 11. Cool Neon Ocean

**Colors:** #00F7FF, #1F51FF, #BE00FE, #5500AA  
**Use Cases:**
- Ocean or water-themed interfaces with cool gradient backgrounds
- Calm or productivity app designs using cool color psychology
- Night mode interfaces with cool neon accents on dark backgrounds

### Background Systems

#### 12. Aurora Mesh Background

**Colors:** #BE00FE, #1F51FF, #0F0F0F, #FFFFFF  
**Use Cases:**
- Page sections with radial-gradient overlay creating soft aurora effect in corners
- Modal dialogs with aurora mesh background for visual depth without distraction
- Hero section backdrop with dual radial gradients (purple top-left, blue bottom-right)

```css
/* Light Mode */
background-color: #FFFFFF;
background-image: 
  radial-gradient(at 0% 0%, rgba(190, 0, 254, 0.15) 0, transparent 50%), 
  radial-gradient(at 100% 100%, rgba(31, 81, 255, 0.15) 0, transparent 50%);

/* Dark Mode */
background-color: #0F0F0F;
background-image: 
  radial-gradient(at 0% 0%, rgba(190, 0, 254, 0.3) 0, transparent 50%), 
  radial-gradient(at 100% 100%, rgba(31, 81, 255, 0.3) 0, transparent 50%);
```

#### 13. Contrast Checkerboard

**Colors:** #000000, #FFFFFF, #FF10F0, #00F7FF, #FFFF00, #39FF14  
**Use Cases:**
- High-contrast dark mode toggle with black/white switch and neon accent glow
- Accessibility-focused button designs with WCAG AAA contrast ratios
- Alert banners using black backgrounds with neon text for critical warnings

### Thematic Palettes (Image-Inspired)

#### 14. Cyberpunk Billboard at Midnight
**Colors:** #0800FF, #9A00FF, #4DFF00, #FFEC00  
**Tags:** cyberpunk, neon, night, electric

#### 15. Midnight Rave
**Colors:** #3D3D5C, #6B3FFF, #00B8FF, #D4FF00  
**Tags:** rave, dark, underground, psytrance

#### 16. Neon Rainbow
**Colors:** #00FFFF, #7FFF00, #FFFF00, #FF00FF, #0000FF  
**Tags:** rainbow, spectrum, bright, full-color

#### 17. Primary Pop
**Colors:** #FF0000, #FFFF00, #00FF00, #0000FF, #FF00FF  
**Tags:** primary, bold, saturated, classic

#### 18. Festival Vibes
**Colors:** #9B4DFF, #4DFFFF, #FF4D9B, #D4FF4D, #3D1F4D  
**Tags:** festival, psychedelic, gradient, purple

#### 19. Purple Dream
**Colors:** #000000, #7B00FF, #BC00FF, #8B00FF, #2B1B5C, #E5E5E5  
**Tags:** purple, monochrome, dark, blacklight

#### 20. Rainbow Pride
**Colors:** #FF0000, #FFFF00, #00FF00, #0000FF, #FF00FF  
**Tags:** rainbow, pride, classic, spectrum

#### 21. Magenta to Cyan Flow
**Colors:** #FF0099, #7B00FF, #5500CC, #00CCFF, #66DDFF, #99EEFF  
**Tags:** gradient, pink, cyan, flow

#### 22. Electric Spectrum
**Colors:** #00FFFF, #AAFF00, #FFFF00, #FF00FF, #0000FF  
**Tags:** spectrum, electric, bright, rainbow

#### 23. Cyber Night
**Colors:** #00FFFF, #000000, #99FFFF, #0F0F3D, #0066FF  
**Tags:** cyberpunk, cyan, dark, night

#### 24. Neon Dusk
**Colors:** #7733AA, #FF00FF, #00CCCC, #4477AA, #1A2F4F  
**Tags:** dusk, twilight, purple, gradient

#### 25. Tropical Neon
**Colors:** #00CCFF, #9900FF, #FF0099, #FF9900, #CCFF00  
**Tags:** tropical, sunset, bright, colorful

#### 26. Pop Art Blast
**Colors:** #FFFF00, #FF1493, #FF00FF, #00BFFF, #4B0082  
**Tags:** pop-art, bold, retro, vibrant

#### 27. Psychedelic Wave
**Colors:** #9933FF, #00FFCC, #FF0099, #CCFF00, #3D1F4D  
**Tags:** psychedelic, rave, trippy, fluorescent

#### 28. Lime Fade
**Colors:** #FFFF66, #CCFF66, #66FF66, #99CC99, #999999  
**Tags:** gradient, lime, fade, neutral

#### 29. Pastel Candy
**Colors:** #FF00CC, #00FFCC, #9999FF, #F5F5DC, #CC99FF  
**Tags:** pastel, candy, soft, light

#### 30. Earth to Neon
**Colors:** #3D3D2B, #6B6B47, #808066, #CCFF66, #CCFF99  
**Tags:** earth, gradient, natural, lime

#### 31. Hyper Pop
**Colors:** #00CCFF, #9900FF, #FF0066, #FF9900, #CCFF00  
**Tags:** hyper, pop, saturated, maximal

#### 32. Neon Core
**Colors:** #00FFFF, #AAFF00, #FFFF00, #FF00FF, #0000FF  
**Tags:** core, essential, classic, neon

#### 33. Midnight Gradient
**Colors:** #2B2B4D, #6633FF, #00CCFF, #CCFF00  
**Tags:** gradient, midnight, smooth, transition

---

## 🎨 Palette Selection Guide

### By Interface Type

**Dark Mode Dashboard:** Use **Ash Shaw Core** (#1) or **Hyperpop Animated** (#5)  
**Hero Sections:** Use **Cyberpunk Gradient** (#2) or **Aurora Mesh** (#12)  
**Success States:** Use **Toxic Lime Gradient** (#3) or **Complementary Pink & Green** (#9)  
**Warning States:** Use **Solar Flare Gradient** (#4)  
**Accessibility-First:** Use **Contrast Checkerboard** (#13)  
**Monochrome Designs:** Use **Monochrome Pink** (#6) or **Monochrome Blue** (#7)  

### By Mood

**Energetic/Vibrant:** Festival Vibes, Tropical Neon, Hyper Pop, Psychedelic Wave  
**Cool/Calm:** Cool Neon Ocean, Cyber Night, Neon Dusk, Monochrome Blue  
**Warm/Intense:** Warm Neon Sunset, Solar Flare, Pop Art Blast  
**Professional/Clean:** Contrast Checkerboard, Aurora Mesh, Cyberpunk Gradient  

### By Use Case

**CTAs & Buttons:** Cyberpunk Gradient, Solar Flare, Toxic Lime  
**Backgrounds:** Aurora Mesh, Hyperpop Animated, Midnight Gradient  
**Data Visualization:** Monochrome Pink, Monochrome Blue, Electric Spectrum  
**Status Indicators:** Complementary Orange & Blue, Complementary Pink & Green  
**Loading States:** Hyperpop Animated, Toxic Lime Gradient, Neon Core  

---

## 📐 Best Practices

### ✅ DO

1. **Use accessible text variants in light mode**
   ```tsx
   <p className="text-neon-pink">Readable on white</p>
   ```

2. **Use full brightness neon in dark mode**
   ```tsx
   <div className="dark:bg-atomic-black">
     <p className="text-neon-pink">Full brightness glow</p>
   </div>
   ```

3. **Apply glow effects for emphasis**
   ```tsx
   <button className="animate-neon-pulse-pink shadow-neon-md">
     Featured
   </button>
   ```

4. **Use gradient text for hero titles**
   ```tsx
   <h1 className="text-gradient-pink-purple-blue">
     Hero Title
   </h1>
   ```

### ❌ DON'T

1. **Don't use full brightness neon on light backgrounds**
   ```tsx
   {/* ❌ WRONG - Poor contrast */}
   <p className="text-white" style={{ color: '#FF10F0' }}>
     Unreadable
   </p>
   ```

2. **Don't mix too many neon colors**
   ```tsx
   {/* ❌ WRONG - Visual chaos */}
   <div className="text-neon-pink bg-neon-blue border-neon-green">
     Too much
   </div>
   ```

3. **Don't override CSS variables directly**
   ```tsx
   {/* ❌ WRONG - Use utility classes */}
   <div style={{ color: 'var(--wp--preset--color--neon-pink)' }}>
     Use .text-neon-pink instead
   </div>
   ```

4. **Don't animate too many elements**
   ```tsx
   {/* ❌ WRONG - Performance issue */}
   <div>
     <div className="animate-neon-pulse-pink">Item 1</div>
     <div className="animate-neon-pulse-blue">Item 2</div>
     <div className="animate-neon-pulse-green">Item 3</div>
     {/* Too many animations */}
   </div>
   ```

---

## 🔍 Related Documentation

- **[animations.md](./animations.md)** - Complete animation system
- **[colors.md](./colors.md)** - Legacy color documentation
- **[Guidelines.md](../Guidelines.md)** - Main guidelines

---

**Last Updated:** February 2026  
**Version:** 1.0.0  
**Maintained by:** Ash Shaw Portfolio Team