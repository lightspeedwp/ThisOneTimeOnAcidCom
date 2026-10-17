import React from 'react';
import { setSEO, setSchema } from '../../../utils/seo';
import { pageSEO } from '../../../data/mock/seo/pages';
import { useNavigate } from '../../../lib/router';

export function EventsPage() {
  var navigate = useNavigate();

  React.useEffect(function() {
    setSEO(pageSEO.bookEvents);
    setSchema({
      "@context": "https://schema.org",
      "@type": "WebPage",
      "name": "Events — Ash Shaw",
      "url": "https://ashshaw.com/events",
      "description": "Readings, talks, workshops, festival appearances, salon events, and launch moments for the book 'This one time on acid...' by Ash Shaw.",
      "about": {
        "@type": "Person",
        "name": "Ash Shaw",
        "url": "https://ashshaw.com/about-ash"
      },
      "breadcrumb": {
        "@type": "BreadcrumbList",
        "itemListElement": [
          { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://ashshaw.com/" },
          { "@type": "ListItem", "position": 2, "name": "Events", "item": "https://ashshaw.com/events" }
        ]
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
        React.createElement("span", { className: "eyebrow" }, "Events"),
        React.createElement("h1", { className: "heading-hero text-neon-pink" }, "Where the book shows up in public."),
        React.createElement(
          "p",
          { className: "text-lead space-top-md" },
          "Readings, talks, workshops, festival appearances, salon events, podcasts, and future launch moments will live here."
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
          { className: "card text-center card--outline-yellow section__container--narrow", style: { padding: "64px 24px" } },
          React.createElement("h2", { className: "heading-section" }, "No public dates yet."),
          React.createElement(
            "p",
            { className: "text-lead text-body space-bottom-lg", style: { margin: "0 auto" } },
            "Join the waitlist to hear first when new talks, readings, and appearances are announced."
          ),
          React.createElement("button", { onClick: handleNavigate('/waitlist'), className: "button button--primary" }, "Join the Waitlist")
        ),
        
        React.createElement(
          "h3",
          { className: "heading-card text-center text-neon-yellow space-top-xxl space-bottom-lg" },
          "Upcoming Formats"
        ),
        React.createElement(
          "div",
          { className: "grid", style: { opacity: 0.7 } },
          React.createElement(
            "div",
            { className: "card" },
            React.createElement("span", { className: "card__category" }, "Placeholder"),
            React.createElement("h3", { className: "heading-card" }, "Book salon / Cape Town"),
            React.createElement("p", { className: "text-body" }, "Date TBC")
          ),
          React.createElement(
            "div",
            { className: "card" },
            React.createElement("span", { className: "card__category" }, "Placeholder"),
            React.createElement("h3", { className: "heading-card" }, "Festival talk / Berlin"),
            React.createElement("p", { className: "text-body" }, "Date TBC")
          ),
          React.createElement(
            "div",
            { className: "card" },
            React.createElement("span", { className: "card__category" }, "Placeholder"),
            React.createElement("h3", { className: "heading-card" }, "Creative workshop / Online"),
            React.createElement("p", { className: "text-body" }, "Date TBC")
          )
        )
      )
    )
  );
}
