# N003: Component Documentation

**Purpose:** Living component library reference documenting all reusable UI components, their structure, props, accessibility requirements, and usage patterns.

**Authority:** D4 (N-Document Approvals); D3 (Design Authority)

---

## Overview

This is the canonical reference for all React/Next.js components used throughout This One Time On Acid:
- Component API (props, types, defaults)
- Usage examples and patterns
- Accessibility features and requirements
- Dark mode support
- Mobile responsiveness
- Performance considerations

**Related Guidelines:** See `components/` directory for individual component guidelines; see N001: Design Token Reference for styling tokens.

---

## Component Categories

### Layout Components
- **Container:** Responsive max-width wrapper with gutter spacing
- **Grid:** CSS Grid-based layout system
- **Stack:** Flexbox-based vertical/horizontal layout primitive
- **Flex:** Low-level flexbox wrapper

### Navigation Components
- **Navigation:** Main site navigation with keyboard support
- **Breadcrumbs:** Site hierarchy navigation
- **Menu:** Dropdown menu with ARIA support
- **TabList:** Tab navigation with keyboard support

### Content Components
- **Card:** Reusable card with image, title, description, actions
- **Hero:** Full-width hero section with background image
- **PageHeader:** Page title with metadata
- **Footer:** Site footer with links and branding

### Form Components
- **Input:** Text input with validation and error states
- **Textarea:** Multi-line text input
- **Select:** Dropdown selection
- **Checkbox:** Single/multiple selection
- **RadioGroup:** Single selection from group
- **FormField:** Wrapper with label, error, and validation

### Media Components
- **Image:** Optimized image with lazy loading
- **Video:** Responsive video player with captions
- **Gallery:** Image gallery with lightbox
- **ImageCarousel:** Auto-rotating image carousel

### Data Components
- **Table:** Accessible data table
- **List:** Ordered/unordered lists with styling
- **Pagination:** Navigation for large datasets
- **LoadingSpinner:** Loading indicator

### Interactive Components
- **Button:** Primary, secondary, tertiary, ghost variants
- **Link:** Styled hyperlink
- **Dialog:** Modal dialog with focus trap
- **Toast:** Temporary notification message
- **Tooltip:** Informational popover
- **Disclosure:** Expandable/collapsible content

### Feedback Components
- **Alert:** Information/warning/error/success alert
- **Badge:** Small label or tag
- **Progress:** Progress bar or circular indicator
- **Skeleton:** Content placeholder during load

---

## Component Template

Each component includes:

### 1. Component API

```typescript
interface ComponentProps {
  // Required props
  label: string;
  
  // Optional props with defaults
  variant?: 'primary' | 'secondary' | 'tertiary';
  size?: 'sm' | 'md' | 'lg';
  disabled?: boolean;
  
  // Event handlers
  onClick?: (event: React.MouseEvent) => void;
}
```typescript

### 2. Usage Example

```jsx
<ComponentName
  label="Click me"
  variant="primary"
  onClick={() => console.log('clicked')}
/>
```typescript

### 3. Visual States

- **Default:** Standard appearance
- **Hover:** Interaction feedback
- **Focus:** Keyboard navigation indicator
- **Active:** Pressed/selected state
- **Disabled:** Non-interactive state
- **Loading:** Async operation in progress
- **Error:** Validation failure

### 4. Accessibility Features

- Keyboard support (Tab, Enter, Space, Arrow keys as appropriate)
- ARIA roles, properties, and labels
- Focus management
- Color contrast (7:1 for AAA)
- Screen reader announcements

### 5. Responsive Behavior

- Mobile: How component behaves at 320px–640px
- Tablet: Layout at 641px–1024px
- Desktop: Full layout at 1025px+
- Touch targets: Minimum 44×44px on mobile

### 6. Dark Mode Support

All components support dark mode via CSS variables:
- Text colors inverted for readability
- Contrast maintained per WCAG 2.2 AAA
- Borders adjusted for visibility
- Backgrounds adjusted for reduced blue light

### 7. Performance Notes

- Bundle size impact
- Render optimization (React.memo, useMemo)
- Large dataset handling (virtualization if applicable)
- Animation performance (GPU-accelerated transforms)

---

## Component Composition Patterns

### Compound Components
- Parent component manages state
- Child components receive state via context
- Example: `<FormField>` with `<Input>`, `<ErrorMessage>`

### Controlled vs. Uncontrolled
- **Controlled:** Parent manages state; component receives value prop
- **Uncontrolled:** Component manages own state; parent uses ref
- Pattern: Prefer controlled for forms, uncontrolled for simple components

### Wrapper Components
- Extend existing components with additional functionality
- Example: `<Button>` wrapper adds loading spinner

### Context Providers
- Shared configuration (dark mode, language, theme)
- Layout providers (page context, modal context)
- Performance: Memoize providers to prevent unnecessary re-renders

---

## Testing Components

### Unit Tests
- Props validation
- Event handler calls
- Conditional rendering
- Error states

### Integration Tests
- Component interaction with forms
- Navigation behavior
- Modal focus management
- Accessibility features

### Visual Tests
- Snapshot tests
- Visual regression tests
- Responsive layout tests
- Dark mode appearance

### Accessibility Tests
- Keyboard navigation
- Screen reader announcements
- Color contrast
- Focus management

---

## Component Maintenance

### Version Management
- Semantic versioning for component API changes
- Deprecation warnings for removed props
- Migration guides for major changes

### Documentation Updates
- Update examples when API changes
- Add screenshots for visual components
- Update accessibility checklist
- Add performance metrics

### Performance Monitoring
- Monitor bundle size
- Track render performance
- Identify slow components
- Optimize critical path

---

## Related Resources

- See N002: Accessibility Checklist for component a11y requirements
- See N001: Design Token Reference for component styling
- See N009: Responsive Design Patterns for responsive breakpoints
- See `components/` directory for individual component guides

---

**Authority:** D4 (N-Document Approvals) | D3 (Design Authority)  
**Last Updated:** 2026-11-09  
**Related:** N001: Design Token Reference · N002: Accessibility Checklist · N004: CSS & Styling Guide
