import type { DragonRecord, HoardState, Species } from "../types";
import { SPECIES } from "../data/species";

// A dragon counts as available to breed once its gender has been set.
// Every untouched species defaults to gender: "unset" (see
// emptyDragonRecord in lib/storage.ts), so a non-"unset" gender doubles as
// the signal that this is a real, tracked dragon.
//
// Intentionally simple: it ignores purity and eldering %, which the game's
// real breeding requirements may also gate on. Tune this one function if
// that turns out not to match — nothing else should need to change.
export function isAvailableToBreed(dragon: DragonRecord): boolean {
  return dragon.gender !== "unset";
}

export interface BreedableEntry {
  species: Species;
  record: DragonRecord;
}

export function getBreedableDragons(hoard: HoardState): BreedableEntry[] {
  return SPECIES.filter((species) => isAvailableToBreed(hoard[species.id])).map(
    (species) => ({ species, record: hoard[species.id] })
  );
}
