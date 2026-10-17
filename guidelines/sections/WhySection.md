# WhySection Component

**Version:** 4.0.0  
**Last Updated:** January 2025

---

## Purpose

The WhySection is a **philosophy content area** that communicates core brand values. It combines:
- Three-column card layout
- Custom animated icons
- Brand messaging about purpose
- Call-to-action to About page
- Decorative gradient elements

---

## Section Structure

```tsx
<ThreeColumnLayout
  title="Why I Do Makeup"
  subtitle="Description text"
  backgroundGradient="from-purple-50 via-pink-50 to-orange-50"
  decorativeElements={<>/* Gradient blur orbs */</>}
>
  {reasons.map(reason => (
    <Card key={reason.title}>
      <Icon component={reason.icon} />
      <h3>{reason.title}</h3>
      <p>{reason.description}</p>
    </Card>
  ))}
  
  <CallToAction>
    <button onClick={() => setCurrentPage('about')}>
      Read My Story
    </button>
  </CallToAction>
</ThreeColumnLayout>
```

---

## Container Styles

### Section Container (via ThreeColumnLayout)
```tsx
className="
  relative                                         // Position context
  bg-gradient-to-br 
    from-purple-50 via-pink-50 to-orange-50       // Warm gradient background
  py-section                                       // clamp(3rem, 6vw + 1rem, 8rem)
  px-fluid-md                                      // clamp(1rem, 0.6rem + 2vw, 2rem)
  overflow-hidden                                  // Contain decorations
"
```

### Inner Container
```tsx
className="
  max-w-7xl                                        // 1280px max-width
  mx-auto                                          // Center horizontally
  relative                                         // Above decorations
  z-10                                             // Stack above background
"
```

### Card Grid
```tsx
className="
  grid                                             // CSS Grid
  grid-cols-1                                      // Single column mobile
  md:grid-cols-3                                   // Three columns desktop
  gap-fluid-lg                                     // clamp(1.5rem, 1rem + 2.5vw, 3rem)
  mb-fluid-xl                                      // Margin below
"
```

---

## Visual Elements

### 1. Section Header

#### Section Title (H2)
```tsx
<h2 className="
  text-section-h2                                  // clamp(1.5rem, 4vw, 3rem)
  font-heading                                     // Playfair Display
  font-bold 
  text-gray-800
  text-center
  mb-fluid-md
">
  Why I Do Makeup
</h2>
```

#### Section Subtitle
```tsx
<p className="
  text-body-guideline                              // clamp(1rem, 1.5vw, 1.25rem)
  text-gray-600 
  text-center
  max-w-2xl                                        // 672px max-width
  mx-auto
  mb-fluid-2xl
">
  These three pillars guide everything I create — from festival glitter to bridal elegance.
</p>
```

---

### 2. Decorative Elements

Two large gradient blur orbs for subtle depth:

```tsx
{/* Pink/Purple orb - top left quarter */}
<div className="
  absolute top-1/4 left-1/4 
  w-32 h-32 sm:w-64 sm:h-64                        // Responsive sizing
  bg-gradient-to-br from-pink-400 to-purple-500
  rounded-full 
  blur-3xl                                         // Heavy blur
  opacity-5                                        // Very subtle
" />

{/* Blue/Teal orb - bottom right quarter */}
<div className="
  absolute top-3/4 right-1/4 
  w-24 h-24 sm:w-48 sm:h-48
  bg-gradient-to-br from-blue-400 to-teal-500
  rounded-full 
  blur-3xl 
  opacity-5
" />
```

**Purpose:** Add depth without distracting from content

---

### 3. Reason Cards

Each card displays a reason with custom icon:

#### Card Container
```tsx
<div className="
  bg-white/80                                      // Semi-transparent white
  backdrop-blur-sm                                 // Glass effect
  rounded-xl                                       // Rounded corners
  p-fluid-md                                       // clamp(1rem, 0.8rem + 1vw, 1.5rem)
  border border-white/50                           // Subtle border
  shadow-lg hover:shadow-xl                        // Elevation on hover
  transition-all duration-300                      // Smooth transitions
  text-center                                      // Center content
  flex flex-col items-center                       // Vertical alignment
  gap-fluid-sm                                     // Space between elements
">
```

#### Icon Container
```tsx
<div className="
  w-16 h-16                                        // 64×64px container
  mb-fluid-sm                                      // Margin below
">
  <ShineIcon className="w-full h-full" />
</div>
```

**Custom Icons:**
- **ShineIcon** - Radiant star (Spread Joy)
- **JoyIcon** - Paint palette with heart (Brings Me Joy)
- **GrowthIcon** - Flowering plant (To Keep Growing)

#### Card Title (H3)
```tsx
<h3 className="
  text-xl                                          // 20px
  sm:text-2xl                                      // 24px on small screens
  font-heading                                     // Playfair Display
  font-semibold 
  text-gray-800
  mb-fluid-xs
">
  Spread Joy
</h3>
```

#### Card Description
```tsx
<p className="
  text-base                                        // 16px
  font-body 
  text-gray-600 
  leading-relaxed                                  // 1.625 line-height
">
  When I do makeup for others, it lights them up. They feel special, happy, and confident — and seeing that sparkle in their eyes inspires me to keep creating.
</p>
```

---

### 4. Call-to-Action

#### CTA Container
```tsx
<div className="
  text-center                                      // Center button
  mt-fluid-xl                                      // Top margin
">
```

#### CTA Button
```tsx
<button
  onClick={() => setCurrentPage('about')}
  className="
    w-full sm:w-auto                               // Full width mobile
    bg-gradient-blue-teal-green                    // Secondary gradient
    hover:from-teal-700 hover:to-green-700         // Hover gradient shift
    text-white 
    px-button                                      // clamp(1.5rem, 1rem + 2.5vw, 3rem)
    py-button                                      // clamp(0.75rem, 0.5rem + 1.25vw, 1.5rem)
    font-body 
    font-medium 
    text-button-fluid                              // clamp(1rem, 0.9rem + 0.5vw, 1.25rem)
    transition-all duration-300 
    rounded-lg 
    shadow-lg hover:shadow-xl 
    transform hover:scale-105 
    focus:outline-none 
    focus:ring-4 focus:ring-teal-200
  "
>
  Read My Story
</button>
```

---

## Content Structure

### Three Core Reasons

```typescript
const reasons = [
  {
    icon: ShineIcon,
    title: "Spread Joy",
    description: "When I do makeup for others, it lights them up. They feel special, happy, and confident — and seeing that sparkle in their eyes inspires me to keep creating."
  },
  {
    icon: JoyIcon,
    title: "Brings Me Joy",
    description: "Makeup is my creative playground. Whether it's festival glitter, glowing UV paints, or bold eyeshadow blends, I love the process of experimenting and expressing."
  },
  {
    icon: GrowthIcon,
    title: "To Keep Growing",
    description: "Every face, every colour, every night out is a chance to evolve. Makeup is a journey — and I treat each session as an opportunity to learn and expand my artistry."
  }
];
```

---

## Responsive Breakpoints

### Mobile (< 768px)
- Single column grid (`grid-cols-1`)
- Stack cards vertically
- Full-width CTA button
- Smaller decorative orbs (128×128px)

### Tablet (768px - 1024px)
- Three column grid begins (`md:grid-cols-3`)
- May wrap to 2 columns if space tight
- Cards maintain equal height
- Auto-width CTA button

### Desktop (1024px+)
- Three column grid (`md:grid-cols-3`)
- Maximum container width (1280px)
- Larger decorative orbs (256×256px, 192×192px)
- Full hover effects

---

## Interactive Features

### 1. Navigation

Navigate to About page:

```tsx
const handleReadStory = () => {
  setCurrentPage('about');
  window.scrollTo({ top: 0, behavior: 'smooth' });
};
```

### 2. Card Hover Effects

Cards have subtle interactions:
```css
hover:shadow-xl              /* Shadow elevation */
transition-all duration-300  /* Smooth animation */
```

### 3. Icon Animations

Custom icons may include:
- Pulse animations
- Gradient fills
- Hover state changes

---

## Accessibility

### Semantic HTML
```tsx
<section aria-labelledby="why-heading">
  <h2 id="why-heading">Why I Do Makeup</h2>
  <div className="grid">
    <article>                      {/* Each card is an article */}
      <h3>Card Title</h3>
      <p>Card Description</p>
    </article>
  </div>
</section>
```

### ARIA Labels
```tsx
// Navigation button
<button
  onClick={handleReadStory}
  aria-label="Read full story on About page"
>
  Read My Story
</button>
```

### Keyboard Navigation
- Tab through cards
- Enter/Space to activate button
- Logical tab order maintained

---

## Typography Scale

| Element | Class | Size (Mobile → Desktop) |
|---------|-------|------------------------|
| Section Title | `text-section-h2` | 24px → 48px |
| Subtitle | `text-body-guideline` | 16px → 20px |
| Card Title | `text-xl sm:text-2xl` | 20px → 24px |
| Card Description | `text-base` | 16px |
| Button Text | `text-button-fluid` | 16px → 20px |

---

## Color Palette

### Background
```css
bg-gradient-to-br from-purple-50 via-pink-50 to-orange-50
```

### Text Colors
```css
text-gray-800                      /* Titles */
text-gray-600                      /* Descriptions */
text-white                         /* Button text */
```

### Card Styling
```css
bg-white/80                        /* Semi-transparent background */
backdrop-blur-sm                   /* Glass effect */
border-white/50                    /* Subtle border */
```

### Button Gradient
```css
bg-gradient-blue-teal-green                      /* Default */
hover:from-teal-700 hover:to-green-700           /* Hover state */
```

### Decorative Orbs
```css
from-pink-400 to-purple-500        /* Top-left orb */
from-blue-400 to-teal-500          /* Bottom-right orb */
```

---

## Best Practices

### 1. Consistent Layout
```tsx
// ✅ Use ThreeColumnLayout wrapper
<ThreeColumnLayout
  title="Why I Do Makeup"
  subtitle="Description"
  backgroundGradient="from-purple-50 via-pink-50 to-orange-50"
>
  {/* Content */}
</ThreeColumnLayout>
```

### 2. Icon Integration
```tsx
// ✅ Import custom icons
import { ShineIcon, JoyIcon, GrowthIcon } from "../common/ColorfulIcons";

// ✅ Pass as component
icon: ShineIcon
```

### 3. Card Spacing
```tsx
// ✅ Use fluid spacing tokens
gap-fluid-lg                       // Grid gap
p-fluid-md                         // Card padding
mb-fluid-xl                        // Section spacing
```

### 4. Responsive Design
```tsx
// ✅ Mobile-first grid
className="grid grid-cols-1 md:grid-cols-3"

// ✅ Responsive button
className="w-full sm:w-auto"
```

---

## WordPress Comparison

### WordPress `core/columns` Block
```html
<!-- wp:columns -->
<div class="wp-block-columns">
  <!-- wp:column -->
  <div class="wp-block-column">
    <h3>Column Title</h3>
    <p>Column content</p>
  </div>
  <!-- /wp:column -->
</div>
<!-- /wp:columns -->
```

### Ash Shaw WhySection
```tsx
<section className="bg-gradient-to-br from-purple-50 via-pink-50 to-orange-50 py-section px-fluid-md">
  <div className="max-w-7xl mx-auto">
    <h2>Why I Do Makeup</h2>
    <div className="grid grid-cols-1 md:grid-cols-3 gap-fluid-lg">
      {reasons.map(reason => (
        <article className="bg-white/80 backdrop-blur-sm p-fluid-md">
          <Icon component={reason.icon} />
          <h3>{reason.title}</h3>
          <p>{reason.description}</p>
        </article>
      ))}
    </div>
  </div>
</section>
```

---

## Related Documentation

- **[overview-sections.md](../overview-sections.md)** - Section system overview
- **[ThreeColumnLayout.md](./ThreeColumnLayout.md)** - Layout wrapper component
- **[ColorfulIcons.md](../components/ColorfulIcons.md)** - Custom icon components
- **[design-tokens/colors.md](../design-tokens/colors.md)** - Color system
- **[design-tokens/spacing.md](../design-tokens/spacing.md)** - Spacing tokens

---

**Last Updated:** January 2025  
**Version:** 4.0.0