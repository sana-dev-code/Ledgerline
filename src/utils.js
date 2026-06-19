export const money = (n, c = "$") =>
  n === "" || n == null
    ? ""
    : `${n < 0 ? "(" : ""}${c}${Math.abs(n).toLocaleString(undefined, {
        minimumFractionDigits: 2,
      })}${n < 0 ? ")" : ""}`;

export function downloadCsv(name, rows) {
  const csv = rows
    .map((r) => r.map((x) => `"${String(x).replaceAll('"', '""')}"`).join(","))
    .join("\n");

  const blob = new Blob([csv], { type: "text/csv" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");

  a.href = url;
  a.download = name;
  a.click();

  URL.revokeObjectURL(url);
}