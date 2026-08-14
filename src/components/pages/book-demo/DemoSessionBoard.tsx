import { useEffect, useState, type CSSProperties } from "react";
import { Reveal, useInView } from "@/hooks/use-scroll-motion";
import { demoSessionBlocks, demoSessionCopy } from "@/content/book-demo-data";

const SESSION_MINUTES = demoSessionBlocks.reduce((sum, block) => sum + block.minutes, 0);

const columnTemplate = demoSessionBlocks.map((block) => `${block.minutes}fr`).join(" ");

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

export function DemoSessionBoard() {
  const { ref, inView } = useInView<HTMLElement>(0.22);
  const reduced = usePrefersReducedMotion();
  const live = inView && !reduced;
  const active = useCycle(demoSessionBlocks.length, 3200, live);
  const current = demoSessionBlocks[active] ?? demoSessionBlocks[0]!;

  return (
    <section
      ref={ref}
      className="bds-section section-curve relative isolate scroll-mt-24 bg-background py-20 sm:py-24"
      data-live={live ? "true" : "false"}
      aria-labelledby="bds-title"
    >
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-border to-transparent"
        aria-hidden
      />

      <div className="container-page relative z-10">
        <Reveal>
          <p className="section-eyebrow text-primary">{demoSessionCopy.eyebrow}</p>
          <h2 id="bds-title" className="bds-title">
            {demoSessionCopy.title}
          </h2>
          <p className="bds-intro">{demoSessionCopy.intro}</p>
        </Reveal>

        <Reveal delay={80} className="mt-12 lg:mt-14">
          <div
            className="bds-board"
            style={{ ["--bds-cols" as string]: columnTemplate } as CSSProperties}
          >
            <header className="bds-toolbar">
              <span className="bds-toolbar-kicker">Session agenda</span>
              <span className="bds-toolbar-right">
                <span className="bds-live">
                  <i aria-hidden />
                  Live
                </span>
                <span className="bds-toolbar-meta">
                  {SESSION_MINUTES} min · {demoSessionBlocks.length} surfaces
                </span>
              </span>
            </header>

            <div className="bds-ruler" aria-hidden>
              {demoSessionBlocks.map((block, index) => (
                <div
                  key={block.index}
                  className="bds-seg"
                  data-active={index === active ? "true" : "false"}
                >
                  <span className="bds-playhead" />
                  <span className="bds-seg-label">{block.duration}</span>
                  <span className="bds-seg-bar" />
                </div>
              ))}
            </div>
            <div className="bds-ruler-ends" aria-hidden>
              <span>0 min</span>
              <span>{SESSION_MINUTES} min</span>
            </div>

            <ol className="bds-cards">
              {demoSessionBlocks.map((block, index) => (
                <li key={block.index}>
                  <article
                    className="bds-card"
                    data-active={index === active ? "true" : "false"}
                    aria-current={index === active ? "step" : undefined}
                  >
                    <header className="bds-card-head">
                      <span className="bds-card-index">{block.index}</span>
                      <span className="bds-card-mins">{block.duration}</span>
                    </header>
                    <h3>{block.title}</h3>
                    <p className="bds-card-body">{block.body}</p>
                    <p className="bds-outcome">
                      <span>You leave knowing</span>
                      <strong>{block.outcome}</strong>
                    </p>
                  </article>
                </li>
              ))}
            </ol>

            <footer className="bds-now">
              <div className="bds-now-meta">
                <span className="bds-now-kicker">Now in session</span>
                <span className="bds-now-chip">
                  {current.index} · {current.duration}
                </span>
              </div>
              <strong>{current.title}</strong>
              <p>{current.outcome}</p>
            </footer>
          </div>
        </Reveal>
      </div>

      <p className="sr-only" aria-live="polite">
        SeatsBrokers demo agenda, {SESSION_MINUTES} minutes. Now walking through {current.title}:{" "}
        {current.outcome}
      </p>
    </section>
  );
}
