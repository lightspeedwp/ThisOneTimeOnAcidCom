/**
 * Jest test runner configuration for ThisOneTimeOnAcidCom.
 * Validates branch names, validates scripts, and runs test suites.
 */

export default {
  testEnvironment: 'node',
  testMatch: ['**/scripts/**/*.test.js'],
  moduleFileExtensions: ['js', 'json'],
  transform: {
    '^.+\\.js$': ['@swc/jest'],
  },
  collectCoverageFrom: [
    'scripts/**/*.js',
    '!scripts/**/*.test.js',
    '!scripts/test-server.js'
  ],
  coverageThreshold: {
    global: {
      branches: 70,
      functions: 70,
      lines: 70,
      statements: 70
    }
  }
};
