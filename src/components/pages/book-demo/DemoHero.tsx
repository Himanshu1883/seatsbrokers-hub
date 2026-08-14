import { CalendarClock } from "lucide-react";
import { Reveal } from "@/hooks/use-scroll-motion";
import { SiteLink } from "@/components/layout/SiteLink";
import { demoHeroCopy, demoHeroPoints } from "@/content/book-demo-data";
import { ctas } from "@/content/site";
import { DemoBriefingWall } from "./DemoBriefingWall";

export function DemoHero() {
  return (
    <section className="bh-hero bdm-hero section-curve relative isolate scroll-mt-24 overflow-hidden bg-dark text-background">
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
              <CalendarClock className="size-4" strokeWidth={1.75} />
            </span>
            <p className="section-eyebrow text-primary">{demoHeroCopy.eyebrow}</p>
            <h1 className="bh-title">{demoHeroCopy.title}</h1>
            <p className="bh-subhead">{demoHeroCopy.subhead}</p>
            <p className="bh-body">{demoHeroCopy.body}</p>
            <ul className="bh-points">
              {demoHeroPoints.map((point) => (
                <li key={point}>{point}</li>
              ))}
            </ul>
            <div className="bh-ctas">
              <SiteLink
                to="/book-demo"
                hash="request"
                className="lift rounded-md bg-primary px-6 py-3.5 text-sm font-semibold text-primary-foreground"
              >
                Request a walkthrough
              </SiteLink>
              <SiteLink
                to={ctas.explorePlatform.to}
                className="lift rounded-md border border-background/40 px-6 py-3.5 text-sm font-semibold text-background hover:bg-background/10"
              >
                {ctas.explorePlatform.label}
              </SiteLink>
            </div>
          </Reveal>

          <Reveal delay={120} className="bh-stage min-w-0">
            <DemoBriefingWall />
          </Reveal>
        </div>
      </div>
    </section>
  );
}
