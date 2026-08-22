export const inventoryStats = [
  { label: "Active listings", value: "Live" },
  { label: "Channels live", value: "Multi" },
  { label: "Sections mapped", value: "Mapped" },
  { label: "Sync status", value: "Live" },
] as const;

export const inventoryNav = [
  { label: "Dashboard", active: false },
  { label: "Inventory", active: true },
  { label: "Listings", active: false },
  { label: "Distribution", active: false },
  { label: "Settings", active: false },
] as const;

export const listingTabs = ["My listings", "Automation", "Packages"] as const;

export const backListings = [
  { section: "Cat A · Lower", qty: 4, price: "£186", status: "Listed", mine: true },
  { section: "Club Level · Row 8", qty: 2, price: "£248", status: "Syncing", mine: true },
  { section: "Upper Tier · 102", qty: 6, price: "£92", status: "Listed", mine: false },
  { section: "VIP · Row 3", qty: 2, price: "£420", status: "Hold", mine: true },
] as const;

export const inventoryEvents = [
  {
    id: "INV-4401",
    name: "Arsenal vs Chelsea",
    meta: "14 Apr 2026 · Emirates Stadium",
    section: "Cat A · Lower · Row 12",
    tickets: 4,
    seats: [
      { seat: "Seat 1 · Row 12 · Cat A", status: "Listed" as const },
      { seat: "Seat 2 · Row 12 · Cat A", status: "Listed" as const },
      { seat: "Seat 3 · Row 12 · Cat A", status: "Sold" as const },
      { seat: "Seat 4 · Row 12 · Cat A", status: "Available" as const },
    ],
  },
  {
    id: "INV-4402",
    name: "Champions League Final",
    meta: "31 May 2026 · Wembley",
    section: "Club Level · Row 8",
    tickets: 2,
    seats: [
      { seat: "Seat 1 · Row 8 · Club", status: "Listed" as const },
      { seat: "Seat 2 · Row 8 · Club", status: "Syncing" as const },
    ],
  },
  {
    id: "INV-4403",
    name: "Oasis · Wembley",
    meta: "12 Jul 2026 · Wembley Stadium",
    section: "Upper Tier · Block 102",
    tickets: 6,
    seats: [
      { seat: "Seat 1 · Row 14 · Upper", status: "Available" as const },
      { seat: "Seat 2 · Row 14 · Upper", status: "Available" as const },
      { seat: "Seat 3 · Row 14 · Upper", status: "Listed" as const },
    ],
  },
] as const;

export const inventoryFeed = [
  { time: "09:42:18", msg: "inventory.sync → 1,842 listings refreshed", ok: true },
  { time: "09:42:15", msg: "listing.push → Global resale · Cat A x2 live", ok: true },
  { time: "09:42:12", msg: "price.update → Club Level £248 → £252", ok: true },
  { time: "09:42:09", msg: "order.delist → Seat 3 marked sold · 3 channels", ok: true },
  { time: "09:42:06", msg: "package.rule → VIP bundle · 2 seats grouped", ok: true },
  { time: "09:42:03", msg: "delivery.set → mobile transfer · Row 12", ok: true },
  { time: "09:42:00", msg: "hold.confirmed → 0 double-sale conflicts", ok: true },
  { time: "09:41:57", msg: "api.ingest → POS inventory batch received", ok: true },
] as const;

export const inventoryTags = [
  "Tickets & sections",
  "Pricing & delivery",
  "Packages",
] as const;
