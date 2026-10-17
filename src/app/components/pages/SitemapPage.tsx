/**
 * @fileoverview Sitemap page — streamlined site index for book website
 * 
 * @component SitemapPage
 * @author Ash Shaw
 * @version 4.0.0 — Book-focused simplified structure
 */

import React, { useEffect } from "react";
import { useNavigate } from "../../lib/router";
import {
  House, Book, BookOpen, User, Envelope, Calendar, 
  Microphone, Newspaper, Heart, FileText, Confetti, Palette
} from "@phosphor-icons/react";
import "../../../styles/blocks/sitemap-page.css";

import { setSEO } from "../../utils/seo";
import { pageSEO } from "../../data/mock/seo";
import { Breadcrumbs } from "../ui/Breadcrumbs";

var bookPages = [
  { path: "/", label: "Home", icon: House, desc: "Welcome to This One Time on Acid" },
  { path: "/the-book", label: "The book", icon: Book, desc: "About the memoir and what to expect" },
  { path: "/read-the-draft", label: "Read the draft", icon: BookOpen, desc: "Preview chapters from the book" },
  { path: "/about-ash", label: "About Ash", icon: User, desc: "The author's story and background" },
  { path: "/waitlist", label: "Waitlist", icon: Heart, desc: "Join the book launch waitlist" },
  { path: "/journal", label: "Journal", icon: Newspaper, desc: "Author's thoughts and updates" },
  { path: "/events", label: "Events", icon: Calendar, desc: "Book launches and speaking events" },
  { path: "/speaking", label: "Speaking & workshops", icon: Microphone, desc: "Keynotes and workshop bookings" },
  { path: "/contact", label: "Contact", icon: Envelope, desc: "Get in touch with Ash" },
  { path: "/thank-you", label: "Thank you", icon: Heart, desc: "Appreciation page" },
  { path: "/media", label: "Media & press", icon: Newspaper, desc: "Press kit and media resources" },
  { path: "/draft-viewer", label: "Draft viewer", icon: BookOpen, desc: "Interactive draft reading experience" },
  { path: "/ebook", label: "Ebook reader", icon: Book, desc: "Digital book reader" },
  { path: "/style-guide", label: "Style guide", icon: Palette, desc: "Design system documentation" },
  { path: "/sitemap", label: "Sitemap", icon: FileText, desc: "You are here" }
];

export function SitemapPage() {
  var navigate = useNavigate();

  useEffect(function () {
    setSEO(pageSEO.sitemap);
  }, []);

  function handleNavigate(path: string) {
    return function (e: React.MouseEvent) {
      e.preventDefault();
      navigate(path);
    };
  }

  return (
    <main id="main-content" role="main" tabIndex={-1} className="sitemap-page">
      <div className="sitemap-page__hero">
        <div className="sitemap-page__hero-content">
          <Breadcrumbs
            items={[
              { label: "Home", href: "/" },
              { label: "Sitemap" },
            ]}
            centered
          />
          <h1 className="sitemap-page__title text-section-h2">Sitemap</h1>
          <p className="sitemap-page__desc text-body-p">
            Every page on This One Time on Acid — the book, the journal, the story.
          </p>
        </div>
      </div>

      <div className="sitemap-page__content">
        <section className="sitemap-section" aria-labelledby="sitemap-pages">
          <h2 id="sitemap-pages" className="sitemap-section__title text-card-h3">
            <Confetti size={28} weight="duotone" aria-hidden="true" />
            All pages
          </h2>
          <ul className="sitemap-list sitemap-list--book-grid">
            {bookPages.map(function (page, index) {
              var IconComponent = page.icon;
              return (
                <li key={page.path + '-' + index} className="sitemap-list__item">
                  <a
                    href={page.path}
                    onClick={handleNavigate(page.path)}
                    className="sitemap-book-card"
                  >
                    <div className="sitemap-book-card__icon-wrapper">
                      <IconComponent size={32} weight="duotone" aria-hidden="true" className="sitemap-book-card__icon" />
                    </div>
                    <h3 className="sitemap-book-card__title">{page.label}</h3>
                    <p className="sitemap-book-card__desc">{page.desc}</p>
                  </a>
                </li>
              );
            })}
          </ul>
        </section>
      </div>
    </main>
  );
}