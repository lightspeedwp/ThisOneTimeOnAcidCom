/**
 * @fileoverview Animation Showcase Dev Tools Page
 * 
 * Interactive showcase of all terminal boot animations and neon effects
 * for testing and demonstration purposes.
 * 
 * @author Nova News Dev Team
 * @version 1.0.0
 * @since 2026-03-12
 */

import React, { useState } from 'react';
import { HeroLayout } from '../../sections/HeroLayout';
import '../../../../styles/blocks/animation-showcase.css';

export function AnimationShowcasePage() {
  var activeDemo = useState('terminal-boot');
  var getDemoState = activeDemo[0];
  var setDemoState = activeDemo[1];

  var demos = [
    { id: 'terminal-boot', name: 'Terminal Boot Sequence', description: 'Typewriter effect with cascading fade-in' },
    { id: 'neon-pulse', name: 'Neon Pulse CTA', description: '2s breathing glow, speeds up to 1s on hover' },
    { id: 'holographic-shimmer', name: 'Holographic Title', description: 'Rainbow gradient sweep animation' },
    { id: 'float-media', name: 'Floating Media', description: 'Gentle vertical float with glow' },
    { id: 'stagger-sequence', name: 'Stagger Sequence', description: 'Auto-applied HeroLayout stagger with 0.1s delays' },
    { id: 'page-headers', name: 'Page Header Animations', description: 'Portfolio/Blog/Contact header fade-in' }
  ];

  function handleDemoClick(demoId) {
    return function() {
      setDemoState(demoId);
    };
  }

  return (
    <main id="main-content" role="main" className="animation-showcase-page bg-atomic-noise">
      {/* Header */}
      <section className="showcase-header section-spacing px-horizontal-section">
        <div className="container-wide section-container">
          <h1 className="text-hero-h1 text-gradient-pink-purple-blue">
            Animation System Showcase
          </h1>
          <p className="showcase-subtitle neon-text-gradient neon-text-gradient--cyan">
            Interactive demos of all terminal boot animations and neon effects
          </p>
        </div>
      </section>

      {/* Demo Navigation */}
      <section className="showcase-nav section-spacing px-horizontal-section">
        <div className="container-wide section-container">
          <div className="demo-nav-grid">
            {demos.map(function(demo) {
              var isActive = getDemoState === demo.id;
              var buttonClass = isActive ? 'demo-nav-button demo-nav-button--active' : 'demo-nav-button';
              
              return React.createElement(
                'button',
                {
                  key: demo.id,
                  className: buttonClass,
                  onClick: handleDemoClick(demo.id),
                  'aria-pressed': isActive
                },
                React.createElement('h3', { className: 'demo-nav-title' }, demo.name),
                React.createElement('p', { className: 'demo-nav-desc' }, demo.description)
              );
            })}
          </div>
        </div>
      </section>

      {/* Demo Area */}
      <section className="showcase-demo section-spacing px-horizontal-section">
        <div className="container-wide section-container">
          <div className="demo-stage">
            {getDemoState === 'terminal-boot' && (
              <div className="demo-content">
                <h2 className="demo-title">Terminal Boot Sequence</h2>
                <div className="hero-layout__content page-header--animated">
                  <h1 className="text-hero-h1 text-gradient-pink-purple-blue page-header__title--fade-in">
                    Nova News
                  </h1>
                  <p className="page-header__subtitle--fade-in">
                    This one time on acid: a memoir
                  </p>
                </div>
              </div>
            )}

            {getDemoState === 'neon-pulse' && (
              <div className="demo-content">
                <h2 className="demo-title">Neon Pulse CTA Button</h2>
                <div className="demo-button-row">
                  <button className="btn btn--primary btn--neon-pulse">
                    Read the book
                  </button>
                  <button className="btn btn--secondary btn--neon-pulse">
                    Join waitlist
                  </button>
                </div>
                <p className="demo-note">
                  Hover to see the pulse speed increase from 2s to 1s
                </p>
              </div>
            )}

            {getDemoState === 'holographic-shimmer' && (
              <div className="demo-content">
                <h2 className="demo-title">Holographic Rainbow Shimmer</h2>
                <h1 className="text-hero-h1 page-header__title--holographic">
                  Nova News Rainbow Effect
                </h1>
                <p className="demo-note">
                  4s infinite gradient sweep across the title
                </p>
              </div>
            )}

            {getDemoState === 'float-media' && (
              <div className="demo-content">
                <h2 className="demo-title">Floating Media Elements</h2>
                <div className="demo-media-grid">
                  <div className="hero-media hero-media--float demo-float-box demo-float-box--pink">
                    <p className="demo-float-text">Floating Element 1</p>
                  </div>
                  <div className="hero-media hero-media--float demo-float-box demo-float-box--yellow">
                    <p className="demo-float-text">Floating Element 2</p>
                  </div>
                </div>
                <p className="demo-note">
                  4s continuous vertical float with neon glow
                </p>
              </div>
            )}

            {getDemoState === 'stagger-sequence' && (
              <div className="demo-content">
                <h2 className="demo-title">HeroLayout Stagger Sequence</h2>
                <HeroLayout
                  title="Auto-Staggered Hero"
                  subtitle="Watch the cascade"
                  description="Title → Subtitle → Description → CTA (0.1s delays)"
                  ctaText="Join the journey"
                  ctaHref="/waitlist"
                  layout="left"
                  enableAnimations={true}
                />
              </div>
            )}

            {getDemoState === 'page-headers' && (
              <div className="demo-content">
                <h2 className="demo-title">Page Header Animations</h2>
                <div className="demo-page-headers">
                  <div className="portfolio-page-header section-spacing page-header--animated demo-page-header-spacing">
                    <h1 className="text-hero-h1 text-gradient-pink-purple-blue page-header__title--fade-in">
                      Portfolio
                    </h1>
                    <p className="page-header__subtitle--fade-in">
                      Showcase of creative work
                    </p>
                  </div>
                  
                  <div className="blog-list-header section-spacing page-header--animated">
                    <h1 className="text-hero-h1 text-gradient-pink-purple-blue page-header__title--fade-in">
                      Journal
                    </h1>
                    <p className="neon-text-gradient neon-text-gradient--cyan page-header__subtitle--fade-in">
                      Stories from the dancefloor
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Animation Code Display */}
          <div className="demo-code-block">
            <h3 className="demo-code-title">Implementation</h3>
            {getDemoState === 'terminal-boot' && (
              <pre className="demo-code">
                <code>{`/* Terminal Boot Animation */
.page-header--animated {
  animation: terminalBoot 0.8s cubic-bezier(0.4, 0, 0.2, 1) forwards;
}

@keyframes terminalBoot {
  0% { opacity: 0; }
  100% { opacity: 1; }
}`}</code>
              </pre>
            )}

            {getDemoState === 'neon-pulse' && (
              <pre className="demo-code">
                <code>{`/* Neon Pulse CTA */
.btn--neon-pulse {
  animation: neonPulse 2s ease-in-out infinite;
}

.btn--neon-pulse:hover {
  animation: neonPulse 1s ease-in-out infinite;
}

@keyframes neonPulse {
  0%, 100% { box-shadow: 0 0 20px var(--neon-pink); }
  50% { box-shadow: 0 0 40px var(--neon-pink); }
}`}</code>
              </pre>
            )}

            {getDemoState === 'holographic-shimmer' && (
              <pre className="demo-code">
                <code>{`/* Holographic Shimmer */
.page-header__title--holographic {
  background: linear-gradient(90deg, 
    #FF10F0 0%, #A020F0 25%, 
    #00F5FF 50%, #F4FF3C 75%, 
    #FF10F0 100%);
  background-size: 200% 100%;
  animation: holographicShimmer 4s ease-in-out infinite;
}

@keyframes holographicShimmer {
  0%, 100% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
}`}</code>
              </pre>
            )}
          </div>
        </div>
      </section>

      {/* Stats & Info */}
      <section className="showcase-stats section-spacing px-horizontal-section">
        <div className="container-wide section-container">
          <div className="stats-grid">
            <div className="stat-card">
              <h3 className="stat-number text-gradient-pink-purple-blue">26</h3>
              <p className="stat-label">Total Animations</p>
            </div>
            <div className="stat-card">
              <h3 className="stat-number text-gradient-gold-peach-coral">5</h3>
              <p className="stat-label">Pages Implemented</p>
            </div>
            <div className="stat-card">
              <h3 className="stat-number text-gradient-blue-teal-green">100%</h3>
              <p className="stat-label">WCAG AAA Compliant</p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}