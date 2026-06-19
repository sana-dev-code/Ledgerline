import { useState } from "react";
import { useApp } from "../hooks/useApp";
import { can } from "../constants/permissions";
import { uid } from "../utils/format";

export default function Clients() {
  const { state, dispatch } = useApp();
  const user = state.users.find((u) => u.id === state.userId);
  const [name, setName] = useState("");
  const [industry, setIndustry] = useState("");
  const [error, setError] = useState("");

  function addClient() {
    if (!name.trim() || !industry.trim()) return setError("Client name and industry are required.");
    if (!can(user.role, "manageClients")) return setError("You are not allowed to add clients.");

    dispatch({
      type: "ADD_CLIENT",
      user: user.name,
      client: {
        id: `c${uid()}`,
        name,
        industry,
        assets: 0,
        netIncome: 0,
        health: "New",
      },
    });

    setName("");
    setIndustry("");
    setError("");
  }

  return (
    <section className="grid gap-6 xl:grid-cols-[340px_minmax(0,1fr)]">
      <article className="rounded-[1.8rem] bg-white p-6 shadow-sm">
        <h3 className="text-xl font-black text-slate-900">Add Client</h3>
        <p className="mt-1 text-sm text-slate-500">Admin-only client creation.</p>

        <label className="mt-6 block text-sm font-bold">Client Name *</label>
        <input value={name} onChange={(e) => setName(e.target.value)} className="mt-2 w-full rounded-2xl border-0 bg-slate-50 px-4 py-3 outline-none focus:ring-2 focus:ring-blue-100" />

        <label className="mt-4 block text-sm font-bold">Industry *</label>
        <input value={industry} onChange={(e) => setIndustry(e.target.value)} className="mt-2 w-full rounded-2xl border-0 bg-slate-50 px-4 py-3 outline-none focus:ring-2 focus:ring-blue-100" />

        {error && <p className="mt-4 rounded-2xl bg-red-50 p-3 text-sm font-bold text-red-700">{error}</p>}

        <button onClick={addClient} className="mt-5 w-full rounded-2xl bg-blue-600 p-4 text-sm font-bold text-white">
          Add Client
        </button>
      </article>

      <article className="rounded-[1.8rem] bg-white p-6 shadow-sm">
        <h3 className="text-xl font-black text-slate-900">Client Directory</h3>

        <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {state.clients.map((client) => (
            <div key={client.id} className="rounded-[1.4rem] bg-slate-50 p-5">
              <p className="text-xs font-black uppercase tracking-wide text-blue-600">{client.health}</p>
              <h4 className="mt-2 font-black text-slate-900">{client.name}</h4>
              <p className="mt-1 text-sm text-slate-500">{client.industry}</p>
              <p className="mt-4 text-sm font-bold text-slate-700">
                Assets: ${client.assets.toLocaleString()}
              </p>
            </div>
          ))}
        </div>
      </article>
    </section>
  );
}