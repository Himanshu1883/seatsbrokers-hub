import { createFileRoute } from "@tanstack/react-router";
import { PageShell } from "@/components/layout/PageShell";
import { pageMeta, seoHead } from "@/content/site";
import { AboutHero } from "@/components/pages/about/AboutHero";
import { AboutMission } from "@/components/pages/about/AboutChapters";
import { AboutClose } from "@/components/pages/about/AboutClose";

export const Route = createFileRoute("/about")({
  head: () => seoHead("/about", pageMeta.about),
  component: AboutPage,
});

function AboutPage() {
  return (
    <PageShell>
      <AboutHero />
      <AboutMission />
      <AboutClose />
    </PageShell>
  );
}
