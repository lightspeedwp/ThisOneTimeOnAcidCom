/**
 * @fileoverview 404 Not Found Page Component
 * Displays a neon-styled 404 error page with glitch effect and navigation options.
 * Fully responsive and accessible, adhering to the "Neon vs Atomic Black" design system.
 */

import React, { useEffect } from "react";
import { useNavigate } from "../../lib/router";
import { House, ArrowLeft } from "@phosphor-icons/react";
import "../../../styles/blocks/not-found-page.css";
import "../../../styles/blocks/button.css";

import { setSEO } from '../../utils/seo';
import { pageSEO } from '../../data/mock/seo';
import { notFoundUI } from '../../data/mock/ui/error';

export function NotFoundPage() {
  const navigate = useNavigate();

  // Update document title on mount
  useEffect(() => {
    setSEO(pageSEO.notFound);
  }, []);

  return (
    <main className="not-found-page bg-atomic-noise" role="main">
      <div className="not-found-content">
        {/* Glitch Effect 404 Text */}
        <div className="not-found-glitch-text" data-text={notFoundUI.code}>
          {notFoundUI.code}
        </div>

        <h1 className="not-found-title">
          {notFoundUI.title}
        </h1>

        <p className="not-found-description">
          {notFoundUI.description}
        </p>

        <div className="not-found-actions">
          <button
            type="button"
            onClick={() => navigate("/")}
            className="btn btn--neon-primary btn--lg"
            aria-label={notFoundUI.aria.homeButton}
          >
            <House className="icon-md" />
            {notFoundUI.actions.home}
          </button>

          <button
            type="button"
            onClick={() => window.history.back()}
            className="btn btn--outline btn--lg"
            aria-label={notFoundUI.aria.backButton}
          >
            <ArrowLeft className="icon-md" />
            {notFoundUI.actions.back}
          </button>
        </div>
      </div>
    </main>
  );
}