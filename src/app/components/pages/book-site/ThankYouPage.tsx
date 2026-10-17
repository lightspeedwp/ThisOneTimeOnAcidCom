import React from 'react';
import { setSEO } from '../../../utils/seo';
import { pageSEO } from '../../../data/mock/seo/pages';
import { useNavigate } from '../../../lib/router';

export function ThankYouPage() {
  var navigate = useNavigate();

  React.useEffect(function() {
    setSEO(pageSEO.thankYou);
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
        { className: "section__container hero__grid" },
        React.createElement(
          "div",
          { className: "hero__content" },
          React.createElement("span", { className: "eyebrow text-neon-yellow" }, "Success"),
          React.createElement("h1", { className: "heading-hero text-neon-pink" }, "You’re in."),
          React.createElement(
            "p",
            { className: "text-lead" },
            "Thanks for joining the early readers. Your access to the rough draft starts here."
          ),
          React.createElement(
            "p",
            { className: "text-body space-bottom-lg" },
            "You’ll also receive future updates on chapter drops, launch news, events, and eventual pre-orders."
          ),
          
          React.createElement(
            "div",
            { className: "button-group" },
            React.createElement("button", { onClick: handleNavigate('/draft-viewer'), className: "button button--primary" }, "Start Reading"),
            React.createElement("button", { onClick: handleNavigate('/the-book'), className: "button button--secondary" }, "Explore the Book"),
            React.createElement("button", { onClick: handleNavigate('/journal'), className: "button button--secondary" }, "Follow the Journal")
          )
        ),
        
        React.createElement(
          "div",
          { className: "locked-content locked-content--left locked-content--pink" },
          React.createElement("span", { className: "card__category" }, "Excerpt 01"),
          React.createElement("h2", { className: "heading-card" }, "The first drop"),
          React.createElement(
            "p",
            { className: "text-body text-lead space-bottom-md italic" },
            "\"We didn't know it was a subculture then. We just knew the music was loud enough to drown out the noise in our heads, and the paint was bright enough to make us feel like we belonged in the dark.\""
          ),
          React.createElement("button", { onClick: handleNavigate('/draft-viewer'), className: "button button--secondary button--full" }, "Read Chapter 1")
        )
      )
    )
  );
}
