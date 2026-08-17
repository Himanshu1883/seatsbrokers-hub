import { createFileRoute } from "@tanstack/react-router";
import { PageShell } from "@/components/layout/PageShell";
import { pageMeta } from "@/content/site";
import { AboutHero } from "@/components/pages/about/AboutHero";
import {
  AboutAudiences,
  AboutBuilding,
  AboutFuture,
  AboutKnowledge,
  AboutMission,
  AboutVision,
} from "@/components/pages/about/AboutChapters";
import { AboutCapabilities, AboutPrinciples, AboutStack } from "@/components/pages/about/AboutPrinciples";
import { AboutOverview } from "@/components/pages/about/AboutOverview";
import { AboutLiveConsole } from "@/components/pages/about/AboutLiveConsole";
import { AboutJourney } from "@/components/pages/about/AboutJourney";
import { AboutClose } from "@/components/pages/about/AboutClose";

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
      <AboutKnowledge />
      <AboutVision />
      <AboutCapabilities />
      <AboutOverview />
      <AboutLiveConsole />
      <AboutAudiences />
      <AboutPrinciples />
      <AboutStack />
      <AboutJourney />
      <AboutBuilding />
      <AboutMission />
      <AboutFuture />
      <AboutClose />
    </PageShell>
  );
}
