---
title: "Siemens and Agentforce: lessons for machine builders"
description: "What is live at Siemens with Agentforce, what is only announced, and which order of AI use cases follows from it for a mid-sized machine builder."
pubDate: 2026-10-27
updatedDate: 2026-11-09
lang: en
slug: siemens-agentforce-lessons-for-manufacturers
translationKey: siemens-agentforce-lessons
topic: ai
categories: [manufacturing-cloud, ai]
tags: [agentforce, siemens, manufacturing, ai agents, use cases, lead qualification]
takeaways:
  - "Siemens agents contact all of the roughly 2,500 in-scope leads a month; 11 percent engage and 6 percent qualify."
  - "Conversion, pipeline value, seller hours and ROI are not published. Activity and funnel figures are not a revenue effect."
  - "At a few hundred leads a month, check first whether a scoring rule and one person are enough."
  - "Spare parts by serial number require the as-maintained configuration for each machine. That data work starts on day one."
faq:
  - q: "What is live at Siemens with Agentforce?"
    a: "Of the four parts in the September 15, 2026 release, only the lead agents are clearly live: an engagement agent and a qualification agent contact about 2,500 in-scope inbound leads a month across 132 countries. The customer story reports an engagement rate of 11 percent and a qualification rate of 6 percent. Salesforce also describes a partner management agent for more than 14,500 partners as in production."
  - q: "Is the Teamcenter integration with Agentforce available?"
    a: "The release says Teamcenter \"will work with Agentforce\" and gives no date. In November 2026, Siemens introduced an agent-to-agent capability for the Teamcenter SLM for Salesforce app and showed it in a demo video. As of November 9, 2026, I found no general availability date and no production figures for this part."
  - q: "What is Piper in the Siemens announcement?"
    a: "Piper is an AI SDR agent built on Qualified's platform that handles inbound buyer conversations on the website. At Siemens it is planned for prospective distributors; the release introduces it with \"Looking ahead\"."
  - q: "Which AI use case should a mid-sized manufacturer start with?"
    a: "Start with a process that has high volume, accessible data, and errors that are easy to spot and reverse, often dealer inquiries about order status and delivery dates read from the ERP. Steps that write to SAP or proALPHA usually come later, depending on risk, reversibility and controls."
draft: false
---

Of the four parts in the Siemens Agentforce announcement of September 15, 2026, one is clearly live: two agents that contact and qualify inbound leads in Sales Cloud for 18,000 sellers. Answers from Teamcenter for service, an SDR agent for distributors, and supplier onboarding in SAP are written in the future tense. For a mid-sized machine builder, the lesson lies in the order. The lead use case has high volume, a narrow task and errors a seller can catch. I would copy those criteria, not the lead use case, and start the data work for serial numbers on day one.

## What did Siemens and Salesforce actually announce?

The [release on Salesforce's investor site](https://investor.salesforce.com/news/news-details/2026/Siemens-and-Salesforce-Deepen-AI-Partnership-to-Redefine-Industrial-Sales-and-Service/default.aspx) came out at Dreamforce. It combines Agentforce with Teamcenter Service Lifecycle Management, the Siemens software that holds service data across a product's life. If you read it sentence by sentence, it describes four parts in different tenses:

| Part | Wording in the release | Numbers given |
|---|---|---|
| Engagement agent and qualification agent for inbound leads in Sales Cloud | "Today, Siemens engages 100% of these inbound leads" | 18,000 sellers, 132 countries, over 2,500 unqualified leads a month before; the customer story adds 11 percent engagement and 6 percent qualification |
| Teamcenter with Agentforce: spare parts by serial number, valid upgrades, parts ordering by customers | Teamcenter "will work with Agentforce" | none |
| Piper, an SDR agent for prospective distributors | "Looking ahead" | none |
| Slackbot and Agentforce Operations for supplier onboarding, final steps in SAP | "will" | onboarding "from weeks to days", as an expectation |

The release is not internally consistent. It also says questions that once had to go back to engineering "can now be answered in seconds". Without a date, a user count or a figure for the Teamcenter part, I read the engineering answers as not yet in production at scale. That is my reading of the text, not a statement by Siemens.

The release is not the only source. A [Salesforce customer story](https://www.salesforce.com/customer-stories/siemens/agentic-sales-leads/) from September 14, 2026 is more precise: "100% process coverage of approximately 2,500 in-scope inbound leads per month", an "11% engagement rate", "a 6% qualification rate", response time "from days to minutes" and 80 percent of interactions rated good or very good. It also names a partner management agent that went "from prototype to production in six weeks" for more than 14,500 partners. So "engages 100 percent" means every in-scope lead is contacted, not that every lead responds. This article covers the four parts of the release, not everything Siemens runs.

The release justifies the service focus with "industry analysis": aftermarket business grows around six times faster than new equipment sales and has roughly four times the margin. No source is named. I would not put that number into your own business case before you have checked it against your own aftermarket share.

## What makes the Siemens lead case a good first agent?

Siemens does not explain why it chose this case. As I read it, it has the properties I look for in a first agent use case:

- **Volume.** Siemens "received over 2,500 unqualified leads a month and had no way of knowing which ones were worth sellers' time".
- **Data within reach.** The conversation runs on lead, contact and account data in Sales Cloud. The broader customer context is not trivial: according to the customer story, Data 360 reads Snowflake through zero-copy integration, with harmonized CRM, ERP and installed base data behind it.
- **Errors that can be caught.** A lead qualified too high reaches a seller, who notices. A lead qualified too low is more dangerous: leads below the threshold "follow a predefined closure path", so a false rejection can mean lost business. Still, nobody ships a wrong part or approves a wrong warranty claim.
- **A clear handover.** The engagement agent contacts the lead, follows up as many as two times and passes interested prospects to the qualification agent, which hands the strongest leads to a seller.

The design holds a second lesson. Siemens runs two narrow agents in tandem instead of one agent that does everything. Each has a narrow job and an explicit handover. The qualification agent alone works with about 50 predefined rules and BANT questions, so you can test the qualification criteria, including the rejected leads, separately from the tone of the outreach. How I would set up those tests is in [testing Agentforce agents before go-live](/en/blog/testing-agentforce-agents-before-go-live/).

```hinweis achtung
What the sources leave out matters as much as what they include. Coverage, engagement rate, qualification rate and response time are published. There is no conversion to orders, no pipeline value, no figure for seller hours saved and no ROI. Contacting every lead is an activity metric, and a qualification rate is a funnel metric. If you show the Siemens case to your board, make that clear. Otherwise, someone will expect a revenue effect that was never published.
```

The other industrial references follow the same pattern. In Salesforce's [Agentforce for Manufacturing announcement](https://www.salesforce.com/news/stories/agentforce-for-manufacturing-announcement/) of August 2025, Terri Eshleman of JPW Industries says manual order processing used to take 16 to 24 hours and now takes less than an hour, and case resolution time fell by almost 40 percent despite a 15 percent increase in workload. Brenntag, a chemical distributor, [announced in November 2024](https://corporate.brenntag.com/en/media/news/brenntag-implements-autonomous-ai-agents-on-its-salesforce-platform-as-first-customer-in-germany.html) agents for order and product inquiries as a pilot for selected customers and supply partners, without any figures. The references with numbers concern narrow, frequent processes in order handling and service cases. The Siemens Teamcenter scenario and Brenntag's pilot do not provide comparable production results.

## What do the announced parts depend on?

**Teamcenter answers.** A technician who identifies the right spare part for a serial number before the first visit needs the as-maintained configuration of that one machine: which variant left the plant, which parts were fitted, which were replaced in later service calls, which engineering changes and revisions apply, and which upgrades are released for it. An as-built bill of materials only shows the state at delivery. At Siemens that data sits in Teamcenter. In a mid-sized company it is often spread across PLM, SAP and spreadsheets kept by the service team. The agent is the smaller part of this; linking every serial number to its bill of materials is the larger part. I go into that in [spare parts by serial number with an AI agent](/en/blog/spare-parts-by-serial-number-ai/). A [Siemens blog post of November 3, 2026](https://blogs.sw.siemens.com/service-lifecycle-management/2026/11/03/agent-to-agent/) says Siemens and Salesforce "are introducing" an agent-to-agent capability for the Teamcenter SLM for Salesforce app, with a demo video. The post names no availability date.

**Piper.** The product exists. Salesforce's [help article](https://help.salesforce.com/s/articleView?id=005317771&language=en_US&type=1) describes Piper as "an AI SDR superagent designed to manage inbound buyer engagement across the website and other channels", built on Qualified's platform. The announcement concerns its use at Siemens for prospective distributors, who today "search the company's site, fill out an intake form, and wait for further outreach". The help article says nothing about pricing or licensing.

**Agentforce Operations.** Salesforce declared it [generally available on 29 April 2026](https://www.salesforce.com/news/stories/agentforce-operations-announcement/), built on Regrello technology. According to the current Salesforce Help, it is an external workspace separate from the Salesforce org and needs its own Agentforce Operations license. The documented integrations are SharePoint and custom HTTP calls; SAP is not named. So the product is GA, the SAP steps at Siemens are a plan, and how they reach SAP is not described. Whatever an agent writes into the ERP, the rules for it belong in deterministic logic, as described in [Agent Script: rules instead of the LLM](/en/blog/agent-script-deterministic-rules/).

## Worked example: a machine builder with 1,100 employees

Assume a machine builder with 1,100 employees, SAP S/4HANA, Sales Cloud and Service Cloud, 140 dealers in 35 countries and 9,000 machines in the installed base. All numbers are assumptions to show the method. Four ideas from the Siemens release are on the table.

**Dealer inquiries on order status and delivery dates.** Assume 1,400 a month, answered today by four people in the back office. A MuleSoft API to SAP exists and the agent only has read access. This has the same profile as the Siemens lead case: high volume, data within reach, a person takes over when the answer is unclear. It goes first. The integration path is in [Agentforce and SAP order status](/en/blog/agentforce-sap-order-status-mulesoft/).

**Inbound leads.** Assume 180 a month from the website and trade fairs, about nine per working day. A scoring rule in Flow and one inside sales rep can probably handle that, unless you need answers in many languages around the clock. Siemens reports roughly 14 times that volume for the in-scope leads alone, plus 18,000 sellers waiting for qualified leads. Before building an agent I would compare the full cost of the person with consumption, licenses and build effort. In this scenario the idea waits until lead volume grows.

**Spare parts by serial number.** This is the most valuable idea for the head of service, and the least ready for implementation. Assume only 60 percent of the 9,000 machines have a serial number linked to an as-built bill of materials. The data project starts now, because it takes the longest; the agent follows once coverage reaches a level the head of service signs off on.

**Supplier onboarding.** Assume 25 new suppliers a year. An approval process with a checklist probably covers that. Because checks are this rare, I would only build an agent if each onboarding is complex or risky enough to justify the build and test effort. The Siemens release gives no supplier volume, so the "weeks to days" promise says nothing about your case.

Which Salesforce topics such a machine builder should tackle besides Agentforce, from the installed base to the dealer portal, is described on the page [Salesforce consulting for machine builders](/en/salesforce-for-machinery-manufacturers/).

## A smaller company needs its own order of use cases

From the scenario I derive this order:

```schritte
Read only, high volume
  Dealer inquiries, order status, delivery dates, and a person takes over. Pick whichever process in your company has the most similar requests.
Read from the ERP through an API
  Still without write access. Stock, prices and credit status come from SAP or proALPHA; the agent explains the figures; it does not recalculate them.
Engineering answers from PLM and serial numbers
  Once the data project from day one has delivered. This is where the aftermarket value sits, and where the data work is heaviest.
Write steps into the ERP
  Usually last, with rules in logic, an approval by a person for financially, legally or operationally significant steps and a test set agreed in advance. A validated, reversible write step can be less risky than an automatic lead rejection, so decide by risk and controls, not by read versus write alone.
```

Before any of these goes live, agree on one result metric beyond activity, for example the share of dealer inquiries closed without a back office reply. Siemens published activity and funnel numbers; your board will ask for a result. The five criteria behind this order are in [Agentforce for manufacturers: start now or wait?](/en/blog/agentforce-yes-or-no-manufacturers/), and the wider picture of what is running today is in the masterclass chapter [AI agents in manufacturing](/en/masterclass/ai-salesforce/ai-agents-in-manufacturing/).

When someone in your company says "Siemens already does this", ask these questions: which tense does the source use, is the number a baseline or a result, whose number is it, and does it name a source. Sorting that out before a budget decision is part of my work in [architecture and partner governance](/en/services/salesforce-architecture/).
