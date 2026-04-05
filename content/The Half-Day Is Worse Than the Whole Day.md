---
title: "The Half-Day Is Worse Than the Whole Day"
description: "The cognitive science of scattered disruptions. A 2014 Harvard paper gives the school calendar fragmentation dataset a mechanism — and the mechanism is more damning than the parent-inconvenience story it replaces."
date: 2026-04-05
tags:
  - school-calendar
  - civic-data
  - research
  - education
publish: false
draft: true
---

> When everyone is absent together, the class re-synchronizes. When one kid is absent, the whole class stalls to bring that kid back up to speed. The first costs almost nothing. The second costs about 5% of a standard deviation of achievement per absence.
>
> — a compression, unfairly, of Joshua Goodman, *Flaking Out: Student Absences and Snow Days as Disruptions of Instructional Time* (NBER Working Paper 20221, 2014)

When [the previous post](./The%20Districts%20Already%20Count%20This.md) published the top 23 US school districts ranked by how many fully unbroken weeks they run, the framing was about working families — the mismatch between how the school calendar is built and how working parents actually live. That framing is correct. It is also incomplete.

There is a second reason the scattered-disruption regime is bad, and it has nothing to do with parent childcare. It has to do with how kids learn.

Joshua Goodman, at the time a Harvard economist and now at Boston University, published a paper in 2014 that uses an unusual source of exogenous variation — snow days — to isolate the effect of instructional-time disruption on student achievement. The key insight, and the thing the paper is famous for among education economists, is that **he distinguishes two kinds of disruption**:

1. **Coordinated disruption** — a snow day. The whole class is absent together. When school resumes, the teacher can re-synchronize everyone. The entire group picks up where it left off. Goodman's estimate of the achievement cost of a coordinated whole-day closure is **indistinguishable from zero**.

2. **Uncoordinated disruption** — individual absences. One kid is out; the rest of the class proceeds. When that kid returns, the teacher has to catch them up *while also continuing to teach the kids who were present*. This has measurable and substantial costs: roughly **0.05 standard deviations of achievement per absence**, concentrated in math, concentrated in urban districts, concentrated in the grades where skills are most sequentially built.

Read that again. A whole-day closure that affects everyone together is free. An individual absence that creates desynchronization is expensive. The *same amount of lost instructional time* has radically different consequences depending on whether the loss is coordinated.

## What this means for the school calendar fragmentation dataset

The [previous post](./The%20Districts%20Already%20Count%20This.md) ranked districts by how many weeks of the year are unbroken — five consecutive Monday-through-Friday days of full instruction with zero modifications. The strict definition was justified on a parent-rhythm argument: a "mostly full" week doesn't let a working family plan.

Goodman gives us a second, stronger justification for the same strict definition. It's structural, and it's almost exactly opposite to the way school administrators usually think about calendar modifications.

Here is how school administrators usually defend a scattered-day regime: *"We built in these teacher workdays and early releases so we don't have to take a whole week off. Parents and kids only lose an hour here, a morning there. Compared to a three-day closure, we're actually protecting instructional time."*

Here is what Goodman's result implies: **that defense is backward**. A three-day whole-school closure is a coordinated disruption — it costs approximately nothing in achievement terms, because the class resynchronizes on return. An hour-here-morning-there regime is *uncoordinated within the school day itself* — different grades on different schedules, different after-school programs cutting in and out, different teachers managing different catch-up cycles. It creates the exact disruption pattern that Goodman's data shows is *the expensive kind*.

The intuition extends cleanly to the half-day case. Consider an early-release Wednesday where elementary kids go home at noon but middle schoolers stay until three. From the building's perspective, half the school has been cut loose and half has not. The teachers of the elementary kids then have to either stop, change activities, or cover shortened material; the instructional thread is not a clean cut, it is a torn edge. The teachers who stayed full-length are in a building that is half-empty and humming with dismissal noise. The next morning, they are synchronizing *with themselves* and with whatever compressed-into-three-hours content they tried to salvage. Whatever the theoretical hour count is, the *classroom-experienced* disruption is larger than that hour.

Multiply that by the 15+ early releases the [Philadelphia calendar](./The%20Districts%20Already%20Count%20This.md) publishes. Do the same for every district with monthly teacher-planning half-days. You are not losing half-days of instruction. You are creating the Goodman condition — uncoordinated within-school disruption — fifteen times a year.

## This is where the metric gets its teeth

The `unbroken_five_day_weeks` metric in the [dataset](../data/school-calendars/districts.csv) disqualifies any week with any modification. A week with one early-release Wednesday counts as broken. A week with one teacher workday counts as broken. A week with a parent-teacher-conference half-morning counts as broken.

Some readers will look at that definition and say it's too strict. *Surely an hour of early release isn't the same as a whole day off?* 

Goodman is the answer. **It isn't the same — it's worse**, because a whole day off is a coordinated closure (free) and an hour of early release is an uncoordinated within-school disruption (costly). The strict metric is not being pedantic. It is collapsing a false distinction that favors the regime the data shows is most harmful.

A more honest version of the metric would actually count early releases as *more* disruptive than whole closures, not less. We did not build that version because it would require assigning weights and we wanted the Phase 1 release to be boring arithmetic with zero judgment calls in the counting step. But the Goodman-weighted version is the natural Phase 2 companion to the current dataset, and it will probably rank the districts in a different order — the districts that "protect instructional time" by scattering half-days will fall, and the districts that take clean whole-day breaks will rise.

## The part that is honest

Goodman's paper is about individual student absences, not calendar modifications. Translating his result from one to the other is an interpretation, not a finding. The translation goes through one additional claim: **that a half-day or an early release creates within-class desynchronization similar in kind to an individual absence**. Is that claim airtight? No. In a half-day, all the kids leave together, which is more coordinated than a single kid being out. In an early release, all the kids leave together but *the day itself has been restructured*, which is a different kind of disruption than either a whole closure or an individual absence.

The cleanest read of Goodman is: **whole-day closures are free, individual absences are expensive, and half-days sit somewhere in between, probably closer to individual absences than to whole closures**. "Somewhere in between" is not "worse than whole closures," strictly. It is "more expensive per hour than whole closures," which is a weaker claim than my section header.

I'll stand by the weaker claim. "The half-day is worse per hour than the whole day" is what the mechanism says. The title of this post is the polemical version of that. The body is the honest version.

## Why this should be how the project is framed going forward

The [School Calendar Fragmentation dataset](./The%20Districts%20Already%20Count%20This.md) currently leads with the parent-convenience story. That is the right hook for the general public — everyone has felt the disorientation of a random Tuesday off, and the empirical novelty of having this measured and compared is compelling.

But the parent-convenience story has a natural ceiling. It will be read as whining by anyone who is not a working parent, and it will be dismissed by school administrators who sincerely believe (and often have internal calendar-design guidance that tells them) that scattered modifications protect instructional time.

The Goodman story has no such ceiling. It is a falsifiable empirical claim from a respected labor economist, published in a top working-paper series, grounded in a clean identification strategy (weather-induced exogenous variation). It gives the dataset a *mechanism*, not just a grievance. And the mechanism is exactly the opposite of what school calendar committees assume when they are deciding how to distribute non-instructional days.

Any serious conversation about school calendar reform should be held on Goodman's ground, not on the parent-rhythm ground. The parent-rhythm argument makes the case that fragmentation has costs for families. The Goodman argument makes the case that the specific *form* of fragmentation that school calendars use — scattered half-days and within-day schedule modifications — is the structurally most harmful form it could take for learning.

Those are two different arguments, and they reinforce each other. The families argument moves the political coalition. The mechanism argument breaks the administrative defense.

## What I want next

Goodman's paper is eleven years old and has been cited several hundred times. I have not yet traced the citation graph forward. There may be follow-up work that sharpens or complicates the coordinated-vs-uncoordinated distinction specifically in the half-day and early-release case. That is a live research question and it is the obvious next thing to chase.

There is also a Ward 2019 working paper (SSRN 3301406) that finds an 11% maternal employment decline from 25% 4-day-week enrollment penetration in an area. That effect size is large enough that it implies the scattered-day regime almost certainly has measurable labor-supply effects, but nobody appears to have estimated them directly. The [dataset](../data/school-calendars/districts.csv) is the missing ingredient for that estimation. If I were a labor economist, I would write that paper.

If you are one, [the data is public](../data/school-calendars/) and [the methodology is open](../data/school-calendars/methodology.md) and [the contact page is here](./index.md). The dataset is a tool, not a product. Go build something with it.

---

*This post is a follow-up to [The Districts Already Count This](./The%20Districts%20Already%20Count%20This.md), which published the underlying dataset. The literature review that surfaced the Goodman paper and the Ward paper is at [`research/literature-map-school-calendars.md`](../research/literature-map-school-calendars.md). Built by a human and an AI agent working in pair.*
