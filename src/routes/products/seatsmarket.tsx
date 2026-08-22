import { createFileRoute } from "@tanstack/react-router";
import { Radio, RefreshCw, ShieldCheck, Share2 } from "lucide-react";
import { PageShell } from "@/components/layout/PageShell";
import { pageMeta, seoHead } from "@/content/site";
import { SyncDiagram } from "@/components/pages/shared/PageSections";
import { ProductStoryPage } from "@/components/pages/products/ProductStoryPage";
import { MarketplaceHero } from "@/components/pages/marketplace/MarketplaceHero";
import { MarketplaceLiveConsole } from "@/components/pages/marketplace/MarketplaceLiveConsole";
import { MarketplaceCapabilityBoard } from "@/components/pages/marketplace/MarketplaceCapabilityBoard";
import { SectionConnector } from "@/components/pages/brokers/SectionConnector";

export const Route = createFileRoute("/products/seatsmarket")({
  head: () => seoHead("/products/seatsmarket", pageMeta.marketplaceConnectivity),
  component: SeatsMarketPage,
});

function SeatsMarketPage() {
  return (
    <PageShell showFinalCta={false}>
      <ProductStoryPage
        product="market"
        hero={<MarketplaceHero />}
        how={
          <>
            <MarketplaceLiveConsole variant="channelStatus" />
            <SectionConnector
              step="01"
              tone="light"
              from={{
                icon: Radio,
                label: "Channel status",
                detail: "Connection health and API status across connected sales channels.",
              }}
              to={{
                icon: Share2,
                label: "Listing distribution",
                detail: "One inventory write fans out to every connected channel.",
              }}
              payload={["channel status", "listing id", "quantity", "ask price"]}
            />
            <MarketplaceLiveConsole variant="listingDistribution" />
            <SyncDiagram
              title="When a ticket sells, every channel updates"
              body="Broker inventory flows through SeatsBrokers to connected sales channels. A sale on any channel triggers automatic inventory updates and delisting across all others."
            />
            <SectionConnector
              step="02"
              tone="dark"
              from={{
                icon: RefreshCw,
                label: "Channel sync",
                detail: "Quantity, price and listing status stay aligned after every sale.",
              }}
              to={{
                icon: ShieldCheck,
                label: "Price & conflict guard",
                detail: "Price push, holds and automatic delisting on the same clock.",
              }}
              payload={["price update", "hold lock", "sale event", "delist"]}
            />
            <MarketplaceLiveConsole variant="pricePush" />
          </>
        }
        extraCapabilities={<MarketplaceCapabilityBoard />}
      />
    </PageShell>
  );
}
