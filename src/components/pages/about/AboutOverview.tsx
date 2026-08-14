import { ArrowUpRight } from "lucide-react";
import { Reveal } from "@/hooks/use-scroll-motion";
import { SiteLink } from "@/components/layout/SiteLink";
import { aboutAudiences, aboutOverviewCopy, aboutSurfaces } from "@/content/about-page-data";

export function AboutOverview() {
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

        <Reveal delay={80}>
          <ul className="abt-surfaces">
            {aboutSurfaces.map((surface) => (
              <li key={surface.index}>
                <SiteLink to={surface.href} className="abt-surface">
                  <span className="abt-surface-meta">
                    <span>{surface.index}</span>
                    <span>{surface.layer}</span>
                  </span>
                  <strong>{surface.title}</strong>
                  <p>{surface.body}</p>
                  <span className="abt-surface-cta">
                    {surface.cta}
                    <ArrowUpRight className="size-3.5" strokeWidth={2} />
                  </span>
                </SiteLink>
              </li>
            ))}
          </ul>
        </Reveal>

        <Reveal delay={120}>
          <div className="abt-audiences">
            <p className="abt-audiences-kicker">Who we serve</p>
            <ul>
              {aboutAudiences.map((audience) => (
                <li key={audience.title}>
                  <SiteLink to={audience.href} className="abt-audience">
                    <strong>{audience.title}</strong>
                    <p>{audience.body}</p>
                  </SiteLink>
                </li>
              ))}
            </ul>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
