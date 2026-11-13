import type { Meta, StoryObj } from '@storybook/react-vite';
import React, { useEffect, useState } from 'react';

function ComputedToken({ name }: { name: string }) {
  const [value, setValue] = useState('');

  useEffect(() => {
    setValue(getComputedStyle(document.documentElement).getPropertyValue(name).trim());
  }, [name]);

  return (
    <div className="storybook-token">
      <code>{name}</code>
      <span>{value || 'not defined in this context'}</span>
    </div>
  );
}

function FoundationsCanvas({ dark }: { dark: boolean }) {
  useEffect(() => {
    document.documentElement.classList.toggle('dark', dark);
    document.documentElement.setAttribute('data-theme', dark ? 'dark' : 'light');
    return () => {
      document.documentElement.classList.remove('dark');
      document.documentElement.removeAttribute('data-theme');
    };
  }, [dark]);

  return (
    <main className="storybook-canvas" style={{ minHeight: '100vh', padding: 'clamp(1rem, 4vw, 4rem)' }}>
      <div style={{ maxWidth: '62rem', margin: '0 auto' }}>
        <p className="storybook-eyebrow">Foundations · {dark ? 'dark' : 'light'} mode</p>
        <h1 style={{ fontFamily: 'var(--wp--preset--font-family--brand-heading)' }}>Computed production foundations</h1>
        <p style={{ maxWidth: '42rem' }}>
          Values below are read from the production CSS entry at runtime. Stories do not redefine the token catalogue.
        </p>
        <div className="storybook-token-grid">
          <ComputedToken name="--wp--preset--color--primary" />
          <ComputedToken name="--wp--preset--color--base" />
          <ComputedToken name="--wp--preset--color--contrast" />
          <ComputedToken name="--wp--preset--font-family--brand-body" />
          <ComputedToken name="--wp--preset--font-family--brand-heading" />
          <ComputedToken name="--wp--preset--spacing--fluid-md" />
        </div>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', marginTop: '2rem' }}>
          <button className="button button--primary" type="button">Existing primary button</button>
          <button className="button button--secondary" type="button">Existing secondary button</button>
          <button className="button button--ghost" type="button">Existing ghost button</button>
        </div>
        <p className="storybook-note">
          Limitation: the repository does not currently load local font binaries in this catalogue; computed font stacks show the production fallbacks.
        </p>
      </div>
    </main>
  );
}

const meta = {
  title: 'Foundations/Production CSS',
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: 'Production CSS entry, computed tokens and existing .btn patterns. Token definitions are never duplicated here.',
      },
    },
  },
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

export const Light: Story = { render: () => <FoundationsCanvas dark={false} /> };
export const Dark: Story = { render: () => <FoundationsCanvas dark /> };
