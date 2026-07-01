import type { Species } from "../types";

// The full roster of currently playable/trackable Day of Dragons species.
// Preloaded so hoards never need dragons added one by one.
// Identity colors matched to each species' box on the Day of Dragons elder
// record sheet (references/elder colors.png) — separate from the crystal
// colors, which track eldering percent instead of species identity.
export const SPECIES: Species[] = [
  { id: "fs", abbr: "FS", name: "Flame Stalker", type: "Dragon", elders: true, color: "#ff0000" },
  { id: "ss", abbr: "SS", name: "Shadow Scale", type: "Dragon", elders: true, color: "#0000ff" },
  { id: "asd", abbr: "ASD", name: "Acid Spitter", type: "Drake", elders: true, color: "#00ff00" },
  { id: "ir", abbr: "IR", name: "Inferno Ravager", type: "Wyvern", elders: true, color: "#ff0000" },
  { id: "bio", abbr: "", name: "Biolumin", type: "Dragon", elders: false, color: "#94a3b8" },
  { id: "bs", abbr: "BS", name: "Blitz Striker", type: "Amphithere", elders: true, color: "#ff00ff" },
  { id: "bw", abbr: "BW", name: "Brood Watcher", type: "Dragon", elders: true, color: "#ffffff" },
];
