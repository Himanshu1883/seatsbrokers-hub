import {
  ArrowRight,
  BarChart3,
  FileText,
  Globe2,
  Infinity as InfinityIcon,
  Layers,
  Link2,
  RefreshCw,
  TrendingUp,
  Wallet,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { Reveal } from "@/hooks/use-scroll-motion";
import { SiteLink } from "@/components/layout/SiteLink";
import { productCards, productsEcosystemCopy } from "@/content/products-page-data";
import { eventBackdrops } from "@/lib/event-backdrops";
import categoryPrices from "@/assets/product-showcase/category-prices-light.png";
import stadiumConnect from "@/assets/hero-stadium-3.jpg";
import { ProductsMiniConsole } from "./ProductsMiniConsoles";

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

const productShots: Record<(typeof productCards)[number]["id"], string> = {
  intel: eventBackdrops.footballNight,
  source: eventBackdrops.venueSeats,
  pulse: categoryPrices,
  link: stadiumConnect,
  market: eventBackdrops.concertCrowd,
  deal: eventBackdrops.musicStage,
  funds: eventBackdrops.trophy,
};

export function ProductsEcosystem() {
  return (
    <section
      className="prd-eco section-curve relative isolate scroll-mt-24 bg-surface py-16 sm:py-20"
      aria-labelledby="prd-eco-title"
    >
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-border to-transparent"
        aria-hidden
      />

      <div className="container-page relative z-10">
        <Reveal className="prd-eco-head">
          <div className="prd-eco-copy">
            <p className="section-eyebrow text-primary">{productsEcosystemCopy.eyebrow}</p>
            <h2 id="prd-eco-title" className="prd-eco-title">
              {productsEcosystemCopy.title}
            </h2>
            <p className="prd-eco-intro">{productsEcosystemCopy.intro}</p>
          </div>
          <p className="prd-eco-note">{productsEcosystemCopy.note}</p>
          <ul className="prd-eco-proofs">
            {productsEcosystemCopy.proofs.map((proof) => {
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
        </Reveal>

        <Reveal delay={80} className="mt-9 lg:mt-11">
          <ul className="prd-eco-grid">
            {productCards.map((card) => {
              const Icon = stageIcons[card.id];
              return (
                <li key={card.id} className="prd-card" data-product={card.id}>
                  <div className="prd-card-shot">
                    <img src={productShots[card.id]} alt="" decoding="async" />
                    <div className="prd-card-shot-copy">
                      <span className="prd-card-index">{card.index}</span>
                      <span className="prd-card-stage">{card.stage}</span>
                      <span className="prd-card-caption">{card.caption}</span>
                    </div>
                    <span className="prd-card-badge" aria-hidden>
                      <Icon className="size-4" strokeWidth={1.75} />
                    </span>
                  </div>
                  <div className="prd-card-copy">
                    <h3 className="prd-card-name">{card.name}</h3>
                    <p className="prd-card-tag">{card.tagline}</p>
                    <p className="prd-card-body">{card.body}</p>
                  </div>
                  <ProductsMiniConsole id={card.id} />
                  <SiteLink to={card.href} className="prd-card-cta">
                    {card.cta}
                    <ArrowRight className="size-3.5" strokeWidth={2.25} />
                  </SiteLink>
                </li>
              );
            })}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}
