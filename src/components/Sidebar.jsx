import { useState } from "react";
import { ROLE_TABS, can } from "../constants/permissions";
import { useApp } from "../hooks/useApp";

export default function Sidebar({ route, go, close, search, setSearch }) {
  const { state, dispatch } = useApp();
  const [showSearch, setShowSearch] = useState(false);

  const user = state.users.find((u) => u.id === state.userId);
  const client = state.clients.find((c) => c.id === state.clientId);
  const tabs = ROLE_TABS[user.role] || [];

  const clients = state.clients.filter((c) =>
    c.name.toLowerCase().includes(search.toLowerCase())
  );

  function openTab(tab) {
    go(tab);
    close?.();
  }

  function chooseClient(id) {
    dispatch({ type: "CLIENT", id });
    setSearch("");
    setShowSearch(false);
  }

  return (
    <aside className="flex h-full flex-col">
      <div>
        <h1 className="text-2xl font-black text-blue-600">Ledgerline</h1>
        <p className="mt-1 text-[11px] font-bold uppercase tracking-[0.22em] text-slate-400">
          Finance SaaS
        </p>
      </div>

      <div className="mt-8 rounded-2xl bg-slate-50 p-3">
        <p className="text-xs font-bold text-slate-500">Workspace</p>

        <select
          value={state.clientId}
          onChange={(e) => dispatch({ type: "CLIENT", id: e.target.value })}
          className="mt-2 w-full rounded-xl border-0 bg-white px-3 py-2 text-sm font-semibold outline-none"
        >
          {state.clients.map((c) => (
            <option key={c.id} value={c.id}>
              {state.pinnedClients.includes(c.id) ? "Pinned - " : ""}
              {c.name}
            </option>
          ))}
        </select>
      </div>

      <div className="relative mt-4">
        <input
          value={search}
          onFocus={() => setShowSearch(true)}
          onChange={(e) => {
            setSearch(e.target.value);
            setShowSearch(true);
          }}
          placeholder="Search client"
          className="w-full rounded-2xl border-0 bg-slate-50 px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-blue-100"
        />

        {showSearch && search.trim() && (
          <div className="absolute left-0 right-0 top-14 z-50 rounded-2xl bg-white p-2 shadow-xl ring-1 ring-slate-100">
            {clients.length ? (
              clients.map((c) => (
                <button
                  key={c.id}
                  onClick={() => chooseClient(c.id)}
                  className="w-full rounded-xl px-3 py-3 text-left text-sm font-bold text-slate-700 hover:bg-blue-50 hover:text-blue-700"
                >
                  {c.name}
                  <span className="block text-xs font-medium text-slate-400">
                    {c.industry}
                  </span>
                </button>
              ))
            ) : (
              <p className="rounded-xl px-3 py-3 text-sm text-slate-500">
                No client found
              </p>
            )}
          </div>
        )}
      </div>

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
            onClick={() => openTab(tab)}
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
          className="mt-4 mb-8 w-full rounded-2xl bg-slate-900 px-5 py-3 text-sm font-bold text-white"
        >
          Logout
        </button>
      </div>
    </aside>
  );
}