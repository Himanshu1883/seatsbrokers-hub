import { useEffect, useState } from "react";
import { useInView } from "@/hooks/use-scroll-motion";
import {
  sellerApplyChecks,
  sellerApplyQueue,
  sellerApplyStages,
} from "@/content/seller-hero-data";

function usePrefersReducedMotion() {
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => setReduced(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

  return reduced;
}

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

export function SellerApplyWall() {
  const { ref, inView } = useInView<HTMLDivElement>(0.28);
  const reduced = usePrefersReducedMotion();
  const live = inView && !reduced;
  const stageIndex = useCycle(sellerApplyStages.length, 2100, live);
  const queueIndex = useCycle(sellerApplyQueue.length, 2100, live);
  const stage = sellerApplyStages[stageIndex] ?? sellerApplyStages[0];
  const row = sellerApplyQueue[queueIndex] ?? sellerApplyQueue[0];

  return (
    <div ref={ref} className="bh-wall slr-stage" data-live={live ? "true" : "false"}>
      <span className="bh-wall-glow" aria-hidden />

      <div className="slr-room">
        <header className="slr-head">
          <div>
            <p className="slr-kicker">
              <span className="slr-live-dot" aria-hidden />
              SeatsBrokers / Network
            </p>
            <p className="slr-head-title">Seller application</p>
          </div>
          <div className="slr-head-meta">
            <span className="slr-chip">Sample</span>
            <span className="slr-chip slr-chip-live">
              <i aria-hidden />
              {stage.title}
            </span>
          </div>
        </header>

        <div className="slr-body">
          <ol className="slr-pipe" aria-label="Apply to access">
            {sellerApplyStages.map((item, index) => (
              <li key={item.id} data-active={index === stageIndex ? "true" : "false"}>
                <span className="slr-pipe-index">{item.index}</span>
                <span className="slr-pipe-copy">
                  <strong>{item.title}</strong>
                  <em>{item.detail}</em>
                </span>
              </li>
            ))}
          </ol>

          <div className="slr-field">
            <ul className="slr-queue" aria-label="Sample desks in review">
              {sellerApplyQueue.map((item, index) => (
                <li key={`${item.desk}-${item.region}`} data-active={index === queueIndex ? "true" : "false"}>
                  <span className="slr-queue-desk">{item.desk}</span>
                  <span className="slr-queue-region">{item.region}</span>
                  <span className="slr-queue-stage">{item.stage}</span>
                </li>
              ))}
            </ul>

            <ul className="slr-checks" aria-label="What we review">
              {sellerApplyChecks.map((item, index) => (
                <li key={item.id} data-active={index === stageIndex ? "true" : "false"}>
                  <strong>{item.label}</strong>
                  <em>{item.detail}</em>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <footer className="slr-foot">
          <span className="lc-mono">{stage.index} {stage.title}</span>
          <span>{row.desk}</span>
          <span>London · New York · Dubai</span>
        </footer>
      </div>

      <p className="sr-only">
        Illustrated seller application desk. Stages Apply, Review and Access. Sample row:{" "}
        {row.desk} in {row.region}. Current stage {stage.title}.
      </p>
    </div>
  );
}
