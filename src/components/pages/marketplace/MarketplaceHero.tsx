import { Reveal } from "@/hooks/use-scroll-motion";
import { SiteLink } from "@/components/layout/SiteLink";
import { marketplaceHeroCopy } from "@/content/marketplace-hero-data";
import { ctas } from "@/content/site";
import { MarketplaceHeroIcon } from "./MarketplaceConsoleCards";
import { MarketplaceConsoleWall } from "./MarketplaceConsoleWall";

export function MarketplaceHero() {
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
            <div className="bh-ctas">
              <SiteLink
                to={ctas.becomeSeller.to}
                className="lift rounded-md bg-primary px-6 py-3.5 text-sm font-semibold text-primary-foreground"
              >
                {ctas.becomeSeller.label}
              </SiteLink>
              <SiteLink
                to={ctas.viewApiDocs.to}
                className="lift rounded-md border border-background/40 px-6 py-3.5 text-sm font-semibold text-background hover:bg-background/10"
              >
                {ctas.viewApiDocs.label}
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
