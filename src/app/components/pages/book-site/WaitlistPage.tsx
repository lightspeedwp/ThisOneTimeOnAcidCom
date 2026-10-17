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
            React.createElement("h2", { className: "heading-section waitlist-success__heading" }, "You're on the list."),
            React.createElement("p", { className: "text-body waitlist-success__message" }, "We'll be in touch with draft updates, launch news, and event invitations.")
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
            "Join the list for draft updates, launch news, event announcements, and first notice when pre-orders open."
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
          React.createElement("h2", { className: "heading-card" }, "What you'll get"),
          React.createElement(
            "ul",
            { className: "list-bulleted text-body space-top-sm" },
            React.createElement("li", null, "Early news on the final book"),
            React.createElement("li", null, "Future print edition updates"),
            React.createElement("li", null, "Invitations to talks and events"),
            React.createElement("li", null, "New excerpts and chapter drops"),
            React.createElement("li", null, "First notice when pre-orders open")
          )
        )
      )
    )
  );
}
