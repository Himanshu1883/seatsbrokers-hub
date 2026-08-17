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
    analysis:
      "Every listing, quote and channel push starts from one event record: date, venue, competition, category bands and an onsale window. Demand is scored for the desk — not published as a headline number.",
    stack: ["Catalog", "Onsale windows", "Demand score"],
    signals: [
      { label: "Event record", value: "Structured" },
      { label: "Onsale clock", value: "Attached" },
      { label: "Demand", value: "Scored" },
    ],
    operates: "Brokers and travel teams start from the same event layer before inventory is placed.",
  },
  {
    index: "02",
    title: "Place the inventory",
    kicker: "Listings & channels",
    body: "Manage listings from one place and connect inventory with resale marketplaces.",
    analysis:
      "Inventory is written once and fanned out to connected channels. Quantity, holds and delists travel with the listing so a sale on one marketplace cannot double-sell on another.",
    stack: ["Listings", "Channel fan-out", "Qty sync"],
    signals: [
      { label: "Source", value: "One desk" },
      { label: "Channels", value: "Fan-out" },
      { label: "Holds", value: "Live" },
    ],
    operates: "The broker desk remains the source of truth; marketplaces receive a synchronized copy.",
  },
  {
    index: "03",
    title: "Price with the market",
    kicker: "AI pricing",
    body: "Market signals support pricing decisions — intelligence in, you still decide.",
    analysis:
      "Ask ladders, movement and comparable events feed an advisory model. Recommendations sit next to the desk's own ask — the model does not publish a price without the operator.",
    stack: ["Ask ladder", "Signals", "Advisory AI"],
    signals: [
      { label: "Model", value: "Advisory" },
      { label: "Decision", value: "The desk" },
      { label: "Currency", value: "£" },
    ],
    operates: "Pricing intelligence is in the loop. Authority stays with the ticket business.",
  },
  {
    index: "04",
    title: "Open the stack",
    kicker: "APIs & partners",
    body: "Connect POS, ERP and partner systems; travel partners source inventory and quote.",
    analysis:
      "The same event, inventory and order objects are exposed over API. Travel partners search, add margin and issue branded quotes; POS and ERP systems stay in sync without a second inventory book.",
    stack: ["Auth", "Products", "Webhooks"],
    signals: [
      { label: "Surface", value: "API-first" },
      { label: "Quotes", value: "Partner margin" },
      { label: "Sync", value: "Webhooks" },
    ],
    operates: "Partners and internal systems consume one infrastructure layer — not a sidecar export.",
  },
] as const;

export const aboutJourneyCopy = {
  eyebrow: "The journey",
  title: "How SeatsBrokers became ticketing infrastructure",
  intro:
    "We grew from systems for professional ticket businesses into the layer that connects events, inventory, marketplaces, pricing, APIs and partners — operated from London, New York and Dubai.",
  path: "seatsbrokers / journey",
} as const;

export const aboutOverviewCopy = {
  eyebrow: "What we do",
  title: "One platform. Multiple business models.",
  intro:
    "SeatsBrokers is the technology infrastructure for the global ticketing ecosystem — not a bolt-on ERP. Explore each surface of the platform.",
  dockKicker: "Surface analysis",
} as const;

export const aboutSurfaces = [
  {
    index: "01",
    title: "Broker platform",
    body: "Manage inventory, pricing and marketplace distribution from one centralized system.",
    href: "/brokers",
    cta: "For brokers",
    layer: "Inventory · pricing · POS",
    analysis:
      "Central inventory, marketplace distribution, AI pricing and POS on one broker stack. Listings are written once; channels, holds and delists stay attached to the same record.",
    systems: ["Inventory", "Channels", "AI pricing", "POS"],
    readout: [
      { label: "Listings", value: "One source" },
      { label: "Channels", value: "Fan-out" },
      { label: "Pricing", value: "Advisory" },
    ],
  },
  {
    index: "02",
    title: "Travel partners",
    body: "Source tickets and create customer-ready quotations with margin built in.",
    href: "/travel-partners",
    cta: "For travel teams",
    layer: "Search · quotes · delivery",
    analysis:
      "Travel desks search the same inventory clock, add their own margin in £, and issue branded quotes. Delivery and settlement stay on the partner terms — not a side channel.",
    systems: ["Search", "Quotes", "Margin", "Delivery"],
    readout: [
      { label: "Inventory", value: "Shared clock" },
      { label: "Margin", value: "Partner-kept" },
      { label: "Quotes", value: "Branded" },
    ],
  },
  {
    index: "03",
    title: "Marketplace connectivity",
    body: "Connect inventory with resale marketplaces through centralized API infrastructure.",
    href: "/marketplace-connectivity",
    cta: "Channels",
    layer: "List · sync · orders back",
    analysis:
      "Create, push, quantity-sync and take orders back through one hub. Price acknowledgements, holds and delists are first-class so a sale on one channel cannot double-sell on another.",
    systems: ["List", "Qty sync", "Orders in", "Delist"],
    readout: [
      { label: "Push", value: "Hub" },
      { label: "Orders", value: "Return path" },
      { label: "Conflict", value: "Guarded" },
    ],
  },
  {
    index: "04",
    title: "Event intelligence",
    body: "Understand upcoming events and demand — the event, the market and the opportunity.",
    href: "/event-intelligence",
    cta: "Event data",
    layer: "Catalog · demand · forecast",
    analysis:
      "A structured catalog with onsale windows, demand scoring and an advisory forecast. Category bands and comparable events sit on the same record that listings and quotes already use.",
    systems: ["Catalog", "Demand", "Forecast", "Venues"],
    readout: [
      { label: "Events", value: "Structured" },
      { label: "Demand", value: "Scored" },
      { label: "Forecast", value: "Advisory" },
    ],
  },
  {
    index: "05",
    title: "API infrastructure",
    body: "Connect POS, ERP and partner systems — events, inventory, listings, orders and more.",
    href: "/api",
    cta: "API platform",
    layer: "Auth · products · webhooks",
    analysis:
      "API-first access to the same objects the consoles run on. Keys, scopes and signed webhooks keep POS, ERP and partner systems on one inventory and event layer.",
    systems: ["Auth", "Events", "Inventory", "Webhooks"],
    readout: [
      { label: "Contract", value: "API-first" },
      { label: "Objects", value: "Shared" },
      { label: "Push", value: "Signed" },
    ],
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
  contractKicker: "Control plane",
  contract:
    "API-first architecture, cloud infrastructure, real-time sync and AI-powered pricing — the stack professional ticket businesses run on. Recommendations stay advisory; the desk decides.",
} as const;

export const aboutPrinciples = [
  {
    index: "01",
    title: "Infrastructure, not a bolt-on",
    body: "We provide the technology infrastructure for the global ticketing ecosystem — the layer connecting brokers, marketplaces and travel partners.",
    systems: ["Control plane", "Shared event layer", "One inventory clock"],
    contract: "Partners connect to the same layer — not a sidecar ERP bolted onto someone else's stack.",
  },
  {
    index: "02",
    title: "Built for ticketing",
    body: "Event intelligence, inventory automation, marketplace connectivity, AI pricing and partner commerce — systems designed for this market, not adapted from another one.",
    systems: ["Event records", "Listing fan-out", "Ask vs floor"],
    contract: "Category bands, onsale windows and marketplace holds are first-class — not generic SKUs.",
  },
  {
    index: "03",
    title: "Technology-first",
    body: "API-first architecture, cloud infrastructure, real-time sync and AI-powered pricing — the stack professional ticket businesses run on.",
    systems: ["API-first", "Cloud", "Real-time sync", "Advisory AI"],
    contract: "Pricing intelligence is in the loop. Authority stays with the ticket business.",
  },
] as const;

export const aboutOffices = [
  {
    city: "London",
    region: "Europe",
    code: "LON",
    x: 48,
    y: 34,
    tz: "GMT",
    window: "08:00–18:00",
    desk: "Partner desk",
    coverage: "EMEA brokers, travel desks and marketplace sync",
    handoff: "Passes Americas coverage to NYC at 13:00 GMT",
  },
  {
    city: "New York",
    region: "Americas",
    code: "NYC",
    x: 22,
    y: 42,
    tz: "EST",
    window: "08:00–18:00",
    desk: "Partner desk",
    coverage: "Americas brokers, travel quotes and channel ops",
    handoff: "Takes Americas coverage from LON; overlaps DXB close",
  },
  {
    city: "Dubai",
    region: "Middle East",
    code: "DXB",
    x: 68,
    y: 52,
    tz: "GST",
    window: "08:00–18:00",
    desk: "Partner desk",
    coverage: "MEA and early EMEA partners on the same platform",
    handoff: "Opens the clock; hands EMEA peak to LON",
  },
] as const;

export const aboutPresenceCopy = {
  eyebrow: "Global operations",
  title: "Three offices. One technology platform.",
  body: "SeatsBrokers operates from London, New York and Dubai — the same platform, the same inventory and event layer, wherever partners work.",
  sun: "Follow-the-sun coverage — LON, NYC and DXB share one partner desk, not three product stacks.",
} as const;

export const aboutOpsCopy = {
  eyebrow: "Company operations",
  title: "Three offices on one coverage clock",
  body: "Partner desks in London, New York and Dubai cover the same platform — follow-the-sun windows, not a market ticker.",
  detail:
    "Each office runs the same inventory, event and channel layer. Coverage windows hand off so brokers, travel teams and marketplaces always have a live partner desk on SeatsBrokers — one technology platform, three cities.",
  detailLabel: "How coverage works",
  highlights: [
    { value: "3", label: "offices" },
    { value: "LON·NYC·DXB", label: "coverage clock" },
    { value: "10,000+", label: "B2B partners" },
  ],
  points: [
    {
      title: "Follow-the-sun windows",
      body: "London, New York and Dubai each cover 08:00–18:00 local. The desks overlap so EMEA, Americas and MEA partners are not waiting on a single timezone.",
    },
    {
      title: "Partner desk status",
      body: "Each office shows live, covering or standby as the clock moves. The status is operational coverage — not a price feed.",
    },
    {
      title: "One platform",
      body: "Inventory, events, channels and APIs are the same objects in every office. Partners do not get a regional fork of SeatsBrokers.",
    },
    {
      title: "Handoff discipline",
      body: "When a window closes, coverage is passed — LON to NYC for Americas quotes, DXB into LON for EMEA peak — so the partner desk stays continuous.",
    },
  ],
} as const;

export const aboutOpsStats = [
  { label: "Offices", value: "3" },
  { label: "Clock", value: "Follow-sun" },
  { label: "Partners", value: "10,000+" },
  { label: "Stack", value: "1 platform" },
] as const;

export const aboutOpsFeed = [
  { time: "09:42:18", msg: "coverage.window → LON primary · EMEA partners", ok: true },
  { time: "09:42:04", msg: "desk.handoff → NYC taking Americas quotes", ok: true },
  { time: "09:41:51", msg: "partner.desk → travel quote queue covered", ok: true },
  { time: "09:41:38", msg: "platform.sync → one inventory layer · 3 offices", ok: true },
  { time: "09:41:22", msg: "coverage.window → DXB covering MEA open", ok: true },
  { time: "09:41:09", msg: "partner.desk → broker channel ops on LON", ok: true },
] as const;
