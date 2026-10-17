# Interactions & Accessibility Guidelines

**Version:** 1.0.0  
**Last Updated:** January 2025  
**Part of:** Ash Shaw Makeup Portfolio Design System

## Overview

This document defines comprehensive accessibility standards and interaction patterns for the Ash Shaw Makeup Portfolio, ensuring WCAG 2.1 AAA compliance and optimal user experience for all users, including those using assistive technologies.

## Table of Contents

1. [Accessibility Standards](#accessibility-standards)
2. [Keyboard Navigation](#keyboard-navigation)
3. [Screen Reader Support](#screen-reader-support)
4. [Focus Management](#focus-management)
5. [Color Contrast](#color-contrast)
6. [ARIA Patterns](#aria-patterns)
7. [Form Accessibility](#form-accessibility)
8. [Interactive Components](#interactive-components)
9. [Testing Checklist](#testing-checklist)

---

## Accessibility Standards

### WCAG 2.1 Compliance

**Target Compliance Level:** AAA (Enhanced)

**Core Principles (POUR):**
- ✅ **Perceivable:** Information presented in ways all users can perceive
- ✅ **Operable:** Interface components and navigation must be operable
- ✅ **Understandable:** Information and operation must be understandable
- ✅ **Robust:** Content must be robust enough for assistive technologies

### Key Requirements

```typescript
/**
 * Accessibility requirements for all components
 */
interface AccessibilityRequirements {
  // Perceivable
  colorContrast: {
    normalText: '7:1 (AAA)',      // Body text
    largeText: '4.5:1 (AAA)',     // 18pt+ or 14pt+ bold
    uiComponents: '3:1 (minimum)'  // Buttons, form controls
  };
  
  // Operable
  touchTargets: {
    minimum: '44x44px',            // WCAG 2.1 Level AA
    recommended: '48x48px'         // Enhanced usability
  };
  
  keyboardNavigation: {
    required: true,
    tabOrder: 'logical',
    focusVisible: true,
    shortcuts: 'documented'
  };
  
  // Understandable
  language: {
    declared: true,               // <html lang="en">
    changes: 'marked',            // lang attribute for changes
    labels: 'clear and descriptive'
  };
  
  // Robust
  markup: {
    valid: true,                  // HTML validation
    semantic: true,               // Proper semantic HTML
    ariaCompliant: true           // Proper ARIA usage
  };
}
```

---

## Keyboard Navigation

### Global Keyboard Shortcuts

**Standard Shortcuts:**
```typescript
const KEYBOARD_SHORTCUTS = {
  // Navigation
  'Tab': 'Move to next focusable element',
  'Shift+Tab': 'Move to previous focusable element',
  'Enter': 'Activate link or button',
  'Space': 'Activate button or toggle checkbox',
  'Escape': 'Close modal or cancel operation',
  
  // Page navigation
  'Home': 'Jump to page top',
  'End': 'Jump to page bottom',
  
  // Skip links
  'Alt+1': 'Skip to main content',
  'Alt+2': 'Skip to navigation',
  'Alt+3': 'Skip to search',
  
  // Custom shortcuts
  'Ctrl+K (⌘+K)': 'Open search',
  'Shift+?': 'Show keyboard shortcuts help'
} as const;
```

### Skip Links Pattern

```tsx
/**
 * Skip navigation links for keyboard users
 */
export function SkipLinks() {
  return (
    <div className="sr-only focus-within:not-sr-only">
      <a
        href="#main-content"
        className="
          absolute top-0 left-0 z-50
          px-fluid-md py-fluid-sm
          bg-gradient-pink-purple-blue text-white
          font-body font-medium
          focus:outline-none focus:ring-4 focus:ring-white
          transform -translate-y-full focus:translate-y-0
          transition-transform duration-200
        "
      >
        Skip to main content
      </a>
      <a
        href="#navigation"
        className="
          absolute top-0 left-0 z-50
          px-fluid-md py-fluid-sm
          bg-gradient-pink-purple-blue text-white
          font-body font-medium
          focus:outline-none focus:ring-4 focus:ring-white
          transform -translate-y-full focus:translate-y-0
          transition-transform duration-200
        "
      >
        Skip to navigation
      </a>
    </div>
  );
}
```

### Tab Order and Focus Flow

```tsx
/**
 * Proper tab order in complex layouts
 */
export function AccessibleLayout() {
  return (
    <div>
      {/* Skip links come first */}
      <SkipLinks />
      
      {/* Header with navigation */}
      <header id="navigation" tabIndex={-1}>
        <nav aria-label="Main navigation">
          <a href="/" tabIndex={0}>Home</a>
          <a href="/about" tabIndex={0}>About</a>
          <a href="/portfolio" tabIndex={0}>Portfolio</a>
          <a href="/blog" tabIndex={0}>Blog</a>
        </nav>
      </header>
      
      {/* Main content */}
      <main id="main-content" tabIndex={-1}>
        {/* Content here */}
      </main>
      
      {/* Footer navigation */}
      <footer>
        <nav aria-label="Footer navigation">
          {/* Footer links */}
        </nav>
      </footer>
    </div>
  );
}
```

### Keyboard Event Handlers

```tsx
/**
 * Accessible keyboard event handling
 */
export function KeyboardAccessibleButton({
  children,
  onClick,
  ariaLabel
}: {
  children: React.ReactNode;
  onClick: () => void;
  ariaLabel?: string;
}) {
  const handleKeyDown = (e: React.KeyboardEvent) => {
    // Activate on Enter or Space
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault(); // Prevent page scroll on Space
      onClick();
    }
  };
  
  return (
    <button
      onClick={onClick}
      onKeyDown={handleKeyDown}
      aria-label={ariaLabel}
      className="focus:outline-none focus:ring-4 focus:ring-pink-200 dark:focus:ring-purple-500"
    >
      {children}
    </button>
  );
}
```

---

## Screen Reader Support

### Semantic HTML Structure

```tsx
/**
 * Proper semantic HTML for screen readers
 */
export function SemanticPage() {
  return (
    <div>
      {/* Landmarks for navigation */}
      <header role="banner">
        <nav role="navigation" aria-label="Main navigation">
          {/* Navigation content */}
        </nav>
      </header>
      
      <main role="main" id="main-content">
        {/* Main content */}
        <article>
          <header>
            <h1>Article Title</h1>
            <p>By Author Name</p>
          </header>
          
          <section aria-labelledby="section-1-heading">
            <h2 id="section-1-heading">Section Title</h2>
            {/* Section content */}
          </section>
        </article>
      </main>
      
      <aside role="complementary" aria-label="Related content">
        {/* Sidebar content */}
      </aside>
      
      <footer role="contentinfo">
        {/* Footer content */}
      </footer>
    </div>
  );
}
```

### ARIA Live Regions

```tsx
/**
 * Announce dynamic content changes
 */
export function SearchResults({ results, isLoading }: { results: any[]; isLoading: boolean }) {
  return (
    <div>
      {/* Polite announcement for search results */}
      <div
        role="status"
        aria-live="polite"
        aria-atomic="true"
        className="sr-only"
      >
        {isLoading 
          ? 'Loading search results...' 
          : `Found ${results.length} results`
        }
      </div>
      
      {/* Visual results */}
      <div aria-label="Search results">
        {results.map((result) => (
          <SearchResultCard key={result.id} result={result} />
        ))}
      </div>
    </div>
  );
}

/**
 * Alert for critical notifications
 */
export function ErrorAlert({ message }: { message: string }) {
  return (
    <div
      role="alert"
      aria-live="assertive"
      className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-fluid-md"
    >
      <p className="text-red-800 dark:text-red-200 font-body">
        {message}
      </p>
    </div>
  );
}
```

### Screen Reader Only Content

```css
/* Screen reader only class */
.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border-width: 0;
}

/* Reveal on focus (for skip links) */
.sr-only.focus-within\:not-sr-only:focus-within {
  position: static;
  width: auto;
  height: auto;
  padding: inherit;
  margin: inherit;
  overflow: visible;
  clip: auto;
  white-space: normal;
}
```

### Descriptive Labels

```tsx
/**
 * Comprehensive labeling for screen readers
 */
export function AccessibleForm() {
  return (
    <form aria-labelledby="contact-form-heading">
      <h2 id="contact-form-heading" className="text-section-h2">
        Contact Form
      </h2>
      
      {/* Explicit label association */}
      <div>
        <label htmlFor="name-input" className="font-body font-medium">
          Your Name
          <span aria-label="required" className="text-red-500"> *</span>
        </label>
        <input
          id="name-input"
          type="text"
          required
          aria-required="true"
          aria-describedby="name-hint"
          className="w-full px-fluid-sm py-fluid-sm rounded-lg border"
        />
        <p id="name-hint" className="text-fluid-sm text-gray-600 dark:text-purple-300">
          Please enter your full name
        </p>
      </div>
      
      {/* Accessible error messages */}
      <div>
        <label htmlFor="email-input" className="font-body font-medium">
          Email Address
          <span aria-label="required" className="text-red-500"> *</span>
        </label>
        <input
          id="email-input"
          type="email"
          required
          aria-required="true"
          aria-invalid="true"
          aria-describedby="email-error"
          className="w-full px-fluid-sm py-fluid-sm rounded-lg border border-red-500"
        />
        <p id="email-error" role="alert" className="text-fluid-sm text-red-600 dark:text-red-400">
          Please enter a valid email address
        </p>
      </div>
    </form>
  );
}
```

---

## Focus Management

### Focus Indicators

```css
/* Global focus styles */
*:focus-visible {
  outline: 2px solid #ff6b9d;
  outline-offset: 2px;
  box-shadow: 0 0 0 3px rgba(255, 107, 157, 0.3);
}

/* Dark mode focus */
.dark *:focus-visible {
  outline-color: #8b5cf6;
  box-shadow: 0 0 0 3px rgba(139, 92, 246, 0.3);
}

/* Component-specific focus */
.button-focus:focus-visible {
  box-shadow: 
    0 0 0 3px #ffffff,
    0 0 0 6px rgba(255, 107, 157, 0.5);
}

.input-focus:focus {
  border-color: #ff6b9d;
  box-shadow: 0 0 0 3px rgba(255, 107, 157, 0.1);
}

/* Link focus */
a:focus-visible {
  outline: 2px solid currentColor;
  outline-offset: 4px;
  text-decoration: underline;
}
```

### Focus Trap for Modals

```tsx
/**
 * Focus trap implementation
 */
export function useFocusTrap(
  elementRef: React.RefObject<HTMLElement>,
  isActive: boolean
) {
  React.useEffect(() => {
    if (!isActive || !elementRef.current) return;
    
    const element = elementRef.current;
    const focusableElements = element.querySelectorAll<HTMLElement>(
      'button:not([disabled]), [href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])'
    );
    
    const firstElement = focusableElements[0];
    const lastElement = focusableElements[focusableElements.length - 1];
    
    // Focus first element
    firstElement?.focus();
    
    const handleTab = (e: KeyboardEvent) => {
      if (e.key !== 'Tab') return;
      
      if (e.shiftKey) {
        if (document.activeElement === firstElement) {
          e.preventDefault();
          lastElement?.focus();
        }
      } else {
        if (document.activeElement === lastElement) {
          e.preventDefault();
          firstElement?.focus();
        }
      }
    };
    
    element.addEventListener('keydown', handleTab);
    return () => element.removeEventListener('keydown', handleTab);
  }, [elementRef, isActive]);
}

/**
 * Accessible modal with focus trap
 */
export function AccessibleModal({
  isOpen,
  onClose,
  title,
  children
}: {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
}) {
  const modalRef = React.useRef<HTMLDivElement>(null);
  const previousFocusRef = React.useRef<HTMLElement | null>(null);
  
  useFocusTrap(modalRef, isOpen);
  
  React.useEffect(() => {
    if (isOpen) {
      // Save current focus
      previousFocusRef.current = document.activeElement as HTMLElement;
      // Prevent body scroll
      document.body.style.overflow = 'hidden';
    } else {
      // Restore focus
      previousFocusRef.current?.focus();
      // Restore scroll
      document.body.style.overflow = '';
    }
  }, [isOpen]);
  
  if (!isOpen) return null;
  
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50"
      onClick={onClose}
      role="presentation"
    >
      <div
        ref={modalRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
        className="bg-white dark:bg-purple-900 rounded-xl p-fluid-lg max-w-2xl max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <header className="mb-fluid-md">
          <h2 id="modal-title" className="text-section-h2 font-heading font-bold">
            {title}
          </h2>
          <button
            onClick={onClose}
            aria-label="Close modal"
            className="absolute top-fluid-md right-fluid-md p-fluid-sm rounded-lg hover:bg-gray-100 dark:hover:bg-purple-800 focus:outline-none focus:ring-2 focus:ring-pink-200 dark:focus:ring-purple-500"
          >
            <span aria-hidden="true">×</span>
          </button>
        </header>
        
        <div>{children}</div>
        
        <footer className="mt-fluid-md flex justify-end gap-fluid-sm">
          <button
            onClick={onClose}
            className="px-button py-button bg-gray-200 dark:bg-purple-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-200 dark:focus:ring-purple-500"
          >
            Close
          </button>
        </footer>
      </div>
    </div>
  );
}
```

---

## Color Contrast

### AAA Contrast Requirements

**Text Contrast Ratios:**
- **Normal text (< 18pt or < 14pt bold):** 7:1 minimum
- **Large text (≥ 18pt or ≥ 14pt bold):** 4.5:1 minimum
- **UI components and graphics:** 3:1 minimum

### Validated Color Combinations

```css
/* Light mode - AAA compliant */
.light-mode-text {
  /* Body text on white */
  color: #1a1a1a;              /* 15.3:1 ratio */
  background: #ffffff;
  
  /* Headings on white */
  color: #000000;              /* 21:1 ratio */
  background: #ffffff;
  
  /* Gray text on white */
  color: #4a5568;              /* 8.59:1 ratio */
  background: #ffffff;
  
  /* Links */
  color: #c239b3;              /* 4.5:1 ratio - large text */
  background: #ffffff;
}

/* Dark mode - AAA compliant */
.dark-mode-text {
  /* Body text on purple-950 */
  color: #f3e8ff;              /* 15.1:1 ratio */
  background: #1e1b4b;
  
  /* Headings on purple-950 */
  color: #ffffff;              /* 18.2:1 ratio */
  background: #1e1b4b;
  
  /* Light purple text */
  color: #ddd6fe;              /* 12.8:1 ratio */
  background: #1e1b4b;
  
  /* Links */
  color: #a78bfa;              /* 7.2:1 ratio */
  background: #1e1b4b;
}
```

### Contrast Testing

```typescript
/**
 * Calculate color contrast ratio
 */
function getContrastRatio(color1: string, color2: string): number {
  const getLuminance = (color: string): number => {
    const rgb = parseInt(color.slice(1), 16);
    const r = (rgb >> 16) & 0xff;
    const g = (rgb >> 8) & 0xff;
    const b = (rgb >> 0) & 0xff;
    
    const [rs, gs, bs] = [r, g, b].map(c => {
      const val = c / 255;
      return val <= 0.03928
        ? val / 12.92
        : Math.pow((val + 0.055) / 1.055, 2.4);
    });
    
    return 0.2126 * rs + 0.7152 * gs + 0.0722 * bs;
  };
  
  const lum1 = getLuminance(color1);
  const lum2 = getLuminance(color2);
  const lighter = Math.max(lum1, lum2);
  const darker = Math.min(lum1, lum2);
  
  return (lighter + 0.05) / (darker + 0.05);
}

// Usage
const ratio = getContrastRatio('#000000', '#ffffff');
console.log(ratio); // 21:1 (AAA)
```

---

## ARIA Patterns

### Common ARIA Patterns

```tsx
/**
 * Accordion with proper ARIA
 */
export function AccessibleAccordion({ items }: { items: Array<{ title: string; content: string }> }) {
  const [openIndex, setOpenIndex] = React.useState<number | null>(null);
  
  return (
    <div className="space-y-fluid-sm">
      {items.map((item, index) => {
        const isOpen = openIndex === index;
        const headingId = `accordion-heading-${index}`;
        const panelId = `accordion-panel-${index}`;
        
        return (
          <div key={index} className="border border-gray-200 dark:border-purple-700 rounded-lg">
            <h3 id={headingId}>
              <button
                aria-expanded={isOpen}
                aria-controls={panelId}
                onClick={() => setOpenIndex(isOpen ? null : index)}
                className="w-full px-fluid-md py-fluid-sm text-left font-heading font-semibold flex justify-between items-center focus:outline-none focus:ring-2 focus:ring-pink-200 dark:focus:ring-purple-500"
              >
                {item.title}
                <span aria-hidden="true">{isOpen ? '−' : '+'}</span>
              </button>
            </h3>
            <div
              id={panelId}
              role="region"
              aria-labelledby={headingId}
              hidden={!isOpen}
              className="px-fluid-md py-fluid-sm"
            >
              <p className="text-body-guideline font-body">{item.content}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
}

/**
 * Tabs with proper ARIA
 */
export function AccessibleTabs({ tabs }: { tabs: Array<{ label: string; content: React.ReactNode }> }) {
  const [activeTab, setActiveTab] = React.useState(0);
  
  return (
    <div>
      <div role="tablist" aria-label="Content tabs">
        {tabs.map((tab, index) => (
          <button
            key={index}
            role="tab"
            aria-selected={activeTab === index}
            aria-controls={`tabpanel-${index}`}
            id={`tab-${index}`}
            tabIndex={activeTab === index ? 0 : -1}
            onClick={() => setActiveTab(index)}
            className={`
              px-fluid-md py-fluid-sm font-body font-medium
              ${activeTab === index 
                ? 'border-b-2 border-pink-500 text-pink-500' 
                : 'text-gray-600 dark:text-purple-300'
              }
              focus:outline-none focus:ring-2 focus:ring-pink-200 dark:focus:ring-purple-500
            `}
          >
            {tab.label}
          </button>
        ))}
      </div>
      
      {tabs.map((tab, index) => (
        <div
          key={index}
          role="tabpanel"
          id={`tabpanel-${index}`}
          aria-labelledby={`tab-${index}`}
          hidden={activeTab !== index}
          tabIndex={0}
          className="py-fluid-md"
        >
          {tab.content}
        </div>
      ))}
    </div>
  );
}
```

---

## Form Accessibility

### Accessible Form Controls

```tsx
/**
 * Fully accessible form input
 */
export function AccessibleInput({
  label,
  id,
  type = 'text',
  required = false,
  error,
  hint,
  ...props
}: {
  label: string;
  id: string;
  type?: string;
  required?: boolean;
  error?: string;
  hint?: string;
  [key: string]: any;
}) {
  const hintId = `${id}-hint`;
  const errorId = `${id}-error`;
  
  return (
    <div className="mb-fluid-md">
      <label 
        htmlFor={id}
        className="block font-body font-medium mb-fluid-xs text-gray-800 dark:text-purple-100"
      >
        {label}
        {required && (
          <span aria-label="required" className="text-red-500 ml-1">*</span>
        )}
      </label>
      
      {hint && (
        <p id={hintId} className="text-fluid-sm text-gray-600 dark:text-purple-300 mb-fluid-xs">
          {hint}
        </p>
      )}
      
      <input
        id={id}
        type={type}
        required={required}
        aria-required={required}
        aria-invalid={!!error}
        aria-describedby={`${hint ? hintId : ''} ${error ? errorId : ''}`.trim() || undefined}
        className={`
          w-full px-fluid-sm py-fluid-sm min-h-[44px]
          rounded-lg border-2
          font-body text-fluid-base
          transition-colors duration-200
          ${error 
            ? 'border-red-500 focus:border-red-600' 
            : 'border-gray-300 dark:border-purple-700 focus:border-pink-500'
          }
          focus:outline-none focus:ring-4 focus:ring-pink-200 dark:focus:ring-purple-500
          bg-white dark:bg-purple-900
          text-gray-800 dark:text-purple-100
        `}
        {...props}
      />
      
      {error && (
        <p id={errorId} role="alert" className="text-fluid-sm text-red-600 dark:text-red-400 mt-fluid-xs">
          {error}
        </p>
      )}
    </div>
  );
}
```

---

## Testing Checklist

### Manual Testing

- [ ] **Keyboard navigation:** All interactive elements accessible via Tab
- [ ] **Keyboard activation:** Enter/Space activate buttons and links
- [ ] **Focus visible:** Clear focus indicators on all interactive elements
- [ ] **Skip links:** Skip navigation links work correctly
- [ ] **Screen reader:** Test with NVDA/JAWS (Windows) or VoiceOver (Mac/iOS)
- [ ] **Color contrast:** All text meets AAA standards (7:1 for normal, 4.5:1 for large)
- [ ] **Zoom:** Page usable at 200% zoom
- [ ] **Forms:** All form fields properly labeled and validated

### Automated Testing

```bash
# Install testing tools
npm install --save-dev @axe-core/react pa11y

# Run axe-core in development
npm run dev

# Run pa11y accessibility audit
pa11y http://localhost:3000
```

### Screen Reader Testing

- [ ] **VoiceOver (Mac):** Cmd + F5
- [ ] **NVDA (Windows):** Free download
- [ ] **JAWS (Windows):** Commercial screen reader
- [ ] **TalkBack (Android):** Built-in accessibility
- [ ] **VoiceOver (iOS):** Built-in accessibility

---

## Related Documentation

- **[Interaction Modes](./responsive/interaction-modes.md)** - Touch, mouse, keyboard patterns
- **[Color System](./design-tokens/colors.md)** - Complete color palette with contrast ratios
- **[Component Guidelines](./components/)** - Component-specific accessibility patterns

---

**Version:** 1.0.0  
**Last Updated:** January 2025  
**Maintained by:** Ash Shaw Portfolio Team
