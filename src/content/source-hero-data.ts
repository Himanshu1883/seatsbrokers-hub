/** SeatsSource™ hero: sourcing desk — request inventory not already on the platform. */

import { modules } from "./modules";

export const sourceHeroCopy = {
  eyebrow: modules.source.name,
  title: modules.source.tagline,
  subhead: "Can't find the tickets your customer needs?",
  body: "SeatsSource gives professional brokers access to a dedicated sourcing network for inventory that isn't currently available on the SeatsBrokers platform. Submit a ticket request and our sourcing team works across our global network to find the best available options and competitive B2B pricing.",
} as const;

/** Illustrative request queue — not an inventory-management ingest desk. */
export const sourceHeroEvents = [
  {
    id: "REQ-28401",
    name: "Arsenal vs Chelsea",
    venue: "Emirates Stadium · London",
    demand: "High",
    feed: "Request",
    listings: [
      { section: "Cat A · Lower", qty: 4, price: "£186", status: "Quoted" },
      { section: "Club Level · Row 8", qty: 2, price: "£248", status: "Sourcing" },
      { section: "Upper Tier · 102", qty: 6, price: "£92", status: "Options" },
      { section: "Lower · Block 12", qty: 8, price: "£64", status: "Quoted" },
      { section: "Package · hospitality", qty: 2, price: "£420", status: "Compare" },
    ],
  },
  {
    id: "REQ-28402",
    name: "Champions League Final",
    venue: "Wembley · London",
    demand: "Peak",
    feed: "Network",
    listings: [
      { section: "Club Level · Row 8", qty: 2, price: "£248", status: "Quoted" },
      { section: "Cat A · Longside", qty: 4, price: "£186", status: "Hold" },
      { section: "VIP · Row 3", qty: 2, price: "£420", status: "Options" },
      { section: "Upper · 522", qty: 6, price: "£92", status: "Sourcing" },
      { section: "Family · block", qty: 4, price: "£128", status: "Quoted" },
    ],
  },
  {
    id: "REQ-28405",
    name: "Oasis · Wembley",
    venue: "Wembley Stadium · London",
    demand: "Peak",
    feed: "Request",
    listings: [
      { section: "Upper Tier · 102", qty: 6, price: "£92", status: "Options" },
      { section: "Lower · Block 14", qty: 8, price: "£64", status: "Sourcing" },
      { section: "Package · hospitality", qty: 2, price: "£420", status: "Compare" },
      { section: "Pitch · standing", qty: 4, price: "£186", status: "Quoted" },
      { section: "Club · Row 4", qty: 2, price: "£248", status: "Quoted" },
    ],
  },
  {
    id: "REQ-28404",
    name: "Monaco Grand Prix",
    venue: "Circuit de Monaco",
    demand: "High",
    feed: "Hospitality",
    listings: [
      { section: "Grandstand K · R12", qty: 2, price: "£412", status: "Quoted" },
      { section: "Grandstand K · R14", qty: 4, price: "£248", status: "Options" },
      { section: "General · hill", qty: 6, price: "£92", status: "Sourcing" },
      { section: "Paddock · terrace", qty: 2, price: "£420", status: "Compare" },
      { section: "Grandstand Z · R6", qty: 4, price: "£186", status: "Quoted" },
    ],
  },
  {
    id: "REQ-28407",
    name: "Six Nations · Twickenham",
    venue: "Twickenham · London",
    demand: "High",
    feed: "Request",
    listings: [
      { section: "West · Lower", qty: 4, price: "£164", status: "Quoted" },
      { section: "East · Mid", qty: 6, price: "£98", status: "Options" },
      { section: "Club · Row 11", qty: 2, price: "£248", status: "Sourcing" },
      { section: "South · Upper", qty: 8, price: "£64", status: "Quoted" },
      { section: "Hospitality · box", qty: 2, price: "£420", status: "Compare" },
    ],
  },
  {
    id: "REQ-28408",
    name: "Wimbledon Ladies SF",
    venue: "Centre Court · London",
    demand: "Peak",
    feed: "Premium",
    listings: [
      { section: "Centre · row 12", qty: 2, price: "£412", status: "Quoted" },
      { section: "Centre · row 18", qty: 4, price: "£248", status: "Hold" },
      { section: "No.1 · side", qty: 6, price: "£128", status: "Options" },
      { section: "Grounds · pass", qty: 8, price: "£64", status: "Sourcing" },
      { section: "Package · hospitality", qty: 2, price: "£420", status: "Quoted" },
    ],
  },
] as const;

export const sourceHeroLayers = [
  { id: "request", label: "Request", state: "Open" },
  { id: "source", label: "Source", state: "Live" },
  { id: "compare", label: "Compare", state: "Ready" },
  { id: "quote", label: "Quote", state: "Out" },
] as const;

export const sourceHeroFeeds = [
  { id: "request", label: "Ticket request", detail: "Submitted" },
  { id: "network", label: "Global network", detail: "Searching" },
  { id: "options", label: "B2B options", detail: "Returned" },
  { id: "buy", label: "Convert to order", detail: "Ready" },
] as const;
