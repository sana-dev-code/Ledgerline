export const money = (n) =>
  n === "" || n == null
    ? ""
    : `${n < 0 ? "(" : ""}$${Math.abs(n).toLocaleString(undefined, {
        minimumFractionDigits: 2,
      })}${n < 0 ? ")" : ""}`;

export const uid = () => Date.now() + Math.floor(Math.random() * 999);

export function downloadCsv(name, rows) {
  const csv = rows
    .map((r) => r.map((x) => `"${String(x).replaceAll('"', '""')}"`).join(","))
    .join("\n");

  const url = URL.createObjectURL(new Blob([csv], { type: "text/csv" }));
  const a = document.createElement("a");

  a.href = url;
  a.download = name;
  a.click();

  URL.revokeObjectURL(url);
}