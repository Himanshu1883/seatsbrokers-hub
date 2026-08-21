import { useEffect, useRef, useState } from "react";
import { Reveal } from "@/hooks/use-scroll-motion";

type Milestone = {
  id: string;
  value: string;
  label: string;
  detail: string;
};

const milestones: Milestone[] = [
  {
    id: "events",
    value: "12,482",
    label: "Events catalogued",
    detail: "Global event catalog across sport, music, theatre and entertainment — demo data.",
  },
  {
    id: "listings",
    value: "84,250",
    label: "Active listings",
    detail: "Inventory managed and distributed through connected marketplace infrastructure — demo data.",
  },
  {
    id: "marketplaces",
    value: "16",
    label: "Connected marketplaces",
    detail: "Resale marketplaces synchronized through centralized API connectivity.",
  },
  {
    id: "value",
    value: "£12.4M",
    label: "Inventory value",
    detail: "Ticket inventory tracked and priced through the platform — demo data.",
  },
  {
    id: "years",
    value: "30+",
    label: "Years in ticketing",
    detail: "Three decades building technology for the global ticketing ecosystem.",
  },
];

const clamp01 = (n: number) => Math.min(Math.max(n, 0), 1);

function easeOutCubic(t: number) {
  return 1 - Math.pow(1 - t, 3);
}

function easeInCubic(t: number) {
  return t * t * t;
}

const SLIDE_MS = 1000;
const AUTOPLAY_MS = milestones.length * SLIDE_MS;

/** Auto-advance progress whenever the section enters the viewport. Loops while in view. */
function useAutoPlayProgress(
  ref: React.RefObject<HTMLElement | null>,
  durationMs: number,
  reduced: boolean,
) {
  const [progress, setProgress] = useState(reduced ? 1 : 0);
  const raf = useRef(0);
  const playing = useRef(false);

  useEffect(() => {
    if (reduced) {
      setProgress(1);
      return;
    }

    const el = ref.current;
    if (!el) return;

    const stop = () => {
      if (raf.current) {
        window.cancelAnimationFrame(raf.current);
        raf.current = 0;
      }
      playing.current = false;
    };

    const play = () => {
      stop();
      playing.current = true;
      setProgress(0);

      const t0 = performance.now();
      const tick = (now: number) => {
        if (!playing.current) return;

        const t = ((now - t0) / durationMs) % 1;
        setProgress(t);
        raf.current = window.requestAnimationFrame(tick);
      };

      raf.current = window.requestAnimationFrame(tick);
    };

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          play();
        } else {
          stop();
          setProgress(0);
        }
      },
      { threshold: 0.55, rootMargin: "-12% 0px -12% 0px" },
    );

    io.observe(el);
    return () => {
      io.disconnect();
      stop();
    };
  }, [ref, durationMs, reduced]);

  return progress;
}

function slideLocal(progress: number, index: number, total: number) {
  const segment = 1 / total;
  const start = index * segment;
  return clamp01((progress - start) / segment);
}

function slideStyle(local: number, reduced: boolean) {
  if (reduced) {
    return {
      opacity: 1,
      transform: "translate3d(-50%, -50%, 0) scale(1)",
      filter: "blur(0px)",
    };
  }

  // Enter: large + soft → settle. Hold. Soft exit (including last slide, so the loop can restart).
  let opacity = 0;
  let scale = 1.85;
  let blur = 12;
  let y = 18;

  if (local <= 0) {
    opacity = 0;
    scale = 1.85;
    blur = 12;
    y = 18;
  } else if (local < 0.32) {
    const t = easeOutCubic(local / 0.32);
    opacity = t;
    scale = 1.85 - 0.85 * t;
    blur = 12 * (1 - t);
    y = 18 * (1 - t);
  } else if (local < 0.78) {
    opacity = 1;
    scale = 1;
    blur = 0;
    y = 0;
  } else {
    const t = easeInCubic((local - 0.78) / 0.22);
    opacity = 1 - t;
    scale = 1 - 0.18 * t;
    blur = 8 * t;
    y = -10 * t;
  }

  return {
    opacity,
    transform: `translate3d(-50%, calc(-50% + ${y}px), 0) scale(${scale})`,
    filter: `blur(${blur.toFixed(2)}px)`,
  };
}

export function JourneyNumbers() {
  const sectionRef = useRef<HTMLElement>(null);
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    setReduced(window.matchMedia("(prefers-reduced-motion: reduce)").matches);
  }, []);

  const progress = useAutoPlayProgress(sectionRef, AUTOPLAY_MS, reduced);
  const activeIndex = Math.min(
    Math.floor(progress * milestones.length),
    milestones.length - 1,
  );

  return (
    <section
      ref={sectionRef}
      id="journey-numbers"
      className="journey-num section-curve-sticky relative scroll-mt-24"
      aria-label="SeatsBrokers journey in numbers"
    >
      <div className="journey-num-viewport">
        <span className="journey-num-glow" aria-hidden />
        <span className="journey-num-grain" aria-hidden />

        <div className="journey-num-shell container-page">
          <header className="journey-num-header">
            <p className="journey-num-eyebrow">
              <span className="journey-num-live" aria-hidden />
              Platform at scale
            </p>
            <div className="journey-num-counter" aria-hidden>
              <span>{String(activeIndex + 1).padStart(2, "0")}</span>
              <span className="journey-num-counter-sep">/</span>
              <span>{String(milestones.length).padStart(2, "0")}</span>
            </div>
          </header>

          <div className="journey-num-stage">
            {milestones.map((m, i) => {
              if (reduced && i !== activeIndex) return null;
              const local = slideLocal(progress, i, milestones.length);
              const style = slideStyle(local, reduced);

              return (
                <div
                  key={m.id}
                  className="journey-num-slide"
                  style={style}
                  data-active={i === activeIndex ? "true" : "false"}
                  aria-hidden={i !== activeIndex}
                >
                  <p className="journey-num-value">{m.value}</p>
                  <p className="journey-num-label">{m.label}</p>
                  <p className="journey-num-detail">{m.detail}</p>
                </div>
              );
            })}
          </div>

          <div className="journey-num-rail" aria-hidden>
            {milestones.map((m, i) => (
              <span
                key={m.id}
                className="journey-num-tick"
                data-on={i <= activeIndex ? "true" : "false"}
                data-active={i === activeIndex ? "true" : "false"}
              />
            ))}
          </div>
        </div>
      </div>

      <div className="journey-num-stack container-page">
        <Reveal>
          <p className="journey-num-eyebrow">
            <span className="journey-num-live" aria-hidden />
            Platform at scale
          </p>
          <h2 className="journey-num-stack-title">
            The technology behind modern ticket resale.
          </h2>
        </Reveal>

        <ul className="journey-num-stack-list">
          {milestones.map((m, i) => (
            <Reveal key={m.id} as="li" delay={i * 80}>
              <article className="journey-num-stack-card">
                <p className="journey-num-stack-value">{m.value}</p>
                <div>
                  <p className="journey-num-stack-label">{m.label}</p>
                  <p className="journey-num-stack-detail">{m.detail}</p>
                </div>
              </article>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
