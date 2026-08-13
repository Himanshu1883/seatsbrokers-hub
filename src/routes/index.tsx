import { createFileRoute } from "@tanstack/react-router";
import { PageShell } from "@/components/layout/PageShell";
import { pageMeta } from "@/content/site";
import { Hero } from "@/components/landing/Hero";
import { NetworkConstellation } from "@/components/landing/NetworkConstellation";
import { Marketplaces } from "@/components/landing/Marketplaces";
import { TwoTrack } from "@/components/landing/TwoTrack";
import { HowItWorks } from "@/components/landing/HowItWorks";
import { StickyScrollShowcase } from "@/components/landing/StickyScrollShowcase";
import { MarketIntelligence } from "@/components/landing/MarketIntelligence";
import { SellerTools, TravelTools } from "@/components/landing/ToolsGrid";
import { GlobalReach } from "@/components/landing/GlobalReach";
import { GlobeScrollSection } from "@/components/landing/GlobeScrollSection";
import { Stats } from "@/components/landing/Stats";
import { Testimonials } from "@/components/landing/Testimonials";
import { ToolkitShowcase } from "@/components/landing/Toolkitshowcase";
import { ProcessBento } from "@/components/landing/Processbento";
import { PartnerProductShowcase } from "@/components/landing/PartnerProductShowcase";
import { JourneyNumbers } from "@/components/landing/JourneyNumbers";
import { FeatureOrbit } from "@/components/landing/FeatureOrbit";

const { title, description } = pageMeta.home;

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <PageShell>
      <Hero />
      <NetworkConstellation />
      <Marketplaces />
      <TwoTrack />
      <FeatureOrbit />
      <JourneyNumbers />
      <ProcessBento />
      <HowItWorks />
      <PartnerProductShowcase />
      <ToolkitShowcase />
      <StickyScrollShowcase />
      <MarketIntelligence />
      <SellerTools />
      <TravelTools />
      <GlobalReach />
      <GlobeScrollSection />
      <Stats />
      <Testimonials />
    </PageShell>
  );
}
