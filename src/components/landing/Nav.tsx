import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import logo from "@/assets/seatsbrokers-logo.png";

const links = [
  { label: "About Us", href: "#about" },
  { label: "Seller Partners", href: "#sellers" },
  { label: "Travel Partners", href: "#travel" },
  { label: "Affiliates", href: "#network" },
  { label: "Contact", href: "#contact" },
];

export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled
          ? "border-b border-border bg-background/90 backdrop-blur-xl"
          : "border-b border-transparent bg-transparent"
      }`}
    >
      <nav className="container-nav flex h-18 w-full items-center justify-between gap-6 py-3 lg:py-3.5">
        <a href="#top" className="flex items-center">
          <img
            src={logo}
            alt="SeatsBrokers"
            width={566}
            height={174}
            className="h-14 w-auto max-w-[min(100%,280px)] object-contain sm:h-16"
          />
        </a>

        <div className="hidden items-center gap-7 lg:flex">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className={`text-sm font-medium transition-colors hover:text-primary ${
                scrolled ? "text-muted-foreground" : "text-background/80"
              }`}
            >
              {l.label}
            </a>
          ))}
        </div>

        <div className="hidden items-center gap-3 lg:flex">
          <a
            href="#contact"
            className={`rounded-md px-4 py-2 text-sm font-medium transition-colors ${
              scrolled
                ? "text-foreground hover:bg-secondary"
                : "text-background hover:bg-background/10"
            }`}
          >
            Login
          </a>
          <a
            href="#sellers"
            className="lift rounded-md border border-transparent bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground"
          >
            Get Started
          </a>
        </div>

        <button
          type="button"
          aria-label="Toggle menu"
          onClick={() => setOpen((o) => !o)}
          className={`lg:hidden ${scrolled ? "text-foreground" : "text-background"}`}
        >
          {open ? <X className="size-6" /> : <Menu className="size-6" />}
        </button>
      </nav>

      {open && (
        <div className="border-t border-border bg-background lg:hidden">
          <div className="container-nav flex flex-col gap-1 py-4">
            {links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className="rounded-md px-2 py-2.5 text-sm font-medium text-muted-foreground hover:bg-secondary hover:text-foreground"
              >
                {l.label}
              </a>
            ))}
            <a
              href="#sellers"
              onClick={() => setOpen(false)}
              className="mt-2 rounded-md bg-primary px-4 py-2.5 text-center text-sm font-semibold text-primary-foreground"
            >
              Get Started
            </a>
          </div>
        </div>
      )}
    </header>
  );
}