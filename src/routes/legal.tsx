import { createFileRoute } from "@tanstack/react-router";
import { PageShell } from "@/components/layout/PageShell";
import { pageMeta, seoHead } from "@/content/site";
import { LegalHero } from "@/components/pages/legal/LegalHero";
import { LegalDocument } from "@/components/pages/legal/LegalDocument";

export const Route = createFileRoute("/legal")({
  head: () => seoHead("/legal", pageMeta.legal),
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
