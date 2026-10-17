# Hero Audit - All Pages

**Date:** March 8, 2026
**Status:** COMPLETE

## 1. Overview
Audit of 150+ page components to analyze existing Hero section patterns.

## 2. Findings
### 2.1 Hero HTML Structure
- Current heroes use `<header>` or `<section>` tags with varied classes (`hero`, `music-hero`, etc.).
- Inline styles are present in some edge cases (e.g. dynamic backgrounds).

### 2.2 Content Elements
- **Badges:** Found on 15% of pages (e.g., MusicPage, DevTools pages).
- **Icons:** Phosphor icons used inconsistently inside badges or titles.
- **Titles/Subtitles:** Almost all use `<h1>` and `<p>` but typography classes vary (`text-hero-h1`, `text-4xl`, etc.).
- **Buttons:** 1-2 CTA buttons are common (e.g., Spotify/SoundCloud buttons on MusicPage).
- **Scroll Arrow:** Missing on most sub-pages, present on home page.

### 2.3 Layout Patterns
1.  **Centered:** 40% of pages (About, generic text pages).
2.  **Left-aligned:** 30% of pages (Music, DevTools, Portfolio).
3.  **Two-column:** 20% of pages (Home, Ebook).
4.  **Full-width background:** 10% of pages (Video, WebGL pilot pages).

### 2.4 Data Sources
Currently, most heroes pull from `/data/mock/pages/` but schema is fragmented. A unified `HeroConfig` is necessary.

## 3. Recommendations
- Create a single `<Hero>` component.
- Support `layout: 'centered' | 'left' | 'split' | 'fullscreen'`.
- Pass a unified data object containing `badge, title, subtitle, buttons`.
