import { useEffect, useRef, useState } from "react";
import { Reveal, useTypewriter } from "@/hooks/use-scroll-motion";
import { ArrowRight } from "lucide-react";
import { SiteLink } from "@/components/layout/SiteLink";
import { ctas, productHrefs } from "@/content/site";
import { modules } from "@/content/modules";
import { SectionBackdrop } from "@/components/landing/SectionBackdrop";

import ticketSearchImg from "@/assets/product-analytics-dashboard.png";
import addListingsImg from "@/assets/add_listings_sb.png";
import marketOverviewImg from "@/assets/product-events-browser.jpg";
import apiDocsImg from "@/assets/product-market-insight-api.png";
import myListingsImg from "@/assets/my_listings.png";
import salesDeskImg from "@/assets/dashboard.png";

type Shot =
  | {
      kind: "image";
      src: string;
      alt: string;
      w: number;
      h: number;
      priority?: boolean;
    }
  | { kind: "desk" };

type Step = {
  n: string;
  stage: string;
  product: string;
  tagline: string;
  href: string;
  body: string;
  caption: string;
  stats: readonly { value: string; label: string }[];
  url: string;
  shot: Shot;
};

/** Discover → Source → Price → Connect → Distribute → Sell → Settle —
 *  the same spine as `workflowStages`, `/platform` and `/products`. */
const steps = [
  {
    n: "01",
    stage: "Discover",
    product: modules.intel.name,
    tagline: modules.intel.tagline,
    href: productHrefs.intel,
    body: "Find the events, onsales and market opportunities worth acting on, with venue and demand context on the same record.",
    caption: "Browse events by category, tournament and availability",
    stats: [
      { value: "Global", label: "Event catalog" },
      { value: "Tracked", label: "Onsale windows" },
    ],
    url: "app.seatsbrokers.com / marketplace",
    shot: {
      kind: "image",
      src: ticketSearchImg,
      alt: "SeatsBrokers ticket marketplace search listing events by category, tournament and availability",
      w: 1718,
      h: 915,
      priority: true,
    },
  },
  {
    n: "02",
    stage: "Source",
    product: modules.source.name,
    tagline: modules.source.tagline,
    href: productHrefs.source,
    body: "Add your own inventory or work from connected supply — categories, sections, rows, quantities and delivery in one layer.",
    caption: "Create a listing with category, section, row and delivery",
    stats: [
      { value: "One", label: "Inventory layer" },
      { value: "Connected", label: "Supplier stock" },
    ],
    url: "app.seatsbrokers.com / add-listings",
    shot: {
      kind: "image",
      src: addListingsImg,
      alt: "SeatsBrokers Add Listings form with quantity, category, section, row and delivery fields",
      w: 1785,
      h: 881,
    },
  },
  {
    n: "03",
    stage: "Price",
    product: modules.pulse.name,
    tagline: modules.pulse.tagline,
    href: productHrefs.pulse,
    body: "Price against market movement with AI-assisted recommendations. The platform recommends — you approve every change.",
    caption: "Average price, price movement and distribution behind the call",
    stats: [
      { value: "AI", label: "Assisted pricing" },
      { value: "You", label: "Approve the price" },
    ],
    url: "app.seatsbrokers.com / market",
    shot: {
      kind: "image",
      src: marketOverviewImg,
      alt: "SeatsBrokers market view with average price, pricing trend and price distribution",
      w: 1408,
      h: 1008,
    },
  },
  {
    n: "04",
    stage: "Connect",
    product: modules.link.name,
    tagline: modules.link.tagline,
    href: productHrefs.link,
    body: "Connect the systems you already run — POS, websites, supplier feeds, inventory platforms and ERP — through one API.",
    caption: "Keys, endpoints and webhooks for your own systems",
    stats: [
      { value: "API", label: "POS · ERP · feeds" },
      { value: "Two-way", label: "System sync" },
    ],
    url: "app.seatsbrokers.com / api-documentation",
    shot: {
      kind: "image",
      src: apiDocsImg,
      alt: "SeatsBrokers external seller API documentation with webhook configuration and endpoints",
      w: 1777,
      h: 885,
    },
  },
  {
    n: "05",
    stage: "Distribute",
    product: modules.market.name,
    tagline: modules.market.tagline,
    href: productHrefs.market,
    body: "List once and publish across connected marketplaces and sales channels, with quantities kept in sync as tickets sell.",
    caption: "Publish, unpublish and hold every channel on the same quantity",
    stats: [
      { value: "Once", label: "List everywhere" },
      { value: "In sync", label: "Quantities" },
    ],
    url: "app.seatsbrokers.com / my-listings",
    shot: {
      kind: "image",
      src: myListingsImg,
      alt: "SeatsBrokers My Listings view showing published and unpublished listings per event",
      w: 1680,
      h: 936,
    },
  },
  {
    n: "06",
    stage: "Sell",
    product: modules.deal.name,
    tagline: modules.deal.tagline,
    href: productHrefs.deal,
    body: "Take the sale from enquiry to delivery — orders, quotations and ticket fulfilment handled in one workflow.",
    caption: "Sales, order status and awaiting delivery on one desk",
    stats: [
      { value: "One", label: "Sales desk" },
      { value: "Quote", label: "To delivery" },
    ],
    url: "app.seatsbrokers.com / dashboard",
    shot: {
      kind: "image",
      src: salesDeskImg,
      alt: "SeatsBrokers sales dashboard with orders, revenue and awaiting delivery",
      w: 1789,
      h: 879,
    },
  },
  {
    n: "07",
    stage: "Settle",
    product: modules.funds.name,
    tagline: modules.funds.tagline,
    href: productHrefs.funds,
    body: "Handle purchasing, balances, payments and eligible partner settlements without leaving the platform.",
    caption: "Balances, payout rails and eligible partner settlements",
    stats: [
      { value: "In workflow", label: "Payments" },
      { value: "Eligible", label: "Partner settlements" },
    ],
    url: "seatsbrokers / funds / settle",
    shot: { kind: "desk" },
  },
] as const satisfies readonly Step[];

const workflowChips = [
  "Discover to settle",
  "One inventory layer",
  "Connected sales channels",
  "Payments in the workflow",
] as const;

const typePhrases = [
  `${modules.intel.name}.`,
  `${modules.source.name}.`,
  `${modules.pulse.name}.`,
  `${modules.link.name}.`,
  `${modules.market.name}.`,
  `${modules.deal.name}.`,
  `${modules.funds.name}.`,
] as const;

/** Illustrative settlement desk — SeatsFunds™ has no product screenshot yet,
 *  so the stage reuses the static light desk language (£ only, no totals). */
const settleRows = [
  { partner: "London desk", rail: "Bank", amount: "£12,480", status: "Settled", tone: "ok" },
  { partner: "Dubai desk", rail: "Card", amount: "£8,240", status: "Posted", tone: "wait" },
  { partner: "New York desk", rail: "Bank", amount: "£4,160", status: "Pending", tone: "hold" },
  { partner: "India desk", rail: "Standard", amount: "£6,920", status: "Settled", tone: "ok" },
] as const;

const settleRails = [
  { label: "Standard", hint: "Bank · no extra payout fee" },
  { label: "USDT / crypto", hint: "On-chain · extra crypto fee" },
] as const;

function SettleDesk() {
  return (
    <div className="how-it-desk">
      <div className="how-it-desk-grid">
        <section className="how-it-desk-panel">
          <div className="how-it-desk-head">
            <p className="how-it-desk-kicker">Partner settlements</p>
            <span className="how-it-desk-stamp">Ready</span>
          </div>
          <table className="how-it-desk-table">
            <thead>
              <tr>
                <th scope="col">Partner</th>
                <th scope="col" className="how-it-desk-rail-col">
                  Rail
                </th>
                <th scope="col" className="how-it-desk-num">
                  Amount
                </th>
                <th scope="col" className="how-it-desk-num">
                  Status
                </th>
              </tr>
            </thead>
            <tbody>
              {settleRows.map((row) => (
                <tr key={row.partner}>
                  <td>{row.partner}</td>
                  <td className="how-it-desk-rail-col">{row.rail}</td>
                  <td className="how-it-desk-num how-it-desk-amount">{row.amount}</td>
                  <td className="how-it-desk-num">
                    <span className="how-it-desk-status" data-tone={row.tone}>
                      {row.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>

        <aside className="how-it-desk-panel">
          <div className="how-it-desk-head">
            <p className="how-it-desk-kicker">Payout rails</p>
          </div>
          <ul className="how-it-desk-rails">
            {settleRails.map((rail) => (
              <li key={rail.label}>
                <span className="how-it-desk-rail-label">{rail.label}</span>
                <span className="how-it-desk-rail-hint">{rail.hint}</span>
              </li>
            ))}
          </ul>
          <p className="how-it-desk-note">
            Purchasing, balances and eligible partner settlements stay in the same workflow as the
            sale.
          </p>
        </aside>
      </div>
    </div>
  );
}

/** Fractional index of the step card nearest the middle of the viewport.
 *  Measured from the cards themselves, so the step count is not baked in. */
function useActiveStep(columnRef: React.RefObject<HTMLDivElement | null>, stepCount: number) {
  const [progress, setProgress] = useState(0);
  const targetRef = useRef(0);
  const currentRef = useRef(0);
  const frameRef = useRef(0);

  useEffect(() => {
    const column = columnRef.current;
    if (!column || stepCount < 2) return;

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const measure = () => {
      const cards = Array.from(column.children) as HTMLElement[];
      if (cards.length < 2) return;
      const focus = window.innerHeight * 0.5;
      const centers = cards.map((card) => {
        const rect = card.getBoundingClientRect();
        return rect.top + rect.height / 2;
      });

      const first = centers[0] ?? 0;
      const last = centers[centers.length - 1] ?? 0;

      let index = 0;
      if (focus >= last) {
        index = centers.length - 1;
      } else if (focus > first) {
        for (let i = 0; i < centers.length - 1; i += 1) {
          const from = centers[i];
          const to = centers[i + 1];
          if (from === undefined || to === undefined) continue;
          if (focus >= from && focus <= to) {
            index = i + (focus - from) / Math.max(to - from, 1);
            break;
          }
        }
      }
      targetRef.current = index;
    };

    const animate = () => {
      const target = targetRef.current;
      const next = reducedMotion
        ? target
        : currentRef.current + (target - currentRef.current) * 0.16;
      const settled = Math.abs(target - next) < 0.002;
      currentRef.current = settled ? target : next;
      setProgress(currentRef.current);
      if (!settled && !reducedMotion) {
        frameRef.current = requestAnimationFrame(animate);
      }
    };

    const onScroll = () => {
      measure();
      cancelAnimationFrame(frameRef.current);
      frameRef.current = requestAnimationFrame(animate);
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      cancelAnimationFrame(frameRef.current);
    };
  }, [stepCount, columnRef]);

  return progress;
}

function ProductScreenshot({ step, variant }: { step: Step; variant: "desktop" | "mobile" }) {
  return (
    <div className="how-it-product-frame flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-card shadow-[var(--shadow-card)]">
      <div className="flex shrink-0 items-center gap-3 border-b border-border bg-muted/40 px-4 py-2.5">
        {variant === "desktop" ? (
          <>
            <div className="flex gap-1.5">
              <span className="h-2.5 w-2.5 rounded-full bg-foreground/15" />
              <span className="h-2.5 w-2.5 rounded-full bg-foreground/15" />
              <span className="h-2.5 w-2.5 rounded-full bg-foreground/15" />
            </div>
            <div className="flex min-w-0 flex-1 items-center gap-2 rounded-md bg-background px-3 py-1">
              <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
              <span className="truncate font-mono text-[11px] text-muted-foreground">
                {step.url}
              </span>
            </div>
          </>
        ) : (
          <>
            <span className="rounded-md bg-primary px-2 py-0.5 font-mono text-[10px] font-bold text-primary-foreground">
              {step.n}
            </span>
            <span className="min-w-0 flex-1 truncate font-mono text-[10px] text-muted-foreground">
              {step.url}
            </span>
          </>
        )}
      </div>
      {step.shot.kind === "image" ? (
        <div className="relative bg-muted/25">
          <img
            src={step.shot.src}
            alt={step.shot.alt}
            width={step.shot.w}
            height={step.shot.h}
            loading={step.shot.priority ? "eager" : "lazy"}
            decoding="async"
            className="block h-auto w-full"
          />
        </div>
      ) : (
        <SettleDesk />
      )}
    </div>
  );
}

export function HowItWorks() {
  const typed = useTypewriter([...typePhrases], 80);
  const stepsColumnRef = useRef<HTMLDivElement>(null);
  const scrollProgress = useActiveStep(stepsColumnRef, steps.length);
  const active = Math.min(Math.max(Math.round(scrollProgress), 0), steps.length - 1);
  const preview = steps[active] ?? steps[0];

  return (
    <section
      id="how-it-works"
      className="section-curve-sticky relative isolate scroll-mt-24 overflow-x-clip bg-background py-14 sm:py-20 lg:py-24"
      aria-label="How it works"
    >
      <SectionBackdrop image="venueSeats" tone="light" strength={0.09} />
      <div className="container-page relative z-10">
        <Reveal>
          <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-2xl">
              <p className="section-eyebrow text-primary">How it works</p>
              <h2 className="mt-4 text-3xl font-bold text-foreground sm:text-4xl">
                From Opportunity to Settlement —{" "}
                <span className="how-it-typeline text-primary">
                  <span className="how-it-typeline-ghosts" aria-hidden>
                    {typePhrases.map((phrase) => (
                      <span key={phrase} className="how-it-typeline-ghost">
                        {phrase}
                      </span>
                    ))}
                  </span>
                  <span className="how-it-typeline-text caret">{typed}</span>
                </span>
              </h2>
            </div>
            <p className="max-w-md text-sm leading-relaxed text-muted-foreground lg:text-right lg:text-base">
              Every ticket your business touches moves through the same seven stages — discover,
              source, price, connect, distribute, sell, settle. Each stage is owned by one
              SeatsBrokers product.
            </p>
          </div>
        </Reveal>

        <Reveal delay={80}>
          <div className="mt-7 flex flex-wrap gap-2 border-y border-border py-4 sm:gap-3 sm:py-5">
            {workflowChips.map((label) => (
              <span
                key={label}
                className="rounded-full border border-border bg-muted/50 px-3 py-1 font-mono text-[10px] tracking-wide text-muted-foreground"
              >
                {label}
              </span>
            ))}
          </div>
        </Reveal>

        <div className="mt-8 grid sm:mt-10 lg:mt-12 lg:grid-cols-2 lg:gap-10 xl:gap-16">
          <div ref={stepsColumnRef} className="how-it-steps lg:py-4">
            {steps.map((step, i) => {
              const isActive = active === i;
              return (
                <article
                  key={step.n}
                  className="how-it-step flex min-h-0 flex-col justify-center py-6 sm:py-8 lg:py-6"
                >
                  <Reveal>
                    <div className="mb-5 lg:hidden">
                      <ProductScreenshot step={step} variant="mobile" />
                    </div>

                    <div
                      className={`rounded-2xl border p-5 transition-colors duration-500 sm:p-7 ${
                        isActive
                          ? "border-primary/30 bg-card shadow-[var(--shadow-card)]"
                          : "border-border bg-card/80"
                      }`}
                    >
                      <div className="flex flex-wrap items-center justify-between gap-3">
                        <span className="font-mono text-4xl font-bold text-primary/25 sm:text-5xl">
                          {step.n}
                        </span>
                        <span className="rounded-full border border-primary/25 bg-primary/[0.06] px-3 py-1 font-mono text-[11px] tracking-[0.14em] text-primary">
                          {step.product}
                        </span>
                      </div>

                      <h3 className="mt-3 text-2xl font-bold text-foreground sm:text-[1.75rem]">
                        {step.stage}
                      </h3>
                      <p className="mt-1 text-sm font-semibold text-foreground/80 italic">
                        {step.tagline}
                      </p>
                      <p className="mt-3 max-w-lg text-sm leading-relaxed text-muted-foreground sm:text-base">
                        {step.body}
                      </p>

                      <div className="mt-5 flex flex-wrap gap-2 lg:hidden">
                        {step.stats.map((s) => (
                          <div
                            key={s.label}
                            className="rounded-lg border border-border bg-muted/40 px-3 py-2"
                          >
                            <div className="font-display text-sm font-bold text-foreground">
                              {s.value}
                            </div>
                            <div className="font-mono text-[10px] tracking-wide text-muted-foreground">
                              {s.label}
                            </div>
                          </div>
                        ))}
                      </div>

                      <SiteLink
                        to={step.href}
                        className="lift mt-5 inline-flex min-h-11 items-center gap-2 rounded-md border border-primary/25 bg-primary/[0.06] px-4 text-sm font-semibold text-primary"
                      >
                        Explore {step.product}
                        <ArrowRight className="size-4 shrink-0" aria-hidden />
                      </SiteLink>
                    </div>
                  </Reveal>
                </article>
              );
            })}
          </div>

          <div className="relative hidden lg:block">
            <div className="how-it-sticky-pane sticky top-24 flex flex-col justify-center py-8">
              <p className="mb-2 text-center section-eyebrow text-primary">
                Stage {preview.n} · {preview.stage}
              </p>
              <div className="how-it-caption-slot mb-4">
                {steps.map((step) => (
                  <p
                    key={step.n}
                    className="text-center text-sm font-medium text-muted-foreground"
                    data-active={step.n === preview.n ? "true" : "false"}
                    aria-hidden={step.n === preview.n ? undefined : true}
                  >
                    {step.caption}
                  </p>
                ))}
              </div>
              <div className="how-it-desktop-viewport min-h-0 w-full">
                {steps.map((step) => (
                  <div
                    key={step.n}
                    className={
                      step.n === preview.n
                        ? "how-it-desktop-shot how-it-preview-swap"
                        : "how-it-desktop-shot"
                    }
                    data-active={step.n === preview.n ? "true" : "false"}
                    data-kind={step.shot.kind}
                    aria-hidden={step.n === preview.n ? undefined : true}
                  >
                    <ProductScreenshot step={step} variant="desktop" />
                  </div>
                ))}
              </div>
              <div className="how-it-stats-slot mt-4">
                {steps.map((step) => (
                  <div
                    key={step.n}
                    className="flex flex-wrap justify-center gap-2"
                    data-active={step.n === preview.n ? "true" : "false"}
                    aria-hidden={step.n === preview.n ? undefined : true}
                  >
                    {step.stats.map((s) => (
                      <span
                        key={s.label}
                        className="rounded-lg border border-border bg-card px-3 py-1.5 text-center"
                      >
                        <span className="block font-display text-sm font-bold text-foreground">
                          {s.value}
                        </span>
                        <span className="font-mono text-[10px] tracking-wide text-muted-foreground">
                          {s.label}
                        </span>
                      </span>
                    ))}
                  </div>
                ))}
              </div>
              <div className="mt-5 flex justify-center gap-1.5" aria-hidden>
                {steps.map((s, i) => (
                  <span
                    key={s.n}
                    className={`how-it-dot h-1 rounded-full bg-primary transition-all duration-500 ${
                      i === active ? "w-8 opacity-100" : "w-2 opacity-35"
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>

        <Reveal delay={120}>
          <div className="mt-12 flex flex-col items-start justify-between gap-6 rounded-2xl border border-border bg-surface px-6 py-8 sm:mt-16 sm:flex-row sm:items-center sm:px-10">
            <div>
              <p className="section-eyebrow text-primary">The whole workflow</p>
              <p className="mt-2 max-w-xl text-base font-semibold text-foreground">
                One workflow. One inventory layer. Multiple sales channels.
              </p>
            </div>
            <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row">
              <SiteLink
                to={ctas.bookDemo.to}
                className="lift inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-md bg-primary px-5 text-sm font-bold text-primary-foreground sm:w-auto"
              >
                {ctas.bookDemo.label}
                <ArrowRight className="size-4 shrink-0" aria-hidden />
              </SiteLink>
              <SiteLink
                to={ctas.becomeSeller.to}
                className="inline-flex min-h-11 w-full items-center justify-center rounded-md border border-border bg-background px-5 text-sm font-semibold text-foreground sm:w-auto"
              >
                {ctas.becomeSeller.label}
              </SiteLink>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
