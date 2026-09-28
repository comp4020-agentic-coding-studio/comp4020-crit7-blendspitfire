import type { APIRoute } from "astro";
import { buildings } from "../../data/buildings";
import { addReview } from "../../lib/db";

const rating = (value: FormDataEntryValue | null): number | undefined => {
  const n = Number(value);
  return Number.isInteger(n) && n >= 1 && n <= 5 ? n : undefined;
};

// A plain form POST: store the review, then 303 back to the building page so
// the browser re-renders it from the database. Invalid input stores nothing.
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

  if (author && comment && quietness && comfort) {
    addReview({ buildingNumber: number, author, quietness, comfort, comment });
  }
  return redirect(`/buildings/${encodeURIComponent(number)}/`, 303);
};
