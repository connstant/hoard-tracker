import type { DragonRecord, Species } from "../types";

interface FamilyTreeProps {
  species: Species;
  record: DragonRecord;
  onChange: (patch: Partial<DragonRecord>) => void;
}

// Two columns (maternal / paternal) merging down through parents into the
// dragon itself. Only ever needs two columns of width, so it keeps working
// even in the narrow column notes-on-the-side leaves for everything else.
export default function FamilyTree({
  species,
  record,
  onChange,
}: FamilyTreeProps) {
  return (
    <div>
      <p className="mb-1.5 text-xs text-slate-600 dark:text-slate-300">Family Tree</p>
      <div className="flex flex-col items-center gap-1.5 rounded-lg border border-slate-300 bg-slate-100/60 p-2.5 dark:border-slate-700/60 dark:bg-slate-950/30">
        <div className="grid w-full grid-cols-2 gap-3">
          <Side label="Paternal">
            <TreeNode
              label="Grandmother"
              value={record.paternalGrandmother}
              onChange={(v) => onChange({ paternalGrandmother: v })}
            />
            <TreeNode
              label="Grandfather"
              value={record.paternalGrandfather}
              onChange={(v) => onChange({ paternalGrandfather: v })}
            />
          </Side>
          <Side label="Maternal">
            <TreeNode
              label="Grandmother"
              value={record.maternalGrandmother}
              onChange={(v) => onChange({ maternalGrandmother: v })}
            />
            <TreeNode
              label="Grandfather"
              value={record.maternalGrandfather}
              onChange={(v) => onChange({ maternalGrandfather: v })}
            />
          </Side>
        </div>

        <ParallelDrop />

        <div className="grid w-full grid-cols-2 gap-3">
          <TreeNode
            label="Father"
            value={record.father}
            onChange={(v) => onChange({ father: v })}
            emphasize
          />
          <TreeNode
            label="Mother"
            value={record.mother}
            onChange={(v) => onChange({ mother: v })}
            emphasize
          />
        </div>

        <MergeDrop />

        <CenterBadge species={species} />
      </div>
    </div>
  );
}

function Side({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-1">
      <p className="text-center text-[9px] font-medium uppercase tracking-wide text-slate-600 dark:text-slate-300">
        {label}
      </p>
      {children}
    </div>
  );
}

// Each column just continues straight down into its own parent below.
function ParallelDrop() {
  return (
    <div className="relative h-3 w-full">
      <div className="absolute left-1/4 top-0 h-full w-px -translate-x-1/2 bg-slate-400 dark:bg-slate-600" />
      <div className="absolute left-3/4 top-0 h-full w-px -translate-x-1/2 bg-slate-400 dark:bg-slate-600" />
    </div>
  );
}

// The two parent columns actually merge into one line here, down to the dragon.
function MergeDrop() {
  return (
    <div className="relative h-3 w-full">
      <div className="absolute left-1/4 right-1/4 top-0 h-px bg-slate-400 dark:bg-slate-600" />
      <div className="absolute left-1/2 top-0 h-full w-px -translate-x-1/2 bg-slate-400 dark:bg-slate-600" />
    </div>
  );
}

function CenterBadge({ species }: { species: Species }) {
  return (
    <div
      className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border text-[10px] font-bold"
      style={{
        color: species.color,
        borderColor: `${species.color}66`,
        backgroundColor: `${species.color}1a`,
      }}
      title={species.name}
    >
      {species.abbr || "—"}
    </div>
  );
}

function TreeNode({
  label,
  value,
  onChange,
  emphasize,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  emphasize?: boolean;
}) {
  return (
    <div className="flex min-w-0 flex-col gap-0.5">
      <span
        className={`truncate text-[9px] uppercase tracking-wide ${
          emphasize
            ? "font-medium text-slate-700 dark:text-slate-200"
            : "text-slate-600 dark:text-slate-300"
        }`}
      >
        {label}
      </span>
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="—"
        className="w-full min-w-0 rounded border border-slate-300 bg-white px-1.5 py-1 text-xs text-slate-700 outline-none placeholder:text-slate-400 dark:border-slate-700/60 dark:bg-slate-950/60 dark:text-slate-200 dark:placeholder:text-slate-600"
      />
    </div>
  );
}
