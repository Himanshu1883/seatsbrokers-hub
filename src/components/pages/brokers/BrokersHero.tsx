import { Reveal } from "@/hooks/use-scroll-motion";
import { SiteLink } from "@/components/layout/SiteLink";
import { brokerHeroCopy } from "@/content/broker-hero-data";
import { ctas } from "@/content/site";
import { BrokersHeroIcon } from "./BrokersConsoleCards";
import { BrokersConsoleWall } from "./BrokersConsoleWall";

export function BrokersHero() {
  return (
    <section className="bh-hero section-curve relative isolate scroll-mt-24 overflow-hidden bg-dark text-background">
      <div
        className="pointer-events-none absolute inset-0 bg-linear-to-br from-dark via-dark to-primary-deep/40"
        aria-hidden
      />
      <div
        className="bh-orb pointer-events-none absolute -right-24 top-1/4 h-96 w-96 rounded-full bg-primary/10 blur-3xl"
        aria-hidden
      />

      <div className="container-page relative z-10">
        <div className="bh-layout">
          <Reveal className="bh-copy min-w-0">
            <BrokersHeroIcon className="bh-copy-icon" />
            <p className="section-eyebrow text-primary">{brokerHeroCopy.eyebrow}</p>
            <h1 className="bh-title">{brokerHeroCopy.title}</h1>
            <p className="bh-subhead">{brokerHeroCopy.subhead}</p>
            <p className="bh-body">{brokerHeroCopy.body}</p>
            <ul className="bh-points">
              <li>Global event catalog & inventory management</li>
              <li>Multi-marketplace sync & automated distribution</li>
              <li>Market intelligence, AI pricing & broker POS/API</li>
            </ul>
            <div className="bh-ctas">
              <SiteLink
                to={ctas.becomeSeller.to}
                className="lift rounded-md bg-primary px-6 py-3.5 text-sm font-semibold text-primary-foreground"
              >
                {ctas.becomeSeller.label}
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
            <BrokersConsoleWall />
          </Reveal>
        </div>
      </div>
    </section>
  );
}
