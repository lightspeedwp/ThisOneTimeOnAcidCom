export var formVariations = [
  {
    id: "default",
    title: "Default Form Theme",
    description: "Standard dark mode form styling.",
    className: "wp-block-form",
    html: `<form class="wp-block-form">
  <label for="name">Name</label>
  <input type="text" id="name" placeholder="Enter your name" />
  
  <label for="email">Email</label>
  <input type="email" id="email" placeholder="hello@example.com" />
  
  <label for="msg">Message</label>
  <textarea id="msg" rows="4" placeholder="Your message..."></textarea>
  
  <div class="wp-block-button"><button type="button" class="wp-block-button__link">Send Message</button></div>
</form>`,
    css: `.wp-block-form {
  display: flex;
  flex-direction: column;
  gap: var(--wp--preset--spacing--20);
  max-width: 600px;
}
.wp-block-form label {
  font-family: var(--wp--preset--font-family--heading);
  color: var(--color-text-primary);
  font-size: 0.9rem;
}
.wp-block-form input,
.wp-block-form textarea {
  background: var(--color-surface-elevated);
  border: 1px solid var(--color-border);
  color: var(--color-text-primary);
  padding: 12px 16px;
  border-radius: 8px;
  font-family: var(--wp--preset--font-family--body);
  transition: all 0.2s;
}
.wp-block-form input:focus,
.wp-block-form textarea:focus {
  outline: none;
  border-color: var(--color-neon-pink);
  box-shadow: 0 0 0 1px var(--color-neon-pink);
}`
  },
  {
    id: "minimal",
    title: "Minimal Form Theme",
    description: "Borderless inputs with bottom borders only.",
    className: "wp-block-form is-style-minimal",
    html: `<form class="wp-block-form is-style-minimal">
  <input type="text" placeholder="Name" />
  <input type="email" placeholder="Email" />
  <textarea rows="2" placeholder="Message"></textarea>
</form>`,
    css: `.wp-block-form.is-style-minimal input,
.wp-block-form.is-style-minimal textarea {
  background: transparent;
  border: none;
  border-bottom: 2px solid var(--color-border);
  border-radius: 0;
  padding: 12px 0;
}
.wp-block-form.is-style-minimal input:focus,
.wp-block-form.is-style-minimal textarea:focus {
  border-color: var(--color-neon-blue);
  box-shadow: none;
}`
  },
  {
    id: "neon-glow",
    title: "Neon Glow Form",
    description: "Inputs that glow brightly on focus.",
    className: "wp-block-form is-style-neon-glow",
    html: `<form class="wp-block-form is-style-neon-glow">
  <input type="email" placeholder="Subscribe to newsletter" />
</form>`,
    css: `.wp-block-form.is-style-neon-glow input {
  background: rgba(0,0,0,0.5);
  border: 1px solid var(--color-border);
  color: #fff;
}
.wp-block-form.is-style-neon-glow input:focus {
  border-color: var(--color-neon-green);
  box-shadow: 0 0 15px rgba(57, 255, 20, 0.5);
}`
  }
];
