import { useEffect, useState } from "react";
import { Reveal, useInView } from "@/hooks/use-scroll-motion";
import { SiteLink } from "@/components/layout/SiteLink";
import { integrationsPage } from "@/content/products-page-data";
import { ctas } from "@/content/site";

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

export function IntegrationsCapabilityBoard() {
  const { ref, inView } = useInView<HTMLElement>(0.2, { once: false });
  const categories = integrationsPage.categories;
  const active = useCycle(categories.length, 2600, inView);
  const current = categories[active] ?? categories[0];

  return (
    <section
      ref={ref}
      className="int-board-section section-curve relative isolate scroll-mt-24 bg-dark py-20 text-background sm:py-24"
      data-live={inView ? "true" : "false"}
      aria-labelledby="int-board-title"
    >
      <div
        className="pointer-events-none absolute inset-0 bg-linear-to-br from-dark via-dark to-primary-deep/35"
        aria-hidden
      />

      <div className="container-page relative z-10">
        <Reveal>
          <p className="section-eyebrow text-primary">{integrationsPage.board.eyebrow}</p>
          <h2 id="int-board-title" className="int-board-title">
            {integrationsPage.board.title}
          </h2>
          <p className="int-board-intro">{integrationsPage.board.intro}</p>
        </Reveal>

        <Reveal delay={80} className="mt-12 lg:mt-14">
          <div className="int-board">
            <ul className="int-board-grid">
              {categories.map((item, index) => (
                <li key={item.id} data-active={index === active ? "true" : "false"}>
                  <span className="int-board-meta">
                    <span>{item.index}</span>
                    <span data-status={item.status.toLowerCase()}>{item.status}</span>
                  </span>
                  <h3>{item.title}</h3>
                  <p>{item.body}</p>
                </li>
              ))}
            </ul>

            <div className="int-board-dock">
              <div className="int-board-from">
                <span>{current.index}</span>
                <strong>{current.title}</strong>
                <em>{current.short}</em>
              </div>
              <div className="int-board-rail" aria-hidden>
                <span />
              </div>
              <div className="int-board-hub">
                <span>SeatsBrokers</span>
                <strong>Connect map · ready</strong>
              </div>
            </div>

            <div className="page-cta-row int-board-cta">
              <SiteLink
                to={ctas.discussIntegration.to}
                className="lift inline-flex min-h-11 items-center justify-center whitespace-nowrap rounded-md bg-primary px-6 py-3.5 text-sm font-semibold text-primary-foreground"
              >
                {ctas.discussIntegration.label}
              </SiteLink>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
