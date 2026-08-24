import { createFileRoute } from "@tanstack/react-router";
import { PageShell } from "@/components/layout/PageShell";
import { pageMeta, seoHead } from "@/content/site";
import { Hero } from "@/components/landing/Hero";
import { HowItWorks } from "@/components/landing/HowItWorks";
import { SellerTools } from "@/components/landing/ToolsGrid";
import { FeatureOrbit } from "@/components/landing/FeatureOrbit";
import { MarketIntelligence } from "@/components/landing/MarketIntelligence";
import { TwoTrack } from "@/components/landing/TwoTrack";
import { Stats } from "@/components/landing/Stats";

export const Route = createFileRoute("/")({
  head: () => seoHead("/", pageMeta.home),
  component: HomePage,
});

/**
 * Phase 2 refinement — shorter story, engine centrepiece.
 * TravelTools lives on `/products/seatsdeal` (not duplicated here).
 * Unmounted (files kept): ProcessBento, ToolkitShowcase, TravelTools,
 * JourneyNumbers, Marketplaces, StickyScrollShowcase.
 */
function HomePage() {
  return (
    <PageShell>
      <Hero />
      <HowItWorks />
      <SellerTools />
      <FeatureOrbit />
      <MarketIntelligence />
      <TwoTrack />
      <Stats />
    </PageShell>
  );
}
