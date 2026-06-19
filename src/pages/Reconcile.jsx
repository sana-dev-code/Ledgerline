import { useState } from "react";
import { useApp } from "../hooks/useApp";
import { can } from "../constants/permissions";
import { money } from "../utils/format";

export default function Reconcile() {
  const { state, dispatch } = useApp();
  const [note, setNote] = useState("");

  const user = state.users.find((u) => u.id === state.userId);
  const txns = state.txns.filter((t) => t.clientId === state.clientId);
  const banks = state.banks.filter((b) => b.clientId === state.clientId);
  const selected = txns.find((t) => t.id === state.selectedTxn);

  return (
    <section className="grid min-w-0 gap-6 2xl:grid-cols-[minmax(0,1fr)_minmax(0,1fr)_340px]">
      <article className="rounded-[1.8rem] bg-white p-6 shadow-sm">
        <div className="flex items-center justify-between gap-3">
          <div>
            <h3 className="text-xl font-black text-slate-900">
              Ledger Transactions
            </h3>
            <p className="mt-1 text-sm text-slate-500">
              Select a transaction to reconcile.
            </p>
          </div>

          <span className="rounded-full bg-slate-50 px-3 py-1 text-xs font-black text-slate-500">
            {txns.length} rows
          </span>
        </div>

        <div className="mt-6 space-y-3">
          {txns.map((txn) => (
            <button
              key={txn.id}
              onClick={() => dispatch({ type: "SELECT_TXN", id: txn.id })}
              className={`w-full rounded-2xl p-4 text-left transition ${
                state.selectedTxn === txn.id
                  ? "bg-blue-50 ring-2 ring-blue-100"
                  : "bg-slate-50 hover:bg-blue-50"
              }`}
            >
              <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <p className="text-xs font-black uppercase tracking-wide text-slate-400">
                    {txn.date}
                  </p>
                  <h4 className="mt-1 font-black text-slate-900">{txn.name}</h4>
                </div>

                <p className="text-lg font-black text-slate-900">
                  {money(txn.amount)}
                </p>
              </div>

              <span className="mt-3 inline-flex rounded-full bg-white px-3 py-1 text-xs font-bold text-slate-500">
                {txn.status}
              </span>
            </button>
          ))}
        </div>
      </article>

      <article className="rounded-[1.8rem] bg-white p-6 shadow-sm">
        <div className="flex items-center justify-between gap-3">
          <div>
            <h3 className="text-xl font-black text-slate-900">
              Bank Feed
            </h3>
            <p className="mt-1 text-sm text-slate-500">
              Choose one or more matching records.
            </p>
          </div>

          <span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-black text-blue-700">
            Candidates
          </span>
        </div>

        <div className="mt-6 space-y-3">
          {banks.map((bank) => (
            <button
              key={bank.id}
              onClick={() => dispatch({ type: "TOGGLE_BANK", id: bank.id })}
              className={`w-full rounded-2xl p-4 text-left transition ${
                state.selectedBanks.includes(bank.id)
                  ? "bg-blue-50 ring-2 ring-blue-100"
                  : "bg-slate-50 hover:bg-blue-50"
              }`}
            >
              <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <p className="text-xs font-black uppercase tracking-wide text-slate-400">
                    {bank.date}
                  </p>
                  <h4 className="mt-1 font-black text-slate-900">{bank.name}</h4>
                </div>

                <p className="text-lg font-black text-slate-900">
                  {money(bank.amount)}
                </p>
              </div>

              <span className="mt-3 inline-flex rounded-full bg-white px-3 py-1 text-xs font-bold text-blue-700">
                {bank.score} match
              </span>
            </button>
          ))}
        </div>
      </article>

      <aside className="rounded-[1.8rem] bg-white p-6 shadow-sm">
        <h3 className="text-xl font-black text-slate-900">Action Panel</h3>
        <p className="mt-1 text-sm text-slate-500">
          Match, override, or flag selected transaction.
        </p>

        <div className="mt-6 rounded-2xl bg-slate-50 p-4">
          <p className="text-xs font-black uppercase tracking-wide text-slate-400">
            Selected Transaction
          </p>

          <h4 className="mt-2 break-words font-black text-slate-900">
            {selected ? selected.name : "None selected"}
          </h4>

          {selected && (
            <p className="mt-1 text-sm font-bold text-slate-500">
              {money(selected.amount)}
            </p>
          )}
        </div>

        <label className="mt-5 block text-sm font-bold text-slate-700">
          Justification Note
        </label>

        <textarea
          value={note}
          onChange={(e) => setNote(e.target.value)}
          placeholder="Required for flag or manual override"
          rows={4}
          className="mt-2 w-full resize-none rounded-2xl border-0 bg-slate-50 px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-blue-100"
        />

        <div className="mt-5 grid gap-3">
          <button
            disabled={!can(user.role, "match")}
            onClick={() =>
              dispatch({
                type: "MATCH",
                user: user.name,
              })
            }
            className="rounded-2xl bg-blue-600 px-4 py-4 text-sm font-bold text-white shadow-sm disabled:bg-slate-300"
          >
            Match Selected
          </button>

          <button
            disabled={!selected || !note.trim() || !can(user.role, "override")}
            onClick={() =>
              dispatch({
                type: "OVERRIDE",
                user: user.name,
              })
            }
            className="rounded-2xl bg-slate-900 px-4 py-4 text-sm font-bold text-white shadow-sm disabled:bg-slate-300"
          >
            Manual Override
          </button>

          <button
            disabled={!selected || !note.trim() || !can(user.role, "flag")}
            onClick={() =>
              dispatch({
                type: "FLAG",
                entity: selected.name,
                note,
                user: user.name,
              })
            }
            className="rounded-2xl bg-amber-500 px-4 py-4 text-sm font-bold text-white shadow-sm disabled:bg-slate-300"
          >
            Flag for Review
          </button>
        </div>

        <div className="mt-6 rounded-2xl bg-blue-50 p-4">
          <p className="text-sm font-bold text-blue-900">Keyboard Workflow</p>
          <p className="mt-1 text-xs text-blue-700">
            Select ledger row, select bank row, then match or flag.
          </p>
        </div>
      </aside>
    </section>
  );
}