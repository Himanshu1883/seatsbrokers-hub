import { CreditCard, Eye, Lock, Shield, Wallet, Workflow } from "lucide-react";
import { modules } from "@/content/modules";

const features = [
  {
    icon: Wallet,
    title: "Centralized balance",
    body: "Available balances and pending settlements across every account.",
    tag: "Unified",
  },
  {
    icon: CreditCard,
    title: "Card management",
    body: "Issue and manage cards linked to your business accounts.",
    tag: "Integrated",
  },
  {
    icon: Eye,
    title: "Transaction visibility",
    body: "Full activity history filtered by date, status and type.",
    tag: "Real-time",
  },
  {
    icon: Workflow,
    title: "Settlement workflows",
    body: "Marketplace payouts and inventory settlements in one place.",
    tag: "Automated",
  },
] as const;

export function PaymentCopyPanel() {
  return (
    <div className="pay-copy">
      <div className="pay-copy-badge">
        <Shield className="size-3.5" strokeWidth={1.75} />
        <span>{modules.funds.name}</span>
      </div>

      <h2 className="pay-copy-title">{modules.funds.tagline}</h2>
      <p className="pay-copy-lead">
        End-to-end payment infrastructure for ticket businesses — from purchasing to settlement.
      </p>

      <ul className="pay-copy-features">
        {features.map((feature) => {
          const Icon = feature.icon;
          return (
            <li key={feature.title} className="pay-copy-feature">
              <span className="pay-copy-feature-icon" aria-hidden>
                <Icon className="size-3.5" strokeWidth={1.75} />
              </span>
              <div className="pay-copy-feature-copy">
                <div className="pay-copy-feature-head">
                  <strong>{feature.title}</strong>
                  <span className="pay-copy-feature-tag">{feature.tag}</span>
                </div>
                <p>{feature.body}</p>
              </div>
            </li>
          );
        })}
      </ul>

      <div className="pay-copy-security">
        <span className="pay-copy-security-wave" aria-hidden />
        <div className="pay-copy-security-icon" aria-hidden>
          <Lock className="size-3.5" strokeWidth={1.75} />
        </div>
        <div>
          <strong>Enterprise-grade security</strong>
          <p>Bank-level encryption and full audit trails on every transaction.</p>
        </div>
      </div>
    </div>
  );
}
