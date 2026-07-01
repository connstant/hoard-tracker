import { CRYSTAL_STOPS } from "../lib/crystals";

export default function CrystalLegend() {
  return (
    <div className="rounded-xl border border-slate-700/60 bg-slate-900 p-5">
      <h2 className="mb-4 text-center text-sm font-semibold text-slate-200">
        Crystal Legend
      </h2>
      <div className="flex flex-wrap justify-center gap-6">
        {CRYSTAL_STOPS.map((stop) => (
          <div key={stop.color} className="flex items-center gap-3">
            <span
              className="h-10 w-10 shrink-0 rounded-lg"
              style={{ backgroundColor: stop.hex }}
            />
            <div className="leading-tight">
              <p className="text-xs text-slate-400">{stop.range}</p>
              <p className="text-sm font-medium text-slate-200">
                {stop.label}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
