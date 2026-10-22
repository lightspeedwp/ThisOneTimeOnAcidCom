import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    globals: true,
    environment: 'node',
    include: [
      '**/scripts/**/*.test.{ts,js}',
      '**/tests/**/*.test.{ts,js}',
      '**/*.test.{ts,js}',
    ],
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html'],
      include: ['scripts/**/*.{ts,js}'],
      exclude: ['node_modules/', '**/*.test.{ts,js}'],
    },
    testTimeout: 10000,
  },
});
