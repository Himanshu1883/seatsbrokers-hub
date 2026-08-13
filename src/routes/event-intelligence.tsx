import { createFileRoute } from "@tanstack/react-router";
import { Activity, BrainCircuit, MapPin, Radar } from "lucide-react";
import { PageShell } from "@/components/layout/PageShell";
import { pageMeta } from "@/content/site";
import { WorkflowSteps } from "@/components/pages/shared/PageSections";
import { SectionConnector } from "@/components/pages/brokers/SectionConnector";
import { EventCategoryBoard } from "@/components/pages/event-intelligence/EventCategoryBoard";
import { EventIntelHero } from "@/components/pages/event-intelligence/EventIntelHero";
import { EventIntelLiveConsole } from "@/components/pages/event-intelligence/EventIntelLiveConsole";
import { VenueIntelligenceSection } from "@/components/pages/event-intelligence/VenueIntelligenceSection";

const { title, description } = pageMeta.eventIntelligence;

export const Route = createFileRoute("/event-intelligence")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
    ],
  }),
  component: EventIntelligencePage,
});

function EventIntelligencePage() {
  return (
    <PageShell>
      <EventIntelHero />

      <EventIntelLiveConsole variant="onsaleRadar" />

      <EventCategoryBoard />

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

      <WorkflowSteps
        eyebrow="How an event becomes intelligence"
        title="Provider feeds → structured event → demand scoring → forecast → your systems"
        steps={[
          "Global provider feeds ingested and normalized into one event record",
          "Venue maps linked — sections, category bands and rows structured",
          "Onsale windows, demand indicators and price movement tracked continuously",
          "Forecasts and comparable events delivered to dashboards and the Events API",
        ]}
      />
    </PageShell>
  );
}
