import { useEffect, useRef, useState } from "react";
import { SectionBackdrop } from "@/components/landing/SectionBackdrop";
import {
  StickyScrollConsole,
  type StickyScrollConsoleKind,
} from "@/components/landing/StickyScrollConsoles";

const panels = [
  {
    kind: "brokers" as const satisfies StickyScrollConsoleKind,
    kicker: "Ticket brokers",
    title: "Manage inventory, pricing and distribution",
    headline: "Inventory → SeatsBrokers →",
    accent: "Marketplaces → Sale",
    body: "Run your ticket business from one technology platform — global event catalog, inventory management, marketplace distribution and AI pricing.",
    points: [
      "Multi-marketplace synchronization with automatic delisting",
      "Market pricing, sales intelligence and event onsale information",
      "POS/API integration and payment infrastructure",
    ],
    consoleLabel: "Live broker distribution console: listings, channel sync and auto-delist",
    caption: "One platform. Every marketplace.",
  },
  {
    kind: "travel" as const satisfies StickyScrollConsoleKind,
    kicker: "Resellers",
    title: "Source inventory and sell through your channels",
    headline: "SeatsBrokers inventory →",
    accent: "Margin → Quote → Sale",
    body: "Professional resellers work from one inventory layer — find stock, set margins and move tickets through their own sales workflow.",
    points: [
      "Real-time inventory visibility across connected supply",
      "Custom margins and customer-ready quotes",
      "Order management without a separate quoting stack",
    ],
    consoleLabel: "Live reseller quote desk: margin, client price and share channels",
    caption: "One inventory layer. Your channels.",
  },
  {
    kind: "marketplaces" as const satisfies StickyScrollConsoleKind,
    kicker: "Inventory suppliers",
    title: "Feed supply into one inventory layer",
    headline: "Supplier stock →",
    accent: "SeatsBrokers → Brokers",
    body: "Suppliers connect inventory into SeatsBrokers so professional brokers can source, price and distribute from a single layer.",
    points: [
      "Inventory feeds into one shared layer",
      "Price and availability stay in sync",
      "Orders route back without a parallel stack",
    ],
    consoleLabel: "Live supplier sync console: listing fan-out, ask vs floor and channel lag",
    caption: "Supply in. Distribution out.",
  },
  {
    kind: "partners" as const satisfies StickyScrollConsoleKind,
    kicker: "Technology-driven operators",
    title: "Connect your stack to the platform",
    headline: "Your systems → SeatsLink™ →",
    accent: "Inventory → Distribution",
    body: "POS, inventory, ERP, websites and partner systems connect through API-first architecture built for ticketing.",
    points: [
      "Events, inventory, listing, order and pricing APIs",
      "Partner API for external systems",
      "Secure authentication and role-based access",
    ],
    consoleLabel: "Live operator API bridge: signed endpoints, roles and POS-to-distribution flow",
    caption: "Build on the platform.",
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
      id="who-its-for"
      className="sss-section section-curve-sticky relative isolate scroll-mt-24"
      aria-label="Who SeatsBrokers is for"
    >
      <div className="sss-shell" aria-hidden>
        <SectionBackdrop image="arenaNight" tone="surface" strength={0.1} />
      </div>
      <div className="container-page relative z-10">
        <div className="grid lg:grid-cols-2 lg:gap-10 xl:gap-16">
          <div className="relative hidden lg:block">
            <div className="sss-sticky sticky top-24">
              <div className="sss-sticky-stage">
                <div
                  className="sss-slider"
                  style={{
                    width: `${panels.length * 100}%`,
                    transform: `translate3d(-${(slideProgress / panels.length) * 100}%, 0, 0)`,
                  }}
                >
                  {panels.map((panel, panelIndex) => (
                    <div
                      key={panel.kind}
                      className="sss-slide"
                      style={{ width: `${100 / panels.length}%` }}
                    >
                      <StickyScrollConsole
                        kind={panel.kind}
                        live={panelIndex === activeIndex}
                        label={panel.consoleLabel}
                      />
                    </div>
                  ))}
                </div>
              </div>

              <div className="sss-caption">
                {panels.map((panel, i) => (
                  <p
                    key={panel.caption}
                    className={`sss-caption-line ${
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

              <div className="sss-dots" aria-hidden>
                {panels.map((panel, i) => (
                  <span
                    key={panel.kicker}
                    className={`sss-dot ${i === activeIndex ? "sss-dot-on" : ""}`}
                  />
                ))}
              </div>
            </div>
          </div>

          <div className="lg:py-6">
            {panels.map((panel, i) => (
              <article
                key={panel.title}
                className="sticky-scroll-panel flex min-h-0 flex-col justify-center py-12 sm:py-16 lg:min-h-[100dvh] lg:py-24"
              >
                <div className="sss-mobile mb-8 lg:hidden">
                  <StickyScrollConsole
                    kind={panel.kind}
                    live
                    label={panel.consoleLabel}
                  />
                </div>

                <p className="section-eyebrow text-primary">{panel.kicker}</p>
                <p className="mt-3 font-display text-sm font-semibold text-muted-foreground">
                  {panel.title}
                </p>
                <h2 className="mt-6 max-w-xl break-words text-[clamp(1.35rem,4.5vw,3.25rem)] leading-[1.05] font-bold tracking-tight text-foreground">
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

                <span className="mt-10 font-mono text-[10px] tracking-widest text-muted-foreground/80 ">
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
