# Counting Spec — Extraction JSON → CSV Row

This is the spec for the deterministic counting step of the pipeline. It takes the human-verified extraction JSON (one file per district, `extractions/{district_id}.json`) and produces one row in `districts.csv`.

The counting script is intentionally boring. Every interesting judgment call — whether a day is `early_release` or `teacher_only`, whether a conference day counts as broken — is resolved upstream by the LLM extraction step and locked by human review. Counting is pure arithmetic over the tagged days.

## Inputs

- `extractions/{district_id-with-colon-escaped}.json` — day-by-day JSON per the extraction prompt schema. Every Mon–Fri weekday between `first_day_of_school` and `last_day_of_school` inclusive is classified with exactly one `day_type`.
- `districts-seed.json` — district metadata (rank, name, NCES enrollment, calendar URL, etc.)

## Outputs

One row per district appended to `districts.csv`, conforming to `schema.json`.

## Algorithm

```python
# Pseudocode — actual implementation in scripts/count.py (forthcoming)

def count_district(extraction: dict, seed: dict) -> dict:
    days = extraction["days"]
    # Sanity: every Mon-Fri between first and last day must appear exactly once
    assert_every_weekday_present(days, extraction["first_day_of_school"], extraction["last_day_of_school"])

    # 1. Group days into Mon-Fri blocks. Partial start/end weeks are EXCLUDED from total_calendar_weeks.
    #    A "week" is a 5-element group [Mon, Tue, Wed, Thu, Fri] all inside the school year.
    full_weeks = group_into_full_mon_fri_weeks(days)

    # 2. A week is "unbroken" iff all 5 days are day_type == "full_instructional".
    #    Any one of {early_release, teacher_only, holiday, break, weather_makeup_placeholder}
    #    disqualifies the week.
    unbroken_flags = [
        all(d["day_type"] == "full_instructional" for d in week)
        for week in full_weeks
    ]

    # 3. Longest streak = longest run of consecutive True values in unbroken_flags.
    #    Non-unbroken weeks reset the streak (this includes break weeks — a parent's
    #    perspective on continuity is what we're measuring).
    longest_streak = max_consecutive_true(unbroken_flags)

    # 4. Simple tallies over all days (not just full weeks — count every day in the school year).
    tallies = Counter(d["day_type"] for d in days)

    return {
        "rank": seed["rank"],
        "district_name": seed["district_name"],
        "district_id": seed["district_id"],
        "state": seed["state"],
        "enrollment": seed["enrollment_2023_24"],
        "school_year": seed["school_year"] or "2025-2026",
        "calendar_source_url": seed["calendar_url_2025_26"],
        "calendar_source_format": seed["calendar_format"],
        "first_day_of_school": extraction["first_day_of_school"],
        "last_day_of_school": extraction["last_day_of_school"],
        "total_weekdays_in_school_year": len(days),
        "total_calendar_weeks": len(full_weeks),
        "total_instructional_days": tallies["full_instructional"],
        "unbroken_five_day_weeks": sum(unbroken_flags),
        "percent_weeks_unbroken": round(100.0 * sum(unbroken_flags) / len(full_weeks), 1),
        "longest_unbroken_streak": longest_streak,
        "early_release_day_count": tallies["early_release"],
        "teacher_only_day_count": tallies["teacher_only"],
        "holiday_day_count": tallies["holiday"],
        "break_day_count": tallies["break"],
        "total_non_instructional_days": (
            tallies["early_release"] +
            tallies["teacher_only"] +
            tallies["holiday"] +
            tallies["break"]
        ),
        "has_multiple_calendars": seed.get("separate_elementary_calendar", False) or seed.get("has_multiple_tracks", False),
        "extracted_at": extraction["extraction_date"],
        "human_verified": False,  # set to True manually after human review
        "notes": extraction.get("extraction_notes", ""),
    }
```

## Invariants the script must check

1. `len(days)` equals the number of Mon–Fri weekdays between `first_day_of_school` and `last_day_of_school` inclusive. Mismatch means the extraction missed a day or duplicated one.
2. Every day's `day_type` is one of the six canonical values. Unknown values abort.
3. `days` are in chronological order with no gaps.
4. `total_instructional_days + early_release_day_count + teacher_only_day_count + holiday_day_count + break_day_count + weather_makeup_placeholder_count == total_weekdays_in_school_year`. The tallies must sum to the total. Any shortfall means an unaccounted-for day type.
5. `unbroken_five_day_weeks <= total_calendar_weeks`.
6. `longest_unbroken_streak <= unbroken_five_day_weeks`.

Any failed invariant aborts with a clear error and refuses to write to `districts.csv`. Garbage in, loud error out.

## Partial week handling

If the school year starts on a Wednesday, the first "week" of our count begins the following Monday. The three instructional days before that Monday (Wed/Thu/Fri of week 0) count toward `total_instructional_days` and `total_weekdays_in_school_year`, but NOT toward `total_calendar_weeks` or `unbroken_five_day_weeks`.

Same for partial ending weeks: if the year ends on a Tuesday, the final Mon–Tue are counted in day-level tallies but not in week-level totals.

This matches the methodology: "A week that is 'mostly full' is not a full week by the metric we care about" — and also, a partial week was never going to be a full week, so including it would artificially lower `percent_weeks_unbroken`.

## `weather_makeup_placeholder` handling

Phase 1 MVP behavior:
- If the calendar shows the day as a scheduled instructional day that will only become a holiday if triggered by an earlier weather cancellation, the extraction should classify it as `full_instructional` (the default state).
- If the calendar shows it as a day off that only becomes instructional if the district runs out of make-up days, the extraction should classify it as `holiday`.
- The `weather_makeup_placeholder` type exists as an escape hatch for districts whose calendars are genuinely ambiguous ("Day TBD — used for inclement weather"). These days are excluded from `unbroken_five_day_weeks` (they disqualify the week) and flagged in notes. The assumption is that a reviewer will upgrade them before publication.

## Implementation location

`scripts/count.py` (forthcoming). Dependencies: standard library only (`json`, `csv`, `datetime`, `collections`). No pandas, no external libs — this needs to stay auditable by anyone with basic Python.

Usage:

```
python3 scripts/count.py \
    --extractions data/school-calendars/extractions/ \
    --seed data/school-calendars/districts-seed.json \
    --out data/school-calendars/districts.csv
```

The script is idempotent: running it twice produces the same CSV.
