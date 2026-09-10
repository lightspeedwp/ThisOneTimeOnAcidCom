# TestimonialCard Component

Client testimonial and review card with star ratings, client info, and quote styling.

## Purpose

Display client testimonials with:
- Client name and photo
- Star rating display
- Testimonial quote text
- Service type or date
- Responsive card layout
- Hover animations
- Accessibility compliance
- Optional verification badge

---

## Usage

### Basic Usage

```tsx
import { TestimonialCard } from './components/ui/TestimonialCard';

<TestimonialCard 
  testimonial={{
    name: "Sarah Johnson",
    text: "Ash created the most stunning festival look! The colors were vibrant and lasted all day.",
    rating: 5,
    service: "Festival Makeup"
  }}
/>
```

### With Photo

```tsx
<TestimonialCard 
  testimonial={{
    name: "Emma Williams",
    photo: "/images/clients/emma.jpg",
    text: "Professional, creative, and so talented. My wedding makeup was perfect!",
    rating: 5,
    service: "Wedding Makeup",
    date: "June 2024"
  }}
/>
```

### In Grid Layout

```tsx
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-fluid-md">
  {testimonials.map(testimonial => (
    <TestimonialCard 
      key={testimonial.id}
      testimonial={testimonial}
    />
  ))}
</div>
```

---

## Props

```typescript
interface TestimonialCardProps {
  /**
   * Testimonial data
   * @required
   */
  testimonial: Testimonial;
  
  /**
   * Show rating stars
   * @default true
   */
  showRating?: boolean;
  
  /**
   * Show client photo
   * @default true
   */
  showPhoto?: boolean;
  
  /**
   * Show verification badge
   * @default false
   */
  showVerified?: boolean;
  
  /**
   * Card variant
   * @default "default"
   */
  variant?: 'default' | 'minimal' | 'featured';
  
  /**
   * Additional CSS classes
   * @default ""
   */
  className?: string;
}

interface Testimonial {
  id: string;
  name: string;
  photo?: string;
  text: string;
  rating: 1 | 2 | 3 | 4 | 5;
  service?: string;
  date?: string;
  verified?: boolean;
  location?: string;
}
```

---

## Features

### Star Rating Display

```tsx
const StarRating = ({ rating }: { rating: number }) => {
  return (
    <div className="flex items-center gap-1">
      {[1, 2, 3, 4, 5].map(star => (
        <Star
          key={star}
          className={`w-5 h-5 ${
            star <= rating
              ? 'fill-yellow-400 text-yellow-400'
              : 'text-gray-300'
          }`}
        />
      ))}
    </div>
  );
};
```

### Quote Styling

```tsx
<blockquote className="relative">
  <span className="absolute -top-4 -left-2 text-6xl text-pink-200 font-serif">
    "
  </span>
  <p className="relative z-10 text-body-guideline font-body text-gray-700 italic">
    {testimonial.text}
  </p>
</blockquote>
```

### Client Avatar

```tsx
{testimonial.photo ? (
  <img
    src={testimonial.photo}
    alt={testimonial.name}
    className="w-16 h-16 rounded-full object-cover border-2 border-pink-200"
  />
) : (
  <div className="w-16 h-16 rounded-full bg-gradient-pink-purple-blue flex items-center justify-center text-white font-heading font-bold text-fluid-xl">
    {testimonial.name.charAt(0)}
  </div>
)}
```

---

## Implementation Example

Complete testimonial card implementation:

```tsx
import React from 'react';
import { Star, CheckCircle } from '@phosphor-icons/react';

interface TestimonialCardProps {
  testimonial: Testimonial;
  showRating?: boolean;
  showPhoto?: boolean;
  showVerified?: boolean;
  variant?: 'default' | 'minimal' | 'featured';
  className?: string;
}

interface Testimonial {
  id: string;
  name: string;
  photo?: string;
  text: string;
  rating: 1 | 2 | 3 | 4 | 5;
  service?: string;
  date?: string;
  verified?: boolean;
  location?: string;
}

export function TestimonialCard({ 
  testimonial,
  showRating = true,
  showPhoto = true,
  showVerified = false,
  variant = 'default',
  className = ''
}: TestimonialCardProps) {
  const isFeatured = variant === 'featured';
  const isMinimal = variant === 'minimal';

  return (
    <article
      className={`
        bg-white/80 backdrop-blur-sm rounded-2xl 
        p-fluid-lg
        border border-white/50 shadow-lg hover:shadow-2xl
        transition-all duration-300
        ${isFeatured ? 'border-2 border-pink-500' : ''}
        ${className}
      `}
    >
      {/* Header: Photo + Name + Rating */}
      <div className="flex items-start gap-4 mb-fluid-md">
        {/* Client Photo */}
        {showPhoto && (
          <div className="flex-shrink-0">
            {testimonial.photo ? (
              <img
                src={testimonial.photo}
                alt={`${testimonial.name}'s photo`}
                className={`
                  rounded-full object-cover border-2 border-pink-200
                  ${isFeatured ? 'w-20 h-20' : 'w-16 h-16'}
                `}
              />
            ) : (
              <div className={`
                rounded-full bg-gradient-pink-purple-blue 
                flex items-center justify-center 
                text-white font-heading font-bold
                ${isFeatured ? 'w-20 h-20 text-fluid-2xl' : 'w-16 h-16 text-fluid-xl'}
              `}>
                {testimonial.name.charAt(0)}
              </div>
            )}
          </div>
        )}
        
        {/* Name + Info */}
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-1">
            <h3 className="text-fluid-lg font-heading font-semibold text-gray-800">
              {testimonial.name}
            </h3>
            
            {showVerified && testimonial.verified && (
              <CheckCircle className="w-5 h-5 text-blue-500 fill-blue-100" />
            )}
          </div>
          
          {/* Service/Location */}
          <div className="flex flex-wrap items-center gap-2 text-fluid-sm text-gray-600">
            {testimonial.service && (
              <span className="font-body">{testimonial.service}</span>
            )}
            
            {testimonial.service && testimonial.location && (
              <span>•</span>
            )}
            
            {testimonial.location && (
              <span className="font-body">{testimonial.location}</span>
            )}
          </div>
          
          {/* Date */}
          {testimonial.date && (
            <time className="text-fluid-xs text-gray-500 font-body">
              {testimonial.date}
            </time>
          )}
        </div>
      </div>
      
      {/* Star Rating */}
      {showRating && (
        <div className="flex items-center gap-1 mb-fluid-md">
          {[1, 2, 3, 4, 5].map(star => (
            <Star
              key={star}
              className={`
                ${isFeatured ? 'w-6 h-6' : 'w-5 h-5'}
                ${star <= testimonial.rating
                  ? 'fill-yellow-400 text-yellow-400'
                  : 'text-gray-300'
                }
              `}
            />
          ))}
        </div>
      )}
      
      {/* Testimonial Text */}
      <blockquote className="relative">
        {!isMinimal && (
          <span className="absolute -top-4 -left-2 text-6xl text-pink-200 font-serif leading-none">
            "
          </span>
        )}
        
        <p className={`
          relative z-10 
          text-body-guideline font-body text-gray-700 
          ${isMinimal ? '' : 'italic'}
          leading-relaxed
        `}>
          {testimonial.text}
        </p>
        
        {!isMinimal && (
          <span className="absolute -bottom-8 -right-2 text-6xl text-pink-200 font-serif leading-none">
            "
          </span>
        )}
      </blockquote>
    </article>
  );
}
```

---

## Usage Patterns

### Testimonials Section

```tsx
function TestimonialsSection() {
  const testimonials = [
    {
      id: '1',
      name: 'Sarah Johnson',
      photo: '/images/clients/sarah.jpg',
      text: 'Ash created the most stunning festival look! The colors were vibrant and lasted all day.',
      rating: 5,
      service: 'Festival Makeup',
      date: 'August 2024',
      verified: true
    },
    // More testimonials...
  ];
  
  return (
    <section className="py-section bg-gray-50">
      <div className="max-w-7xl mx-auto px-6">
        <h2 className="text-section-h2 font-heading font-semibold text-center mb-fluid-md">
          What Clients Say
        </h2>
        
        <p className="text-body-guideline font-body text-gray-600 text-center mb-fluid-xl max-w-2xl mx-auto">
          Don't just take my word for it - here's what my clients have to say about their experience
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-fluid-md">
          {testimonials.map(testimonial => (
            <TestimonialCard
              key={testimonial.id}
              testimonial={testimonial}
              showVerified={true}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
```

### Featured Testimonial

```tsx
<div className="max-w-4xl mx-auto">
  <TestimonialCard 
    testimonial={featuredTestimonial}
    variant="featured"
    showRating={true}
    showPhoto={true}
    showVerified={true}
  />
</div>
```

### Testimonial Carousel

```tsx
import { useState } from 'react';
import { CaretLeft, CaretRight } from '@phosphor-icons/react';

function TestimonialCarousel({ testimonials }: Props) {
  const [currentIndex, setCurrentIndex] = useState(0);
  
  const next = () => {
    setCurrentIndex((prev) => 
      prev === testimonials.length - 1 ? 0 : prev + 1
    );
  };
  
  const previous = () => {
    setCurrentIndex((prev) => 
      prev === 0 ? testimonials.length - 1 : prev - 1
    );
  };
  
  return (
    <div className="relative max-w-4xl mx-auto">
      <TestimonialCard 
        testimonial={testimonials[currentIndex]}
        variant="featured"
      />
      
      <div className="flex justify-center gap-4 mt-fluid-md">
        <button
          onClick={previous}
          className="w-12 h-12 rounded-full bg-white border border-gray-300 flex items-center justify-center hover:bg-gray-50"
          aria-label="Previous testimonial"
        >
          <CaretLeft className="w-5 h-5" />
        </button>
        
        <button
          onClick={next}
          className="w-12 h-12 rounded-full bg-white border border-gray-300 flex items-center justify-center hover:bg-gray-50"
          aria-label="Next testimonial"
        >
          <CaretRight className="w-5 h-5" />
        </button>
      </div>
      
      {/* Indicators */}
      <div className="flex justify-center gap-2 mt-4">
        {testimonials.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`
              w-2 h-2 rounded-full transition-all
              ${index === currentIndex ? 'bg-pink-500 w-6' : 'bg-gray-300'}
            `}
            aria-label={`Go to testimonial ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
```

### Minimal List View

```tsx
<div className="space-y-fluid-md">
  {testimonials.map(testimonial => (
    <TestimonialCard
      key={testimonial.id}
      testimonial={testimonial}
      variant="minimal"
      showPhoto={false}
    />
  ))}
</div>
```

---

## Advanced Features

### With External Link

```tsx
<TestimonialCard testimonial={testimonial}>
  <a 
    href={testimonial.reviewUrl}
    target="_blank"
    rel="noopener noreferrer"
    className="text-fluid-sm text-pink-600 hover:text-pink-700 font-body font-medium mt-fluid-sm inline-flex items-center gap-1"
  >
    View full review
    <ExternalLink className="w-4 h-4" />
  </a>
</TestimonialCard>
```

### With Social Proof

```tsx
<div className="flex items-center gap-2 text-fluid-sm text-gray-600 mt-fluid-sm">
  <Instagram className="w-4 h-4" />
  <span className="font-body">Posted on Instagram</span>
</div>
```

### Average Rating Display

```tsx
function TestimonialsWithAverage({ testimonials }: Props) {
  const averageRating = testimonials.reduce((sum, t) => sum + t.rating, 0) / testimonials.length;
  
  return (
    <section className="py-section">
      <div className="text-center mb-fluid-xl">
        <div className="inline-flex items-center gap-2 bg-white/80 backdrop-blur-sm rounded-full px-6 py-3 shadow-lg">
          <Star className="w-6 h-6 fill-yellow-400 text-yellow-400" />
          <span className="text-fluid-2xl font-heading font-bold text-gray-800">
            {averageRating.toFixed(1)}
          </span>
          <span className="text-fluid-sm text-gray-600">
            ({testimonials.length} reviews)
          </span>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-fluid-md">
        {testimonials.map(testimonial => (
          <TestimonialCard key={testimonial.id} testimonial={testimonial} />
        ))}
      </div>
    </section>
  );
}
```

---

## Accessibility

### Semantic HTML

```tsx
<article>
  <figure>
    <img src={photo} alt={`${name}'s photo`} />
  </figure>
  
  <blockquote cite={reviewUrl}>
    <p>{text}</p>
    <footer>
      <cite>{name}</cite>
    </footer>
  </blockquote>
  
  <div role="img" aria-label={`Rating: ${rating} out of 5 stars`}>
    {/* Star icons */}
  </div>
</article>
```

### Screen Reader Support

```tsx
<div 
  role="img" 
  aria-label={`${rating} out of 5 stars`}
  className="flex gap-1"
>
  {[1, 2, 3, 4, 5].map(star => (
    <Star
      key={star}
      aria-hidden="true"
      className={star <= rating ? 'fill-yellow-400' : 'text-gray-300'}
    />
  ))}
</div>
```

---

## Common Mistakes

### ❌ Mistake 1: Missing Alt Text

```tsx
// ❌ WRONG
<img src={photo} />
```

**Solution:**
```tsx
// ✅ CORRECT
<img 
  src={photo}
  alt={`${name}'s testimonial photo`}
/>
```

### ❌ Mistake 2: Static Star Icons

```tsx
// ❌ WRONG - All stars same color
{[1,2,3,4,5].map(star => <Star className="text-yellow-400" />)}
```

**Solution:**
```tsx
// ✅ CORRECT - Dynamic based on rating
{[1,2,3,4,5].map(star => (
  <Star className={star <= rating ? 'fill-yellow-400' : 'text-gray-300'} />
))}
```

### ❌ Mistake 3: No Quote Marks

```tsx
// ❌ WRONG - Looks like regular text
<p>{testimonial.text}</p>
```

**Solution:**
```tsx
// ✅ CORRECT - Clear quote styling
<blockquote className="relative italic">
  <span className="text-pink-200 text-6xl">"</span>
  <p>{testimonial.text}</p>
</blockquote>
```

---

## Related Components

- **[SectionCard](./SectionCard.md)** - Generic content card
- **[PortfolioCard](./PortfolioCard.md)** - Portfolio items
- **[BlogCard](./BlogCard.md)** - Blog posts

---

## Related Documentation

- **[Guidelines.md](../Guidelines.md)** - Main guidelines
- **[design-tokens/spacing.md](../design-tokens/spacing.md)** - Spacing system
- **[design-tokens/colors.md](../design-tokens/colors.md)** - Color system

---

**Last Updated:** January 2025  
**Version:** 3.2.0