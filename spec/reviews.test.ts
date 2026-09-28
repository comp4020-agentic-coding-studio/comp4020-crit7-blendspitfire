import { describe, expect, inject, it } from "vitest";

// Crit 7 spec: "the core flow persists across a reload — create something,
// and it's still there". The core flow here is leaving a review on a building.
const baseUrl = inject("baseUrl");

const post = (path: string, body: URLSearchParams) =>
  fetch(new URL(path, baseUrl), {
    method: "POST",
    headers: { origin: baseUrl },
    body,
    redirect: "manual",
  });

describe("reviews", () => {
  const comment = `spec probe ${process.hrtime.bigint()}`;

  it("accepts a review and sends you back to the building", async () => {
    const res = await post(
      "/api/reviews",
      new URLSearchParams({
        building: "155",
        author: "Spec Probe",
        quietness: "4",
        comfort: "3",
        comment,
      }),
    );
    expect(res.status).toBe(303);
    expect(res.headers.get("location")).toBe("/buildings/155/");
  });

  it("persists the review: a fresh load of the building page shows it", async () => {
    const res = await fetch(new URL("/buildings/155/", baseUrl));
    expect(res.status).toBe(200);
    expect(await res.text()).toContain(comment);
  });

  it("refuses a rating outside 1–5", async () => {
    const bad = `out of range ${process.hrtime.bigint()}`;
    await post(
      "/api/reviews",
      new URLSearchParams({
        building: "155",
        author: "Spec Probe",
        quietness: "9",
        comfort: "3",
        comment: bad,
      }),
    );
    const res = await fetch(new URL("/buildings/155/", baseUrl));
    expect(await res.text()).not.toContain(bad);
  });
});
