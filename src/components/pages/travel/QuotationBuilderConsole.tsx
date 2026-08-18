import { useEffect, useRef, useState } from "react";
import {
  Check,
  FileText,
  Mail,
  MessageCircle,
  Minus,
  Plus,
  Send,
} from "lucide-react";
import { useInView } from "@/hooks/use-scroll-motion";

const TICKET_COST = 500;
const DEFAULT_MARGIN = 10;

const pipelineStages = [
  { label: "Event", detail: "UCL Final" },
  { label: "Tickets", detail: "Cat A × 2" },
  { label: "Margin", detail: "Partner markup" },
  { label: "Quote", detail: "PDF generated" },
  { label: "Share", detail: "Customer sent" },
] as const;

const ticketLines = [
  { section: "Category A · Longside lower", qty: 2, unit: 250 },
] as const;

const recentQuotes = [
  { id: "QT-1842", customer: "Atlas Journeys", event: "UCL Final", status: "accepted" as const, value: "£550" },
  { id: "QT-1841", customer: "Northstar Partners", event: "Arsenal vs Chelsea", status: "viewed" as const, value: "£720" },
  { id: "QT-1840", customer: "Helix Tours", event: "Monaco GP", status: "sent" as const, value: "£1,240" },
  { id: "QT-1839", customer: "Vista Groups", event: "Oasis · Wembley", status: "accepted" as const, value: "£380" },
  { id: "QT-1838", customer: "Meridian Partners", event: "Six Nations", status: "sent" as const, value: "£540" },
] as const;

const shareChannels = [
  { id: "pdf", label: "PDF", icon: FileText },
  { id: "whatsapp", label: "WhatsApp", icon: MessageCircle },
  { id: "email", label: "Email", icon: Mail },
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

function formatGbp(value: number) {
  return `£${value.toLocaleString("en-GB")}`;
}

export function QuotationBuilderConsole() {
  const rootRef = useRef<HTMLDivElement>(null);
  const { ref: inViewRef, inView } = useInView<HTMLDivElement>(0.25);
  const setRef = (node: HTMLDivElement | null) => {
    rootRef.current = node;
    inViewRef.current = node;
  };

  const [margin, setMargin] = useState(DEFAULT_MARGIN);
  const activeStage = useCycle(pipelineStages.length, 2400, inView);
  const activeShare = useCycle(shareChannels.length, 1800, inView && activeStage >= 4);
  const quoteHighlight = useCycle(recentQuotes.length, 2800, inView);

  const customerPrice = Math.round(TICKET_COST * (1 + margin / 100));
  const marginValue = customerPrice - TICKET_COST;
  const sharing = activeStage >= 4;

  return (
    <div ref={setRef} className="qb-console" data-live={inView ? "true" : "false"}>
      <div className="qb-shell">
        <header className="qb-shell-head">
          <span className="qb-mark" aria-hidden>
            <Send className="size-4" strokeWidth={1.75} />
          </span>
          <div className="qb-shell-copy">
            <strong>Quotation builder</strong>
            <span>Champions League Final · Category A · Wembley</span>
          </div>
          <span className="qb-quote-id">QT-1842</span>
          <span className="qb-status" data-sharing={sharing ? "true" : "false"}>
            <i aria-hidden />
            {sharing ? "SHARED" : "DRAFT"}
          </span>
        </header>

        <ol className="qb-stepper">
          {pipelineStages.map((stage, index) => {
            const done = index < activeStage;
            const current = index === activeStage;
            return (
              <li
                key={stage.label}
                className="qb-step"
                data-done={done ? "true" : "false"}
                data-current={current ? "true" : "false"}
              >
                <span className="qb-step-rail" aria-hidden />
                <span className="qb-step-node" aria-hidden>
                  {done ? <Check className="size-3" strokeWidth={3} /> : <i />}
                </span>
                <span className="qb-step-label">{stage.label}</span>
                <span className="qb-step-detail">{stage.detail}</span>
              </li>
            );
          })}
        </ol>

        <div className="qb-hero">
          <section className="qb-build">
            <header className="qb-panel-head">
              <span>Ticket package</span>
              <span className="qb-panel-note">Partner cost</span>
            </header>

            <ul className="qb-lines">
              {ticketLines.map((line) => (
                <li key={line.section} className="qb-line">
                  <div>
                    <strong>{line.section}</strong>
                    <span>
                      {line.qty} tickets · {formatGbp(line.unit)} each
                    </span>
                  </div>
                  <em className="qb-mono">{formatGbp(line.qty * line.unit)}</em>
                </li>
              ))}
            </ul>

            <div className="qb-margin">
              <div className="qb-margin-head">
                <span className="qb-label">Partner margin</span>
                <strong className="qb-mono">{margin}%</strong>
              </div>
              <div className="qb-slider-row">
                <button
                  type="button"
                  className="qb-stepper-btn"
                  aria-label="Decrease margin"
                  onClick={() => setMargin((value) => Math.max(0, value - 1))}
                >
                  <Minus className="size-3.5" strokeWidth={2} />
                </button>
                <input
                  type="range"
                  min={0}
                  max={30}
                  step={1}
                  value={margin}
                  aria-label="Partner margin percent"
                  onChange={(event) => setMargin(Number(event.target.value))}
                />
                <button
                  type="button"
                  className="qb-stepper-btn"
                  aria-label="Increase margin"
                  onClick={() => setMargin((value) => Math.min(30, value + 1))}
                >
                  <Plus className="size-3.5" strokeWidth={2} />
                </button>
              </div>
              <dl className="qb-math">
                <div>
                  <dt>Ticket price</dt>
                  <dd className="qb-mono">{formatGbp(TICKET_COST)}</dd>
                </div>
                <div>
                  <dt>Your margin</dt>
                  <dd className="qb-mono qb-math-margin">+{formatGbp(marginValue)}</dd>
                </div>
                <div>
                  <dt>Customer price</dt>
                  <dd className="qb-mono">{formatGbp(customerPrice)}</dd>
                </div>
              </dl>
            </div>
          </section>

          <section className="qb-preview">
            <header className="qb-panel-head">
              <FileText className="size-3.5" strokeWidth={1.75} />
              <span>Customer quote</span>
              <span className="qb-panel-note">Branded PDF</span>
            </header>

            <article className="qb-sheet">
              <div className="qb-sheet-brand">
                <span>ATLAS JOURNEYS</span>
                <span>Quote QT-1842</span>
              </div>
              <h3>Champions League Final</h3>
              <p>31 May 2026 · Wembley Stadium · London</p>
              <ul>
                <li>
                  <span>Cat A · Longside lower × 2</span>
                  <span className="qb-mono">{formatGbp(TICKET_COST)}</span>
                </li>
                <li>
                  <span>Service &amp; arrangement</span>
                  <span className="qb-mono">{formatGbp(marginValue)}</span>
                </li>
              </ul>
              <div className="qb-sheet-total">
                <span>Total due</span>
                <strong className="qb-mono">{formatGbp(customerPrice)}</strong>
              </div>
            </article>

            <div className="qb-share" data-active={sharing ? "true" : "false"}>
              {shareChannels.map((channel, index) => {
                const Icon = channel.icon;
                return (
                  <span
                    key={channel.id}
                    className="qb-share-btn"
                    data-active={sharing && activeShare === index ? "true" : "false"}
                  >
                    <Icon className="size-3.5" strokeWidth={1.75} />
                    {channel.label}
                  </span>
                );
              })}
            </div>
          </section>
        </div>

        <div className="qb-foot">
          <dl className="qb-stats">
            <div>
              <dt>Quotes sent today</dt>
              <dd className="qb-mono">18</dd>
            </div>
            <div>
              <dt>Acceptance rate</dt>
              <dd className="qb-mono">64%</dd>
            </div>
            <div>
              <dt>Avg quote value</dt>
              <dd className="qb-mono">£612</dd>
            </div>
          </dl>

          <section className="qb-recent">
            <header className="qb-panel-head">
              <span className="qb-panel-dot" aria-hidden />
              <span>Recent quotes</span>
            </header>
            <ul className="qb-recent-list">
              {recentQuotes.map((quote, index) => (
                <li
                  key={quote.id}
                  className="qb-recent-row"
                  data-active={quoteHighlight === index ? "true" : "false"}
                  data-status={quote.status}
                >
                  <span className="qb-mono">{quote.id}</span>
                  <span className="qb-recent-customer">{quote.customer}</span>
                  <span className="qb-recent-event">{quote.event}</span>
                  <span className="qb-recent-status">{quote.status}</span>
                  <strong className="qb-mono">{quote.value}</strong>
                </li>
              ))}
            </ul>
          </section>
        </div>
      </div>
    </div>
  );
}
