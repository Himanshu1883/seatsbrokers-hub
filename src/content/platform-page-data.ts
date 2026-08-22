/** Platform overview — operating ecosystem map. Deep-links to product pages; does not duplicate them. */

import { modules } from "./modules";
import { productHrefs } from "./site";

export const platformSupport =
  "From market opportunity to final settlement, SeatsBrokers connects the ticket broker workflow on one platform.";

export const platformHeroCopy = {
  eyebrow: "Platform",
  title: "Your Ticket Brokerage. Connected.",
  subhead: platformSupport,
  body: "SeatsBrokers is the operating layer for a professional ticket brokerage. Seven products sit on one spine — discover, source, price, connect, distribute, sell & fulfil, then pay & settle — so inventory, pricing and settlement stay in the same workflow.",
} as const;

export const platformHeroPoints = [
  "One inventory layer from opportunity to settlement",
  "Each stage is owned by one product — they run as one platform",
  "POS, feeds and partner systems connect into the same path",
] as const;

export const platformStackLayers = [
  {
    id: "intel",
    index: "01",
    product: modules.intel.name,
    stage: "Discover",
    role: "Find the opportunity before you source.",
    href: productHrefs.intel,
  },
  {
    id: "source",
    index: "02",
    product: modules.source.name,
    stage: "Source",
    role: "Hold stock and supply on one inventory layer.",
    href: productHrefs.source,
  },
  {
    id: "pulse",
    index: "03",
    product: modules.pulse.name,
    stage: "Price",
    role: "AI recommends. You decide the ask.",
    href: productHrefs.pulse,
  },
  {
    id: "link",
    index: "04",
    product: modules.link.name,
    stage: "Connect",
    role: "Bring POS, feeds and ERP onto one path.",
    href: productHrefs.link,
  },
  {
    id: "market",
    index: "05",
    product: modules.market.name,
    stage: "Distribute",
    role: "List once. Keep every channel in sync.",
    href: productHrefs.market,
  },
  {
    id: "deal",
    index: "06",
    product: modules.deal.name,
    stage: "Sell & fulfil",
    role: "Take the enquiry through to delivery.",
    href: productHrefs.deal,
  },
  {
    id: "funds",
    index: "07",
    product: modules.funds.name,
    stage: "Pay & settle",
    role: "Close the loop inside the same workflow.",
    href: productHrefs.funds,
  },
] as const;

export type PlatformStageId = (typeof platformStackLayers)[number]["id"];

export const platformHandoffFeed = [
  { time: "09:42:18", msg: "discover → opportunity on the record" },
  { time: "09:42:14", msg: "source → inventory layer aligned" },
  { time: "09:42:10", msg: "price → recommendation ready · you decide" },
  { time: "09:42:06", msg: "connect → POS and feed on path" },
  { time: "09:42:02", msg: "distribute → listing mirrored" },
  { time: "09:41:58", msg: "sell → quote shared in £" },
  { time: "09:41:54", msg: "settle → payout on Standard" },
] as const;

export const platformModules = [
  {
    id: "intel" as const,
    index: "01",
    title: modules.intel.name,
    tagline: modules.intel.tagline,
    body: "Know the market. Global event data, onsale information, venue details, market pricing and demand signals.",
    href: productHrefs.intel,
    cta: `Explore ${modules.intel.name}`,
    layer: "Discover",
    receives: "Market signals",
    writes: "Opportunity record",
  },
  {
    id: "source" as const,
    index: "02",
    title: modules.source.name,
    tagline: modules.source.tagline,
    body: "Manage your inventory. Centralise your own stock and connected supplier supply in one layer.",
    href: productHrefs.source,
    cta: `Explore ${modules.source.name}`,
    layer: "Source",
    receives: "Opportunity",
    writes: "Inventory layer",
  },
  {
    id: "pulse" as const,
    index: "03",
    title: modules.pulse.name,
    tagline: modules.pulse.tagline,
    body: "AI recommends. You decide. Pricing recommendations from live market data — the broker stays in control.",
    href: productHrefs.pulse,
    cta: `Explore ${modules.pulse.name}`,
    layer: "Price",
    receives: "Inventory + market",
    writes: "Approved ask",
  },
  {
    id: "link" as const,
    index: "04",
    title: modules.link.name,
    tagline: modules.link.tagline,
    body: "Connect your ticketing operation. POS, websites, supplier feeds, inventory platforms and ERP through the API.",
    href: productHrefs.link,
    cta: `Explore ${modules.link.name}`,
    layer: "Connect",
    receives: "Your stack",
    writes: "Connected path",
  },
  {
    id: "market" as const,
    index: "05",
    title: modules.market.name,
    tagline: modules.market.tagline,
    body: "List once. Distribute everywhere. Keep prices, quantities and availability synchronised across channels.",
    href: productHrefs.market,
    cta: `Explore ${modules.market.name}`,
    layer: "Distribute",
    receives: "One listing",
    writes: "Synced channels",
  },
  {
    id: "deal" as const,
    index: "06",
    title: modules.deal.name,
    tagline: modules.deal.tagline,
    body: "From enquiry to sale. Search inventory, apply your margin and share professional quotations.",
    href: productHrefs.deal,
    cta: `Explore ${modules.deal.name}`,
    layer: "Sell & fulfil",
    receives: "Inventory",
    writes: "Quote & order",
  },
  {
    id: "funds" as const,
    index: "07",
    title: modules.funds.name,
    tagline: modules.funds.tagline,
    body: "Payments built into your ticketing workflow. Purchasing, balances and eligible partner settlements.",
    href: productHrefs.funds,
    cta: `Explore ${modules.funds.name}`,
    layer: "Pay & settle",
    receives: "Completed sale",
    writes: "Settlement",
  },
] as const;

export const platformFlowCopy = {
  eyebrow: "Operating stack",
  title: "Discover → Pay & settle",
  intro: platformSupport,
  close: "One workflow. One inventory layer. Multiple sales channels.",
} as const;

export const platformModuleCopy = {
  eyebrow: "Operating stack",
  title: "Discover → Pay & settle",
  intro: platformSupport,
} as const;

export const platformSteps = [
  `${modules.intel.name} structures events, onsales and market opportunity`,
  `${modules.source.name} holds your inventory and connected supply`,
  `${modules.pulse.name} turns market data into pricing recommendations you approve`,
  `${modules.link.name} connects POS, ERP, sites and partner systems`,
  `${modules.market.name} distributes listings across connected channels`,
  `${modules.deal.name} quotes, sells and fulfils from one workflow`,
  `${modules.funds.name} settles payments and eligible partner payouts`,
] as const;
