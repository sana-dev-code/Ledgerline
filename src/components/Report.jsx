import { useState } from "react";
import reports from "../data/reports.json";
import { useApp } from "../hooks/useApp";
import { can } from "../constants/permissions";
import { money, downloadCsv } from "../utils/format";

export default function Reports() {
  const { state } = useApp();
  const user = state.users.find((u) => u.id === state.userId);
  const [cols, setCols] = useState(["Actual", "Budget", "Variance", "Percent"]);

  const headers = ["Department", "Account", ...cols];

  const rows = reports.map((r) => [
    r[0],
    r[1],
    ...(cols.includes("Actual") ? [r[2]] : []),
    ...(cols.includes("Budget") ? [r[3]] : []),
    ...(cols.includes("Variance") ? [r[4]] : []),
    ...(cols.includes("Percent") ? [r[5]] : []),
  ]);

  function toggle(col) {
    setCols(cols.includes(col) ? cols.filter((x) => x !== col) : [...cols, col]);
  }

  return (
    <section className="grid min-w-0 gap-6 xl:grid-cols-[340px_minmax(0,1fr)]">
      <article className="rounded-[1.6rem] bg-white p-6 shadow-sm">
        <h3 className="text-xl font-black text-slate-900">Report Builder</h3>
        <p className="mt-1 text-sm text-slate-500">Build reusable report templates.</p>

        <div className="mt-5 space-y-3">
          {["Actual", "Budget", "Variance", "Percent"].map((col) => (
            <label
              key={col}
              className="flex items-center gap-3 rounded-2xl bg-slate-50 px-4 py-4 text-sm font-bold text-slate-700"
            >
              <input
                type="checkbox"
                checked={cols.includes(col)}
                onChange={() => toggle(col)}
              />
              {col}
            </label>
          ))}
        </div>

        <button
          disabled={!can(user.role, "saveReport")}
          onClick={() => alert("Template saved")}
          className="mt-6 w-full rounded-2xl bg-blue-600 px-4 py-4 text-sm font-bold text-white shadow-sm disabled:bg-slate-300"
        >
          Save Template
        </button>

        <button
          disabled={!can(user.role, "export")}
          onClick={() => downloadCsv("ledgerline-report.csv", [headers, ...rows])}
          className="mt-3 w-full rounded-2xl bg-slate-900 px-4 py-4 text-sm font-bold text-white shadow-sm disabled:bg-slate-300"
        >
          Export CSV
        </button>
      </article>

      <article className="min-w-0 rounded-[1.6rem] bg-white p-6 shadow-sm">
        <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <div>
            <h3 className="text-xl font-black text-slate-900">Live Preview</h3>
            <p className="mt-1 text-sm text-slate-500">
              Monthly Department Spend vs Budget
            </p>
          </div>

          <span className="w-fit rounded-full bg-blue-50 px-4 py-2 text-xs font-black text-blue-700">
            {cols.length} columns selected
          </span>
        </div>

        <div className="mt-6 grid gap-4 lg:grid-cols-2">
          {reports.map((r, i) => (
            <div key={i} className="rounded-[1.4rem] bg-slate-50 p-5">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="text-xs font-black uppercase tracking-wide text-blue-600">
                    {r[0]}
                  </p>
                  <h4 className="mt-1 text-lg font-black text-slate-900">{r[1]}</h4>
                </div>

                <span className="rounded-full bg-white px-3 py-1 text-xs font-black text-slate-600">
                  Row {i + 1}
                </span>
              </div>

              <div className="mt-5 grid gap-3 sm:grid-cols-2">
                {cols.includes("Actual") && (
                  <div className="rounded-2xl bg-white p-4">
                    <p className="text-xs font-bold text-slate-400">Actual</p>
                    <p className="mt-1 text-lg font-black">{money(r[2])}</p>
                  </div>
                )}

                {cols.includes("Budget") && (
                  <div className="rounded-2xl bg-white p-4">
                    <p className="text-xs font-bold text-slate-400">Budget</p>
                    <p className="mt-1 text-lg font-black">{money(r[3])}</p>
                  </div>
                )}

                {cols.includes("Variance") && (
                  <div className="rounded-2xl bg-white p-4">
                    <p className="text-xs font-bold text-slate-400">Variance</p>
                    <p className="mt-1 text-lg font-black text-blue-700">{r[4]}</p>
                  </div>
                )}

                {cols.includes("Percent") && (
                  <div className="rounded-2xl bg-white p-4">
                    <p className="text-xs font-bold text-slate-400">% of Total</p>
                    <p className="mt-1 text-lg font-black">{r[5]}</p>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </article>
    </section>
  );
}