# Sitemap Page Styling Guide

**Created:** March 4, 2026  
**Purpose:** Quick reference for sitemap page funky styling and animations

## The Problem (Fixed)

The sitemap page had a complete class name mismatch between the component (`.sitemap-page`, `.sitemap-section`, `.sitemap-link`) and the stylesheet (`.sitemap`, `.sitemap__section`, `.sitemap__link`). This caused the page to render with NO styling.

## The Solution

✅ **Rewritten Stylesheet:** `/styles/blocks/sitemap-page.css` now uses correct BEM class names  
✅ **Comprehensive Guidelines:** `/guidelines/pages/sitemap-page.md` documents the full system  
✅ **Sequential Animations:** 21 About sub-pages fade in with staggered delays  
✅ **Neon Color System:** Each content type has its own neon color accent  
✅ **Rainbow Decoration:** Animated rainbow gradient at top of page

## Quick Visual Summary

### Page Structure

```
┌─────────────────────────────────────────────┐
│  🌈 Rainbow Gradient (8 neon colors)       │
├─────────────────────────────────────────────┤
│                                             │
│         SITEMAP (gradient title)            │
│    "Every page, post, portfolio..."        │
│                                             │
├─────────────────────────────────────────────┤
│                                             │
│  📄 Main pages (7 items)                   │
│  ├─ Home                                    │
│  ├─ About                                   │
│  ├─ Portfolio                               │
│  └─ ...                                     │
│                                             │
│  👤 Hidden about pages (21 items) 🎬       │
│  ┌────────┬────────┬────────┬────────┐    │
│  │ Item 1 │ Item 2 │ Item 3 │ Item 4 │    │ ← Grid layout
│  │ ⚡ 0.05s│ ⚡ 0.1s │ ⚡ 0.15s│ ⚡ 0.2s│    │ ← Sequential delays
│  ├────────┼────────┼────────┼────────┤    │
│  │ Item 5 │ Item 6 │ Item 7 │ Item 8 │    │
│  │ ⚡ 0.25s│ ⚡ 0.3s │ ⚡ 0.35s│ ⚡ 0.4s│    │
│  └────────┴────────┴────────┴────────┘    │
│  ... (continues to 21 items)                │
│                                             │
│  🎨 Portfolio categories (6 items)         │
│  📝 Blog posts (40+ items)                 │
│  🎬 Videos (27 items)                      │
│  🎙️ Podcasts (14 items)                    │
│  📅 Events (21 items)                      │
│  🏷️ All tags (80+ items in 5-col grid)    │
│  💻 Developer tools (24 items)             │
│  ⚖️ Legal (2 items)                        │
│                                             │
└─────────────────────────────────────────────┘
```

## Key Features

### 1. Rainbow Decoration

**Element:** `.sitemap-page__hero::before`  
**Effect:** Horizontal gradient stripe using all 8 neon colors  
**Animation:** Gentle pulse (0.8 → 1 → 0.8 opacity over 8s loop)

### 2. Sequential About Sub-Pages Animation

**Target:** `.sitemap-list--grid .sitemap-list__item`  
**Animation:** `fadeInUp` (20px upward slide + fade)  
**Delays:** 0.05s increments from first to 21st item (0.05s → 1.05s)  
**Duration:** 0.6s per item

```css
@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
```

### 3. Neon Color System

| Content Type | Neon Color | Icon Glow |
|--------------|------------|-----------|
| Main Pages | Pink | Drop-shadow |
| About Sub-pages | Purple | Drop-shadow + text-shadow |
| Portfolio | Green | Drop-shadow |
| Blog | Pink | Drop-shadow |
| Videos | Purple | Drop-shadow |
| Podcasts | Blue | Drop-shadow |
| Events | Orange | Drop-shadow |
| Tags | Cyan (varied dots) | Scale + glow on hover |
| Developer Tools | Purple | Drop-shadow |

### 4. Hover States

**Default Link Hover:**
- Light mode: Purple tint background (`rgba(190, 0, 254, 0.06)`)
- Dark mode: Pink glow background (`rgba(255, 16, 240, 0.08)`) + box-shadow
- Transform: `translateX(4px)` (slides right)
- Icon: Scale 1.1 + drop-shadow + opacity 1

**Tag Dot Hover:**
- Scale 1.3
- Box-shadow glow matching dot color

### 5. Responsive Grid Layouts

#### About Sub-Pages Grid

| Breakpoint | Columns | Gap |
|------------|---------|-----|
| Mobile (<768px) | 1 | 0.5rem |
| Tablet (768px+) | 2 | 0.75rem |
| Desktop (1024px+) | 3 | 1rem |
| Wide (1440px+) | 4 | 1rem |

#### Tags Grid

| Breakpoint | Columns | Gap |
|------------|---------|-----|
| Mobile (<768px) | 1 | 0.25rem |
| Tablet (768px+) | 2 | 0.375rem / 1.5rem |
| Desktop (1024px+) | 3 | (inherited) |
| Wide (1440px+) | 4 | (inherited) |
| Ultra-wide (1568px+) | 5 | (inherited) |

### 6. Section Stagger

Each `.sitemap-section` fades in with incremental delay:

```css
.sitemap-section:nth-child(1) { animation-delay: 0.1s; }
.sitemap-section:nth-child(2) { animation-delay: 0.15s; }
.sitemap-section:nth-child(3) { animation-delay: 0.2s; }
/* ... up to 15 */
```

### 7. Dark Mode Enhancements

**Title Gradient:**
```css
.dark .sitemap-page__title {
  background: linear-gradient(135deg, neon-pink, neon-purple, neon-blue);
  background-clip: text;
  -webkit-text-fill-color: transparent;
  text-shadow: 0 0 30px rgba(255, 16, 240, 0.3);
}
```

**Link Hover Glow:**
```css
.dark .sitemap-link:hover {
  box-shadow: 0 0 20px rgba(255, 16, 240, 0.15);
}
```

**Section Title Glow:**
```css
.dark .sitemap-section__title {
  text-shadow: 0 0 20px rgba(255, 16, 240, 0.15);
}
```

### 8. Accessibility

✅ **Semantic HTML:** `<section>` with `aria-labelledby` linking to heading IDs  
✅ **Keyboard Navigation:** Full Tab/Enter support with visible focus indicators  
✅ **Focus Indicators:** 3px neon pink outline + 12px glow box-shadow  
✅ **Screen Readers:** Icons have `aria-hidden="true"`, links have descriptive text  
✅ **Reduced Motion:** All animations disabled with `prefers-reduced-motion: reduce`

## Animation Budget

**Total Animated Elements:**
- 1 rainbow pulse (hero decoration)
- 1 hero content fade-in
- 15 section fade-ins (staggered)
- 21 About sub-page fade-ups (staggered)
- Infinite hover/focus transitions

**Performance:**
- Uses CSS transforms (GPU-accelerated)
- `animation-fill-mode: both` prevents layout shifts
- No JavaScript-based animations
- Respects `prefers-reduced-motion`

## File Locations

| File | Purpose |
|------|---------|
| `/components/pages/SitemapPage.tsx` | React component |
| `/styles/blocks/sitemap-page.css` | Complete stylesheet (v2.0.0) |
| `/guidelines/pages/sitemap-page.md` | Comprehensive guidelines |
| `/data/mock/ui/sitemap.ts` | Content data |
| `/docs/sitemap-styling-guide.md` | This quick reference |

## Testing Checklist

When updating the sitemap:

- [ ] Check rainbow gradient displays at top
- [ ] Verify 21 About sub-pages animate sequentially
- [ ] Test hover states (pink glow in dark mode)
- [ ] Confirm focus indicators are visible (3px pink outline)
- [ ] Verify grid layouts at all breakpoints (1, 2, 3, 4, 5 columns)
- [ ] Test keyboard navigation (Tab, Enter)
- [ ] Enable `prefers-reduced-motion` — all animations should stop
- [ ] Check dark mode neon glows and gradient title
- [ ] Verify grain texture overlay visible but subtle

## Common Issues & Fixes

### Issue: No styling appears
**Cause:** Class name mismatch  
**Fix:** Ensure component uses `.sitemap-page`, `.sitemap-section`, `.sitemap-link` (NOT `.sitemap`, `.sitemap__section`, `.sitemap__link`)

### Issue: Animations don't play
**Cause:** Missing animation delays or `animation-fill-mode`  
**Fix:** Check CSS has `animation-fill-mode: both` and proper nth-child delays

### Issue: Grid layout breaks on mobile
**Cause:** Missing responsive breakpoints  
**Fix:** Ensure `.sitemap-list--grid` has media queries for 768px, 1024px, 1440px

### Issue: Icons have no color
**Cause:** Inline styles in JSX may conflict  
**Fix:** Use `style={{ color: 'var(--wp--preset--color--neon-pink)' }}` on icon directly

## Example Code Snippets

### Adding a New Section

```tsx
<section className="sitemap-section" aria-labelledby="sitemap-new-section">
  <h2 id="sitemap-new-section" className="sitemap-section__title text-card-h3">
    <Icon 
      size={24} 
      weight="duotone" 
      aria-hidden="true" 
      style={{ color: 'var(--wp--preset--color--neon-cyan)' }} 
    />
    New section title
  </h2>
  <p className="sitemap-section__desc">Optional description text</p>
  <ul className="sitemap-list">
    {/* List items */}
  </ul>
</section>
```

### Creating an Animated Grid Section

```tsx
<ul className="sitemap-list sitemap-list--grid">
  {items.map((item, index) => (
    <li key={item.slug} className="sitemap-list__item">
      <a 
        href={item.path} 
        onClick={handleNavigate(item.path)} 
        className="sitemap-link"
      >
        <Icon size={20} weight="duotone" aria-hidden="true" className="sitemap-link__icon" />
        <span className="sitemap-link__text">{item.title}</span>
      </a>
    </li>
  ))}
</ul>
```

### Tag with Color Dot

```tsx
<a href={`/tag/${tag}`} className="sitemap-link sitemap-link--tag">
  <span 
    className="sitemap-link__dot" 
    style={{ backgroundColor: neonColors[index % 8] }} 
  />
  <span className="sitemap-link__text">{tag}</span>
</a>
```

## Design Intent

The sitemap is designed to be:

🎉 **Fun** — Rainbow gradients, neon glows, sequential animations  
🎯 **Functional** — Every link is keyboard-accessible and screen-reader friendly  
⚡ **Fast** — GPU-accelerated CSS transforms, no JS animations  
🌗 **Adaptive** — Full dark mode with enhanced neon glows  
♿ **Accessible** — WCAG 2.1 AA compliant with reduced motion support

---

**Last Updated:** March 4, 2026  
**Maintained By:** Ash Shaw Portfolio Team
