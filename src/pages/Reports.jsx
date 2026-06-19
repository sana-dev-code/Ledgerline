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
      <article className="rounded-[1.8rem] bg-white p-6 shadow-sm">
        <h3 className="text-xl font-black text-slate-900">Report Builder</h3>
        <p className="mt-1 text-sm text-slate-500">Build reusable report templates.</p>

        <div className="mt-5 space-y-3">
          {["Actual", "Budget", "Variance", "Percent"].map((col) => (
            <label key={col} className="flex items-center gap-3 rounded-2xl bg-slate-50 p-4 text-sm font-bold">
              <input type="checkbox" checked={cols.includes(col)} onChange={() => toggle(col)} />
              {col}
            </label>
          ))}
        </div>

        <button disabled={!can(user.role, "saveReport")} onClick={() => alert("Template saved")} className="mt-6 w-full rounded-2xl bg-blue-600 p-4 text-sm font-bold text-white disabled:bg-slate-300">
          Save Template
        </button>

        <button disabled={!can(user.role, "export")} onClick={() => downloadCsv("ledgerline-report.csv", [headers, ...rows])} className="mt-3 w-full rounded-2xl bg-slate-900 p-4 text-sm font-bold text-white disabled:bg-slate-300">
          Export CSV
        </button>
      </article>

      <article className="rounded-[1.8rem] bg-white p-6 shadow-sm">
        <h3 className="text-xl font-black text-slate-900">Live Preview</h3>
        <p className="mt-1 text-sm text-slate-500">Monthly Department Spend vs Budget.</p>

        <div className="mt-6 grid gap-4 lg:grid-cols-2">
          {reports.map((r, i) => (
            <div key={i} className="rounded-[1.4rem] bg-slate-50 p-5">
              <p className="text-xs font-black uppercase tracking-wide text-blue-600">{r[0]}</p>
              <h4 className="mt-1 text-lg font-black text-slate-900">{r[1]}</h4>

              <div className="mt-5 grid gap-3 sm:grid-cols-2">
                {cols.includes("Actual") && <Metric label="Actual" value={money(r[2])} />}
                {cols.includes("Budget") && <Metric label="Budget" value={money(r[3])} />}
                {cols.includes("Variance") && <Metric label="Variance" value={r[4]} blue />}
                {cols.includes("Percent") && <Metric label="% Total" value={r[5]} />}
              </div>
            </div>
          ))}
        </div>
      </article>
    </section>
  );
}

function Metric({ label, value, blue }) {
  return (
    <div className="rounded-2xl bg-white p-4">
      <p className="text-xs font-bold text-slate-400">{label}</p>
      <p className={`mt-1 text-lg font-black ${blue ? "text-blue-700" : "text-slate-900"}`}>{value}</p>
    </div>
  );
}