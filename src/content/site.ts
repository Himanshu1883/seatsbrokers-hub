import { modules } from "./modules";

export type NavLink =
  | { label: string; to: "/"; hash?: string; hidden?: boolean }
  | { label: string; to: string; hash?: never; hidden?: boolean };

export type FooterLink = {
  label: string;
  to: string;
  hash?: string;
};

export { modules, moduleList } from "./modules";

export const brand = {
  name: "SeatsBrokers",
  mark: "SeatsBrokers™",
  tagline: "Powering the Business of Ticket Resale",
  proposition:
    "One platform to source, manage, price, distribute and sell ticket inventory globally.",
  group: "SeatsGroup",
  groupLine: "SeatsBrokers™ — A SeatsGroup Company",
  email: "partners@seatsbrokers.com",
  salesEmail: "sales@seatsbrokers.com",
  offices: "London · New York · Dubai · India",
} as const;

/**
 * Canonical product and conversion URLs (Phase 2 sitemap).
 * Old audience paths redirect here.
 */
export const productHrefs = {
  intel: "/products/seatsintel",
  source: "/products/seatssource",
  pulse: "/products/seatspulse",
  link: "/products/seatslink",
  market: "/products/seatsmarket",
  deal: "/products/seatsdeal",
  funds: "/products/seatsfunds",
} as const;

export const ctas = {
  bookDemo: { label: "Book a Demo", to: "/book-demo" },
  becomeSeller: { label: "Become a Seller", to: "/become-a-seller" },
  applyToJoin: { label: "Apply to Join", to: "/become-a-seller", hash: "apply" },
  explorePlatform: { label: "Explore the platform", to: "/platform" },
  talkToTeam: { label: "Talk to our team", to: "/contact" },
  login: { label: "Login", to: "/contact" },
  exploreBrokers: { label: "Explore products", to: "/products" },
  exploreTravel: { label: `Explore ${modules.deal.name}`, to: productHrefs.deal },
  exploreMarketplace: { label: `Explore ${modules.market.name}`, to: productHrefs.market },
  exploreEventIntel: { label: `Explore ${modules.intel.name}`, to: productHrefs.intel },
  explorePulse: { label: `Explore ${modules.pulse.name}`, to: productHrefs.pulse },
  exploreLink: { label: `Explore ${modules.link.name}`, to: productHrefs.link },
  viewApiDocs: { label: "View API documentation", to: "/api" },
  requestApiAccess: { label: "Request API access", to: "/contact" },
  discussIntegration: { label: "Discuss an Integration", to: "/contact" },
} as const;

export const navLinks: NavLink[] = [
  { label: "Platform", to: "/platform" },
  { label: "Products", to: "/products" },
  { label: "Integrations", to: "/integrations" },
  { label: "API", to: "/api" },
  { label: "About", to: "/about" },
  { label: "For Brokers", to: "/products", hidden: true },
  { label: "B2B Partners", to: productHrefs.deal, hidden: true },
  { label: "Marketplace Connectivity", to: productHrefs.market, hidden: true },
  { label: "Event Intelligence", to: productHrefs.intel, hidden: true },
];

export const footerColumns: { title: string; links: FooterLink[] }[] = [
  {
    title: "Platform",
    links: [
      { label: "Platform", to: "/platform" },
      { label: "Products", to: "/products" },
      { label: "Integrations", to: "/integrations" },
      { label: "API", to: "/api" },
    ],
  },
  {
    title: "Products",
    links: [
      { label: modules.intel.name, to: productHrefs.intel },
      { label: modules.source.name, to: productHrefs.source },
      { label: modules.pulse.name, to: productHrefs.pulse },
      { label: modules.link.name, to: productHrefs.link },
      { label: modules.market.name, to: productHrefs.market },
      { label: modules.deal.name, to: productHrefs.deal },
      { label: modules.funds.name, to: productHrefs.funds },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About", to: "/about" },
      { label: "Contact", to: "/contact" },
      { label: "Become a Seller", to: "/become-a-seller" },
      { label: "Book a Demo", to: "/book-demo" },
    ],
  },
  {
    title: "Support",
    links: [
      { label: "Help Centre", to: "/faq" },
      { label: "Login", to: "/contact" },
      { label: "API documentation", to: "/api" },
    ],
  },
];

export const footerLegal: FooterLink[] = [
  { label: "Privacy Policy", to: "/legal", hash: "privacy" },
  { label: "Terms", to: "/legal", hash: "terms" },
  { label: "Cookie Policy", to: "/legal", hash: "cookies" },
  { label: "Compliance", to: "/legal", hash: "compliance" },
  { label: "API Terms", to: "/api" },
];

export const siteOrigin = "https://seatsbrokers.com";

export type PageMetaEntry = {
  title: string;
  description: string;
};

/** Canonical + Open Graph head for an indexable marketing route (Phase 7). */
export function seoHead(path: string, entry: PageMetaEntry) {
  const canonical = path === "/" ? `${siteOrigin}/` : `${siteOrigin}${path}`;
  return {
    meta: [
      { title: entry.title },
      { name: "description", content: entry.description },
      { name: "robots", content: "index, follow" },
      { property: "og:type", content: "website" },
      { property: "og:site_name", content: brand.name },
      { property: "og:title", content: entry.title },
      { property: "og:description", content: entry.description },
      { property: "og:url", content: canonical },
      { name: "twitter:card", content: "summary" },
      { name: "twitter:title", content: entry.title },
      { name: "twitter:description", content: entry.description },
    ],
    links: [{ rel: "canonical", href: canonical }],
  };
}

export const pageMeta = {
  home: {
    title: "SeatsBrokers — Powering the Business of Ticket Resale",
    description:
      "One platform to source, manage, price, distribute and sell ticket inventory globally. SeatsBrokers is a B2B technology platform for professional ticket brokers.",
  },
  products: {
    title: "Ticket Broker Software — SeatsBrokers",
    description:
      "Ticket broker software for professional desks: SeatsIntel™, SeatsSource™, SeatsPulse™, SeatsLink™, SeatsMarket™, SeatsDeal™ and SeatsFunds™. Seven products. One platform.",
  },
  becomeASeller: {
    title: "Become a Seller — SeatsBrokers",
    description:
      "Join the SeatsBrokers network. Professional ticket businesses can apply to access the platform — inventory, technology, marketplaces and market intelligence.",
  },
  source: {
    title: `Ticket Inventory Management — ${modules.source.name} | SeatsBrokers`,
    description:
      "Ticket inventory management for professional brokers. Centralise your own stock and connected supplier supply — categories, sections, rows, quantities, pricing and delivery.",
  },
  funds: {
    title: `Ticket Payments & Settlement — ${modules.funds.name} | SeatsBrokers`,
    description:
      "Payments built into your ticketing workflow. Manage purchasing, balances, payment methods, transaction visibility and eligible partner settlements.",
  },
  travelPartners: {
    title: `B2B Ticket Distribution — ${modules.deal.name} | SeatsBrokers`,
    description:
      "B2B ticket distribution from enquiry to sale. Search inventory, apply your margin and share professional customer quotations.",
  },
  marketplaceConnectivity: {
    title: `Ticket Marketplace Distribution — ${modules.market.name} | SeatsBrokers`,
    description:
      "Ticket marketplace distribution: list once and distribute everywhere. Keep prices, quantities and availability synchronised across connected sales channels.",
  },
  eventIntelligence: {
    title: `Ticket Market Intelligence — ${modules.intel.name} | SeatsBrokers`,
    description:
      "Ticket market intelligence for professional brokers. Global event data, onsale information, venue details, market pricing and demand signals.",
  },
  api: {
    title: "Ticket Broker API — SeatsBrokers",
    description:
      "Ticket broker API for events, inventory, listings, orders, pricing, fulfilment and webhooks — with authentication, role-based access and signed delivery.",
  },
  link: {
    title: `${modules.link.name} — Ticket Broker Connectivity | SeatsBrokers`,
    description:
      "Connect POS, websites, supplier feeds, inventory platforms and ERP to SeatsBrokers. SeatsLink™ is the connectivity product; the ticket broker API is the contract.",
  },
  platform: {
    title: "Professional Ticket Broker Platform — SeatsBrokers",
    description:
      "A professional ticket broker platform from market opportunity to final settlement. Discover, source, price, connect, distribute, sell and settle on one workflow.",
  },
  marketAnalytics: {
    title: `Ticket Pricing Intelligence — ${modules.pulse.name} | SeatsBrokers`,
    description:
      "Ticket pricing intelligence from live market data. AI recommends. You decide — based on market movement, inventory levels and demand.",
  },
  aiPricing: {
    title: `Ticket Pricing Intelligence — ${modules.pulse.name} | SeatsBrokers`,
    description:
      "Ticket pricing intelligence from live market data. AI-assisted recommendations — the broker remains in control of every pricing decision.",
  },
  integrations: {
    title: "Integrations — SeatsBrokers",
    description:
      "Connect SeatsBrokers to your existing ticketing stack — marketplaces, POS, inventory platforms, supplier APIs, websites, ERP, payment systems and custom integrations. SeatsLink™ is the product; the API is the contract.",
  },
  about: {
    title: "About — SeatsBrokers",
    description:
      "Built by ticketing people, for ticketing people. SeatsBrokers is built on more than 30 years of experience across ticketing, events, distribution and B2B sales. A SeatsGroup company.",
  },
  contact: {
    title: "Contact — SeatsBrokers",
    description:
      "Get in touch with the SeatsBrokers team. London, New York and Dubai — partners@seatsbrokers.com",
  },
  faq: {
    title: "Help Centre — SeatsBrokers",
    description:
      "Answers for professional ticket brokers on inventory, API access, authenticity, delivery, bulk holds and platform charges in £.",
  },
  legal: {
    title: "Privacy, Terms, Cookies & Compliance — SeatsBrokers",
    description:
      "Privacy Policy, Terms of Use, Cookie Policy and Compliance for the SeatsBrokers marketing site and B2B ticketing platform. Contact sales@seatsbrokers.com or partners@seatsbrokers.com.",
  },
  bookDemo: {
    title: "Book a Demo — SeatsBrokers",
    description:
      "See SeatsBrokers in action. Discover how SeatsBrokers can connect your inventory, technology, pricing, distribution and ticket operations.",
  },
} as const;
