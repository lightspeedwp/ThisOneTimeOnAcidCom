/**
 * @fileoverview Accessibility Statement Page component
 */

import React from 'react';
import { accessibilityPageData } from '../../../data/mock/pages/accessibility';
import { Breadcrumbs } from '../../ui/Breadcrumbs';
import { setSEO } from '../../../utils/seo';
import '../../../../styles/blocks/accessibility-page.css';

export function AccessibilityStatementPage() {
  React.useEffect(() => {
    setSEO({
        title: 'Accessibility Statement | Ash Shaw Makeup',
        description: accessibilityPageData.hero.description,
    });
  }, []);

  return (
    <main className="accessibility-page bg-atomic-noise">
      <div className="container-lg">
        <header className="accessibility-page__hero text-center mb-fluid-3xl">
             <Breadcrumbs items={[{ label: 'Home', href: '/' }, { label: 'Accessibility' }]} centered />
             <h1 className="text-hero-h1 mb-fluid-md">
                 {accessibilityPageData.hero.title}
             </h1>
             <p className="text-body-lg text-neutral-300 max-w-2xl mx-auto">
                 {accessibilityPageData.hero.description}
             </p>
        </header>

        <div className="accessibility-page__content">
            {accessibilityPageData.content.map((section, index) => (
                <section key={index} className="accessibility-section mb-fluid-2xl">
                    <h2 className="text-section-h2 text-neon-green mb-fluid-md">
                        {section.title}
                    </h2>
                    {section.text && (
                        <p className="text-body-p text-neutral-200 mb-fluid-md">
                            {section.text}
                        </p>
                    )}
                    {section.items && (
                        <ul className="accessibility-list">
                            {section.items.map((item, i) => (
                                <li key={i} className="accessibility-list__item">
                                    <span className="accessibility-list__bullet">✓</span>
                                    {item}
                                </li>
                            ))}
                        </ul>
                    )}
                </section>
            ))}

            <section className="accessibility-contact">
                <h2 className="text-section-h3 text-white mb-fluid-md">{accessibilityPageData.contact.title}</h2>
                <p className="text-body-p text-neutral-400 mb-fluid-md">
                    {accessibilityPageData.contact.emailLabel}<a href={`mailto:${accessibilityPageData.contact.email}`} className="accessibility-contact__link">{accessibilityPageData.contact.email}</a>
                </p>
                <p className="text-body-sm text-neutral-500">
                    {accessibilityPageData.contact.response_time}
                </p>
            </section>
        </div>
      </div>
    </main>
  );
}