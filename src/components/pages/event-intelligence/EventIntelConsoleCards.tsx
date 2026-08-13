import type { ReactNode } from "react";
import {
  BrainCircuit,
  CalendarClock,
  GitCompareArrows,
  Gauge,
  LineChart,
  Map,
  Radar,
  Signal,
} from "lucide-react";
import type { EventIntelHeroCard } from "@/content/event-intel-hero-data";
import {
  heroCatalog,
  heroComparables,
  heroDemandScore,
  heroForecast,
  heroOnsales,
  heroPriceMovement,
  heroSelloutRisk,
  heroVenueMap,
} from "@/content/event-intel-hero-data";

type CardProps = {
  card: EventIntelHeroCard;
  index: number;
};

function CardShell({
  icon: Icon,
  label,
  accent,
  children,
}: {
  icon: typeof Radar;
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

function OnsaleRadarCard({ index }: { index: number }) {
  const start = index % 2 === 0 ? 0 : 1;
  const rows = heroOnsales.slice(start, start + 3);
  return (
    <CardShell icon={CalendarClock} label="Onsale radar">
      <ul className="bh-mp-list">
        {rows.map((row) => (
          <li key={row.name} className="bh-mp-row" data-status={row.status}>
            <span>{row.name}</span>
            <span className="bh-mp-meta">
              <span className="bh-mp-count">{row.window}</span>
              <span className="bh-mp-status">{row.status === "pushing" ? "OPENS" : "TRACKED"}</span>
            </span>
          </li>
        ))}
      </ul>
    </CardShell>
  );
}

function DemandScoreCard() {
  return (
    <CardShell icon={Signal} label="Demand score">
      <div className="bh-metrics bh-metrics-2">
        <div>
          <span className="bh-metric-label">Score</span>
          <strong className="bh-metric-value bh-tick">{heroDemandScore.score}</strong>
        </div>
        <div>
          <span className="bh-metric-label">7-day</span>
          <strong className="bh-metric-value bh-metric-up">{heroDemandScore.trend}</strong>
        </div>
      </div>
      <div className="bh-chart-bars" aria-hidden>
        {heroDemandScore.bars.map((height, i) => (
          <span
            key={i}
            className="bh-chart-bar"
            style={{ ["--bh-h" as string]: `${height}%`, ["--bh-i" as string]: i }}
          />
        ))}
      </div>
      <p className="bh-card-foot">{heroDemandScore.event}</p>
    </CardShell>
  );
}

function PriceMovementCard() {
  return (
    <CardShell icon={LineChart} label="Price movement">
      <div className="bh-ai-head">
        <div>
          <span className="bh-metric-label">Median ask</span>
          <strong className="bh-metric-value bh-price-live">{heroPriceMovement.ask}</strong>
        </div>
        <span className="bh-ai-badge">{heroPriceMovement.badge}</span>
      </div>
      <div className="bh-metrics bh-metrics-2">
        <div>
          <span className="bh-metric-label">Low</span>
          <strong className="bh-metric-value">{heroPriceMovement.low}</strong>
        </div>
        <div>
          <span className="bh-metric-label">Change</span>
          <strong className="bh-metric-value bh-metric-up">{heroPriceMovement.change}</strong>
        </div>
      </div>
      <svg className="bh-sparkline" viewBox="0 0 120 28" aria-hidden>
        <polyline
          className="bh-sparkline-line"
          points="0,24 18,20 36,21 54,14 72,16 90,9 106,7 120,3"
        />
      </svg>
      <p className="bh-card-foot">{heroPriceMovement.event}</p>
    </CardShell>
  );
}

function ComparablesCard() {
  return (
    <CardShell icon={GitCompareArrows} label="Comparable events">
      <p className="bh-card-title bh-card-title-sm">{heroComparables.event}</p>
      <div className="bh-metrics bh-metrics-3">
        <div>
          <span className="bh-metric-label">Match</span>
          <strong className="bh-metric-value">{heroComparables.match}</strong>
        </div>
        <div>
          <span className="bh-metric-label">Ask</span>
          <strong className="bh-metric-value">{heroComparables.ask}</strong>
        </div>
        <div>
          <span className="bh-metric-label">Outcome</span>
          <strong className="bh-metric-value bh-metric-sm">{heroComparables.outcome}</strong>
        </div>
      </div>
      <p className="bh-card-foot">Matched on category, venue tier and days to event</p>
    </CardShell>
  );
}

function SelloutRiskCard() {
  return (
    <CardShell icon={Gauge} label="Sellout risk">
      <div className="bh-metrics bh-metrics-2">
        <div>
          <span className="bh-metric-label">Risk</span>
          <strong className="bh-metric-value">{heroSelloutRisk.risk}</strong>
        </div>
        <div>
          <span className="bh-metric-label">Horizon</span>
          <strong className="bh-metric-value">{heroSelloutRisk.horizon}</strong>
        </div>
      </div>
      <div className="bh-bar-stack" aria-hidden>
        <span className="bh-bar-fill" style={{ ["--bh-bar" as string]: "78%" }} />
        <span className="bh-bar-fill bh-bar-fill-delay" style={{ ["--bh-bar" as string]: "61%" }} />
        <span className="bh-bar-fill bh-bar-fill-delay-2" style={{ ["--bh-bar" as string]: "34%" }} />
      </div>
      <p className="bh-card-foot">{heroSelloutRisk.band}</p>
    </CardShell>
  );
}

function VenueMapCard() {
  return (
    <CardShell icon={Map} label="Venue map">
      <p className="bh-card-title bh-card-title-sm">{heroVenueMap.venue}</p>
      <div className="bh-metrics bh-metrics-2">
        <div>
          <span className="bh-metric-label">Sections</span>
          <strong className="bh-metric-value">{heroVenueMap.sections}</strong>
        </div>
        <div>
          <span className="bh-metric-label">Mapped</span>
          <strong className="bh-metric-value">{heroVenueMap.mapped}</strong>
        </div>
      </div>
      <div className="bh-flow" aria-hidden>
        {heroVenueMap.nodes.map((node, i) => (
          <span key={node} className="bh-flow-node" data-active={i === 1 ? "true" : "false"}>
            {node}
            {i < heroVenueMap.nodes.length - 1 ? (
              <span className="bh-flow-link">
                <span className="bh-flow-packet" />
              </span>
            ) : null}
          </span>
        ))}
      </div>
      <p className="bh-card-foot">Sections and rows linked to listing data</p>
    </CardShell>
  );
}

function CatalogCoverageCard() {
  return (
    <CardShell icon={Radar} label="Catalog coverage">
      <div className="bh-metrics bh-metrics-3">
        <div>
          <span className="bh-metric-label">Events</span>
          <strong className="bh-metric-value">{heroCatalog.events}</strong>
        </div>
        <div>
          <span className="bh-metric-label">Categories</span>
          <strong className="bh-metric-value">{heroCatalog.categories}</strong>
        </div>
        <div>
          <span className="bh-metric-label">Onsales 7d</span>
          <strong className="bh-metric-value">{heroCatalog.onsales}</strong>
        </div>
      </div>
      <p className="bh-card-foot">Structured across sport, music, theatre and festivals</p>
    </CardShell>
  );
}

function ForecastCard() {
  return (
    <CardShell icon={BrainCircuit} label="Event forecast" accent>
      <div className="bh-ai-head">
        <div>
          <span className="bh-metric-label">Projected sellout</span>
          <strong className="bh-metric-value">{heroForecast.sellout}</strong>
        </div>
        <span className="bh-ai-badge">{heroForecast.badge}</span>
      </div>
      <div className="bh-metrics bh-metrics-2">
        <div>
          <span className="bh-metric-label">Confidence</span>
          <strong className="bh-metric-value">{heroForecast.confidence}</strong>
        </div>
        <div>
          <span className="bh-metric-label">Scenarios</span>
          <strong className="bh-metric-value">3</strong>
        </div>
      </div>
      <p className="bh-card-foot">{heroForecast.event}</p>
    </CardShell>
  );
}

export function EventIntelConsoleCard({ card, index }: CardProps) {
  switch (card.type) {
    case "onsale-radar":
      return <OnsaleRadarCard index={index} />;
    case "demand-score":
      return <DemandScoreCard />;
    case "price-movement":
      return <PriceMovementCard />;
    case "comparables":
      return <ComparablesCard />;
    case "sellout-risk":
      return <SelloutRiskCard />;
    case "venue-map":
      return <VenueMapCard />;
    case "catalog-coverage":
      return <CatalogCoverageCard />;
    case "forecast":
      return <ForecastCard />;
    default:
      return null;
  }
}

export function EventIntelHeroIcon({ className }: { className?: string }) {
  return (
    <span className={className} aria-hidden>
      <Radar className="size-4" strokeWidth={1.75} />
    </span>
  );
}
