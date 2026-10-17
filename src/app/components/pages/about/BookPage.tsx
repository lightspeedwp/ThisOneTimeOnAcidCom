/**
 * @fileoverview Book page — "This one time on acid…"
 *
 * Features a neon pink/yellow book cover visualisation,
 * chapter previews, and the story behind the book.
 *
 * Phase 5 Polish — ContentSection, Accordion for chapters, bundler-safe syntax
 *
 * @component BookPage
 * @version 2.0.0
 */

import React, { useEffect } from 'react';
import { useNavigate } from 'react-router';
import { BookOpen } from '@phosphor-icons/react';
import { bookPageData } from '../../../data/mock/pages/about-subpages';
import { setSEO } from '../../../utils/seo';
import { pageSEO } from '../../../data/mock/seo';
import { Breadcrumbs } from '../../ui/Breadcrumbs';
import { ContentSection } from '../../sections/ContentSection';
import { Accordion } from '../../ui/Accordion';
import { useReducedMotion } from '../../../hooks/useReducedMotion';
import '../../../../styles/blocks/about-subpage.css';
import '../../../../styles/blocks/button.css';

/**
 * Build accordion items from chapter previews
 */
function buildChapterAccordion() {
  var chapters = bookPageData.book.chapters;
  var items = [];
  for (var i = 0; i < chapters.length; i++) {
    var ch = chapters[i];
    items.push({
      id: ch.id,
      title: ch.number + '. ' + ch.title,
      content: React.createElement(
        'p',
        { className: 'about-subpage__chapter-teaser' },
        ch.teaser
      ),
    });
  }
  return items;
}

export function BookPage() {
  var navigate = useNavigate();
  var prefersReduced = useReducedMotion();

  useEffect(function () {
    setSEO(pageSEO.book);
  }, []);

  var hero = bookPageData.hero;
  var breadcrumbs = bookPageData.breadcrumbs;
  var sections = bookPageData.sections;
  var book = bookPageData.book;
  var chapterAccordionItems = buildChapterAccordion();

  function handleReadSample() {
    navigate('/draft-viewer');
    window.scrollTo({ top: 0, behavior: prefersReduced ? 'auto' : 'smooth' });
  }

  return (
    <main
      id="main-content"
      role="main"
      tabIndex={-1}
      className="about-subpage about-subpage--book bg-atomic-noise"
    >
      {/* ── Hero ── */}
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

      {/* ── Book Cover Visualisation ── */}
      <div className="about-subpage__body section-spacing px-horizontal-section">
        <div className="section-container">
          <div className="book-cover" aria-label="Book cover preview">
          <span className="book-cover__status">{book.status}</span>
          <h2 className="book-cover__title">
            This one time on <span className="text-neon-rainbow">acid</span>...
          </h2>
          <p className="book-cover__subtitle">{book.subtitle}</p>
          <span className="book-cover__author">{book.author}</span>
        </div>

        {/* ── Blurb ── */}
        <section className="about-subpage__section">
          {book.blurb.map(function (line, i) {
            return (
              <p key={'blurb-' + i} className="about-subpage__section-text">
                {line}
              </p>
            );
          })}
        </section>

        {/* ── Body Sections (Phase 3 ContentSection) ── */}
        {sections.map(function (section, idx) {
          var delayClass = idx < 6 ? ' entrance-fade-up--delay-' + (idx + 1) : '';

          return (
            <div key={section.id} className={'entrance-fade-up' + delayClass}>
              <ContentSection
                id={section.id}
                title={section.title}
                variant="default"
                colorAccent="orange"
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

      {/* ── Chapter Previews as Accordion (Phase 3) ── */}
      <div className="about-subpage__body section-spacing px-horizontal-section">
        <div className="section-container">
          <div className="entrance-fade-up entrance-fade-up--delay-2">
          <ContentSection
            id="chapter-previews"
            title={book.chaptersHeading}
            variant="default"
            colorAccent="orange"
          >
            <Accordion
              items={chapterAccordionItems}
              allowMultiple={true}
            />
          </ContentSection>
        </div>

        {/* ── Read Sample Chapters ── */}
        <section className="about-subpage__section">
          <h2 className="about-subpage__section-title">{book.sampleHeading}</h2>
          <p className="about-subpage__section-text">
            {book.sampleDescription}
          </p>
          <button
            type="button"
            className="btn btn--neon-primary btn--sm"
            onClick={handleReadSample}
            aria-label="Read sample chapters from the eBook"
          >
            <BookOpen className="btn__icon" aria-hidden="true" />
            {book.sampleCta}
          </button>
        </section>
        </div>
      </div>
    </main>
  );
}