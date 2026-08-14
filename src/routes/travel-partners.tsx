import { createFileRoute } from "@tanstack/react-router";
import { ClipboardList, FileText, Search } from "lucide-react";
import { PageShell } from "@/components/layout/PageShell";
import { pageMeta } from "@/content/site";
import { FeatureGrid } from "@/components/pages/shared/PageSections";
import { SectionConnector } from "@/components/pages/brokers/SectionConnector";
import { TravelPartnersHero } from "@/components/pages/travel/TravelPartnersHero";
import { TravelLiveConsole } from "@/components/pages/travel/TravelLiveConsole";
import { InventoryAccessShowcase } from "@/components/pages/travel/InventoryAccessShowcase";
import { SearchFilterShowcase } from "@/components/pages/travel/SearchFilterShowcase";
import { PartnerTermsSection } from "@/components/pages/travel/PartnerTermsSection";

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
      <TravelPartnersHero />

      <TravelLiveConsole variant="inventorySearch" />

      <InventoryAccessShowcase />

      <SearchFilterShowcase />

      <SplitPanelLocal />

      <SectionConnector
        step="01"
        tone="light"
        from={{
          icon: Search,
          label: "Inventory Access",
          detail: "Live seats, partner cost bands and margin preview from the broker catalog.",
        }}
        to={{
          icon: FileText,
          label: "Quotation Builder",
          detail: "Event, tickets and cost drop into a branded customer quote.",
        }}
        payload={["event", "tickets", "partner price", "availability"]}
      />

      <TravelLiveConsole variant="quotationBuilder" />

      <SectionConnector
        step="02"
        tone="light"
        from={{
          icon: FileText,
          label: "Quotation Builder",
          detail: "Shared PDF, WhatsApp or email with a customer-ready total.",
        }}
        to={{
          icon: ClipboardList,
          label: "Order & Delivery",
          detail: "Accepted quotes become confirmed orders, invoices and delivery.",
        }}
        payload={["quote id", "customer price", "share channel", "status"]}
      />

      {/* <FeatureGrid
        eyebrow="Order & Delivery"
        title="After the customer says yes"
        intro="The fulfillment desk below is the source of truth. These are the three jobs it closes."
        items={[
          { title: "Invoice generation", body: "A branded invoice follows every accepted quote, with ticket cost, margin and customer total itemised." },
          { title: "Delivery confirmation", body: "Mobile transfer, PDF or will-call reports back to the partner desk when tickets land." },
          { title: "Last-minute & group booking", body: "Holds and multi-pax packages stay in the same queue — no side channel for late or large requests." },
        ]}
      /> */}

      <TravelLiveConsole variant="partnerOrders" />

      <PartnerTermsSection />
    </PageShell>
  );
}

function SplitPanelLocal() {
  return (
    <section className="section-curve relative isolate bg-surface py-20 sm:py-24">
      <div className="container-page relative z-10 grid min-w-0 gap-10 lg:grid-cols-2 lg:items-center">
        <div className="min-w-0">
          <p className="section-eyebrow text-primary">Margin Management</p>
          <h2 className="mt-4 text-3xl font-bold text-foreground sm:text-4xl">
            Add your margin. Set your customer price.
          </h2>
          <p className="mt-4 text-sm leading-relaxed text-muted-foreground sm:text-base">
            Travel partners can add their own margin on top of ticket inventory pricing — transparent,
            predictable and customer-ready.
          </p>
        </div>
        <div className="min-w-0 rounded-2xl border border-border bg-card p-5 lg:p-8">
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
