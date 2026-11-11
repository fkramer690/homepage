---
title: "Salesforce Field Service: When Is It Worth It?"
metaTitle: "Is Salesforce Field Service worth it? Criteria and costs"
description: "Scheduling in Salesforce Field Service pays off most with many short jobs. Criteria, license costs and alternatives for manufacturers' field teams."
pubDate: 2026-10-26
lang: en
slug: salesforce-field-service-worth-it
translationKey: field-service-worth-it
topic: field-service
categories: [field-service]
series: { id: field-service, part: 1 }
tags: [field service, licenses, make-or-buy, manufacturing, service]
takeaways:
  - "Scheduling and route optimization pay off most when technicians handle many short jobs a day: more jobs completed and less travel time."
  - "With few long jobs such as multi-day commissioning, routing adds little. Then mobile work, documentation, contracts or partners must carry the business case."
  - "Dispatcher and Technician licenses each cost $175 per user per month (Enterprise Edition). 40 technicians and 4 dispatchers cost $92,400 a year."
  - "Technician and Dispatcher licenses may not be used for case management in a contact center. Anyone who does both needs Field Service Plus at $230."
  - "A first data check uses four numbers: jobs per day, share of travel time, skill and part mismatches and first-time fix rate."
faq:
  - q: "What is Salesforce Field Service?"
    a: "Salesforce Field Service is the field service product built on Service Cloud. It schedules jobs by skill, availability and travel time, sends them to a mobile app for technicians that also works offline, and documents work, parts and signatures."
  - q: "How much does Salesforce Field Service cost?"
    a: "According to the Salesforce pricing page (October 2026), Dispatcher and Technician licenses each cost $175 per user per month on Enterprise Edition, and Field Service Plus costs $230. On Unlimited Edition, the prices are $330 and $380, all on annual contracts."
  - q: "Do I need a Service Cloud license for Field Service?"
    a: "Yes. Field Service requires at least one Service Cloud license, and scheduling requires at least one Dispatcher license. Field Service Plus satisfies the Service Cloud requirement itself."
  - q: "Are there licenses for external service partners?"
    a: "Yes. Subcontractors can use Contractor Plus licenses at $80 per user per month or $32 per login. They make sense for partners who only take on jobs occasionally."
draft: false
---

Scheduling in Salesforce Field Service pays off most for manufacturers whose technicians handle many short jobs per day. In that setup, scheduling and route optimization improve performance: more jobs per day, less travel time and more appointments kept. With few long jobs, such as commissioning over days or weeks, routing adds little. Then the business case has to rest on the mobile app and documentation, or on managing assets, contracts, parts and partners, and license costs of $175 per technician per month are harder to justify. So before a quote is signed, be clear about which kind of field service you run and which benefit you need.

## What does Salesforce Field Service do?

Salesforce Field Service is the field service product built on Service Cloud. Salesforce Help now calls it [Agentforce Field Service and Operations](https://help.salesforce.com/s/articleView?id=fs_overview.htm&language=en_US&type=5), formerly Field Service; on projects, most people still say Field Service. It covers three parts:

- **Scheduling and optimization.** A scheduling engine picks a suitable technician and time slot for every job.
- **Mobile app.** Technicians see their jobs, assets and history, including offline, and record working time, parts, photos and signatures.
- **Documentation.** Service reports are created directly from the app. What the standard product can do and where it stops is covered in [Service Documents: is Document Builder enough?](../salesforce-service-documents-document-builder/).

Scheduling is the core. According to [Trailhead](https://trailhead.salesforce.com/content/learn/modules/field-service-lightning-scheduling-basics/examine-scheduling-policies), it works with two kinds of rules. Work rules filter out technicians who cannot take a job, for example because a skill is missing. Service objectives rate the remaining candidates, for example by least travel time, earliest slot or preferred technician. Together they form a scheduling policy.

## Field Service pays off with many short jobs

Optimization helps most where there is a lot to optimize. In my experience that depends on the type of work, the locations and the duration of jobs. I see the biggest benefit with:

- **Many short jobs per day**, such as maintenance, repairs or inspections. A typical example is telecommunications companies whose technicians have up to 16 appointments a day.
- **A high share of travel time**, because customers are spread across a region.
- **Many skills** that have to match, so the right technician arrives. Whether the right part is in the van is a separate check before dispatch. See part 4.
- **Committed response times** from service contracts that have to be met and proven.

Salesforce points in the same direction. In an [article on scheduling](https://www.salesforce.com/blog/field-service-scheduling/) from 2025, it cites its own research: scheduling is the biggest efficiency blocker for technicians, and 47 percent of their appointments do not go as planned. The article names neither the sample nor the method, and it is vendor research, so I read it as an indicator, not as proof of a business case. What counts is the share of your own appointments that are rescheduled.

## With few long jobs, scheduling adds little

With few long jobs the benefit of scheduling is much smaller. A technician who commissions a plant over two weeks does not need route optimization. He or she needs a project plan, access to drawings and clean documentation at the end.

```praxis
My Field Service clients had between 15 and 700 technicians, and job length depended heavily on the industry. With large machines in manufacturing, jobs usually take several days, and more than two appointments on the same day are rare. In industries where technicians only record consumption on site, it was up to ten appointments a day.
```

Typical cases are commissioning, conversions or overhauls where a team works at one site for days. The difference from 16 appointments a day is substantial: access to documents, coordination with the customer and a complete acceptance process matter more than which technician is where in the afternoon. Field Service supports such work with multiday appointments and crews, see [multiday jobs and crews](../field-service-multiday-jobs-crews-commissioning/). The business case then has to come from offline documentation, asset history, maintenance contracts, parts or partner management, not from routes.

For such cases, there are alternatives I check before buying a Field Service license:

- **Service Cloud with work orders and the Salesforce mobile app**, if the main gap is documentation.
- **A portal with Experience Cloud**, if subcontractors or partners report work and exchange documents.
- **Planning in the ERP or a project tool**, if jobs are more like projects than appointments.

This is the same make-or-buy question as with any other Salesforce product. I describe the approach under [make-or-buy and license forecasts](../../services/make-or-buy-licences/).

## How much does Salesforce Field Service cost?

The [pricing page](https://www.salesforce.com/service/field-service-management/pricing/) lists these prices in October 2026, per user per month, billed annually on Enterprise Edition:

| License | For whom | List price |
|---|---|---|
| Dispatcher | Dispatchers who plan jobs | $175 |
| Technician | Technicians using the mobile app | $175 |
| Field Service Plus | Users who also handle cases | $230 |
| Contractor Plus | Subcontractors | $80 or $32 per login |

On Unlimited Edition, Dispatcher and Technician licenses cost $330 according to the footnote, and Field Service Plus costs $380. Add-ons such as Appointment Assistant, which keeps customers informed about arrival times, cost extra.

Example using list prices: 40 technicians and 4 dispatchers on Enterprise Edition require 44 licenses at $175, so $7,700 per month or $92,400 per year. Implementation, ERP integration and maintenance are additional.

Two conditions from the small print matter for license planning. Field Service requires at least one Service Cloud license, and scheduling requires at least one Dispatcher license. The second concerns the back office:

```hinweis achtung
Dispatcher and Technician licenses may not be used in a contact center or for case management. Anyone in the back office who handles cases and plans jobs needs Field Service Plus.
```

Which role needs which license, including subcontractors, is covered in [Salesforce Field Service licenses: who needs which?](../field-service-licences-by-role/) and in [chapter 1 of the Field Service masterclass](../../masterclass/field-service/field-service-business-case-licences/). The six most common questions about the product, each with a short answer, are collected in the topic hub [Salesforce Field Service for manufacturers](../../masterclass/field-service/).

## How do I decide?

I start with four numbers from your own field service operation, before discussing the product. They form a first data check, not a decision model:

1. **Jobs per technician per day.** If the average is clearly above one, there is something to optimize.
2. **Share of travel time in total working time.** The higher it is, the more route optimization helps.
3. **Skills and parts that have to match.** What matters is not the count but how often the wrong technician or the wrong part arrives. The more combinations there are, the harder manual planning gets.
4. **First-time fix rate**, meaning how often a job is done on the first visit. If it is low because parts or skills are missing, better scheduling helps directly.

These numbers can usually be pulled from the ERP or the existing scheduling tool. If nobody knows them, that is a finding in itself: the basis for any business case is missing, whatever the product.

The business case itself has to cover both sides. On the benefit side, include the cost of a failed visit, repeat visits, dispatcher effort, overtime, missed response times and their contractual consequences, and the effort for service reports. On the cost side, include licenses, implementation, integration, operation and existing systems that are switched off or remain in use. Calculate the business case over the expected lifetime, not just for the first year.

Then comes the data question. Field Service schedules using only the assets, locations, skills and availability that are maintained. A technician whose skills are not recorded anywhere will be scheduled incorrectly by the engine. Exactly which data is required is covered in [part 2 of this series](../salesforce-field-service-master-data/).

## Collect four numbers for one month and one region

Collect the four numbers for one month and one region. If they show many short jobs with a lot of travel, build the business case for Field Service with licenses, implementation and maintenance over several years. How the rollout then works region by region is covered in [Salesforce Field Service implementation: why in waves?](../salesforce-field-service-rollout/). If they show few long jobs, first check whether Service Cloud, a portal or the ERP can close the gap. What the mobile app can do for technicians today is covered in [Field Service mobile: guidance and voice](../salesforce-field-service-mobile-guided-voice/).
