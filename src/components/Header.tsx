import { useRef } from "react";

interface HeaderProps {
  onExport: () => void;
  onImport: (file: File) => void;
}

export default function Header({ onExport, onImport }: HeaderProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);

  return (
    <header className="flex flex-wrap items-start justify-between gap-4">
      <div>
        <h1 className="text-2xl font-bold text-white sm:text-3xl">
          Dragon Hoard Tracker
        </h1>
        <p className="mt-1 text-sm text-slate-400">
          Day of Dragons eldering tracker · saved locally to your browser
        </p>
      </div>
      <div className="flex gap-2">
        <input
          ref={fileInputRef}
          type="file"
          accept="application/json"
          className="hidden"
          onChange={(e) => {
            const file = e.target.files?.[0];
            if (file) onImport(file);
            e.target.value = "";
          }}
        />
        <button
          onClick={() => fileInputRef.current?.click()}
          className="rounded-lg border border-slate-700/60 bg-slate-800/50 px-4 py-2 text-sm font-medium text-slate-200 transition hover:bg-slate-700/60"
        >
          Import
        </button>
        <button
          onClick={onExport}
          className="rounded-lg border border-slate-700/60 bg-slate-800/50 px-4 py-2 text-sm font-medium text-slate-200 transition hover:bg-slate-700/60"
        >
          Export
        </button>
      </div>
    </header>
  );
}
