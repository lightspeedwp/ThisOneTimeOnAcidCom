/**
 * @fileoverview LightSpeed — The Day Job
 * Ash's professional career building LightSpeed, a WordPress agency.
 * 22+ years of web development, from IT support to AI-powered workflows.
 *
 * Neon accent: Blue
 * Phase 7 Enrichment — BarCamp narrative, key people, milestones, lessons
 *
 * @component LightSpeedPage
 * @version 3.0.0
 */

import React, { useEffect } from 'react';
import { lightspeedPageData } from '../../../data/mock/pages/about-subpages';
import { setSEO } from '../../../utils/seo';
import { pageSEO } from '../../../data/mock/seo';
import { Breadcrumbs } from '../../ui/Breadcrumbs';
import { PullQuote } from '../../ui/PullQuote';
import { Timeline } from '../../ui/Timeline';
import { StatCard } from '../../ui/StatCard';
import { ContentSection } from '../../sections/ContentSection';
import { Accordion } from '../../ui/Accordion';
import '../../../../styles/blocks/about-subpage.css';

/**
 * Build timeline events from team data
 */
function buildTeamTimeline() {
  var team = lightspeedPageData.team;
  var events = [];
  for (var i = 0; i < team.length; i++) {
    var member = team[i];
    events.push({
      year: member.joined,
      title: member.name,
      description: member.role,
    });
  }
  return events;
}

/**
 * Build timeline events from company milestones
 */
function buildMilestoneTimeline() {
  var milestones = lightspeedPageData.companyMilestones;
  var events = [];
  for (var i = 0; i < milestones.length; i++) {
    var ms = milestones[i];
    events.push({
      year: ms.year,
      title: ms.year,
      description: ms.event,
    });
  }
  return events;
}

/**
 * Build accordion items from body sections
 */
function buildSectionAccordion() {
  var sections = lightspeedPageData.sections;
  var items = [];
  for (var i = 0; i < sections.length; i++) {
    var section = sections[i];
    items.push({
      id: section.id,
      title: section.title,
      content: section.paragraphs,
    });
  }
  return items;
}

export function LightSpeedPage() {
  useEffect(function () {
    setSEO(pageSEO.lightspeed);
  }, []);

  var data = lightspeedPageData;
  var teamTimelineEvents = buildTeamTimeline();
  var milestoneTimelineEvents = buildMilestoneTimeline();
  var accordionItems = buildSectionAccordion();

  return (
    <main
      id="main-content"
      role="main"
      tabIndex={-1}
      className="about-subpage about-subpage--lightspeed bg-atomic-noise"
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

      {/* ── Pull Quote (Phase 3) ── */}
      <div className="about-subpage__body section-spacing px-horizontal-section">
        <div className="section-container">
          <div className="entrance-fade-up">
            <PullQuote
              quote={data.pullQuote}
              variant="center"
              neonColor="orange"
            />
          </div>

          {/* ── Stats Grid ── */}
          <StatCard
            items={data.stats}
            ariaLabel="LightSpeed stats"
          />
        </div>
      </div>

      {/* ── Company Milestones Timeline (from ebook Ch19) ── */}
      <div className="about-subpage__body section-spacing px-horizontal-section">
        <div className="section-container">
          <div className="entrance-fade-up">
            <ContentSection
              id="company-milestones"
              title="Twenty-three years of milestones"
              variant="default"
              colorAccent="blue"
            >
              <Timeline
                events={milestoneTimelineEvents}
                variant="vertical"
                colorAccent="blue"
              />
            </ContentSection>
          </div>

          {/* ── BarCamp Story (from ebook Ch19) ── */}
          <div className="entrance-fade-up entrance-fade-up--delay-1">
            <ContentSection
              id={data.barcampStory.id}
              title={data.barcampStory.title}
              variant="default"
              colorAccent="pink"
            >
              {data.barcampStory.paragraphs.map(function (p, i) {
                return (
                  <p
                    key={'barcamp-p-' + i}
                    className="about-subpage__section-text"
                  >
                    {p}
                  </p>
                );
              })}
            </ContentSection>
          </div>

          {/* ── Key People Spotlights (from ebook Ch19) ── */}
          <div className="entrance-fade-up entrance-fade-up--delay-2">
            <ContentSection
              id="key-people"
              title="The people who changed everything"
              variant="default"
              colorAccent="green"
            >
              <div role="list" aria-label="Key team member spotlights">
                {data.keyPeople.map(function (person) {
                  return (
                    <div
                      key={person.id}
                      className="about-subpage__section"
                      role="listitem"
                    >
                      <h3 className="about-subpage__section-subtitle">
                        {person.name}
                      </h3>
                      <p className="about-subpage__section-text">
                        {person.narrative}
                      </p>
                    </div>
                  );
                })}
              </div>
            </ContentSection>
          </div>
        </div>
      </div>

      {/* ── Team Timeline (Phase 3) ── */}
      <div className="about-subpage__body section-spacing px-horizontal-section">
        <div className="section-container">
          <div className="entrance-fade-up entrance-fade-up--delay-1">
            <ContentSection
              id="team-timeline"
              title="The LightSpeed team"
              subtitle="13 people who make it happen"
              variant="default"
              colorAccent="blue"
            >
              <Timeline
                events={teamTimelineEvents}
                variant="vertical"
                colorAccent="blue"
              />
            </ContentSection>
          </div>

          {/* ── Sections as Accordion (Phase 3) ── */}
          <div className="entrance-fade-up entrance-fade-up--delay-2">
            <ContentSection
              id="company-story"
              title="The LightSpeed story"
              variant="default"
              colorAccent="purple"
            >
              <Accordion
                items={accordionItems.map(function (item) {
                  return {
                    id: item.id,
                    title: item.title,
                    content: React.createElement(
                      'div',
                      { className: 'about-subpage__section' },
                      item.content.map(function (p, i) {
                        return React.createElement(
                          'p',
                          { key: item.id + '-p-' + i, className: 'about-subpage__section-text' },
                          p
                        );
                      })
                    ),
                  };
                })}
                defaultOpen={['origin-story']}
              />
            </ContentSection>
          </div>

          {/* ── Lessons Learned (from ebook Ch19) ── */}
          <div className="entrance-fade-up entrance-fade-up--delay-3">
            <ContentSection
              id="lessons-learned"
              title="What twenty-three years teaches you"
              variant="default"
              colorAccent="orange"
            >
              <div role="list" aria-label="Lessons from twenty-three years">
                {data.lessonsLearned.map(function (lesson) {
                  return (
                    <div
                      key={lesson.id}
                      className="about-subpage__section"
                      role="listitem"
                    >
                      <h3 className="about-subpage__section-subtitle">
                        {lesson.title}
                      </h3>
                      <p className="about-subpage__section-text">
                        {lesson.description}
                      </p>
                    </div>
                  );
                })}
              </div>
            </ContentSection>
          </div>
        </div>
      </div>
    </main>
  );
}