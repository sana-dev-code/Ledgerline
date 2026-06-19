import { useState } from "react";
import { useApp } from "../hooks/useApp";
import statements from "../data/statements.json";
import { money } from "../utils/format";

export default function Statements() {
  const { state } = useApp();
  const [type, setType] = useState("balance");
  const [open, setOpen] = useState(null);

  const rows = statements[state.clientId][type];
  const title =
    type === "balance"
      ? "Balance Sheet"
      : type === "income"
      ? "Income Statement"
      : "Cash Flow Statement";

  const cols =
    type === "cash"
      ? ["Amount"]
      : type === "balance"
      ? ["This Period", "Prior", "Variance"]
      : ["This Month", "Last Month", "YoY"];

  const activeRow = open !== null ? rows[open] : null;

  return (
    <section className="grid min-w-0 gap-6 xl:grid-cols-[minmax(0,1fr)_340px]">
      <article className="min-w-0 rounded-[1.8rem] bg-white p-6 shadow-sm">
        <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <div>
            <h3 className="text-2xl font-black text-slate-900">{title}</h3>
            <p className="mt-1 text-sm text-slate-500">
              Click any account line to inspect supporting details.
            </p>
          </div>

          <select
            value={type}
            onChange={(e) => {
              setType(e.target.value);
              setOpen(null);
            }}
            className="w-full rounded-2xl border-0 bg-slate-50 px-4 py-3 text-sm font-bold outline-none focus:ring-2 focus:ring-blue-100 md:w-56"
          >
            <option value="balance">Balance Sheet</option>
            <option value="income">Income Statement</option>
            <option value="cash">Cash Flow</option>
          </select>
        </div>

        {/* Mobile / tablet card layout */}
        <div className="mt-6 grid gap-3 lg:hidden">
          {rows.map((row, index) => {
            const section = row[1] === "";

            return (
              <button
                key={index}
                onClick={() => !section && setOpen(index)}
                className={`rounded-2xl p-4 text-left ${
                  section
                    ? "bg-slate-100 font-black text-slate-900"
                    : open === index
                    ? "bg-blue-50 ring-2 ring-blue-100"
                    : "bg-slate-50 hover:bg-blue-50"
                }`}
              >
                <p className="font-black">{row[0]}</p>

                {!section && (
                  <div className="mt-3 grid gap-2 text-sm sm:grid-cols-3">
                    {cols.map((col, i) => (
                      <p key={col} className="rounded-xl bg-white p-3">
                        <span className="block text-xs font-bold text-slate-400">
                          {col}
                        </span>
                        <b className="mt-1 block text-slate-900">
                          {typeof row[i + 1] === "number"
                            ? money(row[i + 1])
                            : row[i + 1]}
                        </b>
                      </p>
                    ))}
                  </div>
                )}
              </button>
            );
          })}
        </div>

        {/* Desktop table layout */}
        <div className="mt-6 hidden overflow-hidden rounded-2xl border border-slate-100 lg:block">
          <table className="w-full table-fixed text-sm">
            <thead className="bg-slate-50">
              <tr>
                <th className="p-4 text-left">Account</th>
                {cols.map((col) => (
                  <th key={col} className="p-4 text-right">
                    {col}
                  </th>
                ))}
              </tr>
            </thead>

            <tbody>
              {rows.map((row, index) => {
                const section = row[1] === "";

                return (
                  <tr
                    key={index}
                    onClick={() => !section && setOpen(index)}
                    className={
                      section
                        ? "bg-slate-100 font-black"
                        : "cursor-pointer border-t hover:bg-blue-50"
                    }
                  >
                    <td className="break-words p-4">{row[0]}</td>

                    {cols.map((col, i) => (
                      <td key={col} className="p-4 text-right">
                        {typeof row[i + 1] === "number"
                          ? money(row[i + 1])
                          : row[i + 1]}
                      </td>
                    ))}
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </article>

      <aside className="rounded-[1.8rem] bg-white p-6 shadow-sm">
        <h3 className="text-lg font-black text-slate-900">Drill-down</h3>
        <p className="mt-1 text-sm text-slate-500">
          Supporting records for selected account.
        </p>

        {!activeRow ? (
          <p className="mt-6 rounded-2xl bg-slate-50 p-4 text-sm text-slate-500">
            Select a statement line item.
          </p>
        ) : (
          <div className="mt-6">
            <p className="text-xs font-black uppercase tracking-widest text-blue-600">
              Selected Account
            </p>
            <h4 className="mt-1 break-words text-xl font-black text-slate-900">
              {activeRow[0]}
            </h4>

            <div className="mt-5 space-y-3">
              {["INV-1001 ABC Corp", "INV-1002 Retail Co", "INV-1003 North Client"].map(
                (item, index) => (
                  <div key={item} className="rounded-2xl bg-slate-50 p-4">
                    <p className="text-sm font-bold text-slate-900">{item}</p>
                    <p className="mt-1 text-xs text-slate-500">
                      Aging bucket {index + 1} • Supporting detail
                    </p>
                  </div>
                )
              )}
            </div>
          </div>
        )}
      </aside>
    </section>
  );
}