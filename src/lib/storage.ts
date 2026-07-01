import type { AppState, DragonRecord, HoardState } from "../types";
import { SPECIES } from "../data/species";

const STORAGE_KEY = "dod-hoard-tracker";

export function emptyDragonRecord(): DragonRecord {
  return {
    owned: false,
    dom: false,
    gender: "unset",
    status: "none",
    eldering: 0,
    skin: "",
    notes: "",
    mother: "",
    father: "",
    maternalGrandmother: "",
    maternalGrandfather: "",
    paternalGrandmother: "",
    paternalGrandfather: "",
  };
}

export function emptyHoard(): HoardState {
  const hoard: HoardState = {};
  for (const species of SPECIES) {
    hoard[species.id] = emptyDragonRecord();
  }
  return hoard;
}

export function defaultState(): AppState {
  const id = crypto.randomUUID();
  return {
    accounts: [{ id, name: "Main Account", dragons: emptyHoard() }],
    activeAccountId: id,
  };
}

// Fills in any species or fields missing from a saved/imported hoard, so
// roster additions or new tracked fields never break older saves.
function normalizeState(parsed: AppState): AppState {
  for (const account of parsed.accounts) {
    for (const species of SPECIES) {
      account.dragons[species.id] = {
        ...emptyDragonRecord(),
        ...account.dragons[species.id],
      };
    }
  }
  return parsed;
}

export function loadState(): AppState {
  const raw = localStorage.getItem(STORAGE_KEY);
  if (!raw) return defaultState();
  try {
    const parsed = JSON.parse(raw) as AppState;
    if (!parsed.accounts || parsed.accounts.length === 0) return defaultState();
    return normalizeState(parsed);
  } catch {
    return defaultState();
  }
}

export function saveState(state: AppState) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}

export function exportState(state: AppState) {
  const blob = new Blob([JSON.stringify(state, null, 2)], {
    type: "application/json",
  });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "dragon-hoard-tracker.json";
  a.click();
  URL.revokeObjectURL(url);
}

export function importState(file: File): Promise<AppState> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      try {
        const parsed = JSON.parse(reader.result as string) as AppState;
        if (!parsed.accounts || parsed.accounts.length === 0) {
          throw new Error("Invalid hoard file");
        }
        resolve(normalizeState(parsed));
      } catch (err) {
        reject(err);
      }
    };
    reader.onerror = () => reject(reader.error);
    reader.readAsText(file);
  });
}
