import { Reveal } from "@/hooks/use-scroll-motion";
import { aboutPrinciples, aboutPrinciplesCopy } from "@/content/about-page-data";

export function AboutPrinciples() {
  return (
    <section className="section-curve relative isolate bg-background py-20 sm:py-24">
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-border to-transparent"
        aria-hidden
      />
      <div className="container-page relative z-10">
        <Reveal className="mx-auto max-w-3xl text-center">
          <p className="section-eyebrow text-primary">{aboutPrinciplesCopy.eyebrow}</p>
          <h2 className="mt-4 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            {aboutPrinciplesCopy.title}
          </h2>
          <p className="mt-4 text-sm leading-relaxed text-muted-foreground sm:text-base">
            {aboutPrinciplesCopy.intro}
          </p>
        </Reveal>

        <Reveal delay={80}>
          <div className="abt-principles-board">
            <ol className="abt-principles">
              {aboutPrinciples.map((item) => (
                <li key={item.index}>
                  <span>{item.index}</span>
                  <h3>{item.title}</h3>
                  <p>{item.body}</p>
                  <ul className="abt-chips">
                    {item.systems.map((system) => (
                      <li key={system}>{system}</li>
                    ))}
                  </ul>
                  <p className="abt-principle-contract">{item.contract}</p>
                </li>
              ))}
            </ol>
            <div className="abt-principles-spine">
              <p className="abt-principles-spine-kicker">{aboutPrinciplesCopy.contractKicker}</p>
              <p>{aboutPrinciplesCopy.contract}</p>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
