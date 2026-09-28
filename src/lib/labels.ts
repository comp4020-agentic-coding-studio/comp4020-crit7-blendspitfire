import type { BuildingUse } from "../data/buildings";
import type { AccessNow } from "./hours";

export const useLabel: Record<BuildingUse, string> = {
  library: "Library",
  "student-space": "Student space",
  teaching: "Teaching building",
  research: "Research building: desks, but not for students",
};

export const accessLabel: Record<AccessNow, string> = {
  open: "Open",
  card: "ANU card only",
  closed: "Closed",
};
