import { Mail } from "lucide-react";
import { Reveal } from "@/hooks/use-scroll-motion";
import { brand } from "@/content/site";
import { faqHelpCopy } from "@/content/faq-data";

export function FaqHelpStrip() {
  return (
    <section className="faq-help section-curve">
      <div className="container-page">
        <div className="faq-help-grid">
          <Reveal>
            <p className="section-eyebrow text-primary">{faqHelpCopy.eyebrow}</p>
            <h2 className="faq-help-title">{faqHelpCopy.title}</h2>
            <p className="faq-help-body">{faqHelpCopy.body}</p>
          </Reveal>

          <Reveal delay={80}>
            <ul className="faq-help-cards">
              <li>
                <a className="faq-help-card" href={`mailto:${brand.salesEmail}`}>
                  <span className="faq-help-icon" aria-hidden>
                    <Mail className="size-4" />
                  </span>
                  <span className="faq-help-card-label">{faqHelpCopy.salesLabel}</span>
                  <span className="faq-help-card-mail">{brand.salesEmail}</span>
                </a>
              </li>
              <li>
                <a className="faq-help-card" href={`mailto:${brand.email}`}>
                  <span className="faq-help-icon" aria-hidden>
                    <Mail className="size-4" />
                  </span>
                  <span className="faq-help-card-label">{faqHelpCopy.partnersLabel}</span>
                  <span className="faq-help-card-mail">{brand.email}</span>
                </a>
              </li>
            </ul>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
