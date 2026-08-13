import type { ReactNode } from "react";
import {
  Activity,
  ArrowRightLeft,
  Radio,
  RefreshCw,
  ShieldCheck,
  Tag,
  Ticket,
  Wifi,
} from "lucide-react";
import type { MarketplaceHeroCard } from "@/content/marketplace-hero-data";
import {
  heroApiHealth,
  heroChannels,
  heroConflictGuard,
  heroDelist,
  heroListingPush,
  heroOrderSync,
  heroPriceSync,
  heroQtySync,
} from "@/content/marketplace-hero-data";

type CardProps = {
  card: MarketplaceHeroCard;
  index: number;
};

function CardShell({
  icon: Icon,
  label,
  children,
  accent,
}: {
  icon: typeof Radio;
  label: string;
  accent?: boolean;
  children: ReactNode;
}) {
  return (
    <article className={`bh-card${accent ? " bh-card-accent" : ""}`} data-live="true">
      <header className="bh-card-head">
        <span className="bh-card-icon" aria-hidden>
          <Icon className="size-3" strokeWidth={1.75} />
        </span>
        <span className="bh-card-label">{label}</span>
        <span className="bh-card-live">
          <span className="bh-card-live-dot" aria-hidden />
          LIVE
        </span>
      </header>
      <div className="bh-card-body">{children}</div>
    </article>
  );
}

function ChannelStatusCard({ index }: { index: number }) {
  const start = index % 2 === 0 ? 0 : 1;
  const rows = heroChannels.slice(start, start + 3);
  return (
    <CardShell icon={Radio} label="Channel status">
      <ul className="bh-mp-list">
        {rows.map((row) => (
          <li key={row.name} className="bh-mp-row" data-status={row.status}>
            <span>{row.name}</span>
            <span className="bh-mp-meta">
              <span className="bh-mp-count">{row.latency}</span>
              <span className="bh-mp-status">{row.status === "pushing" ? "PUSHING" : "SYNCED"}</span>
            </span>
          </li>
        ))}
      </ul>
    </CardShell>
  );
}

function ListingPushCard() {
  return (
    <CardShell icon={ArrowRightLeft} label="Listing distribution">
      <p className="bh-card-title bh-card-title-sm">{heroListingPush.event}</p>
      <div className="bh-metrics bh-metrics-2">
        <div>
          <span className="bh-metric-label">Qty</span>
          <strong className="bh-metric-value">{heroListingPush.qty}</strong>
        </div>
        <div>
          <span className="bh-metric-label">Channels</span>
          <strong className="bh-metric-value">{heroListingPush.channels}</strong>
        </div>
      </div>
      <p className="bh-card-foot">{heroListingPush.stage} · list once, distribute everywhere</p>
    </CardShell>
  );
}

function PriceSyncCard() {
  return (
    <CardShell icon={Tag} label="Price synchronization" accent>
      <div className="bh-ai-head">
        <div>
          <span className="bh-metric-label">Ask</span>
          <strong className="bh-metric-value bh-price-live">{heroPriceSync.to}</strong>
        </div>
        <span className="bh-ai-badge">PUSH</span>
      </div>
      <div className="bh-metrics bh-metrics-2">
        <div>
          <span className="bh-metric-label">Was</span>
          <strong className="bh-metric-value">{heroPriceSync.from}</strong>
        </div>
        <div>
          <span className="bh-metric-label">Acked</span>
          <strong className="bh-metric-value">{heroPriceSync.acked}</strong>
        </div>
      </div>
      <p className="bh-card-foot">{heroPriceSync.event}</p>
    </CardShell>
  );
}

function AutoDelistCard() {
  return (
    <CardShell icon={Ticket} label="Automatic delisting">
      <p className="bh-card-title bh-card-title-sm">{heroDelist.trigger}</p>
      <div className="bh-metrics bh-metrics-2">
        <div>
          <span className="bh-metric-label">Removed</span>
          <strong className="bh-metric-value bh-metric-sm">{heroDelist.removed}</strong>
        </div>
        <div>
          <span className="bh-metric-label">Guard</span>
          <strong className="bh-metric-value bh-metric-sm">{heroDelist.hold}</strong>
        </div>
      </div>
      <p className="bh-card-foot">Other listings updated automatically</p>
    </CardShell>
  );
}

function ApiHealthCard() {
  return (
    <CardShell icon={Wifi} label="API health">
      <div className="bh-metrics bh-metrics-3">
        <div>
          <span className="bh-metric-label">Channels</span>
          <strong className="bh-metric-value">{heroApiHealth.channels}</strong>
        </div>
        <div>
          <span className="bh-metric-label">Latency</span>
          <strong className="bh-metric-value">{heroApiHealth.latency}</strong>
        </div>
        <div>
          <span className="bh-metric-label">Errors</span>
          <strong className="bh-metric-value">{heroApiHealth.errors}</strong>
        </div>
      </div>
      <p className="bh-card-foot">Connection status per marketplace</p>
    </CardShell>
  );
}

function ConflictGuardCard() {
  return (
    <CardShell icon={ShieldCheck} label="Conflict guard">
      <div className="bh-metrics bh-metrics-2">
        <div>
          <span className="bh-metric-label">Holds</span>
          <strong className="bh-metric-value bh-metric-sm">{heroConflictGuard.holds}</strong>
        </div>
        <div>
          <span className="bh-metric-label">Conflicts</span>
          <strong className="bh-metric-value">{heroConflictGuard.conflicts}</strong>
        </div>
      </div>
      <div className="bh-desk-pulse" aria-hidden>
        <ShieldCheck className="size-3" strokeWidth={1.75} />
        <span>Double-sale protection · {heroConflictGuard.status}</span>
      </div>
    </CardShell>
  );
}

function QtySyncCard() {
  return (
    <CardShell icon={RefreshCw} label="Quantity sync">
      <div className="bh-metrics bh-metrics-2">
        <div>
          <span className="bh-metric-label">Listed</span>
          <strong className="bh-metric-value">{heroQtySync.listed}</strong>
        </div>
        <div>
          <span className="bh-metric-label">Live</span>
          <strong className="bh-metric-value bh-metric-sm">{heroQtySync.live}</strong>
        </div>
      </div>
      <div className="bh-bar-stack" aria-hidden>
        <span className="bh-bar-fill" style={{ ["--bh-bar" as string]: "84%" }} />
        <span className="bh-bar-fill bh-bar-fill-delay" style={{ ["--bh-bar" as string]: "62%" }} />
      </div>
      <p className="bh-card-foot">{heroQtySync.delta} · no overselling</p>
    </CardShell>
  );
}

function OrderSyncCard() {
  return (
    <CardShell icon={Activity} label="Order synchronization">
      <p className="bh-card-title bh-card-title-sm">{heroOrderSync.id}</p>
      <div className="bh-metrics bh-metrics-2">
        <div>
          <span className="bh-metric-label">Source</span>
          <strong className="bh-metric-value bh-metric-sm">{heroOrderSync.source}</strong>
        </div>
        <div>
          <span className="bh-metric-label">Stage</span>
          <strong className="bh-metric-value bh-metric-sm">{heroOrderSync.stage}</strong>
        </div>
      </div>
    </CardShell>
  );
}

export function MarketplaceConsoleCard({ card, index }: CardProps) {
  switch (card.type) {
    case "channel-status":
      return <ChannelStatusCard index={index} />;
    case "listing-push":
      return <ListingPushCard />;
    case "price-sync":
      return <PriceSyncCard />;
    case "auto-delist":
      return <AutoDelistCard />;
    case "api-health":
      return <ApiHealthCard />;
    case "conflict-guard":
      return <ConflictGuardCard />;
    case "qty-sync":
      return <QtySyncCard />;
    case "order-sync":
      return <OrderSyncCard />;
    default:
      return null;
  }
}

export function MarketplaceHeroIcon({ className }: { className?: string }) {
  return (
    <span className={className} aria-hidden>
      <Radio className="size-4" strokeWidth={1.75} />
    </span>
  );
}
