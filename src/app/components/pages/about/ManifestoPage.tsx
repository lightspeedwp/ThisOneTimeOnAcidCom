/**
 * @fileoverview Manifesto Page — Neon vs Atomic Black creative philosophy
 *
 * Redesigned with Phase 3 components: PullQuote, ContentSection.
 * Removed inline styles, template literals, and Tailwind utility classes.
 * Strict BEM architecture.
 *
 * @component ManifestoPage
 * @version 2.0.0 — Phase 5 Polish
 */

import React, { useEffect } from 'react';
import { manifestoPageData } from '../../../data/mock/pages/manifesto';
import { Breadcrumbs } from '../../ui/Breadcrumbs';
import { PullQuote } from '../../ui/PullQuote';
import { ContentSection } from '../../sections/ContentSection';
import { setSEO } from '../../../utils/seo';
import { pageSEO } from '../../../data/mock/seo';
import '../../../../styles/blocks/manifesto-page.css';

/**
 * Map section theme string to neon color accent
 */
function themeToAccent(theme: string): 'pink' | 'green' | 'blue' | 'purple' {
  if (theme === 'neon-pink') return 'pink';
  if (theme === 'neon-green') return 'green';
  if (theme === 'neon-cyan') return 'blue';
  if (theme === 'neon-purple') return 'purple';
  return 'purple';
}

export function ManifestoPage() {
  useEffect(function () {
    var seo = pageSEO.manifesto;
    if (seo) {
      setSEO(seo);
    } else {
      setSEO({
        title: 'Manifesto: Neon vs Atomic Black | Ash Shaw Makeup',
        description: manifestoPageData.hero.description,
      });
    }
  }, []);

  var heroData = manifestoPageData.hero;
  var sections = manifestoPageData.sections;
  var footerQuote = manifestoPageData.footerQuote;

  return (
    <main
      id="main-content"
      role="main"
      tabIndex={-1}
      className="manifesto-page bg-atomic-noise"
    >
      {/* ── Hero ── */}
      <header className="manifesto-page__hero section-spacing px-horizontal-section">
        <div className="manifesto-page__hero-inner section-container">
          <Breadcrumbs
            items={[
              { label: 'Home', href: '/' },
              { label: 'About', href: '/about' },
              { label: 'Manifesto' },
            ]}
            centered
          />
          <h1 className="text-hero-h1 text-gradient-cyberpunk manifesto-page__title">
            {heroData.title}
          </h1>
          <p className="manifesto-page__hero-desc neon-text-gradient neon-text-gradient--pink">
            {heroData.description}
          </p>
        </div>
      </header>

      {/* ── Manifesto Sections ── */}
      <div className="manifesto-scroll-container section-spacing px-horizontal-section">
        <div className="section-container">
          {sections.map(function (section) {
            var accent = themeToAccent(section.theme);

            return (
              <div key={section.id} className="entrance-fade-up">
                <ContentSection
                  id={section.id}
                  title={section.title}
                  variant="callout"
                  colorAccent={accent}
                  backgroundPattern="noise"
                >
                  <p className="manifesto-content">
                    {section.content}
                  </p>
                </ContentSection>
              </div>
            );
          })}
        </div>
      </div>

      {/* ── Footer Quote ── */}
      <div className="manifesto-footer-section section-spacing px-horizontal-section">
        <div className="section-container">
          <PullQuote
            quote={footerQuote}
            variant="center"
            neonColor="pink"
          />
        </div>
      </div>
    </main>
  );
}