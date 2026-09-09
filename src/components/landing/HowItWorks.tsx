import { useCallback, useEffect, useRef, useState, type KeyboardEvent } from "react";
import {
  ArrowRight,
  BarChart3,
  Banknote,
  CalendarClock,
  CalendarRange,
  CheckCircle2,
  Clock3,
  CreditCard,
  Database,
  Gauge,
  Globe,
  Handshake,
  Layers,
  Link2,
  ListChecks,
  PlugZap,
  RefreshCw,
  Search,
  Send,
  Share2,
  ShieldCheck,
  ShoppingCart,
  Signal,
  Sparkles,
  Tags,
  Users,
  Wallet,
  Webhook,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { useInView, useTypewriter } from "@/hooks/use-scroll-motion";
import { SiteLink } from "@/components/layout/SiteLink";
import { SectionBackdrop } from "@/components/landing/SectionBackdrop";
import { productHrefs } from "@/content/site";
import { modules } from "@/content/modules";
import { eventBackdrops, type EventBackdropKey } from "@/lib/event-backdrops";

import searchTicketsShot from "@/assets/product-analytics-dashboard.png";
import addListingsShot from "@/assets/add_listings_sb.png";
import marketOverviewShot from "@/assets/product-events-browser.jpg";
import categoryPricesShot from "@/assets/product-showcase/category-prices-light.png";
import apiDocsShot from "@/assets/product-market-insight-api.png";
import myListingsShot from "@/assets/my_listings.png";
import salesDeskShot from "@/assets/dashboard.png";
import eventPricingShot from "@/assets/bento/bento-event-pricing-intel.png";
import platformLayerShot from "@/assets/bento/bento-platform-layer-wide.png";
import marketplaceSyncShot from "@/assets/bento/bento-marketplace-sync.png";
import partnerPaymentsShot from "@/assets/bento/bento-partner-payments.png";

const STAGE_MS = 4200;
const RESUME_MS = 450;

type Fact = { icon: LucideIcon; value: string; label: string };

type Step = {
  n: string;
  stage: string;
  product: string;
  tagline: string;
  href: string;
  body: string;
  icon: LucideIcon;
  photo: EventBackdropKey;
  facts: readonly [Fact, Fact, Fact, Fact];
  main: { src: string; alt: string; position?: string };
  inset: { src: string; alt: string; position?: string };
};

/** Discover → Source → Price → Connect → Distribute → Sell → Settle —
 *  the same spine as `workflowStages`, `/platform` and `/products`. */
const steps: readonly Step[] = [
  {
    n: "01",
    stage: "Discover",
    product: modules.intel.name,
    tagline: modules.intel.tagline,
    href: productHrefs.intel,
    body: "Find the events, onsales and market opportunities worth acting on, with venue and demand context on the same record.",
    icon: Search,
    photo: "footballNight",
    facts: [
      { icon: Globe, value: "Global", label: "Worldwide coverage" },
      { icon: CalendarRange, value: "Event catalog", label: "Sports, music, theatre" },
      { icon: BarChart3, value: "Tracked", label: "Onsale windows" },
      { icon: Signal, value: "Demand context", label: "On the same record" },
    ],
    main: {
      src: eventPricingShot,
      alt: "SeatsBrokers event intelligence and pricing view with events, category prices and a venue map",
    },
    inset: {
      src: marketOverviewShot,
      alt: "SeatsBrokers market insights panel with pricing trend and price distribution",
      position: "right center",
    },
  },
  {
    n: "02",
    stage: "Source",
    product: modules.source.name,
    tagline: modules.source.tagline,
    href: productHrefs.source,
    body: "Request tickets that are not listed on SeatsBrokers. Our sourcing network returns competitive B2B options — then convert the best offer into an order.",
    icon: Users,
    photo: "venueSeats",
    facts: [
      { icon: Search, value: "On demand", label: "Sourcing requests" },
      { icon: Handshake, value: "B2B network", label: "Competitive offers" },
      { icon: Tags, value: "Compare", label: "Offer by offer" },
      { icon: CheckCircle2, value: "Convert", label: "Offer to order" },
    ],
    main: {
      src: searchTicketsShot,
      alt: "SeatsBrokers ticket search desk browsing events by category, tournament and availability",
    },
    inset: {
      src: addListingsShot,
      alt: "SeatsBrokers listing summary panel with event, quantity, section and delivery",
      position: "right center",
    },
  },
  {
    n: "03",
    stage: "Price",
    product: modules.pulse.name,
    tagline: modules.pulse.tagline,
    href: productHrefs.pulse,
    body: "Price against market movement with AI-assisted recommendations. The platform recommends — you approve every change.",
    icon: BarChart3,
    photo: "basketball",
    facts: [
      { icon: Sparkles, value: "AI assisted", label: "Price recommendations" },
      { icon: Gauge, value: "Live", label: "Market movement" },
      { icon: Layers, value: "Per category", label: "Ask comparison" },
      { icon: ShieldCheck, value: "You decide", label: "Approve every change" },
    ],
    main: {
      src: marketOverviewShot,
      alt: "SeatsBrokers market overview with average price, pricing trend and price distribution",
    },
    inset: {
      src: categoryPricesShot,
      alt: "SeatsBrokers category price comparison across connected marketplaces",
      position: "right center",
    },
  },
  {
    n: "04",
    stage: "Connect",
    product: modules.link.name,
    tagline: modules.link.tagline,
    href: productHrefs.link,
    body: "Connect the systems you already run — POS, websites, supplier feeds, inventory platforms and ERP — through one API.",
    icon: Link2,
    photo: "motorsport",
    facts: [
      { icon: PlugZap, value: "One API", label: "POS, ERP and feeds" },
      { icon: Webhook, value: "Webhooks", label: "Real-time events" },
      { icon: RefreshCw, value: "Two-way", label: "System sync" },
      { icon: ShieldCheck, value: "Keys", label: "Scoped access" },
    ],
    main: {
      src: platformLayerShot,
      alt: "SeatsBrokers platform layer connecting marketplace hub, market insight API and core modules",
    },
    inset: {
      src: apiDocsShot,
      alt: "SeatsBrokers external seller API documentation with webhook configuration and endpoints",
      position: "left center",
    },
  },
  {
    n: "05",
    stage: "Distribute",
    product: modules.market.name,
    tagline: modules.market.tagline,
    href: productHrefs.market,
    body: "List once and publish across connected marketplaces and sales channels, with quantities kept in sync as tickets sell.",
    icon: Share2,
    photo: "sportsCrowd",
    facts: [
      { icon: Send, value: "List once", label: "Publish everywhere" },
      { icon: RefreshCw, value: "In sync", label: "Quantities per channel" },
      { icon: Database, value: "One layer", label: "Single inventory" },
      { icon: ShieldCheck, value: "No double sell", label: "Auto-delist on sale" },
    ],
    main: {
      src: marketplaceSyncShot,
      alt: "SeatsBrokers marketplace distribution map syncing listings across connected sales channels",
    },
    inset: {
      src: myListingsShot,
      alt: "SeatsBrokers My Listings view with published and unpublished listings per event",
      position: "right center",
    },
  },
  {
    n: "06",
    stage: "Sell",
    product: modules.deal.name,
    tagline: modules.deal.tagline,
    href: productHrefs.deal,
    body: "Take the sale from enquiry to delivery — orders, quotations and ticket fulfilment handled in one workflow.",
    icon: ShoppingCart,
    photo: "concertCrowd",
    facts: [
      { icon: ListChecks, value: "One desk", label: "Enquiry to delivery" },
      { icon: Tags, value: "Quotations", label: "Margin applied" },
      { icon: Clock3, value: "Order status", label: "Tracked end to end" },
      { icon: Send, value: "Fulfilment", label: "Tickets delivered" },
    ],
    main: {
      src: partnerPaymentsShot,
      alt: "SeatsBrokers partner deal workflow from search and margin to quote, share and delivery",
    },
    inset: {
      src: salesDeskShot,
      alt: "SeatsBrokers sales desk with orders and awaiting delivery",
      position: "left center",
    },
  },
  {
    n: "07",
    stage: "Settle",
    product: modules.funds.name,
    tagline: modules.funds.tagline,
    href: productHrefs.funds,
    body: "Handle purchasing, balances, payments and eligible partner settlements without leaving the platform.",
    icon: CreditCard,
    photo: "trophy",
    facts: [
      { icon: Wallet, value: "Balances", label: "Purchase and payout" },
      { icon: Banknote, value: "Payout rails", label: "Standard and crypto" },
      { icon: Handshake, value: "Partners", label: "Eligible settlements" },
      { icon: CalendarClock, value: "In workflow", label: "No separate tool" },
    ],
    main: {
      src: salesDeskShot,
      alt: "SeatsBrokers dashboard with total payouts, reports and settlement activity",
      position: "right center",
    },
    inset: {
      src: partnerPaymentsShot,
      alt: "SeatsBrokers payment status panel showing a paid and delivered partner order",
      position: "right center",
    },
  },
];

const usps = [
  { icon: Globe, title: "Discover to settle", note: "One connected workflow" },
  { icon: Database, title: "One inventory layer", note: "Across all your channels" },
  { icon: Share2, title: "Connected sales channels", note: "List once, sell everywhere" },
  { icon: CreditCard, title: "Payments in the workflow", note: "From purchase to payout" },
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

export function HowItWorks() {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const [reduced, setReduced] = useState(false);
  const { ref, inView } = useInView<HTMLElement>(0.2, { once: false });
  const resumeTimer = useRef<number | null>(null);
  const railRef = useRef<HTMLDivElement | null>(null);
  const typed = useTypewriter([...typePhrases], 80);
  const step = steps[active] ?? steps[0]!;

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => setReduced(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

  useEffect(() => {
    if (reduced || paused || !inView) return;
    const id = window.setInterval(
      () => setActive((prev) => (prev + 1) % steps.length),
      STAGE_MS,
    );
    return () => window.clearInterval(id);
  }, [reduced, paused, inView, active]);

  useEffect(() => {
    const rail = railRef.current;
    const chip = rail?.querySelector<HTMLElement>(`[data-index="${active}"]`);
    if (!rail || !chip) return;
    const left = chip.offsetLeft - (rail.clientWidth - chip.offsetWidth) / 2;
    rail.scrollTo({ left: Math.max(0, left), behavior: reduced ? "auto" : "smooth" });
    if (rail.contains(document.activeElement)) chip.focus();
  }, [active, reduced]);

  const hold = useCallback(() => {
    if (resumeTimer.current != null) {
      window.clearTimeout(resumeTimer.current);
      resumeTimer.current = null;
    }
    setPaused(true);
  }, []);

  const release = useCallback(() => {
    if (resumeTimer.current != null) window.clearTimeout(resumeTimer.current);
    resumeTimer.current = window.setTimeout(() => {
      setPaused(false);
      resumeTimer.current = null;
    }, RESUME_MS);
  }, []);

  useEffect(
    () => () => {
      if (resumeTimer.current != null) window.clearTimeout(resumeTimer.current);
    },
    [],
  );

  const onRailKey = (e: KeyboardEvent<HTMLDivElement>) => {
    if (e.key === "ArrowRight" || e.key === "ArrowDown") {
      e.preventDefault();
      setActive((prev) => (prev + 1) % steps.length);
    } else if (e.key === "ArrowLeft" || e.key === "ArrowUp") {
      e.preventDefault();
      setActive((prev) => (prev - 1 + steps.length) % steps.length);
    } else if (e.key === "Home") {
      e.preventDefault();
      setActive(0);
    } else if (e.key === "End") {
      e.preventDefault();
      setActive(steps.length - 1);
    }
  };

  return (
    <section
      ref={ref}
      id="how-it-works"
      className="hiw section-curve relative isolate scroll-mt-24 bg-dark text-background"
      data-theme="dark"
      aria-label="How it works"
    >
      <SectionBackdrop image="concert" tone="dark" />
      <div className="container-page hiw-inner relative z-10">
        <header className="hiw-head">
          <div className="hiw-head-copy">
            <p className="section-eyebrow text-primary">How it works</p>
            <h2 className="hiw-title">
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
            <p className="hiw-lead">
              Every ticket your business touches moves through the same seven stages —
              discover, source, price, connect, distribute, sell, settle. Each stage is owned
              by one SeatsBrokers product.
            </p>
          </div>

          <ul className="hiw-usps">
            {usps.map((usp) => (
              <li key={usp.title} className="hiw-usp">
                <usp.icon className="hiw-usp-icon" aria-hidden />
                <p className="hiw-usp-title">{usp.title}</p>
                <p className="hiw-usp-note">{usp.note}</p>
              </li>
            ))}
          </ul>
        </header>

        <div
          ref={railRef}
          className="hiw-rail"
          role="tablist"
          aria-label="Workflow stages"
          data-paused={paused || reduced}
          onKeyDown={onRailKey}
          onPointerEnter={hold}
          onPointerLeave={release}
        >
          {steps.map((item, i) => (
            <div key={item.n} className="hiw-rail-cell">
              <button
                type="button"
                role="tab"
                data-index={i}
                id={`hiw-tab-${item.n}`}
                aria-selected={i === active}
                aria-controls="hiw-stage-panel"
                tabIndex={i === active ? 0 : -1}
                className="hiw-stage"
                data-active={i === active}
                data-done={i < active}
                onClick={() => setActive(i)}
              >
                <span className="hiw-stage-top">
                  <span className="hiw-stage-num">{item.n}</span>
                  <item.icon className="hiw-stage-icon" aria-hidden />
                </span>
                <span className="hiw-stage-product">{item.product}</span>
                <span className="hiw-stage-name">{item.stage}</span>
              </button>
              {i < steps.length - 1 ? (
                <span className="hiw-rail-arrow" aria-hidden>
                  →
                </span>
              ) : null}
            </div>
          ))}
        </div>

        <article
          className="hiw-card"
          id="hiw-stage-panel"
          role="tabpanel"
          aria-labelledby={`hiw-tab-${step.n}`}
          onPointerEnter={hold}
          onPointerLeave={release}
        >
          <div className="hiw-card-bg" aria-hidden>
            {steps.map((item, i) => (
              <img
                key={item.n}
                src={eventBackdrops[item.photo]}
                alt=""
                data-active={i === active}
                loading="lazy"
                decoding="async"
              />
            ))}
          </div>

          <div className="hiw-card-copy" key={`copy-${step.n}`}>
            <p className="hiw-card-stage">
              Stage {step.n} <span aria-hidden>·</span> {step.stage}
            </p>
            <p className="hiw-card-product">{step.product}</p>
            <h3 className="hiw-card-title">{step.stage}</h3>
            <p className="hiw-card-tagline">{step.tagline}</p>
            <p className="hiw-card-body">{step.body}</p>
            <SiteLink to={step.href} className="sb-btn-primary lift hiw-card-cta">
              Explore {step.product}
              <ArrowRight className="size-4 shrink-0" aria-hidden />
            </SiteLink>
            <ul className="hiw-facts">
              {step.facts.map((fact) => (
                <li key={fact.value + fact.label} className="hiw-fact">
                  <span className="hiw-fact-icon" aria-hidden>
                    <fact.icon />
                  </span>
                  <span className="hiw-fact-text">
                    <span className="hiw-fact-value">{fact.value}</span>
                    <span className="hiw-fact-label">{fact.label}</span>
                  </span>
                </li>
              ))}
            </ul>
          </div>

          <div className="hiw-shots" key={`shots-${step.n}`}>
            <figure className="hiw-shot-main">
              <img
                src={step.main.src}
                alt={step.main.alt}
                style={step.main.position ? { objectPosition: step.main.position } : undefined}
                loading={active === 0 ? "eager" : "lazy"}
                decoding="async"
              />
            </figure>
            <figure className="hiw-shot-inset">
              <img
                src={step.inset.src}
                alt={step.inset.alt}
                style={
                  step.inset.position ? { objectPosition: step.inset.position } : undefined
                }
                loading="lazy"
                decoding="async"
              />
            </figure>
          </div>
        </article>

        <footer className="hiw-close">
          <p className="hiw-note hiw-note-start" aria-hidden>
            From opportunity to settlement
          </p>
          <p className="section-eyebrow hiw-close-eyebrow">The whole workflow</p>
          <p className="hiw-close-title">
            One workflow. One inventory layer. Multiple sales channels.
          </p>
          <ol className="hiw-track">
            {steps.map((item, i) => (
              <li
                key={item.n}
                className="hiw-track-node"
                data-active={i === active}
                data-done={i < active}
              >
                <span className="hiw-track-dot" aria-hidden />
                <span className="hiw-track-label">{item.stage}</span>
              </li>
            ))}
          </ol>
          <p className="hiw-note hiw-note-end" aria-hidden>
            A more connected ticketing business
          </p>
        </footer>
      </div>
    </section>
  );
}
