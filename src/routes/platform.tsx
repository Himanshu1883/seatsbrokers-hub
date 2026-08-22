import { Layers, Map } from "lucide-react";
import { createFileRoute } from "@tanstack/react-router";
import { PageShell } from "@/components/layout/PageShell";
import { pageMeta, seoHead } from "@/content/site";
import { platformSteps } from "@/content/platform-page-data";
import { WorkflowSteps } from "@/components/pages/shared/PageSections";
import { SectionConnector } from "@/components/pages/brokers/SectionConnector";
import { PlatformHero } from "@/components/pages/platform/PlatformHero";
import { PlatformModuleMap } from "@/components/pages/platform/PlatformModuleMap";

export const Route = createFileRoute("/platform")({
  head: () => seoHead("/platform", pageMeta.platform),
  component: PlatformPage,
});

function PlatformPage() {
  return (
    <PageShell>
      <PlatformHero />

      <SectionConnector
        step="01"
        tone="light"
        from={{
          icon: Layers,
          label: "The operating spine",
          detail: "Discover, source, price, connect, distribute, sell & fulfil, then pay & settle.",
        }}
        to={{
          icon: Map,
          label: "The stage desks",
          detail: "Compact previews of how each product writes into the next — product pages stay under /products.",
        }}
        payload={["discover", "source", "distribute", "settle"]}
      />

      <PlatformModuleMap />

      <WorkflowSteps
        eyebrow="How the stack connects"
        title="The technology layer connecting the ticketing ecosystem"
        steps={[...platformSteps]}
      />
    </PageShell>
  );
}
