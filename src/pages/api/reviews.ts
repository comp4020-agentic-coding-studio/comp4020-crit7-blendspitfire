import type { APIRoute } from "astro";
import { buildings } from "../../data/buildings";
import { addReview } from "../../lib/db";

const rating = (value: FormDataEntryValue | null): number | undefined => {
  const n = Number(value);
  return Number.isInteger(n) && n >= 1 && n <= 5 ? n : undefined;
};

// A plain form POST: store the review, then 303 back to the building page so
// the browser re-renders it from the database. Invalid input stores nothing
// and sends the visitor back with ?error= so they know why.
export const POST: APIRoute = async ({ request, redirect }) => {
  const form = await request.formData();
  const number = String(form.get("building") ?? "");
  if (!buildings.some((b) => b.number === number)) {
    return new Response("Unknown building", { status: 400 });
  }

  const author = String(form.get("author") ?? "").trim().slice(0, 60);
  const comment = String(form.get("comment") ?? "").trim().slice(0, 1000);
  const quietness = rating(form.get("quietness"));
  const comfort = rating(form.get("comfort"));

  const missing: string[] = [];
  if (!author) missing.push("your name");
  if (!comment) missing.push("a comment");
  if (!quietness) missing.push("a quietness rating (1–5)");
  if (!comfort) missing.push("a comfort rating (1–5)");

  const url = `/buildings/${encodeURIComponent(number)}/`;
  if (missing.length > 0 || !quietness || !comfort) {
    const message = `Review not saved — missing ${missing.join(", ")}.`;
    return redirect(`${url}?error=${encodeURIComponent(message)}`, 303);
  }

  addReview({ buildingNumber: number, author, quietness, comfort, comment });
  return redirect(url, 303);
};
