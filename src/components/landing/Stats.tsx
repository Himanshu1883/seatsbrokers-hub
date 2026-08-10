import { StatsLedgerLight } from "@/components/landing/stats/StatsLedgerLight";
import { StatsAccentLight } from "@/components/landing/stats/StatsAccentLight";
import { StatsGlowLight } from "@/components/landing/stats/StatsGlowLight";

/** Homepage stats — ledger intro, accent hero grid, glow card row. */
export function Stats() {
  return (
    <div id="network-stats" className="flex flex-col gap-1.5 sm:gap-2">
      {/* <StatsLedgerLight /> */}
      <StatsAccentLight />
      {/* <StatsGlowLight /> */}
    </div>
  );
}

export { StatsAccentLight, StatsGlowLight, StatsLedgerLight };
