import { createFileRoute } from "@tanstack/react-router";
import { Nav } from "@/components/landing/Nav";
import { Hero } from "@/components/landing/Hero";
import { Marketplaces } from "@/components/landing/Marketplaces";
import { TwoTrack } from "@/components/landing/TwoTrack";
import { HowItWorks } from "@/components/landing/HowItWorks";
import { MarketIntelligence } from "@/components/landing/MarketIntelligence";
import { SellerTools, TravelTools } from "@/components/landing/ToolsGrid";
import { GlobalReach } from "@/components/landing/GlobalReach";
import { Stats } from "@/components/landing/Stats";
import { Testimonials } from "@/components/landing/Testimonials";
import { FinalCTA } from "@/components/landing/FinalCTA";
import { Footer } from "@/components/landing/Footer";

const title = "SeatsBrokers — B2B Ticket Distribution & Market Intelligence";
const description =
  "List once and sell everywhere. SeatsBrokers connects brokers and travel partners to every major ticket marketplace with live pricing, verified inventory and clean settlement.";

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
    <div className="bg-background">
      <Nav />
      <main>
        <Hero />
        <Marketplaces />
        <TwoTrack />
        <HowItWorks />
        <MarketIntelligence />
        <SellerTools />
        <TravelTools />
        <GlobalReach />
        <Stats />
        <Testimonials />
        <FinalCTA />
      </main>
      <Footer />
    </div>
  );
}
