# Where can I study at ANU?

A study-space finder for ANU's Acton campus: a list of buildings you can
currently walk into or swipe into, their opening hours, and short reviews of
what studying there is actually like (quietness, comfort). Built for a
student trying to answer "where can I sit down and work right now" in the
minute they ask it, not a full campus wayfinding tool.

## What good looks like here

Real occupancy sensors (the model used by tools like Occuspace at other
universities) aren't available here, and faking a live headcount would
present invented data as fact — this app's rule is to label anything
invented rather than pass it off as real, so a fabricated occupancy number
was ruled out rather than attempted. The closer precedent is university
tools like Duke's and Michigan's "Find a Study Space" and Leeds'
Spacefinder: a filterable list plus published opening hours, no simulated
occupancy. That's the shape this app follows: filter by building type and by
"open right now", backed by real opening-hours data where ANU publishes it,
and by a clearly labelled estimate where it doesn't.

Enforced by `spec/`: the core flow (leave a review, reload, it's still
there) persists across a reload; every page has a language, a title, one
top-level heading, a nav landmark, and passes an automated accessibility
floor. Judgement calls, not tested: which building categories to filter by,
the fixed sort order on the home page (open now, then quieter, then name),
and choosing to link out to ANU's own campus map rather than reimplement one
with invented coordinates.

## Known limitations

- **Most opening hours are invented, not published.** Only 9 of the 57
  buildings listed have hours sourced from an actual ANU page (libraries,
  Kambri buildings, a few others); the rest fall back to a generic estimate
  for their building type. Every invented time is marked "unverified" in the
  hours table — treat those as a guess, not a fact.
- **No accessibility data.** Step-free access, lifts, accessible toilets and
  similar aren't modelled at all.
- **Public holidays aren't modelled.** A holiday Monday is treated as an
  ordinary Monday, even though buildings are typically closed or on reduced
  hours.
- **Reviews are a mix of real and seeded fictional ones.** A handful of
  reviews were seeded to make the page useful before real ones existed and
  are clearly labelled "sample review" — the rest are genuine crowd-sourced
  submissions, unmoderated.
- **No live occupancy data.** There's no sensor or headcount — see above for
  why that wasn't faked.
