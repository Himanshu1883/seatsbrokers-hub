import { createFileRoute } from "@tanstack/react-router";
import { PageShell } from "@/components/layout/PageShell";
import { pageMeta, seoHead } from "@/content/site";
import { integrationsPage, productStories } from "@/content/products-page-data";
import { SplitPanel, WorkflowSteps } from "@/components/pages/shared/PageSections";
import { IntegrationsHero } from "@/components/pages/integrations/IntegrationsHero";
import { IntegrationsCapabilityBoard } from "@/components/pages/integrations/IntegrationsCapabilityBoard";
import { IntegrationsLiveConsole } from "@/components/pages/integrations/IntegrationsLiveConsole";

const story = productStories.link;

export const Route = createFileRoute("/integrations")({
  head: () => seoHead("/integrations", pageMeta.integrations),
  component: IntegrationsPage,
});

function IntegrationsPage() {
  return (
    <PageShell>
      <IntegrationsHero />

      <SplitPanel
        eyebrow={story.problem.eyebrow}
        title={story.problem.title}
        body={story.problem.body}
        items={[...story.problem.items]}
      />

      <IntegrationsCapabilityBoard />

      <IntegrationsLiveConsole variant="marketplaces" />
      <IntegrationsLiveConsole variant="stackIngest" />
      <IntegrationsLiveConsole variant="feedPayments" />

      <WorkflowSteps
        eyebrow={integrationsPage.flow.eyebrow}
        title={integrationsPage.flow.title}
        steps={[...integrationsPage.flow.steps]}
      />
    </PageShell>
  );
}
