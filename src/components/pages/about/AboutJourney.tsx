import { useEffect, useState } from "react";
import { Reveal, useInView } from "@/hooks/use-scroll-motion";
import { aboutChapters, aboutFacts, aboutJourneyCopy } from "@/content/about-page-data";

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

export function AboutJourney() {
  const { ref, inView } = useInView<HTMLDivElement>(0.2);
  const reduced = usePrefersReducedMotion();
  const [picked, setPicked] = useState<number | null>(null);
  const cycle = useCycle(aboutChapters.length, 3200, inView && !reduced && picked === null);
  const active = picked ?? cycle;
  const chapter = aboutChapters[active] ?? aboutChapters[0];

  return (
    <section className="section-curve relative isolate bg-background py-20 sm:py-24">
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-border to-transparent"
        aria-hidden
      />
      <div className="container-page relative z-10">
        <Reveal>
          <p className="section-eyebrow text-primary">{aboutJourneyCopy.eyebrow}</p>
          <h2 className="mt-4 max-w-3xl text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            {aboutJourneyCopy.title}
          </h2>
          <p className="mt-4 max-w-2xl text-sm leading-relaxed text-muted-foreground sm:text-base">
            {aboutJourneyCopy.intro}
          </p>
        </Reveal>

        <Reveal delay={60}>
          <ul className="abt-facts">
            {aboutFacts.map((fact) => (
              <li key={fact.label}>
                <strong>{fact.value}</strong>
                <span>{fact.label}</span>
                <p>{fact.detail}</p>
              </li>
            ))}
          </ul>
        </Reveal>

        <div ref={ref} className="abt-journey">
          <Reveal delay={80} className="abt-journey-list">
            <ol>
              {aboutChapters.map((item, index) => (
                <li key={item.index}>
                  <button
                    type="button"
                    data-active={index === active ? "true" : "false"}
                    onClick={() => setPicked(index)}
                    onFocus={() => setPicked(index)}
                  >
                    <span className="abt-journey-index">{item.index}</span>
                    <span className="abt-journey-copy">
                      <em>{item.kicker}</em>
                      <strong>{item.title}</strong>
                    </span>
                  </button>
                </li>
              ))}
            </ol>
          </Reveal>

          <Reveal delay={140} className="abt-journey-panel">
            <p className="abt-journey-kicker">Chapter {chapter.index}</p>
            <h3>{chapter.title}</h3>
            <p className="abt-journey-kicker-sub">{chapter.kicker}</p>
            <p className="abt-journey-body">{chapter.body}</p>
            <ol className="abt-journey-progress" aria-hidden>
              {aboutChapters.map((item, index) => (
                <li key={item.index} data-active={index === active ? "true" : "false"} />
              ))}
            </ol>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
