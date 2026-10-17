# Logo Component

**Version:** 4.0.0  
**Last Updated:** January 2025

The Logo component displays the Ash Shaw brand logo with responsive sizing, animations, and proper accessibility features.

## Purpose

Display the Ash Shaw brand logo consistently across the site with:
- Responsive sizing for different contexts
- Hover animations and gradient effects
- Proper accessibility labels
- Navigation functionality (links to homepage)

---

## Component Architecture

### Logo Component Flow (Mermaid)

```mermaid
flowchart TD
    A[Logo Component] --> B{Has onClick?}
    
    B -->|Yes| C[Clickable Logo]
    B -->|No| D[Static Logo]
    
    C --> E[Wrap in Interactive Element]
    E --> F[Add role=button]
    E --> G[Add tabIndex=0]
    E --> H[Add keyboard handlers]
    
    D --> I[Render Logo Image]
    
    C --> I
    
    I --> J{Size Prop?}
    
    J -->|sm| K[h-8: 32px]
    J -->|md| L[h-10: 40px]
    J -->|lg| M[h-12: 48px]
    J -->|xl| N[h-24: 96px]
    J -->|header| O[w-header-logo: 220px]
    
    K --> P[Apply Sizing Classes]
    L --> P
    M --> P
    N --> P
    O --> P
    
    P --> Q[Render Complete Logo]
    
    style C fill:#dcfce7,stroke:#22c55e,stroke-width:2px
    style D fill:#e0e7ff,stroke:#6366f1,stroke-width:2px
    style Q fill:#fef3c7,stroke:#f59e0b,stroke-width:2px
```

### Logo Click Interaction (Mermaid)

```mermaid
sequenceDiagram
    participant U as User
    participant L as Logo Component
    participant H as Header/Parent
    participant R as React Router
    participant W as Window
    
    U->>L: Click logo
    
    L->>L: Check if onClick provided
    
    alt onClick Handler Exists
        L->>H: Trigger onClick()
        H->>R: Navigate to home
        R->>R: Update route to "/"
        H->>W: Scroll to top
        W->>W: window.scrollTo({ top: 0 })
        W-->>U: Smooth scroll to top ✅
        R-->>U: Homepage displayed ✅
    else No onClick Handler
        Note over L: Static logo
        Note over U: No navigation
    end
```

---

## Usage

### Basic Usage

```tsx
import { Logo } from './components/common/Logo';

<Logo size="md" />
```

### With Custom Styling

```tsx
<Logo 
  size="lg"
  className="text-gradient-pink-purple-blue hover:scale-105 transition-transform duration-300"
/>
```

### In Header

```tsx
import { Logo } from './components/common/Logo';

<header className="flex items-center justify-between p-4">
  <Logo 
    size="md"
    onClick={() => navigateToHome()}
    className="cursor-pointer"
  />
  <nav>{/* Navigation items */}</nav>
</header>
```

### In Footer

```tsx
import { Logo } from './components/common/Logo';

<footer className="py-8">
  <Logo 
    size="sm"
    className="mb-4"
  />
  <p className="text-body-guideline font-body">
    Makeup that shines with colour, energy, and connection.
  </p>
</footer>
```

---

## Props

```typescript
interface LogoProps {
  /**
   * Size variant for responsive display
   * @default "md"
   */
  size?: 'sm' | 'md' | 'lg';
  
  /**
   * Additional CSS classes for customization
   * @example "hover:scale-110 transition-transform"
   */
  className?: string;
  
  /**
   * Click handler for navigation
   * @example () => navigateToHome()
   */
  onClick?: () => void;
  
  /**
   * Accessibility label (auto-generated if not provided)
   * @default "Ash Shaw - Makeup Artist, navigate to homepage"
   */
  ariaLabel?: string;
}
```

---

## Size Variants

### Logo Size Comparison (Mermaid)

```mermaid
flowchart LR
    A[Logo Sizes] --> B[sm: 32px]
    A --> C[md: 40px]
    A --> D[lg: 48px]
    A --> E[xl: 96px]
    A --> F[header: 220px width]
    
    B --> G[Footer]
    B --> H[Mobile Header]
    
    C --> I[Desktop Header]
    C --> J[Standard Sections]
    
    D --> K[Hero Sections]
    D --> L[Mobile Menu]
    D --> M[Footer - matches social icons]
    
    E --> N[Landing Pages]
    
    F --> O[Desktop Header - full width]
    
    style B fill:#e0e7ff,stroke:#6366f1,stroke-width:2px
    style C fill:#dcfce7,stroke:#22c55e,stroke-width:2px
    style D fill:#fef3c7,stroke:#f59e0b,stroke-width:2px
    style E fill:#fed7aa,stroke:#f97316,stroke-width:2px
    style F fill:#fecaca,stroke:#ef4444,stroke-width:2px
```

### Small (`size="sm"`)
- **Usage:** Footer, mobile menu (collapsed), sidebar
- **Dimensions:** Approximately 120px width
- **Font Size:** Smaller text scale for compact spaces

```tsx
<Logo size="sm" />
```

### Medium (`size="md"`) - Default
- **Usage:** Header desktop, standard page sections
- **Dimensions:** Approximately 180px width
- **Font Size:** Standard readable size

```tsx
<Logo size="md" />
```

### Large (`size="lg"`)
- **Usage:** Hero sections, landing pages, mobile menu (expanded)
- **Dimensions:** Approximately 240px width
- **Font Size:** Large, prominent display

```tsx
<Logo size="lg" />
```

---

## Styling

### Typography

The logo uses the brand typography system:

```tsx
<span className="font-heading font-semibold">Ash Shaw</span>
```

**Fonts:**
- Primary: Playfair Display (serif) - elegant, sophisticated
- Secondary: Inter (sans-serif) - modern, readable

### Colors

Logo supports multiple color variations:

#### Default (Text Color)
```tsx
<Logo className="text-gray-800" />
```

#### Gradient (Brand Style)
```tsx
<Logo className="text-gradient-pink-purple-blue" />
```

#### Custom Colors
```tsx
<Logo className="text-purple-600" />
<Logo className="text-white" /> {/* On dark backgrounds */}
```

### Animations

#### Hover Scale
```tsx
<Logo className="hover:scale-105 transition-transform duration-300" />
```

#### Gradient Animation
```tsx
<Logo className="text-gradient-pink-purple-blue animate-gradient-x" />
```

#### Focus States
```tsx
<Logo className="focus:outline-none focus:ring-4 focus:ring-pink-200 focus:ring-opacity-50 rounded-lg" />
```

---

## Common Patterns

### Header Logo (Clickable)

```tsx
import { Logo } from './components/common/Logo';

function Header({ onNavigate }: HeaderProps) {
  return (
    <header className="fixed top-0 left-0 right-0 bg-white/90 backdrop-blur-md z-50 py-4 px-6 shadow-sm">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <Logo 
          size="md"
          onClick={() => onNavigate('home')}
          className="cursor-pointer text-gray-800 hover:text-gradient-pink-purple-blue transition-colors duration-300 focus:outline-none focus:ring-4 focus:ring-pink-200 rounded-lg"
          ariaLabel="Ash Shaw logo, click to navigate to homepage"
        />
        
        <nav>{/* Navigation menu */}</nav>
      </div>
    </header>
  );
}
```

### Footer Logo

```tsx
import { Logo } from './components/common/Logo';

function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-12 px-6">
      <div className="max-w-7xl mx-auto">
        <Logo 
          size="sm"
          className="text-white mb-6"
        />
        
        <p className="text-body-guideline font-body text-gray-300 mb-4">
          Makeup that shines with colour, energy, and connection.
        </p>
        
        {/* Contact and social links */}
      </div>
    </footer>
  );
}
```

### Mobile Menu Logo

```tsx
import { Logo } from './components/common/Logo';

function MobileMenu({ isOpen, onClose }: MobileMenuProps) {
  return (
    <div className={`fixed inset-0 bg-white z-50 ${isOpen ? 'block' : 'hidden'}`}>
      <div className="flex flex-col items-center justify-center h-full">
        <Logo 
          size="lg"
          onClick={onClose}
          className="mb-8 text-gradient-pink-purple-blue cursor-pointer"
          ariaLabel="Ash Shaw logo, click to close menu"
        />
        
        <nav className="flex flex-col gap-6">
          {/* Menu items */}
        </nav>
      </div>
    </div>
  );
}
```

---

## Accessibility

### Keyboard Navigation

When logo is clickable (has `onClick`):
- **Tab:** Focus the logo
- **Enter/Space:** Trigger navigation
- **Escape:** (in mobile menu context) Close menu

```tsx
const handleKeyDown = (e: React.KeyboardEvent) => {
  if (e.key === 'Enter' || e.key === ' ') {
    e.preventDefault();
    onClick?.();
  }
};

<div
  role="button"
  tabIndex={0}
  onClick={onClick}
  onKeyDown={handleKeyDown}
  aria-label={ariaLabel}
>
  <Logo size={size} />
</div>
```

### Screen Reader Support

```tsx
// Proper ARIA labeling
<Logo ariaLabel="Ash Shaw Makeup Artist, navigate to homepage" />

// In header context
<header role="banner">
  <Logo 
    ariaLabel="Ash Shaw logo, click to return to homepage"
    onClick={navigateHome}
  />
</header>
```

### Focus Management

```tsx
// Visible focus indicator
<Logo className="focus:outline-none focus:ring-4 focus:ring-pink-200 focus:ring-opacity-50 rounded-lg p-2" />
```

---

## Responsive Behavior

### Mobile (320px - 767px)
- Use `size="sm"` for header to save space
- Use `size="lg"` in mobile menu for prominence
- Center-align in mobile layouts

```tsx
<Logo 
  size="sm"
  className="mx-auto sm:mx-0" 
/>
```

### Tablet (768px - 1023px)
- Use `size="md"` for header
- Left-align with responsive padding

```tsx
<Logo 
  size="md"
  className="md:ml-0" 
/>
```

### Desktop (1024px+)
- Use `size="md"` or `size="lg"` based on context
- Fixed positioning in header
- Enhanced hover effects

```tsx
<Logo 
  size="md"
  className="lg:hover:scale-105 transition-transform"
/>
```

---

## Related Components

- **[Header](../common/Header.tsx)** - Main navigation component
- **[Footer](../common/Footer.tsx)** - Footer with logo
- **[SocialLinks](../common/SocialLinks.tsx)** - Social media icons

---

## Related Documentation

- **[Guidelines.md](../Guidelines.md)** - Main guidelines
- **[overview-components.md](../overview-components.md)** - Component system
- **[FILE_STRUCTURE.md](../FILE_STRUCTURE.md)** - File organization
- **[design-tokens/typography.md](../design-tokens/typography.md)** - Typography system
- **[design-tokens/colors.md](../design-tokens/colors.md)** - Color system

---