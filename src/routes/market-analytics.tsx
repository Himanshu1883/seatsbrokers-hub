import { createFileRoute } from "@tanstack/react-router";
import { PageShell } from "@/components/layout/PageShell";
import { pageMeta, ctas } from "@/content/site";
import { modules } from "@/content/modules";
import { FeatureGrid, PageHero, SplitPanel } from "@/components/pages/shared/PageSections";

const { title, description } = pageMeta.marketAnalytics;

export const Route = createFileRoute("/market-analytics")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
    ],
  }),
  component: MarketAnalyticsPage,
});

function MarketAnalyticsPage() {
  return (
    <PageShell>
      <PageHero
        eyebrow={modules.pulse.name}
        title={modules.pulse.tagline}
        body="Analytics dashboards for event demand, market pricing, broker performance and partner commerce — financial intelligence for ticket businesses."
        secondaryCta={ctas.exploreEventIntel}
      />
      <FeatureGrid
        eyebrow={modules.intel.name}
        title="Understand demand, sales and inventory per event"
        items={[
          { title: "Demand", body: "Track demand indicators and onsale performance per event." },
          { title: "Sales", body: "Monitor sales activity and sell-through across categories." },
          { title: "Inventory", body: "Inventory position, volume and availability over time." },
          { title: "Pricing", body: "Price curves, floors and category-level pricing trends." },
        ]}
      />
      <FeatureGrid
        eyebrow={modules.pulse.name}
        title="See what the resale market is doing"
        items={[
          { title: "Marketplace prices", body: "Compare pricing across connected resale marketplaces." },
          { title: "Average & lowest price", body: "Track average, lowest and highest available prices." },
          { title: "Price movement", body: "Follow price curves from floor to settlement." },
        ]}
      />
      <SplitPanel
        eyebrow="Sample market readout"
        title="Market Price · Demand · Inventory"
        body="Financial intelligence for ticket brokers — not an ERP export. Demo data shown below."
        items={[
          { label: "Market Price", value: "£180 → £245" },
          { label: "Demand", value: "Low → High" },
          { label: "Inventory", value: "1,420 → 620" },
          { label: "Category Trend", value: "↑ 18%" },
        ]}
      />
      <FeatureGrid
        eyebrow="Broker & partner analytics"
        title="Performance across your operation"
        items={[
          { title: "Broker analytics", body: "Sales, revenue, inventory, margins and marketplace performance." },
          { title: "Partner analytics", body: "Orders, quotes, conversion and revenue for B2B partners." },
        ]}
      />
    </PageShell>
  );
}
