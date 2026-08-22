/** Official SeatsBrokers product modules. Import names from here — do not retype them.
 *  Public ecosystem is seven modules (brief 2026-08). SeatsLaunch™ stays defined but
 *  is parked: do not add it to moduleList or any public surface. */

export type ProductModule = {
  name: string;
  what: string;
  tagline: string;
};

export const modules = {
  intel: {
    name: "SeatsIntel™",
    what: "Market intelligence",
    tagline: "Know the market.",
  },
  source: {
    name: "SeatsSource™",
    what: "Inventory & supply",
    tagline: "Manage your inventory.",
  },
  pulse: {
    name: "SeatsPulse™",
    what: "Pricing intelligence",
    tagline: "AI recommends. You decide.",
  },
  link: {
    name: "SeatsLink™",
    what: "API & connectivity",
    tagline: "Connect your ticketing operation.",
  },
  market: {
    name: "SeatsMarket™",
    what: "Distribution",
    tagline: "List once. Distribute everywhere.",
  },
  deal: {
    name: "SeatsDeal™",
    what: "Quotes, orders & fulfilment",
    tagline: "From enquiry to sale.",
  },
  funds: {
    name: "SeatsFunds™",
    what: "Payments & settlement",
    tagline: "Payments built into your ticketing workflow.",
  },
  /** Parked — not in the public seven-module ecosystem. Do not surface on the website. */
  launch: {
    name: "SeatsLaunch™",
    what: "White-label ticketing websites",
    tagline: "Launch your ticketing business.",
  },
} as const satisfies Record<string, ProductModule>;

/** Public ecosystem order: Discover → Source → Price → Connect → Distribute → Sell → Settle */
export const workflowStages = [
  "Discover",
  "Source",
  "Price",
  "Connect",
  "Distribute",
  "Sell",
  "Settle",
] as const;

export const moduleList = [
  modules.intel,
  modules.source,
  modules.pulse,
  modules.link,
  modules.market,
  modules.deal,
  modules.funds,
] as const;
