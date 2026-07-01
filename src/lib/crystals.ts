import type { CrystalColor } from "../types";

export interface CrystalStop {
  color: CrystalColor;
  label: string;
  range: string;
  min: number;
  max: number;
  hex: string;
}

// Percent ranges and crystal colors sampled directly from the Day of
// Dragons elder record sheet (pure, fully-saturated primaries/secondaries).
export const CRYSTAL_STOPS: CrystalStop[] = [
  { color: "green", label: "Green", range: "0-15%", min: 0, max: 15, hex: "#00ff00" },
  { color: "cyan", label: "Cyan", range: "15-30%", min: 15, max: 30, hex: "#00ffff" },
  { color: "blue", label: "Blue", range: "30-45%", min: 30, max: 45, hex: "#0000ff" },
  { color: "magenta", label: "Magenta", range: "45-60%", min: 45, max: 60, hex: "#ff00ff" },
  { color: "red", label: "Red", range: "60-75%", min: 60, max: 75, hex: "#ff0000" },
  { color: "yellow", label: "Yellow", range: "75-100%", min: 75, max: 100, hex: "#ffff00" },
];

export const CRYSTAL_HEX: Record<CrystalColor, string> = {
  none: "#4b5563",
  green: "#00ff00",
  cyan: "#00ffff",
  blue: "#0000ff",
  magenta: "#ff00ff",
  red: "#ff0000",
  yellow: "#ffff00",
};

export function crystalForPercent(percent: number): CrystalColor {
  const stop = CRYSTAL_STOPS.find((s) =>
    percent >= s.max ? false : percent >= s.min
  );
  if (percent >= 100) return "yellow";
  return stop ? stop.color : "green";
}
