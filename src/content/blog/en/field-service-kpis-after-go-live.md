---
title: "Field Service KPIs after go-live: what to measure"
description: "Which KPIs show after go-live whether Salesforce Field Service delivers, how to define first-time fix and what Operations Home and its dashboards add."
pubDate: 2026-10-28
lang: en
slug: field-service-kpis-after-go-live
translationKey: field-service-kpis-after-go-live
topic: field-service
categories: [field-service]
tags: [field service, KPIs, first-time fix, Operations Home, rollout, analytics]
takeaways:
  - "After go-live, Field Service has to move the numbers from the business case: jobs per technician and day, travel share, first-time fix rate, response times met and arrivals within the window."
  - "The share of engine proposals that dispatchers change before release shows whether data and scheduling policy fit. Salesforce does not deliver it ready-made."
  - "Operations Home shows 12 KPIs, Field Service Intelligence five dashboards with more than 30 KPIs. Both run on Data 360 and need to be licensed."
  - "First-time fix needs a written definition before any dashboard: time window, same asset, same fault code and which planned follow-up visits do not count."
  - "Without a baseline from the old system, measured over three months with the same definitions, nobody can say after go-live whether Field Service helped."
faq:
  - q: "Which KPIs matter after a Field Service go-live?"
    a: "I use six: jobs per technician and day, share of travel time, first-time fix rate, response times met, arrivals within the arrival window and the share of engine proposals dispatchers change before release. They match the business case."
  - q: "What is Operations Home in Salesforce Field Service?"
    a: "A homepage for back-office staff with 12 out-of-the-box KPIs, including first-time fix rate, utilization, job duration and asset downtime. According to Salesforce it is powered by Tableau Next, Data Cloud and Agentforce."
  - q: "Is Field Service Intelligence included in the Field Service licence?"
    a: "The price list shows Field Service Intelligence and Operations Home with 'available for purchase' entries, and Tableau Next is only included in Agentforce 1 Field Service. Ask your account team which line items your edition needs."
  - q: "How do you calculate the first-time fix rate?"
    a: "Share of work orders with no further visit to the same asset for the same fault within a fixed window, for example 14 days. Write down which planned follow-up visits, such as multiday commissioning, are excluded."
draft: false
---

After go-live, Salesforce Field Service has to move the numbers from the business case: jobs per technician and day, travel share, first-time fix rate, response times met and arrivals within the promised window. I add one more: how often dispatchers change the engine's proposals before release. Salesforce offers two ready-made views. Operations Home shows 12 KPIs, among them first-time fix rate, utilization, job duration and asset downtime. Field Service Intelligence has five dashboards with more than 30 KPIs. Both run on Data 360 and need to be licensed. Before any dashboard, write down how each KPI is defined and measure a baseline in the old system.

## Which KPIs show whether Field Service delivers?

The KPIs after go-live are the four numbers I use to decide whether [Field Service is worth it](../salesforce-field-service-worth-it/), plus two that show whether scheduling works. This is the set I would track per region and month:

| KPI | How I define it | Where the number comes from |
|---|---|---|
| Jobs per technician and day | Completed appointments divided by technician working days | Service appointments with status Completed |
| Travel share | Travel time divided by working time | [Timesheets](https://help.salesforce.com/s/articleView?id=sf.fs_set_up_timesheets.htm&language=en_US&type=5), which record travel and breaks |
| First-time fix rate | Work orders without a further visit to the same asset for the same fault within 14 days | Work orders, asset, fault code |
| Response times met | Breakdowns where the technician arrived within the committed time | Entitlement milestones on the work order |
| Arrival within window | Actual start within the arrival window promised to the customer | Service appointment fields |
| Dispatcher change rate | Share of proposals changed before the status Dispatched | Your own tracking |

Two of these come almost for free. The service appointment object has fields for the [actual start time and the arrival window](https://developer.salesforce.com/docs/service/salesforce-scheduler-dev-guide/guide/sforce-api-objects-serviceappointment.html), so a standard report compares them. Response times come from milestones on work orders, which need an entitlement process of type Work Order, as described in [modelling maintenance contracts](../salesforce-field-service-maintenance-contracts/).

The dispatcher change rate takes some effort, and it is the most useful number in the first months. In [how much scheduling should be automatic](../salesforce-field-service-scheduling-automation/) I recommend having dispatchers note why they change a proposal. A picklist with the reason on the appointment turns that into a report. A high rate means missing data or a policy that does not fit, and the reasons show which one.

## What do Operations Home and Field Service Intelligence provide?

Salesforce sells Field Service today as Field Service and Operations, and its analytics come in two parts. According to the [Salesforce blog of September 2025](https://www.salesforce.com/blog/how-to-transform-field-service-operations-with-agentic-analytics/):

- **Operations Home** is the homepage for back-office staff, with 12 out-of-the-box KPIs, including first-time fix rate, utilization rate, job duration and asset downtime. It is powered by Tableau Next, Data Cloud and Agentforce, and Concierge answers questions in plain language.
- **Field Service Intelligence** has five out-of-the-box dashboards on work orders, appointments, assets, parts inventory and resources, with more than 30 KPIs.

Salesforce Help describes [Field Service Intelligence](https://help.salesforce.com/s/articleView?id=service.ifs_intro.htm&language=en_US&type=5) as including Data 360, CRM Analytics and Agentforce Service. Its [Service data kit](https://help.salesforce.com/s/articleView?id=sf.ifs_install_data_kit.htm&language=en_US&type=5) deploys more than 20 data streams, and Help warns not to remove the installed objects, fields or mappings, because the dashboards rely on them. Tableau Next itself needs Data Cloud configured first, according to the [Tableau Next setup guide](https://help.tableau.com/current/tableau-next/en-us/tableau_next_setup_guide_configure_data_cloud.htm).

The licence question is not obvious from the [price list](https://www.salesforce.com/service/field-service-management/pricing/). Its comparison table marks Tableau Next as "Available for Purchase" for Dispatcher, Technician and Field Service Plus, and Agentforce 1 Field Service includes it together with 2.5 million Data Cloud credits per org and year. Operations Home and Field Service Intelligence also appear with "Available for Purchase" entries. Ask your account team in writing which line items your edition needs before you promise anyone a dashboard.

My view: the ready-made views are worth it once the definitions are agreed and Data 360 is in place anyway. For the first wave, standard reports on service appointments and work orders cover the business case numbers.

## Why does first-time fix need a definition first?

Because a KPI name is not a formula. Operations Home shows a first-time fix rate. Whether it matches what your service manager means is something you have to check. I write down five decisions:

1. **Time window.** A repeat visit within 7, 14 or 30 days?
2. **Scope.** Same asset or same customer site?
3. **Fault.** Same fault code, or any further visit?
4. **Planned follow-ups.** A second visit because a part was ordered on purpose, or a multiday commissioning job, should not count as a failure.
5. **Remote fixes.** Does a problem solved by phone or video count as fixed first time?

The third decision only works with coded faults. If fault causes live in free text, the rate counts every further visit, including the annual maintenance a week later. If the vendor definition and yours differ, report yours and note the difference once.

## How do you get a baseline from the old system?

Measure three months before go-live with the same definitions you will use afterwards. The data usually sits in the ERP's service orders or the old scheduling tool: completed jobs per technician, travel from timesheets or vehicle logs, repeat visits per machine. If nobody can produce these numbers, that is already a finding, and it weakens every business case.

Then compare per region and per wave. The [rollout in waves](../salesforce-field-service-rollout/) gives you a natural control group: regions that are not live yet still run on the old process. If a live region improves and a waiting region stays flat, the change comes from Field Service and not from a quiet season.

## A typical scenario, as an assumption: baseline and the first wave

A typical scenario, as an assumption: a component maker with 90 technicians in three regions, SAP as ERP and a rollout in three waves. All numbers are assumptions.

**Baseline, three months from SAP service orders and timesheets.** 2.1 jobs per technician and day, 38 percent travel share, 71 percent first-time fix (14 days, same asset, same fault code), 84 percent of breakdowns within the committed response time.

**Region one, month three after go-live.** 2.4 jobs per day, 33 percent travel, 88 percent of response times met. First-time fix is still at 72 percent. Dispatchers changed 41 percent of proposals in month one and 24 percent in month three, mostly because of customer access times.

**The reading.** Scheduling works, so jobs and travel improve. First-time fix does not move because technicians still arrive without the right part: van stock is not in Salesforce yet. Before wave two, the team brings van stock in as mobile locations, as described in [spare parts between ERP and Salesforce](../salesforce-field-service-spare-parts-erp/), and adds visiting hours for the accounts behind most changes.

## Who owns the numbers after go-live?

Someone in the business, not the project. I would give the definitions to the head of service, the dispatcher change rate to the dispatch lead and the data pipeline to IT. A 30-minute review per month and region is enough: six numbers, the reasons behind outliers and one decision. The technical side of operations, from monitoring to backup, is covered in the DevOps chapter on [operations, monitoring and backup](../../masterclass/devops-release-management/operations-monitoring-backup/).

If you add Field Service agents later, measure them separately with their own KPIs, as described in [Agentforce KPIs after go-live](../agentforce-kpis-after-go-live/). An agent that books maintenance visits changes jobs per day only indirectly.

## Where should you start?

1. **Pick the KPIs** from your business case, at most six.
2. **Write the definitions**, especially for first-time fix.
3. **Measure the baseline** for three months in the old system.
4. **Start with standard reports** in the first wave and move to Operations Home or Field Service Intelligence once licences and definitions are clear.
5. **Review monthly per region** and tie every outlier to a data or process fix.

How the KPIs fit into rollout and operations is covered in the [Field Service masterclass chapter on AI agents, rollout and operations](../../masterclass/field-service/field-service-ai-agents-rollout/).

Field Service proves itself in six numbers you defined before go-live, and a dashboard only shows them. If you want help setting up the baseline and the review, [send me a message](#contact).
