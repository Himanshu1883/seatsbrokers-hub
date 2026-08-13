import { createFileRoute } from "@tanstack/react-router";
import { PageShell } from "@/components/layout/PageShell";
import { pageMeta } from "@/content/site";
import { ContactForm, PageHero } from "@/components/pages/shared/PageSections";

const { title, description } = pageMeta.contact;

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
    ],
  }),
  component: ContactPage,
});

function ContactPage() {
  return (
    <PageShell showFinalCta={false}>
      <PageHero
        eyebrow="Contact"
        title="Talk to Our Team"
        body="Whether you are a ticket broker, marketplace, travel partner or technology provider — our team is ready to help you connect your ticket operation to modern infrastructure."
      />
      <ContactForm
        eyebrow="Get in touch"
        title="Send us a message"
        intro="Tell us about your business and we'll connect you with the right team. We typically respond within one business day."
        submitLabel="Send message"
      />
    </PageShell>
  );
}
