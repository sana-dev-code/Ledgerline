import { useApp } from "../hooks/useApp";

const gradients = [
  "from-sky-100 to-blue-200 text-blue-900",
  "from-violet-100 to-fuchsia-200 text-violet-900",
  "from-amber-100 to-yellow-200 text-amber-900",
  "from-rose-100 to-orange-200 text-rose-900",
];

export default function Dashboard() {
  const { state } = useApp();
  
  const client = state.clients.find((c) => c.id === state.clientId);
  const txns = state.txns.filter((t) => t.clientId === client.id);
  const flags = state.flags.filter((f) => f.clientId === client.id);
  const audit = state.audit.filter((a) => a.clientId === client.id);
  const unmatched = txns.filter((t) => t.status === "Unmatched").length;

  const cards = [
    ["Total assets", `$${client.assets.toLocaleString()}`, "+2.6%"],
    ["Net income", `$${client.netIncome.toLocaleString()}`, "+1.8%"],
    ["Open flags", flags.length, flags.length ? "Review" : "Clear"],
    ["Unmatched", unmatched, unmatched ? "Pending" : "Done"],
  ];

  return (
    <section className="space-y-6">
      <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
        {cards.map(([label, value, tag], i) => (
          <article
            key={label}
            className={`rounded-[1.6rem] bg-gradient-to-br ${gradients[i]} p-5 shadow-sm`}
          >
            <div className="flex items-start justify-between">
              <div className="grid h-11 w-11 place-items-center rounded-2xl bg-white/60 text-sm font-black">
                {i + 1}
              </div>
              <span className="rounded-full bg-white/60 px-3 py-1 text-xs font-black">
                {tag}
              </span>
            </div>
            <p className="mt-8 text-sm font-black opacity-80">{label}</p>
            <h3 className="mt-2 text-3xl font-black">{value}</h3>
          </article>
        ))}
      </div>

      <div className="grid gap-6 xl:grid-cols-[380px_1fr]">
        <article className="rounded-[1.6rem] bg-white p-6 shadow-sm">
          <h3 className="text-lg font-black">Client Health</h3>
          <p className="mt-1 text-sm text-slate-500">Current business status.</p>

          <div className="mt-6 grid place-items-center">
            <div className="grid h-56 w-56 place-items-center rounded-full bg-gradient-to-br from-sky-100 via-amber-100 to-violet-100">
              <div className="grid h-36 w-36 place-items-center rounded-full bg-white shadow-sm">
                <p className="text-center">
                  <span className="block text-2xl font-black text-blue-700">
                    {client.health}
                  </span>
                  <span className="text-xs text-slate-500">{client.industry}</span>
                </p>
              </div>
            </div>
          </div>
        </article>

        <article className="rounded-[1.6rem] bg-white p-6 shadow-sm">
          <div className="flex items-start justify-between">
            <div>
              <h3 className="text-lg font-black">Activity Overview</h3>
              <p className="text-sm text-slate-500">Recent actions for current client.</p>
            </div>
            <span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-black text-blue-700">
              Live
            </span>
          </div>

          <div className="mt-6 space-y-3">
            {audit.length ? (
              audit.slice(0, 5).map((a) => (
                <div key={a.id} className="rounded-2xl bg-slate-50 p-4">
                  <p className="text-sm font-bold text-slate-900">{a.text}</p>
                  <p className="mt-1 text-xs text-slate-500">{a.at}</p>
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