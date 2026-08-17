import { Scale } from "lucide-react";
import { Reveal } from "@/hooks/use-scroll-motion";
import { legalHeroCopy, legalUpdated } from "@/content/legal-data";

export function LegalHero() {
  return (
    <section className="bh-hero legal-hero section-curve relative isolate scroll-mt-24 overflow-hidden bg-dark text-background">
      <div
        className="pointer-events-none absolute inset-0 bg-linear-to-br from-dark via-dark to-primary-deep/40"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute -right-24 top-1/4 h-96 w-96 rounded-full bg-primary/10 blur-3xl"
        aria-hidden
      />

      <div className="legal-shell relative z-10">
        <Reveal className="legal-hero-copy min-w-0">
          <span className="bh-copy-icon" aria-hidden>
            <Scale className="size-4" strokeWidth={1.75} />
          </span>
          <p className="section-eyebrow text-primary">{legalHeroCopy.eyebrow}</p>
          <h1 className="bh-title legal-hero-title">
            {legalHeroCopy.titleLead}{" "}
            <em className="legal-hero-em">{legalHeroCopy.titleAccent}</em>
          </h1>
          <p className="bh-body legal-hero-intro">{legalHeroCopy.intro}</p>
          <p className="legal-hero-updated">Updated {legalUpdated}</p>
        </Reveal>
      </div>
    </section>
  );
}
