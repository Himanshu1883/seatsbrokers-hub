import { Reveal } from "@/hooks/use-scroll-motion";
import { SectionBackdrop } from "@/components/landing/SectionBackdrop";

const stats = [
  {
    icon: "◎",
    value: "30+",
    label: "Years in Ticketing",
    desc: "Three decades of trusted secondary-market operations.",
  },
  {
    icon: "⌂",
    value: "10K+",
    label: "Partner Network",
    desc: "Brokers and B2B partners trading through SeatsBrokers.",
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

export function StatsGlowLight() {
  return (
    <section
      className="section-curve relative isolate bg-surface py-20 sm:py-24"
      aria-labelledby="stats-glow-heading"
    >
      <SectionBackdrop image="footballNight" tone="surface" strength={0.1} />
      <div className="container-page relative z-10">
        <Reveal>
          <h2
            id="stats-glow-heading"
            className="mx-auto max-w-2xl text-center font-display text-4xl font-bold leading-[1.1] tracking-tight text-foreground sm:text-5xl"
          >
            The infrastructure behind{" "}
            <span className="text-primary">the majority of ticket resale.</span>
          </h2>
        </Reveal>

        <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((s, i) => (
            <Reveal key={s.label} delay={i * 80}>
              <div className="stats-glow-card group relative h-full rounded-2xl border border-border bg-card p-7 transition-all duration-300 hover:-translate-y-1">
                <div
                  className="stats-glow-card-halo pointer-events-none absolute -inset-px rounded-2xl opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                  aria-hidden
                />
                <div className="relative flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10 font-mono text-lg text-primary">
                  {s.icon}
                </div>
                <div className="relative mt-6 font-mono text-4xl font-bold tracking-tight text-foreground">
                  {s.value}
                </div>
                <p className="relative mt-3 text-sm font-semibold text-foreground">{s.label}</p>
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
