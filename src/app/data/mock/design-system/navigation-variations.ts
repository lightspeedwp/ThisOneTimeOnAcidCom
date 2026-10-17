export var navigationVariations = [
  {
    id: "horizontal",
    title: "Horizontal Navigation",
    description: "Standard top-bar navigation layout.",
    className: "wp-block-navigation",
    html: `<nav class="wp-block-navigation">
  <ul class="wp-block-navigation__container">
    <li><a href="#" class="wp-block-navigation-item__content">Home</a></li>
    <li><a href="#" class="wp-block-navigation-item__content">Portfolio</a></li>
    <li><a href="#" class="wp-block-navigation-item__content">About</a></li>
  </ul>
</nav>`,
    css: `.wp-block-navigation__container {
  display: flex;
  gap: var(--wp--preset--spacing--30);
  list-style: none;
  padding: 0;
  margin: 0;
}
.wp-block-navigation-item__content {
  color: var(--color-text-primary);
  text-decoration: none;
  font-family: var(--wp--preset--font-family--heading);
  text-transform: uppercase;
  font-size: 0.9rem;
  letter-spacing: 1px;
  transition: color 0.2s;
}
.wp-block-navigation-item__content:hover {
  color: var(--color-neon-pink);
}`
  },
  {
    id: "vertical",
    title: "Vertical Navigation",
    description: "Sidebar or footer navigation list.",
    className: "wp-block-navigation is-style-vertical",
    html: `<nav class="wp-block-navigation is-style-vertical">
  <ul class="wp-block-navigation__container">
    <li><a href="#" class="wp-block-navigation-item__content">Instagram</a></li>
    <li><a href="#" class="wp-block-navigation-item__content">Facebook</a></li>
    <li><a href="#" class="wp-block-navigation-item__content">TikTok</a></li>
  </ul>
</nav>`,
    css: `.wp-block-navigation.is-style-vertical .wp-block-navigation__container {
  flex-direction: column;
  gap: var(--wp--preset--spacing--10);
}`
  },
  {
    id: "pill-tabs",
    title: "Pill Tabs Navigation",
    description: "Navigation styled as toggleable pill buttons.",
    className: "wp-block-navigation is-style-pills",
    html: `<nav class="wp-block-navigation is-style-pills">
  <ul class="wp-block-navigation__container">
    <li><a href="#" class="wp-block-navigation-item__content is-active">All</a></li>
    <li><a href="#" class="wp-block-navigation-item__content">Festivals</a></li>
    <li><a href="#" class="wp-block-navigation-item__content">Studio</a></li>
  </ul>
</nav>`,
    css: `.wp-block-navigation.is-style-pills .wp-block-navigation-item__content {
  padding: 6px 16px;
  border-radius: 999px;
  border: 1px solid var(--color-border);
  text-transform: none;
}
.wp-block-navigation.is-style-pills .wp-block-navigation-item__content.is-active,
.wp-block-navigation.is-style-pills .wp-block-navigation-item__content:hover {
  background: var(--color-surface-hover);
  color: var(--color-text-primary);
  border-color: var(--color-text-primary);
}`
  }
];
