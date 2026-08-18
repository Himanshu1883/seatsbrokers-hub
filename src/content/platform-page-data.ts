/** Platform overview — whole-stack map. Deep-links to product pages; does not duplicate them. */

import { modules } from "./modules";

export const platformHeroCopy = {
  eyebrow: "Platform Overview",
  title: "One Centralized Ticketing Infrastructure",
  subhead: "Event data, inventory, marketplaces, pricing, partners and payments — one stack.",
  body: "SeatsBrokers is the technology layer connecting the global ticketing ecosystem. Brokers list and price inventory across channels; B2B partners search the same inventory, add margin and share branded quotes. Explore each surface, then go deep on the product pages.",
} as const;

export const platformHeroPoints = [
  "One catalog and inventory layer for brokers, partners and channels",
  "Marketplace connectivity with quantity, price and status in sync",
  "APIs so POS, ERP, sites and partner systems sit on the same stack",
] as const;

export const platformStackLayers = [
  { id: "events", index: "01", label: modules.intel.name, tag: "CATALOG", href: "/event-intelligence" },
  { id: "brokers", index: "02", label: "Broker platform", tag: "INVENTORY", href: "/brokers" },
  { id: "marketplace", index: "03", label: modules.market.name, tag: "SYNC", href: "/marketplace-connectivity" },
  { id: "travel", index: "04", label: "B2B partners", tag: "QUOTES", href: "/travel-partners" },
  { id: "api", index: "05", label: modules.link.name, tag: "CONNECT", href: "/api" },
] as const;

export const platformModules = [
  {
    index: "01",
    title: "Broker platform",
    body: "Catalog, inventory, marketplace distribution, market intelligence, AI pricing and POS/API — one desk for high-volume ticket operations.",
    href: "/brokers",
    cta: "Explore brokers",
    layer: "List · price · distribute",
  },
  {
    index: "02",
    title: "B2B partners",
    body: "Search live inventory, add margin, generate branded quotes in £ and manage orders and delivery for event packages.",
    href: "/travel-partners",
    cta: "Explore B2B",
    layer: "Search · quote · fulfil",
  },
  {
    index: "03",
    title: modules.market.name,
    body: "List once and push everywhere. Quantity, price and listing status stay aligned — orders and delivery come back the same path.",
    href: "/marketplace-connectivity",
    cta: "Explore channels",
    layer: "Push · sync · orders back",
  },
  {
    index: "04",
    title: modules.intel.name,
    body: "Structured events, onsale radar, demand signals and forecast context — know the event and the market before you sell.",
    href: "/event-intelligence",
    cta: "Explore intelligence",
    layer: "Catalog · demand · forecast",
  },
  {
    index: "05",
    title: modules.link.name,
    body: "Events, inventory, listings, orders, pricing, delivery and partner APIs — authenticate, call the stack, receive signed webhooks.",
    href: "/api",
    cta: "Explore APIs",
    layer: "Auth · products · webhooks",
  },
] as const;

export const platformModuleCopy = {
  eyebrow: "Platform surfaces",
  title: "Five products. One infrastructure layer.",
  intro:
    "Each surface is a full product page — this map is the stack, not a second copy of every console. Open the desk that matches how you work.",
} as const;

export const platformSteps = [
  "Event data and intelligence structure the catalog",
  "Brokers place inventory and price against the market",
  "SeatsBrokers synchronizes listings across connected marketplaces",
  "B2B partners search, add margin and quote in £",
  "APIs and webhooks keep POS, ERP and partner systems on the same stack",
] as const;
