import { useEffect, useRef } from "react";

type Vec3 = [number, number, number];

interface Hub {
  name: string;
  lat: number;
  lon: number;
}

const HUBS: Hub[] = [
  { name: "New York", lat: 40.71, lon: -74.0 },
  { name: "London", lat: 51.51, lon: -0.13 },
  { name: "Dubai", lat: 25.2, lon: 55.27 },
  { name: "Miami", lat: 25.76, lon: -80.19 },
  { name: "Singapore", lat: 1.35, lon: 103.82 },
  { name: "Sydney", lat: -33.87, lon: 151.21 },
];

const ROUTES: [number, number][] = [
  [0, 1],
  [1, 2],
  [0, 3],
  [2, 4],
  [4, 5],
  [2, 5],
];

const LAT_RINGS = [-0.75, -0.5, -0.25, 0, 0.25, 0.5, 0.75];

function latLonToVec3(lat: number, lon: number): Vec3 {
  const phi = (90 - lat) * (Math.PI / 180);
  const theta = (lon + 180) * (Math.PI / 180);
  return [
    -Math.sin(phi) * Math.cos(theta),
    Math.cos(phi),
    Math.sin(phi) * Math.sin(theta),
  ];
}

function fibonacciSphere(samples: number): Vec3[] {
  const points: Vec3[] = [];
  const phi = Math.PI * (3 - Math.sqrt(5));
  for (let i = 0; i < samples; i++) {
    const y = 1 - (i / (samples - 1)) * 2;
    const r = Math.sqrt(Math.max(0, 1 - y * y));
    const theta = phi * i;
    points.push([Math.cos(theta) * r, y, Math.sin(theta) * r]);
  }
  return points;
}

function rotate(p: Vec3, rotY: number, rotX: number): Vec3 {
  const [x, y, z] = p;
  const x1 = x * Math.cos(rotY) - z * Math.sin(rotY);
  const z1 = x * Math.sin(rotY) + z * Math.cos(rotY);
  const y2 = y * Math.cos(rotX) - z1 * Math.sin(rotX);
  const z2 = y * Math.sin(rotX) + z1 * Math.cos(rotX);
  return [x1, y2, z2];
}

function slerp(a: Vec3, b: Vec3, t: number): Vec3 {
  const dot = Math.min(Math.max(a[0] * b[0] + a[1] * b[1] + a[2] * b[2], -1), 1);
  const theta = Math.acos(dot) * t;
  const relX = b[0] - a[0] * dot;
  const relY = b[1] - a[1] * dot;
  const relZ = b[2] - a[2] * dot;
  const len = Math.sqrt(relX * relX + relY * relY + relZ * relZ) || 1;
  const rx = relX / len;
  const ry = relY / len;
  const rz = relZ / len;
  const cosT = Math.cos(theta);
  const sinT = Math.sin(theta);
  return [
    a[0] * cosT + rx * sinT,
    a[1] * cosT + ry * sinT,
    a[2] * cosT + rz * sinT,
  ];
}

function drawLatRing(
  ctx: CanvasRenderingContext2D,
  yLevel: number,
  rotY: number,
  rotX: number,
  cx: number,
  cy: number,
  radius: number,
) {
  const ringPts: { x: number; y: number; z: number }[] = [];
  for (let a = 0; a <= 72; a++) {
    const ang = (a / 72) * Math.PI * 2;
    const r = Math.sqrt(Math.max(0, 1 - yLevel * yLevel));
    const p: Vec3 = [Math.cos(ang) * r, yLevel, Math.sin(ang) * r];
    const rp = rotate(p, rotY, rotX);
    ringPts.push({ x: cx + rp[0] * radius, y: cy + rp[1] * radius, z: rp[2] });
  }
  for (let idx = 1; idx < ringPts.length; idx++) {
    const p = ringPts[idx]!;
    const alpha = 0.04 + Math.max(0, p.z) * 0.14;
    ctx.strokeStyle = `rgba(100,130,118,${alpha.toFixed(3)})`;
    ctx.lineWidth = 0.65;
    ctx.beginPath();
    ctx.moveTo(ringPts[idx - 1]!.x, ringPts[idx - 1]!.y);
    ctx.lineTo(p.x, p.y);
    ctx.stroke();
  }
}

interface GlobeCanvasProps {
  scrollOffset?: number;
}

export function GlobeCanvas({ scrollOffset = 0 }: GlobeCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const scrollRef = useRef(scrollOffset);
  scrollRef.current = scrollOffset;

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const styles = getComputedStyle(document.documentElement);
    const primary = styles.getPropertyValue("--primary").trim() || "oklch(0.548 0.117 158.2)";
    const dotPoints = fibonacciSphere(720);
    const hubPoints = HUBS.map((h) => latLonToVec3(h.lat, h.lon));

    let width = 0;
    let height = 0;

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const rect = canvas.getBoundingClientRect();
      width = rect.width;
      height = rect.height;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(canvas);

    let raf = 0;
    let idleT = 0;
    const start = performance.now();

    const draw = (now: number) => {
      idleT = reducedMotion ? 0 : (now - start) / 1000;
      const cx = width / 2;
      const cy = height / 2;
      const radius = Math.min(width, height) * 0.46;

      const rotY = idleT * 0.055 + scrollRef.current * Math.PI * 1.6;
      const rotX = -0.3;

      ctx.clearRect(0, 0, width, height);

      const halo = ctx.createRadialGradient(cx, cy - radius * 0.35, radius * 0.05, cx, cy, radius * 1.15);
      halo.addColorStop(0, "oklch(0.548 0.117 158.2 / 0.2)");
      halo.addColorStop(0.45, "oklch(0.548 0.117 158.2 / 0.06)");
      halo.addColorStop(1, "transparent");
      ctx.fillStyle = halo;
      ctx.fillRect(0, 0, width, height);

      ctx.save();
      ctx.strokeStyle = "rgba(100,130,118,0.22)";
      ctx.lineWidth = 1.25;
      ctx.beginPath();
      ctx.arc(cx, cy, radius * 1.05, 0, Math.PI * 2);
      ctx.stroke();
      ctx.restore();

      ctx.save();
      LAT_RINGS.forEach((yLevel) => drawLatRing(ctx, yLevel, rotY, rotX, cx, cy, radius));
      ctx.restore();

      const projected = dotPoints
        .map((p) => {
          const r = rotate(p, rotY, rotX);
          return { x: cx + r[0] * radius, y: cy + r[1] * radius, z: r[2] };
        })
        .sort((a, b) => a.z - b.z);

      projected.forEach((p) => {
        const depth = (p.z + 1) / 2;
        const size = 0.55 + depth * 1.65;
        const alpha = 0.08 + depth * 0.62;
        ctx.beginPath();
        ctx.fillStyle = primary;
        ctx.globalAlpha = alpha;
        ctx.arc(p.x, p.y, size, 0, Math.PI * 2);
        ctx.fill();
        if (depth > 0.72) {
          ctx.beginPath();
          ctx.fillStyle = "#ffffff";
          ctx.globalAlpha = (depth - 0.72) * 0.35;
          ctx.arc(p.x, p.y, size * 0.45, 0, Math.PI * 2);
          ctx.fill();
        }
      });
      ctx.globalAlpha = 1;

      const projectedHubs = hubPoints.map((p) => {
        const r = rotate(p, rotY, rotX);
        return { x: cx + r[0] * radius, y: cy + r[1] * radius, z: r[2] };
      });

      ROUTES.forEach(([ai, bi], routeIdx) => {
        const a = hubPoints[ai]!;
        const b = hubPoints[bi]!;
        const segs = 48;
        const pathPts: { x: number; y: number; z: number }[] = [];
        for (let s = 0; s <= segs; s++) {
          const t = s / segs;
          const mid = slerp(a, b, t);
          const bulge = 1 + Math.sin(t * Math.PI) * 0.18;
          const lifted: Vec3 = [mid[0] * bulge, mid[1] * bulge, mid[2] * bulge];
          const r = rotate(lifted, rotY, rotX);
          pathPts.push({ x: cx + r[0] * radius, y: cy + r[1] * radius, z: r[2] });
        }
        for (let s = 1; s < pathPts.length; s++) {
          const p0 = pathPts[s - 1]!;
          const p1 = pathPts[s]!;
          const frontness = (p1.z + 1) / 2;
          if (frontness < 0.12) continue;
          ctx.beginPath();
          ctx.strokeStyle = primary;
          ctx.globalAlpha = 0.12 + frontness * 0.38;
          ctx.lineWidth = 1.15;
          ctx.moveTo(p0.x, p0.y);
          ctx.lineTo(p1.x, p1.y);
          ctx.stroke();
        }
        ctx.globalAlpha = 1;

        const offset = (routeIdx * 0.37) % 1;
        const t = reducedMotion ? offset : (idleT * 0.25 + offset) % 1;
        const idx = Math.min(segs, Math.floor(t * segs));
        const pulse = pathPts[idx];
        if (pulse && (pulse.z + 1) / 2 > 0.12) {
          const pf = (pulse.z + 1) / 2;
          ctx.beginPath();
          ctx.fillStyle = "#ffffff";
          ctx.globalAlpha = 0.55 + pf * 0.45;
          ctx.arc(pulse.x, pulse.y, 2.4, 0, Math.PI * 2);
          ctx.fill();
          ctx.beginPath();
          ctx.fillStyle = primary;
          ctx.globalAlpha = (0.3 + pf * 0.4) * 0.65;
          ctx.arc(pulse.x, pulse.y, 6, 0, Math.PI * 2);
          ctx.fill();
        }
        ctx.globalAlpha = 1;
      });

      projectedHubs.forEach((h) => {
        const frontness = (h.z + 1) / 2;
        if (frontness < 0.08) return;
        ctx.beginPath();
        ctx.fillStyle = primary;
        ctx.globalAlpha = 0.45 + frontness * 0.55;
        ctx.arc(h.x, h.y, 2.8 + frontness * 1.6, 0, Math.PI * 2);
        ctx.fill();
        ctx.beginPath();
        ctx.strokeStyle = primary;
        ctx.globalAlpha = (0.25 + frontness * 0.35) * (0.65 + 0.35 * Math.sin(idleT * 2 + h.x));
        ctx.lineWidth = 1.1;
        ctx.arc(h.x, h.y, 7 + frontness * 3.5, 0, Math.PI * 2);
        ctx.stroke();
      });
      ctx.globalAlpha = 1;

      raf = requestAnimationFrame(draw);
    };

    raf = requestAnimationFrame(draw);
    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
    };
  }, []);

  return <canvas ref={canvasRef} className="block h-full w-full" aria-hidden="true" />;
}
