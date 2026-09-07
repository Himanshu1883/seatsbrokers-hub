import {
  ArrowRight,
  BarChart3,
  ClipboardList,
  FileText,
  Gem,
  Globe2,
  Plane,
  Play,
  Search,
  ShieldCheck,
  ShoppingCart,
} from "lucide-react";
import { Reveal } from "@/hooks/use-scroll-motion";
import { SiteLink } from "@/components/layout/SiteLink";
import { modules } from "@/content/modules";
import { ctas } from "@/content/site";

const flow = [
  { step: "Request", note: "Submit the ticket need", icon: FileText },
  { step: "Source", note: "Network finds options", icon: Search },
  { step: "Compare", note: "Review B2B offers", icon: BarChart3 },
  { step: "Quote", note: "Manage quotations", icon: ClipboardList },
  { step: "Buy", note: "Convert to an order", icon: ShoppingCart },
] as const;

const proofs = [
  { title: "Global network", note: "Trusted partners worldwide", icon: Globe2 },
  { title: "Competitive options", note: "Best prices, always", icon: ShieldCheck },
  { title: "Premium inventory", note: "Including hard-to-find", icon: Gem },
] as const;

const [deskLine, demandLine] = modules.source.tagline.split(". ");

/** Shared viewBox: cards sit on a semicircle around the radar hub. */
const VB = { w: 900, h: 560 };
const CARD = { w: 136, h: 124 };
const HUB = { x: 450, y: 438 };
const ARC_R = 298;
const CARD_ANGLES = [158, 124, 90, 56, 22] as const;
const JOIN_ANGLES = [141, 107, 73, 39] as const;

function polar(deg: number) {
  const rad = (deg * Math.PI) / 180;
  return {
    x: HUB.x + ARC_R * Math.cos(rad),
    y: HUB.y - ARC_R * Math.sin(rad),
  };
}

const NODES = CARD_ANGLES.map(polar);
const JOINS = JOIN_ANGLES.map(polar);
const START = NODES[0]!;
const END = NODES[4]!;
const PEAK = NODES[2]!;
const ARC = `M${START.x} ${START.y} A${ARC_R} ${ARC_R} 0 0 1 ${END.x} ${END.y}`;

const proofsId = "sdhp-dots";

function pct(n: number, total: number) {
  return `${(n / total) * 100}%`;
}

function SourceDeskCanvas() {
  return (
    <svg className="sdhp-canvas" viewBox={`0 0 ${VB.w} ${VB.h}`} aria-hidden>
      <defs>
        <pattern id={proofsId} width="9" height="9" patternUnits="userSpaceOnUse">
          <circle cx="1.2" cy="1.2" r="1.15" fill="currentColor" />
        </pattern>
      </defs>
      <g className="sdhp-map" fill={`url(#${proofsId})`}>
        <path d="M228 92c-42-16-78 8-86 48-8 46 14 84 58 106 42 20 78 4 98-30 24-42 28-86-6-112-22-18-44-20-64-12z" />
        <path d="M208 238c-6 20 4 40 24 46 10-20 2-36-24-46z" />
        <path d="M286 268c-14 28-20 76-4 122 18 42 44 28 50-14 6-50-10-88-24-108-6-8-14-8-22 0z" />
        <path d="M338 78c18-14 50-8 56 18-8 24-38 28-52 10-6-10-10-20-4-28z" />
        <path d="M468 118c-18-4-24 14-12 34 14 14 42 8 56-6 8-16-6-34-24-36-6 0-14 4-20 8z" />
        <path d="M444 124c-6-6-12 4-4 12 8-2 6-10 4-12z" />
        <path d="M478 168c-20 10-24 52-12 98 10 46 44 74 72 54 14-38 8-84 2-116-8-32-34-44-62-36z" />
        <path d="M542 168c10-10 30-2 36 18-10 10-30 2-36-18z" />
        <path d="M552 96c-20 14-24 48-4 72 24-14 64-20 112-6 56 14 122 4 168-20 36-22 26-56-30-62-66-8-132 0-178-6-38-4-56 4-68 22z" />
        <path d="M658 170c-10 20-4 52 14 66 14-24 8-52-14-66z" />
        <path d="M728 188c-10 20 8 40 28 28 8-20-10-34-28-28z" />
        <path d="M824 130c10-10 22 4 16 18-8 6-20-10-16-18z" />
        <path d="M762 292c-20 10-24 42-2 56 42 10 74-10 68-38-8-20-40-28-66-18z" />
        <path d="M842 340c-6 10 8 22 14 10 0-8-8-12-14-10z" />
      </g>
      <ellipse className="sdhp-wash" cx={HUB.x} cy="250" rx="360" ry="210" />
      <g className="sdhp-radar-rings">
        <circle className="sdhp-radar-ring" cx={HUB.x} cy={HUB.y} r="108" />
        <circle className="sdhp-radar-ring" cx={HUB.x} cy={HUB.y} r="82" />
        <circle className="sdhp-radar-ring" cx={HUB.x} cy={HUB.y} r="58" />
        <circle className="sdhp-radar-ring" cx={HUB.x} cy={HUB.y} r="38" />
      </g>
      <path className="sdhp-arc-path" d={ARC} />
      <path className="sdhp-arc-stem" d={`M${HUB.x} ${PEAK.y} L${HUB.x} ${HUB.y - 22}`} />
      <circle className="sdhp-hub-disc" cx={HUB.x} cy={HUB.y} r="22" />
      {JOINS.map((node) => (
        <circle key={`${node.x}-${node.y}`} className="sdhp-node" cx={node.x} cy={node.y} r="5" />
      ))}
    </svg>
  );
}

export function SourceDesk() {
  return (
    <section
      id="source-desk"
      className="sdhp-section section-curve relative isolate scroll-mt-24 bg-background py-16 sm:py-24"
    >
      <div className="container-page relative z-10">
        <div className="sdhp-layout">
          <Reveal>
            <div className="sdhp-copy">
              <p className="section-eyebrow text-primary">{modules.source.name}</p>
              <h2 className="sdhp-title">
                {deskLine}.
                <span className="sdhp-title-accent">{demandLine}</span>
              </h2>
              <p className="sdhp-body">
                When inventory is not listed on the platform, submit a request. Our sourcing
                team works the global network for competitive B2B options — hard-to-find,
                premium and hospitality included.
              </p>
              <div className="sdhp-actions">
                <SiteLink to={ctas.exploreSource.to} className="sb-btn-primary lift">
                  {ctas.exploreSource.label}
                  <ArrowRight className="size-4" aria-hidden />
                </SiteLink>
                <a href="#how-it-works" className="sdhp-how">
                  How it works
                  <span className="sdhp-how-play" aria-hidden>
                    <Play className="size-2.5" fill="currentColor" strokeWidth={0} />
                  </span>
                </a>
              </div>
              <ul className="sdhp-proofs">
                {proofs.map(({ title, note, icon: Icon }) => (
                  <li key={title} className="sdhp-proof">
                    <span className="sdhp-proof-icon" aria-hidden>
                      <Icon className="size-4" strokeWidth={1.8} />
                    </span>
                    <span className="sdhp-proof-copy">
                      <strong>{title}</strong>
                      <span>{note}</span>
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>

          <Reveal delay={80}>
            <div className="sdhp-stage-clip">
              <div className="sdhp-stage">
                <SourceDeskCanvas />
                <ol className="sdhp-cards" aria-label="SeatsSource request to buy flow">
                  {flow.map(({ step, note, icon: Icon }, index) => {
                    const node = NODES[index]!;
                    return (
                      <li
                        key={step}
                        className="sdhp-card"
                        style={{
                          left: pct(node.x - CARD.w / 2, VB.w),
                          top: pct(node.y - CARD.h - 6, VB.h),
                          width: pct(CARD.w, VB.w),
                        }}
                      >
                        <span className="sdhp-card-index" aria-hidden>
                          {String(index + 1).padStart(2, "0")}
                        </span>
                        <span className="sdhp-card-icon" aria-hidden>
                          <Icon className="size-5" strokeWidth={1.75} />
                        </span>
                        <strong className="sdhp-card-step">{step}</strong>
                        <span className="sdhp-card-note">{note}</span>
                      </li>
                    );
                  })}
                </ol>
                <div
                  className="sdhp-hub"
                  style={{
                    left: pct(HUB.x, VB.w),
                    top: pct(HUB.y, VB.h),
                  }}
                >
                  <span className="sdhp-hub-core" aria-hidden>
                    <Plane className="size-4" strokeWidth={2} />
                  </span>
                  <p className="sdhp-hub-label">Global sourcing network</p>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
