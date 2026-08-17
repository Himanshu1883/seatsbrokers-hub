import { CircleHelp } from "lucide-react";
import { Reveal } from "@/hooks/use-scroll-motion";
import { faqHeroCopy, faqTopics } from "@/content/faq-data";

type FaqHeroProps = {
  activeId?: string;
  onSelectTopic: (id: string) => void;
};

export function FaqHero({ activeId, onSelectTopic }: FaqHeroProps) {
  return (
    <section className="bh-hero faq-hero section-curve relative isolate scroll-mt-24 overflow-hidden bg-dark text-background">
      <div
        className="pointer-events-none absolute inset-0 bg-linear-to-br from-dark via-dark to-primary-deep/40"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute -right-24 top-1/4 h-96 w-96 rounded-full bg-primary/10 blur-3xl"
        aria-hidden
      />

      <div className="container-page relative z-10">
        <div className="bh-layout">
          <Reveal className="bh-copy min-w-0">
            <span className="bh-copy-icon" aria-hidden>
              <CircleHelp className="size-4" strokeWidth={1.75} />
            </span>
            <p className="section-eyebrow text-primary">{faqHeroCopy.eyebrow}</p>
            <h1 className="bh-title faq-hero-title">
              {faqHeroCopy.titleLead}{" "}
              <em className="faq-hero-em">{faqHeroCopy.titleAccent}</em>
            </h1>
            <p className="bh-body">{faqHeroCopy.intro}</p>
          </Reveal>

          <Reveal delay={120} className="bh-stage min-w-0">
            <nav className="faq-index" aria-label="Question topics">
              <p className="faq-index-kicker">
                <span>06</span> topics
              </p>
              <ul className="faq-index-list">
                {faqTopics.map((topic, index) => (
                  <li key={topic.id}>
                    <button
                      type="button"
                      className="faq-index-btn"
                      data-active={activeId === topic.id}
                      onClick={() => onSelectTopic(topic.id)}
                    >
                      <span className="faq-index-num">
                        {String(index + 1).padStart(2, "0")}
                      </span>
                      <span className="faq-index-label">{topic.label}</span>
                    </button>
                  </li>
                ))}
              </ul>
            </nav>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
