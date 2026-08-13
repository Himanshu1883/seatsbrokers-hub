/** Marketplace Connectivity hero: left copy, channel-mesh stage data, plus unused mini-card datasets for MarketplaceConsoleCards. */

export const marketplaceHeroCopy = {
  eyebrow: "Marketplace Connectivity",
  title: "One Inventory. Multiple Marketplaces.",
  subhead: "List once. Distribute everywhere — listing creation, updates, synchronization and automatic delisting from one hub.",
  body: "Connect your ticket operation to multiple resale marketplaces through centralized API infrastructure. SeatsBrokers keeps quantity, price and listing status aligned across every connected channel.",
} as const;

export type MarketplaceHeroCardType =
  | "channel-status"
  | "listing-push"
  | "price-sync"
  | "auto-delist"
  | "api-health"
  | "conflict-guard"
  | "qty-sync"
  | "order-sync";

export type MarketplaceHeroCard = {
  id: string;
  type: MarketplaceHeroCardType;
  label: string;
};

export const marketplaceHeroColumnA: MarketplaceHeroCard[] = [
  { id: "a-ch-1", type: "channel-status", label: "Channels" },
  { id: "a-list-1", type: "listing-push", label: "Distribution" },
  { id: "a-api-1", type: "api-health", label: "API health" },
  { id: "a-qty-1", type: "qty-sync", label: "Quantity" },
  { id: "a-delist-1", type: "auto-delist", label: "Delist" },
  { id: "a-ch-2", type: "channel-status", label: "Channels" },
];

export const marketplaceHeroColumnB: MarketplaceHeroCard[] = [
  { id: "b-price-1", type: "price-sync", label: "Price sync" },
  { id: "b-guard-1", type: "conflict-guard", label: "Guard" },
  { id: "b-order-1", type: "order-sync", label: "Orders" },
  { id: "b-list-2", type: "listing-push", label: "Distribution" },
  { id: "b-api-2", type: "api-health", label: "API health" },
  { id: "b-price-2", type: "price-sync", label: "Price sync" },
];

export const heroChannels = [
  { name: "Global resale", status: "synced" as const, latency: "42ms" },
  { name: "Sports exchange", status: "synced" as const, latency: "58ms" },
  { name: "Regional OTA", status: "pushing" as const, latency: "96ms" },
  { name: "Broker desk", status: "synced" as const, latency: "18ms" },
] as const;

export const heroListingPush = {
  event: "UCL Final · Cat A",
  qty: "2",
  channels: "8",
  stage: "Pushing",
} as const;

export const heroPriceSync = {
  from: "£248",
  to: "£252",
  acked: "7 / 8",
  event: "Club Level · Row 8",
} as const;

export const heroDelist = {
  trigger: "Ticket sold",
  removed: "3 channels",
  hold: "Armed",
} as const;

export const heroApiHealth = {
  channels: "32",
  latency: "96ms",
  errors: "0.1%",
} as const;

export const heroConflictGuard = {
  holds: "4 locked",
  conflicts: "0 open",
  status: "Armed",
} as const;

export const heroQtySync = {
  listed: "1,842",
  live: "12 channels",
  delta: "−2 sold",
} as const;

export const heroOrderSync = {
  id: "SB-4817",
  source: "Marketplace order",
  stage: "Synced back",
} as const;

export type MarketplaceHeroMeshStatus = "synced" | "lagging" | "conflict";

export const marketplaceHeroOps = {
  channelsLive: "32",
  listingsPushed: "1,842",
  lastSync: "4s",
  conflictsOpen: "1",
  alignment: "7 / 8",
} as const;

export const marketplaceHeroOrigin = {
  id: "LST-4817",
  event: "UCL Final · Cat A",
  section: "Club Level · Row 8",
  qty: "2",
  ask: "£252",
  destinations: "8",
} as const;

export const marketplaceHeroMesh = [
  { code: "CH-01", name: "Global resale", status: "synced" as const, listings: 412, pips: 10, latency: "42ms" },
  { code: "CH-02", name: "Sports exchange", status: "synced" as const, listings: 318, pips: 8, latency: "58ms" },
  { code: "CH-03", name: "Regional OTA", status: "lagging" as const, listings: 186, pips: 5, latency: "96ms" },
  { code: "CH-04", name: "Broker desk", status: "synced" as const, listings: 540, pips: 12, latency: "18ms" },
  { code: "CH-05", name: "Travel partners", status: "synced" as const, listings: 274, pips: 7, latency: "71ms" },
  { code: "CH-06", name: "White-label", status: "conflict" as const, listings: 91, pips: 3, latency: "—" },
] as const;

export const marketplaceHeroSyncLog = [
  { time: "09:42:18", event: "poll", detail: "32 channels ok" },
  { time: "09:42:14", event: "push", detail: "LST-4817 · 8 dest" },
  { time: "09:42:11", event: "lag", detail: "CH-03 · 96ms" },
  { time: "09:42:08", event: "ack", detail: "price · 7 / 8" },
  { time: "09:42:04", event: "hold", detail: "CH-06 floor" },
  { time: "09:41:58", event: "qty", detail: "−2 sold" },
  { time: "09:41:51", event: "sync", detail: "CH-01 live" },
  { time: "09:41:44", event: "delist", detail: "3 channels" },
] as const;

export const marketplaceHeroPriceAlign = {
  ask: "£252",
  floor: "£248",
  spread: "+£4",
  acked: "7 / 8",
} as const;

export const marketplaceHeroConflicts = [
  { code: "CH-03", name: "Regional OTA", issue: "Ask lag +£4", state: "lagging" as const },
  { code: "CH-06", name: "White-label", issue: "Floor hold", state: "conflict" as const },
  { code: "CH-08", name: "Marketplace 06", issue: "Ack pending", state: "queued" as const },
] as const;
