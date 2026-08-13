/** Mini console card data for the Brokers hero wall — sourced from existing broker consoles. */

export const brokerHeroCopy = {
  eyebrow: "Broker Platform",
  title: "Run Your Entire Ticket Business From One Platform",
  subhead:
    "List once. Distribute everywhere — one live operating system for inventory, marketplaces, pricing and sales.",
  body: "SeatsBrokers gives ticket brokers the infrastructure to manage inventory, marketplaces, pricing, events, sales and fulfillment from one centralized system.",
} as const;

export type BrokerHeroCardType =
  | "inventory"
  | "marketplace-sync"
  | "ai-pricing"
  | "event-catalog"
  | "sync-activity"
  | "distribution"
  | "market-intelligence"
  | "sales-intelligence";

export type BrokerHeroCard = {
  id: string;
  type: BrokerHeroCardType;
  label: string;
};

export const brokerHeroColumnA: BrokerHeroCard[] = [
  { id: "a-inv-1", type: "inventory", label: "Inventory" },
  { id: "a-sync-1", type: "sync-activity", label: "Sync feed" },
  { id: "a-event-1", type: "event-catalog", label: "Event catalog" },
  { id: "a-mp-1", type: "marketplace-sync", label: "Marketplaces" },
  { id: "a-sales-1", type: "sales-intelligence", label: "Sales desk" },
  { id: "a-inv-2", type: "inventory", label: "Inventory" },
];

export const brokerHeroColumnB: BrokerHeroCard[] = [
  { id: "b-ai-1", type: "ai-pricing", label: "AI pricing" },
  { id: "b-intel-1", type: "market-intelligence", label: "Market intel" },
  { id: "b-dist-1", type: "distribution", label: "Distribution" },
  { id: "b-mp-2", type: "marketplace-sync", label: "Marketplaces" },
  { id: "b-event-2", type: "event-catalog", label: "Event catalog" },
  { id: "b-sync-2", type: "sync-activity", label: "Sync feed" },
];

export const heroInventory = {
  listings: "2,418",
  seats: "6,842",
  channels: "8",
  event: "UCL Final · Cat A",
  movement: "+126 today",
} as const;

export const heroMarketplaces = [
  { name: "StubHub", count: "842", status: "synced" as const },
  { name: "Viagogo", count: "418", status: "synced" as const },
  { name: "LiveFootball", count: "612", status: "pushing" as const },
  { name: "Broker desk", count: "248", status: "synced" as const },
] as const;

export const heroAiPricing = {
  ask: "£248",
  floor: "£185",
  confidence: "87%",
  badge: "BEST",
  event: "UCL Final · Cat A",
} as const;

export const heroEvents = [
  {
    name: "Champions League Final",
    venue: "Wembley · London",
    date: "31 May 2026",
    category: "Football",
    availability: "842 listings",
  },
  {
    name: "Arsenal vs Chelsea",
    venue: "Emirates · London",
    date: "14 Apr 2026",
    category: "Premier League",
    availability: "416 listings",
  },
] as const;

export const heroSyncLog = [
  { time: "09:41:02", msg: "push.listings → 8 channels", ok: true },
  { time: "09:41:03", msg: "double_sale.guard → armed", ok: true },
  { time: "09:41:04", msg: "ai.reprice → £248 ask", ok: true },
  { time: "09:41:05", msg: "sync.delist → 3 marketplaces", ok: true },
  { time: "09:41:06", msg: "order.complete → SB-4817", ok: true },
] as const;

export const heroDistributionNodes = [
  "Marketplace",
  "Broker",
  "API",
  "OTA",
] as const;

export const heroMarketIntel = {
  event: "Champions League Final",
  avg: "£248",
  demand: "+18%",
  volume: "842",
  bars: [38, 52, 71, 58, 84, 62, 78] as const,
} as const;

export const heroSalesDesk = {
  orders: "47",
  revenue: "£12,840",
  conversion: "98.2%",
  listings: "2,418 active",
} as const;
