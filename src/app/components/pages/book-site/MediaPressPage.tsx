import React from 'react';
import { setSEO } from '../../../utils/seo';
import { pageSEO } from '../../../data/mock/seo/pages';
import { useNavigate } from '../../../lib/router';

export function MediaPressPage() {
  var navigate = useNavigate();

  React.useEffect(function() {
    setSEO(pageSEO.media);
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
        React.createElement("span", { className: "eyebrow" }, "Media & Press"),
        React.createElement("h1", { className: "heading-hero text-neon-pink" }, "For interviews, features, podcasts, and publishing conversations."),
        React.createElement(
          "p",
          { className: "text-lead text-neon-yellow space-top-md" },
          "This page will grow to include author bio assets, talking points, press-ready descriptions, approved images, and book updates."
        ),
        React.createElement(
          "p",
          { className: "text-body space-top-md space-bottom-xl" },
          "For now, use the contact page for all enquiries."
        ),
        React.createElement("button", { onClick: handleNavigate('/contact'), className: "button button--primary" }, "Contact Ash")
      )
    )
  );
}
