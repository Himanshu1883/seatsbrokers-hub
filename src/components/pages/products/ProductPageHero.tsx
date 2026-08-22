import {
  BarChart3,
  Boxes,
  FileText,
  Landmark,
  Layers,
  Link2,
  Radar,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { Reveal } from "@/hooks/use-scroll-motion";
import { SiteLink } from "@/components/layout/SiteLink";
import { modules } from "@/content/modules";
import { productStories } from "@/content/products-page-data";
import { ctas } from "@/content/site";
import { ProductsMiniConsole } from "./ProductsMiniConsoles";
import type { ProductCapabilityKey } from "./ProductCapabilityBoard";

const heroIcons: Record<ProductCapabilityKey, LucideIcon> = {
  intel: Radar,
  source: Layers,
  pulse: BarChart3,
  link: Link2,
  market: Boxes,
  deal: FileText,
  funds: Landmark,
};

type ProductPageHeroProps = {
  product: ProductCapabilityKey;
};

export function ProductPageHero({ product }: ProductPageHeroProps) {
  const mod = modules[product];
  const story = productStories[product];
  const Icon = heroIcons[product];

  return (
    <section className="bh-hero prd-hero prd-story-hero section-curve relative isolate scroll-mt-24 overflow-hidden bg-dark text-background">
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
              <Icon className="size-4" strokeWidth={1.75} />
            </span>
            <h1 className="bh-title">{mod.name}</h1>
            <p className="prd-story-tagline">{mod.tagline}</p>
            <p className="bh-body">{story.what}</p>
            <div className="page-cta-row mt-9">
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

          <Reveal delay={120} className="bh-stage min-w-0">
            <div className="bh-wall prd-stage">
              <span className="bh-wall-glow" aria-hidden />
              <div className="prd-room prd-story-room">
                <ProductsMiniConsole id={product} />
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
