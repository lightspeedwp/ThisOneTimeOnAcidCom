# Header Component

**Version:** 4.0.0  
**Last Updated:** January 2025

The main navigation header with responsive mobile menu, accessibility features, and smooth scroll behavior.

## Purpose

Provide consistent site-wide navigation with:
- Desktop horizontal navigation
- Mobile hamburger menu
- Active page indication
- Accessibility compliance (WCAG 2.1 AA)
- Sticky positioning for easy access
- Focus management and keyboard navigation

---

## Usage

### Basic Usage

```tsx
import { Header } from './components/common/Header';

<Header 
  currentPage="home"
  onNavigate={(page) => setCurrentPage(page)}
/>
```

### With Custom Styling

```tsx
<Header 
  currentPage="portfolio"
  onNavigate={handleNavigate}
  className="border-b border-gray-200"
/>
```

---

## Props

```typescript
interface HeaderProps {
  /**
   * Current active page
   * @required
   */
  currentPage: 'home' | 'about' | 'portfolio' | 'blog';
  
  /**
   * Navigation handler
   * @required
   */
  onNavigate: (page: string) => void;
  
  /**
   * Additional CSS classes
   * @default ""
   */
  className?: string;
  
  /**
   * Whether header should be sticky
   * @default true
   */
  sticky?: boolean;
  
  /**
   * Background transparency
   * @default true
   */
  transparent?: boolean;
}
```

---

## Features

### Sticky Positioning

```tsx
<header className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-md">
  {/* Header content */}
</header>
```

### Mobile Menu

```tsx
const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

// Mobile menu button
<button 
  className="lg:hidden"
  onClick={() => setIsMobileMenuOpen(true)}
  aria-label="Open navigation menu"
>
  <Menu className="w-6 h-6" />
</button>

// Mobile menu overlay
{isMobileMenuOpen && (
  <div className="fixed inset-0 bg-white z-50 lg:hidden">
    {/* Mobile menu content */}
  </div>
)}
```

### Active Page Indication

```tsx
<nav>
  {navItems.map(item => (
    <a
      key={item.id}
      className={`
        ${currentPage === item.id 
          ? 'text-gradient-pink-purple-blue font-semibold' 
          : 'text-gray-700 hover:text-pink-500'
        }
      `}
    >
      {item.label}
    </a>
  ))}
</nav>
```

---

## Implementation Example

Complete header implementation:

```tsx
import React, { useState, useEffect } from 'react';
import { Menu, X } from '@phosphor-icons/react';
import { Logo } from './Logo';

interface HeaderProps {
  currentPage: 'home' | 'about' | 'portfolio' | 'blog';
  onNavigate: (page: string) => void;
  className?: string;
  sticky?: boolean;
}

export function Header({ 
  currentPage, 
  onNavigate, 
  className = '',
  sticky = true 
}: HeaderProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Track scroll for backdrop blur effect
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

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

  const navItems = [
    { id: 'home', label: 'Home' },
    { id: 'about', label: 'About' },
    { id: 'portfolio', label: 'Portfolio' },
    { id: 'blog', label: 'Blog' }
  ];

  const handleNavClick = (page: string) => {
    onNavigate(page);
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      <header 
        className={`
          ${sticky ? 'fixed' : 'relative'}
          top-0 left-0 right-0 z-50
          transition-all duration-300
          ${scrolled ? 'bg-white/95 backdrop-blur-md shadow-md' : 'bg-white/90 backdrop-blur-sm'}
          ${className}
        `}
      >
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Logo 
              size="md"
              onClick={() => handleNavClick('home')}
              className="cursor-pointer hover:scale-105 transition-transform duration-300"
            />
            
            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-8">
              {navItems.map(item => (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`
                    font-body font-medium text-fluid-base
                    transition-all duration-300
                    ${currentPage === item.id
                      ? 'text-gradient-pink-purple-blue font-semibold'
                      : 'text-gray-700 hover:text-pink-500'
                    }
                    focus:outline-none focus:ring-2 focus:ring-pink-200 focus:ring-opacity-50 rounded-lg px-3 py-2
                  `}
                >
                  {item.label}
                </button>
              ))}
            </nav>
            
            {/* Mobile Menu Button */}
            <button
              className="lg:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
              onClick={() => setIsMobileMenuOpen(true)}
              aria-label="Open navigation menu"
              aria-expanded={isMobileMenuOpen}
            >
              <Menu className="w-6 h-6 text-gray-700" />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div 
          className="fixed inset-0 bg-white z-50 lg:hidden"
          role="dialog"
          aria-modal="true"
          aria-label="Mobile navigation menu"
        >
          <div className="flex flex-col h-full">
            {/* Mobile Menu Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200">
              <Logo size="sm" />
              
              <button
                onClick={() => setIsMobileMenuOpen(false)}
                aria-label="Close menu"
                className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
              >
                <X className="w-6 h-6 text-gray-700" />
              </button>
            </div>
            
            {/* Mobile Navigation */}
            <nav className="flex-1 flex flex-col items-center justify-center gap-8 px-6">
              {navItems.map(item => (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`
                    font-body font-semibold text-fluid-2xl
                    transition-all duration-300
                    ${currentPage === item.id
                      ? 'text-gradient-pink-purple-blue scale-110'
                      : 'text-gray-700 hover:text-pink-500 hover:scale-105'
                    }
                    focus:outline-none focus:ring-4 focus:ring-pink-200 focus:ring-opacity-50 rounded-lg px-6 py-3
                  `}
                >
                  {item.label}
                </button>
              ))}
            </nav>
          </div>
        </div>
      )}
    </>
  );
}
```

---

## Styling Patterns

### Desktop Navigation

```tsx
<nav className="hidden lg:flex items-center gap-8">
  <a className="font-body font-medium text-fluid-base text-gray-700 hover:text-pink-500 transition-colors">
    Home
  </a>
  <a className="font-body font-medium text-fluid-base text-gray-700 hover:text-pink-500 transition-colors">
    About
  </a>
  <a className="font-body font-medium text-fluid-base text-gradient-pink-purple-blue font-semibold">
    Portfolio
  </a>
</nav>
```

### Mobile Menu

```tsx
<nav className="flex flex-col items-center justify-center gap-8">
  <button className="font-body font-semibold text-fluid-2xl text-gray-700 hover:text-pink-500 hover:scale-105 transition-all">
    Home
  </button>
  <button className="font-body font-semibold text-fluid-2xl text-gradient-pink-purple-blue scale-110">
    Portfolio
  </button>
</nav>
```

---

## Accessibility

### Keyboard Navigation

```tsx
// Tab through navigation items
// Enter/Space to activate
// Escape to close mobile menu

const handleKeyDown = (e: React.KeyboardEvent) => {
  if (e.key === 'Escape' && isMobileMenuOpen) {
    setIsMobileMenuOpen(false);
  }
};

<div onKeyDown={handleKeyDown}>
  {/* Header content */}
</div>
```

### Screen Reader Support

```tsx
<header role="banner">
  <nav aria-label="Main navigation">
    <a 
      href="#"
      aria-current={currentPage === 'home' ? 'page' : undefined}
    >
      Home
    </a>
  </nav>
</header>
```

### Focus Management

```tsx
// Trap focus in mobile menu
useEffect(() => {
  if (isMobileMenuOpen) {
    const focusableElements = menuRef.current?.querySelectorAll(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );
    
    const firstElement = focusableElements?.[0] as HTMLElement;
    firstElement?.focus();
  }
}, [isMobileMenuOpen]);
```

---

## Common Patterns

### With CTA Button

```tsx
<Header currentPage={currentPage} onNavigate={handleNavigate}>
  <button className="ml-4 bg-gradient-pink-purple-blue text-white px-button py-2 rounded-lg font-body font-medium text-fluid-sm">
    View Portfolio
  </button>
</Header>
```

### With Search

```tsx
<Header currentPage={currentPage} onNavigate={handleNavigate}>
  <div className="ml-4">
    <SearchBar placeholder="Search..." />
  </div>
</Header>
```

---

## 🎨 Interactive Mermaid Diagrams

### Mermaid State Diagram (Header States)

```mermaid
stateDiagram-v2
    [*] --> DesktopClosed: Page loads
    
    DesktopClosed --> DesktopScrolled: User scrolls down
    DesktopScrolled --> DesktopClosed: Scroll to top
    
    DesktopClosed --> MobileMenuOpening: Click hamburger (mobile)
    DesktopScrolled --> MobileMenuOpening: Click hamburger (mobile)
    
    MobileMenuOpening --> MobileMenuOpen: Animation complete
    
    MobileMenuOpen --> MobileMenuClosing: Click X button
    MobileMenuOpen --> MobileMenuClosing: Press ESC
    MobileMenuOpen --> MobileMenuClosing: Click nav item
    MobileMenuOpen --> MobileMenuClosing: Click backdrop
    
    MobileMenuClosing --> DesktopClosed: Animation complete
    
    DesktopClosed --> NavigatingPage: Click nav item
    DesktopScrolled --> NavigatingPage: Click nav item
    
    NavigatingPage --> DesktopClosed: Page changed
    
    note right of DesktopClosed
        Header visible
        bg-white/90
        No shadow
    end note
    
    note right of DesktopScrolled
        Header visible
        bg-white/95
        Shadow visible
        Backdrop blur
    end note
    
    note right of MobileMenuOpen
        Full screen overlay
        Focus trapped
        Body scroll locked
    end note
```

### Mermaid Flowchart (Navigation Logic)

```mermaid
flowchart TD
    A[User Interaction] --> B{Device Type?}
    
    B -->|Desktop| C[Desktop Navigation]
    B -->|Mobile| D[Mobile Navigation]
    
    C --> E{Action?}
    E -->|Click Logo| F[Navigate to Home]
    E -->|Click Nav Item| G[Navigate to Page]
    E -->|Scroll| H{Scrolled > 50px?}
    
    H -->|Yes| I[Add shadow + backdrop blur]
    H -->|No| J[Remove shadow]
    
    I --> K[Update header styles]
    J --> K
    
    F --> L[Update currentPage]
    G --> L
    
    L --> M[Re-render with active state]
    
    D --> N{Action?}
    N -->|Click Hamburger| O[Open Mobile Menu]
    N -->|Menu Open + Click X| P[Close Mobile Menu]
    N -->|Menu Open + Press ESC| P
    N -->|Menu Open + Click Item| Q[Navigate + Close Menu]
    
    O --> R[setState isMobileMenuOpen: true]
    R --> S[Lock body scroll]
    S --> T[Trap focus in menu]
    T --> U[Animate menu in]
    
    P --> V[setState isMobileMenuOpen: false]
    V --> W[Unlock body scroll]
    W --> X[Release focus]
    X --> Y[Animate menu out]
    
    Q --> L
    Q --> V
    
    style F fill:#e1f5ff,stroke:#01c3cc,stroke-width:2px
    style G fill:#e1f5ff,stroke:#01c3cc,stroke-width:2px
    style I fill:#dcfce7,stroke:#22c55e,stroke-width:2px
    style O fill:#fef3c7,stroke:#f59e0b,stroke-width:2px
    style P fill:#fecaca,stroke:#ef4444,stroke-width:2px
    style Q fill:#e1f5ff,stroke:#01c3cc,stroke-width:2px
```

### Mermaid Sequence Diagram (Mobile Menu Interaction)

```mermaid
sequenceDiagram
    participant U as User
    participant H as Header
    participant B as Body
    participant M as Mobile Menu
    participant F as Focus Manager
    
    Note over H: Initial state: Menu closed
    
    U->>H: Click hamburger icon
    H->>H: setState(isMobileMenuOpen: true)
    
    H->>B: Lock scroll
    Note over B: overflow: hidden
    
    H->>M: Mount menu component
    M->>M: Animate slide in
    
    M->>F: Trap focus
    Note over F: Focus on first nav item
    
    F->>U: Focus visible on "Home"
    
    Note over M: Menu fully open
    
    U->>M: Press Tab
    M->>F: Move focus to next item
    F->>U: Focus visible on "About"
    
    U->>M: Click "Portfolio"
    
    M->>H: onNavigate("portfolio")
    H->>H: setCurrentPage("portfolio")
    H->>H: setState(isMobileMenuOpen: false)
    
    M->>M: Animate slide out
    
    H->>F: Release focus trap
    F->>H: Return focus to hamburger
    
    H->>B: Unlock scroll
    Note over B: overflow: auto
    
    M->>M: Unmount menu
    
    Note over H: Menu closed<br/>Portfolio page active
```

---

## Common Mistakes

### ❌ Mistake 1: No Active State

```tsx
// ❌ WRONG - No visual indication of current page
<a href="#">Home</a>
<a href="#">Portfolio</a>
```

**Solution:**
```tsx
// ✅ CORRECT - Clear active state
<a className={currentPage === 'home' ? 'text-gradient-pink-purple-blue font-semibold' : 'text-gray-700'}>
  Home
</a>
```

### ❌ Mistake 2: Missing Mobile Menu

```tsx
// ❌ WRONG - Desktop-only navigation
<nav className="flex gap-8">
  {/* Navigation items */}
</nav>
```

**Solution:**
```tsx
// ✅ CORRECT - Responsive navigation
<nav className="hidden lg:flex gap-8">
  {/* Desktop nav */}
</nav>
<button className="lg:hidden">
  <Menu />
</button>
```

### ❌ Mistake 3: No Scroll Prevention

```tsx
// ❌ WRONG - Page scrolls behind mobile menu
{isMobileMenuOpen && <MobileMenu />}
```

**Solution:**
```tsx
// ✅ CORRECT - Prevent scroll when menu open
useEffect(() => {
  document.body.style.overflow = isMobileMenuOpen ? 'hidden' : '';
}, [isMobileMenuOpen]);
```

---

## Related Components

- **[Logo](./Logo.md)** - Brand logo
- **[Footer](./Footer.md)** - Page footer
- **[SearchBar](./SearchBar.md)** - Search functionality

---

## Related Documentation

- **[Guidelines.md](../Guidelines.md)** - Main guidelines
- **[overview-components.md](../overview-components.md)** - Component system
- **[FILE_STRUCTURE.md](../FILE_STRUCTURE.md)** - File organization
- **[SITEMAP.md](../SITEMAP.md)** - Site navigation structure
- **[design-tokens/spacing.md](../design-tokens/spacing.md)** - Spacing system
- **[design-tokens/colors.md](../design-tokens/colors.md)** - Color system

---

**Last Updated:** January 2025  
**Version:** 4.0.0