import { Compass } from "lucide-react";
import { Reveal } from "@/hooks/use-scroll-motion";
import { SiteLink } from "@/components/layout/SiteLink";
import { aboutHeroCopy, aboutHeroPoints } from "@/content/about-page-data";
import { ctas } from "@/content/site";
import { AboutJourneyWall } from "./AboutJourneyWall";

export function AboutHero() {
  return (
    <section className="bh-hero abt-hero section-curve relative isolate scroll-mt-24 overflow-hidden bg-dark text-background">
      <div
        className="pointer-events-none absolute inset-0 bg-linear-to-br from-dark via-dark to-primary-deep/40"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute -right-24 top-1/4 h-96 w-96 rounded-full bg-primary/10 blur-3xl"
        aria-hidden
      />

      <div className="container-page relative z-10">
        <div className="bh-layout">
          <Reveal className="bh-copy min-w-0">
            <span className="bh-copy-icon" aria-hidden>
              <Compass className="size-4" strokeWidth={1.75} />
            </span>
            <p className="section-eyebrow text-primary">{aboutHeroCopy.eyebrow}</p>
            <h1 className="bh-title">{aboutHeroCopy.title}</h1>
            <p className="bh-subhead">{aboutHeroCopy.subhead}</p>
            <p className="bh-body">{aboutHeroCopy.body}</p>
            <ul className="bh-points">
              {aboutHeroPoints.map((point) => (
                <li key={point}>{point}</li>
              ))}
            </ul>
            <div className="bh-ctas">
              <SiteLink
                to={ctas.becomeSeller.to}
                className="lift rounded-md bg-primary px-6 py-3.5 text-sm font-semibold text-primary-foreground"
              >
                {ctas.becomeSeller.label}
              </SiteLink>
              <SiteLink
                to={ctas.talkToTeam.to}
                className="lift rounded-md border border-background/40 px-6 py-3.5 text-sm font-semibold text-background hover:bg-background/10"
              >
                {ctas.talkToTeam.label}
              </SiteLink>
            </div>
          </Reveal>

          <Reveal delay={120} className="bh-stage min-w-0">
            <AboutJourneyWall />
          </Reveal>
        </div>
      </div>
    </section>
  );
}
