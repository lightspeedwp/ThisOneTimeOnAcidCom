# ThreeColumnLayout Component

**Version:** 4.0.0  
**Last Updated:** January 2025

Responsive three-column grid layout wrapper for equal-weight content presentations.

**File:** `/components/sections/ThreeColumnLayout.tsx`  
**WordPress Equivalent:** `core/columns` block with 3 columns  
**Used In:** WhySection, feature showcases, service displays

---

## Purpose

The ThreeColumnLayout is a **reusable layout wrapper** that provides:
- Responsive 3-column grid (mobile → tablet → desktop)
- Optional header and footer sections
- Configurable gap and padding
- Background gradient support
- Decorative element positioning
- Vertical alignment control
- Consistent Guidelines.md spacing patterns

**Primary Use Cases:**
- Feature showcases (Why I Do Makeup section)
- Service offerings with icons
- Team member profiles
- Product/skill highlights
- Testimonial grids
- Icon + text feature blocks

---

## Component Structure

```tsx
import { ThreeColumnLayout } from './components/sections/ThreeColumnLayout';

<ThreeColumnLayout
  header={
    <div className="text-center mb-fluid-2xl">
      <h2 className="text-section-h2 font-heading font-bold text-gray-800 mb-fluid-md">
        Why I Do Makeup
      </h2>
      <p className="text-body-fluid font-body text-gray-600 max-w-2xl mx-auto">
        Three core reasons that drive my passion
      </p>
    </div>
  }
  backgroundGradient={{
    from: 'purple-50',
    via: 'pink-50',
    to: 'orange-50'
  }}
  gap="lg"
  padding="3xl"
  mobileColumns={1}
  tabletColumns={2}
  verticalAlignment="stretch"
  decorativeElements={
    <>
      <div className="absolute top-10 left-10 w-32 h-32 bg-pink-200/30 rounded-full blur-3xl" />
      <div className="absolute bottom-10 right-10 w-40 h-40 bg-purple-200/30 rounded-full blur-3xl" />
    </>
  }
  footer={
    <div className="text-center">
      <button className="btn-primary">
        Learn More
      </button>
    </div>
  }
>
  <FeatureCard icon={<ShineIcon />} title="Make People Shine" description="..." />
  <FeatureCard icon={<JoyIcon />} title="Brings Me Joy" description="..." />
  <FeatureCard icon={<GrowthIcon />} title="To Keep Growing" description="..." />
</ThreeColumnLayout>
```

---

## Props Interface

### Required Props

```typescript
interface ThreeColumnLayoutProps {
  /**
   * Content items to display in three columns
   * Can be any React components (cards, features, etc.)
   */
  children: React.ReactNode;
}
```

### Optional Props

```typescript
interface ThreeColumnLayoutProps {
  /**
   * Additional CSS classes for section customization
   * @default ""
   */
  className?: string;
  
  /**
   * HTML id attribute for anchor linking
   * @default undefined
   */
  id?: string;
  
  /**
   * Background gradient configuration
   * Uses Tailwind gradient classes
   * @default undefined (no gradient)
   */
  backgroundGradient?: {
    from: string;    // Starting color (e.g., 'purple-50')
    via?: string;    // Optional middle color (e.g., 'pink-50')
    to: string;      // Ending color (e.g., 'orange-50')
  };
  
  /**
   * Gap between columns using fluid spacing scale
   * @default 'lg'
   */
  gap?: 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl';
  
  /**
   * Vertical padding using fluid spacing scale
   * @default '3xl'
   */
  padding?: 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl';
  
  /**
   * Number of columns on mobile devices
   * @default 1
   */
  mobileColumns?: 1 | 2;
  
  /**
   * Number of columns on tablet devices
   * @default 2
   */
  tabletColumns?: 1 | 2 | 3;
  
  /**
   * Vertical alignment of grid items
   * @default 'stretch' (equal heights)
   */
  verticalAlignment?: 'top' | 'center' | 'bottom' | 'stretch';
  
  /**
   * Optional decorative elements (blur orbs, shapes, etc.)
   * Rendered with pointer-events-none and aria-hidden
   * @default undefined
   */
  decorativeElements?: React.ReactNode;
  
  /**
   * Optional header content above the grid
   * Typically section title and subtitle
   * @default undefined
   */
  header?: React.ReactNode;
  
  /**
   * Optional footer content below the grid
   * Typically CTAs or additional links
   * @default undefined
   */
  footer?: React.ReactNode;
}
```

---

## Container Styles

### Section Container

```tsx
<section className="
  relative                                         // Position context for decorative elements
  overflow-hidden                                  // Contain decorative blur effects
  bg-gradient-to-br                               // Diagonal gradient
    from-purple-50 via-pink-50 to-orange-50       // Brand gradient colors
  py-fluid-3xl                                     // clamp(2.5rem, 2rem + 2.5vw, 4rem)
  px-fluid-md                                      // clamp(1rem, 0.6rem + 2vw, 2rem)
">
```

**Key Classes:**
- `relative` - Position context for absolute decorative elements
- `overflow-hidden` - Clip decorative blur orbs at edges
- `bg-gradient-to-br` - Diagonal gradient background
- `py-fluid-3xl` - Responsive vertical padding
- `px-fluid-md` - Responsive horizontal padding

### Content Container

```tsx
<div className="
  max-w-7xl                                        // 1280px max-width
  mx-auto                                          // Center horizontally
  relative                                         // Position context
  z-10                                             // Above decorative elements
">
```

**Key Classes:**
- `max-w-7xl` - Maximum content width (1280px)
- `mx-auto` - Center container
- `relative z-10` - Stack above background decorations

### Grid Container

```tsx
<div className="
  grid                                             // CSS Grid layout
  grid-cols-1                                      // Single column mobile
  md:grid-cols-2                                   // Two columns tablet
  lg:grid-cols-3                                   // Three columns desktop
  gap-fluid-lg                                     // clamp(1.5rem, 1rem + 2.5vw, 3rem)
  items-stretch                                    // Equal height items
">
```

**Key Classes:**
- `grid` - Enable CSS Grid
- `grid-cols-1` - Mobile: 1 column
- `md:grid-cols-2` - Tablet: 2 columns (768px+)
- `lg:grid-cols-3` - Desktop: 3 columns (1024px+)
- `gap-fluid-lg` - Responsive gap between items
- `items-stretch` - Equal height cards

---

## Spacing Configuration

### Gap Options

```typescript
const gapClasses = {
  sm: 'gap-fluid-sm',      // clamp(0.75rem, 0.5rem + 1.25vw, 1.5rem)
  md: 'gap-fluid-md',      // clamp(1rem, 0.6rem + 2vw, 2rem)
  lg: 'gap-fluid-lg',      // clamp(1.5rem, 1rem + 2.5vw, 3rem)
  xl: 'gap-fluid-xl',      // clamp(2rem, 1.5rem + 2.5vw, 3.5rem)
  '2xl': 'gap-fluid-2xl',  // clamp(2.5rem, 2rem + 2.5vw, 4rem)
  '3xl': 'gap-fluid-3xl',  // clamp(3rem, 2.5rem + 2.5vw, 4.5rem)
};
```

**Usage:**
```tsx
<ThreeColumnLayout gap="lg">  {/* 1.5rem → 3rem responsive */}
  {children}
</ThreeColumnLayout>
```

### Padding Options

```typescript
const paddingClasses = {
  sm: 'py-fluid-sm px-fluid-md',    // Vertical: 0.75-1.5rem, Horizontal: 1-2rem
  md: 'py-fluid-md px-fluid-md',    // Vertical: 1-2rem, Horizontal: 1-2rem
  lg: 'py-fluid-lg px-fluid-md',    // Vertical: 1.5-3rem, Horizontal: 1-2rem
  xl: 'py-fluid-xl px-fluid-md',    // Vertical: 2-3.5rem, Horizontal: 1-2rem
  '2xl': 'py-fluid-2xl px-fluid-md', // Vertical: 2.5-4rem, Horizontal: 1-2rem
  '3xl': 'py-fluid-3xl px-fluid-md', // Vertical: 3-4.5rem, Horizontal: 1-2rem
};
```

**Usage:**
```tsx
<ThreeColumnLayout padding="3xl">  {/* Maximum section spacing */}
  {children}
</ThreeColumnLayout>
```

---

## Responsive Behavior

### Breakpoint Strategy

```
Mobile (< 768px):   1 column (mobileColumns prop)
Tablet (768-1023px): 2 columns (tabletColumns prop)
Desktop (1024px+):  3 columns (fixed)
```

### Column Configuration Examples

```tsx
// Default: 1 → 2 → 3 columns
<ThreeColumnLayout>
  {children}
</ThreeColumnLayout>

// Keep single column on mobile and tablet
<ThreeColumnLayout mobileColumns={1} tabletColumns={1}>
  {children}
</ThreeColumnLayout>

// Two columns on mobile
<ThreeColumnLayout mobileColumns={2} tabletColumns={2}>
  {children}
</ThreeColumnLayout>
```

### Vertical Alignment

```typescript
const alignmentClasses = {
  top: 'items-start',       // Align items to top
  center: 'items-center',   // Center items vertically
  bottom: 'items-end',      // Align items to bottom
  stretch: 'items-stretch', // Equal height (default)
};
```

**Usage:**
```tsx
// Equal height cards (recommended)
<ThreeColumnLayout verticalAlignment="stretch">
  {children}
</ThreeColumnLayout>

// Top-aligned cards (different heights)
<ThreeColumnLayout verticalAlignment="top">
  {children}
</ThreeColumnLayout>
```

---

## Background Gradients

### Gradient Configuration

```tsx
// Diagonal gradient background
<ThreeColumnLayout
  backgroundGradient={{
    from: 'purple-50',    // Starting color
    via: 'pink-50',       // Optional middle color
    to: 'orange-50'       // Ending color
  }}
>
```

**Generated Classes:**
```css
.bg-gradient-to-br 
.from-purple-50 
.via-pink-50 
.to-orange-50
```

### Common Gradient Patterns

```tsx
// Warm gradient (Why Section)
backgroundGradient={{
  from: 'purple-50',
  via: 'pink-50',
  to: 'orange-50'
}}

// Cool gradient
backgroundGradient={{
  from: 'blue-50',
  via: 'teal-50',
  to: 'green-50'
}}

// Monochrome gradient
backgroundGradient={{
  from: 'gray-50',
  to: 'gray-100'
}}

// No gradient (white background)
<ThreeColumnLayout>
  {/* No backgroundGradient prop */}
</ThreeColumnLayout>
```

---

## Decorative Elements

### Blur Orbs Pattern

```tsx
<ThreeColumnLayout
  decorativeElements={
    <>
      {/* Top-left blur orb */}
      <div className="
        absolute top-10 left-10 
        w-32 h-32 
        bg-pink-200/30 
        rounded-full blur-3xl
      " />
      
      {/* Bottom-right blur orb */}
      <div className="
        absolute bottom-10 right-10 
        w-40 h-40 
        bg-purple-200/30 
        rounded-full blur-3xl
      " />
      
      {/* Center accent */}
      <div className="
        absolute top-1/2 left-1/2 
        -translate-x-1/2 -translate-y-1/2
        w-64 h-64 
        bg-orange-200/20 
        rounded-full blur-3xl
      " />
    </>
  }
>
```

**Decorative Element Styling:**
- Always wrapped in `pointer-events-none` container
- Always includes `aria-hidden="true"` for accessibility
- Positioned with `absolute`
- Uses low opacity (20-30%) for subtle effect
- Uses `blur-3xl` for soft appearance

---

## Header and Footer Sections

### Header Pattern (Section Title)

```tsx
<ThreeColumnLayout
  header={
    <div className="text-center mb-fluid-2xl">
      <h2 className="
        text-section-h2 
        font-heading 
        font-bold 
        text-gray-800 
        mb-fluid-md
      ">
        Why I Do Makeup
      </h2>
      <p className="
        text-body-fluid 
        font-body 
        text-gray-600 
        max-w-2xl 
        mx-auto
      ">
        Three core reasons that drive my passion for makeup artistry
      </p>
    </div>
  }
>
```

### Footer Pattern (Call to Action)

```tsx
<ThreeColumnLayout
  footer={
    <div className="text-center mt-fluid-2xl">
      <button className="
        w-full sm:w-auto 
        bg-gradient-pink-purple-blue 
        hover:from-purple-700 hover:to-pink-700 
        text-white 
        px-button py-button 
        font-body font-medium 
        text-button-fluid 
        rounded-lg 
        shadow-lg hover:shadow-xl 
        transform hover:scale-105 
        transition-all duration-300
      ">
        Read My Story
      </button>
    </div>
  }
>
```

---

## Usage Examples

### Example 1: Why Section (Full Featured)

```tsx
import { ThreeColumnLayout } from './components/sections/ThreeColumnLayout';
import { ShineIcon, JoyIcon, GrowthIcon } from './components/common/ColorfulIcons';

function WhySection() {
  const reasons = [
    {
      icon: <ShineIcon size="lg" />,
      title: 'Make People Shine',
      description: 'Bringing out natural beauty and confidence in everyone I work with.'
    },
    {
      icon: <JoyIcon size="lg" />,
      title: 'Brings Me Joy',
      description: 'The creative process and seeing transformation brings pure happiness.'
    },
    {
      icon: <GrowthIcon size="lg" />,
      title: 'To Keep Growing',
      description: 'Continuously learning new techniques and evolving my craft.'
    }
  ];

  return (
    <ThreeColumnLayout
      id="why-section"
      header={
        <div className="text-center">
          <h2 className="text-section-h2 font-heading font-bold text-gray-800 mb-fluid-md">
            Why I Do Makeup
          </h2>
          <p className="text-body-fluid font-body text-gray-600 max-w-2xl mx-auto">
            Makeup artistry is more than a profession—it's my passion and purpose
          </p>
        </div>
      }
      backgroundGradient={{
        from: 'purple-50',
        via: 'pink-50',
        to: 'orange-50'
      }}
      gap="lg"
      padding="3xl"
      mobileColumns={1}
      tabletColumns={2}
      verticalAlignment="stretch"
      decorativeElements={
        <>
          <div className="absolute top-10 left-10 w-32 h-32 bg-pink-200/30 rounded-full blur-3xl" />
          <div className="absolute bottom-10 right-10 w-40 h-40 bg-purple-200/30 rounded-full blur-3xl" />
        </>
      }
      footer={
        <div className="text-center">
          <button 
            onClick={() => navigateToAbout()}
            className="btn-primary"
          >
            Read My Full Story
          </button>
        </div>
      }
    >
      {reasons.map((reason, index) => (
        <div 
          key={index}
          className="bg-white/80 backdrop-blur-sm rounded-xl p-fluid-lg border border-white/50 shadow-lg hover:shadow-xl transition-all duration-300"
        >
          <div className="flex justify-center mb-fluid-md">
            {reason.icon}
          </div>
          <h3 className="text-card-h3 font-heading font-bold text-gray-800 text-center mb-fluid-sm">
            {reason.title}
          </h3>
          <p className="text-body-fluid font-body text-gray-600 text-center">
            {reason.description}
          </p>
        </div>
      ))}
    </ThreeColumnLayout>
  );
}
```

### Example 2: Portfolio Showcase (Minimal)

```tsx
<ThreeColumnLayout
  header={
    <h2 className="text-section-h2 font-heading font-bold text-center">
      My Work
    </h2>
  }
  gap="xl"
  padding="2xl"
>
  <SectionCard title="Festival Makeup" icon={<SparklesIcon />} />
  <SectionCard title="Special Events" icon={<StarIcon />} />
  <SectionCard title="Photoshoots" icon={<CameraIcon />} />
</ThreeColumnLayout>
```

### Example 3: Feature Grid (No Header/Footer)

```tsx
<ThreeColumnLayout
  backgroundGradient={{
    from: 'gray-50',
    to: 'white'
  }}
  gap="md"
  padding="xl"
  verticalAlignment="top"
>
  <FeatureCard title="Professional Quality" />
  <FeatureCard title="Personalized Service" />
  <FeatureCard title="Flexible Scheduling" />
</ThreeColumnLayout>
```

### Example 4: Team Profiles

```tsx
<ThreeColumnLayout
  header={
    <div className="text-center">
      <h2 className="text-section-h2 font-heading font-bold">Meet the Team</h2>
      <p className="text-body-fluid font-body text-gray-600 mt-fluid-sm">
        Talented artists bringing your vision to life
      </p>
    </div>
  }
  mobileColumns={1}
  tabletColumns={2}
  gap="lg"
  padding="2xl"
>
  <TeamMemberCard name="Ash Shaw" role="Lead Artist" />
  <TeamMemberCard name="Artist 2" role="Makeup Artist" />
  <TeamMemberCard name="Artist 3" role="Hair Stylist" />
</ThreeColumnLayout>
```

---

## Accessibility

### Semantic Structure

```tsx
<section                              // Semantic HTML5 section
  id="unique-section-id"             // Anchor linking support
  aria-labelledby="section-heading"  // Link to heading if available
>
  <div className="max-w-7xl mx-auto relative z-10">
    {header && (
      <div className="mb-fluid-2xl">
        <h2 id="section-heading">{/* Title */}</h2>
      </div>
    )}
    
    <div className="grid ...">
      {children}
    </div>
  </div>
</section>
```

### Decorative Elements

```tsx
{decorativeElements && (
  <div 
    className="absolute inset-0 pointer-events-none" 
    aria-hidden="true"                    // Hide from screen readers
  >
    {decorativeElements}
  </div>
)}
```

**Key Points:**
- Decorative elements have `aria-hidden="true"`
- `pointer-events-none` prevents interaction
- Content remains above decorations with `z-10`

### Keyboard Navigation

- All interactive children (buttons, links) remain keyboard accessible
- Grid layout maintains logical tab order (left to right, top to bottom)
- Focus indicators visible on all interactive elements

### Screen Reader Support

```tsx
// Proper heading hierarchy
<ThreeColumnLayout
  header={
    <div>
      <h2>Section Title</h2>      {/* h2 for section */}
      <p>Subtitle</p>
    </div>
  }
>
  <Card>
    <h3>Card Title</h3>             {/* h3 for cards */}
    <p>Content</p>
  </Card>
</ThreeColumnLayout>
```

---

## Design Tokens

### Typography

```css
/* Section Heading */
.text-section-h2                      /* clamp(1.5rem, 4vw, 3rem) - 24px → 48px */
.font-heading                         /* Playfair Display */
.font-bold                            /* 700 weight */

/* Card Heading */
.text-card-h3                         /* clamp(1.125rem, 2vw, 1.5rem) - 18px → 24px */
.font-heading                         /* Playfair Display */
.font-bold                            /* 700 weight */

/* Body Text */
.text-body-fluid                      /* clamp(1rem, 1.5vw, 1.25rem) - 16px → 20px */
.font-body                            /* Inter */
```

### Spacing Scale

```css
/* Padding Options */
py-fluid-sm                           /* clamp(0.75rem, 0.5rem + 1.25vw, 1.5rem) */
py-fluid-md                           /* clamp(1rem, 0.6rem + 2vw, 2rem) */
py-fluid-lg                           /* clamp(1.5rem, 1rem + 2.5vw, 3rem) */
py-fluid-xl                           /* clamp(2rem, 1.5rem + 2.5vw, 3.5rem) */
py-fluid-2xl                          /* clamp(2.5rem, 2rem + 2.5vw, 4rem) */
py-fluid-3xl                          /* clamp(3rem, 2.5rem + 2.5vw, 4.5rem) */

/* Gap Options */
gap-fluid-sm through gap-fluid-3xl    /* Same scale as padding */
```

### Colors

```css
/* Background Gradients */
from-purple-50 via-pink-50 to-orange-50    /* Warm gradient */
from-blue-50 via-teal-50 to-green-50       /* Cool gradient */
from-gray-50 to-white                      /* Neutral gradient */

/* Card Backgrounds */
bg-white/80                                /* Semi-transparent white */
backdrop-blur-sm                           /* Backdrop blur effect */
border-white/50                            /* Semi-transparent border */
```

---

## Best Practices

### ✅ DO

```tsx
// ✅ Use semantic header structure
<ThreeColumnLayout
  header={
    <div>
      <h2>Section Title</h2>
      <p>Subtitle</p>
    </div>
  }
>

// ✅ Provide unique id for anchor linking
<ThreeColumnLayout id="services-section">

// ✅ Use stretch alignment for equal-height cards
<ThreeColumnLayout verticalAlignment="stretch">

// ✅ Configure responsive columns appropriately
<ThreeColumnLayout 
  mobileColumns={1}    // Single column mobile
  tabletColumns={2}    // Two columns tablet
>

// ✅ Use fluid spacing tokens
<ThreeColumnLayout gap="lg" padding="3xl">
```

### ❌ DON'T

```tsx
// ❌ Don't skip heading hierarchy
<ThreeColumnLayout
  header={<h4>Section Title</h4>}  // Should be h2
>

// ❌ Don't use arbitrary spacing
<ThreeColumnLayout className="p-10 gap-8">  // Use padding/gap props

// ❌ Don't make decorative elements interactive
decorativeElements={
  <button>Click me</button>  // Decoratives should not be interactive
}

// ❌ Don't forget to configure mobile behavior
<ThreeColumnLayout>
  {/* Will default to 1 column mobile - this might be fine */}
</ThreeColumnLayout>
```

---

## Performance Considerations

### Layout Optimization

```tsx
// ✅ Grid layout is performant
// Uses native CSS Grid - no JavaScript calculations

// ✅ Fluid spacing scales without JavaScript
// CSS clamp() provides responsive scaling

// ✅ Decorative elements are positioned absolutely
// No impact on grid calculations
```

### Rendering Strategy

```tsx
// Content should be memoized if complex
const reasons = useMemo(() => [
  { title: 'Reason 1', ... },
  { title: 'Reason 2', ... },
  { title: 'Reason 3', ... }
], []);

<ThreeColumnLayout>
  {reasons.map(reason => (
    <ReasonCard key={reason.id} {...reason} />
  ))}
</ThreeColumnLayout>
```

---

## WordPress Comparison

### Core/Columns Block

```
ThreeColumnLayout ≈ core/columns (3 columns)

Similarities:
- Responsive column layout
- Configurable gaps
- Mobile stacking
- Equal-height option

Differences:
+ ThreeColumnLayout includes header/footer sections
+ Built-in decorative element support
+ Background gradient configuration
+ Consistent Guidelines.md spacing
+ Optimized for portfolio showcase patterns
```

---

## Related Components

### Layout Components
- **[OneColumnLayout](./OneColumnLayout.md)** - Single column centered content
- **[TwoColumnLayout](./TwoColumnLayout.md)** - Two column split layouts
- **[overview-sections.md](../overview-sections.md)** - Section system overview

### Used With
- **[ColorfulIcons](../components/ColorfulIcons.md)** - Custom brand icons
- **[SectionCard](../components/SectionCard.md)** - Generic card component
- **[WhySection](./WhySection.md)** - Primary usage example

### Design Tokens
- **[spacing.md](../design-tokens/spacing.md)** - Fluid spacing scale
- **[colors.md](../design-tokens/colors.md)** - Color system and gradients
- **[typography.md](../design-tokens/typography.md)** - Typography scale

---

## Implementation Checklist

When implementing ThreeColumnLayout:

- [ ] Import component from correct path
- [ ] Provide header with h2 section title
- [ ] Configure responsive columns (mobile/tablet)
- [ ] Set appropriate gap and padding
- [ ] Add background gradient if needed
- [ ] Include decorative elements for visual interest
- [ ] Add footer CTA if applicable
- [ ] Use semantic HTML in children
- [ ] Verify keyboard navigation works
- [ ] Test responsive behavior (mobile/tablet/desktop)
- [ ] Check equal heights work correctly (stretch)
- [ ] Ensure proper heading hierarchy (h2 → h3)

---

**Status:** ✅ Production Ready

**Need Help?**
- Props not working? → Check TypeScript interface above
- Layout issues? → Review responsive behavior section
- Styling problems? → Reference design tokens section
- Usage questions? → See examples section