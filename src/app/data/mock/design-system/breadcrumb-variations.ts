export var breadcrumbVariations = [
  {
    id: "default",
    title: "Default Breadcrumbs",
    description: "Standard text-based breadcrumbs with chevron separators.",
    className: "breadcrumbs",
    html: `<nav class="breadcrumbs" aria-label="Breadcrumb">
  <ol>
    <li><a href="#">Home</a></li>
    <li><a href="#">Portfolio</a></li>
    <li aria-current="page">Neon Collection</li>
  </ol>
</nav>`,
    css: `.breadcrumbs ol {
  display: flex;
  list-style: none;
  padding: 0;
  margin: 0;
  gap: 8px;
  font-family: var(--wp--preset--font-family--body);
  font-size: 0.875rem;
}
.breadcrumbs li {
  display: flex;
  align-items: center;
  color: var(--color-text-secondary);
}
.breadcrumbs li:not(:last-child)::after {
  content: '›';
  margin-left: 8px;
  color: var(--color-text-muted);
}
.breadcrumbs a {
  color: var(--color-text-secondary);
  text-decoration: none;
  transition: color 0.2s;
}
.breadcrumbs a:hover {
  color: var(--color-neon-pink);
}
.breadcrumbs [aria-current="page"] {
  color: var(--color-text-primary);
}`
  },
  {
    id: "slash-separator",
    title: "Slash Separator",
    description: "Monospace font with slash separators for a developer aesthetic.",
    className: "breadcrumbs is-style-slash",
    html: `<nav class="breadcrumbs is-style-slash" aria-label="Breadcrumb">
  <ol>
    <li><a href="#">~/home</a></li>
    <li><a href="#">/dev-tools</a></li>
    <li aria-current="page">/breadcrumbs</li>
  </ol>
</nav>`,
    css: `.breadcrumbs.is-style-slash ol {
  font-family: 'JetBrains Mono', monospace;
  font-size: 0.8rem;
}
.breadcrumbs.is-style-slash li:not(:last-child)::after {
  content: '/';
  color: var(--color-neon-green);
  opacity: 0.5;
}`
  },
  {
    id: "neon-glow",
    title: "Neon Glow Links",
    description: "High-contrast neon breadcrumbs for dark hero sections.",
    className: "breadcrumbs is-style-neon",
    html: `<nav class="breadcrumbs is-style-neon" aria-label="Breadcrumb">
  <ol>
    <li><a href="#">Home</a></li>
    <li><a href="#">Events</a></li>
    <li aria-current="page">Origin Festival</li>
  </ol>
</nav>`,
    css: `.breadcrumbs.is-style-neon a {
  color: var(--color-neon-blue);
  text-shadow: 0 0 10px rgba(31, 81, 255, 0.4);
}
.breadcrumbs.is-style-neon [aria-current="page"] {
  color: var(--color-neon-pink);
  text-shadow: 0 0 10px rgba(255, 16, 240, 0.4);
}`
  }
];
