/** /products overview — seven-module map. Deep-links live in productHrefs. */

import { modules } from "./modules";
import { productHrefs } from "./site";

export const productsHeroCopy = {
  eyebrow: "Products",
  title: "The SeatsBrokers Ecosystem",
  body: "Seven products. One platform. Each module is built for a stage of the professional ticket broker workflow — from market opportunity to settlement.",
} as const;

export const productsHeroPoints = [
  "Know the market, then source, price and connect from one desk",
  "List once, sell and settle without leaving the workflow",
  "Each module is a full product page — this page is the map",
] as const;

export const productsWorkflowLayers = [
  {
    id: "intel",
    index: "01",
    stage: "Discover",
    short: "Intel",
    name: modules.intel.name,
    tagline: modules.intel.tagline,
    line: "Events, onsales, venues and demand in one record.",
    href: productHrefs.intel,
  },
  {
    id: "source",
    index: "02",
    stage: "Source",
    short: "Source",
    name: modules.source.name,
    tagline: modules.source.tagline,
    line: "Your stock and connected supply on one inventory layer.",
    href: productHrefs.source,
  },
  {
    id: "pulse",
    index: "03",
    stage: "Price",
    short: "Pulse",
    name: modules.pulse.name,
    tagline: modules.pulse.tagline,
    line: "A recommended ask — you approve before it goes live.",
    href: productHrefs.pulse,
  },
  {
    id: "link",
    index: "04",
    stage: "Connect",
    short: "Link",
    name: modules.link.name,
    tagline: modules.link.tagline,
    line: "POS, feeds and ERP on one ticketing-native path.",
    href: productHrefs.link,
  },
  {
    id: "market",
    index: "05",
    stage: "Distribute",
    short: "Market",
    name: modules.market.name,
    tagline: modules.market.tagline,
    line: "One inventory write. Connected channels stay in sync.",
    href: productHrefs.market,
  },
  {
    id: "deal",
    index: "06",
    stage: "Sell",
    short: "Deal",
    name: modules.deal.name,
    tagline: modules.deal.tagline,
    line: "Enquiry to quotation to sale, with margin in £.",
    href: productHrefs.deal,
  },
  {
    id: "funds",
    index: "07",
    stage: "Settle",
    short: "Funds",
    name: modules.funds.name,
    tagline: modules.funds.tagline,
    line: "Purchasing and payouts stay inside the same workflow.",
    href: productHrefs.funds,
  },
] as const;

export const productsWorkflowFeed = [
  { time: "09:42:18", msg: "discover → event record live" },
  { time: "09:42:14", msg: "source → inventory layer aligned" },
  { time: "09:42:10", msg: "price → recommendation ready" },
  { time: "09:42:06", msg: "connect → POS and feed on path" },
  { time: "09:42:02", msg: "distribute → listing mirrored" },
  { time: "09:41:58", msg: "sell → quote shared in £" },
  { time: "09:41:54", msg: "settle → payout on Standard" },
] as const;

export const productsEcosystemCopy = {
  eyebrow: "Seven products",
  title: "The desks that run a ticket brokerage",
  intro:
    "Each product is built for one stage of the workflow. Open the page that matches how you work — the consoles here are compact previews, not a second copy of every desk.",
} as const;

export const productCards = [
  {
    id: "intel",
    index: "01",
    stage: "Discover",
    name: modules.intel.name,
    tagline: modules.intel.tagline,
    body: "SeatsIntel™ is the market-intelligence layer for professional ticket brokers. Events, onsale windows, venues and demand sit in one record so you see the opportunity before you source. Forecasts and comparable prices feed every stage that follows.",
    href: productHrefs.intel,
    cta: `Explore ${modules.intel.name}`,
  },
  {
    id: "source",
    index: "02",
    stage: "Source",
    name: modules.source.name,
    tagline: modules.source.tagline,
    body: "SeatsSource™ holds your own stock and connected supply in one inventory layer. Sections, rows, quantities, delivery rules and packages stay on a single record. Pricing, distribution and quotes read from here — not a parallel sheet.",
    href: productHrefs.source,
    cta: `Explore ${modules.source.name}`,
  },
  {
    id: "pulse",
    index: "03",
    stage: "Price",
    name: modules.pulse.name,
    tagline: modules.pulse.tagline,
    body: "SeatsPulse™ turns market data into a recommended ask. You review and approve before anything goes live. Approved prices can then sync through connected channels.",
    href: productHrefs.pulse,
    cta: `Explore ${modules.pulse.name}`,
  },
  {
    id: "link",
    index: "04",
    stage: "Connect",
    name: modules.link.name,
    tagline: modules.link.tagline,
    body: "SeatsLink™ is the connection layer for POS, inventory feeds and ERP. Keep the stack you already run. Inventory, orders and pricing move through one ticketing-native path — not Seatpin™.",
    href: productHrefs.link,
    cta: `Explore ${modules.link.name}`,
  },
  {
    id: "market",
    index: "05",
    stage: "Distribute",
    name: modules.market.name,
    tagline: modules.market.tagline,
    body: "SeatsMarket™ publishes one inventory write across connected sales channels. Price, quantity and listing status stay aligned. A sale on any channel can update or delist the others.",
    href: productHrefs.market,
    cta: `Explore ${modules.market.name}`,
  },
  {
    id: "deal",
    index: "06",
    stage: "Sell",
    name: modules.deal.name,
    tagline: modules.deal.tagline,
    body: "SeatsDeal™ takes a desk from enquiry to a customer-ready sale. Search inventory, apply your margin in £ and share a professional quotation. Accepted quotes become orders and delivery on the same workflow.",
    href: productHrefs.deal,
    cta: `Explore ${modules.deal.name}`,
  },
  {
    id: "funds",
    index: "07",
    stage: "Settle",
    name: modules.funds.name,
    tagline: modules.funds.tagline,
    body: "SeatsFunds™ keeps purchasing, balances and partner settlements inside SeatsBrokers. Standard remains the default rail; a USDT path is available where it is eligible. Settlement is not a separate product.",
    href: productHrefs.funds,
    cta: `Explore ${modules.funds.name}`,
  },
] as const;

export const productsSteps = [
  `${modules.intel.name} — find events, onsales and market opportunities`,
  `${modules.source.name} — add your own inventory or access connected supply`,
  `${modules.pulse.name} — use market intelligence and AI-assisted pricing recommendations`,
  `${modules.link.name} — connect your existing systems, inventory feeds and technology`,
  `${modules.market.name} — publish inventory across connected marketplaces and sales channels`,
  `${modules.deal.name} — capture orders, create quotations and manage ticket delivery`,
  `${modules.funds.name} — manage payments, purchasing and eligible partner settlements`,
] as const;

export { sellerHeroCopy } from "./seller-hero-data";

export const sellerBenefits = [
  { id: "inventory", title: "Manage inventory", body: "Centralise your own stock and connected supply in one inventory layer." },
  { id: "technology", title: "Access technology", body: "Run sourcing, pricing, distribution and fulfilment on one platform." },
  { id: "marketplaces", title: "Connect marketplaces", body: "List once and keep connected sales channels in sync." },
  { id: "intelligence", title: "Use market intelligence", body: "See events, demand and pricing context before you commit." },
  { id: "demand", title: "Reach B2B demand", body: "Connect inventory with professional ticket distribution channels." },
  { id: "services", title: "Access partner services", body: "Payments, quotations and API connectivity sit in the same workflow." },
] as const;

/** Individual product pages share one brief skeleton:
 *  name + tagline → what it does (2–3 sentences) → problem → how →
 *  capabilities (4–6) → platform integration chain → Book a Demo + Become a Seller.
 *  Capabilities UI is ProductCapabilityBoard (.prd-cap-*), not FeatureGrid. */
export type ProductStoryChainNode = {
  id: keyof typeof productHrefs;
  name: string;
  href: string;
};

export type ProductStory = {
  what: string;
  problem: {
    eyebrow: string;
    title: string;
    body: string;
    items: { label: string; value: string }[];
  };
  how: {
    eyebrow: string;
    title: string;
    steps: string[];
  };
  capabilities: {
    eyebrow: string;
    title: string;
    intro: string;
    items: { id: string; title: string; body: string }[];
  };
  integration: {
    eyebrow: string;
    title: string;
    body: string;
    chain: ProductStoryChainNode[];
  };
};

export const productStories = {
  intel: {
    what: "SeatsIntel™ is the market-intelligence layer for professional ticket brokers. Events, onsale windows, venues and demand sit in one record so you see the opportunity before you source. Forecasts and comparable prices feed every stage that follows.",
    problem: {
      eyebrow: "The problem",
      title: "Event data is scattered. Opportunity is missed.",
      body: "Onsale dates, venue maps, demand and comparable prices live in different tools. Brokers spend the day gathering context instead of acting on it.",
      items: [
        { label: "Need", value: "One event record" },
        { label: "Today", value: "Fragmented feeds" },
        { label: "Cost", value: "Late to the market" },
      ],
    },
    how: {
      eyebrow: "How SeatsBrokers solves it",
      title: "From feed to forecast — one intelligence layer",
      steps: [
        "Global provider feeds ingested and normalized into one event record",
        "Venue maps linked — sections, category bands and rows structured",
        "Onsale windows, demand indicators and price movement tracked continuously",
        "Forecasts and comparable events delivered to dashboards and connected products",
      ],
    },
    capabilities: {
      eyebrow: "Capabilities",
      title: "The intelligence a ticket desk actually uses",
      intro:
        "Events, onsales, venues and demand sit in one record so the desk can act before it sources.",
      items: [
        { id: "catalog", title: "Global event catalog", body: "Football, rugby, cricket, tennis, Formula 1 and more — in one structured record." },
        { id: "onsale", title: "Onsale calendar", body: "Onsale dates, times and upcoming sales tracked per event." },
        { id: "venues", title: "Venue maps", body: "Sections, categories and seating areas linked to the event." },
        { id: "demand", title: "Demand signals", body: "Watchers, comparable events and category heat before you source." },
        { id: "price", title: "Price movement", body: "Average, lowest and market ask tracked as the event approaches." },
        { id: "forecasts", title: "Forecasts", body: "Projected ask bands and sellout risk that feed pricing and quotes." },
      ],
    },
    integration: {
      eyebrow: "Platform integration",
      title: `${modules.intel.name} feeds every stage after discovery`,
      body: "Market opportunity moves into inventory, pricing and distribution on the same platform.",
      chain: [
        { id: "intel", name: modules.intel.name, href: productHrefs.intel },
        { id: "source", name: modules.source.name, href: productHrefs.source },
        { id: "pulse", name: modules.pulse.name, href: productHrefs.pulse },
        { id: "market", name: modules.market.name, href: productHrefs.market },
      ],
    },
  },
  source: {
    what: "SeatsSource™ holds your own stock and connected supply in one inventory layer. Sections, rows, quantities, delivery rules and packages stay on a single record. Pricing, distribution and quotes read from here — not a parallel sheet.",
    problem: {
      eyebrow: "The problem",
      title: "Inventory lives in too many places.",
      body: "Your own stock, supplier feeds and marketplace listings drift apart. Sections, rows, delivery rules and packages are updated by hand — and one missed edit becomes a double sale.",
      items: [
        { label: "Need", value: "One inventory layer" },
        { label: "Today", value: "Split systems" },
        { label: "Risk", value: "Stale listings" },
      ],
    },
    how: {
      eyebrow: "How SeatsBrokers solves it",
      title: "Centralise stock. Then everything else can use it.",
      steps: [
        "Add your own inventory or ingest connected supplier stock",
        "Tickets, sections, rows, quantities and delivery rules sit in one layer",
        "Packages and partner access follow the same record",
        "Pricing, distribution and quotes read from this layer — not a parallel sheet",
      ],
    },
    capabilities: {
      eyebrow: "Capabilities",
      title: "Every detail of the ticket, in one place",
      intro:
        "Sections, rows, quantities and delivery rules stay on a single inventory layer.",
      items: [
        { id: "tickets", title: "Tickets & sections", body: "Manage tickets, sections, rows, quantity and ticket types from one layer." },
        { id: "pricing", title: "Pricing & delivery", body: "Set prices, delivery information, restrictions and notes per listing." },
        { id: "packages", title: "Packages", body: "Bundle tickets into packages with custom rules and partner inventory access." },
        { id: "supplier", title: "Supplier stock", body: "Connected supply sits beside your own inventory — same categories, same rules." },
        { id: "pos", title: "POS ingest", body: "Keep the point-of-sale you already run. Stock still lands in SeatsBrokers." },
        { id: "availability", title: "Live availability", body: "Quantity and holds update so connected channels do not sell what you no longer have." },
      ],
    },
    integration: {
      eyebrow: "Platform integration",
      title: `${modules.source.name} is the inventory every other product reads`,
      body: "Once stock sits in one layer, pricing, distribution and quotes use the same record.",
      chain: [
        { id: "intel", name: modules.intel.name, href: productHrefs.intel },
        { id: "source", name: modules.source.name, href: productHrefs.source },
        { id: "pulse", name: modules.pulse.name, href: productHrefs.pulse },
        { id: "market", name: modules.market.name, href: productHrefs.market },
      ],
    },
  },
  pulse: {
    what: "SeatsPulse™ turns live market data into a recommended ask. Recommendations use market movement, inventory levels and demand. You remain in control of every pricing decision — AI recommends. You decide.",
    problem: {
      eyebrow: "The problem",
      title: "Market data without a decision is just a dashboard.",
      body: "Average price, lowest ask and inventory volume are useful — until someone still has to decide the number and push it to every channel by hand.",
      items: [
        { label: "Need", value: "A recommended ask" },
        { label: "Control", value: "You approve" },
        { label: "Then", value: "Channels sync" },
      ],
    },
    how: {
      eyebrow: "How SeatsBrokers solves it",
      title: "AI recommends. You decide.",
      steps: [
        "Market data",
        "AI analysis",
        "Recommended price",
        "Broker approval",
        "Price updated",
        "Marketplace synchronised",
      ],
    },
    capabilities: {
      eyebrow: "Capabilities",
      title: "Pricing intelligence built into your desk",
      intro:
        "A recommended ask with the market behind it. You approve before anything goes live.",
      items: [
        { id: "recs", title: "Pricing recommendations", body: "AI-generated price suggestions based on market signals." },
        { id: "compare", title: "Market comparison", body: "Compare your ask against average, lowest and marketplace prices." },
        { id: "category", title: "Category analysis", body: "Per-category pricing with demand and inventory context." },
        { id: "movement", title: "Price movement", body: "Track how prices are moving before and after onsale." },
        { id: "demand", title: "Demand signals", body: "Demand indicators inform when to hold, raise or reduce." },
        { id: "approval", title: "Approval workflow", body: "Review and approve every recommendation before it goes live." },
      ],
    },
    integration: {
      eyebrow: "Platform integration",
      title: `${modules.pulse.name} sits between intelligence and distribution`,
      body: "Approved prices can move with the inventory you already hold, onto connected channels.",
      chain: [
        { id: "intel", name: modules.intel.name, href: productHrefs.intel },
        { id: "source", name: modules.source.name, href: productHrefs.source },
        { id: "pulse", name: modules.pulse.name, href: productHrefs.pulse },
        { id: "market", name: modules.market.name, href: productHrefs.market },
      ],
    },
  },
  link: {
    what: "SeatsLink™ connects your POS, websites, supplier feeds, inventory platforms and ERP to SeatsBrokers. Inventory, pricing, orders and fulfilment move between systems through one API path. Keep the tools you already run.",
    problem: {
      eyebrow: "The problem",
      title: "Your stack already works. It just does not talk.",
      body: "POS, inventory tools, websites, supplier feeds and ERP each hold a piece of the ticket. Without a ticketing-native connection layer, teams copy data between them.",
      items: [
        { label: "Need", value: "One connection layer" },
        { label: "Keep", value: "Your existing tools" },
        { label: "Move", value: "Inventory · orders · pricing" },
      ],
    },
    how: {
      eyebrow: "How SeatsBrokers solves it",
      title: "Your stack → SeatsLink™ → SeatsBrokers → sales channels",
      steps: [
        "Connect your POS, inventory platform or supplier feed",
        "Inventory synchronised via API",
        "Listings distributed to marketplaces and sales channels",
        "Orders and delivery flow back through the API",
      ],
    },
    capabilities: {
      eyebrow: "Capabilities",
      title: "Connect the tools your business already runs on",
      intro:
        "POS, feeds, websites and ERP stay yours. Inventory, orders and pricing move through one path.",
      items: [
        { id: "pos", title: "POS systems", body: "Connect broker point-of-sale systems for inventory and order sync." },
        { id: "inventory", title: "Inventory platforms", body: "Synchronise existing inventory tools with the platform." },
        { id: "suppliers", title: "Supplier APIs", body: "Ingest connected supplier stock into one inventory layer." },
        { id: "websites", title: "Websites", body: "Embed inventory and pricing into your own customer-facing sites." },
        { id: "erp", title: "ERP systems", body: "Feed ticket data into internal finance and operations systems." },
        { id: "custom", title: "Custom integrations", body: "Build against the SeatsBrokers API where a named connector is not listed." },
      ],
    },
    integration: {
      eyebrow: "Platform integration",
      title: `${modules.link.name} is how the rest of the stack arrives`,
      body: "Inventory lands in one layer, listings leave through the same connection, and orders can flow back.",
      chain: [
        { id: "source", name: modules.source.name, href: productHrefs.source },
        { id: "link", name: modules.link.name, href: productHrefs.link },
        { id: "market", name: modules.market.name, href: productHrefs.market },
        { id: "deal", name: modules.deal.name, href: productHrefs.deal },
      ],
    },
  },
  market: {
    what: "SeatsMarket™ is global B2B ticket inventory — search, source and trade from one hub. Connected channels stay aligned on price, quantity and listing status. When inventory sells, connected listings update so the same seat is not offered twice.",
    problem: {
      eyebrow: "The problem",
      title: "Listing once is easy. Staying in sync is not.",
      body: "Every extra channel means another price, another quantity and another chance to sell the same seat twice. Distribution only works if delisting is automatic.",
      items: [
        { label: "Need", value: "List once" },
        { label: "Then", value: "Every channel updates" },
        { label: "Guard", value: "Auto delist" },
      ],
    },
    how: {
      eyebrow: "How SeatsBrokers solves it",
      title: "Broker inventory → SeatsBrokers → channels → orders back",
      steps: [
        "Broker POS or inventory system connects via API",
        "Inventory synchronised to the SeatsBrokers platform",
        "Listings distributed to connected marketplaces and sales channels",
        "Orders synchronised back — sold inventory delists everywhere else",
      ],
    },
    capabilities: {
      eyebrow: "Capabilities",
      title: "Search. Source. Trade.",
      intro:
        "One inventory write reaches connected sales channels. Price, quantity and listing status stay aligned — a sale on any channel can update the others.",
      items: [
        { id: "list-once", title: "List once", body: "Publish from one inventory layer. Connected channels receive the same write — not a parallel catalog." },
        { id: "marketplaces", title: "Marketplaces", body: "Listings reach connected marketplaces from the stock you already hold." },
        { id: "b2b-buyers", title: "B2B Buyers", body: "Professional buyers see the same inventory without a second listing process." },
        { id: "websites", title: "Websites", body: "Your own sites stay aligned with the central listing, price and quantity." },
        { id: "api-partners", title: "API Partners", body: "Partner systems receive the same inventory write through the connection layer." },
        { id: "sync-on-sale", title: "Sync on sale", body: "A sale on any channel updates quantity or delists the listing on the others." },
      ],
    },
    integration: {
      eyebrow: "Platform integration",
      title: `${modules.market.name} publishes the inventory the rest of the stack already holds`,
      body: "List from the stock you hold, with approved prices, then settle the sale in the same workflow.",
      chain: [
        { id: "source", name: modules.source.name, href: productHrefs.source },
        { id: "pulse", name: modules.pulse.name, href: productHrefs.pulse },
        { id: "market", name: modules.market.name, href: productHrefs.market },
        { id: "deal", name: modules.deal.name, href: productHrefs.deal },
      ],
    },
  },
  deal: {
    what: "SeatsDeal™ takes a professional sale from enquiry to fulfilment. Search inventory, apply your margin and share a customer-ready quotation in seconds. Manage the order through one workflow — PDF, email, WhatsApp or a branded customer link.",
    problem: {
      eyebrow: "The problem",
      title: "The quote is where professional sales stall.",
      body: "Finding seats, adding a margin, sending a customer-ready PDF and turning an accept into an order still happens across chat, spreadsheets and a separate invoicing tool.",
      items: [
        { label: "Need", value: "Enquiry → sale" },
        { label: "Quote", value: "Margin + share" },
        { label: "Then", value: "Order & delivery" },
      ],
    },
    how: {
      eyebrow: "How SeatsBrokers solves it",
      title: "Search. Margin. Quote. Confirm. Fulfil.",
      steps: [
        "Search live inventory from the broker catalog",
        "Select tickets and apply your margin",
        "Share a professional quote — PDF, WhatsApp or email",
        "Accepted quotes become orders, invoices and delivery",
      ],
    },
    capabilities: {
      eyebrow: "Capabilities",
      title: "From enquiry to a customer-ready sale",
      intro:
        "Search, margin, quote and fulfilment stay on one desk — from enquiry to a customer-ready sale.",
      items: [
        { id: "search", title: "Inventory search", body: "Live seats, partner cost bands and availability from one catalog." },
        { id: "margin", title: "Margin rules", body: "Ticket price plus your margin equals a transparent customer price." },
        { id: "quote", title: "Quotation builder", body: "Event, tickets and cost drop into a branded customer quote." },
        { id: "share", title: "Share channels", body: "Send via PDF, WhatsApp, email or a branded customer link." },
        { id: "orders", title: "Orders & invoices", body: "Accepted quotes become confirmed orders without a second stack." },
        { id: "delivery", title: "Delivery", body: "Fulfilment stays on the same order — not a side process." },
      ],
    },
    integration: {
      eyebrow: "Platform integration",
      title: `${modules.deal.name} sells from the same inventory layer`,
      body: "Quotes read live stock. A confirmed sale can update other channels and move into settlement.",
      chain: [
        { id: "source", name: modules.source.name, href: productHrefs.source },
        { id: "market", name: modules.market.name, href: productHrefs.market },
        { id: "deal", name: modules.deal.name, href: productHrefs.deal },
        { id: "funds", name: modules.funds.name, href: productHrefs.funds },
      ],
    },
  },
  funds: {
    what: "SeatsFunds™ builds payments into the ticketing workflow. Manage purchasing, balances, payment methods and transaction visibility from the same desk. Eligible partner settlements stay inside SeatsBrokers — Standard remains the default rail.",
    problem: {
      eyebrow: "The problem",
      title: "Settlement should not be a separate product.",
      body: "Purchasing, balances, payout rails and partner settlements often live in finance tools that never see the ticket. The desk then reconciles by hand.",
      items: [
        { label: "Need", value: "Payments in the workflow" },
        { label: "See", value: "Balances & methods" },
        { label: "Pay", value: "Eligible partners" },
      ],
    },
    how: {
      eyebrow: "How SeatsBrokers solves it",
      title: "Sale, withhold, payout — inside SeatsBrokers",
      steps: [
        "A sale or purchase posts against the ticketing workflow",
        "Balances and payment methods stay visible on the same desk",
        "Eligible partner settlements follow the rules you set",
        "Standard or USDT rails complete the payout without a parallel ledger",
      ],
    },
    capabilities: {
      eyebrow: "Capabilities",
      title: "Payments built for ticket operations",
      intro:
        "Purchasing, balances and partner settlements stay inside the same ticketing workflow.",
      items: [
        { id: "purchasing", title: "Purchasing", body: "Buy inventory inside the same platform that will list and sell it." },
        { id: "balances", title: "Balances", body: "See what is available to trade, withhold or settle — without an export." },
        { id: "methods", title: "Payment methods", body: "Manage how the desk pays and how partners get paid." },
        { id: "visibility", title: "Transaction visibility", body: "A sale, commission and payout sit on one timeline." },
        { id: "settlements", title: "Partner settlements", body: "Eligible partners settle on the rules attached to the account." },
        { id: "usdt", title: "USDT rail", body: "A crypto payout path where it is eligible — Standard remains the default." },
      ],
    },
    integration: {
      eyebrow: "Platform integration",
      title: `${modules.funds.name} closes the workflow the other products open`,
      body: "A distributed sale or accepted quote is ready to settle without a parallel finance stack.",
      chain: [
        { id: "source", name: modules.source.name, href: productHrefs.source },
        { id: "market", name: modules.market.name, href: productHrefs.market },
        { id: "deal", name: modules.deal.name, href: productHrefs.deal },
        { id: "funds", name: modules.funds.name, href: productHrefs.funds },
      ],
    },
  },
} as const satisfies Record<string, ProductStory>;

export const integrationsPage = {
  hero: {
    eyebrow: "Integrations",
    title: "Connect SeatsBrokers to Your Existing Ticketing Stack",
    body: "POS, inventory tools, ERP, websites, payment rails and partner systems do not need to be replaced. Integrations is the map of what connects — SeatsLink™ is the product, the API is the contract.",
    points: [
      "Keep the POS, inventory and ERP tools you already run",
      "Move inventory, orders and pricing through one connection layer",
      "SeatsLink™ is the product. The API is the contract.",
    ],
  },
  board: {
    eyebrow: "Connect to",
    title: "Eight ways a ticket desk already talks to SeatsBrokers",
    intro:
      "Each category is a connection path — not a replacement. This page does not publish partner or marketplace logos unless the relationship is public.",
  },
  categories: [
    {
      id: "marketplaces",
      index: "01",
      title: "Marketplaces",
      body: "List once and keep connected sales channels in sync. Inventory, price and quantity move through one hub so a sale on any channel can update the others.",
      status: "Live",
      short: "Markets",
    },
    {
      id: "pos",
      index: "02",
      title: "POS Systems",
      body: "Keep the point-of-sale you already run. Orders and stock land in SeatsBrokers so listings and settlement read the same record.",
      status: "Ready",
      short: "POS",
    },
    {
      id: "inventory",
      index: "03",
      title: "Inventory Platforms",
      body: "Synchronise an existing inventory tool with the SeatsBrokers layer. Sections, rows, quantities and delivery rules stay in one place.",
      status: "Ready",
      short: "Inventory",
    },
    {
      id: "suppliers",
      index: "04",
      title: "Supplier APIs",
      body: "Ingest connected supplier stock into the same inventory layer. Availability updates without a second spreadsheet.",
      status: "Live",
      short: "Suppliers",
    },
    {
      id: "websites",
      index: "05",
      title: "Websites",
      body: "Embed inventory and pricing into your own customer-facing sites. The catalog you manage is the catalog the site shows.",
      status: "Ready",
      short: "Sites",
    },
    {
      id: "erp",
      index: "06",
      title: "ERP Systems",
      body: "Feed ticket data into internal finance and operations systems. Purchasing and settlement stay visible beside the ticket.",
      status: "Synced",
      short: "ERP",
    },
    {
      id: "payments",
      index: "07",
      title: "Payment Systems",
      body: "Connect payment methods to the same workflow that lists and sells. Standard remains the default rail; a USDT path is available where it is eligible.",
      status: "Ready",
      short: "Payments",
    },
    {
      id: "custom",
      index: "08",
      title: "Custom Integrations",
      body: "Build against the SeatsBrokers API where a named connector is not listed. Events, inventory, listings, orders and webhooks share one contract.",
      status: "Open",
      short: "Custom",
    },
  ],
  flow: {
    eyebrow: "How you connect",
    title: "Your stack → SeatsLink™ → SeatsBrokers → sales channels",
    steps: [
      "Connect your POS, inventory platform or supplier feed",
      "Inventory synchronised via API",
      "Listings distributed to marketplaces and sales channels",
      "Orders and delivery flow back through the API",
    ],
  },
} as const;

