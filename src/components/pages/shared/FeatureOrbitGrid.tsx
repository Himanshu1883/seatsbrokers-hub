import type { CSSProperties } from "react";
import type { LucideIcon } from "lucide-react";
import {
  ArrowDownRight,
  BarChart3,
  FileX2,
  Layers3,
  MonitorSmartphone,
  RefreshCw,
  ShieldCheck,
  Sparkles,
  Ticket,
  TrendingUp,
  Upload,
  Workflow,
} from "lucide-react";

type FeatureItem = { title: string; body: string };

type FeatureOrbitGridProps = {
  items: FeatureItem[];
};

/** Shared viewBox coordinate system (0–100). */
const LEFT_CX = 32;
const RIGHT_CX = 68;
const CY = 50;
const LOBE_R = 21;
const NODE_R = 17;

const leftIcons: LucideIcon[] = [
  ArrowDownRight,
  FileX2,
  RefreshCw,
  Layers3,
  Upload,
  Ticket,
];
const rightIcons: LucideIcon[] = [
  ShieldCheck,
  Workflow,
  BarChart3,
  TrendingUp,
  MonitorSmartphone,
  Sparkles,
];

/** Angles in degrees (0 = east, 90 = south). */
const LEFT_ANGLES = [180, 118, 308, 205, 250, 340, 165, 20] as const;
const RIGHT_ANGLES = [0, 242, 62, 298, 18, 130, 350, 75] as const;

function lobePoint(cx: number, cy: number, angleDeg: number, radius: number) {
  const rad = (angleDeg * Math.PI) / 180;
  return {
    x: cx + radius * Math.cos(rad),
    y: cy + radius * Math.sin(rad),
  };
}

function getSlots(count: number, side: "left" | "right") {
  const cx = side === "left" ? LEFT_CX : RIGHT_CX;
  const angles = side === "left" ? LEFT_ANGLES : RIGHT_ANGLES;
  const r = count > 4 ? NODE_R - 1.5 : NODE_R;
  return Array.from({ length: count }, (_, i) =>
    lobePoint(cx, CY, angles[i % angles.length], r + (i % 2) * 1),
  );
}

function splitItems(items: FeatureItem[]) {
  const pivot = Math.ceil(items.length / 2);
  return {
    left: items.slice(0, pivot),
    right: items.slice(pivot),
  };
}

type LobeProps = {
  items: FeatureItem[];
  side: "left" | "right";
  duration: number;
  delay: number;
};

function InfinityLobe({ items, side, duration, delay }: LobeProps) {
  const cx = side === "left" ? LEFT_CX : RIGHT_CX;
  const slots = getSlots(items.length, side);
  const icons = side === "left" ? leftIcons : rightIcons;

  return (
    <div
      className={`fg-infinity-lobe fg-orbit-drift fg-orbit-drift-${side}`}
      style={
        {
          ["--fg-duration" as string]: `${duration}s`,
          ["--fg-delay" as string]: `${delay}s`,
        } as CSSProperties
      }
    >
      <svg className="fg-infinity-lobe-rings" viewBox="0 0 100 100" aria-hidden>
        <circle cx={cx} cy={CY} r={LOBE_R} className="fg-infinity-ring fg-infinity-ring-outer" />
        <circle cx={cx} cy={CY} r={LOBE_R - 6} className="fg-infinity-ring fg-infinity-ring-mid" />
        <circle cx={cx} cy={CY} r={LOBE_R - 11} className="fg-infinity-ring fg-infinity-ring-inner" />
        {slots.map((slot, i) => (
          <line
            key={`spoke-${i}`}
            x1={cx}
            y1={CY}
            x2={slot.x}
            y2={slot.y}
            className="fg-infinity-spoke"
            style={{ ["--fg-spoke-i" as string]: i }}
          />
        ))}
      </svg>

      {items.map((item, i) => {
        const slot = slots[i];
        const Icon = icons[i % icons.length];
        return (
          <div
            key={item.title}
            className="fg-infinity-node"
            data-side={side}
            style={{ left: `${slot.x}%`, top: `${slot.y}%` }}
          >
            <span className="fg-infinity-node-bubble" aria-hidden>
              <Icon className="size-4" strokeWidth={1.75} />
            </span>
            <p className="fg-infinity-node-title">{item.title}</p>
            <span className="sr-only">{item.body}</span>
          </div>
        );
      })}
    </div>
  );
}

/** Horizontal figure-eight through both lobe centers. */
const INFINITY_PATH = `
  M ${LEFT_CX} ${CY}
  C ${LEFT_CX} ${CY - LOBE_R}, 50 ${CY - LOBE_R}, 50 ${CY}
  C 50 ${CY + LOBE_R}, ${RIGHT_CX} ${CY + LOBE_R}, ${RIGHT_CX} ${CY}
  C ${RIGHT_CX} ${CY - LOBE_R}, 50 ${CY - LOBE_R}, 50 ${CY}
  C 50 ${CY + LOBE_R}, ${LEFT_CX} ${CY + LOBE_R}, ${LEFT_CX} ${CY}
  Z
`;

export function FeatureOrbitGrid({ items }: FeatureOrbitGridProps) {
  const { left, right } = splitItems(items);

  return (
    <div className="fg-infinity" aria-label="Feature capability orbit systems">
      <ul className="fg-stack">
        {items.map((item) => (
          <li key={item.title} className="fg-stack-card">
            <p className="fg-stack-title">{item.title}</p>
            <p className="fg-stack-body">{item.body}</p>
          </li>
        ))}
      </ul>

      <div className="fg-infinity-viewport">
        <svg className="fg-infinity-track" viewBox="0 0 100 100" aria-hidden>
          <path d={INFINITY_PATH} className="fg-infinity-loop" />
          <path d={INFINITY_PATH} className="fg-infinity-loop-glow" />
        </svg>

        <div className="fg-infinity-join" aria-hidden>
          <svg viewBox="0 0 24 24" className="fg-infinity-arrow">
            <path
              d="M8 7l8 5-8 5V7z"
              fill="currentColor"
            />
          </svg>
          <span className="fg-infinity-join-packet" />
        </div>

        <InfinityLobe items={left} side="left" duration={20} delay={0} />
        {right.length > 0 ? (
          <InfinityLobe items={right} side="right" duration={24} delay={1.1} />
        ) : null}
      </div>
    </div>
  );
}
