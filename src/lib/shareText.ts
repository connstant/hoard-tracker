import type { Account } from "../types";
import { getBreedableDragons } from "./breeding";

const GENDER_LABEL: Record<string, string> = {
  male: "Male",
  female: "Female",
};

const PURITY_LABEL: Record<string, string> = {
  pure: "Pure",
  ultra: "Ultra",
};

// Plain-text breeding list, pulled straight from the account's stored
// dragons — one line per breedable dragon, meant to be pasted into
// Discord/etc. rather than rendered as an image.
export function buildBreedingShareText(account: Account): string {
  const header = `${account.name} — Available to Breed`;
  const entries = getBreedableDragons(account.dragons);

  if (entries.length === 0) {
    return `${header}\n\nNo dragons are currently available to breed.`;
  }

  const lines = entries.map(({ species, record }) => {
    const gender = GENDER_LABEL[record.gender] ?? record.gender;
    const purity = PURITY_LABEL[record.status];
    const dom = record.dom ? "Dom" : "Not dom";
    const skin = record.skin.trim() || "—";
    const mother = record.mother.trim() || "—";
    const father = record.father.trim() || "—";

    const parts = [
      `${species.name} (${species.type})`,
      `${gender}${purity ? `, ${purity}` : ""}`,
      skin,
    ];
    if (species.elders && record.eldering >= 100) parts.push("Eldered");
    parts.push(dom);
    parts.push(`Mother: ${mother}, Father: ${father}`);

    return parts.join(" — ");
  });

  return `${header}\n\n${lines.join("\n")}`;
}
