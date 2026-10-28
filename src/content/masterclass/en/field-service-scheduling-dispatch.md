---
title: "Field Service scheduling: engine, console and rules"
description: "How Salesforce Field Service scheduling works for manufacturers: master data, policies, Enhanced Scheduling, the new console, long jobs and on-call duty."
lang: en
slug: field-service-scheduling-dispatch
course: field-service
translationKey: fsl-02
chapter: 2
short: "Scheduling and dispatch"
summary: "Master data, scheduling policies, Enhanced Scheduling, the new Scheduling Console and multiday jobs: what carries field service planning."
takeaways:
  - "Field Service schedules only as well as six kinds of master data: territories with operating hours, technicians with skills, work types, assets, customer visiting hours and absences."
  - "A scheduling policy combines work rules, which exclude technicians, with weighted service objectives, which rank the rest. A good start is automation up to Scheduled and a dispatcher who releases."
  - "Enhanced Scheduling and Optimization is the default for new orgs and the only engine that runs the new Scheduling Console; older orgs switch territory by territory after a data check."
  - "Multiday appointments can span eight weeks, but automated scheduling only handles jobs that fit into 30 days, and they cannot be combined with complex work."
  - "Before go-live, three decisions need a name next to them: which engine, which dispatcher console and who owns the scheduling policies."
articles: [field-service-master-data, field-service-scheduling-automation, field-service-enhanced-scheduling-eso, field-service-scheduling-console, field-service-multiday-crews-commissioning, field-service-on-call-shifts]
faq:
  - q: "What is a scheduling policy in Salesforce Field Service?"
    a: "A scheduling policy is the set of rules the engine uses to assign service appointments. Work rules exclude technicians who cannot take a job, for example because a skill is missing. Weighted service objectives rank the remaining candidates, for example by travel time. Field Service ships four default policies as a starting point."
  - q: "Do I need Enhanced Scheduling and Optimization?"
    a: "New orgs have it on by default. Existing orgs need it for the new Scheduling Console and get higher limits, such as 250 skills per technician instead of 100. Scheduling recipes disappear and several work rules treat empty fields differently, so check the data first and switch one territory as a pilot."
  - q: "Can Field Service plan commissioning jobs that take a crew two weeks?"
    a: "Yes, as a multiday appointment assigned to a crew. Automated scheduling handles it as long as the job fits into 30 days. Longer jobs are scheduled by hand, and a preceding site survey cannot be linked to the multiday appointment with complex work."
  - q: "How does Field Service handle on-call duty on weekends?"
    a: "With confirmed shifts outside the territory's operating hours. An Extended shift only takes appointments when the scheduling policy allows overtime, and filter criteria can limit it to breakdowns. In Germany, the works council has a say on on-call rotas."
  - q: "Will an AI agent replace the dispatcher?"
    a: "Not for manufacturers in the near term. Agents book standard visits and fill gaps; Winter '27 adds booking by phone. Breakdowns with unclear causes, customer shutdowns and long jobs still need a dispatcher who knows what is not in the data."
draft: false
---

Scheduling in Salesforce Field Service rests on four things: clean master data, a scheduling policy that reflects how your dispatchers think, the right engine and a console your dispatchers trust. For manufacturers I start with automation up to the status Scheduled and a dispatcher who releases each job. Enhanced Scheduling and Optimization is the engine to use; older orgs switch territory by territory. The new Scheduling Console only runs with it and does not yet do everything the Classic Dispatch Console does. Commissioning over several days, crews and on-call duty each have their own model with clear limits. Engine, console and policy owner need to be decided before go-live.

## What does scheduling need before the engine runs?

Field Service, which Salesforce sells today as [Field Service and Operations](https://www.salesforce.com/service/field-service-management/pricing/), decides with the data it has. Chapter 1 covered whether it pays off and which licences each role needs, in [business case and licences](../field-service-business-case-licences/). This chapter starts where the first technician gets planned.

The engine needs six kinds of master data, described in detail in [what data Field Service scheduling needs](../../../blog/salesforce-field-service-master-data/):

- **Service territories with operating hours.** Salesforce recommends up to 50 technicians per territory.
- **Technicians with skills.** Skill levels run from 0 to 99.99; the company decides what each level means.
- **Work types.** Templates for annual maintenance, breakdown repair or commissioning, with duration and required skills.
- **Assets.** The machines at the customer site, usually from the ERP.
- **Customer visiting hours.** Operating hours on the account, which only count when the visiting hours work rule is active.
- **Absences.** Vacation and training from time tracking.

Hardly any of this is created in Field Service. Assets come from the ERP, skills from HR or the training system, absences from time tracking. So for each kind I set a leading system and an owner before the first interface is built. Which system leads between ERP and Salesforce is the subject of [Salesforce integration](../../../services/salesforce-integration/).

My starting point for the data check is always the same: the failed visits of the last three months, each with a cause. Missing parts, no access, wrong technician, technician absent. The most frequent cause shows which data needs to be clean first.

## How does the scheduling engine decide?

The engine assigns appointments by a scheduling policy. Work rules filter out technicians who cannot take a job, such as Match Skills or the visiting hours rule. Service objectives rank the rest with a weight: short travel, early slot, preferred technician. Field Service ships four policies: Customer First, High Intensity, Soft Boundaries and Emergency. I start with Customer First and adjust the weights instead of building a policy from scratch.

The second decision is how far automation goes. A service appointment moves from None to Scheduled, when it has a technician and a slot, to Dispatched, when it is released to the technician's app. Between Scheduled and Dispatched a dispatcher can still step in. For manufacturers I recommend exactly that split at the start: the engine schedules, the dispatcher reviews and releases. The dispatcher knows that a customer has to shut down a line before maintenance, which is in no field.

Automation grows when dispatchers hardly change proposals any more. To get there, they note for four weeks why they changed a proposal, and each reason becomes data or a work rule. The full path, including drip feed for automatic release, is in [how much Field Service scheduling should be automatic](../../../blog/salesforce-field-service-scheduling-automation/).

## Should you switch to Enhanced Scheduling and Optimization?

Enhanced Scheduling and Optimization, ESO for short, is the newer scheduling engine. According to the [Field Service guide](https://resources.docs.salesforce.com/latest/latest/en-us/sfdc/pdf/support_field_service.pdf), new orgs have it on for all territories, and existing orgs can switch all territories or one at a time. For an org that went live on the older engine, my answer is yes, but territory by territory. The details are in [Enhanced Scheduling and Optimization: switch now?](../../../blog/field-service-enhanced-scheduling-optimization-switch/).

Three points decide the effort:

- **Higher limits.** According to the [ESO limits](https://help.salesforce.com/s/articleView?id=sf.pfs_enhanced_available_limits.htm&language=en_US&type=5), a technician can carry 250 skills instead of 100, and optimization handles 50,000 appointments per rolling 24 hours or 500 per scheduling licence. Machine builders with skills per series, control system and safety training need the room.
- **What disappears.** Scheduling recipes are not available; Salesforce Help names the Fix Schedule Overlaps flow as the replacement. Optimization Insights becomes the Optimization Hub.
- **What behaves differently.** According to the [ESO considerations](https://help.salesforce.com/s/articleView?id=sf.pfs_enhanced_available_considerations.htm&language=en_US&type=5), several work rules treat empty fields differently, and an appointment without a territory gets candidates from all territories. Data gaps that were harmless before now change results.

### Global, in-day or single-resource optimization?

Optimization rearranges a plan after the first booking. Field Service has three kinds, and each fits a different job mix:

| Optimization | What it does | Fits |
|---|---|---|
| Global | Rearranges one or more territories over several days, for example every night | Planned maintenance, multiday requirements with a wide horizon |
| In-day | Absorbs short-notice changes on the day of service | Breakdowns that push the day's plan |
| Resource schedule optimization | Repairs one technician's day after a cancellation or delay and fills gaps | A late job, an early finish |

According to [Salesforce Help on resource schedule optimization](https://help.salesforce.com/s/articleView?id=service.pfs_resource_optimization_user.htm&language=en_US&type=5), the single-resource option is a tactical tool for today or tomorrow, and it can take work from other technicians unless you restrict it to the resource. For multiday requirements, Help points to global optimization.

## Scheduling Console or Classic Dispatch Console?

Salesforce has two dispatcher screens now. The Classic Dispatch Console is the familiar Gantt, renamed with Summer '26. The new Scheduling Console shows Gantt, appointment list and map on one screen. According to [Trailhead](https://trailhead.salesforce.com/content/learn/modules/scheduling-console-quick-look/didispatch-smarter-with-the-scheduling-console), it is available only with ESO, and it shows readable recommendations with a **Why?** that explains a suggested slot with AI. Customisations of the old console carry over according to Trailhead.

The two are not at parity yet. In a Trailblazer Community thread from May 2026, a Salesforce team member confirmed this after customers missed long-range views such as Utilization and Long-Term. For a manufacturer that matters: the planner who books annual maintenance weeks ahead works in exactly those views. As of October 2026 I found no retirement date for the Classic Dispatch Console, so I let two dispatchers test the new console in one territory first. The test plan is in [Scheduling Console: move dispatchers now?](../../../blog/field-service-scheduling-console-dispatchers/).

## How do you plan commissioning and other long jobs?

Field Service was built for many short jobs per day. Commissioning, overhauls and retrofits keep a team on site for days. For those, Field Service has three tools, each with a limit that shapes the design:

- **Multiday appointments** span up to eight calendar weeks according to [Salesforce Help](https://help.salesforce.com/s/articleView?id=service.pfs_multiday.htm&language=en_US&type=5). Booking, Schedule and optimization only handle jobs that fit into 30 days. Under ESO a multiday appointment is never reshuffled or dropped, and utilization ignores it.
- **Crews** are a service resource of type Crew. Absences and efficiency count only on the crew, not on its members, and members get no assignment notification.
- **Complex work** links appointments in a fixed order. With ESO, a dependency group of up to five appointments is scheduled all or none. Multiday appointments cannot be part of it.

The last limit hits commissioning hardest: a site survey cannot be linked to the two-week installation that follows it. Capacity-based resources cannot take multiday jobs either, so a partner company modelled only as capacity drops out. My rule: the project plan with phases and milestones stays in the ERP or a project tool, and Field Service carries the work on site, the time and the documentation. The setup is in [Field Service multiday jobs: commissioning and crews](../../../blog/field-service-multiday-jobs-crews-commissioning/).

## On-call duty and overtime

Operating hours describe the regular working time of a territory, usually Monday to Friday. The Shift object adds working time outside it: weekend call, nights, overtime. Only confirmed shifts count for scheduling. An Extended shift takes appointments only when the Service Resource Availability work rule in the policy allows overtime, and filter criteria limit a shift to certain jobs, for example breakdowns with high priority.

The most common surprise after go-live: a contract promises a technician within 24 hours, a machine stops on Saturday, and the appointment stays at None because no confirmed shift exists. Entitlement, shift and policy have to fit together. In Germany the works council has a say on on-call rotas and overtime under [section 87 of the Works Constitution Act](https://www.gesetze-im-internet.de/betrvg/__87.html). Setup and the points to agree are in [Field Service on-call duty](../../../blog/field-service-on-call-shifts/).

## Where does the human dispatcher stay when AI agents schedule?

Salesforce is moving scheduling towards agents. Gap filling after cancellations is generally available for dispatchers, and customers can book and reschedule through an agent that runs on Flex Credits. The [Winter '27 highlights](https://trailhead.salesforce.com/content/learn/modules/winter-27-release-highlights/see-whats-new-service-field-service-it-hr-service-and-contact-center) add autonomous scheduling with Agentforce Voice: voice agents book around the clock, check availability and pick a technician in the right territory while the customer is on the phone. The same release lets Agentforce handle rebooking calls for dispatchers.

For a machine builder I see the dispatcher staying in three places: breakdowns with an unclear cause, visits that need a shutdown at the customer, and long jobs. Planned maintenance from maintenance plans is the first candidate for an agent, because the rules are known. Which agents work today is in [AI agents in Field Service: what works today?](../../../blog/field-service-ai-agents-what-works-today/), the manufacturing view in the AI masterclass chapter on [AI agents in manufacturing](../../ai-salesforce/ai-agents-in-manufacturing/), and rollout and cost in [chapter 5](../field-service-ai-agents-rollout/). An agent books with the same policy as the engine, so everything in this chapter applies to it too.

## A typical scenario, as an assumption: four dispatchers leave Excel

A typical scenario, as an assumption: a component maker with 40 technicians in three territories and four dispatchers. Field Service has been live since 2022 on the older engine. Two dispatchers plan maintenance in Excel and copy dates into the Classic Dispatch Console; two handle breakdowns directly in the Gantt. All numbers are assumptions to show the method.

1. **Weeks 1 to 3, data.** The failed visits of one quarter show that most go back to missing skills and missing visiting hours. Skills come from the training system through an interface, visiting hours are entered by inside service. A report finds 8 percent of open appointments without a territory.
2. **Weeks 4 to 6, policy.** Customer First with adjusted weights for maintenance, Emergency for breakdowns with overtime allowed. One scheduling recipe for late jobs is rebuilt as a Fix Schedule Overlaps flow.
3. **Weeks 7 to 10, pilot.** One territory switches to ESO. The engine schedules, the dispatchers release and note every change with a reason. Two dispatchers get the Scheduling Console permission set for that territory.
4. **Week 11, decision.** The changed proposals in the pilot territory are no higher than before, so the other territories follow. The maintenance planner keeps the Classic Dispatch Console for long-range views until the new console has them.
5. **Alongside, on-call.** Weekend shifts per region are created from a pattern and confirmed once the works council has approved the quarter's rota.

The Excel list is gone after week 10. The dispatchers still decide, but from a proposal instead of an empty calendar.

## What to decide before go-live

Three decisions need a name next to them before a partner configures scheduling:

- **Engine.** ESO for every territory, with a date for older orgs. Without a date, the switch gets postponed.
- **Console.** Which dispatchers move to the Scheduling Console and which views they need every day.
- **Policy owner.** One person in service management owns scheduling policies, work rules and weights, and approves every change.

Policies, work rules, operating hours and territories are records, not metadata. A metadata deployment does not carry them, so they belong in the pipeline as described in the DevOps masterclass chapter on [data and configuration](../../devops-release-management/data-and-configuration/). Otherwise the tested sandbox and production drift apart after the first change. Where the scheduling design touches ERP, project tools and partners, I help with the [Salesforce architecture](../../../services/salesforce-architecture/). The next step for technicians is the app: [chapter 3](../field-service-mobile-app-documents/) covers offline data, forms and service reports, and the [overview](../) lists all chapters.

Good scheduling in Field Service starts with clean data and a named policy owner, and the engine, the console and the agents build on that. If you want an independent view of your scheduling setup, [send me a message](#contact).
