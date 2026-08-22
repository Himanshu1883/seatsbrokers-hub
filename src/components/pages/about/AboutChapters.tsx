import { Reveal } from "@/hooks/use-scroll-motion";
import { SiteLink } from "@/components/layout/SiteLink";
import {
  aboutAudiences,
  aboutAudiencesCopy,
  aboutBuildingCopy,
  aboutBuildingVerbs,
  aboutDataSignals,
  aboutFormulaParts,
  aboutFormulaResult,
  aboutFutureCopy,
  aboutKnowledgeCopy,
  aboutMissionCopy,
  aboutTransforms,
  aboutVisionCopy,
} from "@/content/about-page-data";

export function AboutKnowledge() {
  return (
    <section className="section-curve relative isolate bg-background py-20 sm:py-24">
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-border to-transparent"
        aria-hidden
      />
      <div className="container-page relative z-10">
        <Reveal>
          <p className="section-eyebrow text-primary">{aboutKnowledgeCopy.eyebrow}</p>
          <h2 className="mt-4 max-w-3xl text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            {aboutKnowledgeCopy.title}
          </h2>
          <p className="mt-4 max-w-2xl text-sm leading-relaxed text-muted-foreground sm:text-base">
            {aboutKnowledgeCopy.intro}
          </p>
          <p className="mt-4 max-w-2xl text-sm leading-relaxed text-foreground sm:text-base">
            {aboutKnowledgeCopy.experience}
          </p>
        </Reveal>

        <Reveal delay={80}>
          <p className="abt-band-kicker">{aboutKnowledgeCopy.formulaKicker}</p>
          <ol className="abt-formula" aria-label={`${aboutFormulaParts.join(" plus ")} equals ${aboutFormulaResult}`}>
            {aboutFormulaParts.map((part, index) => (
              <li key={part}>
                <strong>{part}</strong>
                <span aria-hidden>{index < aboutFormulaParts.length - 1 ? "+" : "="}</span>
              </li>
            ))}
            <li className="abt-formula-result">
              <strong>{aboutFormulaResult}</strong>
            </li>
          </ol>
        </Reveal>

        <Reveal delay={120}>
          <p className="abt-band-kicker">{aboutKnowledgeCopy.signalsKicker}</p>
          <ul className="abt-signals">
            {aboutDataSignals.map((signal) => (
              <li key={signal}>{signal}</li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}

export function AboutVision() {
  return (
    <section className="section-curve relative isolate bg-surface py-20 sm:py-24">
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-border to-transparent"
        aria-hidden
      />
      <div className="container-page relative z-10">
        <Reveal className="mx-auto max-w-3xl text-center">
          <p className="section-eyebrow text-primary">{aboutVisionCopy.eyebrow}</p>
          <h2 className="mt-4 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            {aboutVisionCopy.title}
          </h2>
          <p className="mt-4 text-sm leading-relaxed text-muted-foreground sm:text-base">{aboutVisionCopy.intro}</p>
        </Reveal>
        <Reveal delay={80}>
          <ol className="abt-vision-lines">
            {aboutVisionCopy.lines.map((line) => (
              <li key={line}>{line}</li>
            ))}
          </ol>
          <p className="abt-band-close">{aboutVisionCopy.close}</p>
        </Reveal>
      </div>
    </section>
  );
}

export function AboutAudiences() {
  return (
    <section className="section-curve relative isolate bg-surface py-20 sm:py-24">
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-border to-transparent"
        aria-hidden
      />
      <div className="container-page relative z-10">
        <Reveal>
          <p className="section-eyebrow text-primary">{aboutAudiencesCopy.eyebrow}</p>
          <h2 className="mt-4 max-w-3xl text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            {aboutAudiencesCopy.title}
          </h2>
          <p className="mt-4 max-w-2xl text-sm leading-relaxed text-muted-foreground sm:text-base">
            {aboutAudiencesCopy.intro}
          </p>
        </Reveal>
        <Reveal delay={80}>
          <div className="abt-audiences">
            <ul>
              {aboutAudiences.map((audience) => (
                <li key={audience.title}>
                  <SiteLink to={audience.href} className="abt-audience">
                    <strong>{audience.title}</strong>
                    <p>{audience.body}</p>
                  </SiteLink>
                </li>
              ))}
            </ul>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

export function AboutBuilding() {
  return (
    <section className="section-curve relative isolate bg-surface py-20 sm:py-24">
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-border to-transparent"
        aria-hidden
      />
      <div className="container-page relative z-10">
        <Reveal>
          <p className="section-eyebrow text-primary">{aboutBuildingCopy.eyebrow}</p>
          <h2 className="mt-4 max-w-3xl text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            {aboutBuildingCopy.title}
          </h2>
          <p className="mt-4 max-w-2xl text-sm leading-relaxed text-muted-foreground sm:text-base">
            {aboutBuildingCopy.intro}
          </p>
        </Reveal>
        <Reveal delay={80}>
          <ul className="abt-verbs">
            {aboutBuildingVerbs.map((verb) => (
              <li key={verb.title}>
                <strong>{verb.title}</strong>
                <p>{verb.body}</p>
              </li>
            ))}
          </ul>
          <p className="abt-band-close">{aboutBuildingCopy.close}</p>
        </Reveal>
      </div>
    </section>
  );
}

export function AboutMission() {
  return (
    <section className="section-curve relative isolate bg-background py-20 sm:py-24">
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-border to-transparent"
        aria-hidden
      />
      <div className="container-page relative z-10">
        <Reveal className="mx-auto max-w-3xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            {aboutMissionCopy.title}
          </h2>
          <p className="mt-4 text-sm leading-relaxed text-muted-foreground sm:text-base">{aboutMissionCopy.intro}</p>
          <p className="abt-band-kicker abt-band-kicker-center">{aboutMissionCopy.lead}</p>
        </Reveal>
        <Reveal delay={80}>
          <ul className="abt-transforms">
            {aboutTransforms.map((item) => (
              <li key={item.from}>
                <span>{item.from}</span>
                <em aria-hidden>→</em>
                <strong>{item.to}</strong>
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}

export function AboutFuture() {
  return (
    <section className="section-curve relative isolate bg-surface py-20 sm:py-24">
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-border to-transparent"
        aria-hidden
      />
      <div className="container-page relative z-10">
        <Reveal className="mx-auto max-w-3xl text-center">
          <p className="section-eyebrow text-primary">{aboutFutureCopy.eyebrow}</p>
          <h2 className="mt-4 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            {aboutFutureCopy.title}
          </h2>
          <p className="mt-4 text-sm leading-relaxed text-muted-foreground sm:text-base">{aboutFutureCopy.intro}</p>
        </Reveal>
        <Reveal delay={80}>
          <ul className="abt-future-pairs">
            {aboutFutureCopy.pairs.map((pair) => (
              <li key={pair.from}>
                <p>{pair.from}</p>
                <strong>{pair.to}</strong>
              </li>
            ))}
          </ul>
          <p className="abt-band-close">{aboutFutureCopy.close}</p>
        </Reveal>
      </div>
    </section>
  );
}
