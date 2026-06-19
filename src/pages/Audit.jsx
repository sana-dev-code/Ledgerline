import { useApp } from "../hooks/useApp";

export default function Audit() {
  const { state } = useApp();
  const logs = state.audit.filter((a) => a.clientId === state.clientId);

  return (
    <article className="rounded-[1.8rem] bg-white p-6 shadow-sm">
      <h3 className="text-xl font-black text-slate-900">Activity Audit Log</h3>
      <p className="mt-1 text-sm text-slate-500">Every important user action is recorded here.</p>

      <div className="mt-6 space-y-4">
        {logs.length === 0 && <p className="rounded-2xl bg-slate-50 p-4 text-sm text-slate-500">No activity recorded.</p>}

        {logs.map((log) => (
          <div key={log.id} className="flex gap-4 rounded-[1.4rem] bg-slate-50 p-5">
            <div className="mt-1 h-3 w-3 shrink-0 rounded-full bg-blue-600" />
            <div>
              <p className="font-black text-slate-900">{log.text}</p>
              <p className="mt-1 text-xs font-bold text-slate-400">{log.at}</p>
            </div>
          </div>
        ))}
      </div>
    </article>
  );
}