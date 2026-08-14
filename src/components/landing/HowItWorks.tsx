import { useEffect, useRef, useState } from "react";
import { Reveal, useTypewriter } from "@/hooks/use-scroll-motion";
import { ArrowRight, Check } from "lucide-react";
import { SiteLink } from "@/components/layout/SiteLink";
import { ctas } from "@/content/site";
import { SectionBackdrop } from "@/components/landing/SectionBackdrop";

import eventsImg from "@/assets/product-events-browser.jpg";
import marketInsightImg from "@/assets/product-market-insight-api.png";
import analyticsImg from "@/assets/product-analytics-dashboard.png";

const steps = [
  {
    n: "01",
    tag: "INTELLIGENCE",
    title: "Know what's coming",
    subtitle: "Event Intelligence for every fixture.",
    body: "Our event intelligence technology brings together the information ticket businesses need — event name, date, venue, onsale date, sales criteria, ballot information, demand indicators and venue maps.",
    bullets: [
      "Global event catalog across football, rugby, cricket, tennis and Formula 1",
      "Onsale dates, onsale times and upcoming sales tracked per event",
      "Demand indicators, category pricing and current resale prices",
      "Interactive venue maps with sections, categories and seating areas",
    ],
    stats: [
      { value: "12K+", label: "Events catalogued" },
      { value: "10+", label: "Event categories" },
    ],
    proof: "Event Intelligence",
    proofDetail: "Structured event data with onsale information, demand signals and venue maps",
    caption: "Know the event before you buy inventory",
    image: eventsImg,
    imageAlt: "SeatsBrokers event intelligence dashboard showing event catalog and onsale dates",
    url: "app.seatsbrokers.com / events",
  },
  {
    n: "02",
    tag: "MARKET",
    title: "Know what's happening",
    subtitle: "Market intelligence for ticket brokers.",
    body: "See what the resale market is doing — average price, lowest price, highest price, price movement, inventory volume, sales activity and marketplace comparison in one format.",
    bullets: [
      "Average, lowest and highest price tracking per event and category",
      "Price movement, inventory volume and sales activity charts",
      "Category demand and marketplace comparison side by side",
      "Financial intelligence for ticket brokers — not stale exports",
    ],
    stats: [
      { value: "8+", label: "Market data sources" },
      { value: "<200ms", label: "Typical refresh" },
    ],
    proof: "Market Intelligence",
    proofDetail: "Bloomberg-style market analytics for ticket resale pricing decisions",
    caption: "See what the resale market is doing right now",
    image: marketInsightImg,
    imageAlt: "Market intelligence dashboard with pricing trends and marketplace comparison",
    url: "app.seatsbrokers.com / market",
  },
  {
    n: "03",
    tag: "PRICING",
    title: "Know what to price",
    subtitle: "AI recommends. You decide.",
    body: "Turn market data into actionable pricing recommendations. The platform analyzes market signals and recommends pricing adjustments — once approved, the new price synchronizes through connected marketplace infrastructure.",
    bullets: [
      "Market data → AI analysis → recommended price → broker approval → price updated",
      "Pricing recommendations with market comparison and category analysis",
      "Demand signals, inventory position and price movement tracking",
      "Approval workflow with automated synchronization to marketplaces",
    ],
    stats: [
      { value: "24/7", label: "AI pricing engine" },
      { value: "Auto", label: "Marketplace sync" },
    ],
    proof: "AI Pricing",
    proofDetail: "AI-powered pricing intelligence with broker-controlled approval workflow",
    caption: "Market data into pricing decisions — you stay in control",
    image: analyticsImg,
    imageAlt: "AI pricing dashboard with recommendations and approval workflow",
    url: "app.seatsbrokers.com / pricing",
  },
] as const;

function useSectionScrollProgress(
  sectionRef: React.RefObject<HTMLElement | null>,
  stepCount: number,
) {
  const [progress, setProgress] = useState(0);
  const targetRef = useRef(0);
  const currentRef = useRef(0);
  const frameRef = useRef(0);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section || stepCount < 2) return;

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const measure = () => {
      const rect = section.getBoundingClientRect();
      const top = window.scrollY + rect.top;
      const range = Math.max(section.offsetHeight - window.innerHeight, 1);
      const raw = (window.scrollY - top) / range;
      targetRef.current = Math.min(Math.max(raw, 0), 1) * (stepCount - 1);
    };

    const animate = () => {
      const target = targetRef.current;
      const next = reducedMotion
        ? target
        : currentRef.current + (target - currentRef.current) * 0.16;
      const settled = Math.abs(target - next) < 0.002;
      currentRef.current = settled ? target : next;
      setProgress(currentRef.current);
      if (!settled && !reducedMotion) {
        frameRef.current = requestAnimationFrame(animate);
      }
    };

    const onScroll = () => {
      measure();
      cancelAnimationFrame(frameRef.current);
      frameRef.current = requestAnimationFrame(animate);
    };

    measure();
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      cancelAnimationFrame(frameRef.current);
    };
  }, [stepCount, sectionRef]);

  return progress;
}

function ProductScreenshot({
  step,
  variant,
}: {
  step: (typeof steps)[number];
  variant: "desktop" | "mobile";
}) {
  return (
    <div className="how-it-product-frame flex flex-col overflow-hidden rounded-2xl border border-border bg-card shadow-[var(--shadow-card)]">
      <div className="flex shrink-0 items-center gap-3 border-b border-border bg-muted/40 px-4 py-2.5">
        {variant === "desktop" ? (
          <>
            <div className="flex gap-1.5">
              <span className="h-2.5 w-2.5 rounded-full bg-foreground/15" />
              <span className="h-2.5 w-2.5 rounded-full bg-foreground/15" />
              <span className="h-2.5 w-2.5 rounded-full bg-foreground/15" />
            </div>
            <div className="flex min-w-0 flex-1 items-center gap-2 rounded-md bg-background px-3 py-1">
              <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
              <span className="truncate font-mono text-[11px] text-muted-foreground">{step.url}</span>
            </div>
          </>
        ) : (
          <>
            <span className="rounded-md bg-primary px-2 py-0.5 font-mono text-[10px] font-bold text-primary-foreground">
              {step.n}
            </span>
            <span className="min-w-0 flex-1 truncate font-mono text-[10px] text-muted-foreground">
              {step.url}
            </span>
          </>
        )}
      </div>
      <div className="relative bg-muted/25">
        <img
          src={step.image}
          alt={step.imageAlt}
          loading="eager"
          decoding="async"
          className="block h-auto w-full"
        />
      </div>
    </div>
  );
}

export function HowItWorks() {
  const typed = useTypewriter(["Event Intelligence.", "Market Intelligence.", "AI Pricing."], 80);
  const sectionRef = useRef<HTMLElement>(null);
  const scrollProgress = useSectionScrollProgress(sectionRef, steps.length);
  const active = Math.min(Math.round(scrollProgress), steps.length - 1);
  const preview = steps[active] ?? steps[0];

  return (
    <section
      ref={sectionRef}
      id="how-it-works"
      className="section-curve-sticky relative isolate scroll-mt-24 overflow-x-clip bg-background py-16 sm:py-24 lg:py-28"
      aria-label="How it works"
    >
      <SectionBackdrop image="venueSeats" tone="light" strength={0.09} />
      <div className="container-page relative z-10">
        <Reveal>
          <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-2xl">
              <p className="section-eyebrow text-primary">
                Intelligence stack
              </p>
              <h2 className="mt-4 text-3xl font-bold text-foreground sm:text-4xl">
                Know the market with <span className="caret text-primary">{typed}</span>
              </h2>
            </div>
            <p className="max-w-md text-sm leading-relaxed text-muted-foreground lg:text-right lg:text-base">
              Know what's coming. Know what's happening. Know what to price — three layers of
              intelligence built into the SeatsBrokers platform.
            </p>
          </div>
        </Reveal>

        <Reveal delay={80}>
          <div className="mt-8 flex flex-wrap gap-3 border-y border-border py-5">
            {[
              "Unified inventory",
              "Market Insight API",
              "Multi-marketplace routing",
              "Finance-ready settlement",
            ].map((label) => (
              <span
                key={label}
                className="rounded-full border border-border bg-muted/50 px-3 py-1 font-mono text-[10px] tracking-wide text-muted-foreground uppercase"
              >
                {label}
              </span>
            ))}
          </div>
        </Reveal>

        <div className="mt-12 grid lg:mt-14 lg:grid-cols-2 lg:gap-10 xl:gap-16">
          <div className="lg:py-4">
            {steps.map((step, i) => {
              const isActive = active === i;
              return (
                <article
                  key={step.n}
                  className="flex min-h-0 flex-col justify-center py-12 sm:py-16 lg:min-h-[100dvh] lg:py-24"
                >
                  <Reveal>
                    <div className="mb-8 lg:hidden">
                      <ProductScreenshot step={step} variant="mobile" />
                    </div>

                    <div
                      className={`rounded-2xl border p-6 transition-colors duration-500 sm:p-8 ${
                        isActive
                          ? "border-primary/30 bg-card shadow-[var(--shadow-card)]"
                          : "border-border bg-card/80"
                      }`}
                    >
                      <div className="flex flex-wrap items-start justify-between gap-3">
                        <span className="font-mono text-5xl font-bold text-primary/25">{step.n}</span>
                        <span className="rounded-full border border-primary/25 bg-primary/[0.06] px-3 py-1 font-mono text-[10px] tracking-[0.16em] text-primary uppercase">
                          {step.tag}
                        </span>
                      </div>

                      <h3 className="mt-4 text-2xl font-bold text-foreground sm:text-[1.75rem]">
                        {step.title}
                      </h3>
                      <p className="mt-2 text-sm font-semibold text-foreground/80">{step.subtitle}</p>
                      <p className="mt-4 max-w-lg text-sm leading-relaxed text-muted-foreground sm:text-base">
                        {step.body}
                      </p>

                      <ul className="mt-6 space-y-3">
                        {step.bullets.map((item) => (
                          <li key={item} className="flex gap-3 text-sm leading-snug text-foreground/90">
                            <span
                              className="mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary"
                              aria-hidden
                            >
                              <Check className="size-3" strokeWidth={2.5} />
                            </span>
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>

                      <div className="mt-6 flex flex-wrap gap-3 lg:hidden">
                        {step.stats.map((s) => (
                          <div
                            key={s.label}
                            className="min-w-[7rem] rounded-lg border border-border bg-muted/40 px-4 py-2 text-center"
                          >
                            <div className="font-display text-lg font-bold text-foreground">
                              {s.value}
                            </div>
                            <div className="font-mono text-[9px] tracking-wide text-muted-foreground uppercase">
                              {s.label}
                            </div>
                          </div>
                        ))}
                      </div>

                      <div className="mt-8 flex items-start gap-3 rounded-xl border border-primary/20 bg-primary/[0.04] px-4 py-4">
                        <span className="relative mt-1 flex h-2 w-2 shrink-0">
                          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-60" />
                          <span className="relative inline-flex h-2 w-2 rounded-full bg-primary" />
                        </span>
                        <div>
                          <p className="font-mono text-[10px] tracking-[0.14em] text-primary uppercase">
                            {step.proof}
                          </p>
                          <p className="mt-1 text-sm text-muted-foreground">{step.proofDetail}</p>
                        </div>
                      </div>
                    </div>
                  </Reveal>
                </article>
              );
            })}
          </div>

          <div className="relative hidden lg:block">
            <div className="sticky top-24 flex h-[calc(100dvh-6rem)] flex-col justify-center py-8">
              <p className="mb-2 text-center section-eyebrow text-primary">
                Live product · step {preview.n}
              </p>
              <p className="mb-4 text-center text-sm font-medium text-muted-foreground">
                {preview.caption}
              </p>
              <div className="how-it-desktop-viewport min-h-0 w-full max-h-[calc(100dvh-13rem)] overflow-hidden">
                <ProductScreenshot key={preview.n} step={preview} variant="desktop" />
              </div>
              <div className="mt-4 flex flex-wrap justify-center gap-2">
                {preview.stats.map((s) => (
                  <span
                    key={s.label}
                    className="rounded-lg border border-border bg-card px-3 py-1.5 text-center"
                  >
                    <span className="block font-display text-sm font-bold text-foreground">
                      {s.value}
                    </span>
                    <span className="font-mono text-[9px] tracking-wide text-muted-foreground uppercase">
                      {s.label}
                    </span>
                  </span>
                ))}
              </div>
              <div className="mt-5 flex justify-center gap-1.5" aria-hidden>
                {steps.map((s, i) => (
                  <span
                    key={s.n}
                    className={`h-1 rounded-full bg-primary transition-all duration-500 ${
                      i === active ? "w-8 opacity-100" : "w-2 opacity-35"
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>

        <Reveal delay={120}>
          <div className="mt-16 flex flex-col items-start justify-between gap-6 rounded-2xl border border-border bg-surface px-6 py-8 sm:flex-row sm:items-center sm:px-10">
            <div>
              <p className="section-eyebrow text-primary">
                Ready to onboard
              </p>
              <p className="mt-2 max-w-xl text-base font-semibold text-foreground">
                Ticket brokers, travel partners and technology providers — know what's coming,
                know what's happening, know what to price.
              </p>
            </div>
            <SiteLink
              to={ctas.bookDemo.to}
              hash={ctas.bookDemo.hash}
              className="lift inline-flex shrink-0 items-center gap-2 rounded-md bg-primary px-5 py-3 text-sm font-bold text-primary-foreground"
            >
              {ctas.bookDemo.label}
              <ArrowRight className="size-4" />
            </SiteLink>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
