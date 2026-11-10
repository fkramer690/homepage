---
title: "Field Service KPIs after go-live: what to measure"
description: "Which KPIs show whether Salesforce Field Service delivers after go-live, how to define first-time fix and what Operations Home and its dashboards add."
pubDate: 2026-10-28
updatedDate: 2026-11-09
lang: en
slug: field-service-kpis-after-go-live
translationKey: field-service-kpis-after-go-live
topic: field-service
categories: [field-service]
tags: [field service, KPIs, first-time fix, Operations Home, rollout, analytics]
takeaways:
  - "I also measure how often dispatchers change the engine's proposals before release. It shows whether data and scheduling policy fit."
  - "The Salesforce dashboard calculates first-time fix from appointment status. A repeat-visit definition needs its own calculation."
  - "First-time fix needs a written definition: time window, same asset, same fault code and which follow-up visits do not count."
  - "Without a baseline from the old system that uses the same definitions and covers seasonal swings, nobody can say whether Field Service helped."
faq:
  - q: "Which KPIs matter after a Field Service go-live?"
    a: "For a business case built on scheduling and productivity, I use six KPIs: jobs per technician per day, share of time spent traveling, first-time fix rate, response times met, arrivals within the arrival window and the share of scheduling engine proposals that dispatchers change before release. I add at least one financial or customer outcome, such as service margin or customer satisfaction."
  - q: "What is Operations Home in Salesforce Field Service?"
    a: "It is a homepage for back-office staff. In September 2025, Salesforce described it as having 12 out-of-the-box KPIs, including first-time fix rate, utilization, job duration and asset downtime, powered by Tableau Next, Data Cloud and Agentforce. Check the current template in your release."
  - q: "Is Field Service Intelligence included in the Field Service license?"
    a: "Not in every edition. As of November 9, 2026 the price list shows Field Service Intelligence and Operations Home as available for purchase for several editions, and Field Service+ Advanced lists Field Service Intelligence among its features. Tableau Next is available for purchase for Dispatcher and Technician. Ask your account team which line items your edition needs."
  - q: "How do you calculate the first-time fix rate?"
    a: "My definition is the share of work orders with no further visit to the same asset for the same fault within a fixed window, for example 14 days, excluding planned follow-ups such as multiday commissioning. The Field Service Intelligence dashboard calculates it differently, as completed appointments divided by completed plus cannot-complete appointments."
draft: false
---

After go-live, Salesforce Field Service has to improve the metrics from the business case. For a scheduling and productivity case, that means jobs per technician per day, share of time spent traveling, first-time fix rate, response times met and arrivals within the promised window. I add one more: how often dispatchers change the engine's proposals before release. Salesforce offers ready-made views in Operations Home and Field Service Intelligence, but the first-time fix rate in those views is based on appointment status, not on repeat visits. Before any dashboard, write down how each KPI is defined and measure a baseline in the old system.

## Which KPIs show whether Field Service delivers?

The KPIs after go-live are the four numbers I use to decide whether [Field Service is worth it](../salesforce-field-service-worth-it/), plus two that show whether scheduling works. They fit a business case built on scheduling and productivity; alongside them, I would track at least one outcome such as service margin, contract renewals or customer satisfaction. This is the operational set I would track per region and month:

| KPI | How I define it | Where the number comes from |
|---|---|---|
| Jobs per technician and day | Completed appointments divided by productive technician days, crew jobs counted once, ideally weighted by work type | Service appointments with status Completed |
| Travel share | Travel time divided by working time | One agreed source: actual travel time on the assigned resource, [time sheet](https://help.salesforce.com/s/articleView?id=sf.fs_set_up_timesheets.htm&language=en_US&type=5) entries with a travel category, telematics or ERP time bookings |
| First-time fix rate | Work orders without a further visit to the same asset for the same fault within 14 days | Work orders, asset, fault code |
| Response times met | Breakdowns where the technician arrived within the committed time | Milestone target on the work order compared with actual start |
| Arrival within window | Actual start within the arrival window promised to the customer | Service appointment fields |
| Dispatcher change rate | Share of proposals changed before the status Dispatched | Your own snapshot of proposal and final assignment |

Two of these use standard fields. The service appointment object has fields for the [actual start time and the arrival window](https://developer.salesforce.com/docs/service/salesforce-scheduler-dev-guide/guide/sforce-api-objects-serviceappointment.html), so a report can compare them, provided technicians set the start status on arrival and the promised window is not overwritten later. Response times need milestones on work orders, which in turn require an entitlement process of type Work Order, as described in [modeling maintenance contracts](../salesforce-field-service-maintenance-contracts/). A milestone gives the committed target; whether the technician actually arrived in time comes from the actual start or a defined check-in, and a rule or automation has to connect the two.

The dispatcher change rate takes some effort, and it is the most useful number in the first months. In [how much scheduling should be automatic](../salesforce-field-service-scheduling-automation/) I recommend having dispatchers note why they change a proposal. A reason picklist alone does not measure changes, though. You need a snapshot of the proposed resource and time, the final resource and time, who changed it and when, plus the reason; field history can supply part of it if the right fields are tracked. A high rate can mean missing data or a policy that does not fit, but also customer changes, emergencies, absences or dispatchers who do not trust the engine yet. The reasons show which explanation applies.

## Operations Home and Field Service Intelligence run on Data 360

Salesforce now sells Field Service as Agentforce Field Service and Operations, and its analytics come in two parts. According to the [Salesforce blog of September 2025](https://www.salesforce.com/blog/how-to-transform-field-service-operations-with-agentic-analytics/):

- **Operations Home** is the homepage for back-office staff, with 12 out-of-the-box KPIs, including first-time fix rate, utilization rate, job duration and asset downtime. It is powered by Tableau Next, Data Cloud and Agentforce, and Concierge answers questions in plain language.
- **Field Service Intelligence** has five out-of-the-box dashboards for work orders, appointments, assets, parts inventory and resources, with more than 30 KPIs.

The current setup builds on Data 360 and Tableau Next. Salesforce Help still describes an older version of [Field Service Intelligence](https://help.salesforce.com/s/articleView?id=service.ifs_intro.htm&language=en_US&type=5) with Data 360, CRM Analytics and Agentforce Service; you do not need both generations. Its [Service data kit](https://help.salesforce.com/s/articleView?id=sf.ifs_install_data_kit.htm&language=en_US&type=5) deploys more than 20 data streams, and Help warns not to remove the installed objects, fields or mappings, because the dashboards rely on them. Tableau Next itself requires Data Cloud to be configured first, according to the [Tableau Next setup guide](https://help.tableau.com/current/tableau-next/en-us/tableau_next_setup_guide_configure_data_cloud.htm).

The license question is not obvious from the [price list](https://www.salesforce.com/service/field-service-management/pricing/), which Salesforce changed in early November 2026. As of November 9, 2026, its comparison table marks Tableau Next as "Available for purchase" for Dispatcher and Technician. Operations Home and Field Service Intelligence are listed as available for purchase for several editions, and Field Service+ Advanced lists Field Service Intelligence among its features. Product license, user permissions, Tableau Next permissions and Data 360 consumption are separate questions.

```hinweis offen
Have your account team confirm which line items your edition needs for Operations Home, Field Service Intelligence and Tableau Next before you promise anyone a dashboard.
```

My view: the ready-made views are worth it once the definitions are agreed and Data 360 is in place anyway. For the first wave, standard reports on service appointments and work orders cover the business case numbers.

## First-time fix needs a definition first

A KPI name is not a formula. The [appointment dashboard of Field Service Intelligence](https://help.salesforce.com/s/articleView?id=service.ifs_dashboards_sa.htm&language=en_US&type=5) calculates first-time fix as appointments marked Completed divided by those marked Completed or Cannot Complete. That formula captures neither a second visit two weeks later nor the same fault on the same asset. A repeat-visit definition, which is what most service managers mean, needs its own calculation or an adapted data model. I write down five decisions:

1. **Time window.** A repeat visit within 7, 14 or 30 days?
2. **Scope.** Same asset or same customer site?
3. **Fault.** Same fault code, or any further visit?
4. **Planned follow-ups.** A multiday commissioning job, or a second visit for a part that could not reasonably be on the van, should not count as a failure. A second visit because a common part was missing from the van does count, because that is exactly what van stock should fix.
5. **Remote fixes.** Does a problem solved by phone or video count as fixed first time? With [visual remote assistance](../visual-remote-assistant-remote-help-instead-of-visit/), the share of remote fixes grows, so decide how to treat them before the first video session.

The third decision only works with coded faults. If fault causes are stored as free text, the rate counts every further visit, including the annual maintenance a week later. If the vendor definition and yours differ, report yours and note the difference once.

## How do you get a baseline from the old system?

Measure before go-live with the same definitions you will use afterwards, over a period long enough to cover seasonal swings; three months is a minimum, a year of history is better if the old system has it. The data usually sits in the ERP's service orders or the old scheduling tool: completed jobs per technician, travel from timesheets or vehicle logs, repeat visits per machine. If nobody can produce these numbers, that is already a finding, and it weakens every business case.

Then compare results by region and by wave. The [rollout in waves](../salesforce-field-service-rollout/) gives you a comparison group: regions that are not live yet still run on the old process. If comparable regions had similar trends before go-live and only the live region improves, that strengthens the case that the rollout contributed. It is not proof, because regions differ in customers, staff and season.

## Worked example: baseline and the first wave

Assume a component maker with 90 technicians in three regions, SAP as ERP and a rollout in three waves.

**Baseline, from SAP service orders and timesheets.** 2.1 jobs per technician and day, 38 percent travel share, 71 percent first-time fix (14 days, same asset, same fault code), 84 percent of breakdowns within the committed response time.

**Region one, month three after go-live.** 2.4 jobs per day, 33 percent travel, 88 percent of response times met. First-time fix is still at 72 percent. Dispatchers changed 41 percent of proposals in month one and 24 percent in month three, mostly because of customer access times.

**The reading.** Scheduling works, so jobs and travel improve. First-time fix does not move because technicians still arrive without the right part: van stock is not in Salesforce yet. Before wave two, the team models van stock as mobile locations, as described in [spare parts between ERP and Salesforce](../salesforce-field-service-spare-parts-erp/), and adds visiting hours for the accounts that caused most of the changes.

## Who owns the numbers after go-live?

The owner should be someone in the business, not the project team. I would assign ownership of the definitions to the head of service, the dispatcher change rate to the dispatch lead and the data pipeline to IT. A 30-minute review per region each month is enough: six numbers, the reasons behind outliers and one decision. These numbers show only indirectly whether dispatchers and technicians use the new process at all. The adoption numbers I put next to them are in [Measuring Salesforce adoption after go-live](../salesforce-adoption-metrics-after-go-live/). The technical side of operations, from monitoring to backup, is covered in the DevOps chapter on [operations, monitoring and backup](../../masterclass/devops-release-management/operations-monitoring-backup/).

If you add Field Service agents later, measure them separately with their own KPIs, as described in [Agentforce KPIs after go-live](../agentforce-kpis-after-go-live/). An agent that books maintenance visits affects jobs per day only indirectly.

## First step: at most six KPIs from the business case

```schritte
Pick the KPIs
  Take them from your business case, at most six.
Write the definitions
  Especially for first-time fix.
Measure the baseline | at least three months
  In the old system, with the same definitions you will use after go-live, longer if seasons matter.
Start with standard reports
  In the first wave; move to Operations Home or Field Service Intelligence once licenses and definitions are clear.
Review monthly per region
  Tie every outlier to a data or process fix.
```

Since the baseline takes at least three months, measurement has to start three months before go-live at the latest. How the KPIs fit into rollout and operations is covered in the [Field Service masterclass chapter on AI agents, rollout and operations](../../masterclass/field-service/field-service-ai-agents-rollout/).
