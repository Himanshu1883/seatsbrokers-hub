import { useEffect, useRef, useState, type ReactNode } from "react";
import {
  Box,
  CreditCard,
  Globe,
  Layers3,
  Link2,
  PlugZap,
  RefreshCw,
  Search,
  ShieldCheck,
  ShoppingCart,
  TrendingUp,
  type LucideIcon,
} from "lucide-react";
import { useTypewriter } from "@/hooks/use-scroll-motion";
import { HeroWorkflowConsole } from "@/components/landing/HeroWorkflowConsole";
import { useDemoModal } from "@/components/landing/DemoModal";
import { SiteLink } from "@/components/layout/SiteLink";
import { ctas } from "@/content/site";
import heroStadium1 from "@/assets/hero-stadium-1.webp";
import heroStadium2 from "@/assets/hero-stadium-2.jpg";
import heroStadium3 from "@/assets/hero-stadium-3.jpg";

const BANNER_MS = 3000;
const RAIL_PX_PER_SEC = 92;

const banners = [
  { src: heroStadium1, alt: "Stadium at night" },
  { src: heroStadium2, alt: "Crowd filling a stadium bowl" },
  { src: heroStadium3, alt: "Floodlit stadium stands" },
] as const;

const typePhrases = [
  "ticket businesses.",
  "broker operations.",
  "global ticket sales.",
];

const highlights: readonly { icon: LucideIcon; title: string; note: string }[] = [
  { icon: Layers3, title: "One inventory layer", note: "Across all channels" },
  { icon: PlugZap, title: "Keep your systems", note: "POS, ERP, inventory" },
  { icon: RefreshCw, title: "Real-time sync", note: "Accurate & reliable" },
  { icon: ShieldCheck, title: "Built for brokers", note: "Ticket brokers first" },
];

const rail: readonly { icon: LucideIcon; step: string; note: string }[] = [
  { icon: Search, step: "Discover", note: "Market intelligence" },
  { icon: Box, step: "Source", note: "Find & secure inventory" },
  { icon: TrendingUp, step: "Price", note: "AI pricing intelligence" },
  { icon: Link2, step: "Connect", note: "System & channel connectivity" },
  { icon: Globe, step: "Distribute", note: "Global channel distribution" },
  { icon: ShoppingCart, step: "Sell", note: "Quotes, orders & CRM" },
  { icon: CreditCard, step: "Settle", note: "Payments & settlements" },
];

const longestPhrase = typePhrases.reduce(
  (longest, phrase) => (phrase.length > longest.length ? phrase : longest),
  typePhrases[0] ?? "",
);

/* The ghost copy reserves the width of the longest phrase so the headline
   line-box never reflows while the typewriter types and deletes. */
function HeroTypeLine({ children }: { children: ReactNode }) {
  return (
    <span className="hh-type" aria-live="polite">
      <span className="hh-type-ghost" aria-hidden>
        {longestPhrase}
      </span>
      <span className="hh-type-text caret">{children}</span>
    </span>
  );
}

function HeroTypewriter() {
  const [reduced, setReduced] = useState(false);
  const typed = useTypewriter([...typePhrases], 62, 2200, !reduced);

  useEffect(() => {
    setReduced(window.matchMedia("(prefers-reduced-motion: reduce)").matches);
  }, []);

  return <HeroTypeLine>{reduced ? longestPhrase : typed}</HeroTypeLine>;
}

function HeroRail() {
  const trackRef = useRef<HTMLOListElement>(null);
  const pausedRef = useRef(false);
  const loop = [...rail, ...rail];

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const slider = window.matchMedia("(max-width: 899px)");
    let raf = 0;
    let last = performance.now();

    const tick = (now: number) => {
      raf = window.requestAnimationFrame(tick);
      if (!slider.matches || pausedRef.current) {
        last = now;
        return;
      }

      const half = track.scrollWidth / 2;
      if (half <= 1) {
        last = now;
        return;
      }

      const dt = Math.min(48, now - last);
      last = now;
      let next = track.scrollLeft + (RAIL_PX_PER_SEC * dt) / 1000;
      if (next >= half) next -= half;
      track.scrollLeft = next;
    };

    raf = window.requestAnimationFrame(tick);

    const pause = () => {
      pausedRef.current = true;
    };
    const resume = () => {
      pausedRef.current = false;
      last = performance.now();
    };

    track.addEventListener("pointerdown", pause);
    window.addEventListener("pointerup", resume);
    track.addEventListener("pointercancel", resume);
    track.addEventListener("mouseenter", pause);
    track.addEventListener("mouseleave", resume);

    return () => {
      window.cancelAnimationFrame(raf);
      track.removeEventListener("pointerdown", pause);
      window.removeEventListener("pointerup", resume);
      track.removeEventListener("pointercancel", resume);
      track.removeEventListener("mouseenter", pause);
      track.removeEventListener("mouseleave", resume);
    };
  }, []);

  return (
    <div className="hh-rail hh-in hh-in-6">
      <ol ref={trackRef} className="hh-rail-track" aria-label="SeatsBrokers workflow">
        {loop.map(({ icon: Icon, step, note }, index) => (
          <li
            key={`${step}-${index}`}
            className="hh-rail-item"
            data-clone={index >= rail.length ? "true" : "false"}
            aria-hidden={index >= rail.length}
          >
            <span className="hh-rail-icon" aria-hidden>
              <Icon strokeWidth={1.75} />
            </span>
            <span className="hh-rail-copy">
              <strong>{step}</strong>
              <span>{note}</span>
            </span>
            {index < rail.length - 1 && (
              <span className="hh-rail-arrow" aria-hidden>
                →
              </span>
            )}
          </li>
        ))}
      </ol>
      <p className="hh-rail-caption">One connected workflow. Seven powerful products.</p>
    </div>
  );
}

export function Hero() {
  const { openDemoModal } = useDemoModal();
  const [banner, setBanner] = useState(0);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const id = window.setInterval(() => {
      setBanner((i) => (i + 1) % banners.length);
    }, BANNER_MS);
    return () => window.clearInterval(id);
  }, []);

  return (
    <section id="top" className="section-curve-hero hh-hero">
      <div className="hh-bg" aria-hidden>
        {banners.map((shot, i) => (
          <div key={shot.src} className="hh-bg-slide" data-active={i === banner ? "true" : "false"}>
            <img
              src={shot.src}
              alt=""
              width={1920}
              height={1080}
              fetchPriority={i === 0 ? "high" : "low"}
              className="hh-bg-img"
            />
          </div>
        ))}
        <span className="hh-veil hh-veil-radial" />
        <span className="hh-veil hh-veil-vertical" />
        <span className="hh-veil hh-veil-horizontal" />
      </div>

      <div className="hh-inner container-page">
        <div className="hh-grid">
          <div className="hh-copy">
            <p className="hh-pill hh-in hh-in-1">
              <span className="hh-pill-dot" aria-hidden />
              One platform
            </p>

            <h1 className="hh-title hh-in hh-in-2">
              Technology powering
              <span className="hh-title-line">
                professional <HeroTypewriter />
              </span>
            </h1>

            <p className="hh-lead hh-in hh-in-3">
              Connect your inventory once and manage distribution, pricing, orders, delivery and
              payments from one intelligent infrastructure layer.
            </p>

            <div className="hh-ctas hh-in hh-in-4">
              <button type="button" onClick={openDemoModal} className="hh-cta hh-cta-solid lift">
                {ctas.bookDemo.label}
              </button>
              <SiteLink to={ctas.becomeSeller.to} className="hh-cta hh-cta-ghost lift">
                {ctas.becomeSeller.label}
              </SiteLink>
            </div>

            <ul className="hh-features hh-in hh-in-5">
              {highlights.map(({ icon: Icon, title, note }) => (
                <li key={title} className="hh-feature">
                  <span className="hh-feature-icon" aria-hidden>
                    <Icon strokeWidth={1.75} />
                  </span>
                  <span className="hh-feature-copy">
                    <strong>{title}</strong>
                    <span>{note}</span>
                  </span>
                </li>
              ))}
            </ul>
          </div>

          <div className="hh-console hh-in hh-in-4">
            <HeroWorkflowConsole />
          </div>
        </div>

        <HeroRail />
      </div>
    </section>
  );
}
