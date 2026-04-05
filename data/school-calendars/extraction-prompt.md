# Extraction Prompt — School Calendar to Day-by-Day JSON

This is the prompt used to parse a district calendar (PDF, HTML, or image) into a structured day-by-day JSON. It is the hardest, most judgment-heavy step in the pipeline and the reason every row is human-verified before publication.

The output of this step feeds into a deterministic counting script (`scripts/count.py`, forthcoming) that computes `unbroken_five_day_weeks`, `longest_unbroken_streak`, and all the tally fields. That separation is deliberate: if the counting logic changes, the same extracted JSON can be re-counted without re-parsing every calendar.

---

## System prompt

> You are an assistant extracting structured data from a US public school district academic calendar. Your job is to classify every Monday-through-Friday weekday in the school year into exactly one canonical day type. You do not interpret; you classify. Where the source is ambiguous, you flag it rather than guess.

## User prompt template

Replace the ALL-CAPS fields before running.

```
District: {{DISTRICT_NAME}}
State: {{STATE}}
School year: {{SCHOOL_YEAR}}
First day of school: {{FIRST_DAY}}
Last day of school: {{LAST_DAY}}
Calendar source: {{CALENDAR_URL}}
Calendar format: {{HTML | PDF | interactive_widget | image_only}}
Grade band: elementary (use elementary calendar when district publishes separate elementary/secondary)

Attached: the full text (or image) of the official district calendar for {{SCHOOL_YEAR}}.

---

## Task

1. Read every date notation, legend entry, and footnote in the attached calendar.
2. For every Monday-through-Friday weekday between {{FIRST_DAY}} and {{LAST_DAY}} inclusive, assign exactly one `day_type` from this list:

| day_type | Definition |
|---|---|
| `full_instructional` | Students attend for the full regular school day. No modifications of any kind. |
| `early_release` | Students attend but are dismissed earlier than the regular day. Includes "minimum day," "half day" (if students attend any part), "early dismissal," "shortened day for parent-teacher conferences," "1-hour early release," etc. |
| `teacher_only` | No students. Staff attend. Synonyms across districts: "Institute Day" (IL), "Staff Development Day," "Teacher Workday," "Professional Activity Day," "Professional Development," "Clerical Day," "Records Day," "Grading Day," "In-Service." ALL of these are `teacher_only`. |
| `holiday` | Full school closure for a federal, state, local, or religious holiday. Single-day closures not part of a multi-day break. |
| `break` | Full school closure that is part of a multi-day break: Thanksgiving week, winter/holiday break, spring break, mid-winter break, fall break. |
| `weather_makeup_placeholder` | The calendar explicitly marks the day as a "potential make-up day" or "flex day" contingent on earlier weather cancellations. Only use this if the calendar's own legend says so. |

3. For each classified day, record:
   - `date`: ISO 8601 (YYYY-MM-DD)
   - `weekday`: "Mon" | "Tue" | "Wed" | "Thu" | "Fri"
   - `day_type`: one of the above
   - `source_label`: the exact text shown on the source calendar for this day ("Labor Day," "Prof. Dev.," "½ Day — P/T Conf.", "" if unmarked). This is your evidence trail.
   - `confidence`: "high" | "medium" | "low". Use `low` for anything ambiguous — unusual legend entries, unreadable image regions, conflicts between calendar grid and footnotes, unclear whether students attend, grade-band-split days.
   - `notes`: (optional) free-text flag for anything a human reviewer should look at.

4. Output STRICTLY this JSON shape, nothing else:

```json
{
  "district_name": "{{DISTRICT_NAME}}",
  "district_id": "{{DISTRICT_ID}}",
  "school_year": "{{SCHOOL_YEAR}}",
  "grade_band_used": "elementary",
  "first_day_of_school": "{{FIRST_DAY}}",
  "last_day_of_school": "{{LAST_DAY}}",
  "extraction_model": "claude-sonnet-4-6",
  "extraction_date": "YYYY-MM-DD",
  "days": [
    {
      "date": "2025-09-02",
      "weekday": "Tue",
      "day_type": "full_instructional",
      "source_label": "",
      "confidence": "high"
    },
    {
      "date": "2025-09-01",
      "weekday": "Mon",
      "day_type": "holiday",
      "source_label": "Labor Day",
      "confidence": "high"
    }
    // ...
  ],
  "extraction_notes": "Free-text summary of any judgment calls, conflicts, or things a reviewer should check.",
  "ambiguous_day_count": 0
}
```

## Rules

- **Include every Mon–Fri weekday** between first and last day of school, inclusive. Do not skip weekdays. Do not include weekends.
- **Do not infer**. If the calendar does not mark a day, it is `full_instructional` with `source_label: ""`. This is the default, but verify the calendar legend actually says "unmarked = student attendance day" — most do.
- **Parent-teacher conferences**: if students attend any part of the day (morning session only, shortened day), classify as `early_release`. If students do not attend at all, classify as `teacher_only`.
- **First and last day**: include them. They are instructional days unless the calendar explicitly marks them as half-days (in which case `early_release`) or teacher-only (in which case `teacher_only`).
- **Holidays that fall on weekends**: ignore. We only classify Mon–Fri.
- **"Observed" holidays**: if Veterans Day falls on a Saturday and the district closes the preceding Friday, the Friday is `holiday`.
- **Multi-day breaks**: any weekday inside a labeled break week (Thanksgiving, winter, spring, mid-winter, fall) is `break`, not `holiday`. A standalone holiday (MLK Day, Presidents' Day, Juneteenth, Columbus Day, Good Friday) is `holiday`.
- **Grade-split days**: if the calendar shows different behavior for different grade bands on the same day (e.g., "K-5 dismissed at 12:00, 6-12 full day"), use the elementary row. Set `confidence: medium` and note it.
- **Weather make-up days**: if the calendar explicitly lists a day as "make-up day (if needed)" or "flex day," classify as `weather_makeup_placeholder` and flag it. A human will decide downstream how to count it.
- **Ambiguous or unreadable days**: classify your best guess, set `confidence: low`, and add a specific note. Increment `ambiguous_day_count`.
- **No hallucination**: if the source does not show a day, do not invent one. Check that your `days` array length equals the number of Mon–Fri weekdays between first and last day, inclusive.
- **Do not output anything except the JSON object**. No preamble, no explanation, no markdown fences around the JSON in the final output. The downstream counting script parses the raw JSON.
```

---

## Vocabulary normalization table

State and regional drift in terminology. All of these map to `teacher_only`:

| Source term | Canonical |
|---|---|
| Institute Day (IL) | `teacher_only` |
| Staff Development Day | `teacher_only` |
| Teacher Workday (southeast, NC/GA/FL) | `teacher_only` |
| Professional Activity Day (IL, MI) | `teacher_only` |
| Professional Development / Prof. Dev. / PD Day | `teacher_only` |
| Clerical Day | `teacher_only` |
| Records Day | `teacher_only` |
| Grading Day | `teacher_only` |
| In-Service / Inservice | `teacher_only` |
| Data Day | `teacher_only` |
| Planning Day | `teacher_only` |

All of these map to `early_release`:

| Source term | Canonical |
|---|---|
| Early Release / Early Dismissal | `early_release` |
| Minimum Day (CA) | `early_release` |
| Half Day / ½ Day (students present any portion) | `early_release` |
| Shortened Day | `early_release` |
| P/T Conf Day (shortened) | `early_release` |
| Early-Out | `early_release` |

## Running the extraction

For Phase 1 MVP, extractions are run interactively: open the source PDF/HTML, paste it into a Claude conversation along with the prompt above, save the resulting JSON to `extractions/{nces_id}.json`. A human reviewer then verifies against the source before setting `human_verified = true` in the final CSV row.

In Phase 2+, this should move to a scripted Anthropic API call with the PDF attached, iterating over the seed list. That script does not exist yet.
