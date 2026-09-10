import React from 'react';
import { setSEO } from '../../../utils/seo';
import { pageSEO } from '../../../data/mock/seo/pages';
import { useNavigate } from '../../../lib/router';
import '../../../../styles/blocks/draft-viewer.css';

export function ReadDraftPage() {
  var navigate = useNavigate();

  React.useEffect(function() {
    setSEO(pageSEO.readDraft);
  }, []);

  function handleSubmit(e) {
    if (e && e.preventDefault) e.preventDefault();
    var emailInput = e.target.querySelector('input[type="email"]');
    if (emailInput && emailInput.value.toLowerCase() === 'hello@thisonetimeonacid.com') {
      navigate('/ebook');
    } else {
      navigate('/thank-you');
    }
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
          React.createElement("span", { className: "eyebrow" }, "Read the draft"),
          React.createElement("h1", { className: "heading-hero text-neon-pink" }, "Unlock the rough draft."),
          React.createElement(
            "p",
            { className: "text-lead" },
            "Enter your email to read early excerpts from ",
            React.createElement("em", null, "This one time on acid..."),
            " and follow the book as it evolves."
          ),
          
          React.createElement(
            "form",
            { className: "form space-top-lg", onSubmit: handleSubmit },
            React.createElement(
              "div",
              { className: "form__group" },
              React.createElement("label", { htmlFor: "draft-email", className: "form__label" }, "Email address"),
              React.createElement("input", { id: "draft-email", type: "email", placeholder: "you@example.com", className: "form__input", required: true })
            ),
            React.createElement("button", { type: "submit", className: "button button--primary space-top-sm" }, "Unlock the Draft")
          ),
          React.createElement(
            "p",
            { className: "text-fine space-top-sm" },
            "You’ll also get chapter updates, launch news, and first notice when pre-orders open. No spam. Just the good stuff."
          )
        ),
        
        React.createElement(
          "div",
          { className: "locked-content" },
          React.createElement("h2", { className: "heading-card text-neon-yellow" }, "What you’ll unlock"),
          React.createElement(
            "ul",
            { className: "list-bulleted text-body locked-content--left space-bottom-md space-top-md" },
            React.createElement("li", { className: "draft-viewer__item" }, "Selected draft chapters and excerpts"),
            React.createElement("li", { className: "draft-viewer__item" }, "Notes from the writing process"),
            React.createElement("li", { className: "draft-viewer__item" }, "Updates on the final book"),
            React.createElement("li", { className: "draft-viewer__item" }, "Early access to future launches and live events")
          ),
          React.createElement(
            "div",
            { className: "card space-top-md bg-dark-opacity" },
            React.createElement(
              "p",
              { className: "text-body text-fine italic" },
              "\"For the ones who dance until sunrise and still see the world differently when the sun comes up.\""
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
        React.createElement("h2", { className: "heading-section" }, "A living manuscript."),
        React.createElement(
          "p",
          { className: "text-body section__container--narrow" },
          "This draft is intentionally raw. It is closer to a living manuscript than a finished product. Some sections are complete, some are rough, and some are still being discovered. That is part of the experience."
        )
      )
    ),
    
    React.createElement(
      "section",
      { className: "section" },
      React.createElement(
        "div",
        { className: "section__container section__container--narrow text-center" },
        React.createElement(
          "blockquote",
          { className: "quote locked-content--left" },
          "\"The neon soul is fully online. The cumulative effect continues.\""
        )
      )
    )
  );
}
