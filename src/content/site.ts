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
  tagline: "Ticketing Technology. Marketplace Connectivity. Market Intelligence.",
  email: "partners@seatsbrokers.com",
  salesEmail: "sales@seatsbrokers.com",
  offices: "London · New York · Dubai · India",
} as const;

export const ctas = {
  // bookDemo: { label: "Book a Demo", to: "/book-demo" },
  becomeSeller: { label: "Become a seller", to: "/brokers" },
  explorePlatform: { label: "Explore Our Platform", to: "/platform" },
  talkToTeam: { label: "Talk to Our Team", to: "/contact" },
  login: { label: "Login", to: "/contact" },
  exploreBrokers: { label: "Explore Broker Platform", to: "/brokers" },
  exploreTravel: { label: "Explore B2B Partner Platform", to: "/travel-partners" },
  exploreMarketplace: { label: `Explore ${modules.market.name}`, to: "/marketplace-connectivity" },
  exploreEventIntel: { label: `Explore ${modules.intel.name}`, to: "/event-intelligence" },
  viewApiDocs: { label: `Explore ${modules.link.name}`, to: "/api" },
  requestApiAccess: { label: "Request API Access", to: "/contact" },
} as const;

export const navLinks: NavLink[] = [
  // Hidden from header for now — /platform still works if someone hits the URL.
  { label: "Platform", to: "/platform", hidden: true },
  { label: "For Brokers", to: "/brokers" },
  // Hidden from header for now — /travel-partners still works if someone hits the URL.
  { label: "B2B Partners", to: "/travel-partners", hidden: true },
  { label: "Marketplace Connectivity", to: "/marketplace-connectivity" },
  { label: "Event Intelligence", to: "/event-intelligence" },
  { label: "API", to: "/api" },
  { label: "About", to: "/about" },
];

export const footerColumns: { title: string; links: FooterLink[] }[] = [
  {
    title: "Platform",
    links: [
      { label: "Broker Platform", to: "/brokers" },
      // { label: "B2B Partner Platform", to: "/travel-partners" },
      { label: "Marketplace Connectivity", to: "/marketplace-connectivity" },
      { label: "Event Intelligence", to: "/event-intelligence" },
      { label: "API", to: "/api" },
    ],
  },
  {
    title: "Resources",
    links: [
      { label: "API Documentation", to: "/api" },
      { label: "Contact", to: "/contact" },
      { label: "FAQs", to: "/faq" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About", to: "/about" },
      // { label: "Book a Demo", to: "/book-demo" },
      { label: "Become a seller", to: "/brokers" },
      { label: "Contact", to: "/contact" },
    ],
  },
];

export const footerLegal: FooterLink[] = [
  { label: "Privacy Policy", to: "/legal", hash: "privacy" },
  { label: "Terms", to: "/legal", hash: "terms" },
  { label: "Cookie Policy", to: "/legal", hash: "cookies" },
  { label: "API Terms", to: "/api" },
];

export const pageMeta = {
  home: {
    title: "SeatsBrokers — Ticketing Technology & Market Intelligence",
    description:
      "The technology infrastructure behind modern ticket resale. Connect events, inventory, marketplaces, pricing, partners and payments through one intelligent ticketing platform.",
  },
  brokers: {
    title: "Broker Platform — SeatsBrokers",
    description:
      "Run your entire ticket business from one platform. Manage inventory, marketplaces, pricing, events, sales and fulfillment from one centralized system.",
  },
  travelPartners: {
    title: "B2B Partner Platform — SeatsBrokers",
    description:
      "Turn ticket inventory into customer-ready experiences. Access inventory, add margins, generate quotes and sell through your B2B business.",
  },
  marketplaceConnectivity: {
    title: `${modules.market.name} — SeatsBrokers`,
    description:
      "One inventory. Multiple marketplaces. Connect your ticket operation to resale marketplaces through centralized API infrastructure.",
  },
  eventIntelligence: {
    title: `${modules.intel.name} — SeatsBrokers`,
    description:
      "Global events. Structured data. Actionable intelligence. Know the event, the market and the opportunity before you sell.",
  },
  api: {
    title: `${modules.link.name} — SeatsBrokers`,
    description:
      "Build your ticket business on our APIs. Events, inventory, listings, orders, pricing, delivery and partner APIs for modern ticketing operations.",
  },
  platform: {
    title: "Platform Overview — SeatsBrokers",
    description:
      "One centralized ticketing infrastructure connecting event data, inventory, marketplaces, pricing, partners and payments.",
  },
  marketAnalytics: {
    title: `${modules.pulse.name} — SeatsBrokers`,
    description:
      "From ticket data to business intelligence. Event, market, broker and partner analytics for modern ticket businesses.",
  },
  aiPricing: {
    title: `${modules.pulse.name} — SeatsBrokers`,
    description:
      "AI-powered pricing intelligence. Market data analyzed into pricing recommendations — AI recommends, you decide.",
  },
  integrations: {
    title: `${modules.link.name} — SeatsBrokers`,
    description:
      "Connect POS systems, inventory systems, internal ERP, websites, mobile applications and partner systems through API-first architecture.",
  },
  about: {
    title: "About — SeatsBrokers",
    description:
      "SeatsBrokers is an AI-powered technology company transforming the global ticketing industry — 30 years of industry knowledge, rebuilt as intelligent infrastructure.",
  },
  contact: {
    title: "Contact — SeatsBrokers",
    description:
      "Get in touch with the SeatsBrokers team. London, New York and Dubai — partners@seatsbrokers.com",
  },
  faq: {
    title: "FAQ — SeatsBrokers",
    description:
      "Answers for ticket brokers and B2B partners on inventory, API access, authenticity, delivery, bulk holds and platform charges in £.",
  },
  legal: {
    title: "Privacy, Terms & Cookies — SeatsBrokers",
    description:
      "Privacy Policy, Terms of Use and Cookie Policy for the SeatsBrokers marketing site and B2B ticketing platform. Contact sales@seatsbrokers.com or partners@seatsbrokers.com.",
  },
  bookDemo: {
    title: "Book a Demo — SeatsBrokers",
    description:
      "See the SeatsBrokers platform in action. Book a demo with our team and explore ticketing technology built for your business.",
  },
} as const;
