/**
 * Jest test runner configuration for ThisOneTimeOnAcidCom.
 * Validates branch names, validates scripts, and runs test suites.
 *
 * Module handling:
 * - @swc/jest transforms ESM import/export syntax for Jest.
 * - The current test:unit command does not run tests as native ESM.
 */

export default {
  testEnvironment: 'node',
  testMatch: ['**/scripts/**/*.test.js'],
  moduleFileExtensions: ['js', 'json'],
  transform: {
    '^.+\\.js$': ['@swc/jest', { module: { type: 'commonjs' } }],
  },
  collectCoverageFrom: [
    'scripts/**/*.js',
    '!scripts/**/*.test.js'
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
