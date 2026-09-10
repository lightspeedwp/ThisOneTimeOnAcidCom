/**
 * @fileoverview Tribes — The communities that shaped a neon soul
 * Maps the 12 tribes that define Ash's identity: psytrance, WordPress,
 * Berlin clubs, cycling, Muay Thai, and more.
 *
 * Content sourced from ebook Appendix B.
 * Neon accent: Purple
 *
 * @component TribesPage
 * @version 1.0.0
 */

import React, { useEffect } from 'react';
import { tribesPageData } from '../../../data/mock/pages/tribes';
import { setSEO } from '../../../utils/seo';
import { pageSEO } from '../../../data/mock/seo';
import { Breadcrumbs } from '../../ui/Breadcrumbs';
import { PullQuote } from '../../ui/PullQuote';
import { ContentSection } from '../../sections/ContentSection';
import '../../../../styles/blocks/about-subpage.css';

/**
 * Get the category label for display
 */
function getCategoryLabel(category: string): string {
  if (category === 'global') return 'Global tribe';
  if (category === 'location') return 'Location tribe';
  if (category === 'feature') return 'Feature tribe';
  return '';
}

/**
 * Get the color accent for each category
 */
function getCategoryAccent(category: string): 'pink' | 'green' | 'blue' | 'purple' | 'yellow' {
  if (category === 'global') return 'pink';
  if (category === 'location') return 'blue';
  return 'green';
}

/**
 * Group tribes by category
 */
function groupTribes() {
  var tribes = tribesPageData.tribes;
  var globalTribes: typeof tribes = [];
  var locationTribes: typeof tribes = [];
  var featureTribes: typeof tribes = [];

  for (var i = 0; i < tribes.length; i++) {
    var tribe = tribes[i];
    if (tribe.category === 'global') {
      globalTribes.push(tribe);
    } else if (tribe.category === 'location') {
      locationTribes.push(tribe);
    } else {
      featureTribes.push(tribe);
    }
  }

  return { globalTribes: globalTribes, locationTribes: locationTribes, featureTribes: featureTribes };
}

export function TribesPage() {
  useEffect(function () {
    if (pageSEO.tribes) {
      setSEO(pageSEO.tribes);
    }
  }, []);

  var data = tribesPageData;
  var groups = groupTribes();

  return (
    <main
      id="main-content"
      role="main"
      tabIndex={-1}
      className="about-subpage about-subpage--tribes bg-atomic-noise"
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

      {/* ── Pull Quote ── */}
      <div className="about-subpage__body section-spacing px-horizontal-section">
        <div className="section-container">
          <div className="entrance-fade-up">
            <PullQuote
              quote={data.pullQuote}
              variant="center"
              neonColor="purple"
            />
          </div>
        </div>
      </div>

      {/* ── Intro ── */}
      <div className="about-subpage__body section-spacing px-horizontal-section">
        <div className="section-container">
          <div className="entrance-fade-up entrance-fade-up--delay-1">
            <ContentSection
              id="tribes-intro"
              title="Mapping the tribes"
              variant="callout"
              colorAccent="purple"
            >
              {data.intro.map(function (p, i) {
                return (
                  <p key={'intro-p-' + i} className="about-subpage__section-text">
                    {p}
                  </p>
                );
              })}
            </ContentSection>
          </div>
        </div>
      </div>

      {/* ── Global Tribes ── */}
      <div className="about-subpage__body section-spacing px-horizontal-section">
        <div className="section-container">
          <div className="entrance-fade-up">
            <ContentSection
              id="global-tribes"
              title="Global tribes"
              variant="default"
              colorAccent="pink"
            >
              <div role="list" aria-label="Global tribes">
                {groups.globalTribes.map(function (tribe) {
                  return (
                    <div
                      key={tribe.id}
                      className="about-subpage__section"
                      role="listitem"
                    >
                      <h3 className="about-subpage__section-subtitle">
                        {tribe.name}
                      </h3>
                      <p className="about-subpage__section-text">
                        {tribe.narrative}
                      </p>
                    </div>
                  );
                })}
              </div>
            </ContentSection>
          </div>

          {/* ── Location-Specific Tribes ── */}
          <div className="entrance-fade-up entrance-fade-up--delay-1">
            <ContentSection
              id="location-tribes"
              title="Location-specific tribes"
              variant="default"
              colorAccent="blue"
            >
              <div role="list" aria-label="Location-specific tribes">
                {groups.locationTribes.map(function (tribe) {
                  return (
                    <div
                      key={tribe.id}
                      className="about-subpage__section"
                      role="listitem"
                    >
                      <h3 className="about-subpage__section-subtitle">
                        {tribe.name}
                      </h3>
                      <p className="about-subpage__section-text">
                        {tribe.narrative}
                      </p>
                    </div>
                  );
                })}
              </div>
            </ContentSection>
          </div>

          {/* ── Feature Tribes ── */}
          <div className="entrance-fade-up entrance-fade-up--delay-2">
            <ContentSection
              id="feature-tribes"
              title="Feature tribes"
              variant="default"
              colorAccent="green"
            >
              <div role="list" aria-label="Feature tribes">
                {groups.featureTribes.map(function (tribe) {
                  return (
                    <div
                      key={tribe.id}
                      className="about-subpage__section"
                      role="listitem"
                    >
                      <h3 className="about-subpage__section-subtitle">
                        {tribe.name}
                      </h3>
                      <p className="about-subpage__section-text">
                        {tribe.narrative}
                      </p>
                    </div>
                  );
                })}
              </div>
            </ContentSection>
          </div>

          {/* ── The Overlap ── */}
          <div className="entrance-fade-up entrance-fade-up--delay-3">
            <ContentSection
              id="tribes-overlap"
              title={data.closingTitle}
              variant="callout"
              colorAccent="purple"
            >
              {data.closingParagraphs.map(function (p, i) {
                return (
                  <p key={'closing-p-' + i} className="about-subpage__section-text">
                    {p}
                  </p>
                );
              })}
            </ContentSection>
          </div>
        </div>
      </div>
    </main>
  );
}
