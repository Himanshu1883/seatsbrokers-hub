import { createFileRoute } from "@tanstack/react-router";
import { Activity, BrainCircuit, MapPin, Radar } from "lucide-react";
import { PageShell } from "@/components/layout/PageShell";
import { pageMeta, seoHead } from "@/content/site";
import { ProductStoryPage } from "@/components/pages/products/ProductStoryPage";
import { EventIntelHero } from "@/components/pages/event-intelligence/EventIntelHero";
import { EventIntelLiveConsole } from "@/components/pages/event-intelligence/EventIntelLiveConsole";
import { EventCategoryBoard } from "@/components/pages/event-intelligence/EventCategoryBoard";
import { VenueIntelligenceSection } from "@/components/pages/event-intelligence/VenueIntelligenceSection";
import { SectionConnector } from "@/components/pages/brokers/SectionConnector";

export const Route = createFileRoute("/products/seatsintel")({
  head: () => seoHead("/products/seatsintel", pageMeta.eventIntelligence),
  component: SeatsIntelPage,
});

function SeatsIntelPage() {
  return (
    <PageShell showFinalCta={false}>
      <ProductStoryPage
        product="intel"
        hero={<EventIntelHero />}
        how={
          <>
            <EventIntelLiveConsole variant="onsaleRadar" />
            <SectionConnector
              step="01"
              tone="light"
              from={{
                icon: Radar,
                label: "Event radar",
                detail: "Catalog record, onsale window and demand score per event.",
              }}
              to={{
                icon: Activity,
                label: "Demand & price signals",
                detail: "Demand curve, market ask movement and comparable events.",
              }}
              payload={["event id", "onsale window", "demand score", "watchers"]}
            />
            <EventIntelLiveConsole variant="demandSignals" />
            <VenueIntelligenceSection />
            <SectionConnector
              step="02"
              tone="light"
              from={{
                icon: MapPin,
                label: "Demand & venue structure",
                detail: "Category bands, comparable set and section-level availability.",
              }}
              to={{
                icon: BrainCircuit,
                label: "AI forecast",
                detail: "Projected ask band, sellout risk and scenario modelling.",
              }}
              payload={["demand index", "comp set", "category bands", "days to event"]}
            />
            <EventIntelLiveConsole variant="forecast" />
          </>
        }
        extraCapabilities={<EventCategoryBoard />}
      />
    </PageShell>
  );
}
