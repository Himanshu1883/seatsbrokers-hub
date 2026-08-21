import { ArrowRight } from "lucide-react";
import logo from "@/assets/logo-sb.png";
import { brand, footerColumns, footerLegal } from "@/content/site";
import { SiteLink } from "@/components/layout/SiteLink";

export function Footer() {
  return (
    <footer className="site-footer section-curve bg-dark text-background">
      <div className="border-b border-background/10 bg-background/[0.03] py-8 sm:py-10">
        <div className="container-page flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-center">
          <p className="section-eyebrow text-primary">Built for the global ticketing ecosystem</p>
          <p className="max-w-xl text-sm leading-relaxed text-background/65 sm:text-right">
            {brand.tagline} — connecting event data, inventory, marketplaces, pricing and partners
            through one technology platform.
          </p>
        </div>
      </div>

      <div className="container-page grid gap-14 py-20 sm:gap-16 sm:py-24 lg:grid-cols-[1.4fr_2fr_1.4fr] lg:gap-20">
        <div>
          <img
            src={logo}
            alt={brand.name}
            width={566}
            height={174}
            loading="lazy"
            className="brand-logo-on-dark h-16 w-auto max-w-[300px] object-contain sm:h-[4.5rem]"
          />
          <p className="mt-6 max-w-sm text-base leading-relaxed text-background/60">
            Powering the technology behind modern ticket resale. From event discovery and inventory
            management to marketplace distribution, market intelligence and partner sales.
          </p>
          {/* Social icons commented out — restore if needed
          <div className="mt-8 flex gap-3">
            {[Linkedin, Twitter, Instagram].map((Icon, i) => (
              <SiteLink
                key={i}
                to="/contact"
                aria-label="Social profile"
                className="inline-flex size-11 items-center justify-center rounded-md border border-background/15 text-background/70 transition-colors hover:border-primary hover:text-primary"
              >
                <Icon className="size-4" />
              </SiteLink>
            ))}
          </div>
          */}
        </div>

        <div className="grid gap-10 sm:grid-cols-3 sm:gap-8">
          {footerColumns.map((c) => (
            <div key={c.title}>
              <h3 className="font-mono text-[11px] tracking-[0.2em] text-primary">
                {c.title}
              </h3>
              <ul className="mt-5 space-y-3">
                {c.links.map((l) => (
                  <li key={l.label}>
                    <SiteLink
                      to={l.to}
                      hash={l.hash}
                      className="text-sm text-background/70 transition-colors hover:text-background"
                    >
                      {l.label}
                    </SiteLink>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div>
          <h3 className="font-mono text-[11px] tracking-[0.2em] text-primary">
            Newsletter
          </h3>
          <p className="mt-5 text-sm leading-relaxed text-background/65">
            Platform updates, API releases and market intelligence insights for ticket businesses.
          </p>
          <form
            className="site-footer-newsletter mt-5 flex min-w-0 gap-2"
            onSubmit={(e) => {
              e.preventDefault();
              (e.currentTarget as HTMLFormElement).reset();
            }}
          >
            <input
              type="email"
              required
              placeholder="you@company.com"
              aria-label="Email address"
              className="min-w-0 flex-1 rounded-md border border-background/15 bg-background/5 px-3 py-3 text-sm text-background placeholder:text-background/40 focus:border-primary focus:outline-none"
            />
            <button
              type="submit"
              aria-label="Subscribe"
              className="inline-flex items-center justify-center rounded-md bg-primary px-4 text-primary-foreground"
            >
              <ArrowRight className="size-4" />
            </button>
          </form>
          <p className="site-footer-meta mt-8 text-sm leading-relaxed text-background/55">
            <span className="site-footer-offices">{brand.offices}</span>
            <br />
            <span className="site-footer-partners text-[13px]">
              <span className="text-primary">Partners</span>
              {": "}
              <a href={`mailto:${brand.salesEmail}`} className="hover:text-background">
                {brand.salesEmail}
              </a>
              {" · "}
              <a href={`mailto:${brand.email}`} className="hover:text-background">
                {brand.email}
              </a>
            </span>
          </p>
        </div>
      </div>

      <div className="container-page flex flex-col gap-4 border-t border-background/10 py-10 text-xs text-background/50 sm:flex-row sm:items-center sm:justify-between sm:py-12">
        <p className="text-sm">© {new Date().getFullYear()} {brand.name}. All rights reserved.</p>
        <div className="flex flex-wrap gap-5 text-sm">
          {footerLegal.map((l) => (
            <SiteLink key={l.label} to={l.to} hash={l.hash} className="hover:text-background">
              {l.label}
            </SiteLink>
          ))}
        </div>
      </div>
    </footer>
  );
}
