import type { Meta, StoryObj } from '@storybook/react-vite';
import React from 'react';
import { Accordion } from '../../src/app/components/ui/Accordion';

const items = [
  { id: 'arrival', title: 'The late arrival', content: <p>A short fictional passage about arriving after the room has changed.</p> },
  { id: 'signal', title: 'The signal in the noise', content: <p>A second fictional passage that demonstrates independent collapsed and expanded regions.</p> },
  { id: 'rhythm', title: 'Finding a rhythm', content: <p>A third fictional passage for arrow, Home and End navigation checks.</p> },
];

const longContent = Array.from({ length: 8 }, (_, index) => (
  <p key={index}>Long-form fictional content block {index + 1}. This remains inside the expanded region and is not keyboard-accessible while collapsed.</p>
));

const meta = {
  title: 'Components/Accordion',
  component: Accordion,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: 'Actual API: items, allowMultiple and defaultOpen. Check Enter/Space activation, Arrow Up/Down, Home, End, aria-expanded and hidden collapsed content. Reset each story independently.',
      },
    },
  },
} satisfies Meta<typeof Accordion>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Closed: Story = { args: { items } };
export const Open: Story = { args: { items, defaultOpen: ['arrival'] } };
export const MultipleOpen: Story = { args: { items, allowMultiple: true, defaultOpen: ['arrival', 'signal'] } };
export const LongContent: Story = { args: { items: [{ id: 'long', title: 'A long fictional chapter excerpt', content: longContent }] } };
