import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { PageShell } from "@/components/layout/PageShell";
import { pageMeta } from "@/content/site";
import { faqItems } from "@/content/faq-data";
import { FaqHero } from "@/components/pages/faq/FaqHero";
import { FaqAccordion } from "@/components/pages/faq/FaqAccordion";
import { FaqHelpStrip } from "@/components/pages/faq/FaqHelpStrip";

const { title, description } = pageMeta.faq;

export const Route = createFileRoute("/faq")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
    ],
  }),
  component: FaqPage,
});

function FaqPage() {
  const [openId, setOpenId] = useState<string>(faqItems[0].id);

  function selectTopic(id: string) {
    setOpenId(id);
    requestAnimationFrame(() => {
      document.getElementById(`faq-item-${id}`)?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    });
  }

  return (
    <PageShell>
      <FaqHero activeId={openId} onSelectTopic={selectTopic} />
      <FaqAccordion openId={openId} onOpenChange={setOpenId} />
      <FaqHelpStrip />
    </PageShell>
  );
}
