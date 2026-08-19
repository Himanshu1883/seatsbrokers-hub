import { Fragment, useCallback, useEffect, useRef, useState } from "react";
import {
  Banknote,
  CheckCircle2,
  Circle,
  Coins,
  Loader2,
  Wallet,
} from "lucide-react";
import { useInView } from "@/hooks/use-scroll-motion";
import {
  PAYOUT_RESUME_MS,
  chainChips,
  chipForStage,
  confirmCopy,
  feedCopy,
  ledgerCopy,
  nodeState,
  pathNodes,
  payoutFrameLastIndex,
  payoutFrames,
  payoutSale,
  payoutStages,
  payoutTracks,
  type PayoutFrame,
  type PayoutRail,
  type PayoutStage,
} from "@/content/crypto-payout-data";
import { ConsoleShell } from "./ConsoleShell";

const stageOrder: readonly PayoutStage[] = ["sale", "withhold", "transfer", "settle"];

function usePrefersReducedMotion() {
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(mq.matches);
    const onChange = () => setReduced(mq.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  return reduced;
}

export function CryptoPayoutConsole() {
  const rootRef = useRef<HTMLDivElement>(null);
  const { ref: inViewRef, inView } = useInView<HTMLDivElement>(0.25);
  const reducedMotion = usePrefersReducedMotion();
  const setRef = (node: HTMLDivElement | null) => {
    rootRef.current = node;
    inViewRef.current = node;
  };

  const [frameIndex, setFrameIndex] = useState(0);
  const [manual, setManual] = useState(false);
  const [inputTick, setInputTick] = useState(0);
  const [manualRail, setManualRail] = useState<PayoutRail>("usdt");

  const railRef = useRef<PayoutRail>("usdt");

  const auto = inView && !reducedMotion && !manual;

  useEffect(() => {
    if (reducedMotion) {
      setFrameIndex(payoutFrameLastIndex);
      return;
    }
    if (!auto) return;
    const frame = payoutFrames[frameIndex] ?? payoutFrames[0]!;
    const id = window.setTimeout(() => {
      setFrameIndex((index) => (index + 1) % payoutFrames.length);
    }, frame.hold);
    return () => window.clearTimeout(id);
  }, [auto, frameIndex, reducedMotion]);

  const takeControl = useCallback(() => {
    setManual((was) => {
      if (!was) setManualRail(railRef.current);
      return true;
    });
    setInputTick((tick) => tick + 1);
  }, []);

  const resumeAuto = useCallback(() => {
    setManual(false);
    setFrameIndex(0);
    setManualRail("usdt");
  }, []);

  useEffect(() => {
    if (!inView || reducedMotion || !manual) return;
    const id = window.setTimeout(resumeAuto, PAYOUT_RESUME_MS);
    return () => window.clearTimeout(id);
  }, [inView, inputTick, manual, reducedMotion, resumeAuto]);

  const autoFrame: PayoutFrame =
    payoutFrames[reducedMotion ? payoutFrameLastIndex : frameIndex] ?? payoutFrames[0]!;
  const rail = manual ? manualRail : autoFrame.rail;
  const stage: PayoutStage = reducedMotion ? "settle" : manual ? "settle" : autoFrame.stage;
  railRef.current = rail;

  const stageIndex = stageOrder.indexOf(stage);
  const nodes = pathNodes[rail];
  const ledger = ledgerCopy[rail];
  const feed = feedCopy[rail];
  const confirm = confirmCopy[rail][stage];
  const liveChip = chipForStage(stage);
  const packetOn = stage === "transfer" && !reducedMotion;
  const settlePulse = stage === "settle" && rail === "usdt" && !reducedMotion;
  const status = reducedMotion ? "Live" : manual ? "Hold" : inView ? "Live" : "Idle";

  const inspectRail = (next: PayoutRail) => {
    takeControl();
    setManualRail(next);
  };

  return (
    <div
      ref={setRef}
      className="sfp-console"
      data-live={inView && !reducedMotion && !manual ? "true" : "false"}
      data-rail={rail}
      data-stage={stage}
      onPointerDownCapture={takeControl}
      onKeyDownCapture={takeControl}
    >
      <ConsoleShell path="seatsbrokers / seatsfunds / usdt-rail" status={status} icon={Wallet}>
        <div className="sfp-body">
          <header className="sfp-sale">
            <div className="sfp-sale-copy">
              <span className="lc-mono">SeatsFunds™ · payout desk</span>
              <strong>{payoutSale.event}</strong>
              <span>
                {payoutSale.venue} · {payoutSale.channel}
              </span>
            </div>
            <div className="sfp-sale-rail" data-usdt={rail === "usdt" ? "true" : "false"}>
              <span>Armed rail</span>
              <strong>{rail === "usdt" ? "USDT" : "Standard"}</strong>
            </div>
          </header>

          <ol className="sfp-pipe" aria-label="Payout pipeline">
            {payoutStages.map((item, index) => {
              const done = index < stageIndex;
              const current = index === stageIndex;
              return (
                <li
                  key={item.id}
                  className="sfp-pipe-step"
                  data-done={done ? "true" : "false"}
                  data-current={current ? "true" : "false"}
                >
                  <span className="sfp-pipe-icon" aria-hidden>
                    {done ? (
                      <CheckCircle2 className="size-3.5" />
                    ) : current ? (
                      <Loader2 className="size-3.5 lc-spin" />
                    ) : (
                      <Circle className="size-3.5" />
                    )}
                  </span>
                  <span className="sfp-pipe-label">{item.label}</span>
                  <span className="sfp-pipe-detail">{item.detail}</span>
                </li>
              );
            })}
          </ol>

          <div className="sfp-main">
            <section className="lc-panel sfp-canvas" data-pulse={settlePulse ? "true" : "false"}>
              <header className="lc-panel-head">
                <span className="lc-panel-dot" aria-hidden />
                <span>{rail === "usdt" ? "USDT wallet" : "Bank settlement"}</span>
                <span className="lc-panel-badge lc-panel-badge-live">
                  {rail === "usdt" ? "Crypto rail" : "Bank rails"}
                </span>
              </header>

              <div className="sfp-path" aria-label="Payout path">
                {nodes.map((node, index) => {
                  const state = nodeState(stage, index);
                  return (
                    <Fragment key={node.id}>
                      <div
                        className="sfp-node"
                        data-state={state}
                        data-dest={index === 2 ? "true" : "false"}
                      >
                        <strong>{node.label}</strong>
                        <span>{node.hint}</span>
                      </div>
                      {index < nodes.length - 1 ? (
                        <span
                          className="sfp-link"
                          data-live={packetOn ? "true" : "false"}
                          aria-hidden
                        >
                          <i className="sfp-packet" />
                        </span>
                      ) : null}
                    </Fragment>
                  );
                })}
              </div>

              <ul className="sfp-chips" aria-label="Transfer state">
                {chainChips.map((chip) => (
                  <li key={chip.id} data-on={liveChip === chip.id ? "true" : "false"}>
                    {chip.label}
                  </li>
                ))}
              </ul>

              <ol className="sfp-ledger" aria-label="Settlement ledger">
                {ledger.map((line, index) => {
                  const done = index < stageIndex;
                  const current = index === stageIndex;
                  return (
                    <li
                      key={line}
                      data-done={done ? "true" : "false"}
                      data-current={current ? "true" : "false"}
                    >
                      <span aria-hidden>
                        {done ? (
                          <CheckCircle2 className="size-3.5" />
                        ) : current ? (
                          <Loader2 className="size-3.5 lc-spin" />
                        ) : (
                          <Circle className="size-3.5" />
                        )}
                      </span>
                      <span>{line}</span>
                    </li>
                  );
                })}
              </ol>
            </section>

            <section className="lc-panel sfp-tracks">
              <header className="lc-panel-head">
                <span>Payout track</span>
                <span className="lc-panel-badge">{rail === "usdt" ? "USDT" : "Standard"}</span>
              </header>
              <div className="sfp-track-grid">
                {payoutTracks.map((track) => {
                  const Icon = track.id === "usdt" ? Coins : Banknote;
                  const active = rail === track.id;
                  return (
                    <button
                      key={track.id}
                      type="button"
                      className="sfp-track"
                      data-active={active ? "true" : "false"}
                      data-hero={track.id === "usdt" ? "true" : "false"}
                      aria-pressed={active}
                      onClick={() => inspectRail(track.id)}
                      onPointerEnter={() => inspectRail(track.id)}
                    >
                      <span className="sfp-track-top">
                        <span className="sfp-track-icon" aria-hidden>
                          <Icon className="size-3.5" strokeWidth={1.75} />
                        </span>
                        <em>{track.kicker}</em>
                      </span>
                      <strong>{track.label}</strong>
                      <span className="sfp-track-settle">{track.settle}</span>
                      <span className="sfp-track-fee">{track.fee}</span>
                    </button>
                  );
                })}
              </div>
            </section>
          </div>

          <section className="lc-panel sfp-confirm" data-pulse={settlePulse ? "true" : "false"}>
            <header className="lc-panel-head">
              <span className="lc-panel-dot" aria-hidden />
              <span>{stage === "settle" ? "Settlement" : "Desk feed"}</span>
              <span className="lc-panel-badge">
                {manual ? "Inspecting · auto-run resumes" : "Auto-run"}
              </span>
            </header>
            <p className="sfp-confirm-line">{confirm}</p>
            <ul className="sfp-feed">
              {feed.map((row, index) => (
                <li key={row} data-on={index <= stageIndex ? "true" : "false"}>
                  {row}
                </li>
              ))}
            </ul>
          </section>
        </div>
      </ConsoleShell>
    </div>
  );
}
