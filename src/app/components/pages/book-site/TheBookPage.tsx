import React from 'react';
import { setSEO, setSchema } from '../../../utils/seo';
import { pageSEO } from '../../../data/mock/seo/pages';
import { useNavigate } from '../../../lib/router';
import '../../../../styles/blocks/book.css';

export function TheBookPage() {
  var navigate = useNavigate();

  React.useEffect(function() {
    var cards = document.querySelectorAll('.book-card-grid .card');
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
    setSEO(pageSEO.theBook);
    setSchema({
      "@context": "https://schema.org",
      "@type": "Book",
      "name": "This one time on acid...",
      "author": {
        "@type": "Person",
        "name": "Ash Shaw",
        "url": "https://ashshaw.com/about-ash"
      },
      "url": "https://ashshaw.com/the-book",
      "description": "A hybrid memoir and creative-life guide about subculture, difference, freedom, reinvention, and becoming fully yourself.",
      "inLanguage": "en",
      "genre": ["Memoir", "Self-help", "Creative nonfiction"],
      "about": ["UV makeup art", "festival culture", "Berlin nightlife", "creative identity", "neurodivergence"]
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
        React.createElement("span", { className: "eyebrow book-hero__eyebrow" }, "The book"),
        React.createElement("h1", { className: "heading-hero text-neon-pink book-hero__title" }, "This one time on acid..."),
        React.createElement("h2", { className: "text-lead text-neon-yellow" }, "Stories, lessons, and the making of a neon soul."),
        React.createElement(
          "p",
          { className: "text-body text-lead space-top-md space-bottom-lg" },
          "A hybrid memoir and creative-life guide about subculture, difference, freedom, reinvention, and becoming fully yourself."
        ),
        React.createElement("button", { onClick: handleNavigate('/read-the-draft'), className: "button button--primary" }, "Unlock the Draft")
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
          React.createElement("em", null, "This one time on acid..."),
          " is a hybrid memoir and creative-life guide that traces Ash Shaw’s journey across childhood difference, dancefloors, festivals, entrepreneurship, movement, travel, Berlin nights, UV paint, and the slow cumulative effect of a life lived in full colour."
        ),
        React.createElement(
          "p",
          { className: "text-body" },
          "Part memoir, part philosophical field guide, the book asks what it means to build a life that feels vivid, honest, and self-authored. It explores neurodivergence, belonging, costume, community, risk, discipline, visibility, and the strange alchemy through which identity becomes art."
        ),
        React.createElement(
          "p",
          { className: "text-body" },
          "Rather than presenting a clean arc of transformation, the book stays close to lived experience: restless energy, subcultural education, practical freedom, creative work, bodily discipline, chosen tribes, and the hard-earned permission to stand out on purpose."
        ),
        React.createElement(
          "p",
          { className: "text-body" },
          "The result is a book for readers who want more than inspiration. It is for people who want language, texture, and proof that a richer life can be made."
        )
      )
    ),

    React.createElement(
      "section",
      { className: "section" },
      React.createElement(
        "div",
        { className: "section__container" },
        React.createElement(
          "div",
          { className: "grid book-card-grid" },
          React.createElement(
            "div",
            { className: "card" },
            React.createElement("h3", { className: "heading-card" }, "Hybrid memoir"),
            React.createElement("p", { className: "text-body" }, "Personal history, wild stories, and emotional truth.")
          ),
          React.createElement(
            "div",
            { className: "card" },
            React.createElement("h3", { className: "heading-card" }, "Creative-life guide"),
            React.createElement("p", { className: "text-body" }, "Lessons on living with more courage, colour, freedom, and intention.")
          ),
          React.createElement(
            "div",
            { className: "card" },
            React.createElement("h3", { className: "heading-card" }, "Cultural artefact"),
            React.createElement("p", { className: "text-body" }, "A document of subculture, belonging, movement, and creative becoming.")
          )
        )
      )
    ),

    React.createElement(
      "section",
      { className: "section section--dark" },
      React.createElement(
        "div",
        { className: "section__container" },
        React.createElement(
          "div",
          { className: "grid grid--2" },
          React.createElement(
            "div",
            null,
            React.createElement("h2", { className: "heading-section" }, "Who this book is for"),
            React.createElement(
              "ul",
              { className: "text-body list-bulleted" },
              React.createElement("li", null, "Readers who feel wired differently"),
              React.createElement("li", null, "Creative people searching for a more vivid life"),
              React.createElement("li", null, "Festival and subculture audiences"),
              React.createElement("li", null, "Alternative culture readers"),
              React.createElement("li", null, "Anyone learning to turn difference into direction")
            )
          ),
          React.createElement(
            "div",
            null,
            React.createElement("h2", { className: "heading-section" }, "Themes"),
            React.createElement(
              "div",
              { className: "tag-list" },
              React.createElement("span", { className: "tag tag--yellow" }, "Difference"),
              React.createElement("span", { className: "tag tag--pink" }, "Belonging"),
              React.createElement("span", { className: "tag tag--violet" }, "Freedom"),
              React.createElement("span", { className: "tag tag--yellow" }, "Creativity"),
              React.createElement("span", { className: "tag tag--pink" }, "Visibility"),
              React.createElement("span", { className: "tag tag--violet" }, "Reinvention")
            )
          )
        )
      )
    ),

    React.createElement(
      "section",
      { className: "section" },
      React.createElement(
        "div",
        { className: "section__container section__container--narrow" },
        React.createElement("h2", { className: "heading-section" }, "Why this book now"),
        React.createElement(
          "p",
          { className: "text-body" },
          "Because people are hungry for work that feels honest, embodied, and alive. Because conventional life scripts do not fit everyone. Because subculture can teach us things mainstream life cannot. Because the cost of becoming fully yourself is real — and so is the reward."
        ),
        
        React.createElement("h2", { className: "heading-section space-top-xl" }, "What comes next"),
        React.createElement(
          "p",
          { className: "text-body space-bottom-lg" },
          "The current draft is the earliest public version of the book. A fuller final edition and future print version will follow. Early readers join the project at the beginning, not the end."
        ),
        React.createElement("button", { onClick: handleNavigate('/waitlist'), className: "button button--secondary" }, "Join the Waitlist")
      )
    ),
    
    React.createElement(
      "section",
      { className: "section section--dark" },
      React.createElement(
        "div",
        { className: "section__container section__container--narrow text-center" },
        React.createElement("h2", { className: "heading-section text-neon-pink" }, "Start reading the rough draft."),
        React.createElement("button", { onClick: handleNavigate('/read-the-draft'), className: "button button--primary space-top-md" }, "Unlock the Draft")
      )
    )
  );
}
