import { createFileRoute } from "@tanstack/react-router";
import { PageShell } from "@/components/layout/PageShell";
import { pageMeta, ctas } from "@/content/site";
import { FeatureGrid, PageHero, SplitPanel } from "@/components/pages/shared/PageSections";

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
      <PageHero
        eyebrow="Event Intelligence"
        title="Global Events. Structured Data. Actionable Intelligence."
        body="Know the event, the market and the opportunity before you sell — global event catalog, onsale dates, demand indicators, venue maps and market pricing."
        secondaryCta={ctas.explorePlatform}
      />
      <FeatureGrid
        eyebrow="Event Categories"
        title="Structured catalog across every major category"
        items={[
          { title: "Football", body: "Domestic leagues, European competitions and international fixtures." },
          { title: "Tennis & Cricket", body: "Grand Slams, Test series, IPL and international tournaments." },
          { title: "Rugby & Formula 1", body: "Six Nations, World Cup, Grand Prix weekends and hospitality." },
          { title: "Boxing & Concerts", body: "Championship fights, arena tours and festival circuits." },
          { title: "Theatre & Arts", body: "West End, Broadway, exhibitions and cultural events." },
          { title: "Festivals & Other", body: "Multi-day festivals and other global live events." },
        ]}
      />
      <SplitPanel
        eyebrow="Sample Event Dashboard"
        title="Know the Event. Know the Market. Know the Opportunity."
        body="For every event, brokers can access relevant information including onsale dates, demand indicators, market pricing and venue details."
        items={[
          { label: "Event", value: "Man Utd vs Arsenal" },
          { label: "Date", value: "12 Sep 2026" },
          { label: "Venue", value: "Old Trafford" },
          { label: "Onsale", value: "08 Aug — 10:00" },
          { label: "Demand", value: "High" },
          { label: "Market Average", value: "£285" },
          { label: "Lowest Available", value: "£195" },
          { label: "Category Trend", value: "↑ 18%" },
        ]}
      />
      <SplitPanel
        eyebrow="Venue Map Technology"
        title="Understand the Venue Before You Sell"
        body="Interactive stadium maps with sections, categories, seating areas and ticket locations — connected to actual inventory listing data."
        items={[
          { label: "Section", value: "Lower Tier" },
          { label: "Row", value: "12" },
          { label: "Quantity", value: "2" },
          { label: "Price", value: "£425" },
          { label: "Availability", value: "Available" },
        ]}
        reverse
      />
    </PageShell>
  );
}
