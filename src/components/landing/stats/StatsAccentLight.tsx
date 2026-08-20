import { useEffect, useState, type CSSProperties } from "react";
import { Building2, CalendarRange, Globe2, Network } from "lucide-react";
import { Reveal, useInView } from "@/hooks/use-scroll-motion";

const SHUFFLE_MS = 920;
const STAGGER_MS = 75;
const HOLD_MS = 140;

const stats = [
  {
    icon: CalendarRange,
    value: "30+",
    label: "Years in ticketing",
    desc: "Three decades building technology for the global ticketing ecosystem.",
    hero: true,
  },
  {
    icon: Building2,
    value: "10K+",
    label: "B2B partners",
    desc: "Brokers, B2B partners and marketplaces connected through SeatsBrokers.",
    hero: false,
  },
  {
    icon: Network,
    value: "16",
    label: "Connected marketplaces",
    desc: "Resale marketplaces synchronized through centralized API infrastructure.",
    hero: false,
  },
  {
    icon: Globe2,
    value: "165",
    label: "Countries supported",
    desc: "Global infrastructure for high-volume ticket operations.",
    hero: false,
  },
] as const;

type WalletPhase = "wallet" | "shuffle" | "spread";

export function StatsAccentLight() {
  const { ref, inView } = useInView<HTMLElement>(0.22, {
    once: false,
    rootMargin: "-10% 0px -12% 0px",
  });
  const [phase, setPhase] = useState<WalletPhase>("wallet");

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setPhase("spread");
    }
  }, []);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setPhase("spread");
      return;
    }
    if (!inView) {
      setPhase("wallet");
      return;
    }
    if (phase !== "wallet") return;
    const start = window.setTimeout(() => setPhase("shuffle"), HOLD_MS);
    return () => window.clearTimeout(start);
  }, [inView, phase]);

  useEffect(() => {
    if (phase !== "shuffle") return;
    const done = window.setTimeout(
      () => setPhase("spread"),
      SHUFFLE_MS + STAGGER_MS * (stats.length - 1) + 40,
    );
    return () => window.clearTimeout(done);
  }, [phase]);

  return (
    <section
      ref={ref}
      className="stats-wallet section-curve relative isolate bg-white py-16 sm:py-24"
      aria-labelledby="stats-accent-heading"
      data-phase={phase}
    >
      <div className="stats-wallet-shade pointer-events-none absolute inset-0" aria-hidden />

      <div className="container-page relative z-10">
        <Reveal>
          <p className="section-eyebrow text-primary">By the numbers</p>
          <h2
            id="stats-accent-heading"
            className="mt-4 max-w-xl font-display text-4xl font-bold leading-[1.1] tracking-tight text-foreground sm:text-5xl"
          >
            Technology built for ticketing.
          </h2>
        </Reveal>

        <div className="stats-wallet-stage mt-12 sm:mt-14">
          {stats.map((s, i) => {
            const Icon = s.icon;
            const index = String(i + 1).padStart(2, "0");
            return (
              <article
                key={s.label}
                className="stats-wallet-card"
                data-hero={s.hero ? "true" : "false"}
                style={{ "--sw-i": i } as CSSProperties}
              >
                <span className="stats-wallet-edge" aria-hidden />
                <div className="stats-wallet-card-face">
                  <div className="stats-wallet-card-top">
                    <span className="stats-wallet-index">{index}</span>
                    <span className="stats-wallet-icon" aria-hidden>
                      <Icon className="size-[1.05rem]" strokeWidth={1.75} />
                    </span>
                  </div>
                  <div className="stats-wallet-value">{s.value}</div>
                  <p className="stats-wallet-label">{s.label}</p>
                  <p className="stats-wallet-desc">{s.desc}</p>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
