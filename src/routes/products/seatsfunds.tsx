import { createFileRoute } from "@tanstack/react-router";
import { PageShell } from "@/components/layout/PageShell";
import { pageMeta, seoHead } from "@/content/site";
import { ProductStoryPage } from "@/components/pages/products/ProductStoryPage";
import { FundsHero } from "@/components/pages/products/FundsHero";
import { LiveConsole } from "@/components/pages/brokers/LiveConsole";
import { PaymentInfrastructureSection } from "@/components/pages/brokers/PaymentInfrastructureSection";

export const Route = createFileRoute("/products/seatsfunds")({
  head: () => seoHead("/products/seatsfunds", pageMeta.funds),
  component: SeatsFundsPage,
});

function SeatsFundsPage() {
  return (
    <PageShell showFinalCta={false}>
      <ProductStoryPage
        product="funds"
        hero={<FundsHero />}
        how={
          <>
            <PaymentInfrastructureSection />
            <LiveConsole variant="cryptoPayouts" />
          </>
        }
      />
    </PageShell>
  );
}
