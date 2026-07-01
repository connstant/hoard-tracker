import { SPECIES } from "../data/species";
import type { DragonRecord, HoardState } from "../types";
import DragonCard from "./DragonCard";

interface DragonGridProps {
  dragons: HoardState;
  onChange: (speciesId: string, patch: Partial<DragonRecord>) => void;
}

export default function DragonGrid({ dragons, onChange }: DragonGridProps) {
  return (
    <div className="grid grid-cols-1 gap-3 lg:grid-cols-2">
      {SPECIES.map((species) => (
        <DragonCard
          key={species.id}
          species={species}
          record={dragons[species.id]}
          onChange={(patch) => onChange(species.id, patch)}
        />
      ))}
    </div>
  );
}
