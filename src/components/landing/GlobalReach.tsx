import { Reveal } from "@/hooks/use-scroll-motion";
import { SectionBackdrop } from "@/components/landing/SectionBackdrop";

const pillars = [
  { title: "Global event catalog", body: "Football, rugby, cricket, tennis, Formula 1, boxing, music, theatre, arts and festivals." },
  { title: "API-first architecture", body: "Connect POS, ERP, websites and partner systems through secure, documented APIs." },
  { title: "Real-time synchronization", body: "Inventory, pricing and order data synchronized across marketplaces in real time." },
  { title: "Scalable infrastructure", body: "Built for high-volume ticket operations with monitoring, audit logs and data protection." },
];

export function GlobalReach() {
  return (
    <section id="network" className="section-curve relative isolate scroll-mt-24 overflow-x-clip bg-background py-16 sm:py-24">
      <SectionBackdrop image="motorsport" tone="light" strength={0.1} />
      <div className="container-page relative z-10 grid gap-14 lg:grid-cols-2 lg:items-center">
        <Reveal>
          <p className="section-eyebrow text-primary">
            Infrastructure
          </p>
          <h2 className="mt-4 text-3xl font-bold text-foreground sm:text-4xl">
            Infrastructure Built for High-Volume Ticket Operations
          </h2>
          <p className="mt-5 text-sm leading-relaxed text-muted-foreground">
            API-first architecture, secure authentication, role-based access, audit logs, automated
            synchronization, real-time inventory workflows, monitoring and scalable infrastructure —
            built for the global event economy.
          </p>
          <dl className="mt-10 grid gap-6 sm:grid-cols-2">
            {pillars.map((p, i) => (
              <Reveal key={p.title} delay={i * 80}>
                <dt className="text-sm font-semibold text-foreground">{p.title}</dt>
                <dd className="mt-1.5 text-sm text-muted-foreground">{p.body}</dd>
              </Reveal>
            ))}
          </dl>
        </Reveal>

        <Reveal delay={140}>
          <div className="rounded-2xl border border-border bg-surface p-8">
            <div className="grid grid-cols-2 gap-6">
              {[
                ["API-First", "Architecture"],
                ["Real-Time", "Synchronization"],
                ["AI & ML", "Pricing engine"],
                ["24/7", "Platform monitoring"],
              ].map(([v, l]) => (
                <div key={l} className="rounded-xl border border-border bg-card p-5">
                  <div className="font-mono text-xl font-bold break-words text-primary sm:text-2xl">{v}</div>
                  <div className="mt-1.5 text-xs tracking-wide text-muted-foreground uppercase">
                    {l}
                  </div>
                </div>
              ))}
            </div>
            <p className="mt-6 text-xs text-muted-foreground">
              London · New York · Dubai — three offices, one technology platform.
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
