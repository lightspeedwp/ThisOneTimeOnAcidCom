import React, { useEffect } from "react";
import { useNavigate } from "../../../lib/router";
import { privacyPolicy } from "../../../data/mock/pages/legal";
import { privacyBreadcrumbs } from "../../../data/mock/ui/breadcrumbs";
import { Breadcrumbs } from "../../ui/Breadcrumbs";
import { setSEO } from '../../../utils/seo';
import { pageSEO } from '../../../data/mock/seo';
import "../../../../styles/blocks/legal-page.css";

export function PrivacyPolicy() {
  const navigate = useNavigate();

  useEffect(() => {
    setSEO(pageSEO.privacy);
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="legal-page-container bg-atomic-noise">
      <div className="legal-page-content">
        <Breadcrumbs items={privacyBreadcrumbs} />
        <h1 className="text-hero-h1 text-gradient-pink-purple-blue mb-fluid-lg">
          {privacyPolicy.title}
        </h1>
        
        <div className="legal-page-body">
          {privacyPolicy.sections.map((section, index) => (
            <section key={index}>
              <h2 className="text-section-h2 mb-fluid-sm">
                {section.heading}
              </h2>
              <p className="text-body-p mb-fluid-sm">
                {section.content}
              </p>
              {section.list && (
                <ul className="legal-page-list">
                  {section.list.map((item, i) => (
                    <li key={i} dangerouslySetInnerHTML={{ __html: item }} />
                  ))}
                </ul>
              )}
            </section>
          ))}

          <div className="legal-page-footer">
            <button
              type="button"
              onClick={() => navigate("/")}
              className="legal-page-back-btn"
            >
              &larr; Return to Home
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}