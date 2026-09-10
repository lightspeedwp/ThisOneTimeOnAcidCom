import React from 'react';
import { setSEO, setSchema } from '../../../utils/seo';
import { pageSEO } from '../../../data/mock/seo/pages';
import { useNavigate } from '../../../lib/router';

export function AboutAshPage() {
  var navigate = useNavigate();

  React.useEffect(function() {
    var cards = document.querySelectorAll('.about-card-grid .card');
    var reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reducedMotion) {
      cards.forEach(function(c) { c.classList.add('in-view'); });
      return;
    }
    var observer = new IntersectionObserver(function(entries) {
      entries.forEach(function(entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('in-view');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });
    cards.forEach(function(c) { observer.observe(c); });
    return function() { observer.disconnect(); };
  }, []);

  React.useEffect(function() {
    setSEO(pageSEO.aboutAsh);
    setSchema({
      "@context": "https://schema.org",
      "@type": "ProfilePage",
      "name": "About Ash Shaw",
      "url": "https://ashshaw.com/about-ash",
      "description": "Writer, UV artist, founder, cyclist, speaker, traveller, and builder of strange, vivid, meaningful things.",
      "mainEntity": {
        "@type": "Person",
        "name": "Ash Shaw",
        "url": "https://ashshaw.com",
        "image": "https://ashshaw.com/og-image.svg",
        "jobTitle": "Author & Makeup Artist",
        "description": "South African writer and multidisciplinary creative. Author of 'This one time on acid...' — a hybrid memoir about subculture, creativity, and becoming fully yourself.",
        "workLocation": { "@type": "City", "name": "Berlin" },
        "sameAs": ["https://instagram.com/ashshaw_makeup", "https://ashshaw.com"]
      }
    });
    return function() { setSchema(null); };
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
        React.createElement("span", { className: "eyebrow" }, "About the author"),
        React.createElement("h1", { className: "heading-hero text-neon-pink" }, "Ash Shaw writes from the overlap."),
        React.createElement(
          "p",
          { className: "text-lead text-neon-yellow" },
          "Writer, UV artist, founder, cyclist, speaker, traveller, and builder of strange, vivid, meaningful things."
        )
      )
    ),

    React.createElement(
      "section",
      { className: "section section--dark" },
      React.createElement(
        "div",
        { className: "section__container section__container--narrow" },
        React.createElement(
          "p",
          { className: "text-body" },
          "Ash Shaw is a South African writer and multidisciplinary creative whose life moves between art, movement, entrepreneurship, subculture, and community. ",
          React.createElement("em", null, "This one time on acid..."),
          " is his first book: a hybrid memoir and creative-life guide shaped by decades on dancefloors, bicycles, stages, festivals, conference floors, and the margins where identity becomes visible."
        ),
        React.createElement(
          "p",
          { className: "text-body" },
          "His work spans UV makeup art, storytelling, public speaking, product and business building, and a lifelong interest in how people become more fully themselves. Rather than writing from a single lane, he writes from the overlap — where creative practice, lived experience, discipline, neurodivergence, subculture, and freedom all meet."
        ),
        React.createElement(
          "p",
          { className: "text-body" },
          "The result is a voice that is both personal and expansive: grounded in real scenes, but reaching for larger meaning."
        ),
        React.createElement(
          "blockquote",
          { className: "quote" },
          "\"Standing out is a skill, not a talent.\""
        )
      )
    ),

    React.createElement(
      "section",
      { className: "section" },
      React.createElement(
        "div",
        { className: "section__container section__container--narrow" },
        React.createElement("h2", { className: "heading-section text-center space-bottom-xl" }, "The overlapping paths"),
        React.createElement(
          "div",
          { className: "grid book-card-grid about-card-grid" },
          React.createElement(
            "div",
            { className: "card" },
            React.createElement("h3", { className: "heading-card" }, "Founder & Builder"),
            React.createElement("p", { className: "text-body" }, "Building businesses, digital spaces, and communities since the early 2000s.")
          ),
          React.createElement(
            "div",
            { className: "card" },
            React.createElement("h3", { className: "heading-card" }, "Subculture Participant"),
            React.createElement("p", { className: "text-body" }, "Long-term participant in global festival and psytrance culture.")
          ),
          React.createElement(
            "div",
            { className: "card" },
            React.createElement("h3", { className: "heading-card" }, "Visual Artist"),
            React.createElement("p", { className: "text-body" }, "UV makeup artist and live visual creative exploring identity and costume.")
          ),
          React.createElement(
            "div",
            { className: "card" },
            React.createElement("h3", { className: "heading-card" }, "Endurance Athlete"),
            React.createElement("p", { className: "text-body" }, "Cyclist, Muay Thai student, and endurance-minded traveller.")
          ),
          React.createElement(
            "div",
            { className: "card" },
            React.createElement("h3", { className: "heading-card" }, "Speaker & Facilitator"),
            React.createElement("p", { className: "text-body" }, "Speaker, workshop host, and community-builder on creativity and belonging.")
          ),
          React.createElement(
            "div",
            { className: "card" },
            React.createElement("h3", { className: "heading-card" }, "Author"),
            React.createElement(
              "p",
              { className: "text-body" },
              "First book, ",
              React.createElement("em", null, "This one time on acid..."),
              ", currently in progress."
            )
          )
        )
      )
    ),

    React.createElement(
      "section",
      { className: "section section--dark" },
      React.createElement(
        "div",
        { className: "section__container section__container--narrow text-center" },
        React.createElement("h2", { className: "heading-section" }, "Read the draft"),
        React.createElement("p", { className: "text-body space-bottom-lg" }, "Follow the making of the book as it evolves."),
        React.createElement("button", { onClick: handleNavigate('/read-the-draft'), className: "button button--primary" }, "Unlock the Draft")
      )
    )
  );
}
