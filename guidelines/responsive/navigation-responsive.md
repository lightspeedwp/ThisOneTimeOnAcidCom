# Responsive Navigation Patterns

**Version:** 5.0.0  
**Last Updated:** January 2025  
**WordPress Block Theme Compatible:** ✅

Complete guide to navigation evolution across mobile, tablet, and desktop breakpoints for the Ash Shaw Makeup Portfolio.

---

## 📋 Navigation Evolution

### Three-Stage Navigation System

```
┌────────────────────────────────────────────────────────────────────────┐
│                    NAVIGATION RESPONSIVE EVOLUTION                      │
└────────────────────────────────────────────────────────────────────────┘

Mobile                  Tablet                    Desktop
< 768px                 768px - 1023px            1024px+
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

┌─────────────┐        ┌───────────────────┐    ┌─────────────────────────┐
│  Hamburger  │        │    Hybrid Menu    │    │   Full Horizontal Nav   │
│    Menu     │        │  (Some visible)   │    │    (All items shown)    │
│  Full-Screen│        │  + Hamburger      │    │    + Hover Effects      │
│   Overlay   │        │                   │    │                         │
└─────────────┘        └───────────────────┘    └─────────────────────────┘
```

---

## 📱 Mobile Navigation (< 768px)

### Pattern: Hamburger Menu with Full-Screen Overlay

**Features:**
- Hamburger icon in top-right
- Full-screen overlay when open
- Vertical stacked links
- Smooth slide-in animation
- Close button

```css
/* Mobile Header */
.site-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: var(--wp--preset--spacing--20);
  background: white;
  position: sticky;
  top: 0;
  z-index: 1000;
}

/* Logo */
.site-logo {
  font-size: var(--wp--preset--font-size--400);
  font-weight: 700;
}

/* Hamburger Icon */
.hamburger-button {
  display: flex;
  flex-direction: column;
  gap: 6px;
  background: none;
  border: none;
  cursor: pointer;
  padding: var(--wp--preset--spacing--10);
  z-index: 1100;
}

.hamburger-line {
  width: 28px;
  height: 3px;
  background: var(--wp--preset--color--foreground);
  border-radius: 2px;
  transition: all var(--animation-200) var(--ease-standard);
}

/* Hamburger open state */
.hamburger-button.open .hamburger-line:nth-child(1) {
  transform: rotate(45deg) translateY(9px);
}

.hamburger-button.open .hamburger-line:nth-child(2) {
  opacity: 0;
}

.hamburger-button.open .hamburger-line:nth-child(3) {
  transform: rotate(-45deg) translateY(-9px);
}

/* Mobile Navigation Overlay */
.mobile-nav {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  background: white;
  z-index: 1000;
  
  /* Hidden by default */
  transform: translateX(100%);
  transition: transform var(--animation-300) var(--ease-standard);
}

.mobile-nav.open {
  transform: translateX(0);
}

/* Mobile Nav Links */
.mobile-nav-list {
  display: flex;
  flex-direction: column;
  gap: var(--wp--preset--spacing--20);
  padding: var(--wp--preset--spacing--80) var(--wp--preset--spacing--40);
  list-style: none;
}

.mobile-nav-link {
  font-size: var(--wp--preset--font-size--500);
  font-weight: 600;
  color: var(--wp--preset--color--foreground);
  text-decoration: none;
  padding: var(--wp--preset--spacing--20);
  border-bottom: 2px solid transparent;
  transition: all var(--animation-200) var(--ease-standard);
}

.mobile-nav-link:active {
  transform: scale(0.95);
  color: var(--wp--preset--color--primary);
  border-bottom-color: var(--wp--preset--color--primary);
}

.mobile-nav-link.active {
  color: var(--wp--preset--color--primary);
  border-bottom-color: var(--wp--preset--color--primary);
}
```

### React Implementation

```tsx
import { useState } from 'react';
import { Menu, X } from 'lucide-react';

export function MobileNavigation() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);
  const closeMenu = () => setIsOpen(false);

  return (
    <>
      {/* Hamburger Button */}
      <button
        className={`hamburger-button ${isOpen ? 'open' : ''}`}
        onClick={toggleMenu}
        aria-label={isOpen ? 'Close menu' : 'Open menu'}
        aria-expanded={isOpen}
      >
        <span className="hamburger-line" />
        <span className="hamburger-line" />
        <span className="hamburger-line" />
      </button>

      {/* Mobile Navigation Overlay */}
      <nav
        className={`mobile-nav ${isOpen ? 'open' : ''}`}
        aria-label="Mobile navigation"
      >
        <ul className="mobile-nav-list">
          <li>
            <a href="/" className="mobile-nav-link" onClick={closeMenu}>
              Home
            </a>
          </li>
          <li>
            <a href="/about" className="mobile-nav-link" onClick={closeMenu}>
              About
            </a>
          </li>
          <li>
            <a href="/portfolio" className="mobile-nav-link" onClick={closeMenu}>
              Portfolio
            </a>
          </li>
          <li>
            <a href="/blog" className="mobile-nav-link" onClick={closeMenu}>
              Blog
            </a>
          </li>
          <li>
            <a href="/contact" className="mobile-nav-link" onClick={closeMenu}>
              Contact
            </a>
          </li>
        </ul>
      </nav>

      {/* Backdrop */}
      {isOpen && (
        <div
          className="mobile-nav-backdrop"
          onClick={closeMenu}
          aria-hidden="true"
        />
      )}
    </>
  );
}
```

---

## 📱 Tablet Navigation (768px - 1023px)

### Pattern: Hybrid Navigation

**Features:**
- Some links visible in header
- Hamburger for overflow items
- Horizontal layout starts
- Transition to desktop nav

```css
@media (min-width: 768px) {
  /* Header with more space */
  .site-header {
    padding: var(--wp--preset--spacing--30) var(--wp--preset--spacing--40);
  }

  /* Tablet Navigation - Hybrid */
  .tablet-nav {
    display: flex;
    gap: var(--wp--preset--spacing--30);
    align-items: center;
  }

  /* Show first 3-4 links */
  .tablet-nav .nav-link {
    display: inline-block;
    font-size: var(--wp--preset--font-size--300);
    font-weight: 500;
    color: var(--wp--preset--color--foreground);
    text-decoration: none;
    padding: var(--wp--preset--spacing--10);
    position: relative;
  }

  /* Hide remaining links in hamburger */
  .tablet-nav .nav-link.hidden-tablet {
    display: none;
  }

  /* Keep hamburger for overflow */
  .hamburger-button {
    display: flex;
  }

  /* Underline effect on hover */
  .tablet-nav .nav-link::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    width: 0;
    height: 2px;
    background: var(--wp--preset--color--primary);
    transition: width var(--animation-200) var(--ease-standard);
  }

  @media (hover: hover) {
    .tablet-nav .nav-link:hover::after {
      width: 100%;
    }
  }

  .tablet-nav .nav-link.active::after {
    width: 100%;
  }
}
```

---

## 🖥️ Desktop Navigation (1024px+)

### Pattern: Full Horizontal Navigation

**Features:**
- All links visible
- Hover effects active
- No hamburger menu
- Dropdown menus (if needed)

```css
@media (min-width: 1024px) {
  /* Desktop Header */
  .site-header {
    padding: var(--wp--preset--spacing--40) var(--wp--preset--spacing--60);
  }

  /* Hide hamburger on desktop */
  .hamburger-button {
    display: none;
  }

  /* Desktop Navigation */
  .desktop-nav {
    display: flex;
    gap: var(--wp--preset--spacing--40);
    align-items: center;
  }

  .desktop-nav .nav-link {
    display: inline-block;
    font-size: var(--wp--preset--font-size--300);
    font-weight: 500;
    color: var(--wp--preset--color--foreground);
    text-decoration: none;
    padding: var(--wp--preset--spacing--10) var(--wp--preset--spacing--20);
    position: relative;
    transition: color var(--animation-200) var(--ease-standard);
  }

  /* Gradient underline on hover */
  .desktop-nav .nav-link::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    width: 0;
    height: 2px;
    background: linear-gradient(90deg, #EC4899, #A855F7, #3B82F6);
    transition: width var(--animation-200) var(--ease-standard);
  }

  @media (hover: hover) {
    .desktop-nav .nav-link:hover {
      color: var(--wp--preset--color--primary);
    }

    .desktop-nav .nav-link:hover::after {
      width: 100%;
    }
  }

  .desktop-nav .nav-link.active {
    color: var(--wp--preset--color--primary);
  }

  .desktop-nav .nav-link.active::after {
    width: 100%;
  }

  /* Focus styles for keyboard navigation */
  .desktop-nav .nav-link:focus-visible {
    outline: 2px solid var(--wp--preset--color--primary);
    outline-offset: 4px;
    border-radius: 4px;
  }
}

@media (min-width: 1440px) {
  .site-header {
    padding: var(--wp--preset--spacing--40) var(--wp--preset--spacing--80);
  }

  .desktop-nav {
    gap: var(--wp--preset--spacing--50);
  }
}
```

---

## 🎨 Complete Responsive Navigation Component

### React Implementation

```tsx
import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { Link, useLocation } from 'react-router';

interface NavLink {
  label: string;
  href: string;
}

const navLinks: NavLink[] = [
  { label: 'Home', href: '/' },
  { label: 'About', href: '/about' },
  { label: 'Portfolio', href: '/portfolio' },
  { label: 'Blog', href: '/blog' },
  { label: 'Contact', href: '/contact' },
];

export function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isDesktop, setIsDesktop] = useState(false);
  const location = useLocation();

  // Detect desktop breakpoint
  useEffect(() => {
    const checkBreakpoint = () => {
      setIsDesktop(window.innerWidth >= 1024);
    };

    checkBreakpoint();
    window.addEventListener('resize', checkBreakpoint);
    return () => window.removeEventListener('resize', checkBreakpoint);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  // Prevent scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMobileMenuOpen]);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <header className="site-header">
      {/* Logo */}
      <Link to="/" className="site-logo">
        Ash Shaw
      </Link>

      {/* Desktop Navigation (1024px+) */}
      {isDesktop ? (
        <nav className="desktop-nav" aria-label="Main navigation">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              to={link.href}
              className={`nav-link ${
                location.pathname === link.href ? 'active' : ''
              }`}
            >
              {link.label}
            </Link>
          ))}
        </nav>
      ) : (
        <>
          {/* Mobile/Tablet Hamburger Button */}
          <button
            className={`hamburger-button ${isMobileMenuOpen ? 'open' : ''}`}
            onClick={toggleMobileMenu}
            aria-label={isMobileMenuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={isMobileMenuOpen}
          >
            <span className="hamburger-line" />
            <span className="hamburger-line" />
            <span className="hamburger-line" />
          </button>

          {/* Mobile Navigation Overlay */}
          <nav
            className={`mobile-nav ${isMobileMenuOpen ? 'open' : ''}`}
            aria-label="Mobile navigation"
          >
            <ul className="mobile-nav-list">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    to={link.href}
                    className={`mobile-nav-link ${
                      location.pathname === link.href ? 'active' : ''
                    }`}
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Backdrop */}
          {isMobileMenuOpen && (
            <div
              className="mobile-nav-backdrop"
              onClick={() => setIsMobileMenuOpen(false)}
              aria-hidden="true"
            />
          )}
        </>
      )}
    </header>
  );
}
```

---

## 🎯 Navigation Animations

### Mobile Menu Slide-In

```css
/* Slide in from right */
.mobile-nav {
  transform: translateX(100%);
  transition: transform var(--animation-300) var(--ease-standard);
}

.mobile-nav.open {
  transform: translateX(0);
}
```

### Staggered Link Animation

```css
/* Stagger menu item animations */
.mobile-nav-link {
  opacity: 0;
  transform: translateY(20px);
  transition: 
    opacity var(--animation-300) var(--ease-decelerate),
    transform var(--animation-300) var(--ease-decelerate);
}

.mobile-nav.open .mobile-nav-link:nth-child(1) {
  transition-delay: 100ms;
  opacity: 1;
  transform: translateY(0);
}

.mobile-nav.open .mobile-nav-link:nth-child(2) {
  transition-delay: 150ms;
  opacity: 1;
  transform: translateY(0);
}

.mobile-nav.open .mobile-nav-link:nth-child(3) {
  transition-delay: 200ms;
  opacity: 1;
  transform: translateY(0);
}

.mobile-nav.open .mobile-nav-link:nth-child(4) {
  transition-delay: 250ms;
  opacity: 1;
  transform: translateY(0);
}

.mobile-nav.open .mobile-nav-link:nth-child(5) {
  transition-delay: 300ms;
  opacity: 1;
  transform: translateY(0);
}
```

### Desktop Underline Animation

```css
/* Animated gradient underline */
.desktop-nav .nav-link::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 0;
  width: 0;
  height: 2px;
  background: linear-gradient(90deg, #EC4899, #A855F7, #3B82F6);
  transition: width var(--animation-200) var(--ease-standard);
}

@media (hover: hover) {
  .desktop-nav .nav-link:hover::after {
    width: 100%;
  }
}
```

---

## ♿ Accessibility Requirements

### Keyboard Navigation

```tsx
// Handle keyboard interactions
const handleKeyDown = (e: React.KeyboardEvent, action: () => void) => {
  if (e.key === 'Enter' || e.key === ' ') {
    e.preventDefault();
    action();
  } else if (e.key === 'Escape') {
    setIsMobileMenuOpen(false);
  }
};

// Apply to hamburger button
<button
  onKeyDown={(e) => handleKeyDown(e, toggleMobileMenu)}
  // ... other props
>
```

### Focus Management

```tsx
import { useEffect, useRef } from 'react';

export function MobileNav({ isOpen }: { isOpen: boolean }) {
  const firstLinkRef = useRef<HTMLAnchorElement>(null);

  // Focus first link when menu opens
  useEffect(() => {
    if (isOpen && firstLinkRef.current) {
      firstLinkRef.current.focus();
    }
  }, [isOpen]);

  return (
    <nav className={`mobile-nav ${isOpen ? 'open' : ''}`}>
      <ul>
        <li>
          <a ref={firstLinkRef} href="/">Home</a>
        </li>
        {/* ... other links */}
      </ul>
    </nav>
  );
}
```

### ARIA Labels

```tsx
<nav aria-label="Main navigation">
  <button
    aria-label={isOpen ? 'Close menu' : 'Open menu'}
    aria-expanded={isOpen}
    aria-controls="mobile-menu"
  >
    Menu
  </button>
  
  <ul id="mobile-menu">
    <li>
      <a href="/" aria-current={isCurrentPage ? 'page' : undefined}>
        Home
      </a>
    </li>
  </ul>
</nav>
```

---

## 📋 Navigation Checklist

### Mobile (< 768px)
- [ ] Hamburger icon visible and accessible
- [ ] Full-screen overlay covers entire viewport
- [ ] Touch targets minimum 44px
- [ ] Smooth slide-in animation
- [ ] Close button or backdrop to dismiss
- [ ] Prevents body scroll when open

### Tablet (768px - 1023px)
- [ ] Hybrid navigation (some links visible)
- [ ] Hamburger for overflow items
- [ ] Touch and hover both supported
- [ ] Proper spacing between links

### Desktop (1024px+)
- [ ] All links visible horizontally
- [ ] No hamburger menu
- [ ] Hover effects active
- [ ] Keyboard navigation works
- [ ] Focus indicators visible

### All Devices
- [ ] Logo always visible and clickable
- [ ] Active page indicated
- [ ] Smooth transitions
- [ ] ARIA labels present
- [ ] Keyboard accessible

---

## 🔗 Related Documentation

- [Breakpoints System](./breakpoints-system.md) - Breakpoint definitions
- [Interaction Modes](./interaction-modes.md) - Touch vs hover patterns
- [Animations](../design-tokens/animations.md) - Animation timing
- [Header Component](../components/Header.md) - Header component guide

---

## ✅ Best Practices Summary

### DO ✅

1. **Mobile-first navigation**
   - Start with hamburger menu
   - Enhance for larger screens

2. **Clear visual feedback**
   - Active state indicators
   - Hover effects on desktop
   - Touch feedback on mobile

3. **Accessibility first**
   - Keyboard navigation
   - ARIA labels
   - Focus management

4. **Smooth transitions**
   - Use animation tokens
   - Respect `prefers-reduced-motion`

### DON'T ❌

1. **Don't show desktop nav on mobile**
   - Links will be too small
   - Not touch-friendly

2. **Don't forget focus states**
   - Critical for keyboard users

3. **Don't block scrolling permanently**
   - Only while mobile menu is open

4. **Don't use hover-only interactions**
   - Always provide touch alternative

---

**Version:** 5.0.0 (WordPress Navigation System)  
**Last Updated:** January 2025  
**Maintained By:** Ash Shaw Portfolio Team
