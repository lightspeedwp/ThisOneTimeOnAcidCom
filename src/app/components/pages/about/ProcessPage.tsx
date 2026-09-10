/**
 * @fileoverview Creative process page — how Ash creates makeup art
 *
 * Phase 5 Polish — Timeline for steps, ContentSection for body, bundler-safe syntax
 *
 * @component ProcessPage
 * @version 2.0.0
 */

import React, { useEffect } from 'react';
import { processPageData } from '../../../data/mock/pages/about-subpages';
import { setSEO } from '../../../utils/seo';
import { pageSEO } from '../../../data/mock/seo';
import { Breadcrumbs } from '../../ui/Breadcrumbs';
import { Timeline } from '../../ui/Timeline';
import { ContentSection } from '../../sections/ContentSection';
import '../../../../styles/blocks/about-subpage.css';

/**
 * Build timeline events from process steps
 */
function buildStepsTimeline() {
  var steps = processPageData.steps;
  var events = [];
  for (var i = 0; i < steps.length; i++) {
    var step = steps[i];
    events.push({
      year: 'Step ' + step.number,
      title: step.title,
      description: step.description,
    });
  }
  return events;
}

export function ProcessPage() {
  useEffect(function () {
    setSEO(pageSEO.process);
  }, []);

  var data = processPageData;
  var stepsTimeline = buildStepsTimeline();

  return (
    <main
      id="main-content"
      role="main"
      tabIndex={-1}
      className="about-subpage about-subpage--process bg-atomic-noise"
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

      {/* ── Creative Process Steps as Timeline (Phase 3) ── */}
      <div className="about-subpage__body section-spacing px-horizontal-section">
        <div className="section-container">
          <div className="entrance-fade-up">
          <ContentSection
            id="process-steps"
            title="The Creative Process"
            variant="callout"
            colorAccent="green"
          >
            <Timeline
              events={stepsTimeline}
              variant="vertical"
              colorAccent="green"
            />
          </ContentSection>
        </div>

        {/* ── Sections (Phase 3 ContentSection) ── */}
        {data.sections.map(function (section, idx) {
          var delayClass = idx < 6 ? ' entrance-fade-up--delay-' + (idx + 1) : '';

          return (
            <div key={section.id} className={'entrance-fade-up' + delayClass}>
              <ContentSection
                id={section.id}
                title={section.title}
                variant="default"
                colorAccent="green"
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
