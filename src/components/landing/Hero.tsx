import { Reveal, useTypewriter } from "@/hooks/use-scroll-motion";
import heroImg from "@/assets/hero-stadium.jpg";

const phrases = ["Football.", "Concerts.", "Championships.", "Every Seat."];

export function Hero() {
  const typed = useTypewriter(phrases);

  return (
    <section id="top" className="relative isolate min-h-[92vh] overflow-hidden">
      <img
        src={heroImg}
        alt="Floodlit stadium packed with fans on match night"
        width={1920}
        height={1080}
        className="absolute inset-0 -z-20 size-full object-cover"
      />
      <div
        className="absolute inset-0 -z-10"
        style={{ background: "var(--gradient-hero)" }}
        aria-hidden
      />

      <div className="container-page flex min-h-[92vh] flex-col justify-center pt-32 pb-20">
        <Reveal>
          <span className="inline-flex items-center gap-2 rounded-full border border-background/25 bg-background/10 px-3 py-1 font-mono text-[11px] tracking-widest text-background/85 uppercase backdrop-blur">
            <span className="size-1.5 rounded-full bg-primary" />
            B2B live-event distribution infrastructure
          </span>
        </Reveal>

        <Reveal delay={90}>
          <h1 className="mt-6 max-w-4xl text-4xl leading-[1.05] font-bold text-background sm:text-6xl lg:text-7xl">
            Powering ticket distribution for
            <br />
            <span className="caret text-primary">{typed}</span>
          </h1>
        </Reveal>

        <Reveal delay={180}>
          <p className="mt-6 max-w-2xl text-base text-background/80 sm:text-lg">
            Thirty years of moving real inventory. One platform that pushes your seats to every
            marketplace fans buy from — and drops verified tickets straight into the itineraries
            travel teams sell.
          </p>
        </Reveal>

        <Reveal delay={260}>
          <div className="mt-9 flex flex-wrap gap-3">
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

        <Reveal delay={340}>
          <ul className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-2 font-mono text-xs tracking-wide text-background/70 uppercase">
            {["30+ Years in Ticketing", "10K+ Partners", "3 Global Offices"].map((t) => (
              <li key={t} className="flex items-center gap-2">
                <span className="size-1 rounded-full bg-primary" />
                {t}
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}