import { useEffect, useState } from "react";
import { useInView } from "@/hooks/use-scroll-motion";
import { aboutChapters, aboutFacts, aboutOffices } from "@/content/about-page-data";

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
  const live = inView && !reduced;
  const active = useCycle(aboutChapters.length, 2800, live);
  const chapter = aboutChapters[active] ?? aboutChapters[0];

  return (
    <div ref={ref} className="abt-stage" data-live={live ? "true" : "false"}>
      <div className="abt-room" data-chapter={chapter.index}>
        <header className="abt-head">
          <div className="abt-head-copy">
            <p className="abt-kicker">
              <span className="abt-live-dot" aria-hidden />
              SeatsBrokers / Journey
            </p>
            <p className="abt-head-title">Company atlas</p>
          </div>
          <span className="abt-head-stamp">3 offices · 1 platform</span>
        </header>

        <div className="abt-body">
          <ol className="abt-rail" aria-label="Platform journey chapters">
            {aboutChapters.map((item, index) => (
              <li key={item.index} data-active={index === active ? "true" : "false"}>
                <span className="abt-rail-index">{item.index}</span>
                <span className="abt-rail-copy">
                  <strong>{item.title}</strong>
                  <em>{item.kicker}</em>
                </span>
              </li>
            ))}
          </ol>

          <div className="abt-atlas-wrap">
            <svg className="abt-atlas" viewBox="0 0 400 220" role="img" aria-label="London, New York and Dubai connected on one platform">
              <title>SeatsBrokers offices — London, New York, Dubai</title>
              {Array.from({ length: 6 }, (_, i) => (
                <line
                  key={`lat-${i}`}
                  className="abt-grid"
                  x1="8"
                  x2="392"
                  y1={28 + i * 32}
                  y2={28 + i * 32}
                />
              ))}
              {Array.from({ length: 8 }, (_, i) => (
                <line
                  key={`lon-${i}`}
                  className="abt-grid"
                  y1="12"
                  y2="208"
                  x1={28 + i * 48}
                  x2={28 + i * 48}
                />
              ))}
              <path className="abt-arc" d="M88 92 C 140 48, 170 48, 192 75" />
              <path className="abt-arc" d="M192 75 C 230 110, 248 118, 272 114" />
              <path className="abt-arc abt-arc-long" d="M88 92 C 160 170, 220 168, 272 114" />
              {live ? (
                <>
                  <circle className="abt-packet" r="3.2">
                    <animateMotion dur="4.2s" repeatCount="indefinite" path="M88 92 C 140 48, 170 48, 192 75" />
                  </circle>
                  <circle className="abt-packet" r="3.2">
                    <animateMotion dur="5s" begin="0.8s" repeatCount="indefinite" path="M192 75 C 230 110, 248 118, 272 114" />
                  </circle>
                </>
              ) : null}
              {aboutOffices.map((office) => (
                <g key={office.code} className="abt-city" transform={`translate(${(office.x / 100) * 400} ${(office.y / 100) * 220})`}>
                  <circle className="abt-city-ring" r="14" />
                  <circle className="abt-city-core" r="4.5" />
                  <text className="abt-city-code" x="12" y="-8">
                    {office.code}
                  </text>
                  <text className="abt-city-name" x="12" y="6">
                    {office.city}
                  </text>
                </g>
              ))}
            </svg>

            <p className="abt-atlas-caption">
              <span>{chapter.index}</span>
              {chapter.body}
            </p>
          </div>
        </div>

        <footer className="abt-foot">
          {aboutFacts.slice(0, 3).map((fact) => (
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
