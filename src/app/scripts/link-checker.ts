/**
 * @fileoverview Automated Link Checker
 * Scans all mock data content for internal links and verifies they point to valid routes.
 * 
 * Usage:
 * ts-node scripts/link-checker.ts
 */

import { blogPosts } from '../data/mock/blog/posts';
import { allPortfolioWork } from '../data/mock/portfolio';
import { getPageIdFromPath } from '../hooks/useAppNavigate';