/**
 * @fileoverview Berlin — Ash's creative anchor city
 *
 * Phase 5 Polish — ContentSection for body, bundler-safe syntax
 *
 * @component BerlinPage
 * @version 2.0.0
 */

import React, { useEffect } from 'react';
import { berlinPageData } from '../../../data/mock/pages/about-subpages';
import { setSEO } from '../../../utils/seo';
import { pageSEO } from '../../../data/mock/seo';
import { Breadcrumbs } from '../../ui/Breadcrumbs';
import { ContentSection } from '../../sections/ContentSection';
import { Timeline } from '../../ui/Timeline';
import { getTimelineByCategory, toTimelineEvents } from '../../../data/mock/timeline';
import '../../../../styles/blocks/about-subpage.css';

export function BerlinPage() {
  useEffect(function () {
    setSEO(pageSEO.berlin);
  }, []);

  var data = berlinPageData;
  var berlinMilestones = toTimelineEvents(getTimelineByCategory('berlin'));

  return (
    <main
      id="main-content"
      role="main"
      tabIndex={-1}
      className="about-subpage about-subpage--berlin bg-atomic-noise"
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

      {/* ── Sections (Phase 3 ContentSection) ── */}
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
                colorAccent="blue"
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

      {/* ── Berlin milestones (centralised timeline) ── */}
      <div className="about-subpage__body section-spacing px-horizontal-section">
        <div className="section-container">
          <div className="entrance-fade-up">
            <ContentSection
              id="berlin-timeline"
              title="Berlin timeline"
              subtitle="From the first open-air to a seasonal creative anchor"
              variant="default"
              colorAccent="pink"
            >
              <Timeline
                events={berlinMilestones}
                variant="vertical"
                colorAccent="pink"
                ariaLabel="Berlin milestones timeline"
              />
            </ContentSection>
          </div>
        </div>
      </div>
    </main>
  );
}