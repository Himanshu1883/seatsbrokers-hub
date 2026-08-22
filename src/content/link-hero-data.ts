/** SeatsLink™ hero: left copy + POS / operations stage. */

import { modules } from "./modules";

export const linkHeroCopy = {
  eyebrow: modules.link.name,
  title: modules.link.tagline,
  subhead:
    "POS, feeds, websites and ERP stay yours. Inventory, orders and pricing move through one API path.",
  body: "SeatsLink™ is how the rest of the stack arrives. Connect the point-of-sale, inventory tools, supplier feeds and sites you already run — then inventory, pricing, orders and fulfilment move between systems without a second spreadsheet.",
} as const;

export const linkHeroSale = {
  id: "SB-4817",
  event: "Formula 1 · Monaco GP",
  section: "Grandstand K · Row 12",
  qty: 2,
} as const;

export const linkHeroQueue = [
  { id: "SB-4821", event: "UCL Final · Cat A", qty: 2, state: "Ingested" },
  { id: "SB-4820", event: "Arsenal vs Chelsea", qty: 4, state: "Verified" },
  { id: "SB-4819", event: "Oasis · Wembley", qty: 2, state: "Fulfilment" },
  { id: "SB-4818", event: "Six Nations · Twickenham", qty: 3, state: "Complete" },
  { id: "SB-4817", event: "Monaco GP · K12", qty: 2, state: "Payment" },
  { id: "SB-4816", event: "Wimbledon Ladies SF", qty: 2, state: "Received" },
] as const;

export const linkHeroStages = [
  { label: "Received", detail: "Order in from the connected desk" },
  { label: "Verified", detail: "Hold confirmed on the inventory layer" },
  { label: "Payment", detail: "Authorization on the payments path" },
  { label: "Fulfilment", detail: "Delivery queued on the same record" },
  { label: "Complete", detail: "Listings update on connected channels" },
] as const;

export const linkHeroConnect = [
  { label: "POS", state: "Connected" },
  { label: "Feed", state: "Ready" },
  { label: "API", state: "Open" },
  { label: "ERP", state: "Ready" },
  { label: "Site", state: "Connected" },
] as const;
