import { useCallback, useEffect, useRef, useState } from "react";
import type { LucideIcon } from "lucide-react";
import type { MouseEvent as ReactMouseEvent, ReactNode } from "react";
import {
  ArrowRight,
  ArrowRightLeft,
  BarChart3,
  CheckCircle2,
  DollarSign,
  Landmark,
  Layers,
  RefreshCw,
  Users,
} from "lucide-react";
import { Reveal } from "@/hooks/use-scroll-motion";
import { SiteLink } from "@/components/layout/SiteLink";
import { ConsoleShell } from "@/components/pages/brokers/ConsoleShell";
import { ctas } from "@/content/site";
import { modules } from "@/content/modules";

import eventsImg from "@/assets/product-events-browser.jpg";
import analyticsImg from "@/assets/product-analytics-dashboard.png";

const AUTO_ADVANCE_MS = 5200;

const items = [
  {
    id: "event-catalog",
    icon: RefreshCw,
    tag: modules.intel.name,
    headline: "Access a structured catalog of global events",
    detail:
      "Football, rugby, cricket, tennis, Formula 1, boxing, music, theatre, arts and festivals — with onsale dates, venues and demand signals.",
    kind: "screenshot" as const,
    image: eventsImg,
    imageAlt: "SeatsBrokers event catalog with global events and onsale information",
    metric: { value: "12K+", label: "events catalogued" },
    telemetry: ["global events", "onsale dates", "venue maps"],
    hudPath: "app.seatsbrokers.com / events",
  },
  {
    id: "inventory",
    icon: Layers,
    tag: modules.source.name,
    headline: "Manage tickets, sections, rows and pricing",
    detail:
      "Quantity, prices, ticket types, delivery information, restrictions, notes and packages — managed from one centralized inventory layer.",
    kind: "desk" as const,
    desk: "source" as const,
    metric: { value: "84K+", label: "active listings" },
    telemetry: ["sections & rows", "delivery info", "restrictions"],
    hudPath: "seatsbrokers / source / inventory",
  },
  {
    id: "distribution",
    icon: DollarSign,
    tag: modules.market.name,
    headline: "List once. Distribute everywhere.",
    detail:
      "When inventory changes, SeatsBrokers synchronizes quantity, price and listing status across connected marketplaces. When a ticket sells, other listings update automatically.",
    kind: "desk" as const,
    desk: "market" as const,
    metric: { value: "16", label: "connected marketplaces" },
    telemetry: ["auto delisting", "price sync", "order sync"],
    hudPath: "seatsbrokers / market / listings",
  },
  {
    id: "ai-pricing",
    icon: BarChart3,
    tag: modules.pulse.name,
    headline: "AI recommends. You decide.",
    detail:
      "Market data analyzed into pricing recommendations with approval workflow — once approved, prices synchronize through connected marketplace infrastructure.",
    kind: "screenshot" as const,
    image: analyticsImg,
    imageAlt: "SeatsBrokers AI pricing dashboard with recommendations",
    metric: { value: "24/7", label: "pricing engine" },
    telemetry: ["market signals", "approval workflow", "auto sync"],
    hudPath: "app.seatsbrokers.com / pricing",
  },
  {
    id: "payments",
    icon: Users,
    tag: modules.funds.name,
    headline: "Integrated purchasing and payment infrastructure",
    detail:
      "Centralized balance, card management, ticket purchasing, funding workflows, transaction visibility and internal settlement — built into your ticketing workflow.",
    kind: "desk" as const,
    desk: "funds" as const,
    metric: { value: "165", label: "countries supported" },
    telemetry: ["card management", "settlement", "transaction visibility"],
    hudPath: "seatsbrokers / funds / settle",
    cta: "Become a seller",
  },
] as const;

type StatusTone = "ok" | "wait" | "hold";

const sourceRows = [
  { event: "Arsenal vs Chelsea", section: "Cat A · R12", qty: 4, price: "£186", status: "Synced" as const, tone: "ok" as const },
  { event: "UCL Final · Wembley", section: "Club L · R8", qty: 2, price: "£248", status: "Synced" as const, tone: "ok" as const },
  { event: "Oasis · Wembley", section: "Upper · 102", qty: 6, price: "£92", status: "Hold" as const, tone: "hold" as const },
  { event: "F1 Silverstone", section: "Grandstand C", qty: 3, price: "£310", status: "Synced" as const, tone: "ok" as const },
] as const;

const sourceHolds = [
  { label: "Oasis · Upper 102", qty: "× 6", note: "Delivery pending" },
  { label: "Cat A · Lower", qty: "× 2", note: "Package hold" },
  { label: "Club L · R8", qty: "× 2", note: "Mapped" },
] as const;

const marketRows = [
  { channel: "SeatPick", qty: 2, ask: "£248", status: "Live" as const, tone: "ok" as const },
  { channel: "Hello Tickets", qty: 2, ask: "£248", status: "Live" as const, tone: "ok" as const },
  { channel: "Stubhub", qty: 2, ask: "£248", status: "Sync" as const, tone: "wait" as const },
  { channel: "1BoxOffice", qty: 2, ask: "£248", status: "Live" as const, tone: "ok" as const },
  { channel: "Direct API", qty: 2, ask: "£248", status: "Live" as const, tone: "ok" as const },
  { channel: "Partner feed", qty: 2, ask: "£248", status: "Hold" as const, tone: "hold" as const },
] as const;

const fundsRows = [
  { partner: "London desk", rail: "Bank", amount: "£12,480", status: "Settled" as const, tone: "ok" as const },
  { partner: "Dubai desk", rail: "Card", amount: "£8,240", status: "Posted" as const, tone: "wait" as const },
  { partner: "New York desk", rail: "Bank", amount: "£4,160", status: "Pending" as const, tone: "hold" as const },
  { partner: "India desk", rail: "Standard", amount: "£6,920", status: "Settled" as const, tone: "ok" as const },
] as const;

const fundsRails = [
  { label: "Standard", hint: "Bank · no extra payout fee", state: "Ready" },
  { label: "USDT / crypto", hint: "On-chain · extra crypto fee", state: "Armed" },
] as const;

function TksStatus({ tone, children }: { tone: StatusTone; children: string }) {
  return (
    <span className="tks-status" data-tone={tone}>
      {children}
    </span>
  );
}

function TksDesk({
  path,
  icon,
  children,
}: {
  path: string;
  icon: LucideIcon;
  children: ReactNode;
}) {
  return (
    <div className="tks-desk">
      <ConsoleShell path={path} status="Ready" icon={icon}>
        {children}
      </ConsoleShell>
    </div>
  );
}

function SourceDesk() {
  return (
    <TksDesk path="seatsbrokers / source / inventory" icon={Layers}>
      <div className="tks-body">
        <div className="tks-stats">
          <div className="lc-stat">
            <span className="lc-stat-label">Ingest</span>
            <strong className="lc-stat-value">4 events</strong>
          </div>
          <div className="lc-stat">
            <span className="lc-stat-label">Listed</span>
            <strong className="lc-stat-value">15 seats</strong>
          </div>
          <div className="lc-stat">
            <span className="lc-stat-label">Holds</span>
            <strong className="lc-stat-value">2 open</strong>
          </div>
        </div>

        <div className="tks-context">
          <div className="tks-context-copy">
            <p className="tks-kicker">Inventory ingest</p>
            <p className="tks-title">Arsenal vs Chelsea · Emirates</p>
          </div>
          <span className="tks-chip">Cat A × 4</span>
        </div>

        <div className="tks-work">
          <section className="lc-panel tks-panel">
            <header className="lc-panel-head">
              Listings
              <span className="lc-panel-badge">Section · qty · £</span>
            </header>
            <table className="tks-table">
              <thead>
                <tr>
                  <th>Event</th>
                  <th className="tks-col-section">Section</th>
                  <th className="tks-num">Qty</th>
                  <th className="tks-num">Price</th>
                  <th>Sync</th>
                </tr>
              </thead>
              <tbody>
                {sourceRows.map((row) => (
                  <tr key={row.event}>
                    <td className="tks-event">{row.event}</td>
                    <td className="tks-col-section">{row.section}</td>
                    <td className="tks-num">{row.qty}</td>
                    <td className="tks-num tks-ask">{row.price}</td>
                    <td>
                      <span className="tks-sync">
                        {row.tone === "ok" ? (
                          <CheckCircle2 className="tks-tick" aria-hidden />
                        ) : (
                          <span className="tks-tick-hold" aria-hidden />
                        )}
                        <span className="tks-sync-label">{row.status}</span>
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </section>

          <section className="lc-panel tks-panel tks-side">
            <header className="lc-panel-head">
              <span className="lc-panel-dot" />
              Map & holds
            </header>
            <svg className="tks-map" viewBox="0 0 160 92" aria-hidden>
              <rect x="48" y="28" width="64" height="38" rx="4" className="tks-map-pitch" />
              <rect x="8" y="8" width="144" height="16" rx="3" className="tks-map-block tks-map-hot" />
              <rect x="8" y="68" width="144" height="16" rx="3" className="tks-map-block" />
              <rect x="8" y="28" width="36" height="38" rx="3" className="tks-map-block" />
              <rect x="116" y="28" width="36" height="38" rx="3" className="tks-map-block tks-map-hold" />
              <text x="80" y="19" textAnchor="middle">
                Cat A
              </text>
              <text x="80" y="79" textAnchor="middle">
                Upper
              </text>
              <text x="26" y="50" textAnchor="middle">
                Club
              </text>
              <text x="134" y="50" textAnchor="middle">
                Hold
              </text>
            </svg>
            <ul className="tks-holds">
              {sourceHolds.map((hold) => (
                <li key={hold.label}>
                  <strong>{hold.label}</strong>
                  <span>{hold.qty}</span>
                  <em>{hold.note}</em>
                </li>
              ))}
            </ul>
          </section>
        </div>
      </div>
    </TksDesk>
  );
}

function MarketDesk() {
  return (
    <TksDesk path="seatsbrokers / market / listings" icon={ArrowRightLeft}>
      <div className="tks-body">
        <div className="tks-stats">
          <div className="lc-stat">
            <span className="lc-stat-label">Channels</span>
            <strong className="lc-stat-value">6 live</strong>
          </div>
          <div className="lc-stat">
            <span className="lc-stat-label">Ask</span>
            <strong className="lc-stat-value">£248</strong>
          </div>
          <div className="lc-stat">
            <span className="lc-stat-label">Delist</span>
            <strong className="lc-stat-value">Auto</strong>
          </div>
        </div>

        <div className="tks-context">
          <div className="tks-context-copy">
            <p className="tks-kicker">Listing INV-4402</p>
            <p className="tks-title">Champions League Final · Club Level</p>
          </div>
          <span className="tks-chip">Qty 2</span>
        </div>

        <div className="tks-work">
          <section className="lc-panel tks-panel">
            <header className="lc-panel-head">
              Channels
              <span className="lc-panel-badge">Price · qty mirrored</span>
            </header>
            <table className="tks-table">
              <thead>
                <tr>
                  <th>Channel</th>
                  <th className="tks-num">Qty</th>
                  <th className="tks-num">Ask</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {marketRows.map((row) => (
                  <tr key={row.channel}>
                    <td className="tks-event">{row.channel}</td>
                    <td className="tks-num">{row.qty}</td>
                    <td className="tks-num tks-ask">{row.ask}</td>
                    <td>
                      <TksStatus tone={row.tone}>{row.status}</TksStatus>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </section>

          <section className="lc-panel tks-panel tks-side">
            <header className="lc-panel-head">
              <span className="lc-panel-dot" />
              Mirror
            </header>
            <ul className="tks-mirror">
              <li>
                <span>Qty</span>
                <strong>2</strong>
                <em>Same on every channel</em>
              </li>
              <li>
                <span>Ask</span>
                <strong>£248</strong>
                <em>Price sync ready</em>
              </li>
              <li>
                <span>Sold</span>
                <strong>Auto-delist</strong>
                <em>Other listings update</em>
              </li>
            </ul>
          </section>
        </div>
      </div>
    </TksDesk>
  );
}

function FundsDesk() {
  return (
    <TksDesk path="seatsbrokers / funds / settle" icon={Landmark}>
      <div className="tks-body">
        <div className="tks-stats">
          <div className="lc-stat">
            <span className="lc-stat-label">Available</span>
            <strong className="lc-stat-value">£125,430</strong>
          </div>
          <div className="lc-stat">
            <span className="lc-stat-label">Pending</span>
            <strong className="lc-stat-value">£18,245</strong>
          </div>
          <div className="lc-stat">
            <span className="lc-stat-label">Rails</span>
            <strong className="lc-stat-value">2 ready</strong>
          </div>
        </div>

        <div className="tks-context">
          <div className="tks-context-copy">
            <p className="tks-kicker">Partner settle</p>
            <p className="tks-title">SeatsFunds™ vault · sterling & on-chain</p>
          </div>
          <span className="tks-chip">Ready</span>
        </div>

        <div className="tks-work">
          <section className="lc-panel tks-panel">
            <header className="lc-panel-head">
              Settlements
              <span className="lc-panel-badge">£ posted</span>
            </header>
            <table className="tks-table">
              <thead>
                <tr>
                  <th>Partner</th>
                  <th>Rail</th>
                  <th className="tks-num">Amount</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {fundsRows.map((row) => (
                  <tr key={row.partner}>
                    <td className="tks-event">{row.partner}</td>
                    <td>{row.rail}</td>
                    <td className="tks-num tks-ask">{row.amount}</td>
                    <td>
                      <TksStatus tone={row.tone}>{row.status}</TksStatus>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </section>

          <section className="lc-panel tks-panel tks-side">
            <header className="lc-panel-head">
              <span className="lc-panel-dot" />
              Payment rails
            </header>
            <ul className="tks-rails">
              {fundsRails.map((rail) => (
                <li key={rail.label}>
                  <strong>{rail.label}</strong>
                  <span className="tks-status" data-tone="ok">
                    {rail.state}
                  </span>
                  <em>{rail.hint}</em>
                </li>
              ))}
            </ul>
          </section>
        </div>
      </div>
    </TksDesk>
  );
}

function ToolkitRevealBody({
  item,
  interactive = true,
}: {
  item: (typeof items)[number];
  interactive?: boolean;
}) {
  return (
    <>
      <p className="max-w-md pt-3 text-sm leading-relaxed text-background/80">{item.detail}</p>
      <div className="flex flex-wrap items-center gap-x-4 gap-y-2 pt-4">
        {item.telemetry.map((t) => (
          <span key={t} className="toolkit-telemetry font-mono">
            {t}
          </span>
        ))}
      </div>
      {"cta" in item && item.cta ? (
        <SiteLink
          to={ctas.becomeSeller.to}
          tabIndex={interactive ? undefined : -1}
          className="lift mt-4 inline-flex items-center gap-2 rounded-full bg-primary px-5 py-2.5 text-sm font-bold text-primary-foreground"
        >
          {item.cta}
          <ArrowRight className="size-4" aria-hidden />
        </SiteLink>
      ) : null}
    </>
  );
}

function MockSurface({ item }: { item: (typeof items)[number] }) {
  if (item.kind === "screenshot") {
    return (
      <img
        src={item.image}
        alt={item.imageAlt}
        loading="eager"
        decoding="async"
        className="size-full bg-background object-cover object-top"
      />
    );
  }
  if (item.desk === "source") return <SourceDesk />;
  if (item.desk === "market") return <MarketDesk />;
  return <FundsDesk />;
}

export function ToolkitShowcase() {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const stackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (paused) return;
    const id = window.setInterval(
      () => setActive((prev) => (prev + 1) % items.length),
      AUTO_ADVANCE_MS,
    );
    return () => window.clearInterval(id);
  }, [paused, active]);

  const handleParallax = useCallback((e: ReactMouseEvent<HTMLDivElement>) => {
    const el = stackRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    el.style.setProperty("--tk-px", ((e.clientX - rect.left) / rect.width - 0.5).toFixed(3));
    el.style.setProperty("--tk-py", ((e.clientY - rect.top) / rect.height - 0.5).toFixed(3));
  }, []);

  const resetParallax = useCallback(() => {
    const el = stackRef.current;
    if (!el) return;
    el.style.setProperty("--tk-px", "0");
    el.style.setProperty("--tk-py", "0");
  }, []);

  const activeItem = items[active] ?? items[0];

  return (
    <section
      id="platform-toolkit"
      className="toolkit section-curve-sticky relative isolate scroll-mt-24 overflow-hidden text-background min-h-0 flex flex-col py-10 sm:py-12 lg:py-14"
      aria-label="Platform toolkit"
    >
      <span className="toolkit-bg-grid" aria-hidden />
      <span className="toolkit-bg-scan" aria-hidden />

      <div className="container-page relative z-10 flex min-h-0 flex-1 flex-col">
        <Reveal>
          <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-2xl">
              <p className="flex items-center gap-2 section-eyebrow text-primary">
                <span className="toolkit-live-dot" aria-hidden />
                Broker platform
              </p>
              <h2 className="mt-3 font-display text-[clamp(1.75rem,4vw,2.75rem)] font-bold leading-[1.08] tracking-tight">
                Manage your operation.{" "}
                <span className="text-primary">Distribute everywhere.</span>
              </h2>
            </div>
            <p className="max-w-md text-sm leading-relaxed text-background/75 lg:text-right lg:text-[15px]">
              Event catalog, inventory management, marketplace distribution, AI pricing and payment
              infrastructure — the modules brokers use to run their entire ticket business.
            </p>
          </div>
        </Reveal>

        <div
          className="toolkit-stage mt-8 grid min-h-0 min-w-0 flex-1 gap-10 lg:mt-10 lg:grid-cols-[minmax(0,0.92fr)_minmax(0,1.15fr)] lg:gap-10 xl:gap-14"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
          onFocusCapture={() => setPaused(true)}
          onBlurCapture={(e) => {
            if (!e.currentTarget.contains(e.relatedTarget as Node)) setPaused(false);
          }}
        >
          {/* Rail height is the tallest state: all headlines + overlaid reveal copy. */}
          <div className="toolkit-rail-lock">
            <ul className="toolkit-rail-ghost toolkit-rail-list flex min-h-0 flex-col" aria-hidden inert>
              {items.map((item) => {
                const Icon = item.icon;
                return (
                  <li key={item.id} className="toolkit-step relative pl-6" data-state="idle">
                    <span className="toolkit-step-button w-full py-4 text-left sm:py-5 lg:py-3.5 xl:py-4">
                      <span className="toolkit-chip">
                        <Icon className="size-3.5" strokeWidth={2} aria-hidden />
                        {item.tag}
                      </span>
                      <p className="toolkit-headline mt-3 font-display text-lg font-bold leading-snug tracking-tight sm:text-xl">
                        {item.headline}
                      </p>
                    </span>
                  </li>
                );
              })}
              <li className="toolkit-reveal-slot relative pl-6">
                <div className="toolkit-reveal-ghost-slot">
                  {items.map((item) => (
                    <div key={item.id} className="toolkit-reveal-ghost-panel">
                      <ToolkitRevealBody item={item} />
                    </div>
                  ))}
                </div>
              </li>
            </ul>

            <ul
              className="toolkit-rail-list flex min-h-0 flex-col"
              role="tablist"
              aria-label="Platform modules"
            >
              {items.map((item, i) => {
                const state = i === active ? "active" : i < active ? "done" : "idle";
                const Icon = item.icon;
                return (
                  <li key={item.id} className="toolkit-step relative pl-6" data-state={state}>
                    <span className="toolkit-rail" aria-hidden>
                      <span
                        key={`${item.id}-${active}-${paused}`}
                        className="toolkit-rail-fill"
                        style={
                          state === "active"
                            ? {
                                animationDuration: `${AUTO_ADVANCE_MS}ms`,
                                animationPlayState: paused ? "paused" : "running",
                              }
                            : undefined
                        }
                      />
                    </span>

                    <button
                      type="button"
                      role="tab"
                      id={`toolkit-tab-${item.id}`}
                      aria-selected={state === "active"}
                      aria-controls="toolkit-panel"
                      onClick={() => setActive(i)}
                      className="toolkit-step-button w-full py-4 text-left sm:py-5 lg:py-3.5 xl:py-4"
                    >
                      <span className="toolkit-chip">
                        <Icon className="size-3.5" strokeWidth={2} aria-hidden />
                        {item.tag}
                      </span>

                      <p className="toolkit-headline mt-3 font-display text-lg font-bold leading-snug tracking-tight sm:text-xl">
                        {item.headline}
                      </p>
                    </button>
                  </li>
                );
              })}
              <li className="toolkit-reveal-slot relative pl-6" role="presentation">
                {/* <div className="toolkit-reveal-ghost-slot">
                  {items.map((item, i) => (
                    <div
                      key={item.id}
                      className="toolkit-reveal-ghost-panel"
                      data-active={i === active ? "true" : "false"}
                      aria-hidden={i === active ? undefined : true}
                    >
                      <ToolkitRevealBody item={item} interactive={i === active} />
                    </div>
                  ))}
                </div> */}
              </li>
            </ul>
          </div>

          {/* Layered panel stack */}
          <div
            id="toolkit-panel"
            role="tabpanel"
            aria-labelledby={`toolkit-tab-${activeItem.id}`}
            className="toolkit-panel"
          >
            <div
              ref={stackRef}
              className="toolkit-stack relative"
              onMouseMove={handleParallax}
              onMouseLeave={resetParallax}
            >
              <span className="toolkit-ghost toolkit-layer" aria-hidden />

              <div className="toolkit-main toolkit-layer">
                <div className="toolkit-hud">
                  <span className="toolkit-hud-path font-mono text-[10px] tracking-[0.16em] text-background/55 ">
                    {items.map((item, i) => (
                      <span
                        key={item.id}
                        data-active={i === active ? "true" : "false"}
                        aria-hidden={i === active ? undefined : true}
                      >
                        {item.hudPath}
                      </span>
                    ))}
                  </span>
                  <span className="flex items-center gap-1.5 font-mono text-[10px] tracking-[0.16em] text-primary ">
                    <span className="toolkit-live-dot" aria-hidden />
                    live
                  </span>
                </div>

                <div className="toolkit-screen">
                  {items.map((item, i) => (
                    <div
                      key={item.id}
                      className="toolkit-swap-layer"
                      data-active={i === active ? "true" : "false"}
                      aria-hidden={i === active ? undefined : true}
                    >
                      <MockSurface item={item} />
                    </div>
                  ))}
                </div>

                <div className="toolkit-segments" aria-hidden>
                  {items.map((s, i) => (
                    <span
                      key={s.id}
                      className="toolkit-segment"
                      data-state={i === active ? "active" : i < active ? "done" : "idle"}
                    />
                  ))}
                </div>
              </div>

              <div className="toolkit-float toolkit-layer">
                {items.map((item, i) => (
                  <div
                    key={item.id}
                    className="toolkit-float-panel"
                    data-active={i === active ? "true" : "false"}
                    aria-hidden={i === active ? undefined : true}
                  >
                    <p className="font-display text-2xl font-bold text-primary sm:text-3xl">
                      {item.metric.value}
                    </p>
                    <p className="mt-1 font-mono text-[9px] tracking-[0.14em] text-background/70 ">
                      {item.metric.label}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <div className="toolkit-meta mt-5 flex flex-wrap items-center justify-between gap-3">
              <p className="toolkit-meta-tag font-mono text-[10px] tracking-[0.14em] text-background/55 ">
                {items.map((item, i) => (
                  <span
                    key={item.id}
                    data-active={i === active ? "true" : "false"}
                    aria-hidden={i === active ? undefined : true}
                  >
                    {item.tag} · live on SeatsBrokers inventory
                  </span>
                ))}
              </p>
              <button
                type="button"
                onClick={() => setActive((prev) => (prev + 1) % items.length)}
                className="toolkit-next inline-flex items-center gap-2 font-mono text-[10px] tracking-[0.14em] text-primary"
              >
                <span className="toolkit-next-label">
                  {items.map((item, i) => (
                    <span
                      key={item.id}
                      data-active={i === ((active + 1) % items.length) ? "true" : "false"}
                      aria-hidden={i === (active + 1) % items.length ? undefined : true}
                    >
                      next · {item.tag}
                    </span>
                  ))}
                </span>
                <ArrowRight className="size-3.5" aria-hidden />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
