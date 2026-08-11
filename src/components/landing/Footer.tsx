import { Linkedin, Twitter, Instagram, ArrowRight } from "lucide-react";
import logo from "@/assets/seatsbrokers-logo.png";

const columns = [
  {
    title: "Platform",
    links: ["Seller Partners", "Travel Partners", "Market Intelligence", "Integrations"],
  },
  { title: "Programs", links: ["Affiliates", "Rights Holders", "Corporate Hospitality", "API Docs"] },
  { title: "Company", links: ["About Us", "Careers", "Press", "Contact"] },
];

export function Footer() {
  return (
    <footer className="section-curve bg-dark text-background">
      <div className="border-b border-background/10 bg-background/[0.03] py-8 sm:py-10">
        <div className="container-page flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-center">
          <p className="section-eyebrow text-primary">
            Global B2B ticket infrastructure
          </p>
          <p className="max-w-xl text-sm leading-relaxed text-background/65 sm:text-right">
            Thirty years moving real seats — London, New York, Dubai, and every major marketplace
            your buyers already use.
          </p>
        </div>
      </div>

      <div className="container-page grid gap-14 py-20 sm:gap-16 sm:py-24 lg:grid-cols-[1.4fr_2fr_1.4fr] lg:gap-20">
        <div>
          <img
            src={logo}
            alt="SeatsBrokers"
            width={566}
            height={174}
            loading="lazy"
            className="h-16 w-auto max-w-[300px] object-contain sm:h-[4.5rem]"
          />
          <p className="mt-6 max-w-sm text-base leading-relaxed text-background/60">
            B2B live-event ticket distribution and marketplace intelligence. Thirty years of moving
            real seats.
          </p>
          <div className="mt-8 flex gap-3">
            {[Linkedin, Twitter, Instagram].map((Icon, i) => (
              <a
                key={i}
                href="#contact"
                aria-label="Social profile"
                className="inline-flex size-11 items-center justify-center rounded-md border border-background/15 text-background/70 transition-colors hover:border-primary hover:text-primary"
              >
                <Icon className="size-4" />
              </a>
            ))}
          </div>
        </div>

        <div className="grid gap-10 sm:grid-cols-3 sm:gap-8">
          {columns.map((c) => (
            <div key={c.title}>
              <h3 className="font-mono text-[11px] tracking-[0.2em] text-primary uppercase">
                {c.title}
              </h3>
              <ul className="mt-5 space-y-3">
                {c.links.map((l) => (
                  <li key={l}>
                    <a
                      href="#contact"
                      className="text-sm text-background/70 transition-colors hover:text-background"
                    >
                      {l}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div>
          <h3 className="font-mono text-[11px] tracking-[0.2em] text-primary uppercase">
            Newsletter
          </h3>
          <p className="mt-5 text-sm leading-relaxed text-background/65">
            Stay in the loop — affiliate updates & seasonal promo packs.
          </p>
          <form
            className="mt-5 flex gap-2"
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
              className="w-full rounded-md border border-background/15 bg-background/5 px-3 py-3 text-sm text-background placeholder:text-background/40 focus:border-primary focus:outline-none"
            />
            <button
              type="submit"
              aria-label="Subscribe"
              className="inline-flex items-center justify-center rounded-md bg-primary px-4 text-primary-foreground"
            >
              <ArrowRight className="size-4" />
            </button>
          </form>
          <p className="mt-8 text-sm leading-relaxed text-background/55">
            London · New York · Dubai
            <br />
            partners@seatsbrokers.com
          </p>
        </div>
      </div>

      <div className="container-page flex flex-col gap-4 border-t border-background/10 py-10 text-xs text-background/50 sm:flex-row sm:items-center sm:justify-between sm:py-12">
        <p className="text-sm">© {new Date().getFullYear()} SeatsBrokers. All rights reserved.</p>
        <div className="flex flex-wrap gap-5 text-sm">
          <a href="#contact" className="hover:text-background">
            Privacy Policy
          </a>
          <a href="#contact" className="hover:text-background">
            Terms of Service
          </a>
          <a href="#contact" className="hover:text-background">
            Cookies
          </a>
        </div>
      </div>
    </footer>
  );
}
