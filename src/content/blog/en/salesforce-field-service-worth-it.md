---
title: "Salesforce Field Service: When Is It Worth It?"
description: "Salesforce Field Service pays off with many short jobs and rarely with long projects. Criteria, licence costs and alternatives for manufacturers' field teams."
pubDate: 2026-10-26
lang: en
slug: salesforce-field-service-worth-it
translationKey: field-service-worth-it
topic: field-service
tags: [field service, licences, make-or-buy, manufacturing, service]
takeaways:
  - "Salesforce Field Service pays off most with many short jobs per technician and day, because scheduling and route optimisation clearly improve the numbers there."
  - "With few long jobs, such as commissioning over several days or weeks, optimisation adds much less, and other solutions can be enough."
  - "According to the price list, Dispatcher and Technician licences cost $175 per user and month each on Enterprise Edition. 40 technicians and 4 dispatchers therefore cost $92,400 per year."
  - "Technician and Dispatcher licences may not be used for case management in a contact centre. Anyone who does both needs Field Service Plus at $230."
  - "The decision starts with four numbers from your own field service: jobs per day, share of travel time, number of skills and first-time fix rate."
faq:
  - q: "What is Salesforce Field Service?"
    a: "Salesforce Field Service is the field service product built on Service Cloud. It schedules jobs by skill, availability and travel time, sends them to a mobile app for technicians that also works offline, and documents work, parts and signatures."
  - q: "How much does Salesforce Field Service cost?"
    a: "According to the Salesforce pricing page (October 2026), Dispatcher and Technician cost $175 per user and month each on Enterprise Edition, Field Service Plus $230. On Unlimited Edition it is $330 and $380, all on annual contracts."
  - q: "Do I need a Service Cloud licence for Field Service?"
    a: "Yes. Field Service requires at least one Service Cloud licence, and technicians need at least one dispatcher for scheduling to work. Field Service Plus meets the Service Cloud requirement itself."
  - q: "Are there licences for external service partners?"
    a: "Yes. Subcontractors can use Contractor Plus licences at $80 per user and month or $32 per login. They make sense for partners who only take on jobs occasionally."
draft: false
---

Salesforce Field Service is worth it for manufacturers whose technicians handle many short jobs per day. There, scheduling and route optimisation clearly improve the numbers: more jobs per day, less travel time, more appointments kept. With few long jobs, such as commissioning over days or weeks, the benefit is much smaller, and licence costs of $175 per technician and month are harder to justify. Before a quote is signed, it should therefore be clear what kind of field service the company actually runs.

## What does Salesforce Field Service do?

Salesforce Field Service is the field service product built on Service Cloud. Salesforce now calls it Field Service and Operations. It covers three parts:

- **Scheduling and optimisation.** A scheduling engine picks a suitable technician and time slot for every job.
- **Mobile app.** Technicians see their jobs, assets and history, also offline, and record working time, parts, photos and signatures.
- **Documentation.** Service reports are created directly from the app. What the standard can do and where it stops is covered in [Service Documents: is Document Builder enough?](../salesforce-service-documents-document-builder/).

Scheduling is the core. According to [Trailhead](https://trailhead.salesforce.com/content/learn/modules/field-service-lightning-scheduling-basics/examine-scheduling-policies), it works with two kinds of rules. Work rules filter out technicians who cannot take a job, for example because a skill is missing. Service objectives rate the remaining candidates, for example by least travel time, earliest slot or preferred technician. Together they form a scheduling policy.

## When is Field Service worth it?

Optimisation helps most where there is a lot to optimise. In my experience that depends on the type of work, the locations and the duration of jobs. I see the biggest benefit with:

- **Many short jobs per day**, such as maintenance, repairs or inspections lasting one to three hours.
- **A high share of travel time**, because customers are spread across a region.
- **Many skills and spare parts** that have to match, so the right technician arrives with the right part.
- **Committed response times** from service contracts that have to be met and proven.

Salesforce backs this direction with its own research. In an [article on scheduling](https://www.salesforce.com/blog/field-service-scheduling/), Salesforce calls scheduling the biggest efficiency blocker for technicians and writes that 47 percent of appointments do not go as planned. Whoever reschedules dozens of jobs a day saves the most.

## When is Field Service not worth it?

With few long jobs the benefit is much smaller. A technician who commissions a plant over two weeks does not need route optimisation. He or she needs a project plan, access to drawings and clean documentation at the end.

One example of this other world is the after-sales business of a large shipbuilding company I worked for. There the focus was on after-sales processes and a portal for subcontractors, meaning collaboration with external parties over long jobs. That is a legitimate requirement, but a different one from optimising many short appointments.

For such cases there are alternatives I check before a Field Service licence:

- **Service Cloud with work orders and the Salesforce mobile app**, if documentation is what is mainly missing.
- **A portal with Experience Cloud**, if subcontractors or partners report work and exchange documents.
- **Planning in the ERP or a project tool**, if jobs are more like projects than appointments.

This is the same make-or-buy question as with any other Salesforce product. I describe the approach under [make-or-buy and licence forecasts](../../services/make-or-buy-licences/).

## How much does Salesforce Field Service cost?

The [pricing page](https://www.salesforce.com/service/field-service-management/pricing/) lists these prices in October 2026, per user and month, billed annually on Enterprise Edition:

| Licence | For whom | List price |
|---|---|---|
| Dispatcher | Dispatchers who plan jobs | $175 |
| Technician | Technicians using the mobile app | $175 |
| Field Service Plus | Users who also handle cases | $230 |
| Contractor Plus | Subcontractors | $80 or $32 per login |

On Unlimited Edition, Dispatcher and Technician cost $330 according to the footnote, Field Service Plus $380. Add-ons such as Appointment Assistant, which keeps customers informed about arrival times, cost extra.

An example with list prices: 40 technicians and 4 dispatchers on Enterprise Edition are 44 licences at $175, so $7,700 per month or $92,400 per year. Implementation, ERP integration and maintenance come on top.

Two conditions from the small print matter for licence planning. Field Service requires at least one Service Cloud licence, and technicians need at least one dispatcher for scheduling to work. Dispatcher and Technician licences may also not be used for a contact centre or case management. Anyone in the back office who handles cases and plans jobs needs Field Service Plus.

## How do I decide?

I start with four numbers from your own field service, before the product even comes up:

1. **Jobs per technician and day.** If the average is clearly above one, there is something to optimise.
2. **Share of travel time in working time.** The higher it is, the more route optimisation helps.
3. **Number of skills and parts that have to match.** The more there are, the harder manual planning gets.
4. **First-time fix rate**, meaning how often a job is done on the first visit. If it is low because parts or skills are missing, better scheduling helps directly.

These numbers can usually be pulled from the ERP or the existing scheduling tool. If nobody knows them, that is a finding in itself: the basis for any business case is missing, whatever the product.

Then comes the data question. Field Service only schedules as well as assets, locations, skills and availability are maintained. A technician whose skills are recorded nowhere will be scheduled wrongly by the engine.

## Where should you start?

Collect the four numbers for one month and one region. If they show many short jobs with a lot of travel, build the business case for Field Service with licences, implementation and maintenance over several years. If they show few long jobs, first check whether Service Cloud, a portal or the ERP can close the gap. What the mobile app can do for technicians today is covered in [Field Service mobile: guidance and voice](../salesforce-field-service-mobile-guided-voice/).

Field Service is worth it when your field team runs many short appointments, and rarely when it handles long projects. If you are facing this decision and want an independent assessment, [send me a message](#contact).
