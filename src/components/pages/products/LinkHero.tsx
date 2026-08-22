import { Link2 } from "lucide-react";
import { Reveal } from "@/hooks/use-scroll-motion";
import { SiteLink } from "@/components/layout/SiteLink";
import { linkHeroCopy } from "@/content/link-hero-data";
import { ctas } from "@/content/site";
import { LinkConsoleWall } from "./LinkConsoleWall";

function LinkHeroIcon({ className }: { className?: string }) {
  return (
    <span className={className} aria-hidden>
      <Link2 className="size-4" strokeWidth={1.75} />
    </span>
  );
}

export function LinkHero() {
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
            <LinkHeroIcon className="bh-copy-icon" />
            <p className="section-eyebrow text-primary">{linkHeroCopy.eyebrow}</p>
            <h1 className="bh-title">{linkHeroCopy.title}</h1>
            <p className="bh-subhead">{linkHeroCopy.subhead}</p>
            <p className="bh-body">{linkHeroCopy.body}</p>
            <ul className="bh-points">
              <li>Connect POS, inventory tools, supplier feeds and websites</li>
              <li>Inventory, pricing and orders move on one API path</li>
              <li>Keep the stack you already run — SeatsBrokers sits in the middle</li>
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
            <LinkConsoleWall />
          </Reveal>
        </div>
      </div>
    </section>
  );
}
