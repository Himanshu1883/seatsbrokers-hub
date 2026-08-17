import { useEffect, useState } from "react";
import { useInView } from "@/hooks/use-scroll-motion";
import {
  aboutDataSignals,
  aboutFormulaParts,
  aboutHeroProof,
  aboutHeroStage,
  aboutSurfaces,
} from "@/content/about-page-data";

const CORE = { x: 200, y: 104 };
const NODE_R = 72;

function nodePoint(index: number, total: number) {
  const rad = ((-90 + (360 / total) * index) * Math.PI) / 180;
  return {
    x: CORE.x + NODE_R * Math.cos(rad),
    y: CORE.y + NODE_R * Math.sin(rad),
  };
}

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

export function AboutJourneyWall() {
  const { ref, inView } = useInView<HTMLDivElement>(0.35);
  const reduced = usePrefersReducedMotion();
  const [pinnedLayer, setPinnedLayer] = useState<number | null>(null);
  const live = inView && !reduced;
  const cycle = useCycle(aboutSurfaces.length, 2800, live && pinnedLayer === null);
  const signalCycle = useCycle(aboutDataSignals.length, 1600, live);
  const formulaCycle = useCycle(aboutFormulaParts.length, 2200, live);
  const active = pinnedLayer ?? cycle;
  const layer = aboutSurfaces[active] ?? aboutSurfaces[0];

  return (
    <div ref={ref} className="abt-stage" data-live={live ? "true" : "false"}>
      <div className="abt-room" data-chapter={layer.index}>
        <header className="abt-head">
          <div className="abt-head-copy">
            <p className="abt-kicker">
              <span className="abt-live-dot" aria-hidden />
              {aboutHeroStage.kicker}
            </p>
            <p className="abt-head-title">{aboutHeroStage.title}</p>
          </div>
          <span className="abt-head-stamp">{aboutHeroStage.stamp}</span>
        </header>

        <div className="abt-body">
          <ol className="abt-rail" aria-label="SeatsBrokers technology ecosystem">
            {aboutSurfaces.map((item, index) => (
              <li key={item.index} data-active={index === active ? "true" : "false"}>
                <button
                  type="button"
                  aria-pressed={index === active}
                  aria-label={`${item.title}: ${item.layer}`}
                  onClick={() => setPinnedLayer((current) => (current === index ? null : index))}
                >
                  <span className="abt-rail-index">{item.index}</span>
                  <span className="abt-rail-copy">
                    <strong>{item.title}</strong>
                    <em>{item.layer}</em>
                  </span>
                </button>
              </li>
            ))}
          </ol>

          <div className="abt-atlas-wrap">
            <svg
              className="abt-atlas"
              viewBox="0 0 400 220"
              role="img"
              aria-label="Intelligence core connecting ticketing data signals"
            >
              <title>SeatsBrokers intelligence core — data into AI</title>
              {Array.from({ length: 5 }, (_, i) => (
                <circle
                  key={`ring-${i}`}
                  className="abt-core-ring"
                  cx={CORE.x}
                  cy={CORE.y}
                  r={28 + i * 18}
                />
              ))}
              {aboutDataSignals.map((signal, index) => {
                const point = nodePoint(index, aboutDataSignals.length);
                const on = index === signalCycle;
                return (
                  <g key={signal} className="abt-node" data-active={on ? "true" : "false"}>
                    <line className="abt-spoke" x1={CORE.x} y1={CORE.y} x2={point.x} y2={point.y} />
                    {live && on ? (
                      <circle className="abt-packet" r="2.8">
                        <animateMotion
                          dur="1.6s"
                          repeatCount="indefinite"
                          path={`M${CORE.x} ${CORE.y} L${point.x} ${point.y}`}
                        />
                      </circle>
                    ) : null}
                    <circle className="abt-node-core" cx={point.x} cy={point.y} r={on ? 4.6 : 3.4} />
                    {on ? (
                      <text
                        className="abt-node-label"
                        x={point.x}
                        y={point.y + (point.y >= CORE.y ? 14 : -10)}
                        textAnchor="middle"
                      >
                        {signal}
                      </text>
                    ) : null}
                  </g>
                );
              })}
              <circle className="abt-core-glow" cx={CORE.x} cy={CORE.y} r="22" />
              <circle className="abt-core-disc" cx={CORE.x} cy={CORE.y} r="16" />
              <text className="abt-core-mark" x={CORE.x} y={CORE.y + 4} textAnchor="middle">
                {aboutHeroStage.core}
              </text>
            </svg>

            <p className="abt-atlas-caption">
              <span>{layer.index}</span>
              {layer.body}
            </p>
          </div>
        </div>

        <div className="abt-coverage abt-formula-strip" aria-label="Experience plus data plus AI plus automation">
          {aboutFormulaParts.map((part, index) => (
            <div key={part} data-active={index === formulaCycle ? "true" : "false"}>
              <strong>{part}</strong>
              <span>{index < aboutFormulaParts.length - 1 ? "+" : "="}</span>
            </div>
          ))}
        </div>

        <footer className="abt-foot">
          {aboutHeroProof.map((fact) => (
            <div key={fact.label}>
              <strong>{fact.value}</strong>
              <span>{fact.label}</span>
            </div>
          ))}
        </footer>
      </div>
    </div>
  );
}
