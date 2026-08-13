import { Reveal } from "@/hooks/use-scroll-motion";
import { inventoryTags } from "@/content/inventory-console-data";
import { InventoryConsole } from "./InventoryConsole";

type InventoryManagementSectionProps = {
  eyebrow: string;
  title: string;
  intro?: string;
  items: { title: string; body: string }[];
};

export function InventoryManagementSection({
  eyebrow,
  title,
  intro,
  items,
}: InventoryManagementSectionProps) {
  return (
    <section className="inv-section section-curve relative isolate scroll-mt-24 bg-background py-20 sm:py-24">
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-border to-transparent"
        aria-hidden
      />

      <div className="container-page relative z-10">
        <Reveal className="inv-head">
          <p className="section-eyebrow text-center text-primary">{eyebrow}</p>
          <h2 className="inv-title">{title}</h2>
          {intro ? <p className="inv-lead">{intro}</p> : null}

          <ul className="inv-tags">
            {inventoryTags.map((tag) => (
              <li key={tag}>{tag}</li>
            ))}
          </ul>
        </Reveal>

        <Reveal delay={90} className="inv-console-wrap">
          <InventoryConsole />
        </Reveal>

        <Reveal delay={140}>
          <ul className="inv-features">
            {items.map((item) => (
              <li key={item.title} className="inv-feature">
                <h3 className="inv-feature-title">{item.title}</h3>
                <p className="inv-feature-body">{item.body}</p>
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}
