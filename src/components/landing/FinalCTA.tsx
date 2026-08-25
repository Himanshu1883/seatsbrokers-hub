import { Reveal } from "@/hooks/use-scroll-motion";
import { SiteLink } from "@/components/layout/SiteLink";
import { useDemoModal } from "@/components/landing/DemoModal";
import { ctas } from "@/content/site";
import ctaImg from "@/assets/cta-trophy.jpg";

export function FinalCTA() {
  const { openDemoModal } = useDemoModal();

  return (
    <section id="contact" className="section-curve relative isolate scroll-mt-24 overflow-x-clip py-16 sm:py-28">
      <img
        src={ctaImg}
        alt="Champion lifting a trophy amid confetti"
        loading="lazy"
        width={1920}
        height={1080}
        className="absolute inset-0 -z-20 size-full object-cover"
      />
      <div
        className="absolute inset-0 -z-10"
        style={{ background: "var(--gradient-hero)" }}
        aria-hidden
      />
      <div className="container-page text-center">
        <Reveal>
          <h2 className="mx-auto max-w-3xl text-3xl font-bold text-background sm:text-5xl">
            One Platform. More Opportunity.
          </h2>
          <p className="mx-auto mt-5 max-w-xl text-sm text-background/75 sm:text-base">
            Whether you are an established ticket broker, a growing reseller or a
            technology-driven ticket business, SeatsBrokers gives you the infrastructure to
            operate more efficiently and reach more buyers.
          </p>
          <p className="mx-auto mt-3 max-w-xl text-sm font-semibold text-background sm:text-base">
            Source smarter. Price better. Distribute further. Sell more.
          </p>
          <div className="page-cta-row mt-9 justify-center">
            <button
              type="button"
              onClick={openDemoModal}
              className="lift rounded-md bg-primary px-6 py-3.5 text-sm font-semibold text-primary-foreground"
            >
              {ctas.bookDemo.label}
            </button>
            <SiteLink
              to={ctas.becomeSeller.to}
              className="lift rounded-md border border-background/40 px-6 py-3.5 text-sm font-semibold text-background hover:bg-background/10"
            >
              {ctas.becomeSeller.label}
            </SiteLink>
          </div>
          <p className="mx-auto mt-5 text-sm text-background/70">
            Already a partner?{" "}
            <SiteLink to={ctas.login.to} className="font-semibold text-background underline-offset-4 hover:underline">
              {ctas.login.label}
            </SiteLink>
          </p>
        </Reveal>
      </div>
    </section>
  );
}
