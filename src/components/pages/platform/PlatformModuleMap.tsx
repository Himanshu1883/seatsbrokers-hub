import { useEffect, useRef, useState } from "react";
import { ArrowRight } from "lucide-react";
import { Reveal } from "@/hooks/use-scroll-motion";
import { SiteLink } from "@/components/layout/SiteLink";
import { platformFlowCopy, platformModules } from "@/content/platform-page-data";
import { PlatformStageDesk } from "./PlatformDesks";

/** Fractional index of the step card nearest the middle of the viewport.
 *  Measured from the cards themselves, so the step count is not baked in. */
function useActiveStep(columnRef: React.RefObject<HTMLDivElement | null>, stepCount: number) {
  const [progress, setProgress] = useState(0);
  const targetRef = useRef(0);
  const currentRef = useRef(0);
  const frameRef = useRef(0);

  useEffect(() => {
    const column = columnRef.current;
    if (!column || stepCount < 2) return;

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const measure = () => {
      const cards = Array.from(column.children) as HTMLElement[];
      if (cards.length < 2) return;
      const focus = window.innerHeight * 0.5;
      const centers = cards.map((card) => {
        const rect = card.getBoundingClientRect();
        return rect.top + rect.height / 2;
      });

      const first = centers[0] ?? 0;
      const last = centers[centers.length - 1] ?? 0;

      let index = 0;
      if (focus >= last) {
        index = centers.length - 1;
      } else if (focus > first) {
        for (let i = 0; i < centers.length - 1; i += 1) {
          const from = centers[i];
          const to = centers[i + 1];
          if (from === undefined || to === undefined) continue;
          if (focus >= from && focus <= to) {
            index = i + (focus - from) / Math.max(to - from, 1);
            break;
          }
        }
      }
      targetRef.current = index;
    };

    const animate = () => {
      const target = targetRef.current;
      const next = reducedMotion
        ? target
        : currentRef.current + (target - currentRef.current) * 0.16;
      const settled = Math.abs(target - next) < 0.002;
      currentRef.current = settled ? target : next;
      setProgress(currentRef.current);
      if (!settled && !reducedMotion) {
        frameRef.current = requestAnimationFrame(animate);
      }
    };

    const onScroll = () => {
      measure();
      cancelAnimationFrame(frameRef.current);
      frameRef.current = requestAnimationFrame(animate);
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      cancelAnimationFrame(frameRef.current);
    };
  }, [stepCount, columnRef]);

  return progress;
}

export function PlatformModuleMap() {
  const stepsColumnRef = useRef<HTMLDivElement>(null);
  const scrollProgress = useActiveStep(stepsColumnRef, platformModules.length);
  const active = Math.min(Math.max(Math.round(scrollProgress), 0), platformModules.length - 1);
  const preview = platformModules[active] ?? platformModules[0];

  return (
    <section
      id="operating-stack"
      className="plt-flow section-curve-sticky relative isolate scroll-mt-24 bg-surface py-14 sm:py-20 lg:py-24"
      aria-labelledby="plt-flow-title"
    >
      <div className="container-page relative z-10">
        <Reveal>
          <div className="plt-flow-head">
            <div className="plt-flow-head-copy">
              <p className="section-eyebrow text-primary">{platformFlowCopy.eyebrow}</p>
              <h2 id="plt-flow-title">{platformFlowCopy.title}</h2>
            </div>
            <p className="plt-flow-support">{platformFlowCopy.intro}</p>
          </div>
        </Reveal>

        <div className="plt-flow-grid mt-8 grid min-w-0 sm:mt-10 lg:mt-12 lg:grid-cols-2 lg:gap-10 xl:gap-16">
          <div ref={stepsColumnRef} className="plt-flow-steps min-w-0 lg:py-4">
            {platformModules.map((module, index) => {
              const isActive = active === index;
              const next = platformModules[index + 1];
              return (
                <article
                  key={module.id}
                  className="plt-flow-step flex min-h-0 w-full min-w-0 flex-col justify-center py-6 sm:py-8 lg:py-6"
                  data-active={isActive ? "true" : "false"}
                >
                  <div className="plt-flow-mobile-desk mb-5 w-full min-w-0 lg:hidden">
                    <PlatformStageDesk id={module.id} />
                  </div>

                  <div className="plt-flow-card w-full min-w-0">
                    <div className="plt-flow-card-meta">
                      <span className="plt-flow-index">{module.index}</span>
                      <span className="plt-flow-pill">{module.title}</span>
                    </div>
                    <h3>{module.layer}</h3>
                    <p className="plt-flow-tagline">{module.tagline}</p>
                    <p className="plt-flow-role">{module.body}</p>
                    <p className="plt-flow-io">
                      <span>
                        In <strong>{module.receives}</strong>
                      </span>
                      {next ? (
                        <span>
                          Next <strong>{next.layer}</strong>
                        </span>
                      ) : (
                        <span>
                          Out <strong>{module.writes}</strong>
                        </span>
                      )}
                    </p>
                    <div className="page-cta-row plt-flow-cta">
                      <SiteLink
                        to={module.href}
                        className="lift inline-flex min-h-11 items-center justify-center gap-2 rounded-md border border-primary/25 bg-primary/[0.06] px-4 text-sm font-semibold text-primary"
                      >
                        {module.cta}
                        <ArrowRight className="size-4 shrink-0" aria-hidden />
                      </SiteLink>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>

          <div className="plt-flow-sticky relative hidden min-w-0 lg:block lg:self-stretch">
            <div className="plt-flow-pane sticky top-24 flex w-full min-w-0 flex-col justify-center py-8">
              <p className="section-eyebrow mb-2 text-center text-primary">
                Stage {preview.index} · {preview.layer}
              </p>
              <p className="plt-flow-caption mb-4 text-center">{preview.title}</p>
              <div className="plt-flow-desks min-h-0 w-full">
                {platformModules.map((module) => (
                  <div
                    key={module.id}
                    className="plt-flow-desk w-full min-w-0"
                    data-active={module.id === preview.id ? "true" : "false"}
                    aria-hidden={module.id === preview.id ? undefined : true}
                  >
                    <PlatformStageDesk id={module.id} />
                  </div>
                ))}
              </div>
              <div className="plt-flow-dots mt-5" aria-hidden>
                {platformModules.map((module, index) => (
                  <span key={module.id} data-active={index === active ? "true" : "false"} />
                ))}
              </div>
            </div>
          </div>
        </div>

        <p className="plt-flow-close">{platformFlowCopy.close}</p>
      </div>
    </section>
  );
}
