import { createFileRoute } from "@tanstack/react-router";
import { PageShell } from "@/components/layout/PageShell";
import { pageMeta, ctas } from "@/content/site";
import { FeatureGrid, PageHero, SplitPanel, WorkflowSteps } from "@/components/pages/shared/PageSections";

const { title, description } = pageMeta.aiPricing;

export const Route = createFileRoute("/ai-pricing")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
    ],
  }),
  component: AiPricingPage,
});

function AiPricingPage() {
  return (
    <PageShell>
      <PageHero
        eyebrow="AI Pricing"
        title="AI-Powered Pricing Intelligence"
        body="Turn market data into actionable pricing recommendations. The platform analyzes market signals and recommends pricing adjustments — the broker remains in control."
        secondaryCta={ctas.exploreBrokers}
      />
      <WorkflowSteps
        eyebrow="Pricing Workflow"
        title="AI recommends. You decide."
        steps={[
          "Market Data",
          "AI Analysis",
          "Recommended Price",
          "Broker Approval",
          "Price Updated",
          "Marketplace Synchronized",
        ]}
      />
      <FeatureGrid
        eyebrow="Capabilities"
        title="Pricing intelligence built into your desk"
        items={[
          { title: "Pricing recommendations", body: "AI-generated price suggestions based on market signals." },
          { title: "Market comparison", body: "Compare your ask against average, lowest and marketplace prices." },
          { title: "Category analysis", body: "Per-category pricing with demand and inventory context." },
          { title: "Price movement", body: "Track how prices are moving before and after onsale." },
          { title: "Demand signals", body: "Demand indicators inform when to hold, raise or reduce." },
          { title: "Inventory position", body: "Pricing recommendations account for your current inventory." },
          { title: "Approval workflow", body: "Review and approve every recommendation before it goes live." },
          { title: "Automated synchronization", body: "Approved prices sync through connected marketplace infrastructure." },
        ]}
      />
      <SplitPanel
        eyebrow="Sample Recommendation"
        title="Recommended price with full context"
        body="Once approved, the new price can be synchronized through the connected marketplace infrastructure automatically."
        items={[
          { label: "Current ask", value: "£247" },
          { label: "Market average", value: "£285" },
          { label: "Recommended", value: "£265" },
          { label: "Confidence", value: "High" },
          { label: "Status", value: "Awaiting approval" },
        ]}
        reverse
      />
    </PageShell>
  );
}
