/**
 * @fileoverview Build Verification Script
 * Performs a pre-flight check before production build/deployment.
 * 
 * Checks:
 * 1. Environment Variables
 * 2. Content Integrity (Link Checking)
 * 3. Asset Availability (Public folder checks)
 * 
 * Usage:
 * ts-node scripts/verify-build.ts
 */

import fs from 'fs';
import path from 'path';
import { blogPosts } from '../data/mock/blog/posts';
import { allPortfolioWork } from '../data/mock/portfolio';

// -----------------------------------------------------------------------------
// 1. Environment Variable Check
// -----------------------------------------------------------------------------
console.log('\n🔍 Check 1: Environment Variables');
const envPath = path.resolve(__dirname, '../.env');
const envProdPath = path.resolve(__dirname, '../.env.production');

if (fs.existsSync(envProdPath)) {
  console.log('✅ Found .env.production');
} else if (fs.existsSync(envPath)) {
  console.log('✅ Found .env (ensure this is configured for production)');
} else {
  console.warn('⚠️  No .env file found. Using defaults or system environment variables.');
}

// -----------------------------------------------------------------------------
// 2. Content Integrity (Link Checking)
// -----------------------------------------------------------------------------
console.log('\n🔍 Check 2: Content Integrity');

// Simple registry of known routes
const KNOWN_ROUTES = new Set([
  '/', '/about', '/portfolio', '/blog', '/contact', '/videos', '/podcasts',
  '/search', '/terms', '/privacy', '/press', '/toolkit', '/dev-tools'
]);

// Add dynamic routes
blogPosts.forEach(p => KNOWN_ROUTES.add(`/blog/${p.slug}`));
allPortfolioWork.forEach(p => KNOWN_ROUTES.add(`/portfolio/${p.slug}`));

const brokenLinks: string[] = [];

function checkLink(source: string, link: string) {
  if (link.startsWith('http') || link.startsWith('#') || link.startsWith('mailto:')) return;
  
  // Normalize
  const cleanLink = link.split('#')[0].split('?')[0];
  const absoluteLink = cleanLink.startsWith('/') ? cleanLink : `/${cleanLink}`;

  // Basic validation (allow category/tag routes which are dynamic)
  if (
    !KNOWN_ROUTES.has(absoluteLink) && 
    !absoluteLink.startsWith('/blog/category/') && 
    !absoluteLink.startsWith('/portfolio/category/')
  ) {
    brokenLinks.push(`[${source}] -> ${link}`);
  }
}

// Scan Blog Content
blogPosts.forEach(post => {
  const matches = post.content.match(/\[.*?\]\((.*?)\)/g);
  if (matches) {
    matches.forEach(match => {
      const url = match.match(/\((.*?)\)/)?.[1];
      if (url) checkLink(`Blog: ${post.title}`, url);
    });
  }
});

if (brokenLinks.length === 0) {
  console.log('✅ All internal links verify against known routes.');
} else {
  console.warn(`⚠️  Found ${brokenLinks.length} potentially broken links:`);
  brokenLinks.forEach(l => console.warn(`   - ${l}`));
}

// -----------------------------------------------------------------------------
// 3. Asset Availability
// -----------------------------------------------------------------------------
console.log('\n🔍 Check 3: Public Assets');

const missingAssets: string[] = [];
const publicDir = path.resolve(__dirname, '../public');

function checkAsset(source: string, url: string) {
  if (!url) return;
  if (url.startsWith('/') && !url.startsWith('//')) {
    // Local asset in public folder
    const filePath = path.join(publicDir, url);
    if (!fs.existsSync(filePath)) {
      missingAssets.push(`[${source}] -> ${url}`);
    }
  }
}

// Scan Portfolio Images
allPortfolioWork.forEach(work => {
  work.images.forEach(img => checkAsset(`Portfolio: ${work.title}`, img.src));
});

// Scan Blog Images
blogPosts.forEach(post => {
  if (post.featuredImage) checkAsset(`Blog: ${post.title}`, post.featuredImage.src);
});

if (missingAssets.length === 0) {
  console.log('✅ All local asset references exist in /public.');
} else {
  console.error(`❌ Found ${missingAssets.length} missing assets:`);
  missingAssets.forEach(a => console.error(`   - ${a}`));
}

console.log('\n🏁 Verification Complete.\n');