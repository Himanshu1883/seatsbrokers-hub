import { useEffect, useRef, useState } from "react";
import { Menu, X } from "lucide-react";
import { Link, useRouterState } from "@tanstack/react-router";
import logo from "@/assets/seatsbrokers-logo.png";
import { brand, ctas, navLinks } from "@/content/site";
import { SiteLink } from "@/components/layout/SiteLink";

function isNavActive(pathname: string, to: string) {
  if (to === "/") return pathname === "/";
  return pathname === to || pathname.startsWith(`${to}/`);
}

function hashProps(link: (typeof navLinks)[number]) {
  return "hash" in link && link.hash ? { hash: link.hash } : {};
}

export function Nav() {
  const [open, setOpen] = useState(false);
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const visibleNavLinks = navLinks.filter((l) => !l.hidden);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const sheetRef = useRef<HTMLDivElement>(null);
  const wasOpen = useRef(false);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 1024px)");
    const onChange = () => {
      if (mq.matches) setOpen(false);
    };
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  useEffect(() => {
    if (!open) return;

    const html = document.documentElement;
    const body = document.body;
    const scrollY = window.scrollY;
    const prev = {
      htmlOverflow: html.style.overflow,
      bodyOverflow: body.style.overflow,
      bodyPosition: body.style.position,
      bodyTop: body.style.top,
      bodyWidth: body.style.width,
      bodyOverscroll: body.style.overscrollBehavior,
    };

    html.classList.add("site-nav-locked");
    html.style.overflow = "hidden";
    body.style.overflow = "hidden";
    body.style.position = "fixed";
    body.style.top = `-${scrollY}px`;
    body.style.width = "100%";
    body.style.overscrollBehavior = "none";

    return () => {
      html.classList.remove("site-nav-locked");
      html.style.overflow = prev.htmlOverflow;
      body.style.overflow = prev.bodyOverflow;
      body.style.position = prev.bodyPosition;
      body.style.top = prev.bodyTop;
      body.style.width = prev.bodyWidth;
      body.style.overscrollBehavior = prev.bodyOverscroll;
      window.scrollTo(0, scrollY);
    };
  }, [open]);

  useEffect(() => {
    if (open) {
      wasOpen.current = true;
      sheetRef.current?.focus();
      return;
    }
    if (wasOpen.current) {
      wasOpen.current = false;
      toggleRef.current?.focus();
    }
  }, [open]);

  useEffect(() => {
    if (!open) return;

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        setOpen(false);
        return;
      }
      if (e.key !== "Tab") return;

      const root = document.getElementById("site-nav");
      if (!root) return;
      const focusable = Array.from(
        root.querySelectorAll<HTMLElement>("a[href], button:not([disabled])"),
      ).filter((el) => el.tabIndex !== -1);

      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (!first || !last) return;
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };

    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <header id="site-nav" className="site-nav">
      <div className="site-nav-bar">
        <nav
          className="container-nav relative z-10 flex h-18 w-full min-w-0 items-center justify-between gap-3 lg:gap-6"
          aria-label="Primary"
        >
          <Link
            to="/"
            activeOptions={{ exact: true }}
            className="site-nav-brand flex min-w-0 items-center"
            onClick={() => {
              setOpen(false);
              window.scrollTo(0, 0);
            }}
          >
            <span className="site-nav-logo-fit">
              <img
                src={logo}
                alt={brand.name}
                width={300}
                height={92}
                className="site-nav-logo-img"
              />
            </span>
          </Link>

          <div className="hidden items-center gap-7 lg:flex">
            {visibleNavLinks.map((l) => {
              const active = isNavActive(pathname, l.to);
              return (
                <SiteLink
                  key={`${l.to}${"hash" in l && l.hash ? `#${l.hash}` : ""}`}
                  to={l.to}
                  {...hashProps(l)}
                  aria-current={active ? "page" : undefined}
                  className={`text-sm font-medium transition-colors hover:text-primary ${
                    active
                      ? "text-primary decoration-primary decoration-2 underline-offset-4"
                      : "text-foreground"
                  }`}
                >
                  {l.label}
                </SiteLink>
              );
            })}
          </div>

          <div className="hidden items-center gap-3 lg:flex">
            <SiteLink
              to={ctas.login.to}
              className="lift rounded-md bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground hover:bg-primary/90"
            >
              {ctas.login.label}
            </SiteLink>
          </div>

          <button
            ref={toggleRef}
            type="button"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            aria-controls="site-nav-menu"
            onClick={() => setOpen((o) => !o)}
            className="site-nav-toggle relative z-10 inline-flex size-11 shrink-0 items-center justify-center rounded-lg text-foreground transition-colors lg:hidden"
          >
            <Menu
              className={`absolute size-6 transition-all duration-200 ${
                open ? "rotate-45 opacity-0" : "rotate-0 opacity-100"
              }`}
            />
            <X
              className={`absolute size-6 transition-all duration-200 ${
                open ? "rotate-0 opacity-100" : "-rotate-45 opacity-0"
              }`}
            />
          </button>
        </nav>
      </div>

      <div
        className="site-nav-layer lg:hidden"
        data-open={open ? "true" : "false"}
        inert={!open}
        aria-hidden={!open}
      >
        <button
          type="button"
          className="site-nav-backdrop"
          tabIndex={-1}
          aria-label="Close menu"
          onClick={() => setOpen(false)}
        />
        <div
          id="site-nav-menu"
          ref={sheetRef}
          className="site-nav-sheet"
          role="dialog"
          aria-modal="true"
          aria-label="Menu"
          tabIndex={-1}
        >
          <div className="site-nav-links container-nav">
            {visibleNavLinks.map((l) => {
              const active = isNavActive(pathname, l.to);
              return (
                <SiteLink
                  key={`mobile-${l.to}${"hash" in l && l.hash ? `#${l.hash}` : ""}`}
                  to={l.to}
                  {...hashProps(l)}
                  onClick={() => setOpen(false)}
                  aria-current={active ? "page" : undefined}
                  className={`site-nav-link ${active ? "is-active" : ""}`}
                >
                  {l.label}
                </SiteLink>
              );
            })}
          </div>

          <div className="site-nav-ctas container-nav">
            <SiteLink
              to={ctas.login.to}
              onClick={() => setOpen(false)}
              className="site-nav-cta bg-primary font-semibold text-primary-foreground hover:bg-primary/90"
            >
              {ctas.login.label}
            </SiteLink>
          </div>
        </div>
      </div>
    </header>
  );
}
