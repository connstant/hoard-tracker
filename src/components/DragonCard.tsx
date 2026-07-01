import type { DragonRecord, Gender, PurityStatus, Species } from "../types";
import { CRYSTAL_HEX, crystalForPercent } from "../lib/crystals";
import FamilyTree from "./FamilyTree";
import RichTextEditor from "./RichTextEditor";

interface DragonCardProps {
  species: Species;
  record: DragonRecord;
  onChange: (patch: Partial<DragonRecord>) => void;
}

const GENDERS: { value: Gender; label: string }[] = [
  { value: "male", label: "Male" },
  { value: "female", label: "Female" },
];

const STATUSES: { value: PurityStatus; label: string }[] = [
  { value: "none", label: "None" },
  { value: "pure", label: "Pure" },
  { value: "ultra", label: "Ultra" },
];

export default function DragonCard({
  species,
  record,
  onChange,
}: DragonCardProps) {
  // The night crystal color is just the eldering percent shown a different
  // way, so it's always derived from that single tracked value.
  const crystalHex = species.elders
    ? CRYSTAL_HEX[crystalForPercent(record.eldering)]
    : undefined;

  return (
    <div className="@container">
      <div
        className={`flex flex-col gap-3 rounded-xl border bg-slate-900 p-3 transition @xl:flex-row ${
          record.owned
            ? "border-slate-600/60"
            : "border-slate-800/60 opacity-70"
        }`}
      >
        <div className="flex flex-col gap-3 @xl:w-[45%]">
          <div className="flex items-start justify-between gap-2">
            <div className="flex items-center gap-3">
              <div
                className="flex h-10 w-14 shrink-0 items-center justify-center rounded-lg border bg-slate-950/60 text-sm font-bold"
                style={{
                  color: species.color,
                  borderColor: `${species.color}66`,
                  backgroundColor: `${species.color}1a`,
                }}
              >
                {species.abbr || "—"}
              </div>
              <div>
                <p className="font-semibold leading-tight text-white">
                  {species.name}
                </p>
                <p className="text-xs text-slate-500">{species.type}</p>
              </div>
            </div>
            <div className="flex items-center gap-3 text-xs text-slate-400">
              <label className="flex cursor-pointer items-center gap-1.5">
                <input
                  type="checkbox"
                  checked={record.owned}
                  onChange={(e) => onChange({ owned: e.target.checked })}
                  className="h-4 w-4 rounded border-slate-600/60 bg-slate-950/60 accent-white"
                />
                Owned
              </label>
              <label
                className="flex cursor-pointer items-center gap-1.5"
                title="Dom talent spec"
              >
                <input
                  type="checkbox"
                  checked={record.dom}
                  onChange={(e) => onChange({ dom: e.target.checked })}
                  className="h-4 w-4 rounded border-slate-600/60 bg-slate-950/60 accent-white"
                />
                Dom
              </label>
            </div>
          </div>

          {!species.elders && (
            <span className="w-fit rounded-full border border-slate-500/40 bg-slate-500/10 px-2 py-0.5 text-[11px] font-medium text-slate-400">
              Doesn't elder
            </span>
          )}

          <Segmented
            options={GENDERS}
            value={record.gender === "unset" ? null : record.gender}
            onChange={(v) => onChange({ gender: (v as Gender) ?? "unset" })}
          />

          <Segmented
            options={STATUSES}
            value={record.status}
            allowDeselect={false}
            onChange={(v) =>
              onChange({ status: (v as PurityStatus) ?? "none" })
            }
          />

          <div>
            <div className="mb-1.5 flex items-center justify-between text-xs text-slate-300">
              <span>Eldering</span>
              {species.elders && (
                <span className="flex items-center gap-1.5">
                  <span
                    className="h-4 w-4 rounded-sm"
                    style={{ backgroundColor: crystalHex }}
                  />
                  <input
                    type="number"
                    min={0}
                    max={100}
                    value={record.eldering}
                    onChange={(e) =>
                      onChange({
                        eldering: clamp(Number(e.target.value) || 0, 0, 100),
                      })
                    }
                    className="w-14 rounded border border-slate-700/60 bg-slate-950/60 px-1.5 py-0.5 text-right text-xs text-white outline-none"
                  />
                  %
                </span>
              )}
            </div>
            {species.elders ? (
              <input
                type="range"
                min={0}
                max={100}
                value={record.eldering}
                onChange={(e) => onChange({ eldering: Number(e.target.value) })}
                className="w-full"
                style={{
                  background: `linear-gradient(to right, #e5e7eb ${record.eldering}%, #1e293b ${record.eldering}%)`,
                }}
              />
            ) : (
              <p className="rounded border border-dashed border-slate-700/60 px-2 py-1.5 text-center text-xs text-slate-500">
                Eldering not applicable
              </p>
            )}
          </div>

          <div>
            <p className="mb-1.5 text-xs text-slate-300">Skin</p>
            <input
              type="text"
              value={record.skin}
              onChange={(e) => onChange({ skin: e.target.value })}
              placeholder="e.g. Obsidian, Marble, Custom..."
              className="w-full rounded-lg border border-slate-700/60 bg-slate-950/60 px-2 py-1.5 text-xs text-slate-200 outline-none placeholder:text-slate-600"
            />
          </div>

          <FamilyTree species={species} record={record} onChange={onChange} />
        </div>

        <div className="flex flex-col @xl:w-[55%]">
          <p className="mb-1.5 text-xs text-slate-400">Notes</p>
          <RichTextEditor
            value={record.notes}
            onChange={(html) => onChange({ notes: html })}
            placeholder="Breeding plans, skin combos, reminders, etc..."
            className="flex flex-1 flex-col"
          />
        </div>
      </div>
    </div>
  );
}

function clamp(value: number, min: number, max: number) {
  return Math.min(max, Math.max(min, value));
}

function Segmented<T extends string>({
  options,
  value,
  onChange,
  allowDeselect = true,
}: {
  options: { value: T; label: string }[];
  value: T | null;
  onChange: (value: T | null) => void;
  allowDeselect?: boolean;
}) {
  return (
    <div className="flex overflow-hidden rounded-lg border border-slate-700/60">
      {options.map((opt) => {
        const active = value === opt.value;
        return (
          <button
            key={opt.value}
            onClick={() => onChange(active && allowDeselect ? null : opt.value)}
            className={`flex-1 px-2 py-1.5 text-xs font-medium transition ${
              active
                ? "bg-white text-slate-900"
                : "bg-transparent text-slate-300 hover:text-white"
            }`}
          >
            {opt.label}
          </button>
        );
      })}
    </div>
  );
}
