import { useEffect, useState } from "react";
import { MonitorSmartphone } from "lucide-react";
import { useInView } from "@/hooks/use-scroll-motion";
import {
  linkHeroConnect,
  linkHeroQueue,
  linkHeroSale,
  linkHeroStages,
} from "@/content/link-hero-data";

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

export function LinkConsoleWall() {
  const { ref, inView } = useInView<HTMLDivElement>(0.22);
  const queueTick = useCycle(linkHeroQueue.length, 2400, inView);
  const stageTick = useCycle(linkHeroStages.length, 2200, inView);
  const connectTick = useCycle(linkHeroConnect.length, 2800, inView);
  const stage = linkHeroStages[stageTick] ?? linkHeroStages[0]!;

  return (
    <div ref={ref} className="bh-wall lkh-stage" data-live={inView ? "true" : "false"}>
      <span className="bh-wall-glow" aria-hidden />

      <div className="lkh-room">
        <header className="lkh-head">
          <div className="lkh-head-copy">
            <p className="lkh-kicker">
              <MonitorSmartphone className="size-3" strokeWidth={2} />
              Operations desk
            </p>
            <p className="lkh-event">
              {linkHeroSale.event}
              <span>
                {linkHeroSale.id} · {linkHeroSale.section} × {linkHeroSale.qty}
              </span>
            </p>
          </div>
          <div className="lkh-head-meta">
            <span className="lkh-horizon">{stage.label}</span>
            <span className="lkh-live">
              <span className="lkh-live-dot" aria-hidden />
              Live
            </span>
          </div>
        </header>

        <div className="lkh-body">
          <ul className="lkh-queue" aria-label="POS order queue">
            <span className="lkh-bus" aria-hidden />
            {linkHeroQueue.map((row, index) => (
              <li key={row.id} data-active={queueTick === index ? "true" : "false"}>
                <span className="lkh-queue-dot" aria-hidden />
                <span className="lkh-queue-copy">
                  <em>{row.event}</em>
                  <strong className="lc-mono">{row.id}</strong>
                </span>
                <span className="lkh-queue-state">{row.state}</span>
              </li>
            ))}
          </ul>

          <ol className="lkh-pipe" aria-label="Sale pipeline">
            {linkHeroStages.map((row, index) => (
              <li key={row.label} data-active={stageTick === index ? "true" : "false"}>
                <span className="lkh-pipe-index lc-mono">{String(index + 1).padStart(2, "0")}</span>
                <span className="lkh-pipe-copy">
                  <strong>{row.label}</strong>
                  <em>{row.detail}</em>
                </span>
              </li>
            ))}
          </ol>
        </div>

        <footer className="lkh-foot">
          <ul className="lkh-connect" aria-label="Connected stack">
            {linkHeroConnect.map((row, index) => (
              <li key={row.label} data-active={connectTick === index ? "true" : "false"}>
                <span>{row.label}</span>
                <em>{row.state}</em>
              </li>
            ))}
          </ul>
        </footer>
      </div>

      <p className="sr-only">
        SeatsLink™ operations desk for {linkHeroSale.event}. Tickets move through received,
        verified, payment, fulfilment and complete while POS, feeds, API, ERP and sites stay
        connected. Active stage {stage.label}.
      </p>
    </div>
  );
}
