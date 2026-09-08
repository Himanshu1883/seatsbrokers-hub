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
import tennis from "@/assets/backdrops/tennis.jpg";
import liveCrowd from "@/assets/backdrops/live-crowd.jpg";
import travelDestination from "@/assets/backdrops/travel-destination.jpg";
import concert from "@/assets/backdrops/concert.jpg";
import hospitalityDining from "@/assets/backdrops/hospitality-dining.jpg";
import formula1 from "@/assets/backdrops/formula1.jpg";
import footballStadium from "@/assets/backdrops/football-stadium.jpg";
import stadiumTunnel from "@/assets/backdrops/stadium-night-lit1.jpg";
import stadiumNightLit from "@/assets/backdrops/stadium-night-lit.png";
import aiConnect from "@/assets/backdrops/istockphoto-1206796363-612x612.jpg";
import platformLayers from "@/assets/backdrops/istockphoto-2262851578-612x612.jpg";
import cityTowers from "@/assets/backdrops/istockphoto-1351571961-612x612.webp";
import premiumVenue from "@/assets/backdrops/premium_photo-1681487767138-ddf2d67b35c1.avif";

/**
 * Local event / venue backdrops for landing sections and page heroes.
 * Body bands: whisper / cinematic via SectionBackdrop.
 * Page heroes (not homepage): HeroBackdrop + related key below.
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
  tennis,
  liveCrowd,
  travelDestination,
  concert,
  hospitalityDining,
  formula1,
  footballStadium,
  stadiumTunnel,
  stadiumNightLit,
  aiConnect,
  platformLayers,
  cityTowers,
  premiumVenue,
} as const;

export type EventBackdropKey = keyof typeof eventBackdrops;
