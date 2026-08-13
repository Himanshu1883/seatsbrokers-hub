import { createFileRoute } from "@tanstack/react-router";
import { PageShell } from "@/components/layout/PageShell";
import { pageMeta } from "@/content/site";
import { ContactForm, FeatureGrid, PageHero } from "@/components/pages/shared/PageSections";

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
      <PageHero
        eyebrow="Book a Demo"
        title="See the SeatsBrokers Platform in Action"
        body="Walk through event intelligence, marketplace connectivity, inventory management, AI pricing and partner commerce — tailored to your ticket business."
      />
      <ContactForm
        eyebrow="Request a demo"
        title="Book your platform walkthrough"
        intro="Share a few details about your business and we'll schedule a live demo with our team. Broker desk, travel partner or API integration — we'll show what's relevant to you."
        submitLabel="Request demo"
      />
      <FeatureGrid
        eyebrow="What you'll see"
        title="A live walkthrough of the platform"
        items={[
          { title: "Dashboard & events", body: "Platform overview, event catalog and onsale intelligence." },
          { title: "Inventory & distribution", body: "List once, distribute everywhere with live sync." },
          { title: "Market & AI pricing", body: "Market intelligence and AI-powered pricing workflow." },
          { title: "Partner & API tools", body: "Travel partner commerce and API integration options." },
        ]}
      />
    </PageShell>
  );
}
