import { Reveal } from "@/hooks/use-scroll-motion";
import { SiteLink } from "@/components/layout/SiteLink";
import { ctas } from "@/content/site";
import ctaImg from "@/assets/cta-trophy.jpg";

export function FinalCTA() {
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
            Build Your Ticket Business on Better Technology
          </h2>
          <p className="mx-auto mt-5 max-w-xl text-sm text-background/75 sm:text-base">
            Whether you are a ticket broker, marketplace, B2B partner or technology provider,
            connect your ticket operation to a modern technology infrastructure built for the global
            event economy.
          </p>
          <div className="mt-9 flex flex-wrap justify-center gap-3">
            <SiteLink
              to={ctas.becomeSeller.to}
              className="lift rounded-md bg-primary px-6 py-3.5 text-sm font-semibold text-primary-foreground"
            >
              {ctas.becomeSeller.label}
            </SiteLink>
            <SiteLink
              to={ctas.talkToTeam.to}
              hash={ctas.talkToTeam.hash}
              className="lift rounded-md border border-background/40 px-6 py-3.5 text-sm font-semibold text-background hover:bg-background/10"
            >
              {ctas.talkToTeam.label}
            </SiteLink>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
