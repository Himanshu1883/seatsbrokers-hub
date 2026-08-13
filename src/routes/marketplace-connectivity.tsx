import { createFileRoute } from "@tanstack/react-router";
import { PageShell } from "@/components/layout/PageShell";
import { pageMeta, ctas } from "@/content/site";
import { FeatureGrid, PageHero, SyncDiagram } from "@/components/pages/shared/PageSections";

const { title, description } = pageMeta.marketplaceConnectivity;

export const Route = createFileRoute("/marketplace-connectivity")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
    ],
  }),
  component: MarketplaceConnectivityPage,
});

function MarketplaceConnectivityPage() {
  return (
    <PageShell>
      <PageHero
        eyebrow="Marketplace Connectivity"
        title="One Inventory. Multiple Marketplaces."
        body="Connect your ticket operation to multiple resale marketplaces through a centralized API infrastructure — listing creation, updates, synchronization and automatic delisting."
        secondaryCta={ctas.viewApiDocs}
      />
      <FeatureGrid
        eyebrow="Features"
        title="Centralized marketplace management"
        intro="List once and distribute everywhere — with full synchronization across quantity, price, orders and delivery."
        items={[
          { title: "Listing creation & updates", body: "Create and update listings across connected marketplaces from one platform." },
          { title: "Price synchronization", body: "Price changes propagate to every connected marketplace automatically." },
          { title: "Quantity synchronization", body: "Inventory quantity stays consistent — no overselling across channels." },
          { title: "Order synchronization", body: "Orders from any marketplace flow back into the central platform." },
          { title: "Automatic delisting", body: "When a ticket sells, other marketplace listings are removed automatically." },
          { title: "Delivery updates", body: "Ticket delivery information synchronized across marketplaces and partners." },
          { title: "Marketplace status", body: "Monitor connection status, error rates and API health per marketplace." },
          { title: "Error monitoring", body: "Real-time error detection with API logs for troubleshooting." },
          { title: "API logs", body: "Full audit trail of every API request and marketplace interaction." },
        ]}
      />
      <SyncDiagram
        title="When a ticket sells, every channel updates"
        body="Broker inventory flows through SeatsBrokers to connected marketplaces. A sale on any channel triggers automatic inventory updates and delisting across all others."
      />
    </PageShell>
  );
}
