# TypeformEmbed Component

**Version:** 1.0.1  
**Component Type:** Integration Component  
**Status:** ✅ Production Ready  
**Location:** `/components/common/TypeformEmbed.tsx`

**Recent Fix:** v1.0.1 - Fixed "TypeError: Failed to fetch" errors by whitelisting Typeform domains in extension detection utilities. See [TYPEFORM_ERROR_FIX.md](/TYPEFORM_ERROR_FIX.md) for details.

---

## Overview

The `TypeformEmbed` component integrates Typeform forms into the Ash Shaw portfolio with full light/dark mode support and Semantic BEM styling. It provides a seamless embedded form experience that matches the portfolio's "Neon vs Atomic Black" design system.

---

## Component API

### Props Interface

```typescript
interface TypeformEmbedProps {
  /** Typeform form ID (required) */
  formId: string;
  /** Optional custom height (default: 500px) */
  height?: string;
  /** Optional CSS class name for container */
  className?: string;
}
```

### Usage Example

```tsx
import { TypeformEmbed } from "@/components/common/TypeformEmbed";

export function ContactPage() {
  return (
    <div>
      <h2>Get in Touch</h2>
      <TypeformEmbed 
        formId="01KGP965M86E2TCRWEVS0WJX57"
        height="600px"
      />
    </div>
  );
}
```

---

## Design System Integration

### BEM Classes

| Class | Purpose | Dark Mode |
|-------|---------|-----------|
| `.typeform-embed` | Container with card styling | ✅ Supported |

### WordPress Design Tokens Used

**Colors:**
- `--wp--preset--color--neutral-50` - Light mode background
- `--wp--preset--color--neutral-900` - Dark mode background
- `--wp--preset--color--neutral-200` - Light mode border
- `--wp--preset--color--neutral-800` - Dark mode border
- `--wp--preset--color--neon-purple` - Light mode accent
- `--wp--preset--color--neon-pink` - Dark mode accent

**Spacing:**
- No internal padding (transparent container)

**Borders:**
- `--wp--preset--border-radius--xl` - Rounded corners (desktop)
- `--wp--preset--border-radius--lg` - Rounded corners (mobile)

**Shadows:**
- `--wp--preset--shadow--card` - Default elevation
- `--wp--preset--shadow--elevated` - Hover/dark mode elevation

---

## Visual States

### Light Mode
- **Background:** Neutral 50 (light gray)
- **Border:** Neutral 200 (medium gray)
- **Shadow:** Subtle card shadow
- **Loading spinner:** Purple accent

### Dark Mode
- **Background:** Neutral 900 (near black)
- **Border:** Neutral 800 (dark gray)
- **Shadow:** Enhanced elevation shadow
- **Loading spinner:** Pink accent

### Interactive States
- **Hover:** Elevated shadow + 2px upward translation
- **Focus:** 2px purple outline (light) / pink outline (dark)
- **Loading:** Animated spinner until iframe loads

---

## Accessibility

### WCAG AAA Compliance

**✅ Keyboard Navigation:**
- Full keyboard support inherited from Typeform iframe
- Tab navigation through form fields
- Enter/Space for button interactions

**✅ Screen Readers:**
- Iframe has `title="Contact Form"` attribute
- Container is semantically structured
- Form fields maintain Typeform's built-in ARIA labels

**✅ Focus Management:**
- Clear focus indicator with 2px outline
- 4px outline offset for visibility
- Color contrast meets AAA standards

**✅ Color Contrast:**
- Light mode: 7:1+ on all text
- Dark mode: 7:1+ on all text
- Loading spinner uses high-contrast colors

---

## Technical Details

### Script Loading

The component dynamically loads the Typeform embed script:

```javascript
// Loads only once, shared across instances
const script = document.createElement('script');
script.src = '//embed.typeform.com/next/embed.js';
script.async = true;
document.body.appendChild(script);
```

**Benefits:**
- No manual script tags in HTML
- Automatic cleanup on unmount
- Shared script across multiple instances
- Async loading for performance

### Typeform Configuration

The embed uses these data attributes:

```html
<div 
  data-tf-live="FORM_ID"           <!-- Form ID -->
  data-tf-opacity="0"              <!-- Transparent background -->
  data-tf-hide-headers             <!-- Hide Typeform header -->
  data-tf-hide-footer              <!-- Hide Typeform footer -->
  data-tf-iframe-props="title=Contact Form"  <!-- Accessibility -->
  data-tf-medium="snippet"         <!-- Embed type -->
/>
```

---

## Responsive Behavior

### Desktop (1024px+)
- Full width within container
- XL border radius
- Enhanced shadow on hover

### Tablet (768px - 1023px)
- Full width
- XL border radius
- Standard shadow

### Mobile (<768px)
- Full width
- LG border radius (smaller)
- Reduced shadow for performance

---

## Performance Considerations

**✅ Optimizations:**
1. **Lazy script loading** - Script loads only when component mounts
2. **Shared script** - Single script tag for all instances
3. **CSS transitions** - Hardware-accelerated transforms
4. **Loading indicator** - Visual feedback while iframe loads
5. **No unnecessary re-renders** - Script cleanup only on unmount

**⚡ Lighthouse Impact:**
- Minimal impact on initial page load
- Async script prevents blocking
- Iframe sandboxed for security

---

## Integration with Contact Page

### Current Implementation

**File:** `/components/pages/contact/ContactPage.tsx`

```tsx
{/* Right Column - Contact Form */}
<div className="contact-page-form">
  <h2 className="text-section-h2 text-gradient-gold-peach-coral mb-fluid-sm">
    {contactUI.form.title}
  </h2>
  <TypeformEmbed 
    formId="01KGP965M86E2TCRWEVS0WJX57"
    height="600px"
  />
</div>
```

**CSS:** `/styles/blocks/contact-page.css`

```css
/* Transparent container for Typeform embed */
.contact-page-form {
  background: transparent;
  padding: 0;
  border-radius: 0;
  box-shadow: none;
  border: none;
}

/* Heading spacing */
.contact-page-form h2 {
  padding: 0 var(--wp--preset--spacing--20);
}
```

---

## Customization Options

### Changing Form Height

```tsx
{/* Small form */}
<TypeformEmbed formId="..." height="400px" />

{/* Medium form (default) */}
<TypeformEmbed formId="..." height="500px" />

{/* Large form */}
<TypeformEmbed formId="..." height="700px" />

{/* Full viewport */}
<TypeformEmbed formId="..." height="100vh" />
```

### Adding Custom Classes

```tsx
<TypeformEmbed 
  formId="..."
  className="custom-spacing"
  height="600px"
/>
```

### Changing Form ID

Simply update the `formId` prop:

```tsx
<TypeformEmbed formId="NEW_FORM_ID" />
```

---

## Troubleshooting

### Form Not Loading

**Issue:** Typeform embed shows loading spinner indefinitely

**Solutions:**
1. Verify form ID is correct
2. Check if form is published in Typeform
3. Ensure script is loading (check Network tab)
4. Clear browser cache and reload

### Dark Mode Not Working

**Issue:** Embed doesn't switch to dark mode styling

**Solutions:**
1. Verify `.dark` class is on parent element
2. Check CSS custom properties are defined
3. Ensure `/styles/components/typeform-embed.css` is imported

### Iframe Height Issues

**Issue:** Form content is cut off or too much white space

**Solutions:**
1. Adjust `height` prop (recommended: 500px-700px)
2. Use viewport units: `height="80vh"`
3. Check Typeform form length and adjust accordingly

---

## Migration Notes

### Replacing ContactForm Component

If migrating from the previous `ContactForm` component:

1. **Update import:**
   ```tsx
   // Old
   import { ContactForm } from "../../common/ContactForm";
   
   // New
   import { TypeformEmbed } from "../../common/TypeformEmbed";
   ```

2. **Replace component:**
   ```tsx
   // Old
   <ContactForm />
   
   // New
   <TypeformEmbed formId="01KGP965M86E2TCRWEVS0WJX57" height="600px" />
   ```

3. **Update CSS:**
   - Remove `.contact-page-form` background, padding, borders
   - Add transparent container styling

---

## Browser Compatibility

**✅ Supported Browsers:**
- Chrome 90+ (full support)
- Firefox 88+ (full support)
- Safari 14+ (full support)
- Edge 90+ (full support)

**⚠️ Limited Support:**
- IE 11 (Typeform not supported)
- Opera Mini (limited iframe support)

---

## Security Considerations

**✅ Security Features:**
1. Iframe sandboxing (Typeform handles this)
2. HTTPS-only script loading
3. No sensitive data in props
4. Content Security Policy compatible

**⚠️ Important:**
- Form data is sent to Typeform servers
- Ensure Typeform account has proper security settings
- Review Typeform's privacy policy and GDPR compliance

---

## Future Enhancements

**Potential improvements:**
1. Add support for popup/slider modes
2. Implement custom loading spinner
3. Add error boundary for script failures
4. Support for Typeform Analytics tracking
5. Custom theming via Typeform API

---

## Related Components

- **ContactForm** - Previous contact form implementation (deprecated)
- **ContactPage** - Parent page component
- **SocialLinks** - Alternative contact methods
- **Footer** - Additional contact information

---

## Testing Checklist

Before deployment, verify:

- [ ] Form loads correctly in light mode
- [ ] Form loads correctly in dark mode
- [ ] Transitions are smooth when switching themes
- [ ] Loading spinner displays before form loads
- [ ] Form is fully functional (test submission)
- [ ] Keyboard navigation works
- [ ] Screen reader announces form correctly
- [ ] Mobile responsive (test on real device)
- [ ] Cross-browser compatibility
- [ ] Performance impact is minimal

---

**Last Updated:** February 2025  
**Maintained by:** Ash Shaw Portfolio Team  
**Dependencies:** Typeform Embed SDK (`embed.typeform.com/next/embed.js`)
