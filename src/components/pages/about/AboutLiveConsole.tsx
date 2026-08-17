import type { CSSProperties } from "react";
import { Globe2 } from "lucide-react";
import { Reveal } from "@/hooks/use-scroll-motion";
import { ConsoleCopyPanel } from "@/components/pages/brokers/ConsoleCopyPanel";
import { aboutOpsCopy } from "@/content/about-page-data";
import { AboutOpsConsole } from "./AboutOpsConsole";

const tiltStyle = {
  ["--lc-tilt-y" as string]: "-10deg",
  ["--lc-tilt-x" as string]: "3deg",
} as CSSProperties;

export function AboutLiveConsole() {
  return (
    <section className="section-curve relative isolate scroll-mt-24 bg-surface py-20 sm:py-24">
      <div className="container-page relative z-10">
        <div className="lc-section">
          <Reveal className="lc-section-copy min-w-0">
            <ConsoleCopyPanel meta={aboutOpsCopy} isDark={false} />
          </Reveal>

          <Reveal delay={120} className="lc-section-stage min-w-0">
            <div className="lc-tilt-wrap" style={tiltStyle}>
              <div className="lc-tilt-card">
                <AboutOpsConsole />
                <span className="lc-tilt-badge" aria-hidden>
                  <Globe2 className="size-4" />
                </span>
                <span className="lc-tilt-shadow" aria-hidden />
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
