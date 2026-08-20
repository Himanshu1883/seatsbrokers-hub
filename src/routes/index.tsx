import { createFileRoute } from "@tanstack/react-router";
import { PageShell } from "@/components/layout/PageShell";
import { pageMeta } from "@/content/site";
import { Hero } from "@/components/landing/Hero";
import { SellerTools, TravelTools } from "@/components/landing/ToolsGrid";
import { TwoTrack } from "@/components/landing/TwoTrack";
import { Marketplaces } from "@/components/landing/Marketplaces";
import { NetworkConstellation } from "@/components/landing/NetworkConstellation";
import { FeatureOrbit } from "@/components/landing/FeatureOrbit";
import { ProcessBento } from "@/components/landing/Processbento";
import { HowItWorks } from "@/components/landing/HowItWorks";
import { PartnerProductShowcase } from "@/components/landing/PartnerProductShowcase";
import { ToolkitShowcase } from "@/components/landing/Toolkitshowcase";
import { StickyScrollShowcase } from "@/components/landing/StickyScrollShowcase";
import { MarketIntelligence } from "@/components/landing/MarketIntelligence";
import { JourneyNumbers } from "@/components/landing/JourneyNumbers";
import { GlobalReach } from "@/components/landing/GlobalReach";
import { GlobeScrollSection } from "@/components/landing/GlobeScrollSection";
import { Stats } from "@/components/landing/Stats";
import { Testimonials } from "@/components/landing/Testimonials";

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
      <SellerTools />
      <TwoTrack />
      <TravelTools />
      <Marketplaces />
      <NetworkConstellation />
      <FeatureOrbit />
      <ProcessBento />
      <HowItWorks />
      {/* <PartnerProductShowcase /> */}
      <ToolkitShowcase />
      {/* <StickyScrollShowcase /> */}
      {/* <MarketIntelligence /> */}
      <JourneyNumbers />
      <GlobalReach />
      <GlobeScrollSection />
      <Stats />
      {/* <Testimonials /> */}
    </PageShell>
  );
}
