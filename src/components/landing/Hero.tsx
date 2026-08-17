import { useCallback, useEffect, useState, type ReactNode } from "react";
import { useTypewriter } from "@/hooks/use-scroll-motion";
import { HeroDashboardTilt } from "@/components/landing/HeroDashboardTilt";
import { SiteLink } from "@/components/layout/SiteLink";
import { ctas } from "@/content/site";
import heroStadium1 from "@/assets/hero-stadium-1.webp";
import heroStadium2 from "@/assets/hero-stadium-2.jpg";
import heroStadium3 from "@/assets/hero-stadium-3.jpg";

const SLIDE_MS = 2100;

const slides = [
  {
    image: heroStadium1,
    alt: "Ticketing technology infrastructure platform",
    eyebrow: "Ticketing Technology & Intelligence Platform",
    title: "The Technology Infrastructure Behind",
    typePhrases: ["Modern Ticket Resale.", "Global Ticketing.", "Market Intelligence.", "Marketplace Connectivity."],
    lead: "Connect your ticket inventory, marketplaces, partners, pricing and sales operations through one powerful technology platform.",
    body: "Manage your entire ticketing operation from event discovery to listing, distribution, pricing, sales and fulfillment — the infrastructure layer connecting the global ticketing ecosystem.",
    shortBody: "From discovery to listing, pricing and fulfillment — one infrastructure layer for the global ticketing ecosystem.",
    details: [
      "Global event data, inventory and resale marketplace connectivity",
      "Market pricing data, sales intelligence and AI-powered pricing",
      "Payment infrastructure, partner commerce and quotation tools",
    ],
  },
  {
    image: heroStadium2,
    alt: "Broker platform for ticket operations",
    eyebrow: "Broker Platform · Ticket Brokers",
    title: "Run your ticket business from",
    typePhrases: [
      "One platform.",
      "One catalog.",
      "Every marketplace.",
      "One export close.",
    ],
    lead: "List once. Distribute everywhere. When inventory changes, SeatsBrokers synchronizes quantity, price and listing status across connected marketplaces.",
    body: "Global event catalog, inventory management, marketplace distribution, AI pricing recommendations, POS/API integration and payment infrastructure — built for high-volume ticket operations.",
    shortBody: "Catalog, inventory, marketplace distribution and AI pricing — built for high-volume ticket operations.",
    details: [
      "Multi-marketplace synchronization with automatic delisting after sale",
      "Market pricing, sales intelligence and event onsale information",
      "Ticket delivery management, partner inventory and quotation tools",
    ],
  },
  {
    image: heroStadium3,
    alt: "Travel partner ticket distribution platform",
    eyebrow: "Travel Partner Platform",
    title: "Powering ticket distribution for",
    typePhrases: ["Formula 1.", "Football.", "Concerts.", "Championships.", "Every major event."],
    lead: "Turn ticket inventory into seamless customer experiences — access, margin, quote and sell through your travel business.",
    body: "Real-time inventory visibility, partner purchasing, custom margins, customer-ready quotes, invoice generation and WhatsApp sharing for travel agencies selling sports and event packages.",
    shortBody: "Search inventory, add margin, and generate branded quotes for sports and event packages.",
    details: [
      "Search by event, date, venue, category, location and ticket type",
      "Add margin and generate branded PDF quotes in seconds",
      "Order management with partner pricing and customer-ready delivery",
    ],
  },
] as const;

type HeroSlide = (typeof slides)[number];

function longestPhrase(phrases: readonly string[]) {
  return phrases.reduce((longest, phrase) => (phrase.length > longest.length ? phrase : longest), phrases[0] ?? "");
}

/* The ghost copy holds the longest phrase so the headline line-box never
   resizes while the typewriter types, deletes or switches slides. */
function HeroTypeLine({ phrases, children }: { phrases: readonly string[]; children: ReactNode }) {
  return (
    <span
      className="hero-copy-typewriter hero-copy-typeline mt-2 block text-[clamp(2rem,5.5vw,4rem)] leading-[1.2] font-bold text-primary"
      aria-live="polite"
    >
      <span className="hero-copy-typeline-ghost" aria-hidden>
        {longestPhrase(phrases)}
      </span>
      <span className="caret hero-copy-typeline-text">{children}</span>
    </span>
  );
}

function HeroTypewriter({ phrases }: { phrases: readonly string[] }) {
  const [reducedMotion, setReducedMotion] = useState(false);
  const typed = useTypewriter([...phrases], 62, 2200);

  useEffect(() => {
    setReducedMotion(window.matchMedia("(prefers-reduced-motion: reduce)").matches);
  }, []);

  const display = reducedMotion ? (phrases[0] ?? "") : typed;

  return <HeroTypeLine phrases={phrases}>{display}</HeroTypeLine>;
}

function HeroSlideCopy({
  slide,
  isActive,
  animate,
}: {
  slide: HeroSlide;
  isActive: boolean;
  animate: boolean;
}) {
  const typeLine = longestPhrase(slide.typePhrases);
  const item = (delay: number, className: string) =>
    animate ? `${className} hero-copy-item hero-copy-delay-${delay}` : className;

  return (
    <>
      <p
        className={item(
          0,
          "hero-copy-eyebrow inline-flex max-w-full flex-wrap items-center gap-2 rounded-full border border-background/20 bg-background/8 px-3 py-1.5 text-pretty section-eyebrow text-white backdrop-blur-sm",
        )}
      >
        <span className="size-1.5 shrink-0 rounded-full bg-primary" />
        {slide.eyebrow}
      </p>

      <h1
        className={item(
          1,
          "hero-copy-head mt-5 text-[clamp(2rem,5vw,3.25rem)] leading-[1.2] font-bold text-balance text-white sm:mt-6",
        )}
      >
        {slide.title}
        {isActive ? (
          <HeroTypewriter phrases={slide.typePhrases} />
        ) : (
          <HeroTypeLine phrases={slide.typePhrases}>{typeLine}</HeroTypeLine>
        )}
      </h1>

      <p
        className={item(
          2,
          "hero-copy-lead mt-5 max-w-2xl font-display text-lg leading-snug font-bold tracking-tight text-white sm:mt-6 sm:text-xl",
        )}
      >
        {slide.lead}
      </p>

      <p
        className={item(
          3,
          "hero-copy-dense mt-4 max-w-2xl text-base leading-relaxed font-semibold text-pretty text-white sm:text-[1.0625rem]",
        )}
      >
        {slide.body}
      </p>

      <p
        className={item(
          3,
          "hero-copy-brief mt-3 max-w-2xl text-sm leading-snug font-semibold text-pretty text-white lg:hidden",
        )}
      >
        {slide.shortBody}
      </p>

      <ul
        className={item(
          4,
          "hero-copy-dense mt-6 space-y-2.5 border-l-2 border-primary/45 pl-4 sm:mt-7 sm:pl-5",
        )}
      >
        {slide.details.map((detail) => (
          <li
            key={detail}
            className="flex gap-2.5 text-sm leading-relaxed font-semibold text-white sm:text-[0.9375rem]"
          >
            <span className="mt-2 size-1 shrink-0 rounded-full bg-primary" aria-hidden />
            <span>{detail}</span>
          </li>
        ))}
      </ul>

      <div className={item(5, "hero-copy-actions mt-8 flex flex-wrap gap-3 sm:mt-9")}>
        <SiteLink
          to={ctas.becomeSeller.to}
          className="lift rounded-md bg-primary px-6 py-3.5 text-sm font-semibold text-primary-foreground"
          tabIndex={isActive ? 0 : -1}
        >
          {ctas.becomeSeller.label}
        </SiteLink>
        <SiteLink
          to={ctas.explorePlatform.to}
          className="lift rounded-md border border-background/40 px-6 py-3.5 text-sm font-semibold text-white hover:bg-background/10"
          tabIndex={isActive ? 0 : -1}
        >
          {ctas.explorePlatform.label}
        </SiteLink>
      </div>

      <ul
        className={item(
          6,
          "hero-copy-tags mt-8 flex flex-col gap-2 font-mono text-[10px] font-bold tracking-[0.12em] text-white uppercase sm:mt-10 sm:flex-row sm:flex-wrap sm:gap-x-8 sm:gap-y-2 sm:text-xs",
        )}
      >
        {["API Connectivity", "Inventory Synchronization", "Market Intelligence"].map((label) => (
          <li key={label} className="flex items-center gap-2">
            <span className="size-1 shrink-0 rounded-full bg-primary" />
            {label}
          </li>
        ))}
      </ul>
    </>
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

  return (
    <section
      id="top"
      className="section-curve-hero hero-fit relative isolate overflow-hidden max-lg:grid max-lg:grid-rows-[auto_minmax(0,1fr)_auto]"
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
              className={`size-full object-cover ${i === active ? "hero-ken-burns" : "scale-100"}`}
            />
          </div>
        ))}
      </div>

      <div className="absolute inset-0 -z-10" aria-hidden>
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_58%_at_52%_44%,rgb(0_0_0_/_0.34)_0%,rgb(0_0_0_/_0.40)_38%,rgb(0_0_0_/_0.62)_72%,rgb(0_0_0_/_0.90)_100%)]" />
        <div className="absolute inset-0 bg-linear-to-b from-black/72 via-transparent via-42% to-black/50" />
        <div className="absolute inset-0 bg-linear-to-r from-black/58 via-transparent via-48% to-transparent" />
      </div>

      <div className="hero-fit-zoom">
        <div className="hero-fit-offset pointer-events-none shrink-0" aria-hidden />

        <div className="hero-fit-main flex min-h-0 items-center overflow-visible">
          <div className="container-page flex min-h-0 w-full flex-col py-4 sm:py-6">
            <div className="hero-fit-grid grid min-h-0 items-center gap-6 lg:grid-cols-[minmax(0,40rem)_minmax(0,44rem)] lg:items-start lg:justify-center lg:gap-8">
              <div className="hero-copy w-full max-w-3xl lg:max-w-[40rem]">
                {slides.map((s, i) => {
                  const isActive = i === active;
                  return (
                    <div
                      key={s.alt}
                      className={`hero-copy-layer ${isActive ? "hero-copy-layer-active" : "hero-copy-layer-measure"}`}
                      aria-hidden={!isActive}
                    >
                      <HeroSlideCopy slide={s} isActive={isActive} animate={isActive} key={isActive ? motionKey : s.alt} />
                    </div>
                  );
                })}
              </div>

              <div className="hero-fit-console hero-copy-item hero-copy-delay-3 mx-auto w-full min-h-0 max-w-xl lg:mx-0 lg:max-w-[44rem]">
                <HeroDashboardTilt slide={active} swapKey={motionKey} />
              </div>
            </div>
          </div>
        </div>

        <div className="hero-fit-dots container-page flex justify-end">
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
      </div>
    </section>
  );
}
