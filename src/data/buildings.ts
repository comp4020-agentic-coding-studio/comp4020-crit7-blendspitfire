// ANU Acton buildings where a student could plausibly sit at a table.
// Numbers, names and grid references come from the ANU campus map building
// index (Facilities & Services, June 2018); 153–156 are the Kambri precinct,
// opened after that map. Residences, stores, car parks, plant rooms and
// childcare are left out on purpose.
//
// `use` is what the building is for, which is not the same as whether you can
// study in it: a research building has desks, but they aren't meant for you.

export type BuildingUse = "library" | "student-space" | "teaching" | "research";

// Opening hours are a list of windows; any time outside every window is
// closed. "open" means anyone can walk in, "card" means an ANU card swipe.
// Every window records where it came from: grep for `source: "invented"` (or
// read `INVENTED` below) to find each guess that still needs a real source.
export type Access = "open" | "card";
export type HoursSource = "published" | "invented";

export interface HoursWindow {
  days: "weekdays" | "weekends";
  from: string;
  to: string;
  access: Access;
  source: HoursSource;
}

export interface Building {
  number: string;
  name: string;
  grid: string;
  use: BuildingUse;
}

export interface BuildingHours {
  windows: HoursWindow[];
  // where the published windows came from, and when they were last checked
  url?: string;
  checked?: string;
}

const LIBCAL = "https://anu.libcal.com/hours";
const STUDYING_WELL =
  "https://www.anu.edu.au/students/health-safety-wellbeing/living-well/studying-well";

const w = (
  days: HoursWindow["days"],
  from: string,
  to: string,
  access: Access,
  source: HoursSource,
): HoursWindow => ({ days, from, to, access, source });

const libraryAllHours: HoursWindow[] = [
  w("weekdays", "00:00", "09:00", "card", "published"),
  w("weekdays", "09:00", "17:00", "open", "published"),
  w("weekdays", "17:00", "24:00", "card", "published"),
  w("weekends", "00:00", "24:00", "card", "published"),
];

const published: Record<string, BuildingHours> = {
  "15": { windows: libraryAllHours, url: LIBCAL, checked: "2026-09-28" },
  "43": { windows: libraryAllHours, url: LIBCAL, checked: "2026-09-28" },
  "5": { windows: libraryAllHours, url: LIBCAL, checked: "2026-09-28" },
  "2": {
    windows: [w("weekdays", "10:00", "16:00", "open", "published")],
    url: LIBCAL,
    checked: "2026-09-28",
  },
  "105": {
    windows: [
      w("weekdays", "08:00", "09:00", "card", "published"),
      w("weekdays", "09:00", "17:00", "open", "published"),
      w("weekdays", "17:00", "22:00", "card", "published"),
    ],
    url: LIBCAL,
    checked: "2026-09-28",
  },
  // ANU publishes the weekday walk-in hours and says weekends need a card,
  // but not the times of the card-only windows.
  "155": {
    windows: [
      w("weekdays", "08:00", "19:00", "open", "published"),
      w("weekdays", "19:00", "24:00", "card", "invented"),
      w("weekends", "08:00", "22:00", "card", "invented"),
    ],
    url: STUDYING_WELL,
    checked: "2026-09-28",
  },
  "153": {
    windows: [w("weekdays", "08:00", "18:00", "open", "published")],
    url: STUDYING_WELL,
    checked: "2026-09-28",
  },
  "154": {
    windows: [w("weekdays", "09:00", "17:00", "open", "published")],
    url: STUDYING_WELL,
    checked: "2026-09-28",
  },
  // after hours needs a supervisor's approval, so it is closed to a student
  "38": {
    windows: [w("weekdays", "08:00", "18:00", "open", "published")],
    url: "https://physics.anu.edu.au/intra/whs/guide/chapter.php?id=1",
    checked: "2026-09-28",
  },
};

const INVENTED: Record<BuildingUse, HoursWindow[]> = {
  library: [w("weekdays", "09:00", "17:00", "open", "invented")],
  "student-space": [w("weekdays", "08:00", "18:00", "open", "invented")],
  teaching: [
    w("weekdays", "07:30", "18:00", "open", "invented"),
    w("weekdays", "18:00", "22:00", "card", "invented"),
  ],
  research: [w("weekdays", "08:30", "17:30", "open", "invented")],
};

export function hoursFor(building: Building): BuildingHours {
  return published[building.number] ?? { windows: INVENTED[building.use] };
}

export const buildings: Building[] = [
  // libraries
  { number: "15", name: "JB Chifley Building (Chifley Library)", grid: "3F", use: "library" },
  { number: "43", name: "WK Hancock Building (Hancock Library)", grid: "4E", use: "library" },
  { number: "2", name: "RG Menzies Building (Menzies Library)", grid: "3D", use: "library" },
  { number: "5", name: "Law School (Law Library)", grid: "3D", use: "library" },
  { number: "105", name: "School of Art (Art & Music Library)", grid: "2E", use: "library" },

  // spaces built for students to be in
  { number: "154", name: "Di Riddell Student Centre", grid: "2F", use: "student-space" },
  { number: "153", name: "Lowitja O'Donoghue Cultural Centre", grid: "2F", use: "student-space" },
  { number: "13A", name: "CASS Graduate Student Centre", grid: "2F", use: "student-space" },
  { number: "12", name: "Melville Hall", grid: "3F", use: "student-space" },
  { number: "1", name: "University House", grid: "2C", use: "student-space" },

  // teaching buildings: lecture theatres, tutorial rooms, busy foyers
  { number: "155", name: "Marie Reay Teaching Centre", grid: "2F", use: "teaching" },
  { number: "22", name: "Haydon-Allen Building", grid: "3F", use: "teaching" },
  { number: "24", name: "Copland Building", grid: "2F", use: "teaching" },
  { number: "25A", name: "HW Arndt Building", grid: "2G", use: "teaching" },
  { number: "26C", name: "College of Business and Economics", grid: "3G", use: "teaching" },
  { number: "27", name: "John Dedman Mathematical Sciences Building", grid: "3G", use: "teaching" },
  { number: "32", name: "Engineering Building", grid: "4F", use: "teaching" },
  { number: "108", name: "Computer Science & Information Technology Building", grid: "4G", use: "teaching" },
  { number: "115", name: "Brian Anderson Building", grid: "4G", use: "teaching" },
  { number: "136", name: "Science Teaching Building", grid: "4F", use: "teaching" },
  { number: "145", name: "Hanna Neumann Building", grid: "4E", use: "teaching" },
  { number: "7", name: "Law Link Building", grid: "3D", use: "teaching" },
  { number: "132", name: "JG Crawford Building", grid: "2A", use: "teaching" },
  { number: "124", name: "Anthony Low Building", grid: "3C", use: "teaching" },
  { number: "127", name: "Centre for Arab and Islamic Studies", grid: "3E", use: "teaching" },
  { number: "188", name: "Australian Centre on China in the World", grid: "3D", use: "teaching" },
  { number: "73", name: "Old Canberra House", grid: "2A", use: "teaching" },
  { number: "38", name: "Physics Building", grid: "4F", use: "teaching" },
  { number: "39", name: "Psychology Building", grid: "4F", use: "teaching" },
  { number: "48", name: "Forestry Building", grid: "4E", use: "teaching" },
  { number: "48A", name: "Geography Building", grid: "4E", use: "teaching" },
  { number: "46", name: "RN Robertson Building", grid: "4E", use: "teaching" },
  { number: "56", name: "Leonard Huxley Building", grid: "4B", use: "teaching" },
  { number: "100", name: "School of Music (Llewellyn Hall)", grid: "2E", use: "teaching" },
  { number: "110", name: "Baldessin Precinct Building", grid: "2E", use: "teaching" },
  { number: "62", name: "M Block", grid: "3C", use: "teaching" },

  // research and office buildings: desks exist, but not for you
  { number: "9", name: "HC Coombs Building", grid: "2D", use: "research" },
  { number: "130", name: "Hedley Bull Building", grid: "2D", use: "research" },
  { number: "13", name: "Beryl Rawson Building", grid: "2F", use: "research" },
  { number: "14", name: "AD Hope Building", grid: "3F", use: "research" },
  { number: "26", name: "LF Crisp Building", grid: "3F", use: "research" },
  { number: "21", name: "PAP Moran Building", grid: "3F", use: "research" },
  { number: "146", name: "RSSS Building", grid: "3F", use: "research" },
  { number: "19", name: "David Cocking Building", grid: "3G", use: "research" },
  { number: "31", name: "Ian Ross Building", grid: "4F", use: "research" },
  { number: "42", name: "Peter Baume Building", grid: "5F", use: "research" },
  { number: "120", name: "Sir Roland Wilson Building", grid: "1D", use: "research" },
  { number: "121", name: "Peter Karmel Building", grid: "2F", use: "research" },
  { number: "141", name: "Frank Fenner Building", grid: "4E", use: "research" },
  { number: "134", name: "Linnaeus Building", grid: "4E", use: "research" },
  { number: "116", name: "Gould Building", grid: "5E", use: "research" },
  { number: "44", name: "Banks Building", grid: "5E", use: "research" },
  { number: "137", name: "Chemistry Building", grid: "4F", use: "research" },
  { number: "131", name: "John Curtin School of Medical Research", grid: "4C", use: "research" },
  { number: "54", name: "Florey Building", grid: "4C", use: "research" },
  { number: "117", name: "Hugh Ennor Building", grid: "3C", use: "research" },
];
