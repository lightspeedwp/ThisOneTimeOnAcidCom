export var imageVariations = [
  {
    id: "default",
    title: "Default Image",
    description: "Standard image block with fluid width and subtle border radius.",
    className: "wp-block-image",
    html: `<figure class="wp-block-image"><img src="https://images.unsplash.com/photo-1550684848-fac1c5b4e853?q=80&w=800&auto=format&fit=crop" alt="Placeholder" /></figure>`,
    css: `.wp-block-image img {
  max-width: 100%;
  height: auto;
  border-radius: var(--wp--preset--spacing--10);
  display: block;
}`
  },
  {
    id: "captioned",
    title: "Captioned Image",
    description: "Image with a styled figcaption underneath.",
    className: "wp-block-image",
    html: `<figure class="wp-block-image"><img src="https://images.unsplash.com/photo-1550684848-fac1c5b4e853?q=80&w=800&auto=format&fit=crop" alt="Placeholder" /><figcaption>UV active materials under blacklight</figcaption></figure>`,
    css: `.wp-block-image figcaption {
  font-family: var(--wp--preset--font-family--body);
  color: var(--color-text-secondary);
  font-size: 0.875rem;
  text-align: center;
  margin-top: var(--wp--preset--spacing--10);
}`
  },
  {
    id: "neon-border",
    title: "Neon Border Image",
    description: "Image wrapped in a glowing neon border, useful for highlighting key portfolio pieces.",
    className: "wp-block-image is-style-neon-border",
    html: `<figure class="wp-block-image is-style-neon-border"><img src="https://images.unsplash.com/photo-1550684848-fac1c5b4e853?q=80&w=800&auto=format&fit=crop" alt="Placeholder" /></figure>`,
    css: `.wp-block-image.is-style-neon-border img {
  border: 2px solid var(--color-neon-pink);
  box-shadow: 0 0 15px rgba(255, 16, 240, 0.5);
  border-radius: var(--wp--preset--spacing--20);
}`
  },
  {
    id: "grayscale-hover",
    title: "Grayscale to Color",
    description: "Image that starts black and white and reveals full color on hover.",
    className: "wp-block-image is-style-grayscale-reveal",
    html: `<figure class="wp-block-image is-style-grayscale-reveal"><img src="https://images.unsplash.com/photo-1550684848-fac1c5b4e853?q=80&w=800&auto=format&fit=crop" alt="Placeholder" /></figure>`,
    css: `.wp-block-image.is-style-grayscale-reveal img {
  filter: grayscale(100%);
  transition: filter 0.3s ease;
}
.wp-block-image.is-style-grayscale-reveal:hover img {
  filter: grayscale(0%);
}`
  },
  {
    id: "rounded",
    title: "Rounded / Avatar",
    description: "Fully rounded image for avatars or profile pictures.",
    className: "wp-block-image is-style-rounded",
    html: `<figure class="wp-block-image is-style-rounded" style="width: 150px"><img src="https://images.unsplash.com/photo-1550684848-fac1c5b4e853?q=80&w=800&auto=format&fit=crop" alt="Placeholder" /></figure>`,
    css: `.wp-block-image.is-style-rounded img {
  border-radius: 50%;
  aspect-ratio: 1 / 1;
  object-fit: cover;
}`
  }
];
