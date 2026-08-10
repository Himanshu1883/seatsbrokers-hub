import { useEffect, useRef, useState } from "react";
import { ArrowRight } from "lucide-react";
import { GlobeCanvas } from "@/components/landing/globe/GlobeCanvas";
import heroStadium from "@/assets/hero-stadium.jpg";
import sellerImg from "@/assets/card-seller.jpg";
import travelImg from "@/assets/card-travel.jpg";
import dashboardImg from "@/assets/dashboard.jpg";
import ctaImg from "@/assets/cta-trophy.jpg";

const GLOBAL_STATS = [
  { value: "30+", label: "Years moving real seats" },
  { value: "10K+", label: "B2B partners" },
  { value: "165", label: "Countries served" },
  { value: "2M+", label: "Tickets delivered" },
] as const;

const MARKETPLACES = [
  "StubHub",
  "Viagogo",
  "Ticketmaster",
  "SeatGeek",
  "Live Nation",
  "Regional OTAs",
] as const;

const slides = [
  {
    index: "01",
    eyebrow: "Global infrastructure",
    title: "For every",
    lines: ["Broker desk.", "Travel team.", "Marketplace."],
    headline: null,
    body: "SeatsBrokers is the B2B layer between live inventory and every channel that sells it — one contract, one catalogue, one settlement stream.",
    bullets: [
      "Sport, music, and entertainment inventory in one trade platform",
      "API, feed, or white-label — integrate at the depth you need",
      "Built for professionals who move volume, not consumer checkout noise",
    ],
    stats: [
      { value: "24/7", label: "Ops & routing" },
      { value: "3", label: "Global offices" },
    ],
    coord: "40.71°N 74.00°W",
    hub: "Americas gateway",
    region: "New York",
    image: heroStadium,
    imageAlt: "Global stadium and live events infrastructure",
  },
  {
    index: "02",
    eyebrow: "Seller partners",
    title: null,
    lines: [] as string[],
    headline: "List once. Sell across every major resale channel.",
    body: "Professional brokers and rights holders publish inventory once. We fan it out to StubHub, Viagogo, and the long tail — with splits, holds, delivery rules, and pricing floors preserved.",
    bullets: [
      "Unified catalog with live sync and double-sale protection",
      "Smart repricing with margin guards your desk controls",
      "Audit-ready payouts finance can reconcile in one export",
    ],
    stats: [
      { value: "1", label: "Publish point" },
      { value: "∞", label: "Marketplace reach" },
    ],
    coord: "51.51°N 0.13°W",
    hub: "EMEA trading desk",
    region: "London",
    image: sellerImg,
    imageAlt: "Seller partner inventory and marketplace distribution",
  },
  {
    index: "03",
    eyebrow: "Travel partners",
    title: null,
    lines: [] as string[],
    headline: "Verified tickets inside the packages you quote.",
    body: "OTAs, tour operators, and concierge teams embed confirmed seats in itineraries — no midnight barcode hunts, no broken promises at the turnstile.",
    bullets: [
      "Catalogue filtered by city, date, venue, and budget",
      "Hold-to-package workflows for groups and corporate hospitality",
      "White-label confirmations that match your brand",
    ],
    stats: [
      { value: "Minutes", label: "To quote & share" },
      { value: "100%", label: "Verified barcodes" },
    ],
    coord: "25.20°N 55.27°E",
    hub: "Gulf & leisure routes",
    region: "Dubai",
    image: travelImg,
    imageAlt: "Travel partners packaging live events",
  },
  {
    index: "04",
    eyebrow: "Market intelligence",
    title: null,
    lines: [] as string[],
    headline: "The same live data our routing engine uses.",
    body: "Pricing, demand curves, and sell-through on one screen — updated continuously, not exported overnight. Your trading desk sees what the platform sees.",
    bullets: [
      "Event-level heatmaps, comparables, and sell-through curves",
      "Automated order routing with SLA visibility",
      "Inventory sync across connected marketplaces in seconds",
    ],
    stats: [
      { value: "Live", label: "Pricing signals" },
      { value: "1", label: "Source of truth" },
    ],
    coord: "1.35°N 103.82°E",
    hub: "APAC distribution",
    region: "Singapore",
    image: dashboardImg,
    imageAlt: "Market intelligence dashboard",
  },
  {
    index: "05",
    eyebrow: "Start partnering",
    title: null,
    lines: [] as string[],
    headline: "Thirty years of infrastructure. Ready for your next season.",
    body: "Join brokers and travel teams who list once, sell everywhere, and settle clean — from London to New York to Dubai.",
    bullets: [
      "Seller onboarding with inventory import in days, not months",
      "Travel partner feeds built for itinerary-driven sales",
      "Dedicated trade support — partners@seatsbrokers.com",
    ],
    stats: [
      { value: "4.7/5", label: "Partner rating" },
      { value: "1K+", label: "Venues on network" },
    ],
    coord: "33.87°S 151.21°E",
    hub: "Pacific corridor",
    region: "Sydney",
    image: ctaImg,
    imageAlt: "Championship events and global partnerships",
    cta: true,
  },
] as const;

function useSectionScrollProgress(sectionRef: React.RefObject<HTMLElement | null>) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const measure = () => {
      const rect = section.getBoundingClientRect();
      const top = window.scrollY + rect.top;
      const range = Math.max(section.offsetHeight - window.innerHeight, 1);
      const raw = (window.scrollY - top) / range;
      setProgress(Math.min(Math.max(raw, 0), 1));
    };

    measure();
    window.addEventListener("scroll", measure, { passive: true });
    window.addEventListener("resize", measure);
    return () => {
      window.removeEventListener("scroll", measure);
      window.removeEventListener("resize", measure);
    };
  }, [sectionRef]);

  return progress;
}

export function GlobeScrollSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const scrollProgress = useSectionScrollProgress(sectionRef);
  const activeIndex = Math.min(
    Math.round(scrollProgress * (slides.length - 1)),
    slides.length - 1,
  );
  const active = slides[activeIndex]!;

  return (
    <section
      ref={sectionRef}
      id="globe"
      className="section-curve-sticky relative scroll-mt-24 bg-[oklch(0.965_0.005_158)]"
      aria-label="Global distribution network"
    >
      <div className="pointer-events-none sticky top-0 z-0 h-dvh w-full overflow-hidden">
        <div className="globe-top-fringe opacity-40" aria-hidden />

        <div className="relative flex h-full w-full items-center justify-center px-4 sm:px-6">
          <div
            className="absolute h-[88vmin] w-[88vmin] max-h-[760px] max-w-[760px] rounded-full bg-primary/15 blur-3xl"
            aria-hidden
          />

          <div className="relative h-[74vmin] w-[74vmin] max-h-[680px] max-w-[680px] shrink-0">
            <GlobeCanvas scrollOffset={scrollProgress} />
          </div>

          <div className="absolute inset-x-4 top-6 grid grid-cols-[1fr_auto_1fr] items-start gap-3 sm:inset-x-8 sm:top-10">
            <div className="flex items-center gap-2.5 justify-self-start">
              <span className="relative flex h-2.5 w-2.5 shrink-0">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-60" />
                <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-primary" />
              </span>
              <span className="font-mono text-[10px] font-bold leading-tight tracking-[0.16em] text-foreground/70 uppercase sm:text-xs">
                Live network
              </span>
            </div>

            <div className="flex flex-col items-center text-center justify-self-center">
              <span className="font-mono text-[10px] font-bold tracking-[0.24em] text-foreground/50 uppercase sm:text-xs">
                SeatsBrokers
              </span>
              <span className="mt-1 font-display text-sm font-bold tracking-tight text-foreground sm:text-base">
                Global ticket infrastructure
              </span>
            </div>

            <div className="justify-self-end text-right">
              <div className="globe-rail-label">Node</div>
              <div className="mt-1 font-mono text-sm font-bold tracking-[0.08em] text-foreground sm:text-base">
                {String(activeIndex + 1).padStart(2, "0")} / {String(slides.length).padStart(2, "0")}
              </div>
            </div>
          </div>

          <div className="absolute left-4 top-1/2 hidden w-44 -translate-y-1/2 border-l-2 border-primary/25 pl-5 text-left lg:block xl:left-8 xl:w-52">
            <p className="globe-rail-label">Platform scale</p>
            <ul className="mt-4 space-y-4">
              {GLOBAL_STATS.map((s) => (
                <li key={s.label}>
                  <div className="globe-rail-value">{s.value}</div>
                  <div className="globe-rail-meta">{s.label}</div>
                </li>
              ))}
            </ul>
          </div>

          <div className="absolute right-4 top-1/2 hidden w-44 -translate-y-1/2 border-r-2 border-primary/25 pr-5 text-right lg:block xl:right-8 xl:w-52">
            <p className="globe-rail-label">Connected channels</p>
            <ul className="mt-4 space-y-2">
              {MARKETPLACES.map((m) => (
                <li key={m} className="font-display text-sm font-bold tracking-tight text-foreground/85">
                  {m}
                </li>
              ))}
            </ul>
            <p className="mt-5 font-mono text-[11px] font-bold leading-relaxed tracking-wide text-primary">
              + every regional marketplace your buyers use
            </p>
          </div>

          <div className="absolute left-1/2 top-[5rem] hidden w-full max-w-lg -translate-x-1/2 px-6 text-center lg:block">
            <p className="font-mono text-xs font-bold tracking-[0.2em] text-primary uppercase">
              {active.eyebrow}
            </p>
            <p className="mt-2 text-sm font-bold leading-snug text-foreground/70 sm:text-base">
              {active.headline ?? active.body}
            </p>
          </div>

          <div className="absolute inset-x-4 bottom-6 grid grid-cols-[1fr_auto] items-end gap-4 sm:inset-x-8 sm:bottom-10">
            <div className="min-w-0 text-left">
              <div className="globe-rail-label">Active hub · {active.region}</div>
              <div className="mt-1.5 font-display text-xl font-bold tracking-tight text-foreground sm:text-2xl">
                {active.hub}
              </div>
              <div className="mt-1 font-mono text-xs font-semibold tracking-wide text-foreground/60 sm:text-sm">
                {active.coord}
              </div>
              <div className="mt-3 flex flex-wrap gap-2 lg:hidden">
                {active.stats.map((s) => (
                  <span
                    key={s.label}
                    className="rounded-md border border-foreground/12 bg-background/70 px-3 py-1 font-mono text-[10px] font-bold text-foreground/80"
                  >
                    {s.value} · {s.label}
                  </span>
                ))}
              </div>
            </div>

            <div className="hidden shrink-0 flex-col items-end gap-2.5 text-right sm:flex">
              <span className="globe-rail-label">Scroll to explore</span>
              <div className="flex items-center gap-1.5">
                {slides.map((s, i) => (
                  <span
                    key={s.index}
                    className={`h-1 rounded-full bg-primary transition-all duration-500 ${
                      i === activeIndex ? "w-8 opacity-100" : "w-2 opacity-30"
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>

          <div className="absolute inset-6 hidden sm:block lg:inset-10" aria-hidden>
            <span className="absolute left-0 top-0 h-4 w-px bg-foreground/15" />
            <span className="absolute left-0 top-0 h-px w-4 bg-foreground/15" />
            <span className="absolute right-0 top-0 h-4 w-px bg-foreground/15" />
            <span className="absolute right-0 top-0 h-px w-4 bg-foreground/15" />
            <span className="absolute bottom-0 left-0 h-4 w-px bg-foreground/15" />
            <span className="absolute bottom-0 left-0 h-px w-4 bg-foreground/15" />
            <span className="absolute bottom-0 right-0 h-4 w-px bg-foreground/15" />
            <span className="absolute bottom-0 right-0 h-px w-4 bg-foreground/15" />
          </div>
        </div>
      </div>

      <div className="relative z-10 -mt-[100dvh]">
        {slides.map((slide, i) => (
          <article
            key={slide.index}
            className="relative flex min-h-dvh items-center justify-center px-4 py-24 sm:px-6 lg:px-10"
          >
            <span
              className="pointer-events-none absolute left-1/2 top-[8%] -translate-x-1/2 select-none font-display text-[20vw] font-bold leading-none text-foreground/[0.04] sm:text-[12vw]"
              aria-hidden
            >
              {slide.index}
            </span>

            <div className="globe-slide-card relative mx-auto w-full max-w-4xl overflow-hidden">
              <img
                src={slide.image}
                alt=""
                width={1400}
                height={900}
                loading={i === 0 ? "eager" : "lazy"}
                className="absolute inset-0 size-full scale-105 object-cover"
                aria-hidden
              />
              <div className="globe-slide-card-overlay" aria-hidden />
              <div className="globe-slide-card-content relative z-10">
              <p className="font-mono text-xs font-bold tracking-[0.22em] text-primary uppercase sm:text-sm">
                {slide.eyebrow}
              </p>

              {slide.title ? (
                <div className="mt-5 sm:mt-6">
                  <p className="font-display text-[clamp(2.25rem,6vw,3.75rem)] leading-[0.95] font-bold tracking-tight text-background uppercase">
                    {slide.title}
                  </p>
                  <ul className="mt-5 space-y-2">
                    {slide.lines.map((line) => (
                      <li
                        key={line}
                        className="font-display text-base font-bold tracking-[0.1em] text-primary uppercase sm:text-lg"
                      >
                        {line}
                      </li>
                    ))}
                  </ul>
                </div>
              ) : (
                <h3 className="mx-auto mt-5 max-w-2xl text-[clamp(1.5rem,4vw,2.25rem)] leading-tight font-bold tracking-tight text-background sm:mt-6">
                  {slide.headline}
                </h3>
              )}

              <p className="mx-auto mt-6 max-w-2xl text-base font-semibold leading-relaxed text-background/88 sm:mt-7 sm:text-lg">
                {slide.body}
              </p>

              <ul className="mx-auto mt-8 max-w-xl space-y-3 text-left">
                {slide.bullets.map((item) => (
                  <li
                    key={item}
                    className="flex gap-3 border-l-[3px] border-primary pl-4 text-base font-bold leading-snug text-background/95 sm:text-[1.0625rem]"
                  >
                    <span className="mt-2.5 size-1.5 shrink-0 rounded-full bg-primary" aria-hidden />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>

              <div className="mt-10 flex flex-wrap items-stretch justify-center gap-4">
                {slide.stats.map((s) => (
                  <div
                    key={s.label}
                    className="globe-slide-stat min-w-[8.5rem] rounded-lg px-5 py-3 text-center"
                  >
                    <div className="font-display text-2xl font-bold text-primary sm:text-3xl">{s.value}</div>
                    <div className="mt-1 font-mono text-[10px] font-bold tracking-wide text-background/75 uppercase sm:text-xs">
                      {s.label}
                    </div>
                  </div>
                ))}
              </div>

              {"cta" in slide && slide.cta && (
                <div className="mt-10 flex flex-wrap justify-center gap-3">
                  <a
                    href="#sellers"
                    className="lift inline-flex items-center gap-2 rounded-md bg-primary px-6 py-3.5 text-base font-bold text-primary-foreground"
                  >
                    Become a Seller Partner
                    <ArrowRight className="size-4" />
                  </a>
                  <a
                    href="#travel"
                    className="lift inline-flex items-center gap-2 rounded-md border border-background/35 bg-background/15 px-6 py-3.5 text-base font-bold text-background backdrop-blur-sm"
                  >
                    Become a Travel Partner
                  </a>
                </div>
              )}

              <div className="mx-auto mt-10 flex items-center justify-center gap-3 font-mono text-xs font-bold tracking-widest text-background/65 uppercase">
                <span>{slide.region}</span>
                <span className="size-1.5 rounded-full bg-primary/70" aria-hidden />
                <span>
                  {slide.index} / {String(slides.length).padStart(2, "0")}
                </span>
              </div>
              </div>
            </div>
            <span className="sr-only">{`Slide ${i + 1} of ${slides.length}`}</span>
          </article>
        ))}
      </div>
    </section>
  );
}
