import { useCallback, useEffect, useState, type ReactNode } from "react";
import {
  ArrowRight,
  Box,
  Briefcase,
  CreditCard,
  FolderCog,
  Globe,
  Link2,
  RefreshCw,
  Search,
  ShoppingCart,
  TrendingUp,
} from "lucide-react";
import { useTypewriter, HERO_LITE_MQ, matchesHeroLite } from "@/hooks/use-scroll-motion";
import { HeroDashboardTilt } from "@/components/landing/HeroDashboardTilt";
import { useDemoModal } from "@/components/landing/DemoModal";
import { SiteLink } from "@/components/layout/SiteLink";
import { workflowStages } from "@/content/modules";
import { ctas } from "@/content/site";
import heroStadium1 from "@/assets/hero-stadium-1.webp";
import heroStadium2 from "@/assets/hero-stadium-2.jpg";
import heroStadium3 from "@/assets/hero-stadium-3.jpg";

const SLIDE_MS = 2100;

const featureHighlights = [
  {
    title: "One inventory layer",
    detail: "Across all channels",
    icon: Search,
  },
  {
    title: "Keep your systems",
    detail: "POS, ERP, Inventory",
    icon: FolderCog,
  },
  {
    title: "Real-time sync",
    detail: "Accurate & reliable",
    icon: RefreshCw,
  },
  {
    title: "Built for brokers",
    detail: "Ticket brokers first",
    icon: Briefcase,
  },
] as const;

const workflowHighlights = [
  { stage: workflowStages[0], detail: "Market intelligence", icon: Search },
  { stage: workflowStages[1], detail: "Find & secure inventory", icon: Box },
  { stage: workflowStages[2], detail: "AI pricing intelligence", icon: TrendingUp },
  { stage: workflowStages[3], detail: "System & channel connectivity", icon: Link2 },
  { stage: workflowStages[4], detail: "Global channel distribution", icon: Globe },
  { stage: workflowStages[5], detail: "Quotes, orders & CRM", icon: ShoppingCart },
  { stage: workflowStages[6], detail: "Payments & settlements", icon: CreditCard },
] as const;

const slides = [
  {
    image: heroStadium1,
    alt: "SeatsBrokers platform for professional ticket brokers",
    eyebrow: "One platform.",
    title: "Technology powering",
    typePhrases: ["professional ticket businesses."],
    body: "Connect your inventory once and manage distribution, pricing, orders, delivery and payments from one intelligent infrastructure layer.",
    shortBody:
      "Connect your inventory once and manage distribution, pricing, orders, delivery and payments from one intelligent infrastructure layer.",
  },
  {
    image: heroStadium2,
    alt: "One platform for the professional ticket operation",
    eyebrow: "One platform.",
    title: "Connect once.",
    typePhrases: ["Manage the whole desk."],
    body: "Inventory, pricing, distribution, orders and settlement stay in one workflow — without replacing the stack you already run.",
    shortBody: "Inventory, pricing, distribution, orders and settlement — one connected workflow.",
  },
  {
    image: heroStadium3,
    alt: "SeatsBrokers product workflow from opportunity to settlement",
    eyebrow: "One platform.",
    title: "Operate more efficiently.",
    typePhrases: ["Scale your ticket business."],
    body: "Market intelligence informs the desk — you stay in control of pricing, distribution and settlement.",
    shortBody: "Market intelligence informs the desk — you stay in control.",
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
      className="hero-copy-typewriter hero-copy-typeline mt-2 block min-w-0 max-w-full text-[clamp(1.05rem,min(4.6vw,6.8cqi),3.25rem)] leading-[1.2] font-bold text-primary"
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
  const [lite, setLite] = useState(matchesHeroLite);
  const typed = useTypewriter([...phrases], 62, 2200, !lite);

  useEffect(() => {
    const mq = window.matchMedia(HERO_LITE_MQ);
    const sync = () => setLite(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

  const display = lite ? (phrases[0] ?? "") : typed;

  return <HeroTypeLine phrases={phrases}>{display}</HeroTypeLine>;
}

function HeroFeatureRow() {
  return (
    <ul className="hero-copy-features" aria-label="Platform highlights">
      {featureHighlights.map(({ title, detail, icon: Icon }) => (
        <li key={title} className="hero-copy-feature">
          <span className="hero-copy-feature-icon" aria-hidden>
            <Icon className="size-4" strokeWidth={1.75} />
          </span>
          <span className="hero-copy-feature-copy">
            <strong>{title}</strong>
            <span>{detail}</span>
          </span>
        </li>
      ))}
    </ul>
  );
}

function HeroWorkflowBar() {
  return (
    <div className="hero-workflow">
      <ol className="hero-workflow-rail" aria-label="Discover to Settle workflow">
        {workflowHighlights.map(({ stage, detail, icon: Icon }, index) => (
          <li key={stage} className="hero-workflow-item">
            <span className="hero-workflow-icon" aria-hidden>
              <Icon className="size-4" strokeWidth={1.75} />
            </span>
            <span className="hero-workflow-copy">
              <strong>{stage}</strong>
              <span>{detail}</span>
            </span>
            {index < workflowHighlights.length - 1 ? (
              <span className="hero-workflow-join" aria-hidden>
                <ArrowRight className="size-3.5" strokeWidth={2} />
              </span>
            ) : null}
          </li>
        ))}
      </ol>
      <p className="hero-workflow-caption">One connected workflow. Seven powerful products.</p>
    </div>
  );
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
          "hero-copy-eyebrow inline-flex max-w-full flex-wrap items-center gap-1.5 rounded-full border border-background/25 bg-black/35 px-2.5 py-0.5 text-pretty font-mono text-white normal-case backdrop-blur-sm",
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

      <div className={item(3, "hero-copy-actions mt-8 flex w-full min-w-0 flex-col gap-3 sm:mt-9 sm:flex-row sm:flex-wrap")}>
        <button
          type="button"
          onClick={openDemoModal}
          className="hero-copy-cta-primary lift inline-flex min-h-11 w-full min-w-0 items-center justify-center rounded-md bg-primary px-6 py-3.5 text-sm font-semibold text-white sm:w-auto"
          tabIndex={isActive ? 0 : -1}
        >
          {ctas.bookDemo.label}
        </button>
        <SiteLink
          to={ctas.becomeSeller.to}
          className="hero-copy-cta-outline lift inline-flex min-h-11 w-full min-w-0 items-center justify-center rounded-md border border-background/55 px-6 py-3.5 text-sm font-semibold text-white hover:bg-background/10 sm:w-auto"
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
  const [lite, setLite] = useState(matchesHeroLite);

  const goTo = useCallback((index: number) => {
    setActive((index + slides.length) % slides.length);
    setMotionKey((k) => k + 1);
  }, []);

  useEffect(() => {
    const mq = window.matchMedia(HERO_LITE_MQ);
    const sync = () => setLite(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

  useEffect(() => {
    if (lite || paused) return;

    const id = window.setInterval(() => {
      setActive((i) => (i + 1) % slides.length);
      setMotionKey((k) => k + 1);
    }, SLIDE_MS);
    return () => window.clearInterval(id);
  }, [paused, lite]);

  return (
    <section
      id="top"
      className="section-curve-hero hero-fit relative isolate overflow-hidden max-lg:grid max-lg:grid-rows-[auto_minmax(0,1fr)_auto]"
      data-lite={lite ? "true" : undefined}
      onMouseEnter={() => {
        if (!lite) setPaused(true);
      }}
      onMouseLeave={() => {
        if (!lite) setPaused(false);
      }}
      onFocusCapture={() => {
        if (!lite) setPaused(true);
      }}
      onBlurCapture={() => {
        if (!lite) setPaused(false);
      }}
    >
      <div className="absolute inset-0 -z-20" aria-hidden>
        {lite ? (
          <div className="absolute inset-0">
            <img
              src={(slides[active] ?? slides[0]).image}
              alt=""
              width={1920}
              height={1080}
              decoding="async"
              fetchPriority="high"
              className="size-full object-cover"
            />
          </div>
        ) : (
          slides.map((s, i) => (
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
                decoding="async"
                className={`size-full object-cover ${i === active ? "hero-ken-burns" : "scale-100"}`}
              />
            </div>
          ))
        )}
      </div>

      {/* Lighter stadium vignette — copy stays readable without crushing the photo. */}
      <div className="hero-fit-veil absolute inset-0 -z-10" aria-hidden>
        <div className="hero-fit-veil-base absolute inset-0" />
        <div className="hero-fit-veil-left absolute inset-0" />
        <div className="hero-fit-veil-top absolute inset-0" />
        <div className="hero-fit-veil-bottom absolute inset-0" />
      </div>

      <div className="hero-fit-zoom">
        <div className="hero-fit-offset pointer-events-none shrink-0" aria-hidden />

        <div className="hero-fit-main flex min-h-0 items-center overflow-visible">
          <div className="container-page flex min-h-0 w-full flex-col py-6 sm:py-8">
            <div className="hero-fit-grid grid min-h-0 min-w-0 w-full max-w-[70rem] mx-auto items-center gap-6 lg:isolate lg:grid-cols-[minmax(0,1.05fr)_minmax(22rem,32.5rem)] lg:items-center lg:justify-center lg:gap-x-7 xl:gap-x-8 min-[1920px]:max-w-none min-[1920px]:grid-cols-[minmax(0,1fr)_minmax(0,1.08fr)] min-[1920px]:gap-x-10 min-[1920px]:items-start">
              <div className="hero-copy @container w-full min-w-0 max-w-3xl max-lg:overflow-x-visible overflow-x-clip lg:relative lg:z-20 lg:max-w-[32.5rem] lg:pr-0 min-[1920px]:max-w-none min-[1920px]:pr-[clamp(1rem,2.8vw,2.25rem)]">
                {slides.map((s, i) => {
                  const isActive = i === active;
                  return (
                    <div
                      key={s.alt}
                      className={`hero-copy-layer ${isActive ? "hero-copy-layer-active" : "hero-copy-layer-measure"}`}
                      aria-hidden={!isActive}
                    >
                      <HeroSlideCopy
                        slide={s}
                        isActive={isActive}
                        animate={isActive && !lite}
                        key={isActive && !lite ? motionKey : s.alt}
                      />
                    </div>
                  );
                })}
                <HeroFeatureRow />
              </div>

              <div className="hero-fit-console hero-copy-item hero-copy-delay-3 relative z-0 mx-auto w-full min-h-0 min-w-0 max-w-xl lg:mx-0 lg:max-w-[32.5rem] lg:justify-self-end lg:[clip-path:inset(-3rem_0_-3rem_0)] lg:[&_.hero-tilt-card]:origin-center min-[1920px]:max-w-none min-[1920px]:[&_.hero-tilt-card]:origin-[right_center]">
                <HeroDashboardTilt slide={active} swapKey={lite ? 0 : motionKey} />
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
                {i === active && !lite && (
                  <span
                    key={motionKey}
                    className="hero-slide-progress absolute inset-y-0 left-0 rounded-full bg-primary"
                    style={{ animationDuration: `${SLIDE_MS}ms` }}
                  />
                )}
                {i === active && lite ? (
                  <span className="absolute inset-y-0 left-0 w-full rounded-full bg-primary" />
                ) : null}
              </button>
            ))}
          </div>
        </div>

        <div className="hero-fit-workflow container-page">
          <HeroWorkflowBar />
        </div>
      </div>
    </section>
  );
}
