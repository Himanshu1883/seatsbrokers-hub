import footballNight from "@/assets/backdrops/football-night.jpg";
import footballPitch from "@/assets/backdrops/football-pitch.jpg";
import concertCrowd from "@/assets/backdrops/concert-crowd.jpg";
import musicStage from "@/assets/backdrops/music-stage.jpg";
import trophy from "@/assets/backdrops/trophy.jpg";
import venueSeats from "@/assets/backdrops/venue-seats.jpg";
import arenaNight from "@/assets/backdrops/arena-night.jpg";
import basketball from "@/assets/backdrops/basketball.jpg";
import motorsport from "@/assets/backdrops/motorsport.jpg";
import sportsCrowd from "@/assets/backdrops/sports-crowd.jpg";

/**
 * Local Unsplash event / venue backdrops for landing sections.
 * Used at very low opacity via SectionBackdrop.
 */
export const eventBackdrops = {
  footballNight,
  footballPitch,
  concertCrowd,
  musicStage,
  trophy,
  venueSeats,
  arenaNight,
  basketball,
  motorsport,
  sportsCrowd,
} as const;

export type EventBackdropKey = keyof typeof eventBackdrops;
