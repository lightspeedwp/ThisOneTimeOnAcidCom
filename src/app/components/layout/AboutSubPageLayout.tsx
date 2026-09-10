/**
 * @fileoverview AboutSubPageLayout - Reusable layout wrapper for about sub-pages
 * 
 * Provides consistent structure for all about sub-pages:
 * - Hero section with breadcrumbs, badge, title, description
 * - Main content area
 * - Consistent spacing and styling
 * 
 * Used by:
 * - BioPage, BerlinPage, AdhdPage, FitnessPage
 * - CyclingPage, EducationPage, LucyPage, MusicPage
 * - ProcessPage, ResourcesPage, SixCatsPage, TravelsPage
 * - TribesPage, AquariusPage, etc.
 * 
 * @component AboutSubPageLayout
 * @version 1.0.0
 */

import React, { ReactNode } from 'react';
import { Breadcrumbs } from '../ui/Breadcrumbs';
import '../../../styles/blocks/about-subpage.css';

interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface HeroData {
  badge: string;
  title: string;
  description: string;
}

interface AboutSubPageLayoutProps {
  /** Breadcrumb navigation items */
  breadcrumbs: BreadcrumbItem[];
  
  /** Hero section data */
  hero: HeroData;
  
  /** Page-specific modifier class (e.g., 'bio', 'berlin', 'adhd') */
  pageModifier: string;
  
  /** Main content area */
  children: ReactNode;
  
  /** Optional className for additional styling */
  className?: string;
}

/**
 * AboutSubPageLayout Component
 * 
 * Provides consistent layout structure for all about sub-pages.
 * 
 * @example
 * ```tsx
 * <AboutSubPageLayout
 *   breadcrumbs={[
 *     { label: 'Home', href: '/' },
 *     { label: 'About', href: '/about' },
 *     { label: 'Bio' }
 *   ]}
 *   hero={{
 *     badge: 'Personal',
 *     title: 'Biography',
 *     description: 'Quick facts and full story'
 *   }}
 *   pageModifier="bio"
 * >
 *   <ContentSection {...content} />
 * </AboutSubPageLayout>
 * ```
 */
export function AboutSubPageLayout({
  breadcrumbs,
  hero,
  pageModifier,
  children,
  className = '',
}: AboutSubPageLayoutProps) {
  return (
    <main
      id="main-content"
      role="main"
      tabIndex={-1}
      className={`about-subpage about-subpage--${pageModifier} bg-atomic-noise ${className}`.trim()}
    >
      {/* ── Hero Section ── */}
      <header className="about-subpage__hero section-spacing px-horizontal-section">
        <div className="about-subpage__hero-content section-container">
          <Breadcrumbs items={breadcrumbs} centered />

          <span className="about-subpage__hero-badge">
            {hero.badge}
          </span>

          <h1 className="text-hero-h1 text-gradient-pink-purple-blue">
            {hero.title}
          </h1>

          <p className="about-subpage__hero-desc text-body-p">
            {hero.description}
          </p>
        </div>
      </header>

      {/* ── Main Content ── */}
      {children}
    </main>
  );
}
