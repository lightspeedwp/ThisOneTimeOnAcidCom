/**
 * @fileoverview Portfolio Feedback Section component
 * Displays testimonials and reviews for portfolio entries based on category/tags matching
 * 
 * @author Ash Shaw Portfolio Team
 * @version 1.0.0
 */

import React, { useState, useEffect } from 'react';
import { Chat, Star } from '@phosphor-icons/react';
import { useNavigate } from '../../lib/router';
import { getFeedbackForPortfolioEntry } from '../../data/mock/feedback';
import { portfolioUI } from '../../data/mock/ui/portfolio';
import '../../../styles/blocks/portfolio-feedback.css';

interface PortfolioFeedbackSectionProps {
  category: string;
  tags: string[];
}

/**
 * Portfolio Feedback Section
 * 
 * Displays filtered testimonials based on portfolio category and tags.
 * Features load-more pagination and responsive grid layout.
 * 
 * @param category - Portfolio entry category (e.g., 'festivals', 'events')
 * @param tags - Array of tags for filtering relevant feedback
 */
export function PortfolioFeedbackSection({ category, tags }: PortfolioFeedbackSectionProps) {
  var navigate = useNavigate();
  var [visibleFeedbackCount, setVisibleFeedbackCount] = useState(3);

  // Reset visible count when category/tags change
  useEffect(function () {
    setVisibleFeedbackCount(3);
  }, [category, tags]);

  var feedback = getFeedbackForPortfolioEntry(category, tags);
  
  // Don't render if no feedback found
  if (feedback.length === 0) {
    return null;
  }

  var shown = feedback.slice(0, visibleFeedbackCount);
  var hasMore = feedback.length > visibleFeedbackCount;

  return (
    <section className="portfolio-feedback-section">
      <div className="container-7xl portfolio-feedback__container">
        <h2 className="text-section-h2 portfolio-feedback__heading mb-fluid-lg">
          {portfolioUI.detail.sections.feedback.heading}
        </h2>
        
        <div className="portfolio-feedback__grid">
          {shown.map(function (fb) {
            return (
              <article 
                key={fb.id} 
                className={'portfolio-feedback__card' + (fb.featured ? ' portfolio-feedback__card--featured' : '')}
              >
                <Chat className="portfolio-feedback__quote-icon" aria-hidden="true" />
                
                <blockquote className="portfolio-feedback__quote">
                  {fb.quote}
                </blockquote>
                
                <div 
                  className="portfolio-feedback__rating" 
                  aria-label={fb.rating + ' out of 5 stars'}
                >
                  {[0, 1, 2, 3, 4].map(function (i) {
                    return (
                      <Star
                        key={i}
                        className={'portfolio-feedback__star ' + (i < fb.rating ? 'portfolio-feedback__star--filled' : '')}
                      />
                    );
                  })}
                </div>
                
                <div className="portfolio-feedback__author">
                  <span className="portfolio-feedback__name">{fb.name}</span>
                  <span className="portfolio-feedback__meta">
                    {fb.location}
                    {fb.event ? ' \u00B7 ' + fb.event : ''}
                  </span>
                </div>
              </article>
            );
          })}
        </div>
        
        <div className="portfolio-feedback__actions">
          {hasMore ? (
            <button
              type="button"
              onClick={function () { 
                setVisibleFeedbackCount(function (prev) { 
                  return prev + 3; 
                }); 
              }}
              className="btn btn--neon-primary btn--outline inline-flex-center gap-fluid-sm"
            >
              Load More Feedback ({feedback.length - visibleFeedbackCount} remaining)
            </button>
          ) : null}
          
          <a
            href="/feedback"
            onClick={function (e) {
              e.preventDefault();
              navigate('/feedback');
            }}
            className="btn btn--ghost-neon inline-flex-center gap-fluid-sm"
            aria-label="View all feedback"
          >
            <Chat className="icon-sm" />
            View all feedback
          </a>
        </div>
      </div>
    </section>
  );
}