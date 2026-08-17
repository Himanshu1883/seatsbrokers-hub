import { createFileRoute } from "@tanstack/react-router";
import { Compass, Layers, Radio } from "lucide-react";
import { PageShell } from "@/components/layout/PageShell";
import { pageMeta } from "@/content/site";
import { SectionConnector } from "@/components/pages/brokers/SectionConnector";
import { AboutHero } from "@/components/pages/about/AboutHero";
import { AboutJourney } from "@/components/pages/about/AboutJourney";
import { AboutOverview } from "@/components/pages/about/AboutOverview";
import { AboutLiveConsole } from "@/components/pages/about/AboutLiveConsole";
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
          detail: "Brokers, travel teams, channels, event data and APIs — one infrastructure layer.",
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
          icon: Radio,
          label: "Company ops",
          detail: "London, New York and Dubai — follow-the-sun desks on one platform.",
        }}
        payload={["London", "New York", "Dubai"]}
      />

      <AboutLiveConsole />

      <AboutPrinciples />

      <AboutPresence />
    </PageShell>
  );
}
