import { useId, useState } from "react";
import { ChevronDown } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export type ConsoleCopyPoint = {
  title: string;
  body: string;
};

export type ConsoleCopyHighlight = {
  value: string;
  label: string;
};

export type ConsoleCopyMeta = {
  eyebrow: string;
  title: string;
  body: string;
  detail?: string;
  detailLabel?: string;
  highlights?: ConsoleCopyHighlight[];
  points: ConsoleCopyPoint[];
  defaultOpenPoint?: string;
};

type ConsoleCopyPanelProps = {
  meta: ConsoleCopyMeta;
  isDark: boolean;
};

export function ConsoleCopyPanel({ meta, isDark }: ConsoleCopyPanelProps) {
  const detailId = useId();
  const [detailOpen, setDetailOpen] = useState(false);
  const defaultPoint = meta.defaultOpenPoint ?? "point-0";

  return (
    <div className={`lc-copy ${isDark ? "lc-copy-dark" : ""}`}>
      <p className="section-eyebrow text-primary">{meta.eyebrow}</p>
      <h2 className="lc-copy-title">{meta.title}</h2>
      <p className="lc-copy-body">{meta.body}</p>

      {meta.detail ? (
        <div className="lc-copy-detail-block">
          <button
            type="button"
            className="lc-copy-detail-toggle"
            aria-expanded={detailOpen}
            aria-controls={detailId}
            onClick={() => setDetailOpen((open) => !open)}
          >
            <span>{detailOpen ? "Show less" : meta.detailLabel ?? "Learn how it works"}</span>
            <ChevronDown className={`size-4 shrink-0 ${detailOpen ? "rotate-180" : ""}`} />
          </button>
          <div
            id={detailId}
            className="lc-copy-detail-panel"
            data-open={detailOpen ? "true" : "false"}
          >
            <div className="lc-copy-detail-panel-inner">
              <p className="lc-copy-detail">{meta.detail}</p>
            </div>
          </div>
        </div>
      ) : null}

      {meta.highlights?.length ? (
        <dl className="lc-copy-highlights">
          {meta.highlights.map((item) => (
            <div key={item.label} className="lc-copy-highlight">
              <dt className="sr-only">{item.label}</dt>
              <dd className="lc-copy-highlight-value">{item.value}</dd>
              <dd className="lc-copy-highlight-label">{item.label}</dd>
            </div>
          ))}
        </dl>
      ) : null}

      <div className="lc-copy-accordion-wrap">
        <p className="lc-copy-accordion-label">What's included</p>
        <Accordion
          type="single"
          collapsible
          defaultValue={defaultPoint}
          className="lc-copy-accordion"
        >
          {meta.points.map((point, index) => (
            <AccordionItem
              key={point.title}
              value={`point-${index}`}
              className="lc-copy-accordion-item"
            >
              <AccordionTrigger className="lc-copy-accordion-trigger">
                <span className="lc-copy-accordion-index">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <span className="lc-copy-accordion-title">{point.title}</span>
              </AccordionTrigger>
              <AccordionContent className="lc-copy-accordion-content">
                <p className="lc-copy-accordion-body">{point.body}</p>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </div>
  );
}
