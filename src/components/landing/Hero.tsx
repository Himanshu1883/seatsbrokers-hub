import { useCallback, useEffect, useState, type ReactNode } from "react";
import { useTypewriter } from "@/hooks/use-scroll-motion";
import { HeroDashboardTilt } from "@/components/landing/HeroDashboardTilt";
import { useDemoModal } from "@/components/landing/DemoModal";
import { SiteLink } from "@/components/layout/SiteLink";
import { ctas } from "@/content/site";
import heroStadium1 from "@/assets/hero-stadium-1.webp";
import heroStadium2 from "@/assets/hero-stadium-2.jpg";
import heroStadium3 from "@/assets/hero-stadium-3.jpg";

const SLIDE_MS = 2100;

const slides = [
  {
    image: heroStadium1,
    alt: "SeatsBrokers platform for professional ticket brokers",
    eyebrow: "SeatsBrokers™",
    title: "Technology powering",
    typePhrases: ["professional ticket businesses."],
    body: "Connect your inventory once and manage distribution, pricing, orders, delivery and payments from one system.",
    shortBody: "Connect your inventory once and manage distribution, pricing, orders, delivery and payments from one system.",
    details: [
      "Keep the POS, inventory and ERP you already run",
      "Built for professional ticket brokers — not a consumer marketplace",
    ],
  },
  {
    image: heroStadium2,
    alt: "One platform for the professional ticket operation",
    eyebrow: "One platform",
    title: "Connect once.",
    typePhrases: ["Manage the whole desk."],
    body: "Inventory, pricing, distribution, orders and settlement stay in one workflow — without replacing the stack you already run.",
    shortBody: "Inventory, pricing, distribution, orders and settlement — one connected workflow.",
    details: [
      "Keep the POS, inventory and ERP you already run",
      "Orders, delivery and settlement stay in the same workflow",
    ],
  },
  {
    image: heroStadium3,
    alt: "SeatsBrokers product workflow from opportunity to settlement",
    eyebrow: "Professional ticket trade",
    title: "Operate more efficiently.",
    typePhrases: ["Scale your ticket business."],
    body: "Market intelligence informs the desk — you stay in control.",
    shortBody: "Market intelligence informs the desk — you stay in control.",
    details: [
      "Built for professional ticket brokers — not a consumer marketplace",
      "Travel, concierge and hospitality sit on SeatsConnect, not here",
    ],
  },
] as const;

type HeroSlide = (typeof slides)[number];

function longestPhrase(phrases: readonly string[]) {
  return phrases.reduce((longest, phrase) => (phrase.length > longest.length ? phrase : longest), phrases[0] ?? "");
}

/* The ghost copy holds the longest phrase so the headline line-box never
   resizes while the typewriter types, deletes or switches slides. */
function HeroTypeLine({ phrases, children }: { phrases: readonly string[]; children: ReactNode }) {
  return (
    <span
      className="hero-copy-typewriter hero-copy-typeline mt-2 block min-w-0 max-w-full overflow-x-clip whitespace-nowrap text-[clamp(1.05rem,min(4.6vw,6.8cqi),3.25rem)] leading-[1.2] font-bold text-primary"
      aria-live="polite"
    >
      <span className="hero-copy-typeline-ghosts" aria-hidden>
        {phrases.map((phrase) => (
          <span key={phrase} className="hero-copy-typeline-ghost">
            {phrase}
          </span>
        ))}
      </span>
      <span className="hero-copy-typeline-text caret">{children}</span>
    </span>
  );
}

function HeroTypewriter({ phrases }: { phrases: readonly string[] }) {
  const [reducedMotion, setReducedMotion] = useState(false);
  const typed = useTypewriter([...phrases], 62, 2200);

  useEffect(() => {
    setReducedMotion(window.matchMedia("(prefers-reduced-motion: reduce)").matches);
  }, []);

  const display = reducedMotion ? (phrases[0] ?? "") : typed;

  return <HeroTypeLine phrases={phrases}>{display}</HeroTypeLine>;
}

function HeroSlideCopy({
  slide,
  isActive,
  animate,
}: {
  slide: HeroSlide;
  isActive: boolean;
  animate: boolean;
}) {
  const { openDemoModal } = useDemoModal();
  const typeLine = longestPhrase(slide.typePhrases);
  const item = (delay: number, className: string) =>
    animate ? `${className} hero-copy-item hero-copy-delay-${delay}` : className;

  return (
    <>
      <p
        className={item(
          0,
          "hero-copy-eyebrow inline-flex max-w-full flex-wrap items-center gap-1.5 rounded-full border border-background/20 bg-background/8 px-2 py-0.5 text-pretty font-mono text-white normal-case backdrop-blur-sm",
        )}
      >
        <span className="size-1 shrink-0 rounded-full bg-primary" />
        {slide.eyebrow}
      </p>

      <h1
        className={item(
          1,
          "hero-copy-head mt-5 min-w-0 max-w-full text-[clamp(1.85rem,4.4vw,3.25rem)] leading-[1.2] font-bold text-pretty text-white sm:mt-6",
        )}
      >
        {slide.title}
        {isActive ? (
          <HeroTypewriter phrases={slide.typePhrases} />
        ) : (
          <HeroTypeLine phrases={slide.typePhrases}>{typeLine}</HeroTypeLine>
        )}
      </h1>

      {/* One support line on desktop; shortBody is the phone-lock substitute. */}
      <p
        className={item(
          2,
          "hero-copy-dense mt-5 max-w-2xl text-base leading-relaxed font-semibold text-pretty text-white sm:mt-6 sm:text-[1.0625rem]",
        )}
      >
        {slide.body}
      </p>

      <p
        className={item(
          2,
          "hero-copy-brief mt-3 max-w-2xl text-sm leading-snug font-semibold text-pretty text-white lg:hidden",
        )}
      >
        {slide.shortBody}
      </p>

      <ul
        className={item(
          3,
          "hero-copy-dense mt-6 space-y-2.5 border-l-2 border-primary/45 pl-4 sm:mt-7 sm:pl-5",
        )}
      >
        {slide.details.map((detail) => (
          <li
            key={detail}
            className="flex gap-2.5 text-sm leading-relaxed font-semibold text-white sm:text-[0.9375rem]"
          >
            <span className="mt-2 size-1 shrink-0 rounded-full bg-primary" aria-hidden />
            <span>{detail}</span>
          </li>
        ))}
      </ul>

      <div className={item(4, "hero-copy-actions mt-8 flex w-full min-w-0 flex-col gap-3 sm:mt-9 sm:flex-row sm:flex-wrap")}>
        <button
          type="button"
          onClick={openDemoModal}
          className="lift inline-flex min-h-11 w-full min-w-0 items-center justify-center rounded-md bg-primary px-6 py-3.5 text-sm font-semibold text-primary-foreground sm:w-auto"
          tabIndex={isActive ? 0 : -1}
        >
          {ctas.bookDemo.label}
        </button>
        <SiteLink
          to={ctas.becomeSeller.to}
          className="lift inline-flex min-h-11 w-full min-w-0 items-center justify-center rounded-md border border-background/40 px-6 py-3.5 text-sm font-semibold text-white hover:bg-background/10 sm:w-auto"
          tabIndex={isActive ? 0 : -1}
        >
          {ctas.becomeSeller.label}
        </SiteLink>
      </div>
    </>
  );
}

export function Hero() {
  const [active, setActive] = useState(0);
  const [motionKey, setMotionKey] = useState(0);
  const [paused, setPaused] = useState(false);

  const goTo = useCallback((index: number) => {
    setActive((index + slides.length) % slides.length);
    setMotionKey((k) => k + 1);
  }, []);

  useEffect(() => {
    if (paused) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) return;

    const id = window.setInterval(() => {
      setActive((i) => (i + 1) % slides.length);
      setMotionKey((k) => k + 1);
    }, SLIDE_MS);
    return () => window.clearInterval(id);
  }, [paused]);

  return (
    <section
      id="top"
      className="section-curve-hero hero-fit relative isolate overflow-hidden max-lg:grid max-lg:grid-rows-[auto_minmax(0,1fr)_auto]"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocusCapture={() => setPaused(true)}
      onBlurCapture={() => setPaused(false)}
    >
      <div className="absolute inset-0 -z-20" aria-hidden>
        {slides.map((s, i) => (
          <div
            key={s.alt}
            className={`absolute inset-0 transition-opacity duration-[1400ms] ease-out ${
              i === active ? "opacity-100" : "opacity-0"
            }`}
          >
            <img
              src={s.image}
              alt=""
              width={1920}
              height={1080}
              className={`size-full object-cover ${i === active ? "hero-ken-burns" : "scale-100"}`}
            />
          </div>
        ))}
      </div>

      <div className="absolute inset-0 -z-10" aria-hidden>
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_58%_at_52%_44%,rgb(0_0_0_/_0.54)_0%,rgb(0_0_0_/_0.60)_38%,rgb(0_0_0_/_0.72)_72%,rgb(0_0_0_/_0.90)_100%)]" />
        <div className="absolute inset-0 bg-linear-to-b from-black/72 via-transparent via-42% to-black/50" />
        <div className="absolute inset-0 bg-linear-to-r from-black/58 via-transparent via-48% to-transparent" />
      </div>

      <div className="hero-fit-zoom">
        <div className="hero-fit-offset pointer-events-none shrink-0" aria-hidden />

        <div className="hero-fit-main flex min-h-0 items-center overflow-visible">
          <div className="container-page flex min-h-0 w-full flex-col py-6 sm:py-8">
            <div className="hero-fit-grid grid min-h-0 min-w-0 items-center gap-6 lg:isolate lg:grid-cols-[minmax(0,1fr)_minmax(0,1.08fr)] lg:items-start lg:justify-center lg:gap-x-10 xl:gap-x-12">
              <div className="hero-copy @container w-full min-w-0 max-w-3xl overflow-x-clip lg:relative lg:z-20 lg:max-w-none lg:pr-[clamp(1rem,2.8vw,2.25rem)]">
                {slides.map((s, i) => {
                  const isActive = i === active;
                  return (
                    <div
                      key={s.alt}
                      className={`hero-copy-layer ${isActive ? "hero-copy-layer-active" : "hero-copy-layer-measure"}`}
                      aria-hidden={!isActive}
                    >
                      <HeroSlideCopy slide={s} isActive={isActive} animate={isActive} key={isActive ? motionKey : s.alt} />
                    </div>
                  );
                })}
              </div>

              <div className="hero-fit-console hero-copy-item hero-copy-delay-3 relative z-0 mx-auto w-full min-h-0 min-w-0 max-w-xl lg:mx-0 lg:max-w-none lg:pl-0 lg:[clip-path:inset(-3rem_0_-3rem_0)] lg:[&_.hero-tilt-card]:origin-[right_center]">
                <HeroDashboardTilt slide={active} swapKey={motionKey} />
              </div>
            </div>
          </div>
        </div>

        <div className="hero-fit-dots container-page flex justify-end">
          <div className="flex items-center gap-2" role="tablist" aria-label="Hero slides">
            {slides.map((s, i) => (
              <button
                key={s.alt}
                type="button"
                role="tab"
                aria-selected={i === active}
                aria-label={`Slide ${i + 1}: ${s.eyebrow}`}
                onClick={() => goTo(i)}
                className={`group relative h-2 overflow-hidden rounded-full transition-all duration-300 ${
                  i === active ? "w-10 bg-background/25" : "w-2 bg-background/35 hover:bg-background/50"
                }`}
              >
                {i === active && (
                  <span
                    key={motionKey}
                    className="hero-slide-progress absolute inset-y-0 left-0 rounded-full bg-primary"
                    style={{ animationDuration: `${SLIDE_MS}ms` }}
                  />
                )}
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
