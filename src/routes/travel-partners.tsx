import { createFileRoute } from "@tanstack/react-router";
import { PageShell } from "@/components/layout/PageShell";
import { pageMeta, ctas } from "@/content/site";
import { FeatureGrid, PageHero, WorkflowSteps } from "@/components/pages/shared/PageSections";

const { title, description } = pageMeta.travelPartners;

export const Route = createFileRoute("/travel-partners")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
    ],
  }),
  component: TravelPartnersPage,
});

function TravelPartnersPage() {
  return (
    <PageShell>
      <PageHero
        eyebrow="Travel Partner Platform"
        title="Turn Ticket Inventory Into Customer-Ready Travel Experiences"
        body="Give travel partners direct access to ticket inventory, pricing and quotation tools — search, buy, margin and share with customers."
        secondaryCta={ctas.explorePlatform}
      />
      <FeatureGrid
        eyebrow="Inventory Access"
        title="Access available ticket inventory through the platform"
        items={[
          { title: "Real-time visibility", body: "See available ticket inventory across events, venues and categories in real time." },
          { title: "Partner purchasing", body: "Select available inventory and purchase through the platform with partner pricing." },
          { title: "Order management", body: "Track orders, delivery status and customer fulfillment from one workspace." },
        ]}
      />
      <FeatureGrid
        eyebrow="Search"
        title="Search by event, date, venue and more"
        items={[
          { title: "Event & date", body: "Search by event name, date and onsale information." },
          { title: "Venue & location", body: "Filter by venue, city, category and location." },
          { title: "Ticket type & price", body: "Find inventory by ticket type, section and price range." },
        ]}
      />
      <SplitPanelLocal />
      <WorkflowSteps
        eyebrow="Quotation Tool"
        title="Create Professional Ticket Quotes in Seconds"
        steps={[
          "Select Event",
          "Select Tickets",
          "Add Margin",
          "Generate Quote",
          "Share With Customer",
        ]}
      />
    </PageShell>
  );
}

function SplitPanelLocal() {
  return (
    <section className="section-curve relative isolate bg-surface py-20 sm:py-24">
      <div className="container-page relative z-10 grid gap-10 lg:grid-cols-2 lg:items-center">
        <div>
          <p className="section-eyebrow text-primary">Margin Management</p>
          <h2 className="mt-4 text-3xl font-bold text-foreground sm:text-4xl">
            Add your margin. Set your customer price.
          </h2>
          <p className="mt-4 text-sm leading-relaxed text-muted-foreground sm:text-base">
            Travel partners can add their own margin on top of ticket inventory pricing — transparent,
            predictable and customer-ready.
          </p>
        </div>
        <div className="rounded-2xl border border-border bg-card p-8">
          <dl className="space-y-4">
            <div className="flex justify-between border-b border-border pb-3">
              <dt className="text-sm text-muted-foreground">Ticket price</dt>
              <dd className="font-mono font-semibold text-foreground">£500</dd>
            </div>
            <div className="flex justify-between border-b border-border pb-3">
              <dt className="text-sm text-muted-foreground">Partner margin</dt>
              <dd className="font-mono font-semibold text-primary">10%</dd>
            </div>
            <div className="flex justify-between pt-2">
              <dt className="text-sm font-semibold text-foreground">Customer price</dt>
              <dd className="font-mono text-xl font-bold text-foreground">£550</dd>
            </div>
          </dl>
        </div>
      </div>
    </section>
  );
}
