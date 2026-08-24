import { useEffect, useRef, useState } from "react";
import { Radio } from "lucide-react";
import { useInView } from "@/hooks/use-scroll-motion";
import { ConsoleShell } from "@/components/pages/brokers/ConsoleShell";

const stats = [
  { label: "Channels", value: "Multi" },
  { label: "Synced", value: "Live" },
  { label: "Sync", value: "Live" },
  { label: "Errors", value: "Tracked" },
] as const;

const channels = [
  { code: "CH-01", label: "Global resale", dest: "SG", status: "synced" as const, latency: "Live", errors: "0.0%" },
  { code: "CH-02", label: "Sports exchange", dest: "LF", status: "synced" as const, latency: "Live", errors: "0.1%" },
  { code: "CH-03", label: "Regional OTA", dest: "TM", status: "pushing" as const, latency: "Live", errors: "0.4%" },
  { code: "CH-04", label: "Broker desk", dest: "POS", status: "synced" as const, latency: "Live", errors: "0.0%" },
  { code: "CH-05", label: "B2B partners", dest: "OTA", status: "synced" as const, latency: "Live", errors: "0.0%" },
  { code: "CH-06", label: "White-label", dest: "WL", status: "queued" as const, latency: "—", errors: "—" },
  { code: "CH-07", label: "Marketplace 05", dest: "SH", status: "synced" as const, latency: "Live", errors: "0.2%" },
  { code: "CH-08", label: "Marketplace 06", dest: "VGG", status: "synced" as const, latency: "Live", errors: "0.0%" },
] as const;

const healthFeed = [
  { time: "09:42:18", msg: "channel.poll → connected channels · API health ok", ok: true },
  { time: "09:42:11", msg: "CH-03 · pushing · Regional OTA sync in flight", ok: true },
  { time: "09:42:04", msg: "CH-06 · queued · white-label reconnect", ok: true },
  { time: "09:41:56", msg: "api.log → listing.update · channels acked", ok: true },
  { time: "09:41:48", msg: "error.monitor → 0.1% rolling error rate", ok: true },
  { time: "09:41:40", msg: "channel.sync → CH-01 Global resale live", ok: true },
] as const;

function useCycle(length: number, ms: number, enabled: boolean) {
  const [active, setActive] = useState(0);

  useEffect(() => {
    if (!enabled || length <= 1) return;
    const id = window.setInterval(() => {
      setActive((i) => (i + 1) % length);
    }, ms);
    return () => window.clearInterval(id);
  }, [length, ms, enabled]);

  return active;
}

function statusLabel(status: (typeof channels)[number]["status"]) {
  if (status === "pushing") return "Pushing";
  if (status === "queued") return "Queued";
  return "Synced";
}

export function ChannelStatusConsole() {
  const rootRef = useRef<HTMLDivElement>(null);
  const { ref: inViewRef, inView } = useInView<HTMLDivElement>(0.25);
  const setRef = (node: HTMLDivElement | null) => {
    rootRef.current = node;
    inViewRef.current = node;
  };

  const activeChannel = useCycle(channels.length, 2600, inView);
  const feedRows = [...healthFeed, ...healthFeed];
  const selected = channels[activeChannel] ?? channels[0]!;

  return (
    <div ref={setRef} className="ch-console" data-live={inView ? "true" : "false"}>
      <ConsoleShell path="seatsbrokers / marketplace / channels" status="Sync" icon={Radio}>
        <div className="ch-stats">
          {stats.map((stat) => (
            <div key={stat.label} className="lc-stat">
              <span className="lc-stat-label">{stat.label}</span>
              <strong className="lc-stat-value">{stat.value}</strong>
            </div>
          ))}
        </div>

        <div className="ch-workspace">
          <section className="ch-panel ch-map-panel">
            <header className="ch-panel-head">
              <span>Connectivity map</span>
              <span className="ch-badge">{selected.code} · {statusLabel(selected.status)}</span>
            </header>
            <div className="ch-map" aria-hidden>
              <span className="ch-map-ring" />
              <span className="ch-map-ring ch-map-ring-2" />
              <span className="ch-hub">
                SB
                <small>Hub</small>
              </span>
              {channels.map((channel, index) => (
                <span
                  key={channel.code}
                  className="ch-node"
                  style={{ ["--ch-i" as string]: index }}
                  data-status={channel.status}
                  data-active={activeChannel === index ? "true" : "false"}
                >
                  <em>{channel.dest}</em>
                </span>
              ))}
            </div>
            <p className="ch-map-caption">
              {selected.label} · {selected.latency} · dest {selected.dest}
            </p>
          </section>

          <section className="ch-panel">
            <header className="ch-panel-head">
              <span>Channel health</span>
              <span className="ch-badge">8 shown</span>
            </header>
            <ul className="ch-list">
              {channels.map((channel, index) => (
                <li
                  key={channel.code}
                  className="ch-row"
                  data-status={channel.status}
                  data-active={activeChannel === index ? "true" : "false"}
                >
                  <span className="ch-row-code">{channel.code}</span>
                  <span className="ch-row-label">{channel.label}</span>
                  <span className="ch-row-meta">
                    <span className="lc-mono">{channel.latency}</span>
                    <span className="ch-row-status">{statusLabel(channel.status)}</span>
                  </span>
                </li>
              ))}
            </ul>
          </section>
        </div>

        <section className="ch-panel ch-feed-panel">
          <header className="ch-panel-head">
            <span className="ch-dot" aria-hidden />
            <span>API health log</span>
          </header>
          <div className="ch-feed-viewport">
            <ul className="ch-feed-list">
              {feedRows.map((row, index) => (
                <li key={`${row.time}-${index}`} className="ch-feed-row">
                  <span className="lc-mono">{row.time}</span>
                  <span>{row.msg}</span>
                  <span className="lc-feed-ok" data-ok={row.ok ? "true" : "false"} aria-hidden />
                </li>
              ))}
            </ul>
          </div>
        </section>
      </ConsoleShell>
    </div>
  );
}
