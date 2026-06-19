export default function EmptyState({ title = "No data found", text = "There are no records to display." }) {
  return (
    <div className="rounded-[1.4rem] bg-slate-50 p-6 text-center">
      <p className="font-black text-slate-900">{title}</p>
      <p className="mt-1 text-sm text-slate-500">{text}</p>
    </div>
  );
}