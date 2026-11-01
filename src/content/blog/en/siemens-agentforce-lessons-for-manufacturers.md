---
title: "Siemens and Agentforce: lessons for machine builders"
description: "What is live at Siemens with Agentforce, what is only announced, and which order of AI use cases follows from it for a mid-sized machine builder."
pubDate: 2026-10-27
lang: en
slug: siemens-agentforce-lessons-for-manufacturers
translationKey: siemens-agentforce-lessons
topic: ai
categories: [manufacturing-cloud, ai]
tags: [agentforce, siemens, manufacturing, ai agents, use cases, lead qualification]
takeaways:
  - "Siemens started with over 2,500 unqualified leads a month: high volume, data already in Sales Cloud, low cost per error."
  - "The only published result is that Siemens engages 100 percent of inbound leads. Conversion and pipeline value are missing."
  - "At a few hundred leads a month, a scoring rule and one person are cheaper than an agent."
  - "Spare parts by serial number need as-built data per machine. That data work starts on day one."
faq:
  - q: "What is live at Siemens with Agentforce?"
    a: "According to the release of 15 September 2026, an engagement agent and a qualification agent work on inbound leads in Sales Cloud and route the strongest to sellers. Siemens engages 100 percent of these leads across 132 countries."
  - q: "Is the Teamcenter integration with Agentforce available?"
    a: "The release says Teamcenter \"will work with Agentforce\" and gives no date. It describes spare parts by serial number and technically valid upgrades as examples, but publishes no figures or availability for this part."
  - q: "What is Piper in the Siemens announcement?"
    a: "Piper is an AI SDR agent built on Qualified's platform that handles inbound buyer conversations on the website. At Siemens it is planned for prospective distributors; the release introduces it with \"Looking ahead\"."
  - q: "Which AI use case should a mid-sized manufacturer start with?"
    a: "The process with the highest volume, data already reachable and a low cost of error, often dealer enquiries about order status and delivery dates read from the ERP. Write steps into SAP or proALPHA come last."
draft: false
---

The Siemens Agentforce announcement of 15 September 2026 has one live part: two agents that engage and qualify inbound leads in Sales Cloud for 18,000 sellers. Teamcenter answers for service, an SDR agent for distributors and supplier onboarding in SAP are written in the future tense. For a mid-sized machine builder the lesson lies in the order. Siemens started where volume was high, the data already sat in Salesforce and a wrong answer cost little. I would copy those criteria, not the lead use case, and start the data work for serial numbers on day one.

## What did Siemens and Salesforce actually announce?

The [release on Salesforce's investor site](https://investor.salesforce.com/news/news-details/2026/Siemens-and-Salesforce-Deepen-AI-Partnership-to-Redefine-Industrial-Sales-and-Service/default.aspx) came out at Dreamforce. It combines Agentforce with Teamcenter Service Lifecycle Management, the Siemens software that holds service data across a product's life. Read sentence by sentence, it describes four parts in different tenses:

| Part | Wording in the release | Numbers given |
|---|---|---|
| Engagement agent and qualification agent for inbound leads in Sales Cloud | "Today, Siemens engages 100% of these inbound leads" | 18,000 sellers, 132 countries, over 2,500 unqualified leads a month before |
| Teamcenter with Agentforce: spare parts by serial number, valid upgrades, parts ordering by customers | Teamcenter "will work with Agentforce" | none |
| Piper, an SDR agent for prospective distributors | "Looking ahead" | none |
| Slackbot and Agentforce Operations for supplier onboarding, final steps in SAP | "will" | onboarding "from weeks to days", as an expectation |

The release is not consistent in itself. It also says questions that once had to go back to engineering "can now be answered in seconds". Without a date, a user count or a figure for the Teamcenter part, I read the engineering answers as not yet in production at scale. That is my reading of the text, not a statement by Siemens.

The release justifies the service focus with "industry analysis": aftermarket business grows around six times faster than new equipment sales and carries roughly four times the margin. No source is named. I would not put that number into your own business case before you have checked it against your own aftermarket share.

## Why did Siemens start with inbound leads?

The lead case has the properties I look for in a first agent:

- **Volume.** Siemens "received over 2,500 unqualified leads a month and had no way of knowing which ones were worth sellers' time".
- **Data within reach.** Lead, contact and account live in Sales Cloud. The agent needs no call to SAP or Teamcenter to do its job.
- **Low cost of error.** A badly qualified lead reaches a seller, who notices. Nobody ships a wrong part or approves a wrong warranty claim.
- **A clear handover.** The engagement agent contacts the lead and passes interested prospects to the qualification agent, which hands the strongest to a seller.

The design holds a second lesson. Siemens runs two narrow agents in tandem instead of one agent that does everything. Each has one job and one handover rule, so you can test the qualification criteria separately from the tone of the outreach. How I would set up those tests is in [testing Agentforce agents before go-live](../testing-agentforce-agents-before-go-live/).

```hinweis achtung
What the release leaves out matters as much. The only result is the share of leads engaged, 100 percent. There is no conversion rate, no pipeline value and no figure for seller hours saved. Engaging every lead is an activity metric. If you show the Siemens case to your board, say so, or someone will expect a revenue effect that was never published.
```

The other industrial references follow the same pattern. In Salesforce's [Agentforce for Manufacturing announcement](https://www.salesforce.com/news/stories/agentforce-for-manufacturing-announcement/) of August 2025, Terri Eshleman of JPW Industries says manual order processing used to take 16 to 24 hours and now takes less than an hour, and case resolution time fell by almost 40 percent despite a 15 percent increase in workload. Brenntag, a chemical distributor, [announced in November 2024](https://corporate.brenntag.com/en/media/news/brenntag-implements-autonomous-ai-agents-on-its-salesforce-platform-as-first-customer-in-germany.html) agents for order and product enquiries as a pilot for selected customers and supply partners, without any figures. The references with numbers concern narrow, frequent processes in sales and order handling. The service and engineering stories are still announcements.

## What do the announced parts depend on?

**Teamcenter answers.** A technician who identifies the right spare part for a serial number before the first visit needs the as-built configuration of that one machine: which variant left the plant, which parts were fitted, which were replaced in later service calls. At Siemens that data sits in Teamcenter. In a mid-sized company it is often spread across PLM, SAP and spreadsheets kept by the service team. The agent is the small part of this; linking every serial number to its bill of materials is the large part. I go into that in [spare parts by serial number with an AI agent](../spare-parts-by-serial-number-ai/).

**Piper.** The product exists. Salesforce's [help article](https://help.salesforce.com/s/articleView?id=005317771&language=en_US&type=1) describes Piper as "an AI SDR superagent designed to manage inbound buyer engagement across the website and other channels", built on Qualified's platform. What is announced is its use at Siemens for prospective distributors, who today "search the company's site, fill out an intake form, and wait for further outreach". The help article says nothing about pricing or licensing.

**Agentforce Operations.** Salesforce declared it [generally available on 29 April 2026](https://www.salesforce.com/news/stories/agentforce-operations-announcement/), built on Regrello technology, with integration features such as triggering Flows that were expected to enter beta in May 2026. That announcement mentions ERP in general and does not name SAP. So the product is GA, the SAP steps at Siemens are a plan, and how they reach SAP is not described. Whatever an agent writes into the ERP, the rules for it belong in deterministic logic, as described in [Agent Script: rules instead of the LLM](../agent-script-deterministic-rules/).

## Worked example: a machine builder with 1,100 employees

Assume a machine builder with 1,100 employees, SAP S/4HANA, Sales Cloud and Service Cloud, 140 dealers in 35 countries and 9,000 machines in the installed base. All numbers are assumptions to show the method. Four ideas from the Siemens release are on the table.

**Dealer enquiries on order status and delivery dates.** Assume 1,400 a month, answered today by four people in the back office. A MuleSoft API to SAP exists and the agent only reads. This has the same profile as the Siemens lead case: high volume, data within reach, a person takes over when the answer is unclear. It goes first. The integration path is in [Agentforce and SAP order status](../agentforce-sap-order-status-mulesoft/).

**Inbound leads.** Assume 180 a month from the website and trade fairs, about nine per working day. A scoring rule in Flow and one inside sales rep handle that. Siemens has roughly 14 times the volume and 18,000 sellers waiting for qualified leads. This idea waits until lead volume grows.

**Spare parts by serial number.** The most valuable idea for the head of service, and the least ready. Assume only 60 percent of the 9,000 machines have a serial number linked to an as-built bill of materials. The data project starts now, because it takes longest; the agent follows once coverage reaches a level the head of service signs off.

**Supplier onboarding.** Assume 25 new suppliers a year. An approval process with a checklist covers that, and an agent would never pay back its build and test effort. The Siemens release gives no supplier volume, so the "weeks to days" promise says nothing about your case.

## A smaller company needs its own order of use cases

From the scenario I derive this order:

```schritte
Read only, high volume
  Dealer enquiries, order status, delivery dates, and a person takes over. Pick whichever process in your company has the most similar requests.
Read from the ERP through an API
  Still without write access. Stock, prices and credit status come from SAP or proALPHA; the agent explains, it does not recalculate.
Engineering answers from PLM and serial numbers
  Once the data project from day one has delivered. This is where the aftermarket value sits, and where the data work is heaviest.
Write steps into the ERP
  Last, with rules in logic, an approval by a person for anything with consequences and a test set agreed in advance.
```

Before any of these goes live, agree one result metric beyond activity, for example the share of dealer enquiries closed without a back office reply. Siemens published an activity number; your board will ask for a result. The five criteria behind this order are in [Agentforce for manufacturers: start now or wait?](../agentforce-yes-or-no-manufacturers/), and the wider picture of what runs today is in the masterclass chapter [AI agents in manufacturing](../../masterclass/ai-salesforce/ai-agents-in-manufacturing/).

When someone in your company says "Siemens already does this", ask these questions: which tense does the source use, is the number a baseline or a result, whose number is it, and does it name a source. Sorting that out before a budget decision is part of my work in [architecture and partner governance](../../services/salesforce-architecture/).
