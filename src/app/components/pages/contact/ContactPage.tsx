/**
 * @fileoverview Contact page component for Ash Shaw Makeup Portfolio
 * 
 * Dedicated contact page featuring Typeform embed, social links, and about information
 * with comprehensive dark mode support and WCAG AAA accessibility compliance.
 * 
 * @author Ash Shaw Portfolio Team
 * @version 1.4.0 - Terminal Boot Animations (Phase 1)
 * @since 2025-01-03
 */

import React, { useEffect } from "react";
import { TypeformEmbed } from "../../common/TypeformEmbed";
import { SocialLinks } from "../../common/SocialLinks";
import { Breadcrumbs } from "../../ui/Breadcrumbs";
import { FaqSection } from "../../sections/FaqSection";
import { contactUI } from "../../../data/mock/ui/contact";
import { contactBreadcrumbs } from "../../../data/mock/ui/breadcrumbs";
import "../../../../styles/blocks/contact-page.css";
import "../../../../styles/blocks/page-header-animations.css";
import "../../../../styles/animations.css";

import { setSEO } from '../../../utils/seo';
import { pageSEO } from '../../../data/mock/seo';

/**
 * ContactPage - Dedicated contact page with form and social links
 * Uses the shared global Footer from RootLayout (no inline footer)
 */
export function ContactPage() {
  useEffect(function () {
    setSEO(pageSEO.contact);
  }, []);

  return (
    <div className="contact-page-container bg-atomic-noise">
      {/* Background decoration */}
      <div className="contact-decoration-1" aria-hidden="true" />
      <div className="contact-decoration-2" aria-hidden="true" />

      <main
        id="main-content"
        className="contact-page-main"
      >
        {/* Page Header */}
        <div className="contact-page-header section-spacing px-horizontal-section page-header--animated">
          <div className="section-container">
            <Breadcrumbs items={contactBreadcrumbs} centered />
            <h1 className="text-hero-h1 text-gradient-pink-purple-blue page-header__title--fade-in">
              {contactUI.header.title}
            </h1>
            <p className="neon-text-gradient neon-text-gradient--orange page-header__subtitle--fade-in">
              {contactUI.header.description}
            </p>
          </div>
        </div>

        {/* Two Column Layout */}
        <div className="contact-page-grid section-spacing px-horizontal-section page-content--fade-in">
          <div className="container-wide section-container split-layout">
            {/* Left Column - About, Social */}
            <div className="contact-page-about section-container">
              <h2 className="text-section-h2 text-gradient-blue-teal-green">
                {contactUI.about.title}
              </h2>
              <p className="text-body-guideline text-contact-body">
                {contactUI.about.description}
              </p>
              <p className="contact-page-quote text-gradient-pink-purple-blue">
                {contactUI.about.quote}
              </p>

              {/* Social Links */}
              <div className="section-container">
                <h3 className="contact-page-connect-title text-contact-heading">
                  {contactUI.connect.title}
                </h3>
                <SocialLinks className="contact-page-social-links" />
              </div>
            </div>

            {/* Right Column - Contact Form */}
            <div className="contact-page-form section-container">
              <h2 className="text-section-h2 text-gradient-gold-peach-coral">
                {contactUI.form.title}
              </h2>
              <TypeformEmbed 
                formId="01KGP965M86E2TCRWEVS0WJX57"
                height="600px"
              />
            </div>
          </div>
        </div>

        {/* FAQ Section — full width, below the two-column grid */}
        <div className="contact-page-faq-fullwidth">
          <FaqSection pageId="contact" />
        </div>
      </main>
    </div>
  );
}