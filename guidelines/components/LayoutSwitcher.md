# LayoutSwitcher Component

**Version:** 4.0.0  
**Last Updated:** January 2025

A toggle component that allows users to switch between grid and list view layouts for content display. Commonly used in portfolio and blog pages.

## Purpose

Provide flexible content viewing options with:
- Grid view (multi-column cards)
- List view (single-column detailed view)
- Visual icon feedback
- State management
- Accessibility compliance

---

## Usage

### Basic Usage

```tsx
import { LayoutSwitcher } from './components/ui/LayoutSwitcher';
import { useState } from 'react';

function Portfolio() {
  const [layout, setLayout] = useState<'grid' | 'list'>('grid');
  
  return (
    <>
      <LayoutSwitcher value={layout} onChange={setLayout} />
      
      <div className={layout === 'grid' ? 'grid grid-cols-3 gap-4' : 'flex flex-col gap-4'}>
        {/* Content */}
      </div>
    </>
  );
}
```

### With Section Header

```tsx
import { LayoutSwitcher } from './components/ui/LayoutSwitcher';

function PortfolioSection() {
  const [layout, setLayout] = useState<'grid' | 'list'>('grid');
  
  return (
    <section className="py-section">
      <div className="flex justify-between items-center mb-fluid-lg">
        <h2 className="text-section-h2 font-heading font-semibold">Portfolio</h2>
        <LayoutSwitcher value={layout} onChange={setLayout} />
      </div>
      
      {/* Content grid/list */}
    </section>
  );
}
```

---

## Props

```typescript
interface LayoutSwitcherProps {
  /**
   * Current layout mode
   * @required
   */
  value: 'grid' | 'list';
  
  /**
   * Callback when layout changes
   * @required
   */
  onChange: (layout: 'grid' | 'list') => void;
  
  /**
   * Additional CSS classes for customization
   * @default ""
   */
  className?: string;
  
  /**
   * Size variant for responsive sizing
   * @default "md"
   */
  size?: 'sm' | 'md' | 'lg';
  
  /**
   * Custom aria-label
   * @default "Switch between grid and list view"
   */
  ariaLabel?: string;
}
```

---

## Features

### Visual State Indication

```tsx
// Active state styling
<button 
  className={`
    ${layout === 'grid' 
      ? 'bg-gradient-pink-purple-blue text-white' 
      : 'bg-gray-100 text-gray-600'
    }
  `}
>
  <Grid />
</button>
```

### Icon Feedback

Uses Phosphor Icons:
- `SquaresFour` - Grid view icon (multi-column)
- `List` - List view icon (single column)

```tsx
import { SquaresFour, List } from '@phosphor-icons/react';

<LayoutSwitcher 
  value={layout}
  onChange={setLayout}
  gridIcon={<SquaresFour />}
  listIcon={<List />}
/>
```

---

## Styling

### Default Styling

```tsx
<LayoutSwitcher 
  value={layout}
  onChange={setLayout}
  className="flex gap-2 bg-gray-100 p-1 rounded-lg"
/>
```

### Brand Styled

```tsx
<LayoutSwitcher 
  value={layout}
  onChange={setLayout}
  className="
    flex gap-2 
    bg-white/80 backdrop-blur-sm 
    p-1 
    rounded-lg 
    shadow-md 
    border border-white/50
  "
/>
```

### Size Variants

```tsx
// Small
<LayoutSwitcher size="sm" value={layout} onChange={setLayout} />

// Medium (default)
<LayoutSwitcher size="md" value={layout} onChange={setLayout} />

// Large
<LayoutSwitcher size="lg" value={layout} onChange={setLayout} />
```

---

## Common Patterns

### Portfolio Page Implementation

```tsx
import { useState } from 'react';
import { LayoutSwitcher } from './components/ui/LayoutSwitcher';
import { PortfolioCard } from './components/ui/PortfolioCard';

function PortfolioPage() {
  const [layout, setLayout] = useState<'grid' | 'list'>('grid');
  const [category, setCategory] = useState<string>('all');
  
  return (
    <section className="py-section">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-fluid-lg">
        <div>
          <h2 className="text-section-h2 font-heading font-semibold mb-2">Portfolio</h2>
          <p className="text-body-guideline font-body text-gray-600">
            Explore my makeup artistry work
          </p>
        </div>
        
        <div className="flex items-center gap-4">
          {/* Category filter */}
          <select 
            value={category} 
            onChange={(e) => setCategory(e.target.value)}
            className="px-4 py-2 rounded-lg bg-white border border-gray-200"
          >
            <option value="all">All Categories</option>
            <option value="festival">Festival</option>
            <option value="editorial">Editorial</option>
            <option value="nails">Nails</option>
          </select>
          
          {/* Layout switcher */}
          <LayoutSwitcher value={layout} onChange={setLayout} />
        </div>
      </div>
      
      {/* Content grid/list */}
      <div className={
        layout === 'grid' 
          ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-fluid-md' 
          : 'flex flex-col gap-fluid-md'
      }>
        {portfolioEntries.map(entry => (
          <PortfolioCard 
            key={entry.id} 
            entry={entry}
            layout={layout}
          />
        ))}
      </div>
    </section>
  );
}
```

### Blog Page Implementation

```tsx
import { useState } from 'react';
import { LayoutSwitcher } from './components/ui/LayoutSwitcher';
import { BlogCard } from './components/ui/BlogCard';

function BlogPage() {
  const [layout, setLayout] = useState<'grid' | 'list'>('grid');
  
  return (
    <section className="py-section">
      <div className="flex justify-between items-center mb-fluid-lg">
        <h2 className="text-section-h2 font-heading font-semibold">Blog</h2>
        <LayoutSwitcher value={layout} onChange={setLayout} />
      </div>
      
      <div className={
        layout === 'grid'
          ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-fluid-md'
          : 'flex flex-col gap-fluid-lg'
      }>
        {blogPosts.map(post => (
          <BlogCard 
            key={post.id} 
            post={post}
            layout={layout}
          />
        ))}
      </div>
    </section>
  );
}
```

### With Persistent User Preference

```tsx
import { useState, useEffect } from 'react';
import { LayoutSwitcher } from './components/ui/LayoutSwitcher';

function PortfolioPage() {
  // Load saved preference from localStorage
  const [layout, setLayout] = useState<'grid' | 'list'>(() => {
    const saved = localStorage.getItem('portfolio-layout');
    return (saved as 'grid' | 'list') || 'grid';
  });
  
  // Save preference when changed
  useEffect(() => {
    localStorage.setItem('portfolio-layout', layout);
  }, [layout]);
  
  return (
    <>
      <LayoutSwitcher value={layout} onChange={setLayout} />
      {/* Content */}
    </>
  );
}
```

---

## Implementation Example

Complete implementation with all features:

```tsx
import React from 'react';
import { SquaresFour, List } from '@phosphor-icons/react';

interface LayoutSwitcherProps {
  value: 'grid' | 'list';
  onChange: (layout: 'grid' | 'list') => void;
  className?: string;
  size?: 'sm' | 'md' | 'lg';
  ariaLabel?: string;
}

export function LayoutSwitcher({ 
  value, 
  onChange,
  className = '',
  size = 'md',
  ariaLabel = 'Switch between grid and list view'
}: LayoutSwitcherProps) {
  const sizeClasses = {
    sm: 'w-8 h-8',
    md: 'w-10 h-10',
    lg: 'w-12 h-12'
  };
  
  const iconSizes = {
    sm: 16,
    md: 20,
    lg: 24
  };

  return (
    <div 
      className={`inline-flex gap-1 bg-gray-100 p-1 rounded-lg ${className}`}
      role="group"
      aria-label={ariaLabel}
    >
      <button
        onClick={() => onChange('grid')}
        aria-pressed={value === 'grid'}
        aria-label="Grid view"
        className={`
          ${sizeClasses[size]}
          flex items-center justify-center
          rounded-md
          transition-all duration-200
          ${value === 'grid' 
            ? 'bg-gradient-pink-purple-blue text-white shadow-md' 
            : 'bg-transparent text-gray-600 hover:bg-gray-200'
          }
          focus:outline-none focus:ring-2 focus:ring-pink-200 focus:ring-opacity-50
        `}
      >
        <SquaresFour size={iconSizes[size]} />
      </button>
      
      <button
        onClick={() => onChange('list')}
        aria-pressed={value === 'list'}
        aria-label="List view"
        className={`
          ${sizeClasses[size]}
          flex items-center justify-center
          rounded-md
          transition-all duration-200
          ${value === 'list' 
            ? 'bg-gradient-pink-purple-blue text-white shadow-md' 
            : 'bg-transparent text-gray-600 hover:bg-gray-200'
          }
          focus:outline-none focus:ring-2 focus:ring-pink-200 focus:ring-opacity-50
        `}
      >
        <List size={iconSizes[size]} />
      </button>
    </div>
  );
}
```

---

## Accessibility

### ARIA Attributes

```tsx
<div 
  role="group" 
  aria-label="View mode selector"
>
  <button
    aria-pressed={value === 'grid'}
    aria-label="Switch to grid view"
  >
    <Grid />
  </button>
  
  <button
    aria-pressed={value === 'list'}
    aria-label="Switch to list view"
  >
    <List />
  </button>
</div>
```

### Keyboard Navigation

- **Tab** - Navigate between buttons
- **Enter/Space** - Activate button
- **Arrow Keys** - Navigate between options (optional enhancement)

```tsx
const handleKeyDown = (e: React.KeyboardEvent) => {
  if (e.key === 'ArrowLeft' && value === 'list') {
    onChange('grid');
  } else if (e.key === 'ArrowRight' && value === 'grid') {
    onChange('list');
  }
};
```

### Screen Reader Support

```tsx
// Announces current state
<button
  aria-pressed={value === 'grid'}
  aria-label={`Grid view${value === 'grid' ? ', currently selected' : ''}`}
>
  <Grid />
</button>
```

---

## Common Mistakes

### ❌ Mistake 1: No Visual State Indication

```tsx
// ❌ WRONG - All buttons look the same
<button onClick={() => onChange('grid')}>
  <Grid />
</button>
<button onClick={() => onChange('list')}>
  <List />
</button>
```

**Solution:**
```tsx
// ✅ CORRECT - Clear visual indication of active state
<LayoutSwitcher value={layout} onChange={setLayout} />
```

### ❌ Mistake 2: Missing ARIA Attributes

```tsx
// ❌ WRONG - No accessibility information
<div>
  <button onClick={() => onChange('grid')}><Grid /></button>
  <button onClick={() => onChange('list')}><List /></button>
</div>
```

**Solution:**
```tsx
// ✅ CORRECT - Proper ARIA attributes
<LayoutSwitcher value={layout} onChange={setLayout} />
```

### ❌ Mistake 3: Not Updating Content Layout

```tsx
// ❌ WRONG - Layout switcher exists but doesn't affect content
<LayoutSwitcher value={layout} onChange={setLayout} />
<div className="grid grid-cols-3">
  {/* Always grid, never list */}
</div>
```

**Solution:**
```tsx
// ✅ CORRECT - Layout switcher controls content display
<LayoutSwitcher value={layout} onChange={setLayout} />
<div className={layout === 'grid' ? 'grid grid-cols-3' : 'flex flex-col'}>
  {/* Content adapts to selected layout */}
</div>
```

---

## Related Components

- **[PortfolioCard](../ui/PortfolioCard.tsx)** - Portfolio content cards
- **[BlogCard](../ui/BlogCard.tsx)** - Blog post cards
- **[SearchBar](../ui/SearchBar.tsx)** - Content search

---

## Related Documentation

- **[Guidelines.md](../Guidelines.md)** - Main guidelines
- **[overview-components.md](../overview-components.md)** - Component system
- **[overview-icons.md](../overview-icons.md)** - Icon system
- **[FILE_STRUCTURE.md](../FILE_STRUCTURE.md)** - File organization
- **[design-tokens/spacing.md](../design-tokens/spacing.md)** - Spacing system

---