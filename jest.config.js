/**
 * Jest test runner configuration for ThisOneTimeOnAcidCom.
 * Validates branch names, validates scripts, and runs test suites.
 */

export default {
  testEnvironment: 'node',
  testMatch: ['**/scripts/**/*.test.js'],
  moduleFileExtensions: ['js', 'json'],
  collectCoverageFrom: [
    'scripts/**/*.js',
    '!scripts/**/*.test.js',
    '!scripts/test-server.js'
  ],
  coverageThreshold: {
    global: {
      branches: 90,
      functions: 100,
      lines: 90,
      statements: 90
    }
  }
};
