import { createFileRoute } from "@tanstack/react-router";
import { Building2, Compass, Layers } from "lucide-react";
import { PageShell } from "@/components/layout/PageShell";
import { pageMeta } from "@/content/site";
import { SectionConnector } from "@/components/pages/brokers/SectionConnector";
import { AboutHero } from "@/components/pages/about/AboutHero";
import { AboutJourney } from "@/components/pages/about/AboutJourney";
import { AboutOverview } from "@/components/pages/about/AboutOverview";
import { AboutPrinciples } from "@/components/pages/about/AboutPrinciples";
import { AboutPresence } from "@/components/pages/about/AboutPresence";

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
      <AboutHero />

      <AboutJourney />

      <SectionConnector
        step="01"
        tone="light"
        from={{
          icon: Compass,
          label: "The journey",
          detail: "Event intelligence, inventory, marketplaces, pricing — stacked into one platform.",
        }}
        to={{
          icon: Layers,
          label: "The platform",
          detail: "Brokers, travel partners, channels, event data and APIs — one infrastructure layer.",
        }}
        payload={["events", "inventory", "channels", "APIs"]}
      />

      <AboutOverview />

      <SectionConnector
        step="02"
        tone="light"
        from={{
          icon: Layers,
          label: "The platform",
          detail: "One technology stack for brokers, travel teams, marketplaces and partners.",
        }}
        to={{
          icon: Building2,
          label: "Global operations",
          detail: "London, New York and Dubai — three offices, one technology platform.",
        }}
        payload={["London", "New York", "Dubai"]}
      />

      <AboutPrinciples />

      <AboutPresence />
    </PageShell>
  );
}
