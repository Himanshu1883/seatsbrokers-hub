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
 * Full-bleed Unsplash atmosphere behind a section.
 * Parent must be `relative isolate`. Content stays above via z-index.
 * Light/surface: whisper photo via `strength`. Dark: muted photo + mid wash (no grid).
 */
export function SectionBackdrop({ image, tone = "light", strength = 0.11 }: SectionBackdropProps) {
  const isDark = tone === "dark";

  return (
    <div className="section-backdrop" data-tone={tone} aria-hidden>
      <img
        src={eventBackdrops[image]}
        alt=""
        loading="lazy"
        decoding="async"
        className="section-backdrop-img"
        style={isDark ? undefined : { opacity: strength }}
      />
      <span className="section-backdrop-wash" />
      {isDark ? null : <span className="section-backdrop-grid" />}
    </div>
  );
}

/** Dark-band photo + readable wash. Falls back to the legacy mint gradient when no image is set. */
export function DarkSectionFill({ image }: { image?: EventBackdropKey }) {
  if (image) {
    return <SectionBackdrop image={image} tone="dark" />;
  }
  return (
    <div
      className="pointer-events-none absolute inset-0 bg-linear-to-br from-dark via-dark to-primary-deep/35"
      aria-hidden
    />
  );
}
