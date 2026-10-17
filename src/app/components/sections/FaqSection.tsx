/**
 * @fileoverview FAQ accordion section with sticker graphic
 * Supports page-specific FAQs via optional `pageId` prop.
 * Falls back to global FAQ data when no pageId is provided.
 * Displays a decorative neon sticker graphic to the right of the FAQ block.
 *
 * @component FaqSection
 * @version 5.0.0 - Replaced motion/react with CSS grid-row animation (async_hooks fix)
 */

import React, { useState, useMemo, useEffect } from "react";
import { Plus, Minus } from "@phosphor-icons/react";
import { faqData, getFaqsForPage } from "../../data/mock/sections/faq";
import type { FaqItem } from "../../data/mock/sections/faq";
import { getRandomSticker } from "../../data/mock/images/sticker-graphics";
import { OptimizedImage } from "../ui/OptimizedImage";
import { injectFaqSchema } from "../../utils/faqSchema";
import "../../../styles/blocks/faq.css";

interface FaqItemComponentProps {
  question: string;
  answer: string;
  isOpen: boolean;
  onClick: () => void;
}

function FaqItemComponent({ question, answer, isOpen, onClick }: FaqItemComponentProps) {
  return (
    <div className={`faq-item${isOpen ? " faq-item--open" : ""}`}>
      <button
        type="button"
        onClick={onClick}
        className="faq-button"
        aria-expanded={isOpen}
      >
        <span className="faq-button__text">
          {question}
        </span>
        <div className={`faq-button__icon${isOpen ? " faq-button__icon--open" : ""}`}>
          {isOpen ? <Minus size={20} /> : <Plus size={20} />}
        </div>
      </button>
      <div className={`faq-answer-wrapper${isOpen ? " faq-answer-wrapper--open" : ""}`}>
        <div className="faq-answer">
          {answer}
        </div>
      </div>
    </div>
  );
}

interface FaqSectionProps {
  /** Optional page ID to show page-specific FAQs */
  pageId?: string;
  /** Optional override items (e.g. from a blog post or portfolio entry) */
  items?: FaqItem[];
  /** Visual variant: default or hero (larger sticker) */
  variant?: 'default' | 'hero';
}

export function FaqSection({ pageId, items, variant = 'default' }: FaqSectionProps = {}) {
  const openIndexInit: number | null = null;
  const [openIndex, setOpenIndex] = useState(openIndexInit);

  const { title, description, faqs } = useMemo(() => {
    // Priority 1: explicit items passed as props
    if (items && items.length > 0) {
      return {
        title: "Frequently Asked Questions",
        description: "",
        faqs: items,
      };
    }

    // Priority 2: page-specific FAQ group
    if (pageId) {
      const group = getFaqsForPage(pageId);
      if (group) {
        return {
          title: group.title,
          description: group.description,
          faqs: group.faqs,
        };
      }
    }

    // Priority 3: global defaults
    return {
      title: "Frequently Asked Questions",
      description: "Common questions about Ash\u2019s art and process.",
      faqs: faqData,
    };
  }, [pageId, items]);

  const stickerPageId = pageId ? pageId : 'home';
  const sticker = useMemo(() => getRandomSticker(stickerPageId), [stickerPageId]);

  // Inject Schema.org FAQPage JSON-LD for SEO
  useEffect(() => {
    if (faqs.length === 0) return;
    const cleanup = injectFaqSchema(faqs);
    return cleanup;
  }, [faqs]);

  if (faqs.length === 0) return null;

  return (
    <section id="faq-section" className={`faq-section${variant === 'hero' ? ' faq-section--hero' : ''} section-spacing`}>
      <div className="faq-layout">
        <div className="faq-card">
          <div className="faq-header">
            <h2 className="faq-title">
              {title}
            </h2>
            {description && (
              <p className="faq-description">
                {description}
              </p>
            )}
          </div>
          <div>
            {faqs.map((faq, index) => (
              <FaqItemComponent
                key={faq.id ? faq.id : String(index)}
                question={faq.question}
                answer={faq.answer}
                isOpen={openIndex === index}
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
              />
            ))}
          </div>
        </div>

        <div className="faq-sticker" aria-hidden="true">
          <div className="faq-sticker__glow" />
          <OptimizedImage
            src={sticker.src}
            alt=""
            preset="sticker"
            className="faq-sticker__image"
          />
        </div>
      </div>
    </section>
  );
}