import { createFileRoute } from "@tanstack/react-router";
import { PageShell } from "@/components/layout/PageShell";
import { pageMeta, seoHead } from "@/content/site";
import { Hero } from "@/components/landing/Hero";
import { ProcessBento } from "@/components/landing/Processbento";
import { SellerTools } from "@/components/landing/ToolsGrid";
import { FeatureOrbit } from "@/components/landing/FeatureOrbit";
// import { ToolkitShowcase } from "@/components/landing/Toolkitshowcase";
// import { Marketplaces } from "@/components/landing/Marketplaces";
import { MarketIntelligence } from "@/components/landing/MarketIntelligence";
import { SourceDesk } from "@/components/landing/SourceDesk";
import { TwoTrack } from "@/components/landing/TwoTrack";
import { Stats } from "@/components/landing/Stats";
import { HowItWorks } from "@/components/landing/HowItWorks";

export const Route = createFileRoute("/")({
  head: () => seoHead("/", pageMeta.home),
  component: HomePage,
});

/**
 * Homepage (Phase 2 merge 2026-08-26):
 * Hero → ProcessBento → SellerTools → HowItWorks → FeatureOrbit →
 * MarketIntelligence → SourceDesk → TwoTrack → Stats (+ FinalCTA in PageShell).
 * Unmounted (files kept): ToolkitShowcase, Marketplaces.
 */
function HomePage() {
  return (
    <PageShell>
      <Hero />
      <ProcessBento />
      <SellerTools />
      <HowItWorks />
      <FeatureOrbit />
      {/* <ToolkitShowcase /> */}
      {/* <Marketplaces /> */}
      <MarketIntelligence />
      <SourceDesk />
      <TwoTrack />
      <Stats />
    </PageShell>
  );
}
