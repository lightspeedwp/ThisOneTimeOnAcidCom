# Template Parts Overview

**Version:** 4.0.0  
**Last Updated:** January 2025

WordPress-aligned template parts for the Ash Shaw Portfolio.

## Purpose

Define template parts following WordPress conventions:
- Reusable page fragments
- Global site elements
- Consistent across pages
- Theme-level components
- Easy maintenance

---

## What Are Parts?

**Parts** (Template Parts) are reusable page fragments that appear across multiple pages or templates. They align with WordPress "Template Parts" concept.

### Part vs Pattern vs Section

```
Template (Page)
├── Part (Global fragment)
│   ├── Pattern (Solution)
│   │   ├── Block (Content unit)
│   │   └── Component (UI element)
│   └── Pattern
└── Part
```

**Examples:**
- **Part:** Header - Appears on every page
- **Pattern:** Desktop + Mobile Navigation - Solution within header
- **Section:** Hero Section - Page-specific content area

---

## Part Categories

The Ash Shaw portfolio uses **7 template parts** organized by category. Each has detailed implementation guidelines.

### Global Parts

Appear site-wide across all pages

| Part | Purpose | Guideline File |
|------|---------|---------------|
| **Header** | Site navigation and branding | [parts/Header.md](./parts/Header.md) |
| **Footer** | Site-wide footer with contact form | [parts/Footer.md](./parts/Footer.md) |
| **MobileMenu** | Full-screen mobile navigation | [parts/MobileMenu.md](./parts/MobileMenu.md) |

### Conditional Parts

Appear on specific page types

| Part | Purpose | Guideline File |
|------|---------|---------------|
| **Breadcrumbs** | Hierarchical navigation path | [parts/Breadcrumbs.md](./parts/Breadcrumbs.md) |
| **SocialLinks** | Social media icon links | [parts/SocialLinks.md](./parts/SocialLinks.md) |

### Utility Parts

Behind-the-scenes functionality

| Part | Purpose | Guideline File |
|------|---------|---------------|
| **ErrorBoundary** | React error handling | [parts/ErrorBoundary.md](./parts/ErrorBoundary.md) |
| **SkipLinks** | Accessibility shortcuts | [parts/SkipLinks.md](./parts/SkipLinks.md) |

---

## Core Part Examples

### Header Part

```tsx
<header className="fixed top-0 left-0 right-0 z-50 bg-white shadow-lg">
  <div className="max-w-7xl mx-auto px-fluid-md py-4">
    <div className="flex items-center justify-between">
      {/* Logo */}
      <Logo size="header" onClick={() => navigateHome()} />
      
      {/* Desktop Nav */}
      <nav className="hidden md:block">
        <ul className="flex items-center gap-6">
          <li><NavLink href="/">Home</NavLink></li>
          <li><NavLink href="/about">About</NavLink></li>
          <li><NavLink href="/portfolio">Portfolio</NavLink></li>
          <li><NavLink href="/blog">Blog</NavLink></li>
        </ul>
      </nav>
      
      {/* Mobile Toggle */}
      <button 
        onClick={() => setIsMobileMenuOpen(true)}
        className="md:hidden"
        aria-label="Open menu"
      >
        <Menu className="w-6 h-6" />
      </button>
    </div>
  </div>
  
  <MobileMenu 
    isOpen={isMobileMenuOpen}
    onClose={() => setIsMobileMenuOpen(false)}
  />
</header>
```

### Footer Part

```tsx
<footer className="bg-gradient-to-br from-pink-50 via-purple-50 to-blue-50 py-section px-fluid-md">
  <div className="max-w-7xl mx-auto">
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-fluid-xl mb-fluid-2xl">
      {/* Contact Form */}
      <div className="lg:col-span-2">
        <h2 className="text-section-h2 font-heading font-bold mb-fluid-lg">
          Get In Touch
        </h2>
        <ContactForm />
      </div>
      
      {/* Quick Links & Social */}
      <div className="space-y-fluid-lg">
        <div>
          <h3 className="text-xl font-heading font-semibold mb-4">Quick Links</h3>
          <nav><ul className="space-y-2">{/* Links */}</ul></nav>
        </div>
        <SocialLinks />
      </div>
    </div>
    
    {/* Copyright */}
    <div className="border-t border-gray-300 pt-6 text-center text-sm text-gray-600">
      © 2025 Ash Shaw. All rights reserved.
    </div>
  </div>
</footer>
```

### Mobile Menu Part

```tsx
{isOpen && (
  <div className="fixed inset-0 z-50 md:hidden">
    {/* Backdrop */}
    <div 
      className="absolute inset-0 bg-black/50 backdrop-blur-sm"
      onClick={onClose}
    />
    
    {/* Drawer */}
    <div className="absolute right-0 top-0 bottom-0 w-80 max-w-full bg-white shadow-2xl">
      <div className="flex flex-col h-full">
        <div className="flex items-center justify-between p-6 border-b">
          <Logo size="md" />
          <button onClick={onClose} aria-label="Close menu">
            <X className="w-6 h-6" />
          </button>
        </div>
        
        <nav className="flex-1 p-6">
          <ul className="space-y-4">{/* Nav items */}</ul>
        </nav>
        
        <div className="p-6 border-t">
          <SocialLinks />
        </div>
      </div>
    </div>
  </div>
)}
```

---

## WordPress Template Part Alignment

| Ash Shaw Part | WordPress Template Part | File |
|--------------|------------------------|------|
| `Header` | `header.html` | `Header.tsx` |
| `Footer` | `footer.html` | `Footer.tsx` |
| `MobileMenu` | Custom navigation | `MobileMenu.tsx` |
| `Breadcrumbs` | Breadcrumb pattern | `Breadcrumbs.tsx` |
| `SocialLinks` | Social links block | `SocialLinks.tsx` |

### Usage Pattern

```php
// WordPress: Template part
<?php block_template_part('header'); ?>

// Ash Shaw: React component
<Header currentPage={page} setCurrentPage={navigate} />
```

---

## Best Practices

### 1. Keep Parts Focused
```tsx
// ✅ Part has single responsibility
export function Header() {
  // Only handles header functionality
}
```

### 2. Make Parts Configurable
```tsx
// ✅ Accept props for customization
export function Footer({ showNewsletter = true }: Props) {
  return (
    <footer>
      {showNewsletter && <NewsletterForm />}
    </footer>
  );
}
```

### 3. Maintain Accessibility
```tsx
// ✅ Parts have proper ARIA and semantic HTML
<header role="banner">
  <nav aria-label="Main navigation">
</header>

<footer role="contentinfo">
```

---

## Part Guidelines

For detailed implementation of each part, see the specific guideline files:

### Global Parts
- **[Header.md](./parts/Header.md)** - Site navigation and branding
- **[Footer.md](./parts/Footer.md)** - Site-wide footer with contact form
- **[MobileMenu.md](./parts/MobileMenu.md)** - Full-screen mobile navigation

### Conditional Parts
- **[Breadcrumbs.md](./parts/Breadcrumbs.md)** - Hierarchical navigation path
- **[SocialLinks.md](./parts/SocialLinks.md)** - Social media icon links

### Utility Parts
- **[ErrorBoundary.md](./parts/ErrorBoundary.md)** - React error handling
- **[SkipLinks.md](./parts/SkipLinks.md)** - Accessibility shortcuts

---

## Related Documentation

- **[Guidelines.md](./Guidelines.md)** - Main guidelines
- **[overview-templates.md](./overview-templates.md)** - Page templates
- **[overview-patterns.md](./overview-patterns.md)** - Design patterns
- **[overview-components.md](./overview-components.md)** - Component library

---

**Last Updated:** January 2025  
**Version:** 4.0.0