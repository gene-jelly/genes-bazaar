#!/usr/bin/env python3
"""
build_weeks.py — Emit per-week state for each district as a single JSON file.

For each district's extraction JSON, groups days into full Mon-Fri weeks
(using the same rules as count.py) and classifies each week into one
of six codes:

    u — unbroken (all 5 days full_instructional)
    e — early_release week (contains ≥1 early_release, no harder disruptions)
    t — teacher/PD week (contains teacher_only or weather_makeup_placeholder)
    h — holiday week (contains a holiday day)
    b — break week (contains a break day, i.e. multi-day closure)
    ? — fallback (should never fire if inputs are clean)

Priority order, worst → mildest: break > holiday > teacher > early > unbroken.
A week classified as "break" takes priority even if other disruption types
are also present, because the break defines the reader's experience.

Output: data/school-calendars/per-week.json, baked into the inline chart
script. Sort order matches the chart: descending by percent_weeks_unbroken.
"""
from __future__ import annotations

import json
import sys
from datetime import date, timedelta
from pathlib import Path

SCRIPT_DIR = Path(__file__).parent
DATA_DIR = SCRIPT_DIR.parent
EXTRACTIONS_DIR = DATA_DIR / "extractions"
SEED_PATH = DATA_DIR / "districts-seed.json"
OUT_PATH = DATA_DIR / "per-week.json"
CSV_PATH = DATA_DIR / "districts.csv"


def group_weeks(days: list[dict]) -> tuple[list[list[dict]], date | None]:
    """Full Mon-Fri weeks only; partial start/end weeks excluded. Matches count.py.

    Returns (weeks, first_monday) where first_monday is the Monday of the
    first full week included in the output (or None if no weeks).
    """
    by_date = {date.fromisoformat(d["date"]): d for d in days}
    if not by_date:
        return [], None
    dates = sorted(by_date.keys())
    first, last = dates[0], dates[-1]
    first_monday = first + timedelta(days=(7 - first.weekday()) % 7)
    last_friday = last - timedelta(days=(last.weekday() - 4) % 7)
    weeks = []
    m = first_monday
    strip_start: date | None = None
    while m + timedelta(days=4) <= last_friday:
        week = []
        ok = True
        for i in range(5):
            k = m + timedelta(days=i)
            if k not in by_date:
                ok = False
                break
            week.append(by_date[k])
        if ok:
            if strip_start is None:
                strip_start = m
            weeks.append(week)
        m += timedelta(days=7)
    return weeks, strip_start


def classify_week(week: list[dict]) -> str:
    """Return one-letter week code. Priority: break > holiday > teacher > early > unbroken."""
    types = {d["day_type"] for d in week}
    if "break" in types:
        return "b"
    if "holiday" in types:
        return "h"
    if "teacher_only" in types or "weather_makeup_placeholder" in types:
        return "t"
    if "early_release" in types:
        return "e"
    if types == {"full_instructional"}:
        return "u"
    return "?"


def load_district_order_from_csv(csv_path: Path) -> list[str]:
    """Return district_ids in CSV order (descending pct sort happens later)."""
    import csv as csvlib
    ids = []
    with csv_path.open() as f:
        reader = csvlib.DictReader(f)
        for row in reader:
            ids.append(row["district_id"])
    return ids


def main() -> int:
    if not EXTRACTIONS_DIR.exists():
        print(f"missing: {EXTRACTIONS_DIR}", file=sys.stderr)
        return 1

    # Read CSV for the aggregate stats (pct, streak, display name, state)
    import csv as csvlib
    stats_by_id: dict[str, dict] = {}
    with CSV_PATH.open() as f:
        reader = csvlib.DictReader(f)
        for row in reader:
            stats_by_id[row["district_id"]] = {
                "pct": float(row["percent_weeks_unbroken"]),
                "streak": int(row["longest_unbroken_streak"]),
                "name": row["district_name"],
                "state": row["state"],
            }

    districts_out = []
    for extraction_file in sorted(EXTRACTIONS_DIR.glob("*.json")):
        data = json.loads(extraction_file.read_text())
        district_id = data["district_id"]
        if district_id not in stats_by_id:
            print(f"skipping {district_id} (not in districts.csv)", file=sys.stderr)
            continue

        weeks, first_monday = group_weeks(data["days"])
        codes = "".join(classify_week(w) for w in weeks)

        stats = stats_by_id[district_id]
        districts_out.append({
            "id": district_id,
            "name": stats["name"],
            "state": stats["state"],
            "pct": stats["pct"],
            "streak": stats["streak"],
            "weeks": codes,
            "week_count": len(weeks),
            "first_monday": first_monday.isoformat() if first_monday else None,
        })

    # Sort descending by pct (matches chart order: best on top)
    districts_out.sort(key=lambda d: -d["pct"])

    # Compute global calendar alignment:
    # anchor = earliest first_monday across all districts. For each district,
    # offset = integer weeks between anchor and that district's first_monday.
    # The renderer uses this to left-pad strips so Thanksgiving, winter break,
    # and spring break appear in the same column across all 23 strips.
    anchor = min(
        date.fromisoformat(d["first_monday"])
        for d in districts_out
        if d["first_monday"]
    )
    last_monday = max(
        date.fromisoformat(d["first_monday"]) + timedelta(weeks=d["week_count"] - 1)
        for d in districts_out
        if d["first_monday"]
    )
    total_columns = ((last_monday - anchor).days // 7) + 1
    for d in districts_out:
        if d["first_monday"]:
            fm = date.fromisoformat(d["first_monday"])
            d["offset"] = (fm - anchor).days // 7
        else:
            d["offset"] = 0

    max_weeks = max(d["week_count"] for d in districts_out)
    out = {
        "districts": districts_out,
        "max_weeks": max_weeks,
        "total_columns": total_columns,
        "anchor_monday": anchor.isoformat(),
        "code_legend": {
            "u": "unbroken",
            "e": "early_release",
            "t": "teacher_only",
            "h": "holiday",
            "b": "break",
        },
    }
    OUT_PATH.write_text(json.dumps(out, indent=2) + "\n")
    print(f"wrote {OUT_PATH} — {len(districts_out)} districts, max_weeks={max_weeks}")

    # Sanity check: each district's 'u' count should match unbroken_five_day_weeks
    ok = True
    with CSV_PATH.open() as f:
        reader = csvlib.DictReader(f)
        for row in reader:
            dist = next((d for d in districts_out if d["id"] == row["district_id"]), None)
            if dist is None:
                continue
            u_count = dist["weeks"].count("u")
            expected = int(row["unbroken_five_day_weeks"])
            if u_count != expected:
                print(
                    f"  MISMATCH {dist['name']}: u={u_count} vs csv unbroken={expected}",
                    file=sys.stderr,
                )
                ok = False
    if ok:
        print("  ✓ all unbroken counts match districts.csv")
    return 0 if ok else 2


if __name__ == "__main__":
    raise SystemExit(main())
