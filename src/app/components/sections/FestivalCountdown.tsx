/**
 * Festival Countdown Component
 * 
 * Countdown timer to Origin Festival (Jan 30 - Feb 1, 2026)
 * Builds anticipation for the next festival experience
 * 
 * Styling System:
 * - WordPress-aligned global CSS classes (Batch 4)
 * - Fluid typography and spacing following guidelines
 * - Responsive design with mobile-first approach
 * - Dark mode compatible with proper contrast
 * 
 * @component
 * @returns {JSX.Element} Countdown timer with call-to-action
 * 
 * @version 2.1.2 - Semantic BEM Refactor
 */

import React, { useState, useEffect } from 'react';
import { Calendar, Clock, MapPin, Sparkle, ArrowRight } from '@phosphor-icons/react';
import { nextFestival } from '../../data/mock/sections/countdown';
import "../../../styles/blocks/countdown.css";

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

export function FestivalCountdown() {
  const timeLeftInit: TimeLeft = { days: 0, hours: 0, minutes: 0, seconds: 0 };
  const [timeLeft, setTimeLeft] = useState(timeLeftInit);
  
  const [isExpired, setIsExpired] = useState(false);
  
  // Festival dates from mock data
  const festivalStart = new Date(nextFestival.startDate);
  const festivalEnd = new Date(nextFestival.endDate);
  
  useEffect(() => {
    const calculateTimeLeft = () => {
      const now = new Date();
      const difference = festivalStart.getTime() - now.getTime();
      
      // Check if festival has started or ended
      if (now >= festivalStart && now <= festivalEnd) {
        setIsExpired(false);
        // Festival is happening NOW!
        return {
          days: 0,
          hours: 0,
          minutes: 0,
          seconds: 0
        };
      } else if (now > festivalEnd) {
        setIsExpired(true);
        return {
          days: 0,
          hours: 0,
          minutes: 0,
          seconds: 0
        };
      }
      
      // Calculate time left
      const days = Math.floor(difference / (1000 * 60 * 60 * 24));
      const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((difference % (1000 * 60)) / 1000);
      
      return { days, hours, minutes, seconds };
    };
    
    // Initial calculation
    setTimeLeft(calculateTimeLeft());
    
    // Update every second
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);
    
    return () => clearInterval(timer);
  }, []);
  
  if (isExpired) {
    return null; // Don't show if festival is over
  }
  
  const isFestivalHappening = timeLeft.days === 0 && timeLeft.hours === 0 && timeLeft.minutes === 0 && timeLeft.seconds === 0;
  
  return (
    <section id="festival-countdown" className="festival-countdown section-spacing px-horizontal-section">
      {/* Animated Background Elements */}
      <div className="festival-countdown__bg">
        <div className="festival-countdown__bg-effect festival-countdown__bg-effect--1" />
        <div className="festival-countdown__bg-effect festival-countdown__bg-effect--2" />
      </div>
      
      <div className="container-6xl festival-countdown__inner section-container">
        {isFestivalHappening ? (
          // Festival is happening NOW!
          <div className="festival-countdown__content">
            <div className="festival-countdown__badge festival-countdown__badge-animate mb-fluid-lg">
              <Sparkle className="icon-md text-neon-yellow festival-countdown__icon-spin" />
              <span>HAPPENING NOW!</span>
              <Sparkle className="icon-md text-neon-yellow festival-countdown__icon-spin" />
            </div>
            
            <h2 className="text-section-h2 mb-fluid-md">
              {nextFestival.name} is Here! 🎉
            </h2>
            
            <p className="text-body-p mb-fluid-lg">
              {nextFestival.happeningText}
            </p>
            
            <div className="festival-countdown__actions">
              <a
                href="#contact"
                className="btn btn--neon-primary inline-flex-center gap-fluid-sm"
              >
                Contact for Collab
                <ArrowRight className="icon-md" />
              </a>
            </div>
          </div>
        ) : (
          // Countdown to festival
          <div className="festival-countdown__content">
            {/* Festival Info */}
            <div className="festival-countdown__header">
              <div className="festival-countdown__subtitle">
                <div className="festival-countdown__badge">
                  <Sparkle className="icon-sm text-neon-yellow" />
                  <span>Coming Soon</span>
                </div>
              </div>
              
              <h2 className="text-section-h2 text-gradient-pink-purple-blue mb-fluid-sm">
                {nextFestival.name}
              </h2>
              
              <div className="festival-countdown__meta">
                <div className="festival-countdown__meta-item">
                  <Calendar className="icon-md" />
                  <span>{nextFestival.dateText}</span>
                </div>
                <div className="festival-countdown__meta-divider" />
                <div className="festival-countdown__meta-item">
                  <MapPin className="icon-md" />
                  <span>{nextFestival.location}</span>
                </div>
              </div>
            </div>
            
            {/* Countdown Timer */}
            <div className="festival-countdown__grid">
              {[
                { label: "Days", value: timeLeft.days },
                { label: "Hours", value: timeLeft.hours },
                { label: "Minutes", value: timeLeft.minutes },
                { label: "Seconds", value: timeLeft.seconds },
              ].map((item) => (
                <div key={item.label} className="festival-timer-card">
                  <div className="festival-timer-card__number">
                    {item.value}
                  </div>
                  <div className="festival-timer-card__label">
                    {item.label}
                  </div>
                </div>
              ))}
            </div>
            
            {/* Call to Action */}
            <div className="festival-countdown__cta-section">
              <p className="text-body-p festival-countdown__description">
                {nextFestival.description}
              </p>
              
              <div className="festival-countdown__buttons">
                <a
                  href="#contact"
                  className="btn btn--neon-primary inline-flex-center gap-fluid-sm btn--full-mobile"
                >
                  {nextFestival.ctaBook}
                  <ArrowRight className="icon-md" />
                </a>
                
                <a
                  href="#portfolio"
                  className="btn btn--neon-secondary inline-flex-center gap-fluid-sm btn--full-mobile"
                >
                  <Sparkle className="icon-md" />
                  {nextFestival.ctaView}
                </a>
              </div>
              
              {/* Urgency Message */}
              {timeLeft.days < 14 && (
                <div className="festival-countdown__urgency">
                  <div className="festival-countdown__urgency-badge">
                    <Clock className="icon-sm" />
                    Limited slots for collaboration!
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}