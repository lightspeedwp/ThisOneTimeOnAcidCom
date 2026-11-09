# N009: Responsive Design Patterns

**Purpose:** Mobile-first breakpoints, media queries, and responsive component patterns.

**Authority:** D4 (N-Document Approvals)

---

## Breakpoint Strategy

Mobile-first approach: base styles for mobile, override at breakpoints.

| Breakpoint | Width | Device | Strategy |
|---|---|---|---|
| Mobile | 320–640px | Phones | Base styles; 1-column layout |
| Tablet | 641–1024px | Tablets | 2-column; larger touch targets |
| Desktop | 1025–1440px | Desktops | 3+ columns; hover states |
| Wide | 1441px+ | Large screens | Max-width container |

## Media Queries

```css
/* Mobile-first base styles */
body { font-size: 16px; padding: 1rem; }

/* Tablet */
@media (min-width: 641px) {
  body { padding: 1.5rem; }
}

/* Desktop */
@media (min-width: 1025px) {
  body { font-size: 18px; }
}

/* Touch devices */
@media (hover: none) and (pointer: coarse) {
  button { padding: 0.75rem 1.5rem; } /* Larger targets */
}

/* Landscape orientation */
@media (orientation: landscape) {
  .mobile-hero { display: none; }
}
```

## Responsive Patterns

### Grid Layout

```jsx
// 1 column on mobile, 2 on tablet, 3 on desktop
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
  {items.map(item => <Card key={item.id} {...item} />)}
</div>
```

### Navigation

```jsx
// Mobile: burger menu; Desktop: horizontal nav
<nav className="flex md:block">
  <button className="md:hidden">Menu</button>
  <ul className="hidden md:flex gap-4">
    <li><Link href="/">Home</Link></li>
  </ul>
</nav>
```

### Hero Section

```jsx
<div className="bg-cover bg-center h-64 md:h-96 lg:h-screen"
  style={{backgroundImage: 'url(hero.jpg)'}}>
  <h1 className="text-2xl md:text-4xl lg:text-6xl">
    Responsive Hero
  </h1>
</div>
```

---

## Touch & Pointer

```css
/* Touch devices: larger targets */
@media (hover: none) {
  button { min-height: 44px; min-width: 44px; }
  a { padding: 0.5rem; }
}

/* Keyboard navigation: visible focus */
a:focus-visible { outline: 2px solid blue; }

/* Reduced motion: no animations */
@media (prefers-reduced-motion: reduce) {
  * { animation: none !important; }
}
```

---

**Authority:** D4 (N-Document Approvals)  
**Last Updated:** 2026-11-09  
**Related:** [N001: Design Token Reference](#) · [N004: CSS & Styling Guide](#)
