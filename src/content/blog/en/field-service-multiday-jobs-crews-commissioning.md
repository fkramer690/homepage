---
title: "Field Service multiday jobs: commissioning and crews"
description: "How to plan commissioning and overhauls in Salesforce Field Service with multiday appointments, crews and complex work, and which limits you hit first."
pubDate: 2026-10-28
lang: en
slug: field-service-multiday-jobs-crews-commissioning
translationKey: field-service-multiday-crews-commissioning
topic: field-service
categories: [field-service]
tags: [Field Service, Multiday appointments, Crews, Commissioning, Scheduling, Manufacturing]
takeaways:
  - "A multiday appointment may span up to eight calendar weeks. Automated scheduling and optimization only handle jobs that fit into 30 days."
  - "Multiday appointments cannot use complex work or go to capacity-based resources, so a partner modelled only as capacity is ruled out."
  - "A crew is a service resource of its own. Scheduling sees the crew's absences, not its members', and members get no assignment notification."
  - "With Enhanced Scheduling, a dependency group schedules up to five appointments all or none. Multiday appointments are never reshuffled."
  - "For commissioning I plan the site survey and the main job as separate appointments and keep the project plan outside the Gantt."
faq:
  - q: "How long can a multiday service appointment be in Salesforce Field Service?"
    a: "According to Salesforce Help, a multiday appointment can span up to eight calendar weeks. Appointment Booking, Schedule and optimization only handle up to 30 days, because their search horizon is 30 days. Longer jobs are scheduled by hand."
  - q: "Can a crew take a multiday appointment?"
    a: "Yes. A crew is a service resource of type Crew and can be assigned a multiday appointment like a single technician. Scheduling then uses the crew's own absences, efficiency and home base, not those of its members."
  - q: "Can I link a multiday appointment to other appointments with complex work?"
    a: "No. Salesforce Help states that multiday scheduling and complex work cannot be combined. A preceding site survey therefore has to be ordered by the dispatcher or by your own automation."
  - q: "Do crew members get notified when their crew is assigned?"
    a: "No. According to Salesforce Help, crew members do not receive assignment notifications and are not added as followers automatically. Custom push notifications can close that gap."
draft: false
---

Salesforce Field Service can plan commissioning, overhauls and other jobs that keep a team on site for days, but with clear limits. A multiday appointment may span up to eight calendar weeks, while automated scheduling and optimization only handle jobs that fit into 30 days. Teams are modelled as crews, which the engine treats as one resource. Complex work links appointments in a fixed order, yet it cannot be combined with multiday appointments. For manufacturers whose field service is mostly commissioning, I therefore plan the long job in Field Service and keep the project plan with its phases in the ERP or a project tool.

## Long jobs need their own planning model

Field Service was built for many short jobs per technician and day. That is where route and slot optimisation pays off, as described in [Salesforce Field Service: when is it worth it?](../salesforce-field-service-worth-it/). Salesforce sells the product today as Field Service and Operations, and the scheduling logic is still the same.

A line commissioning at a customer site looks different. Three people work at one site for two weeks, travel once and need drawings, test protocols and the customer's acceptance. Nobody optimises their route in the afternoon. What matters is that the team is blocked for the right days, that nobody plans a maintenance visit for them in between and that the preceding work is done when they arrive.

Field Service has three tools for this: multiday appointments, crews and complex work. Each solves part of the problem, and each has limits that you should know before a partner designs the solution. All three belong to [chapter 2 of the Field Service masterclass](../../masterclass/field-service/field-service-scheduling-dispatch/), next to master data and scheduling policies.

## How do multiday appointments work?

A multiday appointment is a normal service appointment with the field Is MultiDay set. According to [Salesforce Help on multiday work](https://help.salesforce.com/s/articleView?id=service.pfs_multiday.htm&language=en_US&type=5), an admin enables it in the Field Service settings, and dispatchers get the Long-Term Gantt view in the Classic Dispatch Console, which shows up to six months and up to 1,000 appointments.

The rules that matter in practice:

- **Length.** A multiday appointment can span up to eight calendar weeks. Appointment Booking, Schedule and optimization only work up to 30 days, because their search horizon is 30 days. The whole appointment must fit into that window.
- **Working time.** Scheduled start and end must lie within the technician's operating hours. The customer's visiting hours on the work order are not considered.
- **Travel.** The span includes the daily trip from and to the home base, which can be set on the Service Resource Availability work rule.
- **Blocking.** During a multiday appointment, the resource cannot take other appointments.
- **No capacity.** Multiday appointments cannot be assigned to capacity-based resources.

With Enhanced Scheduling and Optimization (ESO), the newer scheduling engine, two more things change. Other appointments can only slide earlier or later in the day around a multiday appointment; it is never reshuffled or dropped, not even for a high-priority job. And utilization ignores multiday appointments. A commissioning team on site for two weeks therefore looks idle in the utilization numbers. What the switch to ESO means otherwise is covered in [Enhanced Scheduling and Optimization: switch now?](../field-service-enhanced-scheduling-optimization-switch/).

## How do crews work for a commissioning team?

A crew is a group of technicians that the engine schedules as one unit. Technically it is a service resource of type Crew. According to [Salesforce Help on crew considerations](https://help.salesforce.com/s/articleView?language=en_US&id=service.pfs_service_crews_considerations.htm&type=5), these rules apply:

- Only active resources of type Technician can join a crew, and crews cannot contain crews. Members need a membership in the crew's territory, and a technician can be in several crews if the dates do not overlap.
- Absences count only on the crew's own resource. If a member is on vacation, the engine does not see it.
- The crew's efficiency decides the scheduled end. Member efficiencies are ignored.
- Only the crew leader's location is tracked, and the crew's resource is the home base for travel.
- Members get no assignment notification and are not added as followers when the appointment is dispatched.
- Work types, work orders and line items carry a minimum and a recommended crew size. Only the minimum affects scheduling.
- With skill grouping, the engine considers the combined skills of the members.

For a commissioning team that means the crew has to be maintained with care. A vacation becomes either a change of crew membership or, if the crew cannot work without that person, an absence on the crew. Otherwise the plan shows three people where only two will arrive.

## Complex work links up to five appointments

Complex work links appointments in a fixed order.

```vertiefung For admins
title: Which dependency types does complex work offer?
The [object reference](https://developer.salesforce.com/docs/atlas.en-us.object_reference.meta/api/sforce_api_objects_fsl__time_dependency__c.htm) lists four dependency types: Same Start, Start After Finish, Start After Finish And Same Day, and Immediately Follow. A separate flag says whether both appointments go to the same resource.
```

According to [Salesforce Help on complex work](https://help.salesforce.com/s/articleView?id=pfs_complex_work_considerations.htm&language=en_US&type=0), ESO schedules a dependency group all or none, with up to five appointments per group. Larger groups are scheduled by hand. Without ESO, dependencies are only enforced pairwise, so chains of three or more can break. Capacity-based resources cannot be assigned to dependent appointments automatically.

```hinweis achtung
The limit that hits commissioning hardest: multiday scheduling and complex work cannot be combined. A site survey followed by a two-week commissioning cannot be linked with a dependency.
```

| Need | Feature | Limit that matters |
|---|---|---|
| Team on site for 12 days | Multiday appointment | Automatic only up to 30 days |
| Three people as one unit | Crew | Absences and notifications only on crew level |
| Survey before installation | Complex work | Not with multiday appointments |
| Partner supplies a fitter | Single service resource | Capacity-based partners cannot take multiday jobs |

## Worked example: a packaging line in 12 working days

The figures are assumed. A packaging machine builder commissions a line at a customer site. Commissioning takes 12 working days with a crew of three: a crew leader, a mechanic and an electrician. A one-day site survey takes place two weeks before. The electrician comes from a service partner.

Here is how I would set this up in Field Service:

1. **Survey as its own appointment.** It gets a work type with the skill "site survey" and is scheduled normally. Because no dependency to the multiday appointment is possible, a flow sets the earliest start of the commissioning appointment to the day after the survey is completed.
2. **Commissioning as a multiday appointment.** 12 working days are about 16 calendar days. That fits into the 30-day horizon, so the engine can still propose the crew.
3. **Crew with a fixed membership.** The partner's electrician is a service resource of his own, as described in [bringing in service partners](../salesforce-field-service-service-partners/). A partner modelled only as capacity could not be part of this job.
4. **Notifications.** A custom push notification informs all three members on dispatch, because Field Service does not do it for crew members.
5. **Phases outside the Gantt.** Mechanical installation, electrical commissioning, test run and acceptance stay as milestones in the project plan of the ERP. The appointment carries the work, the time and the documentation.

If the commissioning took six weeks, I would schedule the appointment by hand or split it into two multiday appointments of three weeks each. Each split adds coordination, so I only do it when it lets automated scheduling make proposals.

## When should long jobs stay outside Field Service?

My rule: if most of your field service is commissioning and overhauls, Field Service rarely pays off for planning alone. The engine has little to optimise when a team is booked for two weeks. Field Service earns its place when the same technicians also run maintenance and breakdown visits between projects, because then both kinds of work land in one plan.

Two decisions belong in the design before a partner builds anything. The first: which system holds the project plan with phases and dates, and how the dates reach the appointment. The second: how dispatchers protect long jobs from short ones; the scheduling policy from [how much scheduling should be automatic](../salesforce-field-service-scheduling-automation/) needs a clear rule for that. Where the architecture question goes beyond Field Service, I describe my approach under [Salesforce architecture](../../services/salesforce-architecture/).

## First step: review your last ten commissioning jobs

Take your last ten commissioning jobs and note duration, team size, preceding work and whether partners were involved. If most stay under 30 days and the teams are stable, multiday appointments with crews will carry the planning. If many run longer or have more than five linked steps, keep the project plan outside and use Field Service for the work on site.
