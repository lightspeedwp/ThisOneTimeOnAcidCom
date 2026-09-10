# SocialLinks Component

**Version:** 4.0.0  
**Last Updated:** January 2025

Social media link buttons with consistent styling and accessibility features.

## Purpose

Provide social media navigation with:
- Instagram, Facebook, TikTok, LinkedIn, Email integration
- Hover animations and visual feedback
- Customizable icon sizes and colors
- Accessibility compliance
- Responsive layout
- External link handling

---

## Component Architecture

### Social Link Click Flow (Mermaid)

```mermaid
sequenceDiagram
    participant U as User
    participant S as SocialLinks
    participant D as Mock Data
    participant B as Browser
    participant E as External Platform
    
    Note over S: Component Mounts
    S->>D: Import socialLinks
    D-->>S: Return 5 platforms<br/>(Instagram, Facebook, TikTok,<br/>LinkedIn, Email)
    
    S-->>U: Render social icons with gradients
    
    U->>S: Hover over Instagram icon
    S->>S: Apply hover styles<br/>(scale-110, shadow-xl)
    S-->>U: Visual feedback ✨
    
    U->>S: Click Instagram link
    S->>S: Check target attribute
    
    alt External Link (_blank)
        S->>B: Open in new tab
        B->>E: Navigate to Instagram
        E-->>U: Show Ash Shaw profile ✅
    else Email Link (_self)
        S->>B: Open default mail app
        B-->>U: Compose email to ashley@ashshaw.makeup ✅
    end
```

### Platform-Specific Gradient Logic (Mermaid)

```mermaid
flowchart TD
    A[Render SocialLinks] --> B[Load socialLinks data]
    
    B --> C[Map over platforms]
    
    C --> D{Which Platform?}
    
    D -->|Instagram| E[Instagram Gradient<br/>#e1306c → #fd1d1d → #fcaf45]
    D -->|Facebook| F[Facebook Gradient<br/>#1877f2 → #42a5f5]
    D -->|TikTok| G[TikTok Gradient<br/>#000000 → #69C9D0]
    D -->|LinkedIn| H[LinkedIn Gradient<br/>#0077b5 → #00a0dc]
    D -->|Email| I[Email Gradient<br/>#10b981 → #059669]
    
    E --> J[Apply gradient + white icon]
    F --> J
    G --> J
    H --> J
    I --> J
    
    J --> K[Render Icon Button]
    
    K --> L{User Interaction?}
    
    L -->|Hover| M[Scale to 110%<br/>Increase shadow]
    L -->|Click| N[Navigate to platform]
    L -->|Focus| O[Show focus ring]
    
    M --> P[Visual Feedback]
    N --> Q[Open link]
    O --> P
    
    style E fill:#fed7aa,stroke:#f97316,stroke-width:2px
    style F fill:#dbeafe,stroke:#3b82f6,stroke-width:2px
    style H fill:#e0f2fe,stroke:#0ea5e9,stroke-width:2px
    style I fill:#dcfce7,stroke:#22c55e,stroke-width:2px
```

### External Link Safety (Mermaid)

```mermaid
flowchart TD
    A[User Clicks Social Link] --> B{Is Email?}
    
    B -->|Yes| C[Email Link]
    B -->|No| D[External Link]
    
    C --> E[Set target='_self']
    C --> F[No rel attribute]
    C --> G[Opens mail app]
    G --> H[User composes email ✅]
    
    D --> I[Set target='_blank']
    D --> J[Add rel='noopener noreferrer']
    
    J --> K[Prevents Security Issues]
    
    K --> L[noopener:<br/>Prevents window.opener access]
    K --> M[noreferrer:<br/>No referrer info sent]
    
    I --> N[Opens in new tab]
    N --> O[Navigate to platform]
    
    L --> P[Secure Navigation ✅]
    M --> P
    
    style E fill:#dcfce7,stroke:#22c55e,stroke-width:2px
    style I fill:#fef3c7,stroke:#f59e0b,stroke-width:2px
    style K fill:#e0e7ff,stroke:#6366f1,stroke-width:2px
    style P fill:#dcfce7,stroke:#22c55e,stroke-width:3px
```

### Responsive Layout States (Mermaid)

```mermaid
stateDiagram-v2
    [*] --> Desktop: Screen > 1024px
    [*] --> Tablet: Screen 768-1023px
    [*] --> Mobile: Screen < 768px
    
    Desktop --> FooterRow: Footer context
    Desktop --> HeaderRow: Header context
    Desktop --> AboutGrid: About page
    
    FooterRow --> HorizontalLayout: gap-fluid-md (16px)
    HeaderRow --> HorizontalLayout
    AboutGrid --> FlexWrap: gap-fluid-lg (24px)
    
    HorizontalLayout --> IconSize48: w-12 h-12 (48px)
    FlexWrap --> IconSize48
    
    Tablet --> FooterRow
    Tablet --> AboutGrid
    
    Mobile --> FooterRow: Stack vertically
    Mobile --> MobileCentered: Center aligned
    
    MobileCentered --> IconSize40: w-10 h-10 (40px)
    
    note right of IconSize48
        Desktop & Tablet:
        - 48×48px icons
        - Full gradient visibility
        - Hover effects
    end note
    
    note right of IconSize40
        Mobile:
        - 40×40px icons
        - Touch-friendly (44px min)
        - Tap feedback
    end note
```

---

## 📦 Data Source

Social links are managed in the **centralized mock data system**.

### Import Pattern

```typescript
// Recommended: Main barrel export
import { socialLinks } from '@/data/mock';

// Or category-specific import
import { socialLinks } from '@/data/mock/ui/social-links';

// Type import
import type { SocialLink } from '@/data/types';
```

### Available Platforms

The project includes **5 social media platforms**:

| Platform | Icon | URL | Priority | Target |
|----------|------|-----|----------|--------|
| **Instagram** | `Instagram` | `https://instagram.com/ashshawmakeup` | Primary | `_blank` |
| **Facebook** | `Facebook` | `https://facebook.com/ashshawmakeup` | Secondary | `_blank` |
| **TikTok** | `Music` | `https://tiktok.com/@ashshawmakeup` | Secondary | `_blank` |
| **LinkedIn** | `LinkedinLogo` | `https://linkedin.com/in/ashshaw` | Tertiary | `_blank` |
| **Email** | `Mail` | `mailto:ashley@ashshaw.makeup` | Contact | - |

**Note:** LinkedIn uses the `LinkedinLogo` icon from @phosphor-icons/react (verified).

### Data Structure

```typescript
export interface SocialLink {
  platform: string;      // e.g., "instagram", "facebook"
  url: string;          // Full URL or mailto link
  icon: string;         // Phosphor icon name
  label: string;        // Accessible label (e.g., "Follow us on Instagram")
  primary?: boolean;    // Featured/priority link
}
```

**Data location:** `/data/mock/ui/social-links.ts`

### Usage in Components

```typescript
import { socialLinks } from '@/data/mock';

export function Footer() {
  return (
    <div className="flex gap-4">
      {socialLinks.map((link) => {
        const Icon = Icons[link.icon]; // Dynamic icon lookup
        
        return (
          <a
            key={link.platform}
            href={link.url}
            target={link.platform !== 'email' ? '_blank' : undefined}
            rel={link.platform !== 'email' ? 'noopener noreferrer' : undefined}
            aria-label={link.label}
            className="text-gray-600 hover:text-pink-500 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-pink-200 rounded-lg p-2"
          >
            <Icon className="w-6 h-6" />
          </a>
        );
      })}
    </div>
  );
}
```

### Updating Social Links

**To add, remove, or modify social links:**

1. Edit `/data/mock/ui/social-links.ts`
2. Update the `socialLinks` array
3. Verify icon exists in @phosphor-icons/react (see [overview-icons.md](../overview-icons.md))
4. Test changes across all components

**Example:**
```typescript
export const socialLinks: SocialLink[] = [
  {
    platform: 'instagram',
    url: 'https://instagram.com/ashshawmakeup',
    icon: 'Instagram',
    label: 'Follow us on Instagram',
    primary: true
  },
  // Add new platform
  {
    platform: 'twitter',
    url: 'https://twitter.com/ashshawmakeup',
    icon: 'Twitter',
    label: 'Follow us on Twitter'
  }
];
```

**See [Data System](../../data/README.md) for complete mock data documentation.**

---

## Usage

### Basic Usage

```tsx
import { SocialLinks } from './components/common/SocialLinks';

<SocialLinks />
```

### With Custom Styling

```tsx
<SocialLinks 
  iconSize={24}
  className="text-white hover:text-pink-300"
/>
```

### Custom Layout

```tsx
<SocialLinks 
  layout="vertical"
  showLabels={true}
  iconSize={20}
/>
```

---

## Props

```typescript
interface SocialLinksProps {
  /**
   * Icon size in pixels
   * @default 20
   */
  iconSize?: number;
  
  /**
   * Layout orientation
   * @default "horizontal"
   */
  layout?: 'horizontal' | 'vertical';
  
  /**
   * Show platform labels
   * @default false
   */
  showLabels?: boolean;
  
  /**
   * Additional CSS classes
   * @default ""
   */
  className?: string;
  
  /**
   * Platforms to display
   * @default all platforms
   */
  platforms?: SocialPlatform[];
  
  /**
   * Custom platform URLs
   * @optional (uses default URLs)
   */
  customUrls?: Partial<Record<SocialPlatform, string>>;
}

type SocialPlatform = 'instagram' | 'facebook' | 'tiktok' | 'linkedin' | 'email';
```

---

## Social Platform Configuration

```typescript
const SOCIAL_LINKS = {
  instagram: {
    url: 'https://instagram.com/ashshawmakeup',
    label: 'Instagram',
    icon: InstagramLogo,
    color: 'text-pink-600 hover:text-pink-700'
  },
  facebook: {
    url: 'https://facebook.com/ashshawmakeup',
    label: 'Facebook',
    icon: FacebookLogo,
    color: 'text-blue-600 hover:text-blue-700'
  },
  tiktok: {
    url: 'https://tiktok.com/@ashshawmakeup',
    label: 'TikTok',
    icon: MusicNotes, // TikTok icon alternative
    color: 'text-gray-900 hover:text-pink-500'
  },
  linkedin: {
    url: 'https://linkedin.com/in/ashshaw',
    label: 'LinkedIn',
    icon: LinkedinLogo,
    color: 'text-blue-600 hover:text-blue-700'
  },
  email: {
    url: 'mailto:ashley@ashshaw.makeup',
    label: 'Email',
    icon: Envelope,
    color: 'text-gray-600 hover:text-pink-500'
  }
};
```

---

## Implementation Example

Complete social links implementation:

```tsx
import React from 'react';
import { InstagramLogo, FacebookLogo, MusicNotes, LinkedinLogo, Envelope } from '@phosphor-icons/react';

interface SocialLinksProps {
  iconSize?: number;
  layout?: 'horizontal' | 'vertical';
  showLabels?: boolean;
  className?: string;
  platforms?: SocialPlatform[];
}

type SocialPlatform = 'instagram' | 'facebook' | 'tiktok' | 'linkedin' | 'email';

const SOCIAL_LINKS = {
  instagram: {
    url: 'https://instagram.com/ashshawmakeup',
    label: 'Instagram',
    icon: InstagramLogo,
    color: 'text-pink-600 hover:text-pink-700'
  },
  facebook: {
    url: 'https://facebook.com/ashshawmakeup',
    label: 'Facebook',
    icon: FacebookLogo,
    color: 'text-blue-600 hover:text-blue-700'
  },
  tiktok: {
    url: 'https://tiktok.com/@ashshawmakeup',
    label: 'TikTok',
    icon: MusicNotes,
    color: 'text-gray-900 hover:text-pink-500'
  },
  linkedin: {
    url: 'https://linkedin.com/in/ashshaw',
    label: 'LinkedIn',
    icon: LinkedinLogo,
    color: 'text-blue-600 hover:text-blue-700'
  },
  email: {
    url: 'mailto:ashley@ashshaw.makeup',
    label: 'Email',
    icon: Envelope,
    color: 'text-gray-600 hover:text-pink-500'
  }
};

export function SocialLinks({ 
  iconSize = 20,
  layout = 'horizontal',
  showLabels = false,
  className = '',
  platforms = ['instagram', 'facebook', 'tiktok', 'linkedin', 'email']
}: SocialLinksProps) {
  return (
    <div 
      className={`
        flex 
        ${layout === 'horizontal' ? 'flex-row items-center gap-4' : 'flex-col items-start gap-3'}
        ${className}
      `}
      role="navigation"
      aria-label="Social media links"
    >
      {platforms.map(platform => {
        const social = SOCIAL_LINKS[platform];
        const Icon = social.icon;
        
        return (
          <a
            key={platform}
            href={social.url}
            target={platform !== 'email' ? '_blank' : undefined}
            rel={platform !== 'email' ? 'noopener noreferrer' : undefined}
            aria-label={`Visit Ash Shaw on ${social.label}`}
            className={`
              flex items-center gap-2
              transition-all duration-300
              ${social.color}
              ${showLabels ? '' : 'hover:scale-110'}
              focus:outline-none focus:ring-2 focus:ring-pink-200 focus:ring-opacity-50 rounded-lg p-1
            `}
          >
            <Icon size={iconSize} />
            
            {showLabels && (
              <span className="text-fluid-sm font-body font-medium">
                {social.label}
              </span>
            )}
          </a>
        );
      })}
    </div>
  );
}
```

---

## Usage Patterns

### Footer Social Links

```tsx
<footer className="bg-gray-900 text-white py-fluid-xl px-6">
  <div className="max-w-7xl mx-auto">
    <div className="text-center mb-fluid-md">
      <h3 className="text-fluid-lg font-heading font-semibold mb-fluid-sm">
        Follow Me
      </h3>
      
      <SocialLinks 
        iconSize={24}
        className="justify-center text-white hover:text-pink-300"
      />
    </div>
  </div>
</footer>
```

### Hero Section Social Links

```tsx
<section className="py-section text-center">
  <h1 className="text-hero-h1 font-title font-bold text-gradient-pink-purple-blue mb-fluid-md">
    Ash Shaw
  </h1>
  
  <p className="text-fluid-lg font-body text-gray-700 mb-fluid-lg">
    Makeup Artist | Brisbane, Australia
  </p>
  
  <SocialLinks 
    iconSize={28}
    className="justify-center text-gray-700"
  />
</section>
```

### Sidebar with Labels

```tsx
<aside className="bg-white/80 backdrop-blur-sm rounded-2xl p-fluid-lg">
  <h3 className="text-fluid-lg font-heading font-semibold mb-fluid-md">
    Connect With Me
  </h3>
  
  <SocialLinks 
    layout="vertical"
    showLabels={true}
    iconSize={20}
    className="text-gray-700"
  />
</aside>
```

### Contact Page

```tsx
<section className="py-section px-6">
  <div className="max-w-4xl mx-auto text-center">
    <h2 className="text-section-h2 font-heading font-semibold mb-fluid-md">
      Get In Touch
    </h2>
    
    <p className="text-body-guideline font-body text-gray-700 mb-fluid-lg">
      Reach out through any of these platforms
    </p>
    
    <SocialLinks 
      iconSize={32}
      className="justify-center gap-6"
    />
  </div>
</section>
```

---

## Advanced Patterns

### With Custom Platform URLs

```tsx
<SocialLinks 
  customUrls={{
    instagram: 'https://instagram.com/custom-handle',
    email: 'mailto:custom@email.com'
  }}
/>
```

### Circular Button Style

```tsx
<div className="flex gap-3">
  {['instagram', 'facebook', 'tiktok'].map(platform => (
    <a
      key={platform}
      href={SOCIAL_LINKS[platform].url}
      className="w-12 h-12 rounded-full bg-gradient-pink-purple-blue flex items-center justify-center text-white hover:shadow-xl transition-all hover:scale-110"
      aria-label={SOCIAL_LINKS[platform].label}
    >
      {React.createElement(SOCIAL_LINKS[platform].icon, { size: 20 })}
    </a>
  ))}
</div>
```

### With Share Count (if available)

```tsx
<div className="flex items-center gap-2">
  <a href={SOCIAL_LINKS.instagram.url} className="flex items-center gap-2">
    <InstagramLogo size={20} />
    <span className="text-fluid-sm font-body">
      12.5k followers
    </span>
  </a>
</div>
```

### Animated on Hover

```tsx
<a
  href={social.url}
  className="group relative"
>
  <div className="absolute inset-0 bg-pink-500/20 rounded-full scale-0 group-hover:scale-100 transition-transform duration-300" />
  
  <Icon 
    size={24}
    className="relative z-10 transition-transform group-hover:scale-110"
  />
</a>
```

---

## Accessibility

### External Link Handling

```tsx
<a
  href={url}
  target="_blank"
  rel="noopener noreferrer"
  aria-label="Visit Ash Shaw on Instagram (opens in new tab)"
>
  <InstagramLogo />
</a>
```

### Navigation Landmark

```tsx
<nav aria-label="Social media links">
  <ul className="flex gap-4">
    <li>
      <a href={instagram} aria-label="Instagram">
        <InstagramLogo />
      </a>
    </li>
  </ul>
</nav>
```

### Keyboard Navigation

```tsx
<a
  href={url}
  className="focus:outline-none focus:ring-2 focus:ring-pink-200 focus:ring-opacity-50 rounded-lg p-2"
  onKeyDown={(e) => {
    if (e.key === 'Enter') {
      window.open(url, '_blank');
    }
  }}
>
  <Icon />
</a>
```

---

## Common Mistakes

### ❌ Mistake 1: Missing rel="noopener"

```tsx
// ❌ WRONG - Security risk
<a href={url} target="_blank">
  <InstagramLogo />
</a>
```

**Solution:**
```tsx
// ✅ CORRECT - Secure external links
<a href={url} target="_blank" rel="noopener noreferrer">
  <InstagramLogo />
</a>
```

### ❌ Mistake 2: No Aria Labels

```tsx
// ❌ WRONG - No context for screen readers
<a href={instagramUrl}>
  <InstagramLogo />
</a>
```

**Solution:**
```tsx
// ✅ CORRECT - Clear labels
<a href={instagramUrl} aria-label="Visit Ash Shaw on Instagram">
  <InstagramLogo />
</a>
```

### ❌ Mistake 3: Inconsistent Spacing

```tsx
// ❌ WRONG - Random gaps
<div className="flex gap-2">
  <InstagramLogo size={20} />
  <div className="ml-5">
    <FacebookLogo size={24} />
  </div>
</div>
```

**Solution:**
```tsx
// ✅ CORRECT - Consistent spacing
<div className="flex gap-4">
  <InstagramLogo size={20} />
  <FacebookLogo size={20} />
</div>
```

---

## Platform-Specific Notes

### Instagram
- Primary platform for makeup artists
- Use InstagramLogo icon from @phosphor-icons/react
- Link to profile: `https://instagram.com/username`

### Facebook
- Secondary social platform
- Use FacebookLogo icon from @phosphor-icons/react
- Link to page: `https://facebook.com/page-name`

### TikTok
- Growing platform for makeup content
- Use MusicNotes icon as alternative (@phosphor-icons/react doesn't have TikTok)
- Link: `https://tiktok.com/@username`

### LinkedIn
- Professional networking platform
- Use LinkedinLogo icon from @phosphor-icons/react
- Link: `https://linkedin.com/in/username`

### Email
- Direct contact method
- Use Envelope icon from @phosphor-icons/react
- Link: `mailto:email@address.com`

---

## Related Components

- **[Footer](./Footer.md)** - Site footer with social links
- **[Header](./Header.md)** - Main navigation
- **[ContactForm](./ContactForm.md)** - Contact form integration
- **[ShareComponent](./ShareComponent.md)** - Content sharing

---

## Related Documentation

- **[Guidelines.md](../Guidelines.md)** - Main project guidelines
- **[Data System](../../data/README.md)** - Mock data system guide
- **[overview-components.md](../overview-components.md)** - Component architecture
- **[overview-icons.md](../overview-icons.md)** - Icon verification process
- **[design-tokens/colors.md](../design-tokens/colors.md)** - Color system
- **[FILE_STRUCTURE.md](../FILE_STRUCTURE.md)** - File organization

---

**Last Updated:** January 2025  
**Version:** 4.0.0