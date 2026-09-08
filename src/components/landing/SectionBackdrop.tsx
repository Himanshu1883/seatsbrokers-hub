import type { EventBackdropKey } from "@/lib/event-backdrops";
import { eventBackdrops } from "@/lib/event-backdrops";

type Tone = "light" | "surface" | "dark" | "hero";

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
 * Hero: related event photo + heavier left wash so copy stays readable.
 */
export function SectionBackdrop({ image, tone = "light", strength = 0.11 }: SectionBackdropProps) {
  const isPhotoFill = tone === "dark" || tone === "hero";
  const isHero = tone === "hero";

  return (
    <div className="section-backdrop" data-tone={tone} aria-hidden>
      <img
        src={eventBackdrops[image]}
        alt=""
        loading={isHero ? "eager" : "lazy"}
        decoding="async"
        fetchPriority={isHero ? "high" : "low"}
        className="section-backdrop-img"
        style={isPhotoFill ? undefined : { opacity: strength }}
      />
      <span className="section-backdrop-wash" />
      {isPhotoFill ? null : <span className="section-backdrop-grid" />}
    </div>
  );
}

/** Page-hero photo (not homepage). Same wash recipe on every inner-page `bh-hero`. */
export function HeroBackdrop({ image }: { image: EventBackdropKey }) {
  return <SectionBackdrop image={image} tone="hero" />;
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
