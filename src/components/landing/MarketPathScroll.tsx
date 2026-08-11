import { useEffect, useId, useRef, useState } from "react";
import { ArrowRight } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { MotionPathPlugin } from "gsap/MotionPathPlugin";
import { Reveal } from "@/hooks/use-scroll-motion";

gsap.registerPlugin(ScrollTrigger, MotionPathPlugin);

type Checkpoint = {
  id: string;
  cx: number;
  cy: number;
  label: string;
  title: string;
  metric: string;
  metricLabel: string;
  lines: [string, string, string];
  body: string;
};

const PATH_D =
  "M16.5 54c3.83-6 9.33-12 9.33-12L35.5 32.5S44 22.33 44.67 21s6.33-6.83 9.5-7 13.83 14 19 15.67 7.17-4 9.17-3.5 14.5 11.33 18.17 12 8.67-.67 10-3";

const checkpoints: Checkpoint[] = [
  {
    id: "floor",
    cx: 16.5,
    cy: 54,
    label: "Floor set",
    title: "Price floor locked",
    metric: "$185",
    metricLabel: "minimum ask",
    body: "Desk sets the floor before anything hits a marketplace — margin protected from the first push.",
    lines: ["floor.ask → $185", "margin.guard → 18%", "desk.override → armed"],
  },
  {
    id: "live",
    cx: 26,
    cy: 42,
    label: "Listing live",
    title: "Published once, live everywhere",
    metric: "8+",
    metricLabel: "channels online",
    body: "One catalogue write fans out to every connected marketplace and the regional long tail in seconds.",
    lines: ["push.channel_01 → ok", "push.channel_02 → ok", "double_sale.guard → on"],
  },
  {
    id: "comp",
    cx: 35.3,
    cy: 33,
    label: "Comp ask",
    title: "Comparables streaming",
    metric: "$212",
    metricLabel: "median ask",
    body: "MarketIQ watches live asks around your section so the desk sees where buyers are actually looking.",
    lines: ["comps.window → 15m", "section.match → true", "best.tag → scanning"],
  },
  {
    id: "spike",
    cx: 44.9,
    cy: 21,
    label: "Demand spike",
    title: "Demand lifts the curve",
    metric: "+18%",
    metricLabel: "vs open",
    body: "Search and hold pressure climbs into the weekend — the curve steepens before kickoff.",
    lines: ["demand.index → high", "holds.active → 42", "velocity → accelerating"],
  },
  {
    id: "guard",
    cx: 54.2,
    cy: 14,
    label: "Guardrail hold",
    title: "Ceiling keeps you honest",
    metric: "$268",
    metricLabel: "hard ceiling",
    body: "Auto-pricing never blows past the desk’s ceiling — even when comps run hot.",
    lines: ["ceiling.ask → $268", "auto.reprice → capped", "alert.desk → quiet"],
  },
  {
    id: "reprice",
    cx: 63.6,
    cy: 22,
    label: "Auto-reprice",
    title: "Engine nudges the ask",
    metric: "$248",
    metricLabel: "live ask",
    body: "Floors, ceilings and undercut logic move the listing continuously — no spreadsheet babysitting.",
    lines: ["reprice.tick → 90s", "undercut → 1.5%", "spread.healthy → true"],
  },
  {
    id: "best",
    cx: 73,
    cy: 30,
    label: "BEST tag",
    title: "Best-in-section signal",
    metric: "BEST",
    metricLabel: "MarketIQ tag",
    body: "When your ask leads the section, MarketIQ surfaces the BEST badge buyers already trust.",
    lines: ["rank.section → 1", "tag.best → lit", "click.lift → +22%"],
  },
  {
    id: "transfer",
    cx: 82.5,
    cy: 26,
    label: "Transfer ready",
    title: "Fulfilment path locked",
    metric: "PDF",
    metricLabel: "delivery mode",
    body: "Order routes onto the cheapest compliant path — barcode verified before the fan ever sees it.",
    lines: ["route.auto → cheapest", "barcode.verify → pass", "sla.clock → running"],
  },
  {
    id: "sell",
    cx: 92,
    cy: 33,
    label: "Sell-through",
    title: "Inventory clears",
    metric: "94%",
    metricLabel: "sold",
    body: "Most of the block moves before the event — remaining seats stay priced to clear, not to linger.",
    lines: ["qty.remaining → 3", "clearance.mode → on", "days.to.event → 2"],
  },
  {
    id: "settle",
    cx: 101.4,
    cy: 38.5,
    label: "Settled",
    title: "Books closed clean",
    metric: "1",
    metricLabel: "export file",
    body: "Payouts, fees and FX land in one statement finance can reconcile without chasing lines.",
    lines: ["payout.ready → true", "fx.rates → locked", "reconcile.export → 1"],
  },
];

export function MarketPathScroll() {
  const rootRef = useRef<HTMLElement>(null);
  const pinRef = useRef<HTMLDivElement>(null);
  const graphRef = useRef<SVGSVGElement>(null);
  const pathRef = useRef<SVGPathElement>(null);
  const focalRef = useRef<SVGCircleElement>(null);
  const panRef = useRef<SVGGElement>(null);
  const scaleRef = useRef<SVGGElement>(null);
  const dotsRef = useRef<SVGGElement>(null);
  const uid = useId().replace(/:/g, "");
  const [active, setActive] = useState(0);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const root = rootRef.current;
    const pin = pinRef.current;
    const graph = graphRef.current;
    const path = pathRef.current;
    const focal = focalRef.current;
    const pan = panRef.current;
    const scale = scaleRef.current;
    const dots = dotsRef.current;
    if (!root || !pin || !graph || !path || !focal || !pan || !scale || !dots) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const desktop = window.matchMedia("(min-width: 1024px)").matches;

    if (!desktop || reduced) {
      gsap.set(graph, { opacity: 1 });
      gsap.set(scale, { x: 81, y: 45, scale: 0.4, transformOrigin: "0 0" });
      gsap.set(focal, { opacity: 1 });
      const len = path.getTotalLength();
      path.style.strokeDasharray = `${len}`;
      path.style.strokeDashoffset = "0";
      gsap.set(dots.querySelectorAll("circle"), { attr: { r: 1.5 } });
      setActive(checkpoints.length - 1);
      setProgress(1);
      return;
    }

    const len = path.getTotalLength();
    path.style.strokeDasharray = `${len}`;
    path.style.strokeDashoffset = `${len}`;

    const xTo = gsap.quickTo(pan, "x", { duration: 0.3 });
    const yTo = gsap.quickTo(pan, "y", { duration: 0.3 });

    const syncCamera = () => {
      const fx = Number(gsap.getProperty(focal, "x")) || 0;
      const fy = Number(gsap.getProperty(focal, "y")) || 0;
      xTo(-fx);
      yTo(-fy);
    };

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: root,
          start: "top top",
          end: "bottom bottom",
          pin,
          scrub: 1,
          anticipatePin: 1,
          onUpdate: (self) => {
            setProgress(self.progress);
            const idx = Math.min(
              Math.floor(self.progress * checkpoints.length),
              checkpoints.length - 1,
            );
            setActive(idx);
            syncCamera();
          },
        },
        defaults: { duration: 1, ease: "none" },
      });

      tl.fromTo(graph, { opacity: 0 }, { opacity: 1, duration: 0.1 }, 0)
        .to(
          path,
          {
            strokeDashoffset: 0,
            duration: 1,
            ease: "none",
          },
          0,
        )
        .to(
          focal,
          {
            motionPath: {
              path,
              align: path,
              alignOrigin: [0.5, 0.5],
              autoRotate: false,
            },
            immediateRender: true,
            duration: 1,
            ease: "none",
          },
          0,
        )
        .from(
          dots.querySelectorAll("circle"),
          {
            attr: { r: 0 },
            stagger: 0.102,
            duration: 0.03,
            ease: "none",
          },
          0.13,
        )
        .fromTo(
          scale,
          { x: 61, y: 50, scale: 2, transformOrigin: "0 0" },
          { scale: 0.4, x: 81, y: 45, ease: "expo.inOut", duration: 1 },
          0,
        );

      // Seed camera to first point
      gsap.set(focal, {
        motionPath: {
          path,
          align: path,
          alignOrigin: [0.5, 0.5],
          start: 0,
          end: 0,
        },
      });
      gsap.set(pan, {
        x: -Number(gsap.getProperty(focal, "x") || 0),
        y: -Number(gsap.getProperty(focal, "y") || 0),
      });
    }, root);

    return () => {
      ctx.revert();
    };
  }, []);

  const current = checkpoints[active] ?? checkpoints[0]!;

  return (
    <section
      ref={rootRef}
      id="market-path"
      className="market-path section-curve-sticky relative scroll-mt-24"
      aria-label="MarketIQ pricing curve journey"
    >
      {/* Desktop pin scrub */}
      <div ref={pinRef} className="market-path-pin">
        <span className="market-path-glow" aria-hidden />
        <span className="market-path-grid" aria-hidden />

        <div className="market-path-chrome container-page">
          <header className="market-path-header">
            <div>
              <p className="section-eyebrow text-primary">MarketIQ curve</p>
              <h2 className="market-path-headline">
                Follow one event from floor to settlement.
              </h2>
              <p className="market-path-lede">
                Scroll to ride the live ask — MarketIQ draws the path, checkpoints light as demand,
                pricing, and fulfilment move.
              </p>
            </div>
            <div className="market-path-counter" aria-hidden>
              <span>{String(active + 1).padStart(2, "0")}</span>
              <span className="market-path-counter-sep">/</span>
              <span>{String(checkpoints.length).padStart(2, "0")}</span>
            </div>
          </header>

          <div className="market-path-stage">
            <svg
              ref={graphRef}
              className="market-path-graph"
              viewBox="0 0 122 98"
              preserveAspectRatio="xMidYMid meet"
              opacity={0}
              aria-hidden
            >
              <defs>
                <linearGradient id={`mp-stroke-${uid}`} x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="var(--primary-deep)" />
                  <stop offset="55%" stopColor="var(--primary)" />
                  <stop offset="100%" stopColor="oklch(0.72 0.08 158)" />
                </linearGradient>
                <radialGradient id={`mp-focal-${uid}`} cx="50%" cy="50%" r="50%">
                  <stop offset="0%" stopColor="var(--primary)" />
                  <stop offset="100%" stopColor="var(--primary-deep)" />
                </radialGradient>
              </defs>

              <g ref={scaleRef} className="market-path-pov-scale">
                <g ref={panRef} className="market-path-pov-pan">
                  {/* Light graph backdrop */}
                  <rect
                    x="0"
                    y="0"
                    width="122"
                    height="98"
                    rx="2"
                    fill="color-mix(in oklab, var(--background) 88%, var(--primary))"
                    opacity="0.35"
                  />
                  {Array.from({ length: 12 }).map((_, i) => (
                    <line
                      key={`v-${i}`}
                      x1={8 + i * 9}
                      y1="8"
                      x2={8 + i * 9}
                      y2="90"
                      stroke="color-mix(in oklab, var(--foreground) 8%, transparent)"
                      strokeWidth="0.2"
                    />
                  ))}
                  {Array.from({ length: 9 }).map((_, i) => (
                    <line
                      key={`h-${i}`}
                      x1="8"
                      y1={10 + i * 10}
                      x2="114"
                      y2={10 + i * 10}
                      stroke="color-mix(in oklab, var(--foreground) 8%, transparent)"
                      strokeWidth="0.2"
                    />
                  ))}
                  <line
                    x1="8"
                    y1="90"
                    x2="114"
                    y2="90"
                    stroke="color-mix(in oklab, var(--primary) 35%, transparent)"
                    strokeWidth="0.35"
                  />
                  <line
                    x1="8"
                    y1="10"
                    x2="8"
                    y2="90"
                    stroke="color-mix(in oklab, var(--primary) 35%, transparent)"
                    strokeWidth="0.35"
                  />

                  <circle cx="16.5" cy="54" r="1.5" fill="var(--primary-deep)" />

                  <g ref={dotsRef} className="market-path-dots" fill="var(--primary)">
                    {checkpoints.slice(1).map((c) => (
                      <circle key={c.id} cx={c.cx} cy={c.cy} r="1.5" />
                    ))}
                  </g>

                  <circle
                    ref={focalRef}
                    className="market-path-focal"
                    r="2.2"
                    fill={`url(#mp-focal-${uid})`}
                    stroke="var(--background)"
                    strokeWidth="0.6"
                  />

                  <path
                    ref={pathRef}
                    className="market-path-path"
                    fill="none"
                    stroke={`url(#mp-stroke-${uid})`}
                    strokeWidth="1.15"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d={PATH_D}
                  />
                </g>
              </g>
            </svg>

            <aside className="market-path-readout" key={current.id}>
              <p className="market-path-readout-tag">{current.label}</p>
              <h3 className="market-path-readout-title">{current.title}</h3>
              <p className="market-path-readout-body">{current.body}</p>
              <div className="market-path-readout-metric">
                <strong>{current.metric}</strong>
                <span>{current.metricLabel}</span>
              </div>
              <ul className="market-path-readout-lines">
                {current.lines.map((l) => (
                  <li key={l}>{l}</li>
                ))}
              </ul>
            </aside>
          </div>

          <div className="market-path-rail" aria-hidden>
            {checkpoints.map((c, i) => (
              <span
                key={c.id}
                className="market-path-tick"
                data-on={i <= active ? "true" : "false"}
                data-active={i === active ? "true" : "false"}
                style={{ opacity: i <= active ? 1 : 0.35 }}
              >
                {c.label}
              </span>
            ))}
          </div>

          <div className="market-path-footer">
            <div className="market-path-progress" aria-hidden>
              <span style={{ transform: `scaleX(${progress})` }} />
            </div>
            <div className="market-path-outro-cta">
              <a href="#sellers" className="market-path-cta-ghost">
                Seller Partner
              </a>
              <a href="#travel" className="market-path-cta">
                Travel Partner
                <ArrowRight className="size-3.5" aria-hidden />
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile / reduced stack */}
      <div className="market-path-stack container-page">
        <Reveal>
          <p className="section-eyebrow text-primary">MarketIQ curve</p>
          <h2 className="market-path-headline">
            Follow one event from floor to settlement.
          </h2>
          <p className="market-path-lede">
            Every checkpoint on the curve is a live MarketIQ signal — floor, demand, reprice, and
            clean settlement.
          </p>
        </Reveal>

        <ol className="market-path-stack-list">
          {checkpoints.map((c, i) => (
            <Reveal key={c.id} as="li" delay={i * 50}>
              <article className="market-path-stack-card">
                <span className="market-path-stack-index">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div className="min-w-0 flex-1">
                  <p className="market-path-stack-label">{c.label}</p>
                  <p className="market-path-stack-title">{c.title}</p>
                  <p className="market-path-stack-body">{c.body}</p>
                </div>
                <span className="market-path-stack-metric">{c.metric}</span>
              </article>
            </Reveal>
          ))}
        </ol>

        <div className="market-path-outro">
          <p>
            Same curve your desk watches — wired into every listing you publish.
          </p>
          <div className="market-path-outro-cta">
            <a href="#sellers" className="market-path-cta-ghost">
              Seller Partner
            </a>
            <a href="#travel" className="market-path-cta">
              Travel Partner
              <ArrowRight className="size-3.5" aria-hidden />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
