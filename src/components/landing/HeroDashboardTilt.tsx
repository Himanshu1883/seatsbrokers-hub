import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type MouseEvent as ReactMouseEvent,
} from "react";
import {
  Activity,
  ArrowUpRight,
  BarChart3,
  Globe2,
  Layers3,
  Radio,
  RefreshCw,
  ShieldCheck,
  Sparkles,
  TrendingUp,
  Zap,
} from "lucide-react";

const MODE_MS = 3800;

type ModeId = "intel" | "pricing" | "sync";

const modes: { id: ModeId; label: string; url: string; status: string }[] = [
  { id: "intel", label: "Event Intel", url: "events · intelligence", status: "LIVE" },
  { id: "pricing", label: "AI Pricing", url: "pricing · engine", status: "AUTO" },
  { id: "sync", label: "Connectivity", url: "marketplace · sync", status: "SYNC" },
];

function ModeIntel() {
  const sources = [
    { name: "Resale marketplace", ask: "£182", tag: "BEST", hot: true },
    { name: "Sports exchange", ask: "£214", tag: "+17%", hot: false },
    { name: "Travel partner hub", ask: "£228", tag: "margin", hot: false },
    { name: "Regional OTA feed", ask: "—", tag: "thin", hot: false },
  ];
  const bands = [42, 58, 84, 68, 92, 54, 78, 61];
  const heat = [0.25, 0.62, 0.92, 0.48, 0.74, 0.35, 0.88, 0.55, 0.7, 0.3, 0.96, 0.5];

  return (
    <div className="hero-shell hero-shell-intel">
      <header className="hero-shell-chrome">
        <span className="hero-shell-dots" aria-hidden>
          <i />
          <i />
          <i />
        </span>
        <span className="hero-shell-path">
          <Globe2 className="size-3" />
          seatsbrokers / event-intelligence
        </span>
        <span className="hero-shell-badge">
          <span className="hero-tilt-live-dot" />
          LIVE FEED
        </span>
      </header>

      <div className="hero-shell-body">
        <aside className="hero-intel-rail">
          <span data-active="true">
            <Activity className="size-3.5" />
          </span>
          <span>
            <BarChart3 className="size-3.5" />
          </span>
          <span>
            <Radio className="size-3.5" />
          </span>
          <span className="hero-intel-rail-meta">v3.1</span>
        </aside>

        <div className="hero-intel-main">
          <div className="hero-mode-top">
            <div>
              <p className="hero-mode-kicker">
                <TrendingUp className="size-3" /> Event Intelligence
              </p>
              <p className="hero-mode-title">Market depth · resale comparables</p>
            </div>
            <span className="hero-mode-pill">12K+ events</span>
          </div>

          <div className="hero-intel-grid">
            <div className="hero-intel-table">
              {sources.map((s) => (
                <div
                  key={s.name}
                  className="hero-intel-row"
                  data-hot={s.hot ? "true" : "false"}
                >
                  <span className="hero-intel-dot" />
                  <span className="hero-intel-name">{s.name}</span>
                  <span className="hero-intel-ask">{s.ask}</span>
                  <span className="hero-intel-tag">{s.tag}</span>
                </div>
              ))}
            </div>

            <div className="hero-intel-side">
              <div className="hero-intel-chart">
                <p className="hero-mode-mini">Listing depth</p>
                <div className="hero-tilt-bars hero-intel-bars">
                  {bands.map((h, i) => (
                    <span
                      key={i}
                      className="hero-tilt-bar"
                      style={{ height: `${h}%`, animationDelay: `${i * 50}ms` }}
                    />
                  ))}
                </div>
              </div>
              <div className="hero-intel-heat">
                <p className="hero-mode-mini">Demand heatmap</p>
                <div className="hero-intel-heat-grid">
                  {heat.map((v, i) => (
                    <span
                      key={i}
                      style={{ opacity: 0.2 + v * 0.8 }}
                      data-hot={v > 0.7 ? "true" : "false"}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="hero-mode-foot hero-intel-foot">
            <span>165+ markets · 84K+ listings tracked</span>
            <span className="font-mono text-primary">latency 38ms</span>
          </div>
        </div>
      </div>
    </div>
  );
}

function ModePricing() {
  const spark = [38, 52, 46, 68, 58, 82, 76, 94, 71, 89, 98, 86];
  const tape = [
    { t: "FLOOR", v: "$180" },
    { t: "REC", v: "$247" },
    { t: "CEIL", v: "$312" },
    { t: "MARGIN", v: "18%" },
    { t: "SIGNAL", v: "↑ onsale" },
  ];

  return (
    <div className="hero-shell hero-shell-pricing">
      <header className="hero-shell-chrome hero-shell-chrome-pricing">
        <span className="hero-price-brand">
          <Sparkles className="size-3.5" />
          AI PRICING
        </span>
        <span className="hero-shell-path hero-shell-path-center">
          engine · guardrails active
        </span>
        <span className="hero-mode-pill hero-mode-pill-pulse">AUTO</span>
      </header>

      <div className="hero-price-tape" aria-hidden>
        <div className="hero-price-tape-track">
          {[...tape, ...tape].map((item, i) => (
            <span key={i}>
              <em>{item.t}</em> {item.v}
            </span>
          ))}
        </div>
      </div>

      <div className="hero-shell-body hero-shell-body-pricing">
        <div className="hero-price-hero">
          <div>
            <p className="hero-price-label">Recommended ask</p>
            <p className="hero-price-value">
              $247
              <span className="hero-price-delta">▲ 3.4%</span>
            </p>
          </div>
          <div className="hero-price-rails">
            <div>
              <span>Floor</span>
              <strong>$180</strong>
            </div>
            <div>
              <span>Ceiling</span>
              <strong>$312</strong>
            </div>
            <div>
              <span>Margin</span>
              <strong>18%</strong>
            </div>
          </div>
        </div>

        <div className="hero-price-spark">
          <div className="hero-price-spark-grid" aria-hidden />
          <svg
            viewBox="0 0 120 36"
            className="hero-price-spark-svg"
            preserveAspectRatio="none"
          >
            <path
              className="hero-price-spark-area"
              d={`M0 36 ${spark.map((v, i) => `L${(i / (spark.length - 1)) * 120} ${36 - (v / 100) * 32}`).join(" ")} L120 36 Z`}
            />
            <path
              className="hero-price-spark-line"
              fill="none"
              d={`M0 ${36 - (spark[0]! / 100) * 32} ${spark
                .map((v, i) => `L${(i / (spark.length - 1)) * 120} ${36 - (v / 100) * 32}`)
                .join(" ")}`}
            />
          </svg>
          <span className="hero-price-cursor" />
        </div>

        <div className="hero-price-chips">
          <span>
            <ShieldCheck className="size-3" /> Margin guards
          </span>
          <span>
            <Radio className="size-3" /> Comp set live
          </span>
          <span>
            <Zap className="size-3" /> Onsale signals
          </span>
        </div>
      </div>
    </div>
  );
}

function ModeSync() {
  const channels = [
    { name: "Global resale", status: "Synced", ok: true },
    { name: "Sports exchange", status: "Synced", ok: true },
    { name: "Travel partners", status: "Pushing", ok: true },
    { name: "Regional OTA", status: "Queued", ok: false },
    { name: "Broker desk", status: "Synced", ok: true },
    { name: "White-label", status: "3 live", ok: true },
  ];

  return (
    <div className="hero-shell hero-shell-sync">
      <header className="hero-shell-chrome hero-shell-chrome-sync">
        <span className="hero-shell-path">
          <Layers3 className="size-3 hero-spin" />
          marketplace connectivity
        </span>
        <span className="hero-sync-status-bar">
          <i data-ok="true" />
          <i data-ok="true" />
          <i data-ok="true" />
          <i data-ok="false" />
          <i data-ok="true" />
          <i data-ok="true" />
        </span>
        <span className="hero-mode-pill">Queue 0</span>
      </header>

      <div className="hero-shell-body hero-shell-body-sync">
        <div className="hero-sync-stage">
          <div className="hero-sync-orbit" aria-hidden>
            <span className="hero-sync-orbit-ring" />
            <span className="hero-sync-orbit-ring hero-sync-orbit-ring-2" />
            <span className="hero-sync-pulse" />
            <span className="hero-sync-core">
              SB
              <small>SYNC</small>
            </span>
            {channels.map((c, i) => (
              <span
                key={c.name}
                className="hero-sync-node"
                style={{ ["--i" as string]: i }}
                data-ok={c.ok ? "true" : "false"}
                title={c.name}
              />
            ))}
          </div>

          <div className="hero-sync-stats">
            <div>
              <strong>32+</strong>
              <span>channels</span>
            </div>
            <div>
              <strong>4s</strong>
              <span>last sync</span>
            </div>
            <div>
              <strong>0</strong>
              <span>conflicts</span>
            </div>
          </div>
        </div>

        <div className="hero-sync-list">
          {channels.map((c) => (
            <div
              key={c.name}
              className="hero-sync-row"
              data-ok={c.ok ? "true" : "false"}
            >
              <span>{c.name}</span>
              <span>
                {c.status}
                <ArrowUpRight className="inline size-3 opacity-70" />
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export function HeroDashboardTilt() {
  const cardRef = useRef<HTMLDivElement>(null);
  const [mode, setMode] = useState(0);
  const [paused, setPaused] = useState(false);
  const current = modes[mode] ?? modes[0]!;

  useEffect(() => {
    if (paused) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const id = window.setInterval(
      () => setMode((m) => (m + 1) % modes.length),
      MODE_MS,
    );
    return () => window.clearInterval(id);
  }, [paused, mode]);

  const onMove = useCallback((e: ReactMouseEvent<HTMLDivElement>) => {
    const el = cardRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width - 0.5;
    const py = (e.clientY - rect.top) / rect.height - 0.5;
    el.style.setProperty("--tilt-x", `${(-py * 16).toFixed(2)}deg`);
    el.style.setProperty("--tilt-y", `${(px * 20).toFixed(2)}deg`);
    el.style.setProperty("--tilt-glare-x", `${50 + px * 42}%`);
    el.style.setProperty("--tilt-glare-y", `${50 + py * 42}%`);
  }, []);

  const onLeave = useCallback(() => {
    const el = cardRef.current;
    if (!el) return;
    el.style.setProperty("--tilt-x", "10deg");
    el.style.setProperty("--tilt-y", "-20deg");
    el.style.setProperty("--tilt-glare-x", "28%");
    el.style.setProperty("--tilt-glare-y", "18%");
    setPaused(false);
  }, []);

  return (
    <div
      className="hero-tilt-scene"
      onMouseMove={onMove}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={onLeave}
      aria-hidden
    >
      <div className="hero-tilt-ambient" />
      <div
        ref={cardRef}
        className="hero-tilt-card hero-tilt-alive"
        data-mode={current.id}
      >
        <div className="hero-tilt-grid-bg" aria-hidden />
        <div className="hero-tilt-glare" />
        <span className="hero-tilt-scan" />

        <div key={current.id} className="hero-tilt-swap">
          {current.id === "intel" ? <ModeIntel /> : null}
          {current.id === "pricing" ? <ModePricing /> : null}
          {current.id === "sync" ? <ModeSync /> : null}
        </div>

        <div className="hero-mode-tabs">
          {modes.map((m, i) => (
            <button
              key={m.id}
              type="button"
              className="hero-mode-tab"
              data-active={i === mode ? "true" : "false"}
              onClick={() => setMode(i)}
              tabIndex={-1}
            >
              {m.label}
              {i === mode ? (
                <span
                  key={`${m.id}-${paused}`}
                  className="hero-mode-tab-fill"
                  style={{
                    animationDuration: `${MODE_MS}ms`,
                    animationPlayState: paused ? "paused" : "running",
                  }}
                />
              ) : null}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
