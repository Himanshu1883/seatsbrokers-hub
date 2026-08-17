import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Reveal } from "@/hooks/use-scroll-motion";
import { faqItems } from "@/content/faq-data";

type FaqAccordionProps = {
  openId: string;
  onOpenChange: (id: string) => void;
};

export function FaqAccordion({ openId, onOpenChange }: FaqAccordionProps) {
  return (
    <section className="faq-list section-curve" id="faq-list">
      <div className="container-page">
        <Reveal>
          <Accordion
            type="single"
            collapsible
            value={openId}
            onValueChange={onOpenChange}
            className="faq-accordion"
          >
            {faqItems.map((item, index) => (
              <AccordionItem
                key={item.id}
                value={item.id}
                id={`faq-item-${item.id}`}
                className="faq-item"
              >
                <AccordionTrigger className="faq-trigger">
                  <span className="faq-trigger-index">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <span className="faq-trigger-q">{item.question}</span>
                </AccordionTrigger>
                <AccordionContent className="faq-content">
                  <p className="faq-answer">{item.answer}</p>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </Reveal>
      </div>
    </section>
  );
}
