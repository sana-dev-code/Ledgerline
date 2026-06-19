import { useApp } from "../hooks/useApp";
import StatCard from "../components/StatCard";

const themes = [
  "from-sky-100 to-blue-200 text-blue-900",
  "from-violet-100 to-fuchsia-200 text-violet-900",
  "from-amber-100 to-yellow-200 text-amber-900",
  "from-rose-100 to-orange-200 text-rose-900",
];

export default function Dashboard() {
  const { state } = useApp();
  const user = state.users.find((u) => u.id === state.userId);
  const client = state.clients.find((c) => c.id === state.clientId);
  const txns = state.txns.filter((t) => t.clientId === client.id);
  const flags = state.flags.filter((f) => f.clientId === client.id);
  const audit = state.audit.filter((a) => a.clientId === client.id);
  const unmatched = txns.filter((t) => t.status === "Unmatched").length;

  const roleText =
    user.role === "Admin"
      ? "Executive control center"
      : user.role === "Senior Accountant"
      ? "Review and approval workspace"
      : "Assigned transaction workspace";

  const cards = [
    ["Total Assets", `$${client.assets.toLocaleString()}`, "+2.6%"],
    ["Net Income", `$${client.netIncome.toLocaleString()}`, "+1.8%"],
    ["Open Flags", flags.length, flags.length ? "Review" : "Clear"],
    ["Unmatched", unmatched, unmatched ? "Pending" : "Done"],
  ];

  return (
    <section className="space-y-6">
      <div className="rounded-[1.8rem] bg-white p-6 shadow-sm">
        <p className="text-xs font-black uppercase tracking-widest text-blue-600">
          {user.role}
        </p>
        <h3 className="mt-2 text-2xl font-black text-slate-900 md:text-3xl">
          {roleText}
        </h3>
        <p className="mt-2 max-w-2xl text-sm text-slate-500">
          Monitor financial activity, reconciliation status, flags, and audit
          events for the selected client.
        </p>
      </div>

      <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
        {cards.map(([label, value, tag], i) => (
          <StatCard
            key={label}
            label={label}
            value={value}
            tag={tag}
            theme={themes[i]}
            index={i}
          />
        ))}
      </div>

      <div className="grid gap-6 xl:grid-cols-[360px_minmax(0,1fr)]">
        <article className="rounded-[1.8rem] bg-white p-6 shadow-sm">
          <h3 className="text-lg font-black text-slate-900">Client Health</h3>
          <p className="mt-1 text-sm text-slate-500">
            Current business status overview.
          </p>

          <div className="mt-6 grid place-items-center">
            <div className="grid h-52 w-52 place-items-center rounded-full bg-gradient-to-br from-sky-100 via-amber-100 to-violet-100">
              <div className="grid h-32 w-32 place-items-center rounded-full bg-white shadow-sm">
                <p className="text-center">
                  <span className="block text-xl font-black text-blue-700">
                    {client.health}
                  </span>
                  <span className="text-xs text-slate-500">
                    {client.industry}
                  </span>
                </p>
              </div>
            </div>
          </div>
        </article>

        <article className="rounded-[1.8rem] bg-white p-6 shadow-sm">
          <div className="flex items-start justify-between gap-3">
            <div>
              <h3 className="text-lg font-black text-slate-900">
                Activity Overview
              </h3>
              <p className="text-sm text-slate-500">
                Recent actions for current client.
              </p>
            </div>

            <span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-black text-blue-700">
              Live
            </span>
          </div>

          <div className="mt-6 space-y-3">
            {audit.length ? (
              audit.slice(0, 5).map((item) => (
                <div key={item.id} className="rounded-2xl bg-slate-50 p-4">
                  <p className="text-sm font-bold text-slate-900">{item.text}</p>
                  <p className="mt-1 text-xs text-slate-500">{item.at}</p>
                </div>
              ))
            ) : (
              <p className="rounded-2xl bg-slate-50 p-4 text-sm text-slate-500">
                No recent activity.
              </p>
            )}
          </div>
        </article>
      </div>
    </section>
  );
}