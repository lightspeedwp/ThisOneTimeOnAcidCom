# N023: README - Getting Started

**Document ID:** N023  
**Category:** Pages (README)  
**Authority:** D4 (N-Document Approvals); D1 (Canonical Voice)  
**Last Updated:** 2026-11-09

## Purpose

Provide the canonical README landing page that introduces ThisOneTimeOnAcidCom to new visitors, establishing brand voice and guiding entry points.

## Page Structure

### Header / Hero Section

```markdown
# This One Time On Acid

A Memoir of Music, Psychedelics, and Transformation

**[Read the Book] [Learn About Festival] [Join Community]**
```

### Value Proposition Section

Three core benefits with icons:

```markdown
## Why Read This Book?

**Immersive Storytelling**
Vivid scenes and introspection woven through lived experience,
from Koh Phangan jungle to inner landscapes of consciousness.

**Authentic Voice**
Raw, first-person narrative without pretense. Honest exploration
of psychedelic experience, festival culture, and personal growth.

**Transformative Insights**
Thoughtful reflection on meaning-making, consciousness, and
what it means to seek authenticity. Relevant whether experienced
or curious about psychedelics.
```

### Featured Content

```markdown
## Featured From The Journal

[Journal Preview Card]
[Journal Preview Card]
[Journal Preview Card]
```

### Book Overview

```markdown
## About The Book

*This One Time On Acid* is a 200+ page memoir documenting a
transformative journey through music, psychedelics, and
festival culture. Through vivid storytelling and introspective
reflection, the author explores consciousness, authenticity,
and personal transformation.

Ideal for readers seeking:
- Authentic personal narratives
- Thoughtful exploration of psychedelic experience
- Cultural commentary on festival culture
- Reflection on consciousness and meaning

**[Read the Full Story] [About the Author]**
```

### Reading Guide

```markdown
## How to Read

### For First-Time Visitors
1. Explore the Hero section to understand the book's themes
2. Browse featured journal entries for insight into the author's voice
3. Read the book overview to decide if it resonates
4. [Start Reading] when ready

### For Returning Readers
- [Continue Where You Left Off]
- [View Your Reading Progress]
- [Access Your Saved Entries]

### Navigation
- [View Full Book] — Complete manuscript
- [Read Journal] — Reflections and behind-the-scenes
- [About the Author] — Author bio and context
- [FAQ] — Common questions answered
```

## Responsive Design

### Desktop (1025px+)

- Full hero image at 16:9 aspect ratio
- 3-column benefit grid
- Featured content in 3-column grid
- Sidebar with quick links

### Tablet (641px-1024px)

- Hero image at 8:5 aspect ratio
- 2-column benefit grid
- Featured content in 2-column grid
- No sidebar (content flows)

### Mobile (320px-640px)

- Hero image full width, 2:1 aspect ratio
- 1-column stacked benefits
- Featured content cards stacked
- Bottom navigation

## Content Guidelines

### Voice & Tone (D1: Balanced Hybrid)

✅ **Conversational + Professional**
- Write as if speaking to an intelligent friend
- Mix poetic language with practical clarity
- Balance enthusiasm with honesty
- Acknowledge complexity without jargon

✅ **Authentic + Inviting**
- Speak from lived experience
- Acknowledge different perspectives
- Invite exploration, don't demand
- Respect reader intelligence

### Sections to Include

1. **Hero Section** — Immediate brand clarity
2. **Value Proposition** — Why read this book?
3. **Featured Content** — Social proof + engagement
4. **Book Overview** — Content summary
5. **Reading Guide** — Navigation for different visitor types
6. **Call-to-Action** — Primary engagement button
7. **Footer** — Secondary navigation, legal links

### Sections NOT to Include

❌ Stock marketing copy ("Transform your life!")  
❌ Fake testimonials or made-up reviews  
❌ Sensationalized claims about psychedelics  
❌ Disclaimer language on hero (belongs in footer)

## SEO Specifications

```html
<!-- Title: 50-60 characters -->
<title>This One Time On Acid — A Memoir</title>

<!-- Meta Description: 150-160 characters -->
<meta name="description" 
      content="A memoir of music, psychedelics, and transformation. 
               Vivid storytelling. Authentic voice. Transformative insights.">

<!-- Open Graph -->
<meta property="og:title" content="This One Time On Acid">
<meta property="og:description" content="A memoir of music, psychedelics...">
<meta property="og:image" content="/og-image.jpg">

<!-- Schema.org Book -->
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "Book",
  "name": "This One Time On Acid",
  "author": { "@type": "Person", "name": "Ashley" },
  "description": "A memoir of music, psychedelics, and transformation"
}
</script>
```

## Accessibility Standards (D3: WCAG 2.2 AAA)

- Heading hierarchy: h1 (page title), h2 (sections), h3 (subsections)
- Image alt text on all images
- Focus visible on all interactive elements
- Color contrast ≥7:1 for heading text
- Skip link to main content
- No auto-playing video
- Keyboard navigation fully supported
- Screen reader tested

## Performance Targets

- LCP (Largest Contentful Paint): ≤2.5s
- FID (First Input Delay): ≤100ms
- CLS (Cumulative Layout Shift): ≤0.1
- Hero image: <200KB (WebP)
- Full page load: <3s on 3G

## Tracking Events

- Hero CTA clicks (Read the Book, Learn About Festival)
- Featured entry clicks
- Navigation clicks
- Scroll depth (25%, 50%, 75%, 100%)

## Related Pages

- **N024:** Book Home (book detail page)
- **N025:** Sitemap (navigation reference)
- **N020:** Hero Pattern (hero section implementation)
- **N021:** Value Proposition (benefits grid)
- **N022:** Journal Preview (featured entries)

## Implementation Notes

- Use N020 Hero Pattern for hero section
- Use N021 Value Proposition Pattern for benefits
- Use N022 Journal Preview Pattern for featured content
- Next.js page: `app/page.tsx`
- Dynamic metadata via `generateMetadata()`
- Responsive images with `next/image`

## See Also

- Guidelines.md: Writing style and voice
- N001: Design Token Reference (colors, fonts)
- N012: Performance Optimization
- D1 Decision: Canonical Voice
