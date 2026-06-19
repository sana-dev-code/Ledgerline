import { useState } from "react";
import { useApp } from "../hooks/useApp";
import Sidebar from "./Sidebar";
import Topbar from "./Topbar";

export default function AppLayout({ children, route, go }) {
  const { state } = useApp();
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");

  return (
    <div className="min-h-screen bg-[#f7f9fc]">
      <aside className="fixed left-0 top-0 hidden h-screen w-[250px] overflow-y-auto bg-white px-4 py-6 lg:block">
        <Sidebar route={route} go={go} search={search} setSearch={setSearch} />
      </aside>

      {open && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <button
            className="absolute inset-0 bg-slate-900/40"
            onClick={() => setOpen(false)}
          />

          <div className="relative h-full w-[300px] max-w-[86vw] overflow-y-auto bg-white px-5 py-6 shadow-2xl">
            <Sidebar
              route={route}
              go={go}
              search={search}
              setSearch={setSearch}
              close={() => setOpen(false)}
            />
          </div>
        </div>
      )}

      <main className="min-w-0 overflow-hidden px-4 py-4 lg:ml-[232px] lg:px-8 lg:py-6">
        <div className="mx-auto max-w-[1180px]">
          <Topbar route={route} openMenu={() => setOpen(true)} />

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