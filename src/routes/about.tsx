import { createFileRoute } from "@tanstack/react-router";
import { PageShell } from "@/components/layout/PageShell";
import { brand, pageMeta, ctas } from "@/content/site";
import { FeatureGrid, PageHero, WorkflowSteps } from "@/components/pages/shared/PageSections";

const { title, description } = pageMeta.about;

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
    ],
  }),
  component: AboutPage,
});

function AboutPage() {
  return (
    <PageShell>
      <PageHero
        eyebrow="About SeatsBrokers"
        title="Powering the Technology Behind Modern Ticket Resale"
        body="We build technology that helps ticket brokers, marketplaces and travel partners manage, distribute, price and sell event inventory at scale — the infrastructure layer connecting the global ticketing ecosystem."
        primaryCta={ctas.bookDemo}
        secondaryCta={ctas.explorePlatform}
      />
      <FeatureGrid
        eyebrow="Who We Are"
        title="A technology company built for ticketing"
        intro="Don't tell the market we have an ERP for ticket brokers — we provide the technology infrastructure for the global ticketing ecosystem."
        items={[
          { title: "30+ years in ticketing", body: "Three decades building systems for professional ticket businesses worldwide." },
          { title: "10,000+ B2B partners", body: "Brokers, travel teams and marketplaces connected through one platform." },
          { title: "Global operations", body: `${brand.offices} — three offices, one technology platform.` },
          { title: "Technology-first", body: "API-first, cloud infrastructure, real-time sync and AI-powered pricing." },
        ]}
      />
      <WorkflowSteps
        eyebrow="Why Us"
        title="Technology built specifically for ticketing"
        steps={[
          "Event Intelligence — understand upcoming events and demand",
          "Marketplace Connectivity — connect inventory with resale marketplaces",
          "Inventory Automation — manage listings from one place",
          "AI Pricing — market signals support pricing decisions",
          "API Infrastructure — connect POS, ERP and partner systems",
          "Partner Commerce — travel partner inventory and quotation tools",
        ]}
      />
      <FeatureGrid
        eyebrow="Who We Serve"
        title="One platform. Multiple business models."
        items={[
          { title: "Ticket Brokers", body: "Manage inventory, pricing and marketplace distribution." },
          { title: "Travel Companies", body: "Source tickets and create customer-ready quotations." },
          { title: "Ticket Marketplaces", body: "Connect inventory and order infrastructure through APIs." },
          { title: "Technology Partners", body: "Integrate ticket inventory and event data into your applications." },
        ]}
      />
    </PageShell>
  );
}
