import React from 'react';
import { setSEO } from '../../../utils/seo';
import { pageSEO } from '../../../data/mock/seo/pages';
import { useNavigate } from '../../../lib/router';

export function SpeakingWorkshopsPage() {
  var navigate = useNavigate();

  React.useEffect(function() {
    setSEO(pageSEO.speaking);
  }, []);

  function handleNavigate(path) {
    return function() {
      navigate(path);
    };
  }

  return React.createElement(
    "main",
    { id: "main-content", className: "page-layout" },
    React.createElement(
      "section",
      { className: "section" },
      React.createElement(
        "div",
        { className: "section__container section__container--narrow text-center" },
        React.createElement("span", { className: "eyebrow" }, "Speaking & Workshops"),
        React.createElement(
          "h1",
          { className: "heading-hero text-neon-pink" },
          "Live conversations about creativity, difference, freedom, and building a vivid life."
        ),
        React.createElement(
          "p",
          { className: "text-lead text-neon-yellow" },
          "The themes of the book translate naturally into keynote talks, intimate conversations, festival sessions, workshops, and creative-community gatherings."
        )
      )
    ),

    React.createElement(
      "section",
      { className: "section section--dark" },
      React.createElement(
        "div",
        { className: "section__container" },
        React.createElement("h2", { className: "heading-section text-center space-bottom-xl" }, "Speaking Topics"),
        React.createElement(
          "div",
          { className: "grid" },
          React.createElement(
            "div",
            { className: "card" },
            React.createElement("h3", { className: "heading-card" }, "Live in full colour"),
            React.createElement("p", { className: "text-body" }, "Creativity as a way of life, not a side hobby.")
          ),
          React.createElement(
            "div",
            { className: "card" },
            React.createElement("h3", { className: "heading-card" }, "Difference as fuel"),
            React.createElement("p", { className: "text-body" }, "Neurodivergence, identity, and learning to work with the way your mind actually functions.")
          ),
          React.createElement(
            "div",
            { className: "card" },
            React.createElement("h3", { className: "heading-card" }, "The dancefloor as teacher"),
            React.createElement("p", { className: "text-body" }, "What subculture, ritual, music, and belonging can teach us about real life.")
          ),
          React.createElement(
            "div",
            { className: "card" },
            React.createElement("h3", { className: "heading-card" }, "Standing out on purpose"),
            React.createElement("p", { className: "text-body" }, "Visibility, costume, confidence, and becoming more fully yourself.")
          ),
          React.createElement(
            "div",
            { className: "card" },
            React.createElement("h3", { className: "heading-card" }, "Freedom as operating principle"),
            React.createElement("p", { className: "text-body" }, "Designing a life and business that funds the work that matters.")
          ),
          React.createElement(
            "div",
            { className: "card" },
            React.createElement("h3", { className: "heading-card" }, "Creative courage"),
            React.createElement("p", { className: "text-body" }, "Making things, showing up, and being seen before you feel perfectly ready.")
          )
        )
      )
    ),

    React.createElement(
      "section",
      { className: "section" },
      React.createElement(
        "div",
        { className: "section__container hero__grid" },
        React.createElement(
          "div",
          { className: "hero__content" },
          React.createElement("h2", { className: "heading-section" }, "Who this is for"),
          React.createElement(
            "ul",
            { className: "text-body list-bulleted space-bottom-lg" },
            React.createElement("li", null, "Festivals"),
            React.createElement("li", null, "Creative communities"),
            React.createElement("li", null, "Bookshops"),
            React.createElement("li", null, "Conferences"),
            React.createElement("li", null, "Media events"),
            React.createElement("li", null, "Alternative culture spaces"),
            React.createElement("li", null, "Universities"),
            React.createElement("li", null, "Teams that value creativity and independent thinking")
          ),
          React.createElement("button", { onClick: handleNavigate('/contact'), className: "button button--primary" }, "Enquire about speaking")
        ),
        React.createElement(
          "div",
          { className: "hero__visual", "aria-hidden": "true", style: { background: "linear-gradient(135deg, var(--color-uv-violet) 0%, var(--color-dark-panel) 100%)" } },
          React.createElement("h2", { className: "book-cover__title", style: { fontSize: "clamp(24px, 4vw, 40px)", color: "#fff", textShadow: "none" } }, "Let's Talk"),
          React.createElement("p", { className: "book-cover__author", style: { color: "var(--color-uv-violet)", textShadow: "none" } }, "Booking open")
        )
      )
    )
  );
}
