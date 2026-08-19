import { createFileRoute } from "@tanstack/react-router";
import { PageShell } from "@/components/layout/PageShell";
import { pageMeta, ctas } from "@/content/site";
import { modules } from "@/content/modules";
import { FeatureGrid, PageHero, WorkflowSteps } from "@/components/pages/shared/PageSections";

const { title, description } = pageMeta.integrations;

export const Route = createFileRoute("/integrations")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
    ],
  }),
  component: IntegrationsPage,
});

function IntegrationsPage() {
  return (
    <PageShell>
      <PageHero
        eyebrow={modules.link.name}
        title={modules.link.tagline}
        body="Brokers should not need to change everything they already use. Connect at the depth you need through API-first architecture built specifically for ticketing."
        primaryCta={ctas.viewApiDocs}
        secondaryCta={ctas.requestApiAccess}
      />
      <FeatureGrid
        eyebrow="Connect to"
        title="Integrate with the tools your business already runs on"
        items={[
          { title: "POS systems", body: "Connect broker point-of-sale systems for inventory and order sync." },
          { title: "Inventory systems", body: "Synchronize existing inventory management tools with the platform." },
          { title: "Internal ERP", body: "Feed ticket data into your internal ERP and finance systems." },
          { title: "Websites", body: "Embed inventory and pricing into your own customer-facing websites." },
          { title: "Mobile applications", body: "Build mobile experiences on top of SeatsBrokers APIs." },
          { title: "Partner systems", body: "Allow B2B partners and external systems to interact with inventory." },
          { title: "Marketplace integrations", body: "Centralized connectivity to resale marketplaces through one hub." },
        ]}
      />
      <WorkflowSteps
        eyebrow="Integration flow"
        title="Broker POS → SeatsBrokers API → Inventory → Marketplaces"
        steps={[
          "Connect your POS or inventory system",
          "Inventory synchronized via API",
          "Listings distributed to marketplaces",
          "Orders and delivery flow back through the API",
        ]}
      />
      <FeatureGrid
        eyebrow="Engineering"
        title="Enterprise-grade integration infrastructure"
        items={[
          { title: "API-First", body: "RESTful APIs with secure authentication and audit logs." },
          { title: "Real-Time Synchronization", body: "Inventory, pricing and orders synchronized in real time." },
          { title: "Role-Based Access", body: "Staff-grade permissions and access controls." },
          { title: "Scalable Architecture", body: "Built for high-volume ticket operations globally." },
        ]}
      />
    </PageShell>
  );
}
