# Icon System Guide

Complete guide to using icons in the Ash Shaw Makeup Portfolio project. **CRITICAL:** Always verify icons exist before using them!

**Version:** 5.0.0  
**Last Updated:** March 2026  
**Last Reviewed:** March 3, 2026

---

## Icon Library

### Lucide React (legacy — being replaced)

The project currently uses hand-rolled SVG wrappers based on **[Lucide React](https://lucide.dev/)** icon paths, located in `/lib/icons-set-*.tsx`. These are re-exported through `/lib/icons.ts`.

**Status:** Legacy. Being replaced by Phosphor Icons in a phased migration.

**Import pattern (existing components):**
```tsx
import { Search, Menu, ChevronDown } from '../../lib/icons';
```

### Phosphor Icons (new — primary library)

The project is migrating to **[Phosphor Icons](https://phosphoricons.com/)** (`@phosphor-icons/react`) as the primary icon library. Phosphor provides 1,200+ icons with **6 weight variants** per icon.

**Key features:**
- 6 weight variants: thin, light, regular, bold, fill, duotone
- 1,200+ icons with consistent design language
- `aria-hidden="true"` by default (correct for decorative icons)
- `weight` prop for style variants (replaces Lucide's stroke-only approach)
- `size` prop for dimensions (number or string)
- Inherits `currentColor` for CSS-based colouring

**Import pattern (new components):**
```tsx
import { MagnifyingGlass, CaretDown, Star } from '@phosphor-icons/react';

<MagnifyingGlass size={24} weight="regular" />
<CaretDown size={20} weight="bold" />
<Star size={16} weight="fill" />
```

**Design tokens:** See [iconography.md](./design-tokens/iconography.md) for the complete weight system, size scale, colour tokens, and accessibility matrix.

**Dev tool:** Visit [/dev-tools/phosphor-icons](/dev-tools/phosphor-icons) for a live side-by-side comparison of all Lucide → Phosphor icon mappings.

**Migration status:** Phase 1 complete (parallel operation). Phase 2 (file-by-file replacement) tracked in [/tasks/phosphor-migration-tasks.md](../tasks/phosphor-migration-tasks.md).

---

## Icon Verification Process

### ⚠️ CRITICAL: Always Verify Icons Before Using

**NEVER assume an icon exists.** Always follow this verification process:

### Step 1: Search Lucide Documentation

Visit [lucide.dev/icons](https://lucide.dev/icons) and search for your desired icon.

**Example searches:**
- "sparkles" → ✅ Found: `Sparkles`
- "palette" → ✅ Found: `Palette`
- "makeup" → ❌ Not found (use alternative like `Brush` or `Sparkles`)

### Step 2: Verify in Node Modules (Alternative Method)

If documentation is unavailable, check the installed package:

```bash
# View available icons
cat node_modules/lucide-react/dist/esm/lucide-react.d.ts | grep "export const"

# Or search for specific icon
grep -i "sparkles" node_modules/lucide-react/dist/esm/lucide-react.d.ts
```

### Step 3: Use Correct Import Name

Icon names use **PascalCase** in imports:

```tsx
// ✅ CORRECT - PascalCase import
import { Sparkles, Palette, Camera } from 'lucide-react';

// ❌ WRONG - lowercase or kebab-case
import { sparkles, palette, camera } from 'lucide-react';
```

### Step 4: Confirm in Usage

```tsx
import { Sparkles } from 'lucide-react';

function Component() {
  return (
    <div className="flex items-center gap-2">
      <Sparkles className="w-6 h-6 text-pink-500" />
      <span>Text content</span>
    </div>
  );
}
```

---

## Icon Categories

Icons are organized by usage category. See detailed category documentation:

### 1. Interface Icons

UI controls, navigation, and system actions.

**Documentation:** [icons/interface.md](./icons/interface.md)

**Common icons:**
- `Menu`, `X` - Menu toggle
- `ChevronDown`, `ChevronUp` - Dropdowns
- `ArrowUp`, `ArrowDown` - Scroll indicators
- `Search`, `Filter` - Search and filtering
- `Heart`, `Star` - Favorites and ratings
- `Share2`, `Link` - Sharing functionality

**Example:**
```tsx
import { Menu, X, Search } from 'lucide-react';

<button aria-label="Open menu">
  <Menu className="w-6 h-6" />
</button>
```

### 2. Travel Icons

Travel-related icons for location, tours, and activities.

**Documentation:** [icons/travel.md](./icons/travel.md)

**Common icons:**
- `MapPin`, `Map` - Location markers
- `Calendar` - Date selection
- `Users` - Group tours
- `Camera` - Photography tours
- `Mountain`, `Waves` - Activity types

**Example:**
```tsx
import { MapPin, Calendar, Users } from 'lucide-react';

<div className="flex gap-4">
  <MapPin className="w-5 h-5 text-blue-500" />
  <span>Location</span>
</div>
```

### 3. Social Media Icons

Social platform icons for sharing and links.

**Common icons:**
- `Facebook` - Facebook sharing
- `Twitter` - Twitter/X sharing
- `Instagram` - Instagram link
- `Linkedin` - LinkedIn sharing
- `Mail` - Email sharing
- `MessageCircle` - WhatsApp sharing

**Example:**
```tsx
import { Facebook, Twitter, Instagram } from 'lucide-react';

<div className="flex gap-3">
  <a href="https://facebook.com/ashshaw" aria-label="Facebook">
    <Facebook className="w-6 h-6 text-blue-600 hover:text-blue-700" />
  </a>
  <a href="https://twitter.com/ashshaw" aria-label="Twitter">
    <Twitter className="w-6 h-6 text-blue-400 hover:text-blue-500" />
  </a>
</div>
```

### 4. Content Icons

Icons for blog posts, portfolio, and content features.

**Common icons:**
- `Image`, `Images` - Gallery
- `FileText` - Blog posts
- `Folder` - Categories
- `Tag`, `Tags` - Tags
- `Clock` - Reading time
- `Eye` - Views

**Example:**
```tsx
import { Clock, Tag, Eye } from 'lucide-react';

<div className="flex gap-4 text-gray-600">
  <span className="flex items-center gap-1">
    <Clock className="w-4 h-4" />
    5 min read
  </span>
  <span className="flex items-center gap-1">
    <Tag className="w-4 h-4" />
    Tutorial
  </span>
</div>
```

---

## Usage Patterns

### Basic Icon Usage

```tsx
import { Sparkles } from 'lucide-react';

// Standard size (24px default)
<Sparkles />

// Custom size with Tailwind
<Sparkles className="w-6 h-6" />

// Custom color
<Sparkles className="text-pink-500" />

// Hover effects
<Sparkles className="text-gray-600 hover:text-pink-500 transition-colors" />
```

### Icon with Text

```tsx
import { Heart } from 'lucide-react';

<button className="flex items-center gap-2">
  <Heart className="w-5 h-5" />
  <span>Save to Favorites</span>
</button>
```

### Icon in Cards

```tsx
import { Sparkles } from 'lucide-react';

<div className="flex items-start gap-4">
  <div className="flex-shrink-0 w-12 h-12 rounded-full bg-gradient-pink-purple-blue flex items-center justify-center">
    <Sparkles className="w-6 h-6 text-white" />
  </div>
  <div>
    <h3>Card Title</h3>
    <p>Card description</p>
  </div>
</div>
```

### Animated Icons

```tsx
import { Loader } from 'lucide-react';

// Spinning loader
<Loader className="w-6 h-6 animate-spin text-pink-500" />

// Pulse effect
<Heart className="w-6 h-6 animate-pulse text-red-500" />
```

### Gradient Icons (Brand Style)

```tsx
import { Sparkles } from 'lucide-react';

<div className="relative inline-flex">
  <Sparkles 
    className="w-8 h-8"
    style={{
      filter: 'drop-shadow(0 0 8px rgba(255, 102, 204, 0.5))',
      background: 'linear-gradient(135deg, #FF66CC 0%, #9933FF 50%, #3399FF 100%)',
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent'
    }}
  />
</div>
```

### Icon Buttons

```tsx
import { Share2, Heart, Bookmark } from 'lucide-react';

// Icon-only button
<button 
  className="w-10 h-10 rounded-full bg-white/80 backdrop-blur-sm flex items-center justify-center shadow-md hover:shadow-lg transition-all hover:scale-105"
  aria-label="Share"
>
  <Share2 className="w-5 h-5 text-gray-700" />
</button>

// Multiple icon actions
<div className="flex gap-2">
  <button aria-label="Like">
    <Heart className="w-5 h-5 text-gray-600 hover:text-red-500" />
  </button>
  <button aria-label="Bookmark">
    <Bookmark className="w-5 h-5 text-gray-600 hover:text-blue-500" />
  </button>
  <button aria-label="Share">
    <Share2 className="w-5 h-5 text-gray-600 hover:text-green-500" />
  </button>
</div>
```

---

## Common Mistakes

### ❌ Mistake 1: Using Non-Existent Icons

```tsx
// ❌ WRONG - Assuming icon exists without verification
import { Makeup, Lipstick, Eyeshadow } from 'lucide-react';
```

**Solution:** Always verify icons exist. Use alternatives:
```tsx
// ✅ CORRECT - Use verified alternatives
import { Sparkles, Brush, Palette } from 'lucide-react';
```

### ❌ Mistake 2: Incorrect Import Names

```tsx
// ❌ WRONG - lowercase or kebab-case
import { arrow-up, menu-icon } from 'lucide-react';
```

**Solution:** Use PascalCase:
```tsx
// ✅ CORRECT - PascalCase
import { ArrowUp, Menu } from 'lucide-react';
```

### ❌ Mistake 3: Missing Size Classes

```tsx
// ❌ WRONG - No size specified, relies on defaults
<Sparkles />
```

**Solution:** Always specify explicit size:
```tsx
// ✅ CORRECT - Explicit sizing
<Sparkles className="w-6 h-6" />
```

### ❌ Mistake 4: Inaccessible Icon Buttons

```tsx
// ❌ WRONG - No aria-label
<button>
  <Search />
</button>
```

**Solution:** Always include aria-label for icon-only buttons:
```tsx
// ✅ CORRECT - Accessible
<button aria-label="Search content">
  <Search className="w-5 h-5" />
</button>
```

### ❌ Mistake 5: Inconsistent Sizing

```tsx
// ❌ WRONG - Mixed sizes without purpose
<Heart className="w-4 h-4" />
<Star className="w-8 h-8" />
<Bookmark className="w-5 h-5" />
```

**Solution:** Use consistent sizing within context:
```tsx
// ✅ CORRECT - Consistent sizing
<Heart className="w-5 h-5" />
<Star className="w-5 h-5" />
<Bookmark className="w-5 h-5" />
```

---

## Accessibility Requirements

### Icon Buttons

All icon-only buttons must have `aria-label`:

```tsx
import { Menu, X } from 'lucide-react';

<button 
  aria-label="Open navigation menu"
  onClick={openMenu}
>
  <Menu className="w-6 h-6" />
</button>

<button 
  aria-label="Close menu"
  onClick={closeMenu}
>
  <X className="w-6 h-6" />
</button>
```

### Decorative Icons

Icons used purely for decoration should be hidden from screen readers:

```tsx
import { Sparkles } from 'lucide-react';

<div className="flex items-center gap-2">
  <Sparkles className="w-5 h-5 text-pink-500" aria-hidden="true" />
  <span>Decorative text with visible label</span>
</div>
```

### Interactive Icons

Interactive icons need proper focus states:

```tsx
import { Heart } from 'lucide-react';

<button 
  className="focus:outline-none focus:ring-4 focus:ring-pink-200 focus:ring-opacity-50 rounded-full p-2"
  aria-label="Add to favorites"
>
  <Heart className="w-5 h-5 text-gray-600 hover:text-red-500 transition-colors" />
</button>
```

---

## Icon Sizing Guide

### Standard Sizes

```tsx
// Extra small (16px) - Inline with small text
<Icon className="w-4 h-4" />

// Small (20px) - Inline with body text
<Icon className="w-5 h-5" />

// Medium (24px) - Default, buttons, cards
<Icon className="w-6 h-6" />

// Large (32px) - Section headers, feature cards
<Icon className="w-8 h-8" />

// Extra large (48px) - Hero sections, major features
<Icon className="w-12 h-12" />
```

### Responsive Sizing

```tsx
// Responsive icon sizing
<Icon className="w-6 h-6 md:w-8 md:h-8 lg:w-10 lg:h-10" />
```

---

## Related Documentation

- **[icons/interface.md](./icons/interface.md)** - UI and navigation icons
- **[icons/travel.md](./icons/travel.md)** - Travel and location icons
- **[Guidelines.md](./Guidelines.md)** - Main guidelines
- **[overview-components.md](./overview-components.md)** - Component system

---

## External Resources

- **[Lucide Icons](https://lucide.dev/icons)** - Official icon catalog
- **[Lucide React Docs](https://lucide.dev/guide/packages/lucide-react)** - React package documentation
- **[GitHub Repository](https://github.com/lucide-icons/lucide)** - Source code and issues

---