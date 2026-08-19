/** SeatsIntel™ hero: left copy, AI forecast-lens stage data, plus unused mini-card datasets for EventIntelConsoleCards. */

import { modules } from "./modules";

export const eventIntelHeroCopy = {
  eyebrow: modules.intel.name,
  title: modules.intel.tagline,
  subhead:
    "Know the event, the market and the opportunity before you sell — catalog, onsale calendar, demand signals and forecasts in one intelligence layer.",
  body: "SeatsBrokers indexes global events into one structured record — dates, venues, category bands and onsale windows — then tracks demand, price movement and comparable events against it. The same intelligence feeds broker pricing, inventory decisions and partner quoting.",
} as const;

export type EventIntelHeroCardType =
  | "onsale-radar"
  | "demand-score"
  | "price-movement"
  | "comparables"
  | "sellout-risk"
  | "venue-map"
  | "catalog-coverage"
  | "forecast";

export type EventIntelHeroCard = {
  id: string;
  type: EventIntelHeroCardType;
  label: string;
};

export const eventIntelHeroColumnA: EventIntelHeroCard[] = [
  { id: "a-radar-1", type: "onsale-radar", label: "Onsale radar" },
  { id: "a-demand-1", type: "demand-score", label: "Demand score" },
  { id: "a-venue-1", type: "venue-map", label: "Venue map" },
  { id: "a-catalog-1", type: "catalog-coverage", label: "Catalog" },
  { id: "a-comp-1", type: "comparables", label: "Comparables" },
  { id: "a-radar-2", type: "onsale-radar", label: "Onsale radar" },
];

export const eventIntelHeroColumnB: EventIntelHeroCard[] = [
  { id: "b-forecast-1", type: "forecast", label: "Forecast" },
  { id: "b-price-1", type: "price-movement", label: "Price movement" },
  { id: "b-risk-1", type: "sellout-risk", label: "Sellout risk" },
  { id: "b-demand-2", type: "demand-score", label: "Demand score" },
  { id: "b-catalog-2", type: "catalog-coverage", label: "Catalog" },
  { id: "b-price-2", type: "price-movement", label: "Price movement" },
];

export const heroOnsales = [
  { name: "UCL Final · presale", window: "Fri 09:00", status: "pushing" as const },
  { name: "Monaco GP · grandstand", window: "Live", status: "synced" as const },
  { name: "Wimbledon · ballot", window: "18 Apr", status: "synced" as const },
  { name: "Stadium tour · resale", window: "Mon 10:00", status: "synced" as const },
] as const;

export const heroDemandScore = {
  score: "92",
  trend: "+18%",
  event: "Champions League Final",
  bars: [42, 51, 58, 55, 70, 84, 92] as const,
} as const;

export const heroPriceMovement = {
  ask: "£262",
  badge: "7D",
  low: "£228",
  change: "+11.6%",
  event: "UCL Final · Cat A",
} as const;

export const heroComparables = {
  event: "UCL Final 2025",
  match: "94%",
  ask: "£274",
  outcome: "Sold out T-6",
} as const;

export const heroSelloutRisk = {
  risk: "78%",
  horizon: "T-19",
  band: "Cat A · longside lower",
} as const;

export const heroVenueMap = {
  venue: "Wembley · London",
  sections: "18",
  mapped: "100%",
  nodes: ["Ingest", "Map", "Index"] as const,
} as const;

export const heroCatalog = {
  events: "48,214",
  categories: "24",
  onsales: "142",
} as const;

export const heroForecast = {
  sellout: "T-6",
  confidence: "87%",
  badge: "Model",
  event: "Champions League Final",
} as const;

export const eventIntelHeroLens = {
  event: {
    id: "EV-28402",
    name: "Champions League Final",
    venue: "Wembley · London",
    horizon: "T-19",
    model: "v3.1",
  },
  models: [
    { id: "demand", label: "Demand", value: "92", age: "30s" },
    { id: "comps", label: "Comps", value: "94%", age: "6m" },
    { id: "onsale", label: "Onsale", value: "Fri", age: "4m" },
    { id: "venue", label: "Venue", value: "Map", age: "2m" },
  ],
  forecast: {
    nowAsk: "£262",
    p10: "£224",
    p50: "£312",
    p90: "£378",
    confidence: 87,
    risk: 78,
    sellout: "T-6",
  },
  history: [188, 205, 218, 231, 244, 262] as const,
  p10: [262, 256, 248, 242, 236, 230, 224] as const,
  p25: [262, 260, 258, 262, 266, 270, 268] as const,
  p50: [262, 268, 274, 288, 296, 308, 312] as const,
  p75: [262, 276, 290, 310, 326, 340, 348] as const,
  p90: [262, 282, 304, 328, 348, 366, 378] as const,
  comparables: [
    { name: "UCL Final 2025", match: "94%", outcome: "Sold T-6" },
    { name: "Monaco GP 2025", match: "88%", outcome: "Held" },
    { name: "Wimbledon SF", match: "81%", outcome: "Sold T-4" },
  ],
  scenarios: [
    { id: "hold", label: "Hold", note: "Keep £262" },
    { id: "reprice", label: "Reprice", note: "−6% ask" },
    { id: "release", label: "Release", note: "25% held" },
  ],
} as const;
