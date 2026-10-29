---
title: "Field Service on-call duty: shifts beyond operating hours"
description: "How to plan on-call duty, weekend service and overtime in Salesforce Field Service with shifts, and what the works council has to agree to first."
pubDate: 2026-10-28
lang: en
slug: field-service-on-call-shifts
translationKey: field-service-on-call-shifts
topic: field-service
categories: [field-service]
tags: [Field Service, On-call duty, Shifts, Scheduling, Works council, Manufacturing]
takeaways:
  - "Operating hours describe a territory's regular working time. In Salesforce Field Service, the Shift object adds working time outside it, such as on-call duty, weekends or overtime."
  - "Only confirmed shifts count for scheduling. A shift with the time slot type Extended takes appointments only if the Service Resource Availability work rule allows overtime."
  - "Recordset filter criteria limit a shift to certain appointments, so the technician on weekend call only gets machine-down jobs and no planned maintenance."
  - "A machine-down call with a committed response time on a Saturday needs a confirmed on-call shift. Without one, the engine finds no technician."
  - "In Germany, on-call rotas and overtime fall under works council co-determination in section 87 of the Works Constitution Act, like timesheets and location tracking."
faq:
  - q: "What is a shift in Salesforce Field Service?"
    a: "A shift is a block of working time outside a resource's normal operating hours, such as on-call duty, a night or overtime. Shifts always add availability. They are a core Salesforce object, and the Field Service managed package is needed for the full function."
  - q: "What is the difference between Normal and Extended shifts?"
    a: "A Normal shift lets the resource take any appointment in that period. An Extended shift only takes appointments that a Service Resource Availability work rule with overtime allowed may schedule."
  - q: "Can I create on-call shifts in bulk?"
    a: "Yes. Shift templates prefill fields, and shift patterns repeat a set of templates over a length in days. With New from Pattern you set a start date and an end date or a number of occurrences. The resource can stay empty and be assigned later."
  - q: "Does the works council have to agree to on-call plans in Field Service?"
    a: "In Germany, section 87 of the Works Constitution Act gives the works council a say on the distribution of working time, on temporary overtime and on technical systems that can monitor employees. On-call rotas in Field Service touch all three. Agree the rules before go-live."
draft: false
---

On-call duty, weekend service and overtime are planned in Salesforce Field Service with shifts. Operating hours describe the regular working time of a service territory, usually Monday to Friday. A shift adds working time outside it: a Saturday on call, a night, two hours of overtime. Only confirmed shifts count, and an Extended shift takes appointments only if the work rule for availability allows overtime. Filter criteria limit an on-call shift to machine-down jobs. Without a confirmed shift on Saturday, the engine finds no technician for a breakdown with a committed response time. In Germany the works council has a say on all of this.

## What are operating hours, and what are shifts?

Operating hours are the time slots per weekday on which a service territory works. Technicians inherit them through their territory membership. This is part of the master data that scheduling needs, described in [what data scheduling needs](../salesforce-field-service-master-data/).

Shifts cover what does not fit into this pattern. [Trailhead](https://trailhead.salesforce.com/content/learn/modules/shift-creation-assignment/get-to-know-shifts) defines a shift as "any set of working hours that are not normal operating hours". It can come on top of operating hours, as with overtime, or overlap with them. Shift is a core Salesforce object, but the full function needs the Field Service managed package. Before the first shift, territories, service resources and operating hours have to be set up.

[Salesforce Help on shift availability](https://help.salesforce.com/s/articleView?language=en_US&id=sf.fs_shifts_guidelines.htm&type=5) adds three rules that matter for on-call duty:

- **Shifts always add availability.** If a technician is not available, that is a resource absence and not a shorter shift.
- **Shifts sit inside a territory membership.** A shift with a territory must lie fully within the technician's primary membership in that territory.
- **Territory-specific shifts win.** If two shifts overlap, the one with a territory takes precedence over the one without.

Salesforce sells the product today as Field Service and Operations. The shift logic described here applies to it.

## How do you set up an on-call shift?

According to [Salesforce Help on creating shifts](https://help.salesforce.com/s/articleView?id=sf.fs_shifts_create.htm&language=en_US&type=5) and the [list of shift fields](https://help.salesforce.com/s/articleView?id=fs_shifts_fields.htm&language=en_US&type=5), five settings decide how an on-call shift behaves:

| Setting | What it does | For on-call duty |
|---|---|---|
| Time Slot Type | Normal takes any appointment, Extended only those allowed as overtime | Extended |
| Status | Tentative, Published, Confirmed; only Confirmed counts for scheduling | Confirmed once the rota is agreed |
| Recordset Filter Criteria | Limits which appointments the shift can take | Only breakdowns with high priority |
| Job Profile | With a Match Skills rule, only technicians with the profile's skills qualify for automatic assignment to the shift | Breakdown skills of the region |
| Non-Standard | Marks evening or on-call shifts | Set, so they can be counted and shared fairly |

The link between Extended shifts and overtime sits in the scheduling policy. Help states that the Overtime field on the Service Resource Availability work rule controls whether appointments can be scheduled on Extended shifts. A policy for planned maintenance with Overtime switched off therefore never lands on an on-call shift, while the emergency policy with Overtime switched on does. For shift designations to count, Help recommends the Timeslot Designated work rule in the policy.

Shifts do not have to be created one by one. [Trailhead on templates and patterns](https://trailhead.salesforce.com/content/learn/modules/shift-creation-assignment/simplify-shift-creation-with-templates-and-patterns) shows shift templates that prefill fields, for example a template "Weekly on Call", and shift patterns that repeat templates over a length in days. With New from Pattern you choose a start date and an end date or a number of occurrences. If the service resource stays empty, the shift can be assigned later, by hand or by the scheduling tools.

## Why does a machine-down call on Saturday find no technician?

This is a typical surprise after go-live. A customer with a contract for "technician on site within 24 hours" reports a stopped machine on Saturday morning. The work order gets the entitlement, the milestone starts, and the engine searches for a candidate.

```hinweis achtung
If the territory's operating hours end on Friday and no confirmed shift exists, there is nobody to schedule. The appointment stays at None, and the response time runs.
```

Three things have to fit together:

1. **The entitlement.** It carries the response time and can have its own operating hours for booking. How response times reach dispatching is described in [modelling maintenance contracts](../salesforce-field-service-maintenance-contracts/).
2. **The shift.** A confirmed Extended shift for the weekend, with a filter that lets breakdowns through.
3. **The policy.** The policy used for breakdowns has Overtime switched on in the Service Resource Availability rule.

If a voice agent takes the call outside business hours, the on-call technician gets a classified case instead of a raw call. How I would set up triage on the hotline is in [Breakdown hotline with Agentforce Voice](../breakdown-hotline-agentforce-voice/). The agent cannot book anything, though, if there is no shift behind it.

## What does the works council have to agree to?

On-call duty is working time, and in Germany that brings the works council in. [Section 87 of the Works Constitution Act](https://www.gesetze-im-internet.de/betrvg/__87.html) gives it a right of co-determination on, among other things, the start and end of daily working time and its distribution across the weekdays (no. 2), temporary extension of normal working hours (no. 3) and technical systems designed to monitor behaviour or performance (no. 6).

An on-call rota in Field Service touches all three. Shifts distribute working time, Extended shifts are overtime by design, and the system records who took which shift and when. I would discuss these points with the works council before go-live:

- who creates and confirms on-call shifts, and how far ahead
- how on-call shifts are shared fairly; the Non-Standard flag makes them countable per technician
- whether evaluations per technician are allowed, and who sees them
- how the on-call rota relates to time recording and pay

This is the same conversation as for timesheets and location, which I describe in [rolling out Field Service in waves](../salesforce-field-service-rollout/). It is easier to have it once for all topics. I am not a lawyer; the legal assessment belongs to your labour law experts.

## A typical scenario, as an assumption

A compressor manufacturer runs service in three regions. Each region has one technician on weekend call from Saturday 7:00 to Sunday 19:00. Contracts promise 24 hours on site for premium customers.

The setup I would choose:

1. **One template per region** with Time Slot Type Extended, the region's territory, the job profile "breakdown" and a filter on priority.
2. **A pattern with a length of 7 days** and three entries on the Saturday, one per regional template. New from Pattern with 13 occurrences creates the shifts for a quarter, 39 in total.
3. **Assignment** by the service manager per region, status Tentative until the works council has approved the quarter's rota, then Confirmed.
4. **Two policies.** Planned maintenance with Overtime off, breakdowns with Overtime on.
5. **A test on a Saturday in the sandbox**: a breakdown work order with a premium entitlement must land on the on-call technician, a maintenance appointment must not.

The data model is small. The effort lies in agreeing the rota and in keeping shifts confirmed every quarter.

## Where should you start?

List your current on-call rules: who is on call when, for which customers and which kinds of jobs. Then check whether your scheduling policies distinguish between planned work and breakdowns. If they do not, fix that first, because Extended shifts only work through that distinction. Where shifts fit into scheduling as a whole is covered in [chapter 2 of the Field Service masterclass](../../masterclass/field-service/field-service-scheduling-dispatch/), and long jobs over several days in [Field Service multiday jobs](../field-service-multiday-jobs-crews-commissioning/).

On-call duty in Field Service works when shifts, policies and entitlements fit together and the works council has agreed the rules before the first weekend.
