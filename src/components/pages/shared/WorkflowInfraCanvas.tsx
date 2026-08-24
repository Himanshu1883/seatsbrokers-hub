import type { CSSProperties } from "react";

type WorkflowInfraCanvasProps = {
  steps: string[];
};

function isHubStep(step: string) {
  const trimmed = step.trim();
  return (
    /^seatsbrokers$/i.test(trimmed) ||
    /^seatsbrokers platform$/i.test(trimmed) ||
    /^seatsbrokers\s[—–]/i.test(trimmed)
  );
}

function parseStepCopy(step: string) {
  const emDash = step.split(/\s[—–]\s/);
  if (emDash.length >= 2 && emDash[0]) {
    return { title: emDash[0].trim(), body: emDash.slice(1).join(" — ").trim() };
  }

  const slash = step.split("/").map((part) => part.trim());
  if (slash.length >= 2 && slash[0] && slash[0].length < 40) {
    return { title: slash[0], body: step };
  }

  const colon = step.split(":");
  if (colon.length >= 2 && colon[0] && colon[0].length < 36) {
    return { title: colon[0].trim(), body: colon.slice(1).join(":").trim() };
  }

  const words = step.split(/\s+/);
  if (words.length > 8) {
    return { title: `${words.slice(0, 5).join(" ")}…`, body: step };
  }

  return { title: step, body: "" };
}

function WorkflowGlowCard({
  step,
  index,
  featured = false,
}: {
  step: string;
  index: number;
  featured?: boolean;
}) {
  const { title, body } = parseStepCopy(step);
  const showHubMark = featured || isHubStep(step);

  return (
    <article
      className={`ws-flow-card-outer wic-glass-host${featured ? " is-featured" : ""}`}
      style={{ "--ws-delay": `${index * 0.55}s` } as CSSProperties}
    >
      <span className="ws-flow-card-dot" aria-hidden />
      <div className="ws-flow-card wic-glass">
        <span className="wic-glass-shade wic-glass-shade-back" aria-hidden />
        <span className="wic-glass-shade wic-glass-shade-front" aria-hidden />
        <span className="ws-flow-card-ray" aria-hidden />
        <span className="ws-flow-card-step">{String(index + 1).padStart(2, "0")}</span>
        {showHubMark ? <span className="ws-flow-card-mark">SB</span> : null}
        <h3 className="ws-flow-card-title">{featured && isHubStep(step) ? "SeatsBrokers" : title}</h3>
        {body ? <p className="ws-flow-card-body">{body}</p> : null}
        <span className="ws-flow-card-line ws-flow-card-line-top" aria-hidden />
        <span className="ws-flow-card-line ws-flow-card-line-left" aria-hidden />
        <span className="ws-flow-card-line ws-flow-card-line-bottom" aria-hidden />
        <span className="ws-flow-card-line ws-flow-card-line-right" aria-hidden />
      </div>
    </article>
  );
}

export function WorkflowInfraCanvas({ steps }: WorkflowInfraCanvasProps) {
  const hubIndex = steps.findIndex(isHubStep);

  return (
    <div className="ws-flow-panel">
      <ol className="sr-only">
        {steps.map((step, i) => (
          <li key={`${i}-${step}`}>{step}</li>
        ))}
      </ol>

      <div className="ws-flow-grid ws-flow-grid--center">
        {steps.map((step, index) => (
          <WorkflowGlowCard
            key={`${index}-${step}`}
            step={step}
            index={index}
            featured={hubIndex === index}
          />
        ))}
      </div>
    </div>
  );
}
