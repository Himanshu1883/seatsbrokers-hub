import { Reveal } from "@/hooks/use-scroll-motion";
import { SiteLink } from "@/components/layout/SiteLink";
import { eventIntelHeroCopy } from "@/content/event-intel-hero-data";
import { ctas } from "@/content/site";
import { EventIntelHeroIcon } from "./EventIntelConsoleCards";
import { EventIntelConsoleWall } from "./EventIntelConsoleWall";

export function EventIntelHero() {
  return (
    <section className="bh-hero section-curve relative isolate scroll-mt-24 overflow-hidden bg-dark text-background">
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
          <Reveal className="bh-copy">
            <EventIntelHeroIcon className="bh-copy-icon" />
            <p className="section-eyebrow text-primary">{eventIntelHeroCopy.eyebrow}</p>
            <h1 className="bh-title">{eventIntelHeroCopy.title}</h1>
            <p className="bh-subhead">{eventIntelHeroCopy.subhead}</p>
            <p className="bh-body">{eventIntelHeroCopy.body}</p>
            <ul className="bh-points">
              <li>Global event catalog with onsale calendar, venue maps and category bands</li>
              <li>Demand indicators, price movement and comparable events per event</li>
              <li>Forecasts and sellout risk that feed pricing, inventory and partner quotes</li>
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
            <EventIntelConsoleWall />
          </Reveal>
        </div>
      </div>
    </section>
  );
}
