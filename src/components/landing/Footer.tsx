import { Linkedin, Twitter, Instagram, ArrowRight } from "lucide-react";
import logo from "@/assets/seatsbrokers-logo.svg.asset.json";

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
    <footer className="bg-dark pt-16 pb-8 text-background">
      <div className="container-page grid gap-12 lg:grid-cols-[1.4fr_2fr_1.4fr]">
        <div>
          <img
            src={logo.url}
            alt="SeatsBrokers"
            width={566}
            height={174}
            loading="lazy"
            className="h-9 w-auto brightness-0 invert"
          />
          <p className="mt-5 max-w-xs text-sm text-background/60">
            B2B live-event ticket distribution and marketplace intelligence. Thirty years of moving
            real seats.
          </p>
          <div className="mt-6 flex gap-3">
            {[Linkedin, Twitter, Instagram].map((Icon, i) => (
              <a
                key={i}
                href="#contact"
                aria-label="Social profile"
                className="inline-flex size-9 items-center justify-center rounded-md border border-background/15 text-background/70 transition-colors hover:border-primary hover:text-primary"
              >
                <Icon className="size-4" />
              </a>
            ))}
          </div>
        </div>

        <div className="grid gap-8 sm:grid-cols-3">
          {columns.map((c) => (
            <div key={c.title}>
              <h3 className="font-mono text-[11px] tracking-[0.2em] text-primary uppercase">
                {c.title}
              </h3>
              <ul className="mt-4 space-y-2.5">
                {c.links.map((l) => (
                  <li key={l}>
                    <a href="#contact" className="text-sm text-background/65 hover:text-background">
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
          <p className="mt-4 text-sm text-background/65">
            Stay in the loop — affiliate updates & seasonal promo packs.
          </p>
          <form
            className="mt-4 flex gap-2"
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
              className="w-full rounded-md border border-background/15 bg-background/5 px-3 py-2.5 text-sm text-background placeholder:text-background/40 focus:border-primary focus:outline-none"
            />
            <button
              type="submit"
              aria-label="Subscribe"
              className="inline-flex items-center justify-center rounded-md bg-primary px-3.5 text-primary-foreground"
            >
              <ArrowRight className="size-4" />
            </button>
          </form>
          <p className="mt-6 text-xs text-background/50">
            London · New York · Dubai
            <br />
            partners@seatsbrokers.com
          </p>
        </div>
      </div>

      <div className="container-page mt-14 flex flex-col gap-3 border-t border-background/10 pt-6 text-xs text-background/50 sm:flex-row sm:items-center sm:justify-between">
        <p>© {new Date().getFullYear()} SeatsBrokers. All rights reserved.</p>
        <div className="flex gap-5">
          <a href="#contact" className="hover:text-background">Privacy Policy</a>
          <a href="#contact" className="hover:text-background">Terms of Service</a>
          <a href="#contact" className="hover:text-background">Cookies</a>
        </div>
      </div>
    </footer>
  );
}