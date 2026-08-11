import { useCallback, useEffect, useState } from "react";
import { useTypewriter } from "@/hooks/use-scroll-motion";
import { HeroDashboardTilt } from "@/components/landing/HeroDashboardTilt";
import heroStadium from "@/assets/hero-stadium.jpg";
import heroChampionship from "@/assets/cta-trophy.jpg";
import heroTravel from "@/assets/card-travel.jpg";

const SLIDE_MS = 9000;

const slides = [
  {
    image: heroStadium,
    alt: "Floodlit stadium packed with fans on match night",
    eyebrow: "B2B live-event distribution infrastructure",
    title: "Powering ticket distribution for",
    typePhrases: ["Football.", "Concerts.", "Championships.", "Formula 1.", "Every major event."],
    lead: "Thirty years of moving real inventory across Europe, the Americas, and the Gulf.",
    body: "One platform that pushes your seats to every marketplace fans buy from — with live pricing, verified barcodes, and settlement you can reconcile in a single export.",
    details: [
      "Multi-marketplace listing, pricing rules, and inventory sync",
      "Broker-grade protection against double-sales and stale holds",
      "Market intelligence dashboards your trading desk actually uses",
    ],
  },
  {
    image: heroChampionship,
    alt: "Championship trophy under stadium lights",
    eyebrow: "Seller tech · brokers & rights holders",
    title: "Publish once.",
    typePhrases: [
      "Fan-out everywhere.",
      "Auto-reprice 24/7.",
      "Double-sale guard.",
      "One export close.",
    ],
    lead: "Stop fighting portals by hand. Our seller stack pushes one catalogue to every channel with rules still attached.",
    body: "Unified catalog, channel fan-out, smart repricing, and fulfilment routing — the same systems that protect margin and keep books clean.",
    details: [
      "Section, row, and split rules preserved on every push",
      "Automated undercut logic with desk-controlled guardrails",
      "Barcode-verified delivery and finance-ready statements",
    ],
  },
  {
    image: heroTravel,
    alt: "Travel partners packaging live events into itineraries",
    eyebrow: "Travel tech · OTAs & tour operators",
    title: "Embed verified seats via",
    typePhrases: [
      "API feeds.",
      "White-label flows.",
      "Hold-to-package.",
      "Instant confirms.",
    ],
    lead: "Travel teams plug SeatsBrokers into the packages they quote — confirmed seats, not last-minute barcode hunts.",
    body: "Portal and API access, timed holds, and white-label confirmations so itineraries stay accurate from quote to gate.",
    details: [
      "API and portal feeds built for itinerary-driven sales",
      "Hold-to-package workflows with timed release windows",
      "White-label confirmations that match your brand",
    ],
  },
] as const;

function HeroTypewriter({ phrases }: { phrases: readonly string[] }) {
  const [reducedMotion, setReducedMotion] = useState(false);
  const typed = useTypewriter([...phrases], 62, 2200);

  useEffect(() => {
    setReducedMotion(window.matchMedia("(prefers-reduced-motion: reduce)").matches);
  }, []);

  const display = reducedMotion ? (phrases[0] ?? "") : typed;

  return (
    <span
      className="caret mt-2 block min-h-[1.15em] text-[clamp(2rem,5.5vw,4rem)] leading-[1.05] font-bold text-primary"
      aria-live="polite"
    >
      {display}
    </span>
  );
}

export function Hero() {
  const [active, setActive] = useState(0);
  const [motionKey, setMotionKey] = useState(0);
  const [paused, setPaused] = useState(false);

  const goTo = useCallback((index: number) => {
    setActive((index + slides.length) % slides.length);
    setMotionKey((k) => k + 1);
  }, []);

  useEffect(() => {
    if (paused) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) return;

    const id = window.setInterval(() => {
      setActive((i) => (i + 1) % slides.length);
      setMotionKey((k) => k + 1);
    }, SLIDE_MS);
    return () => window.clearInterval(id);
  }, [paused]);

  const slide = slides[active]!;

  return (
    <section
      id="top"
      className="section-curve-hero relative isolate grid h-dvh min-h-[40rem] grid-rows-[auto_1fr_auto]"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocusCapture={() => setPaused(true)}
      onBlurCapture={() => setPaused(false)}
    >
      <div className="absolute inset-0 -z-20" aria-hidden>
        {slides.map((s, i) => (
          <div
            key={s.alt}
            className={`absolute inset-0 transition-opacity duration-[1400ms] ease-out ${
              i === active ? "opacity-100" : "opacity-0"
            }`}
          >
            <img
              src={s.image}
              alt=""
              width={1920}
              height={1080}
              className={`size-full object-cover ${
                i === active ? "hero-ken-burns" : "scale-100"
              }`}
            />
          </div>
        ))}
      </div>

      <div
        className="absolute inset-0 -z-10 bg-linear-to-br from-dark/84 via-dark/94 to-primary-deep/55"
        aria-hidden
      />

      <div className="pointer-events-none h-18 shrink-0" aria-hidden />

      <div className="flex min-h-0 items-center overflow-y-auto">
        <div className="container-page w-full py-4 sm:py-6">
          <div className="grid items-center gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.15fr)] lg:gap-8 xl:gap-12">
            <div key={motionKey} className="hero-copy w-full max-w-3xl lg:max-w-[40rem]">
              <p className="hero-copy-item hero-copy-delay-0 inline-flex items-center gap-2 rounded-full border border-background/20 bg-background/8 px-3 py-1.5 section-eyebrow text-white backdrop-blur-sm">
                <span className="size-1.5 shrink-0 rounded-full bg-primary" />
                {slide.eyebrow}
              </p>

              <h1 className="hero-copy-item hero-copy-delay-1 mt-5 text-[clamp(2rem,5vw,3.25rem)] leading-[1.1] font-bold text-balance text-white sm:mt-6">
                {slide.title}
                <HeroTypewriter key={active} phrases={slide.typePhrases} />
              </h1>

              <p className="hero-copy-item hero-copy-delay-2 mt-5 max-w-2xl font-display text-lg leading-snug font-bold tracking-tight text-white sm:mt-6 sm:text-xl">
                {slide.lead}
              </p>

              <p className="hero-copy-item hero-copy-delay-3 mt-4 max-w-2xl text-base leading-relaxed font-semibold text-pretty text-white sm:text-[1.0625rem]">
                {slide.body}
              </p>

              <ul className="hero-copy-item hero-copy-delay-4 mt-6 space-y-2.5 border-l-2 border-primary/45 pl-4 sm:mt-7 sm:pl-5">
                {slide.details.map((item) => (
                  <li
                    key={item}
                    className="flex gap-2.5 text-sm leading-relaxed font-semibold text-white sm:text-[0.9375rem]"
                  >
                    <span className="mt-2 size-1 shrink-0 rounded-full bg-primary" aria-hidden />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>

              <div className="hero-copy-item hero-copy-delay-5 mt-8 flex flex-wrap gap-3 sm:mt-9">
                <a
                  href="#sellers"
                  className="lift rounded-md bg-primary px-6 py-3.5 text-sm font-semibold text-primary-foreground"
                >
                  Become a Seller Partner
                </a>
                <a
                  href="#travel"
                  className="lift rounded-md border border-background/40 px-6 py-3.5 text-sm font-semibold text-white hover:bg-background/10"
                >
                  Become a Travel Partner
                </a>
              </div>

              <ul className="hero-copy-item hero-copy-delay-6 mt-8 flex flex-col gap-2 font-mono text-[10px] font-bold tracking-[0.12em] text-white uppercase sm:mt-10 sm:flex-row sm:flex-wrap sm:gap-x-8 sm:gap-y-2 sm:text-xs">
                {["30+ Years in Ticketing", "10K+ Partners", "3 Global Offices"].map((t) => (
                  <li key={t} className="flex items-center gap-2">
                    <span className="size-1 shrink-0 rounded-full bg-primary" />
                    {t}
                  </li>
                ))}
              </ul>
            </div>

            <div className="hero-copy-item hero-copy-delay-3 mx-auto w-full max-w-xl min-h-0 lg:mx-0 lg:max-w-none">
              <HeroDashboardTilt />
            </div>
          </div>
        </div>
      </div>

      <div className="container-page flex justify-end pb-6 sm:pb-8">
        <div className="flex items-center gap-2" role="tablist" aria-label="Hero slides">
          {slides.map((s, i) => (
            <button
              key={s.alt}
              type="button"
              role="tab"
              aria-selected={i === active}
              aria-label={`Slide ${i + 1}: ${s.eyebrow}`}
              onClick={() => goTo(i)}
              className={`group relative h-2 overflow-hidden rounded-full transition-all duration-300 ${
                i === active ? "w-10 bg-background/25" : "w-2 bg-background/35 hover:bg-background/50"
              }`}
            >
              {i === active && (
                <span
                  key={motionKey}
                  className="hero-slide-progress absolute inset-y-0 left-0 rounded-full bg-primary"
                  style={{ animationDuration: `${SLIDE_MS}ms` }}
                />
              )}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
