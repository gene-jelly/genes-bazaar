#!/usr/bin/env python3
"""
count.py — Deterministic counting step for The School Calendar Project.

Reads per-district extraction JSON files and a seed metadata file, computes
fragmentation metrics, and writes districts.csv conforming to schema.json.

Design goal: boring, auditable arithmetic. Every judgment call lives upstream
in the LLM extraction step. This script only counts.

Usage:
    python3 scripts/count.py \
        --extractions data/school-calendars/extractions/ \
        --seed data/school-calendars/districts-seed.json \
        --out data/school-calendars/districts.csv
"""
from __future__ import annotations

import argparse
import csv
import json
import sys
from collections import Counter
from datetime import date, timedelta
from pathlib import Path

VALID_DAY_TYPES = {
    "full_instructional",
    "early_release",
    "teacher_only",
    "holiday",
    "break",
    "weather_makeup_placeholder",
}

UNBROKEN_REQUIRES = "full_instructional"


def weekdays_between(start: date, end: date) -> list[date]:
    """Return every Mon-Fri between start and end, inclusive."""
    out = []
    d = start
    while d <= end:
        if d.weekday() < 5:
            out.append(d)
        d += timedelta(days=1)
    return out


def group_into_full_mon_fri_weeks(days: list[dict]) -> list[list[dict]]:
    """Return list of 5-element [Mon..Fri] groups that fall entirely in the school year.

    Partial weeks at the start or end are excluded, per methodology.md.
    """
    # Index by date for lookup
    by_date = {date.fromisoformat(d["date"]): d for d in days}
    if not by_date:
        return []

    dates = sorted(by_date.keys())
    first, last = dates[0], dates[-1]

    # First Monday on or after `first`
    first_monday = first + timedelta(days=(7 - first.weekday()) % 7)
    # Last Friday on or before `last`
    last_friday = last - timedelta(days=(last.weekday() - 4) % 7)

    weeks = []
    m = first_monday
    while m + timedelta(days=4) <= last_friday:
        fri = m + timedelta(days=4)
        week = []
        ok = True
        for i in range(5):
            k = m + timedelta(days=i)
            if k not in by_date:
                ok = False
                break
            week.append(by_date[k])
        if ok:
            weeks.append(week)
        m += timedelta(days=7)
    return weeks


def max_consecutive_true(flags: list[bool]) -> int:
    best = cur = 0
    for f in flags:
        cur = cur + 1 if f else 0
        if cur > best:
            best = cur
    return best


def check_invariants(extraction: dict, district_id: str) -> None:
    """Raise AssertionError with a clear message on any invariant violation."""
    days = extraction["days"]
    first = date.fromisoformat(extraction["first_day_of_school"])
    last = date.fromisoformat(extraction["last_day_of_school"])

    expected = weekdays_between(first, last)
    expected_set = {d.isoformat() for d in expected}
    actual_set = {d["date"] for d in days}

    missing = expected_set - actual_set
    extra = actual_set - expected_set
    assert not missing, f"{district_id}: {len(missing)} weekdays missing from extraction, e.g. {sorted(missing)[:3]}"
    assert not extra, f"{district_id}: {len(extra)} extra days in extraction, e.g. {sorted(extra)[:3]}"
    assert len(days) == len(expected), f"{district_id}: day count mismatch {len(days)} vs expected {len(expected)}"

    for d in days:
        assert d["day_type"] in VALID_DAY_TYPES, f"{district_id}: unknown day_type {d['day_type']!r} on {d['date']}"

    # Chronological, no duplicates
    dates_sorted = sorted(d["date"] for d in days)
    assert dates_sorted == [d["date"] for d in sorted(days, key=lambda x: x["date"])]
    assert len(set(dates_sorted)) == len(dates_sorted), f"{district_id}: duplicate dates"


def count_district(extraction: dict, seed: dict) -> dict:
    district_id = extraction["district_id"]
    check_invariants(extraction, district_id)

    days = extraction["days"]
    full_weeks = group_into_full_mon_fri_weeks(days)

    unbroken_flags = [all(d["day_type"] == UNBROKEN_REQUIRES for d in week) for week in full_weeks]
    n_unbroken = sum(unbroken_flags)
    longest = max_consecutive_true(unbroken_flags)

    tallies = Counter(d["day_type"] for d in days)

    pct = round(100.0 * n_unbroken / len(full_weeks), 1) if full_weeks else 0.0

    # Sanity: tallies sum to total days
    assert sum(tallies.values()) == len(days), f"{district_id}: tally sum mismatch"

    return {
        "rank": seed["rank"],
        "district_name": seed["district_name"],
        "district_id": seed["district_id"],
        "state": seed["state"],
        "enrollment": seed["enrollment_2023_24"],
        "school_year": "2025-2026",
        "calendar_source_url": seed["calendar_url_2025_26"],
        "calendar_source_format": seed["calendar_format"],
        "first_day_of_school": extraction["first_day_of_school"],
        "last_day_of_school": extraction["last_day_of_school"],
        "total_weekdays_in_school_year": len(days),
        "total_calendar_weeks": len(full_weeks),
        "total_instructional_days": tallies["full_instructional"],
        "unbroken_five_day_weeks": n_unbroken,
        "percent_weeks_unbroken": pct,
        "longest_unbroken_streak": longest,
        "early_release_day_count": tallies["early_release"],
        "teacher_only_day_count": tallies["teacher_only"],
        "holiday_day_count": tallies["holiday"],
        "break_day_count": tallies["break"],
        "total_non_instructional_days": (
            tallies["early_release"] + tallies["teacher_only"] + tallies["holiday"] + tallies["break"]
        ),
        "has_multiple_calendars": seed.get("separate_elementary_calendar", False),
        "extracted_at": extraction.get("extraction_date", ""),
        "human_verified": False,
        "notes": extraction.get("extraction_notes", ""),
    }


def main() -> int:
    ap = argparse.ArgumentParser()
    ap.add_argument("--extractions", required=True)
    ap.add_argument("--seed", required=True)
    ap.add_argument("--out", required=True)
    args = ap.parse_args()

    with open(args.seed) as f:
        seed_list = json.load(f)
    seed_by_id = {d["district_id"]: d for d in seed_list}

    ext_dir = Path(args.extractions)
    rows = []
    for ext_path in sorted(ext_dir.glob("*.json")):
        with open(ext_path) as f:
            extraction = json.load(f)
        did = extraction["district_id"]
        if did not in seed_by_id:
            print(f"WARN: {ext_path.name} district_id {did} not in seed, skipping", file=sys.stderr)
            continue
        try:
            row = count_district(extraction, seed_by_id[did])
        except AssertionError as e:
            print(f"FAIL: {ext_path.name}: {e}", file=sys.stderr)
            return 1
        rows.append(row)

    rows.sort(key=lambda r: r["rank"])

    if not rows:
        print("No extractions found.", file=sys.stderr)
        return 1

    fieldnames = list(rows[0].keys())
    with open(args.out, "w", newline="") as f:
        w = csv.DictWriter(f, fieldnames=fieldnames)
        w.writeheader()
        w.writerows(rows)

    # Print a human-readable summary to stdout
    print(f"Wrote {len(rows)} rows to {args.out}\n")
    print(f"{'Rank':>4}  {'District':<42}  {'Weeks':>5}  {'Unbroken':>8}  {'%':>5}  {'Streak':>6}")
    print("-" * 80)
    for r in rows:
        print(
            f"{r['rank']:>4}  {r['district_name'][:42]:<42}  "
            f"{r['total_calendar_weeks']:>5}  {r['unbroken_five_day_weeks']:>8}  "
            f"{r['percent_weeks_unbroken']:>4}%  {r['longest_unbroken_streak']:>6}"
        )
    return 0


if __name__ == "__main__":
    sys.exit(main())
