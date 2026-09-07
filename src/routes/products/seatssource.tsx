import { createFileRoute } from "@tanstack/react-router";
import { PageShell } from "@/components/layout/PageShell";
import { pageMeta, seoHead } from "@/content/site";
import { modules } from "@/content/modules";
import { ProductStoryPage } from "@/components/pages/products/ProductStoryPage";
import { SourceHero } from "@/components/pages/products/SourceHero";
import { EventCatalogSection } from "@/components/pages/brokers/EventCatalogSection";
import { InventoryManagementSection } from "@/components/pages/brokers/InventoryManagementSection";

export const Route = createFileRoute("/products/seatssource")({
  head: () => seoHead("/products/seatssource", pageMeta.source),
  component: SeatsSourcePage,
});

function SeatsSourcePage() {
  return (
    <PageShell showFinalCta={false}>
      <ProductStoryPage
        product="source"
        hero={<SourceHero />}
        how={
          <>
            <EventCatalogSection />
            <InventoryManagementSection
              eyebrow={modules.source.name}
              title="Your back-office sourcing department, built into SeatsBrokers"
              intro="If it's not listed, request it. SeatsSource works across our global network to find the best available options and competitive B2B pricing — then you compare, quote and buy from one desk."
              items={[
                { title: "Ticket requests", body: "Submit requirements directly through SeatsBrokers when stock is not on the platform." },
                { title: "Global network", body: "Source hard-to-find, premium and hospitality inventory through our dedicated sourcing network." },
                { title: "Compare & buy", body: "Review B2B options, manage quotations and convert sourced inventory into an order." },
              ]}
            />
          </>
        }
      />
    </PageShell>
  );
}
