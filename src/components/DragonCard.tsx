import { useState } from "react";
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

  // While the user is typing, the input shows its own raw text so a leading
  // "0" can be stripped as soon as another digit follows it instead of
  // fighting the number input's value-vs-display quirks. Once the field
  // blurs, it falls back to the clamped numeric value from the record.
  const [eldFocused, setEldFocused] = useState(false);
  const [eldText, setEldText] = useState(String(record.eldering));

  return (
    <div className="@container">
      <div
        className={`flex flex-col gap-3 rounded-xl border bg-white p-3 transition @xl:flex-row dark:bg-slate-900 ${
          record.owned
            ? "border-slate-400 dark:border-slate-600/60"
            : "border-slate-200 opacity-70 dark:border-slate-800/60"
        }`}
      >
        <div className="flex flex-col gap-3 @xl:w-[45%]">
          <div className="flex items-start justify-between gap-2">
            <div className="flex items-center gap-3">
              <div
                className="flex h-10 w-14 shrink-0 items-center justify-center rounded-lg border bg-slate-100 text-sm font-bold dark:bg-slate-950/60"
                style={{
                  color: species.color,
                  borderColor: `${species.color}66`,
                  backgroundColor: `${species.color}1a`,
                }}
              >
                {species.abbr || "—"}
              </div>
              <div>
                <p className="font-semibold leading-tight text-slate-900 dark:text-white">
                  {species.name}
                </p>
                <p className="text-xs text-slate-500">{species.type}</p>
              </div>
            </div>
            <div className="flex items-center gap-3 text-xs text-slate-500 dark:text-slate-400">
              <label className="flex cursor-pointer items-center gap-1.5">
                <input
                  type="checkbox"
                  checked={record.owned}
                  onChange={(e) => onChange({ owned: e.target.checked })}
                  className="h-4 w-4 rounded border-slate-400 bg-slate-100 accent-slate-700 dark:border-slate-600/60 dark:bg-slate-950/60 dark:accent-white"
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
                  className="h-4 w-4 rounded border-slate-400 bg-slate-100 accent-slate-700 dark:border-slate-600/60 dark:bg-slate-950/60 dark:accent-white"
                />
                Dom
              </label>
            </div>
          </div>

          {!species.elders && (
            <span className="w-fit rounded-full border border-slate-400/40 bg-slate-400/10 px-2 py-0.5 text-[11px] font-medium text-slate-500 dark:border-slate-500/40 dark:bg-slate-500/10 dark:text-slate-400">
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
            <div className="mb-1.5 flex items-center justify-between text-xs text-slate-600 dark:text-slate-300">
              <span>Eldering</span>
              {species.elders && (
                <span className="flex items-center gap-1.5">
                  <span
                    className="h-4 w-4 rounded-sm"
                    style={{ backgroundColor: crystalHex }}
                  />
                  <input
                    type="text"
                    inputMode="decimal"
                    value={eldFocused ? eldText : String(record.eldering)}
                    onFocus={() => {
                      setEldFocused(true);
                      setEldText(String(record.eldering));
                    }}
                    onChange={(e) => {
                      const raw = e.target.value;
                      if (!/^\d*\.?\d*$/.test(raw)) return;
                      const stripped = raw.replace(/^0+(?=\d)/, "");
                      setEldText(stripped);
                      const num = Number(stripped);
                      if (stripped !== "" && stripped !== "." && !Number.isNaN(num)) {
                        onChange({ eldering: clamp(num, 0, 100) });
                      }
                    }}
                    onBlur={() => setEldFocused(false)}
                    className="w-20 rounded border border-slate-300 bg-white px-1.5 py-0.5 text-right text-xs text-slate-900 outline-none dark:border-slate-700/60 dark:bg-slate-950/60 dark:text-white"
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
                  background: `linear-gradient(to right, var(--range-fill) ${record.eldering}%, var(--range-track) ${record.eldering}%)`,
                }}
              />
            ) : (
              <p className="rounded border border-dashed border-slate-300 px-2 py-1.5 text-center text-xs text-slate-500 dark:border-slate-700/60">
                Eldering not applicable
              </p>
            )}
          </div>

          <div>
            <p className="mb-1.5 text-xs text-slate-600 dark:text-slate-300">Skin</p>
            <input
              type="text"
              value={record.skin}
              onChange={(e) => onChange({ skin: e.target.value })}
              placeholder="e.g. Obsidian, Marble, Custom..."
              className="w-full rounded-lg border border-slate-300 bg-white px-2 py-1.5 text-xs text-slate-700 outline-none placeholder:text-slate-400 dark:border-slate-700/60 dark:bg-slate-950/60 dark:text-slate-200 dark:placeholder:text-slate-600"
            />
          </div>

          <FamilyTree species={species} record={record} onChange={onChange} />
        </div>

        <div className="flex flex-col @xl:w-[55%]">
          <p className="mb-1.5 text-xs text-slate-500 dark:text-slate-400">Notes</p>
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
    <div className="flex overflow-hidden rounded-lg border border-slate-300 dark:border-slate-700/60">
      {options.map((opt) => {
        const active = value === opt.value;
        return (
          <button
            key={opt.value}
            onClick={() => onChange(active && allowDeselect ? null : opt.value)}
            className={`flex-1 px-2 py-1.5 text-xs font-medium transition ${
              active
                ? "bg-slate-800 text-white dark:bg-white dark:text-slate-900"
                : "bg-transparent text-slate-600 hover:text-slate-900 dark:text-slate-300 dark:hover:text-white"
            }`}
          >
            {opt.label}
          </button>
        );
      })}
    </div>
  );
}
