import type { CSSProperties, ReactNode } from "react";
import { Landmark, Layers3, Radio } from "lucide-react";
import { Reveal } from "@/hooks/use-scroll-motion";
import { ConsoleCopyPanel, type ConsoleCopyMeta } from "@/components/pages/brokers/ConsoleCopyPanel";
import { MarketplaceConnectConsole } from "./MarketplaceConnectConsole";
import { StackIngestConsole } from "./StackIngestConsole";
import { FeedPaymentsConsole } from "./FeedPaymentsConsole";

export type IntegrationsLiveConsoleVariant = "marketplaces" | "stackIngest" | "feedPayments";

type IntegrationsLiveConsoleMeta = ConsoleCopyMeta & {
  tone: "light" | "dark";
  surface?: "surface" | "background";
  console: ReactNode;
  tiltY?: number;
  tiltX?: number;
};

const variants: Record<IntegrationsLiveConsoleVariant, IntegrationsLiveConsoleMeta> = {
  marketplaces: {
    eyebrow: "Marketplaces",
    title: "List once. Keep every connected channel aligned.",
    body: "Marketplace connectivity is a destination on the connect map — not a second inventory book. Quantity, ask and listing status leave through one write.",
    detail:
      "A sale on any connected channel can update or remove the listing on the others. This desk uses generic destinations. It does not publish a marketplace count or unconfirmed logos.",
    detailLabel: "How channels stay aligned",
    highlights: [
      { value: "Live", label: "channel sync" },
      { value: "Auto", label: "delist path" },
      { value: "£", label: "mirrored ask" },
    ],
    points: [
      {
        title: "One listing write",
        body: "Inventory is published once. Connected marketplaces, partner feeds and a web store read the same record.",
      },
      {
        title: "Quantity and ask",
        body: "Qty and £ ask stay mirrored while a push is in flight so a stall is visible before it becomes an oversell.",
      },
      {
        title: "Return path",
        body: "Orders and sold quantity write back through the same connection layer.",
      },
    ],
    tone: "light",
    surface: "surface",
    console: <MarketplaceConnectConsole />,
    tiltY: -9,
    tiltX: 3,
  },
  stackIngest: {
    eyebrow: "POS, inventory and ERP",
    title: "Keep the desk you already run. Land stock in one layer.",
    body: "POS systems, inventory platforms and ERP exports connect into SeatsBrokers. This is an ingest map — not a broker POS tour.",
    detail:
      "The point-of-sale and inventory tool stay in place. Sections, rows, quantities and delivery rules land in the SeatsBrokers layer so pricing, listings and settlement read the same record. ERP is a status row on that path, not a second ledger.",
    detailLabel: "What the ingest desk tracks",
    highlights: [
      { value: "Ready", label: "POS connect" },
      { value: "Live", label: "inventory layer" },
      { value: "Synced", label: "ERP export" },
    ],
    points: [
      {
        title: "POS systems",
        body: "Orders and stock leave the desk you already operate and arrive as one ingest batch.",
      },
      {
        title: "Inventory platforms",
        body: "An existing inventory tool synchronises sections, quantity and delivery rules into the same layer.",
      },
      {
        title: "ERP systems",
        body: "Finance and operations receive a sync status — purchasing stays beside the ticket.",
      },
    ],
    tone: "dark",
    console: <StackIngestConsole />,
    tiltY: -8,
    tiltX: 3,
  },
  feedPayments: {
    eyebrow: "APIs, sites and payments",
    title: "Supplier feeds, websites, custom contracts and payment rails.",
    body: "Where a named connector is not listed, the SeatsBrokers API is the contract. Payment systems sit on the same workflow. Standard remains the default rail.",
    detail:
      "Supplier APIs ingest connected stock. Websites embed the catalog you already manage. Custom webhooks carry orders and fulfilment. A USDT path is available where it is eligible — this desk does not invent fees.",
    detailLabel: "What this desk is not",
    highlights: [
      { value: "Ready", label: "supplier feeds" },
      { value: "Open", label: "custom contract" },
      { value: "Standard", label: "default rail" },
    ],
    points: [
      {
        title: "Supplier APIs",
        body: "Connected supplier stock lands in the same inventory layer as your own listings.",
      },
      {
        title: "Websites and custom",
        body: "Embed inventory and pricing on your site, or build against events, listings, orders and webhooks.",
      },
      {
        title: "Payment systems",
        body: "Connect payment methods to the workflow that lists and sells. Standard is default; USDT is qualitative and eligible-only.",
      },
    ],
    tone: "light",
    surface: "background",
    console: <FeedPaymentsConsole />,
    tiltY: -7,
    tiltX: 2,
  },
};

const badgeIcons: Record<IntegrationsLiveConsoleVariant, typeof Radio> = {
  marketplaces: Radio,
  stackIngest: Layers3,
  feedPayments: Landmark,
};

type IntegrationsLiveConsoleProps = {
  variant: IntegrationsLiveConsoleVariant;
};

export function IntegrationsLiveConsole({ variant }: IntegrationsLiveConsoleProps) {
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
