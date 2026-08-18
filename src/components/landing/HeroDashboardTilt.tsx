import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type MouseEvent as ReactMouseEvent,
} from "react";
import {
  CalendarDays,
  Database,
  FileText,
  Globe2,
  Layers3,
  LineChart,
  MapPin,
  RefreshCw,
  Search,
  Send,
  ShieldCheck,
  Ticket,
  Wallet,
} from "lucide-react";
import { useInView } from "@/hooks/use-scroll-motion";

const TICK_MS = 1600;

const consoleMeta = [
  { id: "platform", path: "platform · infrastructure", badge: "LIVE" },
  { id: "broker", path: "broker · distribution", badge: "SYNC" },
  { id: "travel", path: "b2b · quote desk", badge: "QUOTE" },
] as const;

function HudBar({ path, badge, spin = false }: { path: string; badge: string; spin?: boolean }) {
  return (
    <header className="hero-hud-bar">
      <span className="hero-hud-dots" aria-hidden>
        <i />
        <i />
        <i />
      </span>
      <span className="hero-hud-path">
        {spin ? (
          <RefreshCw className="size-3 hero-spin shrink-0" />
        ) : (
          <Globe2 className="size-3 shrink-0" />
        )}
        seatsbrokers / {path}
      </span>
      <span className="hero-hud-badge">
        <span className="hero-hud-pip" />
        {badge}
      </span>
    </header>
  );
}

/* 1 — Infrastructure control room: platform layers + system feed */

const platformLayers = [
  { icon: CalendarDays, label: "Event data", meta: "12K+ events" },
  { icon: Database, label: "Inventory", meta: "84K+ listings" },
  { icon: Globe2, label: "Distribution", meta: "32+ channels" },
  { icon: LineChart, label: "Pricing", meta: "AI signals" },
  { icon: Wallet, label: "Payments", meta: "£ settled" },
];

const platformFeed = [
  { tag: "event", line: "Onsale detected · Monaco GP" },
  { tag: "sync", line: "Listing pushed · 6 channels" },
  { tag: "price", line: "Ask updated £182 → £188" },
  { tag: "partner", line: "Quote sent · B2B partner" },
  { tag: "pay", line: "Settlement queued · £14,820" },
  { tag: "event", line: "Venue map refreshed · Wembley" },
  { tag: "sync", line: "Quantity synced · 4 remaining" },
  { tag: "price", line: "Comp set refreshed · 165 markets" },
];

const platformThroughput = [38, 54, 46, 68, 58, 82, 71, 94, 78, 88];

function PlatformConsole({ tick }: { tick: number }) {
  const activeLayer = tick % platformLayers.length;

  return (
    <div className="hero-hud">
      <HudBar path={consoleMeta[0]!.path} badge={consoleMeta[0]!.badge} />

      <div className="hero-hud-body">
        <div className="hero-hud-head">
          <div className="min-w-0">
            <p className="hero-hud-kicker">
              <Layers3 className="size-3" /> Platform layers
            </p>
            <p className="hero-hud-title">One infrastructure layer, end to end</p>
          </div>
          <span className="hero-hud-chip">165+ markets</span>
        </div>

        <div className="hero-hud-split">
          <div className="hero-hud-stack">
            <span className="hero-hud-stack-rail" aria-hidden>
              <i className="hero-hud-packet" />
            </span>
            {platformLayers.map((layer, i) => (
              <div
                key={layer.label}
                className="hero-hud-layer"
                data-active={i === activeLayer ? "true" : "false"}
                style={{ animationDelay: `${i * 55}ms` }}
              >
                <span className="hero-hud-layer-icon">
                  <layer.icon className="size-3.5" />
                </span>
                <span className="hero-hud-layer-label">{layer.label}</span>
                <span className="hero-hud-layer-meta">{layer.meta}</span>
              </div>
            ))}
          </div>

          <div className="hero-hud-side">
            <div className="hero-hud-panel hero-hud-chart">
              <p className="hero-hud-mini">Throughput</p>
              <div className="hero-tilt-bars hero-hud-bars">
                {platformThroughput.map((height, i) => (
                  <span
                    key={i}
                    className="hero-tilt-bar"
                    style={{ height: `${height}%`, animationDelay: `${i * 45}ms` }}
                  />
                ))}
              </div>
            </div>

            <div className="hero-hud-tiles">
              <div>
                <strong>4s</strong>
                <span>last sync</span>
              </div>
              <div>
                <strong>38ms</strong>
                <span>latency</span>
              </div>
            </div>
          </div>
        </div>

        <div className="hero-hud-feed">
          <div className="hero-hud-feed-mask">
            <div className="hero-hud-feed-track">
              {[...platformFeed, ...platformFeed].map((entry, i) => (
                <span key={i} className="hero-hud-feed-row">
                  <i />
                  <em>{entry.tag}</em>
                  <b>{entry.line}</b>
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      <footer className="hero-hud-foot">
        <span>5 layers · 1 platform</span>
        <span className="hero-hud-foot-accent">all systems live</span>
      </footer>
    </div>
  );
}

/* 2 — Distribution matrix: one catalog pushed to every channel */

const brokerChannels = ["MKT", "EXC", "TRV", "OTA", "WL", "API"];

const brokerRows = [
  { event: "Monaco GP · Main Grandstand", qty: "6", ask: "£182" },
  { event: "El Clásico · Category 1", qty: "4", ask: "£264" },
  { event: "Wimbledon · Centre Court", qty: "2", ask: "£410" },
  { event: "NFL London · Lower Tier", qty: "8", ask: "£148" },
];

function cellState(row: number, col: number, tick: number) {
  const n = (row * 7 + col * 3 + tick) % 11;
  if (n === 0) return "queue";
  if (n === 3 || n === 6) return "push";
  return "ok";
}

function BrokerConsole({ tick }: { tick: number }) {
  const activeRow = tick % brokerRows.length;
  const liveListings = (1248 + (tick % 7) * 3).toLocaleString("en-GB");

  return (
    <div className="hero-hud">
      <HudBar path={consoleMeta[1]!.path} badge={consoleMeta[1]!.badge} spin />

      <div className="hero-hud-body">
        <div className="hero-hud-listing">
          <div className="min-w-0">
            <p className="hero-hud-kicker">
              <Ticket className="size-3" /> Listed once
            </p>
            <p className="hero-hud-title">Synchronized across every channel</p>
          </div>
          <div className="hero-hud-listing-num">
            <span>Live listings</span>
            <strong key={liveListings} className="hero-hud-flash">
              {liveListings}
            </strong>
          </div>
        </div>

        <div className="hero-hud-matrix">
          <div className="hero-hud-matrix-head">
            <span>Listing</span>
            <span>Qty</span>
            <span>Ask</span>
            <span className="hero-hud-matrix-chan">
              {brokerChannels.map((channel) => (
                <em key={channel}>{channel}</em>
              ))}
            </span>
          </div>

          {brokerRows.map((row, i) => (
            <div
              key={row.event}
              className="hero-hud-matrix-row"
              data-active={i === activeRow ? "true" : "false"}
              style={{ animationDelay: `${i * 55}ms` }}
            >
              <span className="hero-hud-matrix-name">{row.event}</span>
              <span className="hero-hud-matrix-qty">{row.qty}</span>
              <span className="hero-hud-matrix-ask">{row.ask}</span>
              <span className="hero-hud-matrix-chan">
                {brokerChannels.map((channel, j) => (
                  <i key={channel} data-state={cellState(i, j, tick)} />
                ))}
              </span>
            </div>
          ))}
        </div>

        <div className="hero-hud-export">
          <span className="hero-hud-mini">Export close</span>
          <div className="hero-hud-export-bar" aria-hidden>
            <i />
          </div>
          <span className="hero-hud-export-meta">12,480 rows</span>
        </div>
      </div>

      <footer className="hero-hud-foot">
        <span className="hero-hud-foot-icon">
          <ShieldCheck className="size-3" /> Auto-delist after sale
        </span>
        <span className="hero-hud-foot-accent">0 conflicts · push 4s</span>
      </footer>
    </div>
  );
}

/* 3 — Partner quote desk: search, margin, branded quote */

const travelScenarios = [
  { margin: 12, cost: 242, price: 271 },
  { margin: 18, cost: 242, price: 286 },
  { margin: 24, cost: 242, price: 300 },
];

const travelSteps = ["Search inventory", "Add margin", "Send quote"];

const travelAvailability = [
  { label: "Category 1", seats: 8, fill: 82 },
  { label: "Category 2", seats: 6, fill: 58 },
  { label: "Grandstand K", seats: 4, fill: 36 },
];

function TravelConsole({ tick }: { tick: number }) {
  const step = tick % travelSteps.length;
  const scenario = travelScenarios[step]!;
  const total = scenario.price * 4;

  return (
    <div className="hero-hud">
      <HudBar path={consoleMeta[2]!.path} badge={consoleMeta[2]!.badge} />

      <div className="hero-hud-body">
        <div className="hero-hud-chips">
          <span>
            <Search className="size-3" /> Monaco GP
          </span>
          <span>
            <CalendarDays className="size-3" /> 24 May
          </span>
          <span>
            <MapPin className="size-3" /> Circuit de Monaco
          </span>
          <span>Category 1</span>
        </div>

        <div className="hero-hud-quote">
          <div className="hero-hud-steps">
            {travelSteps.map((label, i) => (
              <div
                key={label}
                className="hero-hud-step"
                data-state={i < step ? "done" : i === step ? "active" : "idle"}
                style={{ animationDelay: `${i * 55}ms` }}
              >
                <span className="hero-hud-step-dot">{i + 1}</span>
                <span className="hero-hud-step-label">{label}</span>
              </div>
            ))}

            <div className="hero-hud-panel hero-hud-avail">
              <p className="hero-hud-mini">Availability</p>
              {travelAvailability.map((row) => (
                <div key={row.label} className="hero-hud-avail-row">
                  <span>{row.label}</span>
                  <i>
                    <b style={{ width: `${row.fill}%` }} />
                  </i>
                  <em>{row.seats}</em>
                </div>
              ))}
            </div>
          </div>

          <div className="hero-hud-money">
            <p className="hero-hud-mini">Client price · per ticket</p>
            <p key={scenario.price} className="hero-hud-money-value">
              <span>£</span>
              {scenario.price}
              <em>+£{scenario.price - scenario.cost}</em>
            </p>

            <div className="hero-hud-lines">
              <div>
                <span>4 × Category 1</span>
                <strong>£{scenario.price}</strong>
              </div>
              <div data-total="true">
                <span>Quote total</span>
                <strong>£{total.toLocaleString("en-GB")}</strong>
              </div>
            </div>

            <div className="hero-hud-math">
              <div>
                <span>Partner cost</span>
                <strong>£{scenario.cost}</strong>
              </div>
              <div>
                <span>Margin</span>
                <strong>{scenario.margin}%</strong>
              </div>
              <div>
                <span>Tickets</span>
                <strong>4</strong>
              </div>
            </div>

            <div className="hero-hud-margin" aria-hidden>
              <i style={{ width: `${(scenario.margin / 30) * 100}%` }} />
            </div>
          </div>
        </div>

        <div className="hero-hud-quote-foot">
          <span className="hero-hud-stamp">
            <FileText className="size-3" /> Branded PDF quote ready
          </span>
          <span className="hero-hud-send">
            <Send className="size-3" /> Send
          </span>
        </div>
      </div>

      <footer className="hero-hud-foot">
        <span>Quote SB-4821 · 4 tickets</span>
        <span className="hero-hud-foot-accent">valid 48h</span>
      </footer>
    </div>
  );
}

export function HeroDashboardTilt({
  slide = 0,
  swapKey = 0,
}: {
  slide?: number;
  swapKey?: number;
}) {
  const cardRef = useRef<HTMLDivElement>(null);
  const { ref: sceneRef, inView } = useInView<HTMLDivElement>(0.15);
  const [tick, setTick] = useState(0);
  const [reduced, setReduced] = useState(false);
  const index = ((slide % consoleMeta.length) + consoleMeta.length) % consoleMeta.length;
  const current = consoleMeta[index]!;

  useEffect(() => {
    setReduced(window.matchMedia("(prefers-reduced-motion: reduce)").matches);
  }, []);

  useEffect(() => {
    if (reduced || !inView) return;
    const id = window.setInterval(() => setTick((t) => t + 1), TICK_MS);
    return () => window.clearInterval(id);
  }, [reduced, inView]);

  const onMove = useCallback((e: ReactMouseEvent<HTMLDivElement>) => {
    const el = cardRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width - 0.5;
    const py = (e.clientY - rect.top) / rect.height - 0.5;
    el.style.setProperty("--tilt-x", `${(-py * 16).toFixed(2)}deg`);
    el.style.setProperty("--tilt-y", `${(px * 20).toFixed(2)}deg`);
    el.style.setProperty("--tilt-glare-x", `${50 + px * 42}%`);
    el.style.setProperty("--tilt-glare-y", `${50 + py * 42}%`);
  }, []);

  const onLeave = useCallback(() => {
    const el = cardRef.current;
    if (!el) return;
    el.style.setProperty("--tilt-x", "10deg");
    el.style.setProperty("--tilt-y", "-20deg");
    el.style.setProperty("--tilt-glare-x", "28%");
    el.style.setProperty("--tilt-glare-y", "18%");
  }, []);

  return (
    <div
      ref={sceneRef}
      className="hero-tilt-scene"
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      aria-hidden
    >
      <div className="hero-tilt-ambient" />
      <div ref={cardRef} className="hero-tilt-card hero-tilt-alive" data-mode={current.id}>
        <div className="hero-tilt-grid-bg" aria-hidden />
        <div className="hero-tilt-glare" />
        <span className="hero-tilt-scan" />

        <div key={`${current.id}-${swapKey}`} className="hero-hud-swap">
          {index === 0 ? <PlatformConsole tick={tick} /> : null}
          {index === 1 ? <BrokerConsole tick={tick} /> : null}
          {index === 2 ? <TravelConsole tick={tick} /> : null}
        </div>
      </div>
    </div>
  );
}
