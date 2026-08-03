export type SpeciesType =
  | "Dragon"
  | "Drake"
  | "Wyvern"
  | "Amphithere"
  | "Elemental";

export type Gender = "unset" | "male" | "female";

export type PurityStatus = "none" | "pure" | "ultra";

export type CrystalColor =
  | "none"
  | "green"
  | "cyan"
  | "blue"
  | "magenta"
  | "red"
  | "yellow";

export interface Species {
  id: string;
  abbr: string;
  name: string;
  type: SpeciesType;
  elders: boolean;
  color: string;
  // Average number of ticks (progress gained from any source: login,
  // crystal, etc.) to go from 0% to 100% eldering, per
  // https://tinyurl.com/DoD-Eldering. Omitted for species that don't elder.
  ticksToElder?: number;
}

export interface DragonRecord {
  dom: boolean;
  gender: Gender;
  status: PurityStatus;
  eldering: number;
  skin: string;
  notes: string;
  mother: string;
  father: string;
  maternalGrandmother: string;
  maternalGrandfather: string;
  paternalGrandmother: string;
  paternalGrandfather: string;
}

export type HoardState = Record<string, DragonRecord>;

export interface Account {
  id: string;
  name: string;
  dragons: HoardState;
}

export interface AppState {
  accounts: Account[];
  activeAccountId: string;
}
