import type { LucideIcon } from "lucide-react";
import { ArrowRight } from "lucide-react";

type ConnectorNode = {
  label: string;
  detail: string;
  icon: LucideIcon;
};

type SectionConnectorProps = {
  from: ConnectorNode;
  to: ConnectorNode;
  payload: readonly string[];
  step?: string;
  tone?: "light" | "dark";
  /** Fallback for legacy usage. */
  label?: string;
};

export function SectionConnector({
  from,
  to,
  payload,
  step,
  tone = "light",
  label,
}: SectionConnectorProps) {
  const FromIcon = from.icon;
  const ToIcon = to.icon;

  return (
    <div className="sx-connector" data-tone={tone}>
      <div className="container-page">
        <div className="sx-connector-grid">
          <article className="sx-connector-node">
            <span className="sx-connector-node-icon" aria-hidden>
              <FromIcon className="size-4" strokeWidth={1.75} />
            </span>
            <div className="sx-connector-node-copy">
              <span className="sx-connector-node-kicker">Source</span>
              <strong>{from.label}</strong>
              <p>{from.detail}</p>
            </div>
          </article>

          <div className="sx-connector-rail">
            {step ? <span className="sx-connector-step">{step}</span> : null}

            <div className="sx-connector-track" aria-hidden>
              <span className="sx-connector-track-line" />
              <span className="sx-connector-packet" style={{ animationDelay: "0s" }} />
              <span className="sx-connector-packet" style={{ animationDelay: "0.9s" }} />
              <span className="sx-connector-packet" style={{ animationDelay: "1.8s" }} />
              <span className="sx-connector-arrow">
                <ArrowRight className="size-3.5" strokeWidth={2} />
              </span>
            </div>

            <ul className="sx-connector-payload">
              {payload.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>

            {label ? <span className="sr-only">{label}</span> : null}
          </div>

          <article className="sx-connector-node sx-connector-node-target">
            <span className="sx-connector-node-icon" aria-hidden>
              <ToIcon className="size-4" strokeWidth={1.75} />
            </span>
            <div className="sx-connector-node-copy">
              <span className="sx-connector-node-kicker">Destination</span>
              <strong>{to.label}</strong>
              <p>{to.detail}</p>
            </div>
          </article>
        </div>
      </div>
    </div>
  );
}
