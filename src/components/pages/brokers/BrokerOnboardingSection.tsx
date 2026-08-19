import { useCallback, useEffect, useMemo, useRef, useState, type CSSProperties } from "react";
import {
  Check,
  CreditCard,
  Handshake,
  Headset,
  Loader2,
  PlugZap,
  ShieldCheck,
  UserPlus,
  Users,
  Wallet,
  type LucideIcon,
} from "lucide-react";
import { Reveal, useInView } from "@/hooks/use-scroll-motion";
import {
  ONBOARD_RESUME_MS,
  onboardCapabilityGroups,
  onboardChecksPerStage,
  onboardCopy,
  onboardFrameLastIndex,
  onboardFrames,
  onboardHighlights,
  onboardPoints,
  onboardStageLastIndex,
  onboardStages,
  type OnboardStageId,
} from "@/content/broker-onboarding-data";
import { ConsoleCopyPanel } from "./ConsoleCopyPanel";
import { ConsoleShell } from "./ConsoleShell";

const tiltStyle = {
  ["--lc-tilt-y" as string]: "-10deg",
  ["--lc-tilt-x" as string]: "4deg",
} as CSSProperties;

const stageIcons: Record<OnboardStageId, LucideIcon> = {
  apply: UserPlus,
  verify: ShieldCheck,
  connect: PlugZap,
  cards: CreditCard,
  payouts: Wallet,
  live: Headset,
};

const groupIcons: Record<string, LucideIcon> = {
  setup: ShieldCheck,
  connection: PlugZap,
  money: Wallet,
};

const stageCount = onboardStages.length;
const feedRows = 3;

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

function OnboardingDesk() {
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
  const [manualStage, setManualStage] = useState(onboardStageLastIndex);

  const auto = inView && !reducedMotion && !manual;

  useEffect(() => {
    if (reducedMotion) {
      setFrameIndex(onboardFrameLastIndex);
      return;
    }
    if (!auto) return;
    const frame = onboardFrames[frameIndex] ?? onboardFrames[0]!;
    const id = window.setTimeout(() => {
      setFrameIndex((index) => (index + 1) % onboardFrames.length);
    }, frame.hold);
    return () => window.clearTimeout(id);
  }, [auto, frameIndex, reducedMotion]);

  const takeControl = useCallback(() => {
    setManual(true);
    setInputTick((tick) => tick + 1);
  }, []);

  const resumeAuto = useCallback(() => {
    setManual(false);
    setFrameIndex(0);
  }, []);

  useEffect(() => {
    if (!inView || reducedMotion || !manual) return;
    const id = window.setTimeout(resumeAuto, ONBOARD_RESUME_MS);
    return () => window.clearTimeout(id);
  }, [inView, inputTick, manual, reducedMotion, resumeAuto]);

  const frame =
    onboardFrames[reducedMotion ? onboardFrameLastIndex : frameIndex] ?? onboardFrames[0]!;
  const settled = reducedMotion || manual;
  const stageIndex = reducedMotion
    ? onboardStageLastIndex
    : manual
      ? manualStage
      : frame.stageIndex;
  const checksDone = settled ? onboardChecksPerStage : frame.checks;
  const current = onboardStages[stageIndex] ?? onboardStages[0]!;
  const status = reducedMotion ? "Live" : manual ? "Hold" : inView ? "Live" : "Idle";
  const progress = (stageIndex + checksDone / onboardChecksPerStage) / stageCount;

  const ledgerWindow = useMemo(() => {
    const start = Math.min(Math.max(stageIndex - (feedRows - 1), 0), stageCount - feedRows);
    return onboardStages.slice(start, start + feedRows).map((stage, offset) => {
      const index = start + offset;
      return {
        stage,
        state: index < stageIndex ? "done" : index === stageIndex ? "current" : "idle",
      };
    });
  }, [stageIndex]);

  const inspectStage = (next: number) => {
    takeControl();
    setManualStage(next);
  };

  const deskStyle = { ["--bon-progress" as string]: `${progress}` } as CSSProperties;

  return (
    <div
      ref={setRef}
      className="bon-desk"
      data-live={inView && !reducedMotion ? "true" : "false"}
      onPointerDown={takeControl}
      onKeyDown={takeControl}
    >
      <ConsoleShell path="seatsbrokers / brokers / company-setup" status={status} icon={Handshake}>
        <div className="bon-desk-inner" style={deskStyle}>
          <div className="bon-desk-top">
            <p className="bon-kicker">
              Company setup
              <span className="bon-kicker-count">
                Step {current.index} of {String(stageCount).padStart(2, "0")}
              </span>
            </p>
            <p className="sr-only" aria-live="polite">
              {current.status}
            </p>
            {manual ? (
              <button type="button" className="bon-resume" onClick={resumeAuto}>
                Resume auto-run
              </button>
            ) : (
              <span className="bon-mode">{reducedMotion ? "Settled" : "Auto-run"}</span>
            )}
          </div>

          <div className="bon-panes">
            <ol className="bon-rail">
              {onboardStages.map((stage, index) => {
                const state =
                  index < stageIndex ? "done" : index === stageIndex ? "current" : "idle";
                const StageIcon = stageIcons[stage.id];
                return (
                  <li key={stage.id} className="bon-rail-item" data-state={state}>
                    <button
                      type="button"
                      className="bon-step"
                      data-state={state}
                      aria-current={state === "current" ? "step" : undefined}
                      onClick={() => inspectStage(index)}
                    >
                      <span className="bon-step-mark" aria-hidden>
                        <StageIcon className="size-3.5" strokeWidth={1.9} />
                        {state === "done" ? (
                          <span className="bon-step-tick">
                            <Check className="size-2.5" strokeWidth={3} />
                          </span>
                        ) : null}
                        {state === "current" ? <span className="bon-step-ring" /> : null}
                      </span>
                      <span className="bon-step-copy">
                        <span className="bon-step-label">
                          <span className="bon-step-index">{stage.index}</span>
                          {stage.label}
                        </span>
                        <span className="bon-step-blurb">{stage.blurb}</span>
                      </span>
                    </button>
                  </li>
                );
              })}
            </ol>

            <div className="bon-detail" data-stage={current.id}>
              <div className="bon-detail-head" key={current.id}>
                <p className="bon-detail-eyebrow">
                  <span className="bon-detail-index">{current.index}</span>
                  {current.label}
                </p>
                <p className="bon-detail-status">{current.status}</p>
              </div>

              <div className="bon-do-split">
                <div className="bon-do" data-side="we">
                  <span className="bon-do-label">We do</span>
                  <p>{current.we}</p>
                </div>
                <div className="bon-do" data-side="you">
                  <span className="bon-do-label">You do</span>
                  <p>{current.you}</p>
                </div>
              </div>

              <ul className="bon-checks">
                {current.checks.map((check, index) => {
                  const state =
                    index < checksDone ? "done" : index === checksDone ? "active" : "idle";
                  return (
                    <li key={check} className="bon-check" data-state={state}>
                      <span className="bon-check-mark" aria-hidden>
                        {state === "done" ? (
                          <Check className="size-2.5" strokeWidth={3} />
                        ) : state === "active" && !settled ? (
                          <Loader2 className="size-2.5 bon-spin" strokeWidth={2.6} />
                        ) : null}
                      </span>
                      <span className="bon-check-text">{check}</span>
                    </li>
                  );
                })}
              </ul>

              <div className="bon-artifact">
                <div className="bon-artifact-top">
                  <span className="bon-artifact-label">Artifact</span>
                  <strong>{current.artifact.name}</strong>
                </div>
                <ul className="bon-artifact-chips">
                  {current.artifact.chips.map((chip, index) => (
                    <li key={chip} data-state={index < checksDone ? "on" : "off"}>
                      {chip}
                    </li>
                  ))}
                </ul>
              </div>

              <p className="bon-partner">
                <span className="bon-partner-icon" aria-hidden>
                  <Users className="size-3" strokeWidth={2} />
                </span>
                <span className="bon-partner-text">
                  <span className="bon-partner-label">Broker partners</span>
                  {current.partner}
                </span>
              </p>
            </div>
          </div>

          <ul className="bon-feed" aria-label="Company setup ledger">
            {ledgerWindow.map(({ stage, state }) => (
              <li key={stage.id} className="bon-feed-row" data-state={state}>
                <span className="bon-feed-dot" aria-hidden />
                <span className="bon-feed-msg">{stage.ledger}</span>
              </li>
            ))}
          </ul>
        </div>
      </ConsoleShell>
    </div>
  );
}

export function BrokerOnboardingSection() {
  return (
    <section className="bon-section section-curve relative isolate scroll-mt-24 bg-background py-20 sm:py-24">
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-border to-transparent"
        aria-hidden
      />

      <div className="container-page relative z-10">
        <div className="bon-split">
          <Reveal className="bon-copy min-w-0">
            <ConsoleCopyPanel
              meta={{
                eyebrow: onboardCopy.eyebrow,
                title: onboardCopy.title,
                body: onboardCopy.body,
                detail: onboardCopy.detail,
                detailLabel: onboardCopy.detailLabel,
                highlights: [...onboardHighlights],
                points: [...onboardPoints],
              }}
              isDark={false}
            />
          </Reveal>

          <Reveal delay={120} className="bon-stage min-w-0">
            <div className="lc-tilt-wrap" style={tiltStyle}>
              <div className="lc-tilt-card">
                <OnboardingDesk />
                <span className="lc-tilt-badge" aria-hidden>
                  <Handshake className="size-4" strokeWidth={1.75} />
                </span>
                <span className="lc-tilt-shadow" aria-hidden />
              </div>
            </div>
          </Reveal>
        </div>

        <Reveal delay={160}>
          <div className="bon-caps">
            <div className="bon-caps-head">
              <p className="bon-caps-kicker">What we handle for the company</p>
              <p className="bon-caps-note">
                Every group runs the same way for the broker partners you set up as sub-accounts.
              </p>
            </div>
            <ul className="bon-caps-grid">
              {onboardCapabilityGroups.map((group) => {
                const GroupIcon = groupIcons[group.id] ?? ShieldCheck;
                return (
                  <li key={group.id} className="bon-cap-group">
                    <div className="bon-cap-head">
                      <span className="bon-cap-icon" aria-hidden>
                        <GroupIcon className="size-4" strokeWidth={1.9} />
                      </span>
                      <strong>{group.title}</strong>
                      <span className="bon-cap-head-body">{group.body}</span>
                    </div>
                    <ul className="bon-cap-items">
                      {group.items.map((item) => (
                        <li key={item.title} className="bon-cap-item">
                          <span className="bon-cap-item-mark" aria-hidden>
                            <Check className="size-2.5" strokeWidth={3} />
                          </span>
                          <span className="bon-cap-item-copy">
                            <strong>{item.title}</strong>
                            <span>{item.body}</span>
                          </span>
                        </li>
                      ))}
                    </ul>
                  </li>
                );
              })}
            </ul>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
