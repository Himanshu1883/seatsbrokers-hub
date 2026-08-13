import { createFileRoute } from "@tanstack/react-router";
import { BrainCircuit, Radar, RefreshCw } from "lucide-react";
import { PageShell } from "@/components/layout/PageShell";
import { pageMeta } from "@/content/site";
import { BrokersHero } from "@/components/pages/brokers/BrokersHero";
import { EventCatalogSection } from "@/components/pages/brokers/EventCatalogSection";
import { InventoryManagementSection } from "@/components/pages/brokers/InventoryManagementSection";
import { LiveConsole } from "@/components/pages/brokers/LiveConsole";
import { SectionConnector } from "@/components/pages/brokers/SectionConnector";
import {
  ApiCards,
  SyncDiagram,
  WorkflowSteps,
} from "@/components/pages/shared/PageSections";
import { PaymentInfrastructureSection } from "@/components/pages/brokers/PaymentInfrastructureSection";

const { title, description } = pageMeta.brokers;

const brokerApiProducts = [
  {
    title: "Events API",
    body: "Global event catalog and event information — onsale dates, venues, categories and demand indicators.",
  },
  {
    title: "Inventory API",
    body: "Search and retrieve available ticket inventory — sections, rows, quantity, prices and delivery information.",
  },
  {
    title: "Listing API",
    body: "Create and manage ticket listings across connected marketplaces from your existing systems.",
  },
  {
    title: "Order API",
    body: "Receive and manage ticket orders — synchronization, delivery updates and order status.",
  },
  {
    title: "Pricing API",
    body: "Access pricing and market information — average price, movement, demand signals and AI recommendations.",
  },
  {
    title: "Delivery API",
    body: "Manage ticket delivery information — mobile transfer, PDF, will-call and fulfillment routing.",
  },
];

export const Route = createFileRoute("/brokers")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
    ],
  }),
  component: BrokersPage,
});

function BrokersPage() {
  return (
    <PageShell>
      <BrokersHero />

      <EventCatalogSection />

      <InventoryManagementSection
        eyebrow="Inventory Management"
        title="Manage every detail of your ticket inventory"
        intro="Tickets, sections, rows, pricing, delivery rules and packages — synchronized from your POS and distributed across every connected marketplace from one live console."
        items={[
          { title: "Tickets & sections", body: "Manage tickets, sections, rows, quantity and ticket types from one layer." },
          { title: "Pricing & delivery", body: "Set prices, delivery information, restrictions and notes per listing." },
          { title: "Packages", body: "Bundle tickets into packages with custom rules and partner inventory access." },
        ]}
      />

      <SyncDiagram
        title="List once. Distribute everywhere."
        body="When inventory changes, SeatsBrokers synchronizes quantity, price and listing status. When a ticket sells, other listings update automatically."
      />

      <SectionConnector
        step="01"
        tone="dark"
        from={{
          icon: RefreshCw,
          label: "Marketplace sync",
          detail: "Listings, quantity and sale events across 32 channels.",
        }}
        to={{
          icon: Radar,
          label: "Market Intelligence",
          detail: "Ask ladders, movement curves and demand signals per event.",
        }}
        payload={["listing status", "ask price", "quantity", "sale events"]}
      />

      <LiveConsole variant="marketIntelligence" />

      <SectionConnector
        step="02"
        tone="light"
        from={{
          icon: Radar,
          label: "Market Intelligence",
          detail: "Scored market context for every listing you hold.",
        }}
        to={{
          icon: BrainCircuit,
          label: "AI Pricing",
          detail: "Recommended ask with confidence, guardrails and broker approval.",
        }}
        payload={["demand velocity", "competitor asks", "sell-through", "floor guard"]}
      />

      <LiveConsole variant="aiPredictions" />

      <WorkflowSteps
        eyebrow="Connect Your Existing Systems"
        title="Broker POS → SeatsBrokers API → Inventory → Marketplaces"
        steps={[
          "Broker POS / inventory system connects via API",
          "Inventory synchronized to SeatsBrokers platform",
          "Listings distributed to connected marketplaces",
          "Orders synchronized back through the API",
        ]}
      />

      <ApiCards items={brokerApiProducts} />

      <PaymentInfrastructureSection />
    </PageShell>
  );
}
