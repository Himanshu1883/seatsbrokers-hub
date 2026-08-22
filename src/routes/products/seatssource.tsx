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
              title="Manage every detail of your ticket inventory"
              intro="Tickets, sections, rows, pricing, delivery rules and packages — synchronized from your POS and distributed across every connected marketplace from one live console."
              items={[
                { title: "Tickets & sections", body: "Manage tickets, sections, rows, quantity and ticket types from one layer." },
                { title: "Pricing & delivery", body: "Set prices, delivery information, restrictions and notes per listing." },
                { title: "Packages", body: "Bundle tickets into packages with custom rules and partner inventory access." },
              ]}
            />
          </>
        }
      />
    </PageShell>
  );
}
