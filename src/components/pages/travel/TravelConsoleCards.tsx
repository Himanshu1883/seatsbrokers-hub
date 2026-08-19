import type { ReactNode } from "react";
import {
  ClipboardList,
  FileText,
  Mail,
  MessageCircle,
  Percent,
  Search,
  Send,
  Ticket,
  Truck,
} from "lucide-react";
import type { TravelHeroCard } from "@/content/travel-hero-data";
import {
  heroDelivery,
  heroMarginMath,
  heroOrderStatus,
  heroPartnerPricing,
  heroQuotePreview,
  heroRecentQuotes,
  heroSearchHit,
  heroShareChannels,
} from "@/content/travel-hero-data";

type CardProps = {
  card: TravelHeroCard;
};

function CardShell({
  icon: Icon,
  label,
  children,
  accent,
}: {
  icon: typeof Search;
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
          Live
        </span>
      </header>
      <div className="bh-card-body">{children}</div>
    </article>
  );
}

function InventorySearchCard() {
  return (
    <CardShell icon={Search} label="Inventory search">
      <p className="bh-card-title">{heroSearchHit.event}</p>
      <p className="bh-card-meta">{heroSearchHit.venue}</p>
      <div className="bh-metrics bh-metrics-2">
        <div>
          <span className="bh-metric-label">From</span>
          <strong className="bh-metric-value">{heroSearchHit.from}</strong>
        </div>
        <div>
          <span className="bh-metric-label">Available</span>
          <strong className="bh-metric-value bh-metric-sm">{heroSearchHit.seats}</strong>
        </div>
      </div>
      <p className="bh-card-foot">Just synced from broker inventory</p>
    </CardShell>
  );
}

function MarginMathCard() {
  return (
    <CardShell icon={Percent} label="Margin math" accent>
      <div className="bh-metrics bh-metrics-3">
        <div>
          <span className="bh-metric-label">Ticket</span>
          <strong className="bh-metric-value">{heroMarginMath.ticket}</strong>
        </div>
        <div>
          <span className="bh-metric-label">Margin</span>
          <strong className="bh-metric-value bh-metric-up">{heroMarginMath.margin}</strong>
        </div>
        <div>
          <span className="bh-metric-label">Customer</span>
          <strong className="bh-metric-value">{heroMarginMath.customer}</strong>
        </div>
      </div>
      <p className="bh-card-foot">Ticket + partner margin = customer price</p>
    </CardShell>
  );
}

function QuotePreviewCard() {
  return (
    <CardShell icon={FileText} label="Quote preview">
      <div className="bh-ai-head">
        <div>
          <span className="bh-metric-label">{heroQuotePreview.id}</span>
          <strong className="bh-metric-value">{heroQuotePreview.total}</strong>
        </div>
        <span className="bh-ai-badge">PDF</span>
      </div>
      <p className="bh-card-event">{heroQuotePreview.event}</p>
      <p className="bh-card-foot">{heroQuotePreview.customer}</p>
    </CardShell>
  );
}

function ShareChannelsCard() {
  return (
    <CardShell icon={Send} label="Share with customer">
      <div className="bh-flow" aria-hidden>
        {heroShareChannels.map((channel, index) => (
          <span key={channel} className="bh-flow-node" data-active={index === 1 ? "true" : "false"}>
            {channel === "WhatsApp" ? (
              <MessageCircle className="size-3" strokeWidth={1.75} />
            ) : channel === "Email" ? (
              <Mail className="size-3" strokeWidth={1.75} />
            ) : (
              <FileText className="size-3" strokeWidth={1.75} />
            )}
            {channel}
            {index < heroShareChannels.length - 1 ? (
              <span className="bh-flow-link">
                <span className="bh-flow-packet" />
              </span>
            ) : null}
          </span>
        ))}
      </div>
      <p className="bh-card-foot">PDF · WhatsApp · Email</p>
    </CardShell>
  );
}

function RecentQuotesCard() {
  return (
    <CardShell icon={Ticket} label="Recent quotes">
      <ul className="bh-mp-list">
        {heroRecentQuotes.map((row) => (
          <li key={row.id} className="bh-mp-row" data-status={row.status === "accepted" ? "synced" : "pushing"}>
            <span>{row.id}</span>
            <span className="bh-mp-meta">
              <span className="bh-mp-status">{row.status.charAt(0).toUpperCase() + row.status.slice(1)}</span>
            </span>
          </li>
        ))}
      </ul>
    </CardShell>
  );
}

function OrderStatusCard() {
  return (
    <CardShell icon={ClipboardList} label="Order status">
      <p className="bh-card-title bh-card-title-sm">{heroOrderStatus.id}</p>
      <div className="bh-metrics bh-metrics-2">
        <div>
          <span className="bh-metric-label">Stage</span>
          <strong className="bh-metric-value bh-metric-sm">{heroOrderStatus.stage}</strong>
        </div>
        <div>
          <span className="bh-metric-label">Delivery</span>
          <strong className="bh-metric-value bh-metric-sm">{heroOrderStatus.delivery}</strong>
        </div>
      </div>
    </CardShell>
  );
}

function DeliveryCard() {
  return (
    <CardShell icon={Truck} label="Delivery">
      <div className="bh-metrics bh-metrics-3">
        <div>
          <span className="bh-metric-label">Method</span>
          <strong className="bh-metric-value bh-metric-sm">{heroDelivery.method}</strong>
        </div>
        <div>
          <span className="bh-metric-label">ETA</span>
          <strong className="bh-metric-value">{heroDelivery.eta}</strong>
        </div>
        <div>
          <span className="bh-metric-label">Status</span>
          <strong className="bh-metric-value bh-metric-sm">{heroDelivery.status}</strong>
        </div>
      </div>
      <p className="bh-card-foot">Tracked back to the partner desk</p>
    </CardShell>
  );
}

function PartnerPricingCard() {
  return (
    <CardShell icon={Percent} label="Partner pricing">
      <div className="bh-metrics bh-metrics-3">
        <div>
          <span className="bh-metric-label">Cost</span>
          <strong className="bh-metric-value">{heroPartnerPricing.cost}</strong>
        </div>
        <div>
          <span className="bh-metric-label">Markup</span>
          <strong className="bh-metric-value bh-metric-up">{heroPartnerPricing.markup}</strong>
        </div>
        <div>
          <span className="bh-metric-label">Sell</span>
          <strong className="bh-metric-value">{heroPartnerPricing.sell}</strong>
        </div>
      </div>
    </CardShell>
  );
}

export function TravelConsoleCard({ card }: CardProps) {
  switch (card.type) {
    case "inventory-search":
      return <InventorySearchCard />;
    case "margin-math":
      return <MarginMathCard />;
    case "quote-preview":
      return <QuotePreviewCard />;
    case "share-channels":
      return <ShareChannelsCard />;
    case "recent-quotes":
      return <RecentQuotesCard />;
    case "order-status":
      return <OrderStatusCard />;
    case "delivery":
      return <DeliveryCard />;
    case "partner-pricing":
      return <PartnerPricingCard />;
    default:
      return null;
  }
}

export function TravelHeroIcon({ className }: { className?: string }) {
  return (
    <span className={className} aria-hidden>
      <Send className="size-4" strokeWidth={1.75} />
    </span>
  );
}
