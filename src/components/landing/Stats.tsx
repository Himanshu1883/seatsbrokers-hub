import { Reveal, useCountUp } from "@/hooks/use-scroll-motion";

const stats = [
  { value: 2, suffix: "M+", label: "Tickets delivered", decimals: 0 },
  { value: 1, suffix: "K+", label: "Venues served", decimals: 0 },
  { value: 10, suffix: "K+", label: "Partner network", decimals: 0 },
  { value: 30, suffix: "+", label: "Years in market", decimals: 0 },
  { value: 3, suffix: "", label: "Global offices", decimals: 0 },
  { value: 4.7, suffix: "/5", label: "Partner rating", decimals: 1 },
];

function Stat({ value, suffix, label, decimals }: (typeof stats)[number]) {
  const { ref, value: current } = useCountUp(value);
  return (
    <div ref={ref} className="border-l border-border pl-5">
      <div className="font-mono text-3xl font-bold text-primary sm:text-4xl">
        {current.toFixed(decimals)}
        {suffix}
      </div>
      <div className="mt-2 text-xs tracking-wide text-muted-foreground uppercase">{label}</div>
    </div>
  );
}

export function Stats() {
  return (
    <section className="border-y border-border bg-surface py-20">
      <div className="container-page">
        <Reveal>
          <p className="font-mono text-[11px] tracking-[0.2em] text-muted-foreground uppercase">
            The numbers behind the network
          </p>
        </Reveal>
        <div className="mt-10 grid gap-y-10 sm:grid-cols-3 lg:grid-cols-6">
          {stats.map((s) => (
            <Stat key={s.label} {...s} />
          ))}
        </div>
      </div>
    </section>
  );
}