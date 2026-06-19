import { useApp } from "../hooks/useApp";

export default function Topbar({ route, openMenu }) {
  const { state } = useApp();
  const user = state.users.find((u) => u.id === state.userId);
  const client = state.clients.find((c) => c.id === state.clientId);

  return (
    <>
      <header className="sticky top-0 z-40 flex items-center justify-between bg-white/90 px-4 py-3 shadow-sm backdrop-blur lg:hidden">
        <div>
          <h1 className="text-lg font-black text-blue-600">Ledgerline</h1>
          <p className="text-xs text-slate-500">{client.name}</p>
        </div>

        <button
          onClick={openMenu}
          className="rounded-xl bg-blue-600 px-4 py-2 text-sm font-bold text-white"
        >
          Menu
        </button>
      </header>

      <div className="mb-6 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <div>
          <h2 className="text-2xl font-black text-slate-900">Hi, Welcome back</h2>
          <p className="mt-1 text-sm text-slate-500">
            {client.name} • {user.role}
          </p>
        </div>

        <div className="flex flex-wrap gap-2">
          <span className="rounded-full bg-white px-4 py-2 text-sm font-bold text-slate-600 shadow-sm">
            {client.health}
          </span>

          <span className="rounded-full bg-blue-600 px-4 py-2 text-sm font-bold capitalize text-white shadow-sm">
            {route}
          </span>
        </div>
      </div>
    </>
  );
}