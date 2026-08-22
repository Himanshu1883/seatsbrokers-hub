import { createFileRoute } from "@tanstack/react-router";
import { PageShell } from "@/components/layout/PageShell";
import { pageMeta, seoHead } from "@/content/site";
import { SplitPanel } from "@/components/pages/shared/PageSections";
import { ProductStoryPage } from "@/components/pages/products/ProductStoryPage";
import { PulseHero } from "@/components/pages/products/PulseHero";
import { LiveConsole } from "@/components/pages/brokers/LiveConsole";

export const Route = createFileRoute("/products/seatspulse")({
  head: () => seoHead("/products/seatspulse", pageMeta.aiPricing),
  component: SeatsPulsePage,
});

function SeatsPulsePage() {
  return (
    <PageShell showFinalCta={false}>
      <ProductStoryPage
        product="pulse"
        hero={<PulseHero />}
        how={
          <>
            <LiveConsole variant="marketIntelligence" />
            <LiveConsole variant="aiPredictions" />
            <SplitPanel
              eyebrow="Sample recommendation"
              title="Recommended price with full context"
              body="Once approved, the new price can be synchronised through connected channels. Illustrative figures — not live trading data."
              items={[
                { label: "Current ask", value: "£247" },
                { label: "Market average", value: "£285" },
                { label: "Recommended", value: "£265" },
                { label: "Confidence", value: "High" },
                { label: "Status", value: "Awaiting approval" },
              ]}
              reverse
            />
          </>
        }
      />
    </PageShell>
  );
}
