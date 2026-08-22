import { useEffect, useState } from "react";
import { Layers } from "lucide-react";
import { useInView } from "@/hooks/use-scroll-motion";
import {
  sourceHeroEvents,
  sourceHeroFeeds,
  sourceHeroLayers,
} from "@/content/source-hero-data";

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

export function SourceConsoleWall() {
  const { ref, inView } = useInView<HTMLDivElement>(0.22);
  const eventTick = useCycle(sourceHeroEvents.length, 2400, inView);
  const feedTick = useCycle(sourceHeroFeeds.length, 2800, inView);
  const layerTick = useCycle(sourceHeroLayers.length, 2600, inView);
  const event = sourceHeroEvents[eventTick] ?? sourceHeroEvents[0]!;

  return (
    <div ref={ref} className="bh-wall srh-stage" data-live={inView ? "true" : "false"}>
      <span className="bh-wall-glow" aria-hidden />

      <div className="srh-room">
        <header className="srh-head">
          <div className="srh-head-copy">
            <p className="srh-kicker">
              <Layers className="size-3" strokeWidth={2} />
              Catalog ingest
            </p>
            <p className="srh-event">
              {event.name}
              <span>
                {event.venue} · {event.id}
              </span>
            </p>
          </div>
          <div className="srh-head-meta">
            <span className="srh-horizon">{event.feed} in</span>
            <span className="srh-live">
              <span className="srh-live-dot" aria-hidden />
              Live
            </span>
          </div>
        </header>

        <div className="srh-body">
          <ul className="srh-catalog" aria-label="Event catalog">
            <span className="srh-bus" aria-hidden />
            {sourceHeroEvents.map((row, index) => (
              <li key={row.id} data-active={eventTick === index ? "true" : "false"}>
                <span className="srh-catalog-dot" aria-hidden />
                <span className="srh-catalog-copy">
                  <em>{row.name}</em>
                  <strong>{row.demand}</strong>
                </span>
              </li>
            ))}
          </ul>

          <section className="srh-stock" aria-label="Inventory layer">
            <header className="srh-panel-label">
              Inventory layer
              <span>Section · qty · £</span>
            </header>
            <ul className="srh-layers" aria-label="Stock sources">
              {sourceHeroLayers.map((layer, index) => (
                <li key={layer.id} data-active={layerTick === index ? "true" : "false"}>
                  <span>{layer.label}</span>
                  <em>{layer.state}</em>
                </li>
              ))}
            </ul>
            <div className="srh-sheet">
              <div className="srh-sheet-head" aria-hidden>
                <span>Section</span>
                <span>Qty</span>
                <span>Ask</span>
                <span>Status</span>
              </div>
              <ul className="srh-rows">
                {event.listings.map((row) => (
                  <li key={row.section}>
                    <span>{row.section}</span>
                    <span className="srh-num">{row.qty}</span>
                    <span className="srh-num srh-ask">{row.price}</span>
                    <span>
                      <span className="srh-status" data-state={row.status.toLowerCase()}>
                        {row.status}
                      </span>
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </section>
        </div>

        <footer className="srh-foot">
          <ul className="srh-feeds" aria-label="Ingest sources">
            {sourceHeroFeeds.map((feed, index) => (
              <li key={feed.id} data-active={feedTick === index ? "true" : "false"}>
                <span>{feed.label}</span>
                <em>{feed.detail}</em>
              </li>
            ))}
          </ul>
        </footer>
      </div>

      <p className="sr-only">
        SeatsSource™ inventory ingest for {event.name} at {event.venue}. Own stock, supplier
        feeds and POS ingest land in one inventory layer with sections, quantities and asks.
      </p>
    </div>
  );
}
