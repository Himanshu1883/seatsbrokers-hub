import { Reveal, useTypewriter } from "@/hooks/use-scroll-motion";

const steps = [
  {
    n: "01",
    title: "Access inventory",
    body: "One platform, one contract, one curated global catalogue of live sport, music and entertainment inventory.",
  },
  {
    n: "02",
    title: "Integrate seamlessly",
    body: "Push and pull through our API, or run a white-label storefront inside the systems your team already uses.",
  },
  {
    n: "03",
    title: "Distribute globally",
    body: "Sell through your own channels, packages and marketplaces — we handle routing, fulfilment and settlement.",
  },
];

export function HowItWorks() {
  const typed = useTypewriter(["Brokers.", "Travel Agencies.", "Rights Holders."], 80);

  return (
    <section className="bg-background py-24">
      <div className="container-page">
        <Reveal>
          <p className="font-mono text-[11px] tracking-[0.2em] text-primary uppercase">
            How it works
          </p>
          <h2 className="mt-4 text-3xl font-bold text-foreground sm:text-4xl">
            Built for <span className="caret text-primary">{typed}</span>
          </h2>
        </Reveal>

        <div className="mt-14 space-y-6">
          {steps.map((s, i) => (
            <div
              key={s.n}
              className="sticky"
              style={{ top: `calc(6rem + ${i * 1.25}rem)`, zIndex: i + 1 }}
            >
              <Reveal>
                <div className="grid gap-6 rounded-2xl border border-border bg-card p-8 shadow-[var(--shadow-card)] md:grid-cols-[8rem_1fr] md:p-10">
                  <span className="font-mono text-4xl font-bold text-primary/25">{s.n}</span>
                  <div>
                    <h3 className="text-2xl font-bold text-foreground">{s.title}</h3>
                    <p className="mt-3 max-w-2xl text-sm leading-relaxed text-muted-foreground">
                      {s.body}
                    </p>
                  </div>
                </div>
              </Reveal>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}