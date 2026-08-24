import { createFileRoute } from "@tanstack/react-router";
import { PageShell } from "@/components/layout/PageShell";
import { pageMeta, seoHead } from "@/content/site";
import { Hero } from "@/components/landing/Hero";
import { ProcessBento } from "@/components/landing/Processbento";
import { SellerTools } from "@/components/landing/ToolsGrid";
import { FeatureOrbit } from "@/components/landing/FeatureOrbit";
import { ToolkitShowcase } from "@/components/landing/Toolkitshowcase";
import { Marketplaces } from "@/components/landing/Marketplaces";
import { MarketIntelligence } from "@/components/landing/MarketIntelligence";
import { TwoTrack } from "@/components/landing/TwoTrack";
import { Stats } from "@/components/landing/Stats";

export const Route = createFileRoute("/")({
  head: () => seoHead("/", pageMeta.home),
  component: HomePage,
});

/**
 * Reference homepage structure (our design/theme).
 * Hero → process ribbon → engine → seven products → connect once →
 * global distribution → SeatsIntel deep dive → broker vs B2B → FinalCTA.
 * Unmounted (files kept): HowItWorks, TravelTools, JourneyNumbers,
 * StickyScrollShowcase, Stats, NetworkConstellation, GlobalReach,
 * GlobeScrollSection, PartnerProductShowcase, Testimonials.
 */
function HomePage() {
  return (
    <PageShell>
      <Hero />
      <ProcessBento />
      <SellerTools />
      <FeatureOrbit />
      <ToolkitShowcase />
      <Marketplaces />
      <MarketIntelligence />
      <TwoTrack />
      <Stats />
    </PageShell>
  );
}
