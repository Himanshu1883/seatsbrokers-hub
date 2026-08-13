import type { ReactNode } from "react";
import {
  Activity,
  ArrowRightLeft,
  BarChart3,
  BrainCircuit,
  CalendarDays,
  Layers3,
  MonitorSmartphone,
  Radio,
  RefreshCw,
  Sparkles,
} from "lucide-react";
import type { BrokerHeroCard } from "@/content/broker-hero-data";
import {
  heroAiPricing,
  heroDistributionNodes,
  heroEvents,
  heroInventory,
  heroMarketIntel,
  heroMarketplaces,
  heroSalesDesk,
  heroSyncLog,
} from "@/content/broker-hero-data";

type CardProps = {
  card: BrokerHeroCard;
  index: number;
};

function CardShell({
  icon: Icon,
  label,
  live = true,
  children,
  accent,
}: {
  icon: typeof Layers3;
  label: string;
  live?: boolean;
  accent?: boolean;
  children: ReactNode;
}) {
  return (
    <article className={`bh-card${accent ? " bh-card-accent" : ""}`} data-live={live ? "true" : "false"}>
      <header className="bh-card-head">
        <span className="bh-card-icon" aria-hidden>
          <Icon className="size-3" strokeWidth={1.75} />
        </span>
        <span className="bh-card-label">{label}</span>
        {live ? (
          <span className="bh-card-live">
            <span className="bh-card-live-dot" aria-hidden />
            LIVE
          </span>
        ) : null}
      </header>
      <div className="bh-card-body">{children}</div>
    </article>
  );
}

function InventoryCard({ index }: { index: number }) {
  const variant = index % 2;
  return (
    <CardShell icon={Layers3} label="Inventory console">
      <div className="bh-metrics bh-metrics-2">
        <div>
          <span className="bh-metric-label">Listings</span>
          <strong className="bh-metric-value bh-tick">{heroInventory.listings}</strong>
        </div>
        <div>
          <span className="bh-metric-label">Channels</span>
          <strong className="bh-metric-value">{heroInventory.channels}</strong>
        </div>
      </div>
      <p className="bh-card-event">{variant === 0 ? heroInventory.event : "PL · Arsenal vs Chelsea"}</p>
      <div className="bh-bar-stack" aria-hidden>
        <span className="bh-bar-fill" style={{ ["--bh-bar" as string]: "72%" }} />
        <span className="bh-bar-fill bh-bar-fill-delay" style={{ ["--bh-bar" as string]: "58%" }} />
        <span className="bh-bar-fill bh-bar-fill-delay-2" style={{ ["--bh-bar" as string]: "84%" }} />
      </div>
      <p className="bh-card-foot">{heroInventory.movement}</p>
    </CardShell>
  );
}

function MarketplaceSyncCard({ index }: { index: number }) {
  const start = index % 2 === 0 ? 0 : 1;
  const rows = heroMarketplaces.slice(start, start + 3);
  return (
    <CardShell icon={RefreshCw} label="Marketplace sync">
      <ul className="bh-mp-list">
        {rows.map((mp) => (
          <li key={mp.name} className="bh-mp-row" data-status={mp.status}>
            <span>{mp.name}</span>
            <span className="bh-mp-meta">
              <span className="bh-mp-count">{mp.count}</span>
              <span className="bh-mp-status">{mp.status === "pushing" ? "PUSHING" : "SYNCED"}</span>
            </span>
          </li>
        ))}
      </ul>
    </CardShell>
  );
}

function AiPricingCard() {
  return (
    <CardShell icon={Sparkles} label="AI pricing" accent>
      <div className="bh-ai-head">
        <div>
          <span className="bh-metric-label">Live ask</span>
          <strong className="bh-metric-value bh-price-live">{heroAiPricing.ask}</strong>
        </div>
        <span className="bh-ai-badge">{heroAiPricing.badge}</span>
      </div>
      <div className="bh-metrics bh-metrics-2">
        <div>
          <span className="bh-metric-label">Floor</span>
          <strong className="bh-metric-value">{heroAiPricing.floor}</strong>
        </div>
        <div>
          <span className="bh-metric-label">Confidence</span>
          <strong className="bh-metric-value">{heroAiPricing.confidence}</strong>
        </div>
      </div>
      <svg className="bh-sparkline" viewBox="0 0 120 28" aria-hidden>
        <polyline
          className="bh-sparkline-line"
          points="0,22 16,18 32,20 48,12 64,14 80,8 96,10 120,4"
        />
      </svg>
      <p className="bh-card-foot">{heroAiPricing.event}</p>
    </CardShell>
  );
}

function EventCatalogCard({ index }: { index: number }) {
  const event = heroEvents[index % heroEvents.length];
  return (
    <CardShell icon={CalendarDays} label="Event catalog">
      <p className="bh-card-title">{event.name}</p>
      <p className="bh-card-meta">
        {event.category} · {event.venue}
      </p>
      <div className="bh-metrics bh-metrics-2">
        <div>
          <span className="bh-metric-label">Date</span>
          <strong className="bh-metric-value bh-metric-sm">{event.date}</strong>
        </div>
        <div>
          <span className="bh-metric-label">Available</span>
          <strong className="bh-metric-value bh-metric-sm">{event.availability}</strong>
        </div>
      </div>
    </CardShell>
  );
}

function SyncActivityCard() {
  return (
    <CardShell icon={Radio} label="Sync activity">
      <ul className="bh-log-list">
        {heroSyncLog.slice(0, 4).map((row, i) => (
          <li key={row.time} className="bh-log-row" data-active={i === 1 ? "true" : "false"}>
            <span className="bh-log-dot" data-ok={row.ok ? "true" : "false"} aria-hidden />
            <span className="bh-log-time">{row.time}</span>
            <span className="bh-log-msg">{row.msg}</span>
          </li>
        ))}
      </ul>
      <span className="bh-log-scan" aria-hidden />
    </CardShell>
  );
}

function DistributionCard() {
  return (
    <CardShell icon={ArrowRightLeft} label="Distribution">
      <div className="bh-flow" aria-hidden>
        {heroDistributionNodes.map((node, i) => (
          <span key={node} className="bh-flow-node" data-active={i === 1 ? "true" : "false"}>
            {node}
            {i < heroDistributionNodes.length - 1 ? (
              <span className="bh-flow-link">
                <span className="bh-flow-packet" />
              </span>
            ) : null}
          </span>
        ))}
      </div>
      <p className="bh-card-foot">Real-time inventory routing · 8 channels</p>
    </CardShell>
  );
}

function MarketIntelligenceCard() {
  return (
    <CardShell icon={BarChart3} label="Market intelligence">
      <p className="bh-card-title bh-card-title-sm">{heroMarketIntel.event}</p>
      <div className="bh-metrics bh-metrics-3">
        <div>
          <span className="bh-metric-label">Avg</span>
          <strong className="bh-metric-value">{heroMarketIntel.avg}</strong>
        </div>
        <div>
          <span className="bh-metric-label">Demand</span>
          <strong className="bh-metric-value bh-metric-up">{heroMarketIntel.demand}</strong>
        </div>
        <div>
          <span className="bh-metric-label">Volume</span>
          <strong className="bh-metric-value">{heroMarketIntel.volume}</strong>
        </div>
      </div>
      <div className="bh-chart-bars" aria-hidden>
        {heroMarketIntel.bars.map((h, i) => (
          <span
            key={i}
            className="bh-chart-bar"
            style={{ ["--bh-h" as string]: `${h}%`, ["--bh-i" as string]: i }}
          />
        ))}
      </div>
    </CardShell>
  );
}

function SalesIntelligenceCard() {
  return (
    <CardShell icon={MonitorSmartphone} label="Sales intelligence">
      <div className="bh-metrics bh-metrics-2">
        <div>
          <span className="bh-metric-label">Orders today</span>
          <strong className="bh-metric-value">{heroSalesDesk.orders}</strong>
        </div>
        <div>
          <span className="bh-metric-label">Revenue</span>
          <strong className="bh-metric-value">{heroSalesDesk.revenue}</strong>
        </div>
      </div>
      <div className="bh-metrics bh-metrics-2">
        <div>
          <span className="bh-metric-label">Fulfillment</span>
          <strong className="bh-metric-value">{heroSalesDesk.conversion}</strong>
        </div>
        <div>
          <span className="bh-metric-label">Listings</span>
          <strong className="bh-metric-value bh-metric-sm">{heroSalesDesk.listings}</strong>
        </div>
      </div>
      <div className="bh-desk-pulse" aria-hidden>
        <Activity className="size-3" strokeWidth={1.75} />
        <span>Desk active · peak onsale window</span>
      </div>
    </CardShell>
  );
}

export function BrokersConsoleCard({ card, index }: CardProps) {
  switch (card.type) {
    case "inventory":
      return <InventoryCard index={index} />;
    case "marketplace-sync":
      return <MarketplaceSyncCard index={index} />;
    case "ai-pricing":
      return <AiPricingCard />;
    case "event-catalog":
      return <EventCatalogCard index={index} />;
    case "sync-activity":
      return <SyncActivityCard />;
    case "distribution":
      return <DistributionCard />;
    case "market-intelligence":
      return <MarketIntelligenceCard />;
    case "sales-intelligence":
      return <SalesIntelligenceCard />;
    default:
      return null;
  }
}

export function BrokersHeroIcon({ className }: { className?: string }) {
  return (
    <span className={className} aria-hidden>
      <BrainCircuit className="size-4" strokeWidth={1.75} />
    </span>
  );
}
