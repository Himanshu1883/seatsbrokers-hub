/** Book a Demo page — conversion copy. No competitor names. */

import { modules } from "./modules";
import { productHrefs } from "./site";

export const demoHeroCopy = {
  eyebrow: "Book a demo",
  title: "See SeatsBrokers in Action",
  subhead: "Discover how SeatsBrokers can connect your inventory, technology, pricing, distribution and ticket operations.",
  body: "A live walkthrough of the platform — sourced to how you list, price, distribute or sell tickets. Keep it simple: tell us who you are and we show what is relevant.",
} as const;

export const demoHeroPoints = [
  "Live walkthrough of the surfaces that match your business",
  "Broker, B2B partner and API tracks — not a generic slideshow",
  "London, New York and Dubai — we schedule around your timezone",
] as const;

export const demoSlots = [
  { time: "10:00", zone: "LON", city: "London", window: "Morning · GMT" },
  { time: "14:00", zone: "LON", city: "London", window: "Afternoon · GMT" },
  { time: "09:30", zone: "NYC", city: "New York", window: "Morning · ET" },
  { time: "11:00", zone: "DXB", city: "Dubai", window: "Late morning · GST" },
] as const;

export const demoAgenda = [
  { index: "01", title: "Your operation", detail: "Inventory, channels and how you sell today." },
  { index: "02", title: "Live walkthrough", detail: "The surfaces that match your ticket business." },
  { index: "03", title: "Next steps", detail: "Access, APIs or a deeper working session." },
] as const;

export const demoSessionCopy = {
  eyebrow: "What you will see",
  title: "A live walkthrough of the platform",
  intro:
    "Not every console — forty-five minutes on the surfaces that match how you buy, list or distribute tickets.",
} as const;

/** Four surfaces in a 45-minute SeatsBrokers demo. Minutes sum to 45. */
export const demoSessionBlocks = [
  {
    index: "01",
    minutes: 10,
    duration: "10 min",
    title: "Events & intelligence",
    body: "Global catalog, onsale windows and demand context before inventory moves.",
    outcome: "Which events and onsale windows are worth opening first.",
  },
  {
    index: "02",
    minutes: 12,
    duration: "12 min",
    title: "Inventory & distribution",
    body: "List once, push to connected marketplaces, keep quantity and status in sync.",
    outcome: "How one listing stays in sync across connected channels.",
  },
  {
    index: "03",
    minutes: 12,
    duration: "12 min",
    title: "Market & AI pricing",
    body: "Ask context and pricing recommendations — the model suggests, you decide.",
    outcome: "Recommendations on the desk — you still decide.",
  },
  {
    index: "04",
    minutes: 11,
    duration: "11 min",
    title: "Partners & APIs",
    body: "B2B partner quoting, margin and the APIs that connect POS, ERP and sites.",
    outcome: "How quotes, margin and APIs connect to your stack.",
  },
] as const;

export const demoAudiences = [
  {
    id: "brokers",
    kicker: "Ticket brokers",
    title: "Run inventory, channels and pricing from one desk",
    body: "See how listings, marketplace sync, market intelligence and AI pricing sit in one operation — including POS and API options.",
    href: "/become-a-seller",
    cta: "Broker platform",
    points: ["Catalog & inventory", "Multi-marketplace sync", "AI pricing & POS"],
  },
  {
    id: "travel",
    kicker: "B2B partners",
    title: "Search, add margin and send a branded quote",
    body: "Walk through partner inventory access, customer-ready quotations in £, orders and delivery — built for agencies packaging events.",
    href: productHrefs.deal,
    cta: "B2B partner platform",
    points: ["Inventory access", "Margin & PDF quotes", "Orders & delivery"],
  },
] as const;

export const demoAlsoFor = [
  { label: modules.market.name, href: productHrefs.market },
  { label: modules.intel.name, href: productHrefs.intel },
  { label: modules.link.name, href: "/api" },
] as const;

export const demoSteps = [
  "Share how you buy, list or distribute tickets today",
  "Live walkthrough of the SeatsBrokers surfaces that match that work",
  "Leave with a clear next step — access, APIs or a deeper session",
] as const;

export const demoRoles = [
  "Ticket broker",
  "B2B partner",
  "Marketplace",
  "Technology / API",
  "Other",
] as const;

export const demoFormCopy = {
  eyebrow: "Request a demo",
  title: "Book your platform walkthrough",
  intro:
    "Share a few details and we will schedule a live session. Broker desk, B2B partner or API — we prepare the walkthrough around your operation.",
  submitLabel: "Request a Demo",
  successTitle: "Request ready to send",
  successBodyMailto:
    "Your email client should open with a message to the SeatsBrokers team. If it does not, write to us directly — we typically reply within one business day.",
  successBodyWebhook:
    "Your demo request has been sent to the SeatsBrokers team. We typically reply within one business day.",
} as const;
