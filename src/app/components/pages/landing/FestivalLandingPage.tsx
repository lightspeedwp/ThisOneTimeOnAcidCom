/**
 * @fileoverview Festival Landing Page component
 */

import React from 'react';
import { FestivalCountdown } from '../../sections/FestivalCountdown';
import { festivalPageData } from '../../../data/mock/pages/festival';
import { Breadcrumbs } from '../../ui/Breadcrumbs';
import { setSEO } from '../../../utils/seo';
import '../../../../styles/blocks/festival-landing-page.css';

export function FestivalLandingPage() {
  React.useEffect(() => {
    setSEO(festivalPageData.seo);
  }, []);

  return (
    <main className="festival-landing-page bg-atomic-noise">
        <div 
            className="festival-landing-hero"
            style={{
                backgroundImage: `radial-gradient(circle at center, rgba(15, 15, 15, 0) 0%, rgba(15, 15, 15, 1) 90%), url('${festivalPageData.hero.image}')`
            }}
        >
            <div className="container-xl text-center festival-landing__hero-content">
                <Breadcrumbs items={[{ label: 'Home', href: '/' }, { label: 'Next Festival' }]} centered />
                <h1 className="text-hero-h1 text-white mb-fluid-lg drop-shadow-neon">
                    {festivalPageData.hero.title}
                </h1>
                <p className="text-section-h2 text-neon-yellow mb-fluid-xl">
                    {festivalPageData.hero.subtitle}
                </p>
            </div>
            <div className="festival-landing-bg-overlay" />
        </div>

        <div className="container-xl festival-content-wrapper">
             <FestivalCountdown />
        </div>
    </main>
  );
}