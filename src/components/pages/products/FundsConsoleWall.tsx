import { useEffect, useState } from "react";
import { Landmark } from "lucide-react";
import { useInView } from "@/hooks/use-scroll-motion";
import {
  fundsHeroLedger,
  fundsHeroPath,
  fundsHeroQueue,
  fundsHeroRails,
  fundsHeroSale,
  fundsHeroStages,
} from "@/content/funds-hero-data";

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

export function FundsConsoleWall() {
  const { ref, inView } = useInView<HTMLDivElement>(0.22);
  const stageTick = useCycle(fundsHeroStages.length, 2200, inView);
  const railTick = useCycle(fundsHeroRails.length, 3200, inView);
  const queueTick = useCycle(fundsHeroQueue.length, 2400, inView);
  const stage = fundsHeroStages[stageTick] ?? fundsHeroStages[0]!;
  const rail = fundsHeroRails[railTick] ?? fundsHeroRails[0]!;

  return (
    <div ref={ref} className="bh-wall fnh-stage" data-live={inView ? "true" : "false"}>
      <span className="bh-wall-glow" aria-hidden />

      <div className="fnh-room">
        <header className="fnh-head">
          <div className="fnh-head-copy">
            <p className="fnh-kicker">
              <Landmark className="size-3" strokeWidth={2} />
              Settlement desk
            </p>
            <p className="fnh-event">
              {fundsHeroSale.event}
              <span>
                {fundsHeroSale.venue} · {fundsHeroSale.channel}
              </span>
            </p>
          </div>
          <div className="fnh-head-meta">
            <span className="fnh-horizon">{rail.label}</span>
            <span className="fnh-live">
              <span className="fnh-live-dot" aria-hidden />
              Live
            </span>
          </div>
        </header>

        <div className="fnh-body">
          <ol className="fnh-stages" aria-label="Settlement stages">
            <span className="fnh-bus" aria-hidden />
            {fundsHeroStages.map((row, index) => (
              <li key={row.id} data-active={stageTick === index ? "true" : "false"}>
                <span className="fnh-stage-dot" aria-hidden />
                <span className="fnh-stage-copy">
                  <em>{row.label}</em>
                  <strong>{row.detail}</strong>
                </span>
              </li>
            ))}
          </ol>

          <section className="fnh-field" aria-label="Payout rails">
            <ul className="fnh-rails">
              {fundsHeroRails.map((row, index) => (
                <li key={row.id} data-active={railTick === index ? "true" : "false"} data-rail={row.id}>
                  <span className="fnh-rail-kicker">{row.kicker}</span>
                  <strong>{row.label}</strong>
                  <em>{row.detail}</em>
                </li>
              ))}
            </ul>

            <ol className="fnh-path" aria-label="Payout path">
              {fundsHeroPath.map((node, index) => (
                <li key={node.id} data-active={index <= stageTick ? "true" : "false"}>
                  <span className="fnh-path-node" aria-hidden />
                  <span>
                    <strong>{node.label}</strong>
                    <em>{node.hint}</em>
                  </span>
                </li>
              ))}
            </ol>

            <ul className="fnh-queue" aria-label="Settlement queue">
              {fundsHeroQueue.map((row, index) => (
                <li key={row.event} data-active={queueTick === index ? "true" : "false"}>
                  <span>{row.event}</span>
                  <em>{row.rail}</em>
                  <strong>{row.state}</strong>
                </li>
              ))}
            </ul>
          </section>
        </div>

        <footer className="fnh-foot">
          <ul className="fnh-ledger" aria-label="Settlement ledger">
            {fundsHeroLedger.map((line, index) => (
              <li key={line} data-active={stageTick === index % fundsHeroStages.length ? "true" : "false"}>
                {line}
              </li>
            ))}
          </ul>
        </footer>
      </div>

      <p className="sr-only">
        SeatsFunds™ settlement desk for {fundsHeroSale.event}. Sale, commission, transfer and
        settled on the {rail.label} rail. Standard is the default path; USDT is eligible where
        allowed. Active stage {stage.label}.
      </p>
    </div>
  );
}
