import type { Preview } from '@storybook/react-vite';
import '../src/styles/index.css';
import '../src/styles/blocks/chapter-nav.css';
import '../storybook/storybook.css';

const preview: Preview = {
  parameters: {
    layout: 'fullscreen',
    a11y: {
      test: 'todo',
    },
    viewport: {
      viewports: {
        narrow: { name: 'Narrow · 375px', styles: { width: '375px', height: '800px' } },
        wide: { name: 'Wide · 1280px', styles: { width: '1280px', height: '900px' } },
      },
      defaultViewport: 'wide',
    },
  },
};

export default preview;
