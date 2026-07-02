import { CRYSTAL_STOPS } from "../lib/crystals";

export default function CrystalLegend() {
  return (
    <div className="rounded-xl border border-slate-300 bg-white p-5 dark:border-slate-700/60 dark:bg-slate-900">
      <h2 className="mb-4 text-center text-sm font-semibold text-slate-700 dark:text-slate-200">
        Crystal Legend
      </h2>
      <div className="flex flex-wrap justify-between gap-x-10 gap-y-6">
        {CRYSTAL_STOPS.map((stop) => (
          <div key={stop.color} className="flex items-center gap-3">
            <span
              className="h-10 w-10 shrink-0 rounded-lg"
              style={{ backgroundColor: stop.hex }}
            />
            <div className="leading-tight">
              <p className="text-xs text-slate-500 dark:text-slate-400">{stop.range}</p>
              <p className="text-sm font-medium text-slate-700 dark:text-slate-200">
                {stop.label}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
