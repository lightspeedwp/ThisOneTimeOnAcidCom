export var paragraphVariations = [
  {
    id: "core-paragraph",
    title: "Default Paragraph",
    description: "Standard body text using Inter, optimized for long-form reading.",
    className: "wp-block-paragraph",
    css: `.wp-block-paragraph {
  font-family: var(--wp--preset--font-family--body);
  font-size: var(--wp--preset--font-size--normal);
  line-height: 1.6;
  color: var(--color-text-primary);
  margin-bottom: var(--wp--preset--spacing--30);
}`,
    html: `<p class="wp-block-paragraph">The stars in the bushveld are different from city stars. They're close and bright and they move — or you think they move, which amounts to the same thing when you're nineteen and the bass is making the ground vibrate under your bare feet.</p>`
  },
  {
    id: "lead-paragraph",
    title: "Lead Paragraph (Lede)",
    description: "Larger introductory paragraph for articles and case studies.",
    className: "wp-block-paragraph is-style-lead",
    css: `.wp-block-paragraph.is-style-lead {
  font-size: var(--wp--preset--font-size--large);
  line-height: 1.5;
  color: var(--color-text-primary);
  font-weight: 300;
  margin-bottom: var(--wp--preset--spacing--40);
}`,
    html: `<p class="wp-block-paragraph is-style-lead">I’d bought the paints on a whim from a craft supply shop in Braamfontein. Six small pots of UV reactive body paint, a pack of cheap brushes, and a conviction that something interesting would happen if I brought them to the party.</p>`
  },
  {
    id: "muted-paragraph",
    title: "Muted Paragraph",
    description: "Secondary text for meta information, captions, or less important details.",
    className: "wp-block-paragraph has-text-color has-contrast-2-color",
    css: `.wp-block-paragraph.has-text-color.has-contrast-2-color {
  color: var(--color-text-secondary);
  font-size: 0.9rem;
}`,
    html: `<p class="wp-block-paragraph has-text-color has-contrast-2-color">Posted on January 15, 2026 • 8 min read</p>`
  },
  {
    id: "drop-cap",
    title: "Drop Cap",
    description: "Classic editorial drop cap for the start of a chapter.",
    className: "wp-block-paragraph has-drop-cap",
    css: `.wp-block-paragraph.has-drop-cap::first-letter {
  float: left;
  font-size: 4em;
  line-height: 0.8;
  padding: 0.1em 0.1em 0 0;
  color: var(--color-neon-pink);
  font-family: var(--wp--preset--font-family--heading);
  font-weight: 700;
}`,
    html: `<p class="wp-block-paragraph has-drop-cap">Something interesting happened. The dancefloor taught me about impermanence. Every piece I paint will be sweated off by sunrise. There's a Buddhist koan in there somewhere — art that exists to be destroyed by joy.</p>`
  },
  {
    id: "neon-glow-text",
    title: "Neon Glow Text",
    description: "Text that emits a neon glow, useful for emphasis in dark mode.",
    className: "wp-block-paragraph is-style-neon-glow",
    css: `.wp-block-paragraph.is-style-neon-glow {
  color: #fff;
  text-shadow: 0 0 10px var(--color-neon-pink), 0 0 20px var(--color-neon-pink);
}`,
    html: `<p class="wp-block-paragraph is-style-neon-glow">Pure energy radiating from the dancefloor.</p>`
  },
  {
    id: "bordered-paragraph",
    title: "Bordered Callout",
    description: "Paragraph with a left border to highlight a quote or important note.",
    className: "wp-block-paragraph is-style-bordered-callout",
    css: `.wp-block-paragraph.is-style-bordered-callout {
  border-left: 4px solid var(--color-neon-blue);
  padding-left: var(--wp--preset--spacing--30);
  background: rgba(31, 81, 255, 0.05);
  padding-top: var(--wp--preset--spacing--20);
  padding-bottom: var(--wp--preset--spacing--20);
}`,
    html: `<p class="wp-block-paragraph is-style-bordered-callout">Note: Always test UV paints on a small patch of skin before full application.</p>`
  }
  // We can expand to 20 variations as needed
];
