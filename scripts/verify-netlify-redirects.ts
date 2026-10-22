#!/usr/bin/env node
/**
 * Netlify Redirect Structural Regression Check
 *
 * Verifies:
 * - public/_redirects exists as regular file (not directory)
 * - dist/_redirects is generated correctly
 * - Source and generated contents match exactly
 * - Fallback rule is preserved
 * - Static file precedence is maintained
 */

import fs from 'fs';
import path from 'path';
import crypto from 'crypto';

interface CheckResult {
  name: string;
  passed: boolean;
  details?: string;
  error?: string;
}

const results: CheckResult[] = [];
const projectRoot = process.cwd();

// Check 1: Source file exists and is regular file
try {
  const publicRedirectsPath = path.join(projectRoot, 'public', '_redirects');
  const stats = fs.statSync(publicRedirectsPath);
  if (stats.isFile()) {
    results.push({
      name: 'public/_redirects exists as regular file',
      passed: true,
      details: `File size: ${stats.size} bytes`
    });
  } else if (stats.isDirectory()) {
    results.push({
      name: 'public/_redirects exists as regular file',
      passed: false,
      error: 'public/_redirects is a directory, not a file'
    });
  }
} catch (e: any) {
  results.push({
    name: 'public/_redirects exists as regular file',
    passed: false,
    error: e.message
  });
}

// Check 2: Generated dist file exists and is regular file
try {
  const distRedirectsPath = path.join(projectRoot, 'dist', '_redirects');
  const stats = fs.statSync(distRedirectsPath);
  if (stats.isFile()) {
    results.push({
      name: 'dist/_redirects exists as regular file',
      passed: true,
      details: `File size: ${stats.size} bytes`
    });
  } else if (stats.isDirectory()) {
    results.push({
      name: 'dist/_redirects exists as regular file',
      passed: false,
      error: 'dist/_redirects is a directory, not a file'
    });
  }
} catch (e: any) {
  results.push({
    name: 'dist/_redirects exists as regular file',
    passed: false,
    error: e.message
  });
}

// Check 3: Source and generated contents match exactly
try {
  const publicContent = fs.readFileSync(path.join(projectRoot, 'public', '_redirects'), 'utf-8');
  const distContent = fs.readFileSync(path.join(projectRoot, 'dist', '_redirects'), 'utf-8');

  if (publicContent === distContent) {
    results.push({
      name: 'Source and generated contents match exactly',
      passed: true,
      details: `Both files contain ${publicContent.length} characters`
    });
  } else {
    results.push({
      name: 'Source and generated contents match exactly',
      passed: false,
      error: 'File contents differ'
    });
  }
} catch (e: any) {
  results.push({
    name: 'Source and generated contents match exactly',
    passed: false,
    error: e.message
  });
}

// Check 4: Fallback rule is preserved
try {
  const publicContent = fs.readFileSync(path.join(projectRoot, 'public', '_redirects'), 'utf-8');
  const fallbackPattern = /\/\*\s+\/index\.html\s+200/;

  if (fallbackPattern.test(publicContent)) {
    results.push({
      name: 'Fallback rule preserved (/* /index.html 200)',
      passed: true
    });
  } else {
    results.push({
      name: 'Fallback rule preserved (/* /index.html 200)',
      passed: false,
      error: 'Fallback rule not found or incorrect'
    });
  }
} catch (e: any) {
  results.push({
    name: 'Fallback rule preserved (/* /index.html 200)',
    passed: false,
    error: e.message
  });
}

// Check 5: No force redirect rule (!), preserving static file precedence
try {
  const publicContent = fs.readFileSync(path.join(projectRoot, 'public', '_redirects'), 'utf-8');

  if (!publicContent.includes('!')) {
    results.push({
      name: 'No force redirect rule (! absent, static files have precedence)',
      passed: true
    });
  } else {
    results.push({
      name: 'No force redirect rule (! absent, static files have precedence)',
      passed: false,
      error: 'Found force redirect (!) which breaks static file precedence'
    });
  }
} catch (e: any) {
  results.push({
    name: 'No force redirect rule (! absent, static files have precedence)',
    passed: false,
    error: e.message
  });
}

// Check 6: File hash comparison
try {
  const publicHash = crypto
    .createHash('sha256')
    .update(fs.readFileSync(path.join(projectRoot, 'public', '_redirects')))
    .digest('hex');
  const distHash = crypto
    .createHash('sha256')
    .update(fs.readFileSync(path.join(projectRoot, 'dist', '_redirects')))
    .digest('hex');

  if (publicHash === distHash) {
    results.push({
      name: 'SHA256 hash comparison',
      passed: true,
      details: `Hash: ${publicHash.substring(0, 16)}...`
    });
  } else {
    results.push({
      name: 'SHA256 hash comparison',
      passed: false,
      error: 'Hashes differ'
    });
  }
} catch (e: any) {
  results.push({
    name: 'SHA256 hash comparison',
    passed: false,
    error: e.message
  });
}

// Print results
console.log('\n📋 Netlify Redirect Structural Regression Check\n');
console.log('═'.repeat(60));

let allPassed = true;
results.forEach(result => {
  const icon = result.passed ? '✓' : '✗';
  console.log(`${icon} ${result.name}`);
  if (result.details) {
    console.log(`  ℹ ${result.details}`);
  }
  if (result.error) {
    console.log(`  ✗ ${result.error}`);
    allPassed = false;
  }
  if (!result.passed && !result.error) {
    allPassed = false;
  }
});

console.log('═'.repeat(60));
const passedCount = results.filter(r => r.passed).length;
console.log(`\nResult: ${passedCount}/${results.length} checks passed\n`);

process.exit(allPassed ? 0 : 1);
