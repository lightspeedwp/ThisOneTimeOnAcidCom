# Sitemap Page Visual Test Checklist

**Created:** March 4, 2026  
**Purpose:** Visual QA checklist for sitemap funky styling and animations

## Pre-Test Setup

- [ ] Clear browser cache
- [ ] Ensure you're viewing the page at `/sitemap`
- [ ] Have DevTools open (F12) to inspect elements
- [ ] Test in both light and dark mode
- [ ] Test with animations enabled and disabled (`prefers-reduced-motion`)

---

## ✅ Visual Elements Test

### Rainbow Decoration

- [ ] **Visible:** Rainbow gradient stripe at top of page (6px tall)
- [ ] **Colors:** All 8 neon colors visible (red → orange → yellow → green → cyan → blue → purple → pink)
- [ ] **Animation:** Gentle pulse effect (opacity 0.8 ↔ 1, 8s loop)
- [ ] **Glow:** Subtle pink glow extends 120px below rainbow stripe

**Expected Result:**
```
🌈 RED | ORANGE | YELLOW | GREEN | CYAN | BLUE | PURPLE | PINK
   (pulsing gently, 8-second loop)
```

---

### Hero Section

- [ ] **Title:** "Sitemap" displays correctly
- [ ] **Dark Mode Title:** Gradient effect (pink → purple → blue) with text-fill-color transparent
- [ ] **Description:** "Every page, post, portfolio entry..." visible below title
- [ ] **Breadcrumbs:** "Home > Sitemap" centered above title
- [ ] **Animation:** Hero content fades in from top (translateY -30px → 0)

**Expected Dark Mode Title:**
```
  SITEMAP  
  ▓▓▓▓▓▓▓  (gradient fill: pink → purple → blue)
  (subtle glow: rgba(255, 16, 240, 0.3))
```

---

### Section Structure

- [ ] **Sections:** 15 sections total (Main, About, Extra, Portfolio cats, Blog cats, Blog posts, Videos cats, Videos, Podcast cats, Podcasts, Event cats, Events, Tags, Dev Tools, Legal)
- [ ] **Section Titles:** Each has colored icon with drop-shadow glow
- [ ] **Border:** 2px solid border-bottom under each section title
- [ ] **Dark Mode Border:** Border is white with 0.1 opacity
- [ ] **Stagger:** Sections fade in sequentially (0.1s, 0.15s, 0.2s, ...)

**Expected Section Title Format:**
```
🎨 (icon with glow)  Portfolio categories
────────────────────────────────────────── (2px border)
```

---

### About Sub-Pages Grid (The Star of the Show!)

- [ ] **Grid Columns:** 
  - Mobile (<768px): 1 column
  - Tablet (768px+): 2 columns
  - Desktop (1024px+): 3 columns
  - Wide (1440px+): 4 columns
- [ ] **Item Count:** Exactly 21 items
- [ ] **Animation:** Each item fades in from below (translateY 20px → 0)
- [ ] **Sequential Delays:** First item at 0.05s, last item at 1.05s (watch cascade effect!)
- [ ] **Gap:** Spacing between items (0.5rem mobile, 0.75rem tablet, 1rem desktop)

**Expected Animation Sequence:**
```
Time    Items Visible
0.05s:  ✓ Item 1
0.10s:  ✓ Item 1-2
0.15s:  ✓ Item 1-3
0.20s:  ✓ Item 1-4
...
1.05s:  ✓ All 21 items
```

**Visual Test:** Reload page and watch items "cascade up" in waves.

---

### Link Components

#### Standard Links

- [ ] **Icon:** 20px Phosphor icon with 0.5 opacity
- [ ] **Text:** Link text next to icon
- [ ] **Description:** Optional gray text below link (indented)
- [ ] **Padding:** 0.5rem vertical, 0.75rem horizontal
- [ ] **Border Radius:** `var(--wp--preset--border-radius--md)`

#### Hover State

- [ ] **Light Mode:**
  - Background: `rgba(190, 0, 254, 0.06)` (light purple tint)
  - Text color: Purple
  - Transform: Slides 4px right
- [ ] **Dark Mode:**
  - Background: `rgba(255, 16, 240, 0.08)` (pink glow)
  - Text color: Neon pink
  - Box-shadow: `0 0 20px rgba(255, 16, 240, 0.15)` (pink glow)
  - Transform: Slides 4px right
- [ ] **Icon:** Scales to 1.1, opacity increases to 1, drop-shadow glow

**Visual Test:** Hover over a link — it should glow and slide right.

---

### Dense Lists (Blog Posts, Videos, Podcasts, Events)

- [ ] **Compact Spacing:** 0.125rem gap between items
- [ ] **Smaller Padding:** 0.375rem vertical
- [ ] **Smaller Font:** Uses `--wp--preset--font-size--100`
- [ ] **Smaller Icons:** 18px instead of 20px
- [ ] **Metadata:** Date and category below link text (gray, 0.75rem font)

**Expected Format:**
```
📄 Blog post title here
   Feb 15, 2026 • Creative Process
```

---

### Tags List

- [ ] **Grid Layout:**
  - Mobile: 1 column
  - Tablet (768px+): 2 columns
  - Desktop (1024px+): 3 columns
  - Wide (1440px+): 4 columns
  - Ultra-wide (1568px+): 5 columns
- [ ] **Color Dots:** 8px round dots in 8 neon colors (cycled)
- [ ] **Smaller Links:** Uses `.sitemap-link--tag` variant (0.375rem padding)
- [ ] **Dot Hover:** Scales to 1.3 with glow box-shadow

**Expected Tag Format:**
```
● amsterdam    (8px cyan dot)
● berlin       (8px pink dot)
● festivals    (8px blue dot)
```

**Visual Test:** Hover over tag — dot should scale and glow.

---

### Indented Links (Dev Tools Sub-Pages)

- [ ] **Indentation:** 0.5rem margin-left + 1.5rem padding-left
- [ ] **Connector:** 12px horizontal line before link (pseudo-element)
- [ ] **Line Color:** Gray (0.3 opacity)

**Expected Format:**
```
💻 Developer tools hub
  ├─ Design tokens reference
  ├─ Icon library
  ├─ Phosphor icons showcase
  └─ Component API documentation
```

---

## ⚡ Animation Tests

### Rainbow Pulse Animation

- [ ] **Duration:** 8 seconds per loop
- [ ] **Effect:** Opacity 0.8 → 1 → 0.8
- [ ] **Easing:** `ease-in-out`
- [ ] **Infinite:** Never stops

**Visual Test:** Watch top rainbow stripe for 16 seconds — should pulse twice.

---

### Hero Fade-In

- [ ] **Effect:** Opacity 0 → 1, translateY -30px → 0
- [ ] **Duration:** 0.8s
- [ ] **Easing:** `ease-out`
- [ ] **Fill Mode:** `both` (maintains final state)

**Visual Test:** Reload page — hero should drop down from above.

---

### Section Stagger

- [ ] **First Section Delay:** 0.1s
- [ ] **Second Section Delay:** 0.15s
- [ ] **Increment:** +0.05s per section
- [ ] **Animation:** `fadeIn` (opacity 0 → 1)

**Visual Test:** Reload page — sections should appear one after another in smooth sequence.

---

### About Sub-Pages Cascade

- [ ] **First Item Delay:** 0.05s
- [ ] **Last Item (21) Delay:** 1.05s
- [ ] **Effect:** Opacity 0 → 1, translateY 20px → 0
- [ ] **Duration:** 0.6s per item
- [ ] **Easing:** `ease-out`

**Visual Test:** Reload page and scroll to "Hidden about pages" section — watch items appear in waves!

**Expected Timing:**
- 0.05s: "The compass" appears
- 0.10s: "Origin story" appears
- 0.15s: "Six cats: the green garden" appears
- ...
- 1.05s: Last sub-page appears

---

### Hover Animations

- [ ] **Link Slide:** `translateX(4px)` in 0.2s
- [ ] **Icon Scale:** 1 → 1.1 in 0.2s
- [ ] **Icon Glow:** Drop-shadow appears
- [ ] **Dot Scale:** 1 → 1.3 in 0.2s (tags only)

**Visual Test:** Hover over various links — should slide right smoothly with icon scaling.

---

## 🌗 Dark Mode Tests

### Background

- [ ] **Light Mode:** `var(--wp--preset--color--base)` (white/off-white)
- [ ] **Dark Mode:** `var(--wp--preset--color--atomic-black)` (#0F0F0F)

---

### Title Gradient

- [ ] **Light Mode:** Standard text color
- [ ] **Dark Mode:** 
  - Gradient fill (pink → purple → blue)
  - `background-clip: text`
  - `-webkit-text-fill-color: transparent`
  - Text-shadow glow: `0 0 30px rgba(255, 16, 240, 0.3)`

**Visual Test:** Toggle dark mode — title should become gradient with subtle glow.

---

### Section Title Glow

- [ ] **Dark Mode:** Text-shadow `0 0 20px rgba(255, 16, 240, 0.15)`
- [ ] **Icons:** Drop-shadow glow in content-specific colors (pink, green, blue, etc.)

**Visual Test:** In dark mode, section titles and icons should have subtle neon glow.

---

### Link Hover Glow

- [ ] **Dark Mode Box-Shadow:** `0 0 20px rgba(255, 16, 240, 0.15)`
- [ ] **Pink Highlight:** `rgba(255, 16, 240, 0.08)` background

**Visual Test:** Hover link in dark mode — should get pink glow halo.

---

### Rainbow Glow Enhancement

- [ ] **Light Mode:** `rgba(255, 16, 240, 0.08)` glow
- [ ] **Dark Mode:** `rgba(255, 16, 240, 0.15)` glow (stronger)

---

### Grain Texture

- [ ] **Light Mode:** Opacity 1
- [ ] **Dark Mode:** Opacity 0.5

**Visual Test:** Grain texture should be more subtle in dark mode.

---

## ♿ Accessibility Tests

### Keyboard Navigation

- [ ] **Tab Order:** Logical (top to bottom, left to right in grids)
- [ ] **Focus Indicators:** Visible 3px pink outline on all links
- [ ] **Focus Glow:** Box-shadow `0 0 12px rgba(255, 16, 240, 0.5)` in dark mode
- [ ] **Enter Key:** Activates links
- [ ] **No Keyboard Traps:** Can Tab out of all sections

**Visual Test:** Press Tab repeatedly — pink outline should move through all links.

---

### ARIA Labels

- [ ] **Sections:** Have `aria-labelledby` linking to heading IDs
- [ ] **Headings:** Have unique IDs (e.g., `id="sitemap-pages"`)
- [ ] **Icons:** Have `aria-hidden="true"` (decorative only)

**DevTools Test:** Inspect sections — confirm `aria-labelledby` matches heading ID.

---

### Screen Reader Support

- [ ] **Landmarks:** Sections create proper landmarks
- [ ] **Link Text:** Descriptive (no "click here")
- [ ] **Icon Descriptions:** Not announced (aria-hidden)

**Screen Reader Test:** Use VoiceOver (Mac) or NVDA (Windows) to navigate page.

---

### Reduced Motion

- [ ] **Setting:** Enable "Reduce motion" in OS settings
- [ ] **Rainbow Pulse:** Stops animating
- [ ] **Hero Fade:** Instant visibility (no animation)
- [ ] **Section Stagger:** Instant visibility (no animation)
- [ ] **About Grid Cascade:** Instant visibility (no animation)
- [ ] **Hover Transforms:** No slide or scale effects

**Visual Test:** Enable `prefers-reduced-motion` — page should load instantly with zero animations.

**CSS Test:**
```css
@media (prefers-reduced-motion: reduce) {
  .sitemap-page__hero::before { animation: none; }
  .sitemap-page__hero-content,
  .sitemap-section,
  .sitemap-list--grid .sitemap-list__item { animation: none !important; }
  .sitemap-link:hover { transform: none; }
}
```

---

## 📱 Responsive Tests

### Mobile (<768px)

- [ ] **About Grid:** 1 column, 0.5rem gap
- [ ] **Tags Grid:** 1 column, 0.25rem gap
- [ ] **Hero:** Centered, readable
- [ ] **Links:** Full-width, easy to tap (minimum 44px touch target)

---

### Tablet (768px)

- [ ] **About Grid:** 2 columns, 0.75rem gap
- [ ] **Tags Grid:** 2 columns, 0.375rem / 1.5rem gap
- [ ] **Content:** Max-width 1440px, centered

---

### Desktop (1024px)

- [ ] **About Grid:** 3 columns, 1rem gap
- [ ] **Tags Grid:** 3 columns
- [ ] **Hover States:** Smooth and responsive

---

### Wide (1440px)

- [ ] **About Grid:** 4 columns, 1rem gap
- [ ] **Tags Grid:** 4 columns

---

### Ultra-wide (1568px)

- [ ] **Tags Grid:** 5 columns
- [ ] **Content:** Still centered, not too wide

---

## 🎨 Neon Color Verification

### Content Type Colors

Open each section and verify icon colors:

- [ ] **Main Pages:** Pink `var(--wp--preset--color--neon-pink)`
- [ ] **About Sub-pages:** Purple `var(--wp--preset--color--neon-purple)`
- [ ] **Portfolio Categories:** Green `var(--wp--preset--color--neon-green)`
- [ ] **Blog Categories:** Pink `var(--wp--preset--color--neon-pink)`
- [ ] **Blog Posts:** Pink
- [ ] **Video Categories:** Purple `var(--wp--preset--color--neon-purple)`
- [ ] **Videos:** Purple
- [ ] **Podcast Categories:** Blue `var(--wp--preset--color--neon-blue)`
- [ ] **Podcasts:** Blue
- [ ] **Event Categories:** Orange `var(--wp--preset--color--neon-orange)`
- [ ] **Events:** Orange
- [ ] **Tags:** Cyan `var(--wp--preset--color--neon-cyan)` (varied dot colors)
- [ ] **Developer Tools:** Purple `var(--wp--preset--color--neon-purple)`

---

### Tag Dot Colors (Cycling Pattern)

Tags use 8 neon colors in rotation. Verify first 8 tags have different colors:

```
Tag 1:  ● Pink
Tag 2:  ● Blue
Tag 3:  ● Green
Tag 4:  ● Orange
Tag 5:  ● Purple
Tag 6:  ● Cyan
Tag 7:  ● Yellow
Tag 8:  ● Red
Tag 9:  ● Pink (cycle repeats)
```

---

## 🔍 DevTools Inspector Tests

### Class Names

Open DevTools and verify correct BEM classes are applied:

- [ ] Root: `.sitemap-page` (NOT `.sitemap`)
- [ ] Hero: `.sitemap-page__hero`
- [ ] Content: `.sitemap-page__content`
- [ ] Section: `.sitemap-section` (NOT `.sitemap__section`)
- [ ] List: `.sitemap-list` (NOT `.sitemap__list`)
- [ ] Link: `.sitemap-link` (NOT `.sitemap__link`)

**Critical:** If any old classes like `.sitemap`, `.sitemap__section`, `.sitemap__link` are present, the CSS won't work!

---

### Animation States

Inspect an About sub-page item:

```css
.sitemap-list--grid .sitemap-list__item:nth-child(1) {
  animation: fadeInUp 0.6s ease-out both;
  animation-delay: 0.05s;
}
```

- [ ] **Animation Name:** `fadeInUp`
- [ ] **Duration:** `0.6s`
- [ ] **Easing:** `ease-out`
- [ ] **Fill Mode:** `both`
- [ ] **Delay:** Unique per item (0.05s, 0.1s, 0.15s, ...)

---

### Computed Styles

Inspect a link in hover state:

- [ ] **Transform:** `translateX(4px)`
- [ ] **Background-color:** Pink glow in dark mode
- [ ] **Box-shadow:** Present in dark mode
- [ ] **Icon transform:** `scale(1.1)`

---

## ⚠️ Common Issues Checklist

If something doesn't work, check these:

### No Styling

- [ ] Verify class names match (`.sitemap-page` NOT `.sitemap`)
- [ ] Check CSS file is imported: `import "../../styles/blocks/sitemap-page.css";`
- [ ] Clear browser cache (hard reload: Cmd+Shift+R / Ctrl+Shift+R)

### Animations Don't Play

- [ ] Check `animation-fill-mode: both` is present
- [ ] Verify nth-child delays are sequential
- [ ] Ensure `prefers-reduced-motion` is not enabled

### Grid Layout Breaks

- [ ] Verify responsive media queries exist (768px, 1024px, 1440px)
- [ ] Check `display: grid` is applied to `.sitemap-list--grid`
- [ ] Confirm `grid-template-columns` values are correct

### Icons Have No Color

- [ ] Check inline `style={{ color: 'var(...)' }}` is present in JSX
- [ ] Verify icon has `weight="duotone"` attribute
- [ ] Ensure icon is from `@phosphor-icons/react` package

### Hover Effects Not Working

- [ ] Check `:hover` pseudo-class selectors in CSS
- [ ] Verify `transition` property is present
- [ ] Test in different browser (could be browser-specific issue)

---

## ✅ Final Checklist

Before marking the sitemap as complete:

- [ ] All 8 neon colors visible in rainbow decoration
- [ ] 21 About sub-pages animate sequentially (watch full cascade)
- [ ] All sections have correct colored icons
- [ ] Hover states work in both light and dark modes
- [ ] Dark mode title has gradient effect
- [ ] Focus indicators visible on all links (3px pink outline)
- [ ] Keyboard navigation works (Tab through all links)
- [ ] Screen reader announces sections and links correctly
- [ ] `prefers-reduced-motion` disables all animations
- [ ] Responsive grids work at all breakpoints (1, 2, 3, 4, 5 columns)
- [ ] No console errors or warnings
- [ ] Page loads in under 2 seconds
- [ ] No layout shifts during animation
- [ ] Grain texture visible but subtle

---

**Test Completed:** _______________  
**Tested By:** _______________  
**Issues Found:** _______________  
**Status:** ☐ Pass ☐ Fail ☐ Needs Revision

---

**Last Updated:** March 4, 2026  
**Maintained By:** Ash Shaw Portfolio Team
