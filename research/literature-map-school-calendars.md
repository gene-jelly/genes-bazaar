---
title: "Literature Map: School Calendar Fragmentation"
description: "Structured map of academic and policy research on instructional-time variation, school calendar fragmentation, and its labor/household consequences. Companion to the unbroken-weeks dataset."
date: 2026-04-05
tags:
  - school-calendar
  - literature-map
  - research
  - civic-data
---

# Literature Map: School Calendar Fragmentation and Its Consequences

*Companion to the 23-district "unbroken five-day weeks" dataset (2025–2026). This map catalogs the academic and policy literature that touches the dataset's core question from adjacent angles, and identifies what the dataset adds that nobody has published.*

## Executive Summary

The academic literature on instructional time, school calendars, and their family consequences is unevenly developed. **Total instructional time** is well studied — adding or subtracting hours has measurable effects on achievement, with clean identification from Israeli, US, and Oregon settings. **Snow days and absences** are well studied, with Goodman (NBER 2014) establishing the decisive finding that coordinated closures are absorbed but *individual, irregular* absences damage achievement. **Four-day school weeks** are a thriving sub-literature (Thompson, Morton, Kuhfeld, Turner, Ward) that measures student achievement, teacher retention, and — crucially for this dataset — maternal labor supply impacts from calendar structure changes.

What is conspicuously missing: **no cross-district comparison of within-year fragmentation at a fixed 180-day budget.** The four-day-week literature compares 180-day calendars to ~144-day calendars; nobody compares a 180-day block-structured calendar to a 180-day swiss-cheese calendar. Goodman's snow-day result is the closest mechanistic analog — it says *irregular disruption damages achievement holding total time roughly constant* — but it treats weather as the source of irregularity, not administrative calendar design. OECD comparative work measures total hours, not fragmentation. No US research organization (RAND, Brookings Brown Center, Learning Policy Institute, Hamilton Project, Upjohn, CEPR) has published a comparable 23-district unbroken-weeks table.

The dataset's core contribution: it is the first standardized cross-district measurement of within-year calendar fragmentation under a strict definition, and it establishes a ceiling (seven weeks) and a median (~56%) that the literature has no existing reference values for. The labor economics literature has the tools to estimate the maternal labor supply cost of this fragmentation but has pointed them only at pandemic closures and four-day weeks; the scattered-day regime is unstudied.

---

## 1. NBER and Instructional Time — What Happens When You Change the Time Budget

This is the foundation layer. These papers establish that instructional time matters and that not all time is created equal.

### Goodman, Joshua. "Flaking Out: Student Absences and Snow Days as Disruptions of Instructional Time." NBER Working Paper 20221, 2014.
<https://www.nber.org/papers/w20221>
The single most mechanistically relevant paper for the fragmentation dataset. Goodman exploits Massachusetts weather variation and finds that *coordinated* closures (snow days that close the whole school) have essentially no effect on achievement — teachers recover the lost time — while *uncoordinated* individual absences reduce math achievement by ~0.05 SD each. The mechanism he proposes: teachers can re-synchronize a whole class after a shared closure, but cannot re-synchronize a class where different kids were out on different days. This is directly applicable to calendar fragmentation: early-release days, half-days, and grade-split modified days fragment the *within-day* experience and likely produce the same coordination cost Goodman measures.

### Rivkin, Steven G., and Jeffrey C. Schiman. "Instruction Time, Classroom Quality, and Academic Achievement." NBER Working Paper 19464, 2013.
<https://www.nber.org/papers/w19464>
Uses PISA data across 31 countries to show that achievement increases with instruction time, but the effect depends heavily on classroom quality. Central finding: an hour of high-quality instruction buys more achievement than an hour of low-quality instruction, and the marginal return to added time is conditional on quality. Relevant for the dossier because it implies that the *marginal week* lost to fragmentation is not equivalent to the *average week* — you tend to lose the highest-coordination weeks (those where routine has had time to build).

### Lavy, Victor. "Expanding School Resources and Increasing Time on Task: Effects of a Policy Experiment in Israel on Student Academic Achievement and Behavior." NBER Working Paper 18369, 2012 (published *Economic Journal* 2015 under a similar title).
<https://www.nber.org/papers/w18369>
Clean causal identification from an Israeli policy that added instructional hours. Significant gains across math, science, and English. Establishes a headline effect size for *added* time. The inverse — the cost of *removed* time — is the question the fragmentation dataset raises. Neither Lavy nor anyone else has separated "removed time in a block" from "removed time scattered across the year."

### Aucejo, Esteban M., and Teresa Foy Romano. "Assessing the Effect of School Days and Absences on Test Score Performance." *Economics of Education Review* 55 (2016): 70–87.
<https://www.sciencedirect.com/science/article/abs/pii/S0272775716301455>
Companion finding to Goodman: a 10-day increase in the school year raises math scores ~1.7%, while a 10-day increase in absences reduces them much more. Same asymmetry — scheduled time is less valuable than attended time, and scattered disruption is more damaging than block time. Uses North Carolina data.

### Taylor, Eric S. "Teachers' Use of Class Time and Student Achievement." NBER Working Paper 30686, 2022.
<https://www.nber.org/papers/w30686>
Shifts the question from total hours to how hours are used, but includes the adjacent finding that *predictability of instructional blocks* matters — teachers make different allocation decisions when they can count on a stable week vs. a fragmented one. Suggestive rather than causal on fragmentation specifically.

### Bellei, Cristián. "Does Lengthening the School Day Increase Students' Academic Achievement? Results from a Natural Experiment in Chile." *Economics of Education Review* 28, no. 5 (2009): 629–640.
<https://www.sciencedirect.com/science/article/abs/pii/S0272775709000314>
Foundational comparative. Chile's full-day reform increased time substantially and produced detectable but modest gains. Often cited as a warning that simply adding hours is not a silver bullet — a finding that pushes the question toward *quality* and *structure* of time, which is where fragmentation lives.

**Gap in this section:** No paper in the NBER corpus measures mid-year calendar fragmentation as a distinct treatment. Goodman's snow-day paper is the closest, and it treats the disruption source as exogenous weather, not endogenous administrative calendar design.

---

## 2. Labor Economics — Who Pays When the Calendar Breaks

The literature here is strong on pandemic closures and on four-day-week transitions, thin-to-nonexistent on within-year scattered disruption.

### Ward, Jason M. "The Four-day School Week and Parental Labor Supply." SSRN working paper 3301406, 2019 (revised versions circulating through 2023).
<https://papers.ssrn.com/sol3/papers.cfm?abstract_id=3301406>
The single most important labor-economics paper for this dataset's framing. Using a difference-in-differences design across Colorado, Idaho, Oklahoma, and Oregon, Ward finds that going from zero to 25% four-day-week enrollment in an area causes an **11% decline in employment among mothers of 5–13-year-olds** (7.6 percentage points), with proportional declines in hours, weeks worked, and wage/salary income. Married fathers are unaffected. Single mothers show no negative employment effect — and in fact show an *18% increase* in working year-round, suggesting the policy helps the most constrained parents stabilize around the new schedule. The core mechanism — calendar irregularity translates directly into maternal labor supply loss — is the exact mechanism the fragmentation dataset would predict for scattered half-days.

### Hansen, Benjamin, Joseph J. Sabia, and Jessamyn Schaller. "Schools, Job Flexibility, and Married Women's Labor Supply: Evidence from the COVID-19 Pandemic." NBER Working Paper 29660, 2022.
<https://www.nber.org/papers/w29660>
Married women with school-aged children saw a 3.3 pp employment increase when schools reopened and a 3.3 pp decline in remote work — an unusually clean "school-is-childcare" identification. Shows that the labor-supply effect is concentrated in married mothers with school-aged kids, and is sensitive to job flexibility. Scattered calendar days would operate through the same mechanism at smaller scale and higher frequency.

### Garcia, Kairon Shayne D., and Benjamin W. Cowan. "The Impact of School and Childcare Closures on Labor Market Outcomes during the COVID-19 Pandemic." NBER Working Paper 29641, 2022.
<https://www.nber.org/papers/w29641>
School closures were associated with a 3.8 pp decline in mothers' full-time work and 2.5 pp among fathers, with the declines concentrated in parents without college degrees. The education gradient is the key finding: college-educated parents absorbed closures through remote work, non-college parents absorbed them through job loss.

### Amuedo-Dorantes, Catalina, Miriam Marcén, Marina Morales, and Almudena Sevilla. "COVID-19 School Closures and Parental Labor Supply in the United States." IZA DP 13827, 2020.
<https://ideas.repec.org/p/iza/izadps/dp13827.html>
Cross-state variation in closure policy identifies the labor-supply effect on mothers, particularly in non-essential occupations. Consistent with the other pandemic work.

### Schroeter, Jan, Rafael Lalive, and Krishanthi Karunanethy. "School Closures and Parental Labor Supply." IZA DP 17371, 2024.
<https://docs.iza.org/dp17371.pdf>
**The most conceptually relevant paper.** Uses Swiss administrative data to separate *anticipated* from *unanticipated* school closures. Parents respond strategically to anticipated closures (planned leave, hours adjustment) but absorb unanticipated ones through "informal patches and stress." Same number of closure days, different economic incidence, entirely because of predictability. This is the mechanism behind the dataset's strict definition: a published calendar is anticipated, but a swiss-cheese calendar makes *every week* partially unanticipated in the sense that parents can't build a stable routine.

### Mas, Alexandre, and Amanda Pallais. "Valuing Alternative Work Arrangements." NBER Working Paper 22708, 2015 / *American Economic Review* 107, no. 12 (2017): 3722–59.
<https://www.nber.org/papers/w22708>
Not about schools, but provides the willingness-to-pay benchmark for schedule predictability. Workers give up an average of ~20% of wages to avoid employer-set short-notice schedules, and mothers of young children show among the highest WTP. By analogy, the WTP for school calendar predictability is almost certainly substantial and almost certainly concentrated in the same demographic. Nobody has run the analog survey for school calendars.

### Herbst, Chris M. "The Rising Cost of Childcare in the United States: A Reassessment of the Evidence." *Economic Inquiry* 56, no. 2 (2018): 1273–1302.
<https://onlinelibrary.wiley.com/doi/10.1111/ecin.12565>
Documents the long-term rise in childcare costs and its asymmetric impact on maternal labor supply. Herbst is the right person to ping on "what does a half-day cost a family" because his cost-of-care methodology would translate directly to the fragmentation calculus.

### Cascio, Elizabeth U. "What Happened When Kindergarten Went Universal?" *Education Next* 10, no. 2 (2010), and Hamilton Project work on early childhood investment.
<https://www.hamiltonproject.org/assets/files/public_investments_child_care_cascio.pdf>
Cascio's universal-kindergarten work establishes the maternal labor supply elasticity to school hours. The extension to school *calendar predictability* is obvious and unrun.

### Schneider, Daniel, and Kristen Harknett. "Hard Times: Routine Schedule Unpredictability and Material Hardship." *Social Forces* 99, no. 4 (2021): 1682–1709.
<https://academic.oup.com/sf/article/99/4/1682/5890832>
Establishes that schedule unpredictability produces material hardship (hunger, housing insecurity) independent of wages, and that it is regressive. The Shift Project infrastructure they built could be pointed at school calendars directly. Nobody has. This is the single cleanest methodological analog for estimating the household cost of calendar fragmentation.

**Gap in this section:** The entire labor economics literature on school-schedule effects on parents is built on two natural experiments — four-day weeks and pandemic closures. Both are large, salient, unidirectional changes. Nobody has studied the baseline: the routine scattered early-release and teacher-workday regime that affects ~55 million US K-12 students every week.

---

## 3. Education Policy — Who Has Built Comparable Datasets

Short answer: no one. Long answer follows.

### RAND Corporation. "Does Four Equal Five? Implementation and Outcomes of the Four-Day School Week." RR-A373-1, 2021. Heather Schwartz, Paul Thompson, et al.
<https://www.rand.org/pubs/research_reports/RRA373-1.html>
RAND's flagship four-day-week study. Compares 4DW districts to matched 5DW districts on student achievement, school finance, and implementation. **Does not build a cross-district comparison of within-year calendar fragmentation.** The study's five-day-week comparison districts are treated as a uniform baseline; no sub-measurement of how those five-day weeks are actually constructed.

### Kraft, Matthew A., and Manuel Monti-Nussbaum. "The Big Problem With Little Interruptions to Classroom Learning." *EdWorkingPaper* 20-265, Annenberg Institute at Brown, 2020.
<https://www.edworkingpapers.com/ai20-265>
The closest paper in the literature to the fragmentation dataset in *spirit*. Kraft and Monti-Nussbaum measure classroom-level interruptions (PA announcements, visitors, etc.) and estimate they consume ~10–20 days of instruction per year. Conceptually: "interruptions aggregate." Methodologically: bottom-up observation, not calendar-level. The dossier's dataset sits at a different scale (district-level, calendar-level) but extends the same underlying intuition.

### Brookings Brown Center on Education Policy. "The Potential Role of Instructional Time in Pandemic Recovery." Brookings, 2022.
<https://www.brookings.edu/articles/the-potential-role-of-instructional-time-in-pandemic-recovery/>
Contains the relevant reference finding: "differences of almost 200 hours between schools at the 90th and 10th percentiles, equating to approximately five and a half weeks of schooling." The Brown Center has looked at *total hours* variation across districts; it has not looked at *structural fragmentation* of those hours.

### Learning Policy Institute. Darling-Hammond, Linda, Maria Hyler, and Madelyn Gardner. "Effective Teacher Professional Development." LPI Report, 2017.
<https://learningpolicyinstitute.org/product/effective-teacher-professional-development-report>
The canonical review of effective PD. Establishes the ~50-hour, sustained-duration floor for effective PD. Relevant to the dossier because it undermines the primary justification for calendar fragmentation (scattered early-release is the *least* effective PD delivery form). LPI has not published a comparison dataset of how districts actually schedule PD time relative to student instructional weeks.

### TNTP. "The Mirage: Confronting the Hard Truth About Our Quest for Teacher Development." 2015.
<https://tntp.org/publications/view/evaluation-and-development/the-mirage-confronting-the-truth-about-our-quest-for-teacher-development>
The strongest empirical challenge to scattered PD. ~$18K/teacher/year on PD, ~3 in 10 teachers improve, no correlation between PD hours and improvement when delivery is fragmented. Same conclusion from the delivery side that the dossier reaches from the family cost side.

### National Center for Education Statistics. "Schools and Staffing Survey" and "National Teacher and Principal Survey."
<https://nces.ed.gov/surveys/ntps/>
NCES collects data on instructional days per year at the state level but *not* at the within-year fragmentation level. The federal education data infrastructure does not contain a field for "unbroken weeks" or any comparable metric.

### EdWeek Research Center.
<https://www.edweek.org/research-center>
Regular surveys on instructional time and calendar issues. Publishes descriptive statistics on state-mandated instructional days, 4-day-week adoption, and snow day policies. **No comparable cross-district unbroken-week dataset has been published by EdWeek.**

### Upjohn Institute, CEPR, Hamilton Project.
Each has relevant adjacent work (Upjohn on schedule instability and labor markets, CEPR on childcare access and maternal employment, Hamilton on early-childhood investment), but none has published a cross-district comparison of calendar fragmentation or an estimate of its household cost.

**Gap in this section:** No US education research organization has published a comparable 23-district unbroken-weeks dataset using a strict definition. This claim was specifically checked against RAND, Brookings Brown Center, Learning Policy Institute, EdWeek, NCES, Hamilton Project, Upjohn, and CEPR. The closest is Kraft & Monti-Nussbaum (classroom interruptions, different unit of analysis) and the Brown Center's 200-hour 90th/10th percentile number (total hours, not fragmentation).

---

## 4. The Four-Day School Week Literature — Adjacent, Not Duplicate

This is the most active sub-literature on calendar structure and its consequences. It is directly adjacent to the fragmentation dataset but measures a different object: whole-day removal, not within-week puncturing.

### Thompson, Paul N. "Is Four Less Than Five? Effects of Four-Day School Weeks on Student Achievement in Oregon." *Journal of Public Economics* 193 (2021): 104308.
<https://www.sciencedirect.com/science/article/abs/pii/S0047272720301729>
The foundational causal estimate. Math scores fall 0.037–0.059 SD and reading scores 0.033–0.042 SD after 4DW adoption in Oregon. The effect is driven by reduced total instructional time, not by the structural change per se — schools that preserve time via longer days show little to no decline.

### Anderson, D. Mark, and Mary Beth Walker. "Does Shortening the Standard School Week Impact Student Performance? Evidence from the Four-Day School Week." *Education Finance and Policy* 10, no. 3 (2015): 314–349.
<https://www.dmarkanderson.com/4_Day_School_Week_EdFinPol_2ndRR.pdf>
Early counterpoint to the general 4DW findings — Colorado evidence that 4DW *increased* performance, later complicated by better data. Important for intellectual honesty: the literature was not uniformly negative at the outset.

### Morton, Emily. "Effects of Four-Day School Weeks on School Finance and Achievement: Evidence from Oklahoma." *Educational Researcher* 50, no. 1 (2021): 30–40.
<https://journals.sagepub.com/doi/abs/10.3102/0013189X20948023>
Oklahoma-specific, finds modest negative achievement effects with no meaningful cost savings. Highlights the policy-failure mode of 4DW: districts adopt it for savings that don't materialize, at an achievement cost.

### Morton, Emily, Paul N. Thompson, and Megan Kuhfeld. "A Multi-State, Student-Level Analysis of the Effects of the Four-Day School Week on Student Achievement and Growth." *Economics of Education Review* 99 (2024): 102524.
<https://www.sciencedirect.com/science/article/abs/pii/S0272775724000189>
The most recent and largest-scale 4DW study. Six states, student-level MAP data, robust negative achievement effects concentrated in non-rural districts. The rural/non-rural split is the most important recent refinement of the literature: 4DW is less damaging where it evolved organically (small rural districts) than where it was imported (exurban, non-rural).

### Thompson, Paul N., Jason Ward, and collaborators. "The Effects of the Four-Day School Week on Teacher Recruitment and Retention." CALDER Working Paper 320, 2025.
<https://caldercenter.org/sites/default/files/2025-06/CALDER-WP-320-0625.pdf>
Finds *no significant positive effect* of 4DW on teacher retention in Missouri. Deflates the main non-academic justification for 4DW adoption. Increased 4DW prevalence in the teacher labor market *raises* turnover in adjacent 5DW districts.

### Turner, Jon, et al. "Impacts of the Four-Day School Week on High School Achievement and Educational Engagement." *Education Economics*, 2022 (PMC: PMC9642983).
<https://pmc.ncbi.nlm.nih.gov/articles/PMC9642983/>
Missouri high school data. Modest negative effects on achievement, modest positive effects on engagement indicators (attendance rates). Suggests student experience of 4DW may differ from achievement outcomes.

### Kilburn, M. Rebecca, Heather Schwartz, Paul Thompson, et al. (RAND). "Does Four Equal Five?" 2021 (cited above in Section 3).

**What is known (synthesis):** 4DW reduces student achievement primarily via reduced instructional time; the mechanism is time, not structure. Teacher retention effects are null or negative. Parent labor supply effects are strongly negative for mothers of young children and neutral or positive for single mothers (Ward). Cost savings are real but small (1–2% of budget). Rural districts with 4DW as an organic adaptation fare better than non-rural districts that adopted it recently.

**What this says about the fragmentation dataset:** The 4DW literature is evidence that *calendar structure changes producing irregularity have measurable labor supply and achievement effects*. The fragmentation dataset addresses a different object — the scattered-day regime at a fixed total day count — but inherits the mechanistic plausibility. If a predictable 4DW damages maternal employment by 11%, an unpredictable 180-day swiss-cheese calendar is at minimum not harmless.

---

## 5. International Comparison

This is the thinnest section, because the comparable cross-country literature largely does not exist.

### OECD. *Education at a Glance*, annual (most recently 2025). Chapter "How much time do students spend in the classroom?"
<https://www.oecd.org/en/publications/2025/09/education-at-a-glance-2025_c58fc9ae.html>
OECD's authoritative cross-country comparison of instructional time. Compulsory hours range from 5,304 (Poland) to 11,000 (Australia) over primary + lower secondary. US sits near the top on total hours. **OECD does not publish a fragmentation metric.** The data it collects is total hours, hours per subject, and share of the year — not within-year structural irregularity.

### OECD. "How is the School Year Organised in OECD Countries?" *Education Indicators in Focus* 89, 2024.
<https://www.oecd.org/content/dam/oecd/en/publications/reports/2024/08/how-is-the-school-year-organised-in-oecd-countries_5ee6aec3/a6385722-en.pdf>
The closest OECD publication to the fragmentation question. Describes term structures, holiday distributions, and school-week conventions across member countries. Presents data that *could* be used to compute a comparable unbroken-week metric for peer countries, but does not compute one. Notes qualitatively that European systems tend toward block holiday structures and minimal mid-week interruptions; US calendars are outliers in scattered day-off frequency.

### European Commission / Eurydice. "Recommended Annual Instruction Time in Full-time Compulsory Education in Europe." Annual publication.
<https://eurydice.eacea.ec.europa.eu/publications/recommended-annual-instruction-time-full-time-compulsory-education-europe-20232024>
Publishes country-by-country recommended instructional minutes and school year calendars. Raw material for a comparable European fragmentation dataset, but no one has computed it. The Eurydice calendar pages are the direct analog input data to the dossier's 23-district extraction.

### Patall, Erika A., Harris Cooper, and Ashley Batts Allen. "Extending the School Day or School Year: A Systematic Review of Research (1985–2009)." *Review of Educational Research* 80, no. 3 (2010): 401–436.
<https://journals.sagepub.com/doi/10.3102/0034654310377086>
Systematic review of the total-time literature. Comprehensive on year-length and day-length variation, silent on within-year fragmentation. Useful as a canonical reference for "what the literature measures" — and by absence, what it does not.

### Bellei (Chile), Lavy (Israel), and Rivkin & Schiman (PISA cross-country) — cited above in Section 1.

**Gap in this section:** No OECD, World Bank, Eurydice, or peer-reviewed cross-country paper has published a fragmentation metric comparable to the unbroken-weeks count. The qualitative consensus — that US calendars are more fragmented than European peers — is widely asserted but not quantitatively established. Computing the metric for even a handful of European systems (France, Germany, Finland, Netherlands) from Eurydice raw data would be a weekend of work and would almost certainly confirm the US as a structural outlier. This is an obvious follow-on project.

---

## Gaps My Dataset Fills

Having done the literature review with the specific goal of finding a counterexample, I believe the following claims are defensible:

1. **No cross-district comparison of within-year unbroken-week counts at a fixed 180-day budget exists in the published literature.** Checked against: NBER, SSRN (labor economics), RAND, Brookings Brown Center, Learning Policy Institute, TNTP, EdWeek Research Center, NCES, Hamilton Project, Upjohn Institute, CEPR, Annenberg EdWorkingPapers, OECD, Eurydice. The closest analogs are (a) Kraft & Monti-Nussbaum on classroom interruptions, different unit of analysis; (b) Brookings Brown Center's 200-hour 90th/10th percentile number, which measures total hours not fragmentation; (c) OECD *Education at a Glance* cross-country total-hours data. None of these computes unbroken weeks under a strict definition.

2. **The Fairfax ground-truth anchor is novel in this literature.** The dossier's strict definition was independently validated against a district's own published count (Fairfax's "23 unbroken weeks" footer). No other paper in the literature has a ground-truth reconciliation point for a fragmentation metric, because no other paper has a fragmentation metric.

3. **The seven-week ceiling is, to the best of my knowledge, a new empirical fact.** The literature contains nothing that would let a reader know what the longest unbroken instructional streak is in any US district, because the underlying measurement has not been made. The finding that the ceiling is seven and that four of the largest 23 districts hit it is unpublished anywhere in the searched corpus.

4. **The dataset provides the missing reference values for future labor-economics work.** Ward (SSRN 3301406) and Schroeter et al. (IZA 17371) have the methodological machinery to estimate the household cost of calendar fragmentation; they have not been pointed at a fragmentation metric because no usable one existed. This dataset is that metric.

5. **What the dataset does *not* yet do** (and the literature hasn't either): separately estimate the *marginal cost* of fragmentation holding total days constant. That is the empirical question on the other side of this dataset — the dataset is an input, not a finished answer.

---

## People To Contact

The shortlist is small and biased toward researchers whose methodological apparatus could actually use this dataset tomorrow.

1. **Jason Ward** (RAND, formerly CALDER). Author of the SSRN 3301406 four-day-week labor supply paper. Already convinced calendar structure drives maternal labor supply; would immediately see the dataset as extending his result from the 4DW treatment to the baseline scattered-day regime. Highest-leverage contact in the literature.

2. **Paul N. Thompson** (Oregon State, Economics). The most active scholar on school calendar structure and its consequences. Co-author with Morton and Kuhfeld on the multi-state 4DW paper. His research agenda is the natural home for a follow-on study using this dataset.

3. **Joshua Goodman** (Boston University, formerly Harvard Kennedy School). Author of the snow-day paper (NBER 20221). His coordination-cost framework is the cleanest mechanistic account of why fragmentation should damage achievement. Would likely engage with the dataset as a natural extension from exogenous weather disruption to endogenous administrative fragmentation.

4. **Daniel Schneider and Kristen Harknett** (UC Berkeley; Shift Project). Their survey infrastructure on schedule unpredictability is the closest available tool for estimating the household cost of calendar fragmentation. Adding a school-calendar module to the Shift Project survey would produce the first direct willingness-to-pay estimate.

5. **Matthew Kraft** (Brown / Annenberg). Author of the classroom-interruptions paper. Thematically aligned (interruptions aggregate) and well-positioned to frame a district-level fragmentation metric in the Annenberg EdWorkingPapers series.

Honorable mentions: **Chris Herbst** (ASU, childcare cost methodology), **Elizabeth Cascio** (Dartmouth, universal kindergarten and maternal labor supply), **Heather Schwartz** (RAND, 4DW implementation).

---

## Source Notes

All URLs in this document were validated at the time of writing (April 2026) via web search. Where a paper exists in both NBER working paper form and published form, the NBER URL is preferred for its stability and public access. Eurydice and OECD URLs are to the current edition; historical versions may require archive lookup.

*Compiled by an AI research agent working with the dataset author. Corrections welcome.*
