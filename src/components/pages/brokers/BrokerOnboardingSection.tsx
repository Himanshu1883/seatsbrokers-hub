import { useCallback, useEffect, useMemo, useRef, useState, type CSSProperties } from "react";
import {
  Check,
  CircleHelp,
  ClipboardList,
  CreditCard,
  Handshake,
  Headset,
  PlugZap,
  ShieldCheck,
  UserPlus,
  Users,
  Wallet,
  type LucideIcon,
} from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Reveal, useInView } from "@/hooks/use-scroll-motion";
import {
  ONBOARD_RESUME_MS,
  onboardChecklist,
  onboardCompareRows,
  onboardCopy,
  onboardDefaultRegion,
  onboardFaqs,
  onboardFrameLastIndex,
  onboardFrames,
  onboardPartners,
  onboardRegions,
  onboardStageLastIndex,
  onboardStages,
  type OnboardRegionId,
  type OnboardStageId,
} from "@/content/broker-onboarding-data";
import { ConsoleShell } from "./ConsoleShell";

const stageIcons: Record<OnboardStageId, LucideIcon> = {
  apply: UserPlus,
  verify: ShieldCheck,
  connect: PlugZap,
  cards: CreditCard,
  payouts: Wallet,
  live: Headset,
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

function RegionSwap({
  region,
  values,
}: {
  region: OnboardRegionId;
  values: Record<OnboardRegionId, string>;
}) {
  return (
    <span className="bon-swap">
      {onboardRegions.map((item) => (
        <span key={item.id} data-active={item.id === region ? "true" : "false"}>
          {values[item.id]}
        </span>
      ))}
    </span>
  );
}

type DeskProps = {
  region: OnboardRegionId;
  onStageIndex: (index: number) => void;
  inspectToken: { index: number; nonce: number } | null;
};

function OnboardingDesk({ region, onStageIndex, inspectToken }: DeskProps) {
  const rootRef = useRef<HTMLDivElement>(null);
  const { ref: inViewRef, inView } = useInView<HTMLDivElement>(0.25, { once: false });
  const reducedMotion = usePrefersReducedMotion();
  const setRef = (node: HTMLDivElement | null) => {
    rootRef.current = node;
    inViewRef.current = node;
  };

  const [frameIndex, setFrameIndex] = useState(0);
  const [manual, setManual] = useState(false);
  const [inputTick, setInputTick] = useState(0);
  const [manualStage, setManualStage] = useState(onboardStageLastIndex);
  const lastReported = useRef(-1);

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

  useEffect(() => {
    if (inspectToken === null) return;
    takeControl();
    setManualStage(inspectToken.index);
  }, [inspectToken, takeControl]);

  const frame =
    onboardFrames[reducedMotion ? onboardFrameLastIndex : frameIndex] ?? onboardFrames[0]!;
  const stageIndex = reducedMotion
    ? onboardStageLastIndex
    : manual
      ? manualStage
      : frame.stageIndex;
  const current = onboardStages[stageIndex] ?? onboardStages[0]!;
  const status = reducedMotion ? "Live" : manual ? "Hold" : inView ? "Live" : "Idle";
  const progress = (stageIndex + 1) / stageCount;
  const regionMeta = onboardRegions.find((item) => item.id === region) ?? onboardRegions[0]!;

  useEffect(() => {
    if (lastReported.current === stageIndex) return;
    lastReported.current = stageIndex;
    onStageIndex(stageIndex);
  }, [onStageIndex, stageIndex]);

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
      <ConsoleShell path="seatsbrokers / brokers / onboarding" status={status} icon={Handshake}>
        <div className="bon-desk-inner" style={deskStyle}>
          <div className="bon-desk-top">
            <p className="bon-kicker">
              Company setup
              <span className="bon-kicker-count">
                {current.index} / {String(stageCount).padStart(2, "0")} · {regionMeta.tab}
              </span>
            </p>
            <p className="sr-only" aria-live="polite">
              {current.label} · {regionMeta.desk}
            </p>
            {manual ? (
              <button type="button" className="bon-resume" onClick={resumeAuto}>
                Resume auto-run
              </button>
            ) : (
              <span className="bon-mode">{reducedMotion ? "Settled" : "Auto-run"}</span>
            )}
          </div>

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
                      <StageIcon className="size-3" strokeWidth={1.9} />
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
                    </span>
                  </button>
                </li>
              );
            })}
          </ol>

          <ul className="bon-feed" aria-label="Company setup ledger">
            {ledgerWindow.map(({ stage, state }) => (
              <li key={stage.id} className="bon-feed-row" data-state={state}>
                <span className="bon-feed-dot" aria-hidden />
                <span className="bon-feed-msg">{stage.ledger[region]}</span>
              </li>
            ))}
          </ul>
        </div>
      </ConsoleShell>
    </div>
  );
}

export function BrokerOnboardingSection() {
  const [region, setRegion] = useState<OnboardRegionId>(onboardDefaultRegion);
  const [liveStage, setLiveStage] = useState(0);
  const [inspectToken, setInspectToken] = useState<{ index: number; nonce: number } | null>(null);
  const inspectSeq = useRef(0);
  const [faqOpen, setFaqOpen] = useState<string>(onboardFaqs[0]!.id);

  const pinStage = (index: number) => {
    inspectSeq.current += 1;
    setInspectToken({ index, nonce: inspectSeq.current });
  };

  return (
    <section
      id="company-setup"
      className="bon-section section-curve relative isolate scroll-mt-24 bg-background py-14 sm:py-16"
    >
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-border to-transparent"
        aria-hidden
      />

      <div className="container-page relative z-10">
        <Reveal>
          <header className="bon-head">
            <p className="section-eyebrow text-primary">{onboardCopy.eyebrow}</p>
            <h2 className="bon-title">{onboardCopy.title}</h2>
            <p className="bon-lead">{onboardCopy.body}</p>

            <div className="bon-region-tabs" role="tablist" aria-label="Company setup region">
              {onboardRegions.map((item) => {
                const selected = item.id === region;
                return (
                  <button
                    key={item.id}
                    type="button"
                    role="tab"
                    className="bon-region-tab"
                    aria-selected={selected}
                    aria-controls="bon-region-panel"
                    id={`bon-tab-${item.id}`}
                    data-active={selected ? "true" : "false"}
                    onClick={() => setRegion(item.id)}
                  >
                    {item.tab}
                  </button>
                );
              })}
            </div>
          </header>
        </Reveal>

        <Reveal delay={80}>
          <div className="bon-compare">
            <div className="bon-block-head">
              <p className="bon-block-kicker">Regional comparison</p>
              <p className="bon-block-note">
                Entity, rails, and compliance by desk. Times and hours are confirmed with the desk —
                not listed as a number here.
              </p>
            </div>
            <div className="bon-compare-scroll">
              <ul className="bon-compare-grid">
                {onboardRegions.map((item) => (
                  <li
                    key={item.id}
                    className="bon-compare-col"
                    data-active={item.id === region ? "true" : "false"}
                  >
                    <button
                      type="button"
                      className="bon-compare-head"
                      onClick={() => setRegion(item.id)}
                    >
                      <span className="bon-compare-city">{item.column}</span>
                      <span className="bon-compare-desk">{item.desk}</span>
                    </button>
                    <dl className="bon-compare-rows">
                      {onboardCompareRows.map((row) => (
                        <div key={row.id} className="bon-compare-row">
                          <dt>{row.label}</dt>
                          <dd>{row.cells[item.id]}</dd>
                        </div>
                      ))}
                    </dl>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Reveal>

        <div
          id="bon-region-panel"
          role="tabpanel"
          aria-labelledby={`bon-tab-${region}`}
          className="bon-region-panel"
        >
          <Reveal delay={100}>
            <div className="bon-journey">
              <div className="bon-block-head">
                <p className="bon-block-kicker">Six-phase journey</p>
                <p className="bon-block-note">
                  Apply → Verify → Connect → Cards & payments → Payouts → Live and managed. Region
                  detail follows the tab above. Estimated time is omitted until the desk confirms it.
                </p>
              </div>

              <div className="bon-journey-split">
                <ol className="bon-phases">
                  {onboardStages.map((stage, index) => {
                    const StageIcon = stageIcons[stage.id];
                    const current = index === liveStage;
                    return (
                      <li key={stage.id} className="bon-phase" data-current={current ? "true" : "false"}>
                        <button
                          type="button"
                          className="bon-phase-head"
                          aria-expanded={current}
                          aria-controls={`bon-phase-${stage.id}`}
                          onClick={() => pinStage(index)}
                        >
                          <span className="bon-phase-icon" aria-hidden>
                            <StageIcon className="size-3.5" strokeWidth={1.9} />
                          </span>
                          <span className="bon-phase-index">{stage.index}</span>
                          <strong>{stage.label}</strong>
                          <span className="bon-phase-blurb">{stage.blurb}</span>
                        </button>

                        <div
                          id={`bon-phase-${stage.id}`}
                          className="bon-phase-body"
                          inert={current ? undefined : true}
                          aria-hidden={!current}
                        >
                          <div className="bon-phase-body-clip">
                            <div className="bon-phase-cols">
                              <div className="bon-phase-col" data-side="we">
                                <p className="bon-phase-label">What we handle</p>
                                <ul>
                                  {stage.weHandle.map((item) => (
                                    <li key={item}>{item}</li>
                                  ))}
                                </ul>
                              </div>
                              <div className="bon-phase-col" data-side="you">
                                <p className="bon-phase-label">What you provide</p>
                                <ul>
                                  {stage.youProvide.map((item) => (
                                    <li key={item}>{item}</li>
                                  ))}
                                </ul>
                              </div>
                              <div className="bon-phase-col" data-side="region">
                                <p className="bon-phase-label">Region-specific</p>
                                <p className="bon-phase-region">
                                  <RegionSwap region={region} values={stage.regionDetail} />
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </li>
                    );
                  })}
                </ol>

                <div className="bon-stage">
                  <p className="bon-stage-kicker">Interactive demo</p>
                  <OnboardingDesk
                    region={region}
                    onStageIndex={setLiveStage}
                    inspectToken={inspectToken}
                  />
                </div>
              </div>
            </div>
          </Reveal>

          <Reveal delay={120}>
            <div className="bon-partners">
              <div className="bon-block-head">
                <p className="bon-block-kicker">
                  <Users className="size-3.5" strokeWidth={1.9} aria-hidden />
                  {onboardPartners.eyebrow}
                </p>
                <h3 className="bon-block-title">{onboardPartners.title}</h3>
                <p className="bon-block-note">{onboardPartners.body}</p>
              </div>

              <ul className="bon-partner-gets">
                {onboardPartners.gets.map((item) => (
                  <li key={item.title} className="bon-partner-get">
                    <span className="bon-partner-get-mark" aria-hidden>
                      <Check className="size-3" strokeWidth={3} />
                    </span>
                    <span>
                      <strong>{item.title}</strong>
                      <span>{item.body}</span>
                    </span>
                  </li>
                ))}
              </ul>

              <ul className="bon-partner-notes">
                <li>
                  <strong>How many partners</strong>
                  <span>{onboardPartners.cap}</span>
                </li>
                <li>
                  <strong>Multi-region partners</strong>
                  <span>{onboardPartners.multiRegion}</span>
                </li>
                <li>
                  <strong>This region</strong>
                  <RegionSwap region={region} values={onboardPartners.regionNote} />
                </li>
              </ul>
            </div>
          </Reveal>

          <Reveal delay={140}>
            <div className="bon-need">
              <div className="bon-block-head">
                <p className="bon-block-kicker">
                  <ClipboardList className="size-3.5" strokeWidth={1.9} aria-hidden />
                  {onboardChecklist.eyebrow}
                </p>
                <h3 className="bon-block-title">{onboardChecklist.title}</h3>
              </div>
              <ul className="bon-need-list">
                {onboardChecklist.shared.map((item) => (
                  <li key={item}>
                    <span className="bon-need-box" aria-hidden />
                    <span>{item}</span>
                  </li>
                ))}
                <li data-region="true">
                  <span className="bon-need-box" aria-hidden />
                  <RegionSwap region={region} values={onboardChecklist.region} />
                </li>
              </ul>
            </div>
          </Reveal>
        </div>

        <Reveal delay={160}>
          <div className="bon-faq">
            <div className="bon-block-head">
              <p className="bon-block-kicker">
                <CircleHelp className="size-3.5" strokeWidth={1.9} aria-hidden />
                Questions
              </p>
              <h3 className="bon-block-title">What brokers ask before company setup.</h3>
            </div>
            <Accordion
              type="single"
              collapsible
              value={faqOpen}
              onValueChange={setFaqOpen}
              className="bon-faq-list"
            >
              {onboardFaqs.map((item, index) => (
                <AccordionItem key={item.id} value={item.id} className="bon-faq-item">
                  <AccordionTrigger className="bon-faq-trigger">
                    <span className="bon-faq-index">{String(index + 1).padStart(2, "0")}</span>
                    <span className="bon-faq-q">{item.question}</span>
                  </AccordionTrigger>
                  <AccordionContent className="bon-faq-content">
                    <p className="bon-faq-a">{item.answer}</p>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
