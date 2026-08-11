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
    id: "years",
    value: "30+",
    label: "Years in ticketing",
    detail: "Three decades moving live inventory for professional desks.",
  },
  {
    id: "partners",
    value: "10,000+",
    label: "B2B partners",
    detail: "Brokers and travel teams trading through one hub.",
  },
  {
    id: "tickets",
    value: "2,000,000+",
    label: "Tickets delivered",
    detail: "Fulfilled seats across sport, music, and entertainment.",
  },
  {
    id: "countries",
    value: "165",
    label: "Countries settled",
    detail: "Payouts and fulfilment wired for global desks.",
  },
  {
    id: "channels",
    value: "8+",
    label: "Marketplace channels",
    detail: "Every major marketplace and the regional long tail — one publish.",
  },
];

const clamp01 = (n: number) => Math.min(Math.max(n, 0), 1);

function easeOutCubic(t: number) {
  return 1 - Math.pow(1 - t, 3);
}

function easeInCubic(t: number) {
  return t * t * t;
}

/** Smooth scroll progress that eases toward the real scroll position. */
function useSmoothScrollProgress(ref: React.RefObject<HTMLElement | null>) {
  const [progress, setProgress] = useState(0);
  const target = useRef(0);
  const current = useRef(0);
  const raf = useRef(0);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const tick = () => {
      // Slower catch-up = medium, premium scrubbing
      const next = current.current + (target.current - current.current) * 0.07;
      const settled = Math.abs(next - target.current) < 0.00025;
      current.current = settled ? target.current : next;
      setProgress(current.current);
      raf.current = settled ? 0 : window.requestAnimationFrame(tick);
    };

    const kick = () => {
      if (!raf.current) raf.current = window.requestAnimationFrame(tick);
    };

    const measure = () => {
      const rect = el.getBoundingClientRect();
      const top = window.scrollY + rect.top;
      const range = Math.max(el.offsetHeight - window.innerHeight, 1);
      target.current = clamp01((window.scrollY - top) / range);
      kick();
    };

    measure();
    window.addEventListener("scroll", measure, { passive: true });
    window.addEventListener("resize", measure);

    return () => {
      if (raf.current) window.cancelAnimationFrame(raf.current);
      window.removeEventListener("scroll", measure);
      window.removeEventListener("resize", measure);
    };
  }, [ref]);

  return progress;
}

function slideLocal(progress: number, index: number, total: number) {
  const segment = 1 / total;
  const start = index * segment;
  return clamp01((progress - start) / segment);
}

function slideStyle(local: number, isLast: boolean, reduced: boolean) {
  if (reduced) {
    return {
      opacity: 1,
      transform: "translate3d(-50%, -50%, 0) scale(1)",
      filter: "blur(0px)",
    };
  }

  // Enter: large + soft → settle. Long hold. Soft exit.
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
  } else if (local < 0.78 || isLast) {
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
  const raw = useSmoothScrollProgress(sectionRef);
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    setReduced(window.matchMedia("(prefers-reduced-motion: reduce)").matches);
  }, []);

  // Keep the last number on screen a beat longer before release.
  const progress = clamp01(raw / 0.94);
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
              Our journey in numbers
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
              const isLast = i === milestones.length - 1;
              const style = slideStyle(local, isLast, reduced);

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
            Our journey in numbers
          </p>
          <h2 className="journey-num-stack-title">
            Thirty years. Still compounding.
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
