import { useEffect, useRef, useState } from "react";
import { Reveal } from "@/hooks/use-scroll-motion";

type Audience = {
  id: string;
  value: string;
  label: string;
  detail: string;
};

/** Homepage §9 — role grid. StickyScrollShowcase (#who-its-for) keeps the deep sticky consoles. */
const audiences: Audience[] = [
  {
    id: "brokers",
    value: "01",
    label: "Professional Ticket Brokers",
    detail:
      "Manage sourcing, inventory, pricing, distribution and fulfilment from one platform.",
  },
  {
    id: "resellers",
    value: "02",
    label: "Ticket Resellers",
    detail:
      "Access inventory, technology and distribution tools designed to help grow your operation.",
  },
  {
    id: "suppliers",
    value: "03",
    label: "Ticket Suppliers",
    detail:
      "Connect inventory with professional ticket distribution channels.",
  },
  {
    id: "tech",
    value: "04",
    label: "Technology-Driven Ticket Businesses",
    detail:
      "Use SeatsBrokers APIs and infrastructure to automate ticket operations.",
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
const AUTOPLAY_MS = audiences.length * SLIDE_MS;

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
    Math.floor(progress * audiences.length),
    audiences.length - 1,
  );

  return (
    <section
      ref={sectionRef}
      id="journey-numbers"
      className="journey-num section-curve-sticky relative scroll-mt-24"
      aria-label="Built for Professional Ticket Businesses"
    >
      <div className="journey-num-viewport">
        <span className="journey-num-glow" aria-hidden />
        <span className="journey-num-grain" aria-hidden />

        <div className="journey-num-shell container-page">
          <header className="journey-num-header">
            <p className="journey-num-eyebrow">
              <span className="journey-num-live" aria-hidden />
              Professional audiences
            </p>
            <div className="journey-num-counter" aria-hidden>
              <span>{String(activeIndex + 1).padStart(2, "0")}</span>
              <span className="journey-num-counter-sep">/</span>
              <span>{String(audiences.length).padStart(2, "0")}</span>
            </div>
          </header>

          <h2 className="journey-num-title">
            Built for Professional Ticket Businesses
          </h2>

          <div className="journey-num-stage">
            {audiences.map((a, i) => {
              if (reduced && i !== activeIndex) return null;
              const local = slideLocal(progress, i, audiences.length);
              const style = slideStyle(local, reduced);

              return (
                <div
                  key={a.id}
                  className="journey-num-slide"
                  style={style}
                  data-active={i === activeIndex ? "true" : "false"}
                  aria-hidden={i !== activeIndex}
                >
                  <p className="journey-num-value">{a.value}</p>
                  <p className="journey-num-label">{a.label}</p>
                  <p className="journey-num-detail">{a.detail}</p>
                </div>
              );
            })}
          </div>

          <div className="journey-num-rail" aria-hidden>
            {audiences.map((a, i) => (
              <span
                key={a.id}
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
            Professional audiences
          </p>
          <h2 className="journey-num-stack-title">
            Built for Professional Ticket Businesses
          </h2>
        </Reveal>

        <ul className="journey-num-stack-list">
          {audiences.map((a, i) => (
            <Reveal key={a.id} as="li" delay={i * 80}>
              <article className="journey-num-stack-card">
                <p className="journey-num-stack-value">{a.value}</p>
                <div>
                  <p className="journey-num-stack-label">{a.label}</p>
                  <p className="journey-num-stack-detail">{a.detail}</p>
                </div>
              </article>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
