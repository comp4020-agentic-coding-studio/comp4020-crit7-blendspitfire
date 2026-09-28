import { sql } from "drizzle-orm";
import { int, sqliteTable, text } from "drizzle-orm/sqlite-core";

// The schema is the ground truth for the database. To change it: edit here,
// run `pnpm db:generate` to turn the diff into a migration under drizzle/,
// and commit both — the migration applies automatically when the server
// boots (see src/lib/db.ts), locally and deployed. Never edit the database
// by hand: state on the deployed volume outlives every deploy, and the
// migration trail is what keeps old state and new code compatible.
// Buildings and their hours are reference data in src/data/buildings.ts;
// building_number points into that list. Ratings are 1–5, higher is better
// (5 = silent, 5 = comfortable). Rows seeded to fill the page before real
// reviews exist have placeholder = true, so they can be found and removed.
export const reviews = sqliteTable("reviews", {
  id: int().primaryKey({ autoIncrement: true }),
  buildingNumber: text("building_number").notNull(),
  author: text().notNull(),
  quietness: int().notNull(),
  comfort: int().notNull(),
  comment: text().notNull(),
  placeholder: int({ mode: "boolean" }).notNull().default(false),
  createdAt: text("created_at")
    .notNull()
    .default(sql`(datetime('now'))`),
});

export type Review = typeof reviews.$inferSelect;
