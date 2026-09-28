import { type Access, type Building, type HoursWindow, hoursFor } from "../data/buildings";

export type AccessNow = Access | "closed";

// Public holidays are not modelled: a holiday Monday reads as a normal Monday.
function canberraClock(at: Date): { weekend: boolean; minutes: number } {
  const parts = new Intl.DateTimeFormat("en-AU", {
    timeZone: "Australia/Canberra",
    weekday: "short",
    hour: "2-digit",
    minute: "2-digit",
    hourCycle: "h23",
  }).formatToParts(at);
  const get = (type: string) => parts.find((p) => p.type === type)?.value ?? "";
  return {
    weekend: get("weekday") === "Sat" || get("weekday") === "Sun",
    minutes: Number(get("hour")) * 60 + Number(get("minute")),
  };
}

const toMinutes = (hhmm: string) => {
  const [h, m] = hhmm.split(":").map(Number);
  return h * 60 + m;
};

export function windowAt(building: Building, at: Date): HoursWindow | undefined {
  const { weekend, minutes } = canberraClock(at);
  return hoursFor(building).windows.find(
    (w) =>
      (w.days === "weekends") === weekend &&
      toMinutes(w.from) <= minutes &&
      minutes < toMinutes(w.to),
  );
}

export function accessAt(building: Building, at: Date): AccessNow {
  return windowAt(building, at)?.access ?? "closed";
}
