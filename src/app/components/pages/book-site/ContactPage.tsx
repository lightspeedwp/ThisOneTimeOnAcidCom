import React from 'react';
import { setSEO, setSchema } from '../../../utils/seo';
import { pageSEO } from '../../../data/mock/seo/pages';

export function ContactPage() {
  React.useEffect(function() {
    setSEO(pageSEO.bookContact);
    setSchema({
      "@context": "https://schema.org",
      "@type": "ContactPage",
      "name": "Contact Ash Shaw",
      "url": "https://ashshaw.com/contact",
      "description": "Contact page for media, speaking, workshop, event, and publisher enquiries.",
      "about": {
        "@type": "Person",
        "name": "Ash Shaw",
        "url": "https://ashshaw.com/about-ash"
      }
    });
    return function() { setSchema(null); };
  }, []);

  function handleContact(e) {
    if (e && e.preventDefault) e.preventDefault();
    alert('Message sent successfully (Mock).');
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
        React.createElement("span", { className: "eyebrow" }, "Contact"),
        React.createElement("h1", { className: "heading-hero text-neon-pink" }, "Get in touch."),
        React.createElement(
          "p",
          { className: "text-lead text-neon-yellow" },
          "Use this page for media, speaking, workshop, event, publisher, or general enquiries."
        )
      )
    ),

    React.createElement(
      "section",
      { className: "section section--dark" },
      React.createElement(
        "div",
        { className: "section__container hero__grid" },
        React.createElement(
          "div",
          null,
          React.createElement("h2", { className: "heading-section" }, "Enquiry Types"),
          React.createElement(
            "div",
            { className: "grid grid--1 space-bottom-lg" },
            React.createElement(
              "div",
              { className: "card", style: { padding: "24px" } },
              React.createElement("h3", { className: "heading-card", style: { margin: 0 } }, "Media & Press")
            ),
            React.createElement(
              "div",
              { className: "card", style: { padding: "24px" } },
              React.createElement("h3", { className: "heading-card", style: { margin: 0 } }, "Speaking & Workshops")
            ),
            React.createElement(
              "div",
              { className: "card", style: { padding: "24px" } },
              React.createElement("h3", { className: "heading-card", style: { margin: 0 } }, "Event Appearances")
            ),
            React.createElement(
              "div",
              { className: "card", style: { padding: "24px" } },
              React.createElement("h3", { className: "heading-card", style: { margin: 0 } }, "Publisher / Rights")
            ),
            React.createElement(
              "div",
              { className: "card", style: { padding: "24px" } },
              React.createElement("h3", { className: "heading-card", style: { margin: 0 } }, "General Enquiries")
            )
          )
        ),
        
        React.createElement(
          "div",
          { className: "card" },
          React.createElement("h2", { className: "heading-card text-neon-yellow" }, "Send a message"),
          React.createElement(
            "form",
            { className: "form", onSubmit: handleContact, style: { maxWidth: "100%" } },
            React.createElement(
              "div",
              { className: "form__group" },
              React.createElement("label", { className: "form__label" }, "Name"),
              React.createElement("input", { type: "text", className: "form__input", required: true })
            ),
            React.createElement(
              "div",
              { className: "form__group" },
              React.createElement("label", { className: "form__label" }, "Email"),
              React.createElement("input", { type: "email", className: "form__input", required: true })
            ),
            React.createElement(
              "div",
              { className: "form__group" },
              React.createElement("label", { className: "form__label" }, "Organisation (optional)"),
              React.createElement("input", { type: "text", className: "form__input" })
            ),
            React.createElement(
              "div",
              { className: "form__group" },
              React.createElement("label", { className: "form__label" }, "Enquiry type"),
              React.createElement(
                "select",
                { className: "form__input", required: true },
                React.createElement("option", { value: "" }, "Select an option"),
                React.createElement("option", { value: "media" }, "Media & Press"),
                React.createElement("option", { value: "speaking" }, "Speaking & Workshops"),
                React.createElement("option", { value: "events" }, "Event Appearances"),
                React.createElement("option", { value: "publisher" }, "Publisher / Rights"),
                React.createElement("option", { value: "general" }, "General Enquiries")
              )
            ),
            React.createElement(
              "div",
              { className: "form__group" },
              React.createElement("label", { className: "form__label" }, "Message"),
              React.createElement("textarea", { className: "form__textarea", required: true })
            ),
            React.createElement("button", { type: "submit", className: "button button--primary space-top-sm" }, "Send Enquiry")
          ),
          React.createElement(
            "p",
            { className: "text-fine text-center space-top-md" },
            "Ash reads every message, but thoughtful enquiries get the best response."
          )
        )
      )
    )
  );
}
