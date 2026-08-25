import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type MouseEvent as ReactMouseEvent,
  type ReactNode,
} from "react";
import {
  Boxes,
  Layers3,
  LayoutGrid,
  ShieldCheck,
  Sparkles,
} from "lucide-react";
import { ConsoleShell } from "@/components/pages/brokers/ConsoleShell";
import { useInView, HERO_LITE_MQ, matchesHeroLite } from "@/hooks/use-scroll-motion";
import { modules } from "@/content/modules";
import {
  productsWorkflowFeed,
  productsWorkflowLayers,
} from "@/content/products-page-data";

const TICK_MS = 1600;

const consoleMeta = [
  { id: "platform", path: "seatsbrokers / platform / operations", badge: "Ready" },
  { id: "workflow", path: "seatsbrokers / platform / overview", badge: "Live" },
  { id: "products", path: "seatsbrokers / products / command", badge: "Ready" },
] as const;

function StatusPill({
  tone,
  children,
}: {
  tone: "ok" | "sync" | "hold" | "review";
  children: ReactNode;
}) {
  return (
    <span className="hero-desk-pill" data-tone={tone}>
      {children}
    </span>
  );
}

function DeskFeed({ rows }: { rows: readonly { time: string; msg: string }[] }) {
  const loop = [...rows, ...rows];
  return (
    <div className="hero-desk-feed">
      <ul className="hero-desk-feed-track" aria-hidden>
        {loop.map((row, index) => (
          <li key={`${row.time}-${index}`}>
            <span>{row.time}</span>
            {row.msg}
          </li>
        ))}
      </ul>
    </div>
  );
}

const hubListings = [
  { event: "Arsenal vs Chelsea", section: "Club L · R8", qty: "4", ask: "£248", status: "Listed" as const },
  { event: "UCL Final · Wembley", section: "Cat A · R12", qty: "2", ask: "£186", status: "Syncing" as const },
  { event: "Wimbledon · Centre Court", section: "Longside · R4", qty: "6", ask: "£410", status: "Listed" as const },
  { event: "Monaco GP · Main GS", section: "Upper · R22", qty: "3", ask: "£182", status: "Hold" as const },
] as const;

const hubChannels = [
  { label: "Marketplaces", status: "Connected" as const },
  { label: "B2B buyers", status: "Connected" as const },
  { label: "API partners", status: "Connected" as const },
  { label: "Websites", status: "Synced" as const },
  { label: "Resellers", status: "Synced" as const },
] as const;

const hubFeed = [
  { time: "14:22:08", msg: "inventory.sync · one layer aligned" },
  { time: "14:22:04", msg: "listing.push · channels in sync" },
  { time: "14:21:58", msg: "ask.update · Club L £248" },
  { time: "14:21:51", msg: "qty.align · Cat A remaining 2" },
  { time: "14:21:44", msg: "auto-delist · sold qty written back" },
] as const;

function listingTone(status: (typeof hubListings)[number]["status"]) {
  if (status === "Listed") return "ok" as const;
  if (status === "Syncing") return "sync" as const;
  return "hold" as const;
}

function channelTone(status: (typeof hubChannels)[number]["status"]) {
  return status === "Connected" ? ("ok" as const) : ("sync" as const);
}

function PlatformHubDesk({ tick, live }: { tick: number; live: boolean }) {
  const row = tick % hubListings.length;
  const channel = tick % hubChannels.length;

  return (
    <ConsoleShell path={consoleMeta[0].path} status={consoleMeta[0].badge} icon={Layers3}>
      <div className="hero-desk" data-kind="hub" data-live={live ? "true" : "false"}>
        <div className="hero-desk-stats">
          <div className="lc-stat">
            <span className="lc-stat-label">Platform</span>
            <strong className="lc-stat-value">Ready</strong>
          </div>
          <div className="lc-stat">
            <span className="lc-stat-label">Inventory</span>
            <strong className="lc-stat-value">One layer</strong>
          </div>
          <div className="lc-stat">
            <span className="lc-stat-label">Reach</span>
            <strong className="lc-stat-value">Multi-channel</strong>
          </div>
        </div>

        <div className="hero-desk-context">
          <div className="min-w-0">
            <p className="hero-desk-kicker">Operations desk</p>
            <p className="hero-desk-title">One inventory layer. Multiple sales channels.</p>
          </div>
          <span className="hero-desk-chip">Demo</span>
        </div>

        <div className="hero-desk-work">
          <section className="lc-panel hero-desk-panel">
            <header className="lc-panel-head">
              <span className="lc-panel-dot" />
              Inventory
              <span className="lc-panel-badge">Live stock</span>
            </header>
            <table className="hero-desk-table">
              <thead>
                <tr>
                  <th>Event</th>
                  <th>Section</th>
                  <th>Qty</th>
                  <th>Ask</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {hubListings.map((listing, index) => (
                  <tr key={listing.event} data-active={index === row ? "true" : "false"}>
                    <td>{listing.event}</td>
                    <td>{listing.section}</td>
                    <td>{listing.qty}</td>
                    <td>{listing.ask}</td>
                    <td>
                      <StatusPill tone={listingTone(listing.status)}>{listing.status}</StatusPill>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </section>

          <section className="lc-panel hero-desk-panel hero-desk-side">
            <header className="lc-panel-head">
              Channels
              <span className="lc-panel-badge lc-panel-badge-live">In sync</span>
            </header>
            <ul className="hero-desk-channels">
              {hubChannels.map((item, index) => (
                <li key={item.label} data-active={index === channel ? "true" : "false"}>
                  <span>{item.label}</span>
                  <StatusPill tone={channelTone(item.status)}>{item.status}</StatusPill>
                </li>
              ))}
            </ul>
            <p className="hero-desk-note">
              <ShieldCheck className="size-3" strokeWidth={1.75} aria-hidden />
              Auto-delist after sale
            </p>
          </section>
        </div>

        <DeskFeed rows={hubFeed} />
      </div>
    </ConsoleShell>
  );
}

function WorkflowDesk({ tick, live }: { tick: number; live: boolean }) {
  const active = tick % productsWorkflowLayers.length;
  const layer = productsWorkflowLayers[active] ?? productsWorkflowLayers[0];

  return (
    <ConsoleShell path={consoleMeta[1].path} status={consoleMeta[1].badge} icon={Boxes}>
      <div className="hero-desk" data-kind="workflow" data-live={live ? "true" : "false"}>
        <div className="hero-desk-stats">
          <div className="lc-stat">
            <span className="lc-stat-label">Path</span>
            <strong className="lc-stat-value">Discover → Settle</strong>
          </div>
          <div className="lc-stat">
            <span className="lc-stat-label">Stage</span>
            <strong className="lc-stat-value">{layer.stage}</strong>
          </div>
          <div className="lc-stat">
            <span className="lc-stat-label">Products</span>
            <strong className="lc-stat-value">7 live</strong>
          </div>
        </div>

        <div className="hero-desk-context">
          <div className="min-w-0">
            <p className="hero-desk-kicker">Workflow overview</p>
            <p className="hero-desk-title">Discover → Settle — seven products, one desk</p>
          </div>
          <span className="hero-desk-chip">Live</span>
        </div>

        <ol className="hero-desk-pipe" aria-hidden>
          {productsWorkflowLayers.map((item, index) => (
            <li key={item.id} data-active={index === active ? "true" : "false"}>
              <span className="hero-desk-pipe-index">{item.index}</span>
              <strong>{item.stage}</strong>
              <em>{item.short}</em>
            </li>
          ))}
        </ol>

        <section className="lc-panel hero-desk-active">
          <header className="lc-panel-head">
            <span className="lc-panel-dot" />
            {layer.index} · {layer.stage}
            <span className="lc-panel-badge lc-panel-badge-live">Active</span>
          </header>
          <p className="hero-desk-active-name">{layer.name}</p>
          <p className="hero-desk-active-tag">{layer.tagline}</p>
          <p className="hero-desk-active-line">{layer.line}</p>
        </section>

        <DeskFeed rows={productsWorkflowFeed} />
      </div>
    </ConsoleShell>
  );
}

const productRows = [
  { index: "01", stage: "Discover", product: modules.intel.name, signal: "Peak demand", state: "Ready", tone: "ok" as const },
  { index: "02", stage: "Source", product: modules.source.name, signal: "Cat A × 4", state: "Live", tone: "ok" as const },
  { index: "03", stage: "Price", product: modules.pulse.name, signal: "Rec £248", state: "Review", tone: "review" as const },
  { index: "04", stage: "Connect", product: modules.link.name, signal: "POS · feed", state: "Open", tone: "sync" as const },
  { index: "05", stage: "Distribute", product: modules.market.name, signal: "Channels in sync", state: "Sync", tone: "sync" as const },
  { index: "06", stage: "Sell", product: modules.deal.name, signal: "Quote £992", state: "Ready", tone: "ok" as const },
  { index: "07", stage: "Settle", product: modules.funds.name, signal: "Standard rail", state: "Queued", tone: "hold" as const },
] as const;

const productFeed = [
  { time: "09:42:18", msg: "intel → demand peak on Cat A" },
  { time: "09:42:14", msg: "pulse → recommended ask £248" },
  { time: "09:42:10", msg: "market → listing mirrored" },
  { time: "09:42:06", msg: "deal → quote shared in £" },
  { time: "09:42:02", msg: "funds → payout on Standard" },
] as const;

function ProductsCommandDesk({ tick, live }: { tick: number; live: boolean }) {
  const active = tick % productRows.length;
  const row = productRows[active] ?? productRows[0];
  const rec = productsWorkflowLayers[2];

  return (
    <ConsoleShell path={consoleMeta[2].path} status={consoleMeta[2].badge} icon={LayoutGrid}>
      <div className="hero-desk" data-kind="products" data-live={live ? "true" : "false"}>
        <div className="hero-desk-stats">
          <div className="lc-stat">
            <span className="lc-stat-label">Products</span>
            <strong className="lc-stat-value">Seven live</strong>
          </div>
          <div className="lc-stat">
            <span className="lc-stat-label">Control</span>
            <strong className="lc-stat-value">You decide</strong>
          </div>
          <div className="lc-stat">
            <span className="lc-stat-label">Motion</span>
            <strong className="lc-stat-value">Connected</strong>
          </div>
        </div>

        <div className="hero-desk-context">
          <div className="min-w-0">
            <p className="hero-desk-kicker">Product command</p>
            <p className="hero-desk-title">Seven products. One connected workflow.</p>
          </div>
          <span className="hero-desk-chip">
            <Sparkles className="size-3" strokeWidth={1.75} aria-hidden />
            Demo
          </span>
        </div>

        <div className="hero-desk-work">
          <section className="lc-panel hero-desk-panel">
            <header className="lc-panel-head">
              <span className="lc-panel-dot" />
              Modules
              <span className="lc-panel-badge">{row.index} · {row.stage}</span>
            </header>
            <table className="hero-desk-table hero-desk-table-modules">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Stage</th>
                  <th>Product</th>
                  <th>Signal</th>
                  <th>State</th>
                </tr>
              </thead>
              <tbody>
                {productRows.map((item, index) => (
                  <tr key={item.index} data-active={index === active ? "true" : "false"}>
                    <td>{item.index}</td>
                    <td>{item.stage}</td>
                    <td>{item.product}</td>
                    <td>{item.signal}</td>
                    <td>
                      <StatusPill tone={item.tone}>{item.state}</StatusPill>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </section>

          <section className="lc-panel hero-desk-panel hero-desk-side">
            <header className="lc-panel-head">
              {modules.pulse.name}
              <span className="lc-panel-badge lc-panel-badge-live">You decide</span>
            </header>
            <p className="hero-desk-rec-kicker">{rec.tagline}</p>
            <p className="hero-desk-rec-ask">
              <span>Recommended</span>
              <strong>£248</strong>
            </p>
            <p className="hero-desk-rec-line">{rec.line}</p>
            <div className="hero-desk-gates" aria-hidden>
              <span data-tone="ok">Accept</span>
              <span data-tone="hold">Hold</span>
              <span data-tone="review">Dismiss</span>
            </div>
          </section>
        </div>

        <DeskFeed rows={productFeed} />
      </div>
    </ConsoleShell>
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
  const [reduced, setReduced] = useState(matchesHeroLite);
  const index = ((slide % consoleMeta.length) + consoleMeta.length) % consoleMeta.length;
  const current = consoleMeta[index];
  const live = inView && !reduced;

  useEffect(() => {
    const mq = window.matchMedia(HERO_LITE_MQ);
    const sync = () => setReduced(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

  useEffect(() => {
    if (reduced || !inView) return;
    const id = window.setInterval(() => setTick((t) => t + 1), TICK_MS);
    return () => window.clearInterval(id);
  }, [reduced, inView]);

  const onMove = useCallback((e: ReactMouseEvent<HTMLDivElement>) => {
    if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;
    const el = cardRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width - 0.5;
    const py = (e.clientY - rect.top) / rect.height - 0.5;
    el.style.setProperty("--tilt-x", `${(8 - py * 10).toFixed(2)}deg`);
    el.style.setProperty("--tilt-y", `${(-16 + px * 10).toFixed(2)}deg`);
    el.style.setProperty("--tilt-glare-x", `${50 + px * 42}%`);
    el.style.setProperty("--tilt-glare-y", `${50 + py * 42}%`);
  }, []);

  const onLeave = useCallback(() => {
    if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;
    const el = cardRef.current;
    if (!el) return;
    el.style.setProperty("--tilt-x", "8deg");
    el.style.setProperty("--tilt-y", "-16deg");
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
      <div
        ref={cardRef}
        className={`hero-tilt-card${reduced ? "" : " hero-tilt-alive"}`}
        data-mode={current.id}
        data-lite={reduced ? "true" : undefined}
      >
        <div className="hero-tilt-grid-bg" aria-hidden />
        {reduced ? null : <div className="hero-tilt-glare" />}
        {reduced ? null : <span className="hero-tilt-scan" />}

        <div key={`${current.id}-${swapKey}`} className="hero-hud-swap">
          <div className="hero-desk-shell">
            {index === 0 ? <PlatformHubDesk tick={tick} live={live} /> : null}
            {index === 1 ? <WorkflowDesk tick={tick} live={live} /> : null}
            {index === 2 ? <ProductsCommandDesk tick={tick} live={live} /> : null}
          </div>
        </div>
      </div>
    </div>
  );
}
