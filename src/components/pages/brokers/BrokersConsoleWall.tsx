import {
  brokerHeroColumnA,
  brokerHeroColumnB,
  type BrokerHeroCard,
} from "@/content/broker-hero-data";
import { BrokersConsoleCard } from "./BrokersConsoleCards";

type ColumnProps = {
  cards: BrokerHeroCard[];
  direction: "up" | "down";
  duration: number;
};

function ConsoleColumn({ cards, direction, duration }: ColumnProps) {
  const renderTrack = (suffix: string) => (
    <div className="bh-track-group" aria-hidden={suffix === "dup"}>
      {cards.map((card, index) => (
        <BrokersConsoleCard key={`${card.id}-${suffix}`} card={card} index={index} />
      ))}
    </div>
  );

  return (
    <div
      className={`bh-col bh-col-${direction}`}
      style={{ ["--bh-duration" as string]: `${duration}s` }}
    >
      <div className="bh-track">
        {renderTrack("a")}
        {renderTrack("dup")}
      </div>
    </div>
  );
}

export function BrokersConsoleWall() {
  return (
    <div className="bh-wall">
      <span className="bh-wall-glow" aria-hidden />
      <span className="bh-wall-bridge" aria-hidden />
      <div className="bh-wall-mask">
        <div className="bh-wall-grid">
          <ConsoleColumn cards={brokerHeroColumnA} direction="up" duration={23} />
          <ConsoleColumn cards={brokerHeroColumnB} direction="down" duration={27} />
        </div>
      </div>
      <p className="sr-only">
        Animated preview of broker platform consoles including inventory, marketplace sync, AI
        pricing, event catalog, sync activity, distribution, market intelligence and sales desk.
      </p>
    </div>
  );
}
