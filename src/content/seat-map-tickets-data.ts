/** Demo inventory for the homepage Seat Map & Tickets desk (TravelTools). £ prices. */

export const seatMapEvent = {
  name: "Manchester City vs Liverpool",
  date: "Sat, 8 May 2027 · 15:00",
  venue: "Etihad, Manchester, United Kingdom",
} as const;

export const seatMapCategories = [
  { id: "vip", label: "VIP & Hospitality", color: "#d4a017" },
  { id: "ssu", label: "Shortside Upper Tier", color: "#2f9d63" },
  { id: "lsu", label: "Longside Upper Tier", color: "#e08aa4" },
  { id: "ssl", label: "Shortside Lower Tier", color: "#e08a3d" },
  { id: "lsl", label: "Longside Lower Tier", color: "#4d8fd1" },
  { id: "club", label: "Club Level", color: "#1f8a7a" },
] as const;

export type SeatMapCategoryId = (typeof seatMapCategories)[number]["id"];

export type SeatMapBlock = {
  id: string;
  category: SeatMapCategoryId;
  x: number;
  y: number;
  w: number;
  h: number;
};

/** Bowl blocks around a centre pitch — Etihad-style schematic. */
export const seatMapBlocks: SeatMapBlock[] = [
  { id: "n-u-1", category: "ssu", x: 118, y: 18, w: 52, h: 22 },
  { id: "n-u-2", category: "ssu", x: 174, y: 14, w: 52, h: 22 },
  { id: "n-u-3", category: "ssu", x: 230, y: 18, w: 52, h: 22 },
  { id: "n-l-1", category: "ssl", x: 128, y: 46, w: 46, h: 20 },
  { id: "n-l-2", category: "ssl", x: 178, y: 42, w: 44, h: 20 },
  { id: "n-l-3", category: "ssl", x: 226, y: 46, w: 46, h: 20 },
  { id: "s-u-1", category: "ssu", x: 118, y: 260, w: 52, h: 22 },
  { id: "s-u-2", category: "ssu", x: 174, y: 264, w: 52, h: 22 },
  { id: "s-u-3", category: "ssu", x: 230, y: 260, w: 52, h: 22 },
  { id: "s-l-1", category: "ssl", x: 128, y: 234, w: 46, h: 20 },
  { id: "s-l-2", category: "ssl", x: 178, y: 238, w: 44, h: 20 },
  { id: "s-l-3", category: "ssl", x: 226, y: 234, w: 46, h: 20 },
  { id: "w-u-1", category: "lsu", x: 16, y: 78, w: 28, h: 42 },
  { id: "w-u-2", category: "lsu", x: 12, y: 128, w: 28, h: 44 },
  { id: "w-u-3", category: "lsu", x: 16, y: 180, w: 28, h: 42 },
  { id: "w-l-1", category: "lsl", x: 50, y: 88, w: 24, h: 36 },
  { id: "w-l-2", category: "lsl", x: 48, y: 132, w: 24, h: 36 },
  { id: "w-l-3", category: "lsl", x: 50, y: 176, w: 24, h: 36 },
  { id: "e-u-1", category: "lsu", x: 356, y: 78, w: 28, h: 42 },
  { id: "e-u-2", category: "lsu", x: 360, y: 128, w: 28, h: 44 },
  { id: "e-u-3", category: "lsu", x: 356, y: 180, w: 28, h: 42 },
  { id: "e-l-1", category: "lsl", x: 326, y: 88, w: 24, h: 36 },
  { id: "e-l-2", category: "lsl", x: 328, y: 132, w: 24, h: 36 },
  { id: "e-l-3", category: "lsl", x: 326, y: 176, w: 24, h: 36 },
  { id: "nw-vip", category: "vip", x: 50, y: 42, w: 36, h: 28 },
  { id: "ne-vip", category: "vip", x: 314, y: 42, w: 36, h: 28 },
  { id: "sw-vip", category: "vip", x: 50, y: 230, w: 36, h: 28 },
  { id: "se-vip", category: "vip", x: 314, y: 230, w: 36, h: 28 },
  { id: "w-club", category: "club", x: 78, y: 118, w: 22, h: 64 },
  { id: "e-club", category: "club", x: 300, y: 118, w: 22, h: 64 },
];

export type SeatListing = {
  id: string;
  qty: number;
  category: SeatMapCategoryId;
  section: string;
  row: string;
  basePrice: number;
  ticketType: "E-ticket" | "Mobile transfer" | "Paper";
  mobile: boolean;
  transfer: boolean;
  document: boolean;
  mapId: string;
};

export const seatMapListings: SeatListing[] = [
  { id: "L-1001", qty: 4, category: "ssu", section: "N/A", row: "—", basePrice: 219.11, ticketType: "E-ticket", mobile: true, transfer: true, document: false, mapId: "n-u-2" },
  { id: "L-1002", qty: 6, category: "lsu", section: "N/A", row: "—", basePrice: 294.24, ticketType: "E-ticket", mobile: true, transfer: true, document: true, mapId: "w-u-2" },
  { id: "L-1003", qty: 2, category: "lsu", section: "N/A", row: "—", basePrice: 310.73, ticketType: "Mobile transfer", mobile: true, transfer: true, document: false, mapId: "e-u-2" },
  { id: "L-1004", qty: 8, category: "ssl", section: "Block 116", row: "12", basePrice: 268.4, ticketType: "E-ticket", mobile: true, transfer: false, document: true, mapId: "n-l-2" },
  { id: "L-1005", qty: 4, category: "lsl", section: "Block 204", row: "8", basePrice: 342.0, ticketType: "Paper", mobile: false, transfer: false, document: true, mapId: "w-l-2" },
  { id: "L-1006", qty: 2, category: "vip", section: "Hospitality", row: "1", basePrice: 890.0, ticketType: "Mobile transfer", mobile: true, transfer: true, document: true, mapId: "nw-vip" },
  { id: "L-1007", qty: 3, category: "club", section: "Club W", row: "4", basePrice: 486.5, ticketType: "E-ticket", mobile: true, transfer: true, document: false, mapId: "w-club" },
  { id: "L-1008", qty: 6, category: "ssu", section: "N/A", row: "—", basePrice: 226.8, ticketType: "E-ticket", mobile: true, transfer: true, document: false, mapId: "s-u-2" },
  { id: "L-1009", qty: 4, category: "lsl", section: "Block 218", row: "15", basePrice: 331.25, ticketType: "Mobile transfer", mobile: true, transfer: true, document: false, mapId: "e-l-2" },
  { id: "L-1010", qty: 2, category: "vip", section: "Lounge", row: "2", basePrice: 940.0, ticketType: "Paper", mobile: false, transfer: false, document: true, mapId: "se-vip" },
];

export const seatMapTicketTypes = ["Any", "E-ticket", "Mobile transfer", "Paper"] as const;
export const seatMapQtyFilters = ["Any", "2+", "4+", "6+"] as const;
