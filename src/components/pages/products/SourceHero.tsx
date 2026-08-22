import { Layers } from "lucide-react";
import { Reveal } from "@/hooks/use-scroll-motion";
import { SiteLink } from "@/components/layout/SiteLink";
import { sourceHeroCopy } from "@/content/source-hero-data";
import { ctas } from "@/content/site";
import { SourceConsoleWall } from "./SourceConsoleWall";

function SourceHeroIcon({ className }: { className?: string }) {
  return (
    <span className={className} aria-hidden>
      <Layers className="size-4" strokeWidth={1.75} />
    </span>
  );
}

export function SourceHero() {
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
            <SourceHeroIcon className="bh-copy-icon" />
            <p className="section-eyebrow text-primary">{sourceHeroCopy.eyebrow}</p>
            <h1 className="bh-title">{sourceHeroCopy.title}</h1>
            <p className="bh-subhead">{sourceHeroCopy.subhead}</p>
            <p className="bh-body">{sourceHeroCopy.body}</p>
            <ul className="bh-points">
              <li>Tickets, sections, rows and packages in one inventory layer</li>
              <li>Supplier feeds and POS ingest land beside your own stock</li>
              <li>Live availability so connected channels do not sell what you no longer have</li>
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
