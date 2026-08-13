export type NavLink =
  | { label: string; to: "/"; hash?: string; hidden?: boolean }
  | { label: string; to: string; hash?: never; hidden?: boolean };

export type FooterLink = {
  label: string;
  to: string;
  hash?: string;
};

export const brand = {
  name: "SeatsBrokers",
  tagline: "Ticketing Technology. Marketplace Connectivity. Market Intelligence.",
  email: "partners@seatsbrokers.com",
  offices: "London · New York · Dubai",
} as const;

export const ctas = {
  bookDemo: { label: "Book a Demo", to: "/book-demo" },
  explorePlatform: { label: "Explore Our Platform", to: "/platform" },
  talkToTeam: { label: "Talk to Our Team", to: "/contact" },
  login: { label: "Login", to: "/contact" },
  exploreBrokers: { label: "Explore Broker Platform", to: "/brokers" },
  exploreTravel: { label: "Explore Travel Partner Platform", to: "/travel-partners" },
  exploreMarketplace: { label: "Explore Marketplace Connectivity", to: "/marketplace-connectivity" },
  exploreEventIntel: { label: "Explore Event Intelligence", to: "/event-intelligence" },
  viewApiDocs: { label: "View API Documentation", to: "/api" },
  requestApiAccess: { label: "Request API Access", to: "/contact" },
} as const;

export const navLinks: NavLink[] = [
  // Hidden from header for now — /platform still works if someone hits the URL.
  { label: "Platform", to: "/platform", hidden: true },
  { label: "For Brokers", to: "/brokers" },
  { label: "Travel Partners", to: "/travel-partners" },
  { label: "Marketplace Connectivity", to: "/marketplace-connectivity" },
  { label: "Event Intelligence", to: "/event-intelligence" },
  { label: "API", to: "/api" },
];

export const footerColumns: { title: string; links: FooterLink[] }[] = [
  {
    title: "Platform",
    links: [
      { label: "Broker Platform", to: "/brokers" },
      { label: "Travel Partner Platform", to: "/travel-partners" },
      { label: "Marketplace Connectivity", to: "/marketplace-connectivity" },
      { label: "Event Intelligence", to: "/event-intelligence" },
      { label: "Market Analytics", to: "/market-analytics" },
      { label: "AI Pricing", to: "/ai-pricing" },
      { label: "API Platform", to: "/api" },
    ],
  },
  {
    title: "Resources",
    links: [
      { label: "API Documentation", to: "/api" },
      { label: "Platform Overview", to: "/platform" },
      { label: "Integrations", to: "/integrations" },
      { label: "Contact", to: "/contact" },
      { label: "FAQs", to: "/contact" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About", to: "/about" },
      { label: "Careers", to: "/contact" },
      { label: "Contact", to: "/contact" },
    ],
  },
];

export const footerLegal: FooterLink[] = [
  { label: "Privacy Policy", to: "/contact" },
  { label: "Terms", to: "/contact" },
  { label: "Cookie Policy", to: "/contact" },
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
    title: "Travel Partner Platform — SeatsBrokers",
    description:
      "Turn ticket inventory into customer-ready travel experiences. Access inventory, add margins, generate quotes and sell through your travel business.",
  },
  marketplaceConnectivity: {
    title: "Marketplace Connectivity — SeatsBrokers",
    description:
      "One inventory. Multiple marketplaces. Connect your ticket operation to resale marketplaces through centralized API infrastructure.",
  },
  eventIntelligence: {
    title: "Event Intelligence — SeatsBrokers",
    description:
      "Global events. Structured data. Actionable intelligence. Know the event, the market and the opportunity before you sell.",
  },
  api: {
    title: "API Platform — SeatsBrokers",
    description:
      "Build your ticket business on our APIs. Events, inventory, listings, orders, pricing, delivery and partner APIs for modern ticketing operations.",
  },
  platform: {
    title: "Platform Overview — SeatsBrokers",
    description:
      "One centralized ticketing infrastructure connecting event data, inventory, marketplaces, pricing, partners and payments.",
  },
  marketAnalytics: {
    title: "Market Analytics — SeatsBrokers",
    description:
      "From ticket data to business intelligence. Event, market, broker and partner analytics for modern ticket businesses.",
  },
  aiPricing: {
    title: "AI Pricing — SeatsBrokers",
    description:
      "AI-powered pricing intelligence. Market data analyzed into pricing recommendations — AI recommends, you decide.",
  },
  integrations: {
    title: "Integrations — SeatsBrokers",
    description:
      "Connect POS systems, inventory systems, internal ERP, websites, mobile applications and partner systems through API-first architecture.",
  },
  about: {
    title: "About — SeatsBrokers",
    description:
      "Powering the technology behind modern ticket resale. Thirty years building infrastructure for the global ticketing ecosystem.",
  },
  contact: {
    title: "Contact — SeatsBrokers",
    description:
      "Get in touch with the SeatsBrokers team. London, New York and Dubai — partners@seatsbrokers.com",
  },
  bookDemo: {
    title: "Book a Demo — SeatsBrokers",
    description:
      "See the SeatsBrokers platform in action. Book a demo with our team and explore ticketing technology built for your business.",
  },
} as const;
