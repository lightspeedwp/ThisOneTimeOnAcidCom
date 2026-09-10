/**
 * @fileoverview About Journey page — Global psytrance makeup artist story
 *
 * Combines the original psytrance journey content with immersive design:
 * ChapterNav sidebar, scroll spy, Timeline, SplitContent, PullQuotes,
 * entrance animations, and staggered fade-ups.
 *
 * @author Ash Shaw Portfolio Team
 * @version 7.6.0 - Terminal Boot Animations (Phase 1)
 */

import React, { useEffect, useState, useCallback } from "react";
import "../../../../styles/globals.css";
import "../../../../styles/blocks/about-page.css";
import "../../../../styles/blocks/artistry-page.css";
import "../../../../styles/blocks/chapter-nav.css";
import "../../../../styles/blocks/split-layout.css";
import "../../../../styles/animations.css";

/* ── Layout / Section Components ── */
import { HeroLayout } from "../../sections/HeroLayout";
import { ContentSection } from "../../sections/ContentSection";
import { SplitContent } from "../../sections/SplitContent";
import { FaqSection } from "../../sections/FaqSection";

/* ── UI Components ── */
import { PullQuote } from "../../ui/PullQuote";
import { Timeline } from "../../ui/Timeline";
import { ChapterNav } from "../../ui/ChapterNav";

/* ── Data ── */
import { artistryPageData } from "../../../data/mock/pages/artistry";
import { aboutHeroImages } from "../../../data/mock/images/hero-images";
import { aboutUI } from "../../../data/mock/ui/about";

/* ── Icons ── */
import {
  Palette,
  Drop,
  Stack,
  Lightbulb,
  Sparkle,
  ArrowRight,
} from "@phosphor-icons/react";

/* ── Hooks ── */
import { useAppNavigate } from "../../../hooks/useAppNavigate";

/* ── SEO & Schema ── */
import { setSEO } from "../../../utils/seo";
import { pageSEO } from "../../../data/mock/seo";
import {
  injectSchema,
  removeSchema,
  SCHEMA_IDS,
  buildPersonSchema,
} from "../../../utils/schemaService";

/* ── UV split image ── */
var uvSplitImage =
  "https://images.unsplash.com/photo-1539035992980-e41ff3f540ed?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxVViUyMGJsYWNrbGlnaHQlMjBuZW9uJTIwZmFjZSUyMHBhaW50JTIwZmVzdGl2YWx8ZW58MXx8fHwxNzcyMzk5MDk3fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral";

/**
 * Map skill IDs to icon elements and gradient classes
 */
var skillIconMap: Record<string, { icon: React.ReactNode; gradient: string }> = {
  "color-theory": {
    icon: React.createElement(Palette, { className: "about-skill-icon", "aria-hidden": true }),
    gradient: "about-skill-icon-wrap--pink-purple",
  },
  "blending": {
    icon: React.createElement(Drop, { className: "about-skill-icon", "aria-hidden": true }),
    gradient: "about-skill-icon-wrap--cyan-blue",
  },
  "texture": {
    icon: React.createElement(Stack, { className: "about-skill-icon", "aria-hidden": true }),
    gradient: "about-skill-icon-wrap--green-yellow",
  },
  "uv-techniques": {
    icon: React.createElement(Lightbulb, { className: "about-skill-icon", "aria-hidden": true }),
    gradient: "about-skill-icon-wrap--purple-pink",
  },
  "creative-design": {
    icon: React.createElement(Sparkle, { className: "about-skill-icon", "aria-hidden": true }),
    gradient: "about-skill-icon-wrap--blue-green",
  },
};

/**
 * About Journey page — immersive psytrance makeup artist story
 */
export function AboutPage() {
  var setCurrentPage = useAppNavigate();
  var data = artistryPageData;

  /* ── Active chapter tracking for ChapterNav ── */
  var defaultChapterId = data.chapters.length > 0 ? data.chapters[0].id : "";
  var activeChapterState = useState(defaultChapterId);
  var activeChapter = activeChapterState[0];
  var setActiveChapter = activeChapterState[1];

  /* ── SEO + Schema ── */
  useEffect(function () {
    setSEO(pageSEO.about);
    injectSchema(SCHEMA_IDS.person, buildPersonSchema());
    return function () {
      removeSchema(SCHEMA_IDS.person);
    };
  }, []);

  /* ── Scroll spy for active chapter ── */
  useEffect(function () {
    function handleScroll() {
      var chapters = data.chapters;
      var found = "";
      for (var i = 0; i < chapters.length; i++) {
        var el = document.getElementById(chapters[i].id);
        if (el) {
          var rect = el.getBoundingClientRect();
          if (rect.top <= 200) {
            found = chapters[i].id;
          }
        }
      }
      if (found) {
        setActiveChapter(found);
      }
    }

    window.addEventListener("scroll", handleScroll, { passive: true });
    return function () {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [data.chapters, setActiveChapter]);

  /* ── Handlers ── */
  var handlePortfolioClick = useCallback(function () {
    setCurrentPage("portfolio");
  }, [setCurrentPage]);

  var handleUvGalleryClick = useCallback(function () {
    setCurrentPage("portfolio");
  }, [setCurrentPage]);

  var handleAdhdClick = useCallback(function () {
    setCurrentPage("about/adhd");
  }, [setCurrentPage]);

  var handleChapterClick = useCallback(function (id: string) {
    var el = document.getElementById(id);
    if (el) {
      var prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      el.scrollIntoView({
        behavior: prefersReduced ? "auto" : "smooth",
        block: "start",
      });
    }
  }, []);

  return (
    <div className="about-page-container">
      {/* ──────────────── HERO ──────────────── */}
      <HeroLayout
        title="Global Psytrance Artist"
        subtitle={
          <span>
            <em className="text-gradient-pink-rose">
              {aboutUI.hero.subtitle.words[0]}
            </em>
            ,{" "}
            <em className="text-gradient-purple-violet">
              {aboutUI.hero.subtitle.words[1]}
            </em>
            , and{" "}
            <em className="text-gradient-blue-cyan">
              {aboutUI.hero.subtitle.words[2]}
            </em>{" "}
            {aboutUI.hero.subtitle.suffix}
          </span>
        }
        neonColor="pink"
        description={data.hero.description}
        size="xl"
        layout="split"
        align="wide"
        fullscreen={true}
        className="hero"
        showScrollArrow={true}
        scrollArrowTarget="electric-journey"
        heroImages={aboutHeroImages}
        lightboxTitle={aboutUI.hero.lightboxTitle}
        enableLightbox={true}
        animated={true}
        holographicTitle={true}
        floatMedia={true}
        actions={
          <button
            type="button"
            onClick={handlePortfolioClick}
            className="btn btn--neon-primary btn--neon-pulse"
            aria-label="Navigate to Portfolio page to explore makeup artistry collection"
          >
            {data.hero.cta}
          </button>
        }
        decorativeElements={
          <div>
            <div className="about-hero-orb-1" aria-hidden="true"></div>
            <div className="about-hero-orb-2" aria-hidden="true"></div>
            <div className="about-hero-orb-3" aria-hidden="true"></div>
          </div>
        }
      />

      {/* ──────────────── CHAPTER NAV + CONTENT ──────────────── */}
      <div className="about-landing about-landing--fluid bg-atomic-noise">

        {/* Mobile chapter nav (horizontal, sticky) */}
        <div className="about-landing__mobile-nav">
          <ChapterNav
            chapters={data.chapters}
            activeChapter={activeChapter}
            onChapterClick={handleChapterClick}
          />
        </div>

        {/* Desktop sidebar nav — sticky */}
        <aside className="about-landing__nav">
          <ChapterNav
            chapters={data.chapters}
            activeChapter={activeChapter}
            onChapterClick={handleChapterClick}
            stickyClass="chapter-nav--sticky"
          />
        </aside>

        {/* ──────────────── SECTIONS ──────────────── */}
        <div className="about-landing__sections">

          {/* ─── 1. The electric journey begins ─── */}
          <div className="entrance-fade-up">
            <ContentSection
              id="electric-journey"
              title={data.sections[0].title}
              variant="callout"
              colorAccent="cyan"
            >
              {data.sections[0].paragraphs.map(function (para, pIdx) {
                return (
                  <p className="text-body-p" key={"ej-p-" + pIdx}>
                    {para}
                  </p>
                );
              })}
              <PullQuote
                quote="Every brush stroke ignites a story."
                author="Ash Shaw"
                variant="center"
                neonColor="cyan"
              />
            </ContentSection>
          </div>

          {/* ─── 2. Festival euphoria ─── */}
          <div className="entrance-fade-up entrance-fade-up--delay-1">
            <ContentSection
              id="festival-euphoria"
              title={data.sections[1].title}
              variant="default"
              colorAccent="pink"
            >
              {data.sections[1].paragraphs.map(function (para, pIdx) {
                return (
                  <p className="text-body-p" key={"fe-p-" + pIdx}>
                    {para}
                  </p>
                );
              })}
            </ContentSection>
          </div>

          {/* ─── 3. UV explorations (split layout with image) ─── */}
          <div className="entrance-fade-up entrance-fade-up--delay-2">
            <ContentSection
              id="uv-explorations"
              title={data.sections[2].title}
              variant="default"
              colorAccent="green"
            >
              <SplitContent
                imageUrl={uvSplitImage}
                imageAlt="UV blacklight neon face paint at a psytrance festival"
                imageSide="left"
                variant="even"
              >
                {data.sections[2].paragraphs.map(function (para, pIdx) {
                  return (
                    <p className="text-body-p" key={"uv-p-" + pIdx}>
                      {para}
                    </p>
                  );
                })}

                {/* Technical mastery card */}
                <div className="about-technical-card">
                  <h3 className="about-technical-title">{data.technicalMastery.title}</h3>
                  <div className="about-technical-divider" aria-hidden="true"></div>
                  <p className="about-technical-description text-body-p">
                    {data.technicalMastery.description}
                  </p>
                </div>
              </SplitContent>
            </ContentSection>
          </div>

          {/* ─── 4. Professional mousse eyeshadows + skills ─── */}
          <div className="entrance-fade-up">
            <ContentSection
              id="mousse-shadows"
              title={data.mousseShadows.title}
              variant="default"
              colorAccent="pink"
            >
              {data.mousseShadows.paragraphs.map(function (para, pIdx) {
                return (
                  <p className="text-body-p" key={"mousse-p-" + pIdx}>
                    {para}
                  </p>
                );
              })}

              <div className="about-skills-grid">
                {data.mousseShadows.skills.map(function (skill) {
                  var iconData = skillIconMap[skill.id];
                  var iconEl = iconData ? iconData.icon : null;
                  var gradientClass = iconData ? iconData.gradient : "about-skill-icon-wrap--pink-purple";

                  return (
                    <div className="about-skill-item" key={skill.id}>
                      <div className={"about-skill-icon-wrap " + gradientClass}>
                        {iconEl}
                      </div>
                      <span className="about-skill-title">{skill.label}</span>
                    </div>
                  );
                })}
              </div>
            </ContentSection>
          </div>

          {/* ─── 5. UV makeup artistry ─── */}
          <div className="entrance-fade-up entrance-fade-up--delay-1">
            <ContentSection
              id="uv-artistry"
              title={data.uvArtistry.title}
              variant="callout"
              colorAccent="purple"
            >
              {data.uvArtistry.paragraphs.map(function (para, pIdx) {
                return (
                  <p className="text-body-p" key={"uva-p-" + pIdx}>
                    {para}
                  </p>
                );
              })}
              <div className="about-cta-center">
                <button
                  type="button"
                  onClick={handleUvGalleryClick}
                  className="btn btn--neon-outline"
                  aria-label="Navigate to UV makeup gallery in Portfolio"
                >
                  {data.uvArtistry.cta}
                </button>
              </div>
            </ContentSection>
          </div>

          {/* ─── 6. Creative process ─── */}
          <div className="entrance-fade-up entrance-fade-up--delay-2">
            <ContentSection
              id="creative-process"
              title={data.creativeProcess.title}
              variant="default"
              colorAccent="green"
            >
              {data.creativeProcess.paragraphs.map(function (para, pIdx) {
                return (
                  <p className="text-body-p" key={"cp-p-" + pIdx}>
                    {para}
                  </p>
                );
              })}
              <PullQuote
                quote={data.creativeProcess.quote}
                variant="center"
                neonColor="green"
              />
            </ContentSection>
          </div>

          {/* ─── 7. The costume evolution (Timeline) ─── */}
          <div className="entrance-fade-up">
            <ContentSection
              id="costume-timeline"
              title={data.costumeEvolution.title}
              variant="default"
              colorAccent="pink"
            >
              <Timeline
                events={data.costumeEvolution.events}
                variant="vertical"
                colorAccent="pink"
                ariaLabel="Ash Shaw's costume evolution timeline from 1999 to 2019"
              />
            </ContentSection>
          </div>

          {/* ─── 8. ADHD — Wired different (brief + link) ─── */}
          <div className="entrance-fade-up entrance-fade-up--delay-1">
            <ContentSection
              id="adhd-brief"
              title={data.adhdBrief.title}
              variant="callout"
              colorAccent="yellow"
            >
              <p className="text-body-p">
                {data.adhdBrief.paragraph}
              </p>
              <div className="about-cta-center">
                <button
                  type="button"
                  onClick={handleAdhdClick}
                  className="btn btn--neon-outline"
                  aria-label="Read the full ADHD story on the dedicated ADHD page"
                >
                  <span>{data.adhdBrief.linkLabel}</span>
                  <ArrowRight className="about-btn-arrow" aria-hidden="true" />
                </button>
              </div>
            </ContentSection>
          </div>

          {/* ─── 9. Making others shine ─── */}
          <div className="entrance-fade-up entrance-fade-up--delay-2">
            <ContentSection
              id="making-others-shine"
              title={data.makingOthersShine.title}
              variant="callout"
              colorAccent="pink"
            >
              {data.makingOthersShine.paragraphs.map(function (para, idx) {
                return (
                  <p className="text-body-p" key={"mos-p-" + idx}>
                    {para}
                  </p>
                );
              })}
              <PullQuote
                quote={data.makingOthersShine.quote}
                variant="center"
                neonColor="pink"
              />
            </ContentSection>
          </div>

          {/* ─── 10. Looking forward ─── */}
          <div className="entrance-fade-up">
            <ContentSection
              id="looking-forward"
              title={data.lookingForward.title}
              variant="default"
              colorAccent="cyan"
            >
              {data.lookingForward.paragraphs.map(function (para, pIdx) {
                return (
                  <p className="text-body-p" key={"lf-p-" + pIdx}>
                    {para}
                  </p>
                );
              })}
              <div className="about-cta-center">
                <button
                  type="button"
                  onClick={handlePortfolioClick}
                  className="btn btn--neon-primary"
                  aria-label="Navigate to Portfolio page to explore makeup artistry collection"
                >
                  {data.lookingForward.cta}
                </button>
              </div>
            </ContentSection>
          </div>

          {/* ─── FAQ Section ─── */}
          <FaqSection
            pageId="about"
            items={data.faqs.map(function (faq) {
              return {
                id: faq.id,
                question: faq.question,
                answer: faq.answer,
              };
            })}
          />
        </div>
      </div>
    </div>
  );
}