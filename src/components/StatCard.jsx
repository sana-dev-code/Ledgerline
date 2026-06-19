export default function StatCard({ label, value, tag, theme, index }) {
  return (
    <article className={`rounded-[1.6rem] bg-gradient-to-br ${theme} p-5 shadow-sm`}>
      <div className="flex items-start justify-between">
        <div className="grid h-11 w-11 place-items-center rounded-2xl bg-white/60 text-sm font-black">
          {index + 1}
        </div>

        <span className="rounded-full bg-white/60 px-3 py-1 text-xs font-black">
          {tag}
        </span>
      </div>

      <p className="mt-8 text-sm font-black opacity-80">{label}</p>
      <h3 className="mt-2 text-3xl font-black">{value}</h3>
    </article>
  );
}