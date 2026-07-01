import { CHANGELOG } from "../data/changelog";

export default function Footer() {
  return (
    <footer className="flex flex-col gap-4">
      <div className="rounded-xl border border-slate-700/60 bg-slate-900 p-5">
        <h2 className="mb-4 text-sm font-semibold text-slate-200">
          Changelog
        </h2>
        <div className="flex flex-col gap-4">
          {CHANGELOG.map((entry) => (
            <div key={entry.version}>
              <div className="flex items-baseline gap-2">
                <span className="text-sm font-medium text-slate-200">
                  v{entry.version}
                </span>
                <span className="text-xs text-slate-500">{entry.date}</span>
              </div>
              <ul className="mt-1.5 list-disc space-y-1 pl-5 text-xs text-slate-400">
                {entry.changes.map((change) => (
                  <li key={change}>{change}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
      <p className="pb-2 text-center text-xs text-slate-600">
        © {new Date().getFullYear()} KDD
      </p>
    </footer>
  );
}
