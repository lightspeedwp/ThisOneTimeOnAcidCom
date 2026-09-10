# Sitemap Page Design Guidelines

**Component:** `/components/pages/SitemapPage.tsx`  
**Stylesheet:** `/styles/blocks/sitemap-page.css`  
**Version:** 2.0.0  
**Last Updated:** March 4, 2026

## Purpose

The Sitemap page serves as a comprehensive visual index of the entire website, organized by content type with playful neon styling and sequential animations. It showcases all pages, portfolio categories, blog posts, videos, podcasts, events, tags, developer tools, and the 21 hidden About sub-pages.

## Design Philosophy

The sitemap is NOT a boring text list — it's a **funky, animated, neon-powered navigation playground** that celebrates the site's content with:

- 🌈 Rainbow gradient decoration at the top
- 🎨 Sequential fade-in animations for content sections
- ⚡ Neon color accents for different content types
- 🎯 Interactive hover states with neon glow effects
- 📱 Fully responsive grid layouts
- ♿ Full keyboard navigation and screen reader support

## BEM Class Structure

### Root Container

```tsx
<main className="sitemap-page">
  {/* All content */}
</main>
```

**Class:** `.sitemap-page`  
**Purpose:** Root container with background, min-height, grain texture overlay

### Hero Section

```tsx
<div className="sitemap-page__hero">
  <div className="sitemap-page__hero-content">
    <Breadcrumbs items={[...]} centered />
    <h1 className="sitemap-page__title text-section-h2">Sitemap</h1>
    <p className="sitemap-page__desc text-body-p">Description</p>
  </div>
</div>
```

**Classes:**
- `.sitemap-page__hero` — Hero wrapper with rainbow decoration
- `.sitemap-page__hero-content` — Centered content container
- `.sitemap-page__title` — Page heading (uses `.text-section-h2` from globals)
- `.sitemap-page__desc` — Subtitle text (uses `.text-body-p` from globals)

### Content Wrapper

```tsx
<div className="sitemap-page__content">
  {/* All sections */}
</div>
```

**Class:** `.sitemap-page__content`  
**Purpose:** Main content wrapper with max-width and padding

### Section Structure

```tsx
<section className="sitemap-section" aria-labelledby="sitemap-pages">
  <h2 id="sitemap-pages" className="sitemap-section__title text-card-h3">
    <Icon size={24} weight="duotone" aria-hidden="true" style={{ color: 'var(--wp--preset--color--neon-pink)' }} />
    Section Title
  </h2>
  <p className="sitemap-section__desc">Optional description</p>
  <ul className="sitemap-list">
    {/* List items */}
  </ul>
</section>
```

**Classes:**
- `.sitemap-section` — Section wrapper with spacing and animation delay
- `.sitemap-section__title` — Section heading with icon (uses `.text-card-h3`)
- `.sitemap-section__desc` — Optional section description

### List Layouts

#### Standard List

```tsx
<ul className="sitemap-list">
  <li className="sitemap-list__item">
    <a href="/path" className="sitemap-link">
      <Icon size={20} weight="duotone" aria-hidden="true" className="sitemap-link__icon" />
      <span className="sitemap-link__text">Link text</span>
    </a>
    <span className="sitemap-link__desc">Optional description</span>
  </li>
</ul>
```

#### Grid Layout (for About sub-pages)

```tsx
<ul className="sitemap-list sitemap-list--grid">
  {/* Grid items */}
</ul>
```

#### Dense List (for blog posts, videos, etc.)

```tsx
<ul className="sitemap-list sitemap-list--dense">
  <li className="sitemap-list__item">
    <a href="/path" className="sitemap-link">
      <Icon size={18} weight="duotone" aria-hidden="true" className="sitemap-link__icon" />
      <span className="sitemap-link__text">Link text</span>
    </a>
    <span className="sitemap-link__meta">Date • Category</span>
  </li>
</ul>
```

#### Tags List

```tsx
<ul className="sitemap-list sitemap-list--tags">
  <li className="sitemap-list__item">
    <a href="/tag/name" className="sitemap-link sitemap-link--tag">
      <span className="sitemap-link__dot" style={{ backgroundColor: neonColor }} />
      <span className="sitemap-link__text">Tag name</span>
    </a>
    <span className="sitemap-link__desc">Tag description</span>
  </li>
</ul>
```

### Link Components

**Classes:**
- `.sitemap-link` — Base link style
- `.sitemap-link--tag` — Tag variant (smaller, with color dot)
- `.sitemap-link__icon` — Phosphor icon (20px for standard, 18px for dense)
- `.sitemap-link__text` — Link text content
- `.sitemap-link__count` — Count badge (e.g., "(12)")
- `.sitemap-link__desc` — Description text below link
- `.sitemap-link__meta` — Metadata text (date, category, duration)
- `.sitemap-link__dot` — Colored dot for tags

## Sequential Animation System

### About Sub-Pages Animation

The 21 hidden About sub-pages should have **sequential fade-in animations** using CSS animation delays.

```css
/* Each item gets a staggered delay */
.sitemap-list--grid .sitemap-list__item {
  animation: fadeInUp 0.6s ease-out both;
}

.sitemap-list--grid .sitemap-list__item:nth-child(1) { animation-delay: 0.05s; }
.sitemap-list--grid .sitemap-list__item:nth-child(2) { animation-delay: 0.1s; }
.sitemap-list--grid .sitemap-list__item:nth-child(3) { animation-delay: 0.15s; }
/* ... up to 21 */
.sitemap-list--grid .sitemap-list__item:nth-child(21) { animation-delay: 1s; }

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

### Section-Level Animations

Each section should also have a subtle fade-in:

```css
.sitemap-section {
  animation: fadeIn 0.8s ease-out both;
}

/* Stagger sections */
.sitemap-section:nth-child(1) { animation-delay: 0.1s; }
.sitemap-section:nth-child(2) { animation-delay: 0.2s; }
.sitemap-section:nth-child(3) { animation-delay: 0.3s; }
/* etc. */
```

## Neon Color System

### Content Type Colors

Assign specific neon colors to each content type for visual distinction:

| Content Type | Neon Color | CSS Variable |
|--------------|-----------|--------------|
| Main Pages | Pink | `var(--wp--preset--color--neon-pink)` |
| About Sub-pages | Purple | `var(--wp--preset--color--neon-purple)` |
| Portfolio | Green | `var(--wp--preset--color--neon-green)` |
| Blog | Pink | `var(--wp--preset--color--neon-pink)` |
| Videos | Purple | `var(--wp--preset--color--neon-purple)` |
| Podcasts | Blue | `var(--wp--preset--color--neon-blue)` |
| Events | Orange | `var(--wp--preset--color--neon-orange)` |
| Tags | Cyan | `var(--wp--preset--color--neon-cyan)` |
| Developer Tools | Purple | `var(--wp--preset--color--neon-purple)` |

### Rainbow Decoration

Top border uses all 8 neon colors in gradient:

```css
.sitemap-page__rainbow {
  background: linear-gradient(
    90deg,
    var(--wp--preset--color--neon-red) 0%,
    var(--wp--preset--color--neon-orange) 14%,
    var(--wp--preset--color--neon-yellow) 28%,
    var(--wp--preset--color--neon-green) 42%,
    var(--wp--preset--color--neon-cyan) 57%,
    var(--wp--preset--color--neon-blue) 71%,
    var(--wp--preset--color--neon-purple) 85%,
    var(--wp--preset--color--neon-pink) 100%
  );
}
```

## Responsive Grid Layouts

### About Sub-Pages Grid

```css
/* Mobile: 1 column */
.sitemap-list--grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 0.5rem;
}

/* Tablet: 2 columns */
@media (min-width: 768px) {
  .sitemap-list--grid {
    grid-template-columns: repeat(2, 1fr);
    gap: 1rem;
  }
}

/* Desktop: 3 columns */
@media (min-width: 1024px) {
  .sitemap-list--grid {
    grid-template-columns: repeat(3, 1fr);
  }
}

/* Wide: 4 columns */
@media (min-width: 1440px) {
  .sitemap-list--grid {
    grid-template-columns: repeat(4, 1fr);
  }
}
```

### Tags Grid

Tags use a similar grid but with tighter gaps and more columns at wide viewports:

```css
@media (min-width: 1568px) {
  .sitemap-list--tags {
    grid-template-columns: repeat(5, 1fr);
  }
}
```

## Hover States

### Link Hover Effects

```css
.sitemap-link {
  transition: all 0.2s ease;
}

.sitemap-link:hover {
  background-color: rgba(255, 16, 240, 0.08); /* Neon pink glow */
  transform: translateX(4px); /* Subtle shift right */
}

.sitemap-link:hover .sitemap-link__icon {
  color: var(--wp--preset--color--neon-pink);
  transform: scale(1.1);
}
```

### Focus States

Must have visible 3px neon pink focus indicator with glow:

```css
.sitemap-link:focus-visible {
  outline: 3px solid var(--wp--preset--color--neon-pink);
  outline-offset: 2px;
  box-shadow: 0 0 12px rgba(255, 16, 240, 0.5);
}
```

## Accessibility Requirements

### Semantic HTML

- Use `<section>` with `aria-labelledby` linking to heading IDs
- All sections must have unique IDs for proper landmark navigation
- Icons must have `aria-hidden="true"` (decorative only)
- Links must have descriptive text (no "click here")

### Keyboard Navigation

- All links must be keyboard-accessible
- Tab order should be logical (top to bottom)
- Focus indicators must be clearly visible (3px neon pink outline)
- No keyboard traps

### Screen Reader Support

```html
<section className="sitemap-section" aria-labelledby="sitemap-about-pages">
  <h2 id="sitemap-about-pages" className="sitemap-section__title text-card-h3">
    <Icon aria-hidden="true" />
    Hidden about pages
  </h2>
  <p className="sitemap-section__desc">
    21 unlisted sub-pages exploring Ash's creative journey, lifestyle, and philosophy.
  </p>
</section>
```

### Reduced Motion

Users with `prefers-reduced-motion: reduce` should get instant visibility (no animations):

```css
@media (prefers-reduced-motion: reduce) {
  .sitemap-section,
  .sitemap-list__item {
    animation: none !important;
  }

  .sitemap-link:hover {
    transform: none;
  }
}
```

## Dark Mode Behavior

### Background Colors

```css
/* Light mode */
.sitemap-page {
  background-color: var(--wp--preset--color--base);
}

/* Dark mode */
.dark .sitemap-page {
  background-color: var(--wp--preset--color--atomic-black);
}
```

### Text Colors

| Element | Light Mode | Dark Mode |
|---------|-----------|-----------|
| Headings | `--contrast` | `--neutral-100` |
| Body text | `--neutral-700` | `--neutral-300` |
| Descriptions | `--neutral-500` | `--neutral-500` |
| Meta text | `--neutral-400` | `--neutral-500` |

### Neon Colors

Dark mode uses **full-brightness neon** for maximum impact:

```css
.dark .sitemap-section__title {
  color: var(--wp--preset--color--neon-pink);
  text-shadow: 0 0 12px rgba(255, 16, 240, 0.4);
}
```

## Grain Texture Overlay

All sections should have the standard grain noise texture:

```css
.sitemap-page::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' /%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='0.03'/%3E%3C/svg%3E");
  pointer-events: none;
  z-index: 1;
}
```

## Performance Considerations

### Icon Optimization

- Use `weight="duotone"` for visual interest
- Reduce icon size in dense lists (18px vs 20px)
- Icons are decorative only — don't rely on them for meaning

### Animation Budget

- Limit animation to first 21 items (About sub-pages)
- Use `animation-fill-mode: both` to prevent layout shifts
- Respect `prefers-reduced-motion`

### List Rendering

The sitemap can have 200+ links. Optimize by:
- Not animating every single item (only About sub-pages)
- Using CSS transforms (GPU-accelerated)
- Keeping hover transitions under 200ms

## Example Implementation

### About Sub-Pages Section (Full Example)

```tsx
<section className="sitemap-section" aria-labelledby="sitemap-about-pages">
  <h2 id="sitemap-about-pages" className="sitemap-section__title text-card-h3">
    <User size={24} weight="duotone" aria-hidden="true" style={{ color: 'var(--wp--preset--color--neon-purple)' }} />
    Hidden about pages
  </h2>
  <p className="sitemap-section__desc">
    21 unlisted sub-pages exploring Ash's creative journey, lifestyle, and philosophy.
  </p>
  <ul className="sitemap-list sitemap-list--grid">
    {hiddenAboutData.subpages.map((page, index) => (
      <li key={page.slug} className="sitemap-list__item">
        <a
          href={`/about/${page.slug}`}
          onClick={handleNavigate(`/about/${page.slug}`)}
          className="sitemap-link"
        >
          <IconComponent size={20} weight="duotone" aria-hidden="true" className="sitemap-link__icon" />
          <span className="sitemap-link__text">{page.title}</span>
        </a>
      </li>
    ))}
  </ul>
</section>
```

## Related Files

- Component: `/components/pages/SitemapPage.tsx`
- Stylesheet: `/styles/blocks/sitemap-page.css`
- Mock Data: `/data/mock/ui/sitemap.ts`
- Typography: `/guidelines/design-tokens/typography.md`
- Colors: `/guidelines/design-tokens/neon-colors.md`
- Animations: `/guidelines/design-tokens/animations.md`

## Changelog

**v2.0.0** (March 4, 2026)
- Complete rewrite of guidelines with funky animation system
- Sequential fade-in animations for 21 About sub-pages
- Enhanced neon color system per content type
- Improved responsive grid layouts
- Full accessibility and reduced motion support

**v1.0.0** (Initial)
- Basic sitemap structure
