/**
 * @fileoverview Snippet Generator mock data — BEM code template builder
 * @module data/mock/ui/snippet-generator
 * @version 1.0.0
 */

import type { BreadcrumbItem } from '../../../components/ui/Breadcrumbs';

export interface SnippetTemplate {
  id: string;
  name: string;
  category: 'layout' | 'card' | 'section' | 'form' | 'navigation';
  description: string;
  cssTemplate: string;
  jsxTemplate: string;
}

export const snippetGeneratorUI = {
  seo: { title: 'Snippet Generator | Developer Tools | Ash Shaw' },
  breadcrumbs: [
    { label: 'Home', href: '/' },
    { label: 'Developer tools', href: '/dev-tools' },
    { label: 'Snippet generator' },
  ] as BreadcrumbItem[],
  hero: {
    badge: 'Builder',
    title: 'Snippet generator',
    description:
      'Generate BEM-compliant CSS and JSX scaffolding for new components. Pick a template, customise the block name, and copy the output.',
  },
  templates: [
    {
      id: 'page-section',
      name: 'Page Section',
      category: 'section' as const,
      description: 'Full-width section with inner container, title, and content area.',
      cssTemplate: `/* ==========================================================================
   {{BLOCK}} Section
   ========================================================================== */

.{{block}} {
  padding: var(--wp--preset--spacing--fluid-lg) var(--wp--preset--spacing--section-horizontal);
}

.{{block}}__inner {
  max-width: var(--wp--preset--layout--wide);
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: var(--wp--preset--spacing--fluid-md);
}

.{{block}}__title {
  font-family: var(--wp--preset--font-family--brand-heading);
  color: var(--foreground);
}

.dark .{{block}}__title {
  color: #fff;
}

.{{block}}__content {
  font-family: var(--wp--preset--font-family--brand-body);
  color: var(--wp--preset--color--neutral-600);
}

.dark .{{block}}__content {
  color: var(--wp--preset--color--neutral-300);
}`,
      jsxTemplate: `import React from 'react';
import '@/styles/blocks/{{block}}.css';

export function {{Block}}Section() {
  return (
    <section className="{{block}}" aria-labelledby="{{block}}-title">
      <div className="{{block}}__inner">
        <h2 id="{{block}}-title" className="{{block}}__title">
          Section Title
        </h2>
        <div className="{{block}}__content">
          <p>Section content goes here.</p>
        </div>
      </div>
    </section>
  );
}`,
    },
    {
      id: 'content-card',
      name: 'Content Card',
      category: 'card' as const,
      description: 'Card with image, badge, title, excerpt, and CTA.',
      cssTemplate: `/* ==========================================================================
   {{BLOCK}} Card
   ========================================================================== */

.{{block}} {
  display: flex;
  flex-direction: column;
  border: 1px solid var(--border);
  border-radius: var(--wp--preset--border-radius--md);
  background: var(--wp--preset--color--base);
  overflow: hidden;
  transition: box-shadow 0.2s ease;
}

.dark .{{block}} {
  background: rgba(20, 20, 20, 0.5);
  border-color: rgba(255, 255, 255, 0.08);
}

.{{block}}:hover {
  box-shadow: var(--wp--preset--shadow--card-hover);
}

.{{block}}__image {
  width: 100%;
  aspect-ratio: 16 / 9;
  object-fit: cover;
}

.{{block}}__body {
  padding: var(--wp--preset--spacing--fluid-sm);
  display: flex;
  flex-direction: column;
  gap: var(--wp--preset--spacing--fluid-xs);
}

.{{block}}__badge {
  align-self: flex-start;
  font-size: 0.6875rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.06em;
  padding: 0.125rem 0.5rem;
  border-radius: var(--wp--preset--border-radius--full);
  background: rgba(190, 0, 254, 0.08);
  color: var(--wp--preset--color--neon-purple-text);
}

.dark .{{block}}__badge {
  background: rgba(190, 0, 254, 0.15);
  color: var(--wp--preset--color--neon-purple);
}

.{{block}}__title {
  font-family: var(--wp--preset--font-family--brand-heading);
  color: var(--foreground);
}

.dark .{{block}}__title {
  color: #fff;
}

.{{block}}__excerpt {
  font-family: var(--wp--preset--font-family--brand-body);
  font-size: var(--wp--preset--font-size--100);
  color: var(--wp--preset--color--neutral-600);
}

.dark .{{block}}__excerpt {
  color: var(--wp--preset--color--neutral-400);
}`,
      jsxTemplate: `import React from 'react';
import '@/styles/blocks/{{block}}.css';

interface {{Block}}Props {
  image: string;
  badge: string;
  title: string;
  excerpt: string;
}

export function {{Block}}Card({ image, badge, title, excerpt }: {{Block}}Props) {
  return (
    <article className="{{block}}">
      <img className="{{block}}__image" src={image} alt={title} loading="lazy" />
      <div className="{{block}}__body">
        <span className="{{block}}__badge">{badge}</span>
        <h3 className="{{block}}__title">{title}</h3>
        <p className="{{block}}__excerpt">{excerpt}</p>
      </div>
    </article>
  );
}`,
    },
    {
      id: 'grid-layout',
      name: 'Responsive Grid',
      category: 'layout' as const,
      description: 'Auto-responsive grid that goes from 1 to 3 columns.',
      cssTemplate: `/* ==========================================================================
   {{BLOCK}} Grid Layout
   ========================================================================== */

.{{block}} {
  display: grid;
  grid-template-columns: 1fr;
  gap: var(--wp--preset--spacing--fluid-sm);
}

@media (min-width: 768px) {
  .{{block}} {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (min-width: 1024px) {
  .{{block}} {
    grid-template-columns: repeat(3, 1fr);
  }
}`,
      jsxTemplate: `import React from 'react';
import '@/styles/blocks/{{block}}.css';

interface {{Block}}Props {
  children: React.ReactNode;
}

export function {{Block}}Grid({ children }: {{Block}}Props) {
  return (
    <div className="{{block}}">
      {children}
    </div>
  );
}`,
    },
    {
      id: 'form-group',
      name: 'Form Group',
      category: 'form' as const,
      description: 'Labelled form field with error state.',
      cssTemplate: `/* ==========================================================================
   {{BLOCK}} Form Group
   ========================================================================== */

.{{block}} {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

.{{block}}__label {
  font-family: var(--wp--preset--font-family--brand-body);
  font-size: var(--wp--preset--font-size--100);
  font-weight: 600;
  color: var(--foreground);
}

.dark .{{block}}__label {
  color: #fff;
}

.{{block}}__input {
  padding: 0.5rem 0.75rem;
  border: 1px solid var(--border);
  border-radius: var(--wp--preset--border-radius--sm);
  font-family: var(--wp--preset--font-family--brand-body);
  font-size: var(--wp--preset--font-size--200);
  background: var(--wp--preset--color--base);
  color: var(--foreground);
}

.dark .{{block}}__input {
  background: rgba(20, 20, 20, 0.6);
  border-color: rgba(255, 255, 255, 0.1);
  color: #fff;
}

.{{block}}__input:focus {
  outline: none;
  border-color: var(--wp--preset--color--neon-pink);
  box-shadow: 0 0 0 3px rgba(255, 16, 240, 0.15);
}

.{{block}}__input--error {
  border-color: var(--wp--preset--color--neon-red-text);
}

.dark .{{block}}__input--error {
  border-color: var(--wp--preset--color--neon-red);
}

.{{block}}__error {
  font-size: var(--wp--preset--font-size--100);
  color: var(--wp--preset--color--neon-red-text);
}

.dark .{{block}}__error {
  color: var(--wp--preset--color--neon-red);
}`,
      jsxTemplate: `import React from 'react';
import '@/styles/blocks/{{block}}.css';

interface {{Block}}Props {
  label: string;
  name: string;
  error?: string;
  type?: string;
}

export function {{Block}}({ label, name, error, type = 'text' }: {{Block}}Props) {
  return (
    <div className="{{block}}">
      <label className="{{block}}__label" htmlFor={name}>{label}</label>
      <input
        id={name}
        name={name}
        type={type}
        className={\`{{block}}__input\${error ? ' {{block}}__input--error' : ''}\`}
        aria-invalid={!!error}
        aria-describedby={error ? \`\${name}-error\` : undefined}
      />
      {error && <span id={\`\${name}-error\`} className="{{block}}__error">{error}</span>}
    </div>
  );
}`,
    },
    {
      id: 'nav-pills',
      name: 'Navigation Pills',
      category: 'navigation' as const,
      description: 'Horizontal pill-style tab navigation.',
      cssTemplate: `/* ==========================================================================
   {{BLOCK}} Navigation Pills
   ========================================================================== */

.{{block}} {
  display: flex;
  gap: var(--wp--preset--spacing--fluid-xs);
  flex-wrap: wrap;
}

.{{block}}__pill {
  padding: 0.375rem 1rem;
  border: 1px solid var(--border);
  border-radius: var(--wp--preset--border-radius--full);
  font-family: var(--wp--preset--font-family--brand-body);
  font-size: var(--wp--preset--font-size--100);
  font-weight: 600;
  background: transparent;
  color: var(--foreground);
  cursor: pointer;
  transition: all 0.15s ease;
}

.dark .{{block}}__pill {
  border-color: rgba(255, 255, 255, 0.12);
  color: #fff;
}

.{{block}}__pill:hover {
  border-color: var(--wp--preset--color--neon-purple-text);
  color: var(--wp--preset--color--neon-purple-text);
}

.dark .{{block}}__pill:hover {
  border-color: var(--wp--preset--color--neon-purple);
  color: var(--wp--preset--color--neon-purple);
}

.{{block}}__pill--active {
  background: var(--wp--preset--gradient--cyberpunk);
  color: #fff;
  border-color: transparent;
}

.{{block}}__pill:focus-visible {
  outline: 2px solid var(--wp--preset--color--neon-pink);
  outline-offset: 2px;
}`,
      jsxTemplate: `import React from 'react';
import '@/styles/blocks/{{block}}.css';

interface {{Block}}Props {
  items: string[];
  active: string;
  onSelect: (item: string) => void;
}

export function {{Block}}({ items, active, onSelect }: {{Block}}Props) {
  return (
    <nav className="{{block}}" role="tablist">
      {items.map((item) => (
        <button
          key={item}
          role="tab"
          aria-selected={item === active}
          className={\`{{block}}__pill\${item === active ? ' {{block}}__pill--active' : ''}\`}
          onClick={() => onSelect(item)}
        >
          {item}
        </button>
      ))}
    </nav>
  );
}`,
    },
  ] as SnippetTemplate[],
};