import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import {
  ArrowLeft,
  CalendarDays,
  Check,
  Copy,
  Download,
  FileText,
  Filter,
  Heart,
  Map,
  MapPin,
  Minus,
  Plus,
  RefreshCw,
  Smartphone,
  Ticket,
  Trash2,
  Trophy,
  X,
} from "lucide-react";
import { ConsoleShell } from "@/components/pages/brokers/ConsoleShell";
import {
  seatMapBlocks,
  seatMapCategories,
  seatMapEvent,
  seatMapListings,
  SEAT_MAP_LISTING_ROWS,
  seatMapQtyFilters,
  seatMapTicketTypes,
  type SeatListing,
  type SeatMapBlock,
  type SeatMapCategoryId,
} from "@/content/seat-map-tickets-data";

export type SeatMapStep = "select" | "quote" | "margin" | "share";

type ToastKind = "ok" | "info";

type DeskToast = { message: string; kind: ToastKind } | null;

export function formatGbp(value: number) {
  return `£ ${value.toLocaleString("en-GB", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`;
}

/** Short form for headline metrics — no decimals, still £. */
export function formatGbpCompact(value: number) {
  return `£ ${Math.round(value).toLocaleString("en-GB")}`;
}

function roundMoney(value: number) {
  return Math.round(value * 100) / 100;
}

export function categoryLabel(id: SeatMapCategoryId) {
  return seatMapCategories.find((item) => item.id === id)?.label ?? id;
}

function categoryColor(id: SeatMapCategoryId) {
  return seatMapCategories.find((item) => item.id === id)?.color ?? "#2f9d63";
}

function priced(listing: SeatListing, marginPct: number) {
  const ticketPrice = roundMoney(listing.basePrice * (1 + marginPct / 100));
  return { ticketPrice, marginValue: roundMoney(ticketPrice - listing.basePrice) };
}

/** Line value for one listing at a given margin — used by the pipeline cards. */
export function listingLineTotal(listing: SeatListing, marginPct: number) {
  return roundMoney(priced(listing, marginPct).ticketPrice * listing.qty);
}

function listingLines(rows: SeatListing[], margins: Record<string, number>) {
  return rows
    .map((row) => {
      const { ticketPrice, marginValue } = priced(row, margins[row.id] ?? 0);
      return `${row.qty} × ${categoryLabel(row.category)} · ${formatGbp(ticketPrice)} (margin ${formatGbp(marginValue)})`;
    })
    .join("\n");
}

function buildQuoteText(rows: SeatListing[], margins: Record<string, number>) {
  const total = rows.reduce((sum, row) => sum + priced(row, margins[row.id] ?? 0).ticketPrice * row.qty, 0);
  return [
    "SeatsBrokers quote",
    `${seatMapEvent.name}`,
    `${seatMapEvent.date}`,
    `${seatMapEvent.venue}`,
    "",
    `${rows.length} listing${rows.length === 1 ? "" : "s"}`,
    listingLines(rows, margins),
    "",
    `Total ${formatGbp(roundMoney(total))}`,
  ].join("\n");
}

function downloadQuotePdf(text: string) {
  const lines = text.split("\n");
  const ops = lines
    .map((line, index) => {
      const y = 780 - index * 16;
      const safe = line.replace(/\\/g, "\\\\").replace(/\(/g, "\\(").replace(/\)/g, "\\)");
      return `BT /F1 11 Tf 48 ${y} Td (${safe}) Tj ET`;
    })
    .join("\n");
  const stream = ops;
  const objects = [
    "1 0 obj << /Type /Catalog /Pages 2 0 R >> endobj",
    "2 0 obj << /Type /Pages /Kids [3 0 R] /Count 1 >> endobj",
    "3 0 obj << /Type /Page /Parent 2 0 R /MediaBox [0 0 595 842] /Contents 4 0 R /Resources << /Font << /F1 5 0 R >> >> >> endobj",
    `4 0 obj << /Length ${stream.length} >> stream\n${stream}\nendstream endobj`,
    "5 0 obj << /Type /Font /Subtype /Type1 /BaseFont /Helvetica >> endobj",
  ];
  const pdf = `%PDF-1.4\n${objects.join("\n")}\ntrailer << /Root 1 0 R >>\n%%EOF`;
  const blob = new Blob([pdf], { type: "application/pdf" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = "seatsbrokers-quote-mci-liv.pdf";
  document.body.appendChild(link);
  link.click();
  link.remove();
  window.setTimeout(() => URL.revokeObjectURL(url), 1200);
}

/**
 * Auto-run script for the quote pipeline. Every frame is a *complete snapshot*
 * of the desk, so applying one frame is idempotent and the loop can never drift
 * out of sync with the mini consoles.
 */
type AutoFrame = {
  stage: SeatMapStep;
  hold: number;
  label: string;
  picks: number;
  lines?: number;
  marginPct?: number;
  marginOpen?: boolean;
  marginLocked?: boolean;
  channels?: number;
  confirmed?: boolean;
  toast?: string;
  toastKind?: ToastKind;
};

/** Listing order — keeps the selected rows from re-ordering as picks land. */
const autoPickIds = ["L-1001", "L-1004", "L-1006", "L-1007"] as const;

export const autoQuoteRef = "QT-2027-0518";
export const autoInvoiceRef = "INV-2027-0518";
const autoStageOrder: SeatMapStep[] = ["select", "quote", "margin", "share"];

/** Hand the desk back to auto-play this long after the last human input. */
const autoResumeMs = 14000;

const autoFrames: AutoFrame[] = [
  { stage: "select", hold: 780, label: "Desk armed · scanning live Etihad inventory", picks: 0 },
  { stage: "select", hold: 660, label: "Shortside Upper Tier · 4 tickets held", picks: 1 },
  { stage: "select", hold: 660, label: "Shortside Lower Tier · 8 tickets held", picks: 2 },
  {
    stage: "select",
    hold: 860,
    label: "3 listings · 14 tickets selected",
    picks: 3,
    toast: "3 listings selected",
  },
  { stage: "quote", hold: 580, label: `Opening quote ${autoQuoteRef}`, picks: 3, lines: 1 },
  { stage: "quote", hold: 520, label: "Writing line 2 of 3", picks: 3, lines: 2 },
  {
    stage: "quote",
    hold: 880,
    label: "Quote assembled · 3 lines priced in £",
    picks: 3,
    lines: 3,
    toast: "Quote ready for 3 listings",
  },
  {
    stage: "margin",
    hold: 500,
    label: "Margin rules open · partner default",
    picks: 3,
    lines: 3,
    marginPct: 5,
    marginOpen: true,
  },
  {
    stage: "margin",
    hold: 400,
    label: "Stepping partner margin",
    picks: 3,
    lines: 3,
    marginPct: 9,
    marginOpen: true,
  },
  {
    stage: "margin",
    hold: 400,
    label: "Stepping partner margin",
    picks: 3,
    lines: 3,
    marginPct: 12,
    marginOpen: true,
  },
  {
    stage: "margin",
    hold: 520,
    label: "15% staged · ready to apply",
    picks: 3,
    lines: 3,
    marginPct: 15,
    marginOpen: true,
  },
  {
    stage: "margin",
    hold: 960,
    label: "15% applied · ticket price and margin recalculated",
    picks: 3,
    lines: 3,
    marginPct: 15,
    marginLocked: true,
    toast: "15% margin applied to 3 listings",
  },
  {
    stage: "share",
    hold: 640,
    label: "Quote copied to the customer thread",
    picks: 3,
    lines: 3,
    marginPct: 15,
    marginLocked: true,
    channels: 1,
    toast: "Listings copied",
  },
  {
    stage: "share",
    hold: 640,
    label: "Venue map attached to the package",
    picks: 3,
    lines: 3,
    marginPct: 15,
    marginLocked: true,
    channels: 2,
    toast: "Map copied",
  },
  {
    stage: "share",
    hold: 740,
    label: "Branded quote PDF generated",
    picks: 3,
    lines: 3,
    marginPct: 15,
    marginLocked: true,
    channels: 3,
    toast: "Quote PDF ready",
  },
  {
    stage: "share",
    hold: 1280,
    label: `Order confirmed · invoice ${autoInvoiceRef} issued`,
    picks: 3,
    lines: 3,
    marginPct: 15,
    marginLocked: true,
    channels: 3,
    confirmed: true,
  },
];

const autoFrameMeta = autoFrames.map((frame, index) => {
  const stageTotal = autoFrames.filter((item) => item.stage === frame.stage).length;
  const stageDone = autoFrames
    .slice(0, index + 1)
    .filter((item) => item.stage === frame.stage).length;
  return {
    stageProgress: stageDone / stageTotal,
    progress: (index + 1) / autoFrames.length,
  };
});

const autoLastIndex = autoFrames.length - 1;

export function useSeatMapTickets({
  auto = true,
  active = true,
}: { auto?: boolean; active?: boolean } = {}) {
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [margins, setMargins] = useState<Record<string, number>>({});
  const [category, setCategory] = useState("Any");
  const [quantity, setQuantity] = useState<(typeof seatMapQtyFilters)[number]>("Any");
  const [ticketType, setTicketType] = useState<(typeof seatMapTicketTypes)[number]>("Any");
  const [showMap, setShowMap] = useState(true);
  const [showFilters, setShowFilters] = useState(false);
  const [zoom, setZoom] = useState(1);
  const [marginDraft, setMarginDraft] = useState(10);
  const [marginOpen, setMarginOpen] = useState(false);
  const [quoted, setQuoted] = useState(false);
  const [toast, setToast] = useState<DeskToast>(null);
  const [favorites, setFavorites] = useState<string[]>([]);
  const [copied, setCopied] = useState<"copy" | "map" | null>(null);
  const [pdfReady, setPdfReady] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [autoFrameIndex, setAutoFrameIndex] = useState(0);
  const [manual, setManual] = useState(false);
  const [inputTick, setInputTick] = useState(0);
  const [reducedMotion, setReducedMotion] = useState(false);

  const showToast = useCallback((message: string, kind: ToastKind = "ok") => {
    setToast({ message, kind });
  }, []);

  useEffect(() => {
    if (!toast) return;
    const id = window.setTimeout(() => setToast(null), 2400);
    return () => window.clearTimeout(id);
  }, [toast]);

  const filtered = useMemo(() => {
    const minQty = quantity === "Any" ? 0 : Number.parseInt(quantity, 10);
    return seatMapListings.filter((row) => {
      if (category !== "Any" && row.category !== category) return false;
      if (row.qty < minQty) return false;
      if (ticketType !== "Any" && row.ticketType !== ticketType) return false;
      return true;
    }).slice(0, SEAT_MAP_LISTING_ROWS);
  }, [category, quantity, ticketType]);

  const selected = useMemo(
    () => seatMapListings.filter((row) => selectedIds.includes(row.id)),
    [selectedIds],
  );

  const stats = useMemo(() => {
    const tickets = filtered.reduce((sum, row) => sum + row.qty, 0);
    const from = filtered.reduce((min, row) => {
      const price = priced(row, margins[row.id] ?? 0).ticketPrice;
      return Math.min(min, price);
    }, Number.POSITIVE_INFINITY);
    return {
      listings: filtered.length,
      tickets,
      from: Number.isFinite(from) ? from : 0,
    };
  }, [filtered, margins]);

  const selectedCount = selected.length;
  const appliedMargin = selected.reduce((max, row) => Math.max(max, margins[row.id] ?? 0), 0);
  const marginApplied = appliedMargin > 0;

  const step: SeatMapStep = copied || pdfReady
    ? "share"
    : marginApplied && selectedCount > 0
      ? "margin"
      : quoted
        ? "quote"
        : "select";

  const totals = useMemo(() => {
    const base = roundMoney(selected.reduce((sum, row) => sum + row.basePrice * row.qty, 0));
    const withMargin = roundMoney(
      selected.reduce((sum, row) => sum + listingLineTotal(row, margins[row.id] ?? 0), 0),
    );
    return {
      base,
      withMargin,
      tickets: selected.reduce((sum, row) => sum + row.qty, 0),
    };
  }, [margins, selected]);

  const toggleRow = useCallback((id: string) => {
    setSelectedIds((current) => {
      const next = current.includes(id) ? current.filter((item) => item !== id) : [...current, id];
      if (next.length === 0) {
        setQuoted(false);
        setCopied(null);
        setPdfReady(false);
      }
      return next;
    });
  }, []);

  const toggleAllVisible = useCallback(() => {
    setSelectedIds((current) => {
      const visibleIds = filtered.map((row) => row.id);
      const allOn = visibleIds.length > 0 && visibleIds.every((id) => current.includes(id));
      if (allOn) {
        const hidden = current.filter((id) => !visibleIds.includes(id));
        if (hidden.length === 0) {
          setQuoted(false);
          setCopied(null);
          setPdfReady(false);
        }
        return hidden;
      }
      return Array.from(new Set([...current, ...visibleIds]));
    });
  }, [filtered]);

  const clearSelection = useCallback(() => {
    setSelectedIds([]);
    setQuoted(false);
    setCopied(null);
    setPdfReady(false);
    setMarginOpen(false);
    showToast("Selection cleared", "info");
  }, [showToast]);

  const applyMargin = useCallback(() => {
    if (selectedIds.length === 0) return;
    const pct = Math.min(99, Math.max(0, marginDraft));
    setMargins((current) => {
      const next = { ...current };
      for (const id of selectedIds) next[id] = pct;
      return next;
    });
    setMarginOpen(false);
    showToast(`${pct}% margin applied to ${selectedIds.length} listing${selectedIds.length === 1 ? "" : "s"}`);
  }, [marginDraft, selectedIds, showToast]);

  const quoteSelected = useCallback(() => {
    if (selectedIds.length === 0) return;
    setQuoted(true);
    showToast(`Quote ready for ${selectedIds.length} listing${selectedIds.length === 1 ? "" : "s"}`);
  }, [selectedIds, showToast]);

  const buyListing = useCallback(
    (id: string) => {
      setSelectedIds((current) => (current.includes(id) ? current : [...current, id]));
      setQuoted(true);
      showToast("Quote ready — share or apply margin");
    },
    [showToast],
  );

  const copyListings = useCallback(async () => {
    if (selected.length === 0) return;
    try {
      await navigator.clipboard.writeText(buildQuoteText(selected, margins));
      setCopied("copy");
      showToast("Listings copied");
    } catch {
      showToast("Copy failed — try again", "info");
    }
  }, [margins, selected, showToast]);

  const copyMap = useCallback(async () => {
    const cats = Array.from(new Set(selected.map((row) => categoryLabel(row.category))));
    const text = [
      `Venue map · ${seatMapEvent.venue}`,
      seatMapEvent.name,
      selected.length ? `Selected sections: ${cats.join(", ")}` : "No sections selected",
    ].join("\n");
    try {
      await navigator.clipboard.writeText(text);
      setCopied("map");
      showToast("Map copied");
    } catch {
      showToast("Copy failed — try again", "info");
    }
  }, [selected, showToast]);

  const downloadPdf = useCallback(() => {
    if (selected.length === 0) return;
    downloadQuotePdf(buildQuoteText(selected, margins));
    setPdfReady(true);
    showToast("Quote PDF downloaded");
  }, [margins, selected, showToast]);

  const refresh = useCallback(() => {
    setRefreshing(true);
    setZoom(1);
    window.setTimeout(() => {
      setRefreshing(false);
      showToast("Listings refreshed", "info");
    }, 520);
  }, [showToast]);

  const backToSearch = useCallback(() => {
    setCategory("Any");
    setQuantity("Any");
    setTicketType("Any");
    setSelectedIds([]);
    setQuoted(false);
    setCopied(null);
    setPdfReady(false);
    setMarginOpen(false);
    setShowFilters(true);
    setShowMap(true);
    showToast("Back to search", "info");
  }, [showToast]);

  const selectByMap = useCallback(
    (mapId: string, categoryId: SeatMapCategoryId) => {
      const matches = filtered.filter((row) => row.mapId === mapId || row.category === categoryId);
      if (matches.length === 0) {
        setCategory(categoryId);
        showToast(`${categoryLabel(categoryId)} filter applied`, "info");
        return;
      }
      const ids = matches.map((row) => row.id);
      const allOn = ids.every((id) => selectedIds.includes(id));
      setSelectedIds((current) => {
        if (allOn) return current.filter((id) => !ids.includes(id));
        return Array.from(new Set([...current, ...ids]));
      });
    },
    [filtered, selectedIds, showToast],
  );

  const toggleFavorite = useCallback((id: string) => {
    setFavorites((current) => (current.includes(id) ? current.filter((item) => item !== id) : [...current, id]));
  }, []);

  /* ── Auto-run pipeline: Select → Quote → Margin → Share ── */

  useEffect(() => {
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReducedMotion(query.matches);
    const onChange = () => setReducedMotion(query.matches);
    query.addEventListener("change", onChange);
    return () => query.removeEventListener("change", onChange);
  }, []);

  const resetDesk = useCallback(() => {
    setCategory("Any");
    setQuantity("Any");
    setTicketType("Any");
    setShowMap(true);
    setShowFilters(true);
    setZoom(1);
    setSelectedIds([]);
    setMargins({});
    setQuoted(false);
    setCopied(null);
    setPdfReady(false);
    setMarginOpen(false);
    setMarginDraft(10);
  }, []);

  const applyAutoFrame = useCallback(
    (frame: AutoFrame, silent = false) => {
      const ids = autoPickIds.slice(0, frame.picks);
      const channels = frame.channels ?? 0;
      setSelectedIds([...ids]);
      setQuoted((frame.lines ?? 0) > 0);
      setMargins(
        frame.marginLocked ? Object.fromEntries(ids.map((id) => [id, frame.marginPct ?? 0])) : {},
      );
      setMarginDraft(frame.marginPct ?? 10);
      setMarginOpen(Boolean(frame.marginOpen));
      setCopied(channels >= 2 ? "map" : channels >= 1 ? "copy" : null);
      setPdfReady(channels >= 3);
      if (frame.toast && !silent) showToast(frame.toast, frame.toastKind ?? "ok");
    },
    [showToast],
  );

  /** Single driver: one timer, one frame index, snapshots pushed to every card. */
  useEffect(() => {
    if (!auto || manual) return;
    if (reducedMotion) {
      applyAutoFrame(autoFrames[autoLastIndex]!, true);
      return;
    }
    if (!active) return;
    const frame = autoFrames[autoFrameIndex] ?? autoFrames[0]!;
    applyAutoFrame(frame);
    const id = window.setTimeout(
      () => setAutoFrameIndex((index) => (index + 1) % autoFrames.length),
      frame.hold,
    );
    return () => window.clearTimeout(id);
  }, [active, applyAutoFrame, auto, autoFrameIndex, manual, reducedMotion]);

  const resumeAuto = useCallback(() => {
    setManual(false);
    setAutoFrameIndex(0);
    resetDesk();
  }, [resetDesk]);

  /** Any real input hands the desk to the visitor; auto-play returns when idle. */
  const takeControl = useCallback(() => {
    setManual(true);
    setInputTick((tick) => tick + 1);
  }, []);

  useEffect(() => {
    if (!auto || !manual) return;
    const id = window.setTimeout(resumeAuto, autoResumeMs);
    return () => window.clearTimeout(id);
  }, [auto, inputTick, manual, resumeAuto]);

  const scripted = auto && !manual;
  const frameIndex = reducedMotion ? autoLastIndex : autoFrameIndex;
  const frame = autoFrames[frameIndex] ?? autoFrames[0]!;
  const meta = autoFrameMeta[frameIndex] ?? autoFrameMeta[0]!;

  const stage: SeatMapStep = scripted ? frame.stage : step;
  const lines = scripted ? (frame.lines ?? 0) : quoted ? selectedCount : 0;
  const marginPct = scripted ? (frame.marginPct ?? 0) : appliedMargin || marginDraft;
  const marginLocked = scripted ? Boolean(frame.marginLocked) : marginApplied;
  const channels = scripted ? (frame.channels ?? 0) : pdfReady ? 3 : copied ? 1 : 0;
  const pricingPct = marginLocked ? (scripted ? (frame.marginPct ?? 0) : appliedMargin) : 0;
  const customerTotal = marginLocked
    ? totals.withMargin
    : roundMoney(totals.base * (1 + marginPct / 100));

  const pipeline = {
    stage,
    stageIndex: Math.max(0, autoStageOrder.indexOf(stage)),
    label: scripted
      ? frame.label
      : "Manual control · auto-run resumes when you stop editing",
    progress: reducedMotion ? 1 : scripted ? meta.progress : (autoStageOrder.indexOf(stage) + 1) / 4,
    stageProgress: scripted ? meta.stageProgress : 1,
    lines,
    marginPct,
    marginLocked,
    pricingPct,
    channels,
    confirmed: scripted ? Boolean(frame.confirmed) : pdfReady,
    baseTotal: totals.base,
    customerTotal,
    marginTotal: roundMoney(customerTotal - totals.base),
    tickets: totals.tickets,
    running: scripted && (reducedMotion || active),
    manual,
    reducedMotion,
  };

  return {
    totals,
    pipeline,
    takeControl,
    resumeAuto,
    filtered,
    selected,
    selectedIds,
    selectedCount,
    category,
    quantity,
    ticketType,
    showMap,
    showFilters,
    zoom,
    marginDraft,
    marginOpen,
    quoted,
    toast,
    favorites,
    copied,
    pdfReady,
    refreshing,
    stats,
    step,
    margins,
    appliedMargin,
    setCategory,
    setQuantity,
    setTicketType,
    setShowMap,
    setShowFilters,
    setZoom,
    setMarginDraft,
    setMarginOpen,
    toggleRow,
    toggleAllVisible,
    clearSelection,
    applyMargin,
    quoteSelected,
    buyListing,
    copyListings,
    copyMap,
    downloadPdf,
    refresh,
    backToSearch,
    selectByMap,
    toggleFavorite,
  };
}

export type SeatMapDesk = ReturnType<typeof useSeatMapTickets>;

function lowestPriceForBlock(blockId: string, margins: Record<string, number>) {
  let lowest = Number.POSITIVE_INFINITY;
  for (const row of seatMapListings) {
    if (row.mapId !== blockId) continue;
    const price = priced(row, margins[row.id] ?? 0).ticketPrice;
    if (price < lowest) lowest = price;
  }
  return Number.isFinite(lowest) ? lowest : null;
}

function blockSubPads(block: SeatMapBlock) {
  const n = block.splits;
  const gap = 1.15;
  const stacked = block.h > block.w * 1.12;
  if (stacked) {
    const h = (block.h - gap * (n - 1)) / n;
    return Array.from({ length: n }, (_, index) => ({
      x: block.x,
      y: block.y + index * (h + gap),
      w: block.w,
      h,
    }));
  }
  const w = (block.w - gap * (n - 1)) / n;
  return Array.from({ length: n }, (_, index) => ({
    x: block.x + index * (w + gap),
    y: block.y,
    w,
    h: block.h,
  }));
}

function MapSeatBlock({
  block,
  selected,
  dimmed,
  fromPrice,
  onSelect,
  onHover,
}: {
  block: SeatMapBlock;
  selected: boolean;
  dimmed: boolean;
  fromPrice: number | null;
  onSelect: () => void;
  onHover: (id: string | null) => void;
}) {
  const cx = block.x + block.w / 2;
  const cy = block.y + block.h / 2;
  const stacked = block.h > block.w * 1.12;
  const hatch = stacked ? "smt-hatch-v" : "smt-hatch-h";
  const showStand = block.w >= 42 && block.h >= 22 && !stacked;
  const fill = categoryColor(block.category);
  const pads = blockSubPads(block);
  const codeSize = stacked ? 8.2 : block.w >= 40 ? 8.6 : 7.2;

  return (
    <g
      className="smt-map-seat"
      data-selected={selected ? "true" : "false"}
      data-dim={dimmed ? "true" : "false"}
      tabIndex={0}
      role="button"
      aria-pressed={selected}
      aria-label={`${block.stand} ${block.code}${fromPrice ? `, from ${formatGbpCompact(fromPrice)}` : ""}`}
      onClick={onSelect}
      onKeyDown={(event) => {
        if (event.key === "Enter" || event.key === " ") {
          event.preventDefault();
          onSelect();
        }
      }}
      onMouseEnter={() => onHover(block.id)}
      onMouseLeave={() => onHover(null)}
      onFocus={() => onHover(block.id)}
      onBlur={() => onHover(null)}
    >
      <rect x={block.x} y={block.y} width={block.w} height={block.h} rx="4" fill={fill} />
      <g clipPath={`url(#smt-clip-${block.id})`}>
        {pads.map((pad, index) => (
          <rect
            key={`${block.id}-pad-${index}`}
            x={pad.x}
            y={pad.y}
            width={pad.w}
            height={pad.h}
            rx="2.2"
            fill={fill}
            fillOpacity={index % 2 === 0 ? 1 : 0.82}
          />
        ))}
        <rect x={block.x} y={block.y} width={block.w} height={block.h} fill={`url(#${hatch})`} pointerEvents="none" />
        <text
          className="smt-map-label smt-map-code"
          x={cx}
          y={showStand ? cy - 3.4 : cy}
          textAnchor="middle"
          dominantBaseline="middle"
          fontSize={codeSize}
          transform={stacked ? `rotate(-90 ${cx} ${cy})` : undefined}
        >
          {block.code}
        </text>
        {showStand ? (
          <text
            className="smt-map-label smt-map-stand"
            x={cx}
            y={cy + 5.6}
            textAnchor="middle"
            dominantBaseline="middle"
            fontSize="5.4"
          >
            {block.stand}
          </text>
        ) : null}
      </g>
      <rect
        className="smt-map-ring"
        x={block.x}
        y={block.y}
        width={block.w}
        height={block.h}
        rx="4"
        fill="none"
      />
    </g>
  );
}

function VenueMapPanel({ desk }: { desk: SeatMapDesk }) {
  const [hoverId, setHoverId] = useState<string | null>(null);
  const selectedMapIds = new Set(desk.selected.map((row) => row.mapId));
  const hasSelection = selectedMapIds.size > 0;
  const hoverBlock = seatMapBlocks.find((block) => block.id === hoverId) ?? null;
  const hoverPrice = hoverBlock ? lowestPriceForBlock(hoverBlock.id, desk.margins) : null;
  const hint = hoverBlock
    ? `${hoverBlock.stand} · ${hoverBlock.code}${hoverPrice ? ` · from ${formatGbpCompact(hoverPrice)}` : " · no live listings"}`
    : hasSelection
      ? `${desk.selectedCount} listing${desk.selectedCount === 1 ? "" : "s"} held on the map`
      : "Select a section to hold listings";

  return (
    <section className="smt-map-card">
      <header className="smt-map-head">
        <h3>Venue Map</h3>
        <div className="smt-map-head-end">
          {desk.selectedCount > 0 ? (
            <p className="smt-map-picked">
              <Ticket className="size-3" strokeWidth={2.2} aria-hidden />
              <span>
                {desk.selectedCount} listing{desk.selectedCount === 1 ? "" : "s"} selected
              </span>
            </p>
          ) : null}
          <div className="smt-map-tools">
            <button type="button" aria-label="Zoom in" onClick={() => desk.setZoom((value) => Math.min(1.7, roundMoney(value + 0.15)))}>
              <Plus className="size-3.5" strokeWidth={2} aria-hidden />
            </button>
            <button type="button" aria-label="Zoom out" onClick={() => desk.setZoom((value) => Math.max(0.75, roundMoney(value - 0.15)))}>
              <Minus className="size-3.5" strokeWidth={2} aria-hidden />
            </button>
            <button type="button" aria-label="Reset map" onClick={() => desk.setZoom(1)}>
              <RefreshCw className="size-3.5" strokeWidth={2} aria-hidden />
            </button>
            <button type="button" aria-label="Hide map" onClick={() => desk.setShowMap(false)}>
              <X className="size-3.5" strokeWidth={2} aria-hidden />
            </button>
          </div>
        </div>
      </header>

      <div className="smt-map-stage">
        <div className="smt-map-zoom" style={{ transform: `scale(${desk.zoom})` }}>
          <svg
            viewBox="0 0 400 300"
            className="smt-map-svg"
            data-has-sel={hasSelection ? "true" : "false"}
            aria-label="Etihad stadium seating map"
          >
            <defs>
              <pattern id="smt-hatch-h" width="6" height="3.2" patternUnits="userSpaceOnUse">
                <path d="M0 2.6 H6" stroke="#fff" strokeOpacity="0.28" strokeWidth="0.55" />
              </pattern>
              <pattern id="smt-hatch-v" width="3.2" height="6" patternUnits="userSpaceOnUse">
                <path d="M2.6 0 V6" stroke="#fff" strokeOpacity="0.28" strokeWidth="0.55" />
              </pattern>
              {seatMapBlocks.map((block) => (
                <clipPath key={`smt-clip-${block.id}`} id={`smt-clip-${block.id}`}>
                  <rect x={block.x} y={block.y} width={block.w} height={block.h} rx="4" />
                </clipPath>
              ))}
            </defs>
            <rect x="8" y="8" width="384" height="284" rx="86" className="smt-map-bowl" />
            <rect x="148" y="108" width="104" height="84" rx="6" className="smt-map-pitch" />
            <line x1="200" y1="108" x2="200" y2="192" className="smt-map-line" />
            <circle cx="200" cy="150" r="14" className="smt-map-line" fill="none" />
            <rect x="148" y="128" width="18" height="44" rx="2" className="smt-map-line" fill="none" />
            <rect x="234" y="128" width="18" height="44" rx="2" className="smt-map-line" fill="none" />
            <text className="smt-map-pitch-label" x="200" y="152" textAnchor="middle" dominantBaseline="middle">
              PITCH
            </text>
            {seatMapBlocks.map((block) => (
              <MapSeatBlock
                key={block.id}
                block={block}
                selected={selectedMapIds.has(block.id)}
                dimmed={hasSelection && !selectedMapIds.has(block.id)}
                fromPrice={lowestPriceForBlock(block.id, desk.margins)}
                onSelect={() => desk.selectByMap(block.id, block.category)}
                onHover={setHoverId}
              />
            ))}
          </svg>
        </div>
      </div>

      <p className="smt-map-hint">{hint}</p>
    </section>
  );
}

function VenueLegend() {
  return (
    <ul className="smt-legend">
      {seatMapCategories.map((item) => (
        <li key={item.id}>
          <i style={{ background: item.color }} aria-hidden />
          {item.label}
        </li>
      ))}
    </ul>
  );
}

export function SeatMapTicketsConsole({ desk }: { desk: SeatMapDesk }) {
  const marginRef = useRef<HTMLDivElement>(null);
  const visibleSelected = desk.filtered.filter((row) => desk.selectedIds.includes(row.id)).length;
  const allVisibleSelected = desk.filtered.length > 0 && visibleSelected === desk.filtered.length;
  const idle = desk.selectedCount === 0;

  const setMarginOpen = desk.setMarginOpen;
  useEffect(() => {
    if (!desk.marginOpen) return;
    const onDoc = (event: PointerEvent) => {
      if (!marginRef.current?.contains(event.target as Node)) setMarginOpen(false);
    };
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setMarginOpen(false);
    };
    document.addEventListener("pointerdown", onDoc);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("pointerdown", onDoc);
      document.removeEventListener("keydown", onKey);
    };
  }, [desk.marginOpen, setMarginOpen]);

  return (
    <div className="smt-console">
      <ConsoleShell path="seatsbrokers / b2b / seat-map-tickets" status="Live" icon={Ticket}>
        <div
          className="smt-desk"
          data-stage={desk.pipeline.stage}
          data-auto={desk.pipeline.running ? "true" : "false"}
        >
          <header className="smt-top">
            <div className="smt-titles">
              <h3>Seat Map &amp; Tickets</h3>
              <p>Interactive Seat Map And Available Ticket Listings</p>
            </div>
            <div className="smt-top-actions">
              <button type="button" className="smt-btn smt-btn-primary" onClick={() => desk.setShowMap((value) => !value)}>
                <Map className="size-3.5" strokeWidth={2} />
                {desk.showMap ? "Hide Map" : "Show Map"}
              </button>
              <button type="button" className="smt-btn smt-btn-primary" onClick={() => desk.setShowFilters((value) => !value)}>
                <Filter className="size-3.5" strokeWidth={2} />
                {desk.showFilters ? "Hide Filters" : "Show Filters"}
              </button>
              <button
                type="button"
                className="smt-icon-btn"
                aria-label="Refresh listings"
                data-spin={desk.refreshing ? "true" : "false"}
                onClick={desk.refresh}
              >
                <RefreshCw className="size-3.5" strokeWidth={2} />
              </button>
            </div>
          </header>

          <div className="smt-eventbar">
            <button type="button" className="smt-btn smt-btn-primary smt-back" onClick={desk.backToSearch}>
              <ArrowLeft className="size-3.5" strokeWidth={2} />
              Back To Search
            </button>
            <span className="smt-pill">
              <Trophy className="size-3" strokeWidth={2} />
              {seatMapEvent.name}
            </span>
            <span className="smt-pill">
              <CalendarDays className="size-3" strokeWidth={2} />
              {seatMapEvent.date}
            </span>
            <span className="smt-pill">
              <MapPin className="size-3" strokeWidth={2} />
              {seatMapEvent.venue}
            </span>
            <button type="button" className="smt-icon-btn smt-event-refresh" aria-label="Refresh event" onClick={desk.refresh}>
              <RefreshCw className="size-3.5" strokeWidth={2} />
            </button>
          </div>

          {desk.showFilters ? (
            <div className="smt-filters">
              <label>
                <span>Category</span>
                <select value={desk.category} onChange={(event) => desk.setCategory(event.target.value)}>
                  <option value="Any">Any</option>
                  {seatMapCategories.map((item) => (
                    <option key={item.id} value={item.id}>
                      {item.label}
                    </option>
                  ))}
                </select>
              </label>
              <label>
                <span>Quantity</span>
                <select
                  value={desk.quantity}
                  onChange={(event) => desk.setQuantity(event.target.value as (typeof seatMapQtyFilters)[number])}
                >
                  {seatMapQtyFilters.map((item) => (
                    <option key={item} value={item}>
                      {item}
                    </option>
                  ))}
                </select>
              </label>
              <label>
                <span>Ticket Type</span>
                <select
                  value={desk.ticketType}
                  onChange={(event) => desk.setTicketType(event.target.value as (typeof seatMapTicketTypes)[number])}
                >
                  {seatMapTicketTypes.map((item) => (
                    <option key={item} value={item}>
                      {item}
                    </option>
                  ))}
                </select>
              </label>
            </div>
          ) : null}

          <p className="smt-stats">
            <span>{desk.stats.listings} Listings</span>
            <span>{desk.stats.tickets} Tickets</span>
            <span>
              From <strong>{formatGbp(desk.stats.from)}</strong>
            </span>
          </p>

          <div className="smt-split" data-map={desk.showMap ? "true" : "false"}>
            {desk.showMap ? <VenueMapPanel desk={desk} /> : null}

            <section className="smt-list-card">
              <header className="smt-list-head">
                <div className="smt-list-title">
                  <Ticket className="size-4" strokeWidth={2} />
                  <h3>Available Ticket Listings</h3>
                  <span className="smt-count">{desk.stats.listings}</span>
                </div>
                <div className="smt-list-actions">
                  <button type="button" className="smt-icon-btn" aria-label="Refresh table" onClick={desk.refresh}>
                    <RefreshCw className="size-3.5" strokeWidth={2} />
                  </button>
                  <div className="smt-margin-wrap" ref={marginRef}>
                    <button
                      type="button"
                      className="smt-btn smt-btn-ghost"
                      aria-expanded={desk.marginOpen}
                      onClick={() => desk.setMarginOpen((value) => !value)}
                    >
                      % Margin
                    </button>
                    {desk.marginOpen ? (
                      <div className="smt-margin-pop" role="dialog" aria-label="Set Margin Percentage">
                        <p className="smt-margin-title">Set Margin Percentage</p>
                        <div className="smt-stepper">
                          <button
                            type="button"
                            aria-label="Decrease margin"
                            onClick={() => desk.setMarginDraft((value) => Math.max(0, value - 1))}
                          >
                            <Minus className="size-3.5" strokeWidth={2} />
                          </button>
                          <input
                            type="number"
                            min={0}
                            max={99}
                            value={desk.marginDraft}
                            onChange={(event) => desk.setMarginDraft(Math.min(99, Math.max(0, Number(event.target.value) || 0)))}
                            aria-label="Margin percent"
                          />
                          <button
                            type="button"
                            aria-label="Increase margin"
                            onClick={() => desk.setMarginDraft((value) => Math.min(99, value + 1))}
                          >
                            <Plus className="size-3.5" strokeWidth={2} />
                          </button>
                          <span>%</span>
                        </div>
                        <p className="smt-margin-note">Margin Will Be Added To The Ticket Price.</p>
                        <button
                          type="button"
                          className="smt-btn smt-btn-primary smt-apply"
                          disabled={desk.selectedCount === 0}
                          onClick={desk.applyMargin}
                        >
                          Apply
                        </button>
                      </div>
                    ) : null}
                  </div>
                  <button
                    type="button"
                    className="smt-btn smt-btn-solid"
                    disabled={desk.selectedCount === 0}
                    onClick={desk.quoteSelected}
                  >
                    Quote
                  </button>
                </div>
              </header>

              <div className="smt-table-wrap">
                <table className="smt-table">
                  <thead>
                    <tr>
                      <th>
                        <label className="smt-check">
                          <input
                            type="checkbox"
                            checked={allVisibleSelected}
                            onChange={desk.toggleAllVisible}
                            aria-label="Select all visible listings"
                          />
                          <i aria-hidden>
                            <Check className="size-3" strokeWidth={3} />
                          </i>
                        </label>
                      </th>
                      <th>Qty</th>
                      <th>Category</th>
                      <th>Section/Block</th>
                      <th>Row</th>
                      <th>Ticket Price</th>
                      <th>Margin Value</th>
                      <th>Ticket Details</th>
                      <th>Buy</th>
                    </tr>
                  </thead>
                  <tbody>
                    {desk.filtered.map((row) => {
                      const on = desk.selectedIds.includes(row.id);
                      const { ticketPrice, marginValue } = priced(row, desk.margins[row.id] ?? 0);
                      const fav = desk.favorites.includes(row.id);
                      return (
                        <tr key={row.id} data-selected={on ? "true" : "false"}>
                          <td>
                            <label className="smt-check">
                              <input
                                type="checkbox"
                                checked={on}
                                onChange={() => desk.toggleRow(row.id)}
                                aria-label={`Select ${categoryLabel(row.category)} listing`}
                              />
                              <i aria-hidden>
                                <Check className="size-3" strokeWidth={3} />
                              </i>
                            </label>
                          </td>
                          <td>{row.qty}</td>
                          <td>{categoryLabel(row.category)}</td>
                          <td>{row.section}</td>
                          <td>{row.row}</td>
                          <td className="smt-money">{formatGbp(ticketPrice)}</td>
                          <td className="smt-money">{formatGbp(marginValue)}</td>
                          <td>
                            <div className="smt-details">
                              <span title={row.mobile ? "Mobile ticket" : "Not mobile"} data-on={row.mobile ? "true" : "false"}>
                                <Smartphone className="size-3.5" strokeWidth={2} />
                              </span>
                              <span title={row.transfer ? "Transferable" : "No transfer"} data-on={row.transfer ? "true" : "false"}>
                                <Ticket className="size-3.5" strokeWidth={2} />
                              </span>
                              <span title={row.document ? "Document" : "No document"} data-on={row.document ? "true" : "false"}>
                                <FileText className="size-3.5" strokeWidth={2} />
                              </span>
                              <button
                                type="button"
                                className="smt-heart"
                                data-on={fav ? "true" : "false"}
                                aria-label={fav ? "Remove favourite" : "Save listing"}
                                onClick={() => desk.toggleFavorite(row.id)}
                              >
                                <Heart className="size-3.5" strokeWidth={2} />
                              </button>
                            </div>
                          </td>
                          <td>
                            <button type="button" className="smt-buy" onClick={() => desk.buyListing(row.id)}>
                              Buy
                            </button>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
              <p className="smt-loaded">{desk.stats.listings} Listings Loaded</p>
            </section>
          </div>

          {/* Always mounted so the desk height never changes as the pipeline loops.
              Legend sits on its own row under the actions — never in the same
              band as Copy / Download PDF. */}
          <div className="smt-desk-chrome">
            <div
              className="smt-share"
              role="group"
              aria-label="Quote share actions"
              data-idle={idle ? "true" : "false"}
            >
              <strong>{desk.selectedCount} Selected</strong>
              <button
                type="button"
                className="smt-btn smt-btn-ghost"
                data-copied={desk.copied === "copy" ? "true" : "false"}
                disabled={idle}
                onClick={desk.copyListings}
              >
                <Copy className="size-3.5" strokeWidth={2} />
                {desk.copied === "copy" ? "Copied" : "Copy"}
              </button>
              <button
                type="button"
                className="smt-btn smt-btn-ghost"
                data-copied={desk.copied === "map" ? "true" : "false"}
                disabled={idle}
                onClick={desk.copyMap}
              >
                <Map className="size-3.5" strokeWidth={2} />
                {desk.copied === "map" ? "Map Copied" : "Copy Map"}
              </button>
              <button type="button" className="smt-btn smt-btn-ghost" disabled={idle} onClick={desk.clearSelection}>
                <Trash2 className="size-3.5" strokeWidth={2} />
                Clear Selection
              </button>
              <button type="button" className="smt-btn smt-btn-solid" disabled={idle} onClick={desk.downloadPdf}>
                <Download className="size-3.5" strokeWidth={2} />
                Download PDF
              </button>
            </div>
            {desk.showMap ? <VenueLegend /> : null}
          </div>

          {desk.toast ? (
            <p
              className="smt-toast"
              data-kind={desk.toast.kind}
              role="status"
              /* Auto-run toasts must not spam assistive tech; only announce human actions. */
              aria-live={desk.pipeline.manual ? "polite" : "off"}
            >
              {desk.toast.message}
            </p>
          ) : null}
        </div>
      </ConsoleShell>
    </div>
  );
}
