import { Reveal } from "@/hooks/use-scroll-motion";
import { SiteLink } from "@/components/layout/SiteLink";
import { productStories } from "@/content/products-page-data";
import type { ProductCapabilityKey } from "./ProductCapabilityBoard";

type ProductIntegrationChainProps = {
  product: ProductCapabilityKey;
};

export function ProductIntegrationChain({ product }: ProductIntegrationChainProps) {
  const copy = productStories[product].integration;
  const titleId = `prd-chain-title-${product}`;

  return (
    <section
      className="prd-chain-section section-curve relative isolate scroll-mt-24 bg-surface py-20 sm:py-24"
      aria-labelledby={titleId}
    >
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-border to-transparent"
        aria-hidden
      />

      <div className="container-page relative z-10">
        <Reveal>
          <p className="section-eyebrow text-primary">{copy.eyebrow}</p>
          <h2 id={titleId} className="mt-4 max-w-3xl text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            {copy.title}
          </h2>
          <p className="mt-4 max-w-2xl text-sm leading-relaxed text-muted-foreground sm:text-base">{copy.body}</p>
        </Reveal>

        <Reveal delay={80}>
          <ol className="prd-chain" aria-label="How this product connects in SeatsBrokers">
            {copy.chain.map((node, index) => {
              const current = node.id === product;
              return (
                <li key={node.id} className="prd-chain-item">
                  {index > 0 ? (
                    <span className="prd-chain-join" aria-hidden>
                      →
                    </span>
                  ) : null}
                  {current ? (
                    <span className="prd-chain-node" data-current="true">
                      {node.name}
                    </span>
                  ) : (
                    <SiteLink to={node.href} className="prd-chain-node">
                      {node.name}
                    </SiteLink>
                  )}
                </li>
              );
            })}
          </ol>
        </Reveal>
      </div>
    </section>
  );
}
