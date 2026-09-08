import { Search } from "lucide-react";
import { Reveal } from "@/hooks/use-scroll-motion";
import { SiteLink } from "@/components/layout/SiteLink";
import { HeroBackdrop } from "@/components/landing/SectionBackdrop";
import { sourceHeroCopy } from "@/content/source-hero-data";
import { ctas } from "@/content/site";
import { SourceConsoleWall } from "./SourceConsoleWall";

function SourceHeroIcon({ className }: { className?: string }) {
  return (
    <span className={className} aria-hidden>
      <Search className="size-4" strokeWidth={1.75} />
    </span>
  );
}

export function SourceHero() {
  return (
    <section className="bh-hero section-curve relative isolate scroll-mt-24 overflow-hidden bg-dark text-background">
      <HeroBackdrop image="hospitalityDining" />

      <div className="container-page relative z-10">
        <div className="bh-layout">
          <Reveal className="bh-copy">
            <SourceHeroIcon className="bh-copy-icon" />
            <p className="section-eyebrow text-primary">{sourceHeroCopy.eyebrow}</p>
            <h1 className="bh-title">{sourceHeroCopy.title}</h1>
            <p className="bh-subhead">{sourceHeroCopy.subhead}</p>
            <p className="bh-body">{sourceHeroCopy.body}</p>
            <ul className="bh-points">
              <li>Submit ticket requests when inventory is not on the platform</li>
              <li>Access our global sourcing network for hard-to-find and hospitality stock</li>
              <li>Compare competitive B2B options and convert the best into an order</li>
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
            <SourceConsoleWall />
          </Reveal>
        </div>
      </div>
    </section>
  );
}
