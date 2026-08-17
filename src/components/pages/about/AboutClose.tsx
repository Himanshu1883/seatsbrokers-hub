import { Reveal } from "@/hooks/use-scroll-motion";
import { SiteLink } from "@/components/layout/SiteLink";
import { aboutCloseCopy, aboutPageCtas } from "@/content/about-page-data";

export function AboutClose() {
  return (
    <section className="section-curve relative isolate bg-background py-20 sm:py-24">
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-border to-transparent"
        aria-hidden
      />
      <div className="container-page relative z-10">
        <Reveal className="mx-auto max-w-3xl text-center">
          <p className="section-eyebrow text-primary">{aboutCloseCopy.eyebrow}</p>
          <h2 className="mt-4 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            {aboutCloseCopy.title}
          </h2>
        </Reveal>

        <Reveal delay={80}>
          <ul className="abt-close-pillars">
            {aboutCloseCopy.pillars.map((pillar) => (
              <li key={pillar}>{pillar}</li>
            ))}
          </ul>
        </Reveal>

        <Reveal delay={120}>
          <p className="abt-band-close">{aboutCloseCopy.close}</p>
          <div className="abt-close-ctas">
            {aboutPageCtas.map((cta, index) => (
              <SiteLink
                key={cta.to}
                to={cta.to}
                className={
                  index === 0
                    ? "lift rounded-md bg-primary px-6 py-3.5 text-sm font-semibold text-primary-foreground"
                    : "lift rounded-md border border-border px-6 py-3.5 text-sm font-semibold text-foreground hover:bg-surface"
                }
              >
                {cta.label}
              </SiteLink>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
