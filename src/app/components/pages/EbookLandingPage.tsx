import { ebookData } from "../../data/mock/ebook";
import { grab } from "../../lib/router";

export function EbookLandingPage() {
  var heroData = grab(ebookData, "hero");
  var pitchData = grab(ebookData, "pitch");
  var directionsData = grab(ebookData, "directions");
  var directionOptions = grab(directionsData, "options");

  return (
    <main className="page-layout">
      {/* Hero Section */}
      <section className="hero">
        <h1 className="hero__title">{grab(heroData, "headline")}</h1>
        <p className="hero__subtitle">{grab(heroData, "subheading")}</p>
        <div className="hero__actions">
          <button className="button button--primary">{grab(heroData, "primaryCta")}</button>
          <button className="button button--secondary">{grab(heroData, "secondaryCta")}</button>
        </div>
      </section>

      {/* Pitch / Q&A Section */}
      <section className="section">
        <h2 className="section__title">About the book</h2>
        <div className="grid">
          {pitchData.map(function(item: any, index: number) {
            return (
              <div className="card" key={"pitch-" + index}>
                <h3 className="card__title">{grab(item, "question")}</h3>
                <p className="card__text">{grab(item, "answer")}</p>
              </div>
            );
          })}
        </div>
      </section>

      {/* Alternative Site Directions Section */}
      <section className="directions">
        <h2 className="directions__title">{grab(directionsData, "title")}</h2>
        <div className="directions__list">
          {directionOptions.map(function(item: any, index: number) {
            return (
              <div className="direction-item" key={"dir-" + index}>
                <h3 className="direction-item__title">{grab(item, "title")}</h3>
                <p className="card__text">{grab(item, "description")}</p>
              </div>
            );
          })}
        </div>
      </section>
    </main>
  );
}
