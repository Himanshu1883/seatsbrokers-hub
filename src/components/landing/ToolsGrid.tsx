import type { CSSProperties, ReactNode } from "react";
import type { LucideIcon } from "lucide-react";
import {
  BadgeCheck,
  Car,
  Check,
  FileSpreadsheet,
  FileText,
  Globe2,
  Link2,
  ListChecks,
  Package,
  Percent,
  Play,
  Radio,
  Settings2,
  Share2,
} from "lucide-react";
import { Reveal, useInView } from "@/hooks/use-scroll-motion";
import { SectionBackdrop } from "@/components/landing/SectionBackdrop";
import {
  SeatMapTicketsConsole,
  autoInvoiceRef,
  autoQuoteRef,
  categoryLabel,
  formatGbp,
  formatGbpCompact,
  listingLineTotal,
  useSeatMapTickets,
} from "@/components/landing/SeatMapTicketsConsole";
import type { EventBackdropKey } from "@/lib/event-backdrops";
import { modules } from "@/content/modules";

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
  eyebrow: modules.deal.name,
  title: modules.deal.tagline,
  intro:
    "Select event, select tickets, add margin, generate quote and share with customer — PDF, invoice, WhatsApp, email or branded customer link.",
  systemName: "seatsbrokers / b2b-pipeline",
  ingestLabel: "Search layer",
  sources: [
    { icon: Globe2, label: "Event & date search", packet: "query" },
    { icon: BadgeCheck, label: "Venue & category", packet: "filter" },
    { icon: Link2, label: "Ticket type & price", packet: "catalog" },
    { icon: Car, label: "Location search", packet: "location" },
  ],
  gateway: "B2B partner portal / API",
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
      body: "Share quotes via PDF, WhatsApp, email or customer link — branded for your B2B business.",
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
      className="section-curve relative isolate scroll-mt-24 overflow-x-clip bg-background py-16 sm:py-24"
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
          className="tools-flow relative mt-12 overflow-x-clip rounded-2xl border border-border bg-surface/70 px-3 pb-6 pt-4 sm:px-6 sm:pb-8 lg:px-10 lg:pb-10"
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

const travelSteps = [
  { id: "select", label: "Select", icon: ListChecks },
  { id: "quote", label: "Quote", icon: FileText },
  { id: "margin", label: "Margin", icon: Percent },
  { id: "share", label: "Share", icon: Share2 },
] as const;

/** One fixed-height line inside a pipeline mini console. */
function PipeRow({ label, value, on }: { label: string; value: string; on: boolean }) {
  return (
    <li className="tpa-row" data-on={on ? "true" : "false"}>
      <span className="tpa-row-tick" aria-hidden>
        <Check className="size-2.5" strokeWidth={3.5} />
      </span>
      <span className="tpa-row-label">{label}</span>
      <span className="tpa-row-value font-mono">{value}</span>
    </li>
  );
}

export function TravelTools() {
  const { ref, inView } = useInView<HTMLDivElement>(0.12);
  const desk = useSeatMapTickets({ active: inView });
  const pipe = desk.pipeline;

  const inventoryBranch = travelBlueprint.branches[0]!;
  const marginBranch = travelBlueprint.branches[1]!;
  const quoteBranch = travelBlueprint.branches[2]!;
  const shareMid = travelBlueprint.midRow[0]!;

  /* Fixed slot counts keep every mini console the same height all loop long. */
  const selectSlots = Array.from({ length: 4 }, (_, index) => desk.selected[index] ?? null);
  const quoteSlots = Array.from({ length: 4 }, (_, index) =>
    index < pipe.lines ? desk.selected[index] ?? null : null,
  );

  const pipelineCards: {
    id: string;
    title: string;
    icon: LucideIcon;
    note: string;
    metric: string;
    metricLabel: string;
    process: string;
    body: ReactNode;
  }[] = [
    {
      id: "select",
      title: inventoryBranch.cardTitle,
      icon: ListChecks,
      note:
        desk.selectedCount > 0
          ? `${desk.selectedCount} listing${desk.selectedCount === 1 ? "" : "s"} held from live Etihad inventory — ${pipe.tickets} tickets.`
          : inventoryBranch.cardBody,
      metric: String(desk.selectedCount),
      metricLabel: "Selected listings",
      process: inventoryBranch.processLabel,
      body: (
        <>
          <p className="tpa-meta">
            <span>etihad · live feed</span>
            <span>{desk.selectedCount} held</span>
          </p>
          <ul className="tpa-rows">
            {selectSlots.map((row, index) => (
              <PipeRow
                key={row ? row.id : `select-slot-${index}`}
                on={Boolean(row)}
                label={row ? `${row.qty} × ${categoryLabel(row.category)}` : "Awaiting row"}
                value={row ? formatGbp(row.basePrice) : "—"}
              />
            ))}
          </ul>
          <p className="tpa-foot">
            <span>Tickets held</span>
            <strong>{pipe.tickets}</strong>
          </p>
        </>
      ),
    },
    {
      id: "quote",
      title: quoteBranch.cardTitle,
      icon: FileText,
      note:
        pipe.lines > 0
          ? `${pipe.lines} of 4 lines written into ${autoQuoteRef} — priced in £.`
          : quoteBranch.cardBody,
      metric: formatGbpCompact(pipe.customerTotal),
      metricLabel: "Quote value",
      process: quoteBranch.processLabel,
      body: (
        <>
          <p className="tpa-meta">
            <span>{autoQuoteRef}</span>
            <span>{pipe.lines}/4 lines</span>
          </p>
          <ul className="tpa-rows">
            {quoteSlots.map((row, index) => (
              <PipeRow
                key={row ? `quote-${row.id}` : `quote-slot-${index}`}
                on={Boolean(row)}
                label={row ? `${row.qty} × ${categoryLabel(row.category)}` : "Line pending"}
                value={row ? formatGbp(listingLineTotal(row, pipe.pricingPct)) : "—"}
              />
            ))}
          </ul>
          <p className="tpa-foot">
            <span>Quote total</span>
            <strong>{formatGbp(pipe.customerTotal)}</strong>
          </p>
        </>
      ),
    },
    {
      id: "margin",
      title: marginBranch.cardTitle,
      icon: Percent,
      note: pipe.marginLocked
        ? `${pipe.marginPct}% partner margin applied — ticket price and margin value recalculated.`
        : pipe.marginPct > 0
          ? `Staging ${pipe.marginPct}% against ${formatGbpCompact(pipe.baseTotal)} of ticket value.`
          : marginBranch.cardBody,
      metric: `${pipe.marginPct}%`,
      metricLabel: "Partner margin",
      process: marginBranch.processLabel,
      body: (
        <>
          <p className="tpa-meta">
            <span>margin engine</span>
            <span>{pipe.marginLocked ? "applied" : "staging"}</span>
          </p>
          <div className="tpa-dial" data-locked={pipe.marginLocked ? "true" : "false"}>
            <span className="tpa-dial-value font-mono">+{pipe.marginPct}%</span>
            <span className="tpa-dial-track" aria-hidden>
              <span style={{ transform: `scaleX(${Math.min(1, pipe.marginPct / 20)})` }} />
            </span>
          </div>
          <ul className="tpa-rows">
            <PipeRow on={pipe.baseTotal > 0} label="Ticket price" value={formatGbp(pipe.baseTotal)} />
            <PipeRow
              on={pipe.marginLocked}
              label="Customer price"
              value={formatGbp(pipe.customerTotal)}
            />
          </ul>
          <p className="tpa-foot">
            <span>Margin value</span>
            <strong>{formatGbp(pipe.marginTotal)}</strong>
          </p>
        </>
      ),
    },
    {
      id: "share",
      title: "Share & confirm",
      icon: Share2,
      note: pipe.confirmed
        ? `Order confirmed and invoice ${autoInvoiceRef} issued with margin reporting.`
        : pipe.channels > 0
          ? `${pipe.channels} of 3 outputs sent from one branded package.`
          : shareMid.body,
      metric: pipe.confirmed ? "Sent" : `${pipe.channels}/3`,
      metricLabel: "Channels fired",
      process: "Order, invoice & delivery",
      body: (
        <>
          <p className="tpa-meta">
            <span>output bus</span>
            <span>{pipe.confirmed ? "confirmed" : `${pipe.channels}/3 sent`}</span>
          </p>
          <ul className="tpa-rows">
            <PipeRow
              on={pipe.channels >= 1}
              label="Quote copied to thread"
              value={pipe.channels >= 1 ? "sent" : "queued"}
            />
            <PipeRow
              on={pipe.channels >= 2}
              label="Venue map attached"
              value={pipe.channels >= 2 ? "sent" : "queued"}
            />
            <PipeRow
              on={pipe.channels >= 3}
              label="Branded quote PDF"
              value={pipe.channels >= 3 ? "ready" : "queued"}
            />
            <PipeRow
              on={pipe.confirmed}
              label="Order confirmed"
              value={pipe.confirmed ? "ok" : "—"}
            />
          </ul>
          <p className="tpa-foot">
            <span>Invoice</span>
            <strong>{pipe.confirmed ? autoInvoiceRef : "pending"}</strong>
          </p>
        </>
      ),
    },
  ];

  return (
    <section
      id={travelBlueprint.id}
      className="section-curve relative isolate scroll-mt-24 overflow-x-clip bg-background py-16 sm:py-24"
      aria-labelledby={`${travelBlueprint.id}-title`}
    >
      <SectionBackdrop image={travelBlueprint.backdrop} tone="light" strength={0.1} />
      <div className="container-page relative z-10">
        <Reveal>
          <p className="section-eyebrow text-primary">{travelBlueprint.eyebrow}</p>
          <h2
            id={`${travelBlueprint.id}-title`}
            className="mt-4 max-w-3xl text-3xl font-bold text-foreground sm:text-4xl"
          >
            {travelBlueprint.title}
          </h2>
          <p className="mt-4 max-w-3xl text-sm leading-relaxed text-muted-foreground sm:text-base">
            {travelBlueprint.intro}
          </p>
        </Reveal>

        <div
          ref={ref}
          data-live={inView}
          className="tools-flow relative mt-12 overflow-x-clip rounded-2xl border border-border bg-surface/70 px-3 pb-6 pt-4 sm:px-6 sm:pb-8 lg:px-10 lg:pb-10"
        >
          <span className="flow-corner flow-corner-tl" aria-hidden />
          <span className="flow-corner flow-corner-tr" aria-hidden />
          <span className="flow-corner flow-corner-bl" aria-hidden />
          <span className="flow-corner flow-corner-br" aria-hidden />

          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-border pb-4">
            <p className="font-mono text-[10px] tracking-[0.16em] text-muted-foreground uppercase sm:text-[11px]">
              {travelBlueprint.systemName}
            </p>
            <p className="flex items-center gap-2 font-mono text-[10px] tracking-[0.16em] text-primary uppercase sm:text-[11px]">
              <span className="flow-status-dot" aria-hidden />
              pipeline live · streaming
            </p>
          </div>

          <p className="flow-tier-label mt-6">Quote desk</p>

          <div className="tpa-rail" data-manual={pipe.manual ? "true" : "false"}>
            <div className="tpa-rail-top">
              <p className="tpa-rail-title">
                <span className="tpa-rail-dot" aria-hidden />
                Auto-run quote pipeline
              </p>
              {pipe.manual ? (
                <button type="button" className="tpa-resume" onClick={desk.resumeAuto}>
                  <Play className="size-3" strokeWidth={2.5} />
                  Resume auto-run
                </button>
              ) : (
                <span className="tpa-rail-badge font-mono">
                  {pipe.reducedMotion ? "static · reduced motion" : "self-running · no input needed"}
                </span>
              )}
            </div>
            <p className="tpa-rail-status">{pipe.label}</p>
            <ol className="smt-pipe tpa-steps" aria-label="Quote pipeline">
              {travelSteps.map((step, index) => {
                const done = index < pipe.stageIndex;
                const current = index === pipe.stageIndex;
                return (
                  <li
                    key={step.id}
                    data-current={current ? "true" : "false"}
                    data-done={done ? "true" : "false"}
                  >
                    <span>{String(index + 1).padStart(2, "0")}</span>
                    <step.icon className="tpa-step-icon size-3.5" strokeWidth={2} />
                    {step.label}
                    <i
                      className="tpa-step-fill"
                      aria-hidden
                      style={{
                        transform: `scaleX(${done ? 1 : current ? pipe.stageProgress : 0})`,
                      }}
                    />
                  </li>
                );
              })}
            </ol>
            <div className="tpa-scrub" aria-hidden>
              <span style={{ transform: `scaleX(${pipe.progress})` }} />
            </div>
          </div>

          <div onPointerDownCapture={desk.takeControl} onKeyDownCapture={desk.takeControl}>
            <SeatMapTicketsConsole desk={desk} />
          </div>

          <div className="tpa-grid mt-6 grid gap-x-4 gap-y-2 sm:grid-cols-2 lg:grid-cols-4">
            {pipelineCards.map((card, index) => {
              const state =
                index < pipe.stageIndex ? "done" : index === pipe.stageIndex ? "live" : "queued";
              return (
                <div key={card.id} className="flow-col group flex flex-col" data-smt-active={state === "live" ? "true" : "false"}>
                  <article className="tpa-card flow-card flex flex-1 flex-col" data-state={state}>
                    <header className="tpa-card-head">
                      <span className="tpa-card-step font-mono">{String(index + 1).padStart(2, "0")}</span>
                      <card.icon className="size-4 shrink-0 text-primary" strokeWidth={2} />
                      <h3>{card.title}</h3>
                      <span className="tpa-card-chip font-mono">{state}</span>
                    </header>
                    <p className="tpa-card-note">{card.note}</p>
                    <div className="tpa-card-body">{card.body}</div>
                    <div className="tpa-card-metric">
                      <span className="font-display">{card.metric}</span>
                      <span className="font-mono">{card.metricLabel}</span>
                    </div>
                  </article>
                  <div className="flow-link flow-link-short" aria-hidden>
                    <span className="flow-line-v flow-link-segment">
                      <span className="flow-pulse" />
                    </span>
                  </div>
                  <div className="flow-process rounded-lg px-3 py-2.5 text-center font-mono text-[10px] font-bold tracking-[0.12em] text-primary-foreground uppercase sm:text-[11px]">
                    {card.process}
                  </div>
                </div>
              );
            })}
          </div>

          <FlowJunction cols={4} direction="in" />

          <div className="mb-3 flex flex-wrap justify-center gap-x-6 gap-y-1">
            {travelBlueprint.terminalLines.map((line) => (
              <span key={line} className="font-mono text-[10px] tracking-[0.12em] text-muted-foreground">
                {line}
              </span>
            ))}
          </div>

          <FlowBar tone="terminal">{travelBlueprint.terminal}</FlowBar>
        </div>
      </div>
    </section>
  );
}
