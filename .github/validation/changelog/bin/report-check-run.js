#!/usr/bin/env node

/**
 * Check run reporter
 * Phase 1: reports changelog validation results as a GitHub check run
 * Uses GitHub API to create or update check run with validation results
 */

const fs = require('fs');
const https = require('https');

const args = process.argv.slice(2);
const reportPath = args[args.indexOf('--report-path') + 1];
const githubToken = args[args.indexOf('--github-token') + 1];
const owner = args[args.indexOf('--owner') + 1];
const repo = args[args.indexOf('--repo') + 1];
const sha = args[args.indexOf('--sha') + 1];
const prNumber = args[args.indexOf('--pr-number') + 1];

if (!reportPath || !githubToken || !owner || !repo || !sha) {
  console.error('Error: missing required arguments (--report-path, --github-token, --owner, --repo, --sha)');
  process.exit(1);
}

let report = null;
try {
  const reportContent = fs.readFileSync(reportPath, 'utf8');
  report = JSON.parse(reportContent);
} catch (error) {
  console.error(`Error reading or parsing report: ${error.message}`);
  process.exit(1);
}

// Build check run payload
const checkRunPayload = {
  name: 'Changelog Validation',
  head_sha: sha,
  status: 'completed',
  conclusion: report.summary.new_failed === 0 ? 'success' : 'failure',
  output: {
    title: 'Changelog Validation',
    summary: report.recommendation || 'Changelog validation completed',
    text: `Passed: ${report.summary.passed}, Failed: ${report.summary.failed}, New failures: ${report.summary.new_failed}, Warnings: ${report.summary.warnings}`
  }
};

// Make GitHub API request to create check run
const requestBody = JSON.stringify(checkRunPayload);
const options = {
  hostname: 'api.github.com',
  path: `/repos/${owner}/${repo}/check-runs`,
  method: 'POST',
  headers: {
    'Authorization': `Bearer ${githubToken}`,
    'Accept': 'application/vnd.github+json',
    'X-GitHub-Api-Version': '2022-11-28',
    'Content-Type': 'application/json',
    'Content-Length': Buffer.byteLength(requestBody),
    'User-Agent': 'ThisOneTimeOnAcidCom/changelog-validator'
  }
};

const request = https.request(options, (response) => {
  let data = '';
  response.on('data', (chunk) => { data += chunk; });
  response.on('end', () => {
    if (response.statusCode >= 200 && response.statusCode < 300) {
      console.log(`✓ Check run created for ${sha.substring(0, 8)}`);
      process.exit(0);
    } else {
      console.error(`Error: GitHub API returned ${response.statusCode}`);
      console.error(data);
      process.exit(1);
    }
  });
});

request.on('error', (error) => {
  console.error(`Request error: ${error.message}`);
  process.exit(1);
});

request.write(requestBody);
request.end();
