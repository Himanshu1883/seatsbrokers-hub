import { useCallback, useEffect, useRef, useState } from "react";
import type { MouseEvent as ReactMouseEvent } from "react";
import {
  ArrowRight,
  BarChart3,
  DollarSign,
  Layers,
  RefreshCw,
  Users,
} from "lucide-react";
import { Reveal } from "@/hooks/use-scroll-motion";
import { SiteLink } from "@/components/layout/SiteLink";
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
    kind: "chart" as const,
    metric: { value: "84K+", label: "active listings" },
    telemetry: ["sections & rows", "delivery info", "restrictions"],
    hudPath: "app.seatsbrokers.com / inventory",
  },
  {
    id: "distribution",
    icon: DollarSign,
    tag: modules.market.name,
    headline: "List once. Distribute everywhere.",
    detail:
      "When inventory changes, SeatsBrokers synchronizes quantity, price and listing status across connected marketplaces. When a ticket sells, other listings update automatically.",
    kind: "queue" as const,
    metric: { value: "32", label: "connected marketplaces" },
    telemetry: ["auto delisting", "price sync", "order sync"],
    hudPath: "app.seatsbrokers.com / distribution",
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
    kind: "table" as const,
    metric: { value: "165", label: "countries supported" },
    telemetry: ["card management", "settlement", "transaction visibility"],
    hudPath: "app.seatsbrokers.com / payments",
    cta: "Become a seller",
  },
] as const;

function ChartMock() {
  const bars = [55, 80, 40, 95, 65, 75, 50];
  return (
    <div className="flex h-full flex-col justify-between bg-background p-5 sm:p-6">
      <div className="flex items-center justify-between gap-3">
        <span className="font-mono text-[10px] tracking-[0.18em] text-muted-foreground uppercase">
          Live price feed
        </span>
        <span className="flex items-center gap-1.5 rounded-full bg-primary/10 px-2.5 py-1 font-mono text-[10px] font-semibold text-primary">
          <span className="toolkit-live-dot" aria-hidden />
          Auto-adjusting
        </span>
      </div>
      <div className="flex h-32 items-end gap-2 sm:h-40 sm:gap-2.5">
        {bars.map((h, i) => (
          <div
            key={i}
            className="toolkit-bar flex-1 rounded-t-md bg-gradient-to-t from-primary to-primary/35"
            style={{ height: `${h}%`, animationDelay: `${i * 70}ms` }}
          />
        ))}
      </div>
      <div className="grid grid-cols-3 gap-3 border-t border-border pt-4 font-mono text-[11px]">
        <div>
          <span className="text-muted-foreground">Floor</span>
          <div className="mt-0.5 font-semibold text-foreground">$180</div>
        </div>
        <div>
          <span className="text-muted-foreground">Current</span>
          <div className="mt-0.5 font-semibold text-primary">$247 ▲</div>
        </div>
        <div>
          <span className="text-muted-foreground">Ceiling</span>
          <div className="mt-0.5 font-semibold text-foreground">$310</div>
        </div>
      </div>
    </div>
  );
}

function QueueMock() {
  const rows = [
    { evt: "Cowboys vs Eagles · Sec 214", status: "Confirmed" },
    { evt: "Coldplay World Tour · Floor B", status: "Transferred" },
    { evt: "Lakers vs Celtics · Sec 108", status: "Confirmed" },
    { evt: "F1 Grand Prix · Grandstand C", status: "Routing…" },
  ];
  return (
    <div className="flex h-full flex-col bg-background p-5 sm:p-6">
      <span className="font-mono text-[10px] tracking-[0.18em] text-muted-foreground uppercase">
        Order queue
      </span>
      <div className="mt-4 flex flex-1 flex-col justify-center gap-2.5">
        {rows.map((r, i) => (
          <div
            key={r.evt}
            className="toolkit-row flex items-center justify-between gap-3 rounded-lg border border-border bg-muted/40 px-4 py-3"
            style={{ animationDelay: `${i * 90}ms` }}
          >
            <span className="truncate font-mono text-[11px] font-medium text-foreground">
              {r.evt}
            </span>
            <span
              className={`shrink-0 rounded-full px-2.5 py-0.5 font-mono text-[10px] font-semibold ${
                r.status === "Routing…"
                  ? "bg-muted text-muted-foreground"
                  : "bg-primary/12 text-primary"
              }`}
            >
              {r.status}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

function TableMock() {
  const rows = [
    { broker: "Broker #4471", tickets: 240, margin: "18%" },
    { broker: "Broker #2093", tickets: 118, margin: "22%" },
    { broker: "Broker #5588", tickets: 76, margin: "15%" },
  ];
  return (
    <div className="flex h-full flex-col bg-background p-5 sm:p-6">
      <span className="font-mono text-[10px] tracking-[0.18em] text-muted-foreground uppercase">
        Broker-to-broker trades
      </span>
      <div className="mt-4 grid grid-cols-3 gap-2 border-b border-border pb-2 font-mono text-[10px] font-semibold tracking-wide text-muted-foreground uppercase">
        <span>Broker</span>
        <span className="text-right">Tickets</span>
        <span className="text-right">Margin</span>
      </div>
      <div className="flex-1 divide-y divide-border">
        {rows.map((r, i) => (
          <div
            key={r.broker}
            className="toolkit-row grid grid-cols-3 gap-2 py-3 font-mono text-[11px]"
            style={{ animationDelay: `${i * 90}ms` }}
          >
            <span className="font-medium text-foreground">{r.broker}</span>
            <span className="text-right text-foreground">{r.tickets}</span>
            <span className="text-right font-semibold text-primary">{r.margin}</span>
          </div>
        ))}
      </div>
    </div>
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
  if (item.kind === "chart") return <ChartMock />;
  if (item.kind === "queue") return <QueueMock />;
  return <TableMock />;
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
          className="toolkit-stage mt-8 grid min-h-0 flex-1 gap-10 lg:mt-10 lg:grid-cols-[0.92fr_1.15fr] lg:gap-10 xl:gap-14"
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
                <div className="toolkit-reveal-ghost-slot">
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
                </div>
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
                  <span className="toolkit-hud-path font-mono text-[10px] tracking-[0.16em] text-background/55 uppercase">
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
                  <span className="flex items-center gap-1.5 font-mono text-[10px] tracking-[0.16em] text-primary uppercase">
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
                    <p className="mt-1 font-mono text-[9px] tracking-[0.14em] text-background/70 uppercase">
                      {item.metric.label}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <div className="toolkit-meta mt-5 flex flex-wrap items-center justify-between gap-3">
              <p className="toolkit-meta-tag font-mono text-[10px] tracking-[0.14em] text-background/55 uppercase">
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
                className="toolkit-next inline-flex items-center gap-2 font-mono text-[10px] tracking-[0.14em] text-primary uppercase"
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
