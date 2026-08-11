import { useEffect, useRef, useState } from "react";
import { ArrowRight, Radio } from "lucide-react";
import { Reveal } from "@/hooks/use-scroll-motion";
import { SectionBackdrop } from "@/components/landing/SectionBackdrop";
import sellerImg from "@/assets/card-seller.jpg";
import travelImg from "@/assets/card-travel.jpg";

const tracks = [
  {
    id: "sellers",
    code: "TRACK / SELL",
    dir: -1, // enters from the left
    image: sellerImg,
    alt: "Concert crowd under stage lighting",
    eyebrow: "Seller Partners",
    title: "Seamless ticket trading for sellers",
    body: "Stop babysitting spreadsheets and refreshing eight marketplace dashboards. List once, and your inventory prices, syncs and settles on autopilot across every channel we're plugged into.",
    stats: [
      { value: "40+", label: "Marketplaces synced" },
      { value: "<250ms", label: "Price sync latency" },
      { value: "24/7", label: "Autopilot listing" },
    ],
    tags: ["Autopilot Workflows", "Real-Time Pricing", "Zero-Fee Listing", "Transparent Payouts"],
    cta: "Become a Seller Partner",
  },
  {
    id: "travel",
    code: "TRACK / TRAVEL",
    dir: 1, // enters from the right
    image: travelImg,
    alt: "Rows of stadium seating at golden hour",
    eyebrow: "Travel Partners",
    title: "Add verified event tickets to every itinerary",
    body: "Sell the match, not just the trip. Guaranteed inventory, itinerary-ready quotes and group fulfilment that holds up at the turnstile — so your travellers never depend on an unreliable source.",
    stats: [
      { value: "98%", label: "Turnstile-verified" },
      { value: "15min", label: "Fastest quote turnaround" },
      { value: "10k+", label: "Seats fulfilled monthly" },
    ],
    tags: ["Verified Inventory", "Fair Pricing", "Last-Minute Ready", "Instant Quotes"],
    cta: "Become a Travel Partner",
  },
];

/** Scrub-linked progress (0 → 1) as `ref`'s element moves through the viewport. */
function useScrollProgress<T extends HTMLElement>() {
  const ref = useRef<T>(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) {
      setProgress(1);
      return;
    }

    let raf = 0;
    const measure = () => {
      const rect = el.getBoundingClientRect();
      const vh = window.innerHeight;
      const start = vh * 0.95; // begin animating just before entering view
      const end = vh * 0.45; // fully settled once past the upper-middle
      const p = (start - rect.top) / (start - end);
      setProgress(Math.min(1, Math.max(0, p)));
    };

    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(measure);
    };

    measure();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return { ref, progress };
}

/** Animates a number from 0 to the value embedded in `text` once `active` flips true. */
function CountUp({ text, active }: { text: string; active: boolean }) {
  const match = text.match(/(\D*)(\d+)(.*)/);
  const [display, setDisplay] = useState(match ? match[1] + "0" + match[3] : text);
  const done = useRef(false);

  useEffect(() => {
    if (!match || !active || done.current) return;
    done.current = true;
    const [, prefix, digits, suffix] = match;
    const target = parseInt(digits, 10);
    const duration = 800;
    const start = performance.now();

    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / duration);
      const eased = 1 - Math.pow(1 - t, 3);
      const current = Math.round(target * eased);
      setDisplay(`${prefix}${current}${suffix}`);
      if (t < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }, [active, match]);

  return <>{display}</>;
}

function TrackCard({ track, index, groupProgress }: { track: (typeof tracks)[number]; index: number; groupProgress: number }) {
  // stagger the second card slightly behind the first
  const local = Math.min(1, Math.max(0, (groupProgress - index * 0.18) / (1 - index * 0.18)));
  const eased = 1 - Math.pow(1 - local, 3);
  const translateX = (1 - eased) * 64 * track.dir;
  const active = local > 0.4;

  return (
    <article
      id={track.id}
      style={{
        transform: `translateX(${translateX}px)`,
        opacity: Math.max(0.001, eased),
      }}
      className="group lift relative flex h-full scroll-mt-24 flex-col overflow-hidden rounded-2xl border border-border bg-card transition-[transform,opacity,box-shadow] duration-150 ease-out will-change-transform hover:shadow-[0_0_0_1px_theme(colors.primary.DEFAULT/0.35),0_20px_50px_-20px_theme(colors.primary.DEFAULT/0.35)]"
    >
      <span className="pointer-events-none absolute left-3 top-3 z-20 size-4 border-l-2 border-t-2 border-background/70 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
      <span className="pointer-events-none absolute right-3 top-3 z-20 size-4 border-r-2 border-t-2 border-background/70 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

      <div className="relative h-56 overflow-hidden">
        <img
          src={track.image}
          alt={track.alt}
          loading="lazy"
          width={1200}
          height={800}
          style={{ transform: `scale(${1.08 - eased * 0.08}) translateX(${(1 - eased) * -20 * track.dir}px)` }}
          className="size-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
        />
        <div
          className="absolute inset-0"
          style={{ background: "var(--gradient-hero)", opacity: 0.7 }}
          aria-hidden
        />
        <div
          className="absolute inset-0 opacity-[0.15] mix-blend-overlay"
          style={{
            backgroundImage: "radial-gradient(currentColor 1px, transparent 1px)",
            backgroundSize: "14px 14px",
            color: "var(--background)",
          }}
          aria-hidden
        />

        <div className="absolute inset-x-6 bottom-4 flex items-center justify-between">
          <span className="font-mono text-[11px] tracking-[0.2em] text-background uppercase">
            {track.eyebrow}
          </span>
          <span className="rounded-full border border-background/40 px-2 py-0.5 font-mono text-[10px] tracking-[0.15em] text-background/90">
            {track.code}
          </span>
        </div>
      </div>

      <div className="flex flex-1 flex-col p-7">
        <h3 className="text-2xl font-bold text-foreground">{track.title}</h3>
        <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{track.body}</p>

        <dl className="mt-6 grid grid-cols-3 gap-4 border-y border-border py-5">
          {track.stats.map((s) => (
            <div key={s.label}>
              <dt className="sr-only">{s.label}</dt>
              <dd className="font-mono text-lg font-semibold tabular-nums text-foreground sm:text-xl">
                <CountUp text={s.value} active={active} />
              </dd>
              <dd className="mt-1 text-[11px] leading-tight text-muted-foreground">{s.label}</dd>
            </div>
          ))}
        </dl>

        <ul className="mt-6 flex flex-wrap gap-2">
          {track.tags.map((tag, ti) => (
            <li
              key={tag}
              style={{
                transitionDelay: `${120 + ti * 70}ms`,
                opacity: active ? 1 : 0,
                transform: active ? "translateY(0)" : "translateY(6px)",
              }}
              className="flex items-center gap-1.5 rounded-full bg-primary-soft px-3 py-1 font-mono text-[11px] font-medium text-accent-foreground transition-all duration-300 ease-out"
            >
              <span className="size-1 rounded-full bg-accent-foreground/70" aria-hidden />
              {tag}
            </li>
          ))}
        </ul>

        <a
          href="#contact"
          className="group/cta mt-8 inline-flex w-fit items-center gap-2 border-b border-transparent pb-0.5 text-sm font-semibold text-primary transition-colors hover:border-primary"
        >
          {track.cta}
          <ArrowRight className="size-4 transition-transform group-hover/cta:translate-x-1" />
        </a>
      </div>
    </article>
  );
}

export function TwoTrack() {
  const { ref, progress } = useScrollProgress<HTMLDivElement>();

  return (
    <section id="about" className="section-curve relative isolate bg-surface py-24">
      <SectionBackdrop image="concertCrowd" tone="surface" strength={0.1} />
      <div className="container-page relative z-10">
        <Reveal>
          <div className="flex items-center gap-2 text-primary">
            <Radio className="size-3.5 animate-pulse" strokeWidth={2.5} />
            <p className="section-eyebrow">Two tracks, one platform</p>
          </div>
          <h2 className="mt-4 max-w-2xl text-3xl font-bold text-foreground sm:text-4xl">
            Built for the two sides of live-event supply
          </h2>
          <p className="mt-3 max-w-xl text-sm text-muted-foreground">
            Same inventory graph, same settlement engine, two purpose-built entry points.
          </p>
        </Reveal>

        {/* sync line — draws in as the tracks below settle into place */}
        <div className="relative mt-10 hidden h-px lg:block" aria-hidden>
          <div className="absolute inset-0 bg-border" />
          <div
            className="absolute inset-y-0 left-1/2 w-px bg-primary transition-[height] duration-300"
            style={{ height: `${progress * 100}%`, transform: "translateX(-50%)" }}
          />
        </div>

        <div ref={ref} className="mt-6 grid gap-6 lg:grid-cols-2 lg:mt-6">
          {tracks.map((t, i) => (
            <TrackCard key={t.id} track={t} index={i} groupProgress={progress} />
          ))}
        </div>
      </div>
    </section>
  );
}