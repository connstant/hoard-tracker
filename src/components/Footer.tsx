import { useState } from "react";
import { CHANGELOG } from "../data/changelog";

export default function Footer() {
  const [expanded, setExpanded] = useState(false);

  return (
    <footer className="flex flex-col gap-4">
      <div className="rounded-xl border border-slate-300 bg-white p-5 dark:border-slate-700/60 dark:bg-slate-900">
        <button
          onClick={() => setExpanded((prev) => !prev)}
          aria-expanded={expanded}
          className="flex w-full items-center justify-between text-sm font-semibold text-slate-700 dark:text-slate-200"
        >
          Changelog
          <span className="text-xs font-medium text-slate-500 dark:text-slate-400">
            {expanded ? "Hide" : "View Changelog"}
          </span>
        </button>
        {expanded && (
          <div className="mt-4 flex flex-col gap-4">
            {CHANGELOG.map((entry) => (
              <div key={entry.version}>
                <div className="flex items-baseline gap-2">
                  <span className="text-sm font-medium text-slate-700 dark:text-slate-200">
                    v{entry.version}
                  </span>
                  <span className="text-xs text-slate-500">{entry.date}</span>
                </div>
                <ul className="mt-1.5 list-disc space-y-1 pl-5 text-xs text-slate-500 dark:text-slate-400">
                  {entry.changes.map((change) => (
                    <li key={change}>{change}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        )}
      </div>
      <p className="pb-2 text-center text-xs text-slate-400 dark:text-slate-600">
        © {new Date().getFullYear()} KDD
      </p>
    </footer>
  );
}
