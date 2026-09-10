# HeroSection Component

**Version:** 4.0.0  
**Last Updated:** January 2025

Hero banner component for homepage with full-screen layout, gradient text, and call-to-action buttons.

## Purpose

Create impactful homepage hero with:
- Full-screen or large-scale layout
- Gradient text for brand name
- Professional tagline
- Multiple CTA buttons
- Background image or gradient
- ScrollDownArrow integration
- Responsive typography scaling
- Accessibility compliance

---

## Component Architecture

### Hero Section Layout Flow (Mermaid)

```mermaid
flowchart TD
    A[HeroSection Renders] --> B[Load Hero Data]
    
    B --> C[Import from mock data]
    C --> D[homepageHero object]
    C --> E[homepageHeroImages array]
    
    D --> F[Extract Content]
    F --> F1[title: 'Ash Shaw']
    F --> F2[subtitle: 'Makeup Artist']
    F --> F3[tagline: 'Makeup that shines...']
    F --> F4[CTAs: primaryCTA, secondaryCTA]
    
    E --> G[Background Images]
    G --> G1[Image 1: figma:asset/...]
    G --> G2[Image 2: figma:asset/...]
    G --> G3[Image 3: figma:asset/...]
    
    F --> H[Render Hero Content]
    G --> H
    
    H --> I[Layout Container]
    I --> J[Background Layer]
    I --> K[Content Layer]
    I --> L[CTA Layer]
    I --> M[ScrollDownArrow]
    
    J --> J1[Background images with gradient overlay]
    K --> K1[Title with gradient text effect]
    K --> K2[Subtitle with sans-serif font]
    K --> K3[Tagline with body text]
    
    L --> L1[Primary CTA: View Portfolio]
    L --> L2[Secondary CTA: Get In Touch]
    
    M --> M1[Animated scroll indicator]
    
    style F1 fill:#fef3c7,stroke:#f59e0b,stroke-width:2px
    style K1 fill:#fce7f3,stroke:#ec4899,stroke-width:2px
    style L1 fill:#dcfce7,stroke:#22c55e,stroke-width:2px
```

### Responsive Typography Scaling (Mermaid)

```mermaid
stateDiagram-v2
    [*] --> Mobile: Screen < 768px
    [*] --> Tablet: Screen 768-1023px
    [*] --> Desktop: Screen >= 1024px
    
    Mobile --> MobileTitle: Title 36px (2.25rem)
    Mobile --> MobileSubtitle: Subtitle 20px (1.25rem)
    Mobile --> MobileTagline: Tagline 16px (1rem)
    Mobile --> MobileCTA: CTA full-width stacked
    
    MobileTitle --> Fluid1: clamp(2.25rem, 6vw, 7.5rem)
    MobileSubtitle --> Fluid2: clamp(1.25rem, 3vw, 2rem)
    MobileTagline --> Fluid3: clamp(1rem, 1.5vw, 1.25rem)
    
    Tablet --> TabletTitle: Title ~60px
    Tablet --> TabletSubtitle: Subtitle ~28px
    Tablet --> TabletTagline: Tagline ~18px
    Tablet --> TabletCTA: CTA side-by-side
    
    TabletTitle --> Fluid1
    TabletSubtitle --> Fluid2
    TabletTagline --> Fluid3
    
    Desktop --> DesktopTitle: Title 120px (7.5rem)
    Desktop --> DesktopSubtitle: Subtitle 32px (2rem)
    Desktop --> DesktopTagline: Tagline 20px (1.25rem)
    Desktop --> DesktopCTA: CTA horizontal with spacing
    
    DesktopTitle --> Fluid1
    DesktopSubtitle --> Fluid2
    DesktopTagline --> Fluid3
    
    note right of Fluid1
        Title uses text-hero-h1
        Playfair Display/Righteous
        Bold, gradient effect
    end note
    
    note right of Fluid3
        Tagline uses text-body-guideline
        Inter font
        Normal weight
    end note
```

### CTA Interaction Flow (Mermaid)

```mermaid
sequenceDiagram
    participant U as User
    participant H as HeroSection
    participant R as React Router
    participant P as Portfolio Page
    participant C as Contact Section
    
    Note over U: User lands on homepage
    H-->>U: Display hero with CTAs
    
    alt Primary CTA Click
        U->>H: Click "View Portfolio"
        H->>H: Handle primaryCTA.onClick
        H->>R: navigate('/portfolio')
        R->>P: Route to portfolio page
        P-->>U: Show portfolio grid ✅
    else Secondary CTA Click
        U->>H: Click "Get In Touch"
        H->>H: Handle secondaryCTA.onClick
        
        alt Navigate to Contact Page
            H->>R: navigate('/contact')
            R->>C: Route to contact page
            C-->>U: Show contact form ✅
        else Scroll to Contact Form
            H->>H: Smooth scroll
            H->>C: scrollIntoView({ behavior: 'smooth' })
            C-->>U: Contact form in view ✅
        end
    end
    
    U->>H: Scroll down
    H->>H: Fade out hero
    H->>H: Show next section
```

### Background Image Handling (Mermaid)

```mermaid
flowchart TD
    A[Hero Mounts] --> B{Has Background Images?}
    
    B -->|Yes| C[Load from homepageHeroImages]
    B -->|No| D[Use Gradient Fallback]
    
    C --> E[Choose Image Strategy]
    
    E --> F{Strategy?}
    
    F -->|Single Image| G[Display one background]
    F -->|Slideshow| H[Auto-rotate images]
    F -->|Random| I[Pick random on mount]
    
    G --> J[Apply Background]
    H --> K[Start Interval Timer]
    I --> J
    
    K --> L[Every 5 seconds]
    L --> M[Transition to next image]
    M --> N[Fade effect]
    N --> L
    
    D --> O[bg-gradient-pink-purple-blue]
    
    J --> P[Add Overlay]
    O --> P
    
    P --> Q[Dark gradient overlay<br/>for text readability]
    
    Q --> R[Render Hero Content]
    
    style C fill:#dcfce7,stroke:#22c55e,stroke-width:2px
    style D fill:#fef3c7,stroke:#f59e0b,stroke-width:2px
    style Q fill:#e0e7ff,stroke:#6366f1,stroke-width:2px
```

---

## Usage

### Basic Usage

```tsx
import { HeroSection } from './components/sections/HeroSection';

<HeroSection 
  title="Ash Shaw"
  subtitle="Makeup Artist"
  tagline="Makeup that shines with colour, energy, and connection."
/>
```

### With CTAs

```tsx
<HeroSection 
  title="Ash Shaw"
  subtitle="Makeup Artist"
  tagline="Makeup that shines with colour, energy, and connection."
  primaryCTA={{
    text: 'Explore Portfolio',
    onClick: () => navigate('/portfolio')
  }}
  secondaryCTA={{
    text: 'Get In Touch',
    onClick: () => navigate('/contact')
  }}
/>
```

### With Background Image

```tsx
<HeroSection 
  title="Ash Shaw"
  subtitle="UV & Neon Makeup Artist"
  tagline="Creating stunning looks for festivals, editorials, and special events."
  backgroundImage="/images/hero-festival-makeup.jpg"
  overlay="dark"
  primaryCTA={{
    text: 'Explore Portfolio',
    onClick: () => navigate('/portfolio')
  }}
/>
```

---

## Props

```typescript
interface HeroSectionProps {
  /**
   * Main hero title (brand name)
   * @required
   */
  title: string;
  
  /**
   * Subtitle (profession/role)
   * @optional
   */
  subtitle?: string;
  
  /**
   * Tagline/brand message
   * @optional
   */
  tagline?: string;
  
  /**
   * Primary CTA button
   * @optional
   */
  primaryCTA?: {
    text: string;
    onClick: () => void;
    ariaLabel?: string;
  };
  
  /**
   * Secondary CTA button
   * @optional
   */
  secondaryCTA?: {
    text: string;
    onClick: () => void;
    ariaLabel?: string;
  };
  
  /**
   * Background image URL
   * @optional
   */
  backgroundImage?: string;
  
  /**
   * Background overlay type
   * @default "gradient"
   */
  overlay?: 'dark' | 'light' | 'gradient' | 'none';
  
  /**
   * Hero height
   * @default "screen"
   */
  height?: 'screen' | 'large' | 'medium';
  
  /**
   * Text alignment
   * @default "center"
   */
  alignment?: 'left' | 'center' | 'right';
  
  /**
   * Show scroll indicator
   * @default true
   */
  showScrollIndicator?: boolean;
  
  /**
   * Additional CSS classes
   * @default ""
   */
  className?: string;
}
```

---

## Implementation Example

Complete hero section implementation:

```tsx
import React from 'react';
import { Logo } from '../common/Logo';
import { ScrollDownArrow } from '../common/ScrollDownArrow';
import { SocialLinks } from '../common/SocialLinks';

interface HeroSectionProps {
  title: string;
  subtitle?: string;
  tagline?: string;
  primaryCTA?: {
    text: string;
    onClick: () => void;
    ariaLabel?: string;
  };
  secondaryCTA?: {
    text: string;
    onClick: () => void;
    ariaLabel?: string;
  };
  backgroundImage?: string;
  overlay?: 'dark' | 'light' | 'gradient' | 'none';
  height?: 'screen' | 'large' | 'medium';
  alignment?: 'left' | 'center' | 'right';
  showScrollIndicator?: boolean;
  className?: string;
}

export function HeroSection({ 
  title,
  subtitle,
  tagline,
  primaryCTA,
  secondaryCTA,
  backgroundImage,
  overlay = 'gradient',
  height = 'screen',
  alignment = 'center',
  showScrollIndicator = true,
  className = ''
}: HeroSectionProps) {
  const heightClasses = {
    screen: 'min-h-screen',
    large: 'min-h-[80vh]',
    medium: 'min-h-[60vh]'
  };

  const alignmentClasses = {
    left: 'text-left items-start',
    center: 'text-center items-center',
    right: 'text-right items-end'
  };

  const overlayClasses = {
    dark: 'bg-black/50',
    light: 'bg-white/50',
    gradient: 'bg-gradient-to-b from-black/30 via-transparent to-white',
    none: ''
  };

  return (
    <section 
      className={`
        relative ${heightClasses[height]} 
        flex flex-col justify-center
        overflow-hidden
        ${className}
      `}
    >
      {/* Background Image */}
      {backgroundImage && (
        <>
          <div 
            className="absolute inset-0 bg-cover bg-center bg-no-repeat"
            style={{ backgroundImage: `url(${backgroundImage})` }}
            aria-hidden="true"
          />
          
          {/* Overlay */}
          {overlay !== 'none' && (
            <div 
              className={`absolute inset-0 ${overlayClasses[overlay]}`}
              aria-hidden="true"
            />
          )}
        </>
      )}
      
      {/* Content */}
      <div className={`
        relative z-10 
        max-w-7xl mx-auto px-6 py-fluid-xl w-full
        flex flex-col ${alignmentClasses[alignment]}
        gap-fluid-lg
      `}>
        {/* Logo (optional, for branding) */}
        <Logo 
          size="lg"
          className={alignment === 'center' ? 'mx-auto' : ''}
        />
        
        {/* Subtitle */}
        {subtitle && (
          <p className="text-fluid-lg font-body font-medium text-gray-700 tracking-wide uppercase">
            {subtitle}
          </p>
        )}
        
        {/* Main Title */}
        <h1 className="text-hero-h1 font-title font-bold text-gradient-pink-purple-blue leading-tight tracking-tight">
          {title}
        </h1>
        
        {/* Tagline */}
        {tagline && (
          <p className="text-body-guideline font-body text-gray-700 max-w-2xl leading-relaxed">
            {tagline}
          </p>
        )}
        
        {/* CTAs */}
        {(primaryCTA || secondaryCTA) && (
          <div className={`
            flex flex-col sm:flex-row gap-4 mt-fluid-md
            ${alignment === 'center' ? 'justify-center' : ''}
            ${alignment === 'right' ? 'justify-end' : ''}
          `}>
            {primaryCTA && (
              <button
                onClick={primaryCTA.onClick}
                aria-label={primaryCTA.ariaLabel || primaryCTA.text}
                className="bg-gradient-pink-purple-blue hover:from-purple-700 hover:to-pink-700 text-white px-button py-button font-body font-medium text-button-fluid rounded-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-pink-200 focus:ring-opacity-50"
              >
                {primaryCTA.text}
              </button>
            )}
            
            {secondaryCTA && (
              <button
                onClick={secondaryCTA.onClick}
                aria-label={secondaryCTA.ariaLabel || secondaryCTA.text}
                className="bg-white hover:bg-gray-50 text-gray-800 px-button py-button font-body font-medium text-button-fluid rounded-lg border-2 border-gray-300 hover:border-pink-500 shadow-md hover:shadow-lg transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-pink-200 focus:ring-opacity-50"
              >
                {secondaryCTA.text}
              </button>
            )}
          </div>
        )}
        
        {/* Social Links */}
        <SocialLinks 
          iconSize={24}
          className={`
            text-gray-600 mt-fluid-md
            ${alignment === 'center' ? 'justify-center' : ''}
          `}
        />
      </div>
      
      {/* Scroll Indicator */}
      {showScrollIndicator && (
        <ScrollDownArrow className="absolute bottom-8 left-1/2 -translate-x-1/2" />
      )}
    </section>
  );
}
```

---

## Usage Patterns

### Homepage Hero

```tsx
function HomePage() {
  const navigate = useNavigate();
  
  return (
    <>
      <HeroSection 
        title="Ash Shaw"
        subtitle="Makeup Artist"
        tagline="Makeup that shines with colour, energy, and connection."
        primaryCTA={{
          text: 'View Portfolio',
          onClick: () => navigate('/portfolio')
        }}
        secondaryCTA={{
          text: 'Get In Touch',
          onClick: () => scrollToContact()
        }}
        showScrollIndicator={true}
      />
      
      {/* Rest of homepage content */}
    </>
  );
}
```

### With Background Image

```tsx
<HeroSection 
  title="Ash Shaw"
  subtitle="UV & Neon Makeup Artist"
  tagline="Creating stunning looks for festivals, editorials, and special events."
  backgroundImage="/images/hero-festival-makeup.jpg"
  overlay="dark"
  primaryCTA={{
    text: 'Explore Portfolio',
    onClick: () => navigate('/portfolio')
  }}
/>
```

### Minimal Hero

```tsx
<HeroSection 
  title="Blog"
  tagline="Makeup tips, tutorials, and industry insights"
  height="medium"
  alignment="center"
  showScrollIndicator={false}
/>
```

### About Page Hero

```tsx
<HeroSection 
  title="About Me"
  subtitle="My Journey"
  tagline="From passion to profession - discover how makeup artistry became my calling."
  height="large"
  alignment="left"
  showScrollIndicator={false}
/>
```

---

## Advanced Features

### With Animated Entrance

> **Note:** This project uses pure CSS animations (never `motion/react`).
> The `animate-fade-in-up` class is defined in `/styles/globals.css`.

```tsx
<section className="hero">
  <div className="hero__content animate-fade-in-up">
    <h1 className="text-hero-h1 font-title text-gradient-pink-purple-blue">
      {title}
    </h1>
  </div>
</section>
```

### With Video Background

```tsx
<section className="relative min-h-screen">
  <video
    autoPlay
    loop
    muted
    playsInline
    className="absolute inset-0 w-full h-full object-cover"
  >
    <source src="/videos/hero-background.mp4" type="video/mp4" />
  </video>
  
  <div className="absolute inset-0 bg-black/40" />
  
  <div className="relative z-10 min-h-screen flex items-center justify-center">
    {/* Hero content */}
  </div>
</section>
```

### With Particles Effect

```tsx
import Particles from 'react-particles';

<section className="relative min-h-screen">
  <Particles className="absolute inset-0" options={particlesConfig} />
  
  <div className="relative z-10">
    {/* Hero content */}
  </div>
</section>
```

---

## Styling Variations

### Gradient Background

```tsx
<section className="min-h-screen bg-gradient-to-br from-pink-100 via-purple-50 to-blue-100">
  <HeroSection title="Ash Shaw" />
</section>
```

### Split Hero (Image + Content)

```tsx
<section className="min-h-screen grid grid-cols-1 lg:grid-cols-2">
  <div className="flex items-center justify-center p-fluid-xl">
    <div>
      <h1 className="text-hero-h1 font-title font-bold text-gradient-pink-purple-blue">
        Ash Shaw
      </h1>
      <p className="text-body-guideline font-body text-gray-700 mt-fluid-md">
        UV & neon makeup artist specialising in creative and festival looks
      </p>
    </div>
  </div>
  
  <div className="bg-cover bg-center" style={{ backgroundImage: 'url(/hero.jpg)' }} />
</section>
```

---

## Accessibility

### Semantic HTML

```tsx
<section 
  role="banner"
  aria-label="Page hero"
>
  <h1>{title}</h1>
  <p>{tagline}</p>
</section>
```

### Keyboard Navigation

```tsx
<button
  onClick={primaryCTA.onClick}
  onKeyDown={(e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      primaryCTA.onClick();
    }
  }}
  className="focus:outline-none focus:ring-4 focus:ring-pink-200 focus:ring-opacity-50"
>
  {primaryCTA.text}
</button>
```

### Background Image Alt

```tsx
{backgroundImage && (
  <div 
    role="img"
    aria-label="Hero background image showing makeup artistry"
    className="absolute inset-0 bg-cover bg-center"
    style={{ backgroundImage: `url(${backgroundImage})` }}
  />
)}
```

---

## Common Mistakes

### ❌ Mistake 1: Poor Text Contrast

```tsx
// ❌ WRONG - Text hard to read on background
<div className="bg-cover" style={{ backgroundImage: 'url(...)' }}>
  <h1 className="text-white">Title</h1>
</div>
```

**Solution:**
```tsx
// ✅ CORRECT - Add overlay for readability
<div className="relative">
  <div className="absolute inset-0 bg-cover" style={{ backgroundImage: 'url(...)' }} />
  <div className="absolute inset-0 bg-black/50" />
  <h1 className="relative z-10 text-white">Title</h1>
</div>
```

### ❌ Mistake 2: No Mobile Optimization

```tsx
// ❌ WRONG - Same size on all screens
<h1 className="text-9xl">Title</h1>
```

**Solution:**
```tsx
// ✅ CORRECT - Fluid typography
<h1 className="text-hero-h1">Title</h1>
```

---

## Related Components

- **[Logo](./Logo.md)** - Brand logo
- **[ScrollDownArrow](./ScrollDownArrow.md)** - Scroll indicator
- **[SocialLinks](./SocialLinks.md)** - Social media links

---

## Related Documentation

- **[Guidelines.md](../Guidelines.md)** - Main guidelines
- **[overview-components.md](../overview-components.md)** - Component system
- **[FILE_STRUCTURE.md](../FILE_STRUCTURE.md)** - File organization
- **[design-tokens/typography.md](../design-tokens/typography.md)** - Typography scale
- **[design-tokens/colors.md](../design-tokens/colors.md)** - Color system
- **[design-tokens/spacing.md](../design-tokens/spacing.md)** - Spacing system

---

## 🎨 Interactive Mermaid Diagrams

### Mermaid State Diagram (Hero Animation States)

```mermaid
stateDiagram-v2
    [*] --> Loading: Component mounts
    
    Loading --> ImagePreloading: Load hero images
    
    ImagePreloading --> Animating: Images ready
    
    Animating --> FadeIn: Fade in title
    FadeIn --> SlideUp: Slide up content
    SlideUp --> ScaleIn: Scale in buttons
    
    ScaleIn --> Interactive: All animations complete
    
    Interactive --> ButtonHover: User hovers CTA
    Interactive --> ScrollDown: User scrolls
    Interactive --> CTAClick: User clicks button
    
    ButtonHover --> Interactive: Mouse out
    
    CTAClick --> Navigating: Navigate to section
    
    ScrollDown --> Scrolling: Parallax effect
    Scrolling --> Interactive: Scroll stops
    
    note right of Loading
        Initial mount
        No content visible
    end note
    
    note right of Interactive
        Fully loaded
        All interactions active
        CTAs responsive
    end note
    
    note right of Scrolling
        Parallax on images
        Fade opacity on scroll
    end note
```

### Mermaid Flowchart (Hero CTA Logic)

```mermaid
flowchart TD
    A[Hero Renders] --> B{Has Primary CTA?}
    
    B -->|No| C[Show Title Only]
    B -->|Yes| D[Render Primary Button]
    
    D --> E{Has Secondary CTA?}
    
    E -->|No| F[Single Button Layout]
    E -->|Yes| G[Two Button Layout]
    
    F --> H[Center button]
    G --> I[Flex row sm:flex-col]
    
    H --> J{User Action?}
    I --> J
    
    J -->|Hover Primary| K[Scale 1.05 + Shadow XL]
    J -->|Hover Secondary| L[Border pink-500]
    J -->|Click Primary| M[Execute primaryCTA.onClick]
    J -->|Click Secondary| N[Execute secondaryCTA.onClick]
    
    K --> O[Transition 300ms]
    L --> O
    
    M --> P{Navigate or Action?}
    N --> P
    
    P -->|Navigate| Q[Scroll to section]
    P -->|External| R[Open modal/link]
    
    Q --> S[Smooth scroll behavior]
    R --> T[New window or overlay]
    
    style A fill:#e1f5ff,stroke:#01c3cc,stroke-width:2px
    style D fill:#dcfce7,stroke:#22c55e,stroke-width:2px
    style G fill:#fef3c7,stroke:#f59e0b,stroke-width:2px
    style M fill:#e1f5ff,stroke:#01c3cc,stroke-width:2px
    style N fill:#e1f5ff,stroke:#01c3cc,stroke-width:2px
```

### Mermaid Sequence Diagram (Hero Load Sequence)

```mermaid
sequenceDiagram
    participant U as User
    participant P as Page
    participant H as Hero Component
    participant I as Images
    participant A as Animations
    
    U->>P: Navigate to page
    P->>H: Mount Hero
    
    Note over H: Initial state: hidden
    
    H->>I: Preload hero images
    
    Note over I: Load 3 images<br/>(mobile, tablet, desktop)
    
    I-->>H: Images loaded
    
    H->>A: Start animation sequence
    
    Note over A: Step 1: Fade in
    A->>A: opacity 0 → 1 (500ms)
    
    Note over A: Step 2: Slide up
    A->>A: translateY(20px) → 0 (600ms)
    
    Note over A: Step 3: Scale buttons
    A->>A: scale(0.95) → 1 (400ms)
    
    A-->>H: Animations complete
    
    H->>U: Hero fully visible
    
    Note over H: All content displayed<br/>CTAs interactive
    
    U->>H: Scroll down
    H->>A: Apply parallax
    
    Note over A: opacity: 1 → 0.5<br/>translateY: 0 → 50px
    
    A->>U: Smooth scroll effect
```

---

**Last Updated:** January 2025  
**Version:** 4.0.0