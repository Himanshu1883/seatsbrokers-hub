import { useEffect, useState } from "react";
import { ArrowUpRight } from "lucide-react";
import { Reveal, useInView } from "@/hooks/use-scroll-motion";
import { SiteLink } from "@/components/layout/SiteLink";
import { aboutOverviewCopy, aboutSurfaces } from "@/content/about-page-data";

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

export function AboutOverview() {
  const { ref, inView } = useInView<HTMLDivElement>(0.18);
  const reduced = usePrefersReducedMotion();
  const [picked, setPicked] = useState<number | null>(null);
  const [hovered, setHovered] = useState<number | null>(null);
  const cycle = useCycle(aboutSurfaces.length, 3400, inView && !reduced && picked === null && hovered === null);
  const active = picked ?? hovered ?? cycle;
  const surface = aboutSurfaces[active] ?? aboutSurfaces[0];

  return (
    <section className="section-curve relative isolate bg-surface py-20 sm:py-24">
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-border to-transparent"
        aria-hidden
      />
      <div className="container-page relative z-10">
        <Reveal>
          <p className="section-eyebrow text-primary">{aboutOverviewCopy.eyebrow}</p>
          <h2 className="mt-4 max-w-3xl text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            {aboutOverviewCopy.title}
          </h2>
          <p className="mt-4 max-w-2xl text-sm leading-relaxed text-muted-foreground sm:text-base">
            {aboutOverviewCopy.intro}
          </p>
        </Reveal>

        <div ref={ref} className="abt-overview-board">
          <Reveal delay={80}>
            <ul className="abt-surfaces">
              {aboutSurfaces.map((item, index) => (
                <li key={item.index}>
                  <button
                    type="button"
                    className="abt-surface"
                    data-active={index === active ? "true" : "false"}
                    aria-pressed={index === active}
                    onClick={() => setPicked((current) => (current === index ? null : index))}
                    onMouseEnter={() => setHovered(index)}
                    onMouseLeave={() => setHovered(null)}
                    onFocus={() => setPicked(index)}
                  >
                    <span className="abt-surface-meta">
                      <span>{item.index}</span>
                      <span>{item.layer}</span>
                    </span>
                    <strong>{item.title}</strong>
                    <p>{item.body}</p>
                  </button>
                </li>
              ))}
            </ul>
          </Reveal>

          <Reveal delay={120}>
            <article className="abt-surface-dock" aria-live="polite">
              <header className="abt-surface-dock-head">
                <div>
                  <p className="abt-surface-dock-kicker">{aboutOverviewCopy.dockKicker}</p>
                  <h3>
                    <span>{surface.index}</span>
                    {surface.title}
                  </h3>
                </div>
                <SiteLink to={surface.href} className="abt-surface-cta">
                  {surface.cta}
                  <ArrowUpRight className="size-3.5" strokeWidth={2} />
                </SiteLink>
              </header>
              <p className="abt-surface-dock-body">{surface.analysis}</p>
              <ul className="abt-chips">
                {surface.systems.map((system) => (
                  <li key={system}>{system}</li>
                ))}
              </ul>
              <dl className="abt-readout">
                {surface.readout.map((row) => (
                  <div key={row.label}>
                    <dt>{row.label}</dt>
                    <dd>{row.value}</dd>
                  </div>
                ))}
              </dl>
            </article>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
