import { createFileRoute } from "@tanstack/react-router";
import { PageShell } from "@/components/layout/PageShell";
import { pageMeta } from "@/content/site";
import { ApiCards, PageHero } from "@/components/pages/shared/PageSections";

const { title, description } = pageMeta.api;

export const Route = createFileRoute("/api")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
    ],
  }),
  component: ApiPage,
});

const apiProducts = [
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
  {
    title: "Partner API",
    body: "Allow travel partners and external systems to interact with inventory, margins and quotations.",
  },
];

function ApiPage() {
  return (
    <PageShell>
      <PageHero
        eyebrow="API Platform"
        title="Build Your Ticket Business on Our APIs"
        body="API-first architecture for POS systems, inventory systems, internal ERP, websites, mobile applications and partner systems — connect at the depth you need."
      />
      <section className="section-curve relative isolate bg-background py-12 sm:py-16">
        <div className="container-page relative z-10">
          <p className="max-w-2xl text-sm leading-relaxed text-muted-foreground sm:text-base">
            Secure authentication, role-based access, audit logs and real-time synchronization —
            enterprise-grade API infrastructure built specifically for ticketing operations.
          </p>
        </div>
      </section>
      <ApiCards items={apiProducts} />
    </PageShell>
  );
}
