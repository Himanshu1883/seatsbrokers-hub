import { createFileRoute } from "@tanstack/react-router";
import { PageShell } from "@/components/layout/PageShell";
import { pageMeta, seoHead } from "@/content/site";
import { ContactForm } from "@/components/pages/shared/PageSections";
import { ContactHero } from "@/components/pages/contact/ContactHero";

export const Route = createFileRoute("/contact")({
  head: () => seoHead("/contact", pageMeta.contact),
  component: ContactPage,
});

function ContactPage() {
  return (
    <PageShell showFinalCta={false}>
      <ContactHero />
      <ContactForm
        eyebrow="Get in touch"
        title="Send us a message"
        intro="Tell us about your business and we'll connect you with the right team. We typically respond within one business day."
        submitLabel="Send message"
      />
    </PageShell>
  );
}
