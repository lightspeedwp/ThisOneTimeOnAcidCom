export var dividerVariations = [
  {
    id: "solid",
    title: "Solid Divider",
    description: "Standard thin solid line.",
    className: "wp-block-separator",
    html: `<hr class="wp-block-separator" />`,
    css: `hr.wp-block-separator {
  border: none;
  border-top: 1px solid var(--color-border);
  margin: var(--wp--preset--spacing--40) 0;
}`
  },
  {
    id: "neon-gradient",
    title: "Neon Gradient Divider",
    description: "Thick line with the signature neon gradient.",
    className: "wp-block-separator is-style-neon-gradient",
    html: `<hr class="wp-block-separator is-style-neon-gradient" />`,
    css: `hr.wp-block-separator.is-style-neon-gradient {
  border: none;
  height: 4px;
  background: linear-gradient(90deg, var(--color-neon-pink), var(--color-neon-blue), var(--color-neon-green));
  margin: var(--wp--preset--spacing--60) 0;
  border-radius: 2px;
}`
  },
  {
    id: "dots",
    title: "Dotted Divider",
    description: "Centered dots for editorial pacing.",
    className: "wp-block-separator is-style-dots",
    html: `<hr class="wp-block-separator is-style-dots" />`,
    css: `hr.wp-block-separator.is-style-dots {
  border: none;
  text-align: center;
  margin: var(--wp--preset--spacing--60) 0;
}
hr.wp-block-separator.is-style-dots::after {
  content: "•••";
  font-size: 2rem;
  color: var(--color-text-secondary);
  letter-spacing: 1rem;
}`
  },
  {
    id: "glow",
    title: "Glowing Divider",
    description: "Soft glowing line, best on dark backgrounds.",
    className: "wp-block-separator is-style-glow",
    html: `<hr class="wp-block-separator is-style-glow" />`,
    css: `hr.wp-block-separator.is-style-glow {
  border: none;
  height: 1px;
  background: var(--color-neon-pink);
  box-shadow: 0 0 10px var(--color-neon-pink), 0 0 20px var(--color-neon-pink);
  margin: var(--wp--preset--spacing--40) 0;
}`
  },
  {
    id: "brutalist",
    title: "Brutalist Divider",
    description: "Heavy blocky line.",
    className: "wp-block-separator is-style-brutalist",
    html: `<hr class="wp-block-separator is-style-brutalist" />`,
    css: `hr.wp-block-separator.is-style-brutalist {
  border: none;
  border-top: 8px solid #000;
  margin: var(--wp--preset--spacing--40) 0;
}`
  }
];
