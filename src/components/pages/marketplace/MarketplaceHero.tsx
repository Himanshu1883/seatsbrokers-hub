import { Reveal } from "@/hooks/use-scroll-motion";
import { SiteLink } from "@/components/layout/SiteLink";
import { HeroBackdrop } from "@/components/landing/SectionBackdrop";
import { marketplaceHeroCopy } from "@/content/marketplace-hero-data";
import { ctas } from "@/content/site";
import { MarketplaceHeroIcon } from "./MarketplaceConsoleCards";
import { MarketplaceConsoleWall } from "./MarketplaceConsoleWall";

export function MarketplaceHero() {
  return (
    <section className="bh-hero section-curve relative isolate scroll-mt-24 overflow-hidden bg-dark text-background">
      <HeroBackdrop image="concert" />

      <div className="container-page relative z-10">
        <div className="bh-layout">
          <Reveal className="bh-copy">
            <MarketplaceHeroIcon className="bh-copy-icon" />
            <p className="section-eyebrow text-primary">{marketplaceHeroCopy.eyebrow}</p>
            <h1 className="bh-title">{marketplaceHeroCopy.title}</h1>
            <p className="bh-subhead">{marketplaceHeroCopy.subhead}</p>
            <p className="bh-body">{marketplaceHeroCopy.body}</p>
            <ul className="bh-points">
              <li>Listing creation, updates and real-time marketplace sync</li>
              <li>Price and quantity aligned across every connected channel</li>
              <li>Automatic delisting and double-sale protection</li>
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
            <MarketplaceConsoleWall />
          </Reveal>
        </div>
      </div>
    </section>
  );
}
