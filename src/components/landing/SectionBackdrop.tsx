import type { EventBackdropKey } from "@/lib/event-backdrops";
import { eventBackdrops } from "@/lib/event-backdrops";

type Tone = "light" | "surface" | "dark";

type SectionBackdropProps = {
  image: EventBackdropKey;
  tone?: Tone;
  /** Extra opacity on the photo (0–1). Default keeps it very minimal. */
  strength?: number;
};

/**
 * Very light, full-bleed Unsplash atmosphere behind a section.
 * Parent must be `relative isolate` (or equivalent). Content stays above via z-index.
 */
export function SectionBackdrop({ image, tone = "light", strength = 0.11 }: SectionBackdropProps) {
  return (
    <div className="section-backdrop" data-tone={tone} aria-hidden>
      <img
        src={eventBackdrops[image]}
        alt=""
        loading="lazy"
        decoding="async"
        className="section-backdrop-img"
        style={{ opacity: strength }}
      />
      <span className="section-backdrop-wash" />
      <span className="section-backdrop-grid" />
    </div>
  );
}
