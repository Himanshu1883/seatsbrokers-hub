import { createFileRoute } from "@tanstack/react-router";
import { KeyRound, Layers, Webhook } from "lucide-react";
import { PageShell } from "@/components/layout/PageShell";
import { pageMeta, seoHead } from "@/content/site";
import { WorkflowSteps } from "@/components/pages/shared/PageSections";
import { SectionConnector } from "@/components/pages/brokers/SectionConnector";
import { ApiHero } from "@/components/pages/api/ApiHero";
import { ApiInfraBoard } from "@/components/pages/api/ApiInfraBoard";
import { ApiLiveConsole } from "@/components/pages/api/ApiLiveConsole";
import { ApiProductBoard } from "@/components/pages/api/ApiProductBoard";

export const Route = createFileRoute("/api")({
  head: () => seoHead("/api", pageMeta.api),
  component: ApiPage,
});

function ApiPage() {
  return (
    <PageShell>
      <ApiHero />

      <ApiLiveConsole variant="auth" />

      {/* <SectionConnector
        step="01"
        tone="light"
        from={{
          icon: KeyRound,
          label: "Authentication",
          detail: "Bearer keys, role-based scopes and an audit log on every call.",
        }}
        to={{
          icon: Layers,
          label: "Product APIs",
          detail: "Events, inventory, listings, orders, pricing, delivery and partner.",
        }}
        payload={["api key", "role scope", "event id", "signed request"]}
      /> */}

      <ApiProductBoard />

      <ApiInfraBoard />

      {/* <SectionConnector
        step="02"
        tone="dark"
        from={{
          icon: Layers,
          label: "Product APIs",
          detail: "Your systems call Events, Inventory, Listing and Order APIs.",
        }}
        to={{
          icon: Webhook,
          label: "Real-time sync",
          detail: "Signed webhooks return inventory, order and delivery changes.",
        }}
        payload={["inventory update", "listing status", "order event", "delivery"]}
      /> */}

      <ApiLiveConsole variant="webhooks" />

      <WorkflowSteps
        eyebrow="How you connect"
        title="Your systems → SeatsBrokers APIs → Inventory, listings and orders"
        steps={[
          "Authenticate with role-based access and an API key",
          "Call Events, Inventory and Listing APIs from POS, ERP or partner systems",
          "Orders, pricing and delivery stay in sync in real time",
          "Webhooks and audit logs report every change back to your stack",
        ]}
      />
    </PageShell>
  );
}
