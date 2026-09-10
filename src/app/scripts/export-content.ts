/**
 * @fileoverview Content Export Script
 * Generates a JSON file compatible with WordPress import tools (e.g., WP All Import).
 * 
 * Usage:
 * ts-node scripts/export-content.ts
 */

import fs from 'fs';
import path from 'path';
import { blogPosts } from '../data/mock/blog/posts';
import { allPortfolioWork } from '../data/mock/portfolio';

interface WordPressPost {
  post_title: string;
  post_content: string;
  post_excerpt: string;
  post_status: string;
  post_date: string;
  post_slug: string;
  post_type: 'post' | 'portfolio';
  taxonomies: {
    category?: string[];
    post_tag?: string[];
    portfolio_category?: string[];
  };
  meta: Record<string, any>;
  featured_image?: string;
}

const exportData: WordPressPost[] = [];

// 1. Process Blog Posts
blogPosts.forEach(post => {
  exportData.push({
    post_title: post.title,
    post_content: post.content,
    post_excerpt: post.excerpt,
    post_status: 'publish',
    post_date: post.publishedAt, // Normalized ISO date
    post_slug: post.slug,
    post_type: 'post',
    taxonomies: {
      category: post.category ? [post.category] : [],
      post_tag: post.tags || []
    },
    meta: {
      _read_time: post.readTime,
      _featured: post.featured ? '1' : '0',
      _author_name: post.author?.name
    },
    featured_image: post.featuredImage?.src
  });
});

// 2. Process Portfolio Entries
allPortfolioWork.forEach(entry => {
  exportData.push({
    post_title: entry.title,
    post_content: entry.description, // Mapping description to content
    post_excerpt: entry.excerpt || '',
    post_status: 'publish',
    post_date: entry.date || new Date().toISOString(),
    post_slug: entry.slug,
    post_type: 'portfolio',
    taxonomies: {
      portfolio_category: [entry.category],
      post_tag: entry.tags || []
    },
    meta: {
      _location: entry.location,
      _event: entry.event,
      _featured: entry.featured ? '1' : '0',
      _images: JSON.stringify(entry.images) // Complex field for ACF
    },
    featured_image: entry.images[0]?.src
  });
});

// 3. Write to file
const outputDir = path.resolve(__dirname, '../dist');
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

const outputPath = path.join(outputDir, 'wordpress-export.json');
fs.writeFileSync(outputPath, JSON.stringify(exportData, null, 2));

console.log(`✅ Exported ${exportData.length} items to ${outputPath}`);
console.log(`   - ${blogPosts.length} Blog Posts`);
console.log(`   - ${allPortfolioWork.length} Portfolio Entries`);