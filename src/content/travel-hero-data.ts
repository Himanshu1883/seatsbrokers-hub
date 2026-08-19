export const travelHeroCopy = {
  eyebrow: "B2B partner platform",
  title: "Turn Ticket Inventory Into Customer-Ready Experiences",
  subhead: "Search live inventory, add your margin, share a branded quote — then track the order through delivery.",
  body: "Give B2B partners direct access to the same inventory brokers manage — search, buy, margin, quotation and fulfillment from one workspace.",
} as const;

export type TravelHeroCardType =
  | "inventory-search"
  | "margin-math"
  | "quote-preview"
  | "share-channels"
  | "recent-quotes"
  | "order-status"
  | "delivery"
  | "partner-pricing";

export type TravelHeroCard = {
  id: string;
  type: TravelHeroCardType;
  label: string;
};

export const travelHeroColumnA: TravelHeroCard[] = [
  { id: "a-search-1", type: "inventory-search", label: "Search" },
  { id: "a-quote-1", type: "quote-preview", label: "Quote" },
  { id: "a-recent-1", type: "recent-quotes", label: "Quotes" },
  { id: "a-margin-1", type: "margin-math", label: "Margin" },
  { id: "a-order-1", type: "order-status", label: "Orders" },
  { id: "a-search-2", type: "inventory-search", label: "Search" },
];

export const travelHeroColumnB: TravelHeroCard[] = [
  { id: "b-share-1", type: "share-channels", label: "Share" },
  { id: "b-price-1", type: "partner-pricing", label: "Pricing" },
  { id: "b-delivery-1", type: "delivery", label: "Delivery" },
  { id: "b-quote-2", type: "quote-preview", label: "Quote" },
  { id: "b-recent-2", type: "recent-quotes", label: "Quotes" },
  { id: "b-share-2", type: "share-channels", label: "Share" },
];

export const heroSearchHit = {
  event: "Champions League Final",
  venue: "Wembley · London",
  from: "£248",
  seats: "18 seats",
} as const;

export const heroMarginMath = {
  ticket: "£500",
  margin: "10%",
  customer: "£550",
} as const;

export const heroQuotePreview = {
  id: "QT-1842",
  customer: "Atlas Journeys",
  total: "£550",
  event: "UCL Final · Cat A × 2",
} as const;

export const heroShareChannels = ["PDF", "WhatsApp", "Email"] as const;

export const heroRecentQuotes = [
  { id: "QT-1842", status: "accepted" as const },
  { id: "QT-1841", status: "viewed" as const },
  { id: "QT-1840", status: "sent" as const },
] as const;

export const heroOrderStatus = {
  id: "QT-1842",
  stage: "Confirmed",
  delivery: "Mobile transfer",
} as const;

export const heroDelivery = {
  method: "Mobile",
  eta: "T+0",
  status: "Queued",
} as const;

export const heroPartnerPricing = {
  cost: "£500",
  markup: "+£50",
  sell: "£550",
} as const;

export const travelHeroDesk = {
  title: "Partner desk",
  path: "seatsbrokers / b2b",
} as const;

export const travelHeroKpis = [
  { label: "Active partners", value: "48" },
  { label: "Live bookings", value: "312" },
  { label: "Avg margin", value: "12.4%" },
  { label: "On-time delivery", value: "94%" },
  { label: "T+3 settlement", value: "98%" },
  { label: "Desk health", value: "8.9" },
] as const;

export const travelHeroEarnings = {
  label: "Partner earnings",
  value: "£54,671",
  delta: "+12%",
  vs: "Vs. last month",
} as const;

export const travelHeroWeekly = [
  { day: "Mo", value: 42 },
  { day: "Tu", value: 58 },
  { day: "We", value: 36 },
  { day: "Th", value: 74 },
  { day: "Fr", value: 88 },
  { day: "Sa", value: 64 },
  { day: "Su", value: 51 },
] as const;

export const travelHeroFill = [38, 44, 41, 56, 62, 58, 71, 68, 76, 82, 79, 88] as const;

export const travelHeroTopEvents = [
  { label: "UCL Final", value: 92 },
  { label: "Wimbledon", value: 86 },
  { label: "F1 Silverstone", value: 78 },
  { label: "Six Nations", value: 71 },
] as const;

export const travelHeroTopDestinations = [
  { label: "London", value: 88 },
  { label: "Paris", value: 74 },
  { label: "Madrid", value: 69 },
  { label: "Milan", value: 61 },
] as const;

export const travelHeroFulfillment = [
  { label: "Mobile transfer", value: 84 },
  { label: "PDF e-ticket", value: 62 },
  { label: "Will-call", value: 41 },
] as const;

export const travelHeroOrderStatus = [
  { label: "Confirmed", value: 72, tone: "ok" as const },
  { label: "Invoiced", value: 48, tone: "warn" as const },
  { label: "Delivered", value: 90, tone: "muted" as const },
] as const;
