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
}

export interface DragonRecord {
  owned: boolean;
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
