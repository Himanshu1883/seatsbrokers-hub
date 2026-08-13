import { Reveal } from "@/hooks/use-scroll-motion";

const heroStat = {
  icon: "◎",
  value: "30+",
  label: "Years in Ticketing",
  desc: "Three decades building technology for the global ticketing ecosystem.",
};

const stats = [
  {
    icon: "⌂",
    value: "10K+",
    label: "B2B Partners",
    desc: "Brokers, travel partners and marketplaces connected through SeatsBrokers.",
  },
  {
    icon: "▤",
    value: "32",
    label: "Connected Marketplaces",
    desc: "Resale marketplaces synchronized through centralized API infrastructure.",
  },
  {
    icon: "★",
    value: "165",
    label: "Countries Supported",
    desc: "Global infrastructure for high-volume ticket operations.",
  },
] as const;

export function StatsAccentLight() {
  return (
    <section
      className="section-curve relative isolate overflow-hidden bg-white py-20 sm:py-24"
      aria-labelledby="stats-accent-heading"
    >
      {/* Soft mint + cool grey overlapping shade */}
      <div className="pointer-events-none absolute inset-0" aria-hidden>
        <div
          className="absolute -top-8 -left-10 h-[55%] w-[58%] rounded-[2.5rem] bg-[#e8eaee]/70"
          style={{ transform: "rotate(-18deg) skewX(-8deg)" }}
        />
        <div
          className="absolute -right-6 -bottom-10 h-[60%] w-[62%] rounded-[2.5rem] bg-[#b8f0dc]/55"
          style={{ transform: "rotate(-18deg) skewX(-8deg)" }}
        />
        <div
          className="absolute top-[18%] left-[22%] h-[48%] w-[52%] rounded-[2.5rem] bg-[#c5ebe0]/35"
          style={{ transform: "rotate(-18deg) skewX(-8deg)" }}
        />
      </div>

      <div className="container-page relative z-10">
        <Reveal>
          <p className="section-eyebrow text-primary">
            By The Numbers
          </p>
          <h2
            id="stats-accent-heading"
            className="mt-4 max-w-xl font-display text-4xl font-bold leading-[1.1] tracking-tight text-foreground sm:text-5xl"
          >
            Technology built for ticketing.
          </h2>
        </Reveal>

        <div className="mt-14 grid gap-6 lg:grid-cols-3">
          <Reveal className="lg:row-span-2">
            <div className="relative flex h-full min-h-[280px] flex-col justify-between overflow-hidden rounded-2xl border border-[#9fd9c4]/50 bg-[#d8f5ea]/85 p-9 text-foreground shadow-[0_20px_50px_-36px_rgba(25,135,84,0.35)] backdrop-blur-sm">
              <div
                className="pointer-events-none absolute -right-8 -bottom-10 h-40 w-48 rounded-[2rem] bg-[#b8f0dc]/70"
                style={{ transform: "rotate(-18deg) skewX(-8deg)" }}
                aria-hidden
              />
              <div
                className="pointer-events-none absolute top-6 right-8 h-24 w-28 rounded-[1.5rem] bg-[#e8eaee]/80"
                style={{ transform: "rotate(-18deg) skewX(-8deg)" }}
                aria-hidden
              />

              <div className="relative flex h-11 w-11 items-center justify-center rounded-xl bg-white/70 font-mono text-lg text-primary ring-1 ring-[#9fd9c4]/60">
                {heroStat.icon}
              </div>
              <div className="relative">
                <div className="mt-8 font-mono text-6xl font-bold tracking-tight text-primary-deep sm:text-7xl">
                  {heroStat.value}
                </div>
                <p className="mt-4 text-lg font-semibold text-foreground">
                  {heroStat.label}
                </p>
                <p className="mt-2 max-w-xs text-sm leading-relaxed text-foreground/65">
                  {heroStat.desc}
                </p>
              </div>
            </div>
          </Reveal>

          {stats.map((s, i) => (
            <Reveal key={s.label} delay={i * 90}>
              <div className="relative h-full overflow-hidden rounded-2xl border border-[#d7dde5]/90 bg-white/75 p-7 pl-8 shadow-[0_14px_36px_-30px_rgba(15,23,42,0.28)] backdrop-blur-sm">
                <span
                  className="absolute inset-y-0 left-0 w-1 bg-[#7ed6b5]"
                  aria-hidden
                />
                <div
                  className="pointer-events-none absolute -right-6 -bottom-8 h-24 w-28 rounded-[1.25rem] bg-[#b8f0dc]/40"
                  style={{ transform: "rotate(-18deg) skewX(-8deg)" }}
                  aria-hidden
                />
                <div className="relative flex h-10 w-10 items-center justify-center rounded-lg bg-[#d8f5ea] font-mono text-base text-primary">
                  {s.icon}
                </div>
                <div className="relative mt-5 font-mono text-3xl font-bold tracking-tight text-foreground">
                  {s.value}
                </div>
                <p className="relative mt-2 text-sm font-semibold text-foreground">
                  {s.label}
                </p>
                <p className="relative mt-1.5 text-[13px] leading-relaxed text-muted-foreground">
                  {s.desc}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
