---
title: "AI agents in Field Service: what works today?"
description: "Which Agentforce functions for Salesforce Field Service are available today, from appointment booking to job reports, and which pay off for a machine builder."
pubDate: 2026-10-27
lang: en
slug: field-service-ai-agents-what-works-today
translationKey: field-service-ai-agents-today
topic: field-service
categories: [field-service, ai]
tags: [field service, agentforce, ai agents, manufacturing, maintenance, flex credits]
takeaways:
  - "Generally available AI agent functions in Salesforce Field Service: appointment booking, proactive maintenance scheduling, schedule gap filling, pre-work briefs, post-work summaries and on-site troubleshooting."
  - "For a machine builder, proactive maintenance booking and the drafted job report pay off first, because both are frequent and the rules behind them are known."
  - "Customer-facing scheduling runs on Flex Credits at 20 credits ($0.10) per action, while the employee functions cost $125 per user and month as the Agentforce for Field Service add-on."
  - "Breakdown booking, on-site troubleshooting and failure prediction need triage, sorted manuals or a large fleet history, so I would start them later."
  - "A drafted job report helps only if parts, times and fault codes stay structured fields, because warranty, invoicing and the ERP cannot read prose."
faq:
  - q: "Which Agentforce functions are available for Salesforce Field Service?"
    a: "According to Salesforce: booking, rescheduling and cancelling appointments, proactive maintenance scheduling from maintenance plans, filling schedule gaps for dispatchers, pre-work briefs and post-work summaries for technicians, and on-site troubleshooting. Booking by phone with Agentforce Voice is listed in the Winter '27 highlights."
  - q: "What does Agentforce for Field Service cost?"
    a: "The add-on for dispatchers and technicians costs $125 or €125 per user and month on an annual contract, with unmetered employee agent usage. The customer-facing Scheduling Agent needs Flex Credits; one action costs 20 credits, which is $0.10 at list price."
  - q: "Can an AI agent schedule maintenance visits on its own?"
    a: "Yes. Salesforce announced general availability for August 2025: an agent contacts customers and books appointments based on upcoming maintenance plan dates. For machines that have to be shut down for maintenance, the agent needs known shutdown windows or hands the case to a dispatcher."
  - q: "Do AI agents in field service need the works council?"
    a: "In Germany usually yes, when an agent processes technicians' data, speech or job reports. Involve the works council and data protection before the pilot, together with the other Field Service topics such as location tracking."
draft: false
---

AI agents in Salesforce Field Service are available today for a handful of jobs: booking and rescheduling appointments, scheduling maintenance proactively from maintenance plans, briefing technicians before a job and drafting the job report afterwards. Dispatchers also get an assistant that fills schedule gaps. For a machine builder, proactive maintenance booking and the drafted job report pay off first, because both are frequent and rule-based. Customer self-booking for breakdowns, on-site troubleshooting and failure prediction depend on triage, sorted documents or a large fleet history. I would start those second.

## Which AI agents does Salesforce Field Service offer today?

Salesforce announced Agentforce for Field Service in [April 2025](https://www.salesforce.com/news/stories/agentforce-for-field-service-announcement/) and added proactive maintenance with [Agentforce for Manufacturing](https://salesforce.com/news/stories/agentforce-for-manufacturing-announcement) in August 2025. Status according to those announcements and the release highlights:

| For | Function | Status |
|---|---|---|
| Customers | Book, reschedule and cancel appointments via web or messaging | GA since May 2025 |
| Customers | Proactive maintenance: the agent contacts customers and books visits based on maintenance plan dates | GA announced for August 2025 |
| Customers | Booking by phone with Agentforce Voice | Winter '27 highlights, check status in your org |
| Dispatchers | Fill gaps from cancellations, no-shows and early completions | GA since April 2025 |
| Technicians | Pre-Work Brief, also as audio playback | Playback GA since April 2025; Salesforce Help also describes an interactive version, release not confirmed |
| Technicians | Post-Work Summary, drafted onto the work order | GA since April 2025 |
| Technicians | Step-by-step troubleshooting from manuals, past repairs and photos | GA since June 2025 |
| Assets | Asset Service Prediction: when and why an asset fails | [Open beta announced in 2024](https://www.salesforce.com/news/stories/field-service-asset-management-news/), listed on the product page without a GA date |

Salesforce backs the booking agent with its own numbers: an on-site appointment takes 17 minutes to schedule, 15 to change and 12 to cancel, and the agent should get it done in under five. The [Winter '27 announcement](https://salesforce.com/news/stories/winter-2027-product-release-announcement) promises voice booking in seconds instead of 15 minutes. These are vendor figures from mixed industries, not results from machine builders.

The industrial references are thinner. In the [Siemens release](https://investor.salesforce.com/news/news-details/2026/Siemens-and-Salesforce-Deepen-AI-Partnership-to-Redefine-Industrial-Sales-and-Service/default.aspx) of September 2026, a technician "can identify the right spare parts for a specific serial number before the first site visit", but the Teamcenter link behind it is phrased as "will work with". The live, quantified part concerns inbound leads. For service at a machine builder, I would plan with the functions in the table and treat everything else as announced.

## What do Field Service agents cost?

Field Service agents have two price models, and they follow the line between customers and employees.

**Customer-facing agents run on Flex Credits.** The [Field Service pricing page](https://www.salesforce.com/service/field-service-management/pricing/) states for Dispatcher, Technician, Field Service Plus and Contractor Plus that the Scheduling Agent requires Flex Credits. According to the [rate card](https://www.salesforce.com/en-us/wp-content/uploads/sites/4/assets/pdf/agentforce/Flex-Credits-Rate-Card-08.31.2026.pdf), an action costs 20 credits in production and 16 in a sandbox, a voice action 30 and 24. At [$500 per 100,000 credits](https://www.salesforce.com/news/press-releases/2025/05/15/agentforce-flexible-pricing-news/) that is $0.10 per action and $0.15 per voice action.

**Employee functions are priced per user.** The [Agentforce for Field Service](https://www.salesforce.com/service/field-service-management/ai/pricing/) add-on costs $125 or €125 per user and month on an annual contract and includes assistive AI for dispatchers and technicians with unmetered employee agent usage. The alternative is Agentforce 1 Field Service at $650 per user and month, with unlimited employee usage plus 1 million Flex Credits and 2.5 million Data Cloud credits per org every year. The add-on comes on top of the $175 Technician licence from [part 1 of the Field Service series](../salesforce-field-service-worth-it/), while Agentforce 1 Field Service already includes everything in Field Service Plus. When the bundle pays off is calculated in [Agentforce 1 Field Service: when does the bundle pay off?](../agentforce-1-field-service-edition-worth-it/).

The consequence for budgeting: a booking agent costs cents per booking, while the employee add-on for 60 technicians costs $90,000 a year at list price. If troubleshooting is grounded on manuals in Data 360, processing adds 150 credits per MB. How to estimate credits per process is covered in [Flex Credits and Agentforce cost per action](../flex-credits-agentforce-cost-per-action/), and what grounding on documents costs in [Data 360 costs for AI agents](../data-360-costs-for-ai-agents/).

## Which functions make sense for a machine builder?

Field service at a machine builder differs from installing routers or servicing alarm systems. Jobs are fewer and longer, machines carry serial numbers and contracts, and the person on the other end is a plant manager who has to plan a shutdown. Measured against that, I sort the functions like this.

**Proactive maintenance booking fits best.** Maintenance plans already generate the work orders, as described in [modelling maintenance contracts](../salesforce-field-service-maintenance-contracts/). The agent only has to agree a date. The catch is the shutdown window: the agent sees the operating hours maintained in Salesforce and nothing about next week's production peak. If no window is maintained, it should propose dates and pass the case to a dispatcher instead of booking.

**The drafted job report fits, under one condition.** The Post-Work Summary is prose. Warranty, invoicing and the ERP need parts, working time and fault codes as fields. I would keep the structured fields as the master record and use the summary for the text the customer reads, for example in the service report from [Document Builder](../salesforce-service-documents-document-builder/). The [guided mobile workflows](../salesforce-field-service-mobile-guided-voice/) belong to the same data model.

**The Pre-Work Brief is as good as the asset history.** If half of the past work orders are not linked to an asset, the brief has little to say. The data question is the one from [master data for scheduling](../salesforce-field-service-master-data/).

**Gap filling depends on the job mix.** With many short jobs a day it saves real dispatcher time. With commissioning over several days there are hardly any gaps to fill. Whether a dispatcher should still release each proposal is the question from [how much scheduling should be automatic](../salesforce-field-service-scheduling-automation/). Winter '27 at least shows multi-day appointments as one connected job in the scheduling console.

**Self-booking for breakdowns needs triage first.** When a machine stands still, someone has to clarify what failed, which part is needed and whether the contract promises a response within 24 hours. The entitlement decides that, and it belongs in deterministic logic, as described in [Agent Script: rules instead of the LLM](../agent-script-deterministic-rules/). An agent can take the call and open the case. I would let it book only clearly classified jobs.

**Troubleshooting and failure prediction come later.** Troubleshooting is only as reliable as the manuals behind it, and at machine builders these exist per variant and version. Asset Service Prediction, according to the [product page](https://www.salesforce.com/service/field-service-management/), works from the service history of similar assets. With 300 units of one special machine, that history is thin.

## A typical scenario: a machine builder with 60 technicians

Assume a machine builder with SAP, Service Cloud and Field Service already live, 60 technicians, 4 dispatchers and maintenance contracts for 1,500 machines. All numbers are assumptions to show the method.

**Maintenance booking by agent.** Assume 300 planned maintenance visits a month and five actions per booking: read the plan, check the contact, find slots, book, confirm. That is 1,500 actions or 30,000 credits, about $150 a month. With Salesforce's 17 minutes per booking, dispatchers spend 85 hours a month on it today. Shutdown windows are maintained for two thirds of the customers. The agent books those and hands the rest to the dispatcher.

**Job report drafts for all technicians.** The add-on costs $7,500 a month for 60 technicians. Assuming an internal cost of $90 per technician hour, it pays back once each technician saves about 1.4 hours a month. That bar is low. The open point is the data model: today, fault codes sit in a free text field. The report goes live after the fields are cleaned up, and the summary only writes the customer text.

**Troubleshooting for special machines.** Assume 3,000 MB of manuals as PDFs in several versions. Processing them once at the base tier costs 450,000 credits, about $2,250, before any query. The bigger problem is that nobody can say which manual belongs to which serial number. This waits until manuals are linked to the installed base.

The pattern behind it: the agent with the lowest price per transaction is the easiest to start, and the per-user add-on is a licence decision that needs a clean data model before it is worth the money.

## Where should you start?

1. **Pick one function** from the table above with high volume. For most machine builders that is maintenance booking.
2. **Check the data behind it**: maintenance plans, shutdown windows, asset links of past work orders.
3. **Put rules into logic**: entitlements, response times and warranty status stay out of the prompt.
4. **Budget test runs** at 16 credits per action in the sandbox and agree a measurable target, such as the share of maintenance visits booked without a dispatcher.
5. **Involve the works council early.** Agents that read job reports or process technicians' speech touch co-determination in Germany, alongside location tracking from the [Field Service rollout](../salesforce-field-service-rollout/).

Whether the add-on or Agentforce 1 Field Service is the better buy is a licence question I handle in [make-or-buy and licence planning](../../services/make-or-buy-licences/). For the general go or no-go on agents, see [Agentforce for manufacturers: start now or wait?](../agentforce-yes-or-no-manufacturers/). How to roll out agents in field service step by step is in [chapter 5 of the Field Service masterclass](../../masterclass/field-service/field-service-ai-agents-rollout/).

Start with the agent that books planned maintenance, and let the job report follow once the fields behind it are clean. If you want a second opinion on which function fits your field service, [send me a message](#contact).
