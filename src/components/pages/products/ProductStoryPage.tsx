import type { ReactNode } from "react";
import { SplitPanel, WorkflowSteps } from "@/components/pages/shared/PageSections";
import { SiteLink } from "@/components/layout/SiteLink";
import { Reveal } from "@/hooks/use-scroll-motion";
import { productStories } from "@/content/products-page-data";
import { ctas } from "@/content/site";
import { ProductCapabilityBoard } from "./ProductCapabilityBoard";
import { ProductIntegrationChain } from "./ProductIntegrationChain";
import type { ProductCapabilityKey } from "./ProductCapabilityBoard";

type ProductStoryPageProps = {
  product: ProductCapabilityKey;
  hero: ReactNode;
  /** Earlier live consoles / desks that illustrate How SeatsBrokers solves it. */
  how?: ReactNode;
  /** Optional extra board in the capabilities slot (category / marketplace board). */
  extraCapabilities?: ReactNode;
};

export function ProductStoryPage({ product, hero, how, extraCapabilities }: ProductStoryPageProps) {
  const story = productStories[product];

  return (
    <>
      {hero}

      <SplitPanel
        eyebrow={story.problem.eyebrow}
        title={story.problem.title}
        body={story.problem.body}
        items={[...story.problem.items]}
      />

      <WorkflowSteps eyebrow={story.how.eyebrow} title={story.how.title} steps={[...story.how.steps]} />

      {how}

      <ProductCapabilityBoard product={product} />

      {extraCapabilities}

      <ProductIntegrationChain product={product} />

      <section className="prd-close-section section-curve relative isolate scroll-mt-24 bg-background py-20 sm:py-24">
        <div
          className="pointer-events-none absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-border to-transparent"
          aria-hidden
        />
        <div className="container-page relative z-10">
          <Reveal className="prd-close">
            <p className="section-eyebrow text-primary">Next step</p>
            <h2>See it on your desk</h2>
            <div className="page-cta-row prd-close-ctas">
              <SiteLink
                to={ctas.bookDemo.to}
                className="lift inline-flex min-h-11 items-center justify-center whitespace-nowrap rounded-md bg-primary px-6 py-3.5 text-sm font-semibold text-primary-foreground"
              >
                {ctas.bookDemo.label}
              </SiteLink>
              <SiteLink
                to={ctas.becomeSeller.to}
                className="lift inline-flex min-h-11 items-center justify-center whitespace-nowrap rounded-md border border-border px-6 py-3.5 text-sm font-semibold text-foreground hover:bg-surface"
              >
                {ctas.becomeSeller.label}
              </SiteLink>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
