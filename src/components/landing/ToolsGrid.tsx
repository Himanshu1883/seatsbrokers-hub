import { useEffect, useRef, useState, type ReactNode, type RefObject } from "react";
import type { LucideIcon } from "lucide-react";
import {
  ArrowRight,
  BadgeCheck,
  BarChart3,
  Building2,
  CalendarDays,
  Car,
  ChevronDown,
  Check,
  CreditCard,
  FileSpreadsheet,
  FileText,
  GitCompareArrows,
  Globe2,
  Handshake,
  Layers,
  Link2,
  ListChecks,
  LineChart,
  Network,
  Package,
  Percent,
  Play,
  Radio,
  RefreshCw,
  Settings2,
  Share2,
  ShieldCheck,
  Sparkles,
  Ticket,
  Wallet,
} from "lucide-react";
import { Reveal, useInView } from "@/hooks/use-scroll-motion";
import { SectionBackdrop } from "@/components/landing/SectionBackdrop";
import { ConsoleShell } from "@/components/pages/brokers/ConsoleShell";
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
import { brand } from "@/content/site";
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

const sellerSystems: { icon: LucideIcon; label: string; hint: string }[] = [
  { icon: Settings2, label: "Broker POS", hint: "Point of sale" },
  { icon: FileSpreadsheet, label: "Inventory systems", hint: "Stock databases" },
  { icon: BarChart3, label: "Internal ERP", hint: "Back-office" },
  { icon: Handshake, label: "Partner systems", hint: "Wholesalers and suppliers" },
  { icon: Link2, label: "SeatsBrokers API", hint: "Direct integration" },
];

const sellerConnect: { icon: LucideIcon; label: string }[] = [
  { icon: Link2, label: "API management" },
  { icon: Layers, label: "Data mapping" },
  { icon: ShieldCheck, label: "Security" },
  { icon: Network, label: "Scalable infrastructure" },
];

const sellerModules: {
  n: string;
  icon: LucideIcon;
  title: string;
  product?: string;
  event: string;
  features: readonly string[];
}[] = [
  {
    n: "01",
    icon: Ticket,
    title: "Inventory layer",
    product: modules.source.name,
    event: "stock.push → live availability",
    features: ["Live stock ingest", "Section and qty map", "Price held in £", "Availability sync"],
  },
  {
    n: "02",
    icon: Share2,
    title: "Marketplace distribution",
    event: "list.once → 16 channels",
    features: ["List once", "16 connected channels", "Qty kept in sync", "Status mirrored"],
  },
  {
    n: "03",
    icon: RefreshCw,
    title: "Order sync",
    event: "order.sold → auto delist",
    features: ["Sale captured", "Auto delist", "Oversell blocked", "Stock written back"],
  },
  {
    n: "04",
    icon: LineChart,
    title: "AI pricing",
    product: modules.pulse.name,
    event: "price.signal → rec ready",
    features: ["Live market signal", "Rec ready", "You approve", "Price syncs out"],
  },
  {
    n: "05",
    icon: Package,
    title: "Delivery",
    event: "fulfil.update → sla sync",
    features: ["Central queue", "SLA tracking", "Status to channels", "Fulfilment updates"],
  },
  {
    n: "06",
    icon: Wallet,
    title: "Payment flows",
    product: modules.funds.name,
    event: "payout.batch → settled in £",
    features: ["Payment rails", "Settle in £", "Multi-currency", "Partner payouts"],
  },
];

const sellerIngest: { src: string; event: string }[] = [
  { src: "Broker POS", event: "pos.qty → engine" },
  { src: "Inventory systems", event: "stock.push → mapping" },
  { src: "Internal ERP", event: "erp.price → sync" },
  { src: "Partner systems", event: "partner.feed → ingest" },
  { src: "SeatsBrokers API", event: "api.hook → live" },
];

const sellerDataLayer = ["Inventory", "Pricing", "Orders", "Delivery", "Settlement"] as const;

const sellerDataMap = [0, 0, 2, 1, 3, 4] as const;

const sellerChannels: readonly { id: string; icon: LucideIcon; label: string }[] = [
  { id: "seatpick", icon: Ticket, label: "SeatPick" },
  { id: "hello-tickets", icon: Handshake, label: "Hello Tickets" },
  { id: "stubhub", icon: Globe2, label: "Stubhub" },
  { id: "1boxoffice", icon: Building2, label: "1BoxOffice" },
  { id: "seatslink", icon: Link2, label: "SeatsLink" },
];

const sellerBuyers: { icon: LucideIcon; label: string }[] = [
  { icon: BadgeCheck, label: "Sports" },
  { icon: Radio, label: "Music" },
  { icon: Building2, label: "Theatre" },
  { icon: CalendarDays, label: "Events" },
  { icon: Sparkles, label: "Experiences" },
];

const sellerSteps: { n: string; icon: LucideIcon; title: string; body: string }[] = [
  {
    n: "01",
    icon: FileSpreadsheet,
    title: "Inventory ingest",
    body: "Connect the systems you already run. Inventory is imported into SeatsBrokers in real time — tickets, sections, quantity and price.",
  },
  {
    n: "02",
    icon: Share2,
    title: "List & distribute",
    body: "List once. Inventory is pushed across 16 connected marketplaces, with quantity, price and status kept in sync.",
  },
  {
    n: "03",
    icon: RefreshCw,
    title: "Order captured",
    body: "When a ticket sells on any channel, SeatsBrokers updates stock and removes the other listings so you cannot oversell.",
  },
  {
    n: "04",
    icon: LineChart,
    title: "AI pricing",
    body: `${modules.pulse.name} turns live market data into recommendations. You approve; the new price is synchronized everywhere.`,
  },
  {
    n: "05",
    icon: Package,
    title: "Deliver",
    body: "Delivery sits in one central queue with SLA tracking. Status is written back to every marketplace from the same desk.",
  },
  {
    n: "06",
    icon: CreditCard,
    title: "Settle",
    body: `${modules.funds.name} processes payments in £ and other currencies, then settles eligible partners through the same infrastructure.`,
  },
];

const sellerHighlights: { icon: LucideIcon; label: string }[] = [
  { icon: Globe2, label: "165 countries" },
  { icon: Network, label: "16 connected marketplaces" },
  { icon: RefreshCw, label: "Real-time sync" },
  { icon: ShieldCheck, label: "Secure & scalable" },
  { icon: BarChart3, label: "Maximize reach, minimize work" },
];

function usePrefersReducedMotion() {
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => setReduced(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

  return reduced;
}

function useSellerCycle(length: number, ms: number, enabled: boolean) {
  const [active, setActive] = useState(0);

  useEffect(() => {
    if (!enabled || length <= 1) return;
    const id = window.setInterval(() => {
      setActive((i) => (i + 1) % length);
    }, ms);
    return () => window.clearInterval(id);
  }, [length, ms, enabled]);

  return active;
}

function StoHop({ twoWay }: { twoWay?: boolean }) {
  return (
    <span className="sto-hop" data-two-way={twoWay ? "true" : "false"} aria-hidden>
      <svg className="sto-hop-svg" viewBox="0 0 100 12" preserveAspectRatio="none">
        <line
          x1="8"
          y1="6"
          x2="92"
          y2="6"
          pathLength="100"
          stroke="currentColor"
          strokeWidth="2"
          strokeDasharray="10 8"
          strokeLinecap="butt"
        />
      </svg>
      {twoWay ? <b className="sto-hop-cap is-start" /> : null}
      <b className="sto-hop-cap is-end" />
      <span className="sto-hop-packet" />
      <span className="sto-hop-packet is-follow" />
      {twoWay ? <span className="sto-hop-packet is-rev" /> : null}
    </span>
  );
}

function StoBuyHop() {
  return (
    <span className="sto-buy-hop" aria-hidden>
      <svg className="sto-buy-svg" viewBox="0 0 12 40" preserveAspectRatio="none">
        <line
          x1="6"
          y1="4"
          x2="6"
          y2="28"
          pathLength="100"
          stroke="currentColor"
          strokeWidth="2"
          strokeDasharray="10 8"
          strokeLinecap="butt"
        />
      </svg>
      <b className="sto-hop-cap is-end" />
      <span className="sto-hop-packet" />
      <span className="sto-hop-packet is-follow" />
    </span>
  );
}

type StoCardBox = {
  l: number;
  t: number;
  r: number;
  b: number;
  cx: number;
  cy: number;
};

function stoCardBox(el: Element, origin: DOMRect): StoCardBox {
  const b = el.getBoundingClientRect();
  return {
    l: b.left - origin.left,
    t: b.top - origin.top,
    r: b.right - origin.left,
    b: b.bottom - origin.top,
    cx: b.left - origin.left + b.width / 2,
    cy: b.top - origin.top + b.height / 2,
  };
}

function stoFlowPath(cards: StoCardBox[]) {
  const [c1, c2, c3, c4, c5, c6] = cards;
  if (!c1 || !c2 || !c3 || !c4 || !c5 || !c6) return null;

  const n = (v: number) => Math.round(v * 10) / 10;
  const colGap = Math.max(8, c2.l - c1.r);
  const cap = Math.max(6, Math.min(10, colGap * 0.42));
  const hop = (a: StoCardBox, b: StoCardBox) =>
    `M ${n(a.r)} ${n(a.cy)} H ${n(b.l - cap)}`;
  const singleRow = Math.abs(c1.cy - c6.cy) < 16;

  if (singleRow) {
    const hops = [c1, c2, c3, c4, c5]
      .map((card, index) => hop(card, cards[index + 1]!))
      .join(" ");
    return {
      hops,
      wrap: "",
      motion: hops,
      restX: n((c3.r + c4.l) / 2),
      restY: n(c3.cy),
    };
  }

  const rowGap = Math.max(1, c4.t - c3.b);
  const yMid = n(c3.b + rowGap / 2);
  const yTop = n(c3.cy);
  const yBot = n(c4.cy);
  const stub = Math.max(16, Math.min(24, c4.l * 0.2));
  const r = Math.max(
    10,
    Math.min(16, stub - cap, rowGap * 0.55, (yBot - yMid) * 0.38, (yMid - yTop) * 0.38),
  );
  const xRight = n(c3.r + stub);
  const xLeft = n(c4.l - stub);
  const hops = `${hop(c1, c2)} ${hop(c2, c3)} ${hop(c4, c5)} ${hop(c5, c6)}`;
  const wrap = [
    `M ${n(c3.r)} ${yTop}`,
    `H ${n(xRight - r)}`,
    `A ${r} ${r} 0 0 1 ${xRight} ${n(yTop + r)}`,
    `V ${n(yMid - r)}`,
    `A ${r} ${r} 0 0 1 ${n(xRight - r)} ${yMid}`,
    `H ${n(xLeft + r)}`,
    `A ${r} ${r} 0 0 0 ${xLeft} ${n(yMid + r)}`,
    `V ${n(yBot - r)}`,
    `A ${r} ${r} 0 0 0 ${n(xLeft + r)} ${yBot}`,
    `H ${n(c4.l - cap)}`,
  ].join(" ");

  return {
    hops,
    wrap,
    motion: `${hops} ${wrap}`,
    restX: n((xLeft + xRight) / 2),
    restY: yMid,
  };
}

function StoProcessFlow({
  hostRef,
  live,
}: {
  hostRef: RefObject<HTMLDivElement | null>;
  live: boolean;
}) {
  const [flow, setFlow] = useState<{
    w: number;
    h: number;
    hops: string;
    wrap: string;
    motion: string;
    restX: number;
    restY: number;
  } | null>(null);

  useEffect(() => {
    const host = hostRef.current;
    if (!host) return;

    const measure = () => {
      const cards = [...host.querySelectorAll(":scope .sto-step")];
      if (cards.length !== 6) return;
      const origin = host.getBoundingClientRect();
      if (origin.width < 40 || origin.height < 40) return;
      const boxes = cards.map((el) => stoCardBox(el, origin));
      const next = stoFlowPath(boxes);
      if (!next) return;
      setFlow({ w: origin.width, h: origin.height, ...next });
    };

    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(host);
    const steps = host.querySelector(":scope .sto-steps");
    if (steps) ro.observe(steps);
    host.querySelectorAll(":scope .sto-step").forEach((el) => ro.observe(el));
    window.addEventListener("resize", measure);
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", measure);
    };
  }, [hostRef]);

  if (!flow) return <div className="sto-flow" aria-hidden />;

  return (
    <div className="sto-flow" aria-hidden>
      <svg
        className="sto-flow-svg"
        viewBox={`0 0 ${flow.w} ${flow.h}`}
        preserveAspectRatio="xMinYMin meet"
      >
        <defs>
          <marker
            id="sto-flow-arrow"
            markerWidth="8"
            markerHeight="8"
            refX="7"
            refY="4"
            orient="auto"
            markerUnits="userSpaceOnUse"
          >
            <path d="M0 1.1 L7.2 4 L0 6.9 Z" fill="currentColor" />
          </marker>
        </defs>
        <path
          d={flow.hops}
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeDasharray="10 8"
          strokeLinecap="butt"
          strokeLinejoin="round"
          vectorEffect="non-scaling-stroke"
          markerEnd="url(#sto-flow-arrow)"
        />
        {flow.wrap ? (
          <path
            d={flow.wrap}
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeDasharray="10 8"
            strokeLinecap="butt"
            strokeLinejoin="round"
            vectorEffect="non-scaling-stroke"
            markerEnd="url(#sto-flow-arrow)"
          />
        ) : null}
        <circle r="3.2" fill="currentColor" cx={live ? 0 : flow.restX} cy={live ? 0 : flow.restY}>
          {live ? (
            <animateMotion dur="9s" repeatCount="indefinite" path={flow.motion} />
          ) : null}
        </circle>
        {live ? (
          <circle r="3.2" fill="currentColor">
            <animateMotion
              dur="9s"
              begin="-4.5s"
              repeatCount="indefinite"
              path={flow.motion}
            />
          </circle>
        ) : null}
      </svg>
    </div>
  );
}

function StoVLink({ label, reverse }: { label: string; reverse?: boolean }) {
  return (
    <div className="sto-vlink" aria-hidden>
      <span className="sto-vlink-line" />
      <span className="sto-vlink-packet" />
      <span className="sto-vlink-packet is-follow" />
      {reverse ? <span className="sto-vlink-packet is-rev" /> : null}
      <span className="sto-join">
        {reverse ? <GitCompareArrows strokeWidth={1.75} /> : <ArrowRight strokeWidth={1.75} />}
        <span>{label}</span>
      </span>
    </div>
  );
}

export function SellerTools() {
  const { ref, inView } = useInView<HTMLDivElement>(0.14, { once: false });
  const reduced = usePrefersReducedMotion();
  const live = inView && !reduced;
  const processRef = useRef<HTMLDivElement>(null);
  const activeMod = useSellerCycle(sellerModules.length, 2600, live);
  const ingestTick = useSellerCycle(sellerIngest.length, 1800, live);
  const ingest = sellerIngest[ingestTick] ?? sellerIngest[0]!;

  return (
    <section
      id="sellers"
      className="sto-section section-curve relative isolate scroll-mt-24 bg-background py-16 sm:py-24"
      aria-labelledby="sellers-title"
    >
      <SectionBackdrop image="concertCrowd" tone="light" strength={0.08} />
      <div className="container-page relative z-10">
        <Reveal>
          <header className="sto-head">
            <div className="sto-head-copy">
              <p className="section-eyebrow text-primary">{brand.name}</p>
              <h2 id="sellers-title">Marketplace connectivity and orchestration engine</h2>
            </div>
            <p className="sto-tagline">Connect. List. Sync. Sell. Everywhere.</p>
          </header>
        </Reveal>

        <p className="sto-lead">
          Keep the POS, inventory and ERP you already run. {brand.name} sits in the middle:
          one inventory layer, listed across connected marketplaces, with orders, pricing,
          delivery and settlement kept in sync.
        </p>

        <div
          ref={ref}
          data-live={live ? "true" : "false"}
          data-step={String(activeMod)}
          className="sto-board"
        >
          <div className="sto-diagram">
            <aside className="sto-rail-in">
              <header className="sto-rail-head">
                <p className="sto-kicker">Broker systems</p>
                <h3 className="sto-rail-title">Your existing infrastructure</h3>
                <p className="sto-ingest-line font-mono" aria-live="polite">
                  {ingest.event}
                </p>
              </header>
              <div className="sto-sys-wrap">
                <ul className="sto-sys">
                  {sellerSystems.map((item, index) => (
                    <li
                      key={item.label}
                      className="sto-sys-item"
                      data-active={ingestTick === index ? "true" : "false"}
                    >
                      <span className="sto-sys-icon" aria-hidden>
                        <item.icon strokeWidth={1.75} />
                      </span>
                      <span>
                        <strong>{item.label}</strong>
                        <em>{item.hint}</em>
                      </span>
                      <StoHop twoWay />
                    </li>
                  ))}
                </ul>
              </div>
              <footer className="sto-rail-foot">
                <p>
                  <strong>5</strong>
                  <span>Connected systems</span>
                </p>
                <p>
                  <strong>Live</strong>
                  <span>Two-way sync</span>
                </p>
                <ul className="sto-rail-feed">
                  {sellerIngest.map((item, index) => (
                    <li key={item.src} data-active={ingestTick === index ? "true" : "false"}>
                      <strong>{item.src}</strong>
                      <em className="font-mono">{item.event}</em>
                    </li>
                  ))}
                </ul>
              </footer>
            </aside>

            <StoVLink label="Two-way sync" reverse />

            <div className="sto-core">
              <ConsoleShell
                path="seatsbrokers / sellers / orchestration"
                status="Live"
                icon={Network}
              >
                <div className="sto-desk">
                  <div className="sto-connect" data-step={String(activeMod)}>
                    <div className="sto-connect-head">
                      <p className="sto-connect-label">
                        {modules.link.name} · Connect layer
                      </p>
                      <span>Single integration layer</span>
                    </div>
                    <ul className="sto-connect-list">
                      {sellerConnect.map((item, index) => (
                        <li
                          key={item.label}
                          data-active={activeMod % sellerConnect.length === index ? "true" : "false"}
                        >
                          <item.icon strokeWidth={1.75} aria-hidden />
                          {item.label}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="sto-chevron" aria-hidden>
                    <ChevronDown strokeWidth={2.25} />
                  </div>

                  <p className="sto-mods-kicker">Core platform modules</p>
                  <ol className="sto-mods">
                    {sellerModules.map((mod, index) => (
                      <li
                        key={mod.n}
                        className="sto-mod"
                        data-n={mod.n}
                        data-active={activeMod === index ? "true" : "false"}
                      >
                        <span className="sto-mod-n font-mono">{mod.n.replace(/^0/, "")}</span>
                        <span className="sto-mod-icon" aria-hidden>
                          <mod.icon strokeWidth={1.75} />
                        </span>
                        <h3>{mod.title}</h3>
                        {mod.product ? <p className="sto-mod-product">{mod.product}</p> : null}
                        <ul className="sto-mod-feat">
                          {mod.features.map((line) => (
                            <li key={line}>
                              <Check strokeWidth={3} aria-hidden />
                              {line}
                            </li>
                          ))}
                        </ul>
                        <p className="sto-mod-event font-mono">{mod.event}</p>
                      </li>
                    ))}
                  </ol>

                  <div className="sto-data">
                    <span className="sto-data-label">Unified data layer</span>
                    <p>
                      {sellerDataLayer.map((item, index) => (
                        <span
                          key={item}
                          data-active={sellerDataMap[activeMod] === index ? "true" : "false"}
                        >
                          {index > 0 ? <i aria-hidden> · </i> : null}
                          {item}
                        </span>
                      ))}
                    </p>
                  </div>
                </div>
              </ConsoleShell>
            </div>

            <StoVLink label="Distributed out" />

            <div className="sto-right">
              <aside className="sto-rail-out">
                <header className="sto-rail-head">
                  <p className="sto-kicker">Connected marketplaces</p>
                  <h3 className="sto-rail-title">Where inventory goes</h3>
                </header>
                <div className="sto-chan-cluster">
                  <ul className="sto-channels" aria-label="Connected marketplaces">
                    {sellerChannels.map((item) => (
                      <li key={item.id} className="sto-channel" data-named="true">
                        <span className="sto-channel-icon" aria-hidden>
                          <item.icon strokeWidth={1.75} />
                        </span>
                        <span className="sto-channel-n">{item.label}</span>
                        <span className="sto-channel-live">
                          <i aria-hidden="true" />
                          Live
                        </span>
                        <StoHop />
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="sto-channel-copy">
                  <p className="sto-channel-note font-mono">16 connected marketplaces</p>
                  <p className="sto-channel-lede">
                    Listings go out through {modules.link.name} to these named channels.
                    Quantity, price and status stay in sync from one desk.
                  </p>
                </div>
              </aside>

              <StoBuyHop />

              <aside className="sto-rail-buyers">
                <header className="sto-rail-head">
                  <p className="sto-kicker">Global buyers</p>
                  <h3 className="sto-rail-title">End customers</h3>
                </header>
                <ul className="sto-buyers">
                  {sellerBuyers.map((item) => (
                    <li key={item.label}>
                      <item.icon strokeWidth={1.75} aria-hidden />
                      {item.label}
                    </li>
                  ))}
                </ul>
              </aside>
            </div>
          </div>

          <div className="sto-process" ref={processRef}>
            <ol className="sto-steps" aria-label="How the engine runs">
              {sellerSteps.map((step, index) => (
                <li
                  key={step.n}
                  className="sto-step"
                  data-n={step.n}
                  data-active={activeMod === index ? "true" : "false"}
                >
                  <span className="sto-step-n font-mono">{step.n}</span>
                  <span className="sto-step-icon" aria-hidden>
                    <step.icon strokeWidth={1.75} />
                  </span>
                  <h3>{step.title}</h3>
                  <p>{step.body}</p>
                  {index < sellerSteps.length - 1 ? (
                    <i className="sto-step-arrow" aria-hidden>
                      <span className="sto-step-packet" />
                      <span className="sto-step-packet is-follow" />
                    </i>
                  ) : null}
                </li>
              ))}
            </ol>
            <StoProcessFlow hostRef={processRef} live={live} />
          </div>
        </div>

        <ul className="sto-highlights">
          {sellerHighlights.map((item) => (
            <li key={item.label}>
              <item.icon strokeWidth={1.75} aria-hidden />
              {item.label}
            </li>
          ))}
        </ul>
        <p className="sto-close">
          One connection. One inventory layer. Multiple marketplaces. Fully synchronized.
        </p>
      </div>
    </section>
  );
}

const travelSteps = [
  { id: "select", label: "Select", icon: ListChecks, hint: "Hold listings" },
  { id: "quote", label: "Quote", icon: FileText, hint: "Write £ lines" },
  { id: "margin", label: "Margin", icon: Percent, hint: "Apply partner %" },
  { id: "share", label: "Share", icon: Share2, hint: "Send package" },
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

/** Same gauge slot on every mini so bodies share one height. */
function PipeDial({
  value,
  fill,
  locked,
}: {
  value: string;
  fill: number;
  locked?: boolean;
}) {
  return (
    <div className="tpa-dial" data-locked={locked ? "true" : "false"}>
      <span className="tpa-dial-value font-mono">{value}</span>
      <span className="tpa-dial-track" aria-hidden>
        <span style={{ transform: `scaleX(${Math.min(1, Math.max(0, fill))})` }} />
      </span>
    </div>
  );
}

export function TravelTools() {
  const { ref, inView } = useInView<HTMLDivElement>(0.12);
  const desk = useSeatMapTickets({ active: inView });
  const pipe = desk.pipeline;

  const inventoryBranch = travelBlueprint.branches[0]!;
  const marginBranch = travelBlueprint.branches[1]!;
  const quoteBranch = travelBlueprint.branches[2]!;
  const liveStep = travelSteps[pipe.stageIndex] ?? travelSteps[0];

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
      note: "Access available ticket inventory with real-time visibility on every listing.",
      metric: String(desk.selectedCount),
      metricLabel: "Selected listings",
      process: inventoryBranch.processLabel,
      body: (
        <>
          <p className="tpa-meta">
            <span>etihad · live feed</span>
            <span>{desk.selectedCount} held</span>
          </p>
          <PipeDial
            value={`${desk.selectedCount}/4`}
            fill={desk.selectedCount / 4}
            locked={desk.selectedCount > 0}
          />
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
      note: "Write selected listings into the quote sheet, priced in £ for the customer.",
      metric: formatGbpCompact(pipe.customerTotal),
      metricLabel: "Quote value",
      process: quoteBranch.processLabel,
      body: (
        <>
          <p className="tpa-meta">
            <span>{autoQuoteRef}</span>
            <span>{pipe.lines}/4 lines</span>
          </p>
          <PipeDial
            value={`${pipe.lines}/4`}
            fill={pipe.lines / 4}
            locked={pipe.lines > 0}
          />
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
      note: "Add partner margin — ticket price plus margin equals the customer price.",
      metric: `${pipe.marginPct}%`,
      metricLabel: "Partner margin",
      process: marginBranch.processLabel,
      body: (
        <>
          <p className="tpa-meta">
            <span>margin engine</span>
            <span>{pipe.marginLocked ? "applied" : "staging"}</span>
          </p>
          <PipeDial
            value={`+${pipe.marginPct}%`}
            fill={pipe.marginPct / 20}
            locked={pipe.marginLocked}
          />
          <ul className="tpa-rows">
            <PipeRow on={pipe.baseTotal > 0} label="Ticket price" value={formatGbp(pipe.baseTotal)} />
            <PipeRow
              on={pipe.marginLocked}
              label="Customer price"
              value={formatGbp(pipe.customerTotal)}
            />
            <PipeRow
              on={pipe.marginPct > 0}
              label="Margin rate"
              value={`${pipe.marginPct}%`}
            />
            <PipeRow
              on={pipe.marginLocked}
              label="Apply lock"
              value={pipe.marginLocked ? "applied" : "staging"}
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
      note: "Share the branded package — quote thread, venue map, PDF — then confirm.",
      metric: pipe.confirmed ? "Sent" : `${pipe.channels}/3`,
      metricLabel: "Channels fired",
      process: "Order, invoice & delivery",
      body: (
        <>
          <p className="tpa-meta">
            <span>output bus</span>
            <span>{pipe.confirmed ? "confirmed" : `${pipe.channels}/3 sent`}</span>
          </p>
          <PipeDial
            value={`${pipe.channels}/3`}
            fill={pipe.channels / 3}
            locked={pipe.confirmed}
          />
          <ul className="tpa-rows">
            <PipeRow
              on={pipe.channels >= 1}
              label="Quote thread"
              value={pipe.channels >= 1 ? "sent" : "queued"}
            />
            <PipeRow
              on={pipe.channels >= 2}
              label="Venue map"
              value={pipe.channels >= 2 ? "sent" : "queued"}
            />
            <PipeRow
              on={pipe.channels >= 3}
              label="Quote PDF"
              value={pipe.channels >= 3 ? "ready" : "queued"}
            />
            <PipeRow
              on={pipe.confirmed}
              label="Order confirm"
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
      className="tpa-section section-curve-sticky relative isolate scroll-mt-24 bg-background"
      aria-labelledby={`${travelBlueprint.id}-title`}
    >
      <SectionBackdrop image={travelBlueprint.backdrop} tone="light" strength={0.1} />
      <div className="tpa-fit-zoom">
        <div className="container-page tpa-shell relative z-10">
        <Reveal className="tpa-head">
          <p className="section-eyebrow text-primary">{travelBlueprint.eyebrow}</p>
          <h2
            id={`${travelBlueprint.id}-title`}
            className="mt-4 max-w-3xl text-3xl font-bold text-foreground sm:text-4xl"
          >
            {travelBlueprint.title}
          </h2>
          <p className="tpa-lead mt-4 max-w-3xl text-sm leading-relaxed text-muted-foreground sm:text-base">
            {travelBlueprint.intro}
          </p>
        </Reveal>

        <div ref={ref} data-live={inView} className="tpa-stage">
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
            {/* <div className="tpa-scrub" aria-hidden>
              <span style={{ transform: `scaleX(${pipe.progress})` }} />
            </div> */}
          </div>

          <div className="tpa-boards">
            <div
              className="tpa-live"
              onPointerDownCapture={desk.takeControl}
              onKeyDownCapture={desk.takeControl}
            >
              <SeatMapTicketsConsole desk={desk} />
            </div>

            <div className="tpa-side">
              <div className="tpa-side-cap">
                <div className="tpa-side-cap-top">
                  <p className="tpa-side-kicker">
                    <span className="tpa-rail-dot" aria-hidden />
                    Pipeline 01–04
                  </p>
                  <p className="tpa-side-now font-mono">
                    <span>{String(pipe.stageIndex + 1).padStart(2, "0")}</span>
                    {liveStep.label}
                    {" · "}
                    Select → Quote → Margin → Share
                  </p>
                </div>
                <p className="tpa-side-run">{pipe.label}</p>
                <ol className="tpa-side-steps" aria-label="Quote pipeline steps">
                  {travelSteps.map((step, index) => {
                    const done = index < pipe.stageIndex;
                    const current = index === pipe.stageIndex;
                    return (
                      <li
                        key={step.id}
                        data-current={current ? "true" : "false"}
                        data-done={done ? "true" : "false"}
                      >
                        <span className="tpa-side-step-idx font-mono">
                          {String(index + 1).padStart(2, "0")}
                        </span>
                        <step.icon className="tpa-side-step-icon" strokeWidth={2} />
                        <strong>{step.label}</strong>
                        <em>{step.hint}</em>
                      </li>
                    );
                  })}
                </ol>
              </div>

              <div className="tpa-minis">
                {pipelineCards.map((card, index) => {
                  const state =
                    index < pipe.stageIndex ? "done" : index === pipe.stageIndex ? "live" : "queued";
                  return (
                    <div
                      key={card.id}
                      className="tpa-mini"
                      data-smt-active={state === "live" ? "true" : "false"}
                    >
                      <article className="tpa-card flex min-h-0 flex-col" data-state={state}>
                        <header className="tpa-card-head">
                          <span className="tpa-card-step font-mono">
                            {String(index + 1).padStart(2, "0")}
                          </span>
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
                    </div>
                  );
                })}
              </div>

              <div className="tpa-side-stat">
                <dl className="tpa-side-stat-grid">
                  <div>
                    <dt>Tickets held</dt>
                    <dd className="font-mono">{pipe.tickets}</dd>
                  </div>
                  <div>
                    <dt>Quote value</dt>
                    <dd className="font-mono">{formatGbpCompact(pipe.customerTotal)}</dd>
                  </div>
                  <div>
                    <dt>Margin</dt>
                    <dd className="font-mono">{pipe.marginPct}%</dd>
                  </div>
                  <div>
                    <dt>Channels</dt>
                    <dd className="font-mono">{pipe.channels}/3</dd>
                  </div>
                </dl>
                <p className="tpa-side-legend">
                  Hold inventory, write £ lines, apply partner margin, share and confirm — one
                  SeatsDeal™ desk.
                </p>
              </div>
            </div>
          </div>
        </div>
        </div>
      </div>
    </section>
  );
}
