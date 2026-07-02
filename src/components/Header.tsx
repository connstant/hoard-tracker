import { useRef } from "react";
import type { Theme } from "../lib/theme";

interface HeaderProps {
  theme: Theme;
  onToggleTheme: () => void;
  onExport: () => void;
  onImport: (file: File) => void;
}

export default function Header({
  theme,
  onToggleTheme,
  onExport,
  onImport,
}: HeaderProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);

  return (
    <header className="flex flex-wrap items-start justify-between gap-4">
      <div>
        <h1 className="text-2xl font-bold text-slate-900 sm:text-3xl dark:text-white">
          Dragon Hoard Tracker
        </h1>
        <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
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
          onClick={onToggleTheme}
          aria-label="Toggle light mode"
          title={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
          className="rounded-lg border border-slate-300 bg-slate-100 px-4 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-200 dark:border-slate-700/60 dark:bg-slate-800/50 dark:text-slate-200 dark:hover:bg-slate-700/60"
        >
          {theme === "dark" ? "Light mode" : "Dark mode"}
        </button>
        <button
          onClick={() => fileInputRef.current?.click()}
          className="rounded-lg border border-slate-300 bg-slate-100 px-4 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-200 dark:border-slate-700/60 dark:bg-slate-800/50 dark:text-slate-200 dark:hover:bg-slate-700/60"
        >
          Import
        </button>
        <button
          onClick={onExport}
          className="rounded-lg border border-slate-300 bg-slate-100 px-4 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-200 dark:border-slate-700/60 dark:bg-slate-800/50 dark:text-slate-200 dark:hover:bg-slate-700/60"
        >
          Export
        </button>
      </div>
    </header>
  );
}
