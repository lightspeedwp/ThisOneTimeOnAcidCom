import React from "react";
import { useNavigate, grab } from "../../lib/router";
import { Link as LinkIcon, Check } from '@phosphor-icons/react';
import { SocialLinks } from "./SocialLinks";
import { bookSiteData } from "../../data/mock/book-site";
import { ThemeSwitcher } from "./ThemeSwitcher";
import { footerContent } from "../../data/mock/ui/footer";
import { useReducedMotion } from "../../hooks/useReducedMotion";
import "../../../styles/blocks/footer.css";

export function Footer() {
  var navigate = useNavigate();
  var linkState = React.useState(false);
  var linkCopied = linkState[0];
  var setLinkCopied = linkState[1];
  
  var prefersReduced = useReducedMotion();

  function navigateTo(path: string) {
    return function(e: any) {
      if (e && e.preventDefault) e.preventDefault();
      navigate(path);
      window.scrollTo({ top: 0, behavior: prefersReduced ? "auto" : "smooth" });
    };
  }

  function handleCopyLink() {
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(window.location.href).then(function() {
        setLinkCopied(true);
        setTimeout(function() { setLinkCopied(false); }, 2000);
      }).catch(function() {});
    }
  }

  var footerGroups = grab(bookSiteData, "footerGroups") || [];
  var copyrightText = grab(footerContent, "copyright") || "© 2026 Ash Shaw. All rights reserved.";

  return React.createElement(
    "footer",
    { className: "footer section section--dark", role: "contentinfo" },
    React.createElement(
      "div",
      { className: "section__container" },
      React.createElement(
        "div",
        { className: "footer__grid" },
        React.createElement(
          "div",
          { className: "footer__brand" },
          React.createElement(
            "button",
            {
              type: "button",
              onClick: navigateTo("/"),
              className: "footer__title-btn heading-card text-neon-yellow",
              "aria-label": "Return to home page"
            },
            "This one time on acid..."
          ),
          React.createElement(
            "p",
            { className: "footer__tagline space-top-sm" },
            "A hybrid memoir and creative-life guide about dancefloors, difference, freedom, and becoming fully yourself."
          )
        ),
        footerGroups.map(function(group: any, gIdx: number) {
          var title = grab(group, "title");
          var links = grab(group, "links") || [];
          return React.createElement(
            "nav",
            { key: "footer-group-" + gIdx, className: "footer__nav", "aria-label": title },
            React.createElement(
              "h3",
              { className: "heading-card text-neon-yellow" },
              title
            ),
            React.createElement(
              "ul",
              { className: "footer__link-list text-body" },
              links.map(function(link: any, lIdx: number) {
                var label = grab(link, "label");
                var href = grab(link, "href");
                return React.createElement(
                  "li",
                  { key: "link-" + lIdx },
                  React.createElement(
                    "button",
                    {
                      type: "button",
                      onClick: navigateTo(href),
                      className: "footer__link-btn"
                    },
                    label
                  )
                );
              })
            )
          );
        })
      ),
      React.createElement(
        "div",
        { className: "footer__bar" },
        React.createElement(
          "div",
          { className: "footer__bar-left" },
          React.createElement(
            "span",
            { className: "text-fine" },
            copyrightText
          )
        ),
        React.createElement(
          "div",
          { className: "footer__bar-center" },
          React.createElement(ThemeSwitcher),
          React.createElement(SocialLinks, { variant: "minimal" }),
          React.createElement(
            "button",
            {
              type: "button",
              onClick: handleCopyLink,
              "aria-label": linkCopied ? "Link copied" : "Copy page link",
              title: linkCopied ? "Copied!" : "Copy link",
              className: "footer__copy-link"
            },
            linkCopied
              ? React.createElement(Check, { size: 20, color: "var(--color-electric-green)", "aria-hidden": "true" })
              : React.createElement(LinkIcon, { size: 20, "aria-hidden": "true" })
          )
        ),
        React.createElement(
          "div",
          { className: "footer__bar-right" },
          React.createElement(
            "button",
            { type: "button", onClick: navigateTo("/privacy"), className: "footer__legal-link", "aria-label": "Privacy Policy" },
            grab(footerContent, ["links", "privacy"]) || "Privacy Policy"
          ),
          React.createElement(
            "button",
            { type: "button", onClick: navigateTo("/terms"), className: "footer__legal-link", "aria-label": "Terms of Service" },
            grab(footerContent, ["links", "terms"]) || "Terms of Service"
          )
        )
      )
    )
  );
}