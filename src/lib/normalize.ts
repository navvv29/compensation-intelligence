export function normalizeCompany(name: string): string {
  if (!name) return "";
  try {
    name = decodeURIComponent(name);
  } catch {
    // ignore
  }
  return name.trim().toLowerCase();
}
