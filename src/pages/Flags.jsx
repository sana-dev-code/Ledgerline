import { useState } from "react";
import { useApp } from "../hooks/useApp";
import { can } from "../constants/permissions";

export default function Flags() {
  const { state, dispatch } = useApp();
  const [filter, setFilter] = useState("All");
  const user = state.users.find((u) => u.id === state.userId);

  const flags = state.flags
    .filter((f) => f.clientId === state.clientId)
    .filter((f) => filter === "All" || f.status === filter);

  return (
    <article className="rounded-[1.8rem] bg-white p-6 shadow-sm">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h3 className="text-xl font-black text-slate-900">Review Queue</h3>
          <p className="mt-1 text-sm text-slate-500">Track flagged items for current client.</p>
        </div>

        <select value={filter} onChange={(e) => setFilter(e.target.value)} className="rounded-2xl border-0 bg-slate-50 px-4 py-3 text-sm font-bold outline-none">
          <option>All</option>
          <option>Open</option>
          <option>In Review</option>
          <option>Resolved</option>
        </select>
      </div>

      <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {flags.length === 0 && <p className="rounded-2xl bg-slate-50 p-4 text-sm text-slate-500">No flags found.</p>}

        {flags.map((flag) => (
          <div key={flag.id} className="rounded-[1.4rem] bg-slate-50 p-5">
            <span className="rounded-full bg-white px-3 py-1 text-xs font-black text-blue-700">{flag.status}</span>
            <h4 className="mt-4 font-black text-slate-900">{flag.entity}</h4>
            <p className="mt-2 text-sm text-slate-500">{flag.note}</p>

            {can(user.role, "changeFlag") ? (
              <select value={flag.status} onChange={(e) => dispatch({ type: "FLAG_STATUS", id: flag.id, status: e.target.value })} className="mt-4 w-full rounded-2xl border-0 bg-white px-4 py-3 text-sm font-bold outline-none">
                <option>Open</option>
                <option>In Review</option>
                <option>Resolved</option>
              </select>
            ) : (
              <p className="mt-4 rounded-2xl bg-white p-3 text-xs font-bold text-slate-500">Status change restricted for your role.</p>
            )}
          </div>
        ))}
      </div>
    </article>
  );
}