/**
 * @fileoverview ADHD — Wired Different
 * Ash's experience with ADHD: honest, personal, anti-stigma.
 *
 * Neon accent: Yellow
 * Phase 5 Polish — integrated PullQuote & ContentSection components
 *
 * @component AdhdPage
 * @version 2.0.0
 */

import React, { useEffect } from 'react';
import { adhdPageData } from '../../../data/mock/pages/about-subpages';
import { setSEO } from '../../../utils/seo';
import { pageSEO } from '../../../data/mock/seo';
import { Breadcrumbs } from '../../ui/Breadcrumbs';
import { PullQuote } from '../../ui/PullQuote';
import { StatCard } from '../../ui/StatCard';
import { ContentSection } from '../../sections/ContentSection';
import '../../../../styles/blocks/about-subpage.css';

export function AdhdPage() {
  useEffect(function () {
    setSEO(pageSEO.adhd);
  }, []);

  var data = adhdPageData;

  return (
    <main
      id="main-content"
      role="main"
      tabIndex={-1}
      className="about-subpage about-subpage--adhd bg-atomic-noise"
    >
      {/* ── Hero ── */}
      <header className="about-subpage__hero section-spacing px-horizontal-section">
        <div className="about-subpage__hero-content section-container">
          <Breadcrumbs items={data.breadcrumbs} centered />

          <span className="about-subpage__hero-badge">
            {data.hero.badge}
          </span>

          <h1 className="text-hero-h1 text-gradient-pink-purple-blue">
            {data.hero.title}
          </h1>

          <p className="about-subpage__hero-desc text-body-p">
            {data.hero.description}
          </p>
        </div>
      </header>

      {/* ── Pull Quote (Phase 3 component) ── */}
      <div className="about-subpage__body section-spacing px-horizontal-section">
        <div className="section-container">
          <div className="entrance-fade-up">
            <PullQuote
              quote={data.pullQuote}
              variant="center"
              neonColor="yellow"
            />
          </div>

          {/* ── Quick Facts ── */}
          <StatCard
            items={data.quickFacts}
            ariaLabel="ADHD quick facts"
          />
        </div>
      </div>

      {/* ── Sections (wrapped in ContentSection) ── */}
      <div className="about-subpage__body section-spacing px-horizontal-section">
        <div className="section-container">
          {data.sections.map(function (section, idx) {
          var delayClass = idx < 6 ? ' entrance-fade-up--delay-' + (idx + 1) : '';

          return (
            <div key={section.id} className={'entrance-fade-up' + delayClass}>
              <ContentSection
                id={section.id}
                title={section.title}
                variant="default"
                colorAccent="yellow"
              >
                {section.paragraphs.map(function (p, i) {
                  return (
                    <p key={section.id + '-p-' + i} className="about-subpage__section-text">
                      {p}
                    </p>
                  );
                })}
              </ContentSection>
            </div>
          );
        })}
        </div>
      </div>
    </main>
  );
}