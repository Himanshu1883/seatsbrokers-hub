import type { CSSProperties } from "react";
import { CreditCard } from "lucide-react";
import { Reveal } from "@/hooks/use-scroll-motion";
import { PaymentConsole } from "./PaymentConsole";
import { PaymentCopyPanel } from "./PaymentCopyPanel";

const tiltStyle = {
  ["--lc-tilt-y" as string]: "-14deg",
  ["--lc-tilt-x" as string]: "5deg",
} as CSSProperties;

export function PaymentInfrastructureSection() {
  return (
    <section className="pay-infra-section section-curve relative isolate scroll-mt-24 overflow-hidden bg-background">
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-border to-transparent"
        aria-hidden
      />
      <div className="pay-infra-backdrop" aria-hidden>
        <span className="pay-infra-backdrop-grid" />
        <span className="pay-infra-backdrop-glow" />
      </div>

      <div className="container-page relative z-10">
        <div className="pay-infra-layout">
          <Reveal className="pay-infra-copy">
            <PaymentCopyPanel />
          </Reveal>

          <Reveal delay={120} className="pay-infra-dashboard lc-section-stage">
            <div className="lc-tilt-wrap pay-infra-stage" style={tiltStyle}>
              <div className="lc-tilt-card">
                <PaymentConsole />
                <span className="lc-tilt-badge" aria-hidden>
                  <CreditCard className="size-4" strokeWidth={1.75} />
                </span>
                <span className="lc-tilt-shadow" aria-hidden />
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
