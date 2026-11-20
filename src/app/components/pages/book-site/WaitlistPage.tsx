import React from 'react';
import { setSEO } from '../../../utils/seo';
import { pageSEO } from '../../../data/mock/seo/pages';
import { useNavigate } from '../../../lib/router';
import '../../../../styles/blocks/waitlist.css';

var CONFETTI_COLORS = ['var(--color-neon-pink)', 'var(--color-neon-yellow)', '#8A63FF', '#FF10F0', '#F4FF3C'];

function makeConfetti() {
  var particles = [];
  for (var i = 0; i < 35; i++) {
    particles.push({
      id: i,
      x: Math.random() * 100,
      color: CONFETTI_COLORS[Math.floor(Math.random() * CONFETTI_COLORS.length)],
      tx: (Math.random() - 0.5) * 160 + 'px',
      rot: Math.floor(Math.random() * 720) + 'deg',
      delay: Math.random() * 0.6
    });
  }
  return particles;
}

export function WaitlistPage() {
  var navigate = useNavigate();
  var submittedState = React.useState(false);
  var submitted = submittedState[0];
  var setSubmitted = submittedState[1];
  var confettiState = React.useState([]);
  var confetti = confettiState[0];
  var setConfetti = confettiState[1];

  React.useEffect(function() {
    setSEO(pageSEO.waitlist);
  }, []);

  React.useEffect(function() {
    if (!submitted) return;
    var particles = makeConfetti();
    setConfetti(particles);
    var timer = setTimeout(function() { setConfetti([]); }, 3500);
    return function() { clearTimeout(timer); };
  }, [submitted]);

  function handleWaitlist(e) {
    if (e && e.preventDefault) e.preventDefault();
    var emailInput = e.target.querySelector('input[type="email"]');
    if (emailInput && emailInput.value.toLowerCase() === 'hello@thisonetimeonacid.com') {
      navigate('/ebook');
      return;
    }
    setSubmitted(true);
  }

  var confettiEl = confetti.length > 0
    ? React.createElement(
        "div",
        { className: "confetti-container" },
        confetti.map(function(p) {
          return React.createElement("div", {
            key: p.id,
            className: "confetti-particle",
            style: {
              left: p.x + '%',
              backgroundColor: p.color,
              animationDelay: p.delay + 's',
              '--tx': p.tx,
              '--rot': p.rot
            } as React.CSSProperties
          });
        })
      )
    : null;

  if (submitted) {
    return React.createElement(
      "main",
      { id: "main-content", className: "page-layout" },
      confettiEl,
      React.createElement(
        "section",
        { className: "section" },
        React.createElement(
          "div",
          { className: "section__container section__container--narrow" },
          React.createElement(
            "div",
            { className: "waitlist-success" },
            React.createElement(
              "div",
              { className: "waitlist-success__icon" },
              React.createElement(
                "svg",
                { viewBox: "0 0 64 64", xmlns: "http://www.w3.org/2000/svg" },
                React.createElement("circle", { cx: "32", cy: "32", r: "28" }),
                React.createElement("path", { d: "M20 32 l10 10 l14 -18" })
              )
            ),
            React.createElement("h2", { className: "heading-section waitlist-success__heading" }, "Thank you."),
            React.createElement("p", { className: "text-body waitlist-success__message" }, "Your submission has been received. Newsletter subscription requires explicit consent through double opt-in and is separate from reader access.")
          )
        )
      )
    );
  }

  return React.createElement(
    "main",
    { id: "main-content", className: "page-layout" },
    React.createElement(
      "section",
      { className: "section" },
      React.createElement(
        "div",
        { className: "section__container hero__grid" },
        React.createElement(
          "div",
          { className: "hero__content" },
          React.createElement("span", { className: "eyebrow" }, "Waitlist"),
          React.createElement("h1", { className: "heading-hero text-neon-pink" }, "Follow the book as it takes shape."),
          React.createElement(
            "p",
            { className: "text-lead text-neon-yellow" },
            "Join our interest list. Newsletter updates are separate and require explicit consent through double opt-in."
          ),
          
          React.createElement(
            "form",
            { className: "form space-top-lg", onSubmit: handleWaitlist },
            React.createElement(
              "div",
              { className: "form__group" },
              React.createElement("label", { htmlFor: "waitlist-email", className: "form__label" }, "Email address"),
              React.createElement("input", { id: "waitlist-email", type: "email", placeholder: "you@example.com", className: "form__input", required: true })
            ),
            React.createElement("button", { type: "submit", className: "button button--secondary space-top-sm" }, "Join the Waitlist")
          )
        ),
        
        React.createElement(
          "div",
          { className: "card card--outline-violet" },
          React.createElement("h2", { className: "heading-card" }, "Interest List Transparency"),
          React.createElement(
            "ul",
            { className: "list-bulleted text-body space-top-sm" },
            React.createElement("li", null, "Your email is kept on our interest list"),
            React.createElement("li", null, "Newsletter communications require separate opt-in"),
            React.createElement("li", null, "We respect your inbox and privacy"),
            React.createElement("li", null, "Double opt-in confirmation for all emails"),
            React.createElement("li", null, "Unsubscribe anytime — no penalties")
          )
        )
      )
    )
  );
}
