import { useState } from "react";
import { useApp } from "../hooks/useApp";
import { ROLE_TABS, can } from "../constants/permissions";

export default function Layout({ children, route, go }) {
  const { state, dispatch } = useApp();
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");

  const user = state.users.find((u) => u.id === state.userId);
  const client = state.clients.find((c) => c.id === state.clientId);
  const tabs = ROLE_TABS[user.role] || [];
  const list = state.clients.filter((c) =>
    c.name.toLowerCase().includes(search.toLowerCase())
  );

  const menu = (
    <div className="flex min-h-full flex-col">
      <div className="mb-8">
        <h1 className="text-2xl font-black text-blue-600">Ledgerline</h1>
        <p className="mt-1 text-[11px] font-bold uppercase tracking-[0.22em] text-slate-400">
          Finance SaaS
        </p>
      </div>

      <div className="rounded-2xl bg-slate-50 p-3">
        <p className="text-xs font-bold text-slate-500">Workspace</p>
        <select
          value={state.clientId}
          onChange={(e) => dispatch({ type: "CLIENT", id: e.target.value })}
          className="mt-2 w-full rounded-xl border-0 bg-white px-3 py-2 text-sm font-semibold outline-none"
        >
          {list.map((c) => (
            <option key={c.id} value={c.id}>
              {state.pinned.includes(c.id) ? "Pinned - " : ""}
              {c.name}
            </option>
          ))}
        </select>
      </div>

      <input
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Search client"
        className="mt-4 w-full rounded-2xl border-0 bg-slate-50 px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-blue-100"
      />

      {can(user.role, "pinClient") && (
        <button
          onClick={() => dispatch({ type: "PIN", id: state.clientId })}
          className="mt-3 w-full rounded-2xl bg-blue-50 px-4 py-3 text-sm font-bold text-blue-700"
        >
          Pin Client
        </button>
      )}

      <nav className="mt-7 space-y-1">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => {
              go(tab);
              setOpen(false);
            }}
            className={`flex w-full items-center gap-3 rounded-2xl px-4 py-3 text-left text-sm font-bold capitalize transition ${
              route === tab
                ? "bg-blue-50 text-blue-700"
                : "text-slate-500 hover:bg-slate-50 hover:text-slate-900"
            }`}
          >
            <span
              className={`h-2 w-2 rounded-full ${
                route === tab ? "bg-blue-600" : "bg-slate-300"
              }`}
            />
            {tab}
          </button>
        ))}
      </nav>

      <div className="mt-auto pt-6">
        <div className="rounded-3xl bg-gradient-to-br from-blue-50 to-violet-50 p-4">
          <p className="text-sm font-black text-slate-900">{user.name}</p>
          <p className="mt-1 text-xs font-bold text-blue-700">{user.role}</p>
          <p className="mt-2 text-xs text-slate-500">{client.name}</p>
        </div>

        <button
          onClick={() => dispatch({ type: "LOGOUT" })}
          className="mt-4 w-full rounded-2xl bg-slate-900 px-4 py-3 text-sm font-bold text-white"
        >
          Logout
        </button>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#f7f9fc]">
      <aside className="fixed left-0 top-0 hidden h-screen w-[232px] overflow-y-auto bg-white px-4 py-6 lg:block">
        {menu}
      </aside>

      <header className="sticky top-0 z-40 flex items-center justify-between bg-white/90 px-4 py-3 shadow-sm backdrop-blur lg:hidden">
        <div>
          <h1 className="text-lg font-black text-blue-600">Ledgerline</h1>
          <p className="text-xs text-slate-500">{client.name}</p>
        </div>
        <button
          onClick={() => setOpen(true)}
          className="rounded-xl bg-blue-600 px-4 py-2 text-sm font-bold text-white"
        >
          Menu
        </button>
      </header>

      {open && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <button
            className="absolute inset-0 bg-slate-900/40"
            onClick={() => setOpen(false)}
          />
          <div className="relative h-full w-[232px] max-w-[84vw] overflow-y-auto bg-white px-4 py-6 shadow-2xl">
            {menu}
          </div>
        </div>
      )}

      <main className="min-w-0 overflow-hidden px-4 py-5 lg:ml-[232px] lg:px-8 lg:py-6">
        <div className="mx-auto max-w-[1180px]">
          <div className="mb-6 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
            <div>
              <h2 className="text-2xl font-black text-slate-900">
                Hi, Welcome back
              </h2>
              <p className="mt-1 text-sm text-slate-500">
                {client.name} • {user.role}
              </p>
            </div>

            <div className="flex gap-2">
              <span className="rounded-full bg-white px-4 py-2 text-sm font-bold text-slate-600 shadow-sm">
                {client.health}
              </span>
              <span className="rounded-full bg-blue-600 px-4 py-2 text-sm font-bold text-white shadow-sm">
                {route}
              </span>
            </div>
          </div>

          {state.toast && (
            <p className="mb-5 rounded-2xl bg-emerald-50 p-4 text-sm font-bold text-emerald-700">
              {state.toast}
            </p>
          )}

          {children}
        </div>
      </main>
    </div>
  );
}