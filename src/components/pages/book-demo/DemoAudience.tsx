import { ArrowUpRight } from "lucide-react";
import { Reveal } from "@/hooks/use-scroll-motion";
import { SiteLink } from "@/components/layout/SiteLink";
import { demoAlsoFor, demoAudiences } from "@/content/book-demo-data";

export function DemoAudience() {
  return (
    <section className="section-curve relative isolate bg-surface py-20 sm:py-24">
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-border to-transparent"
        aria-hidden
      />
      <div className="container-page relative z-10">
        <Reveal>
          <p className="section-eyebrow text-primary">Who it is for</p>
          <h2 className="mt-4 max-w-3xl text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Two tracks. One walkthrough, scoped to you.
          </h2>
          <p className="mt-4 max-w-2xl text-sm leading-relaxed text-muted-foreground sm:text-base">
            Tell us whether you list inventory or package events for customers — the session follows
            that desk, not a generic tour of every console.
          </p>
        </Reveal>

        <Reveal delay={80}>
          <ul className="bdm-who">
            {demoAudiences.map((audience) => (
              <li key={audience.id}>
                <article className="bdm-who-card" data-track={audience.id}>
                  <p className="bdm-who-kicker">{audience.kicker}</p>
                  <h3>{audience.title}</h3>
                  <p>{audience.body}</p>
                  <ul>
                    {audience.points.map((point) => (
                      <li key={point}>{point}</li>
                    ))}
                  </ul>
                  <SiteLink to={audience.href} className="bdm-who-cta">
                    {audience.cta}
                    <ArrowUpRight className="size-3.5" strokeWidth={2} />
                  </SiteLink>
                </article>
              </li>
            ))}
          </ul>
        </Reveal>

        <Reveal delay={120}>
          <p className="bdm-who-also">
            Also for{" "}
            {demoAlsoFor.map((item, index) => (
              <span key={item.href}>
                <SiteLink to={item.href}>{item.label}</SiteLink>
                {index < demoAlsoFor.length - 1 ? " · " : ""}
              </span>
            ))}
            .
          </p>
        </Reveal>
      </div>
    </section>
  );
}
