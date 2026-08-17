import { useEffect, useRef, useState } from "react";
import {
  ArrowRightLeft,
  CheckCircle2,
  Circle,
  FileText,
  KeyRound,
  Layers3,
  Loader2,
  Mail,
  MessageCircle,
} from "lucide-react";
import { ConsoleShell } from "@/components/pages/brokers/ConsoleShell";
import { useInView } from "@/hooks/use-scroll-motion";

export type StickyScrollConsoleKind =
  | "brokers"
  | "travel"
  | "marketplaces"
  | "partners";

type StickyScrollConsoleProps = {
  kind: StickyScrollConsoleKind;
  live: boolean;
  label: string;
};

function useCycle(length: number, ms: number, enabled: boolean) {
  const [active, setActive] = useState(0);

  useEffect(() => {
    if (!enabled || length <= 1) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const id = window.setInterval(() => {
      setActive((i) => (i + 1) % length);
    }, ms);
    return () => window.clearInterval(id);
  }, [length, ms, enabled]);

  return active;
}

function useConsoleLive(live: boolean) {
  const rootRef = useRef<HTMLDivElement>(null);
  const { ref: inViewRef, inView } = useInView<HTMLDivElement>(0.22);
  const setRef = (node: HTMLDivElement | null) => {
    rootRef.current = node;
    inViewRef.current = node;
  };
  return { setRef, ticking: live && inView };
}

const brokerAsks = ["£246", "£248", "£252", "£249"] as const;
const brokerSpark = [42, 55, 48, 70, 62, 78, 66, 84] as const;
const brokerChannels = [
  { id: "CH-01", label: "Hub A" },
  { id: "CH-02", label: "Hub B" },
  { id: "CH-03", label: "Hub C" },
  { id: "POS", label: "POS" },
  { id: "OTA", label: "OTA" },
  { id: "WEB", label: "Web" },
] as const;
const brokerRows = [
  { section: "Club L · R8", qty: 4, ask: "£248", status: "Listed" },
  { section: "Cat A · R12", qty: 2, ask: "£186", status: "Syncing" },
  { section: "Longside · R4", qty: 6, ask: "£132", status: "Listed" },
  { section: "Upper · R22", qty: 3, ask: "£94", status: "Hold" },
] as const;
const brokerFeed = [
  { time: "14:22:08", msg: "price.sync · CH-01 ask £248" },
  { time: "14:22:04", msg: "auto-delist · CH-04 qty 0" },
  { time: "14:21:58", msg: "listing.push · 6 channels live" },
  { time: "14:21:51", msg: "qty.align · Club L remaining 4" },
  { time: "14:21:44", msg: "pos.ingest · 12 seats received" },
  { time: "14:21:36", msg: "market.ask · Cat A £186" },
];

function BrokerDistributionConsole({ ticking }: { ticking: boolean }) {
  const askTick = useCycle(brokerAsks.length, 2200, ticking);
  const channelTick = useCycle(brokerChannels.length, 1800, ticking);
  const rowTick = useCycle(brokerRows.length, 2600, ticking);
  const sparkTick = useCycle(brokerSpark.length, 1400, ticking);
  const feedRows = [...brokerFeed, ...brokerFeed];
  const ask = brokerAsks[askTick] ?? brokerAsks[0];

  return (
    <ConsoleShell path="seatsbrokers / brokers / distribution" status="LIVE" icon={Layers3}>
      <div className="sss-stats">
        <div className="lc-stat">
          <span className="lc-stat-label">Listed</span>
          <strong className="lc-stat-value">6 ch</strong>
        </div>
        <div className="lc-stat">
          <span className="lc-stat-label">Live ask</span>
          <strong className="lc-stat-value sss-tick">{ask}</strong>
        </div>
        <div className="lc-stat">
          <span className="lc-stat-label">Delist</span>
          <strong className="lc-stat-value">Auto</strong>
        </div>
      </div>

      <div className="sss-context">
        <div className="min-w-0">
          <p className="sss-context-kicker">Inventory desk</p>
          <p className="sss-context-title">Arsenal vs Chelsea · Emirates</p>
        </div>
        <span className="sss-chip">Cat A × 4</span>
      </div>

      <div className="sss-work">
        <section className="lc-panel sss-panel">
          <header className="lc-panel-head">
            <span className="lc-panel-dot" />
            Channels
            <span className="lc-panel-badge lc-panel-badge-live">SYNC</span>
          </header>
          <ul className="sss-channels">
            {brokerChannels.map((channel, index) => (
              <li
                key={channel.id}
                className="sss-channel"
                data-active={channelTick === index ? "true" : "false"}
              >
                <strong>{channel.id}</strong>
                <span>{channel.label}</span>
              </li>
            ))}
          </ul>
          <div className="sss-spark" aria-hidden>
            {brokerSpark.map((height, index) => (
              <i
                key={height + index}
                data-active={sparkTick === index ? "true" : "false"}
                style={{ height: `${height}%` }}
              />
            ))}
          </div>
        </section>

        <section className="lc-panel sss-panel">
          <header className="lc-panel-head">
            Listings
            <span className="lc-panel-badge">4 live</span>
          </header>
          <table className="sss-table">
            <thead>
              <tr>
                <th>Section</th>
                <th>Qty</th>
                <th>Ask</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {brokerRows.map((row, index) => (
                <tr key={row.section} data-active={rowTick === index ? "true" : "false"}>
                  <td>{row.section}</td>
                  <td>{row.qty}</td>
                  <td>{row.ask}</td>
                  <td>
                    <span className="sss-status" data-status={row.status.toLowerCase()}>
                      {row.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>
      </div>

      <Feed rows={feedRows} />
    </ConsoleShell>
  );
}

const travelMargins = [
  { pct: 8, cost: 420, client: 454 },
  { pct: 10, cost: 420, client: 462 },
  { pct: 12, cost: 420, client: 470 },
  { pct: 15, cost: 420, client: 483 },
] as const;
const travelShares = [
  { id: "pdf", label: "PDF", icon: FileText },
  { id: "whatsapp", label: "WhatsApp", icon: MessageCircle },
  { id: "email", label: "Email", icon: Mail },
] as const;
const travelStages = ["Hold", "Margin", "Quote", "Share"] as const;
const travelFeed = [
  { time: "11:04:22", msg: "quote.share · WhatsApp · QT-2204" },
  { time: "11:04:14", msg: "margin.set · 12% · client £470" },
  { time: "11:04:08", msg: "inventory.hold · Cat A × 2" },
  { time: "11:03:56", msg: "quote.pdf · Helix Tours ready" },
  { time: "11:03:41", msg: "partner.search · UCL Final live" },
  { time: "11:03:28", msg: "invoice.queue · group of 4" },
];

function TravelQuoteConsole({ ticking }: { ticking: boolean }) {
  const marginTick = useCycle(travelMargins.length, 2400, ticking);
  const shareTick = useCycle(travelShares.length, 1800, ticking);
  const stageTick = useCycle(travelStages.length, 2000, ticking);
  const feedRows = [...travelFeed, ...travelFeed];
  const margin = travelMargins[marginTick] ?? travelMargins[2];
  const ShareIcon = travelShares[shareTick]?.icon ?? FileText;

  return (
    <ConsoleShell path="seatsbrokers / travel / quote-desk" status="QUOTE" icon={FileText}>
      <div className="sss-stats">
        <div className="lc-stat">
          <span className="lc-stat-label">Cost</span>
          <strong className="lc-stat-value">£{margin.cost}</strong>
        </div>
        <div className="lc-stat">
          <span className="lc-stat-label">Margin</span>
          <strong className="lc-stat-value sss-tick">{margin.pct}%</strong>
        </div>
        <div className="lc-stat">
          <span className="lc-stat-label">Client</span>
          <strong className="lc-stat-value sss-tick">£{margin.client}</strong>
        </div>
      </div>

      <div className="sss-context">
        <div className="min-w-0">
          <p className="sss-context-kicker">Quote QT-2204</p>
          <p className="sss-context-title">Helix Tours · UCL Final · Wembley</p>
        </div>
        <span className="sss-chip">Cat A × 2</span>
      </div>

      <ol className="sss-steps" aria-label="Quote pipeline">
        {travelStages.map((stage, index) => (
          <li key={stage} data-active={stageTick === index ? "true" : "false"}>
            <span>{String(index + 1).padStart(2, "0")}</span>
            {stage}
          </li>
        ))}
      </ol>

      <div className="sss-work sss-work-quote">
        <section className="lc-panel lc-panel-accent sss-panel">
          <header className="lc-panel-head">
            Quote sheet
            <span className="lc-panel-badge lc-panel-badge-live">CUSTOMER</span>
          </header>
          <dl className="sss-quote">
            <div>
              <dt>Tickets</dt>
              <dd>Category A · Row 12</dd>
            </div>
            <div>
              <dt>Cost</dt>
              <dd>£{margin.cost}</dd>
            </div>
            <div>
              <dt>Partner margin</dt>
              <dd>
                {margin.pct}% · £{margin.client - margin.cost}
              </dd>
            </div>
            <div className="sss-quote-total">
              <dt>Client price</dt>
              <dd>£{margin.client}</dd>
            </div>
          </dl>
          <div className="sss-math" aria-hidden>
            <i style={{ flex: margin.cost }} data-tone="cost" />
            <i style={{ flex: margin.client - margin.cost }} data-tone="margin" />
          </div>
        </section>

        <section className="lc-panel sss-panel">
          <header className="lc-panel-head">
            Share
            <span className="lc-panel-badge">
              <ShareIcon className="size-3" strokeWidth={1.75} />
              {travelShares[shareTick]?.label}
            </span>
          </header>
          <ul className="sss-share">
            {travelShares.map((channel, index) => (
              <li key={channel.id} data-active={shareTick === index ? "true" : "false"}>
                <channel.icon className="size-3.5" strokeWidth={1.75} />
                {channel.label}
              </li>
            ))}
          </ul>
          <p className="sss-note">PDF · WhatsApp · email from one quote.</p>
        </section>
      </div>

      <Feed rows={feedRows} />
    </ConsoleShell>
  );
}

const marketStages = [
  { label: "Ingest", detail: "Broker API" },
  { label: "Listing", detail: "Fan-out" },
  { label: "Price", detail: "Ack / hold" },
  { label: "Order", detail: "Return path" },
] as const;
const marketLags = [
  { channel: "CH-01", lag: "38ms", state: "live" },
  { channel: "CH-02", lag: "41ms", state: "live" },
  { channel: "CH-03", lag: "112ms", state: "retry" },
  { channel: "OTA", lag: "54ms", state: "live" },
] as const;
const marketAsks = [
  { ask: 248, floor: 232 },
  { ask: 252, floor: 232 },
  { ask: 244, floor: 232 },
] as const;
const marketFeed = [
  { time: "09:42:18", msg: "listing.ack · CH-02 41ms" },
  { time: "09:42:12", msg: "price.guard · floor £232 hold" },
  { time: "09:42:06", msg: "order.sync · INV-4402" },
  { time: "09:41:58", msg: "qty.align · 2 remaining" },
  { time: "09:41:51", msg: "api.push · 8 destinations" },
  { time: "09:41:44", msg: "error.clear · CH-03 retry ok" },
];

function MarketplaceSyncConsole({ ticking }: { ticking: boolean }) {
  const stageTick = useCycle(marketStages.length, 2100, ticking);
  const lagTick = useCycle(marketLags.length, 1900, ticking);
  const priceTick = useCycle(marketAsks.length, 2400, ticking);
  const feedRows = [...marketFeed, ...marketFeed];
  const price = marketAsks[priceTick] ?? marketAsks[0];
  const askPct = Math.round((price.ask / 280) * 100);
  const floorPct = Math.round((price.floor / 280) * 100);

  return (
    <ConsoleShell path="seatsbrokers / channels / sync" status="SYNC" icon={ArrowRightLeft}>
      <div className="sss-stats">
        <div className="lc-stat">
          <span className="lc-stat-label">Channels</span>
          <strong className="lc-stat-value">8</strong>
        </div>
        <div className="lc-stat">
          <span className="lc-stat-label">Live</span>
          <strong className="lc-stat-value">7</strong>
        </div>
        <div className="lc-stat">
          <span className="lc-stat-label">Errors</span>
          <strong className="lc-stat-value sss-tick">{lagTick === 2 ? "1" : "0"}</strong>
        </div>
      </div>

      <div className="sss-context">
        <div className="min-w-0">
          <p className="sss-context-kicker">Listing INV-4402</p>
          <p className="sss-context-title">Champions League Final · Club Level</p>
        </div>
        <span className="sss-chip">Qty 2</span>
      </div>

      <ol className="sss-rail" aria-label="Channel pipeline">
        {marketStages.map((stage, index) => {
          const done = index < stageTick;
          const current = index === stageTick;
          return (
            <li
              key={stage.label}
              data-done={done ? "true" : "false"}
              data-current={current ? "true" : "false"}
            >
              <span className="sss-rail-icon" aria-hidden>
                {done ? (
                  <CheckCircle2 className="size-3.5" />
                ) : current ? (
                  <Loader2 className="size-3.5 lc-spin" />
                ) : (
                  <Circle className="size-3.5" />
                )}
              </span>
              <strong>{stage.label}</strong>
              <span>{stage.detail}</span>
            </li>
          );
        })}
      </ol>

      <div className="sss-work">
        <section className="lc-panel sss-panel">
          <header className="lc-panel-head">
            Ask vs floor
            <span className="lc-panel-badge lc-panel-badge-live">GUARD</span>
          </header>
          <div className="sss-bars">
            <div>
              <span>
                Ask <strong>£{price.ask}</strong>
              </span>
              <b>
                <i style={{ width: `${askPct}%` }} />
              </b>
            </div>
            <div>
              <span>
                Floor <strong>£{price.floor}</strong>
              </span>
              <b>
                <i data-tone="floor" style={{ width: `${floorPct}%` }} />
              </b>
            </div>
          </div>
        </section>

        <section className="lc-panel sss-panel">
          <header className="lc-panel-head">
            Channel lag
            <span className="lc-panel-badge">API</span>
          </header>
          <ul className="sss-lags">
            {marketLags.map((row, index) => (
              <li key={row.channel} data-active={lagTick === index ? "true" : "false"}>
                <strong>{row.channel}</strong>
                <span className="sss-status" data-status={row.state}>
                  {row.state}
                </span>
                <em>{row.lag}</em>
              </li>
            ))}
          </ul>
        </section>
      </div>

      <Feed rows={feedRows} />
    </ConsoleShell>
  );
}

const partnerEndpoints = [
  { method: "GET", path: "/v1/events", body: '{ "eventId": "EVT-1842", "venue": "Wembley" }' },
  { method: "GET", path: "/v1/inventory", body: '{ "section": "Club", "qty": 2, "ask": 248 }' },
  { method: "POST", path: "/v1/listings", body: '{ "listingId": "INV-4402", "channels": 6 }' },
  { method: "POST", path: "/v1/orders", body: '{ "orderId": "ORD-991", "status": "paid" }' },
  { method: "GET", path: "/v1/pricing", body: '{ "recommended": 252, "floor": 232 }' },
] as const;
const partnerRoles = ["Broker", "Partner", "Marketplace"] as const;
const partnerBridge = ["POS", "Auth", "API", "Dist"] as const;
const partnerFeed = [
  { time: "16:11:44", msg: "POST /v1/listings · 201" },
  { time: "16:11:38", msg: "GET /v1/inventory · 200" },
  { time: "16:11:31", msg: "webhook.delivery · order.created" },
  { time: "16:11:22", msg: "auth.sign · partner role" },
  { time: "16:11:14", msg: "pos.batch · 18 seats mapped" },
  { time: "16:11:06", msg: "scope.check · inventory:write" },
];

function PartnerBridgeConsole({ ticking }: { ticking: boolean }) {
  const endpointTick = useCycle(partnerEndpoints.length, 2300, ticking);
  const roleTick = useCycle(partnerRoles.length, 2800, ticking);
  const bridgeTick = useCycle(partnerBridge.length, 1700, ticking);
  const feedRows = [...partnerFeed, ...partnerFeed];
  const endpoint = partnerEndpoints[endpointTick] ?? partnerEndpoints[0];
  const role = partnerRoles[roleTick] ?? partnerRoles[1];

  return (
    <ConsoleShell path="seatsbrokers / api / partner-bridge" status="AUTH" icon={KeyRound}>
      <div className="sss-stats">
        <div className="lc-stat">
          <span className="lc-stat-label">Live keys</span>
          <strong className="lc-stat-value">42</strong>
        </div>
        <div className="lc-stat">
          <span className="lc-stat-label">Role</span>
          <strong className="lc-stat-value sss-tick">{role}</strong>
        </div>
        <div className="lc-stat">
          <span className="lc-stat-label">Status</span>
          <strong className="lc-stat-value">200</strong>
        </div>
      </div>

      <div className="sss-context">
        <div className="min-w-0">
          <p className="sss-context-kicker">Internal POS → API</p>
          <p className="sss-context-title">Events · Inventory · Listing · Order · Pricing</p>
        </div>
        <span className="sss-chip">Bearer</span>
      </div>

      <ol className="sss-steps" aria-label="Integration bridge">
        {partnerBridge.map((stage, index) => (
          <li key={stage} data-active={bridgeTick === index ? "true" : "false"}>
            <span>{String(index + 1).padStart(2, "0")}</span>
            {stage}
          </li>
        ))}
      </ol>

      <div className="sss-work sss-work-api">
        <section className="lc-panel sss-panel">
          <header className="lc-panel-head">
            Endpoints
            <span className="lc-panel-badge lc-panel-badge-live">{endpoint.method}</span>
          </header>
          <ul className="sss-endpoints">
            {partnerEndpoints.map((item, index) => (
              <li key={item.path} data-active={endpointTick === index ? "true" : "false"}>
                <em>{item.method}</em>
                {item.path}
              </li>
            ))}
          </ul>
        </section>

        <section className="lc-panel lc-panel-accent sss-panel">
          <header className="lc-panel-head">
            Signed payload
            <span className="lc-panel-badge">{role}</span>
          </header>
          <pre className="sss-json">{endpoint.body}</pre>
          <p className="sss-note">Role-based access · inventory:read · orders:write</p>
        </section>
      </div>

      <Feed rows={feedRows} />
    </ConsoleShell>
  );
}

function Feed({ rows }: { rows: { time: string; msg: string }[] }) {
  return (
    <div className="lc-feed-viewport lc-feed-viewport-sm sss-feed">
      <ul className="lc-feed-list">
        {rows.map((row, index) => (
          <li key={`${row.time}-${index}`} className="lc-feed-row">
            <span className="lc-feed-time">{row.time}</span>
            <span className="lc-feed-msg">{row.msg}</span>
            <span className="lc-feed-ok" data-ok="true" />
          </li>
        ))}
      </ul>
    </div>
  );
}

const consoles = {
  brokers: BrokerDistributionConsole,
  travel: TravelQuoteConsole,
  marketplaces: MarketplaceSyncConsole,
  partners: PartnerBridgeConsole,
} as const;

export function StickyScrollConsole({ kind, live, label }: StickyScrollConsoleProps) {
  const { setRef, ticking } = useConsoleLive(live);
  const Console = consoles[kind];

  return (
    <div
      ref={setRef}
      className="sss-stage"
      data-live={ticking ? "true" : "false"}
      data-kind={kind}
      aria-label={label}
    >
      <Console ticking={ticking} />
    </div>
  );
}
