/**
 * @fileoverview Analytics Dashboard mock data
 * Provides historical trend data, content engagement metrics, and
 * device/referral breakdowns for the analytics dev-tool page.
 *
 * Real-time session data is pulled from localStorage via analyticsService.
 * This file provides the mock "historical" context around it.
 *
 * @module data/mock/ui/analytics-dashboard
 * @version 1.0.0
 */

import type { BreadcrumbItem } from '../../../components/ui/Breadcrumbs';

export interface TrendDataPoint {
  label: string;
  value: number;
}

export interface ContentMetric {
  slug: string;
  title: string;
  type: 'blog' | 'portfolio' | 'video' | 'podcast';
  views: number;
  likes: number;
  avgTimeSeconds: number;
}

export interface DeviceBreakdown {
  device: string;
  percentage: number;
  color: string;
}

export interface ReferralSource {
  source: string;
  visits: number;
  percentage: number;
}

export interface SearchQuery {
  query: string;
  count: number;
}

export const analyticsDashboardUI = {
  seo: { title: 'Analytics Dashboard | Developer Tools | Ash Shaw' },
  breadcrumbs: [
    { label: 'Home', href: '/' },
    { label: 'Developer tools', href: '/dev-tools' },
    { label: 'Analytics dashboard' },
  ] as BreadcrumbItem[],
  hero: {
    badge: 'Analytics',
    title: 'Analytics dashboard',
    description:
      'Track page views, content engagement, popular posts, search queries, and visitor behaviour. Session data is stored locally in the browser — no external tracking scripts.',
  },

  /** Summary cards at top */
  summaryLabels: {
    totalViews: 'Total Page Views',
    uniqueContent: 'Content Items Viewed',
    avgSessionTime: 'Avg. Session Time',
    topContentType: 'Top Content Type',
    recentHistory: 'Recently Viewed',
    popularSearches: 'Popular Searches',
  },

  /** Mock weekly trend (last 7 days) */
  weeklyTrend: [
    { label: 'Mon', value: 42 },
    { label: 'Tue', value: 58 },
    { label: 'Wed', value: 36 },
    { label: 'Thu', value: 71 },
    { label: 'Fri', value: 89 },
    { label: 'Sat', value: 64 },
    { label: 'Sun', value: 53 },
  ] as TrendDataPoint[],

  /** Mock top content (seeded from real mock data slugs) */
  topContent: [
    { slug: 'neon-face-paint-festival', title: 'Neon face paint festival', type: 'portfolio' as const, views: 187, likes: 34, avgTimeSeconds: 45 },
    { slug: 'getting-started-with-uv-makeup', title: 'Getting started with UV makeup', type: 'blog' as const, views: 156, likes: 28, avgTimeSeconds: 180 },
    { slug: 'berlin-nightlife-neon', title: 'Berlin nightlife neon', type: 'portfolio' as const, views: 142, likes: 22, avgTimeSeconds: 38 },
    { slug: 'festival-season-essentials', title: 'Festival season essentials', type: 'blog' as const, views: 128, likes: 19, avgTimeSeconds: 210 },
    { slug: 'behind-the-scenes-editorial', title: 'Behind the scenes: editorial', type: 'video' as const, views: 115, likes: 16, avgTimeSeconds: 320 },
    { slug: 'neon-vs-atomic-ep1', title: 'Neon vs Atomic Black \u2014 Ep 1', type: 'podcast' as const, views: 98, likes: 12, avgTimeSeconds: 1800 },
    { slug: 'swiss-festival-highlights', title: 'Swiss festival highlights', type: 'portfolio' as const, views: 91, likes: 15, avgTimeSeconds: 42 },
    { slug: 'color-theory-for-makeup', title: 'Colour theory for makeup artists', type: 'blog' as const, views: 87, likes: 11, avgTimeSeconds: 240 },
  ] as ContentMetric[],

  /** Mock device breakdown */
  devices: [
    { device: 'Mobile', percentage: 58, color: 'var(--wp--preset--color--neon-pink)' },
    { device: 'Desktop', percentage: 32, color: 'var(--wp--preset--color--neon-blue)' },
    { device: 'Tablet', percentage: 10, color: 'var(--wp--preset--color--neon-cyan)' },
  ] as DeviceBreakdown[],

  /** Mock referral sources */
  referrals: [
    { source: 'Instagram', visits: 340, percentage: 38 },
    { source: 'Direct', visits: 220, percentage: 25 },
    { source: 'Google Search', visits: 178, percentage: 20 },
    { source: 'Facebook', visits: 85, percentage: 10 },
    { source: 'Other', visits: 62, percentage: 7 },
  ] as ReferralSource[],

  /** Mock popular search queries */
  popularSearches: [
    { query: 'neon', count: 34 },
    { query: 'festival makeup', count: 28 },
    { query: 'UV', count: 22 },
    { query: 'berlin', count: 19 },
    { query: 'face paint', count: 16 },
    { query: 'tutorial', count: 14 },
    { query: 'editorial', count: 11 },
    { query: 'glitter', count: 9 },
  ] as SearchQuery[],

  /** Content type distribution */
  contentTypeDistribution: [
    { label: 'Portfolio', value: 26, color: 'var(--wp--preset--color--neon-green)' },
    { label: 'Blog', value: 12, color: 'var(--wp--preset--color--neon-pink)' },
    { label: 'Videos', value: 8, color: 'var(--wp--preset--color--neon-blue)' },
    { label: 'Podcasts', value: 6, color: 'var(--wp--preset--color--neon-purple)' },
  ],

  /** Section labels */
  sectionTitles: {
    liveSession: 'Live Session Data',
    weeklyTrend: 'Weekly Page Views',
    topContent: 'Top Content',
    devices: 'Device Breakdown',
    referrals: 'Referral Sources',
    searches: 'Popular Search Queries',
    history: 'Viewing History',
    contentTypes: 'Content Type Distribution',
  },
};