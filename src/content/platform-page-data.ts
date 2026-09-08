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
    role: "Find inventory not already on the platform.",
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
  { time: "09:42:14", msg: "source → request open · network live" },
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
    body: "Your sourcing desk. On demand. Request tickets that are not listed on SeatsBrokers — our network returns competitive B2B options.",
    href: productHrefs.source,
    cta: `Explore ${modules.source.name}`,
    layer: "Source",
    receives: "Missing inventory need",
    writes: "Sourced options",
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
  barLinks: [
    { id: "events" as const, label: "More events" },
    { id: "channels" as const, label: "More channels" },
    { id: "opportunities" as const, label: "More opportunities" },
  ],
} as const;

/** Stage board under the 7-up rail. Hero photos must differ from the card shots. */
export const platformStageBoards = {
  intel: {
    nav: [
      { title: "Events", note: "Onsale calendar" },
      { title: "Demand", note: "Live signals" },
      { title: "Venues", note: "Capacity & maps" },
      { title: "Comparables", note: "Like-for-like" },
    ],
    board: {
      title: "Opportunity",
      tabs: [
        { label: "Demand", hint: "Peak vs steady" },
        { label: "Forecast", hint: "Hold or source" },
      ],
      columns: ["Event", "Window", "Signal"],
      rows: [
        { a: "Arsenal vs Chelsea", b: "Onsale", status: "Peak", tone: "settled" },
        { a: "UCL Final · Wembley", b: "7 days", status: "High", tone: "posted" },
        { a: "Oasis · Wembley", b: "Listed", status: "Steady", tone: "pending" },
      ],
    },
    sync: {
      title: "Signals in sync",
      items: ["Event on the record", "Demand scored", "Venue attached", "Ready to source"],
    },
  },
  source: {
    nav: [
      { title: "Request", note: "Missing inventory" },
      { title: "Network", note: "B2B options" },
      { title: "Compare", note: "Section · qty · £" },
      { title: "Buy", note: "Confirm the desk" },
    ],
    board: {
      title: "Sourcing desk",
      tabs: [
        { label: "Network", hint: "On-demand options" },
        { label: "Direct", hint: "Your own holds" },
      ],
      columns: ["Section", "Qty", "Ask"],
      rows: [
        { a: "Cat A · R12", b: "4", status: "Live", tone: "settled" },
        { a: "Club L · R8", b: "2", status: "Hold", tone: "posted" },
        { a: "Upper · 102", b: "6", status: "Open", tone: "pending" },
      ],
    },
    sync: {
      title: "Sourcing in sync",
      items: ["Request open", "Network live", "Options compared", "Ready to quote"],
    },
  },
  pulse: {
    nav: [
      { title: "Market", note: "Live comps" },
      { title: "Recommend", note: "You decide" },
      { title: "Guards", note: "Floor and cap" },
      { title: "Approve", note: "Then it syncs" },
    ],
    board: {
      title: "Recommended ask",
      tabs: [
        { label: "You decide", hint: "Approve before live" },
        { label: "Hold", hint: "Keep current ask" },
      ],
      columns: ["Section", "Ask", "Action"],
      rows: [
        { a: "Lower · 14", b: "£64", status: "Approve", tone: "settled" },
        { a: "Club L · R8", b: "£248", status: "Review", tone: "posted" },
        { a: "Upper · 102", b: "£92", status: "Hold", tone: "pending" },
      ],
    },
    sync: {
      title: "Pricing in sync",
      items: ["Market read", "Recommendation ready", "Broker decides", "Ask can sync"],
    },
  },
  link: {
    nav: [
      { title: "POS", note: "Broker systems" },
      { title: "Feeds", note: "Supplier in" },
      { title: "ERP", note: "Orders out" },
      { title: "API", note: "One path" },
    ],
    board: {
      title: "Connect layer",
      tabs: [
        { label: "POS", hint: "Systems you already run" },
        { label: "Feeds", hint: "Inventory in" },
      ],
      columns: ["System", "Path", "State"],
      rows: [
        { a: "Broker POS", b: "Two-way", status: "Live", tone: "settled" },
        { a: "Supplier feed", b: "Ingest", status: "Live", tone: "posted" },
        { a: "Internal ERP", b: "Orders", status: "Ready", tone: "pending" },
      ],
    },
    sync: {
      title: "Stack in sync",
      items: ["POS on path", "Feed ingesting", "ERP mapped", "Ready to distribute"],
    },
  },
  market: {
    nav: [
      { title: "List once", note: "One inventory write" },
      { title: "Channels", note: "Stay in sync" },
      { title: "B2B", note: "Partner desks" },
      { title: "Sites", note: "Your websites" },
    ],
    board: {
      title: "Distribution",
      tabs: [
        { label: "Channels", hint: "Connected marketplaces" },
        { label: "B2B", hint: "Partner inventory" },
      ],
      columns: ["Channel", "Qty", "State"],
      rows: [
        { a: "Marketplaces", b: "Mirrored", status: "Live", tone: "settled" },
        { a: "B2B buyers", b: "Open", status: "Live", tone: "posted" },
        { a: "Websites", b: "Sync", status: "Ready", tone: "pending" },
      ],
    },
    sync: {
      title: "Listings in sync",
      items: ["One write", "Channels mirrored", "Qty aligned", "Ready to sell"],
    },
  },
  deal: {
    nav: [
      { title: "Search", note: "Available inventory" },
      { title: "Margin", note: "Your % in £" },
      { title: "Quote", note: "Share to the client" },
      { title: "Fulfil", note: "Order to delivery" },
    ],
    board: {
      title: "Quotation",
      tabs: [
        { label: "Quote", hint: "Client-ready in £" },
        { label: "Orders", hint: "Accepted quotes" },
      ],
      columns: ["Line", "Figure", "State"],
      rows: [
        { a: "Cost", b: "£186", status: "Set", tone: "settled" },
        { a: "Margin 10%", b: "£19", status: "Applied", tone: "posted" },
        { a: "Client", b: "£205", status: "Ready", tone: "pending" },
      ],
    },
    sync: {
      title: "Sale in sync",
      items: ["Inventory held", "Quote shared", "Order accepted", "Ready to settle"],
    },
  },
  funds: {
    nav: [
      { title: "Purchasing", note: "Buy inventory" },
      { title: "Balances", note: "Track your position" },
      { title: "Partner payouts", note: "Settle with partners" },
      { title: "Multiple rails", note: "Standard · USDT" },
    ],
    board: {
      title: "Settlement",
      tabs: [
        { label: "Standard (Fiat)", hint: "Default payout path" },
        { label: "USDT", hint: "Eligible partner path" },
      ],
      columns: ["Desk / Location", "Amount", "Status"],
      rows: [
        { a: "London desk", b: "£12,480", status: "Settled", tone: "settled" },
        { a: "Dubai desk", b: "£8,240", status: "Posted", tone: "posted" },
        { a: "New York desk", b: "£4,160", status: "Pending", tone: "pending" },
      ],
    },
    sync: {
      title: "Settlement in sync",
      items: ["Completed sale", "Settlement processing", "Partner payouts", "Ready for next cycle"],
    },
  },
} as const;

export const platformModuleCopy = {
  eyebrow: "Operating stack",
  title: "Discover → Pay & settle",
  intro: platformSupport,
} as const;

export const platformSteps = [
  `${modules.intel.name} structures events, onsales and market opportunity`,
  `${modules.source.name} sources inventory not already listed on the platform`,
  `${modules.pulse.name} turns market data into pricing recommendations you approve`,
  `${modules.link.name} connects POS, ERP, sites and partner systems`,
  `${modules.market.name} distributes listings across connected channels`,
  `${modules.deal.name} quotes, sells and fulfils from one workflow`,
  `${modules.funds.name} settles payments and eligible partner payouts`,
] as const;
