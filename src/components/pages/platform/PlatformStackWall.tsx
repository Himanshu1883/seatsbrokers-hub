import { useEffect, useState } from "react";
import { useInView } from "@/hooks/use-scroll-motion";
import { platformStackLayers } from "@/content/platform-page-data";

function usePrefersReducedMotion() {
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(mq.matches);
    const onChange = () => setReduced(mq.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
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

export function PlatformStackWall() {
  const { ref, inView } = useInView<HTMLDivElement>(0.28);
  const reduced = usePrefersReducedMotion();
  const live = inView && !reduced;
  const active = useCycle(platformStackLayers.length, 2600, live);
  const layer = platformStackLayers[active] ?? platformStackLayers[0];

  return (
    <div ref={ref} className="bh-wall plt-stage" data-live={live ? "true" : "false"}>
      <span className="bh-wall-glow" aria-hidden />

      <div className="plt-room">
        <header className="plt-head">
          <div className="plt-head-copy">
            <p className="plt-kicker">
              <span className="plt-live-dot" aria-hidden />
              SeatsBrokers / Stack
            </p>
            <p className="plt-head-title">Platform map</p>
          </div>
          <span className="plt-head-stamp">5 surfaces · 1 layer</span>
        </header>

        <div className="plt-body">
          <div className="plt-hub">
            <span className="plt-hub-mark">SB</span>
            <span>
              <strong>SeatsBrokers</strong>
              <em>Infrastructure hub</em>
            </span>
          </div>

          <ol className="plt-spine" aria-label="Platform surfaces">
            {platformStackLayers.map((item, index) => (
              <li key={item.id} data-active={index === active ? "true" : "false"}>
                <span className="plt-spine-rail" aria-hidden>
                  <i />
                </span>
                <span className="plt-spine-index">{item.index}</span>
                <span className="plt-spine-copy">
                  <strong>{item.label}</strong>
                  <em>{item.tag}</em>
                </span>
              </li>
            ))}
          </ol>
        </div>

        <footer className="plt-foot">
          <span className="lc-mono">{layer.tag}</span>
          <span>{layer.label}</span>
          <span>List once · sync · quote in £</span>
        </footer>
      </div>

      <p className="sr-only">
        SeatsBrokers platform map. Five surfaces on one infrastructure layer: event intelligence,
        broker platform, marketplace connectivity, B2B partners and API. Active surface:{" "}
        {layer.label}.
      </p>
    </div>
  );
}
