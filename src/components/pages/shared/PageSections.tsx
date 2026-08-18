import type { LucideIcon } from "lucide-react";
import { CircleOff, RefreshCw, ShieldCheck, Upload } from "lucide-react";
import type { ReactNode } from "react";
import { Reveal } from "@/hooks/use-scroll-motion";
import { SiteLink } from "@/components/layout/SiteLink";
import { FeatureOrbitGrid } from "@/components/pages/shared/FeatureOrbitGrid";
import { WorkflowInfraCanvas } from "@/components/pages/shared/WorkflowInfraCanvas";
import { brand, ctas } from "@/content/site";

type PageHeroProps = {
  eyebrow: string;
  title: string;
  body: string;
  primaryCta?: { label: string; to: string; hash?: string };
  secondaryCta?: { label: string; to: string; hash?: string };
};

export function PageHero({
  eyebrow,
  title,
  body,
  primaryCta = ctas.becomeSeller,
  secondaryCta,
}: PageHeroProps) {
  return (
    <section className="bh-hero section-curve relative isolate scroll-mt-24 bg-dark text-background">
      <div className="pointer-events-none absolute inset-0 bg-linear-to-br from-dark via-dark to-primary-deep/40" aria-hidden />
      <div className="container-page relative z-10 max-w-3xl">
        <Reveal>
          <p className="section-eyebrow text-primary">{eyebrow}</p>
          <h1 className="mt-5 text-4xl font-bold leading-[1.08] tracking-tight sm:text-5xl lg:text-6xl">
            {title}
          </h1>
          <p className="mt-6 max-w-2xl text-base leading-relaxed text-background/75 sm:text-lg">
            {body}
          </p>
          <div className="mt-9 flex flex-wrap gap-3">
            <SiteLink
              to={primaryCta.to}
              hash={primaryCta.hash}
              className="lift rounded-md bg-primary px-6 py-3.5 text-sm font-semibold text-primary-foreground"
            >
              {primaryCta.label}
            </SiteLink>
            {secondaryCta ? (
              <SiteLink
                to={secondaryCta.to}
                hash={secondaryCta.hash}
                className="lift rounded-md border border-background/40 px-6 py-3.5 text-sm font-semibold text-background hover:bg-background/10"
              >
                {secondaryCta.label}
              </SiteLink>
            ) : null}
          </div>
        </Reveal>
      </div>
    </section>
  );
}

type FeatureGridProps = {
  eyebrow: string;
  title: string;
  intro?: string;
  items: { title: string; body: string }[];
};

export function FeatureGrid({ eyebrow, title, intro, items }: FeatureGridProps) {
  return (
    <section className="section-curve relative isolate bg-background py-20 sm:py-24">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-border to-transparent" aria-hidden />
      <div className="container-page relative z-10">
        <Reveal>
          <div className="mx-auto max-w-3xl text-center">
            <p className="section-eyebrow text-primary">{eyebrow}</p>
            <h2 className="mt-4 text-3xl font-bold text-foreground sm:text-4xl">{title}</h2>
            {intro ? (
              <p className="mt-4 text-sm leading-relaxed text-muted-foreground sm:text-base">{intro}</p>
            ) : null}
          </div>
        </Reveal>

        <Reveal delay={80} className="mt-12 lg:mt-14">
          <div className="fg-orbit-panel">
            <FeatureOrbitGrid items={items} />
          </div>
        </Reveal>
      </div>
    </section>
  );
}

type WorkflowStepsProps = {
  eyebrow: string;
  title: string;
  steps: string[];
};

export function WorkflowSteps({ eyebrow, title, steps }: WorkflowStepsProps) {
  return (
    <section className="section-curve relative isolate scroll-mt-24 bg-background py-20 sm:py-24">
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-border to-transparent"
        aria-hidden
      />
      <div className="container-page relative z-10">
        <Reveal>
          <p className="section-eyebrow text-primary">{eyebrow}</p>
          <h2 className="mt-4 max-w-3xl text-3xl font-bold tracking-tight text-foreground sm:text-4xl">{title}</h2>
        </Reveal>

        <Reveal delay={80} className="mt-12 lg:mt-14">
          <WorkflowInfraCanvas steps={steps} />
        </Reveal>
      </div>
    </section>
  );
}

type SplitPanelProps = {
  eyebrow: string;
  title: string;
  body: string;
  items: { label: string; value: string }[];
  reverse?: boolean;
  children?: ReactNode;
};

export function SplitPanel({
  eyebrow,
  title,
  body,
  items,
  reverse = false,
  children,
}: SplitPanelProps) {
  return (
    <section className="section-curve relative isolate bg-background py-20 sm:py-24">
      <div className="container-page relative z-10">
        <div className={`grid gap-10 lg:grid-cols-2 lg:items-center ${reverse ? "lg:[direction:rtl]" : ""}`}>
          <Reveal className={reverse ? "lg:[direction:ltr]" : ""}>
            <p className="section-eyebrow text-primary">{eyebrow}</p>
            <h2 className="mt-4 text-3xl font-bold text-foreground sm:text-4xl">{title}</h2>
            <p className="mt-4 text-sm leading-relaxed text-muted-foreground sm:text-base">{body}</p>
            <dl className="mt-8 space-y-4">
              {items.map((item) => (
                <div key={item.label} className="flex items-baseline justify-between gap-4 border-b border-border pb-3">
                  <dt className="text-sm text-muted-foreground">{item.label}</dt>
                  <dd className="font-mono text-sm font-semibold text-foreground">{item.value}</dd>
                </div>
              ))}
            </dl>
          </Reveal>
          <Reveal delay={100} className={reverse ? "lg:[direction:ltr]" : ""}>
            {children ?? (
              <div className="rounded-2xl border border-border bg-surface p-8">
                <div className="font-mono text-xs tracking-[0.18em] text-muted-foreground uppercase">
                  Demo data
                </div>
                <div className="mt-6 grid gap-4">
                  {items.map((item) => (
                    <div key={item.label} className="rounded-xl border border-border bg-card p-4">
                      <div className="text-xs text-muted-foreground">{item.label}</div>
                      <div className="mt-1 text-lg font-semibold text-foreground">{item.value}</div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </Reveal>
        </div>
      </div>
    </section>
  );
}

type SyncDiagramProps = {
  title: string;
  body: string;
  items?: { title: string; body: string }[];
  footer?: string;
};

const defaultSyncItems: { title: string; body: string; icon: LucideIcon }[] = [
  {
    title: "List once",
    body: "Publish inventory from your broker POS or inventory system in one action.",
    icon: Upload,
  },
  {
    title: "Real-time sync",
    body: "Quantity, price and listing status stay aligned across every connected channel.",
    icon: RefreshCw,
  },
  {
    title: "Auto delist",
    body: "A sale on any marketplace triggers updates and delisting on all others.",
    icon: CircleOff,
  },
  {
    title: "Conflict guard",
    body: "Double-sale protection keeps inventory holds and locks in sync at all times.",
    icon: ShieldCheck,
  },
];

export function SyncDiagram({
  title,
  body,
  items,
  footer = "Ticket Sold → Inventory Updated → Other Listings Updated / Removed",
}: SyncDiagramProps) {
  const cards = (items ?? defaultSyncItems.map(({ title: cardTitle, body: cardBody }) => ({ title: cardTitle, body: cardBody }))).map(
    (item, index) => ({
      ...item,
      icon: defaultSyncItems[index]?.icon ?? RefreshCw,
    }),
  );

  return (
    <section className="section-curve relative isolate bg-dark py-20 text-background sm:py-24">
      <div className="pointer-events-none absolute inset-0 bg-linear-to-br from-dark via-dark to-primary-deep/35" aria-hidden />
      <div className="container-page relative z-10">
        <Reveal>
          <h2 className="max-w-2xl text-3xl font-bold sm:text-4xl">{title}</h2>
          <p className="mt-4 max-w-2xl text-sm leading-relaxed text-background/70 sm:text-base">{body}</p>
        </Reveal>

        <div className="sync-diagram mt-14">
          <svg className="sync-diagram-lines" viewBox="0 0 800 420" preserveAspectRatio="none" aria-hidden>
            <path d="M400 210 C340 170 240 120 150 95" />
            <path d="M400 210 C460 170 560 120 650 95" />
            <path d="M400 210 C340 250 240 300 150 325" />
            <path d="M400 210 C460 250 560 300 650 325" />
          </svg>

          <div className="sync-diagram-grid">
            {cards.map((item, i) => {
              const Icon = item.icon;
              const positions = ["tl", "tr", "bl", "br"] as const;
              const position = positions[i] ?? "tl";
              return (
                <Reveal
                  key={item.title}
                  delay={i * 80}
                  className={`sync-diagram-card-wrap sync-diagram-card-${position}`}
                >
                  <article className="sync-diagram-card">
                    <span className="sync-diagram-card-icon">
                      <Icon className="size-5" strokeWidth={1.75} />
                    </span>
                    <div className="sync-diagram-card-copy">
                      <h3 className="sync-diagram-card-title">{item.title}</h3>
                      <p className="sync-diagram-card-body">{item.body}</p>
                    </div>
                  </article>
                </Reveal>
              );
            })}

            <div className="sync-diagram-hub-cell" aria-hidden>
              <div className="sync-diagram-hub">
                <span className="sync-diagram-hub-glow" />
                <div className="sync-diagram-hub-core">
                  <RefreshCw className="size-5" strokeWidth={1.75} />
                </div>
              </div>
            </div>
          </div>
        </div>

        <Reveal delay={420}>
          <div className="sync-diagram-footer">{footer}</div>
        </Reveal>
      </div>
    </section>
  );
}

type ApiCardsProps = {
  items: { title: string; body: string }[];
  eyebrow?: string;
  title?: string;
  intro?: string;
};

export function ApiCards({ items, eyebrow, title, intro }: ApiCardsProps) {
  return (
    <section className="section-curve relative isolate bg-surface py-20 sm:py-24">
      <div className="container-page relative z-10">
        {title ? (
          <Reveal>
            <div className="mx-auto max-w-3xl text-center">
              {eyebrow ? <p className="section-eyebrow text-primary">{eyebrow}</p> : null}
              <h2 className="mt-4 text-3xl font-bold text-foreground sm:text-4xl">{title}</h2>
              {intro ? (
                <p className="mt-4 text-sm leading-relaxed text-muted-foreground sm:text-base">{intro}</p>
              ) : null}
            </div>
          </Reveal>
        ) : null}
        <div className={`grid gap-5 sm:grid-cols-2 lg:grid-cols-3${title ? " mt-12 lg:mt-14" : ""}`}>
          {items.map((item, i) => (
            <Reveal key={item.title} delay={i * 60}>
              <article className="lift h-full rounded-2xl border border-border bg-card p-6">
                <div className="font-mono text-[11px] tracking-[0.18em] text-primary uppercase">
                  API
                </div>
                <h3 className="mt-3 text-lg font-semibold text-foreground">{item.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{item.body}</p>
              </article>
            </Reveal>
          ))}
        </div>
        <Reveal delay={200}>
          <div className="mt-10 flex flex-wrap gap-3">
            <SiteLink
              to={ctas.viewApiDocs.to}
              className="lift rounded-md bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground"
            >
              {ctas.viewApiDocs.label}
            </SiteLink>
            <SiteLink
              to={ctas.requestApiAccess.to}
              className="lift rounded-md border border-border px-6 py-3 text-sm font-semibold text-foreground"
            >
              {ctas.requestApiAccess.label}
            </SiteLink>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

type ContactFormProps = {
  eyebrow: string;
  title: string;
  intro: string;
  submitLabel?: string;
  showCompanyField?: boolean;
};

export function ContactForm({
  eyebrow,
  title,
  intro,
  submitLabel = "Send message",
  showCompanyField = true,
}: ContactFormProps) {
  return (
    <section className="section-curve relative isolate bg-background py-20 sm:py-24">
      <div className="container-page relative z-10 grid gap-12 lg:grid-cols-[1fr_1.1fr] lg:items-start">
        <Reveal>
          <p className="section-eyebrow text-primary">{eyebrow}</p>
          <h2 className="mt-4 text-3xl font-bold text-foreground sm:text-4xl">{title}</h2>
          <p className="mt-4 max-w-md text-sm leading-relaxed text-muted-foreground sm:text-base">
            {intro}
          </p>
          <dl className="mt-10 space-y-4 text-sm">
            <div>
              <dt className="font-mono text-[11px] tracking-[0.18em] text-primary uppercase">Offices</dt>
              <dd className="mt-2 text-foreground">{brand.offices}</dd>
            </div>
            <div>
              <dt className="font-mono text-[11px] tracking-[0.18em] text-primary uppercase">Email</dt>
              <dd className="mt-2">
                <a href={`mailto:${brand.email}`} className="text-foreground hover:text-primary">
                  {brand.email}
                </a>
              </dd>
            </div>
          </dl>
        </Reveal>
        <Reveal delay={100}>
          <form
            className="rounded-2xl border border-border bg-card p-6 sm:p-8"
            onSubmit={(e) => {
              e.preventDefault();
              (e.currentTarget as HTMLFormElement).reset();
            }}
          >
            <div className="grid gap-4 sm:grid-cols-2">
              <label className="block sm:col-span-1">
                <span className="text-sm font-medium text-foreground">First name</span>
                <input
                  required
                  type="text"
                  className="mt-2 w-full rounded-md border border-border bg-background px-3 py-2.5 text-sm focus:border-primary focus:outline-none"
                />
              </label>
              <label className="block sm:col-span-1">
                <span className="text-sm font-medium text-foreground">Last name</span>
                <input
                  required
                  type="text"
                  className="mt-2 w-full rounded-md border border-border bg-background px-3 py-2.5 text-sm focus:border-primary focus:outline-none"
                />
              </label>
              <label className="block sm:col-span-2">
                <span className="text-sm font-medium text-foreground">Work email</span>
                <input
                  required
                  type="email"
                  className="mt-2 w-full rounded-md border border-border bg-background px-3 py-2.5 text-sm focus:border-primary focus:outline-none"
                />
              </label>
              {showCompanyField ? (
                <label className="block sm:col-span-2">
                  <span className="text-sm font-medium text-foreground">Company</span>
                  <input
                    required
                    type="text"
                    className="mt-2 w-full rounded-md border border-border bg-background px-3 py-2.5 text-sm focus:border-primary focus:outline-none"
                  />
                </label>
              ) : null}
              <label className="block sm:col-span-2">
                <span className="text-sm font-medium text-foreground">Message</span>
                <textarea
                  required
                  rows={4}
                  className="mt-2 w-full rounded-md border border-border bg-background px-3 py-2.5 text-sm focus:border-primary focus:outline-none"
                />
              </label>
            </div>
            <button
              type="submit"
              className="lift mt-6 rounded-md bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground"
            >
              {submitLabel}
            </button>
          </form>
        </Reveal>
      </div>
    </section>
  );
}
