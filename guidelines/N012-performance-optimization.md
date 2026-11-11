# N012: Performance Optimization Guidelines

**Document ID:** N012  
**Category:** Organization (Performance)  
**Authority:** D3 (Design Authority: WCAG 2.2 AAA); D4 (N-Document Approvals)  
**Last Updated:** 2026-11-09

## Purpose

Establish performance benchmarks and optimization strategies for ThisOneTimeOnAcidCom, ensuring Core Web Vitals compliance and measurable loading performance across all user journeys.

## Core Web Vitals Targets

- **LCP (Largest Contentful Paint):** ≤2.5s (GOOD)
- **INP (Interaction to Next Paint):** ≤200ms (GOOD)
- **CLS (Cumulative Layout Shift):** ≤0.1 (GOOD)

## Optimization Strategies

### Image Optimization

- Use next/image component for automatic optimization
- Serve modern formats (WebP, AVIF) with fallbacks
- Implement responsive images with srcset
- Lazy-load below-the-fold images
- Target compressed file sizes: <100KB hero images, <50KB thumbnails

### JavaScript Optimization

- Code-split by route using dynamic imports
- Tree-shake unused dependencies
- Minimize third-party script impact with async/defer
- Target: Initial JS bundle <150KB (gzipped)

### CSS & Font Loading

- Inline critical CSS above the fold
- Use font-display: swap for custom fonts
- Preload critical fonts with <link rel="preload">
- Minimize CSS bundle size through BEM modularity

### Rendering Performance

- Avoid layout thrashing (batch DOM reads/writes)
- Use requestAnimationFrame for animations
- Implement virtual scrolling for long lists
- Profile with Chrome DevTools Lighthouse

## Measurement & Monitoring

- Track Core Web Vitals via Google Analytics
- Set up Lighthouse CI in GitHub Actions
- Monitor real-user metrics via Web Vitals library
- Target: 95th percentile of users experience GOOD metrics

## See Also

- **N005:** Media Optimization Guidelines
- **N001:** Design Token Reference (animation timing)
- **Guidelines.md:** Development workflow and bundler compatibility
