import { createFileRoute } from "@tanstack/react-router";
import { PageShell } from "@/components/layout/PageShell";
import { pageMeta, seoHead } from "@/content/site";
import { ProductStoryPage } from "@/components/pages/products/ProductStoryPage";
import { LinkHero } from "@/components/pages/products/LinkHero";

export const Route = createFileRoute("/products/seatslink")({
  head: () => seoHead("/products/seatslink", pageMeta.link),
  component: SeatsLinkPage,
});

function SeatsLinkPage() {
  return (
    <PageShell showFinalCta={false}>
      <ProductStoryPage product="link" hero={<LinkHero />} />
    </PageShell>
  );
}
