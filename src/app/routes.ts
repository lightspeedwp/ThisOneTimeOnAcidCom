import { lazy } from "react";
import { createBrowserRouter } from "react-router";
import { RootLayout } from "./components/common/RootLayout";

function lazyPage(loader: () => Promise<any>, name: string) {
  return lazy(() => loader().then((m) => ({ default: m[name] })));
}

var BookHomePage    = lazyPage(() => import("./components/pages/book-site/BookHomePage"),         "BookHomePage");
var TheBookPage     = lazyPage(() => import("./components/pages/book-site/TheBookPage"),           "TheBookPage");
var ReadDraftPage   = lazyPage(() => import("./components/pages/book-site/ReadDraftPage"),         "ReadDraftPage");
var AboutAshPage    = lazyPage(() => import("./components/pages/book-site/AboutAshPage"),          "AboutAshPage");
var WaitlistPage    = lazyPage(() => import("./components/pages/book-site/WaitlistPage"),          "WaitlistPage");
var JournalPage     = lazyPage(() => import("./components/pages/book-site/JournalPage"),           "JournalPage");
var JournalSinglePage = lazyPage(() => import("./components/pages/book-site/JournalSinglePage"),   "JournalSinglePage");
var EventsPage      = lazyPage(() => import("./components/pages/book-site/EventsPage"),            "EventsPage");
var SpeakingWorkshopsPage = lazyPage(() => import("./components/pages/book-site/SpeakingWorkshopsPage"), "SpeakingWorkshopsPage");
var ContactPage     = lazyPage(() => import("./components/pages/book-site/ContactPage"),           "ContactPage");
var MediaPressPage  = lazyPage(() => import("./components/pages/book-site/MediaPressPage"),        "MediaPressPage");
var ThankYouPage    = lazyPage(() => import("./components/pages/book-site/ThankYouPage"),          "ThankYouPage");
var EbookPage       = lazyPage(() => import("./components/pages/about/EbookPage"),                 "EbookPage");
var SearchResultsPage = lazyPage(() => import("./components/pages/search/SearchResultsPage"),      "SearchResultsPage");
var SitemapPage     = lazyPage(() => import("./components/pages/SitemapPage"),                     "SitemapPage");
var StyleGuidePage  = lazyPage(() => import("./components/pages/StyleGuidePage"),                  "StyleGuidePage");
var NotFoundPage    = lazyPage(() => import("./components/pages/NotFoundPage"),                    "NotFoundPage");

var routeConfig = [
  {
    path: "/",
    Component: RootLayout,
    children: [
      { index: true,                Component: BookHomePage },
      { path: "the-book",           Component: TheBookPage },
      { path: "read-the-draft",     Component: ReadDraftPage },
      { path: "read-the-book",      Component: ReadDraftPage },
      { path: "thank-you",          Component: ThankYouPage },
      { path: "ebook",              Component: EbookPage },
      { path: "about-ash",          Component: AboutAshPage },
      { path: "waitlist",           Component: WaitlistPage },
      { path: "journal",            Component: JournalPage },
      { path: "journal/:slug",      Component: JournalSinglePage },
      { path: "events",             Component: EventsPage },
      { path: "speaking",           Component: SpeakingWorkshopsPage },
      { path: "contact",            Component: ContactPage },
      { path: "media",              Component: MediaPressPage },
      { path: "search",             Component: SearchResultsPage },
      { path: "sitemap",            Component: SitemapPage },
      { path: "style-guide",        Component: StyleGuidePage },
      { path: "*",                  Component: NotFoundPage }
    ]
  }
];

export var router = createBrowserRouter(routeConfig);
