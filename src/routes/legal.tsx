import { createFileRoute } from "@tanstack/react-router";
import { PageShell } from "@/components/layout/PageShell";
import { pageMeta } from "@/content/site";
import { LegalHero } from "@/components/pages/legal/LegalHero";
import { LegalDocument } from "@/components/pages/legal/LegalDocument";

const { title, description } = pageMeta.legal;

export const Route = createFileRoute("/legal")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
    ],
  }),
  component: LegalPage,
});

function LegalPage() {
  return (
    <PageShell>
      <LegalHero />
      <LegalDocument />
    </PageShell>
  );
}
