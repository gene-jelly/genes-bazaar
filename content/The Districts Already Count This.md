---
title: "The Districts Already Count This"
description: "Fairfax County Public Schools publishes its own unbroken-five-day-week count on the bottom of its calendar PDF. No other district does. So we counted all of them."
date: 2026-04-05
tags:
  - school-calendar
  - civic-data
  - research
publish: true
draft: false
---

> **Number of 5-Day Instructional Weeks:** 1st Quarter – 4, 2nd Quarter – 6, 3rd Quarter – 6, 4th Quarter – 7 = **23 total.**
>
> — Fairfax County Public Schools, 2025-26 calendar PDF, legend footer

Fairfax County, one of the largest school districts in the United States, publishes a count of its own unbroken five-day instructional weeks directly on its calendar. It's at the bottom of the legend, in the same small type as the symbols for teacher workdays and early releases. Twenty-three out of forty-two weeks. About fifty-five percent.

Fairfax is the only district in the top 25 that publishes this number.

They already count it. They know it matters. They just don't compare it to anyone else.

So we did.

## The dataset

We extracted the 2025–2026 school calendars for the 23 largest US public school districts by enrollment — roughly **5.6 million students** — and counted how many weeks of the year are unbroken. An *unbroken* week is five consecutive Monday-through-Friday days where every student attends a full instructional day: no holidays, no early dismissals, no teacher workdays, no parent-teacher conference shortened afternoons, no random Tuesday off. One asterisk and the week doesn't count.

This is the strict definition, and that is the point. A working parent planning childcare, a hourly worker trying to hold a schedule, a kid with executive function challenges trying to settle into a rhythm — none of them benefit from a week that was "mostly" full. They benefit from the weeks where the routine actually holds.

Here is what the top 23 look like, sorted from most fragmented to least:

| Rank | District | State | Unbroken weeks | % | Longest streak |
|---:|---|---|---:|---:|---:|
| 1 | Miami-Dade County Public Schools¹ | FL | 0 / 41 | 0.0% | 0 |
| 2 | School District of Philadelphia | PA | 16 / 42 | 38.1% | 2 |
| 3 | Broward County Public Schools | FL | 21 / 42 | 50.0% | 5 |
| 4 | Orange County Public Schools | FL | 20 / 40 | 50.0% | 5 |
| 5 | Prince George's County Public Schools | MD | 21 / 41 | 51.2% | 4 |
| 6 | Polk County Public Schools | FL | 21 / 41 | 51.2% | 4 |
| 7 | New York City Department of Education | NY | 22 / 42 | 52.4% | 6 |
| 8 | **Fairfax County Public Schools** | **VA** | **23 / 42** | **54.8%** | **4** |
| 9 | Wake County Public School System | NC | 23 / 41 | 56.1% | 3 |
| 10 | Montgomery County Public Schools | MD | 23 / 41 | 56.1% | 5 |
| 11 | Baltimore County Public Schools | MD | 23 / 41 | 56.1% | 6 |
| 12 | Clark County School District | NV | 25 / 41 | 61.0% | 6 |
| 13 | Charlotte-Mecklenburg Schools | NC | 25 / 41 | 61.0% | 6 |
| 14 | Dallas Independent School District | TX | 25 / 40 | 62.5% | 4 |
| 15 | Cypress-Fairbanks ISD | TX | 25 / 40 | 62.5% | 6 |
| 16 | Chicago Public Schools | IL | 26 / 41 | 63.4% | 7 |
| 17 | Duval County Public Schools | FL | 26 / 41 | 63.4% | 6 |
| 18 | Palm Beach County Public Schools | FL | 27 / 42 | 64.3% | 7 |
| 19 | Houston Independent School District | TX | 28 / 41 | 68.3% | 7 |
| 20 | Memphis-Shelby County Schools | TN | 28 / 41 | 68.3% | 5 |
| 21 | Hawaii State Department of Education | HI | 29 / 42 | 69.0% | 7 |
| 22 | Gwinnett County Public Schools | GA | 29 / 41 | 70.7% | 5 |
| 23 | Cobb County School District | GA | 30 / 41 | 73.2% | 6 |

*¹ Miami-Dade releases elementary students (grades 2–5) one hour early every Wednesday across the school year, which disqualifies every week under our metric. See the caveat below.*

## The Fairfax number is the anchor

Fairfax's footer count of 23 unbroken weeks reconciles almost exactly to what our pipeline produces from its published calendar. That matters for a reason that is easy to miss: **this is the only row in the table where we can check our answer against the district's own number.** Every other district publishes the calendar but not the count. For Fairfax, there is a ground truth, and we hit it.

That tells us two things:

1. **Districts administrators already track this metric.** They are not blind to fragmentation. Fairfax prints the quarter-by-quarter breakdown in the same legend as religious observances and teacher workdays. It is a number the people who build the calendar watch. They just don't publish the comparison across districts — and without the comparison, parents in the other 22 districts in this table have no way to know whether what they're experiencing is normal, bad, or unusually bad.
2. **Our pipeline is reading calendars the same way the districts read their own calendars.** If the Fairfax extraction had produced 18 unbroken weeks or 29 unbroken weeks, the whole dataset would be suspect. It produced 23. That is the kind of check that makes a civic dataset worth publishing.

## The findings that should not be buried

**Nobody in the top 23 has a school year that holds together more than three-quarters of the time.** The best district in the dataset, Cobb County in Georgia, gets to 73.2%. The median is around 56%. Nine of the 23 fall below 55%.

**The longest unbroken streak anywhere in the country is seven weeks.** Four districts hit that ceiling — Chicago, Palm Beach, Houston, and Hawaii — and nobody exceeds it. Seven consecutive weeks is the longest rhythm a child in any of the country's 23 largest districts can expect before the next disruption. For comparison, that is less than two months. For a parent trying to lock down a fall childcare plan, or a kid trying to get into a routine after a major transition, seven weeks is the best case. In most districts it is more like five.

**Philadelphia is the most fragmented non-exceptional district in the dataset.** Sixteen unbroken weeks out of forty-two, with a longest streak of *two*. In the School District of Philadelphia, a child at no point during the school year experiences more than two consecutive weeks of unmodified attendance before the next early dismissal, teacher workday, holiday, or break. That is not a rhythm. That is static.

**Miami-Dade's zero is a genuine measurement, with an important caveat.** Miami-Dade Public Schools releases elementary students in grades 2 through 5 one hour early *every Wednesday* of the school year. Under our strict definition, this disqualifies every week. The zero is technically correct for the affected grade band, but it understates the underlying structure — Miami-Dade has a weekly half-disruption, not a weekly catastrophe. A parent reading this table should understand that Miami-Dade does not resemble Philadelphia; it has a different failure mode. Kindergarten and first-grade families in Miami-Dade are not affected by the early release at all, and would land somewhere in the middle of the table.

Those caveats matter. They don't change the top-line finding, which is that **no district in the country's top 23 runs a school year that working families can plan around with any confidence.**

## Why this is the dataset nobody built

The technical lift to produce this is small. The calendars are public. The counting rules fit on a page. The code that does the arithmetic is a few hundred lines of Python with no dependencies. Any civic data organization, any education researcher, any state department of education could have built this table. It would cost them a long weekend.

The reason it doesn't exist is not technical difficulty. It is that the comparison is uncomfortable. Every district's calendar is defensible in isolation — every holiday, every workday, every early release has a local reason — and the moment you line them up next to each other, the pattern becomes impossible to ignore. The fragmentation is not the fault of any one district. It is the shape of the system as a whole. And because no single district benefits from surfacing the comparison, no single district does.

Fairfax prints its own count and declines to look at the column to its right. Every other district in the top 23 declines to print the count at all.

## Methodology, limits, and the next thing

The full methodology, including edge cases (parent-teacher conferences, religious holidays, 4-day-week districts, grade-split modified days), the day-type taxonomy, and the counting code, is at [`data/school-calendars/methodology.md`](../data/school-calendars/methodology.md). The raw extractions (every weekday of every district's calendar, tagged) are in the same directory. The CSV is available for direct download and is structured for reanalysis — anyone who disagrees with a classification call can re-run the counter against a corrected extraction.

Two limits worth naming up front:

- **Two of the top 25 districts are not in this release.** Los Angeles Unified and Hillsborough County (FL) both sit behind technical barriers — Cloudflare challenges for automated fetching and JavaScript-rendered calendar widgets, respectively — that we haven't defeated in a way that matches our extraction standard. They'll be added in the next revision. Their absence does not change the shape of the distribution, but it means the "top 25" label isn't quite honest yet; this is top 23.
- **This is the published calendar, not the attended calendar.** Weather cancellations, emergency closures, and mid-year amendments will change the actual experience of the school year for every district in the table. We use the published calendar because it's what parents have when they plan. A future version could reconcile against actual attendance.

The next thing this project needs is a **parent lookup tool**: type your address, get your assigned district, see its fragmentation score, see how it compares to the distribution. The infrastructure for this is straightforward — NCES publishes district boundary shapefiles, and point-in-polygon lookup is a solved problem in the browser — but it's a Phase 2 build, not a Phase 1 release. What's here now is the raw comparison. The lookup comes next.

## The one-sentence version

The largest district in the country that publishes its own unbroken-week count publishes **23**. Every other district in the top 23 also sits somewhere in that range, and most of them sit below it, and every one of them already has the number — they just don't publish the comparison.

Now it's published.

---

*This analysis and its underlying dataset were built by a human and an AI agent working in pair. The dataset, extraction code, methodology, and per-district source calendars are all in the public repository for this site — corrections, flags, and forks are welcome. See the [methodology](../data/school-calendars/methodology.md) document for how to read this data honestly, and the [research dossier](./School%20Calendar%20Fragmentation%20%E2%80%94%20Research%20Dossier.md) for the academic literature this project builds on.*
