import { mkdirSync } from "node:fs";
import { dirname } from "node:path";
import Database from "better-sqlite3";
import { avg, count, desc, eq } from "drizzle-orm";
import { drizzle } from "drizzle-orm/better-sqlite3";
import { migrate } from "drizzle-orm/better-sqlite3/migrator";
import { type Review, reviews } from "./schema";

// One SQLite file is the app's whole persistent state. In production
// fly.toml points DATABASE_PATH at the machine's volume (/data), which is
// how state survives a reload and a redeploy; locally it defaults to an
// untracked file in .data/.
const path = process.env.DATABASE_PATH ?? "./.data/app.db";
mkdirSync(dirname(path), { recursive: true });

const client = new Database(path);
client.pragma("journal_mode = WAL");

export const db = drizzle(client);

// Migrations run at boot, on whatever machine holds the volume — the
// recommended shape for SQLite on Fly, where there's no separate machine to
// run them from. The flow: edit src/lib/schema.ts, `pnpm db:generate`,
// commit the migration it writes to drizzle/.
migrate(db, { migrationsFolder: "./drizzle" });

export type { Review };

export interface Ratings {
  quietness: number;
  comfort: number;
  count: number;
}

export function listReviews(buildingNumber: string): Review[] {
  return db
    .select()
    .from(reviews)
    .where(eq(reviews.buildingNumber, buildingNumber))
    .orderBy(desc(reviews.id))
    .all();
}

export function ratingsByBuilding(): Map<string, Ratings> {
  const rows = db
    .select({
      buildingNumber: reviews.buildingNumber,
      quietness: avg(reviews.quietness),
      comfort: avg(reviews.comfort),
      count: count(),
    })
    .from(reviews)
    .groupBy(reviews.buildingNumber)
    .all();
  return new Map(
    rows.map((r) => [
      r.buildingNumber,
      { quietness: Number(r.quietness), comfort: Number(r.comfort), count: r.count },
    ]),
  );
}

export function addReview(review: {
  buildingNumber: string;
  author: string;
  quietness: number;
  comfort: number;
  comment: string;
}): Review {
  return db.insert(reviews).values(review).returning().get();
}
