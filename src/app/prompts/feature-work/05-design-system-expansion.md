# Feature Work Sub-audit 05: Global Block Library & Design System Expansion

**Audit Type:** Feature Implementation (Multi-Phase)  
**Complexity:** Extreme (Estimated 20-30 implementation sessions)  
**Dependencies:** Completed Card & Layout Lab (Sub-audit 02)  
**Target Completion:** TBD (awaiting user direction)  
**Related Documents:**
- `/imports/block-library-spec.md` - Paragraph Block (20 styles) + Block Browser architecture
- `/imports/design-system-brief.md` - Comprehensive blocks & patterns framework
- `/imports/heading-styles.md` - Heading Block (25 styles) specifications
- `/imports/button-style-variations.md` - Button Block (20 styles) detailed specs
- `/imports/forms-style-switcher.md` - Forms (5 master themes) specifications
- `/imports/divider-styles.md` - Divider/Separator (10 styles) specifications
- `/imports/image-block-styles.md` - Image Block (10 styles) specifications
- `/imports/navigation-styles.md` - Navigation (10 styles) + Breadcrumb (10 styles) specs
- `/imports/pasted-attachment.txt` - Image Gallery/Slideshow (10 styles) specifications
- `/imports/cta-patterns-guide.md` - CTA Patterns (10 styles) + Social Icons (5 styles)
- `/imports/hero-patterns.md` - Hero Section Patterns (10 styles) specifications
- `/imports/pricing-patterns.md` - Pricing Table Patterns (5 styles) specifications
- User input: Testimonial/Social Proof Patterns (5 styles) specifications

---

## 🎯 Objective

Massively expand the website's style guide and design system by implementing a comprehensive **Global Block Library** — a live, interactive component laboratory that showcases **240+ funky, wild, and artistic variations** across:

- **12 Core Blocks** (Paragraphs, Headings, Buttons, Lists, Dividers, Forms, Images, Navigation, Breadcrumbs, Galleries, Social Icons, Search Bars)
- **5 Pattern Compositions** (Hero Sections, CTA Banners, Pricing Tables, Testimonials/Social Proof, Countdown/Urgency)

This builds on the successful Card & Layout Lab (Sub-audit 02) to create a full-scale interactive design system that serves as both:
1. **A developer tool** for exploring and exporting block variations
2. **A living style guide** demonstrating post-type-specific aesthetic logic
3. **A "funky universe"** playground where wild experimental design meets functional UX

---

## 📊 Complete Scope Breakdown

### Total Variations Count: 240+

| Category | Block/Pattern Type | Variation Count |
|---|---|---|
| **Core Blocks** | Paragraph | 20 |
| | Heading | 25 |
| | Button | 20 |
| | List | 10 |
| | Divider/Separator | 10 |
| | Forms (Master Themes) | 5 |
| | Image Block | 10 |
| | Navigation | 10 |
| | Breadcrumbs | 10 |
| | Image Gallery/Slideshow | 10 |
| | Social Icons | 5 |
| | Search Bar | 10 |
| **Pattern Compositions** | Hero Sections | 10 |
| | CTA Patterns | 10 |
| | Pricing Tables | 5 |
| | Testimonial/Social Proof | 5 |
| | Countdown/Urgency | 5 (TBD) |
| **TOTAL** | **17 Block Types** | **170+** |

**Additional Dev Tool Features:**
- Master Theme Switcher (Dark/Light/Neon/Brutalist)
- Post-Type Filtering ("Funky Filter" Logic)
- Context Preview System
- Code Export System (CSS/JSON/React)
- Interactive Property Controls (sliders, toggles, color pickers)

---

## 📋 Phase 1: Foundation & Architecture (Sessions 1-3)

### 1.1 Master Landing Page: "Global Block Library"

**Route:** `/dev-tools/block-library`  
**Component:** `/components/pages/dev-tools/GlobalBlockLibraryPage.tsx`

**Features:**
- **Header:** 
  - Title: "Global Block Library"
  - Subtitle: "240+ funky variations across 17 block types"
  - Master Theme Switcher (Dark/Light/Neon/Brutalist modes)
- **Grid Layout:** 4-column responsive card grid showcasing all 12 core blocks + 5 pattern categories
- **Card Anatomy:**
  - Live preview area (micro-container showing a "funky" version)
  - Metadata: Block name, variant count (e.g., "20 Styles"), status badge (In-Dev/Complete)
  - CTA: "Explore variations →" linking to dedicated sub-page
- **Category Filters:** Toggle between "All", "Core Blocks", "Pattern Compositions"
- **Search:** Filter blocks by name or keyword

**BEM CSS:** `/styles/blocks/global-block-library.css`

---

### 1.2 Post-Type Style Logic System

**Data File:** `/data/mock/design-system/post-type-mappings.ts`

**Mapping Structure:**
```typescript
export var postTypeMappings = {
  portfolio: {
    visualDirection: 'High Visual / Minimal Text',
    primaryBlocks: ['Gallery', 'Columns (Grid)', 'Image Block'],
    recommendedParagraphStyles: ['Liquid Text', 'Floating Glass', 'Glitch'],
    recommendedHeadingStyles: ['Background Clip Video', 'Chrome/Liquid', 'Hard Shadow'],
    recommendedButtonStyles: ['Claymorphism', 'Mercury Liquid', 'The Portal'],
    recommendedImageStyles: ['Organic Blob', 'Floating Glass', 'Blueprint Cross-Section'],
    neonColorPalette: 'cyberpunk' // links to existing 33 palettes
  },
  podcast: {
    visualDirection: 'Audio-Centric / High Contrast',
    primaryBlocks: ['Media & Text', 'Progress Bars', 'Quotes'],
    recommendedParagraphStyles: ['The Drop Cap', 'Typewriter', 'The Morph'],
    recommendedHeadingStyles: ['Mixed Weights', 'Floating Icon', 'Jitter-Type'],
    recommendedButtonStyles: ['Plasma Pulse', 'Variable Weight', 'Acid Glass'],
    recommendedImageStyles: ['Neon Glow', 'Scanned/Glitch', 'Polaroid Stack'],
    neonColorPalette: 'toxic-lime'
  },
  events: {
    visualDirection: 'Dynamic / Urgency',
    primaryBlocks: ['Countdown Timer', 'Maps', 'Buttons'],
    recommendedParagraphStyles: ['Glitch', 'Brutalist', 'Kinetic Scroll'],
    recommendedHeadingStyles: ['Infinite Marquee', 'Jitter-Type', 'Elastic Bounce'],
    recommendedButtonStyles: ['The Arcade Switch', 'Caution Tape', 'Confetti Popper'],
    recommendedImageStyles: ['Sticker Peel', 'Film Strip', 'Polaroid Fan'],
    neonColorPalette: 'solar-flare'
  },
  videos: {
    visualDirection: 'Immersive / Dark Mode',
    primaryBlocks: ['Video Embeds', 'Sliders', 'Playback UI'],
    recommendedParagraphStyles: ['Background Clip', 'Floating Glass', 'Shadow Depth'],
    recommendedHeadingStyles: ['Anaglyph', 'Hard Shadow', 'Background Clip Video'],
    recommendedButtonStyles: ['Cyber-Punk Glitch', 'The Portal', 'Plasma Pulse'],
    recommendedImageStyles: ['Neon Glow', 'Scanned/Glitch', '3D Carousel'],
    neonColorPalette: 'hyperpop'
  },
  faqs: {
    visualDirection: 'Clean / Accessible',
    primaryBlocks: ['Accordion', 'Search Bar', 'Lists'],
    recommendedParagraphStyles: ['The Pill', 'Dashed Border', 'Mag-Spread'],
    recommendedHeadingStyles: ['Sub-Label', 'Underline Dash', 'Numbered Lead'],
    recommendedButtonStyles: ['The Blueprint', 'Neo-Grotesque', 'Acid Glass'],
    recommendedImageStyles: ['Brutalist Frame', 'Floating Glass', 'Search-First Hero'],
    neonColorPalette: 'electric-green'
  },
  quotes: {
    visualDirection: 'Typographic / Bold',
    primaryBlocks: ['Paragraph (Oversized)', 'Separators', 'Headings'],
    recommendedParagraphStyles: ['The Morph', 'Shadow Depth', 'Acid Retro'],
    recommendedHeadingStyles: ['Struck-Through', 'Highlighted Box', 'The Stamp'],
    recommendedButtonStyles: ['Rough Hand-Drawn', 'The Sticker', '90s Pop'],
    recommendedImageStyles: ['Halftone Screen', 'Brutalist Frame', 'Blueprint Cross-Section'],
    neonColorPalette: 'neon-revelation'
  },
  pages: {
    visualDirection: 'Editorial / Narrative',
    primaryBlocks: ['Media & Text', 'Columns', 'Galleries'],
    recommendedParagraphStyles: ['Mag-Spread', 'The Highlight', 'The Drop Cap'],
    recommendedHeadingStyles: ['Numbered Lead', 'Bracketed', 'Layered Outline'],
    recommendedButtonStyles: ['Acid Glass', 'Mercury Liquid', 'The Window'],
    recommendedImageStyles: ['Floating Glass', 'Window Blind', 'Magnified Loupe'],
    neonColorPalette: 'atomic-black-contrast'
  }
};
```

---

### 1.3 Shared Laboratory Template

**Component:** `/components/dev-tools/BlockLabTemplate.tsx`  
**BEM CSS:** `/styles/blocks/block-lab-template.css`

**Structure:**
```tsx
<div className="block-lab">
  <div className="block-lab__header">
    <h1 className="block-lab__title">{blockName} Laboratory</h1>
    <div className="block-lab__theme-switcher">
      {/* Dark/Light/Neon/Brutalist toggle */}
    </div>
  </div>
  
  <div className="block-lab__layout">
    <aside className="block-lab__sidebar">
      <h2 className="block-lab__sidebar-title">Style Switcher</h2>
      <ul className="block-lab__style-list">
        {/* List of all variations */}
      </ul>
      
      <div className="block-lab__filters">
        <h3>Post-Type Filter</h3>
        {/* Dropdown for Portfolio/Podcast/Events/etc. */}
      </div>
    </aside>
    
    <main className="block-lab__stage">
      <div className="block-lab__preview">
        {/* Live preview of selected variation */}
      </div>
      
      <div className="block-lab__context-toggle">
        <label>Preview Context:</label>
        <select>
          <option>Portfolio Page</option>
          <option>Blog Post</option>
          <option>Event Page</option>
          <option>FAQ Page</option>
        </select>
      </div>
      
      <div className="block-lab__controls">
        {/* Interactive sliders, toggles, color pickers */}
      </div>
    </main>
  </div>
  
  <footer className="block-lab__export">
    <button className="block-lab__export-btn block-lab__export-btn--css">
      Copy CSS
    </button>
    <button className="block-lab__export-btn block-lab__export-btn--json">
      Copy JSON
    </button>
    <button className="block-lab__export-btn block-lab__export-btn--react">
      Copy React Component
    </button>
  </footer>
</div>
```

**Features:**
- **The Stage:** Large central preview area (min 800px width)
- **The Sidebar:** Scrollable style switcher with thumbnails
- **Context Toggle:** Dropdown to preview style in different post-type contexts
- **Interactive Controls:** Sliders for properties (blur amount, shadow depth, animation speed)
- **Code Export:** Syntax-highlighted code with copy-to-clipboard
- **Theme Switcher:** Instant preview in Dark/Light/Neon/Brutalist modes

---

## 📋 Phase 2: Core Block Implementations – Part A (Sessions 4-9)

### 2.1 Paragraph Block Laboratory ⭐ PRIORITY 1

**Route:** `/dev-tools/block-library/paragraph`  
**Component:** `/components/pages/dev-tools/block-library/ParagraphBlockLabPage.tsx`  
**BEM CSS:** `/styles/blocks/paragraph-variations.css`  
**Data:** `/data/mock/design-system/paragraph-variations.ts`

**20 Variations Across 4 Categories:**

#### Category A: Wild & Funky (Posts/Portfolio) – 5 styles

**Style 01: Acid Retro**
- High-contrast serif font
- Neon green text (`var(--neon-green)`) on atomic black background
- Variable letter-spacing on hover (`letter-spacing: 0.05em → 0.15em`)
- BEM class: `.paragraph-variation-01`

**Style 02: Liquid Text**
- SVG mask with moving gradient background
- Uses existing `@keyframes gradient-shift` animation
- Text reveals through animated liquid blob mask
- BEM class: `.paragraph-variation-02`
- CSS: `mask-image: url('#liquid-blob-mask'); mask-size: 200% 200%;`

**Style 03: Glitch**
- Occasional "jitter" animation on specific characters
- Red/blue color split using `text-shadow`
- Triggered on hover or viewport entry
- BEM class: `.paragraph-variation-03`
- CSS: `animation: glitch-jitter 0.2s infinite;`

**Style 04: Floating Glass**
- Glassmorphism container: `backdrop-filter: blur(10px)`
- Semi-transparent background: `rgba(255, 255, 255, 0.1)`
- 3D shadow: `box-shadow: 0 8px 32px rgba(0, 0, 0, 0.37)`
- BEM class: `.paragraph-variation-04`

**Style 05: Brutalist**
- Monospace font (`font-family: var(--font-mono)`)
- Massive leading: `line-height: 2.5`
- Black borders around every paragraph: `border: 3px solid #000`
- No padding, hard edges
- BEM class: `.paragraph-variation-05`

#### Category B: Editorial & Narrative (Videos/Podcasts/Pages) – 5 styles

**Style 06: The Drop Cap**
- First letter is 4x the height
- Uses illustrative font (e.g., Righteous or Playfair Display)
- Optional: animated GIF as drop cap background
- BEM class: `.paragraph-variation-06`
- CSS: `.paragraph-variation-06::first-letter { font-size: 4em; float: left; }`

**Style 07: Mag-Spread**
- Two-column split within single paragraph block
- Justified text: `text-align: justify`
- Column gap: `column-gap: 2rem`
- BEM class: `.paragraph-variation-07`
- CSS: `columns: 2; column-rule: 1px solid var(--neon-pink);`

**Style 08: The Highlight**
- Animated "marker" stroke follows user's scroll
- Uses CSS gradient on `background-image`
- Stroke animates via `background-position`
- BEM class: `.paragraph-variation-08`

**Style 09: Vertical Sideways**
- Paragraph rotated 90 degrees for sidebar annotations
- BEM class: `.paragraph-variation-09`
- CSS: `writing-mode: vertical-rl; text-orientation: mixed;`

**Style 10: Typewriter**
- Sequential character reveal triggered on viewport entry
- Uses `@keyframes typing` animation
- Cursor blink effect
- BEM class: `.paragraph-variation-10`

#### Category C: Functional & Clean (FAQs/Events) – 5 styles

**Style 11: The Pill**
- Paragraph contained in pill-shaped rounded box
- Icon prefix (Phosphor icon)
- BEM class: `.paragraph-variation-11`
- CSS: `border-radius: 50px; padding: 1rem 2rem; background: var(--neon-cyan);`

**Style 12: Dashed Border**
- Border-bottom on every line of text (notebook paper effect)
- BEM class: `.paragraph-variation-12`
- CSS: `background-image: repeating-linear-gradient(0deg, transparent, transparent 1.5rem, var(--neon-pink) 1.5rem, var(--neon-pink) calc(1.5rem + 1px));`

**Style 13: Blur-In**
- Text starts blurred and becomes sharp on hover
- BEM class: `.paragraph-variation-13`
- CSS: `filter: blur(3px); transition: filter 0.3s;` + `:hover { filter: blur(0); }`

**Style 14: Rainbow Hover**
- Each word changes to a different random color on hover
- Uses JavaScript to wrap each word in `<span>`
- BEM class: `.paragraph-variation-14`

**Style 15: Shadow Depth**
- Massive, non-blurry "hard" shadow (Retro 90s)
- BEM class: `.paragraph-variation-15`
- CSS: `text-shadow: 5px 5px 0 var(--neon-orange), 10px 10px 0 var(--neon-pink);`

#### Category D: Interactive & Meta (Portfolio/Quotes) – 5 styles

**Style 16: Tooltip Trigger**
- Specific words automatically trigger preview image of Portfolio item
- Requires JavaScript hover detection
- BEM class: `.paragraph-variation-16`

**Style 17: Kinetic Scroll**
- Text size increases slightly as user scrolls faster
- Uses scroll velocity detection
- BEM class: `.paragraph-variation-17`

**Style 18: Background Clip**
- Text acts as "window" to background video
- BEM class: `.paragraph-variation-18`
- CSS: `background-clip: text; -webkit-background-clip: text; color: transparent; background-image: url('video-frame.jpg');`

**Style 19: Strikethrough Dynamic**
- Lines draw across text on click (for "old" info)
- Animated strikethrough
- BEM class: `.paragraph-variation-19`

**Style 20: The Morph**
- Switches from Serif to Sans-Serif font on 3-second loop
- BEM class: `.paragraph-variation-20`
- CSS: `animation: font-morph 6s infinite;`

**Full `prefers-reduced-motion` support for all animated variations.**

---

### 2.2 Heading Block Laboratory ⭐ PRIORITY 1

**Route:** `/dev-tools/block-library/heading`  
**Component:** `/components/pages/dev-tools/block-library/HeadingBlockLabPage.tsx`  
**BEM CSS:** `/styles/blocks/heading-variations.css`  
**Data:** `/data/mock/design-system/heading-variations.ts`

**25 Variations Across 4 Categories:**

#### Category A: Kinetic & Animated (Living Headings) – 6 styles

**Style 01: Infinite Marquee**
- Heading text scrolls horizontally across screen like news ticker
- BEM class: `.heading-variation-01`
- CSS: `animation: marquee-scroll 20s linear infinite;`

**Style 02: The Reveal**
- Text is hidden behind color block that slides away on scroll
- BEM class: `.heading-variation-02`

**Style 03: Jitter-Type**
- Subtle vibrating animation—perfect for high-energy Events
- BEM class: `.heading-variation-03`
- CSS: `animation: jitter 0.1s infinite;`

**Style 04: Hover-Swap**
- Font-weight or font-style (e.g., italics) morphs on mouse hover
- BEM class: `.heading-variation-04`

**Style 05: Wavy Text**
- Characters sit on animated sine wave path
- Requires individual character wrapping
- BEM class: `.heading-variation-05`

**Style 06: Elastic Bounce**
- Letters bounce individually when page loads
- Staggered animation delays
- BEM class: `.heading-variation-06`

#### Category B: Depth & Dimension (3D Headings) – 6 styles

**Style 07: Hard Shadow**
- Retro 90s look with long, un-blurred "block" shadow in contrasting neon color
- BEM class: `.heading-variation-07`
- CSS: `text-shadow: 8px 8px 0 var(--neon-pink);`

**Style 08: Anaglyph**
- Red and Cyan "3D glasses" offset effect for glitchy vibe
- BEM class: `.heading-variation-08`
- CSS: `text-shadow: -3px 0 0 red, 3px 0 0 cyan;`

**Style 09: Layered Outline**
- Three layers of same text stacked with slight offsets in different weights
- BEM class: `.heading-variation-09`

**Style 10: Neumorphic**
- Text looks like it's pressed into or extruded from background
- BEM class: `.heading-variation-10`
- CSS: `text-shadow: -2px -2px 4px rgba(255,255,255,0.1), 2px 2px 4px rgba(0,0,0,0.5);`

**Style 11: Glass-Cut**
- Text is transparent with thick "frosted glass" border
- BEM class: `.heading-variation-11`
- CSS: `color: transparent; -webkit-text-stroke: 2px var(--neon-cyan); backdrop-filter: blur(5px);`

**Style 12: Chrome/Liquid**
- High-shine, metallic gradient finish for Y2K aesthetic
- BEM class: `.heading-variation-12`
- CSS: `background: linear-gradient(145deg, #e6e6e6, #ffffff); -webkit-background-clip: text; color: transparent;`

#### Category C: Brutalist & Destructured (Wild Headings) – 6 styles

**Style 13: The Overlap**
- Letters are tightly tracked so they physically touch and overlap
- BEM class: `.heading-variation-13`
- CSS: `letter-spacing: -0.1em;`

**Style 14: Vertical Stack**
- Characters stacked one on top of another (Japanese style) for narrow sidebars
- BEM class: `.heading-variation-14`
- CSS: `writing-mode: vertical-rl;`

**Style 15: Mixed Weights**
- Every word is different font or weight (e.g., Serif + Sans + Script)
- Requires word wrapping in spans with different classes
- BEM class: `.heading-variation-15`

**Style 16: Struck-Through**
- Thick, bold line cuts through center of heading
- BEM class: `.heading-variation-16`
- CSS: `text-decoration: line-through; text-decoration-thickness: 4px; text-decoration-color: var(--neon-red);`

**Style 17: Background Clip Video**
- Heading text acts as mask, playing video inside letters
- BEM class: `.heading-variation-17`

**Style 18: Censored**
- Heading starts as black bar and "un-redacts" on click
- BEM class: `.heading-variation-18`

#### Category D: Narrative & Contextual (Functional Headings) – 7 styles

**Style 19: The Sub-Label**
- Tiny "all-caps" label sitting directly on top of main heading
- BEM class: `.heading-variation-19`

**Style 20: Numbered Lead**
- Large, semi-transparent background number (e.g., 01, 02) sitting behind text
- BEM class: `.heading-variation-20`

**Style 21: Underline Dash**
- Dashed underline that "draws" itself as you scroll
- BEM class: `.heading-variation-21`
- CSS: `border-bottom: 2px dashed var(--neon-pink); animation: dash-draw 1s forwards;`

**Style 22: Bracketed**
- Heading automatically wrapped in dynamic, oversized brackets [ Heading ]
- BEM class: `.heading-variation-22`

**Style 23: The Stamp**
- Text tilted at 15-degree angle and sits inside rough-edged "rubber stamp" border
- BEM class: `.heading-variation-23`
- CSS: `transform: rotate(-15deg); border: 3px dashed var(--neon-red);`

**Style 24: Highlighted Box**
- Each word has its own individual background color block
- BEM class: `.heading-variation-24`

**Style 25: Floating Icon**
- Icon related to Post Type (e.g., mic for Podcasts) floats and follows heading
- Uses Phosphor icon
- BEM class: `.heading-variation-25`

**Strategic Use Case Explainer (in sidebar):**
- Portfolio/Videos: Use Style 17 (Video Mask) or Style 12 (Chrome)
- Podcasts/Quotes: Use Style 15 (Mixed Weights)
- FAQs/Pages: Use Style 19 (Sub-Label) or Style 21 (Underline Dash)
- Events: Use Style 01 (Marquee) for urgency and motion

---

### 2.3 Button Block Laboratory ⭐ PRIORITY 1

**Route:** `/dev-tools/block-library/button`  
**Component:** `/components/pages/dev-tools/block-library/ButtonBlockLabPage.tsx`  
**BEM CSS:** `/styles/blocks/button-variations.css`  
**Data:** `/data/mock/design-system/button-variations.ts`

**20 Variations Across 4 Categories:**

#### Category A: Retro-Brutalist & High Contrast – 5 styles

**Style 01: The 90s Pop**
- Properties: `background: #FF00FF; border: 3px solid #000; box-shadow: 5px 5px 0 #000;`
- Animation: On hover, shadow goes to `0 0`, button "pushes" down
- BEM class: `.button-variation-01`

**Style 02: Neo-Grotesque**
- Properties: `font-family: 'Space Mono'; text-transform: uppercase; border-radius: 0; background: #00FF41; color: #000;`
- Animation: Background-color inverts to black with neon green text on hover
- BEM class: `.button-variation-02`

**Style 03: The Sticker**
- Properties: Scalloped edges (SVG mask), white border, rotated 3 degrees
- Animation: Slight "peel" lift effect using `transform: rotate(0deg) scale(1.1)`
- BEM class: `.button-variation-03`

**Style 04: Caution Tape**
- Properties: Yellow/Black diagonal striped background (`repeating-linear-gradient`)
- Animation: Stripes animate/scroll sideways on hover using `background-position`
- BEM class: `.button-variation-04`

**Style 05: The Blueprint**
- Properties: Ghost button with blueprint grid lines background; technical crosshair icons in corners
- BEM class: `.button-variation-05`

#### Category B: Glass, Liquid & Futuristic – 5 styles

**Style 06: Acid Glass**
- Properties: `backdrop-filter: blur(10px); background: rgba(255, 255, 255, 0.1); border: 1px solid rgba(255, 255, 255, 0.3);`
- Animation: Internal "glow" expands from center on hover
- BEM class: `.button-variation-06`

**Style 07: Mercury Liquid**
- Properties: `background: linear-gradient(145deg, #e6e6e6, #ffffff); border-radius: 50px;`
- Animation: Blob-like movement using `border-radius` morphing (`30% 70% 70% 30% / 30% 30% 70% 70%`)
- BEM class: `.button-variation-07`

**Style 08: Cyber-Punk Glitch**
- Properties: Sharp angular clips (`clip-path`); neon cyan and magenta `text-shadows`
- Animation: Rapid 0.2s glitch jitter on hover
- BEM class: `.button-variation-08`

**Style 09: Plasma Pulse**
- Properties: Dark background with moving mesh gradient (radial-gradients of purple, blue, teal)
- BEM class: `.button-variation-09`

**Style 10: The Portal**
- Properties: Circular button; background is slow-rotating space/nebula texture
- BEM class: `.button-variation-10`

#### Category C: Tactile & Skeuomorphic (Funky Edit) – 5 styles

**Style 11: Claymorphism**
- Properties: Pastel base; `box-shadow: inset 10px 10px 20px rgba(0,0,0,0.1), 10px 10px 20px rgba(0,0,0,0.1);`
- Animation: Button "squishes" (scales Y down, scales X up) when clicked
- BEM class: `.button-variation-11`

**Style 12: The Puffy Coat**
- Properties: Looks like quilted fabric; high-gloss "vinyl" finish
- BEM class: `.button-variation-12`

**Style 13: Inflatables**
- Properties: Ultra-rounded; gradient highlights that look like light reflecting off balloon
- BEM class: `.button-variation-13`

**Style 14: The Arcade Switch**
- Properties: Round, bright red, deep "well" border
- Animation: 3D "depress" motion with mechanical click sound effect (optional dev trigger)
- BEM class: `.button-variation-14`

**Style 15: Rough Hand-Drawn**
- Properties: `border: 2px solid black;` using SVG-path filter to make line look like shaky marker drawing
- BEM class: `.button-variation-15`

#### Category D: Interactive & Experimental – 5 styles

**Style 16: The Snake**
- Properties: Border is actually moving line that travels around perimeter of button
- BEM class: `.button-variation-16`

**Style 17: Magnetic Pull**
- Properties: Minimalist style
- Animation: Button physically moves toward user's cursor when they get within 50px
- BEM class: `.button-variation-17`

**Style 18: Confetti Popper**
- Properties: Standard clean style
- Animation: On click, bursts particles (CSS particles) from behind button
- BEM class: `.button-variation-18`

**Style 19: The Window**
- Properties: Button is transparent; text is "hole" showing section's background image behind it
- BEM class: `.button-variation-19`
- CSS: `background-clip: text; color: transparent;`

**Style 20: Variable Weight**
- Properties: `font-weight: 100;`
- Animation: As you hover, font-weight transitions to 900 dynamically
- BEM class: `.button-variation-20`

**Use Cases:**
- High-impact wild buttons for CTAs: Styles 01, 04, 08, 11, 14, 18
- Subtle styles for navigation: Styles 05, 06, 19, 20

---

### 2.4 List Block Laboratory

**Route:** `/dev-tools/block-library/list`  
**Component:** `/components/pages/dev-tools/block-library/ListBlockLabPage.tsx`  
**BEM CSS:** `/styles/blocks/list-variations.css`  
**Data:** `/data/mock/design-system/list-variations.ts`

**10 Variations:**

1. **Emoji Checklist** – Custom emojis as bullets (✅, ⭐, 🎨, 🎤)
2. **Custom SVG Icons** – Phosphor icons as list markers
3. **Massive Background Numerals** – Ordered lists with huge semi-transparent numbers behind items
4. **Icon-Bulleted Portfolio Features** – Icon + text in horizontal layout
5. **Animated Counter Reveals** – Numbers count up when list enters viewport
6. **Stacked Card-Style Items** – Each list item is a card with shadow
7. **Neon Glow Bullets** – Circular neon glow markers
8. **Brutalist Checkbox Grid** – Large square checkboxes with bold X on check
9. **Timeline List** – Vertical timeline with connecting lines
10. **Marquee List** – Horizontally scrolling list items

---

## 📋 Phase 3: Core Block Implementations – Part B (Sessions 10-15)

### 3.1 Divider/Separator Laboratory

**Route:** `/dev-tools/block-library/divider`  
**Component:** `/components/pages/dev-tools/block-library/DividerBlockLabPage.tsx`  
**BEM CSS:** `/styles/blocks/divider-variations.css`

**10 Variations:**

**Style 01: The Ripped Page (Physicality)**
- SVG mask that looks like paper has been torn horizontally
- On scroll, "rip" slightly expands or shifts
- Best For: Transitioning from Blog Post to Quote
- BEM class: `.divider-variation-01`

**Style 02: The Ticker Tape (Information)**
- Thin, high-contrast bar (Neon Green on Black) with scrolling marquee text
- Text speed increases as user scrolls faster
- Best For: Leading into Portfolio or Event grid
- BEM class: `.divider-variation-02`

**Style 03: The Animated Wave (Fluidity)**
- Multi-layered CSS waves moving at different speeds with varying opacities
- Smooth, oscillating motion creating "liquid" feel
- Best For: Moving from Hero Section into general Page content
- BEM class: `.divider-variation-03`

**Style 04: The Brutalist Barbed Wire (Edgy/Graphic)**
- Repeating pattern of jagged, geometric "teeth" or technical crosshairs
- Pattern "bites" or snaps together when it enters viewport
- Best For: Separating Video content from FAQs
- BEM class: `.divider-variation-04`

**Style 05: The Gradient Blur (Atmospheric)**
- No hard line; 200px tall section of blurred, rotating colors
- Mouse movement "stirs" colors like paint
- Best For: High-concept Landing Pages
- BEM class: `.divider-variation-05`

**Style 06: The Dashed Path (Navigational)**
- Thick, dashed line that looks like map route or "cut here" line
- Dash-offset animates so line appears to be "traveling"
- Best For: Leading users toward CTA or Form
- BEM class: `.divider-variation-06`

**Style 07: The Scanned Distortion (Glitch)**
- Horizontal bar of "static" or "digital noise" that looks like screen glitch
- Trigger brief "flicker" sound effect or visual jump when crossed
- Best For: Dark mode Podcast or Video pages
- BEM class: `.divider-variation-07`

**Style 08: The Ascii String (Retro-Tech)**
- Line made entirely of characters like `+=+=+=+=+` or `________________`
- Characters randomize briefly on hover
- Best For: Technical FAQ or Post sections
- BEM class: `.divider-variation-08`

**Style 09: The Floating 3D Objects (Depth)**
- Floating 3D spheres or cubes sit on top of section break
- Parallax effect—objects move at different speed than scroll
- Best For: Portfolio showcases
- BEM class: `.divider-variation-09`

**Style 10: The Window Slit (Negative Space)**
- Thin horizontal "cut-out" in page revealing fixed background image/video underneath
- As you scroll, different part of underlying "hidden" image is revealed
- Best For: Breaking up long Pages
- BEM class: `.divider-variation-10`

**Dev Tool Features:**
- **Vibe Tester:** Select "Section A Style" (e.g., Neon) and "Section B Style" (e.g., White/Clean), cycle through 10 dividers
- **Angle Control:** Slider to change divider from horizontal to diagonal slash (5-degree tilt)

---

### 3.2 Forms Style Switcher Laboratory

**Route:** `/dev-tools/block-library/forms`  
**Component:** `/components/pages/dev-tools/block-library/FormsBlockLabPage.tsx`  
**BEM CSS:** `/styles/blocks/form-variations.css`

**5 Master Themes (apply to all form elements):**

**Theme 01: The Brutalist Lab (High-Contrast/Technical)**
- Input Fields: `border: 2px solid #000; border-radius: 0; background: #fff;` No left padding, text sits hard against line
- Checkboxes: Large squares that fill with solid black "X" when clicked
- Toggles: Rectangular "On/Off" switches that look like industrial breakers
- Focus State: Background flips to vibrating neon yellow (`#ccff00`)
- BEM class: `.form-theme-01`

**Theme 02: Acid Dream (Fluid/Gradient/Blurred)**
- Input Fields: No borders. Only bottom underline that is moving mesh gradient
- Checkboxes: Circular "blobs" that pulse when active
- Toggles: Soft, pill-shaped glass containers with glowing "orb" that slides across
- Focus State: `backdrop-filter: blur(10px)` effect intensifies around active field
- BEM class: `.form-theme-02`

**Theme 03: Desktop 95 (Retro-Digital/Nostalgic)**
- Input Fields: Deep inset shadows (`box-shadow: inset 2px 2px #000, inset -1px -1px #fff;`) to look like Windows 95
- Checkboxes: Classic grey 3D boxes with pixelated checkmark
- Toggles: Old-school "Radio" buttons that look like tactile plastic buttons
- Focus State: Label text turns bold and blue, like selected file name
- BEM class: `.form-theme-03`

**Theme 04: Cyber-Organic (Dark Mode/Neon)**
- Input Fields: `background: #000; border: 1px solid #333; color: #0f0;` (Matrix-style)
- Checkboxes: Hexagonal shapes that "light up" with neon flicker when checked
- Toggles: Thin laser line that moves between two points
- Focus State: "Scanning" animation (horizontal line) passes through input box once
- BEM class: `.form-theme-04`

**Theme 05: Hand-Drawn Sketch (Analog/Playful)**
- Input Fields: `border-radius: 255px 15px 225px 15px/15px 225px 15px 255px;` (wobbly marker lines)
- Checkboxes: Messy, hand-drawn circle that gets "scribbled in" when selected
- Toggles: "Sun" and "Moon" doodle you slide back and forth
- Focus State: "Paper" (background) gains slight yellow tint like post-it note
- BEM class: `.form-theme-05`

**Dev Tool Features:**
- **Style Matrix:** Grid showing one field (text input) in all 5 themes side-by-side
- **Full Form Preview:** Sample contact form (Name, Email, Message, Agree to Terms) updates in real-time
- **Validation States:** Toggle to show how "Error" and "Success" messages look in each style

**Use Cases per Post Type:**
- Events/Signups: Use Brutalist Lab for high-impact, clear communication
- Portfolio/Pages: Use Acid Dream for sophisticated, "designed" feel
- Videos/Podcasts: Use Cyber-Organic to match dark, immersive media players

---

### 3.3 Image Block Laboratory

**Route:** `/dev-tools/block-library/image`  
**Component:** `/components/pages/dev-tools/block-library/ImageBlockLabPage.tsx`  
**BEM CSS:** `/styles/blocks/image-variations.css`

**10 Variations:**

**Style 01: The Organic Blob (Liquid Mask)**
- Image masked into shifting, liquid shape using blob CSS
- Shape "wobbles" or morphs when mouse hovers
- Best For: Portfolio thumbnails or Podcast guest headshots
- BEM class: `.image-variation-01`

**Style 02: The Brutalist Frame (Industrial)**
- Thick 10px black border with "registration marks" (crosshairs) in corners
- Small "FILE_001.JPG" label in monospace
- On hover, border changes to neon color and image zooms in slightly
- Best For: Posts and technical Pages
- BEM class: `.image-variation-02`

**Style 03: The Sticker Peel (Playful)**
- White, die-cut border around image with subtle drop shadow (looks stuck onto screen)
- Corner "peels" back when mouse approaches, revealing "Click Me" label
- Best For: Events and CTA sections
- BEM class: `.image-variation-03`

**Style 04: The Halftone Screen (Retro Print)**
- CSS filter overlay giving image comic-book dot pattern or CMYK offset look
- Halftone dots "wash away" or sharpen into clear image on hover
- Best For: Videos or artistic Quotes
- BEM class: `.image-variation-04`

**Style 05: The Floating Glass (Depth)**
- Image sits inside glass-textured frame with heavy `backdrop-filter: blur()`
- 3D Tilt effect—image follows mouse movement in 3D space (tilt.js style)
- Best For: High-end Portfolio pieces
- BEM class: `.image-variation-05`

**Style 06: The Scanned/Glitch (Digital)**
- Image broken into horizontal "slices" that are slightly offset
- "Red-and-blue" 3D ghosting effect triggers every few seconds
- Best For: Video previews and Podcast art
- BEM class: `.image-variation-06`

**Style 07: The Polaroid Stack (Nostalgic)**
- Single image block that looks like three stacked Polaroids
- On hover, "stack" fans out to reveal three different angles or related images
- Best For: Portfolio and Events
- BEM class: `.image-variation-07`

**Style 08: The Neon Glow (Cyber)**
- Image has no border but massive, blurred outer glow matching image's dominant color
- Glow "pulses" like neon sign
- Best For: Videos in Dark Mode
- BEM class: `.image-variation-08`

**Style 09: The Blueprint Cross-Section (Technical)**
- Half of image is regular photo; other half is blue-and-white "schematic" or wireframe sketch
- Vertical slider allows user to reveal more of "blueprint" side
- Best For: Portfolio case studies
- BEM class: `.image-variation-09`

**Style 10: The Window Blind (Transition)**
- Image hidden behind vertical or horizontal slats
- Slats "open" (rotate 90 degrees) when user scrolls to block
- Best For: Dramatic reveals on Pages
- BEM class: `.image-variation-10`

**Dev Tool Features:**
- **Aspect Ratio Toggle:** Test each style in Square (1:1), Landscape (16:9), Portrait (4:5)
- **Filter Gallery:** Quick-Apply sidebar for CSS filters (Grayscale, Sepia, Invert, Hue-Rotate)
- **Caption Styles:** 5 ways to show text on image (floating pills, bottom-aligned ribbons, hover-only overlays)

---

### 3.4 Navigation Block Laboratory

**Route:** `/dev-tools/block-library/navigation`  
**Component:** `/components/pages/dev-tools/block-library/NavigationBlockLabPage.tsx`  
**BEM CSS:** `/styles/blocks/navigation-variations.css`

**10 Variations:**

**Style 01: The Radial Hub**
- Floating action button in corner that, when clicked, fans out into semi-circle of icons and labels
- BEM class: `.navigation-variation-01`

**Style 02: Scrolling-as-Nav**
- Traditional links replaced by side-scroll indicator
- Clicking menu item "scroll-jacks" user to that section with stylized transition
- BEM class: `.navigation-variation-02`

**Style 03: The Marquee Bar**
- Thin, infinitely scrolling horizontal bar at top
- Menu items move constantly, stopping only on mouse hover
- BEM class: `.navigation-variation-03`

**Style 04: Asymmetric Sidebar**
- Vertical nav sits on right side with right-aligned icons and oversized, vertically-stacked text
- BEM class: `.navigation-variation-04`

**Style 05: The Liquid Morph**
- Nav items are "blobs" of color that merge and split as you hover between them
- BEM class: `.navigation-variation-05`

**Style 06: The Command Palette (K-Menu)**
- Minimalist search-first nav where users type where they want to go (inspired by Raycast)
- BEM class: `.navigation-variation-06`

**Style 07: Bento-Box Menu**
- Full-screen overlay where each navigation category is its own modular, differently-sized "bento" tile
- BEM class: `.navigation-variation-07`

**Style 08: The HUD Overlay**
- Transparent navigation that looks like sci-fi "Head-Up Display"
- Features technical crosshairs and corner-pin labels
- BEM class: `.navigation-variation-08`

**Style 09: Kinetic Hover Nav**
- Menu text starts small and grows to massive size on hover
- Pushes other menu items out of way dynamically
- BEM class: `.navigation-variation-09`

**Style 10: The Floating Island**
- Pill-shaped menu floats at bottom of screen (optimal for thumb reach)
- Expands upward when tapped
- BEM class: `.navigation-variation-10`

---

### 3.5 Breadcrumb Block Laboratory

**Route:** `/dev-tools/block-library/breadcrumbs`  
**Component:** `/components/pages/dev-tools/block-library/BreadcrumbsBlockLabPage.tsx`  
**BEM CSS:** `/styles/blocks/breadcrumb-variations.css`

**10 Variations:**

**Style 01: The Path-based Trail**
- Shows actual history of where user has been, not just site hierarchy
- BEM class: `.breadcrumb-variation-01`

**Style 02: The Snake Line**
- Continuous, winding line connects page titles
- Visually draws path from "Home" to current page
- BEM class: `.breadcrumb-variation-02`

**Style 03: Emoji-Divided**
- Uses custom emojis as delimiters (e.g., `Home 🚀 Portfolio 🎨 Project Name`)
- BEM class: `.breadcrumb-variation-03`

**Style 04: The Vertical Stack**
- Breadcrumbs appear in tiny vertical column in left margin
- BEM class: `.breadcrumb-variation-04`

**Style 05: Floating Pills**
- Each step in path is its own high-contrast, rounded "pill" button with drop shadow
- BEM class: `.breadcrumb-variation-05`

**Style 06: The Progress Ring**
- Circular breadcrumb in corner showing "Steps" (e.g., 2/4)
- Expands to show path on hover
- BEM class: `.breadcrumb-variation-06`

**Style 07: Retro-Terminal**
- Fixed-width font with brackets (e.g., `[root] > [portfolio] > [project_01]`)
- Green-on-black color scheme
- BEM class: `.breadcrumb-variation-07`

**Style 08: The Overlap**
- Breadcrumb links slightly overlap each other, using transparency to show depth
- BEM class: `.breadcrumb-variation-08`

**Style 09: The Breadcrumb Slider**
- On mobile, if path too long, becomes horizontal scrollable strip to save space
- BEM class: `.breadcrumb-variation-09`

**Style 10: Ghost Breadcrumbs**
- Only "Current Page" is visible
- Hovering reveals parent pages in fading "ghost" animation
- BEM class: `.breadcrumb-variation-10`

**Dev Tool Features:**
- **Thumb-Zone Overlay:** Toggle "Thumb Reach" heatmap over navigation styles to test mobile ergonomics
- **Hierarchy Stress Test:** Button to auto-generate 5-level deep breadcrumb path to test "Deep Sites" vs "Flat Sites"

---

### 3.6 Image Gallery/Slideshow Laboratory

**Route:** `/dev-tools/block-library/gallery`  
**Component:** `/components/pages/dev-tools/block-library/GalleryBlockLabPage.tsx`  
**BEM CSS:** `/styles/blocks/gallery-variations.css`

**10 Variations:**

**Style 01: The Bento Chaos (Asymmetric Grid)**
- Modular grid where images take up different "unit" sizes (1x1, 2x1, 2x2)
- On hover, "units" shift slightly and image scales up to fill container
- Best For: Portfolio homepages
- BEM class: `.gallery-variation-01`

**Style 02: The Film Strip (Horizontal Scroll)**
- Images lined up side-by-side, overflowing screen width
- Visible "perforation" holes on top and bottom
- Kinetic dragging (mobile-style) or scroll-wheel-to-horizontal-move transition
- Best For: Video stills or Event recaps
- BEM class: `.gallery-variation-02`

**Style 03: The Scatter Deck (Interactive Pile)**
- Images appear "tossed" onto page at random angles and positions, overlapping
- Users can click and "drag" images around screen
- Clicking one brings it to front (highest z-index)
- Best For: Creative Portfolio "Moodboards"
- BEM class: `.gallery-variation-03`

**Style 04: The Infinite Carousel (Looping Marquee)**
- Seamless, non-stop moving row of images
- Speed increases as mouse moves to edges of screen; hover to pause
- Best For: Brand logos or Social Media feeds
- BEM class: `.gallery-variation-04`

**Style 05: The Accordion Split (Expansion)**
- Images are thin vertical strips side-by-side
- Hovering over strip expands it to 60% of container width while others shrink
- Best For: Showcasing 4-5 high-impact Portfolio categories
- BEM class: `.gallery-variation-05`

**Style 06: The Magnified Loupe (Detail View)**
- Clean 2-column grid
- As mouse moves over image, circular "lens" follows cursor showing high-res zoomed-in detail
- Best For: High-detail Photography or Art
- BEM class: `.gallery-variation-06`

**Style 07: The Polaroid Fan (Nostalgic Stack)**
- Single stack of photos with white borders
- Clicking "Next" slides top photo off deck (left or right) with physics-based "flick" animation
- Best For: Event galleries
- BEM class: `.gallery-variation-07`

**Style 08: The 3D Carousel (Depth)**
- Images arranged in 3D circle
- "Active" image is front and center, while others fade and shrink into background
- Mouse-wheel rotation with "blur" effect on images in motion
- Best For: Video playlists
- BEM class: `.gallery-variation-08`

**Style 09: The Glitch-Transition Slideshow (Digital)**
- Full-bleed single image
- When slide changes, image "fragments" into pixels or RGB-slices before reassembling into next shot
- Best For: Music/Podcast visuals or Hero sections
- BEM class: `.gallery-variation-09`

**Style 10: The Tiled Reveal (Pattern)**
- Grid where images hidden behind solid color tiles
- As user scrolls, tiles flip 180 degrees (like game show board) to reveal images underneath
- Best For: FAQs or Hidden Features
- BEM class: `.gallery-variation-10`

**Dev Tool Features:**
- **Aspect Ratio Switcher:** Test how each gallery handles 16:9 (Video) vs 9:16 (Social) vs 1:1 (Insta)
- **Gutter Control:** Slider from "No Gap" (Brutalist) to "Airy" (Minimalist)
- **Caption Toggle:** Test 5 caption styles (Overlaid Glass, Underneath Monospace, Tooltip)

---

### 3.7 Social Icons Laboratory

**Route:** `/dev-tools/block-library/social-icons`  
**Component:** `/components/pages/dev-tools/block-library/SocialIconsBlockLabPage.tsx`  
**BEM CSS:** `/styles/blocks/social-icon-variations.css`

**5 Variations:**

**Style 01: The Gooey Liquid (Organic)**
- Icons sit in row of soft, blurred "blobs"
- When you hover between two icons, background "stretches" and snaps between them like digital lava-lamp wax
- Best For: Portfolio footers and Podcast guest links
- BEM class: `.social-icon-variation-01`

**Style 02: The RGB Ghost (Glitch)**
- Simple white or black icons
- On hover, icon splits into three layers (Red, Green, Blue) that vibrate slightly out of sync
- Best For: Video pages and Cyber-Tech posts
- BEM class: `.social-icon-variation-02`

**Style 03: The 3D Clay (Tactile)**
- Oversized, pillowy icons with deep inner shadows and high-gloss highlights
- Icon "depresses" into page (scales down 5%) when clicked, with soft bounce-back
- Best For: Events and Creative Pages
- BEM class: `.social-icon-variation-03`

**Style 04: The Monospace Label (Brutalist)**
- No logos. Just raw text in brackets: `[ TWITTER ]`, `[ INSTA ]`, `[ BEHANCE ]`
- On hover, brackets expand and background fills with solid neon block
- Best For: FAQ sidebars and Technical Posts
- BEM class: `.social-icon-variation-04`

**Style 05: The Spinning Vinyl (Interactive)**
- Icons housed inside circular "records" or coins
- Icon spins rapidly (360 degrees) on hover
- Brand's primary color (e.g., YouTube Red) bleeds out as glowing aura
- Best For: Podcast links and Hero sections
- BEM class: `.social-icon-variation-05`

---

### 3.8 Search Bar Laboratory

**Route:** `/dev-tools/block-library/search`  
**Component:** `/components/pages/dev-tools/block-library/SearchBlockLabPage.tsx`  
**BEM CSS:** `/styles/blocks/search-variations.css`

**10 Variations:**

1. **Full-Screen Overlay** – Expands to cover entire viewport when clicked
2. **Expanding Icon-Only** – Starts as magnifying glass icon, expands to input on click
3. **Floating Command-K Bar** – Keyboard shortcut trigger (Cmd+K style)
4. **Inline Filter Chips** – Search with category chips below
5. **Voice Search Visual** – Microphone icon with waveform animation
6. **Brutalist Block Input** – Thick borders, monospace font, high contrast
7. **Glassmorphism Floating Bar** – Blur background, transparent input
8. **Neon Pulse Search** – Glowing border animation
9. **Typewriter Autocomplete** – Suggestions appear with typing effect
10. **Sidebar Search Panel** – Slides in from side with advanced filters

---

## 📋 Phase 4: Pattern Compositions (Sessions 16-21)

### 4.1 Patterns Landing Page

**Route:** `/dev-tools/patterns`  
**Component:** `/components/pages/dev-tools/PatternsLibraryPage.tsx`  
**BEM CSS:** `/styles/blocks/patterns-library.css`

**Features:**
- Grid layout showcasing 5 pattern categories
- Each pattern is pre-assembled composition of multiple blocks
- Live preview thumbnails
- Links to dedicated pattern lab pages

---

### 4.2 Hero Section Patterns Laboratory

**Route:** `/dev-tools/patterns/hero`  
**Component:** `/components/pages/dev-tools/patterns/HeroPatternsLabPage.tsx`  
**BEM CSS:** `/styles/patterns/hero-variations.css`

**10 Variations:**

**Pattern 01: The Typographic Titan (Text-Only)**
- Heading Style 17 (Video Mask) takes up 90% of viewport
- No images, just raw motion inside letters
- Background color flips as user scrolls past "fold"
- Best For: High-concept Pages and Portfolio entries
- BEM class: `.hero-pattern-01`

**Pattern 02: The 3D Spline Stage (Interactive)**
- Floating, interactive 3D object (chrome sphere or funky character) sits in center
- Object follows mouse cursor or rotates based on scroll depth
- Best For: Video landing pages or Events
- BEM class: `.hero-pattern-02`

**Pattern 03: The Split-Vertical Reveal**
- Screen split 50/50 vertically
- Left: solid neon color with massive Heading
- Right: vertical Image Gallery (Style 02)
- Two sides scroll at different speeds (Parallax)
- Best For: Podcast episodes (Guest on one side, Episode Title on other)
- BEM class: `.hero-pattern-03`

**Pattern 04: The Bento-Box Hero**
- Grid of 5 tiles: Title, Video Preview, CTA Button, Social Proof, Animated Icon
- Each tile has different "Entry Animation" (Bounce, Fade, Slide)
- Best For: Events or Portfolio case studies
- BEM class: `.hero-pattern-04`

**Pattern 05: The Full-Bleed Glitch**
- Background video with heavy "Scanned Distortion" (Divider Style 07) overlay
- On hover, "glitch" clears up to reveal sharp, high-def image
- Best For: Videos and Experimental Posts
- BEM class: `.hero-pattern-05`

**Pattern 06: The Floating HUD (UI-Heavy)**
- Minimalist background with "Technical Crosshairs" and "Metadata" floating in corners like cockpit display
- Elements drift slightly as if floating in zero gravity
- Best For: Technical Posts or FAQs
- BEM class: `.hero-pattern-06`

**Pattern 07: The Gradient Wash (Atmospheric)**
- No hard edges. Massive, moving mesh gradient serves as backdrop for clean, white Heading
- Gradient colors change based on time of day or user's system theme
- Best For: Pages or Quotes
- BEM class: `.hero-pattern-07`

**Pattern 08: The Sticker Bomb (Maximalist)**
- Central image (Style 03: Sticker Peel) surrounded by dozens of smaller floating icons, tags, badges
- Users can "drag" stickers around hero area to reveal text underneath
- Best For: Events and Creative Portfolio pieces
- BEM class: `.hero-pattern-08`

**Pattern 09: The Liquid Reveal (Sleek)**
- Page starts completely solid color
- As user scrolls, "Liquid" mask (Divider Style 03) opens up to reveal Hero content
- High-friction scroll—user has to "pull" content onto screen
- Best For: Portfolio reveals
- BEM class: `.hero-pattern-09`

**Pattern 10: The Search-First Hero**
- Giant, centered Search Bar (Style 06: Full-screen overlay) with "How can we help?" heading
- Background blurs as soon as user clicks search input
- Best For: FAQs or large Video/Podcast archives
- BEM class: `.hero-pattern-10`

**Dev Tool Features:**
- **Safe Area Overlay:** Toggle to show where "Navigation" and "Scroll Indicators" sit
- **Mobile Simulator:** Instantly switch between "Desktop Wide" and "Mobile Tall"
- **Vibe Mapping:** Dropdown to apply one of 5 Form Themes to Hero's CTA buttons

---

### 4.3 CTA (Call-to-Action) Patterns Laboratory

**Route:** `/dev-tools/patterns/cta`  
**Component:** `/components/pages/dev-tools/patterns/CTAPatternsLabPage.tsx`  
**BEM CSS:** `/styles/patterns/cta-variations.css`

**10 Variations:**

**Pattern 01: The Sticky Bottom Strip**
- Persistent 80px tall bar stays at bottom of screen
- Scrolling marquee CTA and single massive button
- BEM class: `.cta-pattern-01`

**Pattern 02: The Full-Bleed Video Punch**
- Background video loop with "Window" button (Button Style 19) in dead center
- BEM class: `.cta-pattern-02`

**Pattern 03: The Giant Typography Lead**
- No images. Just heading (Heading Style 18: Video Mask) taking up 80% of screen
- Button follows cursor
- BEM class: `.cta-pattern-03`

**Pattern 04: The Newsletter Sticker**
- Floating card that looks like physical post-it note stuck to corner of section
- Uses "Hand-Drawn" form theme
- BEM class: `.cta-pattern-04`

**Pattern 05: The Split-Screen Duel**
- Two contrasting buttons (e.g., "Hire Me" vs "See Work") taking up 50/50 of screen
- Diagonal divider (Divider Style 06)
- BEM class: `.cta-pattern-05`

**Pattern 06: The Interactive Puzzle**
- Users have to "drag" icon into target area to unlock "Sign Up" button
- High friction, but high engagement for "funky" brand
- BEM class: `.cta-pattern-06`

**Pattern 07: The Floating Island CTA**
- Glassmorphism card floats over parallax background image
- Shifts as user moves phone/mouse
- BEM class: `.cta-pattern-07`

**Pattern 08: The Censored Reveal**
- CTA where text is hidden behind "Redacted" bars
- Disappear only when user hovers over button
- BEM class: `.cta-pattern-08`

**Pattern 09: The Countdown Pressure**
- CTA focused entirely on retro-digital countdown clock
- Button pulses in sync with seconds
- BEM class: `.cta-pattern-09`

**Pattern 10: The Bento-Action Grid**
- Grid of 4 tiles: 3 show "Success Proof" (Testimonials), 4th (largest) is "Action" button
- BEM class: `.cta-pattern-10`

**Dev Tool Features:**
- **Mobile First Toggle:** Test every CTA pattern on 390px width screen
- **A/B Color Swapper:** Instantly flip colors (Neon on Black vs White on Neon)

---

### 4.4 Pricing Table Patterns Laboratory

**Route:** `/dev-tools/patterns/pricing`  
**Component:** `/components/pages/dev-tools/patterns/PricingPatternsLabPage.tsx`  
**BEM CSS:** `/styles/patterns/pricing-variations.css`

**5 Variations:**

**Pattern 01: The Bento-Switch (Modular)**
- Grid of 3 tiles
- "Recommended" plan is 2x size of others, sits in glowing Glassmorphism container
- Giant, tactile toggle (Form Theme: Industrial Breaker) at top switches prices between "Monthly" and "Yearly"
- Best For: SaaS Pages or Service Portfolios
- BEM class: `.pricing-pattern-01`

**Pattern 02: The Receipt Scroll (Brutalist)**
- Long, narrow vertical strips that look like thermal printer receipts with "jagged" edges at bottom
- On hover, "receipt" extends downward to reveal detailed feature list in Monospace font
- Best For: Technical Posts or Events
- BEM class: `.pricing-pattern-02`

**Pattern 03: The Liquid Slider (Experimental)**
- No tables. Just one large, centered card
- Horizontal slider at bottom. As you slide, card "morphs" (Image Block Style 01) into different colors and shapes
- Updates price and features dynamically
- Best For: Creative Portfolio packages
- BEM class: `.pricing-pattern-03`

**Pattern 04: The Arcade Cabinet (Retro-Digital)**
- Three neon-bordered boxes that look like arcade game screens
- Hovering over plan triggers "Level Up" sound effect
- Button (Button Style 14: Arcade Switch) flashes "INSERT COIN"
- Best For: Video subscriptions or Gaming content
- BEM class: `.pricing-pattern-04`

**Pattern 05: The Floating Aura (Minimalist)**
- Ghostly, borderless text floating over deep dark background
- When plan is selected, massive Neon Glow (Image Style 08) appears behind it
- Casts light onto surrounding sections
- Best For: High-end Consulting or Podcasts
- BEM class: `.pricing-pattern-05`

**Dev Tool Features:**
- **Currency Switcher:** Dropdown to test $ vs € vs £ (and long numbers) fit in funky boxes
- **Feature Stress-Test:** Toggle to add 20+ features to see how styles handle long-scrolling content
- **Comparison Mode:** "Highlight Differences" button dims all features common to all plans

**Note:** This is personal art portfolio, so pricing is conceptual/demonstration only.

---

### 4.5 Testimonial/Social Proof Patterns Laboratory ⭐ PRIORITY

**Route:** `/dev-tools/patterns/testimonials`  
**Component:** `/components/pages/dev-tools/patterns/TestimonialPatternsLabPage.tsx`  
**BEM CSS:** `/styles/patterns/testimonial-variations.css`

**5 Variations:**

**Pattern 01: The Speech Bubble Cloud (Dynamic)**
- Visual: Quotes (Paragraph Style 04: Floating Glass) appear as overlapping, varied-size speech bubbles
- Drifting slightly on parallax background
- Interaction: Clicking bubble brings it to front and plays 2-second audio snippet (perfect for Podcasts)
- Best For: Podcast guest reviews or Event shout-outs
- BEM class: `.testimonial-pattern-01`

**Pattern 02: The Social Media Scraper (Authentic)**
- Visual: Masonry grid of "cards" that look like raw, unedited screenshots from X (Twitter), Discord, or Instagram
- Complete with "Like" counts and timestamps
- Interaction: On hover, "Glitch" filter (Image Style 06) clears to show original high-res post
- Best For: Video testimonials or Portfolio feedback
- BEM class: `.testimonial-pattern-02`

**Pattern 03: The Moving Marquee (Energy)**
- Visual: Three rows of infinitely scrolling text
- Row 1 moves left, Row 2 moves right, Row 3 moves left
- Each row contains short, punchy 5-star snippets
- Interaction: Hovering over any row slows it down to readable pace and highlights reviewer's avatar
- Best For: Landing Pages and Hero sub-sections
- BEM class: `.testimonial-pattern-03`

**Pattern 04: The Video Toast (Immersive)**
- Visual: Large central video circle (Image Style 01: Blob) featuring customer talking
- Quote (Heading Style 22: Bracketed) rotates around perimeter
- Interaction: Text "orbits" video faster as video plays
- Best For: Case Studies and Portfolio deep-dives
- BEM class: `.testimonial-pattern-04`

**Pattern 05: The Brutalist Wall (Direct)**
- Visual: Massive, 200px tall text quotes spanning full width of screen
- No avatars. No stars. Just raw black text on neon background
- Interaction: As you scroll, text "Redacts" and "Un-redacts" (Heading Style 18) to highlight key praise
- Best For: Technical Posts and FAQs
- BEM class: `.testimonial-pattern-05`

**Dev Tool Features: "The Trust Engine"**
- **Star-Rating Switcher:** Toggle between classic stars, "thumbs up" icons, custom emojis, or "percentage of stoke" bar
- **Avatar Masker:** Test how 5 themes handle square vs round vs "blob" customer photos
- **Hype Meter:** Slider that increases "Funky" level—at 100%, testimonials start floating and rotating in 3D space

**Strategic Mapping:**
- Events: Use The Moving Marquee to show high-volume excitement
- Portfolio: Use The Video Toast for deep-seated credibility
- Pages: Use The Speech Bubble Cloud to keep layout feeling light and airy

---

### 4.6 Countdown/Urgency Patterns Laboratory (TBD)

**Route:** `/dev-tools/patterns/countdown`  
**Component:** `/components/pages/dev-tools/patterns/CountdownPatternsLabPage.tsx`  
**BEM CSS:** `/styles/patterns/countdown-variations.css`

**5 Variations (to be defined):**

Suggested concepts:
1. **Retro Digital Clock** – Flip-card style numbers
2. **Neon Pulse Countdown** – Numbers glow brighter as deadline approaches
3. **Progress Ring Timer** – Circular countdown with percentage
4. **Brutalist Block Timer** – Monospace numbers in bordered boxes
5. **Liquid Morphing Countdown** – Numbers morph like blob shapes

---

## 📋 Phase 5: Polish & Integration (Sessions 22-25)

### 5.1 Global Navigation Updates

**Tasks:**
- Add "Block Library" to Dev Tools hub navigation
- Add "Patterns Library" to Dev Tools hub navigation
- Update DevToolsPage category system:
  - **Category: "Design System" (new)**
    - Block Library (new)
    - Patterns Library (new)
    - Color Palettes (existing)
    - Typography Specimens (existing)
    - Spacing Specimens (existing)
    - Shadow Specimens (existing)
    - Radius Specimens (existing)
    - Button Specimens (existing)
    - Card Specimens (existing)
    - Neon Specimens (existing)

---

### 5.2 Export Functionality

**Component:** `/components/dev-tools/CodeExporter.tsx`  
**BEM CSS:** `/styles/blocks/code-exporter.css`

**Features:**
- **CSS Export:** Syntax-highlighted CSS with all variation styles
- **JSON Export:** Design tokens in JSON format
- **React Component Export:** Full React component code with BEM classes
- **Copy-to-Clipboard:** One-click copy for all formats
- **Format Selection:** Dropdown to choose export format
- **Syntax Highlighting:** Use existing code syntax highlighter

---

### 5.3 Theme Switcher Integration

**Component:** `/components/dev-tools/ThemeSwitcher.tsx` (reusable)  
**BEM CSS:** `/styles/blocks/theme-switcher.css`

**Features:**
- **4 Theme Modes:** Dark, Light, Neon, Brutalist
- **Real-time Preview:** All variations update instantly on theme change
- **Theme-Specific Use Case Notes:** Sidebar shows which variations work best in which themes
- **Persistent Selection:** Remember user's theme choice via localStorage

**Implementation:**
- Apply theme via root CSS class: `.theme-dark`, `.theme-light`, `.theme-neon`, `.theme-brutalist`
- Each variation CSS must have theme-specific overrides

---

### 5.4 Documentation & Use Case Explainers

**Create `/guidelines/blocks/` directory:**

**Files to create:**
- `/guidelines/blocks/paragraph-variations.md`
- `/guidelines/blocks/heading-variations.md`
- `/guidelines/blocks/button-variations.md`
- `/guidelines/blocks/list-variations.md`
- `/guidelines/blocks/divider-variations.md`
- `/guidelines/blocks/form-variations.md`
- `/guidelines/blocks/image-variations.md`
- `/guidelines/blocks/navigation-variations.md`
- `/guidelines/blocks/breadcrumb-variations.md`
- `/guidelines/blocks/gallery-variations.md`
- `/guidelines/blocks/social-icon-variations.md`
- `/guidelines/blocks/search-variations.md`

**Create `/guidelines/patterns/` directory:**

**Files to create:**
- `/guidelines/patterns/hero-patterns.md`
- `/guidelines/patterns/cta-patterns.md`
- `/guidelines/patterns/pricing-patterns.md`
- `/guidelines/patterns/testimonial-patterns.md`
- `/guidelines/patterns/countdown-patterns.md`

**Each documentation file must include:**
- All variation descriptions
- Strategic use cases per post type
- CSS architecture notes
- Accessibility considerations
- Animation performance notes
- Theme compatibility notes
- Code examples

---

### 5.5 Accessibility Audit

**Tasks:**
- Verify WCAG 2.1 AA compliance for all 240+ variations
- Full `prefers-reduced-motion` support for all animations
- Keyboard navigation for all interactive elements
- Screen reader compatibility testing
- Color contrast verification (especially neon variations)
- Focus indicators on all interactive variations
- ARIA labels where appropriate

**Checklist per variation:**
- [ ] Color contrast meets 4.5:1 minimum (body text)
- [ ] Animation has `prefers-reduced-motion` fallback
- [ ] Interactive elements are keyboard accessible
- [ ] Screen reader announces variation purpose
- [ ] Focus indicator visible and clear
- [ ] No rapid flashing that could trigger seizures

---

## 🔧 Technical Requirements

### Bundler Compatibility (CRITICAL)

All implementations MUST follow Figma Make bundler constraints:
- No arrow functions in certain contexts (use named function expressions)
- No destructuring in router/lib code
- No template literals in problematic areas
- All object/array access via `grab()`, `arrayGet()`, `setProp()` helpers from `/lib/router.tsx`
- Use `var` declarations in router/lib code for safety
- Classic `for` loops (no `for...of`)
- No optional chaining (`?.`)
- No nullish coalescing (`??`)
- No nested ternaries (convert to if/else blocks)
- No `break` in loops inside closures (use `i = length` pattern)

---

### BEM CSS Architecture (CRITICAL)

**NO Tailwind utility classes** (already migrated to strict BEM)

**All styling via semantic BEM classes in:**
- `/styles/blocks/` - Block variations
- `/styles/patterns/` - Pattern compositions

**Naming Conventions:**
- **Block:** `.paragraph-variation-01`, `.heading-variation-12`, `.button-variation-05`
- **Element:** `.paragraph-variation-01__text`, `.heading-variation-12__shadow-layer`, `.button-variation-05__icon`
- **Modifier:** `.paragraph-variation-01--active`, `.heading-variation-12--theme-neon`, `.button-variation-05--hovered`

---

### CSS File Organization

```
/styles/
├── blocks/
│   ├── global-block-library.css      # Master landing page
│   ├── block-lab-template.css        # Shared lab UI
│   ├── paragraph-variations.css      # 20 paragraph styles
│   ├── heading-variations.css        # 25 heading styles
│   ├── button-variations.css         # 20 button styles
│   ├── list-variations.css           # 10 list styles
│   ├── divider-variations.css        # 10 divider styles
│   ├── form-variations.css           # 5 form themes
│   ├── image-variations.css          # 10 image styles
│   ├── navigation-variations.css     # 10 navigation styles
│   ├── breadcrumb-variations.css     # 10 breadcrumb styles
│   ├── gallery-variations.css        # 10 gallery styles
│   ├── social-icon-variations.css    # 5 social icon styles
│   ├── search-variations.css         # 10 search bar styles
│   ├── code-exporter.css             # Export UI
│   └── theme-switcher.css            # Theme toggle UI
└── patterns/
    ├── patterns-library.css          # Patterns landing page
    ├── hero-variations.css           # 10 hero patterns
    ├── cta-variations.css            # 10 CTA patterns
    ├── pricing-variations.css        # 5 pricing patterns
    ├── testimonial-variations.css    # 5 testimonial patterns
    └── countdown-variations.css      # 5 countdown patterns (TBD)
```

---

### Data Architecture

```
/data/mock/design-system/
├── post-type-mappings.ts             # Content type → visual direction mappings
├── paragraph-variations.ts           # Metadata for 20 paragraph styles
├── heading-variations.ts             # Metadata for 25 heading styles
├── button-variations.ts              # Metadata for 20 button styles
├── list-variations.ts                # Metadata for 10 list styles
├── divider-variations.ts             # Metadata for 10 divider styles
├── form-variations.ts                # Metadata for 5 form themes
├── image-variations.ts               # Metadata for 10 image styles
├── navigation-variations.ts          # Metadata for 10 navigation styles
├── breadcrumb-variations.ts          # Metadata for 10 breadcrumb styles
├── gallery-variations.ts             # Metadata for 10 gallery styles
├── social-icon-variations.ts         # Metadata for 5 social icon styles
├── search-variations.ts              # Metadata for 10 search bar styles
├── hero-patterns.ts                  # Metadata for 10 hero patterns
├── cta-patterns.ts                   # Metadata for 10 CTA patterns
├── pricing-patterns.ts               # Metadata for 5 pricing patterns
├── testimonial-patterns.ts           # Metadata for 5 testimonial patterns
└── countdown-patterns.ts             # Metadata for 5 countdown patterns (TBD)
```

---

### Component Architecture

```
/components/pages/dev-tools/
├── GlobalBlockLibraryPage.tsx        # Master landing page
├── PatternsLibraryPage.tsx           # Patterns landing page
├── block-library/
│   ├── ParagraphBlockLabPage.tsx     # 20 paragraph variations
│   ├── HeadingBlockLabPage.tsx       # 25 heading variations
│   ├── ButtonBlockLabPage.tsx        # 20 button variations
│   ├── ListBlockLabPage.tsx          # 10 list variations
│   ├── DividerBlockLabPage.tsx       # 10 divider variations
│   ├── FormsBlockLabPage.tsx         # 5 form themes
│   ├── ImageBlockLabPage.tsx         # 10 image variations
│   ├── NavigationBlockLabPage.tsx    # 10 navigation variations
│   ├── BreadcrumbsBlockLabPage.tsx   # 10 breadcrumb variations
│   ├── GalleryBlockLabPage.tsx       # 10 gallery variations
│   ├── SocialIconsBlockLabPage.tsx   # 5 social icon variations
│   └── SearchBlockLabPage.tsx        # 10 search bar variations
└── patterns/
    ├── HeroPatternsLabPage.tsx       # 10 hero patterns
    ├── CTAPatternsLabPage.tsx        # 10 CTA patterns
    ├── PricingPatternsLabPage.tsx    # 5 pricing patterns
    ├── TestimonialPatternsLabPage.tsx # 5 testimonial patterns
    └── CountdownPatternsLabPage.tsx  # 5 countdown patterns (TBD)
```

---

### Shared Component Templates

**Create reusable templates in `/components/dev-tools/`:**
- `BlockLabTemplate.tsx` - Shared laboratory UI structure
- `VariationCard.tsx` - Individual variation preview card
- `CodeExporter.tsx` - CSS/JSON/React export functionality
- `ThemeSwitcher.tsx` - Dark/Light/Neon/Brutalist toggle
- `PostTypeFilter.tsx` - Filter variations by content type
- `ContextPreview.tsx` - Preview variation in post-type context
- `PropertyControl.tsx` - Interactive sliders, toggles, color pickers
- `VariationThumbnail.tsx` - Thumbnail preview for sidebar

---

## 🎨 Design System Integration

### Neon Color System

- All variations must integrate existing 33 neon color palettes (`/guidelines/design-tokens/neon-colors.md`)
- Use neon variants for Dark mode (full brightness)
- Use accessible text variants for Light mode (WCAG AA compliant)
- Reference existing CSS custom properties in `/styles/globals.css`:
  - `--neon-green`, `--neon-pink`, `--neon-blue`, `--neon-yellow`, `--neon-orange`, `--neon-violet`, `--neon-cyan`, `--neon-red`
  - `--atomic-black` (#0F0F0F)
  - Gradient variables: `--gradient-cyberpunk`, `--gradient-toxic-lime`, `--gradient-solar-flare`, `--gradient-hyperpop`

---

### Animation System

- Leverage existing 26 keyframe animations (`/guidelines/design-tokens/animations.md`)
- Create new animations as needed for wild/funky variations
- All animations MUST have `prefers-reduced-motion` fallbacks
- Performance optimization: use `transform` and `opacity` only where possible
- Avoid `width`, `height`, `top`, `left` animations (use `transform` instead)

**Existing animations to reuse:**
- `neon-pulse`, `gradient-shift`, `float`, `bounce`, `rotate-360`, `jitter`, `marquee-scroll`, `typing`, `glitch-jitter`, `dash-draw`, `font-morph`

---

### Typography System

- Integrate existing 21 Google Fonts (`/styles/globals.css`)
- Use existing fluid typography utilities (`.text-hero-h1`, `.text-section-h2`, `.text-body-p`)
- Create new typography utilities for experimental variations
- Maintain WCAG AA contrast ratios
- Font families available:
  - `--font-heading` (Playfair Display - serif)
  - `--font-body` (Inter - sans-serif)
  - `--font-title` (Righteous - display)
  - `--font-mono` (Space Mono - monospace)
  - Plus 17 additional Google Fonts for funky variations

---

### Spacing System

- Use existing spacing tokens (`/guidelines/design-tokens/spacing.md`)
- Maintain responsive breakpoint consistency
- Fluid width system integration (Mobile Compact → Desktop XL → Full HD)
- Custom properties: `--space-xs`, `--space-sm`, `--space-md`, `--space-lg`, `--space-xl`, `--space-2xl`, `--space-3xl`

---

## 📊 Success Criteria

### Functional Requirements

- [ ] Master Block Library landing page with all 12 block types
- [ ] Patterns Library landing page with all 5 pattern categories
- [ ] Individual laboratory pages for each block type (12 pages)
- [ ] Individual laboratory pages for each pattern type (5 pages)
- [ ] Live preview system with real-time style switching
- [ ] Post-type context previews (7 types: Portfolio, Podcast, Events, Videos, FAQs, Quotes, Pages)
- [ ] Code export functionality (CSS, JSON, React component)
- [ ] Theme switcher (Dark/Light/Neon/Brutalist) on all lab pages
- [ ] Post-type filtering ("funky filter" logic)
- [ ] Mobile responsive (all breakpoints from Mobile Compact → Full HD)
- [ ] Interactive property controls (sliders, toggles, color pickers)

---

### Visual Requirements

**Core Blocks:**
- [ ] 20 paragraph variations fully styled
- [ ] 25 heading variations fully styled
- [ ] 20 button variations fully styled
- [ ] 10 list variations fully styled
- [ ] 10 divider variations fully styled
- [ ] 5 form theme variations fully styled
- [ ] 10 image block variations fully styled
- [ ] 10 navigation variations fully styled
- [ ] 10 breadcrumb variations fully styled
- [ ] 10 gallery variations fully styled
- [ ] 5 social icon variations fully styled
- [ ] 10 search bar variations fully styled

**Pattern Compositions:**
- [ ] 10 hero patterns fully styled
- [ ] 10 CTA patterns fully styled
- [ ] 5 pricing patterns fully styled
- [ ] 5 testimonial patterns fully styled
- [ ] 5 countdown patterns fully styled (TBD)

**Total:** 170+ variations

---

### Technical Requirements

- [ ] Strict BEM CSS architecture (no Tailwind utilities)
- [ ] Figma Make bundler compatibility (no forbidden syntax)
- [ ] Centralized mock data system integration
- [ ] TypeScript type safety across all components
- [ ] No `console.log` statements in production code
- [ ] Proper JSDoc comments on all components
- [ ] All variations work in all 4 themes (Dark/Light/Neon/Brutalist)
- [ ] All variations work across all responsive breakpoints

---

### Accessibility Requirements

- [ ] WCAG 2.1 AA compliance for all variations
- [ ] Full `prefers-reduced-motion` support for all animations
- [ ] Keyboard navigation for all interactive elements
- [ ] Screen reader compatibility for all variations
- [ ] Focus indicators on all interactive elements (3px neon pink glow)
- [ ] Color contrast verification (4.5:1 minimum for body text)
- [ ] ARIA labels where appropriate
- [ ] No rapid flashing animations (seizure prevention)

---

### Documentation Requirements

- [ ] Block variation metadata in `/data/mock/design-system/`
- [ ] Use case explainers for each variation
- [ ] Post-type mapping documentation
- [ ] CSS architecture notes in `/guidelines/blocks/`
- [ ] Pattern documentation in `/guidelines/patterns/`
- [ ] Strategic deployment recommendations
- [ ] Performance optimization notes
- [ ] Animation performance guidelines
- [ ] Theme compatibility matrix

---

## 🚧 Implementation Phases (Recommended)

### Phase 1: Foundation (Sessions 1-3)
- **Focus:** Architecture, templates, master landing pages
- **Deliverable:** Block Library + Patterns Library landing pages + reusable lab template

### Phase 2: Core Blocks – Part A (Sessions 4-9)
- **Focus:** Paragraph (20) + Heading (25) + Button (20) + List (10)
- **Deliverable:** 75 variations across 4 priority blocks
- **Rationale:** Most frequently used blocks

### Phase 3: Core Blocks – Part B (Sessions 10-15)
- **Focus:** Divider (10) + Forms (5) + Image (10) + Navigation (10) + Breadcrumbs (10) + Gallery (10) + Social Icons (5) + Search (10)
- **Deliverable:** 70 variations across 8 secondary blocks

### Phase 4: Pattern Compositions (Sessions 16-21)
- **Focus:** Hero (10) + CTA (10) + Pricing (5) + Testimonials (5) + Countdown (5)
- **Deliverable:** 35 pre-assembled pattern compositions

### Phase 5: Polish & Integration (Sessions 22-25)
- **Focus:** Export, documentation, accessibility audit, navigation integration
- **Deliverable:** Production-ready design system expansion

---

## 🎯 Strategic Use Cases

### Post-Type Visual Direction Mapping

| Content Type | Visual Direction | Primary Blocks | Recommended Paragraph Styles | Recommended Heading Styles | Recommended Button Styles | Recommended Image Styles |
|---|---|---|---|---|---|---|
| **Portfolio** | High Visual / Minimal Text | Gallery, Columns, Image | Liquid Text, Floating Glass, Glitch | Background Clip Video, Chrome/Liquid, Hard Shadow | Claymorphism, Mercury Liquid, The Portal | Organic Blob, Floating Glass, Blueprint Cross-Section |
| **Podcast** | Audio-Centric / High Contrast | Media & Text, Progress, Quotes | The Drop Cap, Typewriter, The Morph | Mixed Weights, Floating Icon, Jitter-Type | Plasma Pulse, Variable Weight, Acid Glass | Neon Glow, Scanned/Glitch, Polaroid Stack |
| **Events** | Dynamic / Urgency | Countdown, Maps, Buttons | Glitch, Brutalist, Kinetic Scroll | Infinite Marquee, Jitter-Type, Elastic Bounce | The Arcade Switch, Caution Tape, Confetti Popper | Sticker Peel, Film Strip, Polaroid Fan |
| **Videos** | Immersive / Dark Mode | Video Embeds, Sliders, Playback | Background Clip, Floating Glass, Shadow Depth | Anaglyph, Hard Shadow, Background Clip Video | Cyber-Punk Glitch, The Portal, Plasma Pulse | Neon Glow, Scanned/Glitch, 3D Carousel |
| **FAQs** | Clean / Accessible | Accordion, Search, Lists | The Pill, Dashed Border, Mag-Spread | Sub-Label, Underline Dash, Numbered Lead | The Blueprint, Neo-Grotesque, Acid Glass | Brutalist Frame, Floating Glass, Search-First Hero |
| **Quotes** | Typographic / Bold | Paragraph (Oversized), Separators, Headings | The Morph, Shadow Depth, Acid Retro | Struck-Through, Highlighted Box, The Stamp | Rough Hand-Drawn, The Sticker, 90s Pop | Halftone Screen, Brutalist Frame, Blueprint Cross-Section |
| **Pages** | Editorial / Narrative | Media & Text, Columns, Galleries | Mag-Spread, The Highlight, The Drop Cap | Numbered Lead, Bracketed, Layered Outline | Acid Glass, Mercury Liquid, The Window | Floating Glass, Window Blind, Magnified Loupe |

---

## 🔍 Audit Questions for User

Before implementation begins, clarify the following:

1. **Scope Priority:** Which phase should be implemented first? (Recommendation: Phase 1 + Phase 2)
2. **Visual Direction:** Any specific aesthetic preferences for "wild and funky" variations? (More brutalist vs more glassmorphism?)
3. **Font Selection:** Should new Google Fonts be added for experimental typography variations, or leverage existing 21 fonts?
4. **Video Integration:** For variations like "Background Clip Video" and "Video Mask," should these use embedded videos or animated gradients as fallbacks?
5. **Theme Priority:** Which theme mode should be primary design target? (Dark, Light, Neon, or Brutalist?)
6. **Pricing Patterns:** Should Phase 4.3 (Pricing Tables) be implemented, or skip since this is personal art portfolio?
7. **Performance Budget:** Any specific performance constraints for animation-heavy variations?
8. **Export Format:** Which code export formats are most important? (CSS, JSON, React component, Figma design tokens?)
9. **Countdown Patterns:** Should Phase 4.6 (Countdown/Urgency) be implemented? If yes, what specific concepts?
10. **Audio Integration:** For "Speech Bubble Cloud" testimonial pattern, should audio snippets be real or simulated?

---

## 📁 Deliverables

Upon completion of all phases, the project will include:

### Code Deliverables
- 2 new landing pages (Block Library + Patterns Library)
- 17 new laboratory pages (12 block labs + 5 pattern labs)
- 8+ new shared components (templates, exporters, switchers, controls)
- 170+ CSS variation styles across 20+ CSS files
- 17+ mock data files with variation metadata
- Full TypeScript type definitions
- Routing updates to `/routes.ts`

### Documentation Deliverables
- 12 block variation guideline files in `/guidelines/blocks/`
- 5 pattern composition guideline files in `/guidelines/patterns/`
- Strategic use case explainers for all variations
- Post-type mapping documentation
- CSS architecture notes
- Accessibility compliance reports
- Performance optimization guidelines
- Theme compatibility matrix

### Visual Deliverables
- 170+ fully styled block variations
- 35+ fully styled pattern compositions
- Live interactive preview system
- Code export functionality
- Multi-theme support (Dark/Light/Neon/Brutalist)
- Responsive design across all breakpoints

---

## ⚠️ Constraints & Considerations

### Bundler Constraints (CRITICAL)
- All code must follow Figma Make bundler compatibility rules
- Use safety helpers from `/lib/router.tsx` for object/array access
- Avoid forbidden syntax (optional chaining, nullish coalescing, etc.)
- Test all variations in production build
- No arrow functions in certain contexts
- Named function expressions preferred

### CSS Architecture Constraints
- **Strict BEM only** - no Tailwind utilities
- All styling through `/styles/blocks/` and `/styles/patterns/`
- No inline styles
- Maintain semantic class naming
- Each variation gets unique BEM class

### Performance Considerations
- Animation-heavy variations may impact performance on low-end devices
- Implement `prefers-reduced-motion` for all animations
- Use `will-change` sparingly
- Optimize paint operations (prefer `transform` over `top/left`)
- Test on mobile devices (especially 3D and parallax effects)
- Consider performance budget for pages with multiple variations

### Accessibility Considerations
- Neon color variations must maintain WCAG AA contrast ratios
- Animated variations must not trigger seizures (no rapid flashing)
- All interactive elements must be keyboard accessible
- Screen reader compatibility for all variations
- Focus indicators must be clearly visible
- ARIA labels for complex interactions

### Content Considerations
- This is personal art portfolio (not commercial)
- No e-commerce/shop functionality
- No booking/services functionality
- Pricing patterns are conceptual/demonstration only
- Testimonials use mock data
- Audio snippets (if implemented) are simulated

---

## 📝 Next Steps

1. **User Review:** Review this prompt and answer audit questions above
2. **Phase Selection:** Determine which phases to implement first
3. **Visual Direction:** Provide any specific aesthetic guidance
4. **Implementation:** Begin Phase 1 (Foundation & Architecture)
5. **Iterative Review:** Review and refine each phase before moving to next
6. **Report Creation:** Create `/reports/feature-work/05-design-system-expansion/` folder for progress tracking
7. **Task List Creation:** Create `/tasks/design-system-expansion-tasks.md` when implementation begins
8. **Update Master Task List:** Add entry to `/tasks/master-task-list.md`

---

## 📈 Estimated Effort

**Total Implementation Time:** 20-30 sessions (depending on scope and iteration)

**Phase Breakdown:**
- Phase 1 (Foundation): 3 sessions
- Phase 2 (Core Blocks A): 6 sessions
- Phase 3 (Core Blocks B): 6 sessions
- Phase 4 (Patterns): 6 sessions
- Phase 5 (Polish): 4 sessions

**Note:** This is a MASSIVE undertaking. Consider implementing in stages, starting with highest-priority blocks (Paragraph, Heading, Button) and highest-impact patterns (Hero, CTA, Testimonials).

---

**Status:** Awaiting user direction  
**Related Sub-audits:**
- Sub-audit 02 (Card & Layout Lab) - Complete ✅ (provides template for lab architecture)
- Sub-audit 03 (Recommended page) - Pending (awaiting user direction)
- Sub-audit 04 (Gear page expansion) - Pending (no prompt created yet)

---

**Prompt Created:** March 7, 2026  
**Version:** 2.0 (Massively Expanded)  
**Author:** AI Assistant (per user request)  
**Expansion Sources:** 13 attachment documents + user testimonial specifications
