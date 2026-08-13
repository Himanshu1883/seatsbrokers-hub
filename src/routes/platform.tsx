import { createFileRoute } from "@tanstack/react-router";
import { PageShell } from "@/components/layout/PageShell";
import { pageMeta, ctas } from "@/content/site";
import { FeatureGrid, PageHero, WorkflowSteps } from "@/components/pages/shared/PageSections";

const { title, description } = pageMeta.platform;

export const Route = createFileRoute("/platform")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
    ],
  }),
  component: PlatformPage,
});

function PlatformPage() {
  return (
    <PageShell>
      <PageHero
        eyebrow="Platform Overview"
        title="One Centralized Ticketing Infrastructure"
        body="Connect event data, inventory, marketplaces, pricing, partners and payments through one intelligent platform — built for ticket brokers, travel partners, marketplaces and technology providers."
        primaryCta={ctas.bookDemo}
        secondaryCta={ctas.exploreBrokers}
      />
      <FeatureGrid
        eyebrow="Platform Modules"
        title="Everything your ticket business needs in one stack"
        intro="From event discovery to listing, distribution, pricing, sales and fulfillment."
        items={[
          { title: "Event Intelligence", body: "Global event catalog, onsale dates, demand indicators and venue maps." },
          { title: "Inventory Management", body: "Tickets, sections, rows, quantity, prices and delivery information." },
          { title: "Marketplace Connectivity", body: "List once, distribute everywhere with automated synchronization." },
          { title: "Market Intelligence", body: "Average price, price movement, inventory volume and marketplace comparison." },
          { title: "AI Pricing", body: "Market data into pricing recommendations — AI recommends, you decide." },
          { title: "Partner Commerce", body: "Travel partner inventory access, margins and quotation tools." },
          { title: "API Infrastructure", body: "Connect POS, ERP, websites and partner systems." },
          { title: "Payment Infrastructure", body: "Integrated purchasing and settlement for eligible businesses." },
          { title: "Analytics", body: "Event, market, broker and partner analytics dashboards." },
        ]}
      />
      <WorkflowSteps
        eyebrow="Brand Story"
        title="The technology layer connecting the ticketing ecosystem"
        steps={[
          "Event Data",
          "Event Intelligence",
          "Inventory",
          "SeatsBrokers",
          "AI / Pricing / Analytics",
          "Marketplace Connectivity",
          "Brokers & Travel Partners",
          "Customers",
        ]}
      />
    </PageShell>
  );
}
