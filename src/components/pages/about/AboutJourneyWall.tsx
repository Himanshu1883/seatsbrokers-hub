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
  const [pinnedChapter, setPinnedChapter] = useState<number | null>(null);
  const live = inView && !reduced;
  const cycle = useCycle(aboutChapters.length, 2800, live && pinnedChapter === null);
  const officeCycle = useCycle(aboutOffices.length, 3200, live);
  const active = pinnedChapter ?? cycle;
  const chapter = aboutChapters[active] ?? aboutChapters[0];
  const office = aboutOffices[officeCycle] ?? aboutOffices[0];

  return (
    <div ref={ref} className="abt-stage" data-live={live ? "true" : "false"}>
      <div className="abt-room" data-chapter={chapter.index}>
        <header className="abt-head">
          <div className="abt-head-copy">
            <p className="abt-kicker">
              <span className="abt-live-dot" aria-hidden />
              SeatsBrokers / Atlas
            </p>
            <p className="abt-head-title">Company atlas</p>
          </div>
          <span className="abt-head-stamp">3 offices · 1 platform</span>
        </header>

        <div className="abt-body">
          <ol className="abt-rail" aria-label="Platform journey chapters">
            {aboutChapters.map((item, index) => (
              <li key={item.index} data-active={index === active ? "true" : "false"}>
                <button
                  type="button"
                  aria-pressed={index === active}
                  aria-label={`Chapter ${item.index}: ${item.title}`}
                  onClick={() => setPinnedChapter((current) => (current === index ? null : index))}
                >
                  <span className="abt-rail-index">{item.index}</span>
                  <span className="abt-rail-copy">
                    <strong>{item.title}</strong>
                    <em>{item.kicker}</em>
                  </span>
                </button>
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
              {aboutOffices.map((item) => (
                <g
                  key={item.code}
                  className="abt-city"
                  data-active={item.code === office.code ? "true" : "false"}
                  transform={`translate(${(item.x / 100) * 400} ${(item.y / 100) * 220})`}
                >
                  <circle className="abt-city-ring" r="14" />
                  <circle className="abt-city-core" r="4.5" />
                  <text className="abt-city-code" x="12" y="-8">
                    {item.code}
                  </text>
                  <text className="abt-city-name" x="12" y="6">
                    {item.city}
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

        <div className="abt-coverage" aria-label="Office coverage windows">
          {aboutOffices.map((item) => (
            <div key={item.code} data-active={item.code === office.code ? "true" : "false"}>
              <strong>{item.code}</strong>
              <span>
                {item.window} {item.tz}
              </span>
            </div>
          ))}
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
