import bentoMarketplaceSync from "@/assets/bento/bento-marketplace-sync.png";
import bentoEventPricingIntel from "@/assets/bento/bento-event-pricing-intel.png";
import bentoPartnerPayments from "@/assets/bento/bento-partner-payments.png";
import bentoWorkflowWide from "@/assets/bento/bento-workflow-wide.png";
import bentoPlatformLayerWide from "@/assets/bento/bento-platform-layer-wide.png";

export type BentoSceneVariant =
  | "marketplace"
  | "audit"
  | "travel"
  | "workflow"
  | "platform";

export type BentoBackdropConfig = {
  id: BentoSceneVariant;
  src: string;
  alt: string;
  position?: string;
  opacity?: number;
  blur?: string;
  scale?: number;
};

/** Backdrop images for ProcessBento illustration scenes — swap src paths here. */
export const bentoBackdrops = {
  marketplace: {
    id: "marketplace",
    src: bentoMarketplaceSync,
    alt: "Marketplace distribution dashboard",
    position: "52% 38%",
    opacity: 0.92,
    blur: "0px",
    scale: 1.06,
  },
  audit: {
    id: "audit",
    src: bentoEventPricingIntel,
    alt: "Event intelligence and pricing dashboard",
    position: "58% 32%",
    opacity: 0.9,
    blur: "0px",
    scale: 1.08,
  },
  travel: {
    id: "travel",
    src: bentoPartnerPayments,
    alt: "Travel partner commerce dashboard",
    position: "50% 28%",
    opacity: 0.9,
    blur: "0px",
    scale: 1.06,
  },
  workflow: {
    id: "workflow",
    src: bentoWorkflowWide,
    alt: "End-to-end ticketing workflow dashboard",
    position: "50% 42%",
    opacity: 0.88,
    blur: "0px",
    scale: 1.1,
  },
  platform: {
    id: "platform",
    src: bentoPlatformLayerWide,
    alt: "SeatsBrokers platform layer dashboard",
    position: "50% 45%",
    opacity: 0.88,
    blur: "0px",
    scale: 1.1,
  },
} as const satisfies Record<string, BentoBackdropConfig>;
