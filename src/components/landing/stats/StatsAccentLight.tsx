import { Reveal } from "@/hooks/use-scroll-motion";

const heroStat = {
  icon: "◎",
  value: "30+",
  label: "Years in Ticketing",
  desc: "Three decades of trusted secondary-market operations — longer than nearly every platform built after us.",
};

const stats = [
  {
    icon: "⌂",
    value: "10K+",
    label: "Partner Network",
    desc: "Brokers and travel partners trading through SeatsBrokers.",
  },
  {
    icon: "▤",
    value: "2M+",
    label: "Tickets Delivered",
    desc: "Cumulative live-event tickets fulfilled since launch.",
  },
  {
    icon: "★",
    value: "4.7/5",
    label: "Partner Rating",
    desc: "Average score across independent seller reviews.",
  },
] as const;

export function StatsAccentLight() {
  return (
    <section
      className="section-curve bg-background py-20 sm:py-24"
      aria-labelledby="stats-accent-heading"
    >
      <div className="container-page">
        <Reveal>
          <p className="font-mono text-[11px] tracking-[0.24em] text-primary uppercase">
            By The Numbers
          </p>
          <h2
            id="stats-accent-heading"
            className="mt-4 max-w-xl font-display text-4xl font-bold leading-[1.1] tracking-tight text-foreground sm:text-5xl"
          >
            Thirty years in. Still moving faster.
          </h2>
        </Reveal>

        <div className="mt-14 grid gap-6 lg:grid-cols-3">
          <Reveal className="lg:row-span-2">
            <div className="flex h-full min-h-[280px] flex-col justify-between rounded-2xl bg-primary p-9 text-primary-foreground">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary-foreground/15 font-mono text-lg">
                {heroStat.icon}
              </div>
              <div>
                <div className="mt-8 font-mono text-6xl font-bold tracking-tight sm:text-7xl">
                  {heroStat.value}
                </div>
                <p className="mt-4 text-lg font-semibold">{heroStat.label}</p>
                <p className="mt-2 max-w-xs text-sm leading-relaxed text-primary-foreground/75">
                  {heroStat.desc}
                </p>
              </div>
            </div>
          </Reveal>

          {stats.map((s, i) => (
            <Reveal key={s.label} delay={i * 90}>
              <div className="relative h-full overflow-hidden rounded-2xl border border-border bg-card p-7 pl-8">
                <span className="absolute inset-y-0 left-0 w-1 bg-primary" aria-hidden />
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 font-mono text-base text-primary">
                  {s.icon}
                </div>
                <div className="mt-5 font-mono text-3xl font-bold tracking-tight text-foreground">
                  {s.value}
                </div>
                <p className="mt-2 text-sm font-semibold text-foreground">{s.label}</p>
                <p className="mt-1.5 text-[13px] leading-relaxed text-muted-foreground">
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
