import { createFileRoute } from "@tanstack/react-router";
import { ClipboardList, FileText, Search } from "lucide-react";
import { PageShell } from "@/components/layout/PageShell";
import { pageMeta, seoHead } from "@/content/site";
import { SplitPanel } from "@/components/pages/shared/PageSections";
import { ProductStoryPage } from "@/components/pages/products/ProductStoryPage";
import { SectionConnector } from "@/components/pages/brokers/SectionConnector";
import { TravelPartnersHero } from "@/components/pages/travel/TravelPartnersHero";
import { TravelLiveConsole } from "@/components/pages/travel/TravelLiveConsole";
import { InventoryAccessShowcase } from "@/components/pages/travel/InventoryAccessShowcase";
import { SearchFilterShowcase } from "@/components/pages/travel/SearchFilterShowcase";

export const Route = createFileRoute("/products/seatsdeal")({
  head: () => seoHead("/products/seatsdeal", pageMeta.travelPartners),
  component: SeatsDealPage,
});

function SeatsDealPage() {
  return (
    <PageShell showFinalCta={false}>
      <ProductStoryPage
        product="deal"
        hero={<TravelPartnersHero />}
        how={
          <>
            <TravelLiveConsole variant="inventorySearch" />
            <InventoryAccessShowcase />
            <SearchFilterShowcase />
            <SplitPanel
              eyebrow="Margin management"
              title="Add your margin. Set your customer price."
              body="Search inventory, select tickets, apply your margin and create professional customer quotations — transparent, predictable and customer-ready."
              items={[
                { label: "Ticket price", value: "£500" },
                { label: "Partner margin", value: "10%" },
                { label: "Customer price", value: "£550" },
              ]}
            />
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
            <TravelLiveConsole variant="partnerOrders" />
          </>
        }
      />
    </PageShell>
  );
}
