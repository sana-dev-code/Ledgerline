import { useState } from "react";
import { useApp } from "../hooks/useApp";
import statements from "../data/statements.json";
import { money } from "../utils/format";

export default function Statements() {
  const { state } = useApp();
  const [type, setType] = useState("balance");
  const [open, setOpen] = useState(null);

  const rows = statements[state.clientId][type];
  const cols =
    type === "cash"
      ? ["Amount"]
      : type === "balance"
      ? ["This Period", "Prior", "Variance"]
      : ["This Month", "Last Month", "YoY"];

  return (
    <section className="grid min-w-0 gap-4 2xl:grid-cols-[minmax(0,1fr)_300px]">
      <article className="min-w-0 rounded-3xl bg-white p-4 shadow-sm">
        <div className="mb-4 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <h3 className="text-lg font-black sm:text-xl">Financial Statements</h3>

          <select
            value={type}
            onChange={(e) => {
              setType(e.target.value);
              setOpen(null);
            }}
            className="w-full rounded-2xl border bg-slate-50 p-3 md:w-52"
          >
            <option value="balance">Balance Sheet</option>
            <option value="income">Income Statement</option>
            <option value="cash">Cash Flow</option>
          </select>
        </div>

        <div className="max-w-full overflow-x-auto rounded-2xl border">
          <table className="w-full min-w-[520px] text-sm">
            <thead className="bg-slate-50">
              <tr>
                {["Account", ...cols].map((h) => (
                  <th key={h} className="p-3 text-right first:text-left sm:p-4">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>

            <tbody>
              {rows.map((r, i) => {
                const head = r[1] === "";
                return (
                  <tr
                    key={i}
                    onClick={() => !head && setOpen(i)}
                    className={
                      head
                        ? "bg-slate-100 font-black"
                        : "cursor-pointer border-t hover:bg-blue-50"
                    }
                  >
                    <td className="p-3 sm:p-4">{r[0]}</td>
                    <td className="p-3 text-right sm:p-4">
                      {typeof r[1] === "number" ? money(r[1]) : r[1]}
                    </td>
                    <td className="p-3 text-right sm:p-4">
                      {typeof r[2] === "number" ? money(r[2]) : r[2]}
                    </td>
                    <td className="p-3 text-right text-blue-700 sm:p-4">{r[3]}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </article>

      <aside className="min-w-0 rounded-3xl bg-white p-4 shadow-sm">
        <h3 className="font-black">Drill-down</h3>

        {open == null ? (
          <p className="mt-3 rounded-2xl bg-slate-50 p-4 text-sm text-slate-500">
            Select a line item.
          </p>
        ) : (
          <>
            <h4 className="mt-3 break-words font-black">{rows[open][0]}</h4>
            {["INV-1001 ABC Corp", "INV-1002 Retail Co", "INV-1003 North Client"].map(
              (x) => (
                <p key={x} className="mt-2 break-words rounded-xl bg-slate-50 p-3 text-sm">
                  {x}
                </p>
              )
            )}
          </>
        )}
      </aside>
    </section>
  );
}