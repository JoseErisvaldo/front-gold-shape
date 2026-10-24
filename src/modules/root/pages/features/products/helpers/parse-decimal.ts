export function parseDecimal(value: string): number {
  const normalized = value.trim().replace(",", ".");
  if (normalized === "") return Number.NaN;
  return Number(normalized);
}
