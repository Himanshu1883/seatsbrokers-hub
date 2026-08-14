import { ArrowUpRight } from "lucide-react";
import { Reveal } from "@/hooks/use-scroll-motion";
import { SiteLink } from "@/components/layout/SiteLink";
import { platformModuleCopy, platformModules } from "@/content/platform-page-data";

export function PlatformModuleMap() {
  return (
    <section className="section-curve relative isolate bg-dark py-20 text-background sm:py-24">
      <div
        className="pointer-events-none absolute inset-0 bg-linear-to-br from-dark via-dark to-primary-deep/25"
        aria-hidden
      />
      <div className="container-page relative z-10">
        <Reveal>
          <p className="section-eyebrow text-primary">{platformModuleCopy.eyebrow}</p>
          <h2 className="mt-4 max-w-3xl text-3xl font-bold tracking-tight sm:text-4xl">
            {platformModuleCopy.title}
          </h2>
          <p className="mt-4 max-w-2xl text-sm leading-relaxed text-background/70 sm:text-base">
            {platformModuleCopy.intro}
          </p>
        </Reveal>

        <Reveal delay={80}>
          <ul className="plt-map">
            {platformModules.map((module) => (
              <li key={module.index}>
                <SiteLink to={module.href} className="plt-map-card">
                  <span className="plt-map-meta">
                    <span>{module.index}</span>
                    <span>{module.layer}</span>
                  </span>
                  <strong>{module.title}</strong>
                  <p>{module.body}</p>
                  <span className="plt-map-cta">
                    {module.cta}
                    <ArrowUpRight className="size-3.5" strokeWidth={2} />
                  </span>
                </SiteLink>
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}
