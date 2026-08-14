import { useEffect, useState } from "react";
import {
  Activity,
  ArrowRight,
  Expand,
  Layers3,
  LineChart,
  Settings2,
  Tags,
  X,
} from "lucide-react";
import { Reveal } from "@/hooks/use-scroll-motion";
import { SiteLink } from "@/components/layout/SiteLink";
import { ctas } from "@/content/site";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogTitle,
} from "@/components/ui/dialog";

import marketIntelDark from "@/assets/product-showcase/market-intel-dark.png";
import categoryPricesDark from "@/assets/product-showcase/category-prices-dark.png";
import categoryPricesLight from "@/assets/product-showcase/category-prices-light.png";
import marketIntelLight from "@/assets/product-showcase/market-intel-light.png";
import adminSources from "@/assets/product-showcase/admin-sources.png";

const AUTO_MS = 4800;

const slides = [
  {
    id: "dashboard",
    icon: Activity,
    tag: "Dashboard",
    title: "Platform overview at a glance.",
    body: "Events, listings, connected marketplaces and inventory value — the command center for your ticketing operation.",
    points: ["12,482 events · demo", "84,250 listings · demo", "32 connected marketplaces"],
    badge: "Dashboard",
    image: marketIntelDark,
    alt: "SeatsBrokers platform dashboard with key metrics",
  },
  {
    id: "events",
    icon: Tags,
    tag: "Events",
    title: "Global event catalog",
    body: "Browse football, rugby, cricket, tennis, Formula 1, music, theatre and arts — with onsale dates, venues and demand signals.",
    points: ["Event onsale dates", "Venue maps", "Demand indicators"],
    badge: "Events",
    image: categoryPricesDark,
    alt: "Event catalog with onsale dates and venue information",
  },
  {
    id: "market",
    icon: Layers3,
    tag: "Market",
    title: "Resale market intelligence",
    body: "Average price, lowest price, price movement, inventory volume and marketplace comparison — financial intelligence for brokers.",
    points: ["Price movement charts", "Category demand", "Marketplace comparison"],
    badge: "Market",
    image: categoryPricesLight,
    alt: "Market intelligence with pricing trends and comparison",
  },
  {
    id: "pricing",
    icon: LineChart,
    tag: "Pricing",
    title: "AI-powered pricing intelligence",
    body: "Market data analyzed into pricing recommendations. AI recommends — broker approves — price synchronized across marketplaces.",
    points: ["Pricing recommendations", "Approval workflow", "Automated sync"],
    badge: "Pricing",
    image: marketIntelLight,
    alt: "AI pricing dashboard with recommendations",
  },
  {
    id: "partners",
    icon: Settings2,
    tag: "Partners",
    title: "Partner commerce hub",
    body: "Travel partner inventory access, margin management, quotation tools and order management — all from one workspace.",
    points: ["Partner inventory", "Quote generation", "Order management"],
    badge: "Partners",
    image: adminSources,
    alt: "Partner commerce workspace with quotation and order tools",
  },
] as const;

export function PartnerProductShowcase() {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const slide = slides[active] ?? slides[0];
  const Icon = slide.icon;

  useEffect(() => {
    if (paused || lightboxOpen) return;
    const id = window.setInterval(
      () => setActive((prev) => (prev + 1) % slides.length),
      AUTO_MS,
    );
    return () => window.clearInterval(id);
  }, [paused, active, lightboxOpen]);

  return (
    <section
      id="partner-workspace"
      className="partner-showcase section-curve relative isolate scroll-mt-24 overflow-x-clip bg-background py-14 text-foreground sm:py-16"
      aria-label="Partner workspace product showcase"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocusCapture={() => setPaused(true)}
      onBlurCapture={(e) => {
        if (!e.currentTarget.contains(e.relatedTarget as Node)) setPaused(false);
      }}
    >
      <span className="partner-showcase-glow" aria-hidden />

      <div className="container-page relative z-10">
        <Reveal>
          <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-xl">
              <p className="flex items-center gap-2 section-eyebrow text-primary">
                <span className="partner-live-dot" aria-hidden />
                Product demo
              </p>
              <h2 className="mt-3 font-display text-[clamp(1.65rem,3.6vw,2.55rem)] font-bold leading-[1.08] tracking-tight">
                The SeatsBrokers ERP —{" "}
                <span className="text-primary">one workspace for your entire operation.</span>
              </h2>
            </div>
            <p className="max-w-sm text-sm leading-relaxed text-muted-foreground lg:text-right">
              Dashboard, Events, Market, Pricing and Partners — five tabs from the real platform. Demo metrics shown.
            </p>
          </div>
        </Reveal>

        <div
          className="partner-tabs mt-8 -mx-1 flex gap-2 overflow-x-auto px-1 pb-1"
          role="tablist"
          aria-label="Product screens"
        >
          {slides.map((s, i) => {
            const TabIcon = s.icon;
            const on = i === active;
            return (
              <button
                key={s.id}
                type="button"
                role="tab"
                aria-selected={on}
                aria-controls="partner-showcase-panel"
                id={`partner-tab-${s.id}`}
                onClick={() => setActive(i)}
                className="partner-tab shrink-0"
                data-active={on ? "true" : "false"}
              >
                <TabIcon className="size-3.5" aria-hidden />
                <span>{s.tag}</span>
                {on ? (
                  <span
                    key={`${s.id}-${paused}-${lightboxOpen}`}
                    className="partner-tab-progress"
                    style={{
                      animationDuration: `${AUTO_MS}ms`,
                      animationPlayState: paused || lightboxOpen ? "paused" : "running",
                    }}
                  />
                ) : null}
              </button>
            );
          })}
        </div>

        <div
          id="partner-showcase-panel"
          role="tabpanel"
          aria-labelledby={`partner-tab-${slide.id}`}
          className="partner-stage mt-5 grid gap-6 lg:mt-6 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.35fr)] lg:items-start lg:gap-8"
        >
          <div key={slide.id} className="partner-copy flex flex-col justify-center lg:sticky lg:top-28">
            <div className="inline-flex w-fit items-center gap-2 rounded-full border border-primary/25 bg-primary/10 px-3 py-1 font-mono text-[10px] font-bold tracking-[0.16em] text-primary uppercase">
              <Icon className="size-3.5" aria-hidden />
              {slide.badge}
            </div>
            <h3 className="mt-4 font-display text-2xl font-bold tracking-tight text-foreground sm:text-[1.75rem]">
              {slide.title}
            </h3>
            <p className="mt-3 max-w-md text-sm leading-relaxed text-muted-foreground">{slide.body}</p>
            <ul className="mt-5 space-y-2.5">
              {slide.points.map((p) => (
                <li key={p} className="flex items-start gap-2.5 text-sm text-foreground/85">
                  <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-primary" aria-hidden />
                  {p}
                </li>
              ))}
            </ul>
            <div className="mt-7 flex flex-wrap items-center gap-4">
              <SiteLink
                to={ctas.bookDemo.to}
                hash={ctas.bookDemo.hash}
                className="lift inline-flex items-center gap-2 rounded-md bg-primary px-5 py-2.5 text-sm font-bold text-primary-foreground"
              >
                {ctas.bookDemo.label}
                <ArrowRight className="size-4" aria-hidden />
              </SiteLink>
              <button
                type="button"
                onClick={() => setActive((prev) => (prev + 1) % slides.length)}
                className="inline-flex items-center gap-1.5 font-mono text-[10px] tracking-[0.14em] text-primary uppercase"
              >
                Next screen
                <ArrowRight className="size-3.5" aria-hidden />
              </button>
            </div>
          </div>

          <div className="partner-frame">
            <div className="partner-frame-chrome">
              <span className="flex gap-1.5" aria-hidden>
                <span className="size-2.5 rounded-full bg-[#ff5f57]" />
                <span className="size-2.5 rounded-full bg-[#febc2e]" />
                <span className="size-2.5 rounded-full bg-[#28c840]" />
              </span>
              <span className="truncate font-mono text-[10px] tracking-[0.12em] text-muted-foreground uppercase">
                app.seatsbrokers.com / {slide.id}
              </span>
              <span className="flex items-center gap-1.5 font-mono text-[10px] tracking-[0.14em] text-primary uppercase">
                <span className="partner-live-dot" aria-hidden />
                live
              </span>
            </div>

            <button
              type="button"
              className="partner-frame-screen group"
              onClick={() => setLightboxOpen(true)}
              aria-label={`View full size: ${slide.alt}`}
            >
              <img
                key={slide.id}
                src={slide.image}
                alt={slide.alt}
                className="partner-shot"
                loading="eager"
                decoding="async"
              />
              <span className="partner-expand-hint">
                <Expand className="size-3.5" aria-hidden />
                Click to expand
              </span>
            </button>

            <div className="partner-segments" aria-hidden>
              {slides.map((s, i) => (
                <span
                  key={s.id}
                  className="partner-segment"
                  data-state={i === active ? "active" : i < active ? "done" : "idle"}
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      <Dialog open={lightboxOpen} onOpenChange={setLightboxOpen}>
        <DialogContent className="partner-lightbox max-h-[96vh] w-[min(96vw,1200px)] max-w-none gap-0 overflow-hidden border-border bg-background p-0 shadow-2xl sm:rounded-xl">
          <div className="flex items-center justify-between gap-3 border-b border-border px-4 py-3">
            <DialogTitle className="truncate font-display text-sm font-bold text-foreground sm:text-base">
              {slide.tag} — {slide.title}
            </DialogTitle>
            <DialogClose className="inline-flex size-9 shrink-0 items-center justify-center rounded-md border border-border text-muted-foreground transition-colors hover:bg-muted hover:text-foreground">
              <X className="size-4" aria-hidden />
              <span className="sr-only">Close</span>
            </DialogClose>
          </div>
          <div className="partner-lightbox-body">
            <img src={slide.image} alt={slide.alt} className="partner-lightbox-img" />
          </div>
        </DialogContent>
      </Dialog>
    </section>
  );
}
