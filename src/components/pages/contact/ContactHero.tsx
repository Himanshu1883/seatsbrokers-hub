import { Reveal } from "@/hooks/use-scroll-motion";
import { SiteLink } from "@/components/layout/SiteLink";
import { ctas } from "@/content/site";
import heroContact from "@/assets/hero-contact.png";

export function ContactHero() {
  return (
    <section className="bh-hero ct-hero section-curve relative isolate scroll-mt-24 overflow-hidden bg-dark text-background">
      <div className="bh-layout ct-hero-banner">
        <Reveal className="ct-hero-copy min-w-0">
          <div className="bh-copy">
            <p className="section-eyebrow text-primary">Contact</p>
            <h1 className="bh-title ct-hero-title">Talk to Our Team</h1>
            <p className="bh-body">
              Whether you are a ticket broker, marketplace, B2B partner or technology
              provider — our team is ready to help you connect your ticket operation to
              modern infrastructure.
            </p>
            <div className="bh-ctas">
              <SiteLink
                to={ctas.becomeSeller.to}
                className="lift rounded-md bg-primary px-6 py-3.5 text-sm font-semibold text-primary-foreground"
              >
                {ctas.becomeSeller.label}
              </SiteLink>
            </div>
          </div>
        </Reveal>

        <Reveal delay={120} className="bh-stage ct-hero-stage min-w-0">
          <div className="ct-hero-media">
            <img
              src={heroContact}
              alt=""
              width={1920}
              height={1080}
              className="ct-hero-img"
            />
            <div className="ct-hero-vignette" aria-hidden />
          </div>
        </Reveal>
      </div>
    </section>
  );
}
