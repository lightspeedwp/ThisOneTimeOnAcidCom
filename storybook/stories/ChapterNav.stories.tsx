import type { Meta, StoryObj } from '@storybook/react-vite';
import React, { useState } from 'react';
import { ChapterNav } from '../../src/app/components/ui/ChapterNav';

const chapters = [
  { id: 'first-light', label: 'First Light' },
  { id: 'strange-weather', label: 'Strange Weather' },
  { id: 'the-long-way-home', label: 'The Long Way Home' },
];

const longChapters = Array.from({ length: 12 }, (_, index) => ({
  id: `chapter-${index + 1}`,
  label: `Fictional Chapter ${index + 1} With a Deliberately Long Label`,
}));

function CallbackExample({ activeChapter, entries = chapters }: { activeChapter?: string; entries?: typeof chapters }) {
  const [lastSelected, setLastSelected] = useState('none');
  return (
    <div style={{ display: 'grid', gap: '1rem', minWidth: 0, maxWidth: '100%', padding: 'clamp(1rem, 4vw, 4rem)' }}>
      <ChapterNav chapters={entries} activeChapter={activeChapter} onChapterClick={setLastSelected} stickyClass="storybook-chapter-nav-frame" />
      <output aria-live="polite">Last selected: {lastSelected}</output>
    </div>
  );
}

const meta = {
  title: 'Components/ChapterNav',
  component: ChapterNav,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: 'Uses the existing chapter-nav block stylesheet. Fixtures are fictional; callback stories do not mount the application router. At narrow widths, verify horizontal overflow preserves all controls.',
      },
    },
  },
} satisfies Meta<typeof ChapterNav>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Empty: Story = { args: { chapters: [] } };
export const Active: Story = { render: () => <CallbackExample activeChapter="strange-weather" /> };
export const NoActive: Story = { render: () => <CallbackExample /> };
export const OverflowingLabels: Story = { render: () => <CallbackExample entries={longChapters} /> };
