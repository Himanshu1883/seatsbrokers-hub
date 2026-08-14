/** About page: company journey + platform overview. Copy polished from the old /about shell — no founding myth, no invented stats. */

export const aboutHeroCopy = {
  eyebrow: "About SeatsBrokers",
  title: "Powering the Technology Behind Modern Ticket Resale",
  subhead: "The infrastructure layer connecting the global ticketing ecosystem.",
  body: "We build technology that helps ticket brokers, marketplaces and travel partners manage, distribute, price and sell event inventory at scale.",
} as const;

export const aboutHeroPoints = [
  "Three decades building systems for professional ticket businesses worldwide",
  "10,000+ B2B partners — brokers, travel teams and marketplaces on one platform",
  "London · New York · Dubai — three offices, one technology platform",
] as const;

export const aboutFacts = [
  { label: "In ticketing", value: "30+ years", detail: "Three decades building systems for professional ticket businesses worldwide." },
  { label: "B2B partners", value: "10,000+", detail: "Brokers, travel teams and marketplaces connected through one platform." },
  { label: "Offices", value: "3 cities", detail: "London · New York · Dubai — three offices, one technology platform." },
  { label: "Stance", value: "Tech-first", detail: "API-first, cloud infrastructure, real-time sync and AI-powered pricing." },
] as const;

export const aboutChapters = [
  {
    index: "01",
    title: "See the event",
    kicker: "Event intelligence",
    body: "Understand upcoming events and demand — structured event data before inventory moves.",
  },
  {
    index: "02",
    title: "Place the inventory",
    kicker: "Listings & channels",
    body: "Manage listings from one place and connect inventory with resale marketplaces.",
  },
  {
    index: "03",
    title: "Price with the market",
    kicker: "AI pricing",
    body: "Market signals support pricing decisions — intelligence in, you still decide.",
  },
  {
    index: "04",
    title: "Open the stack",
    kicker: "APIs & partners",
    body: "Connect POS, ERP and partner systems; travel partners source inventory and quote.",
  },
] as const;

export const aboutJourneyCopy = {
  eyebrow: "The journey",
  title: "How SeatsBrokers became ticketing infrastructure",
  intro:
    "We grew from systems for professional ticket businesses into the layer that connects events, inventory, marketplaces, pricing, APIs and partners — operated from London, New York and Dubai.",
} as const;

export const aboutOverviewCopy = {
  eyebrow: "What we do",
  title: "One platform. Multiple business models.",
  intro:
    "SeatsBrokers is the technology infrastructure for the global ticketing ecosystem — not a bolt-on ERP. Explore each surface of the platform.",
} as const;

export const aboutSurfaces = [
  {
    index: "01",
    title: "Broker platform",
    body: "Manage inventory, pricing and marketplace distribution from one centralized system.",
    href: "/brokers",
    cta: "For brokers",
    layer: "Inventory · pricing · POS",
  },
  {
    index: "02",
    title: "Travel partners",
    body: "Source tickets and create customer-ready quotations with margin built in.",
    href: "/travel-partners",
    cta: "For travel teams",
    layer: "Search · quotes · delivery",
  },
  {
    index: "03",
    title: "Marketplace connectivity",
    body: "Connect inventory with resale marketplaces through centralized API infrastructure.",
    href: "/marketplace-connectivity",
    cta: "Channels",
    layer: "List · sync · orders back",
  },
  {
    index: "04",
    title: "Event intelligence",
    body: "Understand upcoming events and demand — the event, the market and the opportunity.",
    href: "/event-intelligence",
    cta: "Event data",
    layer: "Catalog · demand · forecast",
  },
  {
    index: "05",
    title: "API infrastructure",
    body: "Connect POS, ERP and partner systems — events, inventory, listings, orders and more.",
    href: "/api",
    cta: "API platform",
    layer: "Auth · products · webhooks",
  },
] as const;

export const aboutAudiences = [
  {
    title: "Ticket brokers",
    body: "Manage inventory, pricing and marketplace distribution.",
    href: "/brokers",
  },
  {
    title: "Travel companies",
    body: "Source tickets and create customer-ready quotations.",
    href: "/travel-partners",
  },
  {
    title: "Ticket marketplaces",
    body: "Connect inventory and order infrastructure through APIs.",
    href: "/marketplace-connectivity",
  },
  {
    title: "Technology partners",
    body: "Integrate ticket inventory and event data into your applications.",
    href: "/api",
  },
] as const;

export const aboutPrinciplesCopy = {
  eyebrow: "How we work",
  title: "Technology built specifically for ticketing",
  intro:
    "Don't tell the market we have an ERP for ticket brokers — we provide the technology infrastructure for the global ticketing ecosystem.",
} as const;

export const aboutPrinciples = [
  {
    index: "01",
    title: "Infrastructure, not a bolt-on",
    body: "We provide the technology infrastructure for the global ticketing ecosystem — the layer connecting brokers, marketplaces and travel partners.",
  },
  {
    index: "02",
    title: "Built for ticketing",
    body: "Event intelligence, inventory automation, marketplace connectivity, AI pricing and partner commerce — systems designed for this market, not adapted from another one.",
  },
  {
    index: "03",
    title: "Technology-first",
    body: "API-first architecture, cloud infrastructure, real-time sync and AI-powered pricing — the stack professional ticket businesses run on.",
  },
] as const;

export const aboutOffices = [
  { city: "London", region: "Europe", code: "LON", x: 48, y: 34 },
  { city: "New York", region: "Americas", code: "NYC", x: 22, y: 42 },
  { city: "Dubai", region: "Middle East", code: "DXB", x: 68, y: 52 },
] as const;

export const aboutPresenceCopy = {
  eyebrow: "Global operations",
  title: "Three offices. One technology platform.",
  body: "SeatsBrokers operates from London, New York and Dubai — the same platform, the same inventory and event layer, wherever partners work.",
} as const;
