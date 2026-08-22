import { createFileRoute } from "@tanstack/react-router";
import { PageShell } from "@/components/layout/PageShell";
import { pageMeta, seoHead } from "@/content/site";
import { Hero } from "@/components/landing/Hero";
import { SellerTools, TravelTools } from "@/components/landing/ToolsGrid";
import { Marketplaces } from "@/components/landing/Marketplaces";
import { FeatureOrbit } from "@/components/landing/FeatureOrbit";
import { ProcessBento } from "@/components/landing/Processbento";
import { HowItWorks } from "@/components/landing/HowItWorks";
import { ToolkitShowcase } from "@/components/landing/Toolkitshowcase";
import { StickyScrollShowcase } from "@/components/landing/StickyScrollShowcase";
import { MarketIntelligence } from "@/components/landing/MarketIntelligence";
import { JourneyNumbers } from "@/components/landing/JourneyNumbers";
import { Stats } from "@/components/landing/Stats";

export const Route = createFileRoute("/")({
  head: () => seoHead("/", pageMeta.home),
  component: Index,
});

function Index() {
  return (
    <PageShell>
      <Hero />
      <ProcessBento />
      <FeatureOrbit />
      <HowItWorks />
      <ToolkitShowcase />
      <SellerTools />
      <Marketplaces />
      <MarketIntelligence />
      <TravelTools />
      <StickyScrollShowcase />
      <JourneyNumbers />
      <Stats />
    </PageShell>
  );
}
