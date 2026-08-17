/** Official SeatsBrokers product modules. Import names from here — do not retype them. */

export type ProductModule = {
  name: string;
  what: string;
  tagline: string;
};

export const modules = {
  funds: {
    name: "SeatsFunds™",
    what: "Payments, credit, funding & settlement",
    tagline: "Financial Infrastructure for Ticketing.",
  },
  market: {
    name: "SeatsMarket™",
    what: "Global B2B ticket inventory marketplace",
    tagline: "The Global Marketplace for Live Events.",
  },
  link: {
    name: "SeatsLink™",
    what: "API, integrations & connectivity",
    tagline: "Connect Your Business to Global Ticket Inventory.",
  },
  source: {
    name: "SeatsSource™",
    what: "Primary-market ticket sourcing",
    tagline: "Intelligent Access to Primary Ticket Inventory.",
  },
  pulse: {
    name: "SeatsPulse™",
    what: "Resale-market intelligence & pricing analytics",
    tagline: "Know the Market. Price with Confidence.",
  },
  intel: {
    name: "SeatsIntel™",
    what: "Event & primary-market intelligence",
    tagline: "Know What's Coming. Buy Smarter.",
  },
  deal: {
    name: "SeatsDeal™",
    what: "Quotations, customer payments & sales",
    tagline: "From Quote to Completed Sale.",
  },
  launch: {
    name: "SeatsLaunch™",
    what: "White-label ticketing websites",
    tagline: "Launch Your Ticketing Business.",
  },
} as const satisfies Record<string, ProductModule>;

export const moduleList = [
  modules.funds,
  modules.market,
  modules.link,
  modules.source,
  modules.pulse,
  modules.intel,
  modules.deal,
  modules.launch,
] as const;
