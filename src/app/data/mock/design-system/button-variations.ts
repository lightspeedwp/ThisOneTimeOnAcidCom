export var buttonVariations = [
  {
    id: "primary",
    title: "Primary Button",
    description: "Standard action button with neon glow on hover.",
    className: "wp-block-button__link",
    html: `<div class="wp-block-button"><a class="wp-block-button__link" href="#">Click me</a></div>`,
    css: `.wp-block-button__link {
  font-family: var(--wp--preset--font-family--body);
  font-weight: 600;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 12px 24px;
  border-radius: 9999px;
  background: var(--color-surface-elevated);
  color: var(--color-text-primary);
  text-decoration: none;
  border: 1px solid var(--color-border);
  transition: all 0.2s ease;
  cursor: pointer;
}
.wp-block-button__link:hover {
  border-color: var(--color-neon-pink);
  box-shadow: 0 0 15px rgba(255, 16, 240, 0.4);
  background: rgba(255, 16, 240, 0.1);
  transform: translateY(-2px);
}`
  },
  {
    id: "gradient",
    title: "Gradient Button",
    description: "High emphasis CTA using the neon gradient.",
    className: "wp-block-button__link is-style-gradient",
    html: `<div class="wp-block-button"><a class="wp-block-button__link is-style-gradient" href="#">Get started</a></div>`,
    css: `.wp-block-button__link.is-style-gradient {
  background: linear-gradient(90deg, var(--color-neon-pink), var(--color-neon-blue));
  border: none;
  color: #fff;
  text-shadow: 0 1px 2px rgba(0,0,0,0.5);
}
.wp-block-button__link.is-style-gradient:hover {
  box-shadow: 0 4px 20px rgba(31, 81, 255, 0.5);
  transform: translateY(-2px);
  filter: brightness(1.1);
}`
  },
  {
    id: "outline",
    title: "Outline Button",
    description: "Secondary action with a transparent background.",
    className: "wp-block-button__link is-style-outline",
    html: `<div class="wp-block-button is-style-outline"><a class="wp-block-button__link" href="#">Learn more</a></div>`,
    css: `.wp-block-button.is-style-outline .wp-block-button__link {
  background: transparent;
  border: 2px solid var(--color-text-primary);
}
.wp-block-button.is-style-outline .wp-block-button__link:hover {
  background: var(--color-text-primary);
  color: var(--color-atomic-black);
  border-color: var(--color-text-primary);
}`
  },
  {
    id: "brutalist",
    title: "Brutalist Button",
    description: "Blocky, unrounded button for the brutalist theme.",
    className: "wp-block-button__link is-style-brutalist",
    html: `<div class="wp-block-button"><a class="wp-block-button__link is-style-brutalist" href="#">SUBMIT</a></div>`,
    css: `.wp-block-button__link.is-style-brutalist {
  border-radius: 0;
  font-family: var(--wp--preset--font-family--title);
  text-transform: uppercase;
  letter-spacing: 1px;
  background: var(--color-neon-yellow);
  color: #000;
  border: 2px solid #000;
  box-shadow: 4px 4px 0 #000;
  transform: none;
}
.wp-block-button__link.is-style-brutalist:hover {
  transform: none;
  box-shadow: 6px 6px 0 #000;
  background: #fff;
}
.wp-block-button__link.is-style-brutalist:active {
  transform: translate(2px, 2px);
  box-shadow: 2px 2px 0 #000;
}`
  },
  {
    id: "ghost",
    title: "Ghost Button",
    description: "Low emphasis, text-only button with a subtle hover background.",
    className: "wp-block-button__link is-style-ghost",
    html: `<div class="wp-block-button"><button class="wp-block-button__link is-style-ghost">Cancel</button></div>`,
    css: `.wp-block-button__link.is-style-ghost {
  background: transparent;
  border: 1px solid transparent;
  padding: 8px 16px;
}
.wp-block-button__link.is-style-ghost:hover {
  background: var(--color-surface-hover);
  box-shadow: none;
  transform: none;
}`
  }
];
