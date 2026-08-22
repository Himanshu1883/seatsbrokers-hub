import { useEffect, useState } from "react";
import { Link } from "@tanstack/react-router";
import {
  ArrowRight,
  Briefcase,
  Globe2,
  Layers3,
  Plane,
  Radio,
  RefreshCw,
  Search,
  Sparkles,
  TrendingUp,
  Zap,
} from "lucide-react";
import { Reveal, useInView } from "@/hooks/use-scroll-motion";
import { SectionBackdrop } from "@/components/landing/SectionBackdrop";
import { ctas } from "@/content/site";

const tracks = [
  {
    id: "brokers",
    code: "Broker",
    icon: Briefcase,
    eyebrow: "Ticket brokers",
    consolePath: "seatsbrokers / broker-platform",
    consoleStatus: "Sync",
    lineA: "Run your",
    lineAccent: "ticket business",
    lineFade: "from one platform",
    title: "Run your ticket business from one technology platform",
    body: "Global event catalog, inventory management, marketplace distribution, multi-marketplace synchronization, market pricing, sales intelligence, AI pricing recommendations and POS/API integration.",
    stats: [
      { value: "Multi", label: "Connected marketplaces" },
      { value: "Live", label: "Listing sync" },
      { value: "24/7", label: "Distribution" },
    ],
    modules: ["Event catalog", "Inventory", "Distribution", "AI pricing"],
    channels: [
      { id: "gmp", label: "Global MP", listings: 842, status: "Synced" },
      { id: "stx", label: "Sports Ex", listings: 418, status: "Live" },
      { id: "bkr", label: "Broker desk", listings: 612, status: "Pushing" },
      { id: "ota", label: "Regional OTA", listings: 296, status: "Queued" },
      { id: "api", label: "POS / API", listings: 250, status: "Synced" },
      { id: "reg", label: "Resale EU", listings: 184, status: "Live" },
    ],
    syncLog: [
      { time: "09:41:02", msg: "push.listings → 8 channels", ok: true },
      { time: "09:41:03", msg: "double_sale.guard → armed", ok: true },
      { time: "09:41:04", msg: "ai.reprice → £248 ask", ok: true },
      { time: "09:41:05", msg: "hold.conflict → 0 open", ok: true },
    ],
    pricing: { ask: "£248", floor: "£185", tag: "Best", bars: [38, 52, 71, 58, 84, 62, 78, 66] },
    inventory: { total: "2,418", channels: "8", event: "UCL Final · Cat A" },
    cta: ctas.exploreBrokers.label,
    ctaTo: ctas.exploreBrokers.to,
    tiltY: -16,
    tiltZ: -2.5,
  },
  {
    id: "travel",
    code: "B2B",
    icon: Plane,
    eyebrow: "B2B partners",
    consolePath: "seatsbrokers / b2b-partners",
    consoleStatus: "Live",
    lineA: "Turn inventory",
    lineAccent: "into experience",
    lineFade: "for every customer",
    title: "Turn ticket inventory into a seamless customer experience",
    body: "Access available ticket inventory, real-time visibility, partner purchasing, ticket quotations, custom margins, customer-ready quotes, invoice generation and WhatsApp sharing.",
    stats: [
      { value: "PDF", label: "Quote share" },
      { value: "Live", label: "Inventory search" },
      { value: "One", label: "Sales workflow" },
    ],
    modules: ["Inventory access", "Margins", "Quotations", "Orders"],
    searchQuery: "Champions League Final · May 31",
    inventoryRows: [
      { section: "Cat A · Longside", seats: 2, ask: "€920", margin: "+18%" },
      { section: "Cat B · Corner", seats: 4, ask: "€640", margin: "+18%" },
    ],
    pipeline: [
      { label: "Search", detail: "12 events" },
      { label: "Margin", detail: "+18% rule" },
      { label: "Quote", detail: "PDF ready" },
      { label: "Share", detail: "WhatsApp" },
    ],
    quote: {
      event: "Champions League Final",
      venue: "Wembley · London",
      line: "Cat A · Longside lower",
      seats: 2,
      subtotal: "€1,840",
      margin: "€331",
      total: "€2,171",
    },
    cta: ctas.exploreTravel.label,
    ctaTo: ctas.exploreTravel.to,
    tiltY: 16,
    tiltZ: 2.5,
  },
] as const;

function useCycle(length: number, ms = 3200) {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced || length <= 1) return;

    const id = window.setInterval(() => {
      setActive((i) => (i + 1) % length);
    }, ms);
    return () => window.clearInterval(id);
  }, [length, ms]);

  return active;
}

function ConsoleChrome({
  path,
  status,
  icon: Icon,
}: {
  path: string;
  status: string;
  icon: typeof Briefcase;
}) {
  return (
    <header className="two-track-chrome">
      <span className="two-track-chrome-dots" aria-hidden>
        <i />
        <i />
        <i />
      </span>
      <span className="two-track-chrome-path">
        <Icon className="size-3.5" strokeWidth={1.75} />
        {path}
      </span>
      <span className="two-track-chrome-badge">
        <span className="two-track-chrome-pulse" />
        {status}
      </span>
    </header>
  );
}

function BrokerConsole({ track }: { track: (typeof tracks)[number] }) {
  if (track.id !== "brokers") return null;

  const activeModule = useCycle(track.modules.length);
  const activeChannel = useCycle(track.channels.length, 2800);
  const logRows = [...track.syncLog, ...track.syncLog];

  return (
    <div className="two-track-console two-track-console-broker">
      <div className="two-track-console-top">
        <div className="two-track-hub-panel">
          <p className="two-track-panel-kicker">
            <Globe2 className="size-3.5" /> Marketplace distribution
          </p>
          <div className="two-track-hub-viz">
            <div className="two-track-hub-viz-stage">
              <svg viewBox="0 0 200 100" className="two-track-hub-svg" aria-hidden>
                <circle cx="100" cy="50" r="38" className="two-track-orbit-ring" />
                <circle cx="100" cy="50" r="24" className="two-track-orbit-ring two-track-orbit-ring-inner" />
                {track.channels.map((_, i) => {
                  const angle = (i / track.channels.length) * Math.PI * 2 - Math.PI / 2;
                  const x = 100 + Math.cos(angle) * 38;
                  const y = 50 + Math.sin(angle) * 38;
                  return (
                    <line
                      key={i}
                      x1="100"
                      y1="50"
                      x2={x}
                      y2={y}
                      className="two-track-spoke"
                      data-active={activeChannel === i ? "true" : "false"}
                      style={{ animationDelay: `${i * 0.35}s` }}
                    />
                  );
                })}
              </svg>
              <div className="two-track-orbit-core two-track-orbit-core-sm">
                <Layers3 className="size-4" strokeWidth={1.75} />
              </div>
              {track.channels.map((ch, i) => (
                <span
                  key={ch.id}
                  className="two-track-orbit-node two-track-orbit-node-sm"
                  data-active={activeChannel === i ? "true" : "false"}
                  data-status={ch.status}
                  style={{ ["--orbit-i" as string]: i }}
                  title={ch.label}
                >
                  {ch.label.split(" ")[0]?.slice(0, 3)}
                </span>
              ))}
            </div>
          </div>
          <div className="two-track-inventory-strip">
            <span>{track.inventory.total} listings</span>
            <span className="two-track-inventory-dot" />
            <span>{track.inventory.channels} channels</span>
            <span className="two-track-inventory-dot" />
            <span>{track.inventory.event}</span>
          </div>
        </div>

        <div className="two-track-side-stack">
          <div className="two-track-log-panel">
            <p className="two-track-panel-kicker">
              <Radio className="size-3.5" /> Sync log
            </p>
            <div className="two-track-log-viewport">
              <div className="two-track-log-track">
                {logRows.map((row, i) => (
                  <div key={`${row.time}-${i}`} className="two-track-log-row" data-ok={row.ok ? "true" : "false"}>
                    <span>{row.time}</span>
                    <span>{row.msg}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="two-track-pricing-panel">
            <div className="two-track-pricing-head">
              <p className="two-track-panel-kicker">
                <TrendingUp className="size-3.5" /> AI pricing
              </p>
              <span className="two-track-best-tag">{track.pricing.tag}</span>
            </div>
            <div className="two-track-pricing-asks">
              <div>
                <span className="two-track-pricing-label">Live ask</span>
                <strong>{track.pricing.ask}</strong>
              </div>
              <div>
                <span className="two-track-pricing-label">Floor</span>
                <strong>{track.pricing.floor}</strong>
              </div>
            </div>
            <div className="two-track-pricing-bars">
              {track.pricing.bars.map((h, i) => (
                <span
                  key={i}
                  className="two-track-pricing-bar"
                  style={{ height: `${h}%`, animationDelay: `${i * 70}ms` }}
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      <ul className="two-track-module-rail">
        {track.modules.map((mod, i) => (
          <li key={mod} data-active={activeModule === i ? "true" : "false"}>
            <RefreshCw className="size-3.5" strokeWidth={2} />
            {mod}
          </li>
        ))}
      </ul>
    </div>
  );
}

function TravelConsole({ track }: { track: (typeof tracks)[number] }) {
  if (track.id !== "travel") return null;

  const activeStep = useCycle(track.pipeline.length, 2600);
  const activeModule = useCycle(track.modules.length);

  return (
    <div className="two-track-console two-track-console-travel">
      <div className="two-track-search-bar">
        <Search className="size-4 shrink-0 text-muted-foreground" strokeWidth={2} />
        <span className="two-track-search-query">{track.searchQuery}</span>
        <span className="two-track-search-badge">Live inventory</span>
      </div>

      <div className="two-track-console-split">
        <div className="two-track-inventory-panel">
          <p className="two-track-panel-kicker">Available inventory</p>
          {track.inventoryRows.map((row) => (
            <div key={row.section} className="two-track-inventory-row">
              <div className="two-track-inventory-row-main">
                <span className="two-track-inventory-section">{row.section}</span>
                <span className="two-track-inventory-seats">{row.seats} seats</span>
              </div>
              <div className="two-track-inventory-prices">
                <span>{row.ask}</span>
                <span className="two-track-margin-pill">{row.margin}</span>
              </div>
            </div>
          ))}
        </div>

        <div className="two-track-quote-panel">
          <p className="two-track-panel-kicker">
            <Sparkles className="size-3.5" /> Customer quote
          </p>
          <p className="two-track-quote-event">{track.quote.event}</p>
          <p className="two-track-quote-venue">{track.quote.venue}</p>
          <p className="two-track-quote-line">{track.quote.line}</p>
          <div className="two-track-quote-rows">
            <div>
              <span>Subtotal · {track.quote.seats} seats</span>
              <strong>{track.quote.subtotal}</strong>
            </div>
            <div>
              <span>Partner margin</span>
              <strong>{track.quote.margin}</strong>
            </div>
            <div className="two-track-quote-total">
              <span>Customer total</span>
              <strong>{track.quote.total}</strong>
            </div>
          </div>
          <div className="two-track-quote-actions">
            <span className="two-track-quote-action" data-ready="true">
              PDF ready
            </span>
            <span className="two-track-quote-action two-track-quote-action-wa">
              WhatsApp · sent
            </span>
          </div>
        </div>
      </div>

      <ol className="two-track-pipeline">
        {track.pipeline.map((step, i) => (
          <li key={step.label} data-active={activeStep === i ? "true" : "false"}>
            <span className="two-track-pipeline-dot" />
            <span className="two-track-pipeline-label">{step.label}</span>
            <span className="two-track-pipeline-detail">{step.detail}</span>
          </li>
        ))}
      </ol>

      <ul className="two-track-module-rail">
        {track.modules.map((mod, i) => (
          <li key={mod} data-active={activeModule === i ? "true" : "false"}>
            <Zap className="size-3.5" strokeWidth={2} />
            {mod}
          </li>
        ))}
      </ul>
    </div>
  );
}

function TrackCard3D({ track }: { track: (typeof tracks)[number] }) {
  const Icon = track.icon;

  return (
    <article
      id={track.id}
      className="two-track-3d-card scroll-mt-24"
      data-track={track.id}
      style={{
        ["--tt-tilt-y" as string]: `${track.tiltY}deg`,
        ["--tt-tilt-z" as string]: `${track.tiltZ}deg`,
      }}
    >
      <div className="two-track-3d-bezel">
        <div className="two-track-3d-screen">
          <span className="two-track-3d-grid" aria-hidden />
          <span className="two-track-3d-glare" aria-hidden />
          <span className="two-track-3d-scan" aria-hidden />

          <ConsoleChrome path={track.consolePath} status={track.consoleStatus} icon={track.icon} />

          <div className="two-track-3d-inner">
            <header className="two-track-3d-headline">
              <span className="two-track-3d-line">{track.lineA}</span>
              <span className="two-track-3d-accent">{track.lineAccent}</span>
              <span className="two-track-3d-fade">{track.lineFade}</span>
            </header>

            <div className="two-track-3d-stage">
              {track.id === "brokers" ? (
                <BrokerConsole track={track} />
              ) : (
                <TravelConsole track={track} />
              )}
            </div>

            <footer className="two-track-3d-footer">
              <dl className="two-track-3d-stats">
                {track.stats.map((s) => (
                  <div key={s.label}>
                    <dt className="sr-only">{s.label}</dt>
                    <dd className="two-track-stat-value">{s.value}</dd>
                    <dd className="two-track-stat-label">{s.label}</dd>
                  </div>
                ))}
              </dl>
            </footer>
          </div>

          <span className="two-track-3d-badge">
            <Icon className="size-4" strokeWidth={1.75} />
          </span>
        </div>
      </div>

      <div className="two-track-3d-copy">
        <p className="section-eyebrow text-primary">{track.eyebrow}</p>
        <h3 className="mt-3 font-display text-xl font-bold leading-snug text-foreground sm:text-2xl">
          {track.title}
        </h3>
        <p className="mt-3 text-sm leading-relaxed text-muted-foreground sm:text-[15px]">
          {track.body}
        </p>
        <Link to={track.ctaTo} className="two-track-cta group/cta">
          {track.cta}
          <ArrowRight className="size-4 transition-transform group-hover/cta:translate-x-1" />
        </Link>
      </div>
    </article>
  );
}

export function TwoTrack() {
  const { ref, inView } = useInView<HTMLElement>(0.1);

  return (
    <section
      ref={ref}
      id="platform-tracks"
      className="two-track-cinema section-curve relative isolate scroll-mt-24 overflow-x-clip bg-surface"
      data-settled={inView ? "true" : "false"}
    >
      <SectionBackdrop image="concertCrowd" tone="surface" strength={0.08} />

      <div className="two-track-panel">
        <div className="container-page relative z-10">
          <Reveal>
            <p className="section-eyebrow text-primary">One platform · Multiple parts</p>
            <h2 className="mt-4 max-w-3xl font-display text-3xl font-bold leading-[1.08] tracking-tight text-foreground sm:text-4xl lg:text-[2.65rem]">
              Built for the global ticketing ecosystem
            </h2>
            <p className="mt-5 max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg">
              Ticket brokers and B2B partners — connected through one intelligent infrastructure layer for catalog,
              distribution, pricing and partner commerce.
            </p>
          </Reveal>

          <div className="two-track-stage">
            {tracks.map((track) => (
              <TrackCard3D key={track.id} track={track} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
