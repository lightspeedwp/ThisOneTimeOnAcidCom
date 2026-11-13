import type { Meta, StoryObj } from '@storybook/react-vite';
import React from 'react';
import { ThemeToggleES5 } from '../../src/app/components/common/ThemeToggleES5';

function prepareTheme(theme: 'light' | 'dark') {
  localStorage.removeItem('theme');
  localStorage.setItem('theme', theme);
  document.documentElement.classList.toggle('dark', theme === 'dark');
  document.documentElement.setAttribute('data-theme', theme);
}

function ThemeExample({ initialTheme }: { initialTheme: 'light' | 'dark' }) {
  prepareTheme(initialTheme);
  return (
    <div style={{ display: 'grid', placeItems: 'center', minHeight: '16rem', padding: '2rem' }}>
      <ThemeToggleES5 />
    </div>
  );
}

const meta = {
  title: 'Components/ThemeToggleES5',
  component: ThemeToggleES5,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: 'Matches the existing document class, data-theme attribute and theme storage key. Each story resets storage and document state before mounting; no second theme controller is introduced.',
      },
    },
  },
} satisfies Meta<typeof ThemeToggleES5>;

export default meta;
type Story = StoryObj<typeof meta>;

export const InitialLight: Story = { render: () => <ThemeExample initialTheme="light" /> };
export const InitialDark: Story = { render: () => <ThemeExample initialTheme="dark" /> };
export const UserSwitching: Story = {
  render: () => <ThemeExample initialTheme="light" />,
  parameters: { docs: { description: { story: 'Activate the button with pointer, Enter and Space. Confirm document.documentElement.classList, data-theme and localStorage.theme update together.' } } },
};
