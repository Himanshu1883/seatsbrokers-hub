import type { LucideIcon } from "lucide-react";
import {
  ArrowRight,
  BarChart3,
  CalendarDays,
  FileText,
  Globe2,
  Layers3,
  ListChecks,
  Truck,
  Users,
} from "lucide-react";
import { Reveal } from "@/hooks/use-scroll-motion";
import { SiteLink } from "@/components/layout/SiteLink";
import { apiProducts, apiProductsCopy } from "@/content/api-hero-data";
import { ctas } from "@/content/site";
import { eventBackdrops } from "@/lib/event-backdrops";
import categoryPrices from "@/assets/product-showcase/category-prices-light.png";

const productIcons: Record<(typeof apiProducts)[number]["id"], LucideIcon> = {
  events: CalendarDays,
  inventory: Layers3,
  listing: ListChecks,
  order: FileText,
  pricing: BarChart3,
  delivery: Truck,
  partner: Users,
};

const productShots: Record<(typeof apiProducts)[number]["id"], string> = {
  events: eventBackdrops.footballNight,
  inventory: eventBackdrops.venueSeats,
  listing: eventBackdrops.concertCrowd,
  order: eventBackdrops.basketball,
  pricing: categoryPrices,
  delivery: eventBackdrops.musicStage,
  partner: eventBackdrops.footballPitch,
};

export function ApiProductBoard() {
  return (
    <section
      className="apc-section section-curve relative isolate scroll-mt-24 py-20 sm:py-24"
      aria-labelledby="api-products-title"
    >
      <div className="apc-net" aria-hidden />
      <div className="apc-glow" aria-hidden />

      <div className="container-page relative z-10">
        <p className="apc-note apc-note-right">{apiProductsCopy.noteRight}</p>
        <Reveal className="apc-head">
          <p className="section-eyebrow text-primary">{apiProductsCopy.eyebrow}</p>
          <h2 id="api-products-title">
            {apiProductsCopy.titleBefore}
            <em>{apiProductsCopy.titleAccent}</em>
            {apiProductsCopy.titleAfter}
          </h2>
          <p>{apiProductsCopy.intro}</p>
        </Reveal>

        <Reveal delay={80}>
          <ul className="apc-grid">
            {apiProducts.map((item) => {
              const Icon = productIcons[item.id];
              return (
                <li key={item.id} className="apc-card">
                  <div className="apc-shot" data-shot={item.id}>
                    <img src={productShots[item.id]} alt="" decoding="async" />
                    <span className="apc-pill">API</span>
                    {item.caption ? <span className="apc-caption">{item.caption}</span> : null}
                  </div>
                  <div className="apc-body">
                    <div className="apc-body-top">
                      <span className="apc-icon" aria-hidden>
                        <Icon className="size-4" strokeWidth={1.75} />
                      </span>
                      <SiteLink to={ctas.viewApiDocs.to} className="apc-go" aria-label={`${item.title} documentation`}>
                        <ArrowRight className="size-3.5" strokeWidth={2.25} />
                      </SiteLink>
                    </div>
                    <h3>{item.title}</h3>
                    <p>{item.body}</p>
                    <p className="apc-tags">
                      {item.tags.map((tag, index) => (
                        <span key={tag}>
                          {index > 0 ? <span aria-hidden> | </span> : null}
                          {tag}
                        </span>
                      ))}
                    </p>
                  </div>
                </li>
              );
            })}
          </ul>
        </Reveal>

        <Reveal delay={140} className="apc-foot">
          <p className="apc-note apc-note-left">{apiProductsCopy.noteLeft}</p>
          <div className="page-cta-row apc-ctas">
            <SiteLink
              to={ctas.viewApiDocs.to}
              className="lift inline-flex min-h-11 items-center justify-center whitespace-nowrap rounded-md bg-primary px-6 py-3.5 text-sm font-semibold text-primary-foreground"
            >
              {ctas.viewApiDocs.label}
              <ArrowRight className="ml-1.5 size-4" strokeWidth={2} />
            </SiteLink>
            <SiteLink
              to={ctas.requestApiAccess.to}
              className="lift inline-flex min-h-11 items-center justify-center whitespace-nowrap rounded-md border border-border bg-background px-6 py-3.5 text-sm font-semibold text-foreground hover:bg-surface"
            >
              {ctas.requestApiAccess.label}
            </SiteLink>
          </div>
          <p className="apc-trust">
            <Globe2 className="size-3.5" strokeWidth={1.75} aria-hidden />
            {apiProductsCopy.noteTrust}
          </p>
        </Reveal>
      </div>
    </section>
  );
}
