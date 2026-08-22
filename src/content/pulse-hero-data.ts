/** SeatsPulse™ hero: left copy + market-intel / AI recommendation stage.
 *  Published sample rec figures only — no fake accuracy percentages. */

import { modules } from "./modules";

export const pulseHeroCopy = {
  eyebrow: modules.pulse.name,
  title: modules.pulse.tagline,
  subhead:
    "Live market data becomes a recommended ask. You approve before anything goes live on a connected channel.",
  body: "SeatsPulse™ turns market movement, inventory levels and demand into a recommended ask. Compare it with your current price, then accept, hold or dismiss. AI recommends. You decide — approved prices can then sync through connected channels.",
} as const;

export const pulseHeroEvent = {
  name: "Champions League Final",
  section: "Category A · Longside lower",
  venue: "Wembley · London",
} as const;

/** Same figures as the Pulse sample-recommendation SplitPanel. */
export const pulseHeroRec = {
  currentAsk: "£247",
  marketAvg: "£285",
  recommended: "£265",
  confidence: "High",
  status: "Awaiting approval",
} as const;

export const pulseHeroSignals = [
  { label: "Demand", value: "High", note: "Before onsale" },
  { label: "Inventory", value: "Held", note: "Same layer" },
  { label: "Movement", value: "Tracked", note: "Ask vs average" },
  { label: "Lowest", value: "Below yours", note: "Same section" },
  { label: "Window", value: "Open", note: "You decide" },
  { label: "Publish", value: "Gated", note: "Nothing live yet" },
] as const;

export const pulseHeroNotes = [
  { label: "Demand", detail: "High before onsale on this section" },
  { label: "Inventory", detail: "Held on the same SeatsSource™ layer" },
  { label: "Average", detail: "Market average sits above your current ask" },
  { label: "Gate", detail: "Nothing publishes until you accept" },
] as const;

export const pulseHeroGates = [
  { id: "accept", label: "Accept", note: "Push when you say so" },
  { id: "hold", label: "Hold", note: "Keep the current ask" },
  { id: "dismiss", label: "Dismiss", note: "Leave the rec on the desk" },
] as const;
