import { Reveal } from "@/hooks/use-scroll-motion";
import { brand } from "@/content/site";
import { aboutOffices, aboutPresenceCopy } from "@/content/about-page-data";

export function AboutPresence() {
  return (
    <section className="section-curve relative isolate overflow-hidden bg-dark py-20 text-background sm:py-24">
      <div
        className="pointer-events-none absolute inset-0 bg-linear-to-br from-dark via-dark to-primary-deep/35"
        aria-hidden
      />
      <div className="container-page relative z-10">
        <div className="abt-presence">
          <Reveal>
            <p className="section-eyebrow text-primary">{aboutPresenceCopy.eyebrow}</p>
            <h2 className="mt-4 max-w-xl text-3xl font-bold tracking-tight sm:text-4xl">
              {aboutPresenceCopy.title}
            </h2>
            <p className="mt-4 max-w-lg text-sm leading-relaxed text-background/70 sm:text-base">
              {aboutPresenceCopy.body}
            </p>
            <p className="abt-presence-mail">
              <span>Partners</span>
              <a href={`mailto:${brand.email}`}>{brand.email}</a>
            </p>
          </Reveal>

          <Reveal delay={100}>
            <ul className="abt-offices">
              {aboutOffices.map((office, index) => (
                <li key={office.code}>
                  <span className="abt-office-index">0{index + 1}</span>
                  <strong>{office.city}</strong>
                  <em>{office.region}</em>
                  <span className="abt-office-code">{office.code}</span>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
