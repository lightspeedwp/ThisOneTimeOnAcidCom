export var listVariations = [
  {
    id: "ul-default",
    title: "Unordered List",
    description: "Standard bulleted list.",
    className: "wp-block-list",
    html: `<ul class="wp-block-list"><li>First item</li><li>Second item</li><li>Third item</li></ul>`,
    css: `.wp-block-list {
  font-family: var(--wp--preset--font-family--body);
  color: var(--color-text-primary);
  margin-bottom: var(--wp--preset--spacing--30);
  padding-left: var(--wp--preset--spacing--30);
}
.wp-block-list li {
  margin-bottom: var(--wp--preset--spacing--10);
}`
  },
  {
    id: "ol-default",
    title: "Ordered List",
    description: "Standard numbered list.",
    className: "wp-block-list",
    html: `<ol class="wp-block-list"><li>First step</li><li>Second step</li><li>Third step</li></ol>`,
    css: `ol.wp-block-list {
  font-family: var(--wp--preset--font-family--body);
  color: var(--color-text-primary);
  margin-bottom: var(--wp--preset--spacing--30);
  padding-left: var(--wp--preset--spacing--30);
}
ol.wp-block-list li {
  margin-bottom: var(--wp--preset--spacing--10);
}`
  },
  {
    id: "neon-bullets",
    title: "Neon Bullets",
    description: "Unordered list with custom neon-colored bullets.",
    className: "wp-block-list is-style-neon-bullets",
    html: `<ul class="wp-block-list is-style-neon-bullets"><li>Neon pink</li><li>Neon green</li><li>Neon blue</li></ul>`,
    css: `.wp-block-list.is-style-neon-bullets {
  list-style: none;
  padding-left: 0;
}
.wp-block-list.is-style-neon-bullets li {
  position: relative;
  padding-left: var(--wp--preset--spacing--30);
}
.wp-block-list.is-style-neon-bullets li::before {
  content: '•';
  position: absolute;
  left: 0;
  color: var(--color-neon-pink);
  font-size: 1.5rem;
  line-height: 1;
  top: -2px;
}`
  },
  {
    id: "checklist",
    title: "Checklist",
    description: "List styled as a checklist with custom SVG icons or emojis.",
    className: "wp-block-list is-style-checklist",
    html: `<ul class="wp-block-list is-style-checklist"><li>Pack UV paints</li><li>Check blacklights</li><li>Prepare brushes</li></ul>`,
    css: `.wp-block-list.is-style-checklist {
  list-style: none;
  padding-left: 0;
}
.wp-block-list.is-style-checklist li {
  position: relative;
  padding-left: var(--wp--preset--spacing--40);
}
.wp-block-list.is-style-checklist li::before {
  content: '✓';
  position: absolute;
  left: 0;
  color: var(--color-neon-green);
  font-weight: bold;
}`
  }
];
