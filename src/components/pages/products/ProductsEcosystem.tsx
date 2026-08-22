import { ArrowUpRight } from "lucide-react";
import { Reveal } from "@/hooks/use-scroll-motion";
import { SiteLink } from "@/components/layout/SiteLink";
import { productCards, productsEcosystemCopy } from "@/content/products-page-data";
import { ProductsMiniConsole } from "./ProductsMiniConsoles";

export function ProductsEcosystem() {
  return (
    <section
      className="prd-eco section-curve relative isolate scroll-mt-24 bg-surface py-20 sm:py-24"
      aria-labelledby="prd-eco-title"
    >
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-border to-transparent"
        aria-hidden
      />

      <div className="container-page relative z-10">
        <Reveal>
          <p className="section-eyebrow text-primary">{productsEcosystemCopy.eyebrow}</p>
          <h2 id="prd-eco-title" className="prd-eco-title">
            {productsEcosystemCopy.title}
          </h2>
          <p className="prd-eco-intro">{productsEcosystemCopy.intro}</p>
        </Reveal>

        <Reveal delay={80} className="mt-12 lg:mt-14">
          <ul className="prd-eco-grid">
            {productCards.map((card) => (
              <li key={card.id} className="prd-card">
                <div className="prd-card-copy">
                  <span className="prd-card-meta">
                    <span>{card.index}</span>
                    <span>{card.stage}</span>
                  </span>
                  <h3 className="prd-card-name">{card.name}</h3>
                  <p className="prd-card-tag">{card.tagline}</p>
                  <p className="prd-card-body">{card.body}</p>
                </div>
                <ProductsMiniConsole id={card.id} />
                <SiteLink to={card.href} className="prd-card-cta">
                  {card.cta}
                  <ArrowUpRight className="size-3.5" strokeWidth={2} />
                </SiteLink>
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}
