import { Reveal } from "@/hooks/use-scroll-motion";
import {
  aboutCapabilities,
  aboutCapabilitiesCopy,
  aboutPrinciples,
  aboutPrinciplesCopy,
  aboutStack,
  aboutStackCopy,
} from "@/content/about-page-data";

type AboutBoardItem = {
  index: string;
  title: string;
  body: string;
  systems: readonly string[];
  contract: string;
};

type AboutBoardCopy = {
  eyebrow: string;
  title: string;
  intro: string;
  contractKicker: string;
  contract: string;
};

type AboutBoardProps = {
  copy: AboutBoardCopy;
  items: readonly AboutBoardItem[];
  tone?: "background" | "surface";
};

function AboutBoard({ copy, items, tone = "background" }: AboutBoardProps) {
  const bg = tone === "surface" ? "bg-surface" : "bg-background";

  return (
    <section className={`section-curve relative isolate ${bg} py-20 sm:py-24`}>
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-border to-transparent"
        aria-hidden
      />
      <div className="container-page relative z-10">
        <Reveal className="mx-auto max-w-3xl text-center">
          <p className="section-eyebrow text-primary">{copy.eyebrow}</p>
          <h2 className="mt-4 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            {copy.title}
          </h2>
          <p className="mt-4 text-sm leading-relaxed text-muted-foreground sm:text-base">
            {copy.intro}
          </p>
        </Reveal>

        <Reveal delay={80}>
          <div className="abt-principles-board">
            <ol className="abt-principles">
              {items.map((item) => (
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
              <p className="abt-principles-spine-kicker">{copy.contractKicker}</p>
              <p>{copy.contract}</p>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

export function AboutCapabilities() {
  return <AboutBoard copy={aboutCapabilitiesCopy} items={aboutCapabilities} />;
}

export function AboutPrinciples() {
  return <AboutBoard copy={aboutPrinciplesCopy} items={aboutPrinciples} tone="surface" />;
}

export function AboutStack() {
  return <AboutBoard copy={aboutStackCopy} items={aboutStack} />;
}
