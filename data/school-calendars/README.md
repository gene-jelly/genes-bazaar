# The School Calendar Project

A public dataset of US school calendar fragmentation. One row per district, with standardized metrics for unbroken five-day weeks, early-release days, in-service days, and total non-instructional days.

## Why this exists

No one maintains a national database of "unbroken weeks per district" for US K-12 schools. For 13,000+ school districts, there is no comparable data on calendar fragmentation. The Department of Education doesn't collect it. State DOEs don't publish it in a standardized form. Research organizations don't maintain it. This project is the first attempt.

The accompanying research — [The Swiss Cheese School Year](../../content/School%20Calendar%20Fragmentation.md), [the research dossier](../../content/School%20Calendar%20Fragmentation%20%E2%80%94%20Research%20Dossier.md), and [the essay](../../content/Nobody%20Chose%20This.md) — explains why this metric matters. The short version: roughly half of all US school weeks are broken by holidays, half-days, teacher in-service days, or early dismissals, and this costs working families roughly $55 billion per year (Ready Nation / CED estimates). But no one has measured the fragmentation itself, district by district. That's what this dataset is.

## Current status

**Phase 1 MVP**: Top 25 US districts by enrollment, hand-verified, ~12-15% of US K-12 students.

Phases 2 and 3 (top 100 and top 500) are future work. See [methodology.md](./methodology.md) for details.

## What's in the data

- [`districts.csv`](./districts.csv) — the primary artifact. One row per district.
- [`schema.json`](./schema.json) — column definitions and data types.
- [`methodology.md`](./methodology.md) — how we count, what "unbroken week" means operationally, how edge cases are handled.
- [`sources/`](./sources/) — archived copies of each district's 2025-26 calendar at the time of extraction.
- [`extractions/`](./extractions/) — the structured day-by-day JSON extracted from each calendar, one file per district.
- [`districts/`](./districts/) — per-district markdown dossier files explaining the extraction for each row, including any judgment calls.

## License

- **Data** (`districts.csv`, `schema.json`, everything in `extractions/`): [CC0 1.0](https://creativecommons.org/publicdomain/zero/1.0/) — public domain. Use it for anything. No attribution required (though attribution is appreciated).
- **Code** (any scripts under `scripts/` if added later): MIT.
- **Source PDFs** in `sources/`: original copyright holders (school districts). Factual extractions from them are not copyrightable under US law (Feist v. Rural, 1991).

## Contributing

If you find an error in the data, or you want to add a district we haven't covered, open an issue or pull request. This is a public good; contributions are welcome.

## How this was built

Calendars are parsed by an LLM (Claude) from the official district calendar PDF or HTML page. The LLM produces a structured day-by-day JSON of every Monday-through-Friday in the school year, tagged with a canonical day type. Deterministic code then computes the unbroken-week counts from that JSON. Every row is hand-verified by a human before publication.

The separation of "extraction" (LLM, hard, judgment-heavy) from "counting" (code, auditable, deterministic) is deliberate. If the counting logic changes, the same extracted JSON can be re-counted without re-parsing every calendar.

---

*Part of [Gene's Bazaar](https://gene-jelly.github.io/genes-bazaar). Questions, corrections, or collaboration welcome.*
