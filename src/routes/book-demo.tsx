import { CalendarClock, Layers, Users } from "lucide-react";
import { createFileRoute } from "@tanstack/react-router";
import { PageShell } from "@/components/layout/PageShell";
import { pageMeta } from "@/content/site";
import { demoSteps } from "@/content/book-demo-data";
import { WorkflowSteps } from "@/components/pages/shared/PageSections";
import { SectionConnector } from "@/components/pages/brokers/SectionConnector";
import { DemoHero } from "@/components/pages/book-demo/DemoHero";
import { DemoAudience } from "@/components/pages/book-demo/DemoAudience";
import { DemoSessionBoard } from "@/components/pages/book-demo/DemoSessionBoard";
import { DemoRequestForm } from "@/components/pages/book-demo/DemoRequestForm";

const { title, description } = pageMeta.bookDemo;

export const Route = createFileRoute("/book-demo")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
    ],
  }),
  component: BookDemoPage,
});

function BookDemoPage() {
  return (
    <PageShell showFinalCta={false}>
      <DemoHero />

      <DemoSessionBoard />

      <SectionConnector
        step="01"
        tone="light"
        from={{
          icon: Layers,
          label: "The walkthrough",
          detail: "Events, inventory, channels, pricing, partners and APIs — scoped to your desk.",
        }}
        to={{
          icon: Users,
          label: "Your track",
          detail: "Broker operations or B2B partner quoting — we prepare the session around that work.",
        }}
        payload={["events", "inventory", "channels", "quotes"]}
      />

      <DemoAudience />

      <WorkflowSteps
        eyebrow="How the session runs"
        title="Three steps from request to a clear next action"
        steps={[...demoSteps]}
      />

      <SectionConnector
        step="02"
        tone="light"
        from={{
          icon: Users,
          label: "Your track",
          detail: "Broker desk, B2B partner or API — tell us which operation to open.",
        }}
        to={{
          icon: CalendarClock,
          label: "Book the slot",
          detail: "Name, company and a preferred window. We reply within one business day.",
        }}
        payload={["role", "timezone", "agenda"]}
      />

      <DemoRequestForm />
    </PageShell>
  );
}
