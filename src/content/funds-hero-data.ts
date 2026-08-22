/** SeatsFunds™ hero: left copy + settlement / payments stage.
 *  Qualitative rails only — no fake volume, accuracy, or crypto amounts. */

import { modules } from "./modules";

export const fundsHeroCopy = {
  eyebrow: modules.funds.name,
  title: modules.funds.tagline,
  subhead:
    "Purchasing, balances and partner settlements stay on the same desk as the ticket — Standard remains the default rail.",
  body: "SeatsFunds™ builds payments into the ticketing workflow. A sale or purchase posts against the same record as inventory and quotes. Eligible partner settlements follow the rules you set. USDT is a path where it is eligible — not a parallel bank product.",
} as const;

export const fundsHeroSale = {
  event: "UCL Final · Category A",
  venue: "Wembley · London",
  channel: "Marketplace sale",
} as const;

export const fundsHeroStages = [
  { id: "sale", label: "Sale", detail: "Posts to the payments desk" },
  { id: "withhold", label: "Commission", detail: "Withheld on the same record" },
  { id: "transfer", label: "Transfer", detail: "Armed rail moves the payout" },
  { id: "settle", label: "Settled", detail: "Confirmation on the chosen rail" },
] as const;

export const fundsHeroRails = [
  {
    id: "standard",
    label: "Standard",
    kicker: "Default",
    detail: "Bank rails already on the desk",
  },
  {
    id: "usdt",
    label: "USDT",
    kicker: "Eligible",
    detail: "On-chain path where allowed",
  },
] as const;

export const fundsHeroPath = [
  { id: "vault", label: "SeatsFunds™ vault", hint: "Sale in" },
  { id: "rail", label: "Armed rail", hint: "Standard or USDT" },
  { id: "dest", label: "Broker account", hint: "Settled" },
] as const;

export const fundsHeroQueue = [
  { event: "UCL Final · Cat A", rail: "Standard", state: "Transfer" },
  { event: "Arsenal vs Chelsea", rail: "Standard", state: "Settled" },
  { event: "Oasis · Wembley", rail: "USDT", state: "Eligible" },
  { event: "Monaco GP · K12", rail: "Standard", state: "Sale" },
  { event: "Six Nations · West", rail: "Standard", state: "Commission" },
] as const;

export const fundsHeroLedger = [
  "Marketplace sale posts to the SeatsFunds™ desk",
  "Sale commission withheld — nothing monthly, nothing to list",
  "Payout leaves on the rail already attached to the account",
  "USDT only where the settlement is eligible",
  "Standard remains the default path",
  "Settlement confirmed on the same ticketing workflow",
] as const;
