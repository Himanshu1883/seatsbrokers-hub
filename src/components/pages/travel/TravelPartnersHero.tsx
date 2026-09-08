import { Reveal } from "@/hooks/use-scroll-motion";
import { SiteLink } from "@/components/layout/SiteLink";
import { HeroBackdrop } from "@/components/landing/SectionBackdrop";
import { travelHeroCopy } from "@/content/travel-hero-data";
import { ctas } from "@/content/site";
import { TravelHeroIcon } from "./TravelConsoleCards";
import { TravelConsoleWall } from "./TravelConsoleWall";

export function TravelPartnersHero() {
  return (
    <section className="bh-hero section-curve relative isolate scroll-mt-24 overflow-hidden bg-dark text-background">
      <HeroBackdrop image="travelDestination" />

      <div className="container-page relative z-10">
        <div className="bh-layout">
          <Reveal className="bh-copy">
            <TravelHeroIcon className="bh-copy-icon" />
            <p className="section-eyebrow text-primary">{travelHeroCopy.eyebrow}</p>
            <h1 className="bh-title">{travelHeroCopy.title}</h1>
            <p className="bh-subhead">{travelHeroCopy.subhead}</p>
            <p className="bh-body">{travelHeroCopy.body}</p>
            <ul className="bh-points">
              <li>Live inventory access from the broker catalog</li>
              <li>Custom margins with transparent customer pricing</li>
              <li>Branded quotes via PDF, WhatsApp and email</li>
            </ul>
            <div className="page-cta-row bh-ctas mt-9">
              <SiteLink
                to={ctas.bookDemo.to}
                className="lift inline-flex min-h-11 items-center justify-center whitespace-nowrap rounded-md bg-primary px-6 py-3.5 text-sm font-semibold text-primary-foreground"
              >
                {ctas.bookDemo.label}
              </SiteLink>
              <SiteLink
                to={ctas.becomeSeller.to}
                className="lift inline-flex min-h-11 items-center justify-center whitespace-nowrap rounded-md border border-background/40 px-6 py-3.5 text-sm font-semibold text-background hover:bg-background/10"
              >
                {ctas.becomeSeller.label}
              </SiteLink>
            </div>
          </Reveal>

          <Reveal delay={120} className="bh-stage">
            <TravelConsoleWall />
          </Reveal>
        </div>
      </div>
    </section>
  );
}
