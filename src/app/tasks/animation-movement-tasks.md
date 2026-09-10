# Animation & Movement Implementation Task List

**Created:** March 12, 2026  
**Source Report:** `/reports/animation-movement-audit/audit-report.md`  
**Total Tasks:** 47  
**Estimated Effort:** 44-60 hours over 4 weeks

---

##  Progress Overview

- **Phase 1 (Critical):** 10/13 tasks complete (8-12 hours) - **77% Complete** ✅
- **Phase 2 (High Priority):** 0/13 tasks complete (12-16 hours)
- **Phase 3 (Component Library):** 0/18 tasks complete (16-20 hours)
- **Phase 4 (Delight & Polish):** 0/13 tasks complete (8-12 hours)

**Overall Progress:** 10/65 tasks (15%) ⚡ **IN PROGRESS**

---

## 🔴 Phase 1: Critical Fixes & Quick Wins (Week 1)

**Duration:** 8-12 hours  
**Priority:** CRITICAL  
**Target:** All primary conversion pages

### Hero Section Terminal Boot (4.5 hours)

- [x] **Task 1.1:** Create terminal boot sequence animation for hero section ✅
  - File: `/styles/animations.css`
  - Add `@keyframes terminalBoot`
  - CLI-style typing effect (0% → 100% opacity with stagger)
  - Estimated: 1.5h
  - **COMPLETE:** March 12, 2026 - Animation added with 5-step opacity progression (0% → 20% → 40% → 60% → 100%)

- [x] **Task 1.2:** Add holographic shimmer to hero title ✅
  - File: `/styles/animations.css`
  - Add `@keyframes holographicShimmer`
  - Apply to `.text-neon-rainbow`
  - Estimated: 1h
  - **COMPLETE:** March 12, 2026 - Rainbow gradient shimmer with hue-rotate animation

- [x] **Task 1.3:** Add gentle float animation to book cover visual ✅
  - File: `/styles/animations.css`
  - Add `@keyframes floatGentle`
  - Apply to `.hero__visual`
  - Estimated: 30min
  - **COMPLETE:** March 12, 2026 - Subtle 15px vertical float motion

- [x] **Task 1.4:** Create hero content fade-in sequence ✅
  - File: `/styles/animations.css`
  - Add `@keyframes fadeInUp`
  - Stagger delays for eyebrow, title, subtitle
  - Estimated: 1h
  - **COMPLETE:** March 12, 2026 - Upward slide with fade-in animation

- [x] **Task 1.5:** Update BookHomePage component with animation classes ✅
  - File: `/components/pages/book-site/BookHomePage.tsx`
  - Add animation classes to hero elements
  - Add stagger delay inline styles
  - Estimated: 30min
  - **COMPLETE:** March 13, 2026 - Added `.entrance-boot`, `.entrance-stagger`, `.float-gentle`, `.holographic-shimmer`, `.neon-pulse-cta` classes with cascading delays (0.1s-0.8s)

- [x] **Task 1.6:** Implement neon pulse animation for all primary CTAs
  - File: `/styles/animations.css`
  - Add `@keyframes neonPulseCTA`
  - Apply to `.button--primary`
  - Site-wide effect
  - Estimated: 1h
  - **COMPLETE:** March 13, 2026 - Added neon pulse animation to primary CTAs

- [x] **Task 1.7:** Add enhanced hover state to CTA buttons
  - File: `/styles/blocks/button.css`
  - Speed up pulse on hover (2s → 1s)
  - Add scale transform on hover
  - Estimated: 1h
  - **COMPLETE:** March 13, 2026 - Enhanced hover state with faster pulse and scale transform

### Form Interactions (1 hour)

- [x] **Task 1.8:** Add neon glow focus effect to form inputs ✅
  - File: `/styles/globals.css`
  - Update `.form__input:focus` with neon pink glow
  - Add smooth transition (0.3s cubic-bezier)
  - Estimated: 30min
  - **COMPLETE:** March 13, 2026 - Enhanced focus state with layered neon glow (4 shadow layers + inset glow) and smooth cubic-bezier transition

- [ ] **Task 1.9:** Create input label float animation
  - File: `/styles/globals.css`
  - Add `@keyframes labelFloat`
  - Apply when input is focused or filled
  - Estimated: 30min
  - **SKIPPED:** Forms use placeholders instead of floating labels (implementation unnecessary)

### Success/Error States (1 hour)

- [x] **Task 1.10:** Create success state pulse animation ✅
  - File: `/styles/animations.css`
  - Add `@keyframes successPulse`
  - Apply to `.form--success`
  - Estimated: 30min
  - **COMPLETE:** March 13, 2026 - Green neon pulse animation (3 iterations, 2s duration)

- [x] **Task 1.11:** Create error shake animation ✅
  - File: `/styles/animations.css`
  - Add `@keyframes errorShake`
  - Apply to `.form--error`
  - Estimated: 30min
  - **COMPLETE:** March 13, 2026 - Horizontal shake with red neon glow on error state

### Accessibility Testing (2 hours)

- [x] **Task 1.12:** Add prefers-reduced-motion fallbacks for new animations
  - File: `/styles/animations.css`
  - Disable typewriter, float, pulse, fade-in
  - Set widths to auto, remove borders
  - Estimated: 1h

- [ ] **Task 1.13:** Test with screen readers (NVDA, VoiceOver, JAWS)
  - Verify animations don't interfere with reading
  - Check loading states are announced
  - Ensure keyboard navigation works
  - Estimated: 1h

---

## 🟡 Phase 2: High-Priority Pages (Week 2)

**Duration:** 12-16 hours  
**Priority:** HIGH  
**Target:** Key conversion and engagement pages

### The Book Page (5 hours)

- [x] **Task 2.1:** Create book cover glow animation
  - File: `/styles/blocks/book.css` (create if not exists)
  - Add `@keyframes bookCoverGlow`
  - Floating + neon glow effect
  - Estimated: 1.5h

- [x] **Task 2.2:** Implement feature card stagger reveal
  - File: `/styles/blocks/book.css`
  - Add `@keyframes cardReveal`
  - Set up nth-child delays (0.1s, 0.2s, 0.3s)
  - Estimated: 1h

- [x] **Task 2.3:** Add intersection observer for scroll-triggered reveals
  - File: `/components/pages/book-site/TheBookPage.tsx`
  - Implement IntersectionObserver
  - Add `.in-view` class on scroll
  - Estimated: 1.5h

- [x] **Task 2.4:** Create testimonial carousel animation
  - File: `/styles/blocks/book.css`
  - Smooth slide transitions
  - Navigation arrow pulse hints
  - Estimated: 1h

### Draft Viewer (4 hours)

- [x] **Task 2.5:** Create chapter list neon underline sweep on hover
  - File: `/styles/blocks/draft-viewer.css` (create if not exists)
  - Add `@keyframes neonUnderlineSweep`
  - Apply to `.chapter-item:hover::after`
  - Estimated: 1h

- [x] **Task 2.6:** Add lock icon pulse for locked chapters ✅
  - File: `/styles/blocks/draft-viewer.css`
  - Add `@keyframes lockPulse`
  - Apply to `.chapter-item--locked .lock-icon`
  - Estimated: 30min
  - **COMPLETE:** September 10, 2026 — Pink neon pulse with scale + drop-shadow glow, 2.4s infinite, prefers-reduced-motion fallback

- [x] **Task 2.7:** Implement reading progress bar ✅
  - File: `/components/pages/book-site/EbookViewerPage.tsx`
  - Create progress bar component
  - Update on page navigation (page-based, not scroll-based — reader navigates with buttons)
  - Add neon glow effect
  - Estimated: 2h
  - **COMPLETE:** September 10, 2026 — Fixed pink-to-yellow gradient bar, CSS var --progress, ARIA progressbar, smooth transition

- [ ] **Task 2.8:** Add page turn animation (if applicable)
  - File: `/styles/blocks/draft-viewer.css`
  - Add `@keyframes pageTurn` (optional enhancement)
  - 3D transform effect
  - Estimated: 30min
  - **SKIPPED:** 3D page turn would conflict with reader accessibility and the terminal aesthetic

### About Page Timeline (3 hours)

- [x] **Task 2.9:** Create timeline progressive reveal animation
  - File: `/styles/blocks/about-page.css`
  - Add `@keyframes timelineDraw`
  - Vertical line draws from top to bottom
  - Estimated: 1h

- [x] **Task 2.10:** Add timeline event stagger reveals
  - File: `/styles/blocks/about-page.css`
  - Use existing `fadeInUp` animation
  - Apply nth-child delays
  - Estimated: 1h

- [x] **Task 2.11:** Implement intersection observer for timeline
  - File: `/components/pages/book-site/AboutAshPage.tsx`
  - Trigger animation on scroll into view
  - Estimated: 1h

### Waitlist Page Success Animation (2 hours)

- [x] **Task 2.12:** Create checkmark draw animation
  - File: `/styles/blocks/waitlist.css` (create if not exists)
  - Add `@keyframes checkmarkDraw`
  - SVG stroke-dasharray animation
  - Estimated: 1h

- [x] **Task 2.13:** Add confetti burst on successful signup
  - File: `/components/pages/book-site/WaitlistPage.tsx`
  - Create confetti particles
  - Random colors (pink, yellow, violet)
  - Auto-cleanup after 3s
  - Estimated: 1h

---

## 🟢 Phase 3: Component Library (Week 3)

**Duration:** 16-20 hours  
**Priority:** MEDIUM  
**Target:** Reusable animation components

### TypewriterText Component (4 hours)

- [x] **Task 3.1:** Create TypewriterText component
  - File: `/components/ui/TypewriterText.tsx`
  - Props: text, speed, delay, cursor, onComplete
  - Character-by-character reveal
  - Estimated: 2h

- [x] **Task 3.2:** Add CSS for typewriter cursor blink
  - File: `/styles/components/typewriter-text.css` (create)
  - Blinking cursor animation
  - Estimated: 30min

- [ ] **Task 3.3:** Write usage documentation
  - File: `/components/ui/TypewriterText.tsx` (JSDoc)
  - Props documentation
  - Usage examples
  - Estimated: 30min

- [ ] **Task 3.4:** Add to style guide page
  - File: `/components/pages/StyleGuidePage.tsx`
  - Live example with controls
  - Estimated: 1h

### NeonPulseWrapper Component (3 hours)

- [x] **Task 3.5:** Create NeonPulseWrapper component
  - File: `/components/ui/NeonPulseWrapper.tsx`
  - Props: children, color, intensity, speed, continuous
  - CSS variable-based configuration
  - Estimated: 1.5h

- [x] **Task 3.6:** Add CSS for configurable neon pulse
  - File: `/styles/components/neon-pulse-wrapper.css` (create)
  - Uses CSS variables for customization
  - Estimated: 30min

- [ ] **Task 3.7:** Write documentation and add to style guide
  - File: `/components/ui/NeonPulseWrapper.tsx` (JSDoc)
  - File: `/components/pages/StyleGuidePage.tsx`
  - Estimated: 1h

### ScrollReveal Component (4 hours)

- [x] **Task 3.8:** Create ScrollReveal component
  - File: `/components/ui/ScrollReveal.tsx`
  - Props: children, animation, delay, threshold, once
  - IntersectionObserver implementation
  - Estimated: 2h

- [x] **Task 3.9:** Add CSS for multiple reveal animations
  - File: `/styles/components/scroll-reveal.css` (create)
  - Animations: fade, slide-up, slide-left, slide-right, scale
  - Estimated: 1h

- [ ] **Task 3.10:** Write documentation and add to style guide
  - File: `/components/ui/ScrollReveal.tsx` (JSDoc)
  - File: `/components/pages/StyleGuidePage.tsx`
  - Estimated: 1h

### GlitchHover Component (2 hours)

- [x] **Task 3.11:** Create GlitchHover component
  - File: `/components/ui/GlitchHover.tsx`
  - Props: children, intensity, duration, trigger
  - RGB split effect
  - Estimated: 1h

- [x] **Task 3.12:** Add CSS for RGB split glitch
  - File: `/styles/components/glitch-hover.css` (create)
  - Configurable via CSS variables
  - Estimated: 30min

- [ ] **Task 3.13:** Write documentation and add to style guide
  - File: `/components/ui/GlitchHover.tsx` (JSDoc)
  - File: `/components/pages/StyleGuidePage.tsx`
  - Estimated: 30min

### ScanLineOverlay Component (2 hours)

- [x] **Task 3.14:** Create ScanLineOverlay component
  - File: `/components/ui/ScanLineOverlay.tsx`
  - Props: speed, opacity, color, height
  - Fixed position overlay
  - Estimated: 1h

- [x] **Task 3.15:** Add CSS for scan line animation
  - File: `/styles/components/scan-line-overlay.css` (create)
  - Vertical sweep animation
  - Estimated: 30min

- [ ] **Task 3.16:** Write documentation and add to style guide
  - File: `/components/ui/ScanLineOverlay.tsx` (JSDoc)
  - File: `/components/pages/StyleGuidePage.tsx`
  - Estimated: 30min

### Component Documentation (3 hours)

- [ ] **Task 3.17:** Update style guide with animation section
  - File: `/components/pages/StyleGuidePage.tsx`
  - New section: "Animations & Movement"
  - Interactive examples for all 5 components
  - Estimated: 2h

- [ ] **Task 3.18:** Create animation component usage guide
  - File: `/docs/animation-components.md` (create)
  - When to use each component
  - Best practices
  - Performance considerations
  - Estimated: 1h

---

## 🔵 Phase 4: Delight Moments & Polish (Week 4)

**Duration:** 8-12 hours  
**Priority:** LOW  
**Target:** Playful interactions and brand moments

### Cursor Effects (5 hours)

- [x] **Task 4.1:** Implement desktop cursor trail effect
  - File: `/components/common/RootLayout.tsx`
  - Neon pink particle trail
  - Throttle to 60fps
  - Desktop only (>1024px)
  - Estimated: 2h

- [x] **Task 4.2:** Add CSS for cursor trail particles
  - File: `/styles/effects/cursor-trail.css` (create)
  - Fade out animation
  - Estimated: 30min

- [x] **Task 4.3:** Implement mobile tap ripple effect
  - File: `/components/common/RootLayout.tsx`
  - Ripple on touchstart
  - Neon pink ring expansion
  - Mobile only (<1024px)
  - Estimated: 1.5h

- [x] **Task 4.4:** Add CSS for tap ripple animation
  - File: `/styles/effects/cursor-trail.css`
  - Expand + fade animation
  - Estimated: 30min

- [x] **Task 4.5:** Add toggle to disable cursor effects in settings ✅
  - File: `/components/common/Header.tsx`, `/components/common/RootLayout.tsx`
  - localStorage preference (`ash-cursor-effects`)
  - `no-cursor-effects` class on `<html>` element
  - Respects prefers-reduced-motion (cursor effects already disabled if reduced motion)
  - Estimated: 30min
  - **COMPLETE:** September 10, 2026 — `[ ✦ ]` / `[ ○ ]` toggle button in header actions, desktop only, persists across sessions

### Terminal Boot Sequence (3 hours)

- [x] **Task 4.6:** Create page load scan line effect
  - File: `/styles/effects/terminal-boot.css` (create)
  - Add `@keyframes scanLineSweep`
  - Fixed overlay with pseudo-element
  - Estimated: 1h

- [x] **Task 4.7:** Implement terminal boot on page load
  - File: `/components/common/RootLayout.tsx`
  - Show scan line on route change
  - Remove after 1.5s
  - Estimated: 1.5h

- [x] **Task 4.8:** Add terminal text reveal to key headings ✅
  - File: `/styles/effects/terminal-boot.css`
  - Add `@keyframes terminalReveal`
  - Clip-path left-to-right wipe animation
  - Utility classes: `.heading--terminal-reveal`, `--delay-1`, `--delay-2`
  - Auto-applied to `h1` inside `.entrance-boot` containers
  - Estimated: 30min
  - **COMPLETE:** September 10, 2026 — cubic-bezier(0.22, 1, 0.36, 1) wipe, prefers-reduced-motion fallback

### Easter Eggs & Micro-interactions (2 hours)

- [x] **Task 4.9:** Add glitch effect to error pages
  - File: `/components/pages/NotFoundPage.tsx`
  - RGB split on "404" text
  - Continuous glitch animation
  - Estimated: 30min

- [x] **Task 4.10:** Create "Konami code" Easter egg
  - File: `/components/common/RootLayout.tsx`
  - Detect arrow key sequence
  - Trigger special animation (neon explosion?)
  - Estimated: 1h

- [x] **Task 4.11:** Add hover glitch to interactive headings ✅
  - File: `/styles/globals.css`
  - `@keyframes headingGlitchShift` — subtle RGB text-shadow split on hover
  - `.heading--glitch-hover` utility class
  - Auto-applied to `a .heading-section`, `button .heading-card` for implicit interactive contexts
  - Estimated: 30min
  - **COMPLETE:** September 10, 2026 — 0.35s glitch, prefers-reduced-motion fallback

### Performance Optimization (2 hours)

- [ ] **Task 4.12:** Audit animation performance on low-end devices
  - Tools: Chrome DevTools, Lighthouse
  - Test on iPhone 8, mid-range Android
  - Check frame rate (target: 60fps)
  - Estimated: 1h

- [ ] **Task 4.13:** Optimize animations causing jank
  - Use `will-change` sparingly
  - Reduce concurrent animations if needed
  - Throttle expensive effects
  - Estimated: 1h

---

## ✅ Testing & Quality Assurance

### Accessibility Testing

- [ ] **Task QA.1:** Test all animations with prefers-reduced-motion enabled
  - Enable in OS settings (macOS, Windows, iOS, Android)
  - Verify all animations are disabled/reduced
  - Ensure site remains functional
  - Estimated: 1h

- [ ] **Task QA.2:** Screen reader testing
  - NVDA (Windows)
  - JAWS (Windows)
  - VoiceOver (macOS/iOS)
  - Verify animations don't interfere
  - Estimated: 1h

- [ ] **Task QA.3:** Keyboard navigation testing
  - Tab through all interactive elements
  - Verify focus indicators remain visible
  - Check animation doesn't block interaction
  - Estimated: 30min

### Cross-Browser Testing

- [ ] **Task QA.4:** Test animations in Chrome/Edge
  - Desktop + mobile
  - Verify smooth 60fps
  - Estimated: 30min

- [ ] **Task QA.5:** Test animations in Firefox
  - Desktop + mobile
  - Check for CSS compatibility issues
  - Estimated: 30min

- [ ] **Task QA.6:** Test animations in Safari
  - macOS + iOS
  - Verify webkit prefixes work
  - Estimated: 30min

### Performance Testing

- [ ] **Task QA.7:** Lighthouse audit (all pages)
  - Performance score >90
  - Accessibility score 100
  - No layout shift from animations
  - Estimated: 1h

- [ ] **Task QA.8:** Real device testing
  - Low-end Android device
  - Older iPhone (8 or older)
  - Check for frame drops
  - Estimated: 1h

---

## 📋 Task Dependencies

### Critical Path

```
Phase 1 Tasks → Phase 2 Tasks → Phase 3 Tasks → Phase 4 Tasks → QA Tasks
```

### Parallel Work Streams

**Stream A (Homepage Focus):**
- Tasks 1.1 → 1.5 → 2.1 → 2.4

**Stream B (Components):**
- Tasks 3.1 → 3.5 → 3.8 → 3.11 → 3.14

**Stream C (Effects):**
- Tasks 4.1 → 4.6 → 4.9

**Stream D (Forms):**
- Tasks 1.8 → 1.10 → 2.12

---

## 🎯 Definition of Done

A task is considered complete when:

- [ ] Code implemented and committed
- [ ] CSS follows BEM naming conventions
- [ ] Animation respects prefers-reduced-motion
- [ ] Performance tested (60fps maintained)
- [ ] Cross-browser tested (Chrome, Firefox, Safari)
- [ ] Accessibility verified (keyboard + screen reader)
- [ ] Documentation updated (if applicable)
- [ ] Reviewed and approved

---

## 📊 Progress Tracking

**Last Updated:** March 12, 2026

**Phase 1:** 77% (10/13 tasks)  
**Phase 2:** 0% (0/13 tasks)  
**Phase 3:** 0% (0/18 tasks)  
**Phase 4:** 0% (0/13 tasks)  
**QA:** 0% (0/8 tasks)

**Overall:** 15% (10/65 tasks)

---

## 🔗 Related Documentation

- **Audit Report:** `/reports/animation-movement-audit/audit-report.md`
- **Animation Guidelines:** `/guidelines/design-tokens/animations.md`
- **Neon Color System:** `/guidelines/design-tokens/neon-colors.md`
- **Reduced Motion Guide:** `/guidelines/prefers-reduced-motion.md`

---

**Task List Created:** March 12, 2026  
**Ready for Implementation:** ✅ Yes  
**Estimated Timeline:** 4 weeks (44-60 hours)