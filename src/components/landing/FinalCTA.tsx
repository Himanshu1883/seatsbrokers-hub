import { Reveal } from "@/hooks/use-scroll-motion";
import ctaImg from "@/assets/cta-trophy.jpg";

export function FinalCTA() {
  return (
    <section id="contact" className="relative isolate scroll-mt-24 overflow-hidden py-28">
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
            Put your inventory where the demand already is
          </h2>
          <p className="mx-auto mt-5 max-w-xl text-sm text-background/75 sm:text-base">
            Tell us which side of the market you're on and we'll get you live in days, not quarters.
          </p>
          <div className="mt-9 flex flex-wrap justify-center gap-3">
            <a
              href="#sellers"
              className="lift rounded-md bg-primary px-6 py-3.5 text-sm font-semibold text-primary-foreground"
            >
              Become a Seller Partner
            </a>
            <a
              href="#travel"
              className="lift rounded-md border border-background/40 px-6 py-3.5 text-sm font-semibold text-background hover:bg-background/10"
            >
              Become a Travel Partner
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}