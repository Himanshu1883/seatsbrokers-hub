import { useEffect } from "react";
import { useRouterState } from "@tanstack/react-router";
import { Reveal } from "@/hooks/use-scroll-motion";
import { SiteLink } from "@/components/layout/SiteLink";
import { brand } from "@/content/site";
import {
  legalChapterFromHash,
  legalChapters,
  legalCompliance,
  legalCookies,
  legalPrivacy,
  legalTerms,
  type LegalBlock,
  type LegalChapterId,
} from "@/content/legal-data";

const chapters = [
  { meta: legalChapters[0], doc: legalPrivacy },
  { meta: legalChapters[1], doc: legalTerms },
  { meta: legalChapters[2], doc: legalCookies },
  { meta: legalChapters[3], doc: legalCompliance },
] as const;

function Blocks({ blocks }: { blocks: readonly LegalBlock[] }) {
  return (
    <div className="legal-blocks">
      {blocks.map((block) => (
        <section key={block.heading} className="legal-block">
          <h3 className="legal-subhead">{block.heading}</h3>
          {block.paragraphs.map((p, i) => (
            <p key={`${block.heading}-${i}`} className="legal-p">
              {p}
            </p>
          ))}
        </section>
      ))}
    </div>
  );
}

export function LegalDocument() {
  const hash = useRouterState({ select: (s) => s.location.hash });
  const activeId = legalChapterFromHash(hash);
  const active = chapters.find((chapter) => chapter.meta.id === activeId) ?? chapters[0];

  useEffect(() => {
    const id = hash.replace(/^#/, "") as LegalChapterId | "";
    if (!id || !legalChapters.some((chapter) => chapter.id === id)) return;

    const el = document.getElementById("legal-tabs") ?? document.getElementById(id);
    if (!el) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const timer = window.setTimeout(() => {
      el.scrollIntoView({ behavior: reduced ? "auto" : "smooth", block: "start" });
    }, 60);

    return () => window.clearTimeout(timer);
  }, [hash]);

  return (
    <section className="legal-doc section-curve">
      <div className="legal-shell">
        <p className="legal-doc-note">
          SeatsBrokers marketing site · London · New York · Dubai ·{" "}
          <a href={`mailto:${brand.salesEmail}`}>{brand.salesEmail}</a>
          {" · "}
          <a href={`mailto:${brand.email}`}>{brand.email}</a>
        </p>

        <div
          id="legal-tabs"
          className="legal-tabs"
          role="tablist"
          aria-label="Legal policies"
        >
          {legalChapters.map((chapter) => {
            const selected = chapter.id === activeId;
            return (
              <SiteLink
                key={chapter.id}
                to="/legal"
                hash={chapter.id}
                id={chapter.id}
                className="legal-tab"
                role="tab"
                aria-selected={selected}
                aria-controls="legal-panel"
                data-active={selected}
              >
                <span className="legal-tab-num">{chapter.index}</span>
                <span className="legal-tab-copy">
                  <span className="legal-tab-kicker">{chapter.kicker}</span>
                  <span className="legal-tab-label">{chapter.label}</span>
                </span>
              </SiteLink>
            );
          })}
        </div>

        <article
          key={active.meta.id}
          id="legal-panel"
          className="legal-chapter"
          role="tabpanel"
          aria-labelledby={active.meta.id}
        >
          <Reveal>
            <p className="legal-chapter-kicker">
              <span>{active.meta.index}</span>
              {active.meta.label}
            </p>
            <h2 className="legal-chapter-title">{active.doc.title}</h2>
            <p className="legal-chapter-lead">{active.doc.lead}</p>
            <Blocks blocks={active.doc.blocks} />
          </Reveal>
        </article>
      </div>
    </section>
  );
}
