import { useEffect, useState } from "react";
import { Radio } from "lucide-react";
import { useInView } from "@/hooks/use-scroll-motion";
import {
  marketplaceHeroConflicts,
  marketplaceHeroMesh,
  marketplaceHeroOps,
  marketplaceHeroOrigin,
  marketplaceHeroPriceAlign,
  marketplaceHeroSyncLog,
  type MarketplaceHeroMeshStatus,
} from "@/content/marketplace-hero-data";

const FAN_PATHS = [
  "M 42 108 C 88 108 104 16 142 16",
  "M 42 108 C 88 108 104 52 142 52",
  "M 42 108 C 88 108 104 88 142 88",
  "M 42 108 C 88 108 104 128 142 128",
  "M 42 108 C 88 108 104 164 142 164",
  "M 42 108 C 88 108 104 200 142 200",
] as const;

const PIP_COUNT = 12;

function useCycle(length: number, ms: number, enabled: boolean) {
  const [active, setActive] = useState(0);

  useEffect(() => {
    if (!enabled || length <= 1) return;
    const id = window.setInterval(() => {
      setActive((i) => (i + 1) % length);
    }, ms);
    return () => window.clearInterval(id);
  }, [length, ms, enabled]);

  return active;
}

function statusLabel(status: MarketplaceHeroMeshStatus) {
  if (status === "lagging") return "LAGGING";
  if (status === "conflict") return "CONFLICT";
  return "SYNCED";
}

function DensityPips({ filled }: { filled: number }) {
  return (
    <span className="mkh-pips" aria-hidden>
      {Array.from({ length: PIP_COUNT }, (_, i) => (
        <i key={i} data-on={i < filled ? "true" : "false"} />
      ))}
    </span>
  );
}

export function MarketplaceConsoleWall() {
  const { ref, inView } = useInView<HTMLDivElement>(0.22);
  const active = useCycle(marketplaceHeroMesh.length, 2400, inView);
  const pulseTick = useCycle(marketplaceHeroSyncLog.length, 1800, inView);

  return (
    <div ref={ref} className="bh-wall mkh-stage" data-live={inView ? "true" : "false"}>
      <span className="bh-wall-glow" aria-hidden />

      <div className="mkh-room">
        <header className="mkh-head">
          <div className="mkh-head-copy">
            <p className="mkh-kicker">
              <Radio className="size-3" strokeWidth={2} />
              Channel mesh
            </p>
            <p className="mkh-head-meta">
              {marketplaceHeroOps.channelsLive} live · {marketplaceHeroOps.listingsPushed} listings · last
              pulse {marketplaceHeroOps.lastSync}
            </p>
          </div>
          <span className="mkh-live">
            <span className="mkh-live-dot" aria-hidden />
            LIVE
          </span>
        </header>

        <div className="mkh-body">
          <section className="mkh-fan" aria-label="Listing fan-out to connected channels">
            <article className="mkh-origin">
              <span className="mkh-origin-id">{marketplaceHeroOrigin.id}</span>
              <p className="mkh-origin-event">{marketplaceHeroOrigin.event}</p>
              <p className="mkh-origin-section">{marketplaceHeroOrigin.section}</p>
              <dl className="mkh-origin-stats">
                <div>
                  <dt>Qty</dt>
                  <dd>{marketplaceHeroOrigin.qty}</dd>
                </div>
                <div>
                  <dt>Ask</dt>
                  <dd>{marketplaceHeroOrigin.ask}</dd>
                </div>
                <div>
                  <dt>Dest</dt>
                  <dd>{marketplaceHeroOrigin.destinations}</dd>
                </div>
              </dl>
            </article>

            <svg className="mkh-fan-svg" viewBox="0 0 148 216" aria-hidden>
              {FAN_PATHS.map((d, i) => (
                <g key={d}>
                  <path d={d} className="mkh-fan-path" data-active={active === i ? "true" : "false"} />
                  {inView ? (
                    <circle
                      r="2.5"
                      className="mkh-fan-packet"
                      data-active={active === i ? "true" : "false"}
                    >
                      <animateMotion dur="2.5s" repeatCount="indefinite" begin={`${i * 0.28}s`} path={d} />
                    </circle>
                  ) : null}
                </g>
              ))}
              <circle cx="32" cy="108" r="7" className="mkh-fan-hub" />
              <circle cx="32" cy="108" r="12" className="mkh-fan-ring" />
            </svg>
          </section>

          <section className="mkh-mosaic" aria-label="Connected channel tiles">
            {marketplaceHeroMesh.map((channel, index) => (
              <article
                key={channel.code}
                className="mkh-tile"
                data-status={channel.status}
                data-active={active === index ? "true" : "false"}
              >
                <header className="mkh-tile-head">
                  <span className="mkh-tile-dot" aria-hidden />
                  <span className="mkh-tile-code">{channel.code}</span>
                  <span className="mkh-tile-state">{statusLabel(channel.status)}</span>
                </header>
                <p className="mkh-tile-name">{channel.name}</p>
                <DensityPips filled={channel.pips} />
                <footer className="mkh-tile-foot">
                  <span>{channel.listings.toLocaleString("en-GB")} listings</span>
                  <span>{channel.latency}</span>
                </footer>
              </article>
            ))}
          </section>
        </div>

        <section className="mkh-timeline" aria-label="Recent sync events">
          <p className="mkh-panel-label">Sync timeline</p>
          <ol className="mkh-ticks">
            {marketplaceHeroSyncLog.map((row, index) => (
              <li key={row.time} data-active={pulseTick === index ? "true" : "false"}>
                <span className="mkh-tick-time">{row.time.slice(3)}</span>
                <span className="mkh-tick-node" aria-hidden />
                <span className="mkh-tick-event">{row.event}</span>
              </li>
            ))}
          </ol>
        </section>

        <section className="mkh-align" aria-label="Price alignment and conflict queue">
          <div className="mkh-compare">
            <div className="mkh-compare-side">
              <span className="mkh-compare-label">Ask</span>
              <strong className="mkh-compare-value">{marketplaceHeroPriceAlign.ask}</strong>
              <span className="mkh-compare-hint">Hub price</span>
            </div>
            <div className="mkh-compare-spread">
              <span>{marketplaceHeroPriceAlign.spread}</span>
              <em>{marketplaceHeroPriceAlign.acked} acked</em>
            </div>
            <div className="mkh-compare-side" data-side="floor">
              <span className="mkh-compare-label">Floor</span>
              <strong className="mkh-compare-value">{marketplaceHeroPriceAlign.floor}</strong>
              <span className="mkh-compare-hint">Channel min</span>
            </div>
          </div>

          <ul className="mkh-queue">
            {marketplaceHeroConflicts.map((row) => (
              <li key={row.code} data-state={row.state}>
                <span className="mkh-queue-pip" aria-hidden />
                <span className="mkh-queue-code">{row.code}</span>
                <span className="mkh-queue-name">{row.name}</span>
                <span className="mkh-queue-issue">{row.issue}</span>
              </li>
            ))}
          </ul>
        </section>
      </div>

      <p className="sr-only">
        Marketplace connectivity preview: {marketplaceHeroOps.channelsLive} channels live,{" "}
        {marketplaceHeroOps.listingsPushed} listings pushed, last sync {marketplaceHeroOps.lastSync},{" "}
        {marketplaceHeroOps.conflictsOpen} conflict open, price alignment {marketplaceHeroOps.alignment}.
        Listing {marketplaceHeroOrigin.id} fans out from {marketplaceHeroOrigin.ask} across Global resale,
        Sports exchange, Regional OTA, Broker desk, Travel partners and White-label.
      </p>
    </div>
  );
}
