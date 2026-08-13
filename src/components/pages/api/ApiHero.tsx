import { Reveal } from "@/hooks/use-scroll-motion";
import { SiteLink } from "@/components/layout/SiteLink";
import { apiHeroCopy } from "@/content/api-hero-data";
import { ctas } from "@/content/site";
import { Code2 } from "lucide-react";
import { ApiDocsWall } from "./ApiDocsWall";

export function ApiHero() {
  return (
    <section className="bh-hero section-curve relative isolate scroll-mt-24 overflow-hidden bg-dark text-background">
      <div
        className="pointer-events-none absolute inset-0 bg-linear-to-br from-dark via-dark to-primary-deep/40"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute -right-24 top-1/4 h-96 w-96 rounded-full bg-primary/10 blur-3xl"
        aria-hidden
      />

      <div className="container-page relative z-10">
        <div className="bh-layout">
          <Reveal className="bh-copy">
            <span className="bh-copy-icon" aria-hidden>
              <Code2 className="size-4" strokeWidth={1.75} />
            </span>
            <p className="section-eyebrow text-primary">{apiHeroCopy.eyebrow}</p>
            <h1 className="bh-title">{apiHeroCopy.title}</h1>
            <p className="bh-subhead">{apiHeroCopy.subhead}</p>
            <p className="bh-body">{apiHeroCopy.body}</p>
            <ul className="bh-points">
              <li>Events, inventory, listings, orders, pricing, delivery and partner APIs</li>
              <li>Secure authentication, role-based access and audit logs</li>
              <li>Real-time synchronization for POS, ERP, websites and partner systems</li>
            </ul>
            <div className="bh-ctas">
              <SiteLink
                to={ctas.bookDemo.to}
                className="lift rounded-md bg-primary px-6 py-3.5 text-sm font-semibold text-primary-foreground"
              >
                {ctas.bookDemo.label}
              </SiteLink>
              <SiteLink
                to={ctas.requestApiAccess.to}
                className="lift rounded-md border border-background/40 px-6 py-3.5 text-sm font-semibold text-background hover:bg-background/10"
              >
                {ctas.requestApiAccess.label}
              </SiteLink>
            </div>
          </Reveal>

          <Reveal delay={120} className="bh-stage">
            <ApiDocsWall />
          </Reveal>
        </div>
      </div>
    </section>
  );
}
