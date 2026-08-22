/** SeatsSource™ hero: left copy + catalog/inventory ingest stage. */

import { modules } from "./modules";

export const sourceHeroCopy = {
  eyebrow: modules.source.name,
  title: modules.source.tagline,
  subhead:
    "Hold your own stock and connected supply in one inventory layer — sections, rows, quantities and delivery rules on a single record.",
  body: "SeatsSource™ is the inventory every other product reads. Tickets, sections, rows, packages and delivery rules sit beside supplier feeds and POS ingest, so pricing, distribution and quotes use the same live record — not a parallel sheet.",
} as const;

export const sourceHeroEvents = [
  {
    id: "EV-28401",
    name: "Arsenal vs Chelsea",
    venue: "Emirates Stadium · London",
    demand: "High",
    feed: "POS",
    listings: [
      { section: "Cat A · Lower", qty: 4, price: "£186", status: "Listed" },
      { section: "Club Level · Row 8", qty: 2, price: "£248", status: "Syncing" },
      { section: "Upper Tier · 102", qty: 6, price: "£92", status: "Listed" },
      { section: "Lower · Block 12", qty: 8, price: "£64", status: "Listed" },
      { section: "Package · hospitality", qty: 2, price: "£420", status: "Hold" },
    ],
  },
  {
    id: "EV-28402",
    name: "Champions League Final",
    venue: "Wembley · London",
    demand: "Peak",
    feed: "Supplier",
    listings: [
      { section: "Club Level · Row 8", qty: 2, price: "£248", status: "Listed" },
      { section: "Cat A · Longside", qty: 4, price: "£186", status: "Hold" },
      { section: "VIP · Row 3", qty: 2, price: "£420", status: "Listed" },
      { section: "Upper · 522", qty: 6, price: "£92", status: "Syncing" },
      { section: "Family · block", qty: 4, price: "£128", status: "Listed" },
    ],
  },
  {
    id: "EV-28405",
    name: "Oasis · Wembley",
    venue: "Wembley Stadium · London",
    demand: "Peak",
    feed: "Own",
    listings: [
      { section: "Upper Tier · 102", qty: 6, price: "£92", status: "Listed" },
      { section: "Lower · Block 14", qty: 8, price: "£64", status: "Syncing" },
      { section: "Package · hospitality", qty: 2, price: "£420", status: "Hold" },
      { section: "Pitch · standing", qty: 4, price: "£186", status: "Listed" },
      { section: "Club · Row 4", qty: 2, price: "£248", status: "Listed" },
    ],
  },
  {
    id: "EV-28404",
    name: "Monaco Grand Prix",
    venue: "Circuit de Monaco",
    demand: "High",
    feed: "POS",
    listings: [
      { section: "Grandstand K · R12", qty: 2, price: "£412", status: "Listed" },
      { section: "Grandstand K · R14", qty: 4, price: "£248", status: "Listed" },
      { section: "General · hill", qty: 6, price: "£92", status: "Syncing" },
      { section: "Paddock · terrace", qty: 2, price: "£420", status: "Hold" },
      { section: "Grandstand Z · R6", qty: 4, price: "£186", status: "Listed" },
    ],
  },
  {
    id: "EV-28407",
    name: "Six Nations · Twickenham",
    venue: "Twickenham · London",
    demand: "High",
    feed: "Own",
    listings: [
      { section: "West · Lower", qty: 4, price: "£164", status: "Listed" },
      { section: "East · Mid", qty: 6, price: "£98", status: "Listed" },
      { section: "Club · Row 11", qty: 2, price: "£248", status: "Syncing" },
      { section: "South · Upper", qty: 8, price: "£64", status: "Listed" },
      { section: "Hospitality · box", qty: 2, price: "£420", status: "Hold" },
    ],
  },
  {
    id: "EV-28408",
    name: "Wimbledon Ladies SF",
    venue: "Centre Court · London",
    demand: "Peak",
    feed: "Supplier",
    listings: [
      { section: "Centre · row 12", qty: 2, price: "£412", status: "Listed" },
      { section: "Centre · row 18", qty: 4, price: "£248", status: "Hold" },
      { section: "No.1 · side", qty: 6, price: "£128", status: "Listed" },
      { section: "Grounds · pass", qty: 8, price: "£64", status: "Syncing" },
      { section: "Package · hospitality", qty: 2, price: "£420", status: "Listed" },
    ],
  },
] as const;

export const sourceHeroLayers = [
  { id: "own", label: "Own stock", state: "Live" },
  { id: "supplier", label: "Supplier", state: "In" },
  { id: "pos", label: "POS ingest", state: "Queued" },
  { id: "pack", label: "Packages", state: "Ready" },
] as const;

export const sourceHeroFeeds = [
  { id: "own", label: "Own stock", detail: "Your listings" },
  { id: "supplier", label: "Supplier feed", detail: "Connected supply" },
  { id: "pos", label: "POS ingest", detail: "Desk stock in" },
  { id: "file", label: "File drop", detail: "Sheet ingest" },
] as const;
