import type { CSSProperties } from "react";
import type { LucideIcon } from "lucide-react";
import {
  BadgeCheck,
  Car,
  FileSpreadsheet,
  Globe2,
  Link2,
  Package,
  Radio,
  Settings2,
} from "lucide-react";
import { Reveal, useInView } from "@/hooks/use-scroll-motion";
import { SectionBackdrop } from "@/components/landing/SectionBackdrop";
import type { EventBackdropKey } from "@/lib/event-backdrops";

type FlowSource = { icon: LucideIcon; label: string; packet: string };

type FlowBranch = {
  lineLabel: string;
  cardTitle: string;
  cardBody: string;
  cardMetric: string;
  metricLabel: string;
  processLabel: string;
};

type FlowMid = {
  lineLabel: string;
  title: string;
  body: string;
  status: string;
};

type FlowBlueprint = {
  id: string;
  eyebrow: string;
  title: string;
  intro: string;
  systemName: string;
  ingestLabel: string;
  sources: FlowSource[];
  gateway: string;
  branches: FlowBranch[];
  midRow: FlowMid[];
  terminal: string;
  terminalLines: string[];
  backdrop: EventBackdropKey;
};

const sellerBlueprint: FlowBlueprint = {
  id: "sellers",
  backdrop: "concertCrowd",
  eyebrow: "Broker platform",
  title: "Connect your existing systems to marketplace distribution",
  intro:
    "Brokers should not need to change everything they already use. Connect POS systems, inventory systems, internal ERP and partner systems through the SeatsBrokers API.",
  systemName: "seatsbrokers / broker-pipeline",
  ingestLabel: "Connect layer",
  sources: [
    { icon: Settings2, label: "Broker POS", packet: "pos" },
    { icon: FileSpreadsheet, label: "Inventory systems", packet: "inventory" },
    { icon: Package, label: "Internal ERP", packet: "erp" },
    { icon: Radio, label: "Partner systems", packet: "partners" },
  ],
  gateway: "SeatsBrokers API",
  branches: [
    {
      lineLabel: "inventory sync",
      cardTitle: "Inventory layer",
      cardBody: "Tickets, sections, rows, quantity, prices and delivery information — synchronized from your existing systems.",
      cardMetric: "Real-time",
      metricLabel: "Inventory sync",
      processLabel: "Centralized inventory management",
    },
    {
      lineLabel: "marketplace push",
      cardTitle: "Marketplace distribution",
      cardBody: "List once. When inventory changes, SeatsBrokers synchronizes quantity, price and listing status across marketplaces.",
      cardMetric: "32",
      metricLabel: "Connected marketplaces",
      processLabel: "Automated listing distribution",
    },
    {
      lineLabel: "order events",
      cardTitle: "Order synchronization",
      cardBody: "When a ticket sells on any marketplace, inventory updates and other listings are removed automatically.",
      cardMetric: "Auto",
      metricLabel: "Delisting after sale",
      processLabel: "Multi-marketplace sync",
    },
  ],
  midRow: [
    {
      lineLabel: "pricing signals",
      title: "AI pricing",
      body: "Market data analyzed into pricing recommendations — AI recommends, broker approves, price synchronized.",
      status: "Broker controlled",
    },
    {
      lineLabel: "delivery updates",
      title: "Ticket delivery",
      body: "Delivery information updated across marketplaces and partner systems from one queue.",
      status: "SLA tracked",
    },
    {
      lineLabel: "payment flows",
      title: "Payment infrastructure",
      body: "Integrated purchasing and payment infrastructure for eligible ticket businesses.",
      status: "165 countries",
    },
  ],
  terminal: "Marketplace connectivity engine",
  terminalLines: ["inventory, pricing, orders", "delivery, settlement, sync"],
};

const travelBlueprint: FlowBlueprint = {
  id: "travel",
  backdrop: "footballPitch",
  eyebrow: "Travel partner platform",
  title: "Create professional ticket quotes in seconds",
  intro:
    "Select event, select tickets, add margin, generate quote and share with customer — PDF, invoice, WhatsApp, email or branded customer link.",
  systemName: "seatsbrokers / travel-pipeline",
  ingestLabel: "Search layer",
  sources: [
    { icon: Globe2, label: "Event & date search", packet: "query" },
    { icon: BadgeCheck, label: "Venue & category", packet: "filter" },
    { icon: Link2, label: "Ticket type & price", packet: "catalog" },
    { icon: Car, label: "Location search", packet: "location" },
  ],
  gateway: "Travel partner portal / API",
  branches: [
    {
      lineLabel: "inventory access",
      cardTitle: "Inventory access",
      cardBody: "Access available ticket inventory through the platform with real-time visibility.",
      cardMetric: "Live",
      metricLabel: "Inventory visibility",
      processLabel: "Partner inventory access",
    },
    {
      lineLabel: "margin rules",
      cardTitle: "Margin management",
      cardBody: "Add your own margin — ticket price plus partner margin equals customer price.",
      cardMetric: "Custom",
      metricLabel: "Partner margins",
      processLabel: "Margin & pricing rules",
    },
    {
      lineLabel: "quote output",
      cardTitle: "Quotation tool",
      cardBody: "Generate professional PDF quotes, invoices and branded customer-ready quotations.",
      cardMetric: "Seconds",
      metricLabel: "Quote generation",
      processLabel: "Quote & share workflow",
    },
  ],
  midRow: [
    {
      lineLabel: "whatsapp share",
      title: "Share with customer",
      body: "Share quotes via PDF, WhatsApp, email or customer link — branded for your travel business.",
      status: "Multi-channel",
    },
    {
      lineLabel: "order confirm",
      title: "Order management",
      body: "Select available inventory, purchase through the platform and track order status.",
      status: "Partner pricing",
    },
    {
      lineLabel: "invoice gen",
      title: "Invoice generation",
      body: "Customer-ready invoices with transparent margin reporting per package.",
      status: "Branded output",
    },
  ],
  terminal: "Partner commerce hub",
  terminalLines: ["quotes, orders, invoices", "margins, delivery, settlement"],
};

/** Tree junction: one trunk fanning into (or out of) `cols` branches. */
function FlowJunction({
  cols,
  direction,
  spread = "lg",
  height = "h-12",
}: {
  cols: number;
  direction: "in" | "out";
  /** Width at which the fan-out is visible — matches the grid it connects to. */
  spread?: "sm" | "lg";
  height?: string;
}) {
  const positions = Array.from({ length: cols }, (_, i) => `calc((100% / ${cols}) * ${i + 0.5})`);

  return (
    <div
      className={`flow-junction ${direction === "in" ? "flow-junction-in" : "flow-junction-out"} ${
        spread === "sm" ? "flow-junction-sm" : ""
      } ${height}`}
      style={{ "--flow-cols": cols } as CSSProperties}
      aria-hidden
    >
      <span className="flow-bus flow-line-h" />
      <span className="flow-trunk flow-line-v">
        <span className="flow-pulse" />
      </span>
      <span className="flow-node flow-node-trunk" />
      {positions.map((left, i) => (
        <span key={`branch-${left}`} className="flow-branch flow-line-v" style={{ left }}>
          <span className="flow-pulse" style={{ animationDelay: `${i * 0.42}s` }} />
        </span>
      ))}
      {positions.map((left) => (
        <span key={`node-${left}`} className="flow-node" style={{ left }} />
      ))}
    </div>
  );
}

/** Labelled vertical link between two stacked blocks in the same column. */
function FlowLink({ label }: { label: string }) {
  return (
    <div className="flow-link" aria-hidden>
      <span className="flow-line-v flow-link-segment">
        <span className="flow-pulse" />
      </span>
      <span className="flow-packet font-mono">{label}</span>
      <span className="flow-line-v flow-link-segment" />
    </div>
  );
}

function FlowBar({ children, tone }: { children: string; tone: "gateway" | "terminal" }) {
  return (
    <div
      className={`flow-bar ${tone === "terminal" ? "flow-bar-terminal" : ""} mx-auto flex w-full max-w-4xl items-center justify-center gap-3 rounded-xl px-4 py-4`}
    >
      <span className="flow-bar-dot" aria-hidden />
      <span className="font-display text-sm font-bold tracking-[0.12em] text-primary-foreground uppercase sm:text-base">
        {children}
      </span>
      <span className="flow-bar-dot" aria-hidden />
    </div>
  );
}

function FlowArchitecture({ blueprint }: { blueprint: FlowBlueprint }) {
  const { ref, inView } = useInView<HTMLDivElement>(0.12);

  return (
    <section
      id={blueprint.id}
      className="section-curve relative isolate scroll-mt-24 bg-background py-20 sm:py-24"
      aria-labelledby={`${blueprint.id}-title`}
    >
      <SectionBackdrop image={blueprint.backdrop} tone="light" strength={0.1} />
      <div className="container-page relative z-10">
        <Reveal>
          <p className="section-eyebrow text-primary">
            {blueprint.eyebrow}
          </p>
          <h2
            id={`${blueprint.id}-title`}
            className="mt-4 max-w-3xl text-3xl font-bold text-foreground sm:text-4xl"
          >
            {blueprint.title}
          </h2>
          <p className="mt-4 max-w-3xl text-sm leading-relaxed text-muted-foreground sm:text-base">
            {blueprint.intro}
          </p>
        </Reveal>

        <div
          ref={ref}
          data-live={inView}
          className="tools-flow relative mt-12 rounded-2xl border border-border bg-surface/70 px-4 pb-6 pt-4 sm:px-6 sm:pb-8 lg:px-10 lg:pb-10"
        >
          <span className="flow-corner flow-corner-tl" aria-hidden />
          <span className="flow-corner flow-corner-tr" aria-hidden />
          <span className="flow-corner flow-corner-bl" aria-hidden />
          <span className="flow-corner flow-corner-br" aria-hidden />

          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-border pb-4">
            <p className="font-mono text-[10px] tracking-[0.16em] text-muted-foreground uppercase sm:text-[11px]">
              {blueprint.systemName}
            </p>
            <p className="flex items-center gap-2 font-mono text-[10px] tracking-[0.16em] text-primary uppercase sm:text-[11px]">
              <span className="flow-status-dot" aria-hidden />
              pipeline live · streaming
            </p>
          </div>

          {/* Tier 1 — ingest */}
          <p className="flow-tier-label mt-6">{blueprint.ingestLabel}</p>
          <div className="mt-4 grid grid-cols-2 gap-x-4 gap-y-6 sm:grid-cols-4 sm:gap-6">
            {blueprint.sources.map((src, i) => (
              <Reveal key={src.label} delay={i * 70}>
                <div className="flow-source group/src flex flex-col items-center text-center">
                  <span className="flow-source-ring inline-flex size-14 items-center justify-center rounded-full sm:size-16">
                    <src.icon className="size-6 text-primary sm:size-7" strokeWidth={1.75} />
                  </span>
                  <p className="mt-3 text-[11px] font-semibold leading-snug text-foreground sm:text-xs">
                    {src.label}
                  </p>
                  <span className="flow-packet-inline font-mono">{src.packet}</span>
                </div>
              </Reveal>
            ))}
          </div>

          <FlowJunction cols={blueprint.sources.length} direction="in" spread="sm" />

          <FlowBar tone="gateway">{blueprint.gateway}</FlowBar>

          <FlowJunction cols={blueprint.branches.length} direction="out" />

          {/* Tier 2 — process branches */}
          <div className="grid gap-x-4 gap-y-2 lg:grid-cols-3">
            {blueprint.branches.map((branch) => (
              <div key={branch.cardTitle} className="flow-col group flex flex-col">
                <FlowLink label={branch.lineLabel} />
                <div className="flow-card flex flex-1 flex-col rounded-xl border border-border bg-card p-5">
                  <h3 className="font-display text-lg font-bold text-foreground">
                    {branch.cardTitle}
                  </h3>
                  <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground">
                    {branch.cardBody}
                  </p>
                  <div className="mt-5 flex items-end justify-between gap-3 border-t border-border pt-4">
                    <span className="font-display text-3xl font-bold text-primary">
                      {branch.cardMetric}
                    </span>
                    <span className="max-w-[8.5rem] text-right font-mono text-[10px] leading-tight tracking-wide text-muted-foreground uppercase">
                      {branch.metricLabel}
                    </span>
                  </div>
                </div>

                <div className="flow-link flow-link-short" aria-hidden>
                  <span className="flow-line-v flow-link-segment">
                    <span className="flow-pulse" />
                  </span>
                </div>

                <div className="flow-process rounded-lg px-3 py-2.5 text-center font-mono text-[10px] font-bold tracking-[0.12em] text-primary-foreground uppercase sm:text-[11px]">
                  {branch.processLabel}
                </div>
              </div>
            ))}
          </div>

          {/* Tier 3 — operations */}
          <div className="mt-2 grid gap-x-4 gap-y-2 lg:grid-cols-3">
            {blueprint.midRow.map((mid) => (
              <div key={mid.title} className="flow-col group flex flex-col">
                <FlowLink label={mid.lineLabel} />
                <div className="flow-card flex flex-1 flex-col rounded-xl border border-border bg-card p-5">
                  <h3 className="font-display text-base font-bold text-foreground">{mid.title}</h3>
                  <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground">
                    {mid.body}
                  </p>
                  <p className="mt-4 flex items-center gap-2 font-mono text-[10px] tracking-[0.12em] text-primary uppercase">
                    <span className="flow-status-dot" aria-hidden />
                    {mid.status}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <FlowJunction cols={blueprint.midRow.length} direction="in" />

          <div className="mb-3 flex flex-wrap justify-center gap-x-6 gap-y-1">
            {blueprint.terminalLines.map((line) => (
              <span
                key={line}
                className="font-mono text-[10px] tracking-[0.12em] text-muted-foreground"
              >
                {line}
              </span>
            ))}
          </div>

          <FlowBar tone="terminal">{blueprint.terminal}</FlowBar>
        </div>
      </div>
    </section>
  );
}

export function SellerTools() {
  return <FlowArchitecture blueprint={sellerBlueprint} />;
}

export function TravelTools() {
  return <FlowArchitecture blueprint={travelBlueprint} />;
}
