import { createFileRoute } from "@tanstack/react-router";
import { PageShell } from "@/components/layout/PageShell";
import { pageMeta, seoHead } from "@/content/site";
import { sellerBenefits } from "@/content/products-page-data";
import { FeatureGrid } from "@/components/pages/shared/PageSections";
import { BrokerOnboardingSection } from "@/components/pages/brokers/BrokerOnboardingSection";
import { SellerHero } from "@/components/pages/brokers/SellerHero";
import { SellerApplicationForm } from "@/components/pages/brokers/SellerApplicationForm";

export const Route = createFileRoute("/become-a-seller")({
  head: () => seoHead("/become-a-seller", pageMeta.becomeASeller),
  component: BecomeASellerPage,
});

function BecomeASellerPage() {
  return (
    <PageShell showFinalCta={false}>
      <SellerHero />
      <FeatureGrid
        eyebrow="Key benefits"
        title="What professional ticket businesses get"
        items={[...sellerBenefits]}
      />
      <BrokerOnboardingSection />
      <SellerApplicationForm />
    </PageShell>
  );
}
