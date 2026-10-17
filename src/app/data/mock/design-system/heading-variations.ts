export var headingVariations = [
  {
    id: "h1-default",
    title: "H1 Default",
    description: "Standard H1 heading for page titles. Uses Playfair Display.",
    className: "wp-block-heading",
    html: `<h1>The quick brown fox</h1>`,
    css: `h1.wp-block-heading {
  font-family: var(--wp--preset--font-family--heading);
  font-size: var(--wp--preset--font-size--x-large);
  line-height: 1.2;
  margin-bottom: var(--wp--preset--spacing--40);
}`
  },
  {
    id: "h2-default",
    title: "H2 Default",
    description: "Standard H2 for section headings.",
    className: "wp-block-heading",
    html: `<h2>Jumps over the lazy dog</h2>`,
    css: `h2.wp-block-heading {
  font-family: var(--wp--preset--font-family--heading);
  font-size: var(--wp--preset--font-size--large);
  line-height: 1.3;
  margin-bottom: var(--wp--preset--spacing--30);
}`
  },
  {
    id: "neon-gradient",
    title: "Neon Gradient Heading",
    description: "Heading text with a clipped linear gradient, excellent for hero sections.",
    className: "wp-block-heading is-style-neon-gradient",
    html: `<h2 class="wp-block-heading is-style-neon-gradient">Neon revelations in the dark</h2>`,
    css: `.wp-block-heading.is-style-neon-gradient {
  background: linear-gradient(90deg, var(--color-neon-pink), var(--color-neon-blue));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  display: inline-block;
}`
  },
  {
    id: "glitch",
    title: "Glitch Heading",
    description: "Animated glitch effect using text-shadow.",
    className: "wp-block-heading is-style-glitch",
    html: `<h1 class="wp-block-heading is-style-glitch" data-text="System Failure">System Failure</h1>`,
    css: `.wp-block-heading.is-style-glitch {
  position: relative;
  color: white;
}
.wp-block-heading.is-style-glitch::before,
.wp-block-heading.is-style-glitch::after {
  content: attr(data-text);
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}
.wp-block-heading.is-style-glitch::before {
  left: 2px;
  text-shadow: -1px 0 red;
  animation: glitch-anim-1 2s infinite linear alternate-reverse;
}
.wp-block-heading.is-style-glitch::after {
  left: -2px;
  text-shadow: -1px 0 blue;
  animation: glitch-anim-2 3s infinite linear alternate-reverse;
}
@media (prefers-reduced-motion: reduce) {
  .wp-block-heading.is-style-glitch::before,
  .wp-block-heading.is-style-glitch::after {
    animation: none;
    display: none;
  }
}`
  },
  {
    id: "brutalist",
    title: "Brutalist Heading",
    description: "Heavy, uppercase, tight letter-spacing for the brutalist theme.",
    className: "wp-block-heading is-style-brutalist",
    html: `<h1 class="wp-block-heading is-style-brutalist">ATTENTION</h1>`,
    css: `.wp-block-heading.is-style-brutalist {
  font-family: var(--wp--preset--font-family--title);
  text-transform: uppercase;
  letter-spacing: -2px;
  line-height: 0.9;
  color: var(--color-atomic-black);
  background: var(--color-neon-yellow);
  display: inline-block;
  padding: 0 10px;
  border: 4px solid var(--color-atomic-black);
  box-shadow: 8px 8px 0 var(--color-atomic-black);
}`
  }
];
