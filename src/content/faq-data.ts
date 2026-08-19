/** FAQ page copy — B2B infrastructure, not a consumer ticket shop. */

export const faqHeroCopy = {
  eyebrow: "Frequently asked questions",
  titleLead: "Got questions?",
  titleAccent: "We've got answers.",
  intro:
    "SeatsBrokers is B2B ticketing infrastructure for ticket brokers and B2B partners — inventory, marketplaces, event intelligence and APIs on one platform. These answers cover how the two tracks work together.",
} as const;

export const faqTopics = [
  { id: "inventory", label: "Inventory" },
  { id: "api", label: "API access" },
  { id: "authenticity", label: "Authenticity" },
  { id: "delivery", label: "Delivery" },
  { id: "bulk", label: "Bulk & holds" },
  { id: "charges", label: "Platform charges" },
] as const;

export const faqItems = [
  {
    id: "inventory",
    question: "What event inventory can brokers list and B2B partners search?",
    answer:
      "SeatsBrokers is not a consumer ticket shop. Brokers list sports, concert, theatre and live-event inventory from one desk. B2B partners search that same catalogue, add margin, and quote packages to their clients — football, concerts and hospitality sits on the same event layer.",
  },
  {
    id: "api",
    question: "Do you offer an API for brokers and B2B partners?",
    answer:
      "Yes. The SeatsBrokers API covers events, inventory, listings, orders, pricing, delivery and partner access. Brokers push listings across connected marketplaces; B2B partners and affiliates search, hold and quote through the same API layer. Request access from the API page or sales desk.",
  },
  {
    id: "authenticity",
    question: "How does SeatsBrokers keep tickets authentic and valid?",
    answer:
      "Inventory is listed by professional brokers, not anonymous consumer sellers. Orders move through the partner fulfillment desk — mobile transfer, PDF or will-call — so B2B teams and channels receive valid tickets from the same source of truth as the listing.",
  },
  {
    id: "delivery",
    question: "Can B2B agencies receive ticket delivery through the platform?",
    answer:
      "Yes. B2B partners place orders against broker inventory and receive delivery on the order desk. Allocations, last-minute holds and group requests sit next to invoice and settlement — not a public e-ticket inbox.",
  },
  {
    id: "bulk",
    question: "Does the platform support bulk inventory and group purchases?",
    answer:
      "Brokers manage inventory in volume: listings, quantity sync and holds across marketplaces. B2B partners can request group holds and package allocations through the order desk rather than buying seats one at a time.",
  },
  {
    id: "charges",
    question: "What does SeatsBrokers charge?",
    answer:
      "Commercial terms are agreed per account in £. There is no public consumer checkout fee — SeatsBrokers is infrastructure for ticket brokers and B2B partners. Sales can walk through listing, partner and API terms for your operation.",
  },
] as const;

export const faqHelpCopy = {
  eyebrow: "Still need help?",
  title: "We typically reply within one business day.",
  body: "Write to the desk that matches your track. Brokers, marketplace and API questions go to sales; B2B partner access and quoting go to partners.",
  salesLabel: "Brokers, marketplaces & API",
  partnersLabel: "B2B partners",
} as const;
