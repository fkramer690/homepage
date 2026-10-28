---
title: "Salesforce Field Service: business case and licences"
description: "When Salesforce Field Service pays off for manufacturers, which role needs which licence, what the add-ons cost and how a job gets to the technician."
lang: en
slug: field-service-business-case-licences
course: field-service
translationKey: fsl-01
chapter: 1
pubDate: 2026-10-28
short: "Business case and licences"
summary: "When Salesforce Field Service pays off for manufacturers, which role needs which licence and how a job gets from the case to the technician."
takeaways:
  - "Salesforce Field Service pays off mainly with many short jobs per technician and day, a high share of travel time and many skills that have to match the job."
  - "According to the price list of October 2026, Dispatcher and Technician cost $175 per user and month each, Field Service Plus $230 and Contractor Plus $80 per user or $32 per login."
  - "Dispatcher and Technician licences may not be used for contact centre or case management. Anyone who works cases and also dispatches needs Field Service Plus."
  - "A job runs through case, work order, line items and service appointment; maintenance plans create work orders without a case, and both end up in the same dispatch queue."
  - "Agentforce 1 Field Service at $650 pays off only if you would buy Slack, Tableau Next and Data Cloud anyway; built from parts, the core costs $430."
articles: [field-service-worth-it, field-service-licences-by-role, agentforce-1-field-service-bundle, field-service-case-to-work-order, salesforce-licence-types]
faq:
  - q: "How much does Salesforce Field Service cost per technician?"
    a: "According to the price list of October 2026, the Technician licence costs $175 per user and month on Enterprise Edition with an annual contract, $330 on Unlimited Edition. The org also needs at least one Dispatcher licence and one Service Cloud licence."
  - q: "Can a dispatcher on a Dispatcher licence also run the hotline?"
    a: "No. According to the price list, Dispatcher and Technician licences may not be used for contact centre, call centre or customer case management. Anyone who works cases and dispatches needs Field Service Plus at $230."
  - q: "When does Contractor Plus per login beat per user?"
    a: "$80 per user divided by $32 per login is 2.5. A partner technician who logs in at most twice a month is cheaper per login, from three logins a month the user licence wins."
  - q: "When is Salesforce Field Service not enough, or too much?"
    a: "With few long jobs such as commissioning over several weeks, optimisation adds little. Then I first check Service Cloud without Field Service licences, a portal for partners or planning in the ERP."
draft: false
---

Salesforce Field Service pays off for manufacturers whose technicians run many short jobs a day, with a high share of travel time and many skills that have to match. With few long jobs, such as commissioning over weeks, optimisation adds little. The licence follows the role: dispatchers get Dispatcher, your own technicians Technician, at $175 per user and month each. Anyone who works cases and also dispatches needs Field Service Plus at $230, partner technicians get Contractor Plus. Before a partner starts building, four numbers, the path from case to technician and a licence matrix by role should be settled.

## What is Salesforce Field Service today?

Salesforce Field Service is the field service product built on Service Cloud. Salesforce sells it today as Field Service and Operations, which is also the title of the [pricing page](https://www.salesforce.com/service/field-service-management/pricing/). The product covers four areas:

- **Scheduling.** A scheduling engine picks a suitable technician and time slot for every service appointment. According to [Trailhead](https://trailhead.salesforce.com/content/learn/modules/field-service-lightning-scheduling-basics/examine-scheduling-policies), work rules filter out technicians who cannot take a job, for example because a skill is missing, and service objectives rate the rest, for example by least travel time. Together they form a scheduling policy.
- **Mobile app.** Technicians see their jobs, assets and history, also offline, and record time, parts, photos and signatures.
- **Assets and maintenance.** Machines are assets with serial numbers, and maintenance plans create jobs by calendar or usage.
- **Documents.** Service reports are created directly from the app.

Service Cloud is mandatory: according to the price list, every org with Field Service needs at least one Service Cloud user licence. The four areas are the layers of this masterclass. Scheduling follows in chapter 2, the app in chapter 3, assets and parts in chapter 4, AI agents and rollout in chapter 5.

## When does Field Service pay off for manufacturers?

Optimisation helps where there is a lot to optimise. Before any product discussion, I ask for four numbers from your own field service:

1. **Jobs per technician and day.** If the average is clearly above one, there is something to plan.
2. **Share of travel time in working time.** The higher it is, the more route optimisation helps.
3. **Number of skills and parts that have to match.** The more there are, the harder manual planning gets.
4. **First-time fix rate**, meaning how often a job is done on the first visit. If it is low because parts or skills are missing, better scheduling helps directly.

Maintenance, repairs and inspections with several customers a day are the best case. A technician who commissions a plant over two weeks needs drawings, a project plan and a clean acceptance; route optimisation does little for them.

If nobody knows the four numbers, the basis for any business case is missing. The criteria in detail and the calculation for 40 technicians are in [Salesforce Field Service: when is it worth it?](../../../blog/salesforce-field-service-worth-it/).

## How does a job get from the case to the technician?

A customer request passes through four records in Salesforce before a technician sets off. The [Field Service developer guide](https://developer.salesforce.com/docs/atlas.en-us.field_service_dev.meta/field_service_dev/fsl_dev_soap_core.htm) describes the core objects like this:

| Record | What it holds | Who creates it |
|---|---|---|
| Case | The customer's problem and the communication | Hotline, customer portal or agent |
| Work order | The work that has to be done | Hotline from the case, or a maintenance plan |
| Work order line item | Subtasks such as replace, calibrate, test run | Hotline, work type or technician on site |
| Service appointment | The visit that gets scheduled and assigned | Automatically through the work type |

A work type is the template for a kind of job, such as annual maintenance, breakdown repair or commissioning. According to [Trailhead](https://trailhead.salesforce.com/content/learn/modules/field_service_center/field_service_center_worktypes), it carries the estimated duration and the required skills. With the Auto-Create Service Appointment option, every work order with this work type gets a service appointment automatically. Without it, someone creates the appointment by hand, and that is exactly the step that gets forgotten.

Planned maintenance comes through a different door. Maintenance plans create work orders without a case, manually or automatically three times a day according to [Trailhead](https://trailhead.salesforce.com/content/learn/modules/field_service_maint/field-service-generate-work-orders). Planned and unplanned work therefore land in the same dispatch queue and compete for the same technicians. Who decides which maintenance visit has to make way for a machine-down call should be settled before the start.

Not every case needs a technician. I recommend a short triage at the hotline: remote help, part shipment or visit. Only a visit creates a work order. The full path of a machine-down call is in [Field Service work orders: from case to technician](../../../blog/field-service-case-to-work-order/).

## Which role needs which licence?

The [price list](https://www.salesforce.com/service/field-service-management/pricing/) shows these prices in October 2026, per user and month, for Enterprise Edition on an annual contract:

| Licence | For whom | List price |
|---|---|---|
| Dispatcher | Dispatchers who plan and assign | $175 |
| Technician | Your own technicians on the mobile app | $175 |
| Field Service Plus | Everything in Dispatcher and Technician, plus case management | $230 |
| Contractor Plus | Technicians of service partners | $80 per user or $32 per login |
| Agentforce 1 Field Service | Field Service Plus with AI, credits and further products | $650 |

On Unlimited Edition, Dispatcher and Technician cost $330 according to the footnote, the Plus version $380. Three rules from the small print matter more than the prices:

1. Every org needs at least one Service Cloud user licence.
2. Technicians and contractors need at least one Dispatcher licence in the org.
3. Dispatcher and Technician may not be used for contact centre, call centre or customer case management. Field Service Plus may.

I build the matrix from what a person does in the system, not from their job title. Hotline agents who only work cases get Service Cloud. The [Service Cloud pricing page](https://www.salesforce.com/service/pricing/) lists Core at $195 and says Core replaces Enterprise Edition. Dispatchers get Dispatcher, your own technicians Technician. The back office is where I look most closely: people who only invoice in the ERP need no Salesforce licence at all, and people who read reports may get by with a cheaper one. How to test that without rebuilding standard functions is in [Salesforce licences: does everyone need a full one?](../../../blog/salesforce-licences-full-licence-needed/).

### Field Service Plus or Service Cloud plus Dispatcher?

In smaller service teams the same people often answer the breakdown line in the morning and plan technicians in the afternoon. On a Dispatcher licence that breaches the licence terms, even if the system technically lets them open the case. For this mixed role the price list names Field Service Plus. Compared with Service Cloud Core it costs $35 more per month, and that difference buys the right to dispatch. If you separate hotline and dispatch cleanly, Service Cloud for one group and Dispatcher for the other is enough.

### Contractor Plus per user or per login?

$80 divided by $32 is 2.5. A partner technician who logs in three or more times a month is cheaper on a user licence, below that per login wins. The pricing page refers to sales for login-based contractor licences, so I would have the counting rule written into the order form. Contractor licences are meant for your service partners' staff; putting your own people on them to save money is a risk I would not take. The full role matrix with an annual bill is in [Field Service licences: which role needs which one?](../../../blog/field-service-licences-by-role/).

## Which add-ons exist, and when does the Agentforce 1 bundle pay off?

The pricing page lists five add-ons:

| Add-on | What it does according to the pricing page | List price |
|---|---|---|
| Agentforce for Field Service and Operations | AI agents in the flow of work for employees | $125 per user and month |
| Asset Service Lifecycle Management | Lifecycle of the installed base, from work order quoting to service campaigns | $75 per user and month |
| Visual Remote Assistant | Video help for customers instead of a visit | $50 per user and month |
| Appointment Assistant | Real-time appointment updates for customers | $25 per user and month |
| Connected Assets | Proactive maintenance with external data and event orchestration | $15,000 per org and month |

According to the pricing page, Agentforce 1 Field Service at $650 contains Field Service Plus, unlimited Agentforce use for employees, Appointment Assistant, Visual Remote Assistant, Digital Channels, Slack and Tableau Next, plus 1 million Flex Credits and 2.5 million Data Cloud credits per org and year. Built from parts, Field Service Plus and the three add-ons for Agentforce, Visual Remote Assistant and Appointment Assistant cost $430. The bundle therefore costs $220 more per user and month, and the credits per org cover that premium for only about two users.

My rule: the bundle pays off when Slack, Tableau Next, Digital Channels and Data Cloud would be bought for the same users anyway. For technicians who only need the AI add-on, single licences win clearly. The calculation with 50 users and a booking agent is in [Agentforce 1 Field Service: when does the bundle pay off?](../../../blog/agentforce-1-field-service-edition-worth-it/), and how Flex Credits work in general is in the AI masterclass chapter [AI costs: tokens, Flex Credits, budget](../../ai-salesforce/costs-and-tokens/).

## Where is Salesforce Field Service not the right answer?

Not every field team needs a planning product. I check three alternatives before any licence:

- **The service module in the ERP**, if orders, parts and invoicing run there anyway and technicians have few, long jobs.
- **A lean scheduling tool** next to the CRM, if only dispatch is missing and assets, contracts and history are maintained cleanly elsewhere.
- **Service Cloud without Field Service licences**, if mainly case handling and documentation are missing and appointments are simple to agree.

Two boundaries to other Salesforce products are worth knowing before the quote. If the same service organisation handles warranty claims from dealers, Manufacturing Cloud for Service comes into play; where warranty ends and Field Service begins is covered in the Manufacturing Cloud masterclass chapter [warranty and after-sales](../../manufacturing-cloud/warranty-and-after-sales/). If maintenance contracts are sold and billed as recurring revenue, that is a Revenue Cloud topic, placed in the [Revenue Cloud overview](../../revenue-cloud/revenue-cloud-overview/).

## A typical scenario, as an assumption: a component maker's licence bill

A component maker has three people who run hotline and dispatch together, two pure dispatchers, 25 own technicians, one person in the back office who maintains contracts, and a service partner with four technicians. All numbers are assumptions, the prices are list prices from October 2026.

| Role | Count | Licence | Per month |
|---|---|---|---|
| Hotline and dispatch | 3 | Field Service Plus at $230 | $690 |
| Dispatchers | 2 | Dispatcher at $175 | $350 |
| Own technicians | 25 | Technician at $175 | $4,375 |
| Back office | 1 | Service Cloud Core at $195 | $195 |
| Partner technicians | 4 | Contractor Plus per user at $80 | $320 |

That is $5,930 a month and $71,160 a year at list price, without implementation and the ERP interface. The partner technicians log in about three times a month each. Per login that would be 12 logins at $32, so $384 instead of $320. At this usage the user licence wins by a small margin; at two logins per person it would be the other way round.

If the hotline is also to get an AI agent, the five office seats cost $625 more a month with the Agentforce add-on. The same five seats on Agentforce 1 Field Service cost $3,250 a month, against $1,665 built from parts. Without planned demand for Slack, Tableau Next and Data Cloud, nothing here speaks for the bundle.

## What should you decide before a partner builds?

- **The four numbers** for one region and one month: jobs per day, travel share, skills, first-time fix rate.
- **The path from case to technician** for your three most common call types, with triage and an owner for every record.
- **Who works cases and who dispatches.** That decides who needs Field Service Plus.
- **How partners work.** Regular partner technicians on user licences, occasional ones per login, with a written counting rule.
- **Which add-ons are really used in the first year**, by role rather than for everyone.
- **A licence forecast for three years** by role and rollout wave, so you do not buy 45 technician licences on day one when the first wave has 15.

This list is part of my work on [make-or-buy and licence forecasts](../../../services/make-or-buy-licences/), before the negotiation and independent of vendor and partner. Once the business case stands, the next topic is planning itself: master data, scheduling policies and the new console are covered in [chapter 2: scheduling and dispatch](../field-service-scheduling-dispatch/). All chapters are on the [overview page](../).

Field Service pays off with many short jobs and a licence matrix that follows the roles; if you want your numbers or your quote checked independently, [send me a message](#contact).
