import {
  ArrowRight,
  BarChart3,
  Calendar,
  FileText,
  Globe2,
  Infinity as InfinityIcon,
  Layers,
  Link2,
  Play,
  RefreshCw,
  TrendingUp,
  Users2,
  Wallet,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { Reveal } from "@/hooks/use-scroll-motion";
import { SiteLink } from "@/components/layout/SiteLink";
import { productCards, productsEcosystemCopy } from "@/content/products-page-data";
import { eventBackdrops, type EventBackdropKey } from "@/lib/event-backdrops";

const proofIcons: Record<(typeof productsEcosystemCopy.proofs)[number]["id"], LucideIcon> = {
  workflow: InfinityIcon,
  inventory: Layers,
  scale: Globe2,
};

const stageIcons: Record<(typeof productCards)[number]["id"], LucideIcon> = {
  intel: BarChart3,
  source: Layers,
  pulse: TrendingUp,
  link: Link2,
  market: RefreshCw,
  deal: FileText,
  funds: Wallet,
};

const barIcons: Record<(typeof productsEcosystemCopy.barItems)[number]["id"], LucideIcon> = {
  events: Calendar,
  buyers: Users2,
  growth: TrendingUp,
};

/** One related event photo per product stage — all from eventBackdrops. */
const productShots: Record<(typeof productCards)[number]["id"], EventBackdropKey> = {
  intel: "footballStadium",
  source: "venueSeats",
  pulse: "basketball",
  link: "aiConnect",
  market: "sportsCrowd",
  deal: "liveCrowd",
  funds: "premiumVenue",
};

export function ProductsEcosystem() {
  const copy = productsEcosystemCopy;

  return (
    <section
      className="prd-eco section-curve relative isolate scroll-mt-24 bg-surface"
      aria-labelledby="prd-eco-title"
    >
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-border to-transparent"
        aria-hidden
      />

      <div className="container-page relative z-10">
        <div className="prd-eco-shell">
          <Reveal className="prd-eco-panel prd-eco-intro-panel">
            <div className="prd-eco-intro-copy">
              <p className="section-eyebrow text-primary">{copy.eyebrow}</p>
              <h2 id="prd-eco-title" className="prd-eco-title">
                {copy.title}
              </h2>
              <p className="prd-eco-lead">{copy.intro}</p>

              <ul className="prd-eco-proofs">
                {copy.proofs.map((proof) => {
                  const Icon = proofIcons[proof.id];
                  return (
                    <li key={proof.id}>
                      <span className="prd-eco-proof-icon" aria-hidden>
                        <Icon className="size-4" strokeWidth={1.75} />
                      </span>
                      <strong>{proof.title}</strong>
                      <span>{proof.body}</span>
                    </li>
                  );
                })}
              </ul>

              <div className="prd-eco-actions">
                <SiteLink
                  to={copy.exploreStack.to}
                  hash={copy.exploreStack.hash}
                  className="sb-btn-primary lift prd-eco-explore"
                >
                  {copy.exploreStack.label}
                  <ArrowRight className="size-4" strokeWidth={2.25} aria-hidden />
                </SiteLink>
                <SiteLink to={copy.watch.to} hash={copy.watch.hash} className="prd-eco-watch lift">
                  <span className="prd-eco-watch-icon" aria-hidden>
                    <Play className="size-3.5" strokeWidth={2.25} />
                  </span>
                  <span>
                    <strong>{copy.watch.label}</strong>
                    <em>{copy.watch.note}</em>
                  </span>
                </SiteLink>
              </div>
            </div>

            <div className="prd-eco-intro-visual">
              <img src={eventBackdrops.liveCrowd} alt="" decoding="async" />
              <div className="prd-eco-intro-quote">
                <p>{copy.heroQuote}</p>
              </div>
              <p className="prd-eco-intro-badge">
                <Globe2 className="size-3.5" strokeWidth={1.75} aria-hidden />
                {copy.heroBadge}
              </p>
            </div>
          </Reveal>

          <Reveal delay={80} className="prd-eco-panel prd-eco-stack">
            <header className="prd-eco-stack-head">
              <div className="prd-eco-stack-lead">
                <p className="section-eyebrow text-primary">{copy.stackEyebrow}</p>
                <h3 className="prd-eco-stack-title">
                  <span>{copy.stackTitleStart}</span>
                  <ArrowRight className="prd-eco-stack-arrow" strokeWidth={2.5} aria-hidden />
                  <span className="text-primary">{copy.stackTitleEnd}</span>
                </h3>
              </div>
              <p className="prd-eco-stack-note">{copy.stackNote}</p>
            </header>

            <ul className="prd-eco-rail" aria-label="SeatsBrokers product stack">
              {productCards.map((card) => {
                const Icon = stageIcons[card.id];
                return (
                  <li key={card.id}>
                    <article className="prd-eco-card" data-product={card.id}>
                      <div className="prd-eco-card-shot">
                        <img
                          src={eventBackdrops[productShots[card.id]]}
                          alt=""
                          loading="lazy"
                          decoding="async"
                        />
                        <span className="prd-eco-card-index">{card.index}</span>
                      </div>
                      <span className="prd-eco-card-icon" aria-hidden>
                        <Icon strokeWidth={1.75} />
                      </span>
                      <div className="prd-eco-card-body">
                        <div className="prd-eco-card-meta">
                          <h4>{card.name}</h4>
                          <p>{card.stage}</p>
                        </div>
                        <p className="prd-eco-card-hook">{card.tagline}</p>
                        <p className="prd-eco-card-desc">{card.body}</p>
                        <SiteLink to={card.href} className="sb-btn-outline lift prd-eco-card-cta">
                          {card.cta}
                          <ArrowRight className="size-3.5 shrink-0" strokeWidth={2.25} aria-hidden />
                        </SiteLink>
                      </div>
                    </article>
                  </li>
                );
              })}
            </ul>

            <div className="prd-eco-bar">
              <p>
                <span className="prd-eco-bar-mark" aria-hidden>
                  <InfinityIcon strokeWidth={2.25} />
                </span>
                {copy.close}
              </p>
              <ul>
                {copy.barItems.map((item) => {
                  const Icon = barIcons[item.id];
                  return (
                    <li key={item.id}>
                      <Icon strokeWidth={1.75} aria-hidden />
                      <span>
                        <strong>{item.label}</strong>
                        <em>{item.note}</em>
                      </span>
                    </li>
                  );
                })}
              </ul>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
