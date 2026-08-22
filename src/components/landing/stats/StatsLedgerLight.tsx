import { Reveal } from "@/hooks/use-scroll-motion";
import { SectionBackdrop } from "@/components/landing/SectionBackdrop";

const stats = [
  {
    icon: "◎",
    value: "30+",
    label: "Years of experience",
    desc: "Built on more than 30 years of ticketing experience.",
  },
  {
    icon: "⌂",
    value: "B2B",
    label: "Professional network",
    desc: "Built for professional ticket brokers, resellers and suppliers.",
  },
  {
    icon: "▤",
    value: "Multi",
    label: "Connected marketplaces",
    desc: "List once and distribute across connected marketplaces and sales channels.",
  },
  {
    icon: "★",
    value: "Global",
    label: "Distribution",
    desc: "Reach buyers through global distribution.",
  },
] as const;

function CrosshairTicks() {
  return (
    <div className="pointer-events-none absolute inset-0" aria-hidden>
      <span className="absolute left-0 top-0 h-2.5 w-px bg-foreground/15" />
      <span className="absolute left-0 top-0 h-px w-2.5 bg-foreground/15" />
      <span className="absolute bottom-0 right-0 h-2.5 w-px bg-foreground/15" />
      <span className="absolute bottom-0 right-0 h-px w-2.5 bg-foreground/15" />
    </div>
  );
}

export function StatsLedgerLight() {
  return (
    <section
      className="section-curve stats-ledger relative isolate py-20 sm:py-24"
      aria-labelledby="stats-ledger-heading"
    >
      <SectionBackdrop image="basketball" tone="surface" strength={0.09} />
      <div className="container-page relative z-10">
        <Reveal>
          <div className="flex items-center gap-3">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-60" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-primary" />
            </span>
            <p className="section-eyebrow text-muted-foreground">
              Network Metrics · Updated Live
            </p>
          </div>
          <h2
            id="stats-ledger-heading"
            className="mt-5 max-w-xl font-display text-3xl font-bold tracking-tight text-foreground sm:text-4xl"
          >
            Scale you can measure.
          </h2>
        </Reveal>

        <Reveal delay={100}>
          <div className="relative mt-14 grid grid-cols-2 border-t border-l border-border lg:grid-cols-4">
            {stats.map((s) => (
              <div key={s.label} className="relative border-b border-r border-border bg-card/50 p-7">
                <CrosshairTicks />
                <div className="flex items-center justify-between">
                  <span className="font-mono text-sm text-primary">{s.icon}</span>
                  <span className="font-mono text-[10px] tracking-[0.16em] text-muted-foreground/60 ">
                    Live
                  </span>
                </div>
                <div className="mt-6 font-mono text-3xl font-bold tracking-tight text-foreground lg:text-[2.1rem]">
                  {s.value}
                </div>
                <p className="mt-3 text-sm font-semibold text-foreground">{s.label}</p>
                <p className="mt-1.5 text-[13px] leading-relaxed text-muted-foreground">{s.desc}</p>
                <div className="mt-5 h-[3px] w-full bg-border">
                  <div className="stats-ledger-bar h-full w-full origin-left bg-primary" />
                </div>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
