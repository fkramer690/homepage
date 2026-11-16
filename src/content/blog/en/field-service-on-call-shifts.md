---
title: "Field Service on-call duty: shifts beyond operating hours"
description: "How to plan on-call duty, weekend service and overtime in Salesforce Field Service with shifts, and what the works council has to agree to first."
pubDate: 2026-10-28
updatedDate: 2026-11-09
lang: en
slug: field-service-on-call-shifts
translationKey: field-service-on-call-shifts
topic: field-service
categories: [field-service]
tags: [Field Service, On-call duty, Shifts, Scheduling, Works council, Manufacturing]
takeaways:
  - "Operating hours describe recurring working time. Shifts add availability on specific dates, for example on-call duty, weekends or overtime."
  - "Only confirmed shifts count. An Extended shift takes appointments only if the Service Resource Availability work rule allows overtime."
  - "Recordset filter criteria limit a shift to certain appointments, so the technician on weekend call only gets machine-down jobs, not planned maintenance."
  - "A Saturday machine-down call needs availability, usually a confirmed on-call shift. Without that availability, the engine finds no technician."
  - "In Germany, on-call rotas and overtime usually fall under works council co-determination (section 87 BetrVG), like timesheets and location data."
faq:
  - q: "What is a shift in Salesforce Field Service?"
    a: "A shift is a block of working time on a specific date, often outside a resource's normal operating hours, such as on-call duty, a night shift or overtime. It can also overlap with operating hours. Shifts always add availability. They are core Salesforce objects, and the Field Service managed package is needed for full functionality."
  - q: "What is the difference between Normal and Extended shifts?"
    a: "A Normal shift can be used without allowing overtime, but appointments still have to meet all other work rules and filter criteria. An Extended shift only takes appointments that a Service Resource Availability work rule with overtime allowed may schedule."
  - q: "Can I create on-call shifts in bulk?"
    a: "Yes. Shift templates prefill fields, and shift patterns repeat a set of templates over a length in days. Using New from Pattern, you set a start date and an end date or a number of occurrences. The resource field can be left blank and filled in later."
  - q: "Does the works council have to agree to on-call plans in Field Service?"
    a: "In Germany, section 87 of the Works Constitution Act gives the works council a say on the distribution of working time, on temporary overtime and on technical systems that can monitor employees, unless a law or collective agreement already settles the matter. On-call rotas in Field Service usually touch these points. Agree on the rules before go-live."
draft: false
---

On-call duty, weekend service and overtime are planned in Salesforce Field Service with shifts. Operating hours describe the regular working time of a service territory, usually Monday to Friday. A shift adds availability on specific dates, mostly outside them: a Saturday on call, a night, two hours of overtime. Only confirmed shifts count, and an Extended shift takes appointments only if the work rule for availability allows overtime. Filter criteria limit an on-call shift to machine-down jobs. Without a confirmed shift or other availability on Saturday, the engine finds no technician for a breakdown with a committed response time. In Germany the works council usually has a say on this.

## What are operating hours, and what are shifts?

Operating hours are the weekday time slots during which a service territory works. Technicians inherit them through their territory membership, unless the membership has its own operating hours. This is part of the master data that scheduling needs, as described in [what data scheduling needs](/en/blog/salesforce-field-service-master-data/).

Shifts cover what does not fit into this pattern. [Trailhead](https://trailhead.salesforce.com/content/learn/modules/shift-creation-assignment/get-to-know-shifts) defines a shift as "any set of working hours that are not normal operating hours". It can be added to operating hours, as with overtime, or overlap with them. Shift is a core Salesforce object, but the full function needs the Field Service managed package. Before the first shift, territories, service resources and operating hours have to be set up.

[Salesforce Help on shift availability](https://help.salesforce.com/s/articleView?language=en_US&id=sf.fs_shifts_guidelines.htm&type=5) adds three rules that matter for on-call duty:

- **Shifts always add availability.** If a technician is not available, that is a resource absence and not a shorter shift.
- **Shifts sit inside a territory membership.** A shift with a territory must lie fully within the technician's primary membership in that territory.
- **Territory-specific shifts win.** If two shifts overlap, the one with a territory takes precedence over the one without.

Salesforce now calls the product Agentforce Field Service and Operations, formerly Field Service. The shift logic described here applies to it.

## How do you set up an on-call shift?

According to [Salesforce Help on creating shifts](https://help.salesforce.com/s/articleView?id=sf.fs_shifts_create.htm&language=en_US&type=5) and the [list of shift fields](https://help.salesforce.com/s/articleView?id=fs_shifts_fields.htm&language=en_US&type=5), five settings determine how an on-call shift behaves:

| Setting | What it does | For on-call duty |
|---|---|---|
| Time Slot Type | Normal needs no overtime, Extended only takes appointments allowed as overtime | Extended |
| Status | Tentative, Published, Confirmed; only Confirmed counts for scheduling | Confirmed once the rota is agreed |
| Recordset Filter Criteria | Limits which appointments the shift can take | Only appointments with the work type breakdown |
| Job Profile | With a Match Skills rule, only technicians with the profile's skills qualify for automatic assignment to the shift | Breakdown skills of the region |
| Non-Standard | Marks evening or on-call shifts | Set, so shift scheduling rules can limit or balance them |

The link between Extended shifts and overtime is in the scheduling policy. Help states that the Overtime field on the Service Resource Availability work rule controls whether appointments can be scheduled on Extended shifts. Appointments scheduled with a planned-maintenance policy that has Overtime switched off are therefore never assigned to an on-call shift, while those scheduled with the emergency policy, with Overtime switched on, do. For shift designations and filter criteria to be applied, the policy also needs the Timeslot Designated work rule.

Shifts do not have to be created one by one. [Trailhead on templates and patterns](https://trailhead.salesforce.com/content/learn/modules/shift-creation-assignment/simplify-shift-creation-with-templates-and-patterns) shows shift templates that prefill fields, for example a template "Weekly on Call", and shift patterns that repeat templates over a length in days. Using New from Pattern, you choose a start date and an end date or a number of occurrences. If the service resource field is left blank, the shift can be assigned later, manually or by the scheduling tools.

## Why does a machine-down call on Saturday find no technician?

This is a typical surprise after go-live. A customer with a contract for "technician on site within 24 hours" reports a stopped machine on Saturday morning. The work order gets the entitlement, the milestone starts, and the engine searches for a candidate within the service appointment's time window.

```hinweis achtung
If neither the territory nor the technician's membership has Saturday hours, and no matching confirmed shift exists, there is no one to schedule. The appointment remains at None, and the response time keeps running.
```

For the call to be assigned to the on-call technician, the following elements have to fit together:

1. **The entitlement and the appointment window.** The entitlement milestone tracks the response time, but it does not limit scheduling by itself. Automation has to turn the response time into Earliest Start Permitted and Due Date on the service appointment. How response times reach dispatching is described in [modeling maintenance contracts](/en/blog/salesforce-field-service-maintenance-contracts/).
2. **The shift.** A confirmed Extended shift for the weekend, with a filter that lets breakdowns through.
3. **The policy.** The policy used for breakdowns has Overtime switched on in the Service Resource Availability rule and contains the Timeslot Designated rule.

If a voice agent takes the call outside business hours, the on-call technician gets a classified case instead of a raw call. How I would set up triage on the hotline is in [Breakdown hotline with Agentforce Voice](/en/blog/breakdown-hotline-agentforce-voice/). The agent cannot book anything, though, if there is no availability behind it.

## The works council co-determines under section 87 BetrVG

German law distinguishes between Bereitschaftsdienst, which generally counts as working time, and Rufbereitschaft, where generally only the actual call-outs count. Either way, the works council must be involved. [Section 87 of the Works Constitution Act](https://www.gesetze-im-internet.de/betrvg/__87.html) gives it a right of co-determination, unless a law or collective agreement already settles the matter, on, among other things, the start and end of daily working time and its distribution across the weekdays (no. 2), temporary extension of normal working hours (no. 3) and technical systems designed to monitor behavior or performance (no. 6).

An on-call rota in Field Service usually touches these points. Shifts distribute working time, Extended shifts often represent extra hours, and the system records who took which shift and when. Whether an Extended shift is overtime in a legal or payroll sense depends on your working time model and agreements, not on Salesforce. I would discuss these points with the works council before go-live:

- who creates and confirms on-call shifts, and how far ahead
- how on-call shifts are shared fairly; the Non-Standard flag makes them countable per technician, and shift scheduling rules can limit them
- whether evaluations per technician are allowed, and who sees them
- how the on-call rota relates to time recording and pay

This is the same conversation as for timesheets and location data, which I describe in [rolling out Field Service in waves](/en/blog/salesforce-field-service-rollout/). It is easier to have that conversation once for all topics. I am not a lawyer; the legal assessment is for your labour law experts.

## Worked example: weekend call in three regions

The figures are assumed. A compressor manufacturer runs service in three regions. Each region has one technician on weekend call from Saturday 7:00 to Sunday 19:00. Contracts promise on-site service within 24 hours for premium customers.

The setup I would choose:

1. **One template "Weekend on call"** with the job profile "breakdown". On the shifts, set Time Slot Type to Extended and add a filter that only allows the breakdown work type. The job profile decides who qualifies for the shift; the breakdown appointment still needs its own skill requirements.
2. **A pattern with a length of 7 days** and one entry on the Saturday. A template has no territory, and each New from Pattern run takes only one territory, so I run it once per region, each with 13 occurrences. That creates the shifts for a quarter, 39 in total.
3. **Assignment** by the service manager per region, status Tentative until the procedure agreed with the works council is complete, then Confirmed.
4. **Two policies.** Planned maintenance with Overtime off, breakdowns with Overtime on.
5. **A test on a Saturday in the sandbox**: a breakdown work order with a premium entitlement must be assigned to the on-call technician, a maintenance appointment must not. I would also test two breakdowns in a row and a night call-out followed by another job.

The 36-hour shift is scheduling availability, not 36 hours of permitted work. Define how call-outs, travel, maximum working time and rest periods reduce further availability. The data model is small. The effort lies in agreeing the rota and in keeping shifts confirmed every quarter.

## Write down today's on-call rules

List your current on-call rules: who is on call when, for which customers and which kinds of jobs. Then check whether your scheduling policies distinguish between planned work and breakdowns. If they do not, fix that first, because Extended shifts only work through that distinction. Where shifts fit into scheduling as a whole is covered in [chapter 2 of the Field Service masterclass](/en/masterclass/field-service/field-service-scheduling-dispatch/), and long jobs over several days are covered in [Field Service multiday jobs](/en/blog/field-service-multiday-jobs-crews-commissioning/).
