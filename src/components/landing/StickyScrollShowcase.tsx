import { useEffect, useRef, useState } from "react";
import { SectionBackdrop } from "@/components/landing/SectionBackdrop";
import dashboardImg from "@/assets/dashboard.png";
import sellerImg from "@/assets/card-seller.jpg";
import travelImg from "@/assets/card-travel.jpg";
import stadiumImg from "@/assets/hero-stadium.jpg";

const panels = [
  {
    kicker: "Ticket Brokers",
    title: "Manage inventory, pricing and distribution",
    headline: "Inventory → SeatsBrokers →",
    accent: "Marketplaces → Sale",
    body: "Run your ticket business from one technology platform — global event catalog, inventory management, marketplace distribution and AI pricing.",
    points: [
      "Multi-marketplace synchronization with automatic delisting",
      "Market pricing, sales intelligence and event onsale information",
      "POS/API integration and payment infrastructure",
    ],
    image: sellerImg,
    imageAlt: "Ticket broker platform with inventory and marketplace distribution",
    caption: "One platform. Every marketplace.",
  },
  {
    kicker: "Travel Companies",
    title: "Source tickets and create customer quotes",
    headline: "SeatsBrokers Inventory →",
    accent: "Margin → Quote → Customer",
    body: "Access available ticket inventory, add margins, generate professional quotes and share with customers via PDF, WhatsApp or email.",
    points: [
      "Real-time inventory visibility and partner purchasing",
      "Custom margins and customer-ready quotes",
      "Invoice generation and order management",
    ],
    image: travelImg,
    imageAlt: "Travel partner quotation and margin management tools",
    caption: "Customer-ready travel experiences.",
  },
  {
    kicker: "Ticket Marketplaces",
    title: "Connect inventory through APIs",
    headline: "Broker API → Inventory →",
    accent: "Marketplace → Order",
    body: "Connect inventory and order infrastructure through APIs — listing creation, price synchronization, order synchronization and delivery updates.",
    points: [
      "API connectivity and inventory synchronization",
      "Automated listing distribution and price sync",
      "Order synchronization and error monitoring",
    ],
    image: dashboardImg,
    imageAlt: "Marketplace connectivity API infrastructure",
    caption: "One inventory. Multiple marketplaces.",
  },
  {
    kicker: "Technology Partners",
    title: "Integrate ticket data into your applications",
    headline: "Internal POS → SeatsBrokers API →",
    accent: "Inventory → Distribution",
    body: "Connect POS systems, inventory systems, internal ERP, websites and partner systems through API-first architecture built for ticketing.",
    points: [
      "Events, Inventory, Listing, Order and Pricing APIs",
      "Partner API for travel partners and external systems",
      "Secure authentication and role-based access",
    ],
    image: stadiumImg,
    imageAlt: "API platform for technology partner integrations",
    caption: "Build on our technology.",
  },
] as const;

function useStickyScrollProgress(
  sectionRef: React.RefObject<HTMLElement | null>,
  panelCount: number,
) {
  const [progress, setProgress] = useState(0);
  const targetRef = useRef(0);
  const currentRef = useRef(0);
  const frameRef = useRef(0);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section || panelCount < 2) return;

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const measure = () => {
      const rect = section.getBoundingClientRect();
      const top = window.scrollY + rect.top;
      const range = Math.max(section.offsetHeight - window.innerHeight, 1);
      const raw = (window.scrollY - top) / range;
      targetRef.current = Math.min(Math.max(raw, 0), 1) * (panelCount - 1);
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
  }, [panelCount, sectionRef]);

  return progress;
}

export function StickyScrollShowcase() {
  const sectionRef = useRef<HTMLElement>(null);
  const slideProgress = useStickyScrollProgress(sectionRef, panels.length);
  const activeIndex = Math.min(Math.round(slideProgress), panels.length - 1);

  return (
    <section
      ref={sectionRef}
      id="platform"
      className="section-curve-sticky relative isolate scroll-mt-24 bg-surface"
      aria-label="Platform capabilities"
    >
      <SectionBackdrop image="arenaNight" tone="surface" strength={0.1} />
      <div className="container-page relative z-10">
        <div className="grid lg:grid-cols-2 lg:gap-10 xl:gap-16">
          <div className="relative hidden lg:block">
            <div className="sticky top-24 flex h-[calc(100dvh-6rem)] flex-col justify-center py-12">
              <div className="overflow-hidden rounded-2xl border border-border bg-card shadow-[var(--shadow-card)]">
                <div
                  className="flex will-change-transform"
                  style={{
                    width: `${panels.length * 100}%`,
                    transform: `translate3d(-${(slideProgress / panels.length) * 100}%, 0, 0)`,
                  }}
                >
                  {panels.map((panel, panelIndex) => (
                    <div
                      key={panel.title}
                      className="relative aspect-[4/3] shrink-0 overflow-hidden bg-ink/5"
                      style={{ width: `${100 / panels.length}%` }}
                    >
                      <img
                        src={panel.image}
                        alt={panel.imageAlt}
                        width={1200}
                        height={900}
                        loading={panelIndex === 0 ? "eager" : "lazy"}
                        className="size-full object-cover"
                      />
                      <div
                        className="pointer-events-none absolute inset-0 bg-linear-to-t from-dark/35 via-transparent to-transparent"
                        aria-hidden
                      />
                    </div>
                  ))}
                </div>
              </div>

              <div className="relative mt-6 h-12 overflow-hidden">
                {panels.map((panel, i) => (
                  <p
                    key={panel.caption}
                    className={`absolute inset-x-0 text-center font-mono text-[11px] tracking-[0.18em] text-muted-foreground uppercase transition-all duration-500 ${
                      i === activeIndex
                        ? "translate-y-0 opacity-100"
                        : i < activeIndex
                          ? "-translate-y-3 opacity-0"
                          : "translate-y-3 opacity-0"
                    }`}
                  >
                    {panel.caption}
                  </p>
                ))}
              </div>

              <div className="mt-4 flex justify-center gap-1.5" aria-hidden>
                {panels.map((panel, i) => (
                  <span
                    key={panel.kicker}
                    className={`h-1 rounded-full bg-primary transition-all duration-500 ${
                      i === activeIndex ? "w-8 opacity-100" : "w-2 opacity-35"
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>

          <div className="lg:py-6">
            {panels.map((panel, i) => (
              <article
                key={panel.title}
                className="sticky-scroll-panel flex min-h-[88dvh] flex-col justify-center py-16 lg:min-h-[100dvh] lg:py-24"
              >
                <div className="mb-8 overflow-hidden rounded-xl border border-border bg-card lg:hidden">
                  <img
                    src={panel.image}
                    alt={panel.imageAlt}
                    width={1200}
                    height={900}
                    loading="lazy"
                    className="aspect-[16/10] w-full object-cover"
                  />
                </div>

                <p className="section-eyebrow text-primary">
                  {panel.kicker}
                </p>
                <p className="mt-3 font-display text-sm font-semibold tracking-[0.08em] text-muted-foreground uppercase">
                  {panel.title}
                </p>
                <h2 className="mt-6 max-w-xl text-[clamp(2rem,4.5vw,3.25rem)] leading-[1.05] font-bold tracking-tight text-foreground uppercase">
                  {panel.headline}
                  <br />
                  <span className="text-primary">{panel.accent}</span>
                </h2>
                <p className="mt-6 max-w-lg text-base leading-relaxed text-muted-foreground">
                  {panel.body}
                </p>
                <ul className="mt-8 space-y-3 border-l-2 border-primary/35 pl-4">
                  {panel.points.map((point) => (
                    <li
                      key={point}
                      className="text-sm leading-relaxed text-foreground/85"
                    >
                      {point}
                    </li>
                  ))}
                </ul>

                <span className="mt-10 font-mono text-[10px] tracking-widest text-muted-foreground/80 uppercase">
                  {String(i + 1).padStart(2, "0")} / {String(panels.length).padStart(2, "0")}
                </span>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
