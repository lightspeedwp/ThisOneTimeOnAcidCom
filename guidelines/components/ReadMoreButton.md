# ReadMoreButton Component

**Version:** 4.0.0  
**Last Updated:** January 2025

Expandable content toggle button with smooth animations and accessibility features.

## Purpose

Provide progressive content disclosure with:
- Expand/collapse functionality
- Smooth height animations
- Customizable expand/collapse text
- WCAG 2.1 AA compliance with proper ARIA labels
- Keyboard navigation support
- Visual state indication

---

## Usage

### Basic Usage

```tsx
import { ReadMoreButton } from './components/ui/ReadMoreButton';

<ReadMoreButton 
  isExpanded={isExpanded}
  onClick={() => setIsExpanded(!isExpanded)}
/>
```

### With Custom Text

```tsx
<ReadMoreButton 
  isExpanded={isExpanded}
  onClick={toggleExpanded}
  expandText="Show Full Story"
  collapseText="Show Less"
/>
```

### Wrapping Content

```tsx
const [isExpanded, setIsExpanded] = useState(false);

<div>
  <p className={isExpanded ? '' : 'line-clamp-3'}>
    Long content that can be expanded...
  </p>
  
  <ReadMoreButton 
    isExpanded={isExpanded}
    onClick={() => setIsExpanded(!isExpanded)}
  />
</div>
```

---

## Props

```typescript
interface ReadMoreButtonProps {
  /**
   * Whether content is expanded
   * @required
   */
  isExpanded: boolean;
  
  /**
   * Click handler to toggle expansion
   * @required
   */
  onClick: () => void;
  
  /**
   * Text to show when collapsed
   * @default "Read More"
   */
  expandText?: string;
  
  /**
   * Text to show when expanded
   * @default "Show Less"
   */
  collapseText?: string;
  
  /**
   * Additional CSS classes
   * @default ""
   */
  className?: string;
  
  /**
   * Custom aria-label
   * @optional (auto-generated from expandText/collapseText)
   */
  ariaLabel?: string;
  
  /**
   * Show chevron icon
   * @default true
   */
  showIcon?: boolean;
}
```

---

## Features

### Smooth Animation

```tsx
<div 
  className={`
    transition-all duration-500 ease-in-out
    ${isExpanded ? 'max-h-[2000px] opacity-100' : 'max-h-0 opacity-0 overflow-hidden'}
  `}
>
  {/* Hidden content */}
</div>
```

### Line Clamping

```tsx
// Show 3 lines when collapsed
<p className={isExpanded ? '' : 'line-clamp-3'}>
  Long text content...
</p>
```

### Icon Rotation

```tsx
<ChevronDown 
  className={`
    w-4 h-4 
    transition-transform duration-300
    ${isExpanded ? 'rotate-180' : 'rotate-0'}
  `}
/>
```

---

## Implementation Example

Complete read more button implementation:

```tsx
import React from 'react';
import { CaretDown } from '@phosphor-icons/react';

interface ReadMoreButtonProps {
  isExpanded: boolean;
  onClick: () => void;
  expandText?: string;
  collapseText?: string;
  className?: string;
  showIcon?: boolean;
}

export function ReadMoreButton({ 
  isExpanded,
  onClick,
  expandText = 'Read More',
  collapseText = 'Show Less',
  className = '',
  showIcon = true
}: ReadMoreButtonProps) {
  return (
    <button
      onClick={onClick}
      aria-expanded={isExpanded}
      aria-label={isExpanded ? collapseText : expandText}
      className={`
        inline-flex items-center gap-2
        font-body font-medium text-fluid-sm
        text-pink-600 hover:text-pink-700
        transition-colors duration-200
        focus:outline-none focus:ring-2 focus:ring-pink-200 focus:ring-opacity-50
        rounded-lg px-3 py-2
        ${className}
      `}
    >
      <span>{isExpanded ? collapseText : expandText}</span>
      
      {showIcon && (
        <CaretDown 
          className={`
            w-4 h-4 
            transition-transform duration-300
            ${isExpanded ? 'rotate-180' : 'rotate-0'}
          `}
        />
      )}
    </button>
  );
}
```

---

## Usage Patterns

### About Page Section

```tsx
import { useState } from 'react';
import { ReadMoreButton } from './components/ui/ReadMoreButton';

function AboutSection() {
  const [isExpanded, setIsExpanded] = useState(false);
  
  return (
    <section className="py-section">
      <h2 className="text-section-h2 font-heading font-semibold mb-fluid-lg">
        My Journey
      </h2>
      
      <div className="max-w-3xl">
        <p className="text-body-guideline font-body text-gray-700 mb-fluid-md">
          First few paragraphs that are always visible...
        </p>
        
        {/* Expandable content */}
        <div 
          className={`
            transition-all duration-500 ease-in-out
            ${isExpanded 
              ? 'max-h-[2000px] opacity-100' 
              : 'max-h-0 opacity-0 overflow-hidden'
            }
          `}
        >
          <p className="text-body-guideline font-body text-gray-700 mb-fluid-md">
            Additional content revealed when expanded...
          </p>
          
          <p className="text-body-guideline font-body text-gray-700 mb-fluid-md">
            More detailed story and background...
          </p>
        </div>
        
        <ReadMoreButton 
          isExpanded={isExpanded}
          onClick={() => setIsExpanded(!isExpanded)}
        />
      </div>
    </section>
  );
}
```

### Portfolio Entry

```tsx
function PortfolioEntry({ entry }: Props) {
  const [showFullStory, setShowFullStory] = useState(false);
  
  return (
    <article>
      <h1 className="text-section-h2 font-heading font-bold mb-fluid-lg">
        {entry.title}
      </h1>
      
      <div className="prose prose-lg max-w-none">
        <p className={showFullStory ? '' : 'line-clamp-5'}>
          {entry.story}
        </p>
      </div>
      
      {entry.story.length > 500 && (
        <ReadMoreButton 
          isExpanded={showFullStory}
          onClick={() => setShowFullStory(!showFullStory)}
          expandText="Read Full Story"
          collapseText="Show Less"
          className="mt-fluid-md"
        />
      )}
    </article>
  );
}
```

### Blog Post Preview

```tsx
function BlogPreview({ post }: Props) {
  const [isExpanded, setIsExpanded] = useState(false);
  
  return (
    <article className="bg-white/80 backdrop-blur-sm rounded-2xl p-fluid-lg">
      <h3 className="text-fluid-xl font-heading font-semibold mb-fluid-sm">
        {post.title}
      </h3>
      
      <p className={`
        text-body-guideline font-body text-gray-700 mb-fluid-md
        ${isExpanded ? '' : 'line-clamp-3'}
      `}>
        {post.excerpt}
      </p>
      
      <div className="flex items-center justify-between">
        <ReadMoreButton 
          isExpanded={isExpanded}
          onClick={() => setIsExpanded(!isExpanded)}
        />
        
        <a 
          href={`/blog/${post.slug}`}
          className="text-fluid-sm font-body font-medium text-blue-600 hover:text-blue-700"
        >
          Read Full Article →
        </a>
      </div>
    </article>
  );
}
```

---

## Advanced Patterns

### With Fade Effect

```tsx
<div className="relative">
  <p className={isExpanded ? '' : 'line-clamp-5'}>
    Content text...
  </p>
  
  {!isExpanded && (
    <div className="absolute bottom-0 left-0 right-0 h-12 bg-gradient-to-t from-white to-transparent" />
  )}
  
  <ReadMoreButton 
    isExpanded={isExpanded}
    onClick={() => setIsExpanded(!isExpanded)}
  />
</div>
```

### With Character Limit

```tsx
const CHAR_LIMIT = 300;
const [isExpanded, setIsExpanded] = useState(false);

const displayText = isExpanded 
  ? content 
  : content.slice(0, CHAR_LIMIT) + (content.length > CHAR_LIMIT ? '...' : '');

return (
  <>
    <p>{displayText}</p>
    
    {content.length > CHAR_LIMIT && (
      <ReadMoreButton 
        isExpanded={isExpanded}
        onClick={() => setIsExpanded(!isExpanded)}
      />
    )}
  </>
);
```

### With Scroll to Expanded Content

```tsx
const contentRef = useRef<HTMLDivElement>(null);

const handleToggle = () => {
  if (!isExpanded) {
    // Expanding - scroll to content after animation
    setTimeout(() => {
      contentRef.current?.scrollIntoView({ 
        behavior: 'smooth', 
        block: 'nearest' 
      });
    }, 300);
  }
  setIsExpanded(!isExpanded);
};

<ReadMoreButton 
  isExpanded={isExpanded}
  onClick={handleToggle}
/>
```

---

## Accessibility

### ARIA Attributes

```tsx
<button
  onClick={onClick}
  aria-expanded={isExpanded}
  aria-controls="expandable-content"
  aria-label={isExpanded ? 'Show less content' : 'Show more content'}
>
  {isExpanded ? 'Show Less' : 'Read More'}
</button>

<div 
  id="expandable-content"
  aria-hidden={!isExpanded}
>
  {/* Expandable content */}
</div>
```

### Keyboard Navigation

```tsx
// Accessible by default with button element
// Tab to focus, Enter/Space to activate

<button
  onClick={onClick}
  onKeyDown={(e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      onClick();
    }
  }}
  className="focus:outline-none focus:ring-2 focus:ring-pink-200 focus:ring-opacity-50"
>
  Read More
</button>
```

### Screen Reader Announcements

```tsx
// Live region for dynamic content changes
<div 
  role="region"
  aria-live="polite"
  aria-atomic="true"
>
  <p className={isExpanded ? '' : 'line-clamp-3'}>
    Content...
  </p>
</div>
```

---

## Common Mistakes

### ❌ Mistake 1: No Animation

```tsx
// ❌ WRONG - Abrupt show/hide
{isExpanded && <div>Content</div>}
```

**Solution:**
```tsx
// ✅ CORRECT - Smooth transition
<div className={`
  transition-all duration-500
  ${isExpanded ? 'max-h-[1000px] opacity-100' : 'max-h-0 opacity-0 overflow-hidden'}
`}>
  Content
</div>
```

### ❌ Mistake 2: Missing ARIA Labels

```tsx
// ❌ WRONG - No accessibility support
<button onClick={toggle}>
  {isExpanded ? '▲' : '▼'}
</button>
```

**Solution:**
```tsx
// ✅ CORRECT - Proper labels
<button 
  onClick={toggle}
  aria-expanded={isExpanded}
  aria-label={isExpanded ? 'Show less' : 'Show more'}
>
  {isExpanded ? 'Show Less' : 'Read More'}
</button>
```

### ❌ Mistake 3: Icon Doesn't Rotate

```tsx
// ❌ WRONG - Static icon
<ChevronDown className="w-4 h-4" />
```

**Solution:**
```tsx
// ✅ CORRECT - Animated icon
<ChevronDown className={`
  w-4 h-4 transition-transform duration-300
  ${isExpanded ? 'rotate-180' : 'rotate-0'}
`} />
```

---

## Related Components

- **[PortfolioCard](./PortfolioCard.md)** - Portfolio items
- **[ShareComponent](./ShareComponent.md)** - Social sharing

---

## Related Documentation

- **[Guidelines.md](../Guidelines.md)** - Main guidelines
- **[overview-components.md](../overview-components.md)** - Component system
- **[overview-icons.md](../overview-icons.md)** - Icon system
- **[FILE_STRUCTURE.md](../FILE_STRUCTURE.md)** - File organization

---

**Last Updated:** January 2025  
**Version:** 4.0.0