import { createFileRoute } from "@tanstack/react-router";
import { PageShell } from "@/components/layout/PageShell";
import { pageMeta, seoHead } from "@/content/site";
import { productsSteps } from "@/content/products-page-data";
import { WorkflowSteps } from "@/components/pages/shared/PageSections";
import { ProductsHero } from "@/components/pages/products/ProductsHero";
import { ProductsEcosystem } from "@/components/pages/products/ProductsEcosystem";

export const Route = createFileRoute("/products/")({
  head: () => seoHead("/products", pageMeta.products),
  component: ProductsPage,
});

function ProductsPage() {
  return (
    <PageShell>
      <ProductsHero />
      <ProductsEcosystem />
      <WorkflowSteps
        eyebrow="How SeatsBrokers works"
        title="From opportunity to settlement"
        steps={[...productsSteps]}
      />
    </PageShell>
  );
}
