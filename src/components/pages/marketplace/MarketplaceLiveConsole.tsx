import type { CSSProperties, ReactNode } from "react";
import { ArrowRightLeft, Radio, ShieldCheck } from "lucide-react";
import { Reveal } from "@/hooks/use-scroll-motion";
import { ConsoleCopyPanel, type ConsoleCopyMeta } from "@/components/pages/brokers/ConsoleCopyPanel";
import { ChannelStatusConsole } from "./ChannelStatusConsole";
import { ListingDistributionConsole } from "./ListingDistributionConsole";
import { PriceConflictConsole } from "./PriceConflictConsole";

export type MarketplaceLiveConsoleVariant = "channelStatus" | "listingDistribution" | "pricePush";

type MarketplaceLiveConsoleMeta = ConsoleCopyMeta & {
  tone: "light" | "dark";
  surface?: "surface" | "background";
  console: ReactNode;
  tiltY?: number;
  tiltX?: number;
};

const variants: Record<MarketplaceLiveConsoleVariant, MarketplaceLiveConsoleMeta> = {
  channelStatus: {
    eyebrow: "Marketplace status",
    title: "Monitor connection status, error rates and API health per marketplace",
    body: "See which channels are synced, pushing or queued — latency and error rate on the same map that listings fan out from.",
    detail:
      "SeatsBrokers polls every connected marketplace continuously. Connection status, API health and request logs sit in one terminal so a stalled channel is visible before it becomes an oversell.",
    detailLabel: "What the map tracks",
    highlights: [
      { value: "32", label: "channels" },
      { value: "96ms", label: "sync latency" },
      { value: "0.1%", label: "error rate" },
    ],
    points: [
      {
        title: "Connectivity map",
        body: "A live hub of connected marketplaces around the SeatsBrokers core — each node is a channel with destination code, latency and sync state.",
      },
      {
        title: "Channel health",
        body: "Synced, pushing or queued per marketplace, with rolling error rate so the desk can troubleshoot from the same screen.",
      },
      {
        title: "API health log",
        body: "Full audit trail of polls, listing updates and reconnects — the same API logs used for error monitoring.",
      },
    ],
    tone: "light",
    surface: "surface",
    console: <ChannelStatusConsole />,
    tiltY: -9,
    tiltX: 3,
  },
  listingDistribution: {
    eyebrow: "Listing distribution",
    title: "List once. Distribute everywhere.",
    body: "Create and update listings across connected marketplaces from one platform — quantity, price and listing status stay aligned as they fan out.",
    detail:
      "When inventory changes, SeatsBrokers synchronizes quantity, price and listing status. One write from the broker desk becomes a push to every connected channel, with live, pushing and queued states visible per destination.",
    detailLabel: "How a listing fans out",
    highlights: [
      { value: "4-stage", label: "sync pipeline" },
      { value: "8", label: "destinations" },
      { value: "Live", label: "qty sync" },
    ],
    points: [
      {
        title: "Create listing",
        body: "Publish inventory from your broker POS or inventory system in one action — the listing is written once, not per marketplace.",
      },
      {
        title: "Push to channels",
        body: "The same listing is distributed to connected marketplaces. Destination codes (SG · TM · LF) report live, pushing or queued.",
      },
      {
        title: "Quantity synchronization",
        body: "Inventory quantity stays consistent across channels — no overselling while a push is still in flight.",
      },
      {
        title: "Confirm live",
        body: "Listing status comes back on the hub so the desk sees which marketplaces actually have the seats up.",
      },
    ],
    tone: "dark",
    console: <ListingDistributionConsole />,
    tiltY: -10,
    tiltX: 3,
  },
  pricePush: {
    eyebrow: "Price & conflict guard",
    title: "Price changes propagate. Double-sale protection stays armed.",
    body: "A new ask pushes to every connected marketplace. When a ticket sells, other listings update automatically — holds and locks stay in sync.",
    detail:
      "Price synchronization and automatic delisting run on the same conflict guard. Quantity holds lock instantly, competing listings delist the moment a ticket sells, and the order flows back into the central platform.",
    detailLabel: "How the guard works",
    highlights: [
      { value: "7 / 8", label: "price acked" },
      { value: "0", label: "conflicts" },
      { value: "Auto", label: "delist" },
    ],
    points: [
      {
        title: "Price synchronization",
        body: "Price changes propagate to every connected marketplace automatically. Each channel acks the new ask so you know who has caught up.",
      },
      {
        title: "Hold board",
        body: "Inventory holds lock seats while a sale is in flight. Double-sale protection keeps holds and locks in sync at all times.",
      },
      {
        title: "Automatic delisting",
        body: "When a ticket sells, other marketplace listings are removed or quantity-adjusted automatically — Ticket Sold → Inventory Updated → Other Listings Updated / Removed.",
      },
      {
        title: "Order synchronization",
        body: "Orders from any marketplace flow back into the central platform with delivery updates following the same sync path.",
      },
    ],
    tone: "light",
    surface: "surface",
    console: <PriceConflictConsole />,
    tiltY: -6,
    tiltX: 2,
  },
};

const badgeIcons: Record<MarketplaceLiveConsoleVariant, typeof Radio> = {
  channelStatus: Radio,
  listingDistribution: ArrowRightLeft,
  pricePush: ShieldCheck,
};

type MarketplaceLiveConsoleProps = {
  variant: MarketplaceLiveConsoleVariant;
};

export function MarketplaceLiveConsole({ variant }: MarketplaceLiveConsoleProps) {
  const meta = variants[variant];
  const isDark = meta.tone === "dark";
  const BadgeIcon = badgeIcons[variant];
  const tiltStyle = {
    ["--lc-tilt-y" as string]: `${meta.tiltY ?? -12}deg`,
    ["--lc-tilt-x" as string]: `${meta.tiltX ?? 4}deg`,
  } as CSSProperties;
  const bg =
    isDark ? "bg-dark text-background" : meta.surface === "background" ? "bg-background" : "bg-surface";

  return (
    <section className={`section-curve relative isolate scroll-mt-24 py-20 sm:py-24 ${bg}`}>
      {isDark ? (
        <div
          className="pointer-events-none absolute inset-0 bg-linear-to-br from-dark via-dark to-primary-deep/35"
          aria-hidden
        />
      ) : null}

      <div className="container-page relative z-10">
        <div className="lc-section">
          <Reveal className="lc-section-copy">
            <ConsoleCopyPanel meta={meta} isDark={isDark} />
          </Reveal>

          <Reveal delay={120} className="lc-section-stage">
            <div className="lc-tilt-wrap" style={tiltStyle}>
              <div className="lc-tilt-card">
                {meta.console}
                <span className="lc-tilt-badge" aria-hidden>
                  <BadgeIcon className="size-4" />
                </span>
                <span className="lc-tilt-shadow" aria-hidden />
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
