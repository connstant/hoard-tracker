interface StatsBarProps {
  owned: number;
  total: number;
  fullyEldered: number;
  pure: number;
  ultra: number;
}

export default function StatsBar({
  owned,
  total,
  fullyEldered,
  pure,
  ultra,
}: StatsBarProps) {
  const stats = [
    { label: "Owned", value: `${owned} / ${total}` },
    { label: "Fully Eldered", value: fullyEldered },
    { label: "Pure", value: pure },
    { label: "Ultra Pure", value: ultra },
  ];

  return (
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
      {stats.map((stat) => (
        <div
          key={stat.label}
          className="rounded-xl border border-slate-300 bg-white px-4 py-3 dark:border-slate-700/60 dark:bg-slate-900"
        >
          <p className="text-xs font-medium uppercase tracking-wide text-slate-500">
            {stat.label}
          </p>
          <p className="mt-1 text-2xl font-bold text-slate-900 dark:text-white">{stat.value}</p>
        </div>
      ))}
    </div>
  );
}
