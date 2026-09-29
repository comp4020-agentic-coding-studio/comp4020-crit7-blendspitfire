// SQLite's datetime('now') stores "YYYY-MM-DD HH:MM:SS" in UTC with no
// timezone marker, so it must be normalized to ISO before diffing or
// `new Date()` parses it as local time and the day count silently drifts.
export function relativeDay(createdAt: string, now: Date = new Date()): string {
  const created = new Date(`${createdAt.replace(" ", "T")}Z`);
  const days = Math.floor((now.getTime() - created.getTime()) / 86_400_000);
  if (days <= 0) return "today";
  if (days === 1) return "yesterday";
  return `${days} days ago`;
}
