import { Layers, Map } from "lucide-react";
import { createFileRoute } from "@tanstack/react-router";
import { PageShell } from "@/components/layout/PageShell";
import { pageMeta } from "@/content/site";
import { platformSteps } from "@/content/platform-page-data";
import { WorkflowSteps } from "@/components/pages/shared/PageSections";
import { SectionConnector } from "@/components/pages/brokers/SectionConnector";
import { PlatformHero } from "@/components/pages/platform/PlatformHero";
import { PlatformModuleMap } from "@/components/pages/platform/PlatformModuleMap";

const { title, description } = pageMeta.platform;

export const Route = createFileRoute("/platform")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
    ],
  }),
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
          label: "The stack",
          detail: "Event data, inventory, channels, quotes and APIs on one infrastructure layer.",
        }}
        to={{
          icon: Map,
          label: "The surfaces",
          detail: "Open the product page that matches how you work — this map does not rebuild them.",
        }}
        payload={["brokers", "travel", "channels", "APIs"]}
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
