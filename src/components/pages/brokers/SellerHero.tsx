import { Handshake } from "lucide-react";
import { Reveal } from "@/hooks/use-scroll-motion";
import { SiteLink } from "@/components/layout/SiteLink";
import { sellerHeroCopy, sellerHeroPoints } from "@/content/seller-hero-data";
import { ctas } from "@/content/site";
import { SellerApplyWall } from "./SellerApplyWall";

export function SellerHero() {
  return (
    <section className="bh-hero slr-hero section-curve relative isolate scroll-mt-24 overflow-hidden bg-dark text-background">
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
              <Handshake className="size-4" strokeWidth={1.75} />
            </span>
            <p className="section-eyebrow text-primary">{sellerHeroCopy.eyebrow}</p>
            <h1 className="bh-title">{sellerHeroCopy.title}</h1>
            <p className="bh-subhead">{sellerHeroCopy.subhead}</p>
            <p className="bh-body">{sellerHeroCopy.body}</p>
            <ul className="bh-points">
              {sellerHeroPoints.map((point) => (
                <li key={point}>{point}</li>
              ))}
            </ul>
            <div className="page-cta-row bh-ctas mt-9">
              <SiteLink
                to={ctas.applyToJoin.to}
                hash={ctas.applyToJoin.hash}
                className="lift inline-flex min-h-11 items-center justify-center whitespace-nowrap rounded-md bg-primary px-6 py-3.5 text-sm font-semibold text-primary-foreground"
              >
                {ctas.applyToJoin.label}
              </SiteLink>
              <SiteLink
                to={ctas.bookDemo.to}
                className="lift inline-flex min-h-11 items-center justify-center whitespace-nowrap rounded-md border border-background/40 px-6 py-3.5 text-sm font-semibold text-background hover:bg-background/10"
              >
                {ctas.bookDemo.label}
              </SiteLink>
            </div>
          </Reveal>

          <Reveal delay={120} className="bh-stage min-w-0">
            <SellerApplyWall />
          </Reveal>
        </div>
      </div>
    </section>
  );
}
