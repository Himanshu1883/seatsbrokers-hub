import type { LucideIcon } from "lucide-react";
import {
  Code2,
  RefreshCw,
  RotateCcw,
  ShieldCheck,
  Ticket,
  Webhook,
} from "lucide-react";
import { Reveal } from "@/hooks/use-scroll-motion";
import { ConsoleShell } from "@/components/pages/brokers/ConsoleShell";
import { apiHookEvents, apiHookPipeline, apiInfra, type ApiInfraId } from "@/content/api-hero-data";

const infraIcons: Record<ApiInfraId, LucideIcon> = {
  "api-first": Code2,
  "real-time-sync": RefreshCw,
  "role-based-access": ShieldCheck,
  webhooks: Webhook,
  "retry-and-ack": RotateCcw,
  "ticketing-native": Ticket,
};

export function ApiInfraBoard() {
  return (
    <section
      className="api-infra-section section-curve relative isolate scroll-mt-24 bg-background py-20 sm:py-24"
      aria-labelledby="api-infra-title"
    >
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-border to-transparent"
        aria-hidden
      />

      <div className="container-page relative z-10">
        <Reveal>
          <div className="api-infra-header">
            <p className="section-eyebrow text-primary">{apiInfra.eyebrow}</p>
            <h2 id="api-infra-title">{apiInfra.title}</h2>
            <p>{apiInfra.intro}</p>
          </div>
        </Reveal>

        <Reveal delay={80} className="api-infra-grid-wrap">
          <ul className="api-infra-grid">
            {apiInfra.items.map((item) => {
              const Icon = infraIcons[item.id];
              return (
                <li key={item.id}>
                  <article className="api-infra-card">
                    <header className="api-infra-card-head">
                      <span className="api-infra-icon" aria-hidden>
                        <Icon className="size-5" strokeWidth={1.75} />
                      </span>
                      <span className="api-infra-index">{item.index}</span>
                    </header>
                    <h3>{item.title}</h3>
                    <p>{item.body}</p>
                  </article>
                </li>
              );
            })}
          </ul>
        </Reveal>

        <Reveal delay={140} className="api-infra-desk-wrap">
          <ConsoleShell path="seatsbrokers / api / infrastructure" status="Ready" icon={Code2}>
            <div className="api-infra-desk">
              <header className="api-infra-desk-head">
                <span>Infrastructure contract</span>
                <span className="lc-mono">Bearer · HMAC · audit</span>
              </header>

              <ol className="api-infra-pipe" aria-label="Webhook delivery pipeline">
                {apiHookPipeline.map((step) => (
                  <li key={step.id}>
                    <strong>{step.label}</strong>
                    <em>{step.detail}</em>
                  </li>
                ))}
              </ol>

              <ul className="api-infra-ledger">
                {apiInfra.items.map((item) => {
                  const Icon = infraIcons[item.id];
                  return (
                    <li key={item.id}>
                      <span className="api-infra-ledger-icon" aria-hidden>
                        <Icon className="size-3.5" strokeWidth={1.75} />
                      </span>
                      <strong>{item.title}</strong>
                      <span className="lc-mono">{item.signal}</span>
                    </li>
                  );
                })}
              </ul>

              <ul className="api-infra-events" aria-label="Webhook event types">
                {apiHookEvents.map((event) => (
                  <li key={event.id}>{event.type}</li>
                ))}
              </ul>
            </div>
          </ConsoleShell>
        </Reveal>
      </div>
    </section>
  );
}
