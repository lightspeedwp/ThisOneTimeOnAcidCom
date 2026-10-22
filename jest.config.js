export default {
  testEnvironment: 'node',
  transform: {
    '^.+\\.jsx?$': ['@swc/jest'],
  },
  moduleFileExtensions: ['js', 'jsx', 'mjs', 'ts', 'tsx'],
  testMatch: [
    '**/scripts/**/*.test.js',
    '**/tests/**/*.test.js',
  ],
  collectCoverageFrom: [
    'scripts/**/*.js',
    '!scripts/**/*.test.js',
  ],
};
