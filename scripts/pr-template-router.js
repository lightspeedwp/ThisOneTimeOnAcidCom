#!/usr/bin/env node

/**
 * PR Template Router
 * Routes PR templates and applies labels based on branch name prefix
 * Outputs JSON with template path and labels array
 */

const branchName = process.argv[2];

if (!branchName) {
  console.error('Error: Branch name required');
  process.exit(1);
}

// Extract the type prefix from branch name (e.g., "feat/my-feature" -> "feat")
const typeMatch = branchName.match(/^([a-z]+)\//);
const branchType = typeMatch ? typeMatch[1] : 'task';

// Map branch types to PR templates and default labels
const typeMap = {
  feat: {
    template: 'feat',
    labels: ['type:feature']
  },
  fix: {
    template: 'fix',
    labels: ['type:bug']
  },
  docs: {
    template: 'docs',
    labels: ['type:documentation']
  },
  doc: {
    template: 'docs',
    labels: ['type:documentation']
  },
  design: {
    template: 'design',
    labels: ['type:design']
  },
  test: {
    template: 'test',
    labels: ['type:test']
  },
  refactor: {
    template: 'refactor',
    labels: ['type:refactor']
  },
  perf: {
    template: 'perf',
    labels: ['type:performance']
  },
  security: {
    template: 'security',
    labels: ['type:security']
  },
  chore: {
    template: 'chore',
    labels: ['type:chore']
  },
  ci: {
    template: 'ci',
    labels: ['type:ci', 'area:ci']
  },
  hotfix: {
    template: 'fix',
    labels: ['type:hotfix']
  }
};

const config = typeMap[branchType] || {
  template: 'default',
  labels: ['type:task']
};

// Extract scope from branch name (e.g., "feat/governance-audit" -> "governance-audit")
const scopeMatch = branchName.match(/^[a-z]+\/(.+)$/);
const scope = scopeMatch ? scopeMatch[1] : 'unknown';

// Output JSON that GitHub Actions can parse
const output = {
  template: config.template,
  default_labels: config.labels,
  branch_type: branchType,
  scope: scope
};

console.log(JSON.stringify(output));
