export type ProjectStatus =
  | "Live"
  | "Live prototype"
  | "Concept build"
  | "Not deployed"
  | "Paused";

export type ProjectShot = {
  src: string;
  alt: string;
  /** Aspect ratio of the source image, used to reserve layout space. */
  ratio: number;
  caption?: string;
};

export type Project = {
  slug: string;
  name: string;
  category: string;
  /** Two-to-four word category tag used on cards. */
  tag: string;
  year: string;
  summary: string;
  purpose: string;
  role: string;
  stack: string[];
  features: string[];
  status: ProjectStatus;
  statusNote: string;
  liveUrl?: string;
  repoUrl?: string;
  featured: boolean;
  cover: ProjectShot;
  gallery: ProjectShot[];
  /** Shown on the case study under "Decisions". Only evidence-backed notes. */
  decisions: { title: string; body: string }[];
  /** Flags an unconfirmed relationship label so nothing is overstated. */
  relationship?: string;
};

export const projects: Project[] = [
  {
    slug: "predicta",
    name: "PREDICTA",
    category: "Financial technology · Research tool",
    tag: "Fintech",
    year: "2026",
    summary:
      "A stock research workspace for the Nigerian Exchange, with exploration, screening, forecasting and backtesting, and the data source always visible.",
    purpose:
      "Retail research on the NGX is scattered across screenshots, spreadsheets and hearsay. PREDICTA pulls market data into one workspace where a stock can be explored, screened, forecast and then honestly evaluated, including when the forecast is wrong.",
    role: "Solo build: product design, front end, forecasting engine, API proxy",
    stack: [
      "React 18",
      "TypeScript",
      "Vite",
      "Express",
      "Supabase",
      "Investo NGX API",
    ],
    features: [
      "Stock explorer across 146 NGX equities with price history charts",
      "Screener with volatility, return and data-quality filters",
      "Market movers: gainers, losers, most active, highest volatility",
      "Forecasting workspace with five models, from persistence to gradient boosting",
      "Model laboratory running walk-forward backtests with chronological splits",
      "Anomaly detection on unusual price and volume behaviour",
      "Portfolio tracker, valuation workbench and investment journal",
      "Watchlists, alerts and an investment calendar",
      "CSV import for your own datasets, plus a clearly labelled synthetic demo mode",
      "Email/password and OAuth sign-in with per-user data isolation",
    ],
    status: "Live",
    statusNote:
      "Deployed and publicly reachable. Real NGX data requires an Investo API key; demo mode works without one.",
    liveUrl: "https://predicta-roan.vercel.app",
    repoUrl: "https://github.com/elasoruayodeji/predicta",
    featured: true,
    cover: {
      src: "/images/work/predicta/01.jpg",
      alt: "PREDICTA landing page with the headline “See the market before it moves” and a market snapshot panel",
      ratio: 16 / 10,
    },
    gallery: [
      {
        src: "/images/work/predicta/02.jpg",
        alt: "PREDICTA product sections explaining the stock explorer, screener and forecasting workspace",
        ratio: 16 / 10,
        caption: "Feature overview on the landing page",
      },
    ],
    decisions: [
      {
        title: "Uncertainty is part of the interface",
        body: "Forecasts are presented with approximate intervals and a visible model name, and the README documents the rules the engine follows: chronological train/test separation, no data leakage, and clear provenance for every dataset. A forecast that hides its source is worse than no forecast.",
      },
      {
        title: "Keys never reach the browser",
        body: "The Investo API is called through a small Express proxy rather than from client code, so the API key stays server-side and requests can be cached. The front end only ever talks to the proxy.",
      },
      {
        title: "Demo data is labelled as demo data",
        body: "The app supports three data sources (live NGX, CSV import and synthetic sample data) and tags whichever one is active, so a chart is never silently invented.",
      },
    ],
  },
  {
    slug: "iceeit",
    name: "ICEEIT",
    category: "E-commerce · Streetwear",
    tag: "E-commerce",
    year: "2025–2026",
    summary:
      "A sub-zero streetwear storefront: six products, real cart and wishlist state, product video, and a checkout that is honest about being a demo.",
    purpose:
      "The brand had photography and a visual language but no online home. Generic store templates flattened both. The brief was a storefront that reads like the label: cold, editorial and product-first, with shopping mechanics that actually hold state.",
    role: "Design, front end, brand direction",
    stack: ["React 19", "Vite", "React Router", "Plain CSS", "localStorage"],
    features: [
      "Nine routed pages: home, shop, product detail, cart, wishlist, checkout, about, contact, FAQ, plus a 404",
      "Cart with add, remove and quantity updates, persisted to localStorage",
      "Wishlist with its own persisted state",
      "Product pages with colour and size selection and a video-first media treatment",
      "Category tiles and a “just dropped” grid fed by a single product data file",
      "Responsive header with mobile menu and floating cart",
      "Toast feedback for cart and wishlist actions",
      "Demo checkout that states clearly that no card is charged",
    ],
    status: "Live",
    statusNote:
      "Storefront is live and fully browsable. Checkout is a demo, so card and bank payment are not connected, and the site says so.",
    liveUrl: "https://iceeit.vercel.app",
    repoUrl: "https://github.com/elasoruayodeji/iceeit",
    featured: true,
    cover: {
      src: "/images/work/iceeit/01.jpg",
      alt: "ICEEIT storefront hero with the headline “Wear the cold” over a product image",
      ratio: 16 / 10,
    },
    gallery: [
      {
        src: "/images/work/iceeit/02.jpg",
        alt: "ICEEIT shop grid showing product cards with video previews",
        ratio: 16 / 10,
        caption: "Shop grid with video-led product cards",
      },
      {
        src: "/images/work/iceeit/04.jpg",
        alt: "Wide desktop view of the ICEEIT homepage",
        ratio: 16 / 10,
        caption: "Homepage, desktop",
      },
      {
        src: "/images/work/iceeit/mobile-1.jpg",
        alt: "ICEEIT storefront on a mobile phone, showing the hero and product feed",
        ratio: 828 / 1792,
        caption: "The same storefront on a phone, 414px wide",
      },
    ],
    decisions: [
      {
        title: "Video before photography",
        body: "Clothing is easier to judge in motion, so product cards play muted clips on hover and in view on mobile, with a still as the fallback. Media is keyed by filename in one data file, so the brand can swap assets without touching components.",
      },
      {
        title: "State that survives a reload",
        body: "Cart and wishlist live in React context backed by localStorage. The first version lost the cart on refresh; persisting it was a small change that removed a whole class of user frustration.",
      },
      {
        title: "Saying “demo” out loud",
        body: "The checkout shows delivery fields and order summary, then states plainly that no card is charged and that payment integration is not configured. A storefront that pretends to take money is worse than one that admits it cannot.",
      },
    ],
  },
  {
    slug: "vantage",
    name: "VANTAGE Engineering Group",
    category: "Corporate website · Concept build",
    tag: "Corporate",
    year: "2026",
    summary:
      "A nine-page corporate site for a multidisciplinary engineering firm. A self-initiated concept built to test how far editorial restraint can carry a B2B brand.",
    purpose:
      "Engineering companies usually present themselves with stock cranes and stockier type. This concept asks the opposite question: can a serious infrastructure firm feel considered, quiet and expensive on screen, without a single photograph of a hard hat?",
    role: "Self-initiated concept: design, content architecture, front end",
    stack: ["React 18", "TypeScript", "Vite", "Tailwind CSS", "Framer Motion"],
    features: [
      "Nine pages: home, about, services, projects, process, insights, careers, contact and legal",
      "Typed content layer holding services, projects, team, articles and methodology in one file",
      "Per-page metadata and social tags through React Helmet",
      "Scroll progress, reading progress and a back-to-top control",
      "Animated counters and skeleton loading states",
      "Sitemap and robots file, with Netlify redirect config for client routing",
    ],
    status: "Concept build",
    statusNote:
      "Live demonstration site. VANTAGE Engineering Group is a fictional company created for this concept. No people, projects or contract values shown are real.",
    liveUrl: "https://vantage-engineering-group-limited.vercel.app",
    repoUrl: "https://github.com/elasoruayodeji/vantage-engineering-group",
    featured: true,
    cover: {
      src: "/images/work/vantage/01.jpg",
      alt: "VANTAGE Engineering Group homepage with an architectural hero image and the line “Engineering progress. Building possibility.”",
      ratio: 16 / 10,
    },
    gallery: [
      {
        src: "/images/work/vantage/02.jpg",
        alt: "VANTAGE services section listing engineering disciplines in a structured grid",
        ratio: 16 / 10,
        caption: "Services architecture, written as one typed content source",
      },
    ],
    decisions: [
      {
        title: "Content architecture before decoration",
        body: "Services, projects, team members and articles each have their own interface in a single content module. Adding a service is a data edit, not a page rebuild, which is what a real corporate site needs to stay maintainable.",
      },
      {
        title: "Honesty as a design constraint",
        body: "Because the company is fictional, the site carries that disclosure in the README and here. The craft is the point; the client is not.",
      },
    ],
  },
  {
    slug: "tolu-space",
    name: "Tolu's Space",
    category: "Hospitality · Apartment rental",
    tag: "Hospitality",
    year: "2026",
    summary:
      "A calm, image-led website for a two-bedroom apartment in Gbagada, Lagos. Gallery, amenities, location and a WhatsApp booking path.",
    purpose:
      "Short-let apartments are sold on trust: what the rooms actually look like, where the building sits, and how quickly someone answers. The site needed to put real photographs first and make a booking enquiry take one tap.",
    role: "Design and front-end build",
    stack: ["React 19", "Vite", "React Router", "Motion", "CSS"],
    features: [
      "Four pages: home, gallery, about, contact",
      "Gallery built from real apartment photography, with captions and lightbox-style viewing",
      "Apartment selector supporting more than one unit from a shared data model",
      "Amenities, location and neighbourhood context sections",
      "Booking call-to-action routed to WhatsApp rather than a fake availability engine",
      "All editable copy, contact details and gallery metadata in one content file",
    ],
    status: "Live",
    statusNote:
      "Live. Nightly rate is intentionally left unset in the content file, so the site says the rate is available on request instead of inventing a price.",
    liveUrl: "https://tolu-space-2-apartment.vercel.app",
    repoUrl: "https://github.com/elasoruayodeji/Tolu-space-2-apartment-",
    featured: true,
    relationship:
      "Engagement type not confirmed, so no client claim is made on this page.",
    cover: {
      src: "/images/work/tolu-space/01.jpg",
      alt: "Tolu's Space homepage showing the apartment interior with a warm, editorial layout",
      ratio: 16 / 10,
    },
    gallery: [],
    decisions: [
      {
        title: "One content file, no dead ends",
        body: "Business copy, contact details, WhatsApp link, gallery captions and the nightly rate all live in a single module. The rate is deliberately blank: the interface says “available on request” rather than showing a placeholder figure that could be mistaken for a real price.",
      },
      {
        title: "Photography does the selling",
        body: "The layout is mostly whitespace and full-bleed interiors. Sections reveal gently and nothing competes with the rooms.",
      },
    ],
  },
  {
    slug: "dex",
    name: "DEX",
    category: "Desktop software · AI experiment",
    tag: "AI experiment",
    year: "2025",
    summary:
      "A Windows desktop assistant with a floating orb instead of a chat window. Wake word, speech recognition, command routing and spoken reply.",
    purpose:
      "Most AI tools assume you will open a browser and type. DEX was an attempt to find out what a desktop assistant feels like when it lives on the desktop: always present, summoned by voice, and able to act rather than only answer.",
    role: "Solo build: interaction design, desktop UI, voice pipeline",
    stack: ["Python", "PySide6", "Vosk", "Groq"],
    features: [
      "Floating, always-on-top orb interface built with PySide6",
      "Wake-word activation through Vosk offline speech recognition",
      "Command routing for desktop actions alongside general questions",
      "Spoken responses through a text-to-speech layer",
    ],
    status: "Paused",
    statusNote:
      "Paused, not finished. The language model the pipeline depended on was deprecated, so the project stopped rather than silently degrading. Model fallback and AI-routed commands were planned, not built.",
    featured: false,
    cover: {
      src: "/images/work/dex/01.jpg",
      alt: "DEX terminal window showing a running voice assistant session",
      ratio: 16 / 10,
    },
    gallery: [
      {
        src: "/images/work/dex/orb.png",
        alt: "The DEX floating orb interface",
        ratio: 220 / 149,
        caption: "The orb, as it appears on the desktop",
      },
    ],
    decisions: [
      {
        title: "A shape, not a chat box",
        body: "The orb exists to make the assistant feel ambient. It is small, draggable and stays out of the way until it is spoken to, a deliberate contrast with full-panel chat interfaces.",
      },
      {
        title: "Stopping was the honest option",
        body: "When the underlying model was retired, the voice pipeline broke. Rather than swap in a model the routing logic was not designed for, the project was parked with its limitations written down.",
      },
    ],
  },
  {
    slug: "ftc-ikoyi",
    name: "FTC Feedback System",
    category: "Web application · Feedback",
    tag: "Web app",
    year: "2025",
    summary:
      "A student feedback portal that replaced a paper suggestion box with a validated form writing straight into a shared spreadsheet.",
    purpose:
      "Feedback at Federal Training Centre, Ikoyi arrived on paper and disappeared into a box. There was no timestamp, no way to sort by topic, and no way to submit anonymously.",
    role: "Solo build: interface, front end, submission pipeline",
    stack: ["HTML", "CSS", "JavaScript", "Google Apps Script", "Google Sheets"],
    features: [
      "Custom feedback form with validated, structured inputs",
      "Client-side submission to a Google Apps Script endpoint",
      "Live progress indicator while the form is being completed",
      "Success, error and reset states so the visitor always knows what happened",
      "Submissions stored in a Google Sheet with timestamps, sortable by staff",
    ],
    status: "Not deployed",
    statusNote:
      "Built and demonstrated; the Apps Script endpoint exists but the site has no public deployment. Code lives in two public repositories.",
    repoUrl:
      "https://github.com/elasoruayodeji/student-feedback-reporting-system",
    featured: false,
    cover: {
      src: "/images/work/ftc-ikoyi/01.jpg",
      alt: "FTC student feedback portal landing screen",
      ratio: 16 / 10,
    },
    gallery: [],
    decisions: [
      {
        title: "Zero-infrastructure backend",
        body: "Apps Script plus Sheets means no server to keep alive and no database to pay for, and the staff already know how to open, sort and filter a spreadsheet. For a school without a technical team, that trade was the right one.",
      },
      {
        title: "States, not just a submit button",
        body: "Loading, success, failure and reset were designed up front. The first feedback system of this kind usually fails at exactly that point: the user presses send and nothing tells them whether it worked.",
      },
    ],
  },
  {
    slug: "hmd-gadgets",
    name: "HMD Gadgets",
    category: "Promotional content · Video",
    tag: "Promo",
    year: "2025",
    summary:
      "Promotional visuals and a ten-second AI-assisted video for a buy, sell and swap gadget business in Ikeja Computer Village.",
    purpose:
      "The business buys, sells and swaps, and has a physical location. All of that had to land inside a few seconds of social video that would survive a feed scroll.",
    role: "Concept, copy, visual direction, AI-assisted production",
    stack: ["Gemini", "Canva", "Promotional copy"],
    features: [
      "Promotional graphics formatted for social feeds",
      "A tagline built around the buy / sell / swap offer",
      "A ten-second video ad, generated and iterated for pacing",
      "Location and services copy folded into the visuals",
    ],
    status: "Concept build",
    statusNote:
      "Completed promotional piece. Engagement type is not confirmed, so no client relationship is claimed.",
    featured: false,
    cover: {
      src: "/images/work/hmd-gadgets/poster.jpg",
      alt: "HMD Gadgets promotional video still",
      ratio: 16 / 9,
    },
    gallery: [],
    decisions: [
      {
        title: "Reprompt rather than settle",
        body: "The first generation had the wrong pacing and buried the offer. Rewriting the prompt with sharper constraints (service, location, timing) produced something usable.",
      },
    ],
  },
];

export const featuredProjects = projects.filter((p) => p.featured);

export function getProject(slug: string) {
  return projects.find((p) => p.slug === slug);
}

/** The one project that has a playable video asset. */
export const promoVideo = {
  src: "/images/work/hmd-gadgets/promo.mp4",
  poster: "/images/work/hmd-gadgets/poster.jpg",
};
