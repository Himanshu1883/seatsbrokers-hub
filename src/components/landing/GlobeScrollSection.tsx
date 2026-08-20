import { useEffect, useRef, useState } from "react";
import { GlobeCanvas } from "@/components/landing/globe/GlobeCanvas";
import heroStadium from "@/assets/hero-stadium.jpg";
import travelImg from "@/assets/card-seller.jpg";

const GLOBAL_STATS = [
  { value: "30+", label: "Years moving real seats" },
  { value: "10K+", label: "B2B partners" },
  { value: "165", label: "Countries served" },
  { value: "2M+", label: "Tickets delivered" },
] as const;

const MARKETPLACES = [
  "Marketplace 01",
  "Marketplace 02",
  "Marketplace 03",
  "Marketplace 04",
  "Marketplace 05",
  "Regional channels",
] as const;

const slides = [
  {
    index: "01",
    eyebrow: "Ecosystem",
    title: "One platform.",
    lines: ["Brokers.", "Marketplaces.", "B2B partners."],
    headline: null,
    body: "SeatsBrokers is the technology infrastructure connecting the global ticketing ecosystem — event data, inventory, marketplace connectivity, AI pricing and partner commerce.",
    bullets: [
      "Global event data and structured event intelligence",
      "Ticket inventory and resale marketplace connectivity",
      "AI-powered pricing and partner sales infrastructure",
    ],
    stats: [
      { value: "16", label: "Connected marketplaces" },
      { value: "12K+", label: "Events catalogued" },
    ],
    coord: "40.71°N 74.00°W",
    hub: "Americas gateway",
    region: "New York",
    image: heroStadium,
    imageAlt: "Global ticketing ecosystem infrastructure",
  },
  {
    index: "02",
    eyebrow: "B2B partners",
    title: null,
    lines: [] as string[],
    headline: "Buy, margin, quote and sell.",
    body: "Turn ticket inventory into customer-ready experiences — access inventory, add margins, generate professional quotes and share via PDF, WhatsApp or email.",
    bullets: [
      "Real-time inventory visibility and partner purchasing",
      "Custom margins and customer-ready quotation tools",
      "Invoice generation and order management",
    ],
    stats: [
      { value: "Seconds", label: "Quote generation" },
      { value: "Branded", label: "Customer output" },
    ],
    coord: "25.20°N 55.27°E",
    hub: "Gulf & leisure routes",
    region: "Dubai",
    image: travelImg,
    imageAlt: "B2B partner quotation and margin tools",
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
      className="section-curve-sticky globe-scroll-section relative scroll-mt-24 overflow-x-clip bg-[oklch(0.965_0.005_158)]"
      aria-label="Global distribution network"
    >
      <div className="pointer-events-none sticky top-0 z-0 flex h-dvh w-full flex-col overflow-hidden">
        <div className="globe-top-fringe opacity-40" aria-hidden />

        <div className="globe-scroll-heading relative grid grid-cols-2 items-start gap-2 px-3 sm:grid-cols-[1fr_auto_1fr] sm:gap-3 sm:px-8">
          <div className="flex items-center gap-2.5 justify-self-start">
            <span className="relative flex h-2.5 w-2.5 shrink-0">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-60" />
              <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-primary" />
            </span>
            <span className="font-mono text-[10px] font-bold leading-tight tracking-[0.16em] text-foreground/70 sm:text-xs">
              Live network
            </span>
          </div>

          <div className="col-span-2 mt-1 hidden flex-col items-center text-center sm:col-span-1 sm:mt-0 sm:flex sm:justify-self-center">
            <span className="globe-scroll-heading-kicker">
              SeatsBrokers
            </span>
            <span className="globe-scroll-heading-title">
              Global ticket infrastructure
            </span>
            <p className="section-eyebrow text-primary">
              {active.eyebrow}
            </p>
          </div>

          <div className="justify-self-end text-right">
            <div className="globe-rail-label">Node</div>
            <div className="mt-1 font-mono text-sm font-bold tracking-[0.08em] text-foreground sm:text-base">
              {String(activeIndex + 1).padStart(2, "0")} / {String(slides.length).padStart(2, "0")}
            </div>
          </div>
        </div>

        <div className="relative flex min-h-0 w-full flex-1 items-center justify-center px-4 sm:px-6">
          <div
            className="absolute h-[70vmin] w-[70vmin] max-h-[760px] max-w-[760px] rounded-full bg-primary/15 blur-3xl sm:h-[80vmin] sm:w-[80vmin] lg:h-[88vmin] lg:w-[88vmin]"
            aria-hidden
          />

          <div className="relative h-[52vmin] w-[52vmin] max-h-[680px] max-w-[680px] shrink-0 sm:h-[64vmin] sm:w-[64vmin] lg:h-[74vmin] lg:w-[74vmin]">
            <GlobeCanvas scrollOffset={scrollProgress} />
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

          <div className="globe-pin-caption absolute inset-x-3 bottom-5 grid grid-cols-1 items-end gap-3 sm:inset-x-8 sm:bottom-10 sm:grid-cols-[1fr_auto] sm:gap-4">
            <div className="min-w-0 text-left">
              <div className="globe-rail-label">Active hub · {active.region}</div>
              <div className="mt-1.5 font-display text-lg font-bold tracking-tight text-foreground sm:text-2xl">
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
            className="globe-scroll-article relative flex min-h-0 items-start justify-center px-4 pb-16 sm:px-6 sm:pb-24 lg:min-h-dvh lg:px-10"
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
              <p className="section-eyebrow text-primary">
                {slide.eyebrow}
              </p>

              {slide.title ? (
                <div className="mt-5 sm:mt-6">
                  <p className="font-display text-[clamp(2.25rem,6vw,3.75rem)] leading-[0.95] font-bold tracking-tight text-background">
                    {slide.title}
                  </p>
                  <ul className="mt-5 space-y-2">
                    {slide.lines.map((line) => (
                      <li
                        key={line}
                        className="font-display text-base font-bold tracking-[0.1em] text-primary sm:text-lg"
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
                    className="globe-slide-stat min-w-[7.5rem] rounded-lg px-4 py-3 text-center sm:min-w-[8.5rem] sm:px-5"
                  >
                    <div className="font-display text-2xl font-bold text-primary sm:text-3xl">{s.value}</div>
                    <div className="mt-1 font-mono text-[10px] font-bold tracking-wide text-background/75 sm:text-xs">
                      {s.label}
                    </div>
                  </div>
                ))}
              </div>

              <div className="globe-slide-card-foot mx-auto mt-10 flex items-center justify-center gap-3 font-mono text-xs font-bold tracking-widest text-background/65 ">
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
