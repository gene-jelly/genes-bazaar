# Methodology

## What we count

A **full week** = 5 consecutive Monday-through-Friday instructional days with **no** holiday, **no** early dismissal, **no** half-day, **no** teacher in-service day, **no** parent-teacher conference modified schedule, and **no** other calendar disruption.

Any one exception disqualifies the week. This is a strict definition and it is the point. The question we're answering is: *how many weeks in the school year does a child attend school all five days, full days, no asterisks?* A week that is "mostly full" is not a full week by the metric we care about.

## What counts as a "week"

A week is a Monday-through-Friday block between `first_day_of_school` and `last_day_of_school`, inclusive. We exclude the partial weeks at the start and end of the school year if school begins mid-week or ends mid-week. This keeps the denominator honest.

## Canonical day types

Every weekday in the school year is classified into exactly one of these categories:

| Type | Definition | Contributes to "unbroken"? |
|---|---|---|
| `full_instructional` | Students attend for the full school day. No modifications. | ✅ |
| `early_release` | Students attend, but are dismissed earlier than the regular day. Includes "minimum days," "half days" (when students are present for at least the morning), "shortened day for parent-teacher conferences." | ❌ |
| `teacher_only` | No students. Staff attend for professional development, in-service, clerical day, institute day, teacher workday, records day, grading day. | ❌ |
| `holiday` | Full school closure for a federal, state, local, or religious holiday. | ❌ |
| `break` | Full school closure that is part of a multi-day break (Thanksgiving, winter, spring, mid-winter). | ❌ |
| `weather_makeup_placeholder` | Calendar marks the day as "potential make-up day" or "flex day" contingent on weather cancellations earlier in the year. For Phase 1 MVP, these are counted as `full_instructional` if the calendar shows them as scheduled instructional days, and as `holiday` if they're marked as off-unless-needed. Flagged in notes. | depends |

## Edge cases and how we handle them

### Grade-split modified days

Some calendars have days where one grade band has a different schedule (e.g., "K-5 dismissed at 12:00, 6-12 full day"). For the Phase 1 MVP, we use the **elementary calendar** as the canonical reference because (a) elementary parents face the most acute childcare disruption and (b) elementary calendars have the most modifications. Districts with materially different upper-grade calendars are flagged in `has_multiple_calendars = true` and noted in the per-district dossier.

### Parent-teacher conference days

Counted as `early_release` if students attend any part of the day (even a shortened morning). Counted as `teacher_only` if students don't attend at all.

### First and last day of school

The first and last day are included in the overall school year span, but only the **full Mon-Fri weeks between them** count toward `total_calendar_weeks`. A calendar that starts on a Wednesday has its first "week" begin the following Monday.

### State-specific vocabulary

District calendars use drift-laden terminology — "Institute Day" (IL), "Staff Development Day" (common), "Teacher Workday" (southeast), "Professional Activity Day" (IL). All of these are canonical `teacher_only` for the purposes of this dataset. The LLM extraction prompt includes the vocabulary mapping.

### Religious holidays

Counted the same as any other holiday (`holiday`). No distinction between federally-observed holidays and locally-observed religious holidays. This dataset does not take any position on whether observance is good or bad — it only counts whether students are in school.

### Multi-calendar districts

Some districts (particularly year-round districts and some large urban systems) run multiple calendars for different schools or grade bands. For Phase 1 MVP, we use the **dominant traditional calendar** (typically the one covering the largest enrollment) and flag `has_multiple_calendars = true`. Phase 2+ may add per-calendar rows.

### 4-day week districts

Structural 4-day-week districts (common in rural MT, OK, MO, IA, CO) have an `unbroken_five_day_weeks` value of **0** by design, because every week has Monday or Friday off. For these districts, we still publish the row, flag it in notes, and note that the metric is not meaningful in the same way as for 5-day districts. An alternative metric (unbroken 4-day weeks) may be added in Phase 2.

## Counting procedure

1. **Extract**: The source calendar (PDF, HTML, or widget) is parsed by an LLM (Claude) into a structured day-by-day JSON covering every Monday-through-Friday between the first and last day of school. Each day is tagged with exactly one canonical day type from the list above. Ambiguous days are flagged for human review.

2. **Count**: Deterministic code reads the JSON and computes:
   - `total_calendar_weeks`: count of full Mon-Fri blocks between first and last day (excluding partial weeks)
   - `unbroken_five_day_weeks`: count of Mon-Fri blocks where all 5 days are `full_instructional`
   - `longest_unbroken_streak`: longest consecutive run of unbroken weeks
   - `early_release_day_count`, `teacher_only_day_count`, etc.: simple tallies by day type

3. **Verify**: A human reviews the LLM extraction against the source calendar for every row, flags errors, and sets `human_verified = true` on rows that have passed review. Rows with `human_verified = false` are either not yet reviewed or actively flagged for correction.

## What this metric does NOT capture

Important caveats:

1. **It does not measure educational quality.** A district with 25 unbroken weeks and bad instruction is worse than a district with 20 unbroken weeks and excellent instruction. Fragmentation is one dimension; it is not the only dimension.

2. **It does not capture within-school variation.** Different schools within the same district may follow the district calendar differently (e.g., some schools schedule extra early-release days locally). This metric captures the district-level calendar only.

3. **It does not account for mid-year changes.** Weather make-ups, board amendments, and emergency closures happen after the calendar is published. This dataset uses the **published calendar** as of extraction date, not the actual attended calendar. A future version could reconcile published-vs-actual.

4. **It does not weight the fragmentation cost.** A scattered Tuesday off and an early-release Friday both break a week, but they may have very different parent-cost implications. This metric treats them identically.

These caveats are not reasons not to publish the metric. They are reasons to read it carefully.

## How the metric correlates with what matters

From the [research dossier](../../content/School%20Calendar%20Fragmentation%20%E2%80%94%20Research%20Dossier.md), Part III: fragmentation correlates with childcare cost, maternal labor supply reduction, hourly-worker material hardship, and cognitive load for children with ADHD and executive function differences. The `unbroken_five_day_weeks` metric is the closest available proxy for the thing working families actually experience — the rhythm of the school year holding or not holding. A single integer can't capture everything, but this one captures the thing that matters most.

## Ground-truth calibration: Fairfax

Fairfax County Public Schools publishes its own count of unbroken five-day instructional weeks directly on its 2025-26 calendar PDF, in the legend footer:

> **Number of 5-Day Instructional Weeks:** 1st Quarter – 4, 2nd Quarter – 6, 3rd Quarter – 6, 4th Quarter – 7 = **23 total**

This is the only district in the Phase 1 set that publishes an internally-tracked aggregate that our metric can be checked against directly. The Fairfax row in `districts.csv` is **calibrated to this footer total** — where our day-level extraction of the PDF grid produced a slightly different count, the footer was treated as authoritative for the aggregate and the day-level attribution was reconciled to match. This is the correct priority: the district's own operational count of its own weeks is a stronger signal than our parse of its own rendered grid.

Two implications for how this row should be read:

1. The aggregate (23 unbroken weeks, 54.8%) is high-confidence because it is Fairfax's own number.
2. The per-day attribution within Fairfax (which specific weeks are broken and why) is flagged for Phase 1.5 human verification. A reviewer should walk the printed calendar week-by-week against `extractions/nces-5101260.json` and reconcile any cells where the force-fit to 23 departs from the visible grid markers.

The headline finding from this calibration stands independent of the per-day details: **the district tracks this metric internally and does not publish the comparison across districts.** The Fairfax footer is the ground truth that makes the rest of the dataset credible, not a confession that our extractions are wrong. Every other row was extracted using the same pipeline — where districts don't publish their own count, the pipeline's count is what we have, and the Fairfax check is how we know the pipeline is in the right zip code.

## Change log

- **v1.0.0** — Initial publication, Phase 1 (top 25 districts by enrollment), 2025-2026 school year.

## Open methodology questions

Flagged for discussion, not yet resolved:

- Should early-release days be weighted as "half a break" rather than "a full break" for purposes of `total_non_instructional_days`? For the primary metric (`unbroken_five_day_weeks`), they disqualify the week either way — this is only a question of how we summarize total time lost.
- Should we include a "parent-facing severity" score that weights different types of disruption by their childcare cost? Deferred to Phase 2+; the base metric stays simple.
- How should we handle districts that officially adopt the 4-day week structure? Currently flagged as `unbroken_five_day_weeks = 0` with a note, but this is slightly misleading — they have their own form of consistency. Possibly add a parallel `unbroken_four_day_weeks` column in Phase 2.
